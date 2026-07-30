import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CtaCaseStudyTestimonial } from "../cta-case-study-testimonial";

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
    className,
    size,
  }: {
    name?: React.ReactNode | string;
    className?: string;
    size?: number;
  }) =>
    typeof name === "string" ? (
      <span
        data-testid="mock-icon"
        data-name={name}
        data-size={size}
        className={className}
      >
        icon
      </span>
    ) : (
      <>{name}</>
    ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
  avatarPlaceholders: Array(20).fill("https://placeholder.com/avatar.jpg"),
}));

describe("CtaCaseStudyTestimonial", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<CtaCaseStudyTestimonial badge="Test Badge" heading="Test Heading" description="Test Description" />);
    expect(screen.getByText("Test Badge")).toBeInTheDocument();
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<CtaCaseStudyTestimonial heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<CtaCaseStudyTestimonial description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders testimonial quote", () => {
    render(<CtaCaseStudyTestimonial testimonialQuote="This is an amazing product!" />);
    expect(screen.getByText(/This is an amazing product!/)).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [
      { label: "Read Full Case Study", href: "/case-studies", variant: "default" as const },
      { label: "Schedule a Demo", href: "/demo", variant: "outline" as const },
    ];
    render(<CtaCaseStudyTestimonial actions={actions} />);
    expect(screen.getByText("Read Full Case Study")).toBeInTheDocument();
    expect(screen.getByText("Schedule a Demo")).toBeInTheDocument();
    expect(
      screen
        .getAllByTestId("mock-icon")
        .map((icon) => icon.getAttribute("data-name")),
    ).toEqual(["lucide/arrow-right", "lucide/arrow-up-right"]);
  });

  it("renders a section icon name through DynamicIcon and overrides the legacy name", () => {
    render(
      <CtaCaseStudyTestimonial
        sections={[
          {
            title: "Challenge",
            icon: "lucide/target",
            iconName: "lucide/circle",
          },
        ]}
      />,
    );

    expect(screen.getByTestId("mock-icon")).toHaveAttribute(
      "data-name",
      "lucide/target",
    );
    expect(screen.getByTestId("mock-icon")).toHaveAttribute("data-size", "20");
    expect(screen.getByTestId("mock-icon")).toHaveClass("text-primary");
    expect(screen.queryByText("lucide/target")).not.toBeInTheDocument();
  });

  it("preserves a custom section icon element", () => {
    render(
      <CtaCaseStudyTestimonial
        sections={[
          {
            title: "Challenge",
            icon: <span data-testid="custom-section-icon">custom icon</span>,
          },
        ]}
      />,
    );

    expect(screen.getByTestId("custom-section-icon")).toHaveTextContent(
      "custom icon",
    );
  });

  it("preserves an empty custom section icon as an override of the legacy name", () => {
    render(
      <CtaCaseStudyTestimonial
        sections={[
          {
            title: "Challenge",
            icon: "",
            iconName: "lucide/circle",
          },
        ]}
      />,
    );

    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
  });

  it("renders the legacy section icon fallback and ignores an empty legacy name", () => {
    const { rerender } = render(
      <CtaCaseStudyTestimonial
        sections={[{ title: "Challenge", iconName: "lucide/circle" }]}
      />,
    );

    expect(screen.getByTestId("mock-icon")).toHaveAttribute(
      "data-name",
      "lucide/circle",
    );

    rerender(
      <CtaCaseStudyTestimonial
        sections={[{ title: "Challenge", iconName: "" }]}
      />,
    );

    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
  });

  it("renders action icon names through DynamicIcon and overrides arrow defaults", () => {
    render(
      <CtaCaseStudyTestimonial
        actions={[
          {
            label: "Explore",
            icon: "lucide/briefcase",
            iconAfter: "lucide/chevron-right",
          },
        ]}
      />,
    );

    expect(
      screen
        .getAllByTestId("mock-icon")
        .map((icon) => icon.getAttribute("data-name")),
    ).toEqual(["lucide/briefcase", "lucide/chevron-right"]);
    expect(screen.queryByText("lucide/briefcase")).not.toBeInTheDocument();
    expect(screen.queryByText("lucide/chevron-right")).not.toBeInTheDocument();
    expect(
      screen
        .getAllByTestId("mock-icon")
        .find(
          (icon) =>
            icon.getAttribute("data-name") === "lucide/chevron-right",
        ),
    ).toHaveAttribute("data-size", "16");
    expect(
      screen
        .getAllByTestId("mock-icon")
        .find(
          (icon) =>
            icon.getAttribute("data-name") === "lucide/chevron-right",
        ),
    ).toHaveClass("ml-2");
  });

  it("preserves custom action icon elements", () => {
    render(
      <CtaCaseStudyTestimonial
        actions={[
          {
            label: "Explore",
            icon: <span data-testid="custom-leading-icon">leading</span>,
            iconAfter: <span data-testid="custom-trailing-icon">trailing</span>,
          },
        ]}
      />,
    );

    expect(screen.getByTestId("custom-leading-icon")).toHaveTextContent(
      "leading",
    );
    expect(screen.getByTestId("custom-trailing-icon")).toHaveTextContent(
      "trailing",
    );
  });

  it("preserves an empty trailing action icon as an override of the arrow default", () => {
    render(
      <CtaCaseStudyTestimonial
        actions={[{ label: "Explore", iconAfter: "" }]}
      />,
    );

    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
  });

  it("lets action children replace generated icons and label content", () => {
    render(
      <CtaCaseStudyTestimonial
        actions={[
          {
            label: "Generated label",
            icon: "lucide/briefcase",
            iconAfter: "lucide/chevron-right",
            children: <span>Custom action content</span>,
          },
        ]}
      />,
    );

    expect(screen.getByText("Custom action content")).toBeInTheDocument();
    expect(screen.queryByText("Generated label")).not.toBeInTheDocument();
    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
  });

  it("renders section and action slots instead of generated content", () => {
    render(
      <CtaCaseStudyTestimonial
        sections={[{ title: "Generated section", iconName: "lucide/circle" }]}
        sectionsSlot={<span>Custom sections slot</span>}
        actions={[{ label: "Generated action" }]}
        actionsSlot={<span>Custom actions slot</span>}
      />,
    );

    expect(screen.getByText("Custom sections slot")).toBeInTheDocument();
    expect(screen.getByText("Custom actions slot")).toBeInTheDocument();
    expect(screen.queryByText("Generated section")).not.toBeInTheDocument();
    expect(screen.queryByText("Generated action")).not.toBeInTheDocument();
    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CtaCaseStudyTestimonial className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
