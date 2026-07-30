import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ArticleSidebarSticky } from "../article-sidebar-sticky";

// Mock the Img component from @page-speed/img
vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

// Mock the DynamicIcon component
vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({
    name,
    size,
  }: {
    name?: React.ReactNode | string;
    size?: number;
  }) =>
    typeof name === "string" ? (
      <span data-testid={`icon-${name}`} data-size={size} />
    ) : (
      <>{name}</>
    ),
}));

describe("ArticleSidebarSticky", () => {
  it("renders custom title", () => {
    render(<ArticleSidebarSticky title="Custom Article Title" />);
    expect(screen.getByText("Custom Article Title")).toBeInTheDocument();
  });

  it("renders a back icon name dynamically without exposing raw text", () => {
    const iconName = "lucide/circle-arrow-left";

    render(
      <ArticleSidebarSticky
        backHref="/articles"
        backText="Back to articles"
        backIcon={iconName}
      />,
    );

    const backLinks = screen
      .getAllByText("Back to articles")
      .map((backText) => backText.closest("a, button"));
    expect(backLinks.length).toBeGreaterThan(0);
    backLinks.forEach((backLink) => {
      expect(backLink).not.toBeNull();
      expect(backLink).not.toHaveTextContent(iconName);
    });

    const icons = screen.getAllByTestId(`icon-${iconName}`);
    expect(icons.length).toBeGreaterThan(0);
    icons.forEach((icon) => {
      expect(icon).toHaveAttribute("data-size", "16");
    });
  });

  it("preserves a custom back icon element", () => {
    render(
      <ArticleSidebarSticky
        backHref="/articles"
        backText="Back to articles"
        backIcon={<span data-testid="custom-back-icon" />}
      />,
    );

    const customIcons = screen.getAllByTestId("custom-back-icon");
    expect(customIcons.length).toBeGreaterThan(0);
    customIcons.forEach((icon) => {
      expect(icon).toBeInTheDocument();
    });
  });
});
