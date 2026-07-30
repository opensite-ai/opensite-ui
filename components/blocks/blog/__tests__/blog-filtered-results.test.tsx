import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { BlogFilteredResults } from "../blog-filtered-results";

// Mock dependencies
vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className, onClick, asButton }: { children: React.ReactNode; href?: string; className?: string; onClick?: () => void; asButton?: boolean }) => (
    <a href={href} className={className} onClick={onClick} data-testid="mock-pressable">{children}</a>
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

describe("BlogFilteredResults", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom heading and description", () => {
    render(
      <BlogFilteredResults
        heading="Custom Heading"
        description="Custom description"
      />
    );
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
    expect(screen.getByText("Custom description")).toBeInTheDocument();
  });

  it("handles empty posts array", () => {
    render(
      <BlogFilteredResults
        heading="Test Heading"
        description="Test Description"
        posts={[]}
      />
    );
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders flexible load-more icons without exposing raw names", () => {
    const posts = [
      {
        id: "post-1",
        title: "Boundary media",
        href: "/post-1",
        image: "lucide/media-looking-image",
      },
      { id: "post-2", title: "Second post", href: "/post-2" },
      { id: "post-3", title: "Third post", href: "/post-3" },
      { id: "post-4", title: "Fourth post", href: "/post-4" },
    ];
    const baseProps = { posts, postsPerPage: 1 };
    const { container, rerender } = render(
      <BlogFilteredResults
        {...baseProps}
        loadMoreAction={{
          label: "Load more",
          icon: "lucide/arrow-left",
          iconAfter: "lucide/arrow-right",
          className: "load-more-action",
        }}
      />,
    );

    let action = container.querySelector(".load-more-action") as HTMLElement;
    expect(
      within(action)
        .getAllByTestId("mock-icon")
        .map((icon) => icon.getAttribute("data-name")),
    ).toEqual(["lucide/arrow-left", "lucide/arrow-right"]);
    expect(action).not.toHaveTextContent("lucide/arrow-left");
    expect(action).not.toHaveTextContent("lucide/arrow-right");
    expect(screen.getByTestId("mock-img")).toHaveAttribute(
      "src",
      "lucide/media-looking-image",
    );
    expect(
      container.querySelector('[data-name="lucide/media-looking-image"]'),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Second post")).not.toBeInTheDocument();
    fireEvent.click(action);
    expect(screen.getByText("Second post")).toBeInTheDocument();

    rerender(
      <BlogFilteredResults
        {...baseProps}
        loadMoreAction={{
          label: "Custom",
          icon: <span data-testid="custom-before">before</span>,
          iconAfter: <span data-testid="custom-after">after</span>,
          className: "load-more-action",
        }}
      />,
    );
    action = container.querySelector(".load-more-action") as HTMLElement;
    expect(within(action).getByTestId("custom-before")).toBeInTheDocument();
    expect(within(action).getByTestId("custom-after")).toBeInTheDocument();
    expect(within(action).queryByTestId("mock-icon")).not.toBeInTheDocument();

    rerender(
      <BlogFilteredResults
        {...baseProps}
        loadMoreAction={{
          label: "Empty",
          icon: "",
          iconAfter: "",
          className: "load-more-action",
        }}
      />,
    );
    action = container.querySelector(".load-more-action") as HTMLElement;
    expect(action).toHaveTextContent("Empty");
    expect(within(action).queryByTestId("mock-icon")).not.toBeInTheDocument();

    rerender(
      <BlogFilteredResults
        {...baseProps}
        loadMoreAction={{
          label: "Boundary",
          icon: false,
          iconAfter: 0,
          className: "load-more-action",
        }}
      />,
    );
    action = container.querySelector(".load-more-action") as HTMLElement;
    expect(action).toHaveTextContent("Boundary0");
    expect(within(action).queryByTestId("mock-icon")).not.toBeInTheDocument();

    for (const [children, expectedText] of [
      [false, ""],
      [0, "0"],
    ] as const) {
      rerender(
        <BlogFilteredResults
          {...baseProps}
          loadMoreAction={{
            label: "Hidden",
            icon: "lucide/hidden",
            children,
            className: "load-more-action",
          }}
        />,
      );
      action = container.querySelector(".load-more-action") as HTMLElement;
      expect(action).toHaveTextContent(expectedText);
      expect(within(action).queryByText("Hidden")).not.toBeInTheDocument();
      expect(within(action).queryByTestId("mock-icon")).not.toBeInTheDocument();
    }

    rerender(
      <BlogFilteredResults
        {...baseProps}
        loadMoreAction={{
          label: "Generated",
          icon: "lucide/generated",
          className: "load-more-action",
        }}
        loadMoreSlot={<div>Custom load-more slot</div>}
      />,
    );
    expect(screen.getByText("Custom load-more slot")).toBeInTheDocument();
    expect(container.querySelector(".load-more-action")).not.toBeInTheDocument();
  });
});
