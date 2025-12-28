import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { GradientGlowBottom } from "../gradient-glow-bottom";
import { GradientGlowTop } from "../gradient-glow-top";

describe("Gradient Glow Components", () => {
  describe("GradientGlowBottom", () => {
    it("renders with children", () => {
      render(
        <GradientGlowBottom>
          <div data-testid="child">Content</div>
        </GradientGlowBottom>
      );
      expect(screen.getByTestId("child")).toBeInTheDocument();
      expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<GradientGlowBottom className="custom-class" />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("custom-class");
    });

    it("renders with correct base classes", () => {
      const { container } = render(<GradientGlowBottom />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("min-h-screen");
      expect(section?.className).toContain("flex");
      expect(section?.className).toContain("items-center");
      expect(section?.className).toContain("justify-center");
    });

    it("positions children with z-10", () => {
      const { container } = render(
        <GradientGlowBottom>
          <div>Test</div>
        </GradientGlowBottom>
      );
      const contentWrapper = container.querySelector(".z-10");
      expect(contentWrapper).toBeInTheDocument();
    });

    it("renders gradient background element", () => {
      const { container } = render(<GradientGlowBottom />);
      const gradientDiv = container.querySelector(".z-0");
      expect(gradientDiv).toBeInTheDocument();
    });

    it("renders without children", () => {
      const { container } = render(<GradientGlowBottom />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("renders multiple children", () => {
      render(
        <GradientGlowBottom>
          <div data-testid="child1">First</div>
          <div data-testid="child2">Second</div>
        </GradientGlowBottom>
      );
      expect(screen.getByTestId("child1")).toBeInTheDocument();
      expect(screen.getByTestId("child2")).toBeInTheDocument();
    });

    it("applies relative positioning", () => {
      const { container } = render(<GradientGlowBottom />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("relative");
    });

    it("applies overflow hidden", () => {
      const { container } = render(<GradientGlowBottom />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("overflow-hidden");
    });
  });

  describe("GradientGlowTop", () => {
    it("renders with children", () => {
      render(
        <GradientGlowTop>
          <div data-testid="child">Content</div>
        </GradientGlowTop>
      );
      expect(screen.getByTestId("child")).toBeInTheDocument();
      expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<GradientGlowTop className="custom-class" />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("custom-class");
    });

    it("renders with correct base classes", () => {
      const { container } = render(<GradientGlowTop />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("min-h-screen");
      expect(section?.className).toContain("flex");
      expect(section?.className).toContain("items-center");
      expect(section?.className).toContain("justify-center");
    });

    it("positions children with z-10", () => {
      const { container } = render(
        <GradientGlowTop>
          <div>Test</div>
        </GradientGlowTop>
      );
      const contentWrapper = container.querySelector(".z-10");
      expect(contentWrapper).toBeInTheDocument();
    });

    it("renders gradient background element", () => {
      const { container } = render(<GradientGlowTop />);
      const gradientDiv = container.querySelector(".z-0");
      expect(gradientDiv).toBeInTheDocument();
    });

    it("renders without children", () => {
      const { container } = render(<GradientGlowTop />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("renders multiple children", () => {
      render(
        <GradientGlowTop>
          <div data-testid="child1">First</div>
          <div data-testid="child2">Second</div>
        </GradientGlowTop>
      );
      expect(screen.getByTestId("child1")).toBeInTheDocument();
      expect(screen.getByTestId("child2")).toBeInTheDocument();
    });

    it("applies relative positioning", () => {
      const { container } = render(<GradientGlowTop />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("relative");
    });

    it("applies overflow hidden", () => {
      const { container } = render(<GradientGlowTop />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("overflow-hidden");
    });
  });
});

