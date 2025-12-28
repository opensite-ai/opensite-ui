import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { LinkPageGridCards } from "../link-page-grid-cards";

vi.mock("../../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">{children}</a>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

describe("LinkPageGridCards", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    const { container } = render(<LinkPageGridCards name="Test Studio" />);
    const wrapper = container.firstChild;
    expect(wrapper).toBeInTheDocument();
  });

  it("renders name", () => {
    render(<LinkPageGridCards name="Creative Studio" />);
    expect(screen.getByText("Creative Studio")).toBeInTheDocument();
  });

  it("renders bio when provided", () => {
    render(<LinkPageGridCards name="Test" bio="Design & Development" />);
    expect(screen.getByText("Design & Development")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<LinkPageGridCards name="Test" className="custom-class" />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("custom-class");
  });

  it("renders with light theme by default", () => {
    const { container } = render(<LinkPageGridCards name="Test" />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("bg-neutral-50");
  });

  it("renders with dark theme", () => {
    const { container } = render(<LinkPageGridCards name="Test" theme="dark" />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("bg-neutral-950");
  });

  it("renders links as cards", () => {
    const links = [
      { id: "1", label: "Portfolio", href: "https://example.com", description: "View work" },
      { id: "2", label: "Blog", href: "https://example.com/blog" },
    ];
    render(<LinkPageGridCards name="Test" links={links} />);
    expect(screen.getByText("Portfolio")).toBeInTheDocument();
    expect(screen.getByText("Blog")).toBeInTheDocument();
    expect(screen.getByText("View work")).toBeInTheDocument();
  });

  it("renders with 2 columns by default", () => {
    const { container } = render(<LinkPageGridCards name="Test" />);
    const grid = container.querySelector(".grid-cols-2");
    expect(grid).toBeInTheDocument();
  });

  it("renders with 3 columns when specified", () => {
    const { container } = render(<LinkPageGridCards name="Test" columns={3} />);
    const grid = container.querySelector(".sm\\:grid-cols-3");
    expect(grid).toBeInTheDocument();
  });

  it("renders powered by footer", () => {
    render(<LinkPageGridCards name="Test" />);
    expect(screen.getByText("Powered by OpenSite")).toBeInTheDocument();
  });
});
