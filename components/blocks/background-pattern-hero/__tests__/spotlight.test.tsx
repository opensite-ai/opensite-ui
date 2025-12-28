import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SpotlightLeft } from "../spotlight-left";
import { SpotlightRight } from "../spotlight-right";

describe("Spotlight Components", () => {
  describe("SpotlightLeft", () => {
    it("renders with children", () => {
      render(
        <SpotlightLeft>
          <div data-testid="child">Content</div>
        </SpotlightLeft>
      );
      expect(screen.getByTestId("child")).toBeInTheDocument();
      expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<SpotlightLeft className="custom-class" />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("custom-class");
    });

    it("renders with correct base classes", () => {
      const { container } = render(<SpotlightLeft />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("min-h-screen");
      expect(section?.className).toContain("flex");
      expect(section?.className).toContain("items-center");
      expect(section?.className).toContain("justify-center");
    });

    it("positions children with z-10", () => {
      const { container } = render(
        <SpotlightLeft>
          <div>Test</div>
        </SpotlightLeft>
      );
      const contentWrapper = container.querySelector(".z-10");
      expect(contentWrapper).toBeInTheDocument();
    });

    it("renders spotlight background element", () => {
      const { container } = render(<SpotlightLeft />);
      const spotlightDiv = container.querySelector(".z-0");
      expect(spotlightDiv).toBeInTheDocument();
    });

    it("renders without children", () => {
      const { container } = render(<SpotlightLeft />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("renders multiple children", () => {
      render(
        <SpotlightLeft>
          <div data-testid="child1">First</div>
          <div data-testid="child2">Second</div>
        </SpotlightLeft>
      );
      expect(screen.getByTestId("child1")).toBeInTheDocument();
      expect(screen.getByTestId("child2")).toBeInTheDocument();
    });

    it("applies relative positioning", () => {
      const { container } = render(<SpotlightLeft />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("relative");
    });

    it("applies overflow hidden", () => {
      const { container } = render(<SpotlightLeft />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("overflow-hidden");
    });
  });

  describe("SpotlightRight", () => {
    it("renders with children", () => {
      render(
        <SpotlightRight>
          <div data-testid="child">Content</div>
        </SpotlightRight>
      );
      expect(screen.getByTestId("child")).toBeInTheDocument();
      expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<SpotlightRight className="custom-class" />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("custom-class");
    });

    it("renders with correct base classes", () => {
      const { container } = render(<SpotlightRight />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("min-h-screen");
      expect(section?.className).toContain("flex");
      expect(section?.className).toContain("items-center");
      expect(section?.className).toContain("justify-center");
    });

    it("positions children with z-10", () => {
      const { container } = render(
        <SpotlightRight>
          <div>Test</div>
        </SpotlightRight>
      );
      const contentWrapper = container.querySelector(".z-10");
      expect(contentWrapper).toBeInTheDocument();
    });

    it("renders spotlight background element", () => {
      const { container } = render(<SpotlightRight />);
      const spotlightDiv = container.querySelector(".z-0");
      expect(spotlightDiv).toBeInTheDocument();
    });

    it("renders without children", () => {
      const { container } = render(<SpotlightRight />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("renders multiple children", () => {
      render(
        <SpotlightRight>
          <div data-testid="child1">First</div>
          <div data-testid="child2">Second</div>
        </SpotlightRight>
      );
      expect(screen.getByTestId("child1")).toBeInTheDocument();
      expect(screen.getByTestId("child2")).toBeInTheDocument();
    });

    it("applies relative positioning", () => {
      const { container } = render(<SpotlightRight />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("relative");
    });

    it("applies overflow hidden", () => {
      const { container } = render(<SpotlightRight />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("overflow-hidden");
    });
  });
});

