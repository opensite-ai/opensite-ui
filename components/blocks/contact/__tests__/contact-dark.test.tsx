import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactDark } from "../contact-dark";

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

describe("ContactDark", () => {

  it("renders custom heading", () => {
    render(<ContactDark heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ContactDark description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders custom button text", () => {
    render(<ContactDark buttonText="Custom Button" />);
    expect(screen.getByText("Custom Button")).toBeInTheDocument();
  });

  it("renders form fields in a 12-column grid layout", () => {
    const { container } = render(<ContactDark />);
    expect(container.querySelector(".grid-cols-12")).toBeInTheDocument();
  });
});
