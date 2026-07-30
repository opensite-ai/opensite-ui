import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ProjectDetailHeroMetadata } from "../project-detail-hero-metadata";

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

describe("ProjectDetailHeroMetadata", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom title", () => {
    render(<ProjectDetailHeroMetadata title="Test Project" />);
    expect(screen.getByText("Test Project")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ProjectDetailHeroMetadata description="A test project description" />);
    expect(screen.getByText("A test project description")).toBeInTheDocument();
  });

  it("renders category, client, and year metadata", () => {
    render(<ProjectDetailHeroMetadata category="Digital Art" client="Jane Smith" year="2024" />);
    expect(screen.getByText("Digital Art")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
  });

  it("renders action button when provided", () => {
    render(<ProjectDetailHeroMetadata action={{ label: "View Project", href: "/projects/test" }} />);
    expect(screen.getByText("View Project")).toBeInTheDocument();
  });

  it("applies custom className to section", () => {
    const { container } = render(<ProjectDetailHeroMetadata className="custom-class" title="Test Project" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("renders subtitle", () => {
    render(<ProjectDetailHeroMetadata subtitle="Lead Designer" />);
    expect(screen.getByText("Lead Designer")).toBeInTheDocument();
  });

  it("renders both action icon names dynamically without leaking raw names", () => {
    render(
      <ProjectDetailHeroMetadata
        action={{
          label: "Visit",
          icon: "lucide/external-link",
          iconAfter: "lucide/arrow-right",
        }}
      />,
    );

    const action = screen.getByTestId("mock-pressable");
    expect(
      within(action)
        .getAllByTestId("mock-icon")
        .map((icon) => icon.getAttribute("data-name")),
    ).toEqual(["lucide/external-link", "lucide/arrow-right"]);
    expect(action).not.toHaveTextContent("lucide/external-link");
    expect(action).not.toHaveTextContent("lucide/arrow-right");
    expect(action.textContent).toBe("iconVisiticon");
  });

  it("preserves custom, empty, false, and zero action icon values", () => {
    const { rerender } = render(
      <ProjectDetailHeroMetadata
        action={{
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
      <ProjectDetailHeroMetadata
        action={{ label: "Falsy", icon: "", iconAfter: false }}
      />,
    );

    action = screen.getByTestId("mock-pressable");
    expect(action.textContent).toBe("Falsy");
    expect(within(action).queryByTestId("mock-icon")).not.toBeInTheDocument();
  });

  it("preserves complete children overrides and the action slot", () => {
    const { rerender } = render(
      <ProjectDetailHeroMetadata
        action={{
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
      <ProjectDetailHeroMetadata
        action={{
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
      <ProjectDetailHeroMetadata
        action={{
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
      <ProjectDetailHeroMetadata
        action={{ label: "Ignored", icon: "lucide/ignored-leading" }}
        actionSlot={<span data-testid="action-slot">Slot action</span>}
      />,
    );
    expect(screen.getByTestId("action-slot")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-pressable")).not.toBeInTheDocument();
    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
  });

  it("keeps hero media on the Img path", () => {
    render(
      <ProjectDetailHeroMetadata
        heroImage={{ src: "/hero.jpg", alt: "Project hero media" }}
      />,
    );

    expect(screen.getByAltText("Project hero media")).toHaveAttribute(
      "data-testid",
      "mock-img",
    );
    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
  });
});
