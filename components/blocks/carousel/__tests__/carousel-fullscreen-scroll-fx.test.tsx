import { afterEach, beforeEach, describe, it, expect, vi } from "vitest";
import {
  act,
  render,
  screen,
  fireEvent,
  within,
} from "@testing-library/react";
import { CarouselFullscreenScrollFx } from "../carousel-fullscreen-scroll-fx";

// Mock the Img component
vi.mock("@page-speed/img", () => ({
  Img: ({
    src,
    alt,
    className,
  }: {
    src: string;
    alt: string;
    className?: string;
  }) => <img src={src} alt={alt} className={className} data-testid="img" />,
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
        data-testid="mock-icon"
        data-name={name}
        data-size={size}
        className={className}
      />
    ) : (
      <>{name}</>
    ),
}));

// Mock scrollIntoView for jsdom
Element.prototype.scrollIntoView = vi.fn();

const defaultMatchMedia = window.matchMedia;
let animationFrames = new Map<number, FrameRequestCallback>();
let nextAnimationFrameId = 1;

function createRect(top: number, height: number): DOMRect {
  return {
    x: 0,
    y: top,
    top,
    left: 0,
    right: 1200,
    bottom: top + height,
    width: 1200,
    height,
    toJSON: () => ({}),
  };
}

function setCarouselGeometry(
  container: HTMLElement,
  geometry: { top: number; trackHeight: number; viewportHeight: number },
) {
  const track = container.querySelector(
    '[data-carousel-scroll-track="true"]',
  ) as HTMLElement;
  const viewport = container.querySelector(
    '[data-carousel-sticky-viewport="true"]',
  ) as HTMLElement;

  vi.spyOn(track, "getBoundingClientRect").mockImplementation(() =>
    createRect(geometry.top, geometry.trackHeight),
  );
  vi.spyOn(viewport, "getBoundingClientRect").mockImplementation(() =>
    createRect(Math.max(geometry.top, 0), geometry.viewportHeight),
  );

  return { track, viewport };
}

function flushAnimationFrames() {
  act(() => {
    const pendingFrames = Array.from(animationFrames.values());
    animationFrames.clear();
    pendingFrames.forEach((callback) => callback(performance.now()));
  });
}

describe("CarouselFullscreenScrollFx", () => {
  beforeEach(() => {
    animationFrames = new Map();
    nextAnimationFrameId = 1;

    vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
      const frameId = nextAnimationFrameId++;
      animationFrames.set(frameId, callback);
      return frameId;
    });
    vi.spyOn(window, "cancelAnimationFrame").mockImplementation((frameId) => {
      animationFrames.delete(frameId);
    });
    vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: 0,
    });
  });

  afterEach(() => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      writable: true,
      value: defaultMatchMedia,
    });
    vi.restoreAllMocks();
  });

  it("renders custom slides", () => {
    const customSlides = [
      {
        id: "slide-1",
        title: "Custom Title 1",
        subtitle: "Custom Subtitle 1",
        description: "Custom Description 1",
        image: "custom1.jpg",
      },
      {
        id: "slide-2",
        title: "Custom Title 2",
        subtitle: "Custom Subtitle 2",
        description: "Custom Description 2",
        image: "custom2.jpg",
      },
    ];
    render(<CarouselFullscreenScrollFx slides={customSlides} />);
    expect(screen.getByText("Custom Title 1")).toBeInTheDocument();
    expect(screen.getByText("Custom Title 2")).toBeInTheDocument();
  });

  it("renders slide subtitles", () => {
    const slides = [
      {
        id: "slide-1",
        title: "Title",
        subtitle: "Test Subtitle",
        description: "Description",
        image: "img.jpg",
      },
    ];
    render(<CarouselFullscreenScrollFx slides={slides} />);
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
  });

  it("renders slide descriptions", () => {
    const slides = [
      {
        id: "slide-1",
        title: "Title",
        subtitle: "Subtitle",
        description: "Test Description",
        image: "img.jpg",
      },
    ];
    render(<CarouselFullscreenScrollFx slides={slides} />);
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("routes slide action icons through DynamicIcon and preserves children", () => {
    const { container } = render(
      <CarouselFullscreenScrollFx
        slides={[
          {
            id: "actions",
            title: "Actions",
            image: "actions.jpg",
            actions: [
              {
                label: "String action",
                href: "/string",
                icon: "lucide/leading",
                iconAfter: "lucide/trailing",
                className: "custom-action",
              },
              {
                label: "Custom action",
                href: "/custom",
                icon: <span data-testid="custom-leading-icon" />,
                iconAfter: <span data-testid="custom-trailing-icon" />,
              },
              {
                label: "Sentinel action",
                href: "/sentinel",
                icon: 0,
                iconAfter: 0,
              },
              {
                label: "Empty action",
                href: "/empty",
                icon: "",
                iconAfter: false,
              },
              {
                label: "Hidden label",
                href: "/children",
                icon: "lucide/hidden",
                children: 0,
              },
            ],
          },
        ]}
      />,
    );

    const stringAction = container.querySelector(
      '[href="/string"]',
    ) as HTMLElement;
    expect(
      within(stringAction).getAllByTestId("mock-icon").map((icon) =>
        icon.getAttribute("data-name"),
      ),
    ).toEqual(["lucide/leading", "lucide/trailing"]);
    expect(stringAction).not.toHaveTextContent("lucide/leading");
    expect(stringAction).not.toHaveTextContent("lucide/trailing");
    expect(stringAction).toHaveClass("custom-action");

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
    expect(sentinelAction).toHaveTextContent("0Sentinel action0");
    expect(
      within(sentinelAction).queryByTestId("mock-icon"),
    ).not.toBeInTheDocument();

    const emptyAction = container.querySelector(
      '[href="/empty"]',
    ) as HTMLElement;
    expect(
      within(emptyAction).queryByTestId("mock-icon"),
    ).not.toBeInTheDocument();

    const childrenAction = container.querySelector(
      '[href="/children"]',
    ) as HTMLElement;
    expect(childrenAction).toHaveTextContent("0");
    expect(childrenAction).not.toHaveTextContent("Hidden label");
    expect(
      within(childrenAction).queryByTestId("mock-icon"),
    ).not.toBeInTheDocument();
  });

  it("renders navigation dots", () => {
    const slides = [
      { id: "s1", title: "Slide 1", subtitle: "Sub 1", description: "Desc 1", image: "img1.jpg" },
      { id: "s2", title: "Slide 2", subtitle: "Sub 2", description: "Desc 2", image: "img2.jpg" },
    ];
    render(<CarouselFullscreenScrollFx slides={slides} />);
    // 2 navigation dots + 1 scroll indicator button on first slide = 3 buttons
    const dots = screen.getAllByRole("button");
    expect(dots.length).toBe(3);
  });

  it("handles navigation dot click", () => {
    const slides = [
      { id: "s1", title: "Slide 1", subtitle: "Sub 1", description: "Desc 1", image: "img1.jpg" },
      { id: "s2", title: "Slide 2", subtitle: "Sub 2", description: "Desc 2", image: "img2.jpg" },
    ];
    const { container } = render(<CarouselFullscreenScrollFx slides={slides} />);
    setCarouselGeometry(container, {
      top: 600,
      trackHeight: 1800,
      viewportHeight: 600,
    });
    const dots = screen.getAllByRole("button");
    fireEvent.click(dots[1]);
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 1800,
      behavior: "smooth",
    });
  });

  it("renders slide counter", () => {
    const slides = [
      { id: "s1", title: "Slide 1", subtitle: "Sub 1", description: "Desc 1", image: "img1.jpg" },
      { id: "s2", title: "Slide 2", subtitle: "Sub 2", description: "Desc 2", image: "img2.jpg" },
    ];
    render(<CarouselFullscreenScrollFx slides={slides} />);
    expect(screen.getByText("01 / 02")).toBeInTheDocument();
  });

  it("renders scroll indicator on non-last slides", () => {
    const slides = [
      { id: "s1", title: "Slide 1", subtitle: "Sub 1", description: "Desc 1", image: "img1.jpg" },
      { id: "s2", title: "Slide 2", subtitle: "Sub 2", description: "Desc 2", image: "img2.jpg" },
    ];
    render(<CarouselFullscreenScrollFx slides={slides} />);
    expect(screen.getByText("Scroll")).toBeInTheDocument();
  });

  it("renders with custom overlay color", () => {
    const slides = [
      {
        id: "slide-1",
        title: "Title",
        subtitle: "Subtitle",
        description: "Description",
        image: "img.jpg",
        overlayColor: "rgba(255, 0, 0, 0.5)",
      },
    ];
    const { container } = render(<CarouselFullscreenScrollFx slides={slides} />);
    // Component should render without errors
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders slides with scoped carousel semantics", () => {
    const slides = [
      { id: "test-slide", title: "Title", subtitle: "Sub", description: "Desc", image: "img.jpg" },
    ];
    const { container } = render(<CarouselFullscreenScrollFx slides={slides} />);
    const slideElement = container.querySelector('[role="group"]');
    expect(slideElement).toBeInTheDocument();
    expect(slideElement).toHaveAttribute("aria-roledescription", "slide");
    expect(slideElement).toHaveAttribute("aria-label", "Slide 1 of 1");
  });

  it("uses a document scroll track with controls scoped to the sticky viewport", () => {
    const slides = [
      { id: "s1", title: "Slide 1", image: "img1.jpg" },
      { id: "s2", title: "Slide 2", image: "img2.jpg" },
      { id: "s3", title: "Slide 3", image: "img3.jpg" },
    ];

    const { container } = render(
      <>
        <div data-testid="before">Before</div>
        <CarouselFullscreenScrollFx slides={slides} />
        <div data-testid="after">After</div>
      </>,
    );

    const track = container.querySelector(
      '[data-carousel-scroll-track="true"]',
    ) as HTMLElement;
    const viewport = container.querySelector(
      '[data-carousel-sticky-viewport="true"]',
    ) as HTMLElement;
    const navigation = screen.getByRole("navigation", {
      name: "Carousel navigation",
    });

    expect(track).toContainElement(viewport);
    expect(viewport).toContainElement(navigation);
    expect(viewport).toHaveClass("sticky");
    expect(
      track.querySelectorAll('[data-carousel-scroll-step="true"]'),
    ).toHaveLength(2);
    expect(track.querySelector(".fixed")).not.toBeInTheDocument();
    expect(track.querySelector(".overflow-y-auto")).not.toBeInTheDocument();
  });

  it("derives the active slide from section-relative document progress", () => {
    const slides = [
      { id: "s1", title: "Slide 1", image: "img1.jpg" },
      { id: "s2", title: "Slide 2", image: "img2.jpg" },
      { id: "s3", title: "Slide 3", image: "img3.jpg" },
    ];
    const geometry = { top: 600, trackHeight: 2400, viewportHeight: 800 };
    const { container } = render(<CarouselFullscreenScrollFx slides={slides} />);
    setCarouselGeometry(container, geometry);

    flushAnimationFrames();
    expect(screen.getByText("01 / 03")).toBeInTheDocument();

    geometry.top = -800;
    fireEvent.scroll(window);
    flushAnimationFrames();
    expect(screen.getByText("02 / 03")).toBeInTheDocument();
    expect(
      within(
        screen.getByRole("navigation", { name: "Carousel navigation" }),
      ).getByRole("button", { name: "Go to Slide 2" }),
    ).toHaveAttribute("aria-current", "step");

    geometry.top = -2400;
    fireEvent.scroll(window);
    flushAnimationFrames();
    expect(screen.getByText("03 / 03")).toBeInTheDocument();
  });

  it("recomputes slide progress from resized viewport geometry", () => {
    const slides = [
      { id: "s1", title: "Slide 1", image: "img1.jpg" },
      { id: "s2", title: "Slide 2", image: "img2.jpg" },
      { id: "s3", title: "Slide 3", image: "img3.jpg" },
    ];
    const geometry = { top: -1200, trackHeight: 2400, viewportHeight: 800 };
    const { container } = render(<CarouselFullscreenScrollFx slides={slides} />);
    setCarouselGeometry(container, geometry);

    flushAnimationFrames();
    expect(screen.getByText("03 / 03")).toBeInTheDocument();

    geometry.trackHeight = 3600;
    geometry.viewportHeight = 1200;
    fireEvent.resize(window);
    flushAnimationFrames();
    expect(screen.getByText("02 / 03")).toBeInTheDocument();
  });

  it("navigates relative to the carousel's document position", () => {
    const slides = [
      { id: "s1", title: "Slide 1", image: "img1.jpg" },
      { id: "s2", title: "Slide 2", image: "img2.jpg" },
      { id: "s3", title: "Slide 3", image: "img3.jpg" },
    ];
    const { container } = render(<CarouselFullscreenScrollFx slides={slides} />);
    setCarouselGeometry(container, {
      top: 600,
      trackHeight: 2600,
      viewportHeight: 800,
    });
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: 200,
    });

    fireEvent.click(
      within(
        screen.getByRole("navigation", { name: "Carousel navigation" }),
      ).getByRole("button", { name: "Go to Slide 2" }),
    );

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 1700,
      behavior: "smooth",
    });
  });

  it("supports dynamic slides without changing the component's hook order", () => {
    const slides = [
      { id: "s1", title: "Slide 1", image: "img1.jpg" },
      { id: "s2", title: "Slide 2", image: "img2.jpg" },
      { id: "s3", title: "Slide 3", image: "img3.jpg" },
    ];
    const { container, rerender } = render(
      <CarouselFullscreenScrollFx slides={slides} />,
    );
    const geometry = { top: -1600, trackHeight: 2400, viewportHeight: 800 };
    setCarouselGeometry(container, geometry);
    flushAnimationFrames();
    expect(screen.getByText("03 / 03")).toBeInTheDocument();

    expect(() =>
      rerender(<CarouselFullscreenScrollFx slides={[slides[0]]} />),
    ).not.toThrow();
    flushAnimationFrames();

    expect(screen.getByText("01 / 01")).toBeInTheDocument();
    expect(
      screen.queryByRole("navigation", { name: "Carousel navigation" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Scroll to next slide" }),
    ).not.toBeInTheDocument();
    expect(container.querySelectorAll('[role="group"]')).toHaveLength(1);
  });

  it("treats each direct slidesSlot child as one full-viewport slide", () => {
    const { container } = render(
      <CarouselFullscreenScrollFx
        slidesSlot={[
          <div key="slot-1">Custom slot 1</div>,
          <button key="slot-2" type="button">
            Custom slot 2
          </button>,
        ]}
      />,
    );
    const slotSlides = container.querySelectorAll('[role="group"]');

    expect(slotSlides).toHaveLength(2);
    expect(screen.getByText("01 / 02")).toBeInTheDocument();
    expect(slotSlides[0]).not.toHaveAttribute("aria-hidden", "true");
    expect(slotSlides[1]).toHaveAttribute("aria-hidden", "true");
    expect(slotSlides[1]).toHaveAttribute("inert");
  });

  it("uses instant document navigation when reduced motion is requested", () => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      writable: true,
      value: (query: string) => ({
        matches: query === "(prefers-reduced-motion: reduce)",
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }),
    });
    const slides = [
      { id: "s1", title: "Slide 1", image: "img1.jpg" },
      { id: "s2", title: "Slide 2", image: "img2.jpg" },
    ];
    const { container } = render(<CarouselFullscreenScrollFx slides={slides} />);
    setCarouselGeometry(container, {
      top: 0,
      trackHeight: 1600,
      viewportHeight: 800,
    });

    fireEvent.click(
      within(
        screen.getByRole("navigation", { name: "Carousel navigation" }),
      ).getByRole("button", { name: "Go to Slide 2" }),
    );

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 800,
      behavior: "auto",
    });
  });

  it("keeps controls scoped to multiple carousel instances", () => {
    const slides = [
      { id: "shared-1", title: "Slide 1", image: "img1.jpg" },
      { id: "shared-2", title: "Slide 2", image: "img2.jpg" },
    ];
    const { container } = render(
      <>
        <CarouselFullscreenScrollFx sectionId="first-carousel" slides={slides} />
        <CarouselFullscreenScrollFx sectionId="second-carousel" slides={slides} />
      </>,
    );
    const firstCarousel = container.querySelector("#first-carousel");
    const secondCarousel = container.querySelector("#second-carousel");

    expect(firstCarousel).toContainElement(
      within(firstCarousel as HTMLElement).getByRole("navigation", {
        name: "Carousel navigation",
      }),
    );
    expect(secondCarousel).toContainElement(
      within(secondCarousel as HTMLElement).getByRole("navigation", {
        name: "Carousel navigation",
      }),
    );
    expect(container.querySelectorAll('[role="group"]')).toHaveLength(4);
  });
});
