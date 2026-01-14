import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailSidebarSticky } from "../project-detail-sidebar-sticky";

describe("ProjectDetailSidebarSticky", () => {
  const defaultProps = {
    title: "Urban Perspectives",
    subtitle: "A photographic journey",
    category: "Photography",
    year: "2024",
    description: "Exploring urban environments",
    images: [
      { src: "/gallery1.jpg", alt: "Gallery 1" },
      { src: "/gallery2.jpg", alt: "Gallery 2" },
    ],
  };
});
