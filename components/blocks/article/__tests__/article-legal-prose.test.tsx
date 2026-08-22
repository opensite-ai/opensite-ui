import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ArticleLegalProse } from "../article-legal-prose";

// Mock the Img component from @page-speed/img
vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

const LEGAL_MARKDOWN = `## Information We Collect
We collect contact details you submit through forms on this site.

## How We Use Information
We use submitted information to respond to inquiries and operate the site.`;

describe("ArticleLegalProse", () => {
  it("renders the document title as a top-level heading", () => {
    render(
      <ArticleLegalProse title="Privacy Policy" markdownString={LEGAL_MARKDOWN} />,
    );
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Privacy Policy");
  });

  it("renders the markdown body as sectioned prose", () => {
    render(
      <ArticleLegalProse title="Privacy Policy" markdownString={LEGAL_MARKDOWN} />,
    );
    expect(
      screen.getByRole("heading", { level: 2, name: "Information We Collect" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "How We Use Information" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/respond to inquiries and operate the site/),
    ).toBeInTheDocument();
  });

  it("wraps the body in prose typography classes", () => {
    const { container } = render(
      <ArticleLegalProse title="Privacy Policy" markdownString={LEGAL_MARKDOWN} />,
    );
    const prose = container.querySelector(".prose");
    expect(prose).not.toBeNull();
    expect(prose?.textContent).toContain("Information We Collect");
  });

  it("uses inverted prose on dark backgrounds", () => {
    const { container } = render(
      <ArticleLegalProse
        title="Privacy Policy"
        markdownString={LEGAL_MARKDOWN}
        background="dark"
      />,
    );
    expect(container.querySelector(".prose-invert")).not.toBeNull();
  });

  it("renders the last-updated line when both label and date are supplied", () => {
    render(
      <ArticleLegalProse
        title="Terms of Use"
        lastUpdatedLabel="Last updated"
        lastUpdatedDate="March 12, 2026"
        markdownString={LEGAL_MARKDOWN}
      />,
    );
    expect(screen.getByText(/Last updated/)).toBeInTheDocument();
    expect(screen.getByText(/March 12, 2026/)).toBeInTheDocument();
  });

  it("renders the date alone when no label is supplied — never a hardcoded label", () => {
    const { container } = render(
      <ArticleLegalProse
        title="Terms of Use"
        lastUpdatedDate="March 12, 2026"
        markdownString={LEGAL_MARKDOWN}
      />,
    );
    expect(screen.getByText("March 12, 2026")).toBeInTheDocument();
    // No English fallback label may appear anywhere.
    expect(container.textContent).not.toMatch(/last updated/i);
    expect(container.textContent).not.toMatch(/effective date/i);
  });

  it("renders no last-updated line when only a label is supplied", () => {
    render(
      <ArticleLegalProse
        title="Terms of Use"
        lastUpdatedLabel="Last updated"
        markdownString={LEGAL_MARKDOWN}
      />,
    );
    expect(screen.queryByText(/Last updated/)).not.toBeInTheDocument();
  });

  it("renders no hardcoded content when no props are supplied", () => {
    const { container } = render(<ArticleLegalProse />);
    expect(container.querySelector("h1")).toBeNull();
    expect((container.textContent ?? "").trim()).toBe("");
  });

  it("applies custom className to the Section wrapper", () => {
    const { container } = render(
      <ArticleLegalProse
        title="Privacy Policy"
        markdownString={LEGAL_MARKDOWN}
        className="custom-legal-class"
      />,
    );
    const section = container.querySelector("section");
    expect(section?.className).toContain("custom-legal-class");
  });

  it("uses the block id as the default section id and honors overrides", () => {
    const { container, rerender } = render(
      <ArticleLegalProse title="Privacy Policy" markdownString={LEGAL_MARKDOWN} />,
    );
    expect(container.querySelector("#article-legal-prose")).not.toBeNull();
    rerender(
      <ArticleLegalProse
        title="Privacy Policy"
        markdownString={LEGAL_MARKDOWN}
        sectionId="custom-id"
      />,
    );
    expect(container.querySelector("#custom-id")).not.toBeNull();
  });

  it("applies proseClassName to the prose wrapper", () => {
    const { container } = render(
      <ArticleLegalProse
        title="Privacy Policy"
        markdownString={LEGAL_MARKDOWN}
        proseClassName="prose-lg"
      />,
    );
    const prose = container.querySelector(".prose");
    expect(prose?.className).toContain("prose-lg");
  });
});
