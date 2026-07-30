import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CtaVideoBackgroundHero } from "../cta-video-background-hero";

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">{children}</a>
  ),
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
      <span data-testid="mock-icon" data-name={name} className={className} />
    ) : (
      <>{name}</>
    ),
}));

describe("CtaVideoBackgroundHero", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<CtaVideoBackgroundHero heading="Test Heading" description="Test Description" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<CtaVideoBackgroundHero heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<CtaVideoBackgroundHero description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [
      { label: "Get Started", href: "/start", variant: "secondary" as const },
      { label: "Watch Demo", href: "#", variant: "outline" as const },
    ];
    render(<CtaVideoBackgroundHero actions={actions} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
    expect(screen.getByText("Watch Demo")).toBeInTheDocument();
  });

  it("renders action icon names and custom nodes without raw text", () => {
    render(
      <CtaVideoBackgroundHero
        actions={[
          {
            label: "Custom icons",
            href: "/custom",
            icon: "lucide/sparkles",
            iconAfter: <span data-testid="custom-trailing-icon" />,
          },
        ]}
      />,
    );

    const action = screen.getByRole("link", { name: "Custom icons" });

    expect(screen.getByTestId("mock-icon")).toHaveAttribute(
      "data-name",
      "lucide/sparkles",
    );
    expect(action).not.toHaveTextContent("lucide/sparkles");
    expect(screen.getByTestId("custom-trailing-icon")).toBeInTheDocument();
  });

  it("preserves nullish defaults and empty, false, and zero sentinels", () => {
    render(
      <CtaVideoBackgroundHero
        actions={[
          { label: "Default trailing", href: "/first" },
          { label: "Watch Demo", href: "/demo" },
          { label: "Empty", href: "/empty", icon: "", iconAfter: "" },
          { label: "False", href: "/false", icon: false, iconAfter: false },
          { label: "Zero", href: "/zero", icon: 0, iconAfter: 0 },
        ]}
      />,
    );

    expect(
      screen
        .getAllByTestId("mock-icon")
        .map((icon) => icon.getAttribute("data-name")),
    ).toEqual(["lucide/arrow-right", "lucide/play"]);
    expect(screen.getByRole("link", { name: "Empty" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "False" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Zero/ })).toHaveTextContent(
      "0Zero0",
    );
  });

  it("lets children replace only the label between action icons", () => {
    render(
      <CtaVideoBackgroundHero
        actions={[
          {
            label: "Generated label",
            href: "/children",
            icon: "lucide/arrow-left",
            iconAfter: "lucide/arrow-right",
            children: <span>Custom label</span>,
          },
        ]}
      />,
    );

    const action = screen.getByRole("link", { name: "Custom label" });

    expect(screen.queryByText("Generated label")).not.toBeInTheDocument();
    expect(
      screen
        .getAllByTestId("mock-icon")
        .map((icon) => icon.getAttribute("data-name")),
    ).toEqual(["lucide/arrow-left", "lucide/arrow-right"]);
    expect(action.children[0]).toHaveAttribute("data-name", "lucide/arrow-left");
    expect(action.children[1]).toHaveTextContent("Custom label");
    expect(action.children[2]).toHaveAttribute(
      "data-name",
      "lucide/arrow-right",
    );
  });

  it("applies custom className", () => {
    const { container } = render(<CtaVideoBackgroundHero className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
