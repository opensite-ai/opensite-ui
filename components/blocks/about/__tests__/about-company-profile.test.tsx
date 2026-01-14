import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { AboutCompanyProfile } from "../about-company-profile";

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
  avatarPlaceholders: Array(20).fill("https://placeholder.com/avatar.jpg"),
}));

describe("AboutCompanyProfile", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(
      <AboutCompanyProfile
        title="Test Title"
        description="Test Description"
        achievementsTitle="Test Achievements Title"
      />
    );
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("Test Achievements Title")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<AboutCompanyProfile title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<AboutCompanyProfile description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders custom achievements title and description", () => {
    render(<AboutCompanyProfile achievementsTitle="Custom Achievements" achievementsDescription="Custom achievements description" />);
    expect(screen.getByText("Custom Achievements")).toBeInTheDocument();
    expect(screen.getByText("Custom achievements description")).toBeInTheDocument();
  });

  it("renders companies section when companies provided", () => {
    const companies = [{ src: "https://example.com/logo.png", alt: "Company Logo" }];
    render(<AboutCompanyProfile companies={companies} companiesTitle="Custom Companies" />);
    expect(screen.getByText("Custom Companies")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<AboutCompanyProfile className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
