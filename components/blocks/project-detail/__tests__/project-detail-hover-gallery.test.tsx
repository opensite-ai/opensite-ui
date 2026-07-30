import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ProjectDetailHoverGallery } from "../project-detail-hover-gallery";

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

describe("ProjectDetailHoverGallery", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom title", () => {
    render(<ProjectDetailHoverGallery title="Interactive Installations" />);
    expect(screen.getByText("Interactive Installations")).toBeInTheDocument();
  });

  it("renders custom subtitle", () => {
    render(<ProjectDetailHoverGallery subtitle="Digital art experiences" />);
    expect(screen.getByText("Digital art experiences")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ProjectDetailHoverGallery description="A collection of interactive digital installations" />);
    expect(screen.getByText("A collection of interactive digital installations")).toBeInTheDocument();
  });

  it("renders category, year, and artist", () => {
    render(<ProjectDetailHoverGallery category="Digital Art" year="2024" artist="Tech Studio" />);
    expect(screen.getByText("Digital Art")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
    expect(screen.getByText("Tech Studio")).toBeInTheDocument();
  });

  it("renders images with hover info", () => {
    const images = [
      { src: "/img1.jpg", alt: "Installation 1", title: "Light Wave", description: "An immersive light experience" },
    ];
    render(<ProjectDetailHoverGallery images={images} />);
    expect(screen.getByText("Light Wave")).toBeInTheDocument();
    expect(screen.getByText("An immersive light experience")).toBeInTheDocument();
  });

  it("applies custom className to section", () => {
    const { container } = render(<ProjectDetailHoverGallery className="custom-class" title="Test Project" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("renders back action when provided", () => {
    render(<ProjectDetailHoverGallery backAction={{ label: "Back to Projects", href: "/projects" }} />);
    expect(screen.getByText("Back to Projects")).toBeInTheDocument();
  });

  it("renders both back action icon names dynamically without leaking raw names", () => {
    render(
      <ProjectDetailHoverGallery
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
      <ProjectDetailHoverGallery
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
      <ProjectDetailHoverGallery
        backAction={{ label: "Falsy", icon: "", iconAfter: false }}
      />,
    );

    action = screen.getByTestId("mock-pressable");
    expect(action.textContent).toBe("Falsy");
    expect(within(action).queryByTestId("mock-icon")).not.toBeInTheDocument();
  });

  it("preserves complete children overrides and the back action slot", () => {
    const { rerender } = render(
      <ProjectDetailHoverGallery
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
      <ProjectDetailHoverGallery
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
      <ProjectDetailHoverGallery
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
      <ProjectDetailHoverGallery
        backAction={{ label: "Ignored", icon: "lucide/ignored-leading" }}
        backActionSlot={<span data-testid="action-slot">Slot action</span>}
      />,
    );
    expect(screen.getByTestId("action-slot")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-pressable")).not.toBeInTheDocument();
    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
  });

  it("keeps gallery media and hover copy on their original paths", () => {
    render(
      <ProjectDetailHoverGallery
        images={[
          {
            src: "/hover.jpg",
            alt: "Hover gallery media",
            title: "lucide/hover-title",
            description: "Hover description",
          },
        ]}
      />,
    );

    expect(screen.getByAltText("Hover gallery media")).toHaveAttribute(
      "data-testid",
      "mock-img",
    );
    expect(screen.getByText("lucide/hover-title")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
  });
});
