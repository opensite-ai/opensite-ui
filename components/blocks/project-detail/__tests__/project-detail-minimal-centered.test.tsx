import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailMinimalCentered } from "../project-detail-minimal-centered";

describe("ProjectDetailMinimalCentered", () => {
  const defaultProps = {
    title: "Quiet Moments",
    subtitle: "A meditation on stillness",
    description: "A photographic series exploring moments of peace in everyday life.",
    images: [
      { src: "/hero.jpg", alt: "Quiet scene" },
      { src: "/gallery1.jpg", alt: "Moment 1" },
      { src: "/gallery2.jpg", alt: "Moment 2" },
    ],
  };
    expect(backLink).toHaveAttribute("href", "/projects");
  });
});
