import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MediaHoverCtas } from "../media-hover-ctas";
import type { MediaHoverCtaItem } from "../media-hover-ctas";

describe("MediaHoverCtas", () => {
  const mockItems: MediaHoverCtaItem[] = [
    {
      content: <div>CTA One</div>,
      onHoverImgSrc: "/cta-one.jpg",
      altText: "CTA One Image",
      cardHref: "/cta-one",
    },
    {
      content: <div>CTA Two</div>,
      initialBackgroundColor: "#111111",
      onHoverBackgroundColor: "#222222",
    },
  ];

  it("renders CTA content and hover images", () => {
    render(<MediaHoverCtas items={mockItems} />);
    expect(screen.getByText("CTA One")).toBeInTheDocument();
    expect(screen.getByText("CTA Two")).toBeInTheDocument();
    expect(screen.getByAltText("CTA One Image")).toBeInTheDocument();
  });

  it("renders links when cardHref is provided", () => {
    render(<MediaHoverCtas items={mockItems} />);
    expect(screen.getByText("CTA One").closest("a")).toHaveAttribute(
      "href",
      "/cta-one"
    );
    expect(screen.getByText("CTA Two").closest("a")).toBeNull();
  });

  it("applies custom section and grid classes", () => {
    const { container } = render(
      <MediaHoverCtas
        items={mockItems}
        sectionClassName="custom-section"
        gridClassName="custom-grid"
      />
    );

    const section = container.querySelector("section");
    const grid = container.querySelector(".grid");

    expect(section?.className).toContain("custom-section");
    expect(grid?.className).toContain("custom-grid");
  });

  it("applies background color variables when configured", () => {
    const { container } = render(<MediaHoverCtas items={mockItems} />);
    const cards = container.querySelectorAll(".group");
    const secondCard = cards[1] as HTMLElement;

    expect(
      secondCard.style.getPropertyValue("--media-hover-cta-bg")
    ).toBe("#111111");
    expect(
      secondCard.style.getPropertyValue("--media-hover-cta-hover-bg")
    ).toBe("#222222");
    expect(secondCard.className).toContain(
      "group-hover:bg-[var(--media-hover-cta-hover-bg)]"
    );
  });

  it("ignores hover background when hover image is provided", () => {
    const items: MediaHoverCtaItem[] = [
      {
        content: <div>CTA</div>,
        onHoverImgSrc: "/cta.jpg",
        onHoverBackgroundColor: "#000000",
      },
    ];

    const { container } = render(<MediaHoverCtas items={items} />);
    const card = container.querySelector(".group") as HTMLElement;

    expect(card.className).not.toContain(
      "group-hover:bg-[var(--media-hover-cta-hover-bg)]"
    );
    expect(
      card.style.getPropertyValue("--media-hover-cta-hover-bg")
    ).toBe("");
  });

  it("renders with empty items array", () => {
    const { container } = render(<MediaHoverCtas items={[]} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
