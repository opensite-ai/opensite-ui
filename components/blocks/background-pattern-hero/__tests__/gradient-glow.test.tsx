import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { GradientGlowBottom } from "../gradient-glow-bottom";
import { GradientGlowTop } from "../gradient-glow-top";

describe("Gradient Glow Components", () => {
  describe("GradientGlowBottom", () => {
    it("renders with default props", () => {
      const { container } = render(<GradientGlowBottom />);
      expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("renders children", () => {
      render(<GradientGlowBottom><div>Test Content</div></GradientGlowBottom>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<GradientGlowBottom className="custom-class" />);
      expect(container.querySelector("section")).toHaveClass("custom-class");
    });
  });

  describe("GradientGlowTop", () => {
    it("renders with default props", () => {
      const { container } = render(<GradientGlowTop />);
      expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("renders children", () => {
      render(<GradientGlowTop><div>Test Content</div></GradientGlowTop>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<GradientGlowTop className="custom-class" />);
      expect(container.querySelector("section")).toHaveClass("custom-class");
    });
  });
});

