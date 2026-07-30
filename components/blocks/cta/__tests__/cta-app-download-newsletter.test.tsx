import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CtaAppDownloadNewsletter } from "../cta-app-download-newsletter";

vi.mock("@page-speed/forms/integration", () => ({
  FormEngine: ({
    formEngineSetup,
  }: {
    formEngineSetup?: {
      formLayoutSettings?: {
        buttonGroupSetup?: { submitLabel?: React.ReactNode };
      };
    };
  }) => (
    <div data-testid="mock-form-engine">
      {formEngineSetup?.formLayoutSettings?.buttonGroupSetup?.submitLabel}
    </div>
  ),
}));

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
}));

describe("CtaAppDownloadNewsletter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<CtaAppDownloadNewsletter appHeading="Test App Heading" appDescription="Test App Description" newsletterHeading="Test Newsletter Heading" newsletterDescription="Test Newsletter Description" />);
    expect(screen.getByText("Test App Heading")).toBeInTheDocument();
    expect(screen.getByText("Test App Description")).toBeInTheDocument();
    expect(screen.getByText("Test Newsletter Heading")).toBeInTheDocument();
    expect(screen.getByText("Test Newsletter Description")).toBeInTheDocument();
  });

  it("renders custom app heading", () => {
    render(<CtaAppDownloadNewsletter appHeading="Custom App Heading" />);
    expect(screen.getByText("Custom App Heading")).toBeInTheDocument();
  });

  it("renders custom newsletter heading", () => {
    render(<CtaAppDownloadNewsletter newsletterHeading="Custom Newsletter Heading" />);
    expect(screen.getByText("Custom Newsletter Heading")).toBeInTheDocument();
  });

  it("renders app actions when provided", () => {
    const appActions = [
      { label: "App Store", href: "https://apps.apple.com", variant: "default" as const },
      { label: "Google Play", href: "https://play.google.com", variant: "outline" as const },
    ];
    render(<CtaAppDownloadNewsletter appActions={appActions} />);
    expect(screen.getByText("App Store")).toBeInTheDocument();
    expect(screen.getByText("Google Play")).toBeInTheDocument();
    expect(
      screen
        .getAllByTestId("mock-icon")
        .map((icon) => icon.getAttribute("data-name")),
    ).toEqual(["simple-icons/apple", "simple-icons/googleplay"]);
  });

  it("renders app action icon names through DynamicIcon and overrides platform defaults", () => {
    render(
      <CtaAppDownloadNewsletter
        appActions={[
          {
            label: "App Store",
            href: "https://apps.apple.com",
            icon: "lucide/download",
            iconAfter: "lucide/arrow-right",
          },
        ]}
      />,
    );

    expect(
      screen
        .getAllByTestId("mock-icon")
        .map((icon) => icon.getAttribute("data-name")),
    ).toEqual(["lucide/download", "lucide/arrow-right"]);
    expect(screen.queryByText("lucide/download")).not.toBeInTheDocument();
    expect(screen.queryByText("lucide/arrow-right")).not.toBeInTheDocument();
    expect(
      screen
        .getAllByTestId("mock-icon")
        .find((icon) => icon.getAttribute("data-name") === "lucide/download"),
    ).toHaveAttribute("data-size", "20");
  });

  it("preserves custom app action icon elements", () => {
    render(
      <CtaAppDownloadNewsletter
        appActions={[
          {
            label: "Download",
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

  it("preserves an empty custom app icon as an override of the platform default", () => {
    render(
      <CtaAppDownloadNewsletter
        appActions={[
          {
            label: "App Store",
            href: "https://apps.apple.com",
            icon: "",
          },
        ]}
      />,
    );

    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
  });

  it("lets app action children replace generated icons and label content", () => {
    render(
      <CtaAppDownloadNewsletter
        appActions={[
          {
            label: "App Store",
            href: "https://apps.apple.com",
            icon: "lucide/download",
            iconAfter: "lucide/arrow-right",
            children: <span>Custom app action</span>,
          },
        ]}
      />,
    );

    expect(screen.getByText("Custom app action")).toBeInTheDocument();
    expect(screen.queryByText("App Store")).not.toBeInTheDocument();
    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
  });

  it("renders appActionsSlot instead of generated app actions", () => {
    render(
      <CtaAppDownloadNewsletter
        appActions={[{ label: "Generated app action" }]}
        appActionsSlot={<span>Custom app actions slot</span>}
      />,
    );

    expect(screen.getByText("Custom app actions slot")).toBeInTheDocument();
    expect(screen.queryByText("Generated app action")).not.toBeInTheDocument();
  });

  it("renders the default form icon through DynamicIcon", () => {
    render(<CtaAppDownloadNewsletter formEngineSetup={{ fields: [] }} />);

    expect(screen.getByTestId("mock-icon")).toHaveAttribute(
      "data-name",
      "lucide/send",
    );
  });

  it("renders a form button icon name through DynamicIcon instead of its label", () => {
    render(
      <CtaAppDownloadNewsletter
        formEngineSetup={{ fields: [] }}
        buttonAction={{ label: "Subscribe", icon: "lucide/mail" }}
      />,
    );

    expect(screen.getByTestId("mock-icon")).toHaveAttribute(
      "data-name",
      "lucide/mail",
    );
    expect(screen.queryByText("lucide/mail")).not.toBeInTheDocument();
    expect(screen.queryByText("Subscribe")).not.toBeInTheDocument();
  });

  it("preserves a custom form button icon element", () => {
    render(
      <CtaAppDownloadNewsletter
        formEngineSetup={{ fields: [] }}
        buttonAction={{
          label: "Subscribe",
          icon: <span data-testid="custom-form-icon">custom form icon</span>,
        }}
      />,
    );

    expect(screen.getByTestId("custom-form-icon")).toHaveTextContent(
      "custom form icon",
    );
  });

  it("keeps empty form icons on the label fallback and ignores button children", () => {
    render(
      <CtaAppDownloadNewsletter
        formEngineSetup={{ fields: [] }}
        buttonAction={{
          label: "Subscribe",
          icon: "",
          children: <span>Ignored button children</span>,
        }}
      />,
    );

    expect(screen.getByText("Subscribe")).toBeInTheDocument();
    expect(screen.queryByText("Ignored button children")).not.toBeInTheDocument();
    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
  });

  it("renders formSlot instead of FormEngine", () => {
    render(
      <CtaAppDownloadNewsletter
        formEngineSetup={{ fields: [] }}
        formSlot={<span>Custom form slot</span>}
      />,
    );

    expect(screen.getByText("Custom form slot")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-form-engine")).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CtaAppDownloadNewsletter className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
