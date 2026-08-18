import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { simulateRouteChange } from "../../../../src/test-utils/simulate-route-change";
import { NavbarDarkIcons } from "../navbar-dark-icons";

// Real Pressable calls the router's navigateTo on click, which scrolls; jsdom
// has no layout so stub it to keep test output pristine.
beforeEach(() => {
  vi.stubGlobal("scrollTo", vi.fn());
});

const navigation = [
  {
    title: "Services",
    links: [
      {
        label: "Web Design",
        url: "/services/web",
        description: "Sites",
        icon: "lucide/layout" as const,
      },
      {
        label: "SEO",
        url: "/services/seo",
        description: "Rankings",
      },
    ],
  },
  { title: "About", url: "/about" },
];

const trigger = () => screen.getByRole("button", { name: /Services/ });

describe("NavbarDarkIcons desktop dropdown", () => {
  it("renders dropdown sub-links as Radix navigation-menu links", () => {
    render(<NavbarDarkIcons navigation={navigation} />);

    fireEvent.click(trigger());

    const subLink = screen.getByText("Web Design").closest("a");
    expect(subLink).toBeTruthy();
    expect(subLink).toHaveAttribute("href", "/services/web");
    // Bare Pressables never dispatch Radix's rootContentDismiss; the link must
    // participate in NavigationMenuLink semantics.
    expect(subLink).toHaveAttribute("data-slot", "navigation-menu-link");
  });

  it("closes the dropdown when a sub-link is clicked, without any pointer-leave", () => {
    render(<NavbarDarkIcons navigation={navigation} />);

    fireEvent.click(trigger());
    expect(trigger()).toHaveAttribute("data-state", "open");

    const subLink = screen.getByText("Web Design").closest("a")!;
    fireEvent.click(subLink);

    expect(trigger()).toHaveAttribute("data-state", "closed");
  });

  it("closes the dropdown on a browser back/forward navigation", () => {
    render(<NavbarDarkIcons navigation={navigation} />);

    fireEvent.click(trigger());
    expect(trigger()).toHaveAttribute("data-state", "open");

    simulateRouteChange("/about");

    expect(trigger()).toHaveAttribute("data-state", "closed");
  });
});
