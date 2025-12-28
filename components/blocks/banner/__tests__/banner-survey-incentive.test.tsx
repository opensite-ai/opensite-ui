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

  it("renders with default props", () => {
    render(<BannerSurveyIncentive />);
    expect(screen.getByText("Help us improve!")).toBeInTheDocument();
    expect(screen.getByText(/Take our 2-minute survey/)).toBeInTheDocument();
    expect(screen.getByText("Take Survey")).toBeInTheDocument();
  });

  it("renders with custom props", () => {
    render(
      <BannerSurveyIncentive
        title="Share Feedback"
        description="Get 30% off for completing our survey."
        buttonText="Start Now"
      />
    );
    expect(screen.getByText("Share Feedback")).toBeInTheDocument();
    expect(screen.getByText("Get 30% off for completing our survey.")).toBeInTheDocument();
    expect(screen.getByText("Start Now")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<BannerSurveyIncentive className="custom-class" />);
    const banner = container.firstChild as HTMLElement;
    expect(banner).toHaveClass("custom-class");
  });

  it("calls onDismiss when dismiss button is clicked", () => {
    const onDismiss = vi.fn();
    render(<BannerSurveyIncentive onDismiss={onDismiss} />);
    const dismissButtons = screen.getAllByTestId("mock-pressable");
    const dismissButton = dismissButtons[dismissButtons.length - 1];
    fireEvent.click(dismissButton);
    expect(onDismiss).toHaveBeenCalled();
  });

  it("hides banner after dismiss", () => {
    const { container } = render(<BannerSurveyIncentive />);
    const dismissButtons = screen.getAllByTestId("mock-pressable");
    const dismissButton = dismissButtons[dismissButtons.length - 1];
    fireEvent.click(dismissButton);
    expect(container.firstChild).toBeNull();
  });
});
