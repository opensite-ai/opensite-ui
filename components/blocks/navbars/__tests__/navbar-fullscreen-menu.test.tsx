import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  simulateRouteChange,
  dispatchRouteEvent,
} from "../../../../src/test-utils/simulate-route-change";
import { NavbarFullscreenMenu } from "../navbar-fullscreen-menu";

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

const menuItems = [
  { label: "Work", href: "/work" },
  { label: "Studio", href: "/studio" },
];

const openToggle = () => screen.getByRole("button", { name: "Open menu" });

/** Menu items only exist inside the overlay, so their absence means it closed. */
const overlayIsOpen = () => screen.queryByText("Work") !== null;

describe("NavbarFullscreenMenu overlay route-change close", () => {
  it("opens the fullscreen overlay from the header toggle", () => {
    render(<NavbarFullscreenMenu menuItems={menuItems} />);

    expect(overlayIsOpen()).toBe(false);

    fireEvent.click(openToggle());

    expect(overlayIsOpen()).toBe(true);
    expect(screen.getByText("Work").closest("a")).toHaveAttribute(
      "href",
      "/work",
    );
  });

  it("closes the overlay on an SPA navigation", () => {
    render(<NavbarFullscreenMenu menuItems={menuItems} />);

    fireEvent.click(openToggle());
    expect(overlayIsOpen()).toBe(true);

    simulateRouteChange("/work");

    // A fixed inset-0 overlay covers the whole viewport, so a menu left open
    // renders the newly navigated page invisibly behind it.
    expect(overlayIsOpen()).toBe(false);
  });

  it("closes the overlay on a browser back/forward navigation alone", () => {
    render(<NavbarFullscreenMenu menuItems={menuItems} />);

    fireEvent.click(openToggle());
    expect(overlayIsOpen()).toBe(true);

    dispatchRouteEvent("popstate");

    expect(overlayIsOpen()).toBe(false);
  });

  it("closes the overlay when a menu link is clicked", () => {
    render(<NavbarFullscreenMenu menuItems={menuItems} />);

    fireEvent.click(openToggle());
    expect(overlayIsOpen()).toBe(true);

    fireEvent.click(screen.getByText("Studio").closest("a")!);

    expect(overlayIsOpen()).toBe(false);
  });

  it("still closes the overlay from its own close button", () => {
    render(<NavbarFullscreenMenu menuItems={menuItems} />);

    fireEvent.click(openToggle());
    expect(overlayIsOpen()).toBe(true);

    fireEvent.click(screen.getAllByLabelText("Close menu")[0]!);

    expect(overlayIsOpen()).toBe(false);
  });
});
