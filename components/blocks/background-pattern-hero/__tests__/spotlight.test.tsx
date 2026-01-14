import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SpotlightLeft } from "../spotlight-left";
import { SpotlightRight } from "../spotlight-right";

describe("Spotlight Components", () => {
  describe("SpotlightLeft", () => {
    it("renders with default props", () => {
      const { container } = render(<SpotlightLeft />);
      expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("renders children", () => {
      render(<SpotlightLeft><div>Test Content</div></SpotlightLeft>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<SpotlightLeft className="custom-class" />);
      expect(container.querySelector("section")).toHaveClass("custom-class");
    });
  });

  describe("SpotlightRight", () => {
    it("renders with default props", () => {
      const { container } = render(<SpotlightRight />);
      expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("renders children", () => {
      render(<SpotlightRight><div>Test Content</div></SpotlightRight>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<SpotlightRight className="custom-class" />);
      expect(container.querySelector("section")).toHaveClass("custom-class");
    });
  });
});

