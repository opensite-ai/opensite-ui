import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ProjectDetailLargeHeroFeatured } from "../project-detail-large-hero-featured";

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

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(100).fill("/placeholder.jpg"),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name }: { name?: React.ReactNode }) =>
    typeof name === "string" ? (
      <span data-testid="mock-icon" data-name={name}>
        icon
      </span>
    ) : (
      <>{name}</>
    ),
}));

describe("ProjectDetailLargeHeroFeatured", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom title", () => {
    render(<ProjectDetailLargeHeroFeatured title="Epic Journey" />);
    expect(screen.getByText("Epic Journey")).toBeInTheDocument();
  });

  it("renders custom subtitle", () => {
    render(<ProjectDetailLargeHeroFeatured subtitle="A documentary project" />);
    expect(screen.getByText("A documentary project")).toBeInTheDocument();
  });

  it("renders project details", () => {
    const details = [
      { label: "Duration", value: "6 months" },
      { label: "Location", value: "Global" },
    ];
    render(<ProjectDetailLargeHeroFeatured details={details} />);
    expect(screen.getByText("Duration")).toBeInTheDocument();
    expect(screen.getByText("6 months")).toBeInTheDocument();
    expect(screen.getByText("Location")).toBeInTheDocument();
    expect(screen.getByText("Global")).toBeInTheDocument();
  });

  it("renders content sections", () => {
    const sections = [
      { title: "The Beginning", content: "It all started with a dream" },
    ];
    render(<ProjectDetailLargeHeroFeatured sections={sections} />);
    expect(screen.getByText("The Beginning")).toBeInTheDocument();
    expect(screen.getByText("It all started with a dream")).toBeInTheDocument();
  });

  it("applies custom className to section", () => {
    const { container } = render(<ProjectDetailLargeHeroFeatured className="custom-class" title="Test Project" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("renders back action when provided", () => {
    render(<ProjectDetailLargeHeroFeatured backAction={{ label: "Back to Projects", href: "/projects" }} />);
    expect(screen.getByText("Back to Projects")).toBeInTheDocument();
  });

  it("renders both back action icon names dynamically without leaking raw names", () => {
    render(
      <ProjectDetailLargeHeroFeatured
        backAction={{
          label: "Back",
          icon: "lucide/arrow-left",
          iconAfter: "lucide/arrow-right",
        }}
      />,
    );

    const action = screen.getByTestId("mock-pressable");
    expect(
      within(action)
        .getAllByTestId("mock-icon")
        .map((icon) => icon.getAttribute("data-name")),
    ).toEqual(["lucide/arrow-left", "lucide/arrow-right"]);
    expect(action).not.toHaveTextContent("lucide/arrow-left");
    expect(action).not.toHaveTextContent("lucide/arrow-right");
    expect(action.textContent).toBe("iconBackicon");
  });

  it("preserves custom, empty, false, and zero back action icon values", () => {
    const { rerender } = render(
      <ProjectDetailLargeHeroFeatured
        backAction={{
          label: "Mixed",
          icon: <span data-testid="custom-icon">custom</span>,
          iconAfter: 0,
        }}
      />,
    );

    let action = screen.getByTestId("mock-pressable");
    expect(within(action).getByTestId("custom-icon")).toBeInTheDocument();
    expect(action.textContent).toBe("customMixed0");
    expect(within(action).queryByTestId("mock-icon")).not.toBeInTheDocument();

    rerender(
      <ProjectDetailLargeHeroFeatured
        backAction={{ label: "Falsy", icon: "", iconAfter: false }}
      />,
    );

    action = screen.getByTestId("mock-pressable");
    expect(action.textContent).toBe("Falsy");
    expect(within(action).queryByTestId("mock-icon")).not.toBeInTheDocument();
  });

  it("preserves complete children overrides and the back action slot", () => {
    const { rerender } = render(
      <ProjectDetailLargeHeroFeatured
        backAction={{
          label: "Ignored",
          icon: "lucide/ignored-leading",
          iconAfter: "lucide/ignored-trailing",
          children: <span data-testid="action-children">Custom action</span>,
        }}
      />,
    );

    let action = screen.getByTestId("mock-pressable");
    expect(within(action).getByTestId("action-children")).toBeInTheDocument();
    expect(action.textContent).toBe("Custom action");
    expect(within(action).queryByTestId("mock-icon")).not.toBeInTheDocument();

    rerender(
      <ProjectDetailLargeHeroFeatured
        backAction={{
          label: "Ignored",
          icon: "lucide/ignored-leading",
          iconAfter: "lucide/ignored-trailing",
          children: false,
        }}
      />,
    );
    action = screen.getByTestId("mock-pressable");
    expect(action).toBeEmptyDOMElement();

    rerender(
      <ProjectDetailLargeHeroFeatured
        backAction={{
          label: "Ignored",
          icon: "lucide/ignored-leading",
          iconAfter: "lucide/ignored-trailing",
          children: 0,
        }}
      />,
    );
    action = screen.getByTestId("mock-pressable");
    expect(action.textContent).toBe("0");
    expect(within(action).queryByTestId("mock-icon")).not.toBeInTheDocument();

    rerender(
      <ProjectDetailLargeHeroFeatured
        backAction={{ label: "Ignored", icon: "lucide/ignored-leading" }}
        backActionSlot={<span data-testid="action-slot">Slot action</span>}
      />,
    );
    expect(screen.getByTestId("action-slot")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-pressable")).not.toBeInTheDocument();
    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
  });

  it("keeps hero and gallery media on their Img paths", () => {
    render(
      <ProjectDetailLargeHeroFeatured
        heroImage={{ src: "/hero.jpg", alt: "Featured hero media" }}
        galleryImages={[{ src: "/gallery.jpg", alt: "Featured gallery media" }]}
      />,
    );

    expect(screen.getByAltText("Featured hero media")).toHaveAttribute(
      "data-testid",
      "mock-img",
    );
    expect(screen.getByAltText("Featured gallery media")).toHaveAttribute(
      "data-testid",
      "mock-img",
    );
    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
  });
});
