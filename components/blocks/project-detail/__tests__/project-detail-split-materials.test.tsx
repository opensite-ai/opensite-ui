import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailSplitMaterials } from "../project-detail-split-materials";

describe("ProjectDetailSplitMaterials", () => {
  const defaultProps = {
    title: "Ergonomic Chair",
    category: "Furniture Design",
    year: "2024",
    heroImage: { src: "/hero.jpg", alt: "Chair" },
    description: "A revolutionary ergonomic chair designed for all-day comfort.",
    specifications: [
      { label: "Material", value: "Recycled aluminum, mesh fabric" },
      { label: "Dimensions", value: "28W x 26D x 42H inches" },
      { label: "Weight", value: "35 lbs" },
    ],
    secondaryImage: { src: "/secondary.jpg", alt: "Detail view" },
    materials: ["Aluminum", "Mesh fabric"],
  };
    expect(backLink).toHaveAttribute("href", "/projects");
  });
});
