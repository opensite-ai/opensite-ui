import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CaseStudyTocSocialSidebar } from "../case-study-toc-social-sidebar";

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  constructor() {}
}
window.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;

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

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({
    name,
    size,
    className,
  }: {
    name?: React.ReactNode | string;
    size?: number;
    className?: string;
  }) =>
    typeof name === "string" ? (
      <span
        data-testid="mock-icon"
        data-name={name}
        data-size={size}
        className={className}
      />
    ) : (
      <>{name}</>
    ),
}));

describe("CaseStudyTocSocialSidebar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom title", () => {
    render(<CaseStudyTocSocialSidebar title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders author information", () => {
    render(
      <CaseStudyTocSocialSidebar
        author={{ name: "John Doe", role: "Senior Developer" }}
      />
    );
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Senior Developer")).toBeInTheDocument();
  });

  it("renders custom, named, and default outcome icons dynamically", () => {
    render(
      <CaseStudyTocSocialSidebar
        outcomes={[
          {
            text: "String outcome",
            icon: "lucide/trophy",
            iconName: "lucide/ignored",
          },
          {
            text: "Custom outcome",
            icon: <span data-testid="custom-outcome-icon" />,
            iconName: "lucide/ignored",
          },
          { text: "Named outcome", iconName: "lucide/award" },
          { text: "Default outcome" },
        ]}
      />,
    );

    expect(
      screen
        .getAllByTestId("mock-icon")
        .map((icon) => icon.getAttribute("data-name")),
    ).toEqual([
      "lucide/trophy",
      "lucide/award",
      "lucide/check-circle-2",
    ]);
    expect(
      screen.getByText("String outcome").closest("li"),
    ).not.toHaveTextContent("lucide/trophy");
    expect(screen.getByTestId("custom-outcome-icon")).toBeInTheDocument();
  });

  it("suppresses empty and false custom icons while preserving zero", () => {
    render(
      <CaseStudyTocSocialSidebar
        outcomes={[
          { text: "Empty outcome", icon: "", iconName: "lucide/ignored" },
          { text: "False outcome", icon: false, iconName: "lucide/ignored" },
          { text: "Zero outcome", icon: 0, iconName: "lucide/ignored" },
        ]}
      />,
    );

    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
    expect(screen.getByText("Empty outcome").closest("li")).toHaveTextContent(
      "Empty outcome",
    );
    expect(screen.getByText("False outcome").closest("li")).toHaveTextContent(
      "False outcome",
    );
    expect(screen.getByText("Zero outcome").closest("li")).toHaveTextContent(
      "0Zero outcome",
    );
  });
});
