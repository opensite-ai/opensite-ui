import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { ReviewsListVerified } from "../reviews-list-verified";

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

vi.mock("../../../ui/separator", () => ({
  Separator: ({ className }: { className?: string }) => (
    <hr data-testid="mock-separator" className={className} />
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

vi.mock("../../../../lib/blockBrandedIconsAndPlaceholders", () => ({
  blockBrandedIconsAndPlaceholders: {
    avatar1: "https://placeholder.com/avatar1.jpg",
    avatar2: "https://placeholder.com/avatar2.jpg",
    avatar3: "https://placeholder.com/avatar3.jpg",
    avatar4: "https://placeholder.com/avatar4.jpg",
    avatar5: "https://placeholder.com/avatar5.jpg",
  },
}));

describe("ReviewsListVerified", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    const { container } = render(<ReviewsListVerified />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<ReviewsListVerified className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders section element with proper structure", () => {
    const { container } = render(<ReviewsListVerified />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("renders custom title", () => {
    const { container } = render(<ReviewsListVerified title="Custom Reviews" />);
    expect(container.textContent).toContain("Custom Reviews");
  });
});
