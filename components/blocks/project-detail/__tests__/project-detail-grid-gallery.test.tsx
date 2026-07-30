import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ProjectDetailGridGallery } from "../project-detail-grid-gallery";

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

describe("ProjectDetailGridGallery", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom title", () => {
    render(<ProjectDetailGridGallery title="Summer Collection" />);
    expect(screen.getByText("Summer Collection")).toBeInTheDocument();
  });

  it("renders custom subtitle", () => {
    render(<ProjectDetailGridGallery subtitle="Fashion forward designs" />);
    expect(screen.getByText("Fashion forward designs")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ProjectDetailGridGallery description="Our latest summer fashion collection" />);
    expect(screen.getByText("Our latest summer fashion collection")).toBeInTheDocument();
  });

  it("renders category, year, and artist", () => {
    render(<ProjectDetailGridGallery category="Fashion" year="2024" artist="Jane Doe" />);
    expect(screen.getByText("Fashion")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
  });

  it("renders creative process section", () => {
    render(<ProjectDetailGridGallery creativeProcess="Inspired by nature and movement" />);
    expect(screen.getByText("Inspired by nature and movement")).toBeInTheDocument();
    expect(screen.getByText("Creative Process")).toBeInTheDocument();
  });

  it("applies custom className to section", () => {
    const { container } = render(<ProjectDetailGridGallery className="custom-class" title="Test Project" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("renders back action when provided", () => {
    render(<ProjectDetailGridGallery backAction={{ label: "Back to Projects", href: "/projects" }} />);
    expect(screen.getByText("Back to Projects")).toBeInTheDocument();
  });

  it("renders both back action icon names dynamically without leaking raw names", () => {
    render(
      <ProjectDetailGridGallery
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
      <ProjectDetailGridGallery
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
      <ProjectDetailGridGallery
        backAction={{ label: "Falsy", icon: "", iconAfter: false }}
      />,
    );

    action = screen.getByTestId("mock-pressable");
    expect(action.textContent).toBe("Falsy");
    expect(within(action).queryByTestId("mock-icon")).not.toBeInTheDocument();
  });

  it("preserves complete children overrides and the back action slot", () => {
    const { rerender } = render(
      <ProjectDetailGridGallery
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
      <ProjectDetailGridGallery
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
      <ProjectDetailGridGallery
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
      <ProjectDetailGridGallery
        backAction={{ label: "Ignored", icon: "lucide/ignored-leading" }}
        backActionSlot={<span data-testid="action-slot">Slot action</span>}
      />,
    );
    expect(screen.getByTestId("action-slot")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-pressable")).not.toBeInTheDocument();
    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
  });

  it("keeps gallery media and captions on their original paths", () => {
    render(
      <ProjectDetailGridGallery
        images={[
          {
            src: "/gallery.jpg",
            alt: "Gallery media",
            caption: "lucide/gallery-caption",
          },
        ]}
      />,
    );

    expect(screen.getByAltText("Gallery media")).toHaveAttribute(
      "data-testid",
      "mock-img",
    );
    expect(screen.getByText("lucide/gallery-caption")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
  });
});
