"use client";

import * as React from "react";

/**
 * Closes an open menu/overlay when an SPA navigation happens.
 *
 * `@page-speed/router`'s `navigateTo` performs `history.pushState` and then
 * dispatches BOTH a synthetic `popstate` and a custom `routechange` event on
 * the window (hash-only moves dispatch `routechange` alone; raw in-page anchor
 * jumps fire `hashchange`). Nothing unloads the document, so any open dropdown
 * or fullscreen menu stays open over the newly rendered page unless something
 * listens for those events. This hook is that listener.
 *
 * The listener triple mirrors page-speed-router/src/hooks/useUrl.ts. Raw
 * listeners are used instead of `usePathname` so the component only re-renders
 * when something is actually open, and same-path navigations still close.
 *
 * `targetRef` matters for the dt-cms builder preview: blocks render in the
 * parent window's React realm while their DOM lives in an iframe document
 * (`createPortal` into `iframe.contentDocument`). A bare `window` listener
 * would bind to the parent Next.js app — inert for the preview, and worse, the
 * parent's own `popstate` would spuriously close a menu the user deliberately
 * opened. Resolving the window from the rendered element's `ownerDocument`
 * binds to the realm the menu actually lives in.
 *
 * Both events arrive together for a single `navigateTo`, so `onClose` MUST be
 * idempotent (e.g. `setOpen(false)` / `setValue("")`). Cleanup removes exactly
 * what was added, which keeps StrictMode's mount→unmount→mount cycle safe.
 *
 * @param active   Only listen while something is open — no listener otherwise.
 * @param onClose  Idempotent close callback; always the latest render's version.
 * @param targetRef Ref to a rendered element used to resolve the owning window.
 */
export function useRouteChangeClose(
  active: boolean,
  onClose: () => void,
  targetRef?: React.RefObject<Element | null>,
): void {
  const onCloseRef = React.useRef(onClose);
  React.useEffect(() => {
    onCloseRef.current = onClose;
  });

  React.useEffect(() => {
    if (!active) return;
    if (typeof window === "undefined") return;

    const win = targetRef?.current?.ownerDocument?.defaultView ?? window;
    const handleNavigation = () => onCloseRef.current();

    win.addEventListener("popstate", handleNavigation);
    win.addEventListener("hashchange", handleNavigation);
    win.addEventListener("routechange", handleNavigation as EventListener);

    return () => {
      win.removeEventListener("popstate", handleNavigation);
      win.removeEventListener("hashchange", handleNavigation);
      win.removeEventListener(
        "routechange",
        handleNavigation as EventListener,
      );
    };
  }, [active, targetRef]);
}
