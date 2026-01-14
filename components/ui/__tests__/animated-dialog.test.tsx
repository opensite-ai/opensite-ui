import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AnimatedDialog } from "../animated-dialog";

// Mock framer-motion to avoid animation issues in tests
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock @opensite/hooks
vi.mock("@opensite/hooks", () => ({
  useOnClickOutside: vi.fn(),
}));

describe("AnimatedDialog", () => {
  const mockOnOpenChange = vi.fn();

  afterEach(() => {
    mockOnOpenChange.mockClear();
  });

  it("renders title when provided", () => {
    render(
      <AnimatedDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        title="Test Title"
      >
        Content
      </AnimatedDialog>,
    );
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("renders eyebrow when provided", () => {
    render(
      <AnimatedDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        eyebrow="Test Eyebrow"
      >
        Content
      </AnimatedDialog>,
    );
    expect(screen.getByText("Test Eyebrow")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(
      <AnimatedDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        description="Test Description"
      >
        Content
      </AnimatedDialog>,
    );
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });
    await user.click(closeButton);

    expect(mockOnOpenChange).toHaveBeenCalledWith(false);
  });
    expect(closeButton.className).toContain("shrink-0");
    expect(closeButton.className).toContain("rounded-full");
    expect(closeButton.className).toContain("h-10");
    expect(closeButton.className).toContain("w-10");
  });
});
