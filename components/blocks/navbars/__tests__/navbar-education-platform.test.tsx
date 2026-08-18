import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { simulateRouteChange } from "../../../../src/test-utils/simulate-route-change";
import {
  NavbarEducationPlatform,
  type MenuItem,
} from "../navbar-education-platform";

vi.mock("@page-speed/img", () => ({
  Img: ({
    src,
    alt,
    className,
  }: {
    src: string;
    alt?: string;
    className?: string;
  }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

// Real Pressable calls the router's navigateTo on click, which scrolls; jsdom
// has no layout so stub it to keep test output pristine.
beforeEach(() => {
  vi.stubGlobal("scrollTo", vi.fn());
});

const menu: MenuItem[] = [
  {
    label: "Courses",
    groups: [
      {
        label: "By Topic",
        links: [
          {
            title: "Web Development",
            href: "/courses/web",
            description: "Build for the browser",
            icon: "lucide/code",
          },
          { title: "Data Science", href: "/courses/data" },
        ],
        featuredImage: {
          src: "https://example.com/featured.jpg",
          alt: "Featured course",
          href: "/courses/featured",
        },
      },
    ],
  },
  { label: "Pricing", href: "/pricing" },
];

const openDropdown = () => {
  const trigger = screen.getByRole("button", { name: /Courses/ });
  fireEvent.click(trigger);
  expect(trigger).toHaveAttribute("data-state", "open");
  return trigger;
};

describe("NavbarEducationPlatform", () => {
  describe("desktop dropdown group links", () => {
    it("renders each group link as a Radix navigation-menu link anchor", () => {
      render(<NavbarEducationPlatform menu={menu} />);

      openDropdown();

      const subLink = screen.getByText("Web Development").closest("a");
      expect(subLink).toBeTruthy();
      // NavigationMenuLink injects data-slot (alongside the dismiss onClick,
      // aria props and the ref) through Slot; the Pressable must keep them.
      expect(subLink).toHaveAttribute("data-slot", "navigation-menu-link");
      expect(subLink).toHaveAttribute("href", "/courses/web");
    });

    it("neutralizes the NavigationMenuLink defaults that fight the Pressable's layout", () => {
      render(<NavbarEducationPlatform menu={menu} />);

      openDropdown();

      const subLink = screen
        .getByText("Web Development")
        .closest("a") as HTMLAnchorElement;
      const classes = Array.from(subLink.classList);

      // Slot joins the wrapper's class string with the child's by plain
      // concatenation, so every default the wrapper still carries has to be
      // pre-resolved on the wrapper's own className to survive as intent
      // rather than as stylesheet order.
      expect(classes).not.toContain("text-current/80");
      expect(classes).not.toContain("justify-center");
      expect(classes).not.toContain("inline-flex");
      expect(classes).not.toContain("w-max");
      expect(classes).toContain("flex");
      expect(classes).toContain("w-full");
      expect(classes).toContain("justify-start");
      expect(classes).toContain("text-current");
    });

    it("closes the dropdown when a group link is clicked", () => {
      render(<NavbarEducationPlatform menu={menu} />);

      const trigger = openDropdown();

      fireEvent.click(screen.getByText("Web Development"));

      expect(trigger).toHaveAttribute("data-state", "closed");
    });

    it("closes the dropdown on an SPA navigation (shared wrapper, no viewport)", () => {
      render(<NavbarEducationPlatform menu={menu} />);

      const trigger = openDropdown();

      simulateRouteChange("/courses/web");

      expect(trigger).toHaveAttribute("data-state", "closed");
    });
  });
});
