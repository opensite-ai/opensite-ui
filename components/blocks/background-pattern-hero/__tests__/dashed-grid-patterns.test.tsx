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
    it("renders with default props", () => {
      const { container } = render(<DashedGridBasic />);
      expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("renders children", () => {
      render(<DashedGridBasic><div>Test Content</div></DashedGridBasic>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });
  });

  describe("DashedGridFadeCenter", () => {
    it("renders with default props", () => {
      const { container } = render(<DashedGridFadeCenter />);
      expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("renders children", () => {
      render(<DashedGridFadeCenter><div>Test Content</div></DashedGridFadeCenter>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });
  });

  describe("DashedGridFadeTop", () => {
    it("renders with default props", () => {
      const { container } = render(<DashedGridFadeTop />);
      expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("renders children", () => {
      render(<DashedGridFadeTop><div>Test Content</div></DashedGridFadeTop>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });
  });

  describe("DashedGridFadeBottom", () => {
    it("renders with default props", () => {
      const { container } = render(<DashedGridFadeBottom />);
      expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("renders children", () => {
      render(<DashedGridFadeBottom><div>Test Content</div></DashedGridFadeBottom>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });
  });

  describe("DashedGridFadeTopLeft", () => {
    it("renders with default props", () => {
      const { container } = render(<DashedGridFadeTopLeft />);
      expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("renders children", () => {
      render(<DashedGridFadeTopLeft><div>Test Content</div></DashedGridFadeTopLeft>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });
  });

  describe("DashedGridFadeTopRight", () => {
    it("renders with default props", () => {
      const { container } = render(<DashedGridFadeTopRight />);
      expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("renders children", () => {
      render(<DashedGridFadeTopRight><div>Test Content</div></DashedGridFadeTopRight>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });
  });

  describe("DashedGridFadeBottomLeft", () => {
    it("renders with default props", () => {
      const { container } = render(<DashedGridFadeBottomLeft />);
      expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("renders children", () => {
      render(<DashedGridFadeBottomLeft><div>Test Content</div></DashedGridFadeBottomLeft>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });
  });

  describe("DashedGridFadeBottomRight", () => {
    it("renders with default props", () => {
      const { container } = render(<DashedGridFadeBottomRight />);
      expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("renders children", () => {
      render(<DashedGridFadeBottomRight><div>Test Content</div></DashedGridFadeBottomRight>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });
  });
});

