import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ProjectDetailMinimalCentered } from "../project-detail-minimal-centered";

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

describe("ProjectDetailMinimalCentered", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom title", () => {
    render(<ProjectDetailMinimalCentered title="Quiet Moments" />);
    expect(screen.getByText("Quiet Moments")).toBeInTheDocument();
  });

  it("renders custom subtitle", () => {
    render(<ProjectDetailMinimalCentered subtitle="A meditation on stillness" />);
    expect(screen.getByText("A meditation on stillness")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ProjectDetailMinimalCentered description="A photographic series exploring moments of peace" />);
    expect(screen.getByText("A photographic series exploring moments of peace")).toBeInTheDocument();
  });

  it("renders category, year, and artist", () => {
    render(<ProjectDetailMinimalCentered category="Photography" year="2024" artist="John Doe" />);
    expect(screen.getByText("Photography")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("renders images", () => {
    const images = [
      { src: "/img1.jpg", alt: "Image 1" },
      { src: "/img2.jpg", alt: "Image 2" },
    ];
    render(<ProjectDetailMinimalCentered images={images} />);
    expect(screen.getByAltText("Image 1")).toBeInTheDocument();
    expect(screen.getByAltText("Image 2")).toBeInTheDocument();
  });

  it("applies custom className to section", () => {
    const { container } = render(<ProjectDetailMinimalCentered className="custom-class" title="Test Project" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("renders back action when provided", () => {
    render(<ProjectDetailMinimalCentered backAction={{ label: "Back to Projects", href: "/projects" }} />);
    expect(screen.getByText("Back to Projects")).toBeInTheDocument();
  });

  it("renders both back action icon names dynamically without leaking raw names", () => {
    render(
      <ProjectDetailMinimalCentered
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
      <ProjectDetailMinimalCentered
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
      <ProjectDetailMinimalCentered
        backAction={{ label: "Falsy", icon: "", iconAfter: false }}
      />,
    );

    action = screen.getByTestId("mock-pressable");
    expect(action.textContent).toBe("Falsy");
    expect(within(action).queryByTestId("mock-icon")).not.toBeInTheDocument();
  });

  it("preserves complete children overrides and the back action slot", () => {
    const { rerender } = render(
      <ProjectDetailMinimalCentered
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
      <ProjectDetailMinimalCentered
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
      <ProjectDetailMinimalCentered
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
      <ProjectDetailMinimalCentered
        backAction={{ label: "Ignored", icon: "lucide/ignored-leading" }}
        backActionSlot={<span data-testid="action-slot">Slot action</span>}
      />,
    );
    expect(screen.getByTestId("action-slot")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-pressable")).not.toBeInTheDocument();
    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
  });

  it("keeps project media on the Img path", () => {
    render(
      <ProjectDetailMinimalCentered
        images={[{ src: "/project.jpg", alt: "Centered project media" }]}
      />,
    );

    expect(screen.getByAltText("Centered project media")).toHaveAttribute(
      "data-testid",
      "mock-img",
    );
    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
  });
});
