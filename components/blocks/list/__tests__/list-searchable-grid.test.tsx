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

  it("renders default heading", () => {
    render(<ListSearchableGrid />);
    expect(
      screen.getByText("Search the OpenSite AI resource library")
    ).toBeInTheDocument();
  });

  it("filters items based on search input", () => {
    render(<ListSearchableGrid />);
    const input = screen.getByLabelText("Search");
    fireEvent.change(input, { target: { value: "Claims" } });
    expect(screen.getByText("Claims Guidance")).toBeInTheDocument();
    expect(screen.queryByText("Coverage Audit")).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ListSearchableGrid className="custom-class" />
    );
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });
});
