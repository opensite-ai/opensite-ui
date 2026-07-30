import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { CarouselHorizontalCards } from "../carousel-horizontal-cards";

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

describe("CarouselHorizontalCards", () => {
  const mockItems = [
    { id: 1, imageSrc: "/test1.jpg", title: "Test Card 1", count: "100" },
    { id: 2, imageSrc: "/test2.jpg", title: "Test Card 2", count: "200" },
  ];

  it("renders with required props", () => {
    const { container } = render(<CarouselHorizontalCards items={mockItems} />);
    expect(container).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CarouselHorizontalCards items={mockItems} className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("routes card action icons through DynamicIcon and preserves children", () => {
    const { container } = render(
      <CarouselHorizontalCards
        items={[
          {
            id: 1,
            imageSrc: "/actions.jpg",
            title: "Actions card",
            actions: [
              {
                label: "String action",
                href: "/string",
                icon: "lucide/leading",
                iconAfter: "lucide/trailing",
                className: "custom-action",
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
              {
                label: "Hidden label",
                href: "/children",
                icon: "lucide/hidden",
                children: 0,
              },
            ],
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
    expect(stringAction).toHaveClass("custom-action");

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
    expect(sentinelAction).toHaveTextContent("0Sentinel action0");
    expect(
      within(sentinelAction).queryByTestId("mock-icon"),
    ).not.toBeInTheDocument();

    const emptyAction = container.querySelector(
      '[href="/empty"]',
    ) as HTMLElement;
    expect(
      within(emptyAction).queryByTestId("mock-icon"),
    ).not.toBeInTheDocument();

    const childrenAction = container.querySelector(
      '[href="/children"]',
    ) as HTMLElement;
    expect(childrenAction).toHaveTextContent("0");
    expect(childrenAction).not.toHaveTextContent("Hidden label");
    expect(
      within(childrenAction).queryByTestId("mock-icon"),
    ).not.toBeInTheDocument();
  });
});
