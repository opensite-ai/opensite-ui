import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { FeatureChecklistImage } from "../feature-checklist-image";

vi.mock("../../../../lib/Pressable", () => ({
  Pressable: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href?: string;
    className?: string;
  }) => (
    <a href={href} className={className} data-testid="mock-pressable">
      {children}
    </a>
  ),
}));

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({
    name,
    size,
    className,
  }: {
    name?: React.ReactNode;
    size?: number;
    className?: string;
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
}));

describe("FeatureChecklistImage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<FeatureChecklistImage title="Test Title" description="Test Description" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<FeatureChecklistImage title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<FeatureChecklistImage description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders image with correct alt text", () => {
    render(<FeatureChecklistImage imageSrc="test-image.jpg" imageAlt="Custom alt text" />);
    const img = screen.getByTestId("mock-img");
    expect(img).toHaveAttribute("alt", "Custom alt text");
  });

  it("renders checklist items when provided", () => {
    const checklistItems = [
      { content: "Feature one" },
      { content: "Feature two" },
    ];
    render(<FeatureChecklistImage checklistItems={checklistItems} />);
    expect(screen.getByText("Feature one")).toBeInTheDocument();
    expect(screen.getByText("Feature two")).toBeInTheDocument();
  });

  it("renders checklist item title and description payloads", () => {
    const checklistItems = [
      {
        title: "Cost-Effective",
        description: "Lower material and labor costs.",
      },
      {
        title: "Montana-Ready Durability",
        description: "Engineered for snow loads and wind.",
      },
    ];

    render(<FeatureChecklistImage checklistItems={checklistItems} />);

    expect(screen.getByText("Cost-Effective")).toBeInTheDocument();
    expect(screen.getByText("Lower material and labor costs.")).toBeInTheDocument();
    expect(screen.getByText("Montana-Ready Durability")).toBeInTheDocument();
    expect(screen.getByText("Engineered for snow loads and wind.")).toBeInTheDocument();
  });

  it("renders benefits as a checklistItems alias", () => {
    render(
      <FeatureChecklistImage
        benefits={[{ title: "Easy Setup", description: "Get started in minutes." }]}
      />,
    );

    expect(screen.getByText("Easy Setup")).toBeInTheDocument();
    expect(screen.getByText("Get started in minutes.")).toBeInTheDocument();
  });

  it("does not render icon-only rows for empty checklist items", () => {
    render(<FeatureChecklistImage checklistItems={[{}, { content: "Visible item" }]} />);

    expect(screen.getAllByTestId("mock-icon")).toHaveLength(1);
    expect(screen.getByText("Visible item")).toBeInTheDocument();
  });

  it("renders default, iconName, and icon prop strings dynamically", () => {
    render(
      <FeatureChecklistImage
        checklistItems={[
          "Default Icon",
          { content: "Named Icon", iconName: "lucide/badge-check" },
          { content: "Raw Icon", icon: "lucide/shield" },
        ]}
      />,
    );

    const icons = screen.getAllByTestId("mock-icon");
    expect(icons.map((icon) => icon.getAttribute("data-name"))).toEqual([
      "lucide/circle-check-big",
      "lucide/badge-check",
      "lucide/shield",
    ]);
    for (const icon of icons) {
      expect(icon).toHaveAttribute("data-size", "20");
      expect(icon).toHaveClass("h-5", "w-5");
    }
    expect(screen.getByText("Raw Icon").closest("li")).not.toHaveTextContent(
      "lucide/shield",
    );
  });

  it("preserves nullish icon selection and the existing empty icon wrappers", () => {
    render(
      <FeatureChecklistImage
        checklistItems={[
          { content: "Empty Icon", icon: "", iconName: "lucide/ignored" },
          { content: "False Icon", icon: false, iconName: "lucide/ignored" },
          { content: "Zero Icon", icon: 0, iconName: "lucide/ignored" },
          { content: "Named Fallback", icon: null, iconName: "lucide/fallback" },
          { content: "Empty Name", iconName: "" },
        ]}
      />,
    );

    for (const label of ["Empty Icon", "False Icon", "Zero Icon", "Empty Name"]) {
      const row = screen.getByText(label).closest("li")!;
      expect(row.querySelector(".mt-1")).toBeInTheDocument();
      expect(within(row).queryByTestId("mock-icon")).not.toBeInTheDocument();
    }

    const zeroRow = screen.getByText("Zero Icon").closest("li")!;
    expect(within(zeroRow).getByText("0")).toBeInTheDocument();
    expect(
      within(screen.getByText("Named Fallback").closest("li")!).getByTestId(
        "mock-icon",
      ),
    ).toHaveAttribute("data-name", "lucide/fallback");
  });

  it("preserves custom checklist icon elements", () => {
    render(
      <FeatureChecklistImage
        checklistItems={[
          {
            content: "Custom Icon",
            icon: <span data-testid="custom-icon" />,
            iconName: "lucide/fallback",
          },
        ]}
      />,
    );

    const row = screen.getByText("Custom Icon").closest("li")!;
    expect(within(row).getByTestId("custom-icon")).toBeInTheDocument();
    expect(within(row).queryByTestId("mock-icon")).not.toBeInTheDocument();
  });

  it("renders both action icon positions dynamically", () => {
    render(
      <FeatureChecklistImage
        actions={[
          {
            label: "Start",
            icon: "lucide/play",
            iconAfter: "lucide/arrow-right",
          },
        ]}
      />,
    );

    const action = screen.getByTestId("mock-pressable");
    expect(
      within(action)
        .getAllByTestId("mock-icon")
        .map((icon) => icon.getAttribute("data-name")),
    ).toEqual(["lucide/play", "lucide/arrow-right"]);
    expect(action).not.toHaveTextContent("lucide/play");
    expect(action).not.toHaveTextContent("lucide/arrow-right");
  });

  it("preserves custom and falsy action icon values", () => {
    const { rerender } = render(
      <FeatureChecklistImage
        actions={[
          {
            label: "Custom",
            icon: <span data-testid="custom-action-icon" />,
            iconAfter: <span data-testid="custom-action-icon-after" />,
          },
        ]}
      />,
    );

    expect(screen.getByTestId("custom-action-icon")).toBeInTheDocument();
    expect(screen.getByTestId("custom-action-icon-after")).toBeInTheDocument();

    rerender(
      <FeatureChecklistImage
        actions={[{ label: "Falsy", icon: 0, iconAfter: "" }]}
      />,
    );

    const action = screen.getByTestId("mock-pressable");
    expect(action).toHaveTextContent("0Falsy");
    expect(within(action).queryByTestId("mock-icon")).not.toBeInTheDocument();
  });

  it("preserves truthy children, falsy children fallback, and actionsSlot", () => {
    const { rerender } = render(
      <FeatureChecklistImage
        actions={[
          {
            label: "Ignored",
            icon: "lucide/ignored",
            children: <span data-testid="action-children">Custom action</span>,
          },
        ]}
      />,
    );

    expect(screen.getByTestId("action-children")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();

    rerender(
      <FeatureChecklistImage
        actions={[
          {
            label: "Falsy children fallback",
            icon: "lucide/fallback",
            children: 0,
          },
        ]}
      />,
    );

    expect(screen.getByText("Falsy children fallback")).toBeInTheDocument();
    expect(screen.getByTestId("mock-icon")).toHaveAttribute(
      "data-name",
      "lucide/fallback",
    );

    rerender(
      <FeatureChecklistImage
        actions={[{ label: "Ignored", icon: "lucide/ignored" }]}
        actionsSlot={<span data-testid="actions-slot">Slot action</span>}
      />,
    );

    expect(screen.getByTestId("actions-slot")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-pressable")).not.toBeInTheDocument();
  });

  it("keeps imageSlot on the media path", () => {
    render(
      <FeatureChecklistImage
        imageSrc="/ignored.jpg"
        imageSlot={<div data-testid="image-slot">Custom image</div>}
      />,
    );

    expect(screen.getByTestId("image-slot")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-img")).not.toBeInTheDocument();
  });

  it("renders the image inside a stable aspect-ratio frame", () => {
    const { container } = render(
      <FeatureChecklistImage imageSrc="test-image.jpg" imageAlt="Custom alt text" />,
    );

    const img = screen.getByTestId("mock-img");
    expect(img).toHaveClass("h-full", "w-full", "object-cover");
    expect(container.querySelector(".aspect-\\[3\\/2\\]")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FeatureChecklistImage className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
