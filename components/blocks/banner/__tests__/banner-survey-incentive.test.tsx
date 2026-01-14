import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BannerSurveyIncentive } from "../banner-survey-incentive";

vi.mock("../../../../lib/Pressable", () => ({
  Pressable: ({ children, onClick, href, className }: { children: React.ReactNode; onClick?: () => void; href?: string; className?: string }) => (
    <button onClick={onClick} data-href={href} className={className} data-testid="mock-pressable">{children}</button>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, size }: { name: string; size?: number }) => (
    <span data-testid="mock-icon" data-name={name} data-size={size} />
  ),
}));

describe("BannerSurveyIncentive", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with custom props", () => {
    render(
      <BannerSurveyIncentive
        title="Share Feedback"
        description="Get 30% off for completing our survey."
        actions={[{ label: "Start Now", href: "#", size: "sm" }]}
      />
    );
    expect(screen.getByText("Share Feedback")).toBeInTheDocument();
    expect(screen.getByText("Get 30% off for completing our survey.")).toBeInTheDocument();
    expect(screen.getByText("Start Now")).toBeInTheDocument();
  });
});
