import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";

import { IframeEmbed } from "../iframe-embed";

/* -------------------------------------------------------------------------- */
/* IntersectionObserver harness                                                 */
/* -------------------------------------------------------------------------- */

interface ObserverRecord {
  callback: IntersectionObserverCallback;
  options?: IntersectionObserverInit;
  observed: Element[];
  disconnected: boolean;
}

let observers: ObserverRecord[] = [];
const realIntersectionObserver = global.IntersectionObserver;

function installObserverSpy(): void {
  observers = [];
  global.IntersectionObserver = class {
    readonly root: Element | Document | null = null;
    readonly rootMargin: string = "";
    readonly thresholds: ReadonlyArray<number> = [];
    private record: ObserverRecord;

    constructor(
      callback: IntersectionObserverCallback,
      options?: IntersectionObserverInit,
    ) {
      this.record = {
        callback,
        options,
        observed: [],
        disconnected: false,
      };
      observers.push(this.record);
    }

    observe(element: Element): void {
      this.record.observed.push(element);
    }

    unobserve(): void {}

    disconnect(): void {
      this.record.disconnected = true;
    }

    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  } as unknown as typeof IntersectionObserver;
}

/** Drive the most recent observer into the "on screen" state. */
function scrollIntoView(): void {
  const record = observers[observers.length - 1];
  act(() => {
    record.callback(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );
  });
}

beforeEach(() => {
  installObserverSpy();
});

afterEach(() => {
  global.IntersectionObserver = realIntersectionObserver;
  vi.restoreAllMocks();
});

/* -------------------------------------------------------------------------- */

describe("IframeEmbed empty state", () => {
  it("renders no frame and no fabricated placeholder when nothing is configured", () => {
    const { container } = render(<IframeEmbed />);

    expect(container.querySelector("section")).not.toBeNull();
    expect(container.querySelector("iframe")).toBeNull();
    expect(container.querySelector('[data-testid="iframe-embed-frame"]')).toBeNull();
    expect(container.textContent).toBe("");
  });

  it("renders the empty-state label when one is supplied", () => {
    render(<IframeEmbed emptyStateLabel="Add your reservation widget URL" />);

    expect(
      screen.getByText("Add your reservation widget URL"),
    ).toBeInTheDocument();
  });

  it("hides the empty-state label once an embed exists", () => {
    render(
      <IframeEmbed
        embedUrl="https://example.com/widget"
        embedTitle="Widget"
        emptyStateLabel="Add your reservation widget URL"
      />,
    );

    expect(
      screen.queryByText("Add your reservation widget URL"),
    ).not.toBeInTheDocument();
  });
});

describe("IframeEmbed lazy loading", () => {
  it("defers the iframe until the frame scrolls into view", () => {
    const { container } = render(
      <IframeEmbed embedUrl="https://example.com/widget" embedTitle="Widget" />,
    );

    expect(container.querySelector('[data-testid="iframe-embed-frame"]')).not.toBeNull();
    expect(container.querySelector("iframe")).toBeNull();

    scrollIntoView();

    expect(container.querySelector("iframe")).not.toBeNull();
  });

  it("observes with a 200px root margin", () => {
    render(
      <IframeEmbed embedUrl="https://example.com/widget" embedTitle="Widget" />,
    );

    expect(observers[0].options?.rootMargin).toBe("200px");
    expect(observers[0].observed).toHaveLength(1);
  });

  it("renders immediately and installs no observer when eager", () => {
    const { container } = render(
      <IframeEmbed
        embedUrl="https://example.com/widget"
        embedTitle="Widget"
        loadingStrategy="eager"
      />,
    );

    expect(observers).toHaveLength(0);
    expect(container.querySelector("iframe")).not.toBeNull();
    expect(container.querySelector("iframe")).toHaveAttribute(
      "loading",
      "eager",
    );
  });

  it("sets the native loading attribute to lazy by default", () => {
    const { container } = render(
      <IframeEmbed embedUrl="https://example.com/widget" embedTitle="Widget" />,
    );
    scrollIntoView();

    expect(container.querySelector("iframe")).toHaveAttribute(
      "loading",
      "lazy",
    );
  });

  it("disconnects the observer on unmount", () => {
    const { unmount } = render(
      <IframeEmbed embedUrl="https://example.com/widget" embedTitle="Widget" />,
    );

    expect(observers[0].disconnected).toBe(false);
    unmount();
    expect(observers[0].disconnected).toBe(true);
  });

  it("renders immediately when the browser has no IntersectionObserver", () => {
    // @ts-expect-error - simulating an environment without the API
    delete global.IntersectionObserver;

    const { container } = render(
      <IframeEmbed embedUrl="https://example.com/widget" embedTitle="Widget" />,
    );

    expect(container.querySelector("iframe")).not.toBeNull();
  });

  it("attaches the observer when the embed prop arrives after mount", () => {
    // Live-editing hosts (dt-cms keys blocks by a stable _id) update props on
    // the SAME instance, so the frame node mounts long after first render.
    const { container, rerender } = render(
      <IframeEmbed emptyStateLabel="Waiting for the embed" />,
    );

    expect(observers).toHaveLength(0);

    rerender(
      <IframeEmbed
        embedUrl="https://example.com/widget"
        embedTitle="Widget"
        emptyStateLabel="Waiting for the embed"
      />,
    );

    expect(observers).toHaveLength(1);
    expect(observers[0].observed).toHaveLength(1);
    expect(container.querySelector("iframe")).toBeNull();

    scrollIntoView();

    expect(container.querySelector("iframe")).not.toBeNull();
  });

  it("renders a late-arriving embedHtml when IntersectionObserver is unavailable", () => {
    // @ts-expect-error - simulating an environment without the API
    delete global.IntersectionObserver;

    const { container, rerender } = render(
      <IframeEmbed emptyStateLabel="Waiting for the embed" />,
    );

    rerender(
      <IframeEmbed
        embedHtml='<div id="raw-embed">raw</div>'
        emptyStateLabel="Waiting for the embed"
      />,
    );

    expect(container.querySelector("#raw-embed")).not.toBeNull();
  });
});

describe("IframeEmbed source resolution", () => {
  it("prefers the parsed embedUrl over the raw embedHtml escape hatch", () => {
    const { container } = render(
      <IframeEmbed
        embedUrl="https://example.com/parsed"
        embedTitle="Parsed"
        embedHtml='<iframe src="https://example.com/raw"></iframe>'
        loadingStrategy="eager"
      />,
    );

    const frames = container.querySelectorAll("iframe");
    expect(frames).toHaveLength(1);
    expect(frames[0]).toHaveAttribute("src", "https://example.com/parsed");
  });

  it("falls back to embedHtml when no embedUrl is supplied", () => {
    const { container } = render(
      <IframeEmbed
        embedHtml='<div id="raw-embed">raw</div>'
        loadingStrategy="eager"
      />,
    );

    expect(container.querySelector("#raw-embed")?.textContent).toBe("raw");
  });

  it("lazy-gates the raw embedHtml as well", () => {
    const { container } = render(
      <IframeEmbed embedHtml='<div id="raw-embed">raw</div>' />,
    );

    expect(container.querySelector("#raw-embed")).toBeNull();
    scrollIntoView();
    expect(container.querySelector("#raw-embed")).not.toBeNull();
  });

  it("sizes a bare iframe pasted into embedHtml to fill the frame", () => {
    const { container } = render(
      <IframeEmbed
        embedHtml='<iframe src="https://example.com/raw"></iframe>'
        loadingStrategy="eager"
      />,
    );

    const raw = container.querySelector<HTMLElement>(
      '[data-testid="iframe-embed-raw"]',
    );
    // Without child sizing a bare <iframe> renders at its 300x150 intrinsic
    // size in the corner of the containment box.
    expect(raw).not.toBeNull();
    expect(raw).toHaveClass("[&>iframe]:absolute");
    expect(raw).toHaveClass("[&>iframe]:inset-0");
    expect(raw).toHaveClass("[&>iframe]:h-full");
    expect(raw).toHaveClass("[&>iframe]:w-full");
    expect(raw).toHaveClass("[&>iframe]:border-0");
  });

  it("gives oversized embedHtml a scroll affordance instead of silent clipping", () => {
    const { container } = render(
      <IframeEmbed
        embedHtml='<div id="raw-embed" style="height:2000px">raw</div>'
        loadingStrategy="eager"
      />,
    );

    expect(
      container.querySelector('[data-testid="iframe-embed-raw"]'),
    ).toHaveClass("overflow-auto");
  });
});

describe("IframeEmbed embedUrl scheme validation", () => {
  it("refuses a javascript: embedUrl and shows the empty state instead", () => {
    const { container } = render(
      <IframeEmbed
        embedUrl="javascript:alert(1)"
        embedTitle="Hostile"
        emptyStateLabel="Waiting for the embed"
        loadingStrategy="eager"
      />,
    );

    expect(container.querySelector("iframe")).toBeNull();
    expect(
      container.querySelector('[data-testid="iframe-embed-frame"]'),
    ).toBeNull();
    expect(screen.getByText("Waiting for the embed")).toBeInTheDocument();
  });

  it("refuses a data: embedUrl", () => {
    const { container } = render(
      <IframeEmbed
        embedUrl="data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg=="
        embedTitle="Hostile"
        loadingStrategy="eager"
      />,
    );

    expect(container.querySelector("iframe")).toBeNull();
  });

  it("refuses a scheme obfuscated with control characters", () => {
    const { container } = render(
      <IframeEmbed
        embedUrl={"java\nscript:alert(1)"}
        embedTitle="Hostile"
        loadingStrategy="eager"
      />,
    );

    expect(container.querySelector("iframe")).toBeNull();
  });

  it("falls back to embedHtml when embedUrl has an unsupported scheme", () => {
    const { container } = render(
      <IframeEmbed
        embedUrl="javascript:alert(1)"
        embedHtml='<div id="raw-embed">raw</div>'
        loadingStrategy="eager"
      />,
    );

    expect(container.querySelector("iframe")).toBeNull();
    expect(container.querySelector("#raw-embed")).not.toBeNull();
  });

  it("still allows plain http embeds", () => {
    const { container } = render(
      <IframeEmbed
        embedUrl="http://example.com/widget"
        embedTitle="Widget"
        loadingStrategy="eager"
      />,
    );

    expect(container.querySelector("iframe")).toHaveAttribute(
      "src",
      "http://example.com/widget",
    );
  });
});

describe("IframeEmbed iframe attributes", () => {
  it("passes through allow, sandbox, referrerPolicy and title when supplied", () => {
    const { container } = render(
      <IframeEmbed
        embedUrl="https://example.com/widget"
        embedTitle="Online reservations"
        allowAttributes="encrypted-media; picture-in-picture"
        sandboxAttributes="allow-scripts allow-same-origin"
        referrerPolicy="strict-origin-when-cross-origin"
        loadingStrategy="eager"
      />,
    );

    const iframe = container.querySelector("iframe");
    expect(iframe).toHaveAttribute("title", "Online reservations");
    expect(iframe).toHaveAttribute(
      "allow",
      "encrypted-media; picture-in-picture",
    );
    expect(iframe).toHaveAttribute(
      "sandbox",
      "allow-scripts allow-same-origin",
    );
    expect(iframe).toHaveAttribute(
      "referrerpolicy",
      "strict-origin-when-cross-origin",
    );
  });

  it("omits sandbox, allow, referrerpolicy and title entirely when not supplied", () => {
    const { container } = render(
      <IframeEmbed
        embedUrl="https://example.com/widget"
        loadingStrategy="eager"
      />,
    );

    const iframe = container.querySelector("iframe");
    // An EMPTY sandbox attribute is maximally restrictive, so absence must mean
    // "no attribute at all", not sandbox="".
    expect(iframe?.hasAttribute("sandbox")).toBe(false);
    expect(iframe?.hasAttribute("allow")).toBe(false);
    expect(iframe?.hasAttribute("referrerpolicy")).toBe(false);
    expect(iframe?.hasAttribute("title")).toBe(false);
  });
});

describe("IframeEmbed containment", () => {
  it("defaults to a 16:9 aspect ratio", () => {
    const { container } = render(
      <IframeEmbed embedUrl="https://example.com/widget" embedTitle="Widget" />,
    );

    const frame = container.querySelector<HTMLElement>(
      '[data-testid="iframe-embed-frame"]',
    );
    expect(frame?.style.aspectRatio).toBe("16 / 9");
  });

  it("honours a custom aspect ratio", () => {
    const { container } = render(
      <IframeEmbed
        embedUrl="https://example.com/widget"
        embedTitle="Widget"
        aspectRatio="custom"
        customAspectRatio="5 / 4"
      />,
    );

    const frame = container.querySelector<HTMLElement>(
      '[data-testid="iframe-embed-frame"]',
    );
    expect(frame?.style.aspectRatio).toBe("5 / 4");
  });

  it("uses a pixel height in fixed-height mode", () => {
    const { container } = render(
      <IframeEmbed
        embedUrl="https://example.com/widget"
        embedTitle="Widget"
        containMode="fixed-height"
        fixedHeight="640px"
      />,
    );

    const frame = container.querySelector<HTMLElement>(
      '[data-testid="iframe-embed-frame"]',
    );
    expect(frame?.style.height).toBe("640px");
    expect(frame?.style.aspectRatio).toBe("");
  });

  it("falls back to a default fixed height when none is given", () => {
    const { container } = render(
      <IframeEmbed
        embedUrl="https://example.com/widget"
        embedTitle="Widget"
        containMode="fixed-height"
      />,
    );

    const frame = container.querySelector<HTMLElement>(
      '[data-testid="iframe-embed-frame"]',
    );
    expect(frame?.style.height).toBe("600px");
  });

  it("falls back to 16:9 when aspectRatio is outside the enum", () => {
    const { container } = render(
      <IframeEmbed
        embedUrl="https://example.com/widget"
        embedTitle="Widget"
        aspectRatio={"3:2" as unknown as "16:9"}
      />,
    );

    const frame = container.querySelector<HTMLElement>(
      '[data-testid="iframe-embed-frame"]',
    );
    // An unresolved ratio drops the aspect-ratio declaration entirely and the
    // frame (whose only children are absolutely positioned) collapses to 0px.
    expect(frame?.style.aspectRatio).toBe("16 / 9");
  });

  it("falls back to 16:9 when customAspectRatio is blank", () => {
    const { container } = render(
      <IframeEmbed
        embedUrl="https://example.com/widget"
        embedTitle="Widget"
        aspectRatio="custom"
        customAspectRatio="   "
      />,
    );

    const frame = container.querySelector<HTMLElement>(
      '[data-testid="iframe-embed-frame"]',
    );
    expect(frame?.style.aspectRatio).toBe("16 / 9");
  });

  it("normalizes a unitless fixedHeight to pixels", () => {
    const { container } = render(
      <IframeEmbed
        embedUrl="https://example.com/widget"
        embedTitle="Widget"
        containMode="fixed-height"
        fixedHeight="640"
      />,
    );

    const frame = container.querySelector<HTMLElement>(
      '[data-testid="iframe-embed-frame"]',
    );
    expect(frame?.style.height).toBe("640px");
  });

  it("treats a numeric fixedHeight as pixels", () => {
    const { container } = render(
      <IframeEmbed
        embedUrl="https://example.com/widget"
        embedTitle="Widget"
        containMode="fixed-height"
        fixedHeight={640 as unknown as string}
      />,
    );

    const frame = container.querySelector<HTMLElement>(
      '[data-testid="iframe-embed-frame"]',
    );
    expect(frame?.style.height).toBe("640px");
  });

  it("keeps a valid CSS length in fixed-height mode untouched", () => {
    const { container } = render(
      <IframeEmbed
        embedUrl="https://example.com/widget"
        embedTitle="Widget"
        containMode="fixed-height"
        fixedHeight="80vh"
      />,
    );

    const frame = container.querySelector<HTMLElement>(
      '[data-testid="iframe-embed-frame"]',
    );
    expect(frame?.style.height).toBe("80vh");
  });

  it("uses the platform full-bleed idiom in full-screen mode", () => {
    const { container } = render(
      <IframeEmbed
        embedUrl="https://example.com/widget"
        embedTitle="Widget"
        containMode="full-screen"
      />,
    );

    // spacing="none" on the Section...
    expect(container.querySelector("section")).toHaveClass("py-0");
    // ...plus a container that drops padding and max width.
    expect(container.querySelector(".max-w-full")).not.toBeNull();
    expect(container.querySelector(".px-0")).not.toBeNull();
    expect(
      container.querySelector('[data-testid="iframe-embed-frame"]'),
    ).toHaveClass("h-screen");
  });

  it("lets an explicit spacing override the full-screen default", () => {
    const { container } = render(
      <IframeEmbed
        embedUrl="https://example.com/widget"
        embedTitle="Widget"
        containMode="full-screen"
        spacing="lg"
      />,
    );

    expect(container.querySelector("section")).not.toHaveClass("py-0");
  });
});

describe("IframeEmbed section passthrough", () => {
  it("renders the section heading and applies className", () => {
    const { container } = render(
      <IframeEmbed
        title="Book a table"
        subtitle="Reservations"
        className="custom-class"
        emptyStateLabel="Waiting for the embed"
      />,
    );

    expect(screen.getByText("Book a table")).toBeInTheDocument();
    expect(screen.getByText("Reservations")).toBeInTheDocument();
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("uses the block id as the default section id", () => {
    const { container } = render(<IframeEmbed emptyStateLabel="Pending" />);

    expect(container.querySelector("section")?.id).toBe("iframe-embed");
  });
});
