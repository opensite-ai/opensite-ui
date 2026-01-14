import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { OfferModalMembershipImage } from "../offer-modal-membership-image";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

describe("OfferModalMembershipImage", () => {
  it("renders with required props", () => {
    const { container } = render(
      <OfferModalMembershipImage
        title="Test Membership Title"
        description="Test membership description"
      />
    );
    expect(container).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    const { container } = render(
      <OfferModalMembershipImage
        title="Test Membership Title"
        description="Test membership description"
        className="custom-class"
      />
    );
    expect(container).toBeInTheDocument();
  });
});
