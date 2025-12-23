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

  it("renders when open is true", () => {
    render(
      <AnimatedDialog open={true} onOpenChange={mockOnOpenChange}>
        Test Content
      </AnimatedDialog>
    );
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("does not render when open is false", () => {
    render(
      <AnimatedDialog open={false} onOpenChange={mockOnOpenChange}>
        Test Content
      </AnimatedDialog>
    );
    expect(screen.queryByText("Test Content")).not.toBeInTheDocument();
  });

  it("renders title when provided", () => {
    render(
      <AnimatedDialog open={true} onOpenChange={mockOnOpenChange} title="Test Title">
        Content
      </AnimatedDialog>
    );
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("renders eyebrow when provided", () => {
    render(
      <AnimatedDialog open={true} onOpenChange={mockOnOpenChange} eyebrow="Test Eyebrow">
        Content
      </AnimatedDialog>
    );
    expect(screen.getByText("Test Eyebrow")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(
      <AnimatedDialog open={true} onOpenChange={mockOnOpenChange} description="Test Description">
        Content
      </AnimatedDialog>
    );
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders custom header when provided", () => {
    render(
      <AnimatedDialog open={true} onOpenChange={mockOnOpenChange} header={<div>Custom Header</div>}>
        Content
      </AnimatedDialog>
    );
    expect(screen.getByText("Custom Header")).toBeInTheDocument();
  });

  it("renders footer when provided", () => {
    render(
      <AnimatedDialog open={true} onOpenChange={mockOnOpenChange} footer={<div>Footer Content</div>}>
        Content
      </AnimatedDialog>
    );
    expect(screen.getByText("Footer Content")).toBeInTheDocument();
  });

  it("applies custom size", () => {
    const { container } = render(
      <AnimatedDialog open={true} onOpenChange={mockOnOpenChange} size="sm">
        Content
      </AnimatedDialog>
    );
    const dialog = container.querySelector('[role="dialog"]');
    expect(dialog?.className).toContain("max-w-md");
  });

  it("calls onOpenChange when close button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <AnimatedDialog open={true} onOpenChange={mockOnOpenChange}>
        Content
      </AnimatedDialog>
    );

    const closeButton = screen.getByRole("button", { name: /close/i });
    await user.click(closeButton);

    expect(mockOnOpenChange).toHaveBeenCalledWith(false);
  });

  it("applies default background and padding styles", () => {
    const { container } = render(
      <AnimatedDialog open={true} onOpenChange={mockOnOpenChange}>
        Content
      </AnimatedDialog>
    );
    const dialog = container.querySelector('[role="dialog"]');
    expect(dialog?.className).toContain("bg-background");
    expect(dialog?.className).toContain("p-6");
    expect(dialog?.className).toContain("md:p-12");
  });

  it("applies proper viewport spacing on mobile and desktop", () => {
    const { container } = render(
      <AnimatedDialog open={true} onOpenChange={mockOnOpenChange}>
        Content
      </AnimatedDialog>
    );
    const dialog = container.querySelector('[role="dialog"]');
    expect(dialog?.className).toContain("my-12");
    expect(dialog?.className).toContain("md:my-20");
  });

  it("ensures close button maintains circular shape with flex-shrink-0", () => {
    render(
      <AnimatedDialog open={true} onOpenChange={mockOnOpenChange}>
        Content
      </AnimatedDialog>
    );
    const closeButton = screen.getByRole("button", { name: /close/i });
    expect(closeButton.className).toContain("flex-shrink-0");
    expect(closeButton.className).toContain("rounded-full");
    expect(closeButton.className).toContain("h-10");
    expect(closeButton.className).toContain("w-10");
  });
});
