import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { LinkPageNewsletterSocial } from "../link-page-newsletter-social";

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
      const effectiveFields =
        formEngineSetup?.fields ?? fields ?? defaultFields;

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
}));

vi.mock("@page-speed/img", () => ({
  Img: ({
    src,
    alt,
    className,
  }: {
    src: string;
    alt: string;
    className?: string;
  }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../../lib/Pressable", () => ({
  Pressable: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href?: string;
    className?: string;
  }) => (
    <a href={href} className={className} data-testid="mock-pressable">
      {children}
    </a>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>
      icon
    </span>
  ),
}));

vi.mock("../../../ui/social-link-icon", () => ({
  SocialLinkIcon: ({
    href,
    label,
    className,
  }: {
    href: string;
    label?: string;
    className?: string;
  }) => (
    <a
      href={href}
      aria-label={label}
      className={className}
      data-testid="mock-social-link"
    >
      social
    </a>
  ),
}));

describe("LinkPageNewsletterSocial", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders FormEngine with button-group layout and lg size", () => {
    render(
      <LinkPageNewsletterSocial
        name="Test"
        formEngineSetup={{ fields: [] }}
        buttonAction={{ label: "Join Now", variant: "default" }}
      />,
    );
    expect(screen.getByTestId("form-layout")).toHaveTextContent("button-group");
    expect(screen.getByTestId("button-size")).toHaveTextContent("lg");
  });

  it("renders buttonAction label in FormEngine submit label", () => {
    render(
      <LinkPageNewsletterSocial
        name="Test"
        formEngineSetup={{ fields: [] }}
        buttonAction={{ label: "Join Now", variant: "default" }}
      />,
    );
    expect(screen.getByTestId("submit-label")).toHaveTextContent("Join Now");
  });

  it("renders links when provided", () => {
    const links = [{ id: "1", label: "Website", href: "https://example.com" }];
    render(<LinkPageNewsletterSocial name="Test" links={links} />);
    expect(screen.getByText("Website")).toBeInTheDocument();
  });

  it("renders default email field when formEngineSetup is provided without fields", () => {
    render(<LinkPageNewsletterSocial name="Test" formEngineSetup={{}} />);
    expect(screen.getByTestId("field-email")).toBeInTheDocument();
    expect(screen.getByTestId("field-email")).toHaveAttribute(
      "placeholder",
      "Enter your email",
    );
  });

  it("does not render FormEngine when formEngineSetup is not provided", () => {
    render(<LinkPageNewsletterSocial name="Test" />);
    expect(screen.queryByTestId("mock-form-engine")).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <LinkPageNewsletterSocial name="Test" className="custom-class" />,
    );
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
