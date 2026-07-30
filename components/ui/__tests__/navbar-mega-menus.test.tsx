import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { PartnersMenu } from "../navbar-mega-menus";

vi.mock("../navigation-menu", () => ({
  NavigationMenuLink: ({
    children,
    ...props
  }: {
    children: ReactNode;
    href?: string;
    className?: string;
  }) => <a {...props}>{children}</a>,
}));

vi.mock("../dynamic-icon", () => ({
  DynamicIcon: ({ name }: { name?: ReactNode | string }) =>
    typeof name === "string" ? (
      <span data-testid="mock-dynamic-icon" data-name={name} />
    ) : (
      <>{name}</>
    ),
}));

describe("PartnersMenu", () => {
  it("renders icon names and custom nodes through DynamicIcon", () => {
    render(
      <PartnersMenu
        partnerCards={[
          {
            title: "String partner",
            description: "String icon",
            href: "/string",
            icon: "lucide/handshake",
          },
          {
            title: "Custom partner",
            description: "Custom icon",
            href: "/custom",
            icon: <span data-testid="custom-icon" />,
          },
        ]}
      />,
    );

    const stringLink = screen.getByRole("link", { name: /String partner/ });

    expect(screen.getByTestId("mock-dynamic-icon")).toHaveAttribute(
      "data-name",
      "lucide/handshake",
    );
    expect(stringLink).not.toHaveTextContent("lucide/handshake");
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });
});
