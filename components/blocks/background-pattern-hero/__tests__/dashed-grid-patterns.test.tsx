import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DashedGridBasic } from "../dashed-grid-basic";
import { DashedGridFadeCenter } from "../dashed-grid-fade-center";
import { DashedGridFadeTop } from "../dashed-grid-fade-top";
import { DashedGridFadeBottom } from "../dashed-grid-fade-bottom";
import { DashedGridFadeTopLeft } from "../dashed-grid-fade-top-left";
import { DashedGridFadeTopRight } from "../dashed-grid-fade-top-right";
import { DashedGridFadeBottomLeft } from "../dashed-grid-fade-bottom-left";
import { DashedGridFadeBottomRight } from "../dashed-grid-fade-bottom-right";

describe("Dashed Grid Pattern Components", () => {
  describe("DashedGridBasic", () => {
    it("renders with children", () => {
      render(
        <DashedGridBasic>
          <div data-testid="child">Content</div>
        </DashedGridBasic>
      );
      expect(screen.getByTestId("child")).toBeInTheDocument();
      expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<DashedGridBasic className="custom-class" />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("custom-class");
    });

    it("renders with correct base classes", () => {
      const { container } = render(<DashedGridBasic />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("min-h-screen");
      expect(section?.className).toContain("flex");
      expect(section?.className).toContain("items-center");
      expect(section?.className).toContain("justify-center");
    });

    it("positions children with z-10", () => {
      const { container } = render(
        <DashedGridBasic>
          <div>Test</div>
        </DashedGridBasic>
      );
      const contentWrapper = container.querySelector(".z-10");
      expect(contentWrapper).toBeInTheDocument();
    });

    it("renders pattern background element", () => {
      const { container } = render(<DashedGridBasic />);
      const patternDiv = container.querySelector(".z-0");
      expect(patternDiv).toBeInTheDocument();
    });
  });

  describe("DashedGridFadeCenter", () => {
    it("renders with children", () => {
      render(
        <DashedGridFadeCenter>
          <div data-testid="child">Content</div>
        </DashedGridFadeCenter>
      );
      expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<DashedGridFadeCenter className="custom-class" />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("custom-class");
    });
  });

  describe("DashedGridFadeTop", () => {
    it("renders with children", () => {
      render(
        <DashedGridFadeTop>
          <div data-testid="child">Content</div>
        </DashedGridFadeTop>
      );
      expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<DashedGridFadeTop className="custom-class" />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("custom-class");
    });
  });

  describe("DashedGridFadeBottom", () => {
    it("renders with children", () => {
      render(
        <DashedGridFadeBottom>
          <div data-testid="child">Content</div>
        </DashedGridFadeBottom>
      );
      expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<DashedGridFadeBottom className="custom-class" />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("custom-class");
    });
  });

  describe("DashedGridFadeTopLeft", () => {
    it("renders with children", () => {
      render(
        <DashedGridFadeTopLeft>
          <div data-testid="child">Content</div>
        </DashedGridFadeTopLeft>
      );
      expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<DashedGridFadeTopLeft className="custom-class" />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("custom-class");
    });
  });

  describe("DashedGridFadeTopRight", () => {
    it("renders with children", () => {
      render(
        <DashedGridFadeTopRight>
          <div data-testid="child">Content</div>
        </DashedGridFadeTopRight>
      );
      expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<DashedGridFadeTopRight className="custom-class" />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("custom-class");
    });
  });

  describe("DashedGridFadeBottomLeft", () => {
    it("renders with children", () => {
      render(
        <DashedGridFadeBottomLeft>
          <div data-testid="child">Content</div>
        </DashedGridFadeBottomLeft>
      );
      expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<DashedGridFadeBottomLeft className="custom-class" />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("custom-class");
    });
  });

  describe("DashedGridFadeBottomRight", () => {
    it("renders with children", () => {
      render(
        <DashedGridFadeBottomRight>
          <div data-testid="child">Content</div>
        </DashedGridFadeBottomRight>
      );
      expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<DashedGridFadeBottomRight className="custom-class" />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("custom-class");
    });
  });
});

