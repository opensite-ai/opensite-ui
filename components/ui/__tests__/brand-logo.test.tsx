import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrandLogo, type BrandLogoSize } from "../brand-logo";

vi.mock("@page-speed/img", () => ({
  Img: ({
    src,
    alt,
    className,
    loading,
  }: {
    src: string;
    alt: string;
    className?: string;
    loading?: string;
  }) => (
    <img
      src={src}
      alt={alt}
      className={className}
      data-loading={loading}
      data-testid="mock-img"
    />
  ),
}));

vi.mock("../../../lib/Pressable", () => ({
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

const LOGO_SRC = "https://cdn.example.com/brand-logo.png";

describe("BrandLogo", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ————————————————————————————————————————————————————————————————
  // Byte-compatibility: with `aspect` unset the emitted className must be
  // byte-identical to the pre-aspect SIZE_CLASSES output. ~76 hero blocks
  // render BrandLogo without an aspect prop and their compiled CSS (the
  // toastability safelist) is pinned to exactly these strings.
  // ————————————————————————————————————————————————————————————————

  it("renders the legacy xl class string byte-identically when aspect is unset", () => {
    render(<BrandLogo logo={{ src: LOGO_SRC, alt: "Acme" }} size="xl" />);

    expect(screen.getByTestId("mock-img").getAttribute("class")).toBe(
      "w-auto object-contain max-h-12 sm:max-h-14 lg:max-h-16",
    );
  });

  it("renders the legacy md class string byte-identically when aspect is unset", () => {
    render(<BrandLogo logo={{ src: LOGO_SRC, alt: "Acme" }} size="md" />);

    expect(screen.getByTestId("mock-img").getAttribute("class")).toBe(
      "w-auto object-contain max-h-8 sm:max-h-9 lg:max-h-10",
    );
  });

  it("keeps every legacy size string byte-identical when aspect is unset", () => {
    const legacy: Record<BrandLogoSize, string> = {
      sm: "w-auto object-contain max-h-6 sm:max-h-7",
      md: "w-auto object-contain max-h-8 sm:max-h-9 lg:max-h-10",
      lg: "w-auto object-contain max-h-10 sm:max-h-12 lg:max-h-14",
      xl: "w-auto object-contain max-h-12 sm:max-h-14 lg:max-h-16",
    };

    (Object.keys(legacy) as BrandLogoSize[]).forEach((size) => {
      const { unmount } = render(
        <BrandLogo logo={{ src: LOGO_SRC, alt: "Acme" }} size={size} />,
      );
      expect(screen.getByTestId("mock-img").getAttribute("class")).toBe(
        legacy[size],
      );
      unmount();
    });
  });

  it("defaults to the md horizontal string when neither size nor aspect is given", () => {
    render(<BrandLogo logo={{ src: LOGO_SRC, alt: "Acme" }} />);

    expect(screen.getByTestId("mock-img").getAttribute("class")).toBe(
      "w-auto object-contain max-h-8 sm:max-h-9 lg:max-h-10",
    );
  });

  it('treats an explicit aspect="horizontal" identically to unset', () => {
    const { unmount } = render(
      <BrandLogo logo={{ src: LOGO_SRC, alt: "Acme" }} size="xl" />,
    );
    const legacyClass = screen.getByTestId("mock-img").getAttribute("class");
    unmount();

    render(
      <BrandLogo
        logo={{ src: LOGO_SRC, alt: "Acme" }}
        size="xl"
        aspect="horizontal"
      />,
    );

    expect(screen.getByTestId("mock-img").getAttribute("class")).toBe(
      legacyClass,
    );
  });

  // ————————————————————————————————————————————————————————————————
  // New aspect table
  // ————————————————————————————————————————————————————————————————

  it('renders the square xl ceiling for aspect="square"', () => {
    render(
      <BrandLogo
        logo={{ src: LOGO_SRC, alt: "Acme" }}
        size="xl"
        aspect="square"
      />,
    );

    expect(screen.getByTestId("mock-img").getAttribute("class")).toBe(
      "w-auto object-contain max-h-40 max-w-full sm:max-h-44 lg:max-h-48",
    );
  });

  it('renders the vertical xl ceiling for aspect="vertical"', () => {
    render(
      <BrandLogo
        logo={{ src: LOGO_SRC, alt: "Acme" }}
        size="xl"
        aspect="vertical"
      />,
    );

    expect(screen.getByTestId("mock-img").getAttribute("class")).toBe(
      "w-auto object-contain max-h-48 max-w-full sm:max-h-56 lg:max-h-64",
    );
  });

  it("emits the full responsive triple for every square/vertical size", () => {
    const expected: Record<"square" | "vertical", Record<BrandLogoSize, string>> =
      {
        square: {
          sm: "w-auto object-contain max-h-10 max-w-full sm:max-h-12",
          md: "w-auto object-contain max-h-14 max-w-full sm:max-h-16 lg:max-h-20",
          lg: "w-auto object-contain max-h-24 max-w-full sm:max-h-28 lg:max-h-32",
          xl: "w-auto object-contain max-h-40 max-w-full sm:max-h-44 lg:max-h-48",
        },
        vertical: {
          sm: "w-auto object-contain max-h-12 max-w-full sm:max-h-14",
          md: "w-auto object-contain max-h-16 max-w-full sm:max-h-20 lg:max-h-24",
          lg: "w-auto object-contain max-h-28 max-w-full sm:max-h-32 lg:max-h-36",
          xl: "w-auto object-contain max-h-48 max-w-full sm:max-h-56 lg:max-h-64",
        },
      };

    (["square", "vertical"] as const).forEach((aspect) => {
      (Object.keys(expected[aspect]) as BrandLogoSize[]).forEach((size) => {
        const { unmount } = render(
          <BrandLogo
            logo={{ src: LOGO_SRC, alt: "Acme" }}
            size={size}
            aspect={aspect}
          />,
        );
        expect(screen.getByTestId("mock-img").getAttribute("class")).toBe(
          expected[aspect][size],
        );
        unmount();
      });
    });
  });

  // ————————————————————————————————————————————————————————————————
  // Unchanged behaviour (escape hatch, wrappers, guards, slot)
  // ————————————————————————————————————————————————————————————————

  it("appends logo.className last so it can override the aspect table", () => {
    render(
      <BrandLogo
        logo={{ src: LOGO_SRC, alt: "Acme", className: "rounded-full ring-2" }}
        size="xl"
        aspect="square"
      />,
    );

    expect(screen.getByTestId("mock-img").getAttribute("class")).toBe(
      "w-auto object-contain max-h-40 max-w-full sm:max-h-44 lg:max-h-48 rounded-full ring-2",
    );
  });

  it("keeps logoClassName on the wrapper, not the image", () => {
    render(
      <BrandLogo
        logo={{ src: LOGO_SRC, alt: "Acme" }}
        size="xl"
        aspect="vertical"
        logoClassName="mb-2"
      />,
    );

    const img = screen.getByTestId("mock-img");
    expect(img.getAttribute("class")).toBe(
      "w-auto object-contain max-h-48 max-w-full sm:max-h-56 lg:max-h-64",
    );
    expect(img.parentElement?.getAttribute("class")).toBe(
      "flex items-center mb-2",
    );
  });

  it("wraps the image in Pressable when logo.url is set", () => {
    render(
      <BrandLogo
        logo={{ src: LOGO_SRC, alt: "Acme", url: "/" }}
        size="xl"
        aspect="square"
      />,
    );

    const pressable = screen.getByTestId("mock-pressable");
    expect(pressable).toHaveAttribute("href", "/");
    expect(pressable.getAttribute("class")).toBe("flex items-center");
    expect(pressable.querySelector("img")?.getAttribute("class")).toBe(
      "w-auto object-contain max-h-40 max-w-full sm:max-h-44 lg:max-h-48",
    );
  });

  it("passes logoSlot through verbatim and ignores logo/aspect", () => {
    const { container } = render(
      <BrandLogo
        logo={{ src: LOGO_SRC, alt: "Acme" }}
        size="xl"
        aspect="square"
        logoSlot={<span data-testid="custom-slot">custom</span>}
      />,
    );

    expect(screen.getByTestId("custom-slot")).toBeInTheDocument();
    expect(container.querySelector("img")).toBeNull();
  });

  it("renders nothing when logo is missing or has no src", () => {
    const { container: noLogo } = render(<BrandLogo size="xl" />);
    expect(noLogo).toBeEmptyDOMElement();

    const { container: nullSrc } = render(
      <BrandLogo
        logo={{ src: undefined, alt: "Acme" }}
        size="xl"
        aspect="square"
      />,
    );
    expect(nullSrc).toBeEmptyDOMElement();

    const { container: emptySrc } = render(
      <BrandLogo logo={{ src: "", alt: "Acme" }} size="xl" aspect="vertical" />,
    );
    expect(emptySrc).toBeEmptyDOMElement();
  });

  it("falls back to the legacy horizontal row for an unknown aspect value", () => {
    // Stored payloads are untyped JSON; a hallucinated enum value must not throw.
    render(
      <BrandLogo
        logo={{ src: LOGO_SRC, alt: "Acme" }}
        size="xl"
        aspect={"sqaure" as unknown as "square"}
      />,
    );

    expect(screen.getByTestId("mock-img").getAttribute("class")).toBe(
      "w-auto object-contain max-h-12 sm:max-h-14 lg:max-h-16",
    );
  });

  it('falls back to alt "Logo" and eager loading', () => {
    render(<BrandLogo logo={{ src: LOGO_SRC }} size="xl" aspect="square" />);

    const img = screen.getByTestId("mock-img");
    expect(img).toHaveAttribute("alt", "Logo");
    expect(img).toHaveAttribute("data-loading", "eager");
  });
});
