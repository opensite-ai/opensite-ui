import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailGridGallery } from "../project-detail-grid-gallery";

describe("ProjectDetailGridGallery", () => {
  const defaultProps = {
    title: "Summer Collection",
    category: "Fashion",
    year: "2024",
    description: "Our latest summer fashion collection.",
    images: [
      { src: "/img1.jpg", alt: "Look 1", caption: "Sunset dress" },
      { src: "/img2.jpg", alt: "Look 2", caption: "Ocean breeze top" },
      { src: "/img3.jpg", alt: "Look 3" },
    ],
  };
    expect(backLink).toHaveAttribute("href", "/projects");
  });
});
