import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RadialGradientBottom } from "../radial-gradient-bottom";
import { RadialGradientTop } from "../radial-gradient-top";

describe("Radial Gradient Components", () => {
  describe("RadialGradientBottom", () => {
    it("renders with default props", () => {
      const { container } = render(<RadialGradientBottom />);
      expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("renders children", () => {
      render(<RadialGradientBottom><div>Test Content</div></RadialGradientBottom>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<RadialGradientBottom className="custom-class" />);
      expect(container.querySelector("section")).toHaveClass("custom-class");
    });
  });

  describe("RadialGradientTop", () => {
    it("renders with default props", () => {
      const { container } = render(<RadialGradientTop />);
      expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("renders children", () => {
      render(<RadialGradientTop><div>Test Content</div></RadialGradientTop>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<RadialGradientTop className="custom-class" />);
      expect(container.querySelector("section")).toHaveClass("custom-class");
    });
  });
});

