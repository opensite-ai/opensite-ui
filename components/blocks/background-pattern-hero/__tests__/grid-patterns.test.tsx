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
    it("renders with default props", () => {
      const { container } = render(<GridBasic />);
      expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("renders children", () => {
      render(<GridBasic><div>Test Content</div></GridBasic>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<GridBasic className="custom-class" />);
      expect(container.querySelector("section")).toHaveClass("custom-class");
    });
  });

  describe("GridFadeCenter", () => {
    it("renders with default props", () => {
      const { container } = render(<GridFadeCenter />);
      expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("renders children", () => {
      render(<GridFadeCenter><div>Test Content</div></GridFadeCenter>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });
  });

  describe("GridFadeTop", () => {
    it("renders with default props", () => {
      const { container } = render(<GridFadeTop />);
      expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("renders children", () => {
      render(<GridFadeTop><div>Test Content</div></GridFadeTop>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });
  });

  describe("GridFadeBottom", () => {
    it("renders with default props", () => {
      const { container } = render(<GridFadeBottom />);
      expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("renders children", () => {
      render(<GridFadeBottom><div>Test Content</div></GridFadeBottom>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });
  });

  describe("GridFadeTopLeft", () => {
    it("renders with default props", () => {
      const { container } = render(<GridFadeTopLeft />);
      expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("renders children", () => {
      render(<GridFadeTopLeft><div>Test Content</div></GridFadeTopLeft>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });
  });

  describe("GridFadeTopRight", () => {
    it("renders with default props", () => {
      const { container } = render(<GridFadeTopRight />);
      expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("renders children", () => {
      render(<GridFadeTopRight><div>Test Content</div></GridFadeTopRight>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });
  });

  describe("GridFadeBottomLeft", () => {
    it("renders with default props", () => {
      const { container } = render(<GridFadeBottomLeft />);
      expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("renders children", () => {
      render(<GridFadeBottomLeft><div>Test Content</div></GridFadeBottomLeft>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });
  });

  describe("GridFadeBottomRight", () => {
    it("renders with default props", () => {
      const { container } = render(<GridFadeBottomRight />);
      expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("renders children", () => {
      render(<GridFadeBottomRight><div>Test Content</div></GridFadeBottomRight>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });
  });
});

