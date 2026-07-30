import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CtaNewsletterFeatures } from "../cta-newsletter-features";

vi.mock("@page-speed/forms/integration", () => ({
  FormEngine: ({
    formEngineSetup,
  }: {
    formEngineSetup?: {
      formLayoutSettings?: {
        buttonGroupSetup?: {
          size?: string;
          submitLabel?: React.ReactNode;
        };
      };
    };
  }) => (
    <div data-testid="mock-form-engine">
      <div data-testid="button-size">
        {formEngineSetup?.formLayoutSettings?.buttonGroupSetup?.size}
      </div>
      <div data-testid="submit-label">
        {formEngineSetup?.formLayoutSettings?.buttonGroupSetup?.submitLabel}
      </div>
    </div>
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
        data-testid={`mock-icon-${name}`}
        data-name={name}
        data-size={size}
        className={className}
      />
    ) : (
      <>{name}</>
    ),
}));

describe("CtaNewsletterFeatures", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<CtaNewsletterFeatures badge="Test Badge" heading="Test Heading" description="Test Description" />);
    expect(screen.getByText("Test Badge")).toBeInTheDocument();
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<CtaNewsletterFeatures heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<CtaNewsletterFeatures description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders custom badge", () => {
    render(<CtaNewsletterFeatures badge="Custom Badge" />);
    expect(screen.getByText("Custom Badge")).toBeInTheDocument();
  });

  it("renders features when provided", () => {
    const features = [
      { iconName: "lucide/check", text: "Weekly insights" },
      { iconName: "lucide/check", text: "Exclusive content" },
    ];
    render(<CtaNewsletterFeatures features={features} />);
    expect(screen.getByText("Weekly insights")).toBeInTheDocument();
    expect(screen.getByText("Exclusive content")).toBeInTheDocument();
  });

  it("routes submit and feature icon names with exact fallbacks and styles", () => {
    const { rerender } = render(
      <CtaNewsletterFeatures formEngineSetup={{ fields: [] }} />,
    );

    expect(
      screen.getByTestId("mock-icon-lucide/arrow-right"),
    ).toHaveAttribute("data-size", "16");
    expect(screen.getByTestId("button-size")).toHaveTextContent("default");

    rerender(
      <CtaNewsletterFeatures
        formEngineSetup={{ fields: [] }}
        buttonAction={{
          label: "Ignored Label",
          icon: "lucide/send",
          iconAfter: "lucide/ignored-trailing",
        }}
        features={[
          {
            text: "Override Feature",
            icon: "lucide/star",
            iconName: "lucide/legacy-star",
          },
          {
            text: "Fallback Feature",
            iconName: "lucide/check",
          },
        ]}
      />,
    );

    expect(screen.getByTestId("mock-icon-lucide/send")).toBeInTheDocument();
    expect(screen.queryByText("Ignored Label")).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/ignored-trailing"),
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("mock-icon-lucide/star")).toBeInTheDocument();
    expect(screen.getByTestId("mock-icon-lucide/check")).toHaveAttribute(
      "data-size",
      "16",
    );
    expect(screen.getByTestId("mock-icon-lucide/check")).toHaveClass(
      "text-primary",
    );
    expect(
      screen.queryByTestId("mock-icon-lucide/legacy-star"),
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("submit-label")).not.toHaveTextContent(
      "lucide/send",
    );
    expect(
      screen.getByText("Fallback Feature").closest("li")!,
    ).not.toHaveTextContent("lucide/check");
  });

  it("preserves custom and falsy submit and feature icon semantics", () => {
    const { container, rerender } = render(
      <CtaNewsletterFeatures
        formEngineSetup={{ fields: [] }}
        buttonAction={{
          label: "Custom Label",
          icon: <span data-testid="custom-submit-icon" />,
        }}
        features={[
          {
            text: "Custom Feature",
            icon: <span data-testid="custom-feature-icon" />,
            iconName: "lucide/legacy-custom",
          },
        ]}
      />,
    );

    expect(screen.getByTestId("custom-submit-icon")).toBeInTheDocument();
    expect(screen.getByTestId("custom-feature-icon")).toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/legacy-custom"),
    ).not.toBeInTheDocument();

    rerender(
      <CtaNewsletterFeatures
        formEngineSetup={{ fields: [] }}
        buttonAction={{
          label: "Empty Icon Label",
          icon: "",
        }}
        features={[
          {
            text: "Empty Feature",
            icon: "",
            iconName: "lucide/legacy-empty",
          },
          {
            text: "False Feature",
            icon: false,
            iconName: "lucide/legacy-false",
          },
          {
            text: "Zero Feature",
            icon: 0,
            iconName: "lucide/legacy-zero",
          },
        ]}
      />,
    );

    expect(screen.getByTestId("submit-label")).toHaveTextContent(
      "Empty Icon Label",
    );
    expect(
      container.querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();
    expect(container).toHaveTextContent("0Zero Feature");

    rerender(
      <CtaNewsletterFeatures
        formEngineSetup={{ fields: [] }}
        buttonAction={{ label: "False Icon Label", icon: false }}
      />,
    );
    expect(screen.getByTestId("submit-label")).toHaveTextContent(
      "False Icon Label",
    );

    rerender(
      <CtaNewsletterFeatures
        formEngineSetup={{ fields: [] }}
        buttonAction={{ label: "Zero Icon Label", icon: 0 }}
      />,
    );
    expect(screen.getByTestId("submit-label")).toHaveTextContent(
      "Zero Icon Label",
    );
  });

  it("lets children and explicit slots replace generated content", () => {
    const { rerender } = render(
      <CtaNewsletterFeatures
        formEngineSetup={{ fields: [] }}
        buttonAction={{
          label: "Generated Label",
          icon: "lucide/send",
          iconAfter: "lucide/ignored-trailing",
          children: <span data-testid="action-children">Replacement</span>,
        }}
      />,
    );

    expect(screen.getByTestId("action-children")).toBeInTheDocument();
    expect(screen.queryByText("Generated Label")).not.toBeInTheDocument();
    expect(screen.queryByTestId("mock-icon-lucide/send")).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/ignored-trailing"),
    ).not.toBeInTheDocument();

    rerender(
      <CtaNewsletterFeatures
        formEngineSetup={{ fields: [] }}
        buttonAction={{ label: "Hidden Form Action" }}
        formSlot={<div data-testid="form-slot">Form Slot</div>}
        features={[{ text: "Hidden Feature" }]}
        featuresSlot={<div data-testid="features-slot">Features Slot</div>}
      />,
    );

    expect(screen.getByTestId("form-slot")).toBeInTheDocument();
    expect(screen.getByTestId("features-slot")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-form-engine")).not.toBeInTheDocument();
    expect(screen.queryByText("Hidden Feature")).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CtaNewsletterFeatures className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
