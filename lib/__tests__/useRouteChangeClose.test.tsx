import { describe, it, expect, vi } from "vitest";
import * as React from "react";
import { render } from "@testing-library/react";
import {
  simulateRouteChange,
  dispatchRouteEvent,
} from "../../src/test-utils/simulate-route-change";
import { useRouteChangeClose } from "../useRouteChangeClose";

function Harness({
  active,
  onClose,
  targetRef,
}: {
  active: boolean;
  onClose: () => void;
  targetRef?: React.RefObject<Element | null>;
}) {
  const ownRef = React.useRef<HTMLDivElement>(null);
  useRouteChangeClose(active, onClose, targetRef ?? ownRef);
  return <div ref={ownRef} data-testid="route-close-harness" />;
}

describe("useRouteChangeClose", () => {
  it.each(["routechange", "popstate", "hashchange"] as const)(
    "calls onClose on a lone %s event while active",
    (type) => {
      const onClose = vi.fn();
      render(<Harness active onClose={onClose} />);

      dispatchRouteEvent(type);

      expect(onClose).toHaveBeenCalledTimes(1);
    },
  );

  it("does not call onClose while inactive", () => {
    const onClose = vi.fn();
    render(<Harness active={false} onClose={onClose} />);

    simulateRouteChange("/elsewhere");

    expect(onClose).not.toHaveBeenCalled();
  });

  it("stops listening after unmount", () => {
    const onClose = vi.fn();
    const { unmount } = render(<Harness active onClose={onClose} />);
    unmount();

    simulateRouteChange("/after-unmount");

    expect(onClose).not.toHaveBeenCalled();
  });

  it("survives a StrictMode double-mount (fires once per event)", () => {
    const onClose = vi.fn();
    render(
      <React.StrictMode>
        <Harness active onClose={onClose} />
      </React.StrictMode>,
    );

    dispatchRouteEvent("routechange");

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("binds to the window owning the target element, not the parent window", () => {
    // Mirrors the dt-cms builder preview: the React realm lives in the parent
    // window while the DOM node lives in an iframe document (createPortal).
    const iframe = document.createElement("iframe");
    document.body.appendChild(iframe);
    const iframeDoc = iframe.contentDocument!;
    const el = iframeDoc.createElement("div");
    iframeDoc.body.appendChild(el);

    const onClose = vi.fn();
    render(
      <Harness active onClose={onClose} targetRef={{ current: el }} />,
    );

    // The parent (dt-cms) window's own popstate must NOT close the menu.
    dispatchRouteEvent("popstate", window);
    expect(onClose).not.toHaveBeenCalled();

    // A route change inside the owning iframe window closes it.
    dispatchRouteEvent(
      "routechange",
      iframe.contentWindow! as unknown as Window,
    );
    expect(onClose).toHaveBeenCalledTimes(1);

    iframe.remove();
  });
});
