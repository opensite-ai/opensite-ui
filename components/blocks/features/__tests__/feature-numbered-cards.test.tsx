import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeatureNumberedCards } from "../feature-numbered-cards";

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

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

describe("FeatureNumberedCards", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing with default props", () => {
    const { container } = render(<FeatureNumberedCards />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders features when provided", () => {
    const features = [
      { title: "Feature One", description: "Description one" },
      { title: "Feature Two", description: "Description two" },
    ];
    render(<FeatureNumberedCards features={features} />);
    expect(screen.getByText("Feature One")).toBeInTheDocument();
    expect(screen.getByText("Feature Two")).toBeInTheDocument();
  });

  it("renders checklist items when provided", () => {
    const features = [
      { title: "Feature One", checklistItems: ["Item One", "Item Two"] },
    ];
    render(<FeatureNumberedCards features={features} />);
    expect(screen.getByText("Item One")).toBeInTheDocument();
    expect(screen.getByText("Item Two")).toBeInTheDocument();
  });

  it("renders numbered badges", () => {
    const features = [
      { title: "Feature One" },
      { title: "Feature Two" },
    ];
    render(<FeatureNumberedCards features={features} />);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("02")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FeatureNumberedCards className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("preserves nullish checklist icon precedence and exact edge values", () => {
    render(
      <FeatureNumberedCards
        features={[
          {
            title: "Checklist icons",
            checklistItems: [
              "String default",
              { content: "Object default" },
              {
                content: "Raw icon",
                icon: "lucide/raw",
                iconName: "lucide/ignored-raw",
              },
              { content: "Named icon", iconName: "lucide/named" },
              {
                content: "Empty icon",
                icon: "",
                iconName: "lucide/ignored-empty",
              },
              {
                content: "False icon",
                icon: false,
                iconName: "lucide/ignored-false",
              },
              {
                content: "Zero icon",
                icon: 0,
                iconName: "lucide/ignored-zero",
              },
              {
                content: "Custom icon",
                icon: <span data-testid="custom-icon" />,
                iconName: "lucide/ignored-custom",
              },
            ],
          },
        ]}
      />,
    );

    expect(
      screen.getAllByTestId("mock-icon-lucide/check-circle"),
    ).toHaveLength(2);
    const rawIcon = screen.getByTestId("mock-icon-lucide/raw");
    expect(rawIcon).toHaveAttribute("data-size", "16");
    expect(rawIcon).toHaveClass("mt-0.5", "shrink-0", "sm:mt-1");
    expect(screen.getByTestId("mock-icon-lucide/named")).toHaveAttribute(
      "data-size",
      "16",
    );
    expect(screen.getByText("Raw icon").closest("li")).not.toHaveTextContent(
      "lucide/raw",
    );
    expect(
      screen.getByText("Empty icon").closest("li")?.querySelector(
        '[data-testid^="mock-icon-"]',
      ),
    ).not.toBeInTheDocument();
    expect(
      screen.getByText("False icon").closest("li")?.querySelector(
        '[data-testid^="mock-icon-"]',
      ),
    ).not.toBeInTheDocument();
    expect(screen.getByText("Zero icon").closest("li")).toHaveTextContent(
      "0Zero icon",
    );
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/ignored-raw"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/ignored-empty"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/ignored-false"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/ignored-zero"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/ignored-custom"),
    ).not.toBeInTheDocument();
  });

  it("routes action icons while preserving nullish children and truthy slots", () => {
    render(
      <FeatureNumberedCards
        features={[
          {
            title: "Actions",
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
              {
                label: "Zero generated label",
                icon: "lucide/zero-hidden-leading",
                iconAfter: "lucide/zero-hidden-trailing",
                children: 0,
                "aria-label": "Zero children action",
              },
            ],
          },
          {
            title: "Action slot",
            actions: [{ label: "Hidden slot action" }],
            actionsSlot: <div data-testid="actions-slot">Custom actions</div>,
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
    expect(
      screen.getByLabelText("Zero children action"),
    ).toHaveTextContent("0");
    expect(screen.queryByText("Zero generated label")).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/zero-hidden-leading"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/zero-hidden-trailing"),
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("actions-slot")).toHaveTextContent(
      "Custom actions",
    );
    expect(screen.queryByText("Hidden slot action")).not.toBeInTheDocument();
  });

  it("keeps images and image slots on the media path", () => {
    render(
      <FeatureNumberedCards
        features={[
          {
            title: "Image feature",
            image: "/feature.jpg",
            imageAlt: "Feature media",
          },
          {
            title: "Image slot feature",
            image: "/hidden.jpg",
            imageSlot: <div data-testid="image-slot">Custom media</div>,
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
    expect(screen.getByTestId("image-slot")).toHaveTextContent("Custom media");
    expect(screen.getAllByTestId("mock-img")).toHaveLength(1);
  });
});
