import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { LinkPageMinimalProfile } from "../link-page-minimal-profile";

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

describe("LinkPageMinimalProfile", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    const { container } = render(<LinkPageMinimalProfile name="Test User" />);
    const wrapper = container.firstChild;
    expect(wrapper).toBeInTheDocument();
  });

  it("renders name", () => {
    render(<LinkPageMinimalProfile name="John Doe" />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("renders bio when provided", () => {
    render(<LinkPageMinimalProfile name="Test" bio="My bio text" />);
    expect(screen.getByText("My bio text")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<LinkPageMinimalProfile name="Test" className="custom-class" />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("custom-class");
  });

  it("renders with light theme by default", () => {
    const { container } = render(<LinkPageMinimalProfile name="Test" />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("bg-white");
  });

  it("renders with dark theme", () => {
    const { container } = render(<LinkPageMinimalProfile name="Test" theme="dark" />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("bg-neutral-900");
  });

  it("renders links when provided", () => {
    const links = [
      { id: "1", label: "Portfolio", href: "https://example.com" },
      { id: "2", label: "Blog", href: "https://example.com/blog" },
    ];
    render(<LinkPageMinimalProfile name="Test" links={links} />);
    expect(screen.getByText("Portfolio")).toBeInTheDocument();
    expect(screen.getByText("Blog")).toBeInTheDocument();
  });

  it("renders powered by footer", () => {
    render(<LinkPageMinimalProfile name="Test" />);
    expect(screen.getByText("Powered by OpenSite")).toBeInTheDocument();
  });
});
