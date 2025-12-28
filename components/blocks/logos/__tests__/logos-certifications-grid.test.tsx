import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { LogosCertificationsGrid } from "../logos-certifications-grid";

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

describe("LogosCertificationsGrid", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<LogosCertificationsGrid />);
    expect(screen.getByText("Our certifications say it all.")).toBeInTheDocument();
    expect(screen.getByText(/In non libero bibendum/)).toBeInTheDocument();
  });

  it("renders custom title and description", () => {
    render(
      <LogosCertificationsGrid
        title="Custom Title"
        description="Custom Description"
      />
    );
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText("Custom Description")).toBeInTheDocument();
  });

  it("renders button with default text", () => {
    render(<LogosCertificationsGrid />);
    expect(screen.getByText("Get in touch")).toBeInTheDocument();
  });

  it("renders custom button text and url", () => {
    render(
      <LogosCertificationsGrid
        buttonText="Contact Us"
        buttonUrl="/contact"
      />
    );
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
  });

  it("renders default logos", () => {
    render(<LogosCertificationsGrid />);
    const images = screen.getAllByTestId("mock-img");
    expect(images.length).toBe(6);
  });

  it("renders custom logos", () => {
    const customLogos = [
      { id: "cert-1", description: "Certification 1", image: "/cert1.png" },
      { id: "cert-2", description: "Certification 2", image: "/cert2.png" },
    ];
    render(<LogosCertificationsGrid logos={customLogos} />);
    expect(screen.getByAltText("Certification 1")).toBeInTheDocument();
    expect(screen.getByAltText("Certification 2")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<LogosCertificationsGrid className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders section element with proper structure", () => {
    const { container } = render(<LogosCertificationsGrid />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass("py-32");
  });

  it("renders icon in button", () => {
    render(<LogosCertificationsGrid />);
    expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
  });

  it("handles empty logos array", () => {
    render(<LogosCertificationsGrid logos={[]} />);
    expect(screen.getByText("Our certifications say it all.")).toBeInTheDocument();
  });
});
