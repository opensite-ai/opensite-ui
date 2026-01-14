import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CarouselHorizontalCards } from "../carousel-horizontal-cards";

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

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      className,
    }: {
      children: React.ReactNode;
      className?: string;
    }) => <div className={className}>{children}</div>,
  },
}));

describe("CarouselHorizontalCards", () => {

  it("renders custom heading", () => {
    render(<CarouselHorizontalCards heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom subtitle", () => {
    render(<CarouselHorizontalCards subtitle="Custom Subtitle" />);
    expect(screen.getByText("Custom Subtitle")).toBeInTheDocument();
  });

  it("renders custom items", () => {
    const customItems = [
      {
        id: "1",
        imageSrc: "custom1.jpg",
        title: "Custom Card 1",
        count: 42,
        countLabel: "Items",
      },
      {
        id: "2",
        imageSrc: "custom2.jpg",
        title: "Custom Card 2",
        count: 100,
        countLabel: "Projects",
      },
    ];
    render(<CarouselHorizontalCards items={customItems} />);
    expect(screen.getByText("Custom Card 1")).toBeInTheDocument();
    expect(screen.getByText("Custom Card 2")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
  });

  it("renders card count labels", () => {
    const items = [
      {
        id: "1",
        imageSrc: "img.jpg",
        title: "Card",
        count: 50,
        countLabel: "Projects",
      },
    ];
    render(<CarouselHorizontalCards items={items} />);
    expect(screen.getByText("Projects")).toBeInTheDocument();
  });

  it("renders heading as a link", () => {
    render(
      <CarouselHorizontalCards
        heading="Linked Heading"
        headingHref="/custom-link"
      />
    );
    const link = screen.getByText("Linked Heading").closest("a");
    expect(link).toHaveAttribute("href", "/custom-link");
  });
    expect(heading).toHaveAttribute("id", "carousel-title");
  });
});

