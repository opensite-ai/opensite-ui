# OpenSite Forms Integration Guide

This guide describes the recommended way to use `@page-speed/forms` across the DashTrack ecosystem. It covers direct React usage, OpenSite UI blocks, opensite-blocks rendering, and file uploads.

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

## 2. Basic React Usage (Custom Forms)

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

## 3. Rails Contact API Integration (DashTrack)

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

## 4. OpenSite UI Blocks (Preconfigured Forms)

The following blocks now ship with `@page-speed/forms` preconfigured:

- `CtaAppDownloadNewsletter`
- `CtaNewsletterFeatures`
- `FooterNewsletterMinimal`
- `OfferModalMembershipImage`
- `OfferModalNewsletterDiscount`
- `OfferModalSheetNewsletter`

Each component accepts a `formConfig` prop to configure the submission endpoint and format:

```tsx
import { CtaNewsletterFeatures } from "@opensite/ui/blocks/cta/cta-newsletter-features";

<CtaNewsletterFeatures
  formConfig={{
    endpoint: "https://api.dashtrack.com/contacts",
    format: "rails",
    apiKey: "your-api-key",
    websiteId: "979",
    contactCategoryToken: "newsletter-token",
    values: { subject: "Newsletter Signup" },
  }}
  onSuccess={(data) => console.log("Submitted:", data)}
  onError={(error) => console.error(error)}
/>;
```

### `formConfig` Options

- `endpoint` (string): API endpoint to submit to.
- `method` ("post" | "get" | "put" | "patch"): HTTP method (defaults to `post`).
- `format` ("rails" | "json"): Submission format (defaults to `rails` when `apiKey` is present).
- `apiKey`, `websiteId`, `contactCategoryToken`, `locationId`, `websiteFormAssignmentId`, `visitorIpAddress`: Rails config fields.
- `headers`: Additional request headers.
- `values`: Static values merged into submission payload (e.g., subject, content, tags).
- `resetOnSuccess`: Reset form values after success (default: `true`).

If `formConfig.endpoint` is not provided, the block will only call the optional `onSubmit(email)` callback.

## 5. opensite-blocks Rendering (customer-sites)

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

## 6. File Uploads (e.g. CareersForm)

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

## 7. Adding New Forms (Checklist)

1. Define a strict `FormValues` type for the new form.
2. Initialize `useForm` with `initialValues` + `validationSchema`.
3. Render `<Form>` with `<Field>` + inputs from `@page-speed/forms/inputs`.
4. Create a submission helper:
   - **Rails**: use `serializeForRails` / `deserializeErrors` + a `FormSubmissionError`.
   - **Standard JSON**: submit raw values to a configured endpoint.
5. For uploads, use `useFileUpload` and store tokens as `upload_*` strings.
6. For OpenSite UI blocks, expose a `formConfig` prop and keep it JSON-serializable for `blockProps`.
7. Confirm base form styles are loaded.

## 8. Recommended Patterns

- Prefer `@page-speed/forms/inputs` to keep consistent BEM class names.
- Always map Rails errors with `deserializeErrors`.
- Store API credentials outside components (env or centralized config).
- Use `formConfig.values` to inject hidden metadata (subjects, tags, etc).
- Prefix upload tokens with `upload_` so Rails serialization can detect them.
