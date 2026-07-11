import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroEventRegistration } from "../hero-event-registration";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">{children}</a>
  ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name }: { name?: string }) =>
    name ? <span data-testid="mock-icon" data-icon={name} /> : null,
}));

describe("HeroEventRegistration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<HeroEventRegistration heading="Test Heading" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<HeroEventRegistration heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<HeroEventRegistration description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [{ label: "Get Started", href: "/start", variant: "default" as const }];
    render(<HeroEventRegistration actions={actions} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<HeroEventRegistration heading="Test Heading" className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  describe("renderBadge null-guard", () => {
    it("renders no Badge element when badgeText, badgeIcon, and badgeSlot are all absent", () => {
      const { container } = render(<HeroEventRegistration heading="Event" />);
      expect(container.querySelector('[data-slot="badge"]')).toBeNull();
    });

    it("renders a Badge when badgeText is provided", () => {
      const { container } = render(
        <HeroEventRegistration heading="Event" badgeText="JUL 18" />,
      );
      const badge = container.querySelector('[data-slot="badge"]');
      expect(badge).not.toBeNull();
      expect(badge).toHaveTextContent("JUL 18");
    });

    it("renders a Badge when only badgeIcon is provided", () => {
      const { container } = render(
        <HeroEventRegistration heading="Event" badgeIcon="lucide/calendar" />,
      );
      expect(container.querySelector('[data-slot="badge"]')).not.toBeNull();
    });
  });

  describe("image-less location fallback", () => {
    it("renders datetime and venue in the text column when there is no image", () => {
      render(
        <HeroEventRegistration
          heading="Event"
          locationLabel="Jul 18, 2026 · 7:00 PM"
          locationSublabel="Main St"
        />,
      );
      expect(screen.getByText("Jul 18, 2026 · 7:00 PM")).toBeInTheDocument();
      expect(screen.getByText("Main St")).toBeInTheDocument();
    });

    it("renders no location content when image and location props are all absent", () => {
      const { container } = render(<HeroEventRegistration heading="Event" />);
      expect(
        container.querySelector('[data-icon="lucide/map-pin"]'),
      ).toBeNull();
    });

    it("renders the location exactly once (inside the image region) when an image is present", () => {
      const { container } = render(
        <HeroEventRegistration
          heading="Event"
          image={{ src: "https://example.com/e.jpg", alt: "Event" }}
          locationLabel="Jul 18, 2026 · 7:00 PM"
          locationSublabel="Main St"
        />,
      );
      expect(screen.getAllByText("Jul 18, 2026 · 7:00 PM")).toHaveLength(1);
      expect(screen.getAllByText("Main St")).toHaveLength(1);
      expect(
        container.querySelectorAll('[data-icon="lucide/map-pin"]'),
      ).toHaveLength(1);
    });
  });
});
