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

  it("renders title correctly", () => {
    render(<ProjectDetailParallaxScroll {...defaultProps} />);
    expect(screen.getByText("Immersive Experience")).toBeInTheDocument();
  });

  it("renders hero image", () => {
    render(<ProjectDetailParallaxScroll {...defaultProps} />);
    expect(screen.getByAltText("Experience")).toBeInTheDocument();
  });

  it("renders all content sections", () => {
    render(<ProjectDetailParallaxScroll {...defaultProps} />);
    expect(screen.getByText("Chapter One")).toBeInTheDocument();
    expect(screen.getByText("The story begins...")).toBeInTheDocument();
    expect(screen.getByText("Chapter Two")).toBeInTheDocument();
    expect(screen.getByText("The journey continues...")).toBeInTheDocument();
    expect(screen.getByText("Chapter Three")).toBeInTheDocument();
    expect(screen.getByText("The conclusion...")).toBeInTheDocument();
  });

  it("renders section images", () => {
    render(<ProjectDetailParallaxScroll {...defaultProps} />);
    expect(screen.getByAltText("Chapter 1")).toBeInTheDocument();
    expect(screen.getByAltText("Chapter 2")).toBeInTheDocument();
    expect(screen.getByAltText("Chapter 3")).toBeInTheDocument();
  });

  it("renders with empty sections", () => {
    const props = { ...defaultProps, sections: [] };
    const { container } = render(<ProjectDetailParallaxScroll {...props} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ProjectDetailParallaxScroll {...defaultProps} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("renders back button when backHref is provided", () => {
    render(<ProjectDetailParallaxScroll {...defaultProps} backHref="/projects" />);
    const backLink = screen.getByRole("link", { name: /back/i });
    expect(backLink).toHaveAttribute("href", "/projects");
  });
});
