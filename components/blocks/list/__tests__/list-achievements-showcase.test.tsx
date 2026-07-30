import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ListAchievementsShowcase } from "../list-achievements-showcase";
import type { ListAchievementItem } from "../list-achievements-showcase";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({
    name,
    className,
    size,
  }: {
    name?: React.ReactNode;
    className?: string;
    size?: number;
  }) =>
    typeof name === "string" ? (
      <span
        data-testid="mock-icon"
        data-name={name}
        data-size={size}
        className={className}
      >
        icon
      </span>
    ) : (
      <>{name}</>
    ),
}));

describe("ListAchievementsShowcase", () => {
  const mockItems: ListAchievementItem[] = [
    {
      icon: "lucide/trophy",
      title: "Industry Recognition",
      category: "Achievement",
      description: "Outstanding Performance Award.",
      action: { href: "/achievements/recognition", label: "View project" },
    },
    {
      icon: "lucide/award",
      title: "Excellence Award",
      category: "Recognition",
      description: "Best in Category Winner.",
      action: { href: "/achievements/excellence", label: "View project" },
    },
  ];

  it("renders custom heading", () => {
    render(<ListAchievementsShowcase heading="Custom Heading" items={[]} />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom items correctly", () => {
    render(<ListAchievementsShowcase items={mockItems} />);
    expect(screen.getByText("Industry Recognition")).toBeInTheDocument();
    expect(screen.getByText("Excellence Award")).toBeInTheDocument();
    expect(screen.getByText("Outstanding Performance Award.")).toBeInTheDocument();
    expect(screen.getByText("Best in Category Winner.")).toBeInTheDocument();
  });

  it("renders category labels", () => {
    render(<ListAchievementsShowcase items={mockItems} />);
    expect(screen.getByText("Achievement")).toBeInTheDocument();
    expect(screen.getByText("Recognition")).toBeInTheDocument();
  });

  it("renders action buttons with correct text", () => {
    // Items have their own actions, so they use those labels
    render(<ListAchievementsShowcase items={mockItems} />);
    const buttons = screen.getAllByText("View project");
    expect(buttons.length).toBe(2);
  });

  it("renders links with correct href", () => {
    render(<ListAchievementsShowcase items={mockItems} />);
    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "/achievements/recognition");
    expect(links[1]).toHaveAttribute("href", "/achievements/excellence");
  });

  it("applies custom className", () => {
    const { container } = render(
      <ListAchievementsShowcase items={mockItems} className="custom-class" />
    );
    const section = container.firstChild as HTMLElement;
    expect(section.className).toContain("custom-class");
  });

  it("applies default padding classes", () => {
    const { container } = render(<ListAchievementsShowcase items={mockItems} />);
    const section = container.firstChild as HTMLElement;
    expect(section.className).toContain("py-32");
  });

  it("renders separators between items", () => {
    const { container } = render(<ListAchievementsShowcase items={mockItems} />);
    const separators = container.querySelectorAll("[data-slot='separator']");
    expect(separators.length).toBeGreaterThan(0);
  });

  it("renders with empty items array", () => {
    const { container } = render(<ListAchievementsShowcase items={[]} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders items without icons", () => {
    const itemsWithoutIcons: ListAchievementItem[] = [
      {
        title: "Test Achievement",
        category: "Test",
        description: "Test description",
        action: { href: "#", label: "View project" },
      },
    ];
    render(<ListAchievementsShowcase items={itemsWithoutIcons} />);
    expect(screen.getByText("Test Achievement")).toBeInTheDocument();
  });

  it("renders correct grid layout", () => {
    const { container } = render(<ListAchievementsShowcase items={mockItems} />);
    const gridItems = container.querySelectorAll(".grid.items-center");
    expect(gridItems.length).toBe(2);
  });

  it("supports string and custom achievement icons with the existing wrapper and size", () => {
    render(
      <ListAchievementsShowcase
        itemIconClassName="achievement-icon-wrapper"
        items={[
          { title: "String achievement", icon: "lucide/trophy" },
          {
            title: "Custom achievement",
            icon: <span data-testid="custom-achievement-icon">custom</span>,
          },
        ]}
      />,
    );

    const stringRow = screen
      .getByText("String achievement")
      .closest(".grid.items-center") as HTMLElement;
    const stringIcon = stringRow.querySelector('[data-name="lucide/trophy"]');
    expect(stringIcon).toHaveAttribute("data-size", "24");
    expect(stringIcon?.parentElement).toHaveClass(
      "achievement-icon-wrapper",
      "h-14",
      "w-16",
    );
    expect(stringRow).not.toHaveTextContent("lucide/trophy");

    const customRow = screen
      .getByText("Custom achievement")
      .closest(".grid.items-center") as HTMLElement;
    expect(customRow).toContainElement(
      screen.getByTestId("custom-achievement-icon"),
    );
    expect(
      screen.getByTestId("custom-achievement-icon").parentElement,
    ).toHaveClass("achievement-icon-wrapper", "h-14", "w-16");
  });

  it("resolves action icons and preserves suffix fallback and scalar semantics", () => {
    render(
      <ListAchievementsShowcase
        items={[
          {
            title: "String action item",
            action: {
              label: "String action",
              href: "/string",
              icon: "lucide/action-before",
              iconAfter: "lucide/action-after",
            },
          },
          {
            title: "Fallback action item",
            action: { label: "Fallback action", href: "/fallback" },
          },
          {
            title: "Empty action item",
            action: {
              label: "Empty action",
              href: "/empty",
              icon: "",
              iconAfter: "",
            },
          },
          {
            title: "Scalar action item",
            action: {
              label: "Scalar action",
              href: "/scalar",
              icon: 0,
              iconAfter: false,
            },
          },
          {
            title: "Custom action item",
            action: {
              label: "Custom action",
              href: "/custom",
              icon: <span data-testid="custom-action-before">before</span>,
              iconAfter: <span data-testid="custom-action-after">after</span>,
            },
          },
        ]}
      />,
    );

    const stringAction = screen.getByText("String action").closest("a") as HTMLElement;
    expect(
      stringAction.querySelector('[data-name="lucide/action-before"]'),
    ).toBeInTheDocument();
    expect(
      stringAction.querySelector('[data-name="lucide/action-after"]'),
    ).toBeInTheDocument();
    expect(stringAction).not.toHaveTextContent("lucide/action-before");
    expect(stringAction).not.toHaveTextContent("lucide/action-after");

    const fallbackAction = screen
      .getByText("Fallback action")
      .closest("a") as HTMLElement;
    expect(
      fallbackAction.querySelector('[data-name="lucide/arrow-right"]'),
    ).toHaveAttribute("data-size", "16");

    const emptyAction = screen.getByText("Empty action").closest("a") as HTMLElement;
    expect(
      emptyAction.querySelector('[data-testid="mock-icon"]'),
    ).not.toBeInTheDocument();

    const scalarAction = screen
      .getByText("Scalar action")
      .closest("a") as HTMLElement;
    expect(scalarAction.textContent).toContain("0");
    expect(
      scalarAction.querySelector('[data-testid="mock-icon"]'),
    ).not.toBeInTheDocument();

    const customAction = screen
      .getByText("Custom action")
      .closest("a") as HTMLElement;
    expect(customAction).toContainElement(
      screen.getByTestId("custom-action-before"),
    );
    expect(customAction).toContainElement(
      screen.getByTestId("custom-action-after"),
    );
  });

  it("keeps custom action children authoritative over icon fields", () => {
    render(
      <ListAchievementsShowcase
        items={[
          {
            title: "Children action item",
            action: {
              label: "Hidden label",
              href: "/children",
              icon: "lucide/hidden-before",
              iconAfter: "lucide/hidden-after",
              children: <span>Custom action children</span>,
            },
          },
        ]}
      />,
    );

    const action = screen
      .getByText("Custom action children")
      .closest("a") as HTMLElement;
    expect(
      action.querySelector('[data-name="lucide/hidden-before"]'),
    ).not.toBeInTheDocument();
    expect(
      action.querySelector('[data-name="lucide/hidden-after"]'),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Hidden label")).not.toBeInTheDocument();
  });
});
