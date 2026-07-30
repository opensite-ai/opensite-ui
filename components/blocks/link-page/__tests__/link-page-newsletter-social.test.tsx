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
  DynamicIcon: ({
    name,
    className,
    size,
  }: {
    name?: React.ReactNode;
    className?: string;
    size?: number;
  }) =>
    typeof name === "string" ? (
      <span
        data-testid="mock-icon"
        data-name={name}
        data-size={size}
        className={className}
      >
        icon
      </span>
    ) : (
      <>{name}</>
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

  it("renders avatars with responsive containment", () => {
    render(<LinkPageNewsletterSocial name="Test" avatarUrl="/logo-wide.png" />);

    expect(screen.getByAltText("Test")).toHaveClass(
      "h-auto",
      "max-h-24",
      "w-auto",
      "max-w-full",
      "object-contain",
    );
  });

  it("routes link, chevron, form, and footer icon strings through DynamicIcon", () => {
    render(
      <LinkPageNewsletterSocial
        name="Test"
        formEngineSetup={{ fields: [] }}
        buttonAction={{
          label: "Join Now",
          iconAfter: "lucide/send",
        }}
        links={[
          {
            id: "website",
            label: "Website",
            icon: "lucide/globe",
            href: "https://example.com",
          },
        ]}
        linkChevronIcon="lucide/arrow-up-right"
        linkIconClassName="link-icon-class"
        footerAction={{
          label: "Footer action",
          icon: "lucide/footer-before",
          iconAfter: "lucide/footer-after",
        }}
      />,
    );

    const submitLabel = screen.getByTestId("submit-label");
    expect(
      submitLabel.querySelector('[data-name="lucide/send"]'),
    ).toBeInTheDocument();
    expect(submitLabel).not.toHaveTextContent("lucide/send");

    const link = screen
      .getByText("Website")
      .closest('[data-testid="mock-pressable"]') as HTMLElement;
    const linkIcon = link.querySelector('[data-name="lucide/globe"]');
    expect(linkIcon).toHaveAttribute("data-size", "18");
    expect(linkIcon).toHaveClass("link-icon-class");
    expect(
      link.querySelector('[data-name="lucide/arrow-up-right"]'),
    ).toHaveAttribute("data-size", "16");
    expect(link).not.toHaveTextContent("lucide/globe");
    expect(link).not.toHaveTextContent("lucide/arrow-up-right");

    const footer = screen
      .getByText("Footer action")
      .closest('[data-testid="mock-pressable"]') as HTMLElement;
    expect(
      footer.querySelector('[data-name="lucide/footer-before"]'),
    ).toBeInTheDocument();
    expect(
      footer.querySelector('[data-name="lucide/footer-after"]'),
    ).toBeInTheDocument();
    expect(footer).not.toHaveTextContent("lucide/footer-before");
    expect(footer).not.toHaveTextContent("lucide/footer-after");
  });

  it("preserves custom icons and falsy link and chevron fallback semantics", () => {
    const { rerender } = render(
      <LinkPageNewsletterSocial
        name="Test"
        formEngineSetup={{ fields: [] }}
        buttonAction={{
          label: "Join Now",
          iconAfter: <span data-testid="custom-submit-icon">submit</span>,
        }}
        links={[
          {
            id: "custom",
            label: "Custom link",
            icon: <span data-testid="custom-link-icon">link</span>,
            iconName: "lucide/custom-fallback",
          },
          {
            id: "empty",
            label: "Empty link",
            icon: "",
            iconName: "lucide/empty-fallback",
          },
        ]}
        linkChevronIcon={
          <span data-testid="custom-chevron-icon">chevron</span>
        }
        footerAction={{
          label: "Custom footer",
          icon: <span data-testid="custom-footer-before">before</span>,
          iconAfter: <span data-testid="custom-footer-after">after</span>,
        }}
      />,
    );

    expect(screen.getByTestId("custom-submit-icon")).toBeInTheDocument();
    const customLink = screen
      .getByText("Custom link")
      .closest('[data-testid="mock-pressable"]') as HTMLElement;
    expect(customLink).toContainElement(screen.getByTestId("custom-link-icon"));
    expect(customLink).toContainElement(
      screen.getAllByTestId("custom-chevron-icon")[0],
    );
    expect(
      customLink.querySelector('[data-name="lucide/custom-fallback"]'),
    ).not.toBeInTheDocument();

    const emptyLink = screen
      .getByText("Empty link")
      .closest('[data-testid="mock-pressable"]') as HTMLElement;
    expect(
      emptyLink.querySelector('[data-name="lucide/empty-fallback"]'),
    ).toBeInTheDocument();

    const footer = screen
      .getByText("Custom footer")
      .closest('[data-testid="mock-pressable"]') as HTMLElement;
    expect(footer).toContainElement(screen.getByTestId("custom-footer-before"));
    expect(footer).toContainElement(screen.getByTestId("custom-footer-after"));

    rerender(
      <LinkPageNewsletterSocial
        name="Test"
        links={[{ id: "empty-chevron", label: "No chevron" }]}
        linkChevronIcon=""
      />,
    );
    const emptyChevronLink = screen
      .getByText("No chevron")
      .closest('[data-testid="mock-pressable"]') as HTMLElement;
    expect(
      emptyChevronLink.querySelector('[data-name="lucide/chevron-right"]'),
    ).not.toBeInTheDocument();

    rerender(
      <LinkPageNewsletterSocial
        name="Test"
        links={[{ id: "zero-chevron", label: "Zero chevron" }]}
        linkChevronIcon={0}
      />,
    );
    const zeroChevronLink = screen
      .getByText("Zero chevron")
      .closest('[data-testid="mock-pressable"]') as HTMLElement;
    expect(zeroChevronLink.textContent).toContain("0");
  });
});
