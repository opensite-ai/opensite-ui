import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { simulateRouteChange } from "../../../../src/test-utils/simulate-route-change";
import { NavbarCenteredMenu } from "../navbar-centered-menu";

// Real Pressable calls the router's navigateTo on click, which scrolls; jsdom
// has no layout so stub it to keep test output pristine.
beforeEach(() => {
  vi.stubGlobal("scrollTo", vi.fn());
});

const menu = [
  {
    title: "Services",
    url: "/services",
    items: [
      { title: "Web Design", url: "/services/web", description: "Sites" },
      { title: "SEO", url: "/services/seo" },
    ],
  },
  { title: "About", url: "/about" },
];

const openMobileMenu = (container: HTMLElement) => {
  const hamburger = container.querySelector(
    '[class*="lg:hidden"] button',
  ) as HTMLElement;
  expect(hamburger).toBeTruthy();
  fireEvent.click(hamburger);
};

const closeButton = () => screen.queryByLabelText("Close mobile menu");

describe("NavbarCenteredMenu", () => {
  describe("mobile menu (live repro: barriobagelandsliceaz)", () => {
    it("closes the fullscreen menu when an SPA navigation happens", () => {
      const { container } = render(<NavbarCenteredMenu menu={menu} />);

      openMobileMenu(container);
      expect(closeButton()).toBeInTheDocument();

      simulateRouteChange("/about");

      expect(closeButton()).not.toBeInTheDocument();
    });

    it("closes the fullscreen menu when a mobile link is clicked", () => {
      const { container } = render(<NavbarCenteredMenu menu={menu} />);

      openMobileMenu(container);
      expect(closeButton()).toBeInTheDocument();

      // Top-level url-only items render as direct links in the mobile menu;
      // the last "About" in the tree is the mobile one (desktop renders first).
      const links = screen.getAllByText("About");
      fireEvent.click(links[links.length - 1]);

      expect(closeButton()).not.toBeInTheDocument();
    });
  });

  describe("desktop dropdown", () => {
    it("closes the open dropdown on an SPA navigation (shared wrapper, no viewport)", () => {
      render(<NavbarCenteredMenu menu={menu} />);

      const trigger = screen.getByRole("button", { name: /Services/ });
      fireEvent.click(trigger);
      expect(trigger).toHaveAttribute("data-state", "open");

      simulateRouteChange("/services/web");

      expect(trigger).toHaveAttribute("data-state", "closed");
    });

    it("forwards Radix's injected props through SubMenuLink to the anchor", () => {
      render(<NavbarCenteredMenu menu={menu} />);

      fireEvent.click(screen.getByRole("button", { name: /Services/ }));

      const subLink = screen.getByText("Web Design").closest("a");
      expect(subLink).toBeTruthy();
      // NavigationMenuLink injects data-slot (among onClick/ref/aria props)
      // via Slot; SubMenuLink must not drop them on the floor.
      expect(subLink).toHaveAttribute("data-slot", "navigation-menu-link");
      expect(subLink).toHaveAttribute("href", "/services/web");
    });
  });
});
