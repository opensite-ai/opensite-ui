import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { GridBasic } from "../grid-basic";
import { GridFadeCenter } from "../grid-fade-center";
import { GridFadeTop } from "../grid-fade-top";
import { GridFadeBottom } from "../grid-fade-bottom";
import { GridFadeTopLeft } from "../grid-fade-top-left";
import { GridFadeTopRight } from "../grid-fade-top-right";
import { GridFadeBottomLeft } from "../grid-fade-bottom-left";
import { GridFadeBottomRight } from "../grid-fade-bottom-right";

describe("Grid Pattern Components", () => {
  describe("GridBasic", () => {
    it("renders with children", () => {
      render(
        <GridBasic>
          <div data-testid="child">Content</div>
        </GridBasic>
      );
      expect(screen.getByTestId("child")).toBeInTheDocument();
      expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<GridBasic className="custom-class" />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("custom-class");
    });

    it("renders with correct base classes", () => {
      const { container } = render(<GridBasic />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("min-h-screen");
      expect(section?.className).toContain("flex");
      expect(section?.className).toContain("items-center");
      expect(section?.className).toContain("justify-center");
    });

    it("renders grid pattern background", () => {
      const { container } = render(<GridBasic />);
      const pattern = container.querySelector('[class*="bg-[linear-gradient"]');
      expect(pattern).toBeInTheDocument();
    });

    it("positions children with z-10", () => {
      const { container } = render(
        <GridBasic>
          <div>Test</div>
        </GridBasic>
      );
      const contentWrapper = container.querySelector(".z-10");
      expect(contentWrapper).toBeInTheDocument();
    });
  });

  describe("GridFadeCenter", () => {
    it("renders with children", () => {
      render(
        <GridFadeCenter>
          <div data-testid="child">Content</div>
        </GridFadeCenter>
      );
      expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<GridFadeCenter className="custom-class" />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("custom-class");
    });

    it("applies radial gradient mask for center fade", () => {
      const { container } = render(<GridFadeCenter />);
      const pattern = container.querySelector('[class*="bg-[linear-gradient"]') as HTMLElement;
      expect(pattern).toBeInTheDocument();
      expect(pattern?.style.maskImage || pattern?.style.webkitMaskImage).toContain("radial-gradient");
    });
  });

  describe("GridFadeTop", () => {
    it("renders with children", () => {
      render(
        <GridFadeTop>
          <div data-testid="child">Content</div>
        </GridFadeTop>
      );
      expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<GridFadeTop className="custom-class" />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("custom-class");
    });
  });

  describe("GridFadeBottom", () => {
    it("renders with children", () => {
      render(
        <GridFadeBottom>
          <div data-testid="child">Content</div>
        </GridFadeBottom>
      );
      expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<GridFadeBottom className="custom-class" />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("custom-class");
    });
  });

  describe("GridFadeTopLeft", () => {
    it("renders with children", () => {
      render(
        <GridFadeTopLeft>
          <div data-testid="child">Content</div>
        </GridFadeTopLeft>
      );
      expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<GridFadeTopLeft className="custom-class" />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("custom-class");
    });
  });

  describe("GridFadeTopRight", () => {
    it("renders with children", () => {
      render(
        <GridFadeTopRight>
          <div data-testid="child">Content</div>
        </GridFadeTopRight>
      );
      expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<GridFadeTopRight className="custom-class" />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("custom-class");
    });
  });

  describe("GridFadeBottomLeft", () => {
    it("renders with children", () => {
      render(
        <GridFadeBottomLeft>
          <div data-testid="child">Content</div>
        </GridFadeBottomLeft>
      );
      expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<GridFadeBottomLeft className="custom-class" />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("custom-class");
    });
  });

  describe("GridFadeBottomRight", () => {
    it("renders with children", () => {
      render(
        <GridFadeBottomRight>
          <div data-testid="child">Content</div>
        </GridFadeBottomRight>
      );
      expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<GridFadeBottomRight className="custom-class" />);
      const section = container.querySelector("section");
      expect(section?.className).toContain("custom-class");
    });
  });
});

