import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { BlogCardsReadTime } from "../blog-cards-read-time";

// Mock dependencies
vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

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
  DynamicIcon: ({ name, size, className }: { name?: React.ReactNode | string; size?: number; className?: string }) =>
    typeof name === "string" ? (
      <span data-testid="mock-icon" data-name={name} data-size={size} className={className} />
    ) : (
      <>{name}</>
    ),
}));

describe("BlogCardsReadTime", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom badge and heading", () => {
    render(
      <BlogCardsReadTime
        badge="Custom Badge"
        heading="Custom Heading"
        description="Custom description text"
      />
    );
    expect(screen.getByText("Custom Badge")).toBeInTheDocument();
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
    expect(document.querySelector('[data-name="lucide/file-text"]')).toHaveAttribute(
      "data-size",
      "16",
    );
    expect(document.querySelector('[data-name="lucide/file-text"]')).toHaveClass(
      "h-full",
      "w-4",
    );
  });

  it("renders custom posts", () => {
    const customPosts = [
      {
        id: "custom-1",
        title: "Custom Post Title",
        summary: "Custom post summary",
        author: "Custom Author",
        readTime: "5 Min Read",
        href: "/custom-post",
        image: "/custom-image.jpg",
      },
    ];

    render(<BlogCardsReadTime posts={customPosts} />);
    expect(screen.getByText("Custom Post Title")).toBeInTheDocument();
    expect(screen.getByText("Custom post summary")).toBeInTheDocument();
    expect(screen.getByText("Custom Author")).toBeInTheDocument();
    expect(screen.getByText("5 Min Read")).toBeInTheDocument();
    expect(screen.getByTestId("mock-img")).toHaveAttribute(
      "src",
      "/custom-image.jpg",
    );
  });

  it("handles empty posts array", () => {
    render(
      <BlogCardsReadTime
        badge="Test Badge"
        heading="Test Heading"
        description="Test Description"
        posts={[]}
      />
    );
    expect(screen.getByText("Test Badge")).toBeInTheDocument();
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    // Posts container should be empty when no posts are provided
    const postsContainer = document.querySelector(".grid");
    expect(postsContainer?.children.length ?? 0).toBe(0);
  });

  it("routes view-all icons and preserves sentinels, children, and slots", () => {
    const { container, rerender } = render(
      <BlogCardsReadTime
        postsSlot={<div data-testid="posts-slot">Custom posts</div>}
        viewAllAction={{
          label: "View all",
          icon: "lucide/before",
          iconAfter: "lucide/after",
        }}
      />,
    );

    const stringAction = screen.getByText("View all").closest("button") as HTMLElement;
    expect(stringAction.querySelector('[data-name="lucide/before"]')).toBeInTheDocument();
    expect(stringAction.querySelector('[data-name="lucide/after"]')).toBeInTheDocument();
    expect(stringAction).not.toHaveTextContent("lucide/before");
    expect(stringAction).not.toHaveTextContent("lucide/after");
    expect(
      stringAction.querySelector('[data-name="lucide/before"]'),
    ).not.toHaveAttribute("data-size");
    expect(screen.getByTestId("posts-slot")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-img")).not.toBeInTheDocument();

    rerender(
      <BlogCardsReadTime
        postsSlot={<div data-testid="posts-slot">Custom posts</div>}
        viewAllAction={{
          label: "Custom icons",
          icon: <span data-testid="custom-before" />,
          iconAfter: <span data-testid="custom-after" />,
        }}
      />,
    );
    expect(screen.getByTestId("custom-before")).toBeInTheDocument();
    expect(screen.getByTestId("custom-after")).toBeInTheDocument();

    rerender(
      <BlogCardsReadTime
        postsSlot={<div data-testid="posts-slot">Custom posts</div>}
        viewAllAction={{ label: "Sentinel action", icon: 0, iconAfter: false }}
      />,
    );
    const sentinelAction = screen
      .getAllByTestId("mock-pressable")
      .find((element) => element.textContent === "0Sentinel action");
    expect(sentinelAction).toHaveTextContent("0Sentinel action");

    rerender(
      <BlogCardsReadTime
        postsSlot={<div data-testid="posts-slot">Custom posts</div>}
        viewAllAction={{ label: "Empty action", icon: "", iconAfter: "" }}
      />,
    );
    expect(
      within(screen.getByText("Empty action").closest("button") as HTMLElement).queryByTestId(
        "mock-icon",
      ),
    ).not.toBeInTheDocument();

    rerender(
      <BlogCardsReadTime
        postsSlot={<div data-testid="posts-slot">Custom posts</div>}
        viewAllAction={{
          label: "Hidden label",
          icon: "lucide/ignored-before",
          iconAfter: "lucide/ignored-after",
          children: <span data-testid="custom-children">Custom children</span>,
        }}
      />,
    );
    expect(screen.getByTestId("custom-children")).toBeInTheDocument();
    expect(screen.queryByText("Hidden label")).not.toBeInTheDocument();
    expect(
      container.querySelector('[data-name="lucide/ignored-before"]'),
    ).not.toBeInTheDocument();

    rerender(
      <BlogCardsReadTime
        postsSlot={<div data-testid="posts-slot">Custom posts</div>}
        viewAllAction={{ label: "Hidden generated", icon: "lucide/hidden" }}
        viewAllSlot={<span data-testid="view-all-slot">Custom action</span>}
      />,
    );
    expect(screen.getByTestId("view-all-slot")).toBeInTheDocument();
    expect(screen.queryByText("Hidden generated")).not.toBeInTheDocument();
    expect(container.querySelector('[data-name="lucide/hidden"]')).not.toBeInTheDocument();
  });
});
