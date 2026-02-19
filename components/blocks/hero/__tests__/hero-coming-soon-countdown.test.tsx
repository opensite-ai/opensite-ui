import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroComingSoonCountdown } from "../hero-coming-soon-countdown";

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
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
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
