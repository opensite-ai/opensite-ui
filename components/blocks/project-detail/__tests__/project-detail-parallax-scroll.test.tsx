import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailParallaxScroll } from "../project-detail-parallax-scroll";

describe("ProjectDetailParallaxScroll", () => {
  const defaultProps = {
    title: "Immersive Experience",
    heroImage: { src: "/hero.jpg", alt: "Experience" },
    sections: [
      { title: "Chapter One", content: "The story begins...", image: { src: "/img1.jpg", alt: "Chapter 1" } },
      { title: "Chapter Two", content: "The journey continues...", image: { src: "/img2.jpg", alt: "Chapter 2" } },
      { title: "Chapter Three", content: "The conclusion...", image: { src: "/img3.jpg", alt: "Chapter 3" } },
    ],
  };
    expect(backLink).toHaveAttribute("href", "/projects");
  });
});
