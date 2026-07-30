import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeatureIntegrationCards } from "../feature-integration-cards";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name }: { name?: React.ReactNode | string }) => (
    <span
      data-testid="mock-dynamic-icon"
      data-name={typeof name === "string" ? name : undefined}
    >
      {typeof name === "string" ? null : name}
    </span>
  ),
}));

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">{children}</a>
  ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
  logoPlaceholders: Array(20).fill("https://placeholder.com/logo.jpg"),
}));

describe("FeatureIntegrationCards", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<FeatureIntegrationCards title="Test Title" description="Test Description" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<FeatureIntegrationCards title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<FeatureIntegrationCards description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders integrations when provided", () => {
    const integrations = [
      { title: "Integration One", description: "Description one" },
      { title: "Integration Two", description: "Description two" },
    ];
    render(<FeatureIntegrationCards integrations={integrations} />);
    expect(screen.getByText("Integration One")).toBeInTheDocument();
    expect(screen.getByText("Integration Two")).toBeInTheDocument();
  });

  it("resolves icon slots dynamically while preserving image fallbacks", () => {
    const view = render(
      <FeatureIntegrationCards
        integrations={[
          {
            title: "String Icon",
            icon: "/fallback-string.svg",
            iconSlot: "lucide/plug",
            link: "/string-icon",
          },
          {
            title: "Empty Icon",
            icon: "/fallback-empty.svg",
            iconSlot: "",
          },
          {
            title: "False Icon",
            icon: "/fallback-false.svg",
            iconSlot: false,
          },
          {
            title: "Zero Icon",
            icon: "/fallback-zero.svg",
            iconSlot: 0,
          },
        ]}
      />,
    );

    const stringCard = screen.getByText("String Icon").closest("a")!;
    expect(
      stringCard.querySelector('[data-testid="mock-dynamic-icon"]'),
    ).toHaveAttribute("data-name", "lucide/plug");
    expect(stringCard).not.toHaveTextContent("lucide/plug");
    expect(screen.getAllByTestId("mock-img")).toHaveLength(3);

    view.rerender(
      <FeatureIntegrationCards
        integrations={[
          {
            title: "Custom Icon",
            iconSlot: <span data-testid="custom-icon" />,
          },
        ]}
      />,
    );
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FeatureIntegrationCards className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
