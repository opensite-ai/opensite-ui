import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailHoverGallery } from "../project-detail-hover-gallery";

describe("ProjectDetailHoverGallery", () => {
  const defaultProps = {
    title: "Interactive Installations",
    category: "Digital Art",
    year: "2024",
    backHref: "/projects",
    images: [
      { src: "/img1.jpg", alt: "Installation 1", title: "Light Wave", description: "An immersive light experience" },
      { src: "/img2.jpg", alt: "Installation 2", title: "Sound Garden", description: "Interactive sound sculpture" },
    ],
  };
    expect(backLink).toHaveAttribute("href", "/projects");
  });
});
