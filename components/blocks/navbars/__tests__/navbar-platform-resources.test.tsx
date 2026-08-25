import { describe, it, expect, vi, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { NavbarPlatformResources } from "../navbar-platform-resources";
import type { IMenuLink } from "../navbar-platform-resources";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

// This suite runs the REAL Pressable. It used to carry a Pressable mock, but
// its specifier ("../../../lib/Pressable") resolved to a path that doesn't
// exist from this __tests__ directory, so vitest never intercepted anything —
// the mock was an inert landmine. Real Pressable is what production renders;
// keep it that way.

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, size }: { name: any; size?: number }) =>
    name == null ? null : (
      <span data-testid="mock-icon" data-icon={String(name)} data-size={size}>Icon</span>
    ),
}));

describe("NavbarPlatformResources", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockSimpleMenuLinks: IMenuLink[] = [
    {
      label: "Products",
      links: [
        {
          label: "Product 1",
          description: "First product",
          url: "/products/1",
          iconName: "lucide/box",
        },
        {
          label: "Product 2",
          description: "Second product",
          url: "/products/2",
          iconName: "lucide/package",
        },
      ],
    },
    {
      label: "About",
      href: "/about",
    },
  ];

  const mockFeaturedGridLink: IMenuLink = {
    label: "Platform",
    layout: "featured-grid",
    links: [
      {
        label: "Platform Overview",
        description: "Discover how our platform transforms your workflow.",
        url: "/platform",
        image: "https://example.com/platform.jpg",
      },
      {
        label: "Cloud Infrastructure",
        description: "Scalable cloud solutions",
        url: "/cloud",
        iconName: "lucide/cloud",
      },
      {
        label: "Security",
        description: "Enterprise-grade security",
        url: "/security",
        iconName: "lucide/lock",
      },
    ],
    dropdownGroups: [
      {
        label: "Solutions",
        links: [],
      },
    ],
  };

  const mockTwoColumnCtaLink: IMenuLink = {
    label: "Use Cases",
    layout: "two-column-cta",
    dropdownGroups: [
      {
        label: "Industries",
        links: [
          { label: "Banking", url: "/banking", iconName: "lucide/building" },
          { label: "Healthcare", url: "/healthcare", iconName: "lucide/heart-pulse" },
        ],
      },
    ],
    links: [
      {
        label: "Enterprise Solutions",
        description: "Tailored for your needs",
        url: "/enterprise",
        background: "For Enterprises",
        image: "https://example.com/enterprise.jpg",
      },
    ],
  };

  const mockListShowcaseLink: IMenuLink = {
    label: "Developers",
    layout: "list-showcase",
    dropdownGroups: [
      {
        label: "Documentation",
        description: "Complete API docs",
        links: [
          { label: "API Reference", url: "/api", iconName: "lucide/arrow-up-right" },
          { label: "SDK Documentation", url: "/sdk", iconName: "lucide/arrow-up-right" },
        ],
      },
    ],
    links: [
      {
        label: "Showcase 1",
        description: "First showcase",
        url: "/showcase1",
        image: "https://example.com/showcase1.jpg",
      },
      {
        label: "Showcase 2",
        description: "Second showcase",
        url: "/showcase2",
        image: "https://example.com/showcase2.jpg",
      },
    ],
  };

  const mockMultiSectionLink: IMenuLink = {
    label: "Resources",
    layout: "multi-section",
    dropdownGroups: [
      {
        label: "Resources",
        links: [
          { label: "Blog", description: "Latest insights", url: "/blog" },
          { label: "News", description: "Product updates", url: "/news" },
        ],
      },
      {
        label: "Customers",
        links: [
          { label: "Case Studies", description: "Success stories", url: "/cases" },
        ],
      },
    ],
    links: [
      {
        label: "Customers",
        description: "See how companies use our platform",
        url: "/customers",
        image: "https://example.com/customers.jpg",
        background: "NEW",
      },
    ],
  };

  it("renders with default props", () => {
    const { container } = render(<NavbarPlatformResources />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("renders simple list dropdown layout", () => {
    render(<NavbarPlatformResources menuLinks={mockSimpleMenuLinks} />);
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
  });

  it("renders icon prop strings through DynamicIcon", () => {
    const menuLinks: IMenuLink[] = [
      {
        label: "Company",
        links: [
          {
            href: "/free-estimate/",
            icon: "lucide/file-text",
            label: "Free Estimate",
            description: "Explore Free Estimate",
          },
        ],
      },
    ];

    render(<NavbarPlatformResources menuLinks={menuLinks} />);
    fireEvent.click(screen.getByLabelText("Main Menu"));
    const companyLabels = screen.getAllByText("Company");
    fireEvent.click(companyLabels[companyLabels.length - 1]);

    expect(screen.getByText("Free Estimate")).toBeInTheDocument();
    expect(
      screen
        .getAllByTestId("mock-icon")
        .some((icon) => icon.getAttribute("data-icon") === "lucide/file-text"),
    ).toBe(true);
    expect(screen.queryByText("lucide/file-text")).not.toBeInTheDocument();
  });

  it("renders featured-grid layout", () => {
    render(<NavbarPlatformResources menuLinks={[mockFeaturedGridLink]} />);
    expect(screen.getByText("Platform")).toBeInTheDocument();
  });

  it("renders two-column-cta layout", () => {
    render(<NavbarPlatformResources menuLinks={[mockTwoColumnCtaLink]} />);
    expect(screen.getByText("Use Cases")).toBeInTheDocument();
  });

  it("renders list-showcase layout", () => {
    render(<NavbarPlatformResources menuLinks={[mockListShowcaseLink]} />);
    expect(screen.getByText("Developers")).toBeInTheDocument();
  });

  it("renders multi-section layout", () => {
    render(<NavbarPlatformResources menuLinks={[mockMultiSectionLink]} />);
    expect(screen.getByText("Resources")).toBeInTheDocument();
  });

  it("renders logo with correct alt text", () => {
    const mockLogo = {
      url: "/",
      src: "/logo.png",
      alt: "Company Logo",
    };
    render(<NavbarPlatformResources logo={mockLogo} />);
    expect(screen.getByAltText("Company Logo")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const mockActions = [
      { label: "Login", href: "/login", variant: "ghost" as const },
      { label: "Sign Up", href: "/signup", variant: "outline" as const },
    ];
    render(<NavbarPlatformResources actions={mockActions} />);
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
  });

  it("renders mobile menu trigger", () => {
    const { container } = render(<NavbarPlatformResources menuLinks={mockSimpleMenuLinks} />);
    const mobileButton = container.querySelector(".lg\\:hidden");
    expect(mobileButton).toBeInTheDocument();
  });

  it("renders navigation menu for desktop", () => {
    const { container } = render(<NavbarPlatformResources menuLinks={mockSimpleMenuLinks} />);
    const navMenu = container.querySelector("[data-slot='navigation-menu']");
    expect(navMenu).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<NavbarPlatformResources className="custom-class" />);
    const section = container.querySelector(".custom-class");
    expect(section).toBeInTheDocument();
  });

  it("renders with background and spacing props", () => {
    const { container } = render(
      <NavbarPlatformResources background="muted" spacing="md" />
    );
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("handles empty menuLinks array", () => {
    const { container } = render(<NavbarPlatformResources menuLinks={[]} />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("renders logoSlot when provided", () => {
    const logoSlot = <div data-testid="custom-logo">Custom Logo</div>;
    render(<NavbarPlatformResources logoSlot={logoSlot} />);
    expect(screen.getByTestId("custom-logo")).toBeInTheDocument();
  });

  // --- TASK-3: top-bar overflow / graceful degradation -----------------------
  //
  // 7 top-level items have a min-content width of ~883px; add the logo (~198px),
  // the CTA cluster (~121px) and the row gaps and the desktop row needs a
  // ~1554px viewport even though the desktop layout switches on at lg (1024px).
  // The regression that produced this suite: the logo flex-shrank to 0 width and
  // the CTA was pushed off-screen. These tests pin the guards, not the pixels.
  describe("top-bar overflow guards", () => {
    const overflowLogo = { url: "/", src: "/logo.png", alt: "Overflow Logo" };

    const flatLinks = (count: number): IMenuLink[] =>
      Array.from({ length: count }, (_, index) => ({
        label: `Item ${index + 1}`,
        href: `/item-${index + 1}`,
      }));

    const overflowActions = [
      { label: "Get Started", href: "/start", variant: "default" as const },
    ];

    const renderNavbar = (count: number) =>
      render(
        <NavbarPlatformResources
          logo={overflowLogo}
          menuLinks={flatLinks(count)}
          actions={overflowActions}
        />,
      );

    /** The `justify-between` row that holds logo / desktop list / actions. */
    const getRow = (container: HTMLElement) =>
      container.querySelector(
        "[data-slot='navigation-menu'] > div",
      ) as HTMLElement;

    const getDesktopList = (container: HTMLElement) =>
      container.querySelector(
        "[data-slot='navigation-menu-list']",
      ) as HTMLElement;

    /**
     * The row's OWN flex child that holds the desktop menu — i.e. the block's
     * containment wrapper, not Radix's inner `<ul>` and not Radix's unclassed
     * indicator-track `<div>`.
     */
    const getDesktopMenuRegion = (row: HTMLElement) =>
      Array.from(row.children).find((child) =>
        child.querySelector("[data-slot='navigation-menu-list']"),
      ) as HTMLElement;

    /**
     * Desktop actions cluster: the row child that is unconditionally `hidden` at
     * the smallest breakpoint AND does not contain the menu list (the menu
     * region is `hidden` below its breakpoint too). `classList.contains` is
     * deliberate — a substring check on "hidden" would also match the mobile
     * toggle's `lg:hidden` / `2xl:hidden`.
     */
    const getDesktopActions = (row: HTMLElement) =>
      Array.from(row.children).find(
        (child) =>
          child.classList.contains("hidden") &&
          !child.querySelector("[data-slot='navigation-menu-list']"),
      ) as HTMLElement;

    /** Mobile toggle cluster: the row child hidden *from* a breakpoint up. */
    const getMobileCluster = (row: HTMLElement) =>
      Array.from(row.children).find(
        (child) =>
          child.classList.contains("lg:hidden") ||
          child.classList.contains("2xl:hidden"),
      ) as HTMLElement;

    it("keeps the lg breakpoint for 5 or fewer top-level items", () => {
      const { container } = renderNavbar(5);
      const row = getRow(container);

      expect(getDesktopMenuRegion(row).classList.contains("lg:flex")).toBe(
        true,
      );
      expect(getDesktopMenuRegion(row).classList.contains("2xl:flex")).toBe(
        false,
      );
      expect(getDesktopActions(row).classList.contains("lg:flex")).toBe(true);
      expect(getDesktopActions(row).classList.contains("2xl:flex")).toBe(false);
      expect(getMobileCluster(row).classList.contains("lg:hidden")).toBe(true);
      expect(getMobileCluster(row).classList.contains("2xl:hidden")).toBe(
        false,
      );
    });

    /**
     * The switch is 2xl, NOT xl. Tailwind's `container` pins its max-width at
     * 80rem from `xl` all the way to 1535px, so 1280px and 1440px viewports give
     * the row the same ~1216px content box — measured, a 7-item payload (logo
     * 198.1px + actions ~121px + list min-content ~910px) wraps to two lines at
     * BOTH and escapes the fixed `h-16` bar. Only `2xl` (96rem) fits it.
     */
    it("defers the desktop row to 2xl when more than 5 top-level items are supplied", () => {
      const { container } = renderNavbar(6);
      const row = getRow(container);

      expect(getDesktopMenuRegion(row).classList.contains("2xl:flex")).toBe(
        true,
      );
      expect(getDesktopMenuRegion(row).classList.contains("xl:flex")).toBe(
        false,
      );
      expect(getDesktopMenuRegion(row).classList.contains("lg:flex")).toBe(
        false,
      );
      expect(getDesktopActions(row).classList.contains("2xl:flex")).toBe(true);
      expect(getDesktopActions(row).classList.contains("xl:flex")).toBe(false);
      expect(getDesktopActions(row).classList.contains("lg:flex")).toBe(false);
    });

    it("keeps the mobile toggle visible until 2xl when more than 5 top-level items are supplied", () => {
      const { container } = renderNavbar(7);
      const mobileCluster = getMobileCluster(getRow(container));

      expect(mobileCluster.classList.contains("2xl:hidden")).toBe(true);
      expect(mobileCluster.classList.contains("xl:hidden")).toBe(false);
      expect(mobileCluster.classList.contains("lg:hidden")).toBe(false);
    });

    it("protects the logo from shrinking to zero width", () => {
      const { container } = renderNavbar(7);
      const logo = getRow(container).children[0] as HTMLElement;

      expect(logo).toContainElement(screen.getByAltText("Overflow Logo"));
      expect(logo.classList.contains("shrink-0")).toBe(true);
    });

    it("protects the desktop actions cluster from being clipped off-screen", () => {
      const { container } = renderNavbar(7);
      const actions = getRow(container);

      expect(getDesktopActions(actions).classList.contains("shrink-0")).toBe(
        true,
      );
    });

    /**
     * Regression guard for the misplaced width guard.
     *
     * Radix's `NavigationMenu.List` forwards `className` to the inner `<ul>` and
     * wraps that ul in an UNCLASSED indicator-track `<div>` (a `Primitive.div`
     * whose only prop is `style={{ position: "relative" }}`). The track div, not
     * the ul, is the flex child of the `justify-between` row, so a `min-w-0`
     * handed to `NavigationMenuList` lands one level too deep and never binds.
     * This asserts the guard sits on a block-owned element that IS the row's
     * flex child, and that the Radix track div still sits between it and the ul
     * (which is exactly why the wrapper is required).
     */
    it("puts the width guard on the row's own flex child, not Radix's inner ul", () => {
      const { container } = renderNavbar(7);
      const row = getRow(container);
      const region = getDesktopMenuRegion(row);
      const list = getDesktopList(container);

      expect(region).not.toBe(list);
      expect(region.parentElement).toBe(row);
      expect(region.classList.contains("min-w-0")).toBe(true);

      // The unclassed Radix indicator track still separates the two, so the
      // guard cannot be pushed back down onto the list.
      expect(list.parentElement).not.toBe(row);
      expect(list.parentElement).not.toBe(region);
      expect(list.parentElement?.parentElement).toBe(region);
      expect(list.parentElement?.className ?? "").toBe("");
    });

    it("lets the desktop menu list reflow instead of widening the row", () => {
      const { container } = renderNavbar(7);

      // `flex-wrap` drops the list's min-content from "sum of every w-max item"
      // to "widest single item", which is what makes the `min-w-0` above
      // resolvable without clipping the dropdown panels.
      expect(getDesktopList(container).classList.contains("flex-wrap")).toBe(
        true,
      );
      expect(getRow(container).classList.contains("min-w-0")).toBe(true);
    });

    /**
     * This block renders with `viewport={false}`, so every dropdown panel is an
     * in-place absolutely positioned sibling of its trigger INSIDE the ul. Any
     * overflow clamp on the ul or on an ancestor of it would clip the panels, so
     * the containment must never reach for one.
     */
    it("never clamps overflow on the menu region or the list", () => {
      const { container } = renderNavbar(7);
      const row = getRow(container);
      const clamps = [
        "overflow-hidden",
        "overflow-x-hidden",
        "overflow-x-clip",
      ];

      for (const node of [
        row,
        getDesktopMenuRegion(row),
        getDesktopList(container),
      ]) {
        for (const clamp of clamps) {
          expect(node.classList.contains(clamp)).toBe(false);
        }
      }
    });

    it("caps the navigation menu root at the container width", () => {
      const { container } = renderNavbar(7);
      const root = container.querySelector(
        "[data-slot='navigation-menu']",
      ) as HTMLElement;

      // The shared ui primitive ships `max-w-max`, which lets the row grow past
      // the viewport. Merged away here (block-scoped) rather than in the shared
      // component, which 19 other navbars depend on.
      expect(root.classList.contains("max-w-full")).toBe(true);
      expect(root.classList.contains("max-w-max")).toBe(false);
    });

    it("uses a narrower row gap below 2xl", () => {
      const { container } = renderNavbar(7);
      const row = getRow(container);

      expect(row.classList.contains("gap-6")).toBe(true);
      expect(row.classList.contains("gap-12")).toBe(false);
      expect(row.classList.contains("2xl:gap-12")).toBe(true);
    });

    it("still honours a caller-supplied actions className", () => {
      const { container } = render(
        <NavbarPlatformResources
          logo={overflowLogo}
          menuLinks={flatLinks(6)}
          actions={overflowActions}
          actionsClassName="custom-actions"
        />,
      );

      expect(container.querySelector(".custom-actions")).toBeInTheDocument();
    });
  });
});

describe("flat menu link styling (2026-08-24 pill regression)", () => {
  it("renders flat links transparent like dropdown triggers, never bg-background", () => {
    render(
      <NavbarPlatformResources
        menuLinks={[
          { label: "Products", links: [{ label: "P1", url: "/p/1" }] },
          { label: "Contact", href: "/contact" },
        ]}
      />,
    );
    const flat = screen
      .getAllByRole("link", { name: "Contact" })
      .find((el) => el.getAttribute("href") === "/contact");
    expect(flat).toBeDefined();
    // bg-background paints a filled pill on generated brand themes (tinted
    // --background); flat top-bar links must stay transparent like triggers.
    expect(flat!.className).toContain("bg-transparent");
    expect(flat!.className).not.toContain("bg-background");
  });
});
