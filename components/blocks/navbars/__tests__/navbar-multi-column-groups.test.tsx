import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { simulateRouteChange } from "../../../../src/test-utils/simulate-route-change";
import { NavbarMultiColumnGroups } from "../navbar-multi-column-groups";

// Real Pressable calls the router's navigateTo on click, which scrolls; jsdom
// has no layout so stub it to keep test output pristine.
beforeEach(() => {
  vi.stubGlobal("scrollTo", vi.fn());
});

const groupedNavigation = [
  {
    title: "Explore",
    groups: [
      {
        title: "About Us",
        links: [
          {
            label: "Sub Item",
            description: "Heritage tours and tastings",
            url: "/heritage",
            iconName: "lucide/puzzle",
          },
        ],
      },
    ],
  },
  { title: "Contact", url: "/contact" },
];

const groupTrigger = () => screen.getByRole("button", { name: /Explore/ });

describe("NavbarMultiColumnGroups", () => {
  it("bounds multi-column dropdown links so long generated copy cannot erase panel padding", async () => {
    const longLabel =
      "Mexican-Irish Heritage Experiences With Storytelling Dinner Pairings And Community Events";
    const longDescription =
      "A generated paragraph-length description that should never force the icon title subtitle link component to grow wider than its assigned dropdown column.";

    render(
      <NavbarMultiColumnGroups
        logo={{ title: "Carlos O'Brien's", url: "/" }}
        navigation={[
          {
            title: "Explore",
            groups: [
              {
                title: "About Us",
                links: [
                  {
                    label: longLabel,
                    description: longDescription,
                    url: "/heritage",
                    iconName: "lucide/puzzle",
                  },
                ],
              },
              {
                title: "Resources",
                links: [
                  {
                    label: "Blog",
                    description: "Mexican food guides and recipes",
                    url: "/blog",
                    iconName: "lucide/newspaper",
                  },
                ],
              },
            ],
          },
        ]}
      />,
    );

    const trigger = screen.getByRole("button", { name: /explore/i });
    fireEvent.pointerEnter(trigger);
    fireEvent.mouseEnter(trigger);
    fireEvent.focus(trigger);
    fireEvent.click(trigger);

    const title = await screen.findByText(longLabel);
    const dropdownGrid = title
      .closest("[data-slot='navigation-menu-content']")
      ?.querySelector("ul.box-border");
    expect(dropdownGrid).toHaveClass("box-border", "gap-2", "p-2");
    expect(dropdownGrid).toHaveStyle({
      width: "520px",
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    });

    const description = screen.getByText(longDescription);
    const link = title.closest("a");

    expect(link).toHaveClass(
      "!w-full",
      "max-w-full",
      "min-w-0",
      "overflow-hidden",
      "whitespace-normal",
    );
    expect(title).toHaveClass("line-clamp-2", "break-words");
    expect(description).toHaveClass("line-clamp-2", "break-words");
  });

  describe("desktop dropdown sub-links", () => {
    it("renders group links as Radix navigation-menu links", () => {
      render(<NavbarMultiColumnGroups navigation={groupedNavigation} />);

      fireEvent.click(groupTrigger());

      const subLink = screen.getByText("Sub Item").closest("a");
      expect(subLink).toBeTruthy();
      expect(subLink).toHaveAttribute("href", "/heritage");
      // Bare Pressables never dispatch Radix's rootContentDismiss; the link
      // must participate in NavigationMenuLink semantics.
      expect(subLink).toHaveAttribute("data-slot", "navigation-menu-link");
    });

    it("closes the dropdown when a group link is clicked, without any pointer-leave", () => {
      render(<NavbarMultiColumnGroups navigation={groupedNavigation} />);

      fireEvent.click(groupTrigger());
      expect(groupTrigger()).toHaveAttribute("data-state", "open");

      fireEvent.click(screen.getByText("Sub Item").closest("a")!);

      expect(groupTrigger()).toHaveAttribute("data-state", "closed");
    });

    it("closes the dropdown on a browser back/forward navigation", () => {
      render(<NavbarMultiColumnGroups navigation={groupedNavigation} />);

      fireEvent.click(groupTrigger());
      expect(groupTrigger()).toHaveAttribute("data-state", "open");

      simulateRouteChange("/heritage");

      expect(groupTrigger()).toHaveAttribute("data-state", "closed");
    });
  });
});
