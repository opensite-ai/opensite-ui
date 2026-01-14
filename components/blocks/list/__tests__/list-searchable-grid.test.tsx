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
    expect(screen.getByText("Claims Guidance")).toBeInTheDocument();
    expect(screen.queryByText("Coverage Audit")).not.toBeInTheDocument();
  });
});
