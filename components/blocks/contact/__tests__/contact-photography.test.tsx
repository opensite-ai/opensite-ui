import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactPhotography } from "../contact-photography";

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

describe("ContactPhotography", () => {
  it("renders with provided props", () => {
    const { container } = render(
      <ContactPhotography
        heading="Test Heading"
        description="Test Description"
        buttonText="Test Button"
      />
    );
    expect(container).toBeInTheDocument();
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<ContactPhotography className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("renders split-screen layout with image", () => {
    const { container } = render(
      <ContactPhotography
        heading="Studio Contact"
        imageSrc="/studio.jpg"
        imageAlt="Studio photo"
      />
    );
    const img = container.querySelector("img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("alt", "Studio photo");
  });

  it("renders without image when imageSrc is not provided", () => {
    const { container } = render(
      <ContactPhotography heading="Contact Us" />
    );
    const img = container.querySelector("img");
    expect(img).not.toBeInTheDocument();
  });

  it("renders form fields directly without card wrapper", () => {
    const { container } = render(
      <ContactPhotography heading="Contact Us" buttonText="Send" />
    );
    // Form should exist but not inside a card
    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(container.querySelector('[class*="card"]')).not.toBeInTheDocument();
  });

  it("renders form fields in a 12-column grid layout", () => {
    const { container } = render(<ContactPhotography buttonText="Send" />);
    expect(container.querySelector(".grid-cols-12")).toBeInTheDocument();
  });
});
