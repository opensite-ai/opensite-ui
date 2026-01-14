import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailMaskReveal } from "../project-detail-mask-reveal";

describe("ProjectDetailMaskReveal", () => {
  const defaultProps = {
    title: "Visual Journey",
    heroImage: { src: "/hero.jpg", alt: "Journey" },
    revealImages: [
      { src: "/reveal1.jpg", alt: "Scene 1", caption: "The beginning" },
      { src: "/reveal2.jpg", alt: "Scene 2", caption: "The middle" },
      { src: "/reveal3.jpg", alt: "Scene 3", caption: "The end" },
    ],
  };
    expect(backLink).toHaveAttribute("href", "/projects");
  });
});
