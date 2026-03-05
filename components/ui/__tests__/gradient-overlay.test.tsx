import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { GradientOverlay } from "../gradient-overlay";

describe("GradientOverlay", () => {
  it("renders with default props", () => {
    const { container } = render(<GradientOverlay />);
    const el = container.firstElementChild as HTMLElement;
    expect(el).toBeTruthy();
    expect(el.className).toContain("absolute");
    expect(el.className).toContain("inset-0");
    expect(el.className).toContain("bg-linear-to-t");
    expect(el.className).toContain("from-black/70");
    expect(el.className).toContain("via-black/35");
  });

  it("applies direction class for top-to-bottom", () => {
    const { container } = render(<GradientOverlay direction="top-to-bottom" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toContain("bg-linear-to-b");
  });

  it("applies high intensity stops", () => {
    const { container } = render(<GradientOverlay intensity="high" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toContain("from-black/85");
    expect(el.className).toContain("via-black/50");
  });

  it("applies low intensity stops", () => {
    const { container } = render(<GradientOverlay intensity="low" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toContain("from-black/40");
    expect(el.className).toContain("via-black/20");
  });

  it("applies very-high intensity stops", () => {
    const { container } = render(<GradientOverlay intensity="very-high" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toContain("from-black/95");
    expect(el.className).toContain("via-black/60");
    expect(el.className).toContain("to-black/20");
  });

  it("renders radial-center with inline style", () => {
    const { container } = render(<GradientOverlay direction="radial-center" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toContain("absolute");
    expect(el.className).toContain("inset-0");
    expect(el.style.background).toContain("radial-gradient");
  });

  it("merges custom className", () => {
    const { container } = render(<GradientOverlay className="rounded-2xl z-10" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toContain("rounded-2xl");
    expect(el.className).toContain("z-10");
    expect(el.className).toContain("absolute");
  });

  it("passes through standard div props", () => {
    const { container } = render(
      <GradientOverlay data-testid="overlay" aria-hidden="true" />,
    );
    const el = container.firstElementChild as HTMLElement;
    expect(el.getAttribute("data-testid")).toBe("overlay");
    expect(el.getAttribute("aria-hidden")).toBe("true");
  });

  it("merges custom style with radial", () => {
    const { container } = render(
      <GradientOverlay direction="radial-center" style={{ zIndex: 5 }} />,
    );
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.zIndex).toBe("5");
    expect(el.style.background).toContain("radial-gradient");
  });

  it("applies diagonal direction", () => {
    const { container } = render(
      <GradientOverlay direction="bottom-left-to-top-right" />,
    );
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toContain("bg-linear-to-tr");
  });
});
