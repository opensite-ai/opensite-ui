import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
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

describe("CarouselMultiStepShowcase", () => {

  it("renders custom heading", () => {
    render(<CarouselMultiStepShowcase heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom subheading", () => {
    render(<CarouselMultiStepShowcase subheading="Custom Subheading" />);
    expect(screen.getByText("Custom Subheading")).toBeInTheDocument();
  });

  it("renders custom actions", () => {
    const steps = [
      { id: "s1", step: 1, title: "Step 1", description: "Desc 1", image: "img1.jpg" },
      { id: "s2", step: 2, title: "Step 2", description: "Desc 2", image: "img2.jpg" },
    ];
    render(<CarouselMultiStepShowcase steps={steps} actions={[{ label: "Start Now", href: "#" }]} />);
    // CTA only shows on last step, so we need to navigate there
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("routes action icons through DynamicIcon and preserves the trailing default", () => {
    const { container } = render(
      <CarouselMultiStepShowcase
        steps={[
          {
            id: "actions",
            step: 1,
            title: "Actions",
            description: "Action examples",
            image: "actions.jpg",
          },
        ]}
        actions={[
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
            label: "Default trailing",
            href: "/default",
          },
          {
            label: "Sentinel action",
            href: "/sentinel",
            icon: 0,
            iconAfter: false,
          },
          {
            label: "Trailing zero",
            href: "/trailing-zero",
            iconAfter: 0,
          },
          {
            label: "Empty action",
            href: "/empty",
            icon: "",
            iconAfter: "",
          },
          {
            label: "Hidden label",
            href: "/children",
            icon: "lucide/hidden",
            children: 0,
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

    const defaultAction = container.querySelector(
      '[href="/default"]',
    ) as HTMLElement;
    const defaultIcon = within(defaultAction).getByTestId("mock-icon");
    expect(defaultIcon).toHaveAttribute("data-name", "lucide/arrow-right");
    expect(defaultIcon).toHaveAttribute("data-size", "16");
    expect(defaultIcon).toHaveClass("ml-2");

    const sentinelAction = container.querySelector(
      '[href="/sentinel"]',
    ) as HTMLElement;
    expect(sentinelAction).toHaveTextContent("0Sentinel action");
    expect(
      within(sentinelAction).queryByTestId("mock-icon"),
    ).not.toBeInTheDocument();

    const trailingZero = container.querySelector(
      '[href="/trailing-zero"]',
    ) as HTMLElement;
    expect(trailingZero).toHaveTextContent("Trailing zero0");
    expect(
      within(trailingZero).queryByTestId("mock-icon"),
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
