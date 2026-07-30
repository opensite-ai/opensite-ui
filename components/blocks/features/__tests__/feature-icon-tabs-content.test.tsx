import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeatureIconTabsContent } from "../feature-icon-tabs-content";

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

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("FeatureIconTabsContent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<FeatureIconTabsContent badge="Test Badge" heading="Test Heading" description="Test Description" />);
    expect(screen.getByText("Test Badge")).toBeInTheDocument();
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders custom badge", () => {
    render(<FeatureIconTabsContent badge="Custom Badge" />);
    expect(screen.getByText("Custom Badge")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<FeatureIconTabsContent heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<FeatureIconTabsContent description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders tabs when provided", () => {
    const tabs = [
      { value: "tab-1", label: "Tab One" },
      { value: "tab-2", label: "Tab Two" },
    ];
    render(<FeatureIconTabsContent tabs={tabs} />);
    expect(screen.getByText("Tab One")).toBeInTheDocument();
    expect(screen.getByText("Tab Two")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FeatureIconTabsContent className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("routes truthy raw tab icons and preserves fallback and no-icon behavior", () => {
    render(
      <FeatureIconTabsContent
        tabs={[
          {
            value: "raw",
            label: "Raw icon",
            icon: "lucide/raw",
            iconName: "lucide/ignored-raw",
          },
          {
            value: "custom",
            label: "Custom icon",
            icon: <span data-testid="custom-icon" />,
            iconName: "lucide/ignored-custom",
          },
          {
            value: "empty",
            label: "Empty fallback",
            icon: "",
            iconName: "lucide/empty-fallback",
          },
          {
            value: "false",
            label: "False fallback",
            icon: false,
            iconName: "lucide/false-fallback",
          },
          {
            value: "zero",
            label: "Zero fallback",
            icon: 0,
            iconName: "lucide/zero-fallback",
          },
          {
            value: "named",
            label: "Named icon",
            iconName: "lucide/named",
          },
          { value: "none", label: "No icon" },
        ]}
      />,
    );

    expect(screen.getByTestId("mock-icon-lucide/raw")).toHaveAttribute(
      "data-size",
      "16",
    );
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/ignored-raw"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/ignored-custom"),
    ).not.toBeInTheDocument();
    expect(
      screen.getByTestId("mock-icon-lucide/empty-fallback"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("mock-icon-lucide/false-fallback"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("mock-icon-lucide/zero-fallback"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("mock-icon-lucide/named")).toBeInTheDocument();

    const rawTab = screen.getByRole("tab", { name: "Raw icon" });
    const noIconTab = screen.getByRole("tab", { name: "No icon" });
    expect(rawTab).not.toHaveTextContent("lucide/raw");
    expect(
      noIconTab.querySelector('[data-testid^="mock-icon-"]'),
    ).not.toBeInTheDocument();
  });

  it("routes fallback action icons while preserving children and action slots", () => {
    const result = render(
      <FeatureIconTabsContent
        defaultTab="actions"
        tabs={[
          {
            value: "actions",
            label: "Actions",
            content: {
              actions: [
                {
                  label: "String action",
                  icon: "lucide/rocket",
                  iconAfter: "lucide/arrow-right",
                },
                {
                  label: "Custom action",
                  icon: <span data-testid="custom-leading-icon" />,
                  iconAfter: <span data-testid="custom-trailing-icon" />,
                },
                {
                  label: "Falsy action",
                  icon: "",
                  iconAfter: 0,
                  "aria-label": "Falsy action control",
                },
                {
                  label: "Generated label",
                  icon: "lucide/hidden-leading",
                  iconAfter: "lucide/hidden-trailing",
                  children: (
                    <span data-testid="action-children">Replacement</span>
                  ),
                },
              ],
            },
          },
        ]}
      />,
    );

    const leadingIcon = screen.getByTestId("mock-icon-lucide/rocket");
    const stringAction = leadingIcon.parentElement;
    expect(leadingIcon).toBeInTheDocument();
    expect(
      screen.getByTestId("mock-icon-lucide/arrow-right"),
    ).toBeInTheDocument();
    expect(stringAction).not.toHaveTextContent("lucide/rocket");
    expect(stringAction).not.toHaveTextContent("lucide/arrow-right");
    expect(screen.getByTestId("custom-leading-icon")).toBeInTheDocument();
    expect(screen.getByTestId("custom-trailing-icon")).toBeInTheDocument();
    expect(screen.getByLabelText("Falsy action control")).toHaveTextContent(
      "Falsy action0",
    );
    expect(screen.getByTestId("action-children")).toHaveTextContent(
      "Replacement",
    );
    expect(screen.queryByText("Generated label")).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/hidden-leading"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/hidden-trailing"),
    ).not.toBeInTheDocument();

    result.unmount();
    render(
      <FeatureIconTabsContent
        defaultTab="slot"
        tabs={[
          {
            value: "slot",
            label: "Slot",
            content: {
              actions: [{ label: "Hidden action" }],
              actionsSlot: <div data-testid="actions-slot">Custom actions</div>,
            },
          },
        ]}
      />,
    );
    expect(screen.getByTestId("actions-slot")).toHaveTextContent(
      "Custom actions",
    );
    expect(screen.queryByText("Hidden action")).not.toBeInTheDocument();
  });

  it("keeps images and image slots on the media path", () => {
    const result = render(
      <FeatureIconTabsContent
        defaultTab="image"
        tabs={[
          {
            value: "image",
            label: "Image",
            content: { imageSrc: "/feature.jpg", imageAlt: "Feature media" },
          },
        ]}
      />,
    );

    expect(screen.getByTestId("mock-img")).toHaveAttribute(
      "src",
      "/feature.jpg",
    );
    expect(screen.getByTestId("mock-img")).toHaveAttribute(
      "alt",
      "Feature media",
    );

    result.unmount();
    render(
      <FeatureIconTabsContent
        defaultTab="slot"
        tabs={[
          {
            value: "slot",
            label: "Image slot",
            content: {
              imageSrc: "/hidden.jpg",
              imageSlot: <div data-testid="image-slot">Custom media</div>,
            },
          },
        ]}
      />,
    );
    expect(screen.getByTestId("image-slot")).toHaveTextContent("Custom media");
    expect(screen.queryByTestId("mock-img")).not.toBeInTheDocument();
  });
});
