import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatsCardGroup } from "../stats-card-group";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({
    name,
    className,
  }: {
    name?: React.ReactNode;
    className?: string;
  }) =>
    typeof name === "string" ? (
      <span data-testid="mock-icon" data-icon-name={name} className={className}>
        icon
      </span>
    ) : (
      <>{name}</>
    ),
}));

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("StatsCardGroup", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", () => {
    const { container } = render(<StatsCardGroup stats={[]} />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders stats when provided", () => {
    const stats = [
      { icon: "lucide/users", value: "2,000+", label: "Happy Customers" },
      { icon: "lucide/star", value: "4.9/5", label: "Average Rating" },
    ];
    render(<StatsCardGroup stats={stats} />);
    expect(screen.getByText("2,000+")).toBeInTheDocument();
    expect(screen.getByText("Happy Customers")).toBeInTheDocument();
    expect(screen.getByText("4.9/5")).toBeInTheDocument();
    expect(screen.getByText("Average Rating")).toBeInTheDocument();
  });

  it("routes iconSlot strings while preserving slot fallback and avatar media", () => {
    const { container } = render(
      <StatsCardGroup
        avatars={[
          {
            src: "lucide/avatar-looking-image",
            alt: "Boundary avatar",
          },
        ]}
        stats={[
          {
            value: "1",
            label: "String slot",
            icon: "lucide/ignored",
            iconSlot: "lucide/sparkles",
            showAvatars: true,
            className: "string-slot-stat",
          },
          {
            value: "2",
            label: "Custom slot",
            icon: "lucide/ignored-custom",
            iconSlot: <span data-testid="custom-icon-slot">custom</span>,
            className: "custom-slot-stat",
          },
          {
            value: "3",
            label: "Empty fallback",
            icon: "lucide/empty-fallback",
            iconSlot: "",
            className: "empty-slot-stat",
          },
          {
            value: "4",
            label: "False fallback",
            icon: "lucide/false-fallback",
            iconSlot: false,
            className: "false-slot-stat",
          },
          {
            value: "5",
            label: "Zero fallback",
            icon: "lucide/zero-fallback",
            iconSlot: 0,
            className: "zero-slot-stat",
          },
        ]}
      />,
    );

    const stringIcon = container.querySelector(
      '.string-slot-stat [data-icon-name="lucide/sparkles"]',
    ) as HTMLElement;
    expect(stringIcon).toBeInTheDocument();
    expect(stringIcon.closest(".h-12")).not.toBeInTheDocument();
    expect(
      container.querySelector(".string-slot-stat") as HTMLElement,
    ).not.toHaveTextContent("lucide/sparkles");
    expect(
      container.querySelector('[data-icon-name="lucide/ignored"]'),
    ).not.toBeInTheDocument();

    const customIcon = screen.getByTestId("custom-icon-slot");
    expect(customIcon.closest(".h-12")).not.toBeInTheDocument();
    expect(
      container.querySelector('[data-icon-name="lucide/ignored-custom"]'),
    ).not.toBeInTheDocument();

    for (const [selector, iconName] of [
      [".empty-slot-stat", "lucide/empty-fallback"],
      [".false-slot-stat", "lucide/false-fallback"],
      [".zero-slot-stat", "lucide/zero-fallback"],
    ]) {
      const icon = container.querySelector(
        `${selector} [data-icon-name="${iconName}"]`,
      ) as HTMLElement;
      expect(icon).toBeInTheDocument();
      expect(icon.closest(".h-12")).toBeInTheDocument();
    }

    expect(screen.getByAltText("Boundary avatar")).toHaveAttribute(
      "src",
      "lucide/avatar-looking-image",
    );
    expect(
      container.querySelector('[data-icon-name="lucide/avatar-looking-image"]'),
    ).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<StatsCardGroup className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
