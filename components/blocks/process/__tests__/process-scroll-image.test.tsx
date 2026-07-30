import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ProcessScrollImage } from "../process-scroll-image";

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

describe("ProcessScrollImage", () => {
  const mockSteps = [
    {
      step: "01",
      title: "Research Phase",
      image: "https://example.com/image1.jpg",
      description: "Understanding your requirements",
    },
    {
      step: "02",
      title: "Design Phase",
      image: "https://example.com/image2.jpg",
      description: "Creating visual solutions",
    },
    {
      step: "03",
      title: "Build Phase",
      image: "https://example.com/image3.jpg",
      description: "Developing the product",
    },
  ];

  it("renders title and description", () => {
    render(
      <ProcessScrollImage
        heading="Development Process"
        description="Our approach to building products"
      />
    );
    expect(screen.getByText("Development Process")).toBeInTheDocument();
    expect(
      screen.getByText("Our approach to building products")
    ).toBeInTheDocument();
  });

  it("renders all provided steps", () => {
    render(<ProcessScrollImage steps={mockSteps} />);
    expect(screen.getByText("Research Phase")).toBeInTheDocument();
    expect(screen.getByText("Design Phase")).toBeInTheDocument();
    expect(screen.getByText("Build Phase")).toBeInTheDocument();
  });

  it("renders step descriptions", () => {
    render(<ProcessScrollImage steps={mockSteps} />);
    expect(
      screen.getByText("Understanding your requirements")
    ).toBeInTheDocument();
    expect(screen.getByText("Creating visual solutions")).toBeInTheDocument();
    expect(screen.getByText("Developing the product")).toBeInTheDocument();
  });

  it("renders action button when actions provided", () => {
    render(<ProcessScrollImage actions={[{ label: "Learn More", href: "/learn" }]} />);
    expect(screen.getByText("Learn More")).toBeInTheDocument();
  });

  it("routes action icon names and preserves custom and falsy values", () => {
    const { container } = render(
      <ProcessScrollImage
        actions={[
          {
            label: "String action",
            href: "/string",
            icon: "lucide/play",
            iconAfter: "lucide/arrow-right",
          },
          {
            label: "Custom action",
            icon: <span data-testid="custom-leading-icon" />,
            iconAfter: <span data-testid="custom-trailing-icon" />,
          },
          {
            label: "Sentinel action",
            href: "/sentinel",
            icon: 0,
            iconAfter: false,
          },
          {
            label: "Empty action",
            href: "/empty",
            icon: "",
            iconAfter: "",
          },
        ]}
      />,
    );

    const stringAction = screen
      .getByText("String action")
      .closest("a") as HTMLElement;
    expect(
      within(stringAction).getAllByTestId("mock-icon").map((icon) =>
        icon.getAttribute("data-name"),
      ),
    ).toEqual(["lucide/play", "lucide/arrow-right"]);
    expect(stringAction).not.toHaveTextContent("lucide/play");
    expect(stringAction).not.toHaveTextContent("lucide/arrow-right");
    expect(screen.getByTestId("custom-leading-icon")).toBeInTheDocument();
    expect(screen.getByTestId("custom-trailing-icon")).toBeInTheDocument();

    const sentinelAction = container.querySelector(
      '[href="/sentinel"]',
    ) as HTMLElement;
    expect(sentinelAction).toHaveTextContent("0Sentinel action");
    expect(
      within(sentinelAction).queryByTestId("mock-icon"),
    ).not.toBeInTheDocument();

    const emptyAction = container.querySelector(
      '[href="/empty"]',
    ) as HTMLElement;
    expect(within(emptyAction).queryByTestId("mock-icon")).not.toBeInTheDocument();
  });

  it("preserves action children and slot precedence", () => {
    const { container, rerender } = render(
      <ProcessScrollImage
        actions={[
          {
            label: "Hidden label",
            href: "/children",
            icon: "lucide/hidden",
            children: <span data-testid="action-children">Custom action</span>,
          },
        ]}
      />,
    );

    expect(screen.getByTestId("action-children")).toBeInTheDocument();
    expect(screen.queryByText("Hidden label")).not.toBeInTheDocument();
    expect(
      container.querySelector('[data-name="lucide/hidden"]'),
    ).not.toBeInTheDocument();

    rerender(
      <ProcessScrollImage
        actions={[
          {
            label: "Hidden by zero",
            href: "/zero",
            icon: "lucide/hidden-zero",
            children: 0,
          },
        ]}
      />,
    );
    const zeroChildren = container.querySelector('[href="/zero"]') as HTMLElement;
    expect(zeroChildren).toHaveTextContent("0");
    expect(zeroChildren).not.toHaveTextContent("Hidden by zero");

    rerender(
      <ProcessScrollImage
        actions={[{ label: "Hidden by slot", icon: "lucide/hidden-slot" }]}
        actionsSlot={<span data-testid="actions-slot">Custom actions</span>}
      />,
    );
    expect(screen.getByTestId("actions-slot")).toBeInTheDocument();
    expect(screen.queryByText("Hidden by slot")).not.toBeInTheDocument();

    rerender(
      <ProcessScrollImage
        actions={[{ label: "Falsy slot fallback" }]}
        actionsSlot={false}
      />,
    );
    expect(screen.getByText("Falsy slot fallback")).toBeInTheDocument();
  });

  it("does not render CTA when actions is empty", () => {
    render(<ProcessScrollImage actions={[]} />);
    expect(screen.queryByText("Get in touch")).not.toBeInTheDocument();
  });

  it("renders step numbers with leading zeros", () => {
    render(<ProcessScrollImage steps={mockSteps} />);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("02")).toBeInTheDocument();
    expect(screen.getByText("03")).toBeInTheDocument();
  });

  it("renders with empty steps array", () => {
    const { container } = render(<ProcessScrollImage steps={[]} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders steps as list items", () => {
    const { container } = render(<ProcessScrollImage steps={mockSteps} />);
    const listItems = container.querySelectorAll("li");
    expect(listItems.length).toBe(3);
  });

  it("renders CTA as Pressable link", () => {
    render(
      <ProcessScrollImage actions={[{ label: "Get Started", href: "/start" }]} />
    );
    const link = screen.getByText("Get Started").closest("a");
    expect(link).toHaveAttribute("href", "/start");
  });
});
