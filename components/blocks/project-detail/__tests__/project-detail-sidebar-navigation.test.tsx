import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailSidebarNavigation } from "../project-detail-sidebar-navigation";

describe("ProjectDetailSidebarNavigation", () => {
  const defaultProps = {
    title: "Product Launch Campaign",
    subtitle: "A multi-channel marketing initiative",
    heroImage: { src: "/hero.jpg", alt: "Hero image" },
    sections: [
      { id: "overview", title: "Overview", content: "Campaign overview" },
      { id: "strategy", title: "Strategy", content: "Our strategic approach" },
    ],
  };
    expect(backLink).toHaveAttribute("href", "/projects");
  });
});
