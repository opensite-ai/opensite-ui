import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactFaq } from "../contact-faq";

vi.mock("@page-speed/forms", () => ({
  Form: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => <form className={className}>{children}</form>,
}));

vi.mock("@page-speed/forms/integration", () => ({
  FormEngine: vi.fn(({ fields, formLayoutSettings, successMessage }) => (
    <div data-testid="mock-form-engine">
      <div data-testid="form-layout">{formLayoutSettings?.formLayout || "standard"}</div>
      {fields?.map((field: any) => (
        <div key={field.name} data-testid={`field-${field.name}`}>
          <label htmlFor={field.name}>{field.label ?? field.name}</label>
          <input id={field.name} aria-label={field.label ?? field.name} />
        </div>
      ))}
    </div>
  )),
  getColumnSpanClass: () => "col-span-12",
  DynamicFormField: ({
    field,
  }: {
    field: { name: string; label?: string };
  }) => (
    <div>
      <label htmlFor={field.name}>{field.label ?? field.name}</label>
      <input id={field.name} aria-label={field.label ?? field.name} />
    </div>
  ),
  useFileUpload: () => ({
    uploadTokens: [],
    uploadProgress: {},
    isUploading: false,
    uploadFiles: vi.fn(),
    removeFile: vi.fn(),
    resetUpload: vi.fn(),
  }),
  useContactForm: () => ({
    form: {
      isSubmitting: false,
      status: "idle",
      handleSubmit: async (event?: Event) => event?.preventDefault?.(),
      resetForm: vi.fn(),
      getFieldMeta: vi.fn(() => ({ touched: false, error: null })),
      getFieldProps: vi.fn(() => ({ value: "", onChange: vi.fn() })),
    },
    isSubmitted: false,
    submissionError: null,
    formMethod: "post",
    resetSubmissionState: vi.fn(),
  }),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

const mockFaqItems = [
  { id: "faq-1", question: "What is your return policy?", answer: "You can return within 30 days." },
  { id: "faq-2", question: "How do I contact support?", answer: "Email us at support@example.com." },
  { id: "faq-3", question: "Where are you located?", answer: "We are based in New York City." },
];

describe("ContactFaq", () => {
  it("renders with provided props", () => {
    const { container } = render(
      <ContactFaq
        heading="Test Heading"
        description="Test Description"
        buttonText="Test Button"
      />
    );
    expect(container).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<ContactFaq className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("renders FAQ items in an accordion", () => {
    render(
      <ContactFaq
        heading="Need Help?"
        items={mockFaqItems}
        faqHeading="Frequently Asked Questions"
        buttonText="Send"
      />
    );
    expect(screen.getByText("Frequently Asked Questions")).toBeInTheDocument();
    expect(screen.getByText("What is your return policy?")).toBeInTheDocument();
    expect(screen.getByText("How do I contact support?")).toBeInTheDocument();
    expect(screen.getByText("Where are you located?")).toBeInTheDocument();
  });

  it("uses two-column grid layout when FAQ items are provided", () => {
    const { container } = render(
      <ContactFaq
        heading="Help"
        items={mockFaqItems}
        buttonText="Submit"
      />
    );
    const gridDiv = container.querySelector(".lg\\:grid-cols-2");
    expect(gridDiv).toBeInTheDocument();
  });

  it("uses single-column layout when no FAQ items are provided", () => {
    const { container } = render(
      <ContactFaq heading="Help" buttonText="Submit" />
    );
    const gridDiv = container.querySelector(".lg\\:grid-cols-1");
    expect(gridDiv).toBeInTheDocument();
    const twoColGrid = container.querySelector(".lg\\:grid-cols-2");
    expect(twoColGrid).not.toBeInTheDocument();
  });

  it("renders form with FormEngine", () => {
    render(<ContactFaq buttonText="Submit" />);
    expect(screen.getByTestId("mock-form-engine")).toBeInTheDocument();
  });
});
