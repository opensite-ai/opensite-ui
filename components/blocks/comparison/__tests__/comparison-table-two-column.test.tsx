import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ComparisonTableTwoColumn } from "../comparison-table-two-column";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({
    name,
    size,
  }: {
    name: string;
    size: number;
  }) => (
    <span data-testid="mock-icon" data-name={name} data-size={size}>
      icon
    </span>
  ),
}));

vi.mock("@page-speed/img", () => ({
  Img: ({
    src,
    alt,
    className,
  }: {
    src: string;
    alt: string;
    className?: string;
  }) => <img src={src} alt={alt} className={className} data-testid="mock-img" />,
}));

describe("ComparisonTableTwoColumn", () => {
  it("renders with default props", () => {
    render(<ComparisonTableTwoColumn />);

    expect(screen.getByText("Compare us with others.")).toBeInTheDocument();
  });

  it("renders with custom title", () => {
    render(<ComparisonTableTwoColumn title="Custom Title" />);

    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders default rows", () => {
    render(<ComparisonTableTwoColumn />);

    expect(screen.getByText("Onboarding")).toBeInTheDocument();
    expect(screen.getByText("Price Range")).toBeInTheDocument();
    expect(screen.getByText("Quality Score")).toBeInTheDocument();
  });

  it("renders custom rows", () => {
    const customRows = [
      {
        label: "Custom Label",
        optionA: "Value A",
        optionB: "Value B",
      },
    ];

    render(<ComparisonTableTwoColumn rows={customRows} />);

    expect(screen.getByText("Custom Label")).toBeInTheDocument();
    expect(screen.getByText("Value A")).toBeInTheDocument();
    expect(screen.getByText("Value B")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ComparisonTableTwoColumn className="custom-class" />
    );

    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders empty rows array", () => {
    render(<ComparisonTableTwoColumn rows={[]} />);

    expect(screen.getByText("Compare us with others.")).toBeInTheDocument();
  });

  it("renders icons for rows with hasIcon", () => {
    const customRows = [
      {
        label: "Feature with Icon",
        optionA: "Yes",
        optionB: "No",
        hasIcon: true,
      },
    ];

    render(<ComparisonTableTwoColumn rows={customRows} />);

    const icons = screen.getAllByTestId("mock-icon");
    expect(icons.length).toBeGreaterThan(0);
  });

  it("renders option logos when provided", () => {
    render(
      <ComparisonTableTwoColumn
        optionALogo="/logo-a.png"
        optionBLogo="/logo-b.png"
        optionALogoAlt="Logo A"
        optionBLogoAlt="Logo B"
      />
    );

    const images = screen.getAllByTestId("mock-img");
    expect(images.length).toBe(2);
  });

  it("renders default option labels when no logos", () => {
    render(<ComparisonTableTwoColumn />);

    expect(screen.getByText("Option A")).toBeInTheDocument();
    expect(screen.getByText("Option B")).toBeInTheDocument();
  });
});

