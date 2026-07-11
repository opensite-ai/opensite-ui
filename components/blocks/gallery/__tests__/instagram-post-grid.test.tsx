import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  InstagramPostGrid,
  type InstagramPostItem,
} from "../instagram-post-grid";
import type { ImmersiveAction, MediaItem } from "@page-speed/media-immersive";

// ── Mock @page-speed/media-immersive at the module boundary ──────────────────
// The library now OWNS all media rendering (the block used to render its own
// <Img>/<Video> inside a Pressable <a>). We mock the immersive primitives and
// capture the props the block passes them, so the tests assert the block's
// contract with the library rather than the library's internals — mirroring how
// @page-speed/video was mocked in the pre-immersive version of this block.
const captured = vi.hoisted(() => ({
  provider: [] as { items: MediaItem[]; actions: ImmersiveAction[] }[],
  viewer: [] as Record<string, unknown>[],
  cards: [] as Record<string, unknown>[],
  open: vi.fn(),
}));

vi.mock("@page-speed/media-immersive", () => ({
  ImmersiveFeedProvider: ({
    items,
    actions,
    children,
  }: {
    items: MediaItem[];
    actions: ImmersiveAction[];
    children: React.ReactNode;
  }) => {
    captured.provider.push({ items, actions });
    return <div data-testid="feed-provider">{children}</div>;
  },
  ImmersiveViewer: (props: Record<string, unknown>) => {
    captured.viewer.push(props);
    return <div data-testid="immersive-viewer" />;
  },
  ThumbnailCard: ({
    item,
    onOpen,
    size,
    showDuration,
    glyphMode,
    badgeSlot,
    posterImgProps,
    hideCaption,
    hideProgressHint,
  }: {
    item: MediaItem;
    onOpen: (id: string) => void;
    size?: number | string;
    showDuration?: boolean;
    glyphMode?: string;
    badgeSlot?: React.ReactNode;
    posterImgProps?: Record<string, unknown>;
    hideCaption?: boolean;
    hideProgressHint?: boolean;
  }) => {
    captured.cards.push({
      item,
      size,
      showDuration,
      glyphMode,
      posterImgProps,
      hideCaption,
      hideProgressHint,
    });
    return (
      <div
        data-testid="thumb-card"
        data-id={item.id}
        data-type={item.type}
        data-src={item.src ?? ""}
        data-kind={item.kind}
        data-size={String(size)}
        data-show-duration={String(showDuration)}
        data-glyph-mode={glyphMode}
        data-hide-caption={String(hideCaption)}
        data-hide-progress-hint={String(hideProgressHint)}
        onClick={() => onOpen(item.id)}
      >
        <span data-testid="thumb-title">{item.title}</span>
        {badgeSlot !== undefined ? (
          <span data-testid="badge-slot">{badgeSlot}</span>
        ) : null}
      </div>
    );
  },
  useImmersiveFeed: () => ({ open: captured.open }),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name }: { name: string }) => (
    <span data-testid="mock-icon" data-name={name} />
  ),
}));

const IMAGE_URL = "https://cdn.ing/assets/i/r/1320/instagram-1.webp";
const VIDEO_URL = "https://cdn.ing/assets/video/1320/reel.mp4";

const baseItems: InstagramPostItem[] = [
  {
    id: "1",
    href: "https://www.instagram.com/p/abc123/",
    image: IMAGE_URL,
    caption: "Morning pours",
    date: "Jul 1, 2026",
    likeCount: 128,
    commentCount: 12,
  },
  {
    id: "2",
    href: "https://www.instagram.com/p/def456/",
    image: IMAGE_URL,
    caption: "Behind the scenes reel",
    isVideo: true,
    videoUrl: VIDEO_URL,
    likeCount: 342,
    viewCount: 4820,
  },
];

describe("InstagramPostGrid", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    captured.provider.length = 0;
    captured.viewer.length = 0;
    captured.cards.length = 0;
  });

  it("returns null when items is empty", () => {
    const { container } = render(<InstagramPostGrid items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("returns null when items is undefined", () => {
    const { container } = render(<InstagramPostGrid heading="Ignored" />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders the heading and one thumbnail card per post", () => {
    render(<InstagramPostGrid heading="Our Feed" items={baseItems} />);
    expect(screen.getByText("Our Feed")).toBeInTheDocument();
    expect(screen.getAllByTestId("thumb-card")).toHaveLength(2);
    // Title appears in the mocked card AND the block's own caption overlay.
    expect(screen.getAllByText("Morning pours").length).toBeGreaterThan(0);
  });

  it("wraps the feed in ImmersiveFeedProvider and renders the ImmersiveViewer", () => {
    render(<InstagramPostGrid items={baseItems} />);
    expect(screen.getByTestId("feed-provider")).toBeInTheDocument();
    expect(screen.getByTestId("immersive-viewer")).toBeInTheDocument();
    // The provider receives the mapped feed (both posts have images).
    expect(captured.provider).toHaveLength(1);
    expect(captured.provider[0].items).toHaveLength(2);
  });

  it("maps a photo post to an image MediaItem (no video source)", () => {
    render(<InstagramPostGrid items={baseItems} />);
    const [photo] = captured.provider[0].items;
    expect(photo.type).toBe("image");
    expect(photo.poster).toBe(IMAGE_URL);
    expect(photo.src).toBeUndefined();
    expect(photo.kind).toBe("Instagram");
    // Full caption is preserved; meta carries the permalink + counts + date.
    expect(photo.caption).toBe("Morning pours");
    expect(photo.meta).toMatchObject({
      href: "https://www.instagram.com/p/abc123/",
      likeCount: 128,
      commentCount: 12,
      date: "Jul 1, 2026",
    });
  });

  it("maps a reel post to a video MediaItem with its source", () => {
    render(<InstagramPostGrid items={baseItems} />);
    const reel = captured.provider[0].items[1];
    expect(reel.type).toBe("video");
    expect(reel.src).toBe(VIDEO_URL);
    expect(reel.poster).toBe(IMAGE_URL);
  });

  it("degrades an isVideo post with no videoUrl to an image (never a source-less video)", () => {
    render(
      <InstagramPostGrid
        items={[{ id: "x", href: "https://x", image: IMAGE_URL, isVideo: true }]}
      />,
    );
    const [item] = captured.provider[0].items;
    expect(item.type).toBe("image");
    expect(item.src).toBeUndefined();
  });

  it("passes showDuration=false and glyphMode='hover' to every card", () => {
    render(<InstagramPostGrid items={baseItems} />);
    const cards = screen.getAllByTestId("thumb-card");
    for (const card of cards) {
      expect(card).toHaveAttribute("data-show-duration", "false");
      expect(card).toHaveAttribute("data-glyph-mode", "hover");
    }
  });

  it("hides the card's own caption and progress hint (block owns the caption overlay)", () => {
    render(<InstagramPostGrid items={baseItems} />);
    for (const card of screen.getAllByTestId("thumb-card")) {
      expect(card).toHaveAttribute("data-hide-caption", "true");
      expect(card).toHaveAttribute("data-hide-progress-hint", "true");
    }
  });

  it("renders the block caption overlay inside a fixed two-line, top-aligned box", () => {
    const { container } = render(
      <InstagramPostGrid
        items={[
          {
            id: "one-line",
            href: "https://a",
            image: IMAGE_URL,
            caption: "Short caption",
          },
        ]}
      />,
    );
    // The overlay is the block's own (aria-hidden) scrim, distinct from the
    // mocked card's thumb-title span; the clamped text node is its child.
    const scrim = Array.from(
      container.querySelectorAll('[aria-hidden="true"]'),
    ).find(
      (el) =>
        el.textContent === "Short caption" &&
        el.firstElementChild instanceof HTMLElement,
    );
    expect(scrim).toBeDefined();
    const text = scrim!.firstElementChild as HTMLElement;
    // Fixed 2-line height keeps 1-line and 2-line captions starting at the
    // same vertical position (annotated refinement #2).
    expect(text.style.height).toBe("2.8em");
    expect(text.style.webkitLineClamp).toBe("2");
  });

  it("uses the slightly-widened grid gap so tile shadows never overlap", () => {
    const { container } = render(<InstagramPostGrid items={baseItems} />);
    const grid = container.querySelector(".grid.grid-cols-2");
    expect(grid).not.toBeNull();
    expect(grid!.className).toContain("gap-3");
    expect(grid!.className).not.toContain("gap-2");
  });

  it("hides the like-count pill by default (implementation kept for future dynamic visibility)", () => {
    render(
      <InstagramPostGrid
        items={[
          { id: "a", href: "https://a", image: IMAGE_URL, likeCount: 1284 },
        ]}
      />,
    );
    // Hidden completely per the annotated review — not rendered, not styled out.
    expect(screen.queryByTestId("badge-slot")).not.toBeInTheDocument();
  });

  it("renders the like-count pill via showLikeBadges only when likeCount is numeric", () => {
    render(
      <InstagramPostGrid
        showLikeBadges
        items={[
          { id: "a", href: "https://a", image: IMAGE_URL, likeCount: 1284 },
          { id: "b", href: "https://b", image: IMAGE_URL }, // no likeCount
        ]}
      />,
    );
    const badges = screen.getAllByTestId("badge-slot");
    // Exactly one pill — the post with a numeric like count. A missing count
    // never fabricates a pill (and never a zero).
    expect(badges).toHaveLength(1);
    expect(badges[0]).toHaveTextContent("1,284");
    expect(screen.getByLabelText("1,284 likes")).toBeInTheDocument();
    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });

  it("exposes an 'Open in Instagram' viewer action that opens the permalink in a new tab", () => {
    const openSpy = vi
      .spyOn(window, "open")
      .mockImplementation(() => null);
    render(<InstagramPostGrid items={baseItems} />);
    const actions = captured.provider[0].actions;
    const openAction = actions.find((a) => a.id === "open-in-instagram");
    expect(openAction).toBeDefined();
    expect(openAction?.ariaLabel).toBe("Open in Instagram");
    // Invoking the action opens the item's permalink with noopener isolation.
    const item = captured.provider[0].items[0];
    openAction?.onPress(item, { close() {}, next() {}, prev() {}, index: 0 });
    expect(openSpy).toHaveBeenCalledWith(
      "https://www.instagram.com/p/abc123/",
      "_blank",
      expect.stringContaining("noopener"),
    );
    openSpy.mockRestore();
  });

  it("provides a renderActions rail to the viewer", () => {
    render(<InstagramPostGrid items={baseItems} />);
    expect(typeof captured.viewer[0].renderActions).toBe("function");
  });

  it("skips items without an image", () => {
    const items: InstagramPostItem[] = [
      { id: "1", href: "https://www.instagram.com/p/a/", image: IMAGE_URL },
      {
        id: "2",
        href: "https://www.instagram.com/p/b/",
        image: "",
        caption: "no image",
      },
    ];
    render(<InstagramPostGrid items={items} />);
    expect(screen.getAllByTestId("thumb-card")).toHaveLength(1);
    expect(captured.provider[0].items).toHaveLength(1);
    expect(screen.queryByText("no image")).not.toBeInTheDocument();
  });

  // ── Dev-visible skip warning ────────────────────────────────────────────────
  it("warns in development when imageless items are skipped (8 → 6 tiles, dropped ids named)", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    // 8 posts; ids p3 and p6 have no resolvable image and must be dropped.
    const items: InstagramPostItem[] = Array.from({ length: 8 }, (_, i) => ({
      id: `p${i + 1}`,
      href: `https://www.instagram.com/p/p${i + 1}/`,
      image: i === 2 || i === 5 ? "" : IMAGE_URL,
    }));
    render(<InstagramPostGrid items={items} />);
    // Only the 6 imaged posts become tiles / feed items.
    expect(screen.getAllByTestId("thumb-card")).toHaveLength(6);
    expect(captured.provider[0].items).toHaveLength(6);
    // A single dev warning names exactly the two dropped ids.
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn).toHaveBeenCalledWith(
      "[instagram-post-grid] skipped 2 item(s) without a resolvable image: p3, p6",
    );
    warn.mockRestore();
  });

  it("stays silent in production even when imageless items are skipped", () => {
    vi.stubEnv("NODE_ENV", "production");
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(
      <InstagramPostGrid
        items={[
          { id: "keep", href: "https://x/keep", image: IMAGE_URL },
          { id: "drop", href: "https://x/drop", image: "" },
        ]}
      />,
    );
    expect(screen.getAllByTestId("thumb-card")).toHaveLength(1);
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
    vi.unstubAllEnvs();
  });

  it("renders custom itemsSlot content instead of the immersive feed", () => {
    render(
      <InstagramPostGrid
        itemsSlot={<div data-testid="custom-slot">custom</div>}
      />,
    );
    expect(screen.getByTestId("custom-slot")).toBeInTheDocument();
    // No immersive feed machinery when a raw slot is supplied.
    expect(screen.queryByTestId("feed-provider")).not.toBeInTheDocument();
    expect(screen.queryByTestId("immersive-viewer")).not.toBeInTheDocument();
  });

  it("applies a custom className to the section", () => {
    const { container } = render(
      <InstagramPostGrid items={baseItems} className="custom-class" />,
    );
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("renders no <video>, <script>, or tile-level anchor of its own (library owns media)", () => {
    // The pre-immersive block wrapped each tile in a Pressable <a> and rendered
    // its own <video> (which is why native controls had to be explicitly
    // disabled). The immersive library now owns media + navigation, so the
    // block itself emits neither — the old controls={false} regression is moot.
    // (The viewer rail's "Open in Instagram" anchor lives inside the viewer's
    // renderActions output, which the mocked ImmersiveViewer never invokes.)
    const { container } = render(<InstagramPostGrid items={baseItems} />);
    expect(container.querySelector("video")).toBeNull();
    expect(container.querySelector("script")).toBeNull();
    expect(container.querySelector("a")).toBeNull();
  });

  // ── B1: permalink egress is a real anchor ──────────────────────────────────
  it("renders the viewer's 'Open in Instagram' egress as a real anchor (href/target/rel)", () => {
    render(<InstagramPostGrid items={baseItems} />);
    const renderActions = captured.viewer[0]?.renderActions as (props: {
      item: MediaItem;
      actions: ImmersiveAction[];
    }) => React.ReactNode;
    expect(typeof renderActions).toBe("function");
    const item = captured.provider[0].items[0]; // photo post, has meta.href
    const { container } = render(<>{renderActions({ item, actions: [] })}</>);
    const anchor = container.querySelector(
      'a[aria-label="Open in Instagram"]',
    ) as HTMLAnchorElement | null;
    expect(anchor).not.toBeNull();
    expect(anchor?.getAttribute("href")).toBe(
      "https://www.instagram.com/p/abc123/",
    );
    expect(anchor?.getAttribute("target")).toBe("_blank");
    expect(anchor?.getAttribute("rel")).toContain("noopener");
    expect(anchor?.getAttribute("rel")).toContain("noreferrer");
  });

  // ── Expanded-UI cleanup: rail is a single Instagram-glyph egress ────────────
  it("renders no engagement stats and no text label in the viewer rail — just the Instagram glyph", () => {
    render(
      <InstagramPostGrid
        items={[
          {
            id: "counts",
            href: "https://www.instagram.com/reel/xyz/",
            image: IMAGE_URL,
            isVideo: true,
            videoUrl: VIDEO_URL,
            likeCount: 2841,
            commentCount: 96,
            viewCount: 38420,
          },
        ]}
      />,
    );
    const renderActions = captured.viewer[0]?.renderActions as (props: {
      item: MediaItem;
      actions: ImmersiveAction[];
    }) => React.ReactNode;
    const item = captured.provider[0].items[0];
    const { container } = render(<>{renderActions({ item, actions: [] })}</>);
    // ①–③ removed completely: no stat buttons, no counts anywhere.
    expect(container.querySelectorAll("button")).toHaveLength(0);
    expect(container.textContent).not.toContain("2,841");
    expect(container.textContent).not.toContain("96");
    expect(container.textContent).not.toContain("38,420");
    // ④ the egress is the Instagram glyph with no text label under it.
    const anchor = container.querySelector('a[aria-label="Open in Instagram"]');
    expect(anchor).not.toBeNull();
    expect(
      anchor!.querySelector('[data-name="lucide/instagram"]'),
    ).not.toBeNull();
    expect(anchor!.textContent).toBe("");
  });

  // ── Expanded-UI cleanup: caption card = @username badge + title only ────────
  it("renders a clickable @username badge in the viewer caption linking to the profile", () => {
    render(<InstagramPostGrid items={baseItems} username="@encapsa" />);
    const renderCaption = captured.viewer[0]?.renderCaption as (
      item: MediaItem,
    ) => React.ReactNode;
    expect(typeof renderCaption).toBe("function");
    const item = captured.provider[0].items[0];
    const { container } = render(<>{renderCaption(item)}</>);
    const badge = container.querySelector(
      'a[aria-label="Open @encapsa on Instagram"]',
    ) as HTMLAnchorElement | null;
    expect(badge).not.toBeNull();
    // Leading '@' in the prop is tolerated; the profile URL never doubles it.
    expect(badge!.getAttribute("href")).toBe(
      "https://www.instagram.com/encapsa/",
    );
    expect(badge!.getAttribute("target")).toBe("_blank");
    expect(badge!.getAttribute("rel")).toContain("noopener");
    expect(badge!.textContent).toContain("@encapsa");
    expect(
      badge!.querySelector('[data-name="lucide/instagram"]'),
    ).not.toBeNull();
  });

  it("degrades the caption badge to a non-clickable Instagram chip when no username is given", () => {
    render(<InstagramPostGrid items={baseItems} />);
    const renderCaption = captured.viewer[0]?.renderCaption as (
      item: MediaItem,
    ) => React.ReactNode;
    const item = captured.provider[0].items[0];
    const { container } = render(<>{renderCaption(item)}</>);
    // Never fabricate a handle: plain chip, no anchor.
    expect(container.querySelector("a")).toBeNull();
    expect(container.textContent).toContain("Instagram");
    expect(container.textContent).not.toContain("@");
  });

  it("shows the title exactly once in the caption card (no duplicate caption line)", () => {
    render(<InstagramPostGrid items={baseItems} username="encapsa" />);
    const renderCaption = captured.viewer[0]?.renderCaption as (
      item: MediaItem,
    ) => React.ReactNode;
    const item = captured.provider[0].items[0];
    const { container } = render(<>{renderCaption(item)}</>);
    const text = container.textContent ?? "";
    const occurrences = text.split(item.title).length - 1;
    expect(occurrences).toBe(1);
  });

  // ── B2: optixFlowConfig reaches the card via posterImgProps ─────────────────
  it("threads optixFlowConfig onto every card via posterImgProps", () => {
    const optixFlowConfig = { quality: 82 } as never;
    render(<InstagramPostGrid items={baseItems} optixFlowConfig={optixFlowConfig} />);
    expect(captured.cards).toHaveLength(baseItems.length);
    for (const card of captured.cards) {
      const posterImgProps = card.posterImgProps as Record<string, unknown>;
      expect(posterImgProps).toBeDefined();
      expect(posterImgProps.optixFlowConfig).toBe(optixFlowConfig);
    }
  });

  // ── B3: imageClassName reaches the card via posterImgProps.className ─────────
  it("threads imageClassName onto every card via posterImgProps.className", () => {
    render(<InstagramPostGrid items={baseItems} imageClassName="ig-poster" />);
    for (const card of captured.cards) {
      const posterImgProps = card.posterImgProps as Record<string, unknown>;
      expect(posterImgProps?.className).toBe("ig-poster");
    }
  });

  it("omits posterImgProps entirely when neither imageClassName nor optixFlowConfig is set", () => {
    render(<InstagramPostGrid items={baseItems} />);
    for (const card of captured.cards) {
      expect(card.posterImgProps).toBeUndefined();
    }
  });

  // ── B4: non-string ReactNode caption falls back cleanly (no crash / no [object Object]) ──
  it("falls back to imageAlt for the title when the caption is a non-string ReactNode", () => {
    render(
      <InstagramPostGrid
        items={[
          {
            id: "rich",
            href: "https://www.instagram.com/p/rich/",
            image: IMAGE_URL,
            imageAlt: "A latte with fern art",
            caption: <strong>Bold caption</strong>,
          },
        ]}
      />,
    );
    const [mapped] = captured.provider[0].items;
    // Title falls back to imageAlt; the rich caption is dropped (not stringified).
    expect(mapped.title).toBe("A latte with fern art");
    expect(mapped.caption).toBeUndefined();
    // Rendered tile title never shows "[object Object]".
    const title = screen.getByTestId("thumb-title");
    expect(title.textContent).toBe("A latte with fern art");
    expect(title.textContent).not.toContain("[object Object]");
  });

  it("uses the generic label when a non-string caption has no imageAlt", () => {
    render(
      <InstagramPostGrid
        items={[
          {
            id: "rich2",
            href: "https://www.instagram.com/p/rich2/",
            image: IMAGE_URL,
            caption: <em>markup only</em>,
          },
        ]}
      />,
    );
    const [mapped] = captured.provider[0].items;
    expect(mapped.title).toBe("Instagram post");
    expect(mapped.caption).toBeUndefined();
    expect(screen.getByTestId("thumb-title").textContent).not.toContain(
      "[object Object]",
    );
  });
});
