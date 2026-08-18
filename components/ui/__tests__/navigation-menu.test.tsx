import { describe, it, expect, vi } from "vitest";
import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  simulateRouteChange,
  dispatchRouteEvent,
} from "../../../src/test-utils/simulate-route-change";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "../navigation-menu";

function Menu(props: Partial<React.ComponentProps<typeof NavigationMenu>>) {
  return (
    <NavigationMenu viewport={false} {...props}>
      <NavigationMenuList>
        <NavigationMenuItem value="products">
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <a href="/products/one">Product One</a>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const trigger = () => screen.getByRole("button", { name: /Products/ });

describe("NavigationMenu route awareness", () => {
  it("opens a dropdown on trigger click", () => {
    render(<Menu />);

    fireEvent.click(trigger());

    expect(trigger()).toHaveAttribute("data-state", "open");
  });

  it("closes the open dropdown on an SPA navigation", () => {
    render(<Menu />);
    fireEvent.click(trigger());
    expect(trigger()).toHaveAttribute("data-state", "open");

    simulateRouteChange("/products/one");

    expect(trigger()).toHaveAttribute("data-state", "closed");
  });

  it.each(["popstate", "routechange"] as const)(
    "closes the open dropdown on a lone %s event",
    (type) => {
      render(<Menu />);
      fireEvent.click(trigger());
      expect(trigger()).toHaveAttribute("data-state", "open");

      dispatchRouteEvent(type);

      expect(trigger()).toHaveAttribute("data-state", "closed");
    },
  );

  it("closes on an SPA navigation under StrictMode double-mount", () => {
    render(
      <React.StrictMode>
        <Menu />
      </React.StrictMode>,
    );
    fireEvent.click(trigger());
    expect(trigger()).toHaveAttribute("data-state", "open");

    simulateRouteChange("/products/one");

    expect(trigger()).toHaveAttribute("data-state", "closed");
  });

  it("lets a controlled caller keep the menu open across navigations", () => {
    const onValueChange = vi.fn();
    render(<Menu value="products" onValueChange={onValueChange} />);
    expect(trigger()).toHaveAttribute("data-state", "open");

    simulateRouteChange("/products/one");

    // The wrapper reports the close intent but a controlled caller wins.
    expect(onValueChange).toHaveBeenCalledWith("");
    expect(trigger()).toHaveAttribute("data-state", "open");
  });

  it("still supports uncontrolled open/close via the trigger", () => {
    render(<Menu />);

    fireEvent.click(trigger());
    expect(trigger()).toHaveAttribute("data-state", "open");
    fireEvent.click(trigger());
    expect(trigger()).toHaveAttribute("data-state", "closed");
  });
});
