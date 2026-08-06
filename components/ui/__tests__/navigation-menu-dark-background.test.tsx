import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { NavbarSimpleLinks } from "../../blocks/navbars/navbar-simple-links";

/**
 * Regression guard for the dark-navbar bug: every navbar renders its top-level
 * items through `NavigationMenuLink` / `NavigationMenuTrigger`, and those pinned
 * `text-foreground`. Inside a `Section` with a dark background — which sets
 * `text-background` on the wrapper — the pinned colour won, so the links were
 * black on a near-black bar and effectively invisible.
 *
 * The fix is to inherit (`currentColor`). These assertions are on class names
 * rather than computed colour because jsdom does not run Tailwind.
 */
describe("navbar links on dark backgrounds", () => {
  const navItems = [
    { name: "Home", link: "/" },
    { name: "Services", link: "/services" },
  ];

  const linkFor = (label: string): HTMLElement => {
    const node = screen.getByText(label).closest("a, button, [data-slot]");
    if (!node) throw new Error(`no link element for ${label}`);
    return node as HTMLElement;
  };

  it("inherits the section's text colour instead of pinning the foreground", () => {
    render(<NavbarSimpleLinks navItems={navItems} background="dark" />);

    const link = linkFor("Home");
    expect(link.className).toContain("text-current");
    expect(link.className).not.toContain("text-foreground/80");
  });

  it("keeps the same inheritance on light backgrounds", () => {
    render(<NavbarSimpleLinks navItems={navItems} background="white" />);

    const link = linkFor("Services");
    expect(link.className).toContain("text-current");
  });

  it("never paints an opaque light pill behind a nav item", () => {
    render(<NavbarSimpleLinks navItems={navItems} background="dark" />);

    // `bg-background` here produced a white chip on dark bars.
    expect(linkFor("Home").className).not.toContain("bg-background");
  });
});
