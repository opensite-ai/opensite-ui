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
  }: {
    item: MediaItem;
    onOpen: (id: string) => void;
    size?: number | string;
    showDuration?: boolean;
    glyphMode?: string;
    badgeSlot?: React.ReactNode;
  }) => {
    captured.cards.push({ item, size, showDuration, glyphMode });
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
    expect(screen.getByText("Morning pours")).toBeInTheDocument();
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

  it("renders a like-count pill as the badgeSlot only when likeCount is numeric", () => {
    render(
      <InstagramPostGrid
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
    const { container } = render(<InstagramPostGrid items={baseItems} />);
    expect(container.querySelector("video")).toBeNull();
    expect(container.querySelector("script")).toBeNull();
    expect(container.querySelector("a")).toBeNull();
  });
});
