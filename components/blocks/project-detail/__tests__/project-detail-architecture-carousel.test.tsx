import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ProjectDetailArchitectureCarousel } from "../project-detail-architecture-carousel";

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

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(100).fill("/placeholder.jpg"),
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

vi.mock("@page-speed/lightbox", () => ({
  Lightbox: () => null,
}));

vi.mock("@page-speed/pdf-viewer", () => ({
  PDFViewer: () => null,
}));

describe("ProjectDetailArchitectureCarousel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom title", () => {
    render(<ProjectDetailArchitectureCarousel title="Modern Residence" />);
    expect(screen.getByText("Modern Residence")).toBeInTheDocument();
  });

  it("renders custom subtitle", () => {
    render(<ProjectDetailArchitectureCarousel subtitle="A contemporary home" />);
    expect(screen.getByText("A contemporary home")).toBeInTheDocument();
  });

  it("renders category, year, and location", () => {
    render(<ProjectDetailArchitectureCarousel category="Architecture" year="2024" location="Los Angeles" />);
    expect(screen.getByText("Architecture")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
    expect(screen.getByText("Los Angeles")).toBeInTheDocument();
  });

  it("renders content sections", () => {
    const sections = [
      { title: "Design Concept", content: "A seamless blend of indoor and outdoor living" },
    ];
    render(<ProjectDetailArchitectureCarousel sections={sections} />);
    expect(screen.getByText("Design Concept")).toBeInTheDocument();
    expect(screen.getByText("A seamless blend of indoor and outdoor living")).toBeInTheDocument();
  });

  it("applies custom className to section", () => {
    const { container } = render(<ProjectDetailArchitectureCarousel className="custom-class" title="Test Project" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("renders back action when provided", () => {
    render(<ProjectDetailArchitectureCarousel backAction={{ label: "Back to Projects", href: "/projects" }} />);
    expect(screen.getByText("Back to Projects")).toBeInTheDocument();
  });

  it("routes string and custom back action icons through DynamicIcon", () => {
    const { container, rerender } = render(
      <ProjectDetailArchitectureCarousel
        backAction={{
          label: "Back",
          href: "/back",
          icon: "lucide/arrow-left",
          iconAfter: "lucide/arrow-right",
          children: null,
          className: "custom-action",
        }}
      />,
    );
    const rawAction = container.querySelector('a[href="/back"]') as HTMLElement;
    expect(rawAction).toHaveClass("custom-action");
    expect(
      within(rawAction)
        .getAllByTestId("mock-icon")
        .map((icon) => icon.getAttribute("data-name")),
    ).toEqual(["lucide/arrow-left", "lucide/arrow-right"]);
    expect(
      within(rawAction).queryByText("lucide/arrow-left"),
    ).not.toBeInTheDocument();
    expect(
      within(rawAction).queryByText("lucide/arrow-right"),
    ).not.toBeInTheDocument();

    rerender(
      <ProjectDetailArchitectureCarousel
        backAction={{
          label: "Custom",
          href: "/custom",
          icon: <span data-testid="custom-before">before</span>,
          iconAfter: <span data-testid="custom-after">after</span>,
        }}
      />,
    );
    const customAction = container.querySelector(
      'a[href="/custom"]',
    ) as HTMLElement;
    expect(within(customAction).getByTestId("custom-before")).toBeInTheDocument();
    expect(within(customAction).getByTestId("custom-after")).toBeInTheDocument();
    expect(within(customAction).queryByTestId("mock-icon")).not.toBeInTheDocument();
  });

  it("preserves exact icon guards and nullish children composition", () => {
    const variants = [
      {
        href: "/empty",
        action: { label: "Empty", href: "/empty", icon: "", iconAfter: "" },
        text: "Empty",
      },
      {
        href: "/boundary",
        action: {
          label: "Boundary",
          href: "/boundary",
          icon: false,
          iconAfter: 0,
        },
        text: "Boundary0",
      },
      {
        href: "/false-child",
        action: {
          label: "Hidden false",
          href: "/false-child",
          icon: "lucide/hidden",
          children: false,
        },
        text: "",
      },
      {
        href: "/zero-child",
        action: {
          label: "Hidden zero",
          href: "/zero-child",
          icon: "lucide/hidden",
          children: 0,
        },
        text: "0",
      },
    ];
    const { container, rerender } = render(
      <ProjectDetailArchitectureCarousel backAction={variants[0].action} />,
    );

    variants.forEach(({ href, action, text }, index) => {
      if (index > 0) {
        rerender(<ProjectDetailArchitectureCarousel backAction={action} />);
      }
      const backAction = container.querySelector(
        `a[href="${href}"]`,
      ) as HTMLElement;
      expect(backAction).toHaveTextContent(text);
      expect(within(backAction).queryByTestId("mock-icon")).not.toBeInTheDocument();
    });

    rerender(
      <ProjectDetailArchitectureCarousel
        backAction={{
          label: "Hidden label",
          href: "/children",
          icon: "lucide/hidden-before",
          iconAfter: "lucide/hidden-after",
          children: <span>Custom children</span>,
        }}
      />,
    );
    const childrenAction = container.querySelector(
      'a[href="/children"]',
    ) as HTMLElement;
    expect(within(childrenAction).getByText("Custom children")).toBeInTheDocument();
    expect(within(childrenAction).queryByText("Hidden label")).not.toBeInTheDocument();
    expect(within(childrenAction).queryByTestId("mock-icon")).not.toBeInTheDocument();
  });

  it("preserves back action slots, optional actions, media, and fixed icons", () => {
    const heroImage = {
      src: "lucide/image-looking-url",
      alt: "Boundary hero",
    };
    const { container, rerender } = render(
      <ProjectDetailArchitectureCarousel
        backAction={{
          label: "Generated back",
          href: "/generated",
          icon: "lucide/generated",
        }}
        backActionSlot={<div>Custom back slot</div>}
        heroImage={heroImage}
        carouselImages={[{ src: "/carousel.jpg", alt: "Carousel" }]}
        enableLightbox
      />,
    );
    expect(screen.getByText("Custom back slot")).toBeInTheDocument();
    expect(container.querySelector('a[href="/generated"]')).not.toBeInTheDocument();
    expect(screen.getByAltText("Boundary hero")).toHaveAttribute(
      "src",
      "lucide/image-looking-url",
    );
    expect(
      container.querySelector('[data-name="lucide/image-looking-url"]'),
    ).not.toBeInTheDocument();
    expect(
      container.querySelector(
        '[data-name="lucide/maximize-2"][data-size="24"]',
      ),
    ).toBeInTheDocument();

    rerender(<ProjectDetailArchitectureCarousel heroImage={heroImage} />);
    expect(screen.queryByTestId("mock-pressable")).not.toBeInTheDocument();
    expect(screen.getByAltText("Boundary hero")).toBeInTheDocument();
  });
});
