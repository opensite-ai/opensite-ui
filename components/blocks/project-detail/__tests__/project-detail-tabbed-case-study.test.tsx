import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ProjectDetailTabbedCaseStudy } from "../project-detail-tabbed-case-study";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../../lib/Pressable", () => ({
  Pressable: ({
    children,
    href,
    className,
    "aria-label": ariaLabel,
  }: {
    children: React.ReactNode;
    href?: string;
    className?: string;
    "aria-label"?: string;
  }) => (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      data-testid="mock-pressable"
    >
      {children}
    </a>
  ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(100).fill("/placeholder.jpg"),
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
        data-testid={`mock-icon-${name}`}
        data-name={name}
        data-size={size}
        className={className}
      />
    ) : (
      <>{name}</>
    ),
}));

describe("ProjectDetailTabbedCaseStudy", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom title", () => {
    render(<ProjectDetailTabbedCaseStudy title="E-commerce Platform" />);
    expect(screen.getByText("E-commerce Platform")).toBeInTheDocument();
  });

  it("renders custom subtitle", () => {
    render(<ProjectDetailTabbedCaseStudy subtitle="A complete redesign" />);
    expect(screen.getByText("A complete redesign")).toBeInTheDocument();
  });

  it("renders tabs navigation", () => {
    const tabs = [
      { id: "overview", label: "Overview", content: "Overview content here" },
      { id: "challenge", label: "Challenge", content: "Challenge content here" },
    ];
    render(<ProjectDetailTabbedCaseStudy tabs={tabs} />);
    expect(screen.getByText("Overview")).toBeInTheDocument();
    expect(screen.getByText("Challenge")).toBeInTheDocument();
  });

  it("renders testimonial", () => {
    const testimonial = {
      quote: "The results exceeded our expectations",
      author: "CEO",
      role: "Client Company",
    };
    render(<ProjectDetailTabbedCaseStudy testimonial={testimonial} />);
    expect(screen.getByText(/"The results exceeded our expectations"/)).toBeInTheDocument();
    expect(screen.getByText("CEO")).toBeInTheDocument();
  });

  it("renders tools section", () => {
    const tools = [
      { name: "React", icon: "react" },
      { name: "Node.js", icon: "nodejs" },
    ];
    render(<ProjectDetailTabbedCaseStudy tools={tools} />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
    expect(screen.getByText("Tools & Technologies")).toBeInTheDocument();
  });

  it("applies custom className to section", () => {
    const { container } = render(<ProjectDetailTabbedCaseStudy className="custom-class" title="Test Project" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("routes both back-action icons and preserves nullish children and slots", () => {
    const generatedAction = {
      label: "Back to Projects",
      href: "/projects",
      className: "action-class",
      "aria-label": "Back control",
      icon: "lucide/arrow-left",
      iconAfter: "lucide/arrow-right",
    };
    const { container, rerender } = render(
      <ProjectDetailTabbedCaseStudy backAction={generatedAction} />,
    );

    let action = screen.getByTestId("mock-pressable");
    expect(action).toHaveAttribute("href", "/projects");
    expect(action).toHaveAttribute("aria-label", "Back control");
    expect(action).toHaveClass("inline-flex", "action-class");
    expect(action.childNodes).toHaveLength(3);
    expect(action.childNodes[0]).toHaveAttribute("data-name", "lucide/arrow-left");
    expect(action.childNodes[1]?.textContent).toBe("Back to Projects");
    expect(action.childNodes[2]).toHaveAttribute("data-name", "lucide/arrow-right");
    expect(within(action).queryByText("lucide/arrow-left")).not.toBeInTheDocument();
    expect(within(action).queryByText("lucide/arrow-right")).not.toBeInTheDocument();

    rerender(
      <ProjectDetailTabbedCaseStudy
        backAction={{
          label: "Custom",
          icon: <span data-testid="custom-leading-icon" />,
          iconAfter: <span data-testid="custom-trailing-icon" />,
        }}
      />,
    );
    expect(screen.getByTestId("custom-leading-icon")).toBeInTheDocument();
    expect(screen.getByTestId("custom-trailing-icon")).toBeInTheDocument();

    rerender(
      <ProjectDetailTabbedCaseStudy
        backAction={{ label: "Empty", icon: "", iconAfter: "" }}
      />,
    );
    action = screen.getByTestId("mock-pressable");
    expect(action).toHaveTextContent("Empty");
    expect(action.querySelector('[data-testid^="mock-icon-"]')).not.toBeInTheDocument();

    rerender(
      <ProjectDetailTabbedCaseStudy
        backAction={{ label: "Boundary", icon: false, iconAfter: 0 }}
      />,
    );
    action = screen.getByTestId("mock-pressable");
    expect(action).toHaveTextContent("Boundary0");
    expect(action.querySelector('[data-testid^="mock-icon-"]')).not.toBeInTheDocument();

    rerender(
      <ProjectDetailTabbedCaseStudy
        backAction={{
          ...generatedAction,
          children: <span data-testid="custom-children">Replacement</span>,
        }}
      />,
    );
    action = screen.getByTestId("mock-pressable");
    expect(within(action).getByTestId("custom-children")).toBeInTheDocument();
    expect(within(action).queryByText("Back to Projects")).not.toBeInTheDocument();
    expect(
      container.querySelector('[data-name="lucide/arrow-left"]'),
    ).not.toBeInTheDocument();
    expect(
      container.querySelector('[data-name="lucide/arrow-right"]'),
    ).not.toBeInTheDocument();

    for (const children of [0, false, ""] as const) {
      rerender(
        <ProjectDetailTabbedCaseStudy
          backAction={{ ...generatedAction, children }}
        />,
      );
      action = screen.getByTestId("mock-pressable");
      expect(action.textContent).toBe(children === 0 ? "0" : "");
      expect(
        action.querySelector('[data-testid^="mock-icon-"]'),
      ).not.toBeInTheDocument();
    }

    rerender(
      <ProjectDetailTabbedCaseStudy
        backAction={generatedAction}
        backActionSlot={false}
      />,
    );
    expect(screen.getByText("Back to Projects")).toBeInTheDocument();

    rerender(
      <ProjectDetailTabbedCaseStudy
        backAction={generatedAction}
        backActionSlot={<div data-testid="back-action-slot">Custom slot</div>}
      />,
    );
    expect(screen.getByTestId("back-action-slot")).toHaveTextContent("Custom slot");
    expect(screen.queryByTestId("mock-pressable")).not.toBeInTheDocument();

    rerender(<ProjectDetailTabbedCaseStudy backActionSlot={false} />);
    expect(screen.queryByTestId("mock-pressable")).not.toBeInTheDocument();
  });

  it("keeps the existing tool icon path unchanged", () => {
    render(
      <ProjectDetailTabbedCaseStudy
        tools={[{ name: "Safe tool", icon: "lucide/wrench" }]}
      />,
    );

    const tool = screen.getByText("Safe tool").parentElement as HTMLElement;
    const icon = within(tool).getByTestId("mock-icon-lucide/wrench");
    expect(icon).toHaveAttribute("data-size", "16");
    expect(icon).toHaveClass("text-muted-foreground");
    expect(tool).not.toHaveTextContent("lucide/wrench");
  });

  it("keeps hero, content, and avatar strings on the Img media path", () => {
    const { container } = render(
      <ProjectDetailTabbedCaseStudy
        heroImage={{ src: "lucide/hero-media", alt: "Hero media" }}
        contentSections={[
          {
            title: "Media section",
            content: "Media content",
            image: { src: "lucide/content-media", alt: "Content media" },
          },
        ]}
        testimonial={{
          quote: "Media quote",
          author: "Media author",
          role: "Media role",
          avatar: "lucide/avatar-media",
        }}
      />,
    );

    expect(screen.getByAltText("Hero media")).toHaveAttribute(
      "src",
      "lucide/hero-media",
    );
    expect(screen.getByAltText("Content media")).toHaveAttribute(
      "src",
      "lucide/content-media",
    );
    expect(screen.getByAltText("Media author")).toHaveAttribute(
      "src",
      "lucide/avatar-media",
    );
    for (const name of [
      "lucide/hero-media",
      "lucide/content-media",
      "lucide/avatar-media",
    ]) {
      expect(
        container.querySelector(`[data-name="${name}"]`),
      ).not.toBeInTheDocument();
    }
  });
});
