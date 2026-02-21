import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroNewsletterMinimal } from "../hero-newsletter-minimal";

// Mock FormEngine component and form hooks
vi.mock("@page-speed/forms/integration", () => ({
  FormEngine: vi.fn(
    ({
      formEngineSetup,
      fields,
      formLayoutSettings,
      successMessage,
      defaultFields,
    }) => {
      const effectiveFormLayoutSettings =
        formEngineSetup?.formLayoutSettings ?? formLayoutSettings;
      const effectiveSuccessMessage =
        formEngineSetup?.successMessage ?? successMessage;
      const effectiveFields = formEngineSetup?.fields ?? fields ?? defaultFields;

      return (
        <div data-testid="mock-form-engine">
          <div data-testid="form-layout">
            {effectiveFormLayoutSettings?.formLayout || "standard"}
          </div>
          <div data-testid="button-size">
            {effectiveFormLayoutSettings?.buttonGroupSetup?.size || "default"}
          </div>
          <div data-testid="submit-label">
            {effectiveFormLayoutSettings?.buttonGroupSetup?.submitLabel}
          </div>
          {effectiveSuccessMessage && (
            <div data-testid="success-message">{effectiveSuccessMessage}</div>
          )}
          {effectiveFields?.map((field: any) => (
            <input
              key={field.name}
              data-testid={`field-${field.name}`}
              placeholder={field.placeholder}
            />
          ))}
        </div>
      );
    },
  ),
  useContactForm: vi.fn(() => ({
    form: {
      handleSubmit: vi.fn(),
      isSubmitting: false,
      getFieldProps: vi.fn(() => ({ value: "", onChange: vi.fn() })),
      getFieldMeta: vi.fn(() => ({ touched: false, error: null })),
    },
    submissionError: null,
    formMethod: "post" as const,
    resetSubmissionState: vi.fn(),
  })),
  useFileUpload: vi.fn(() => ({
    uploadTokens: [],
    uploadProgress: {},
    isUploading: false,
    uploadFiles: vi.fn(),
    removeFile: vi.fn(),
    resetUpload: vi.fn(),
  })),
  DynamicFormField: vi.fn(() => <div data-testid="mock-dynamic-field" />),
  getColumnSpanClass: vi.fn((span) => `col-span-${span}`),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

describe("HeroNewsletterMinimal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<HeroNewsletterMinimal heading="Test Heading" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<HeroNewsletterMinimal heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<HeroNewsletterMinimal description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders FormEngine with button-group layout and lg size", () => {
    render(<HeroNewsletterMinimal formEngineSetup={{ fields: [] }} />);
    expect(screen.getByTestId("form-layout")).toHaveTextContent("button-group");
    expect(screen.getByTestId("button-size")).toHaveTextContent("lg");
  });

  it("renders buttonAction label in FormEngine", () => {
    const buttonAction = { label: "Subscribe Now", variant: "default" as const };
    render(<HeroNewsletterMinimal buttonAction={buttonAction} formEngineSetup={{ fields: [] }} />);
    expect(screen.getByTestId("submit-label")).toHaveTextContent("Subscribe Now");
  });

  it("applies custom className", () => {
    const { container } = render(<HeroNewsletterMinimal heading="Test Heading" className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
