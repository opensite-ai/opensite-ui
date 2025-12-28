# OpenSite Forms Integration Guide

## Overview

This guide explains how to integrate the `@page-speed/forms` library with OpenSite UI components in a **universal, framework-agnostic way**. The integration is designed to work across any React context:

- Next.js applications (App Router, Pages Router)
- Standard React applications (CRA, Vite, etc.)
- OpenSite ecosystem (`customer-sites`, `opensite-blocks`)
- Server-side rendering (SSR) and client-side rendering (CSR)
- Any custom React rendering system

**Key Principle**: The `@page-speed/forms` library is completely abstract and framework-agnostic. Platform-specific behavior (like DashTrack Rails integration) is implemented through optional configuration, not through library coupling.

## Core Architecture

### Separation of Concerns

```
┌─────────────────────────────────────────────────────────────┐
│ @page-speed/forms (Core Library)                            │
│ • Framework-agnostic                                         │
│ • Field-level reactivity (~1 re-render per change)         │
│ • Validation with race condition prevention                 │
└─────────────────────────────────────────────────────────────┘
                            │
                            ├── Used by
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ OpenSite UI Components                                       │
│ • Newsletter forms, CTAs, modals, footers                   │
│ • Accept formConfig (optional) + onSubmit (optional)        │
│ • Work with or without backend                               │
└─────────────────────────────────────────────────────────────┘
                            │
                            ├── Submit via (choose one)
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ Submission Strategy (Developer's Choice)                    │
│                                                              │
│ 1. Generic JSON Endpoint                                    │
│    • formConfig.endpoint + format: "json"                   │
│    • Works with ANY REST API                                │
│                                                              │
│ 2. Custom Handler                                           │
│    • onSubmit={(values) => /* your logic */}                │
│    • Maximum flexibility                                     │
│                                                              │
│ 3. Platform-Specific (DashTrack Rails)                      │
│    • formConfig with apiKey, contactCategoryToken, etc.     │
│    • Uses submitPageSpeedForm from lib/forms.ts             │
│                                                              │
│ 4. Client-Side Only                                         │
│    • No backend, local validation only                      │
└─────────────────────────────────────────────────────────────┘
```

## 1. Install & Base Styles

Install the form library:

```bash
pnpm add @page-speed/forms
# Optional peer dependencies used by some adapters/validators:
pnpm add @legendapp/state valibot
```

### Base Styles (Shadcn-compatible)

The OpenSite UI library includes `src/styles/forms.css` (a direct copy of
`prototypes/client-canyon-lands/app/forms.css`). `src/styles/globals.css`
imports it by default.

If you are **already importing OpenSite UI global styles**, nothing else is required.

If you are **not** using OpenSite UI global styles, import the base styles directly:

```css
/* Example: app/globals.css */
@import "@opensite/ui/src/styles/forms.css";
```

## 2. Usage Patterns

### Pattern 1: Generic JSON Endpoint (Most Abstract)

Use this pattern when you have **any REST API** that accepts JSON payloads.

```tsx
import { OfferModalNewsletterDiscount } from "@opensite/ui/blocks/offer-modal";

function MyApp() {
  return (
    <OfferModalNewsletterDiscount
      title="Join our newsletter"
      buttonText="Subscribe"
      formConfig={{
        endpoint: "https://api.mycompany.com/subscribe",
        method: "POST",
        format: "json", // Generic JSON format
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": process.env.NEXT_PUBLIC_API_KEY,
        },
      }}
      onSuccess={(data) => {
        console.log("Subscription successful:", data);
        // Show success toast, redirect, etc.
      }}
      onError={(error) => {
        console.error("Subscription failed:", error);
        // Show error toast
      }}
    />
  );
}
```

**Expected Payload Sent**:
```json
{
  "email": "user@example.com"
}
```

**Works with**: Any API that accepts JSON, including:
- Express.js backends
- FastAPI (Python)
- Django REST Framework
- ASP.NET Core
- Go/Gin APIs
- Serverless functions (Vercel, Netlify, AWS Lambda)

### Pattern 2: Custom Submission Handler (Maximum Flexibility)

Use this pattern when you need **complete control** over submission logic.

```tsx
import { FooterNewsletterMinimal } from "@opensite/ui/blocks/footers";
import { useState } from "react";

function MyApp() {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (email: string) => {
    // Your custom logic here
    const response = await fetch("/api/newsletter/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        source: "footer",
        timestamp: new Date().toISOString(),
        // Add any custom fields you need
      }),
    });

    if (!response.ok) {
      throw new Error("Subscription failed");
    }

    const data = await response.json();

    // Custom post-submission logic
    setSubscribed(true);
    localStorage.setItem("newsletter_subscribed", "true");

    // Track analytics
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "newsletter_subscribe", {
        email_domain: email.split("@")[1],
      });
    }

    return data;
  };

  return (
    <FooterNewsletterMinimal
      heading="Stay Updated"
      newsletterLabel="Subscribe to our newsletter:"
      onSubmit={handleSubscribe}
      onSuccess={() => {
        alert("Thanks for subscribing!");
      }}
      onError={(error) => {
        console.error("Failed:", error);
      }}
    />
  );
}
```

**Benefits**:
- Full control over request format
- Custom error handling
- Analytics integration
- Local state management
- Multi-step workflows

### Pattern 3: DashTrack Rails Backend (Platform-Specific)

Use this pattern when integrating with **DashTrack's Rails backend** (`toastability-service`).

```tsx
import { CtaNewsletterFeatures } from "@opensite/ui/blocks/cta";

function MyDashTrackSite() {
  return (
    <CtaNewsletterFeatures
      badgeText="Newsletter"
      heading="Stay in the loop"
      buttonText="Subscribe"
      formConfig={{
        endpoint: "https://api.dashtrack.com/contacts/quote_request",
        method: "POST",
        format: "rails", // Rails-specific format
        // Platform-specific fields:
        apiKey: process.env.DASHTRACK_API_KEY,
        contactCategoryToken: "newsletter_signup",
        locationId: "loc_123",
        websiteId: "ws_456",
        visitorIpAddress: "203.0.113.42",
      }}
      onSuccess={() => {
        // Redirect to thank you page
        window.location.href = "/thank-you";
      }}
    />
  );
}
```

**Expected Payload Sent** (Rails format):
```json
{
  "contact": {
    "email": "user@example.com",
    "contact_category_token": "newsletter_signup",
    "location_id": "loc_123",
    "website_id": "ws_456",
    "visitor_ip_address": "203.0.113.42"
  }
}
```

**Note**: The Rails-specific fields (`apiKey`, `contactCategoryToken`, etc.) are **optional**. Only use them when integrating with DashTrack's backend.

### Pattern 4: Client-Side Only (No Backend)

Use this pattern for **local validation** without server submission.

```tsx
import { OfferModalMembershipImage } from "@opensite/ui/blocks/offer-modal";

function MyApp() {
  const [emails, setEmails] = React.useState<string[]>([]);

  return (
    <OfferModalMembershipImage
      overline="Treat Yourself!"
      title="Join our community"
      buttonText="Get Started"
      // No formConfig - client-side only
      onSubmit={(email) => {
        // Store locally
        setEmails((prev) => [...prev, email]);
        localStorage.setItem("pending_emails", JSON.stringify([...emails, email]));
        console.log("Email captured locally:", email);
      }}
      onSuccess={() => {
        alert("You're on the list! We'll notify you when we launch.");
      }}
    />
  );
}
```

**Use Cases**:
- Coming soon pages
- Waitlist captures
- Local storage before backend is ready
- Offline-first applications

## 3. Basic React Usage (Custom Forms)

For custom React forms (like `QuoteForm.tsx`), use `useForm`, `Form`, `Field`, and the input components:

```tsx
import { useForm, Form, Field } from "@page-speed/forms";
import { TextInput, TextArea } from "@page-speed/forms/inputs";

type ContactValues = {
  email: string;
  message: string;
};

export function ContactForm() {
  const form = useForm<ContactValues>({
    initialValues: { email: "", message: "" },
    validationSchema: {
      email: (value) => (!value ? "Email is required" : undefined),
      message: (value) => (!value ? "Message is required" : undefined),
    },
    onSubmit: async (values, helpers) => {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      helpers.resetForm();
    },
  });

  return (
    <Form form={form} className="space-y-4">
      <Field name="email">
        {({ field, meta }) => (
          <TextInput
            {...field}
            type="email"
            error={meta.touched && !!meta.error}
            placeholder="you@example.com"
          />
        )}
      </Field>
      <Field name="message">
        {({ field, meta }) => (
          <TextArea
            {...field}
            rows={4}
            error={meta.touched && !!meta.error}
            placeholder="How can we help?"
          />
        )}
      </Field>
      <button type="submit" disabled={form.isSubmitting}>
        Submit
      </button>
    </Form>
  );
}
```

## 4. Component Integration Reference

### All Newsletter/Form Components Support

Every form component in `@opensite/ui/blocks` supports these props:

```typescript
interface UniversalFormComponentProps {
  // Optional: Automatic submission configuration
  formConfig?: {
    endpoint?: string; // API URL
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    format?: "json" | "rails"; // Payload format
    headers?: Record<string, string>; // Custom headers
    values?: Record<string, unknown>; // Additional fields
    resetOnSuccess?: boolean; // Default: true

    // Optional Rails-specific fields (only needed for DashTrack backend):
    apiKey?: string;
    contactCategoryToken?: string;
    locationId?: string;
    websiteId?: string;
    websiteFormAssignmentId?: string;
    visitorIpAddress?: string;
  };

  // Optional: Custom submission handler
  onSubmit?: (email: string) => void | Promise<void>;

  // Optional: Lifecycle callbacks
  onSuccess?: (data: unknown) => void;
  onError?: (error: Error) => void;

  // Component-specific props (title, description, etc.)
  // ...
}
```

### Submission Behavior

The components intelligently handle submission based on what you provide:

```typescript
// Scenario 1: Only formConfig provided
<Component formConfig={{ endpoint: "/api/subscribe" }} />
// → Calls submitPageSpeedForm, then onSuccess

// Scenario 2: Only onSubmit provided
<Component onSubmit={async (email) => { /* ... */ }} />
// → Calls your onSubmit, then onSuccess

// Scenario 3: Both provided (recommended)
<Component
  formConfig={{ endpoint: "/api/subscribe" }}
  onSubmit={async (email) => { /* custom logic */ }}
/>
// → Calls submitPageSpeedForm, then your onSubmit, then onSuccess

// Scenario 4: Neither provided
<Component />
// → No submission, only client-side validation
```

### Preconfigured OpenSite UI Blocks

The following blocks ship with `@page-speed/forms` preconfigured:

- `CtaAppDownloadNewsletter`
- `CtaNewsletterFeatures`
- `FooterNewsletterMinimal`
- `OfferModalMembershipImage`
- `OfferModalNewsletterDiscount`
- `OfferModalSheetNewsletter`

Each component has enhanced JSDoc documentation showing universal usage examples.

## 5. Rails Contact API Integration (DashTrack)

Use the serializers shipped with `@page-speed/forms` to integrate with the Rails `ContactsController` API.

### Example Submit Helper

```tsx
import {
  serializeForRails,
  deserializeErrors,
  type RailsApiConfig,
  type RailsErrorResponse,
  type FormErrors,
} from "@page-speed/forms/integration";

export class FormSubmissionError extends Error {
  formErrors: FormErrors;
  status?: number;

  constructor(message: string, formErrors: FormErrors, status?: number) {
    super(message);
    this.name = "FormSubmissionError";
    this.formErrors = formErrors;
    this.status = status;
  }
}

export async function submitContactForm(values: Record<string, unknown>) {
  const config: RailsApiConfig = {
    apiKey: process.env.NEXT_PUBLIC_DASHTRACK_API_KEY ?? "",
    websiteId: "979",
    contactCategoryToken: "newsletter-token",
  };

  const payload = serializeForRails(values, config);

  // Remove upload_ prefix if present (Rails expects raw tokens)
  if (payload.contact.contact_form_upload_tokens) {
    payload.contact.contact_form_upload_tokens = (
      payload.contact.contact_form_upload_tokens as string[]
    ).map((token) => token.replace(/^upload_/, ""));
  }

  const response = await fetch("https://api.dashtrack.com/contacts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok || data.errors) {
    const errorResponse: RailsErrorResponse = {
      errors: data.errors || { base: ["Submission failed"] },
      status: data.status || response.status,
    };
    const formErrors = deserializeErrors(errorResponse);
    throw new FormSubmissionError(
      "Form submission failed",
      formErrors,
      errorResponse.status
    );
  }

  return data;
}
```

### Error Mapping

Use `deserializeErrors` to map Rails `snake_case` errors to `camelCase` keys that `@page-speed/forms` expects. In your form handler:

```tsx
try {
  await submitContactForm(values);
  helpers.resetForm();
} catch (error) {
  if (error instanceof FormSubmissionError) {
    helpers.setErrors(error.formErrors);
  }
  throw error;
}
```

## 6. opensite-blocks Rendering (customer-sites)

For sites rendered via `@opensite/blocks`, register the Page Speed form renderers once at startup:

```tsx
import { registerPageSpeedFormRenderers } from "@opensite/blocks/integrations/page-speed-forms";

registerPageSpeedFormRenderers();
```

Ensure your design payload includes the `Form` block with `action` and `method`:

```json
{
  "_type": "Form",
  "_id": "newsletter-form",
  "action": "https://api.dashtrack.com/contacts",
  "method": "POST"
}
```

Within OpenSite UI blocks rendered by opensite-blocks, pass `formConfig` into the block's `blockProps` so the submission endpoint and Rails credentials are available at runtime:

```json
{
  "_id": "newsletter-cta",
  "_type": "cta-newsletter-features",
  "blockProps": {
    "formConfig": {
      "endpoint": "https://api.dashtrack.com/contacts",
      "format": "rails",
      "apiKey": "your-api-key",
      "websiteId": "979",
      "contactCategoryToken": "newsletter-token",
      "values": { "subject": "Newsletter Signup" }
    }
  }
}
```

## 7. File Uploads (e.g. CareersForm)

File uploads should follow a two-step flow:

1. Upload files to `/contacts/_/contact_form_uploads`
2. Submit `contact_form_upload_tokens` with the main form payload

### Upload Example

```tsx
import { useFileUpload } from "@page-speed/forms/upload";

const { upload, state } = useFileUpload({
  endpoint: "https://api.toastability.com/contacts/_/contact_form_uploads",
  format: "legacy",
  onComplete: (token) => {
    const tokens = Array.isArray(token) ? token : [token];
    form.setFieldValue(
      "contact_form_upload_tokens",
      tokens.map((value) => `upload_${value}`)
    );
  },
});
```

### Submission Example

```tsx
const form = useForm({
  initialValues: {
    name: "",
    contact_form_upload_tokens: [],
  },
  onSubmit: async (values) => {
    const payload = serializeForRails(values, {
      apiKey: "your-api-key",
      contactCategoryToken: "careers",
      websiteId: "979",
    });

    // Remove upload_ prefix if present
    if (payload.contact.contact_form_upload_tokens) {
      payload.contact.contact_form_upload_tokens = (
        payload.contact.contact_form_upload_tokens as string[]
      ).map((token) => token.replace(/^upload_/, ""));
    }

    await fetch("https://api.dashtrack.com/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  },
});
```

## 8. Framework-Specific Examples

### Next.js App Router (Server Actions)

```tsx
"use client";

import { CtaNewsletterFeatures } from "@opensite/ui/blocks/cta";
import { subscribeAction } from "./actions";

export function NewsletterSection() {
  return (
    <CtaNewsletterFeatures
      heading="Get Updates"
      onSubmit={async (email) => {
        "use server"; // This is a Server Action
        await subscribeAction({ email });
      }}
    />
  );
}
```

### Next.js Pages Router (API Routes)

```tsx
import { FooterNewsletterMinimal } from "@opensite/ui/blocks/footers";

export default function Layout() {
  return (
    <FooterNewsletterMinimal
      formConfig={{
        endpoint: "/api/subscribe",
        method: "POST",
        format: "json",
      }}
    />
  );
}
```

### React + Vite

```tsx
import { OfferModalSheetNewsletter } from "@opensite/ui/blocks/offer-modal";

function App() {
  return (
    <OfferModalSheetNewsletter
      title="Join our mailing list"
      formConfig={{
        endpoint: import.meta.env.VITE_API_URL + "/newsletter",
        method: "POST",
        format: "json",
      }}
    />
  );
}
```

### OpenSite Blocks (customer-sites)

When used in the OpenSite rendering system, components receive configuration from the page builder:

```tsx
// In customer-sites entry point
import { OfferModalNewsletterDiscount } from "@opensite/ui/blocks/offer-modal";

// Configuration comes from ChaiBuilder design payload
const blockConfig = {
  title: page.blocks.offerModal.title,
  formConfig: {
    endpoint: website.apiEndpoint,
    apiKey: website.apiKey,
    contactCategoryToken: page.blocks.offerModal.contactCategory,
    websiteId: website.id,
  },
};

<OfferModalNewsletterDiscount {...blockConfig} />
```

## 9. Advanced Patterns

### Multi-Step Forms

```tsx
import { useState } from "react";
import { OfferModalNewsletterDiscount } from "@opensite/ui/blocks/offer-modal";

function MultiStepSignup() {
  const [step, setStep] = useState<"email" | "details">("email");
  const [email, setEmail] = useState("");

  if (step === "email") {
    return (
      <OfferModalNewsletterDiscount
        title="Step 1: Enter your email"
        onSubmit={async (submittedEmail) => {
          setEmail(submittedEmail);
          setStep("details");
        }}
      />
    );
  }

  return <DetailsForm email={email} />;
}
```

### Conditional Backend Integration

```tsx
import { CtaNewsletterFeatures } from "@opensite/ui/blocks/cta";

function SmartNewsletter() {
  const isDevelopment = process.env.NODE_ENV === "development";

  return (
    <CtaNewsletterFeatures
      heading="Subscribe"
      formConfig={isDevelopment ? undefined : {
        endpoint: "/api/subscribe",
        format: "json",
      }}
      onSubmit={async (email) => {
        if (isDevelopment) {
          console.log("Dev mode - email captured:", email);
          return;
        }
        // Production logic handled by formConfig
      }}
    />
  );
}
```

### Progressive Enhancement

```tsx
import { FooterNewsletterMinimal } from "@opensite/ui/blocks/footers";

function EnhancedFooter() {
  const hasJavaScript = typeof window !== "undefined";

  return (
    <FooterNewsletterMinimal
      newsletterLabel="Subscribe:"
      formConfig={{
        endpoint: "/api/subscribe",
        method: "POST",
        format: "json",
      }}
      onSubmit={hasJavaScript ? async (email) => {
        // Enhanced client-side behavior
        await trackSubscription(email);
        showSuccessAnimation();
      } : undefined}
    />
  );
}
```

## 10. API Reference

### PageSpeedFormConfig

Complete configuration interface for form submission:

```typescript
interface PageSpeedFormConfig {
  // ===== Universal Fields (work with any backend) =====

  endpoint?: string;
  // API endpoint URL
  // Example: "https://api.mysite.com/subscribe"

  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  // HTTP method (default: "POST")

  format?: "json" | "rails";
  // Payload format:
  // - "json": Generic { email: "..." } format (default)
  // - "rails": DashTrack-specific { contact: { email: "..." } } format

  headers?: Record<string, string>;
  // Custom HTTP headers
  // Example: { "Authorization": "Bearer token123", "X-Custom": "value" }

  values?: Record<string, unknown>;
  // Additional fields to merge into the payload
  // Example: { source: "homepage", campaign_id: 42 }

  resetOnSuccess?: boolean;
  // Clear form after successful submission (default: true)

  // ===== Platform-Specific Fields (optional, DashTrack only) =====

  apiKey?: string;
  // DashTrack API authentication key
  // Only required when format: "rails"

  contactCategoryToken?: string;
  // DashTrack contact category identifier
  // Example: "newsletter_signup", "quote_request"

  locationId?: string;
  // DashTrack location ID

  websiteId?: string;
  // DashTrack website ID

  websiteFormAssignmentId?: string;
  // DashTrack form assignment ID

  visitorIpAddress?: string;
  // Visitor IP for tracking (optional)
}
```

### Component Props Pattern

All form components follow this prop pattern:

```typescript
interface FormComponentProps {
  // Component-specific visual props
  title?: string;
  description?: string;
  buttonText?: string;
  emailPlaceholder?: string;
  // ... etc

  // Universal form integration props
  formConfig?: PageSpeedFormConfig;
  onSubmit?: (email: string) => void | Promise<void>;
  onSuccess?: (data: unknown) => void;
  onError?: (error: Error) => void;
}
```

## 11. Validation

Email validation is handled automatically using the `isValidEmail` utility:

```typescript
import { isValidEmail } from "@opensite/ui/lib/forms";

// Used internally by all components:
validationSchema: {
  email: (value) => {
    if (!value) return "Email is required";
    if (!isValidEmail(value)) return "Please enter a valid email address";
    return undefined;
  },
}
```

The validator checks for:
- Valid email format (RFC 5322 compliant)
- Common typos (gmail.con → gmail.com suggestions)
- Disposable email domains (optional filtering)

## 12. Error Handling

### Automatic Error Display

Components automatically display validation errors:

```tsx
<OfferModalNewsletterDiscount
  onError={(error) => {
    console.error("Subscription failed:", error);
    // Optional: Custom error tracking
    trackError("newsletter_subscription", error);
  }}
/>
```

### Custom Error Messages

Validation errors are shown inline automatically:

```tsx
// If user enters invalid email:
// → "Please enter a valid email address" (shown below input)

// If user leaves field empty and tries to submit:
// → "Email is required" (shown below input)
```

### Network Error Handling

```tsx
<CtaNewsletterFeatures
  formConfig={{
    endpoint: "/api/subscribe",
  }}
  onError={(error) => {
    if (error.message.includes("Failed to fetch")) {
      alert("Network error. Please check your connection.");
    } else if (error.message.includes("429")) {
      alert("Too many requests. Please try again later.");
    } else {
      alert("Subscription failed. Please try again.");
    }
  }}
/>
```

## 13. Performance Considerations

### Bundle Size

The `@page-speed/forms` library is optimized for minimal bundle impact:

- **Core library**: ~3KB gzipped
- **Field-level reactivity**: ~1 re-render per change (vs ~10 for useState)
- **Tree-shakable**: Import only what you use

### Lazy Loading

For modals, consider lazy loading:

```tsx
import dynamic from "next/dynamic";

const OfferModal = dynamic(
  () => import("@opensite/ui/blocks/offer-modal").then((m) => m.OfferModalNewsletterDiscount),
  { ssr: false }
);

function App() {
  return <OfferModal title="Subscribe" />;
}
```

### Caching

API responses can be cached for better performance:

```tsx
<FooterNewsletterMinimal
  formConfig={{
    endpoint: "/api/subscribe",
    headers: {
      "Cache-Control": "no-cache",
    },
  }}
/>
```

## 14. Testing

### Unit Testing Components

```tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { OfferModalNewsletterDiscount } from "@opensite/ui/blocks/offer-modal";

test("submits email via custom handler", async () => {
  const mockSubmit = jest.fn();

  render(
    <OfferModalNewsletterDiscount
      title="Subscribe"
      onSubmit={mockSubmit}
    />
  );

  const input = screen.getByPlaceholderText(/email/i);
  const button = screen.getByRole("button", { name: /subscribe/i });

  fireEvent.change(input, { target: { value: "test@example.com" } });
  fireEvent.click(button);

  await waitFor(() => {
    expect(mockSubmit).toHaveBeenCalledWith("test@example.com");
  });
});
```

### Integration Testing with Mock API

```tsx
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.post("/api/subscribe", (req, res, ctx) => {
    return res(ctx.json({ success: true }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("submits to API endpoint", async () => {
  const mockSuccess = jest.fn();

  render(
    <CtaNewsletterFeatures
      formConfig={{
        endpoint: "/api/subscribe",
        format: "json",
      }}
      onSuccess={mockSuccess}
    />
  );

  // ... submit form ...

  await waitFor(() => {
    expect(mockSuccess).toHaveBeenCalled();
  });
});
```

### Testing Validation Errors

When testing form validation errors with `@page-speed/forms`, there are important behaviors to understand:

#### Understanding Validation vs Touched State

The `@page-speed/forms` library validates fields on form submission but does **not** automatically set the `touched` state for fields. This means:

1. After submission, validation errors exist in `meta.error`
2. However, `meta.touched` may still be `false`
3. Components should show errors when either:
   - The field has been touched AND has an error, OR
   - The form has validation errors (status === 'error')

#### Recommended Error Display Pattern

```tsx
import { useForm, Form, Field } from "@page-speed/forms";

function MyFormComponent() {
  const form = useForm({
    defaultValues: { email: "" },
    validate: (values) => {
      const errors: Record<string, string> = {};
      if (!values.email) {
        errors.email = "Please enter an email address";
      }
      return errors;
    },
  });

  return (
    <Form form={form}>
      <Field name="email">
        {({ field, meta }) => (
          <div>
            <input {...field} type="email" />
            {/* Show error when touched OR when form has validation errors */}
            {(meta.touched || form.status === 'error') && meta.error && (
              <div className="text-destructive text-xs mt-1">
                {meta.error}
              </div>
            )}
          </div>
        )}
      </Field>
    </Form>
  );
}
```

#### Testing Error Messages with Duplicate Elements

The `@page-speed/forms` `Field` component may render its own error message with class `field-error`. When testing, you may encounter multiple elements with the same error text. Use this pattern to find your specific error element:

```tsx
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("shows error for empty email", async () => {
  const user = userEvent.setup();
  render(<MyFormComponent />);

  // Submit the form without entering an email
  const submitButton = screen.getByRole("button", { name: /submit/i });
  await user.click(submitButton);

  // Wait for validation and find the specific error element
  await waitFor(async () => {
    // Use getAllByText since Field component may also render an error
    const errors = screen.getAllByText("Please enter an email address");
    // Find your specific error element by class
    const errorMessage = errors.find(el =>
      el.classList.contains("text-destructive")
    );
    expect(errorMessage).toBeInTheDocument();
  }, { timeout: 3000 });
});
```

#### Testing Invalid Email Format

```tsx
test("shows error for invalid email format", async () => {
  const user = userEvent.setup();
  render(<MyFormComponent />);

  // Enter an invalid email
  const emailInput = screen.getByPlaceholderText(/email/i);
  await user.type(emailInput, "invalid-email");

  // Submit the form
  const submitButton = screen.getByRole("button", { name: /submit/i });
  await user.click(submitButton);

  // Wait for validation error
  await waitFor(async () => {
    const errors = screen.getAllByText("Please enter a valid email address");
    const errorMessage = errors.find(el =>
      el.classList.contains("text-destructive")
    );
    expect(errorMessage).toBeInTheDocument();
  }, { timeout: 3000 });
});
```

#### Key Testing Tips

1. **Use `userEvent` over `fireEvent`**: `userEvent` better simulates real user interactions and handles async state updates properly.

2. **Always use `waitFor` for error assertions**: Form validation is asynchronous, so wrap error assertions in `waitFor`.

3. **Handle duplicate error elements**: The `Field` component renders its own error with class `field-error`. Use `getAllByText` and filter by your custom class.

4. **Set appropriate timeouts**: Form validation may take time; use `{ timeout: 3000 }` or higher for `waitFor`.

5. **Check form status for error display**: Use `form.status === 'error'` in addition to `meta.touched` to ensure errors show after submission.

## 15. Migration Guide

### From Custom Forms to @page-speed/forms

If you have existing custom form implementations:

**Before:**
```tsx
function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Invalid email");
      return;
    }
    await fetch("/api/subscribe", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      {error && <span>{error}</span>}
      <button type="submit">Subscribe</button>
    </form>
  );
}
```

**After:**
```tsx
import { OfferModalNewsletterDiscount } from "@opensite/ui/blocks/offer-modal";

function Newsletter() {
  return (
    <OfferModalNewsletterDiscount
      formConfig={{
        endpoint: "/api/subscribe",
        format: "json",
      }}
    />
  );
}
```

**Benefits:**
- Automatic validation ✓
- Field-level reactivity ✓
- Consistent error handling ✓
- Built-in accessibility ✓
- ~50% less code ✓

## 16. Troubleshooting

### Issue: Form doesn't submit

**Check:**
1. Did you provide either `formConfig.endpoint` OR `onSubmit`?
2. Is the endpoint URL correct?
3. Are there CORS issues? (Check browser console)

```tsx
// ❌ Won't submit (no endpoint or handler)
<Component />

// ✅ Will submit
<Component onSubmit={(email) => console.log(email)} />
```

### Issue: Validation not working

**Check:**
1. Is `isValidEmail` imported correctly?
2. Are you using the latest version of `@opensite/ui`?

```bash
# Update to latest
pnpm update @opensite/ui @page-speed/forms
```

### Issue: TypeScript errors with formConfig

The platform-specific fields are optional. TypeScript errors mean you're trying to use them incorrectly:

```tsx
// ❌ TypeScript error if apiKey is wrong type
<Component formConfig={{ apiKey: 123 }} />

// ✅ Correct
<Component formConfig={{ apiKey: "sk_test_123" }} />

// ✅ Also correct (omit platform-specific fields)
<Component formConfig={{ endpoint: "/api/subscribe" }} />
```

## 17. Best Practices

### 1. Keep It Simple

Start with the simplest pattern that works:

```tsx
// Good: Simple and clear
<Component
  formConfig={{ endpoint: "/api/subscribe" }}
/>

// Over-engineered: Unnecessary complexity
<Component
  formConfig={{ endpoint: "/api/subscribe" }}
  onSubmit={async (email) => {
    // Just logging, not needed
    console.log(email);
  }}
/>
```

### 2. Separate Concerns

Keep business logic separate from presentation:

```tsx
// Good: Logic in separate file
import { subscribeToNewsletter } from "./services/newsletter";

<Component onSubmit={subscribeToNewsletter} />

// Bad: Logic mixed with JSX
<Component onSubmit={async (email) => {
  const response = await fetch(/* ... */);
  const data = await response.json();
  if (data.error) { /* ... */ }
  // ... 30 more lines ...
}} />
```

### 3. Handle Errors Gracefully

Always provide user-friendly error messages:

```tsx
<Component
  formConfig={{ endpoint: "/api/subscribe" }}
  onError={(error) => {
    // Good: User-friendly message
    toast.error("Oops! Something went wrong. Please try again.");

    // Also log for debugging
    console.error("Newsletter subscription error:", error);
  }}
/>
```

### 4. Type Your Handlers

Use TypeScript for type safety:

```tsx
import type { FormSubmitHandler } from "@opensite/ui/lib/forms";

const handleSubmit: FormSubmitHandler = async (email) => {
  // TypeScript knows email is a string
  await api.subscribe({ email });
};

<Component onSubmit={handleSubmit} />
```

### 5. Test Both Modes

Test your components with and without a backend:

```tsx
// Test with backend
<Component formConfig={{ endpoint: "/api/subscribe" }} />

// Test without backend (offline mode)
<Component onSubmit={(email) => {
  localStorage.setItem("pending_email", email);
}} />
```

### 6. Additional Recommendations

- Prefer `@page-speed/forms/inputs` to keep consistent BEM class names.
- Always map Rails errors with `deserializeErrors`.
- Store API credentials outside components (env or centralized config).
- Use `formConfig.values` to inject hidden metadata (subjects, tags, etc).
- Prefix upload tokens with `upload_` so Rails serialization can detect them.

## 18. Adding New Forms (Checklist)

1. Define a strict `FormValues` type for the new form.
2. Initialize `useForm` with `initialValues` + `validationSchema`.
3. Render `<Form>` with `<Field>` + inputs from `@page-speed/forms/inputs`.
4. Create a submission helper:
   - **Generic JSON**: Use `formConfig` with `format: "json"`
   - **Custom Logic**: Use `onSubmit` callback
   - **Rails**: use `serializeForRails` / `deserializeErrors` + a `FormSubmissionError`.
5. For uploads, use `useFileUpload` and store tokens as `upload_*` strings.
6. For OpenSite UI blocks, expose a `formConfig` prop and keep it JSON-serializable for `blockProps`.
7. Confirm base form styles are loaded.
8. Add comprehensive JSDoc comments to props emphasizing universal usage.
9. Test with multiple patterns (generic JSON, custom handler, etc.).

## Summary

The `@page-speed/forms` integration in OpenSite UI components is designed to be:

✅ **Universal**: Works in any React environment
✅ **Abstract**: No coupling to specific backends
✅ **Flexible**: Multiple integration patterns
✅ **Performant**: Field-level reactivity, minimal re-renders
✅ **Type-Safe**: Full TypeScript support
✅ **Progressive**: Works with or without JavaScript
✅ **Accessible**: WCAG 2.1 AA compliant

Choose the pattern that fits your use case:
- **Generic JSON** for standard REST APIs
- **Custom Handler** for maximum control
- **Rails Format** for DashTrack platform integration
- **Client-Side Only** for offline/local scenarios

All components work identically regardless of which pattern you choose, ensuring consistency across your application.
