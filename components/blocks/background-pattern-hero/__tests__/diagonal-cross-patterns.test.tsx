import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DiagonalCrossBasic } from "../diagonal-cross-basic";
import { DiagonalCrossFadeCenter } from "../diagonal-cross-fade-center";
import { DiagonalCrossFadeTop } from "../diagonal-cross-fade-top";
import { DiagonalCrossFadeBottom } from "../diagonal-cross-fade-bottom";
import { DiagonalCrossFadeTopLeft } from "../diagonal-cross-fade-top-left";
import { DiagonalCrossFadeTopRight } from "../diagonal-cross-fade-top-right";
import { DiagonalCrossFadeBottomLeft } from "../diagonal-cross-fade-bottom-left";
import { DiagonalCrossFadeBottomRight } from "../diagonal-cross-fade-bottom-right";

describe("Diagonal Cross Pattern Components", () => {
  describe("DiagonalCrossBasic", () => {
    it("renders with children", () => {
      render(
        <DiagonalCrossBasic>
          <div data-testid="child">Content</div>
        </DiagonalCrossBasic>
      );
      expect(screen.getByTestId("child")).toBeInTheDocument();
      expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<DiagonalCrossBasic className="custom-class" />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("custom-class");
    });

    it("renders with correct base classes", () => {
      const { container } = render(<DiagonalCrossBasic />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("min-h-screen");
      expect(section?.className).toContain("flex");
      expect(section?.className).toContain("items-center");
      expect(section?.className).toContain("justify-center");
    });

    it("positions children with z-10", () => {
      const { container } = render(
        <DiagonalCrossBasic>
          <div>Test</div>
        </DiagonalCrossBasic>
      );
      const contentWrapper = container.querySelector(".z-10");
      expect(contentWrapper).toBeInTheDocument();
    });

    it("renders pattern background element", () => {
      const { container } = render(<DiagonalCrossBasic />);
      const patternDiv = container.querySelector(".z-0");
      expect(patternDiv).toBeInTheDocument();
    });
  });

  describe("DiagonalCrossFadeCenter", () => {
    it("renders with children", () => {
      render(
        <DiagonalCrossFadeCenter>
          <div data-testid="child">Content</div>
        </DiagonalCrossFadeCenter>
      );
      expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<DiagonalCrossFadeCenter className="custom-class" />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("custom-class");
    });
  });

  describe("DiagonalCrossFadeTop", () => {
    it("renders with children", () => {
      render(
        <DiagonalCrossFadeTop>
          <div data-testid="child">Content</div>
        </DiagonalCrossFadeTop>
      );
      expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<DiagonalCrossFadeTop className="custom-class" />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("custom-class");
    });
  });

  describe("DiagonalCrossFadeBottom", () => {
    it("renders with children", () => {
      render(
        <DiagonalCrossFadeBottom>
          <div data-testid="child">Content</div>
        </DiagonalCrossFadeBottom>
      );
      expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<DiagonalCrossFadeBottom className="custom-class" />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("custom-class");
    });
  });

  describe("DiagonalCrossFadeTopLeft", () => {
    it("renders with children", () => {
      render(
        <DiagonalCrossFadeTopLeft>
          <div data-testid="child">Content</div>
        </DiagonalCrossFadeTopLeft>
      );
      expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<DiagonalCrossFadeTopLeft className="custom-class" />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("custom-class");
    });
  });

  describe("DiagonalCrossFadeTopRight", () => {
    it("renders with children", () => {
      render(
        <DiagonalCrossFadeTopRight>
          <div data-testid="child">Content</div>
        </DiagonalCrossFadeTopRight>
      );
      expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<DiagonalCrossFadeTopRight className="custom-class" />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("custom-class");
    });
  });

  describe("DiagonalCrossFadeBottomLeft", () => {
    it("renders with children", () => {
      render(
        <DiagonalCrossFadeBottomLeft>
          <div data-testid="child">Content</div>
        </DiagonalCrossFadeBottomLeft>
      );
      expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<DiagonalCrossFadeBottomLeft className="custom-class" />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("custom-class");
    });
  });

  describe("DiagonalCrossFadeBottomRight", () => {
    it("renders with children", () => {
      render(
        <DiagonalCrossFadeBottomRight>
          <div data-testid="child">Content</div>
        </DiagonalCrossFadeBottomRight>
      );
      expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<DiagonalCrossFadeBottomRight className="custom-class" />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("custom-class");
    });
  });
});

