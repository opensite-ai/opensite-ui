import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { LogosCertificationsGrid } from "../logos-certifications-grid";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">{children}</a>
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

describe("LogosCertificationsGrid", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom title and description", () => {
    render(
      <LogosCertificationsGrid
        title="Custom Title"
        description="Custom Description"
      />
    );
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText("Custom Description")).toBeInTheDocument();
  });

  it("renders custom button text and url", () => {
    render(
      <LogosCertificationsGrid
        actions={[{ label: "Contact Us", href: "/contact", variant: "default" }]}
      />
    );
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
  });

  it("renders custom logos", () => {
    const customLogos = [
      { id: "cert-1", description: "Certification 1", image: "/cert1.png" },
      { id: "cert-2", description: "Certification 2", image: "/cert2.png" },
    ];
    render(<LogosCertificationsGrid logos={customLogos} />);
    expect(screen.getByAltText("Certification 1")).toBeInTheDocument();
    expect(screen.getByAltText("Certification 2")).toBeInTheDocument();
  });

  it("handles empty logos array with explicit title", () => {
    render(
      <LogosCertificationsGrid
        title="Our certifications say it all."
        description="Recognized excellence"
        logos={[]}
      />
    );
    expect(screen.getByText("Our certifications say it all.")).toBeInTheDocument();
  });

  it("resolves action icon strings without rendering their raw names", () => {
    render(
      <LogosCertificationsGrid
        actions={[
          {
            label: "String action",
            href: "/string",
            icon: "lucide/action-before",
            iconAfter: "lucide/action-after",
          },
        ]}
      />,
    );

    const action = screen
      .getByText("String action")
      .closest('[data-testid="mock-pressable"]') as HTMLElement;
    expect(
      action.querySelector('[data-name="lucide/action-before"]'),
    ).toBeInTheDocument();
    expect(
      action.querySelector('[data-name="lucide/action-after"]'),
    ).toBeInTheDocument();
    expect(action).not.toHaveTextContent("lucide/action-before");
    expect(action).not.toHaveTextContent("lucide/action-after");
  });

  it("preserves custom, empty, false, and zero action icon semantics", () => {
    const { container } = render(
      <LogosCertificationsGrid
        actions={[
          {
            label: "Custom action",
            href: "/custom",
            icon: <span data-testid="custom-action-before">before</span>,
            iconAfter: <span data-testid="custom-action-after">after</span>,
          },
          {
            label: "Empty action",
            href: "/empty",
            icon: "",
            iconAfter: "",
          },
          {
            label: "Scalar action",
            href: "/scalar",
            icon: 0,
            iconAfter: false,
          },
        ]}
      />,
    );

    const customAction = container.querySelector(
      'a[href="/custom"]',
    ) as HTMLElement;
    expect(customAction).toContainElement(
      screen.getByTestId("custom-action-before"),
    );
    expect(customAction).toContainElement(
      screen.getByTestId("custom-action-after"),
    );

    const emptyAction = container.querySelector(
      'a[href="/empty"]',
    ) as HTMLElement;
    expect(
      emptyAction.querySelector('[data-testid="mock-icon"]'),
    ).not.toBeInTheDocument();

    const scalarAction = container.querySelector(
      'a[href="/scalar"]',
    ) as HTMLElement;
    expect(scalarAction.textContent).toContain("0");
    expect(
      scalarAction.querySelector('[data-testid="mock-icon"]'),
    ).not.toBeInTheDocument();
  });
});
