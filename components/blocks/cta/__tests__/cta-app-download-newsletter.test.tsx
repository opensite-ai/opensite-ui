import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CtaAppDownloadNewsletter } from "../cta-app-download-newsletter";

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

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("CtaAppDownloadNewsletter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<CtaAppDownloadNewsletter appHeading="Test App Heading" appDescription="Test App Description" newsletterHeading="Test Newsletter Heading" newsletterDescription="Test Newsletter Description" />);
    expect(screen.getByText("Test App Heading")).toBeInTheDocument();
    expect(screen.getByText("Test App Description")).toBeInTheDocument();
    expect(screen.getByText("Test Newsletter Heading")).toBeInTheDocument();
    expect(screen.getByText("Test Newsletter Description")).toBeInTheDocument();
  });

  it("renders custom app heading", () => {
    render(<CtaAppDownloadNewsletter appHeading="Custom App Heading" />);
    expect(screen.getByText("Custom App Heading")).toBeInTheDocument();
  });

  it("renders custom newsletter heading", () => {
    render(<CtaAppDownloadNewsletter newsletterHeading="Custom Newsletter Heading" />);
    expect(screen.getByText("Custom Newsletter Heading")).toBeInTheDocument();
  });

  it("renders app actions when provided", () => {
    const appActions = [
      { label: "App Store", href: "https://apps.apple.com", variant: "default" as const },
      { label: "Google Play", href: "https://play.google.com", variant: "outline" as const },
    ];
    render(<CtaAppDownloadNewsletter appActions={appActions} />);
    expect(screen.getByText("App Store")).toBeInTheDocument();
    expect(screen.getByText("Google Play")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CtaAppDownloadNewsletter className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
