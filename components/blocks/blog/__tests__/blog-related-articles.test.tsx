import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { BlogRelatedArticles } from "../blog-related-articles";

// Mock dependencies
vi.mock("../../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className, asButton }: { children: React.ReactNode; href?: string; className?: string; asButton?: boolean }) => (
    asButton ? (
      <button className={className} data-testid="mock-pressable">{children}</button>
    ) : (
      <a href={href} className={className} data-testid="mock-pressable">{children}</a>
    )
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({
    name,
    size,
    className,
  }: {
    name?: React.ReactNode;
    size?: number;
    className?: string;
  }) =>
    typeof name === "string" ? (
      <span
        data-testid="mock-icon"
        data-name={name}
        data-size={size}
        className={className}
      />
    ) : (
      <>{name}</>
    ),
}));

describe("BlogRelatedArticles", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom heading", () => {
    render(
      <BlogRelatedArticles
        heading="Custom Heading"
      />
    );
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom articles", () => {
    const customArticles = [
      {
        id: 1,
        title: "Custom Article",
        description: "Custom description",
        date: "January 1, 2025",
        category: "Custom Category",
        link: "/custom",
      },
    ];

    render(<BlogRelatedArticles articles={customArticles} />);
    expect(screen.getByText("Custom Article")).toBeInTheDocument();
    expect(screen.getByText("Custom description")).toBeInTheDocument();
    expect(screen.getByText("Custom Category")).toBeInTheDocument();
  });

  it("handles empty articles array", () => {
    render(
      <BlogRelatedArticles
        heading="Test Heading"
        articles={[]}
      />
    );
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
    // Articles container should be empty when no articles are provided
    const articlesContainer = document.querySelector(".grid");
    expect(articlesContainer?.children.length ?? 0).toBe(0);
  });

  it("renders flexible see-all icons while preserving article content and slots", () => {
    const articles = [
      {
        id: "boundary-article",
        title: "Boundary article",
        description: "lucide/content-looking-copy",
        category: "Boundary Category",
        date: "January 1, 2025",
        href: "/boundary",
      },
    ];
    const { container, rerender } = render(
      <BlogRelatedArticles
        articles={articles}
        seeAllAction={{
          label: "See all",
          href: "/all",
          icon: "lucide/arrow-left",
          iconAfter: "lucide/arrow-right",
          className: "see-all-action",
        }}
      />,
    );

    let action = container.querySelector(".see-all-action") as HTMLElement;
    expect(
      within(action)
        .getAllByTestId("mock-icon")
        .map((icon) => icon.getAttribute("data-name")),
    ).toEqual(["lucide/arrow-left", "lucide/arrow-right"]);
    expect(action).not.toHaveTextContent("lucide/arrow-left");
    expect(action).not.toHaveTextContent("lucide/arrow-right");
    expect(screen.getByText("Boundary Category")).toBeInTheDocument();
    expect(screen.getByText("January 1, 2025")).toBeInTheDocument();
    expect(screen.getByText("lucide/content-looking-copy")).toBeInTheDocument();
    expect(
      container.querySelector('[data-name="lucide/content-looking-copy"]'),
    ).not.toBeInTheDocument();

    rerender(
      <BlogRelatedArticles
        articles={articles}
        seeAllAction={{
          label: "Custom",
          icon: <span data-testid="custom-before">before</span>,
          iconAfter: <span data-testid="custom-after">after</span>,
          className: "see-all-action",
        }}
      />,
    );
    action = container.querySelector(".see-all-action") as HTMLElement;
    expect(within(action).getByTestId("custom-before")).toBeInTheDocument();
    expect(within(action).getByTestId("custom-after")).toBeInTheDocument();
    expect(within(action).queryByTestId("mock-icon")).not.toBeInTheDocument();

    for (const [seeAllAction, expectedText] of [
      [
        {
          label: "Empty",
          icon: "",
          iconAfter: "",
          className: "see-all-action",
        },
        "Empty",
      ],
      [
        {
          label: "Boundary",
          icon: false,
          iconAfter: 0,
          className: "see-all-action",
        },
        "Boundary0",
      ],
      [
        {
          label: "Hidden false",
          icon: "lucide/hidden",
          children: false,
          className: "see-all-action",
        },
        "",
      ],
      [
        {
          label: "Hidden zero",
          icon: "lucide/hidden",
          children: 0,
          className: "see-all-action",
        },
        "0",
      ],
    ] as const) {
      rerender(
        <BlogRelatedArticles articles={articles} seeAllAction={seeAllAction} />,
      );
      action = container.querySelector(".see-all-action") as HTMLElement;
      expect(action).toHaveTextContent(expectedText);
      expect(within(action).queryByTestId("mock-icon")).not.toBeInTheDocument();
    }

    rerender(
      <BlogRelatedArticles
        articles={articles}
        seeAllAction={{
          label: "Generated",
          icon: "lucide/generated",
          className: "see-all-action",
        }}
        seeAllSlot={<div>Custom see-all slot</div>}
      />,
    );
    expect(screen.getByText("Custom see-all slot")).toBeInTheDocument();
    expect(container.querySelector(".see-all-action")).not.toBeInTheDocument();

    rerender(
      <BlogRelatedArticles
        articles={articles}
        articlesSlot={<div>Custom articles slot</div>}
      />,
    );
    expect(screen.getByText("Custom articles slot")).toBeInTheDocument();
    expect(screen.queryByText("Boundary article")).not.toBeInTheDocument();
  });
});
