import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { BlogGridAuthorCards } from "../blog-grid-author-cards";

// Mock dependencies
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

describe("BlogGridAuthorCards", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom heading and description", () => {
    render(
      <BlogGridAuthorCards
        heading="Custom Blog"
        description="Custom description"
      />
    );
    expect(screen.getByText("Custom Blog")).toBeInTheDocument();
    expect(screen.getByText("Custom description")).toBeInTheDocument();
  });

  it("renders custom posts", () => {
    const customPosts = [
      {
        id: "custom-1",
        title: "Custom Post",
        summary: "Custom summary",
        label: "Custom Label",
        author: "Custom Author",
        authorInitials: "CA",
        published: "1 Jan 2025",
        href: "/custom",
        image: "/custom.jpg",
      },
    ];

    render(<BlogGridAuthorCards posts={customPosts} />);
    expect(screen.getByText("Custom Post")).toBeInTheDocument();
    expect(screen.getByText("Custom Author")).toBeInTheDocument();
    expect(screen.getByText("Custom Label")).toBeInTheDocument();
  });

  it("handles empty posts array", () => {
    render(
      <BlogGridAuthorCards
        heading="Test Heading"
        description="Test Description"
        posts={[]}
      />
    );
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    // Posts container should be empty when no posts are provided
    const postsContainer = document.querySelector(".grid");
    expect(postsContainer?.children.length ?? 0).toBe(0);
  });

  it("renders flexible view-all icons and preserves author media and slots", () => {
    const posts = [
      {
        id: "boundary-post",
        title: "Boundary post",
        author: "Boundary Author",
        label: "Boundary Tag",
        href: "/boundary",
        image: "lucide/media-looking-image",
      },
    ];
    const { container, rerender } = render(
      <BlogGridAuthorCards
        posts={posts}
        viewAllAction={{
          label: "View all",
          href: "/all",
          icon: "lucide/arrow-left",
          iconAfter: "lucide/arrow-right",
          className: "view-all-action",
        }}
      />,
    );

    let action = container.querySelector(".view-all-action") as HTMLElement;
    expect(action).toHaveAttribute("href", "/all");
    expect(
      within(action)
        .getAllByTestId("mock-icon")
        .map((icon) => icon.getAttribute("data-name")),
    ).toEqual(["lucide/arrow-left", "lucide/arrow-right"]);
    expect(action).not.toHaveTextContent("lucide/arrow-left");
    expect(action).not.toHaveTextContent("lucide/arrow-right");
    expect(screen.getByText("Boundary Author")).toBeInTheDocument();
    expect(screen.getByText("Boundary Tag")).toBeInTheDocument();
    expect(screen.getByTestId("mock-img")).toHaveAttribute(
      "src",
      "lucide/media-looking-image",
    );
    expect(
      container.querySelector('[data-name="lucide/media-looking-image"]'),
    ).not.toBeInTheDocument();

    rerender(
      <BlogGridAuthorCards
        posts={posts}
        viewAllAction={{
          label: "Custom",
          icon: <span data-testid="custom-before">before</span>,
          iconAfter: <span data-testid="custom-after">after</span>,
          className: "view-all-action",
        }}
      />,
    );
    action = container.querySelector(".view-all-action") as HTMLElement;
    expect(within(action).getByTestId("custom-before")).toBeInTheDocument();
    expect(within(action).getByTestId("custom-after")).toBeInTheDocument();
    expect(within(action).queryByTestId("mock-icon")).not.toBeInTheDocument();

    for (const [viewAllAction, expectedText] of [
      [
        {
          label: "Empty",
          icon: "",
          iconAfter: "",
          className: "view-all-action",
        },
        "Empty",
      ],
      [
        {
          label: "Boundary",
          icon: false,
          iconAfter: 0,
          className: "view-all-action",
        },
        "Boundary0",
      ],
      [
        {
          label: "Hidden false",
          icon: "lucide/hidden",
          children: false,
          className: "view-all-action",
        },
        "",
      ],
      [
        {
          label: "Hidden zero",
          icon: "lucide/hidden",
          children: 0,
          className: "view-all-action",
        },
        "0",
      ],
    ] as const) {
      rerender(
        <BlogGridAuthorCards posts={posts} viewAllAction={viewAllAction} />,
      );
      action = container.querySelector(".view-all-action") as HTMLElement;
      expect(action).toHaveTextContent(expectedText);
      expect(within(action).queryByTestId("mock-icon")).not.toBeInTheDocument();
    }

    rerender(
      <BlogGridAuthorCards
        posts={posts}
        viewAllAction={{
          label: "Generated",
          icon: "lucide/generated",
          className: "view-all-action",
        }}
        viewAllSlot={<div>Custom view-all slot</div>}
      />,
    );
    expect(screen.getByText("Custom view-all slot")).toBeInTheDocument();
    expect(container.querySelector(".view-all-action")).not.toBeInTheDocument();
  });
});
