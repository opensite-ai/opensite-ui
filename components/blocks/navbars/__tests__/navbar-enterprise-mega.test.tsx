import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { NavbarEnterpriseMega } from "../navbar-enterprise-mega";
import type {
  IMenuLink,
  ISolutionCard,
  ISubpageItem,
  ITechnologyItem,
  IProductCategory,
  IProduct,
  IFeatureCategory,
  IFeature,
  IRegionItem,
  IPartnerCard,
  IResourceItem,
  ITopicGroup,
  ITopic,
  IFeaturedHeroCard,
} from "../navbar-enterprise-mega";

describe("NavbarEnterpriseMega", () => {
  const mockLogo = {
    src: "/logo.png",
    alt: "Test Logo",
    href: "/",
  };

  it("renders with logo", () => {
    render(<NavbarEnterpriseMega logo={mockLogo} />);
    expect(screen.getByAltText("Test Logo")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [
      {
        label: "Sign In",
        href: "/signin",
        variant: "ghost" as const,
      },
      {
        label: "Get Started",
        href: "/signup",
        variant: "default" as const,
      },
    ];

    render(<NavbarEnterpriseMega logo={mockLogo} actions={actions} />);
    expect(screen.getByText("Sign In")).toBeInTheDocument();
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });

  it("renders simple menu links without dropdown", () => {
    const menuLinks: IMenuLink[] = [
      { title: "About", url: "/about" },
      { title: "Contact", url: "/contact" },
    ];

    render(<NavbarEnterpriseMega logo={mockLogo} menuLinks={menuLinks} />);
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("renders solutions-with-platform layout", () => {
    const subpages: ISubpageItem[] = [
      { id: "1", title: "Analytics", href: "/analytics", icon: "lucide/bar-chart" },
      { id: "2", title: "Reports", href: "/reports", icon: "lucide/file-text" },
    ];

    const solutionCards: ISolutionCard[] = [
      {
        id: "sol1",
        title: "Enterprise Solution",
        description: "Complete enterprise platform",
        href: "/enterprise",
        subpages,
      },
    ];

    const platformItems: ITechnologyItem[] = [
      { id: "tech1", name: "React", icon: "lucide/code", description: "UI Framework" },
    ];

    const menuLinks: IMenuLink[] = [
      {
        title: "Solutions",
        layout: "solutions-with-platform",
        solutionCards,
        platformItems,
      },
    ];

    render(<NavbarEnterpriseMega logo={mockLogo} menuLinks={menuLinks} />);
    expect(screen.getByText("Solutions")).toBeInTheDocument();
  });

  it("renders products-categorized layout", () => {
    const products: IProduct[] = [
      { id: "p1", title: "Product A", href: "/product-a", description: "First product" },
    ];

    const productCategories: IProductCategory[] = [
      { id: "cat1", title: "Category 1", products },
    ];

    const featuredHeroCard: IFeaturedHeroCard = {
      title: "New Release",
      description: "Check out our latest product",
      href: "/new",
      image: "/hero.jpg",
    };

    const menuLinks: IMenuLink[] = [
      {
        title: "Products",
        layout: "products-categorized",
        productCategories,
        featuredHeroCard,
      },
    ];

    render(<NavbarEnterpriseMega logo={mockLogo} menuLinks={menuLinks} />);
    expect(screen.getByText("Products")).toBeInTheDocument();
  });

  it("renders features-with-locations layout", () => {
    const features: IFeature[] = [
      { id: "f1", title: "Feature 1", href: "/feature-1", icon: "lucide/zap" },
    ];

    const featureCategories: IFeatureCategory[] = [
      { id: "fc1", title: "Core Features", features },
    ];

    const regions: IRegionItem[] = [
      { id: "r1", name: "North America", href: "/na", icon: "lucide/map-pin" },
    ];

    const menuLinks: IMenuLink[] = [
      {
        title: "Company",
        layout: "features-with-locations",
        featureCategories,
        regions,
      },
    ];

    render(<NavbarEnterpriseMega logo={mockLogo} menuLinks={menuLinks} />);
    expect(screen.getByText("Company")).toBeInTheDocument();
  });

  it("renders partners-promotional layout", () => {
    const partnerCards: IPartnerCard[] = [
      {
        title: "Solution Partners",
        description: "Build solutions with us",
        href: "/partners/solutions",
        icon: "lucide/users",
      },
      {
        title: "Technology Partners",
        description: "Integrate your products",
        href: "/partners/tech",
        icon: "lucide/monitor",
      },
    ];

    const featuredHeroCard: IFeaturedHeroCard = {
      title: "Partner Program",
      description: "Join our partner network",
      href: "/partners",
      image: "/partners.jpg",
      variant: "primary",
    };

    const menuLinks: IMenuLink[] = [
      {
        title: "Partners",
        layout: "partners-promotional",
        partnerCards,
        featuredHeroCard,
      },
    ];

    render(<NavbarEnterpriseMega logo={mockLogo} menuLinks={menuLinks} />);
    expect(screen.getByText("Partners")).toBeInTheDocument();
  });

  it("renders resources-with-topics layout", () => {
    const resourceItems: IResourceItem[] = [
      {
        id: "res1",
        title: "Documentation",
        description: "Complete guides",
        href: "/docs",
        icon: "lucide/book",
      },
      {
        id: "res2",
        title: "Blog",
        description: "Latest updates",
        href: "/blog",
        icon: "lucide/newspaper",
      },
    ];

    const topics: ITopic[] = [
      { id: "t1", title: "Getting Started", href: "/getting-started", icon: "lucide/play" },
      { id: "t2", title: "Best Practices", href: "/best-practices", icon: "lucide/star" },
    ];

    const topicGroups: ITopicGroup[] = [
      { title: "Learn", topics },
    ];

    const menuLinks: IMenuLink[] = [
      {
        title: "Resources",
        layout: "resources-with-topics",
        resourceItems,
        topicGroups,
      },
    ];

    render(<NavbarEnterpriseMega logo={mockLogo} menuLinks={menuLinks} />);
    expect(screen.getByText("Resources")).toBeInTheDocument();
  });

  it("renders mixed menu links with and without dropdowns", () => {
    const menuLinks: IMenuLink[] = [
      { title: "About", url: "/about" },
      {
        title: "Products",
        layout: "products-categorized",
        productCategories: [
          {
            id: "cat1",
            title: "Category 1",
            products: [
              { id: "p1", title: "Product A", href: "/product-a", description: "First product" },
            ],
          },
        ],
      },
      { title: "Contact", url: "/contact" },
    ];

    render(<NavbarEnterpriseMega logo={mockLogo} menuLinks={menuLinks} />);
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    const { container } = render(
      <NavbarEnterpriseMega logo={mockLogo} className="custom-navbar" />
    );
    expect(container.querySelector(".custom-navbar")).toBeInTheDocument();
  });

  it("renders with actionsSlot instead of actions array", () => {
    const actionsSlot = (
      <div data-testid="custom-actions">
        <button>Custom Action</button>
      </div>
    );

    render(<NavbarEnterpriseMega logo={mockLogo} actionsSlot={actionsSlot} />);
    expect(screen.getByTestId("custom-actions")).toBeInTheDocument();
    expect(screen.getByText("Custom Action")).toBeInTheDocument();
  });

  it("renders all 5 layout types in one navbar", () => {
    const menuLinks: IMenuLink[] = [
      {
        title: "Solutions",
        layout: "solutions-with-platform",
        solutionCards: [
          {
            id: "sol1",
            title: "Enterprise",
            description: "Enterprise solution",
            href: "/enterprise",
            subpages: [
              { id: "s1", title: "Analytics", href: "/analytics", icon: "lucide/bar-chart" },
            ],
          },
        ],
        platformItems: [
          { id: "t1", name: "React", icon: "lucide/code", description: "UI Framework" },
        ],
      },
      {
        title: "Products",
        layout: "products-categorized",
        productCategories: [
          {
            id: "cat1",
            title: "Category 1",
            products: [
              { id: "p1", title: "Product A", href: "/product-a", description: "First product" },
            ],
          },
        ],
      },
      {
        title: "Company",
        layout: "features-with-locations",
        featureCategories: [
          {
            id: "fc1",
            title: "Features",
            features: [
              { id: "f1", title: "Feature 1", href: "/feature-1", icon: "lucide/zap" },
            ],
          },
        ],
        regions: [
          { id: "r1", name: "North America", href: "/na", icon: "lucide/map-pin" },
        ],
      },
      {
        title: "Partners",
        layout: "partners-promotional",
        partnerCards: [
          {
            title: "Solution Partners",
            description: "Build solutions",
            href: "/partners/solutions",
            icon: "lucide/users",
          },
        ],
      },
      {
        title: "Resources",
        layout: "resources-with-topics",
        resourceItems: [
          {
            id: "res1",
            title: "Documentation",
            description: "Complete guides",
            href: "/docs",
            icon: "lucide/book",
          },
        ],
        topicGroups: [
          {
            title: "Learn",
            topics: [
              { id: "t1", title: "Getting Started", href: "/start", icon: "lucide/play" },
            ],
          },
        ],
      },
    ];

    render(<NavbarEnterpriseMega logo={mockLogo} menuLinks={menuLinks} />);
    expect(screen.getByText("Solutions")).toBeInTheDocument();
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Company")).toBeInTheDocument();
    expect(screen.getByText("Partners")).toBeInTheDocument();
    expect(screen.getByText("Resources")).toBeInTheDocument();
  });
});

