import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BlockActions } from "../block-actions";

vi.mock("../dynamic-icon", () => ({
  DynamicIcon: ({ name }: { name?: ReactNode | string }) =>
    typeof name === "string" ? (
      <span data-testid="mock-dynamic-icon" data-name={name} />
    ) : (
      <>{name}</>
    ),
}));

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

  it("renders leading and trailing icon names through DynamicIcon", () => {
    render(
      <BlockActions
        actions={[
          {
            label: "Explore",
            href: "/",
            icon: "lucide/arrow-left",
            iconAfter: "lucide/arrow-right",
          },
        ]}
      />,
    );

    expect(
      screen.getAllByTestId("mock-dynamic-icon").map((icon) =>
        icon.getAttribute("data-name"),
      ),
    ).toEqual(["lucide/arrow-left", "lucide/arrow-right"]);
    expect(screen.queryByText("lucide/arrow-left")).not.toBeInTheDocument();
    expect(screen.queryByText("lucide/arrow-right")).not.toBeInTheDocument();
  });

  it("preserves custom leading and trailing icon elements", () => {
    render(
      <BlockActions
        actions={[
          {
            label: "Explore",
            href: "/",
            icon: <span data-testid="custom-leading-icon" />,
            iconAfter: <span data-testid="custom-trailing-icon" />,
          },
        ]}
      />,
    );

    expect(screen.getByTestId("custom-leading-icon")).toBeInTheDocument();
    expect(screen.getByTestId("custom-trailing-icon")).toBeInTheDocument();
  });
});
