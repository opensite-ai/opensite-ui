import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { LogosPartnerNetwork } from "../logos-partner-network";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({
    name,
    size,
    className,
  }: {
    name?: React.ReactNode | string;
    size?: number;
    className?: string;
  }) =>
    typeof name === "string" ? (
      <span
        data-testid="mock-dynamic-icon"
        data-name={name}
        data-size={size}
        className={className}
      />
    ) : (
      <>{name}</>
    ),
}));

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">{children}</a>
  ),
}));

vi.mock("../../../ui/badge", () => ({
  Badge: ({ children, variant, className }: { children: React.ReactNode; variant?: string; className?: string }) => (
    <span data-variant={variant} className={className} data-testid="mock-badge">{children}</span>
  ),
}));

describe("LogosPartnerNetwork", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom badge, title, and description", () => {
    render(
      <LogosPartnerNetwork
        badge="Custom Badge"
        title="Custom Title"
        description="Custom Description"
      />
    );
    expect(screen.getByText("Custom Badge")).toBeInTheDocument();
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText("Custom Description")).toBeInTheDocument();
  });

  it("renders custom button text", () => {
    render(<LogosPartnerNetwork actions={[{ label: "Join Now", href: "/join", variant: "default" }]} />);
    expect(screen.getByText("Join Now")).toBeInTheDocument();
  });

  it("renders custom logos", () => {
    const customLogos = [
      { name: "Network Partner 1", logo: "/network1.png" },
      { name: "Network Partner 2", logo: "/network2.png" },
    ];
    render(<LogosPartnerNetwork logos={customLogos} />);
    expect(screen.getByAltText("Network Partner 1 logo")).toBeInTheDocument();
    expect(screen.getByAltText("Network Partner 2 logo")).toBeInTheDocument();
  });

  it("handles empty logos array with explicit content", () => {
    render(
      <LogosPartnerNetwork
        title="Trusted by industry leaders"
        description="Join our growing network"
        logos={[]}
      />
    );
    expect(screen.getByText("Trusted by industry leaders")).toBeInTheDocument();
  });

  it("routes action icon names while preserving existing action composition", () => {
    const { container } = render(
      <LogosPartnerNetwork
        actions={[
          {
            label: "String action",
            href: "/string",
            icon: "lucide/network",
            iconAfter: "lucide/arrow-right",
            className: "custom-action",
          },
          {
            label: "Custom action",
            href: "/custom",
            icon: <span data-testid="custom-leading-icon" />,
            iconAfter: <span data-testid="custom-trailing-icon" />,
          },
          {
            label: "Sentinel action",
            href: "/sentinel",
            icon: 0,
            iconAfter: false,
          },
          {
            label: "Empty action",
            href: "/empty",
            icon: "",
            iconAfter: "",
          },
          {
            label: "Children stay ignored",
            href: "/children",
            icon: "lucide/check",
            children: <span data-testid="ignored-action-children" />,
          },
        ]}
      />,
    );

    const stringAction = container.querySelector(
      '[href="/string"]',
    ) as HTMLElement;
    expect(
      within(stringAction).getAllByTestId("mock-dynamic-icon").map((icon) =>
        icon.getAttribute("data-name"),
      ),
    ).toEqual(["lucide/network", "lucide/arrow-right"]);
    expect(stringAction).not.toHaveTextContent("lucide/network");
    expect(stringAction).not.toHaveTextContent("lucide/arrow-right");
    expect(stringAction).toHaveClass("custom-action");

    const customAction = container.querySelector(
      '[href="/custom"]',
    ) as HTMLElement;
    expect(
      within(customAction).getByTestId("custom-leading-icon"),
    ).toBeInTheDocument();
    expect(
      within(customAction).getByTestId("custom-trailing-icon"),
    ).toBeInTheDocument();

    const sentinelAction = container.querySelector(
      '[href="/sentinel"]',
    ) as HTMLElement;
    expect(sentinelAction).toHaveTextContent("0Sentinel action");
    expect(
      within(sentinelAction).queryByTestId("mock-dynamic-icon"),
    ).not.toBeInTheDocument();

    const emptyAction = container.querySelector(
      '[href="/empty"]',
    ) as HTMLElement;
    expect(
      within(emptyAction).queryByTestId("mock-dynamic-icon"),
    ).not.toBeInTheDocument();

    const childrenAction = container.querySelector(
      '[href="/children"]',
    ) as HTMLElement;
    expect(
      within(childrenAction).queryByTestId("ignored-action-children"),
    ).not.toBeInTheDocument();
    expect(childrenAction).toHaveTextContent("Children stay ignored");
    expect(
      within(childrenAction).getByTestId("mock-dynamic-icon"),
    ).toHaveAttribute("data-name", "lucide/check");
  });
});
