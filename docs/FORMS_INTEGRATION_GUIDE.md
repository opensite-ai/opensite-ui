# OpenSite Forms Integration Guide

## Overview

This guide explains how to integrate forms with OpenSite UI components using the `FormEngine` from `@page-speed/forms/integration`. The integration is designed to be **universal and framework-agnostic**, working across any React context:

- Next.js applications (App Router, Pages Router)
- Standard React applications (CRA, Vite, etc.)
- OpenSite ecosystem (`customer-sites`, `opensite-blocks`)
- Server-side rendering (SSR) and client-side rendering (CSR)
- Any custom React rendering system

**Key Principle**: Forms in OpenSite UI blocks are powered by the `FormEngine` component, which handles validation, submission, error handling, and success states. Block components expose a simple `formEngineSetup` prop that configures all form behavior.

## Core Architecture

### FormEngine-Based Approach

```
┌─────────────────────────────────────────────────────────────┐
│ @page-speed/forms/integration (FormEngine)                   │
│ • Framework-agnostic                                         │
│ • Handles validation, submission, success/error states       │
│ • Supports multiple layouts (button-group, standard, etc.)   │
│ • Field-level reactivity (~1 re-render per change)          │
└─────────────────────────────────────────────────────────────┘
                            │
                            ├── Used by
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ OpenSite UI Blocks                                           │
│ • Newsletter forms, CTAs, modals, footers, contact forms    │
│ • Accept formEngineSetup prop                                │
│ • Optionally accept buttonAction for button customization    │
│ • Support formSlot for fully custom form rendering          │
└─────────────────────────────────────────────────────────────┘
                            │
                            ├── Submit via formEngineSetup.formConfig
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ Submission Strategy (configured in formEngineSetup)          │
│                                                              │
│ 1. Generic JSON Endpoint                                    │
│    • formConfig.endpoint + format: "json"                   │
│    • Works with ANY REST API                                │
│                                                              │
│ 2. Platform-Specific (DashTrack Rails)                      │
│    • formConfig with apiKey, contactCategoryToken, etc.     │
│    • Uses format: "rails"                                   │
│                                                              │
│ 3. Custom Callbacks                                         │
│    • formEngineSetup.onSuccess / onError                    │
│    • Handle post-submission logic                           │
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

The OpenSite UI library includes `src/styles/forms.css`. `src/styles/globals.css` imports it by default.

If you are **already importing OpenSite UI global styles**, nothing else is required.

If you are **not** using OpenSite UI global styles, import the base styles directly:

```css
/* Example: app/globals.css */
@import "@opensite/ui/src/styles/forms.css";
```

## 2. FormEngine Usage Patterns

### Pattern 1: Newsletter Form (Button-Group Layout)

Use this pattern for **single-field forms** like newsletter signups. The button-group layout displays an input field with an inline submit button.

```tsx
import { CtaNewsletterFeatures } from "@opensite/ui/blocks/cta";

function MyApp() {
  return (
    <CtaNewsletterFeatures
      badge="Newsletter"
      heading="Stay in the loop"
      description="Get the latest updates delivered to your inbox."
      formEngineSetup={{
        formConfig: {
          endpoint: "https://api.mycompany.com/subscribe",
          method: "POST",
          format: "json",
          headers: {
            "Content-Type": "application/json",
          },
        },
        onSuccess: (data) => {
          console.log("Subscription successful:", data);
        },
        onError: (error) => {
          console.error("Subscription failed:", error);
        },
      }}
      buttonAction={{
        label: "Subscribe",
        variant: "default",
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

### Pattern 2: Standard Multi-Field Form

Use this pattern for **contact forms, support forms, or any multi-field form**. The standard layout displays fields in a grid with a submit button below.

```tsx
import { ContactSupport } from "@opensite/ui/blocks/contact";

function MyApp() {
  return (
    <ContactSupport
      heading="Contact Us"
      description="We'd love to hear from you."
      formEngineSetup={{
        formConfig: {
          endpoint: "/api/contact",
          method: "POST",
          format: "json",
        },
        onSuccess: () => {
          alert("Message sent successfully!");
        },
        onError: (error) => {
          console.error("Failed to send message:", error);
        },
      }}
    />
  );
}
```

### Pattern 3: DashTrack Rails Backend (Platform-Specific)

Use this pattern when integrating with **DashTrack's Rails backend** (`toastability-service`).

```tsx
import { FooterSplitImageAccordion } from "@opensite/ui/blocks/footers";

function MyDashTrackSite() {
  return (
    <FooterSplitImageAccordion
      newsletterHeading="Stay Updated"
      formEngineSetup={{
        formConfig: {
          endpoint: "https://api.dashtrack.com/contacts/quote_request",
          method: "POST",
          format: "rails", // Rails-specific format
          // Platform-specific fields:
          apiKey: process.env.DASHTRACK_API_KEY,
          contactCategoryToken: "newsletter_signup",
          locationId: "loc_123",
          websiteId: "ws_456",
        },
        onSuccess: () => {
          window.location.href = "/thank-you";
        },
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
    "website_id": "ws_456"
  }
}
```

### Pattern 4: Custom Form Slot (Maximum Flexibility)

Use `formSlot` when you need **complete control** over the form rendering.

```tsx
import { OfferModalMembershipImage } from "@opensite/ui/blocks/offer-modal";
import { useForm, Form, Field } from "@page-speed/forms";
import { TextInput } from "@page-speed/forms/inputs";

function MyApp() {
  const form = useForm({
    initialValues: { email: "", name: "" },
    onSubmit: async (values) => {
      await fetch("/api/custom-signup", {
        method: "POST",
        body: JSON.stringify(values),
      });
    },
  });

  return (
    <OfferModalMembershipImage
      title="Join Our Community"
      formSlot={
        <Form form={form} className="space-y-4">
          <Field name="name">
            {({ field }) => (
              <TextInput {...field} placeholder="Your name" />
            )}
          </Field>
          <Field name="email">
            {({ field }) => (
              <TextInput {...field} type="email" placeholder="Email" />
            )}
          </Field>
          <button type="submit">Join</button>
        </Form>
      }
    />
  );
}
```

## 3. Block Props Reference

### Newsletter/Single-Field Blocks

Blocks like `CtaNewsletterFeatures`, `FooterNewsletterMinimal`, `OfferModalNewsletterDiscount`, etc., support:

```typescript
interface NewsletterBlockProps {
  // Full form engine configuration
  formEngineSetup?: FormEngineProps;

  // Button customization (icon, label, variant)
  buttonAction?: ActionConfig;

  // Escape hatch for fully custom forms
  formSlot?: React.ReactNode;

  // Component-specific visual props (title, description, etc.)
  // ...
}
```

### FormEngineProps

The `formEngineSetup` prop accepts the full `FormEngineProps` interface:

```typescript
interface FormEngineProps {
  // Form submission configuration
  formConfig?: {
    endpoint?: string;           // API URL
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    format?: "json" | "rails";   // Payload format
    headers?: Record<string, string>;
    values?: Record<string, unknown>; // Additional fields
    resetOnSuccess?: boolean;    // Default: true

    // Optional Rails-specific fields (DashTrack only):
    apiKey?: string;
    contactCategoryToken?: string;
    locationId?: string;
    websiteId?: string;
    websiteFormAssignmentId?: string;
    visitorIpAddress?: string;
  };

  // Success/error callbacks
  onSuccess?: (data: unknown) => void;
  onError?: (error: Error) => void;

  // Form fields configuration (can override block defaults)
  fields?: FormFieldConfig[];

  // Layout settings
  formLayoutSettings?: {
    formLayout?: "standard" | "button-group" | "inline";
    buttonGroupSetup?: {
      size?: "sm" | "default" | "lg";
      submitLabel?: React.ReactNode;
      submitVariant?: string;
    };
    // ... other layout options
  };

  // Style overrides
  styleRules?: FormEngineStyleRules;
}
```

### ActionConfig (Button Customization)

```typescript
interface ActionConfig {
  label?: React.ReactNode;      // Button text
  icon?: React.ReactNode;       // Icon element
  iconAfter?: React.ReactNode;  // Icon after text
  variant?: string;             // Button variant
  size?: string;                // Button size
  className?: string;           // Additional classes
  href?: string;                // For link buttons
  onClick?: () => void;         // Click handler
}
```

## 4. Implementing Forms in New Blocks

### Newsletter Form (Button-Group) Pattern

For blocks with single-field newsletter forms, follow this pattern:

```tsx
"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import type { ActionConfig, SectionBackground } from "../../../src/types";
import {
  FormEngine,
  type FormEngineProps,
  type FormEngineStyleRules,
  type FormFieldConfig,
} from "@page-speed/forms/integration";

// Default style rules for the form container
const DEFAULT_STYLE_RULES: FormEngineStyleRules = {
  formContainer: "flex items-stretch w-full",
  fieldsContainer: "",
  fieldClassName: "",
  formClassName: "",
};

// Default email field configuration
const DEFAULT_FORM_FIELDS: FormFieldConfig[] = [
  {
    name: "email",
    type: "email",
    label: "Email Address",
    placeholder: "Enter your email",
    required: true,
    columnSpan: 12,
  },
];

interface MyNewsletterBlockProps {
  heading?: React.ReactNode;
  formEngineSetup?: FormEngineProps;
  buttonAction?: ActionConfig;
  formSlot?: React.ReactNode;
  formClassName?: string;
  // ... other props
}

export function MyNewsletterBlock({
  heading,
  formEngineSetup,
  buttonAction,
  formSlot,
  formClassName,
}: MyNewsletterBlockProps) {
  const renderForm = React.useMemo(() => {
    // Allow custom form override
    if (formSlot) return formSlot;
    // No form if no setup provided
    if (!formEngineSetup) return null;

    // Default button action (arrow icon)
    const defaultButtonAction: ActionConfig = {
      label: "",
      variant: "default",
      icon: <DynamicIcon name="lucide/arrow-right" size={16} />,
    };

    const action = buttonAction || defaultButtonAction;

    return (
      <FormEngine
        formEngineSetup={{
          ...formEngineSetup,
          formLayoutSettings: {
            ...formEngineSetup.formLayoutSettings,
            formLayout: "button-group",
            buttonGroupSetup: {
              ...formEngineSetup.formLayoutSettings?.buttonGroupSetup,
              size: "default",
              submitLabel: action.icon || action.label,
              submitVariant: action.variant || "default",
            },
          },
        }}
        defaultFields={DEFAULT_FORM_FIELDS}
        defaultStyleRules={{
          ...DEFAULT_STYLE_RULES,
          formContainer: cn(
            DEFAULT_STYLE_RULES.formContainer,
            formClassName,
          ),
        }}
      />
    );
  }, [formSlot, formEngineSetup, buttonAction, formClassName]);

  return (
    <section>
      <h2>{heading}</h2>
      {renderForm}
    </section>
  );
}
```

### Standard Multi-Field Form Pattern

For blocks with multi-field forms (contact, support, etc.), follow this simpler pattern:

```tsx
"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import type { SectionBackground } from "../../../src/types";
import {
  FormEngine,
  type FormEngineProps,
  type FormEngineStyleRules,
  type FormFieldConfig,
} from "@page-speed/forms/integration";

const DEFAULT_STYLE_RULES: FormEngineStyleRules = {
  formContainer: "space-y-6",
  fieldsContainer: "grid gap-4",
  fieldClassName: "",
  formClassName: "",
};

const DEFAULT_FORM_FIELDS: FormFieldConfig[] = [
  {
    name: "name",
    type: "text",
    label: "Full Name",
    placeholder: "Your name",
    required: true,
    columnSpan: 6,
  },
  {
    name: "email",
    type: "email",
    label: "Email Address",
    placeholder: "you@example.com",
    required: true,
    columnSpan: 6,
  },
  {
    name: "message",
    type: "textarea",
    label: "Message",
    placeholder: "How can we help?",
    required: true,
    columnSpan: 12,
  },
];

interface MyContactBlockProps {
  heading?: React.ReactNode;
  formEngineSetup?: FormEngineProps;
  formSlot?: React.ReactNode;
  formClassName?: string;
}

export function MyContactBlock({
  heading,
  formEngineSetup,
  formSlot,
  formClassName,
}: MyContactBlockProps) {
  const renderForm = React.useMemo(() => {
    if (formSlot) return formSlot;
    if (!formEngineSetup) return null;

    return (
      <FormEngine
        formEngineSetup={formEngineSetup}
        defaultFields={DEFAULT_FORM_FIELDS}
        defaultStyleRules={{
          ...DEFAULT_STYLE_RULES,
          formContainer: cn(
            DEFAULT_STYLE_RULES.formContainer,
            formClassName,
          ),
        }}
      />
    );
  }, [formSlot, formEngineSetup, formClassName]);

  return (
    <section>
      <h2>{heading}</h2>
      {renderForm}
    </section>
  );
}
```

## 5. Framework-Specific Examples

### Next.js App Router

```tsx
import { CtaNewsletterFeatures } from "@opensite/ui/blocks/cta";

export default function NewsletterSection() {
  return (
    <CtaNewsletterFeatures
      heading="Get Updates"
      formEngineSetup={{
        formConfig: {
          endpoint: "/api/subscribe",
          format: "json",
        },
        onSuccess: () => {
          // Handle success (toast, redirect, etc.)
        },
      }}
    />
  );
}
```

### Next.js Pages Router

```tsx
import { FooterNewsletterMinimal } from "@opensite/ui/blocks/footers";

export default function Layout() {
  return (
    <FooterNewsletterMinimal
      heading="Stay Connected"
      formEngineSetup={{
        formConfig: {
          endpoint: "/api/subscribe",
          method: "POST",
          format: "json",
        },
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
      formEngineSetup={{
        formConfig: {
          endpoint: import.meta.env.VITE_API_URL + "/newsletter",
          method: "POST",
          format: "json",
        },
      }}
    />
  );
}
```

### OpenSite Blocks (customer-sites)

When used in the OpenSite rendering system, components receive configuration from the page builder:

```tsx
// Configuration comes from ChaiBuilder design payload
const blockConfig = {
  heading: page.blocks.newsletter.heading,
  formEngineSetup: {
    formConfig: {
      endpoint: website.apiEndpoint,
      apiKey: website.apiKey,
      contactCategoryToken: page.blocks.newsletter.contactCategory,
      websiteId: website.id,
      format: "rails",
    },
  },
};

<CtaNewsletterFeatures {...blockConfig} />
```

## 6. Rails Contact API Integration (DashTrack)

For direct Rails API integration (outside of blocks), use the serializers from `@page-speed/forms`:

```tsx
import {
  serializeForRails,
  deserializeErrors,
  type RailsApiConfig,
  type RailsErrorResponse,
} from "@page-speed/forms/integration";

export async function submitContactForm(values: Record<string, unknown>) {
  const config: RailsApiConfig = {
    apiKey: process.env.NEXT_PUBLIC_DASHTRACK_API_KEY ?? "",
    websiteId: "979",
    contactCategoryToken: "newsletter-token",
  };

  const payload = serializeForRails(values, config);

  const response = await fetch("https://api.dashtrack.com/contacts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok || data.errors) {
    const formErrors = deserializeErrors(data);
    throw new Error(JSON.stringify(formErrors));
  }

  return data;
}
```

## 7. File Uploads

File uploads follow a two-step flow:

1. Upload files to `/contacts/_/contact_form_uploads`
2. Submit `contact_form_upload_tokens` with the main form payload

```tsx
import { useFileUpload } from "@page-speed/forms/upload";

const { upload, state } = useFileUpload({
  endpoint: "https://api.toastability.com/contacts/_/contact_form_uploads",
  format: "legacy",
  onComplete: (token) => {
    // Store tokens in form state
    const tokens = Array.isArray(token) ? token : [token];
    form.setFieldValue(
      "contact_form_upload_tokens",
      tokens.map((value) => `upload_${value}`)
    );
  },
});
```

## 8. Testing

### Testing Form Blocks

```tsx
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CtaNewsletterFeatures } from "@opensite/ui/blocks/cta";

test("submits newsletter form", async () => {
  const user = userEvent.setup();
  const mockSuccess = vi.fn();

  render(
    <CtaNewsletterFeatures
      heading="Subscribe"
      formEngineSetup={{
        formConfig: {
          endpoint: "/api/subscribe",
          format: "json",
        },
        onSuccess: mockSuccess,
      }}
    />
  );

  const input = screen.getByRole("textbox");
  await user.type(input, "test@example.com");

  const button = screen.getByRole("button");
  await user.click(button);

  await waitFor(() => {
    expect(mockSuccess).toHaveBeenCalled();
  });
});
```

### Testing with Mock API

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
```

## 9. Checklist for Adding Forms to New Blocks

1. **Import FormEngine and types**:
   ```tsx
   import {
     FormEngine,
     type FormEngineProps,
     type FormEngineStyleRules,
     type FormFieldConfig,
   } from "@page-speed/forms/integration";
   ```

2. **Define DEFAULT_STYLE_RULES** for the block's form container styling.

3. **Define DEFAULT_FORM_FIELDS** with appropriate field configurations.

4. **Add props to the block interface**:
   - `formEngineSetup?: FormEngineProps`
   - `buttonAction?: ActionConfig` (for newsletter/button-group forms)
   - `formSlot?: React.ReactNode` (escape hatch)
   - `formClassName?: string` (optional styling override)

5. **Implement `renderForm` using `React.useMemo`**:
   - Check for `formSlot` override first
   - Return `null` if no `formEngineSetup` provided
   - For newsletter forms, configure `formLayout: "button-group"`
   - For standard forms, use the simpler pattern

6. **Keep props JSON-serializable** for design payload compatibility.

7. **Test with both patterns**:
   - Generic JSON endpoint
   - DashTrack Rails integration

## 10. Performance Considerations

### Bundle Size

The FormEngine is optimized for minimal bundle impact:

- **Core library**: ~3KB gzipped
- **Field-level reactivity**: ~1 re-render per change
- **Tree-shakable**: Import only what you use

### Lazy Loading

For modals, consider lazy loading:

```tsx
import dynamic from "next/dynamic";

const OfferModal = dynamic(
  () => import("@opensite/ui/blocks/offer-modal").then(
    (m) => m.OfferModalNewsletterDiscount
  ),
  { ssr: false }
);
```

## Summary

The FormEngine-based approach in OpenSite UI provides:

- **Unified API**: All form blocks use `formEngineSetup` prop
- **Flexibility**: `buttonAction` for button customization, `formSlot` for full control
- **Universal**: Works in any React environment
- **Type-Safe**: Full TypeScript support
- **Performant**: Field-level reactivity, minimal re-renders
- **Accessible**: WCAG 2.1 AA compliant

Two primary patterns:

1. **Newsletter/Button-Group**: Single-field forms with inline submit button
2. **Standard**: Multi-field forms with grid layout and separate submit button

All blocks work consistently regardless of which backend you're integrating with (generic JSON, DashTrack Rails, etc.).
