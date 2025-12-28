import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BannerEventPromo } from "../banner-event-promo";

vi.mock("../../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">{children}</a>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, size }: { name: string; size?: number }) => (
    <span data-testid="mock-icon" data-name={name} data-size={size} />
  ),
}));

describe("BannerEventPromo", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<BannerEventPromo />);
    expect(screen.getByText("GeneriCon 2024")).toBeInTheDocument();
    expect(screen.getByText(/Join us in Denver/)).toBeInTheDocument();
    expect(screen.getByText(/Register now/)).toBeInTheDocument();
  });

  it("renders with custom props", () => {
    render(
      <BannerEventPromo
        eventName="TechSummit 2025"
        eventDetails="Join us in San Francisco for the biggest tech event."
        buttonText="Get Tickets"
      />
    );
    expect(screen.getByText("TechSummit 2025")).toBeInTheDocument();
    expect(screen.getByText(/Join us in San Francisco/)).toBeInTheDocument();
    expect(screen.getByText(/Get Tickets/)).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<BannerEventPromo className="custom-class" />);
    const banner = container.firstChild as HTMLElement;
    expect(banner).toHaveClass("custom-class");
  });

  it("has primary background", () => {
    const { container } = render(<BannerEventPromo />);
    const banner = container.firstChild as HTMLElement;
    expect(banner).toHaveClass("bg-primary");
  });

  it("renders arrow icon", () => {
    render(<BannerEventPromo />);
    const icon = screen.getByTestId("mock-icon");
    expect(icon).toHaveAttribute("data-name", "lucide/arrow-right");
  });
});
