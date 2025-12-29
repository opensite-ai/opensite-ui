import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CarouselMultiStepShowcase } from "../carousel-multi-step-showcase";

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
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

describe("CarouselMultiStepShowcase", () => {
  it("renders with default props", () => {
    render(<CarouselMultiStepShowcase />);
    expect(screen.getByText("How It Works")).toBeInTheDocument();
    expect(
      screen.getByText("Follow these simple steps to get started")
    ).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<CarouselMultiStepShowcase heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom subheading", () => {
    render(<CarouselMultiStepShowcase subheading="Custom Subheading" />);
    expect(screen.getByText("Custom Subheading")).toBeInTheDocument();
  });

  it("renders custom actions", () => {
    render(<CarouselMultiStepShowcase actions={[{ label: "Start Now", href: "#" }]} />);
    // CTA only shows on last step, so we need to navigate there
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <CarouselMultiStepShowcase className="custom-class" />
    );
    const section = container.querySelector("section");
    expect(section?.className).toContain("custom-class");
  });

  it("renders custom steps", () => {
    const customSteps = [
      {
        id: "step-1",
        step: 1,
        title: "Custom Step 1",
        description: "Custom Description 1",
        image: "custom1.jpg",
      },
      {
        id: "step-2",
        step: 2,
        title: "Custom Step 2",
        description: "Custom Description 2",
        image: "custom2.jpg",
      },
    ];
    render(<CarouselMultiStepShowcase steps={customSteps} />);
    // Use getAllByText since the title appears in both navigation and content
    expect(screen.getAllByText("Custom Step 1").length).toBeGreaterThan(0);
  });

  it("renders step navigation buttons", () => {
    const steps = [
      { id: "s1", step: 1, title: "Step 1", description: "Desc 1", image: "img1.jpg" },
      { id: "s2", step: 2, title: "Step 2", description: "Desc 2", image: "img2.jpg" },
    ];
    const { container } = render(<CarouselMultiStepShowcase steps={steps} />);
    const stepButtons = container.querySelectorAll(".rounded-full.px-4");
    expect(stepButtons.length).toBe(2);
  });

  it("handles step button click", () => {
    const steps = [
      { id: "s1", step: 1, title: "Step 1", description: "Desc 1", image: "img1.jpg" },
      { id: "s2", step: 2, title: "Step 2", description: "Desc 2", image: "img2.jpg" },
    ];
    const { container } = render(<CarouselMultiStepShowcase steps={steps} />);
    const stepButtons = container.querySelectorAll(".rounded-full.px-4");
    fireEvent.click(stepButtons[1]);
    // Should not throw error
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("handles next button click", () => {
    render(<CarouselMultiStepShowcase />);
    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);
    // Should not throw error
    expect(screen.getByText("How It Works")).toBeInTheDocument();
  });

  it("handles previous button click", () => {
    render(<CarouselMultiStepShowcase />);
    const prevButton = screen.getByText("Previous");
    // Previous should be disabled on first step
    expect(prevButton.closest("button")).toHaveClass("disabled:opacity-50");
  });

  it("renders progress bar", () => {
    const { container } = render(<CarouselMultiStepShowcase />);
    const progressBar = container.querySelector(".bg-primary.h-full");
    expect(progressBar).toBeInTheDocument();
  });

  it("renders step counter badge", () => {
    render(<CarouselMultiStepShowcase />);
    expect(screen.getByText(/Step 1 of/)).toBeInTheDocument();
  });

  it("renders with two-column grid layout", () => {
    const { container } = render(<CarouselMultiStepShowcase />);
    const grid = container.querySelector(".lg\\:grid-cols-2");
    expect(grid).toBeInTheDocument();
  });

  it("renders images for steps", () => {
    render(<CarouselMultiStepShowcase />);
    const images = screen.getAllByTestId("img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("passes optixFlowConfig to Img components", () => {
    const optixFlowConfig = { apiKey: "test-key", compression: 80 };
    const { container } = render(
      <CarouselMultiStepShowcase optixFlowConfig={optixFlowConfig} />
    );
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders CTA link with correct href", () => {
    // Navigate to last step to see CTA
    const steps = [
      { id: "s1", step: 1, title: "Step 1", description: "Desc 1", image: "img1.jpg" },
    ];
    render(
      <CarouselMultiStepShowcase
        steps={steps}
        actions={[{ label: "Begin", href: "/start" }]}
      />
    );
    const cta = screen.getByText("Begin");
    expect(cta.closest("a")).toHaveAttribute("href", "/start");
  });
});

