import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { OfferModalNewsletterDiscount } from "../offer-modal-newsletter-discount";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

describe("OfferModalNewsletterDiscount", () => {
  it("renders without crashing", () => {
    const { container } = render(<OfferModalNewsletterDiscount />);
    expect(container).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    const { container } = render(<OfferModalNewsletterDiscount className="custom-class" />);
    expect(container).toBeInTheDocument();
  });
});
