import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { GridDotsBasic } from "../grid-dots-basic";
import { GridDotsFadeCenter } from "../grid-dots-fade-center";

describe("Grid Dots Components", () => {
  describe("GridDotsBasic", () => {
    it("renders with children", () => {
      render(
        <GridDotsBasic>
          <div data-testid="child">Content</div>
        </GridDotsBasic>
      );
      expect(screen.getByTestId("child")).toBeInTheDocument();
      expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<GridDotsBasic className="custom-class" />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("custom-class");
    });

    it("renders with correct base classes", () => {
      const { container } = render(<GridDotsBasic />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("min-h-screen");
      expect(section?.className).toContain("flex");
      expect(section?.className).toContain("items-center");
      expect(section?.className).toContain("justify-center");
    });

    it("positions children with z-10", () => {
      const { container } = render(
        <GridDotsBasic>
          <div>Test</div>
        </GridDotsBasic>
      );
      const contentWrapper = container.querySelector(".z-10");
      expect(contentWrapper).toBeInTheDocument();
    });

    it("renders dots pattern background element", () => {
      const { container } = render(<GridDotsBasic />);
      const patternDiv = container.querySelector(".z-0");
      expect(patternDiv).toBeInTheDocument();
    });

    it("renders without children", () => {
      const { container } = render(<GridDotsBasic />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("renders multiple children", () => {
      render(
        <GridDotsBasic>
          <div data-testid="child1">First</div>
          <div data-testid="child2">Second</div>
        </GridDotsBasic>
      );
      expect(screen.getByTestId("child1")).toBeInTheDocument();
      expect(screen.getByTestId("child2")).toBeInTheDocument();
    });

    it("applies relative positioning", () => {
      const { container } = render(<GridDotsBasic />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("relative");
    });

    it("renders SVG pattern element", () => {
      const { container } = render(<GridDotsBasic />);
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });
  });

  describe("GridDotsFadeCenter", () => {
    it("renders with children", () => {
      render(
        <GridDotsFadeCenter>
          <div data-testid="child">Content</div>
        </GridDotsFadeCenter>
      );
      expect(screen.getByTestId("child")).toBeInTheDocument();
      expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<GridDotsFadeCenter className="custom-class" />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("custom-class");
    });

    it("renders with correct base classes", () => {
      const { container } = render(<GridDotsFadeCenter />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("min-h-screen");
      expect(section?.className).toContain("flex");
      expect(section?.className).toContain("items-center");
      expect(section?.className).toContain("justify-center");
    });

    it("positions children with z-10", () => {
      const { container } = render(
        <GridDotsFadeCenter>
          <div>Test</div>
        </GridDotsFadeCenter>
      );
      const contentWrapper = container.querySelector(".z-10");
      expect(contentWrapper).toBeInTheDocument();
    });

    it("renders dots pattern background element", () => {
      const { container } = render(<GridDotsFadeCenter />);
      const patternDiv = container.querySelector(".z-0");
      expect(patternDiv).toBeInTheDocument();
    });

    it("renders without children", () => {
      const { container } = render(<GridDotsFadeCenter />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("renders multiple children", () => {
      render(
        <GridDotsFadeCenter>
          <div data-testid="child1">First</div>
          <div data-testid="child2">Second</div>
        </GridDotsFadeCenter>
      );
      expect(screen.getByTestId("child1")).toBeInTheDocument();
      expect(screen.getByTestId("child2")).toBeInTheDocument();
    });

    it("applies relative positioning", () => {
      const { container } = render(<GridDotsFadeCenter />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("relative");
    });

    it("renders SVG pattern element", () => {
      const { container } = render(<GridDotsFadeCenter />);
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });
  });
});

