import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { AboutCompanyProfile } from "../about-company-profile";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">{children}</a>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({
    name,
    size,
    className,
  }: {
    name?: React.ReactNode | string;
    size?: number;
    className?: string;
  }) =>
    typeof name === "string" ? (
      <span
        data-testid="mock-icon"
        data-name={name}
        data-size={size}
        className={className}
      />
    ) : (
      <>{name}</>
    ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
  avatarPlaceholders: Array(20).fill("https://placeholder.com/avatar.jpg"),
}));

describe("AboutCompanyProfile", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(
      <AboutCompanyProfile
        title="Test Title"
        description="Test Description"
        achievementsTitle="Test Achievements Title"
      />
    );
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("Test Achievements Title")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<AboutCompanyProfile title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<AboutCompanyProfile description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders custom achievements title and description", () => {
    render(<AboutCompanyProfile achievementsTitle="Custom Achievements" achievementsDescription="Custom achievements description" />);
    expect(screen.getByText("Custom Achievements")).toBeInTheDocument();
    expect(screen.getByText("Custom achievements description")).toBeInTheDocument();
  });

  it("renders companies section when companies provided", () => {
    const companies = [{ src: "https://example.com/logo.png", alt: "Company Logo" }];
    render(<AboutCompanyProfile companies={companies} companiesTitle="Custom Companies" />);
    expect(screen.getByText("Custom Companies")).toBeInTheDocument();
  });

  it("routes breakout action icons without exposing raw icon names", () => {
    const { container, rerender } = render(
      <AboutCompanyProfile
        breakout={{
          title: "Action breakout",
          description: "Action breakout description",
          action: {
            label: "Learn more",
            href: "/learn",
            icon: "lucide/book-open",
            iconAfter: "lucide/arrow-right",
          },
        }}
      />,
    );

    const action = screen.getByText("Learn more").closest("a") as HTMLElement;
    expect(within(action).getAllByTestId("mock-icon")).toHaveLength(2);
    expect(
      action.querySelector('[data-name="lucide/book-open"]'),
    ).not.toHaveAttribute("data-size");
    expect(
      action.querySelector('[data-name="lucide/arrow-right"]'),
    ).toBeInTheDocument();
    expect(action).not.toHaveTextContent("lucide/book-open");
    expect(action).not.toHaveTextContent("lucide/arrow-right");

    rerender(
      <AboutCompanyProfile
        breakout={{
          title: "Custom icons",
          description: "Custom icons description",
          action: {
            label: "Custom",
            icon: <span data-testid="custom-leading-icon" />,
            iconAfter: <span data-testid="custom-trailing-icon" />,
          },
        }}
      />,
    );
    expect(screen.getByTestId("custom-leading-icon")).toBeInTheDocument();
    expect(screen.getByTestId("custom-trailing-icon")).toBeInTheDocument();

    rerender(
      <AboutCompanyProfile
        breakout={{
          title: "Sentinels",
          description: "Sentinels description",
          action: {
            label: "Sentinel",
            href: "/sentinel",
            icon: 0,
            iconAfter: false,
          },
        }}
      />,
    );
    const sentinelAction = container.querySelector(
      '[href="/sentinel"]',
    ) as HTMLElement;
    expect(sentinelAction).toHaveTextContent("0Sentinel");
    expect(within(sentinelAction).queryByTestId("mock-icon")).not.toBeInTheDocument();

    rerender(
      <AboutCompanyProfile
        breakout={{
          title: "Empty icons",
          description: "Empty icons description",
          action: {
            label: "Empty",
            href: "/empty",
            icon: "",
            iconAfter: "",
          },
        }}
      />,
    );
    const emptyAction = container.querySelector(
      '[href="/empty"]',
    ) as HTMLElement;
    expect(within(emptyAction).queryByTestId("mock-icon")).not.toBeInTheDocument();
  });

  it("preserves breakout action children and slot precedence", () => {
    const { container, rerender } = render(
      <AboutCompanyProfile
        breakout={{
          title: "Children",
          description: "Children description",
          action: {
            label: "Hidden label",
            icon: "lucide/hidden",
            children: <span data-testid="action-children">Custom action</span>,
          },
        }}
      />,
    );

    expect(screen.getByTestId("action-children")).toBeInTheDocument();
    expect(screen.queryByText("Hidden label")).not.toBeInTheDocument();
    expect(
      container.querySelector('[data-name="lucide/hidden"]'),
    ).not.toBeInTheDocument();

    rerender(
      <AboutCompanyProfile
        breakout={{
          title: "Zero children",
          description: "Zero children description",
          action: {
            label: "Hidden by zero",
            href: "/zero",
            icon: "lucide/hidden-zero",
            children: 0,
          },
        }}
      />,
    );
    const zeroAction = container.querySelector('[href="/zero"]') as HTMLElement;
    expect(zeroAction).toHaveTextContent("0");
    expect(zeroAction).not.toHaveTextContent("Hidden by zero");

    rerender(
      <AboutCompanyProfile
        breakout={{
          title: "Hidden breakout",
          description: "Hidden breakout description",
          action: { label: "Hidden action", icon: "lucide/hidden-slot" },
        }}
        breakoutSlot={<div data-testid="breakout-slot">Custom breakout</div>}
      />,
    );
    expect(screen.getByTestId("breakout-slot")).toBeInTheDocument();
    expect(screen.queryByText("Hidden action")).not.toBeInTheDocument();

    rerender(
      <AboutCompanyProfile
        breakout={{
          title: "Falsy slot breakout",
          description: "Falsy slot breakout description",
          action: { label: "Falsy slot fallback" },
        }}
        breakoutSlot={false}
      />,
    );
    expect(screen.getByText("Falsy slot fallback")).toBeInTheDocument();
  });

  it("renders the media mosaic with stable wrapper sizing", () => {
    render(
      <AboutCompanyProfile
        mainImage={{ src: "/main.jpg", alt: "Main workspace" }}
        secondaryImage={{ src: "/secondary.jpg", alt: "Secondary workspace" }}
        breakout={{
          title: "15+ Years of Excellence",
          description: "Delivering innovative solutions since 2009",
        }}
      />,
    );

    const mainImage = screen.getByAltText("Main workspace");
    const secondaryImage = screen.getByAltText("Secondary workspace");
    const mainFrame = mainImage.parentElement;
    const sidebar = mainFrame?.nextElementSibling;

    expect(mainFrame).toHaveClass("aspect-[3/2]", "lg:col-span-2");
    expect(mainImage).toHaveClass("h-full", "w-full", "object-cover");
    expect(sidebar).toHaveClass("md:grid-cols-2", "lg:grid-cols-1");
    expect(sidebar?.className).toContain("lg:grid-rows-[auto_minmax(0,1fr)]");
    expect(secondaryImage.parentElement).toHaveClass("aspect-[7/6]");
    expect(secondaryImage).toHaveClass("h-full", "w-full", "object-cover");
  });

  it("applies custom className", () => {
    const { container } = render(<AboutCompanyProfile className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
