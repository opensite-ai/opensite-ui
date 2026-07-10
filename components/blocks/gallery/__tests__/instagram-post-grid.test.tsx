import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  InstagramPostGrid,
  type InstagramPostItem,
} from "../instagram-post-grid";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("@page-speed/video", () => ({
  // Captures `controls` so tests can assert the block explicitly disables it.
  // @page-speed/video defaults `preferNativeControls` to true, which would
  // otherwise render a native control bar INSIDE the Pressable <a> (invalid
  // interactive nesting where control clicks navigate away).
  Video: ({
    src,
    poster,
    controls,
    className,
  }: {
    src?: string;
    poster?: string;
    controls?: boolean;
    className?: string;
  }) => (
    <video
      src={src}
      poster={poster}
      className={className}
      data-testid="mock-video"
      data-controls={String(controls)}
    />
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name }: { name: string }) => (
    <span data-testid="mock-icon" data-name={name} />
  ),
}));

// Real Pressable is intentionally NOT mocked so that external-link target/rel
// attributes are exercised end-to-end.

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
  });

  it("returns null when items is empty", () => {
    const { container } = render(<InstagramPostGrid items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("returns null when items is undefined", () => {
    const { container } = render(<InstagramPostGrid heading="Ignored" />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders heading and image tiles for each post", () => {
    render(<InstagramPostGrid heading="Our Feed" items={baseItems} />);
    expect(screen.getByText("Our Feed")).toBeInTheDocument();
    expect(screen.getAllByTestId("mock-img")).toHaveLength(2);
    expect(screen.getByText("Morning pours")).toBeInTheDocument();
    expect(screen.getByText("Jul 1, 2026")).toBeInTheDocument();
  });

  it("renders a video for video-mode posts and skips it otherwise", () => {
    render(<InstagramPostGrid items={baseItems} />);
    const videos = screen.getAllByTestId("mock-video");
    expect(videos).toHaveLength(1);
    expect(videos[0]).toHaveAttribute("src", VIDEO_URL);
    expect(videos[0]).toHaveAttribute("poster", IMAGE_URL);
  });

  it("disables native video controls (no interactive control bar inside the tile anchor)", () => {
    render(<InstagramPostGrid items={baseItems} />);
    const videos = screen.getAllByTestId("mock-video");
    expect(videos).toHaveLength(1);
    // Must be an explicit `false`, not undefined — @page-speed/video defaults
    // preferNativeControls to true, which would nest a native control bar
    // inside the Pressable <a> where control clicks would navigate away.
    expect(videos[0]).toHaveAttribute("data-controls", "false");
  });

  it("does not render a video when isVideo is set but videoUrl is missing", () => {
    render(
      <InstagramPostGrid
        items={[{ id: "x", href: "https://x", image: IMAGE_URL, isVideo: true }]}
      />,
    );
    expect(screen.queryByTestId("mock-video")).not.toBeInTheDocument();
  });

  it("renders engagement counts only when present (never invents zeros)", () => {
    render(<InstagramPostGrid items={baseItems} />);
    // Post 1: like 128 + comment 12, no views.
    expect(screen.getByText("128")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
    // Post 2: like 342 + views 4,820, no comments.
    expect(screen.getByText("342")).toBeInTheDocument();
    expect(screen.getByText("4,820")).toBeInTheDocument();
    // No fabricated zero counts anywhere.
    expect(screen.queryByText("0")).not.toBeInTheDocument();
    // Accessible labels for the counts that exist.
    expect(screen.getByLabelText("128 likes")).toBeInTheDocument();
    expect(screen.getByLabelText("4,820 views")).toBeInTheDocument();
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
    expect(screen.getAllByTestId("mock-img")).toHaveLength(1);
    expect(screen.queryByText("no image")).not.toBeInTheDocument();
  });

  it("links each tile to its external permalink in a new tab", () => {
    render(<InstagramPostGrid items={baseItems} />);
    const link = screen
      .getAllByRole("link")
      .find(
        (el) =>
          el.getAttribute("href") === "https://www.instagram.com/p/abc123/",
      );
    expect(link).toBeDefined();
    expect(link).toHaveAttribute("target", "_blank");
    expect(link?.getAttribute("rel")).toContain("noopener");
  });

  it("applies a custom className to the section", () => {
    const { container } = render(
      <InstagramPostGrid items={baseItems} className="custom-class" />,
    );
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("renders no script tags", () => {
    const { container } = render(<InstagramPostGrid items={baseItems} />);
    expect(container.querySelector("script")).toBeNull();
  });
});
