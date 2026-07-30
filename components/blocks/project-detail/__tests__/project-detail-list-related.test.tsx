import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ProjectDetailListRelated } from "../project-detail-list-related";

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

describe("ProjectDetailListRelated", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom title", () => {
    render(<ProjectDetailListRelated title="Brand Identity" />);
    expect(screen.getByText("Brand Identity")).toBeInTheDocument();
  });

  it("renders custom subtitle", () => {
    render(<ProjectDetailListRelated subtitle="Complete brand system" />);
    expect(screen.getByText("Complete brand system")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ProjectDetailListRelated description="A comprehensive brand identity system" />);
    expect(screen.getByText("A comprehensive brand identity system")).toBeInTheDocument();
  });

  it("renders category and year", () => {
    render(<ProjectDetailListRelated category="Branding" year="2024" />);
    expect(screen.getByText("Branding")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
  });

  it("renders related projects", () => {
    const relatedProjects = [
      { title: "Website Design", category: "Web", year: "2024", src: "/thumb1.jpg", alt: "Website", href: "/projects/website" },
      { title: "App Design", category: "Mobile", year: "2023", src: "/thumb2.jpg", alt: "App", href: "/projects/app" },
    ];
    render(<ProjectDetailListRelated relatedProjects={relatedProjects} />);
    expect(screen.getByText("Website Design")).toBeInTheDocument();
    expect(screen.getByText("App Design")).toBeInTheDocument();
    expect(screen.getByText("Related Collections")).toBeInTheDocument();
  });

  it("applies custom className to section", () => {
    const { container } = render(<ProjectDetailListRelated className="custom-class" title="Test Project" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("renders back action when provided", () => {
    render(<ProjectDetailListRelated backAction={{ label: "Back to Projects", href: "/projects" }} />);
    expect(screen.getByText("Back to Projects")).toBeInTheDocument();
  });

  it("renders both back action icon names dynamically without leaking raw names", () => {
    render(
      <ProjectDetailListRelated
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
      <ProjectDetailListRelated
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
      <ProjectDetailListRelated
        backAction={{ label: "Falsy", icon: "", iconAfter: false }}
      />,
    );

    action = screen.getByTestId("mock-pressable");
    expect(action.textContent).toBe("Falsy");
    expect(within(action).queryByTestId("mock-icon")).not.toBeInTheDocument();
  });

  it("preserves complete children overrides and the back action slot", () => {
    const { rerender } = render(
      <ProjectDetailListRelated
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
      <ProjectDetailListRelated
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
      <ProjectDetailListRelated
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
      <ProjectDetailListRelated
        backAction={{ label: "Ignored", icon: "lucide/ignored-leading" }}
        backActionSlot={<span data-testid="action-slot">Slot action</span>}
      />,
    );
    expect(screen.getByTestId("action-slot")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-pressable")).not.toBeInTheDocument();
    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
  });

  it("keeps project and related media on their original Img paths", () => {
    render(
      <ProjectDetailListRelated
        images={[{ src: "/project.jpg", alt: "Project media" }]}
        relatedProjects={[
          {
            title: "Related",
            category: "Branding",
            year: "2024",
            src: "/related.jpg",
            alt: "Related media",
          },
        ]}
      />,
    );

    expect(screen.getByAltText("Project media")).toHaveAttribute(
      "data-testid",
      "mock-img",
    );
    expect(screen.getByAltText("Related media")).toHaveAttribute(
      "data-testid",
      "mock-img",
    );
    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
  });
});
