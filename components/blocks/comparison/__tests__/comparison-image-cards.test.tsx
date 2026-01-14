import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  ComparisonImageCards,
  type ComparisonImageCardsProps,
} from "../comparison-image-cards";

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

describe("ComparisonImageCards", () => {

  it("renders with custom heading and description", () => {
    render(
      <ComparisonImageCards
        heading="Custom Heading"
        description="Custom description"
      />
    );

    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
    expect(screen.getByText("Custom description")).toBeInTheDocument();
  });
});

