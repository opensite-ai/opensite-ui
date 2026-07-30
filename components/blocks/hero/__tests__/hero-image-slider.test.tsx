import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroImageSlider } from "../hero-image-slider";

vi.mock("@page-speed/forms/integration", () => ({
  FormEngine: vi.fn(
    ({
      formEngineSetup,
    }: {
      formEngineSetup?: {
        formLayoutSettings?: {
          submitButtonSetup?: { submitLabel?: React.ReactNode };
        };
      };
    }) => (
      <div data-testid="mock-form-engine">
        {formEngineSetup?.formLayoutSettings?.submitButtonSetup?.submitLabel}
      </div>
    ),
  ),
}));

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src?: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("motion/react", () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  motion: {
    div: ({ children, className }: React.PropsWithChildren<{ className?: string }>) => (
      <div className={className} data-testid="motion-div">
        {children}
      </div>
    ),
  },
}));

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">
      {children}
    </a>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({
    name,
    className,
  }: {
    name: React.ReactNode;
    className?: string;
  }) =>
    typeof name === "string" ? (
      <span data-testid="mock-icon" data-name={name} className={className}>
        icon
      </span>
    ) : (
      <>{name}</>
    ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(10).fill("https://placeholder.com/image.jpg"),
}));

describe("HeroImageSlider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<HeroImageSlider heading="Test Heading" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<HeroImageSlider heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<HeroImageSlider description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [{ label: "Get Started", href: "/start", variant: "default" as const }];
    render(<HeroImageSlider actions={actions} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });

  it("renders a form button icon name through DynamicIcon without exposing raw text", () => {
    render(
      <HeroImageSlider
        buttonIcon="lucide/send"
        buttonText="Send"
        formEngineSetup={{ fields: [] }}
      />,
    );

    expect(screen.getByTestId("mock-icon")).toHaveAttribute(
      "data-name",
      "lucide/send",
    );
    expect(screen.queryByText("lucide/send")).not.toBeInTheDocument();
    expect(screen.getByTestId("mock-form-engine")).toHaveTextContent("Send");
  });

  it("preserves a custom form button icon element", () => {
    render(
      <HeroImageSlider
        buttonIcon={
          <span data-testid="custom-button-icon">custom button icon</span>
        }
        buttonText="Send"
        formEngineSetup={{ fields: [] }}
      />,
    );

    expect(screen.getByTestId("custom-button-icon")).toHaveTextContent(
      "custom button icon",
    );
    expect(screen.getByTestId("mock-form-engine")).toHaveTextContent("Send");
  });

  it("preserves empty, false, and zero form button icon semantics", () => {
    const formEngineSetup = { fields: [] };
    const { container, rerender } = render(
      <HeroImageSlider
        buttonIcon=""
        buttonText="Send"
        formEngineSetup={formEngineSetup}
      />,
    );

    expect(
      container.querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();

    rerender(
      <HeroImageSlider
        buttonIcon={false}
        buttonText="Send"
        formEngineSetup={formEngineSetup}
      />,
    );
    expect(
      container.querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();

    rerender(
      <HeroImageSlider
        buttonIcon={0}
        buttonText="Send"
        formEngineSetup={formEngineSetup}
      />,
    );
    expect(screen.getByTestId("mock-form-engine")).toHaveTextContent("0Send");
  });

  it("applies custom className", () => {
    const { container } = render(<HeroImageSlider heading="Test Heading" className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
