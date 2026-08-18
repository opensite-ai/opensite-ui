import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { simulateRouteChange } from "../../../../src/test-utils/simulate-route-change";
import { NavbarTabbedSections } from "../navbar-tabbed-sections";

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

const menu = [
  {
    title: "Trigger Title",
    tabs: [
      {
        id: "platform",
        title: "Platform",
        links: [
          {
            title: "Sub Item",
            description: "Everything in one place",
            url: "/platform/sub-item",
          },
          { title: "Analytics", url: "/platform/analytics" },
        ],
        featured: {
          title: "Featured Story",
          description: "Read the case study",
          url: "/platform/featured",
          image: "https://example.com/featured.jpg",
        },
      },
    ],
  },
  { title: "Pricing", url: "/pricing" },
];

// The mobile accordion reuses the same titles, but NavbarMobileMenu renders
// nothing while closed, so the desktop trigger is the only match here.
const trigger = () => screen.getByRole("button", { name: /Trigger Title/ });
const subLink = () => screen.getByText("Sub Item").closest("a") as HTMLElement;

describe("NavbarTabbedSections desktop dropdown", () => {
  it("renders tab links as Radix navigation-menu links", () => {
    render(<NavbarTabbedSections menu={menu} />);

    fireEvent.click(trigger());

    expect(subLink()).toBeTruthy();
    expect(subLink()).toHaveAttribute("href", "/platform/sub-item");
    // Bare Pressables never dispatch Radix's rootContentDismiss and lose the
    // injected data-*/aria props and ref.
    expect(subLink()).toHaveAttribute("data-slot", "navigation-menu-link");
  });

  it("neutralizes NavigationMenuLink's defaults so the link keeps its own layout", () => {
    render(<NavbarTabbedSections menu={menu} />);

    fireEvent.click(trigger());
    const link = subLink();

    // Radix's Slot joins the wrapper's resolved class string with the child's
    // by plain concatenation (no twMerge), so any default left in the wrapper
    // fights the Pressable's own classes with stylesheet order deciding.
    expect(link).not.toHaveClass("inline-flex");
    expect(link).not.toHaveClass("items-center");
    expect(link).not.toHaveClass("w-max");
    expect(link).not.toHaveClass("justify-center");
    expect(link).not.toHaveClass("px-3");
    expect(link).not.toHaveClass("py-2");
    expect(link).not.toHaveClass("text-current/80");
    expect(link).not.toHaveClass("hover:bg-current/10");
    expect(link).not.toHaveClass("transition-[color,box-shadow]");

    expect(link).toHaveClass(
      "flex",
      "w-full",
      "items-start",
      "justify-start",
      "p-3",
      "text-current",
      "transition-colors",
      "hover:bg-muted",
      "hover:text-current",
    );
  });

  it("closes the dropdown when a tab link is clicked", () => {
    render(<NavbarTabbedSections menu={menu} />);

    fireEvent.click(trigger());
    expect(trigger()).toHaveAttribute("data-state", "open");

    fireEvent.click(subLink());

    expect(trigger()).toHaveAttribute("data-state", "closed");
  });

  it("closes the dropdown on an SPA navigation", () => {
    render(<NavbarTabbedSections menu={menu} />);

    fireEvent.click(trigger());
    expect(trigger()).toHaveAttribute("data-state", "open");

    simulateRouteChange("/platform/sub-item");

    expect(trigger()).toHaveAttribute("data-state", "closed");
  });
});
