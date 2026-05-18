import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  HeroTechCarousel,
  HERO_TECH_CAROUSEL_MAX_ITEMS,
  type HeroPanelItem,
} from "../hero-tech-carousel";

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
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

// Lightweight mock for ImageSlider so background carousel rendering is
// deterministic and we can assert how many images it received.
vi.mock("../../../ui/image-slider", () => ({
  ImageSlider: ({
    images,
  }: {
    images: { src?: string; alt: string }[];
  }) => (
    <div data-testid="image-slider" data-image-count={images.length}>
      {images.map((image, idx) => (
        <img
          key={idx}
          src={image.src}
          alt={image.alt}
          data-testid="image-slider-image"
        />
      ))}
    </div>
  ),
}));

describe("HeroTechCarousel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders nothing in the panels track when items is missing or empty", () => {
    const { container, rerender } = render(<HeroTechCarousel />);
    expect(
      container.querySelector('[data-slot="hero-tech-carousel-panels"]'),
    ).toBeNull();

    rerender(<HeroTechCarousel items={[]} />);
    expect(
      container.querySelector('[data-slot="hero-tech-carousel-panels"]'),
    ).toBeNull();
  });

  it("renders a single panel with title and content", () => {
    const items: HeroPanelItem[] = [
      { title: "Panel One", content: "Supporting copy" },
    ];
    const { container } = render(<HeroTechCarousel items={items} />);
    expect(screen.getByText("Panel One")).toBeInTheDocument();
    expect(screen.getByText("Supporting copy")).toBeInTheDocument();
    expect(
      container.querySelectorAll('[data-slot="hero-tech-carousel-panel"]')
        .length,
    ).toBe(1);
  });

  it("renders dynamically based on item count (1-4)", () => {
    for (const count of [1, 2, 3, 4]) {
      const items: HeroPanelItem[] = Array.from({ length: count }, (_, i) => ({
        title: `Panel ${i + 1}`,
      }));
      const { container, unmount } = render(
        <HeroTechCarousel items={items} />,
      );
      expect(
        container.querySelectorAll('[data-slot="hero-tech-carousel-panel"]')
          .length,
      ).toBe(count);
      unmount();
    }
  });

  it("caps the number of rendered items at the documented max", () => {
    const items: HeroPanelItem[] = Array.from({ length: 6 }, (_, i) => ({
      title: `Panel ${i + 1}`,
    }));
    const { container } = render(<HeroTechCarousel items={items} />);
    expect(HERO_TECH_CAROUSEL_MAX_ITEMS).toBe(4);
    expect(
      container.querySelectorAll('[data-slot="hero-tech-carousel-panel"]')
        .length,
    ).toBe(4);
    expect(screen.queryByText("Panel 5")).not.toBeInTheDocument();
    expect(screen.queryByText("Panel 6")).not.toBeInTheDocument();
  });

  it("renders a single background image when one media item is provided", () => {
    const items: HeroPanelItem[] = [
      {
        title: "Solo BG",
        backgroundMedia: [{ src: "/bg.jpg", alt: "bg" }],
      },
    ];
    render(<HeroTechCarousel items={items} />);
    // Static image path: no slider mounted.
    expect(screen.queryByTestId("image-slider")).not.toBeInTheDocument();
    // Background image is rendered via the Img mock.
    const imgs = screen.getAllByTestId("mock-img");
    expect(imgs.some((img) => img.getAttribute("src") === "/bg.jpg")).toBe(
      true,
    );
  });

  it("mounts the autoplay slider when 2+ background media items are provided", () => {
    const items: HeroPanelItem[] = [
      {
        title: "Slider BG",
        backgroundMedia: [
          { src: "/a.jpg", alt: "a" },
          { src: "/b.jpg", alt: "b" },
          { src: "/c.jpg", alt: "c" },
        ],
      },
    ];
    render(<HeroTechCarousel items={items} />);
    const slider = screen.getByTestId("image-slider");
    expect(slider).toBeInTheDocument();
    expect(slider.getAttribute("data-image-count")).toBe("3");
  });

  it("renders the logo with object-contain by default", () => {
    const items: HeroPanelItem[] = [
      {
        logo: {
          src: "/logo.svg",
          alt: "Brand",
          className: "custom-logo-img",
        },
        title: "With Logo",
      },
    ];
    render(<HeroTechCarousel items={items} />);
    const logo = screen
      .getAllByTestId("mock-img")
      .find((img) => img.getAttribute("src") === "/logo.svg");
    expect(logo).toBeDefined();
    expect(logo?.className).toContain("object-contain");
    expect(logo?.className).toContain("max-h-8");
    expect(logo?.className).toContain("custom-logo-img");
  });

  it("uses compact title sizing when a logo is present", () => {
    const items: HeroPanelItem[] = [
      {
        logo: { src: "/logo.svg", alt: "Brand" },
        title: "With Logo",
      },
    ];
    render(<HeroTechCarousel items={items} />);
    expect(screen.getByRole("heading", { name: "With Logo" })).toHaveClass(
      "text-lg",
    );
    expect(screen.getByRole("heading", { name: "With Logo" })).not.toHaveClass(
      "text-3xl",
    );
  });

  it("uses LogoConfig url for linked logos", () => {
    const items: HeroPanelItem[] = [
      {
        logo: { src: "/logo.svg", alt: "Brand", url: "/home" },
        title: "Linked Logo",
      },
    ];
    render(<HeroTechCarousel items={items} />);
    expect(screen.getByRole("link", { name: "Brand" })).toHaveAttribute(
      "href",
      "/home",
    );
  });

  it("renders a logoSlot without requiring a logo config", () => {
    const items: HeroPanelItem[] = [
      {
        logoSlot: <div data-testid="custom-logo">Custom Logo</div>,
        title: "Slot Logo",
      },
    ];
    render(<HeroTechCarousel items={items} />);
    expect(screen.getByTestId("custom-logo")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Slot Logo" })).toHaveClass(
      "text-lg",
    );
  });

  it("does not apply logo title sizing for non-image logo configs", () => {
    const items: HeroPanelItem[] = [
      {
        logo: { title: "Text Logo" },
        title: "No Image Logo",
      },
    ];
    render(<HeroTechCarousel items={items} />);
    expect(screen.queryByText("Text Logo")).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "No Image Logo" }),
    ).not.toHaveClass("text-lg");
  });

  it("renders action buttons when actions are provided", () => {
    const items: HeroPanelItem[] = [
      {
        title: "With Actions",
        actions: [
          { label: "Get Started", href: "/start" },
          { label: "Learn More", href: "/about", variant: "outline" },
        ],
      },
    ];
    render(<HeroTechCarousel items={items} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
    expect(screen.getByText("Learn More")).toBeInTheDocument();
  });

  it("supports React node title and content", () => {
    const items: HeroPanelItem[] = [
      {
        title: <span data-testid="custom-title">Rich Title</span>,
        content: <em data-testid="custom-content">Rich content</em>,
      },
    ];
    render(<HeroTechCarousel items={items} />);
    expect(screen.getByTestId("custom-title")).toBeInTheDocument();
    expect(screen.getByTestId("custom-content")).toBeInTheDocument();
  });

  it("applies custom className to the section", () => {
    const items: HeroPanelItem[] = [{ title: "Test" }];
    const { container } = render(
      <HeroTechCarousel items={items} className="custom-class" />,
    );
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("works with no media, no logo, no actions — minimal panel", () => {
    const items: HeroPanelItem[] = [{ title: "Minimal" }];
    const { container } = render(<HeroTechCarousel items={items} />);
    expect(screen.getByText("Minimal")).toBeInTheDocument();
    expect(
      container.querySelectorAll('[data-slot="hero-tech-carousel-panel"]')
        .length,
    ).toBe(1);
    expect(screen.queryByTestId("image-slider")).not.toBeInTheDocument();
  });
});
