import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { OfferModalSheetNewsletter } from "../offer-modal-sheet-newsletter";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

describe("OfferModalSheetNewsletter", () => {
  it("renders without crashing", () => {
    const { container } = render(<OfferModalSheetNewsletter />);
    expect(container).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    const { container } = render(<OfferModalSheetNewsletter className="custom-class" />);
    expect(container).toBeInTheDocument();
  });
});
