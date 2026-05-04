import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { BlockActions } from "../block-actions";

describe("BlockActions", () => {
  it("renders link variant actions with full button layout styles", () => {
    render(
      <BlockActions
        actions={[
          { label: "Find a School Near You", href: "/", variant: "default" },
          { label: "View Our Curriculum", href: "/", variant: "link" },
        ]}
      />,
    );

    const defaultAction = screen.getByRole("link", {
      name: "Find a School Near You",
    });
    const linkAction = screen.getByRole("link", {
      name: "View Our Curriculum",
    });

    expect(defaultAction).toHaveAttribute("data-variant", "default");
    expect(linkAction).toHaveAttribute("data-slot", "button");
    expect(linkAction).toHaveAttribute("data-variant", "link");
    expect(linkAction).toHaveAttribute("data-size", "default");
    expect(linkAction).toHaveClass(
      "inline-flex",
      "items-center",
      "justify-center",
      "text-sm",
      "h-[var(--button-height-md,2.25rem)]",
      "px-[var(--button-padding-x-md,1rem)]",
      "py-[var(--button-padding-y-md,0.5rem)]",
    );
  });
});
