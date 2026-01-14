import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailFashionEditorial } from "../project-detail-fashion-editorial";

describe("ProjectDetailFashionEditorial", () => {
  const defaultProps = {
    title: "AUTUMN COLLECTION",
    heroImage: { src: "/hero.jpg", alt: "Fashion shoot" },
    credits: [
      { role: "Photographer", name: "Jane Doe" },
      { role: "Stylist", name: "John Smith" },
      { role: "Model", name: "Alex Johnson" },
    ],
    galleryImages: [
      { src: "/gallery1.jpg", alt: "Look 1" },
      { src: "/gallery2.jpg", alt: "Look 2" },
    ],
  };
    expect(backLink).toHaveAttribute("href", "/projects");
  });
});
