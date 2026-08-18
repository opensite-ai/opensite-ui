import { act } from "@testing-library/react";

/**
 * Simulates an SPA navigation exactly the way `@page-speed/router`'s
 * `navigateTo` performs one: a `history.pushState` followed by BOTH a
 * synthetic `popstate` and the custom `routechange` event on the window.
 *
 * Mirrors page-speed-router/src/hooks/useNavigation.ts (navigateTo).
 */
export function simulateRouteChange(path = "/navigated", win: Window = window) {
  act(() => {
    win.history.pushState({}, "", path);
    win.dispatchEvent(new PopStateEvent("popstate", { state: {} }));
    win.dispatchEvent(new CustomEvent("routechange", { detail: { path } }));
  });
}

/**
 * Dispatches a single navigation-related event in isolation. The two events
 * arrive together in production, but a listener that only handles one of them
 * is a latent bug for `history.back()` (popstate only) or hash-only moves
 * (routechange only) — so tests should assert each event alone.
 */
export function dispatchRouteEvent(
  type: "popstate" | "routechange" | "hashchange",
  win: Window = window,
) {
  act(() => {
    if (type === "popstate") {
      win.dispatchEvent(new PopStateEvent("popstate", { state: {} }));
    } else if (type === "hashchange") {
      win.dispatchEvent(new Event("hashchange"));
    } else {
      win.dispatchEvent(
        new CustomEvent("routechange", { detail: { path: "/navigated" } }),
      );
    }
  });
}
