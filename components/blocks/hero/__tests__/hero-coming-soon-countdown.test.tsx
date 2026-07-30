import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroComingSoonCountdown } from "../hero-coming-soon-countdown";

vi.mock("@page-speed/forms", () => ({
  Form: ({ children }: { children: React.ReactNode }) => (
    <form data-testid="mock-form">{children}</form>
  ),
}));

// Mock FormEngine component and form hooks
vi.mock("@page-speed/forms/integration", () => ({
  FormEngine: vi.fn(({ fields, formLayoutSettings, successMessage }) => (
    <div data-testid="mock-form-engine">
      <div data-testid="form-layout">{formLayoutSettings?.formLayout || "standard"}</div>
      <div data-testid="button-size">{formLayoutSettings?.buttonGroupSetup?.size || "default"}</div>
      <div data-testid="submit-label">{formLayoutSettings?.buttonGroupSetup?.submitLabel}</div>
      {successMessage && <div data-testid="success-message">{successMessage}</div>}
      {fields?.map((field: any) => (
        <input key={field.name} data-testid={`field-${field.name}`} placeholder={field.placeholder} />
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

vi.mock("framer-motion", () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  motion: {
    span: ({ children, ...props }: Record<string, unknown>) => <span {...props}>{children as React.ReactNode}</span>,
  },
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({
    name,
    className,
  }: {
    name?: React.ReactNode | string;
    className?: string;
  }) =>
    typeof name === "string" ? (
      <span data-testid="mock-icon" data-name={name} className={className}>
        icon
      </span>
    ) : (
      <>{name}</>
    ),
}));

vi.mock("@/src", () => ({
  Badge: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={className} data-testid="mock-badge">{children}</div>
  ),
  SocialLinkIcon: ({ href }: { href: string }) => (
    <a href={href} data-testid="mock-social-link">social</a>
  ),
}));

describe("HeroComingSoonCountdown", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<HeroComingSoonCountdown heading="Test Heading" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<HeroComingSoonCountdown heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<HeroComingSoonCountdown description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders buttonAction when provided", () => {
    const buttonAction = { label: "Notify Me", variant: "default" as const };
    render(<HeroComingSoonCountdown buttonAction={buttonAction} />);
    expect(screen.getByText("Notify Me")).toBeInTheDocument();
  });

  it("renders a trailing button icon name through DynamicIcon without exposing raw text", () => {
    render(
      <HeroComingSoonCountdown
        buttonAction={{
          label: "Notify Me",
          iconAfter: "lucide/bell",
        }}
      />,
    );

    expect(screen.getByTestId("mock-icon")).toHaveAttribute(
      "data-name",
      "lucide/bell",
    );
    expect(screen.queryByText("lucide/bell")).not.toBeInTheDocument();
  });

  it("preserves a custom trailing button icon element", () => {
    render(
      <HeroComingSoonCountdown
        buttonAction={{
          label: "Notify Me",
          iconAfter: <span data-testid="custom-trailing-icon">trailing</span>,
        }}
      />,
    );

    expect(screen.getByTestId("custom-trailing-icon")).toHaveTextContent("trailing");
  });

  it("preserves empty, false, zero, and children button semantics", () => {
    const { container, rerender } = render(
      <HeroComingSoonCountdown
        buttonAction={{ label: "Empty Icon", iconAfter: "" }}
      />,
    );

    expect(
      container.querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();

    rerender(
      <HeroComingSoonCountdown
        buttonAction={{ label: "False Icon", iconAfter: false }}
      />,
    );
    expect(
      container.querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();

    rerender(
      <HeroComingSoonCountdown
        buttonAction={{ label: "Zero Icon", iconAfter: 0 }}
      />,
    );
    const zeroAction = Array.from(
      container.querySelectorAll(
        '[data-slot="button"], [data-testid="mock-pressable"]',
      ),
    ).find((action) => action.textContent?.includes("Zero Icon"));
    expect(zeroAction).toHaveTextContent("Zero Icon0");

    rerender(
      <HeroComingSoonCountdown
        buttonAction={{
          label: "Generated Button Label",
          iconAfter: "lucide/bell",
          children: <span data-testid="button-replacement">Replacement</span>,
        }}
      />,
    );
    expect(screen.getByTestId("button-replacement")).toBeInTheDocument();
    expect(
      screen.queryByText("Generated Button Label"),
    ).not.toBeInTheDocument();
    expect(
      container.querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<HeroComingSoonCountdown heading="Test Heading" className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("renders countdown when countdownDate is in the future", () => {
    const futureDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000);
    render(<HeroComingSoonCountdown heading="Launch" countdownDate={futureDate} />);
    expect(screen.getByText("Days")).toBeInTheDocument();
    expect(screen.getByText("Hours")).toBeInTheDocument();
    expect(screen.getByText("Minutes")).toBeInTheDocument();
    expect(screen.getByText("Seconds")).toBeInTheDocument();
  });

  it("does not render countdown when countdownDate is in the past", () => {
    const pastDate = new Date(Date.now() - 1000);
    render(<HeroComingSoonCountdown heading="Launch" countdownDate={pastDate} />);
    expect(screen.queryByText("Days")).not.toBeInTheDocument();
  });

  it("does not render countdown when no countdownDate is provided", () => {
    render(<HeroComingSoonCountdown heading="Launch" />);
    expect(screen.queryByText("Days")).not.toBeInTheDocument();
  });
});
