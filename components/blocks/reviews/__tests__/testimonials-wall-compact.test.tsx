import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { TestimonialsWallCompact } from "../testimonials-wall-compact";

vi.mock("../../../ui/avatar", () => ({
  Avatar: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="mock-avatar" className={className}>{children}</div>
  ),
  AvatarImage: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} data-testid="mock-avatar-image" />
  ),
  AvatarFallback: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="mock-avatar-fallback">{children}</span>
  ),
}));

vi.mock("../../../ui/badge", () => ({
  Badge: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <span data-testid="mock-badge" className={className}>{children}</span>
  ),
}));

vi.mock("../../../../lib/blockBrandedIconsAndPlaceholders", () => ({
  blockBrandedIconsAndPlaceholders: {
    avatar1: "https://placeholder.com/avatar1.jpg",
    avatar2: "https://placeholder.com/avatar2.jpg",
    avatar3: "https://placeholder.com/avatar3.jpg",
    avatar4: "https://placeholder.com/avatar4.jpg",
    avatar5: "https://placeholder.com/avatar5.jpg",
    avatar6: "https://placeholder.com/avatar6.jpg",
    avatar7: "https://placeholder.com/avatar7.jpg",
    avatar8: "https://placeholder.com/avatar8.jpg",
  },
}));

describe("TestimonialsWallCompact", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom heading", () => {
    const { container } = render(<TestimonialsWallCompact heading="Custom Heading" />);
    expect(container.textContent).toContain("Custom Heading");
  });
});
