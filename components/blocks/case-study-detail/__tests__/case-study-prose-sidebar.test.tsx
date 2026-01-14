import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CaseStudyProseSidebar } from "../case-study-prose-sidebar";

// Mock dependencies
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

describe("CaseStudyProseSidebar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom content with title", () => {
    const customContent = <h1>Custom Case Study Title</h1>;
    render(<CaseStudyProseSidebar content={customContent} />);
    expect(screen.getByText("Custom Case Study Title")).toBeInTheDocument();
  });

  it("renders custom content", () => {
    const customContent = <p>Custom content paragraph</p>;
    render(<CaseStudyProseSidebar content={customContent} />);
    expect(screen.getByText("Custom content paragraph")).toBeInTheDocument();
  });
});

