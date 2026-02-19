import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroSplitImageNewsletter } from "../hero-split-image-newsletter";

// Mock FormEngine component and form hooks
vi.mock("@page-speed/forms/integration", () => ({
  FormEngine: vi.fn(({ fields, formLayoutSettings, successMessage }) => (
    <div data-testid="mock-form-engine">
      <div data-testid="form-layout">{formLayoutSettings?.formLayout || "standard"}</div>
      <div data-testid="button-size">{formLayoutSettings?.buttonGroupSetup?.size || "default"}</div>
      <div data-testid="submit-label">{formLayoutSettings?.buttonGroupSetup?.submitLabel}</div>
      {successMessage && <div data-testid="success-message">{successMessage}</div>}
      {fields?.map((field: any) => (
        <div key={field.name} data-testid={`field-${field.name}`}>
          <label>{field.label}</label>
          <input placeholder={field.placeholder} />
        </div>
      ))}
    </div>
  )),
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

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("HeroSplitImageNewsletter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<HeroSplitImageNewsletter heading="Test Heading" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<HeroSplitImageNewsletter heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<HeroSplitImageNewsletter description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders form fields when provided", () => {
    const formFields = [{ name: "email", type: "email" as const, label: "Email", placeholder: "Enter your email", required: true, columnSpan: 12 }];
    render(<HeroSplitImageNewsletter formFields={formFields} />);
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<HeroSplitImageNewsletter heading="Test Heading" className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
