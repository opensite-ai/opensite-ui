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
    it("renders with default props", () => {
      const { container } = render(<DiagonalCrossBasic />);
      expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("renders children", () => {
      render(<DiagonalCrossBasic><div>Test Content</div></DiagonalCrossBasic>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });
  });

  describe("DiagonalCrossFadeCenter", () => {
    it("renders with default props", () => {
      const { container } = render(<DiagonalCrossFadeCenter />);
      expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("renders children", () => {
      render(<DiagonalCrossFadeCenter><div>Test Content</div></DiagonalCrossFadeCenter>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });
  });

  describe("DiagonalCrossFadeTop", () => {
    it("renders with default props", () => {
      const { container } = render(<DiagonalCrossFadeTop />);
      expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("renders children", () => {
      render(<DiagonalCrossFadeTop><div>Test Content</div></DiagonalCrossFadeTop>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });
  });

  describe("DiagonalCrossFadeBottom", () => {
    it("renders with default props", () => {
      const { container } = render(<DiagonalCrossFadeBottom />);
      expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("renders children", () => {
      render(<DiagonalCrossFadeBottom><div>Test Content</div></DiagonalCrossFadeBottom>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });
  });

  describe("DiagonalCrossFadeTopLeft", () => {
    it("renders with default props", () => {
      const { container } = render(<DiagonalCrossFadeTopLeft />);
      expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("renders children", () => {
      render(<DiagonalCrossFadeTopLeft><div>Test Content</div></DiagonalCrossFadeTopLeft>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });
  });

  describe("DiagonalCrossFadeTopRight", () => {
    it("renders with default props", () => {
      const { container } = render(<DiagonalCrossFadeTopRight />);
      expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("renders children", () => {
      render(<DiagonalCrossFadeTopRight><div>Test Content</div></DiagonalCrossFadeTopRight>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });
  });

  describe("DiagonalCrossFadeBottomLeft", () => {
    it("renders with default props", () => {
      const { container } = render(<DiagonalCrossFadeBottomLeft />);
      expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("renders children", () => {
      render(<DiagonalCrossFadeBottomLeft><div>Test Content</div></DiagonalCrossFadeBottomLeft>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });
  });

  describe("DiagonalCrossFadeBottomRight", () => {
    it("renders with default props", () => {
      const { container } = render(<DiagonalCrossFadeBottomRight />);
      expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("renders children", () => {
      render(<DiagonalCrossFadeBottomRight><div>Test Content</div></DiagonalCrossFadeBottomRight>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });
  });
});

