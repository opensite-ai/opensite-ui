import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
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

  // --- TASK-3: top-bar shrink guards ----------------------------------------
  //
  // Same vulnerable shape as navbar-platform-resources: the logo and the auth
  // action cluster are plain flex children of a `justify-between` row, so under
  // pressure the logo collapsed toward zero width and the CTA was clipped. This
  // block's menu cap is already 5, so no breakpoint change is needed here.
  describe("top-bar shrink guards", () => {
    const logo = { url: "/", src: "/logo.png", alt: "Tabbed Logo" };
    const authActions = [
      { label: "Get Started", href: "/start", variant: "default" as const },
    ];

    const renderNavbar = () =>
      render(
        <NavbarTabbedSections
          logo={logo}
          menu={menu}
          authActions={authActions}
        />,
      );

    const getNavRow = (container: HTMLElement) =>
      container.querySelector("nav") as HTMLElement;

    it("protects the logo from shrinking to zero width", () => {
      const { container } = renderNavbar();
      const logoEl = screen.getByAltText("Tabbed Logo").closest("a, div")!;

      expect(container.querySelector(".shrink-0")).toBeInTheDocument();
      expect(logoEl.className).toContain("shrink-0");
    });

    it("protects the desktop auth actions cluster from being clipped", () => {
      const { container } = renderNavbar();
      const actions = Array.from(getNavRow(container).children).find((child) =>
        child.classList.contains("hidden"),
      ) as HTMLElement;

      expect(actions.classList.contains("shrink-0")).toBe(true);
    });

    /**
     * The logo/menu group stays bare.
     *
     * The gap is positionally load-bearing at every viewport — the group is
     * content-sized and pinned to the row start — so scaling it by breakpoint
     * would move the desktop menu on every site, including the ones that
     * already fit. And `min-w-0` must NOT be here: the group has no compressible
     * descendant to hand the reclaimed space to (the NavigationMenu root is
     * `max-w-max flex-1` with `min-width: auto`, its list has no `flex-wrap`,
     * every item is `w-max`), so it only shrinks the group's box under the nav
     * links, which then paint over the auth CTA. The `shrink-0` guards are the
     * ones that are genuinely inert while fitting.
     */
    it("keeps the logo/menu group free of gap variants and min-w-0", () => {
      const { container } = renderNavbar();
      const group = getNavRow(container).children[0] as HTMLElement;

      expect(group.classList.contains("gap-8")).toBe(true);
      expect(group.classList.contains("min-w-0")).toBe(false);

      const responsiveGaps = Array.from(group.classList).filter((token) =>
        /^[a-z0-9]+:gap-/.test(token),
      );
      expect(responsiveGaps).toEqual([]);
    });
  });
});

// --- Single-tab dropdowns ----------------------------------------------------
//
// DashTrack's generator (and the prod data repair behind it) synthesizes
// exactly ONE tab per dropdown group, titled after the group. Live that
// painted a one-item tab strip labelled "Products" underneath a trigger also
// labelled "Products". The switcher only earns its place with 2+ tabs.
describe("NavbarTabbedSections single-tab dropdowns", () => {
  const mirroredMenu = [
    {
      title: "Products",
      tabs: [
        {
          id: "products",
          title: "Products",
          links: [
            { title: "Dashboard", url: "/products/dashboard" },
            { title: "Analytics", url: "/products/analytics" },
          ],
        },
      ],
    },
  ];

  const distinctMenu = [
    {
      title: "Products",
      tabs: [
        {
          id: "core-features",
          title: "Core Features",
          links: [{ title: "Dashboard", url: "/products/dashboard" }],
        },
      ],
    },
  ];

  const twoTabMenu = [
    {
      title: "Products",
      tabs: [
        {
          id: "core-features",
          title: "Core Features",
          links: [{ title: "Dashboard", url: "/products/dashboard" }],
        },
        {
          id: "advanced",
          title: "Advanced Tools",
          links: [{ title: "Automation", url: "/products/automation" }],
        },
      ],
    },
  ];

  const openGroup = () =>
    fireEvent.click(screen.getByRole("button", { name: /Products/ }));

  it("drops the tab strip when the single tab mirrors the group title", () => {
    render(<NavbarTabbedSections menu={mirroredMenu} />);
    openGroup();

    expect(screen.queryByRole("tablist")).toBeNull();
    expect(screen.queryAllByRole("tab")).toHaveLength(0);
    // "Products" survives exactly once — on the trigger. A second occurrence
    // is the duplicated tab label this fix removes.
    expect(screen.getAllByText("Products")).toHaveLength(1);
  });

  it("keeps the panel links intact without the tab strip", () => {
    render(<NavbarTabbedSections menu={mirroredMenu} />);
    openGroup();

    const dashboard = screen.getByText("Dashboard").closest("a")!;
    const analytics = screen.getByText("Analytics").closest("a")!;

    expect(dashboard).toHaveAttribute("href", "/products/dashboard");
    expect(analytics).toHaveAttribute("href", "/products/analytics");
    // Radix link semantics (rootContentDismiss, focus grouping) must survive
    // the bypass of the Tabs wrapper.
    expect(dashboard).toHaveAttribute("data-slot", "navigation-menu-link");
  });

  it("renders a non-interactive heading when the single tab title differs", () => {
    render(<NavbarTabbedSections menu={distinctMenu} />);
    openGroup();

    expect(screen.queryByRole("tablist")).toBeNull();

    const heading = screen.getAllByText("Core Features");
    expect(heading).toHaveLength(1);
    expect(heading[0]!.closest("button")).toBeNull();
    expect(heading[0]!.closest("a")).toBeNull();
  });

  it("still renders the full tab strip for two or more tabs", () => {
    render(<NavbarTabbedSections menu={twoTabMenu} />);
    openGroup();

    expect(screen.getByRole("tablist")).toBeInTheDocument();
    const tabs = screen.getAllByRole("tab");
    expect(tabs).toHaveLength(2);
    expect(tabs.map((tab) => tab.textContent)).toEqual([
      "Core Features",
      "Advanced Tools",
    ]);
    expect(screen.getByText("Dashboard").closest("a")).toHaveAttribute(
      "href",
      "/products/dashboard",
    );
  });

  describe("mobile accordion", () => {
    const openMobileMenu = () => {
      fireEvent.click(screen.getByRole("button", { name: /Toggle menu/i }));
      return screen
        .getByRole("heading", { name: "Navigation Menu" })
        .closest("div[data-state]") as HTMLElement;
    };

    it("flattens the nested tab level so links sit under the group", () => {
      render(<NavbarTabbedSections menu={mirroredMenu} />);
      const mobile = within(openMobileMenu());

      const triggers = mobile.getAllByRole("button");
      const accordionTriggers = triggers.filter(
        (button) => button.dataset.slot === "accordion-trigger",
      );
      // One level only: the group. The nested per-tab trigger is the
      // redundant level this fix removes.
      expect(accordionTriggers).toHaveLength(1);
      expect(accordionTriggers[0]!).toHaveTextContent("Products");

      fireEvent.click(accordionTriggers[0]!);

      expect(mobile.getByText("Dashboard").closest("a")).toHaveAttribute(
        "href",
        "/products/dashboard",
      );
      expect(mobile.getByText("Analytics").closest("a")).toHaveAttribute(
        "href",
        "/products/analytics",
      );
      expect(
        mobile
          .getAllByRole("button")
          .filter((button) => button.dataset.slot === "accordion-trigger"),
      ).toHaveLength(1);
    });

    it("keeps the informative tab title as a heading when flattening", () => {
      render(<NavbarTabbedSections menu={distinctMenu} />);
      const mobile = within(openMobileMenu());

      fireEvent.click(mobile.getByRole("button", { name: /Products/ }));

      const heading = mobile.getAllByText("Core Features");
      expect(heading).toHaveLength(1);
      expect(heading[0]!.closest("button")).toBeNull();
    });

    it("keeps the nested tab level for two or more tabs", () => {
      render(<NavbarTabbedSections menu={twoTabMenu} />);
      const mobile = within(openMobileMenu());

      fireEvent.click(mobile.getByRole("button", { name: /Products/ }));

      expect(
        mobile
          .getAllByRole("button")
          .filter((button) => button.dataset.slot === "accordion-trigger"),
      ).toHaveLength(3);
    });
  });
});

describe("flat menu item styling (2026-08-24 pill regression)", () => {
  it("renders flat items transparent, never bg-background", () => {
    render(<NavbarTabbedSections menu={menu} />);
    const flat = screen
      .getAllByRole("link", { name: "Pricing" })
      .find((el) => el.getAttribute("href") === "/pricing");
    expect(flat).toBeDefined();
    expect(flat!.className).toContain("bg-transparent");
    expect(flat!.className).not.toContain("bg-background");
  });
});
