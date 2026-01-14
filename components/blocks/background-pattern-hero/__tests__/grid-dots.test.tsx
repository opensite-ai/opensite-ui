import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { GridDotsBasic } from "../grid-dots-basic";
import { GridDotsFadeCenter } from "../grid-dots-fade-center";

describe("Grid Dots Components", () => {
  describe("GridDotsBasic", () => {
    it("renders with default props", () => {
      const { container } = render(<GridDotsBasic />);
      expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("renders children", () => {
      render(<GridDotsBasic><div>Test Content</div></GridDotsBasic>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<GridDotsBasic className="custom-class" />);
      expect(container.querySelector("section")).toHaveClass("custom-class");
    });
  });

  describe("GridDotsFadeCenter", () => {
    it("renders with default props", () => {
      const { container } = render(<GridDotsFadeCenter />);
      expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("renders children", () => {
      render(<GridDotsFadeCenter><div>Test Content</div></GridDotsFadeCenter>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<GridDotsFadeCenter className="custom-class" />);
      expect(container.querySelector("section")).toHaveClass("custom-class");
    });
  });
});

