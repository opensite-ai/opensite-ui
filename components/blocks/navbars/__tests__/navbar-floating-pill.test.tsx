import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import {
  simulateRouteChange,
  dispatchRouteEvent,
} from "../../../../src/test-utils/simulate-route-change";
import { NavbarFloatingPill } from "../navbar-floating-pill";

vi.mock("@page-speed/img", () => ({
  Img: ({
    src,
    alt,
    className,
  }: {
    src: string;
    alt: string;
    className?: string;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

// Real Pressable calls the router's navigateTo on click, which scrolls; jsdom
// has no layout so stub it to keep test output pristine.
beforeEach(() => {
  vi.stubGlobal("scrollTo", vi.fn());
});

const items = [
  {
    label: "Services",
    href: "/services",
    dropdownItems: [
      {
        title: "Web Design",
        href: "/services/web",
        description: "Sites that convert",
      },
      { title: "SEO", href: "/services/seo", description: "Rankings" },
    ],
  },
  { label: "About", href: "/about" },
];

/**
 * The mobile panel is always mounted; open/closed is expressed purely through
 * visibility classes, so the class token is the only observable state.
 */
const mobilePanel = (container: HTMLElement) =>
  container.querySelector<HTMLElement>("div.fixed.inset-x-0")!;

const hamburger = () => screen.getByRole("button", { name: /Open main menu/ });

describe("NavbarFloatingPill mobile panel", () => {
  it("opens the mobile panel from the hamburger button", () => {
    const { container } = render(<NavbarFloatingPill items={items} />);

    expect(mobilePanel(container)).toHaveClass("invisible");

    fireEvent.click(hamburger());

    expect(mobilePanel(container)).toHaveClass("visible");
    expect(mobilePanel(container)).not.toHaveClass("invisible");
  });

  it("closes the mobile panel on an SPA navigation it did not initiate", () => {
    const { container } = render(<NavbarFloatingPill items={items} />);

    fireEvent.click(hamburger());
    expect(mobilePanel(container)).toHaveClass("visible");

    simulateRouteChange("/pricing");

    expect(mobilePanel(container)).toHaveClass("invisible");
  });

  it("closes the mobile panel on a bare popstate (browser back/forward)", () => {
    const { container } = render(<NavbarFloatingPill items={items} />);

    fireEvent.click(hamburger());
    expect(mobilePanel(container)).toHaveClass("visible");

    dispatchRouteEvent("popstate");

    expect(mobilePanel(container)).toHaveClass("invisible");
  });

  it("collapses an expanded mobile dropdown on navigation, not just the panel", () => {
    const { container } = render(<NavbarFloatingPill items={items} />);

    fireEvent.click(hamburger());
    const panel = mobilePanel(container);
    fireEvent.click(within(panel).getByRole("button", { name: /Services/ }));

    const sublinkWrapper = within(panel)
      .getByText("Web Design")
      .closest("div.overflow-hidden")!;
    expect(sublinkWrapper).toHaveClass("opacity-100");

    simulateRouteChange("/pricing");

    expect(mobilePanel(container)).toHaveClass("invisible");
    expect(sublinkWrapper).toHaveClass("opacity-0");
  });

  it("still closes the panel when a mobile link is tapped", () => {
    const { container } = render(<NavbarFloatingPill items={items} />);

    fireEvent.click(hamburger());
    const panel = mobilePanel(container);
    const aboutLink = within(panel).getByText("About").closest("a")!;
    expect(aboutLink).toHaveAttribute("href", "/about");

    fireEvent.click(aboutLink);

    expect(mobilePanel(container)).toHaveClass("invisible");
  });
});

describe("NavbarFloatingPill desktop dropdown", () => {
  it("renders dropdown sub-links as Radix navigation-menu links", () => {
    render(<NavbarFloatingPill items={items} />);

    const trigger = screen.getAllByRole("button", { name: /Services/ })[0]!;
    fireEvent.click(trigger);

    const subLink = screen.getAllByText("Web Design")[0]!.closest("a");
    expect(subLink).toHaveAttribute("href", "/services/web");
    expect(subLink).toHaveAttribute("data-slot", "navigation-menu-link");
  });
});
