import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ArticleSplitAnimated } from "../article-split-animated";

// Mock the Img component from @page-speed/img
vi.mock("@page-speed/img", () => ({
  Img: ({
    src,
    alt,
    className,
  }: {
    src: string;
    alt: string;
    className?: string;
  }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

// Mock framer-motion to avoid animation issues in tests
vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      className,
      ...props
    }: React.PropsWithChildren<{ className?: string }>) => (
      <div className={className} data-testid="motion-div" {...props}>
        {children}
      </div>
    ),
  },
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({
    name,
    size,
  }: {
    name?: React.ReactNode | string;
    size?: number;
  }) =>
    typeof name === "string" ? (
      <span data-testid={`icon-${name}`} data-size={size} />
    ) : (
      <>{name}</>
    ),
}));

describe("ArticleSplitAnimated", () => {
  it("renders custom title and description", () => {
    render(
      <ArticleSplitAnimated
        title="Custom Article Title"
        description="This is a custom description for the article."
      />,
    );
    expect(screen.getByText("Custom Article Title")).toBeInTheDocument();
    expect(
      screen.getByText("This is a custom description for the article."),
    ).toBeInTheDocument();
  });

  it("renders image with correct alt text", () => {
    render(<ArticleSplitAnimated title="Test Title" image="/test-image.jpg" />);
    const img = screen.getByTestId("mock-img");
    expect(img).toHaveAttribute("alt", "Test Title");
  });

  it("renders CTA icon names dynamically and preserves custom icons", () => {
    const leadingIcon = "lucide/sparkles";
    const trailingIcon = "lucide/arrow-up-right";

    render(
      <ArticleSplitAnimated
        title="Test Title"
        ctaActions={[
          {
            label: "Explore article",
            href: "/article",
            icon: leadingIcon,
            iconAfter: trailingIcon,
          },
          {
            label: "Custom action",
            href: "/custom",
            icon: <span data-testid="custom-leading-icon" />,
            iconAfter: <span data-testid="custom-trailing-icon" />,
          },
        ]}
      />,
    );

    const stringAction = screen.getByText("Explore article").closest("button, a");
    expect(stringAction).not.toBeNull();
    expect(stringAction).not.toHaveTextContent(leadingIcon);
    expect(stringAction).not.toHaveTextContent(trailingIcon);
    expect(screen.getByTestId(`icon-${leadingIcon}`)).toBeInTheDocument();
    expect(screen.getByTestId(`icon-${trailingIcon}`)).toBeInTheDocument();
    expect(screen.getByTestId("custom-leading-icon")).toBeInTheDocument();
    expect(screen.getByTestId("custom-trailing-icon")).toBeInTheDocument();
  });
});
