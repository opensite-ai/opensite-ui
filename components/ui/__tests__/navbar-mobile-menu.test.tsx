import { describe, it, expect, vi, afterEach } from "vitest";
import * as React from "react";
import { render, screen } from "@testing-library/react";
import {
  simulateRouteChange,
  dispatchRouteEvent,
} from "../../../src/test-utils/simulate-route-change";
import { NavbarMobileMenu } from "../navbar-mobile-menu";

const iframes: HTMLIFrameElement[] = [];

afterEach(() => {
  // Order vs RTL's auto-cleanup doesn't matter: React unmounts against the
  // detached-but-live iframe document even after the iframe is removed. The
  // overflow reset guards a failing assertion from leaking a scroll lock into
  // the next test.
  iframes.splice(0).forEach((iframe) => iframe.remove());
  document.body.style.overflow = "";
});

describe("NavbarMobileMenu", () => {
  it("renders its children when open", () => {
    render(
      <NavbarMobileMenu open onClose={vi.fn()}>
        <a href="/about">About</a>
      </NavbarMobileMenu>,
    );

    expect(screen.getByText("About")).toBeInTheDocument();
  });

  it.each(["routechange", "popstate"] as const)(
    "calls onClose on a lone %s event while open",
    (type) => {
      const onClose = vi.fn();
      render(
        <NavbarMobileMenu open onClose={onClose}>
          <a href="/about">About</a>
        </NavbarMobileMenu>,
      );

      dispatchRouteEvent(type);

      expect(onClose).toHaveBeenCalledTimes(1);
    },
  );

  it("does not call onClose while closed", () => {
    const onClose = vi.fn();
    render(
      <NavbarMobileMenu open={false} onClose={onClose}>
        <a href="/about">About</a>
      </NavbarMobileMenu>,
    );

    simulateRouteChange("/elsewhere");

    expect(onClose).not.toHaveBeenCalled();
  });

  it("stops listening after unmount", () => {
    const onClose = vi.fn();
    const { unmount } = render(
      <NavbarMobileMenu open onClose={onClose}>
        <a href="/about">About</a>
      </NavbarMobileMenu>,
    );
    unmount();

    simulateRouteChange("/after-unmount");

    expect(onClose).not.toHaveBeenCalled();
  });

  describe("iframe rendering (dt-cms builder preview)", () => {
    // The builder preview puts the menu's DOM inside an iframe document while
    // the React realm stays in the parent window. Everything document/window
    // scoped must resolve against the menu's OWN document, not the globals.
    function renderInIframe(ui: React.ReactElement) {
      const iframe = document.createElement("iframe");
      document.body.appendChild(iframe);
      iframes.push(iframe);
      const iframeDoc = iframe.contentDocument!;
      const mount = iframeDoc.createElement("div");
      iframeDoc.body.appendChild(mount);

      const result = render(ui, { container: mount });

      return { iframe, iframeDoc, ...result };
    }

    it("locks scroll on the owning document, not the parent document", () => {
      const { iframeDoc } = renderInIframe(
        <NavbarMobileMenu open onClose={vi.fn()}>
          <a href="/about">About</a>
        </NavbarMobileMenu>,
      );

      expect(iframeDoc.body.style.overflow).toBe("hidden");
      expect(document.body.style.overflow).not.toBe("hidden");
    });

    it("restores the owning document's scroll on close", () => {
      const { iframeDoc, rerender } = renderInIframe(
        <NavbarMobileMenu open onClose={vi.fn()}>
          <a href="/about">About</a>
        </NavbarMobileMenu>,
      );
      expect(iframeDoc.body.style.overflow).toBe("hidden");

      rerender(
        <NavbarMobileMenu open={false} onClose={vi.fn()}>
          <a href="/about">About</a>
        </NavbarMobileMenu>,
      );
      expect(iframeDoc.body.style.overflow).not.toBe("hidden");
    });

    it("listens on the owning iframe window and ignores the parent window's popstate", () => {
      const onClose = vi.fn();
      const { iframe } = renderInIframe(
        <NavbarMobileMenu open onClose={onClose}>
          <a href="/about">About</a>
        </NavbarMobileMenu>,
      );

      // Parent Next.js app's own popstate must not close a menu the user
      // deliberately opened inside the preview.
      dispatchRouteEvent("popstate", window);
      expect(onClose).not.toHaveBeenCalled();

      dispatchRouteEvent(
        "routechange",
        iframe.contentWindow! as unknown as Window,
      );
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
