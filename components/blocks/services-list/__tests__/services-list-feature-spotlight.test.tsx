import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ServicesListFeatureSpotlight } from "../services-list-feature-spotlight";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, className, ...props }: React.PropsWithChildren<{ className?: string }>) => (
      <div className={className} data-testid="motion-div" {...props}>
        {children}
      </div>
    ),
  },
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({
    name,
    className,
    size,
  }: {
    name?: React.ReactNode;
    className?: string;
    size?: number;
  }) =>
    typeof name === "string" ? (
      <span
        data-testid="mock-icon"
        data-name={name}
        data-size={size}
        className={className}
      >
        icon
      </span>
    ) : (
      <>{name}</>
    ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(20).fill("https://placeholder.com/image.jpg"),
}));

describe("ServicesListFeatureSpotlight", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with explicit heading and subheading", () => {
    render(
      <ServicesListFeatureSpotlight
        heading="Service advantages built for modern teams"
        subheading="The OpenSite AI approach"
      />
    );
    expect(screen.getByText("Service advantages built for modern teams")).toBeInTheDocument();
    expect(screen.getByText("The OpenSite AI approach")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<ServicesListFeatureSpotlight heading="Our Key Features" />);
    expect(screen.getByText("Our Key Features")).toBeInTheDocument();
  });

  it("renders custom subheading", () => {
    render(<ServicesListFeatureSpotlight subheading="Why choose us" />);
    expect(screen.getByText("Why choose us")).toBeInTheDocument();
  });

  it("renders features", () => {
    const features = [
      { id: "1", title: "Fast Performance", description: "Lightning fast load times", iconName: "lucide/zap" },
      { id: "2", title: "Secure", description: "Enterprise-grade security", iconName: "lucide/shield" },
    ];
    render(<ServicesListFeatureSpotlight features={features} />);
    expect(screen.getByText("Fast Performance")).toBeInTheDocument();
    expect(screen.getByText("Secure")).toBeInTheDocument();
  });

  it("renders feature descriptions", () => {
    const features = [
      { id: "1", title: "Feature", description: "This is a detailed description of the feature", iconName: "lucide/star" },
    ];
    render(<ServicesListFeatureSpotlight features={features} />);
    expect(screen.getByText("This is a detailed description of the feature")).toBeInTheDocument();
  });

  it("applies custom className to section", () => {
    const { container } = render(
      <ServicesListFeatureSpotlight
        className="custom-class"
        heading="Test Heading"
      />
    );
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("routes truthy icons through DynamicIcon and preserves persistent wrappers", () => {
    const { container } = render(
      <ServicesListFeatureSpotlight
        features={[
          {
            id: "raw",
            title: "Raw",
            icon: "lucide/star",
            iconName: "lucide/ignored",
            className: "raw-feature",
          },
          {
            id: "custom",
            title: "Custom",
            icon: <span data-testid="custom-icon">custom</span>,
            iconName: "lucide/ignored-custom",
            className: "custom-feature",
          },
          {
            id: "empty-fallback",
            title: "Empty fallback",
            icon: "",
            iconName: "lucide/empty-fallback",
            className: "empty-fallback-feature",
          },
          {
            id: "false-fallback",
            title: "False fallback",
            icon: false,
            iconName: "lucide/false-fallback",
            className: "false-fallback-feature",
          },
          {
            id: "zero-fallback",
            title: "Zero fallback",
            icon: 0,
            iconName: "lucide/zero-fallback",
            className: "zero-fallback-feature",
          },
          {
            id: "empty",
            title: "Empty only",
            icon: "",
            className: "empty-feature",
          },
          {
            id: "false",
            title: "False only",
            icon: false,
            className: "false-feature",
          },
          {
            id: "zero",
            title: "Zero only",
            icon: 0,
            className: "zero-feature",
          },
        ]}
      />,
    );

    const rawShell = container.querySelector(
      ".raw-feature .h-12.w-12",
    ) as HTMLElement;
    const rawIcon = within(rawShell).getByTestId("mock-icon");
    expect(rawIcon).toHaveAttribute("data-name", "lucide/star");
    expect(rawIcon).toHaveAttribute("data-size", "24");
    expect(within(rawShell).queryByText("lucide/star")).not.toBeInTheDocument();
    expect(
      within(
        container.querySelector(
          ".custom-feature .h-12.w-12",
        ) as HTMLElement,
      ).getByTestId("custom-icon"),
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-name="lucide/ignored-custom"]'),
    ).not.toBeInTheDocument();

    for (const [selector, name] of [
      [".empty-fallback-feature", "lucide/empty-fallback"],
      [".false-fallback-feature", "lucide/false-fallback"],
      [".zero-fallback-feature", "lucide/zero-fallback"],
    ]) {
      expect(
        within(
          container.querySelector(`${selector} .h-12.w-12`) as HTMLElement,
        ).getByTestId("mock-icon"),
      ).toHaveAttribute("data-name", name);
    }

    for (const selector of [
      ".empty-feature",
      ".false-feature",
      ".zero-feature",
    ]) {
      const shell = container.querySelector(
        `${selector} .h-12.w-12`,
      ) as HTMLElement;
      expect(shell).toBeEmptyDOMElement();
    }
  });

  it("preserves truthy feature slots and falsy slot fallback", () => {
    const features = [
      { id: "array", title: "Array feature", icon: "lucide/array" },
    ];
    const { rerender } = render(
      <ServicesListFeatureSpotlight
        features={features}
        featuresSlot={false}
      />,
    );
    expect(screen.getByText("Array feature")).toBeInTheDocument();

    rerender(
      <ServicesListFeatureSpotlight
        features={features}
        featuresSlot={<div>Custom features slot</div>}
      />,
    );
    expect(screen.getByText("Custom features slot")).toBeInTheDocument();
    expect(screen.queryByText("Array feature")).not.toBeInTheDocument();
    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
  });

  it("keeps feature images and copy on their original paths", () => {
    const { container } = render(
      <ServicesListFeatureSpotlight
        features={[
          {
            id: "boundaries",
            title: "Boundaries",
            eyebrow: "lucide/eyebrow-copy",
            description: "lucide/description-copy",
            image: {
              src: "lucide/image-looking-url",
              alt: "Feature media",
            },
            className: "boundary-feature",
          },
        ]}
      />,
    );
    expect(screen.getByText("lucide/eyebrow-copy")).toBeInTheDocument();
    expect(screen.getByText("lucide/description-copy")).toBeInTheDocument();
    expect(screen.getByAltText("Feature media")).toHaveAttribute(
      "src",
      "lucide/image-looking-url",
    );
    expect(
      container.querySelector('[data-name="lucide/image-looking-url"]'),
    ).not.toBeInTheDocument();
    expect(
      container.querySelector('[data-name="lucide/description-copy"]'),
    ).not.toBeInTheDocument();
    expect(
      container.querySelector(".boundary-feature .h-12.w-12"),
    ).toBeEmptyDOMElement();
  });
});
