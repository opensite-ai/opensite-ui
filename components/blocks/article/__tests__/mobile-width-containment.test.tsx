import * as React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { getProseClassName } from "../../../../lib/utils";
import { ArticleBreadcrumbSocial } from "../article-breadcrumb-social";
import { ArticleChaptersAuthor } from "../article-chapters-author";
import { ArticleCompactToc } from "../article-compact-toc";
import { ArticleHeroProse } from "../article-hero-prose";
import { ArticleSidebarSticky } from "../article-sidebar-sticky";
import { ArticleSplitAnimated } from "../article-split-animated";
import { ArticleTocSidebar } from "../article-toc-sidebar";

/**
 * Regression suite for the mobile layout distortion reported against generated
 * blog articles at phone widths.
 * See docs/shared-components/blogs-engine-impl/R6-mobile-overflow-report.md.
 *
 * ## The bug
 *
 * Article bodies are markdown, and markdown routinely contains a descendant whose
 * min-content width is far wider than a phone viewport: a GFM table, a `<pre>`
 * with a long line, an embed with a hard-coded `width`. Every one of these layouts
 * puts the prose column in a CSS grid or flex container, and a grid/flex item's
 * default `min-width: auto` resolves to its **min-content** width. That min-content
 * width therefore became the track's base size, the column grew to 542px inside a
 * 342px container, and the ENTIRE page went to 566px on a 390px screen - clipped
 * headline, floating navbar wider than the screen, horizontal page scroll.
 *
 * Empirically verified against the live failing article
 * (workflowrush.com, website 1124) at 390px: scrollWidth 566 -> 390.
 *
 * ## What is locked in here
 *
 * `min-w-0` on every prose column, so a wide child is handled locally (the
 * markdown renderer scrolls tables and code blocks inside their own boxes)
 * instead of deforming the page. `min-w-0` is already present in the production
 * Tailwind safelist, so this needs no safelist rebuild.
 */

vi.mock("@page-speed/img", () => ({
  Img: ({
    src,
    alt,
    className,
  }: {
    src: string;
    alt: string;
    className?: string;
  }) => <img src={src} alt={alt} className={className} data-testid="mock-img" />,
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, size }: { name?: string; size?: number }) =>
    typeof name === "string" ? (
      <span data-testid={`icon-${name}`} data-size={size} />
    ) : null,
}));

class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}
window.IntersectionObserver =
  MockIntersectionObserver as unknown as typeof IntersectionObserver;

const MARKDOWN = [
  "## Section",
  "",
  "| Trigger | Automated action | AI-supported action | Human owner | CRM update |",
  "| --- | --- | --- | --- | --- |",
  "| Record reaches the defined dormancy condition | Apply eligibility rules | None for hard gates | Revenue operations | Eligibility state |",
  "",
].join("\n");

const shared = {
  title: "Dormant lead reactivation AI: A practical SMB workflow",
  markdownString: MARKDOWN,
};

/**
 * The prose column is the element that carries the `prose` class - it is the
 * grid/flex item in every one of these layouts (or, for compact-toc, is wrapped
 * by one that is separately guarded).
 */
function proseColumn(container: HTMLElement): HTMLElement {
  const el = container.querySelector<HTMLElement>(".prose");
  expect(el).not.toBeNull();
  return el!;
}

describe("article layouts: mobile width containment", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(window, "scrollY", { value: 0, writable: true });
  });

  describe("getProseClassName", () => {
    it("always includes min-w-0 so a prose column can shrink below its content", () => {
      expect(getProseClassName()).toContain("min-w-0");
      expect(getProseClassName("dark")).toContain("min-w-0");
      expect(getProseClassName("default", "max-w-none")).toContain("min-w-0");
    });

    it("keeps the background-aware prose variants intact", () => {
      expect(getProseClassName("dark")).toContain("prose-invert");
      expect(getProseClassName("white")).toContain("dark:prose-invert");
      expect(getProseClassName("white", "max-w-none")).toContain("max-w-none");
    });
  });

  it.each([
    ["ArticleBreadcrumbSocial", ArticleBreadcrumbSocial],
    ["ArticleChaptersAuthor", ArticleChaptersAuthor],
    ["ArticleCompactToc", ArticleCompactToc],
    ["ArticleHeroProse", ArticleHeroProse],
    ["ArticleSidebarSticky", ArticleSidebarSticky],
    ["ArticleTocSidebar", ArticleTocSidebar],
  ] as const)("%s puts min-w-0 on its prose column", (_name, Component) => {
    const Layout = Component as React.ComponentType<typeof shared>;
    const { container } = render(<Layout {...shared} />);
    expect(proseColumn(container).className).toContain("min-w-0");
  });

  it("ArticleHeroProse pins its prose column to the container width", () => {
    // The parent is `flex flex-col items-center`, so without `w-full` the column
    // is cross-axis shrink-to-fit and resolves to its max-w-3xl (768px) cap even
    // on a 390px screen.
    const { container } = render(<ArticleHeroProse {...shared} />);
    const column = proseColumn(container).className;
    expect(column).toContain("w-full");
    expect(column).toContain("max-w-3xl");
  });

  it("ArticleCompactToc guards its column even without a desktop TOC", () => {
    // The guard must not be conditional on `sections` being present.
    const { container } = render(<ArticleCompactToc {...shared} />);
    const guarded = container.querySelector(".min-w-0");
    expect(guarded).not.toBeNull();
  });

  it("ArticleSidebarSticky guards the sidebar's bare 1fr track", () => {
    const { container } = render(
      <ArticleSidebarSticky {...shared} summary="Summary" />,
    );
    const aside = container.querySelector("aside");
    expect(aside?.className).toContain("min-w-0");
  });

  it("ArticleSplitAnimated guards its content grid item", () => {
    const { container } = render(
      <ArticleSplitAnimated
        title="A title"
        description="A description"
        image="/hero.png"
      />,
    );
    expect(container.querySelector(".min-w-0")).not.toBeNull();
  });
});
