import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ProjectDetailSculptureShowcase } from "../project-detail-sculpture-showcase";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../../lib/Pressable", () => ({
  Pressable: ({
    children,
    href,
    className,
    "aria-label": ariaLabel,
  }: {
    children: React.ReactNode;
    href?: string;
    className?: string;
    "aria-label"?: string;
  }) => (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      data-testid="mock-pressable"
    >
      {children}
    </a>
  ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(100).fill("/placeholder.jpg"),
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
        data-testid={`mock-icon-${name}`}
        data-name={name}
        data-size={size}
        className={className}
      />
    ) : (
      <>{name}</>
    ),
}));

describe("ProjectDetailSculptureShowcase", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom title", () => {
    render(<ProjectDetailSculptureShowcase title="Metamorphosis" />);
    expect(screen.getByText("Metamorphosis")).toBeInTheDocument();
  });

  it("renders custom subtitle", () => {
    render(<ProjectDetailSculptureShowcase subtitle="A bronze sculpture" />);
    expect(screen.getByText("A bronze sculpture")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ProjectDetailSculptureShowcase description="A transformative piece exploring change and growth" />);
    expect(screen.getByText("A transformative piece exploring change and growth")).toBeInTheDocument();
  });

  it("renders artist and metadata", () => {
    render(
      <ProjectDetailSculptureShowcase
        artist="John Doe"
        materials="Bronze, Steel"
        dimensions="48 x 24 x 36 inches"
        location="Modern Art Museum"
      />
    );
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Bronze, Steel")).toBeInTheDocument();
    expect(screen.getByText("48 x 24 x 36 inches")).toBeInTheDocument();
    expect(screen.getByText("Modern Art Museum")).toBeInTheDocument();
  });

  it("renders category and year", () => {
    render(<ProjectDetailSculptureShowcase category="Sculpture" year="2024" />);
    expect(screen.getByText("Sculpture")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
  });

  it("applies custom className to section", () => {
    const { container } = render(<ProjectDetailSculptureShowcase className="custom-class" title="Test Project" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("routes both back-action icons and preserves nullish children and slots", () => {
    const generatedAction = {
      label: "Back to Projects",
      href: "/projects",
      className: "action-class",
      "aria-label": "Back control",
      icon: "lucide/arrow-left",
      iconAfter: "lucide/arrow-right",
    };
    const { container, rerender } = render(
      <ProjectDetailSculptureShowcase backAction={generatedAction} />,
    );

    let action = screen.getByTestId("mock-pressable");
    expect(action).toHaveAttribute("href", "/projects");
    expect(action).toHaveAttribute("aria-label", "Back control");
    expect(action).toHaveClass("inline-flex", "action-class");
    expect(action.childNodes).toHaveLength(3);
    expect(action.childNodes[0]).toHaveAttribute("data-name", "lucide/arrow-left");
    expect(action.childNodes[1]?.textContent).toBe("Back to Projects");
    expect(action.childNodes[2]).toHaveAttribute("data-name", "lucide/arrow-right");
    expect(within(action).queryByText("lucide/arrow-left")).not.toBeInTheDocument();
    expect(within(action).queryByText("lucide/arrow-right")).not.toBeInTheDocument();

    rerender(
      <ProjectDetailSculptureShowcase
        backAction={{
          label: "Custom",
          icon: <span data-testid="custom-leading-icon" />,
          iconAfter: <span data-testid="custom-trailing-icon" />,
        }}
      />,
    );
    expect(screen.getByTestId("custom-leading-icon")).toBeInTheDocument();
    expect(screen.getByTestId("custom-trailing-icon")).toBeInTheDocument();

    rerender(
      <ProjectDetailSculptureShowcase
        backAction={{ label: "Empty", icon: "", iconAfter: "" }}
      />,
    );
    action = screen.getByTestId("mock-pressable");
    expect(action).toHaveTextContent("Empty");
    expect(action.querySelector('[data-testid^="mock-icon-"]')).not.toBeInTheDocument();

    rerender(
      <ProjectDetailSculptureShowcase
        backAction={{ label: "Boundary", icon: false, iconAfter: 0 }}
      />,
    );
    action = screen.getByTestId("mock-pressable");
    expect(action).toHaveTextContent("Boundary0");
    expect(action.querySelector('[data-testid^="mock-icon-"]')).not.toBeInTheDocument();

    rerender(
      <ProjectDetailSculptureShowcase
        backAction={{
          ...generatedAction,
          children: <span data-testid="custom-children">Replacement</span>,
        }}
      />,
    );
    action = screen.getByTestId("mock-pressable");
    expect(within(action).getByTestId("custom-children")).toBeInTheDocument();
    expect(within(action).queryByText("Back to Projects")).not.toBeInTheDocument();
    expect(
      container.querySelector('[data-name="lucide/arrow-left"]'),
    ).not.toBeInTheDocument();
    expect(
      container.querySelector('[data-name="lucide/arrow-right"]'),
    ).not.toBeInTheDocument();

    for (const children of [0, false, ""] as const) {
      rerender(
        <ProjectDetailSculptureShowcase
          backAction={{ ...generatedAction, children }}
        />,
      );
      action = screen.getByTestId("mock-pressable");
      expect(action.textContent).toBe(children === 0 ? "0" : "");
      expect(
        action.querySelector('[data-testid^="mock-icon-"]'),
      ).not.toBeInTheDocument();
    }

    rerender(
      <ProjectDetailSculptureShowcase
        backAction={generatedAction}
        backActionSlot={false}
      />,
    );
    expect(screen.getByText("Back to Projects")).toBeInTheDocument();

    rerender(
      <ProjectDetailSculptureShowcase
        backAction={generatedAction}
        backActionSlot={<div data-testid="back-action-slot">Custom slot</div>}
      />,
    );
    expect(screen.getByTestId("back-action-slot")).toHaveTextContent("Custom slot");
    expect(screen.queryByTestId("mock-pressable")).not.toBeInTheDocument();

    rerender(<ProjectDetailSculptureShowcase backActionSlot={false} />);
    expect(screen.queryByTestId("mock-pressable")).not.toBeInTheDocument();
  });

  it("keeps hero and gallery image strings on the Img media path", () => {
    const { container } = render(
      <ProjectDetailSculptureShowcase
        heroImage={{ src: "lucide/hero-media", alt: "Hero media" }}
        galleryImages={[{ src: "lucide/gallery-media", alt: "Gallery media" }]}
      />,
    );

    expect(screen.getByAltText("Hero media")).toHaveAttribute(
      "src",
      "lucide/hero-media",
    );
    expect(screen.getByAltText("Gallery media")).toHaveAttribute(
      "src",
      "lucide/gallery-media",
    );
    expect(
      container.querySelector('[data-name="lucide/hero-media"]'),
    ).not.toBeInTheDocument();
    expect(
      container.querySelector('[data-name="lucide/gallery-media"]'),
    ).not.toBeInTheDocument();
  });
});
