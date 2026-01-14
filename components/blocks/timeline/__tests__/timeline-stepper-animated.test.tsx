import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { TimelineStepperAnimated } from "../timeline-stepper-animated";

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
    <img
      src={src}
      alt={alt}
      className={className}
      data-testid="mock-img"
    />
  ),
}));

vi.mock("../../../../lib/Pressable", () => ({
  Pressable: ({
    children,
    onClick,
    className,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
  }) => (
    <button onClick={onClick} className={className} data-testid="mock-pressable">
      {children}
    </button>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, size }: { name: string; size: number }) => (
    <span data-testid="mock-dynamic-icon" data-name={name} data-size={size}>
      {name}
    </span>
  ),
}));

vi.mock("../../../../lib/blockBrandedIconsAndPlaceholders", () => ({
  blockBrandedIconsAndPlaceholders: {
    placeholder1: "https://placeholder.com/1.jpg",
    placeholder2: "https://placeholder.com/2.jpg",
    placeholder3: "https://placeholder.com/3.jpg",
    placeholder4: "https://placeholder.com/4.jpg",
  },
}));

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

describe("TimelineStepperAnimated", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom heading", () => {
    const { getByText } = render(
      <TimelineStepperAnimated heading="Custom Heading" />
    );
    expect(getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom steps", () => {
    const customSteps = [
      {
        title: "Custom Step 1",
        imageSrc: "https://example.com/1.jpg",
        description: "Custom description 1",
      },
      {
        title: "Custom Step 2",
        imageSrc: "https://example.com/2.jpg",
        description: "Custom description 2",
      },
    ];
    const { getByText } = render(
      <TimelineStepperAnimated steps={customSteps} />
    );
    expect(getByText("Custom description 2")).toBeInTheDocument();
  });
});
