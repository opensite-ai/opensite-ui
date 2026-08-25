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
    window.history.replaceState(null, "", "/blog/");
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

  // TASK-6 §2: modern pill filter + `?category_slug=` URL sync. The
  // `categories: CategoryFilter[]` prop shape stays byte-compatible — `slug`
  // is additive and optional (hydration-provided; see FEED_CONTRACT §2.4).
  describe("category filter pills + URL sync (TASK-6 §2)", () => {
    const categories = [
      { label: "All", value: "all" },
      { label: "General", value: "general", slug: "general" },
      { label: "Cocktails", value: "cocktails", slug: "craft-cocktails" },
    ];
    const posts = [
      { id: "p1", title: "General post", href: "/p1", category: "General" },
      { id: "p2", title: "Cocktail post", href: "/p2", category: "Cocktails" },
    ];

    it("renders pill buttons with aria-pressed, not checkboxes", () => {
      render(<BlogFilteredResults categories={categories} posts={posts} />);

      expect(screen.queryAllByRole("checkbox")).toHaveLength(0);
      const general = screen.getByRole("button", { name: "General" });
      expect(general).toHaveAttribute("aria-pressed", "false");
      expect(screen.getByRole("button", { name: "All" })).toHaveAttribute(
        "aria-pressed",
        "true",
      );
    });

    it("filters posts when a pill is toggled (behavior preserved through the new UI)", () => {
      render(<BlogFilteredResults categories={categories} posts={posts} />);

      fireEvent.click(screen.getByRole("button", { name: "General" }));

      expect(screen.getByText("General post")).toBeInTheDocument();
      expect(screen.queryByText("Cocktail post")).not.toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "General" }),
      ).toHaveAttribute("aria-pressed", "true");
    });

    it("initializes the selection from ?category_slug= (platform URL contract)", () => {
      window.history.replaceState(null, "", "/blog/?category_slug=craft-cocktails");
      render(<BlogFilteredResults categories={categories} posts={posts} />);

      expect(
        screen.getByRole("button", { name: "Cocktails" }),
      ).toHaveAttribute("aria-pressed", "true");
      expect(screen.getByText("Cocktail post")).toBeInTheDocument();
      expect(screen.queryByText("General post")).not.toBeInTheDocument();
    });

    it("writes ?category_slug= (the SLUG, not the value) on selection and clears it for All", () => {
      render(<BlogFilteredResults categories={categories} posts={posts} />);

      fireEvent.click(screen.getByRole("button", { name: "Cocktails" }));
      expect(window.location.search).toBe("?category_slug=craft-cocktails");

      fireEvent.click(screen.getByRole("button", { name: "All" }));
      expect(window.location.search).toBe("");
    });

    it("drops a stale ?page= when the filter changes", () => {
      window.history.replaceState(null, "", "/blog/?page=3");
      render(<BlogFilteredResults categories={categories} posts={posts} />);

      fireEvent.click(screen.getByRole("button", { name: "General" }));

      expect(window.location.search).toBe("?category_slug=general");
    });

    // Host re-query contract: the platform page owns the server-filtered feed
    // and @page-speed/router only re-reads the URL on popstate/routechange. A
    // silent replaceState left the URL changed but the list pinned to the
    // arrival filter forever (wellspun.com /blog?category_slug=…).
    it("announces a filter change with popstate + routechange", () => {
      render(<BlogFilteredResults categories={categories} posts={posts} />);
      const popstate = vi.fn();
      const routechange = vi.fn();
      window.addEventListener("popstate", popstate);
      window.addEventListener("routechange", routechange as EventListener);

      fireEvent.click(screen.getByRole("button", { name: "General" }));

      expect(popstate).toHaveBeenCalledTimes(1);
      expect(routechange).toHaveBeenCalledTimes(1);
      const detail = (routechange.mock.calls[0][0] as CustomEvent).detail;
      expect(detail.path).toContain("category_slug=general");
      window.removeEventListener("popstate", popstate);
      window.removeEventListener("routechange", routechange as EventListener);
    });

    it("dispatches nothing when the URL would not change (no-op selection)", () => {
      render(<BlogFilteredResults categories={categories} posts={posts} />);
      const popstate = vi.fn();
      const routechange = vi.fn();
      window.addEventListener("popstate", popstate);
      window.addEventListener("routechange", routechange as EventListener);

      // "All" is already active and the URL carries no filter: a toggle that
      // resolves back to All must not touch history or wake listeners.
      fireEvent.click(screen.getByRole("button", { name: "All" }));

      expect(popstate).not.toHaveBeenCalled();
      expect(routechange).not.toHaveBeenCalled();
      window.removeEventListener("popstate", popstate);
      window.removeEventListener("routechange", routechange as EventListener);
    });

    it("keeps Load More progress across same-URL SPA navigations", () => {
      const fourPosts = [
        { id: "a", title: "Post A", href: "/a", category: "General" },
        { id: "b", title: "Post B", href: "/b", category: "General" },
        { id: "c", title: "Post C", href: "/c", category: "General" },
        { id: "d", title: "Post D", href: "/d", category: "General" },
      ];
      render(
        <BlogFilteredResults
          categories={categories}
          posts={fourPosts}
          postsPerPage={2}
          loadMoreAction={{ label: "Load More" }}
        />,
      );
      // The Pressable test mock renders as an anchor; query by text.
      fireEvent.click(screen.getByText("Load More"));
      expect(screen.getByText("Post D")).toBeInTheDocument();

      // navigateTo dispatches these even for a byte-identical URL (e.g.
      // clicking the already-active Blog link); the grid must not collapse.
      fireEvent(
        window,
        new CustomEvent("routechange", { detail: { path: "/blog/" } }),
      );
      fireEvent(window, new PopStateEvent("popstate", { state: null }));

      expect(screen.getByText("Post D")).toBeInTheDocument();
    });

    it("treats an encoded unrelated param as a no-op (no dispatch, no rewrite)", () => {
      window.history.replaceState(
        null,
        "",
        "/blog/?utm_content=Summer%20Sale",
      );
      render(<BlogFilteredResults categories={categories} posts={posts} />);
      const popstate = vi.fn();
      window.addEventListener("popstate", popstate);

      // "All" is already active: url.search re-serializes %20 as +, so a raw
      // string comparison would misread this as a change and rewrite the
      // campaign param.
      fireEvent.click(screen.getByRole("button", { name: "All" }));

      expect(popstate).not.toHaveBeenCalled();
      expect(window.location.search).toBe("?utm_content=Summer%20Sale");
      window.removeEventListener("popstate", popstate);
    });

    it("preserves slug-less legacy selections across route events (URL is not their source of truth)", () => {
      const legacyCategories = [
        { label: "All", value: "all" },
        { label: "General", value: "general" },
      ];
      render(
        <BlogFilteredResults categories={legacyCategories} posts={posts} />,
      );
      fireEvent.click(screen.getByRole("button", { name: "General" }));
      expect(
        screen.getByRole("button", { name: "General" }),
      ).toHaveAttribute("aria-pressed", "true");

      fireEvent(
        window,
        new CustomEvent("routechange", { detail: { path: "/blog/" } }),
      );

      expect(
        screen.getByRole("button", { name: "General" }),
      ).toHaveAttribute("aria-pressed", "true");
      expect(screen.queryByText("Cocktail post")).not.toBeInTheDocument();
    });

    it("re-derives the selection when the host changes the URL (routechange)", () => {
      render(<BlogFilteredResults categories={categories} posts={posts} />);
      expect(screen.getByRole("button", { name: "All" })).toHaveAttribute(
        "aria-pressed",
        "true",
      );

      window.history.replaceState(
        null,
        "",
        "/blog/?category_slug=craft-cocktails",
      );
      fireEvent(
        window,
        new CustomEvent("routechange", {
          detail: { path: "/blog/?category_slug=craft-cocktails" },
        }),
      );

      expect(
        screen.getByRole("button", { name: "Cocktails" }),
      ).toHaveAttribute("aria-pressed", "true");
      expect(screen.queryByText("General post")).not.toBeInTheDocument();
    });

    // Review round: the featured hero and the zero-match fallback must FOLLOW
    // the active filter — a filtered URL over an unfiltered grid (or a hero
    // from another category) advertises a state the DOM is not honouring.
    it("hides the featured hero when the active filter does not match its category", () => {
      render(
        <BlogFilteredResults
          categories={categories}
          posts={posts}
          primaryPost={{
            id: "hero",
            title: "Hero cocktail post",
            href: "/hero",
            category: "Cocktails",
          }}
        />,
      );
      expect(screen.getByText("Hero cocktail post")).toBeInTheDocument();

      fireEvent.click(screen.getByRole("button", { name: "General" }));

      expect(screen.queryByText("Hero cocktail post")).not.toBeInTheDocument();

      fireEvent.click(screen.getByRole("button", { name: "Cocktails" }));

      expect(screen.getByText("Hero cocktail post")).toBeInTheDocument();
    });

    it("renders an EMPTY grid, never all posts, when the filter matches nothing", () => {
      // "Empty" is a real taxonomy category with no post in the loaded page —
      // routine when the newest post moved into the hero or on later pages.
      const chips = [...categories, { label: "Empty", value: "empty", slug: "empty" }];
      render(<BlogFilteredResults categories={chips} posts={posts} />);

      fireEvent.click(screen.getByRole("button", { name: "Empty" }));

      expect(screen.queryByText("General post")).not.toBeInTheDocument();
      expect(screen.queryByText("Cocktail post")).not.toBeInTheDocument();
    });

    it("never writes the URL for slug-less chips (pre-slug hydrated payloads)", () => {
      const legacyCategories = [
        { label: "All", value: "all" },
        { label: "General", value: "general" },
      ];
      render(
        <BlogFilteredResults categories={legacyCategories} posts={posts} />,
      );

      fireEvent.click(screen.getByRole("button", { name: "General" }));

      expect(window.location.search).toBe("");
      expect(screen.getByText("General post")).toBeInTheDocument();
    });
  });
});
