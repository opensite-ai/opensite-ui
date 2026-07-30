import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { BlogTechInsights } from "../blog-tech-insights";

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

describe("BlogTechInsights", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom heading and description", () => {
    render(
      <BlogTechInsights
        heading="Custom Heading"
        description="Custom description"
      />
    );
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
    expect(screen.getByText("Custom description")).toBeInTheDocument();
  });

  it("renders flexible read-more icons and preserves featured media and slots", () => {
    const featuredPost = {
      id: "boundary-post",
      title: "Boundary post",
      author: "Boundary Author",
      authorRole: "Boundary Role",
      href: "/boundary",
      image: "lucide/media-looking-image",
    };
    const { container, rerender } = render(
      <BlogTechInsights
        featuredPost={featuredPost}
        readMoreAction={{
          label: "Read more",
          href: "/all",
          icon: "lucide/arrow-left",
          iconAfter: "lucide/arrow-right",
          className: "read-more-action",
        }}
      />,
    );

    let action = container.querySelector(".read-more-action") as HTMLElement;
    expect(action).toHaveAttribute("href", "/all");
    expect(
      within(action)
        .getAllByTestId("mock-icon")
        .map((icon) => icon.getAttribute("data-name")),
    ).toEqual(["lucide/arrow-left", "lucide/arrow-right"]);
    expect(action).not.toHaveTextContent("lucide/arrow-left");
    expect(action).not.toHaveTextContent("lucide/arrow-right");
    expect(screen.getByText("Boundary Author")).toBeInTheDocument();
    expect(screen.getByText("Boundary Role")).toBeInTheDocument();
    expect(screen.getByTestId("mock-img")).toHaveAttribute(
      "src",
      "lucide/media-looking-image",
    );
    expect(
      container.querySelector('[data-name="lucide/media-looking-image"]'),
    ).not.toBeInTheDocument();

    rerender(
      <BlogTechInsights
        featuredPost={featuredPost}
        readMoreAction={{
          label: "Custom",
          icon: <span data-testid="custom-before">before</span>,
          iconAfter: <span data-testid="custom-after">after</span>,
          className: "read-more-action",
        }}
      />,
    );
    action = container.querySelector(".read-more-action") as HTMLElement;
    expect(within(action).getByTestId("custom-before")).toBeInTheDocument();
    expect(within(action).getByTestId("custom-after")).toBeInTheDocument();
    expect(within(action).queryByTestId("mock-icon")).not.toBeInTheDocument();

    for (const [readMoreAction, expectedText] of [
      [
        {
          label: "Empty",
          icon: "",
          iconAfter: "",
          className: "read-more-action",
        },
        "Empty",
      ],
      [
        {
          label: "Boundary",
          icon: false,
          iconAfter: 0,
          className: "read-more-action",
        },
        "Boundary0",
      ],
      [
        {
          label: "Hidden false",
          icon: "lucide/hidden",
          children: false,
          className: "read-more-action",
        },
        "",
      ],
      [
        {
          label: "Hidden zero",
          icon: "lucide/hidden",
          children: 0,
          className: "read-more-action",
        },
        "0",
      ],
    ] as const) {
      rerender(
        <BlogTechInsights
          featuredPost={featuredPost}
          readMoreAction={readMoreAction}
        />,
      );
      action = container.querySelector(".read-more-action") as HTMLElement;
      expect(action).toHaveTextContent(expectedText);
      expect(within(action).queryByTestId("mock-icon")).not.toBeInTheDocument();
    }

    rerender(
      <BlogTechInsights
        featuredPost={featuredPost}
        readMoreAction={{
          label: "Generated",
          icon: "lucide/generated",
          className: "read-more-action",
        }}
        readMoreSlot={<div>Custom read-more slot</div>}
      />,
    );
    expect(screen.getByText("Custom read-more slot")).toBeInTheDocument();
    expect(container.querySelector(".read-more-action")).not.toBeInTheDocument();

    rerender(
      <BlogTechInsights
        featuredPost={featuredPost}
        featuredSlot={<div>Custom featured slot</div>}
      />,
    );
    expect(screen.getByText("Custom featured slot")).toBeInTheDocument();
    expect(screen.queryByText("Boundary post")).not.toBeInTheDocument();
  });
});
