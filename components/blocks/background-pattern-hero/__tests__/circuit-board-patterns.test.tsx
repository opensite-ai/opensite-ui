import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CircuitBoardBasic } from "../circuit-board-basic";
import { CircuitBoardFadeCenter } from "../circuit-board-fade-center";
import { CircuitBoardFadeTop } from "../circuit-board-fade-top";
import { CircuitBoardFadeBottom } from "../circuit-board-fade-bottom";
import { CircuitBoardFadeTopLeft } from "../circuit-board-fade-top-left";
import { CircuitBoardFadeTopRight } from "../circuit-board-fade-top-right";
import { CircuitBoardFadeBottomLeft } from "../circuit-board-fade-bottom-left";
import { CircuitBoardFadeBottomRight } from "../circuit-board-fade-bottom-right";

describe("Circuit Board Pattern Components", () => {
  describe("CircuitBoardBasic", () => {
    it("renders with children", () => {
      render(
        <CircuitBoardBasic>
          <div data-testid="child">Content</div>
        </CircuitBoardBasic>
      );
      expect(screen.getByTestId("child")).toBeInTheDocument();
      expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<CircuitBoardBasic className="custom-class" />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("custom-class");
    });

    it("renders with correct base classes", () => {
      const { container } = render(<CircuitBoardBasic />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("min-h-screen");
      expect(section?.className).toContain("flex");
      expect(section?.className).toContain("items-center");
      expect(section?.className).toContain("justify-center");
    });

    it("renders SVG pattern element", () => {
      const { container } = render(<CircuitBoardBasic />);
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });

    it("renders pattern definition", () => {
      const { container } = render(<CircuitBoardBasic />);
      const pattern = container.querySelector("pattern");
      expect(pattern).toBeInTheDocument();
      expect(pattern?.getAttribute("id")).toBe("circuit-board-basic");
    });

    it("positions children with z-10", () => {
      const { container } = render(
        <CircuitBoardBasic>
          <div>Test</div>
        </CircuitBoardBasic>
      );
      const contentWrapper = container.querySelector(".z-10");
      expect(contentWrapper).toBeInTheDocument();
    });
  });

  describe("CircuitBoardFadeCenter", () => {
    it("renders with children", () => {
      render(
        <CircuitBoardFadeCenter>
          <div data-testid="child">Content</div>
        </CircuitBoardFadeCenter>
      );
      expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<CircuitBoardFadeCenter className="custom-class" />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("custom-class");
    });

    it("renders SVG pattern element", () => {
      const { container } = render(<CircuitBoardFadeCenter />);
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });
  });

  describe("CircuitBoardFadeTop", () => {
    it("renders with children", () => {
      render(
        <CircuitBoardFadeTop>
          <div data-testid="child">Content</div>
        </CircuitBoardFadeTop>
      );
      expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<CircuitBoardFadeTop className="custom-class" />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("custom-class");
    });
  });

  describe("CircuitBoardFadeBottom", () => {
    it("renders with children", () => {
      render(
        <CircuitBoardFadeBottom>
          <div data-testid="child">Content</div>
        </CircuitBoardFadeBottom>
      );
      expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<CircuitBoardFadeBottom className="custom-class" />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("custom-class");
    });
  });

  describe("CircuitBoardFadeTopLeft", () => {
    it("renders with children", () => {
      render(
        <CircuitBoardFadeTopLeft>
          <div data-testid="child">Content</div>
        </CircuitBoardFadeTopLeft>
      );
      expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<CircuitBoardFadeTopLeft className="custom-class" />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("custom-class");
    });
  });

  describe("CircuitBoardFadeTopRight", () => {
    it("renders with children", () => {
      render(
        <CircuitBoardFadeTopRight>
          <div data-testid="child">Content</div>
        </CircuitBoardFadeTopRight>
      );
      expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<CircuitBoardFadeTopRight className="custom-class" />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("custom-class");
    });
  });

  describe("CircuitBoardFadeBottomLeft", () => {
    it("renders with children", () => {
      render(
        <CircuitBoardFadeBottomLeft>
          <div data-testid="child">Content</div>
        </CircuitBoardFadeBottomLeft>
      );
      expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<CircuitBoardFadeBottomLeft className="custom-class" />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("custom-class");
    });
  });

  describe("CircuitBoardFadeBottomRight", () => {
    it("renders with children", () => {
      render(
        <CircuitBoardFadeBottomRight>
          <div data-testid="child">Content</div>
        </CircuitBoardFadeBottomRight>
      );
      expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<CircuitBoardFadeBottomRight className="custom-class" />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("custom-class");
    });
  });
});

