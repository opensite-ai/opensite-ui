import { describe, expect, it, vi } from "vitest";
import { render, within } from "@testing-library/react";
import {
  ProjectHorizontalCards,
  type ProjectHorizontalCardsItem,
} from "../project-horizontal-cards";

vi.mock("@page-speed/img", () => ({
  Img: ({
    src,
    alt,
    className,
  }: {
    src: string;
    alt: string;
    className?: string;
  }) => <img src={src} alt={alt} className={className} />,
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
        data-testid="mock-dynamic-icon"
        data-name={name}
        data-size={size}
        className={className}
      />
    ) : (
      <>{name}</>
    ),
}));

vi.mock("../../../../lib/Pressable", () => ({
  Pressable: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href?: string;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

const project: ProjectHorizontalCardsItem = {
  title: "Launch Site",
  image: "/launch.jpg",
  description: "A focused product launch.",
  client: "Acme",
  role: "Design",
  technologies: ["React"],
  year: "2026",
  link: "/projects/launch",
};

describe("ProjectHorizontalCards", () => {
  it("routes string project link icons and preserves custom elements", () => {
    const stringView = render(
      <ProjectHorizontalCards
        projects={[project]}
        projectLinkIcon="lucide/external-link"
      />,
    );
    const stringLink = stringView.container.querySelector(
      '[href="/projects/launch"]',
    ) as HTMLElement;
    const stringIcon =
      within(stringLink).getByTestId("mock-dynamic-icon");
    expect(stringIcon).toHaveAttribute("data-name", "lucide/external-link");
    expect(stringIcon).toHaveAttribute("data-size", "14");
    expect(stringIcon).toHaveClass("ml-1");
    expect(stringLink).not.toHaveTextContent("lucide/external-link");
    stringView.unmount();

    const customView = render(
      <ProjectHorizontalCards
        projects={[project]}
        projectLinkIcon={<span data-testid="custom-project-link-icon" />}
      />,
    );
    const customLink = customView.container.querySelector(
      '[href="/projects/launch"]',
    ) as HTMLElement;
    expect(
      within(customLink).getByTestId("custom-project-link-icon"),
    ).toBeInTheDocument();
    expect(
      within(customLink).queryByTestId("mock-dynamic-icon"),
    ).not.toBeInTheDocument();
  });

  it("preserves project link icon fallback and sentinel behavior", () => {
    const view = render(
      <ProjectHorizontalCards
        projects={[project]}
        projectLinkIcon={null}
        projectLinkIconName="lucide/circle-arrow-right"
      />,
    );
    let link = view.container.querySelector(
      '[href="/projects/launch"]',
    ) as HTMLElement;
    expect(
      within(link).getByTestId("mock-dynamic-icon"),
    ).toHaveAttribute("data-name", "lucide/circle-arrow-right");

    view.rerender(
      <ProjectHorizontalCards
        projects={[project]}
        projectLinkIcon=""
        projectLinkIconName="lucide/hidden"
      />,
    );
    link = view.container.querySelector(
      '[href="/projects/launch"]',
    ) as HTMLElement;
    expect(
      within(link).queryByTestId("mock-dynamic-icon"),
    ).not.toBeInTheDocument();
    expect(link).not.toHaveTextContent("lucide/hidden");

    view.rerender(
      <ProjectHorizontalCards
        projects={[project]}
        projectLinkIcon={false}
        projectLinkIconName="lucide/hidden"
      />,
    );
    link = view.container.querySelector(
      '[href="/projects/launch"]',
    ) as HTMLElement;
    expect(
      within(link).queryByTestId("mock-dynamic-icon"),
    ).not.toBeInTheDocument();

    view.rerender(
      <ProjectHorizontalCards
        projects={[project]}
        projectLinkIcon={0}
        projectLinkIconName="lucide/hidden"
      />,
    );
    link = view.container.querySelector(
      '[href="/projects/launch"]',
    ) as HTMLElement;
    expect(link).toHaveTextContent("View Project 0");
    expect(
      within(link).queryByTestId("mock-dynamic-icon"),
    ).not.toBeInTheDocument();
  });
});
