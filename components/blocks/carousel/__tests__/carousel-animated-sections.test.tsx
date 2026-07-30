import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { CarouselAnimatedSections } from "../carousel-animated-sections";

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
        data-testid="mock-icon"
        data-name={name}
        data-size={size}
        className={className}
      />
    ) : (
      <>{name}</>
    ),
}));

describe("CarouselAnimatedSections", () => {
  const mockSection = {
    id: "1",
    title: "Test Section",
    image: "/test.jpg",
  };

  it("renders without crashing", () => {
    const { container } = render(<CarouselAnimatedSections sections={[mockSection]} />);
    expect(container).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CarouselAnimatedSections sections={[mockSection]} className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("routes action icons through DynamicIcon with existing truthy guards", () => {
    const { container } = render(
      <CarouselAnimatedSections
        sections={[mockSection]}
        actions={[
          {
            label: "String action",
            href: "/string",
            icon: "lucide/leading",
            iconAfter: "lucide/trailing",
          },
          {
            label: "Custom action",
            href: "/custom",
            icon: <span data-testid="custom-leading-icon" />,
            iconAfter: <span data-testid="custom-trailing-icon" />,
          },
          {
            label: "Sentinel action",
            href: "/sentinel",
            icon: 0,
            iconAfter: 0,
          },
          {
            label: "Empty action",
            href: "/empty",
            icon: "",
            iconAfter: false,
          },
        ]}
      />,
    );

    const stringAction = container.querySelector(
      '[href="/string"]',
    ) as HTMLElement;
    expect(
      within(stringAction).getAllByTestId("mock-icon").map((icon) =>
        icon.getAttribute("data-name"),
      ),
    ).toEqual(["lucide/leading", "lucide/trailing"]);
    expect(stringAction).not.toHaveTextContent("lucide/leading");
    expect(stringAction).not.toHaveTextContent("lucide/trailing");
    expect(stringAction.querySelectorAll(".ml-2")).toHaveLength(2);

    const customAction = container.querySelector(
      '[href="/custom"]',
    ) as HTMLElement;
    expect(
      within(customAction).getByTestId("custom-leading-icon"),
    ).toBeInTheDocument();
    expect(
      within(customAction).getByTestId("custom-trailing-icon"),
    ).toBeInTheDocument();

    const sentinelAction = container.querySelector(
      '[href="/sentinel"]',
    ) as HTMLElement;
    expect(sentinelAction).toHaveTextContent("Sentinel action00");
    expect(
      within(sentinelAction).queryByTestId("mock-icon"),
    ).not.toBeInTheDocument();

    const emptyAction = container.querySelector(
      '[href="/empty"]',
    ) as HTMLElement;
    expect(
      within(emptyAction).queryByTestId("mock-icon"),
    ).not.toBeInTheDocument();
  });
});
