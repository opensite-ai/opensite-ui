import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ResourceDetailArticleHero } from "../resource-detail-article-hero";

vi.mock("@page-speed/img", () => ({
  Img: ({
    src,
    alt,
    className,
  }: {
    src: string;
    alt: string;
    className?: string;
  }) => (
    <img
      src={src}
      alt={alt}
      className={className}
      data-testid="mock-img"
    />
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({
    name,
    size,
    className,
  }: {
    name?: React.ReactNode | string;
    size?: number;
    className?: string;
  }) =>
    typeof name === "string" ? (
      <span
        data-testid="mock-dynamic-icon"
        data-name={name}
        data-size={size}
        className={className}
      />
    ) : (
      <>{name}</>
    ),
}));

vi.mock("../../../ui/avatar", () => ({
  Avatar: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div className={className} data-testid="mock-avatar">
      {children}
    </div>
  ),
  AvatarImage: ({ src, alt }: { src: string; alt?: string }) => (
    <img src={src} alt={alt} data-testid="mock-avatar-image" />
  ),
  AvatarFallback: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="mock-avatar-fallback">{children}</span>
  ),
}));

vi.mock("../../../../lib/Pressable", () => ({
  Pressable: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href?: string;
    className?: string;
  }) => (
    <a href={href} className={className} data-testid="mock-pressable">
      {children}
    </a>
  ),
}));

vi.mock("../../../../lib/blockBrandedIconsAndPlaceholders", () => ({
  blockBrandedIconsAndPlaceholders: {
    avatar1: "https://placeholder.com/avatar1.jpg",
    placeholder2: "https://placeholder.com/placeholder2.jpg",
  },
}));

describe("ResourceDetailArticleHero", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders blog title", () => {
    render(<ResourceDetailArticleHero blog={{ title: "Building Sustainable Web Apps" }} />);
    expect(screen.getByText("Building Sustainable Web Apps")).toBeInTheDocument();
  });

  it("renders blog author", () => {
    render(<ResourceDetailArticleHero blog={{ author: "Sarah Chen" }} />);
    expect(screen.getByText("Sarah Chen")).toBeInTheDocument();
  });

  it("renders blog date and read time", () => {
    render(<ResourceDetailArticleHero blog={{ date: "December 15, 2024", readTime: "8 min read" }} />);
    expect(screen.getByText(/December 15, 2024/)).toBeInTheDocument();
    expect(screen.getByText(/8 min read/)).toBeInTheDocument();
  });

  it("renders navigation back link", () => {
    render(<ResourceDetailArticleHero navigation={{ backText: "All Articles", backHref: "/blog" }} />);
    expect(screen.getByText("All Articles")).toBeInTheDocument();
  });

  it("renders share heading", () => {
    render(<ResourceDetailArticleHero shareHeading="Share this article" />);
    expect(screen.getAllByText("Share this article").length).toBeGreaterThan(0);
  });

  it("applies custom className", () => {
    const { container } = render(
      <ResourceDetailArticleHero
        className="custom-class"
        blog={{ title: "Test Article" }}
      />
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("routes back icon names while preserving custom and sentinel nodes", () => {
    const view = render(
      <ResourceDetailArticleHero
        navigation={{
          backText: "All Articles",
          backHref: "/blog",
          backIcon: "lucide/arrow-left",
        }}
      />,
    );
    let backLink = view.container.querySelector(
      '[href="/blog"]',
    ) as HTMLElement;
    expect(
      within(backLink).getByTestId("mock-dynamic-icon"),
    ).toHaveAttribute("data-name", "lucide/arrow-left");
    expect(backLink).not.toHaveTextContent("lucide/arrow-left");

    view.rerender(
      <ResourceDetailArticleHero
        navigation={{
          backText: "All Articles",
          backHref: "/blog",
          backIcon: <span data-testid="custom-back-icon" />,
        }}
      />,
    );
    backLink = view.container.querySelector('[href="/blog"]') as HTMLElement;
    expect(
      within(backLink).getByTestId("custom-back-icon"),
    ).toBeInTheDocument();
    expect(
      within(backLink).queryByTestId("mock-dynamic-icon"),
    ).not.toBeInTheDocument();

    view.rerender(
      <ResourceDetailArticleHero
        navigation={{
          backText: "All Articles",
          backHref: "/blog",
          backIcon: 0,
        }}
      />,
    );
    backLink = view.container.querySelector('[href="/blog"]') as HTMLElement;
    expect(backLink).toHaveTextContent("0All Articles");

    view.rerender(
      <ResourceDetailArticleHero
        navigation={{
          backText: "All Articles",
          backHref: "/blog",
          backIcon: "",
        }}
      />,
    );
    backLink = view.container.querySelector('[href="/blog"]') as HTMLElement;
    expect(
      within(backLink).queryByTestId("mock-dynamic-icon"),
    ).not.toBeInTheDocument();
  });

  it("routes share action icons while preserving children and node behavior", () => {
    const { container } = render(
      <ResourceDetailArticleHero
        shareActions={[
          {
            href: "/string",
            icon: "lucide/linkedin",
            iconAfter: "lucide/arrow-up-right",
            className: "custom-share-action",
          },
          {
            href: "/custom",
            icon: <span data-testid="custom-leading-icon" />,
            iconAfter: <span data-testid="custom-trailing-icon" />,
          },
          {
            href: "/sentinel",
            icon: 0,
            iconAfter: false,
          },
          {
            href: "/empty",
            icon: "",
            iconAfter: "",
          },
          {
            href: "/children",
            icon: "lucide/hidden",
            children: <span data-testid="share-action-children" />,
          },
        ]}
      />,
    );

    const stringAction = container.querySelector(
      '[href="/string"]',
    ) as HTMLElement;
    expect(
      within(stringAction).getAllByTestId("mock-dynamic-icon").map((icon) =>
        icon.getAttribute("data-name"),
      ),
    ).toEqual(["lucide/linkedin", "lucide/arrow-up-right"]);
    expect(stringAction).not.toHaveTextContent("lucide/linkedin");
    expect(stringAction).not.toHaveTextContent("lucide/arrow-up-right");
    expect(stringAction).toHaveClass("custom-share-action");

    const customAction = container.querySelector(
      '[href="/custom"]',
    ) as HTMLElement;
    expect(
      within(customAction).getByTestId("custom-leading-icon"),
    ).toBeInTheDocument();
    expect(
      within(customAction).getByTestId("custom-trailing-icon"),
    ).toBeInTheDocument();

    const sentinelAction = container.querySelector(
      '[href="/sentinel"]',
    ) as HTMLElement;
    expect(sentinelAction).toHaveTextContent("0");
    expect(
      within(sentinelAction).queryByTestId("mock-dynamic-icon"),
    ).not.toBeInTheDocument();

    const emptyAction = container.querySelector(
      '[href="/empty"]',
    ) as HTMLElement;
    expect(
      within(emptyAction).queryByTestId("mock-dynamic-icon"),
    ).not.toBeInTheDocument();

    const childrenAction = container.querySelector(
      '[href="/children"]',
    ) as HTMLElement;
    expect(
      within(childrenAction).getByTestId("share-action-children"),
    ).toBeInTheDocument();
    expect(
      within(childrenAction).queryByTestId("mock-dynamic-icon"),
    ).not.toBeInTheDocument();
  });
});
