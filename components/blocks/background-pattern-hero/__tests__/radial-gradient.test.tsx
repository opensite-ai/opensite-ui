import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RadialGradientBottom } from "../radial-gradient-bottom";
import { RadialGradientTop } from "../radial-gradient-top";

describe("Radial Gradient Components", () => {
  describe("RadialGradientBottom", () => {
    it("renders with children", () => {
      render(
        <RadialGradientBottom>
          <div data-testid="child">Content</div>
        </RadialGradientBottom>
      );
      expect(screen.getByTestId("child")).toBeInTheDocument();
      expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<RadialGradientBottom className="custom-class" />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("custom-class");
    });

    it("renders with correct base classes", () => {
      const { container } = render(<RadialGradientBottom />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("min-h-screen");
      expect(section?.className).toContain("relative");
    });

    it("positions children with z-10", () => {
      const { container } = render(
        <RadialGradientBottom>
          <div>Test</div>
        </RadialGradientBottom>
      );
      const contentWrapper = container.querySelector(".z-10");
      expect(contentWrapper).toBeInTheDocument();
    });

    it("renders radial gradient background element", () => {
      const { container } = render(<RadialGradientBottom />);
      const gradientDiv = container.querySelector(".z-0");
      expect(gradientDiv).toBeInTheDocument();
    });

    it("renders without children", () => {
      const { container } = render(<RadialGradientBottom />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("renders multiple children", () => {
      render(
        <RadialGradientBottom>
          <div data-testid="child1">First</div>
          <div data-testid="child2">Second</div>
        </RadialGradientBottom>
      );
      expect(screen.getByTestId("child1")).toBeInTheDocument();
      expect(screen.getByTestId("child2")).toBeInTheDocument();
    });

    it("applies relative positioning", () => {
      const { container } = render(<RadialGradientBottom />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("relative");
    });

    it("renders gradient background with correct style", () => {
      const { container } = render(<RadialGradientBottom />);
      const gradientDiv = container.querySelector(".z-0") as HTMLElement;
      expect(gradientDiv?.style.background).toContain("radial-gradient");
    });
  });

  describe("RadialGradientTop", () => {
    it("renders with children", () => {
      render(
        <RadialGradientTop>
          <div data-testid="child">Content</div>
        </RadialGradientTop>
      );
      expect(screen.getByTestId("child")).toBeInTheDocument();
      expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<RadialGradientTop className="custom-class" />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("custom-class");
    });

    it("renders with correct base classes", () => {
      const { container } = render(<RadialGradientTop />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("min-h-screen");
      expect(section?.className).toContain("relative");
    });

    it("positions children with z-10", () => {
      const { container } = render(
        <RadialGradientTop>
          <div>Test</div>
        </RadialGradientTop>
      );
      const contentWrapper = container.querySelector(".z-10");
      expect(contentWrapper).toBeInTheDocument();
    });

    it("renders radial gradient background element", () => {
      const { container } = render(<RadialGradientTop />);
      const gradientDiv = container.querySelector(".z-0");
      expect(gradientDiv).toBeInTheDocument();
    });

    it("renders without children", () => {
      const { container } = render(<RadialGradientTop />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("renders multiple children", () => {
      render(
        <RadialGradientTop>
          <div data-testid="child1">First</div>
          <div data-testid="child2">Second</div>
        </RadialGradientTop>
      );
      expect(screen.getByTestId("child1")).toBeInTheDocument();
      expect(screen.getByTestId("child2")).toBeInTheDocument();
    });

    it("applies relative positioning", () => {
      const { container } = render(<RadialGradientTop />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("relative");
    });

    it("renders gradient background with correct style", () => {
      const { container } = render(<RadialGradientTop />);
      const gradientDiv = container.querySelector(".z-0") as HTMLElement;
      expect(gradientDiv?.style.background).toContain("radial-gradient");
    });
  });
});

