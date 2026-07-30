import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ProjectDetailSplitMaterials } from "../project-detail-split-materials";

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

describe("ProjectDetailSplitMaterials", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom title", () => {
    render(<ProjectDetailSplitMaterials title="Ergonomic Chair" />);
    expect(screen.getByText("Ergonomic Chair")).toBeInTheDocument();
  });

  it("renders custom subtitle", () => {
    render(<ProjectDetailSplitMaterials subtitle="Premium office furniture" />);
    expect(screen.getByText("Premium office furniture")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ProjectDetailSplitMaterials description="A revolutionary ergonomic chair designed for all-day comfort" />);
    expect(screen.getByText("A revolutionary ergonomic chair designed for all-day comfort")).toBeInTheDocument();
  });

  it("renders category, year, and artist", () => {
    render(<ProjectDetailSplitMaterials category="Furniture Design" year="2024" artist="Design Studio" />);
    expect(screen.getByText("Furniture Design")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
    expect(screen.getByText("Design Studio")).toBeInTheDocument();
  });

  it("renders specifications table", () => {
    const specifications = [
      { label: "Material", value: "Recycled aluminum" },
      { label: "Weight", value: "35 lbs" },
    ];
    render(<ProjectDetailSplitMaterials specifications={specifications} />);
    expect(screen.getByText("Specifications")).toBeInTheDocument();
    expect(screen.getByText("Material")).toBeInTheDocument();
    expect(screen.getByText("Recycled aluminum")).toBeInTheDocument();
  });

  it("renders materials list", () => {
    const materials = ["Aluminum", "Mesh fabric"];
    render(<ProjectDetailSplitMaterials materials={materials} />);
    expect(screen.getByText("Materials")).toBeInTheDocument();
    expect(screen.getByText("Aluminum")).toBeInTheDocument();
    expect(screen.getByText("Mesh fabric")).toBeInTheDocument();
  });

  it("applies custom className to section", () => {
    const { container } = render(<ProjectDetailSplitMaterials className="custom-class" title="Test Project" />);
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
      <ProjectDetailSplitMaterials backAction={generatedAction} />,
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
      <ProjectDetailSplitMaterials
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
      <ProjectDetailSplitMaterials
        backAction={{ label: "Empty", icon: "", iconAfter: "" }}
      />,
    );
    action = screen.getByTestId("mock-pressable");
    expect(action).toHaveTextContent("Empty");
    expect(action.querySelector('[data-testid^="mock-icon-"]')).not.toBeInTheDocument();

    rerender(
      <ProjectDetailSplitMaterials
        backAction={{ label: "Boundary", icon: false, iconAfter: 0 }}
      />,
    );
    action = screen.getByTestId("mock-pressable");
    expect(action).toHaveTextContent("Boundary0");
    expect(action.querySelector('[data-testid^="mock-icon-"]')).not.toBeInTheDocument();

    rerender(
      <ProjectDetailSplitMaterials
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
        <ProjectDetailSplitMaterials
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
      <ProjectDetailSplitMaterials
        backAction={generatedAction}
        backActionSlot={false}
      />,
    );
    expect(screen.getByText("Back to Projects")).toBeInTheDocument();

    rerender(
      <ProjectDetailSplitMaterials
        backAction={generatedAction}
        backActionSlot={<div data-testid="back-action-slot">Custom slot</div>}
      />,
    );
    expect(screen.getByTestId("back-action-slot")).toHaveTextContent("Custom slot");
    expect(screen.queryByTestId("mock-pressable")).not.toBeInTheDocument();

    rerender(<ProjectDetailSplitMaterials backActionSlot={false} />);
    expect(screen.queryByTestId("mock-pressable")).not.toBeInTheDocument();
  });

  it("keeps hero and secondary image strings on the Img media path", () => {
    const { container } = render(
      <ProjectDetailSplitMaterials
        heroImage={{ src: "lucide/hero-media", alt: "Hero media" }}
        secondaryImage={{
          src: "lucide/secondary-media",
          alt: "Secondary media",
        }}
      />,
    );

    expect(screen.getByAltText("Hero media")).toHaveAttribute(
      "src",
      "lucide/hero-media",
    );
    expect(screen.getByAltText("Secondary media")).toHaveAttribute(
      "src",
      "lucide/secondary-media",
    );
    expect(
      container.querySelector('[data-name="lucide/hero-media"]'),
    ).not.toBeInTheDocument();
    expect(
      container.querySelector('[data-name="lucide/secondary-media"]'),
    ).not.toBeInTheDocument();
  });
});
