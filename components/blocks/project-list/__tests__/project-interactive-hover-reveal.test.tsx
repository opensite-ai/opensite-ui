import { describe, expect, it, vi } from "vitest";
import { render, within } from "@testing-library/react";
import {
  ProjectInteractiveHoverReveal,
  type ProjectInteractiveHoverRevealItem,
} from "../project-interactive-hover-reveal";

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
    onMouseEnter,
    onMouseLeave,
  }: {
    children: React.ReactNode;
    href?: string;
    className?: string;
    onMouseEnter?: React.MouseEventHandler<HTMLAnchorElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLAnchorElement>;
  }) => (
    <a
      href={href}
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </a>
  ),
}));

const project: ProjectInteractiveHoverRevealItem = {
  title: "Launch Site",
  category: "Web",
  description: "A focused product launch.",
  image: "/launch.jpg",
  link: "/projects/launch",
};

describe("ProjectInteractiveHoverReveal", () => {
  it("routes string project link icons and preserves custom elements", () => {
    const stringView = render(
      <ProjectInteractiveHoverReveal
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
      <ProjectInteractiveHoverReveal
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
      <ProjectInteractiveHoverReveal
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
      <ProjectInteractiveHoverReveal
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
      <ProjectInteractiveHoverReveal
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
      <ProjectInteractiveHoverReveal
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
