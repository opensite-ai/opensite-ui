import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ListSearchableGrid } from "../list-searchable-grid";

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">
      {children}
    </a>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>
      icon
    </span>
  ),
}));

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, className, ...props }: React.PropsWithChildren<{ className?: string }>) => (
      <div className={className} data-testid="motion-div" {...props}>
        {children}
      </div>
    ),
  },
}));

describe("ListSearchableGrid", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<ListSearchableGrid />);
    expect(screen.getByText("Search the OpenSite AI resource library")).toBeInTheDocument();
    expect(screen.getByText("Filter guides, services, and playbooks with a quick keyword search.")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<ListSearchableGrid heading="Search Resources" />);
    expect(screen.getByText("Search Resources")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ListSearchableGrid description="Find what you need" />);
    expect(screen.getByText("Find what you need")).toBeInTheDocument();
  });

  it("renders items", () => {
    const items = [
      { title: "Claims Guidance", description: "Help with claims", icon: "lucide/file" },
      { title: "Coverage Audit", description: "Review your coverage", icon: "lucide/shield" },
    ];
    render(<ListSearchableGrid items={items} />);
    expect(screen.getByText("Claims Guidance")).toBeInTheDocument();
    expect(screen.getByText("Coverage Audit")).toBeInTheDocument();
  });

  it("renders search input with placeholder", () => {
    render(<ListSearchableGrid searchPlaceholder="Type to search..." />);
    expect(screen.getByPlaceholderText("Type to search...")).toBeInTheDocument();
  });

  it("applies custom className to section", () => {
    const { container } = render(<ListSearchableGrid className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
