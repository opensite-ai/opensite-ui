import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { StrictMode } from "react";
import { act, render, screen, waitFor } from "@testing-library/react";

import {
  ScriptEmbed,
  __resetScriptEmbedStateForTests,
} from "../script-embed";
import { __resetScriptLoaderForTests } from "../../../../lib/script-loader";

/* -------------------------------------------------------------------------- */
/* Instrumented fake scripts                                                    */
/* -------------------------------------------------------------------------- */

/**
 * jsdom neither fetches external scripts nor executes them synchronously, so
 * ordering is proven structurally: every <script>/<link> append is recorded in
 * order (with a snapshot of the DOM state at that instant) and load events are
 * fired by hand to advance the chain.
 */
interface AppendRecord {
  kind: "script" | "link";
  value: string;
  element: Element;
  parent: Node | null;
  companionPresentAtAppend: boolean;
}

let appends: AppendRecord[] = [];
const originalAppendChild = Node.prototype.appendChild;

function installAppendSpy(): void {
  appends = [];
  Node.prototype.appendChild = function <T extends Node>(
    this: Node,
    node: T,
  ): T {
    const result = originalAppendChild.call(this, node) as T;
    if (node instanceof HTMLScriptElement) {
      appends.push({
        kind: "script",
        value: node.src || node.text,
        element: node,
        parent: this,
        companionPresentAtAppend:
          document.querySelector("#companion-mount") !== null,
      });
    } else if (node instanceof HTMLLinkElement) {
      appends.push({
        kind: "link",
        value: node.href,
        element: node,
        parent: this,
        companionPresentAtAppend:
          document.querySelector("#companion-mount") !== null,
      });
    }
    return result;
  };
}

const order = (): string[] => appends.map((entry) => entry.value);

/** The loader URL from the block's own registry example. */
const UNTAPPD_URL =
  "https://embed-menu-preloader.untappdapi.com/embed-menu-preloader.min.js";

function fireLoad(value: string): void {
  const record = appends.find((entry) => entry.value === value);
  if (!record) throw new Error(`no appended element for ${value}`);
  record.element.dispatchEvent(new Event("load"));
}

/** Advance past pending timers/microtasks inside act() so deferred-mount
 *  state updates are flushed the way React expects. */
const flush = async (): Promise<void> => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
};

beforeEach(() => {
  installAppendSpy();
  vi.spyOn(console, "warn").mockImplementation(() => undefined);
  vi.spyOn(console, "info").mockImplementation(() => undefined);
});

afterEach(() => {
  Node.prototype.appendChild = originalAppendChild;
  __resetScriptLoaderForTests();
  __resetScriptEmbedStateForTests();
  document.head.querySelectorAll("script, link").forEach((el) => el.remove());
  vi.restoreAllMocks();
});

/* -------------------------------------------------------------------------- */

describe("ScriptEmbed empty state", () => {
  it("renders no container and no fabricated widget when nothing is configured", () => {
    const { container } = render(<ScriptEmbed />);

    expect(container.querySelector("section")).not.toBeNull();
    expect(
      container.querySelector('[data-testid="script-embed-container"]'),
    ).toBeNull();
    expect(container.textContent).toBe("");
    expect(appends).toHaveLength(0);
  });

  it("renders the empty-state label when one is supplied", () => {
    render(<ScriptEmbed emptyStateLabel="Paste your widget snippet" />);

    expect(screen.getByText("Paste your widget snippet")).toBeInTheDocument();
  });

  it("renders companion markup alone without running any script", () => {
    const { container } = render(
      <ScriptEmbed companionHtml='<div id="companion-mount"></div>' />,
    );

    expect(container.querySelector("#companion-mount")).not.toBeNull();
    expect(appends).toHaveLength(0);
  });
});

describe("ScriptEmbed execution order", () => {
  it("puts companion markup in the DOM before the first script is appended", async () => {
    render(
      <ScriptEmbed
        companionHtml='<div id="companion-mount"></div>'
        scriptUrl="https://cdn.example.com/widget.js"
      />,
    );

    await waitFor(() => expect(appends).toHaveLength(1));
    expect(appends[0].companionPresentAtAppend).toBe(true);
  });

  it("loads stylesheets, then scriptUrl, then additional urls, then inline code", async () => {
    render(
      <ScriptEmbed
        stylesheetUrls={["https://cdn.example.com/widget.css"]}
        scriptUrl="https://cdn.example.com/one.js"
        additionalScriptUrls={[
          "https://cdn.example.com/two.js",
          "https://cdn.example.com/three.js",
        ]}
        inlineScriptHtml="window.__widgetInit = true;"
      />,
    );

    await waitFor(() =>
      expect(order()).toEqual(["https://cdn.example.com/widget.css"]),
    );

    fireLoad("https://cdn.example.com/widget.css");
    await waitFor(() =>
      expect(order()).toEqual([
        "https://cdn.example.com/widget.css",
        "https://cdn.example.com/one.js",
      ]),
    );

    fireLoad("https://cdn.example.com/one.js");
    await waitFor(() =>
      expect(order()).toEqual([
        "https://cdn.example.com/widget.css",
        "https://cdn.example.com/one.js",
        "https://cdn.example.com/two.js",
      ]),
    );

    fireLoad("https://cdn.example.com/two.js");
    await waitFor(() =>
      expect(order()).toEqual([
        "https://cdn.example.com/widget.css",
        "https://cdn.example.com/one.js",
        "https://cdn.example.com/two.js",
        "https://cdn.example.com/three.js",
      ]),
    );

    fireLoad("https://cdn.example.com/three.js");
    await waitFor(() =>
      expect(order()).toEqual([
        "https://cdn.example.com/widget.css",
        "https://cdn.example.com/one.js",
        "https://cdn.example.com/two.js",
        "https://cdn.example.com/three.js",
        "window.__widgetInit = true;",
      ]),
    );
  });

  it("appends the scripts inside the block container, not the document head", async () => {
    const { container } = render(
      <ScriptEmbed scriptUrl="https://cdn.example.com/in-container.js" />,
    );

    await waitFor(() => expect(appends).toHaveLength(1));
    expect(appends[0].parent).toBe(
      container.querySelector('[data-testid="script-embed-container"]'),
    );
  });

  it("still runs the inline script when there is no scriptUrl", async () => {
    render(<ScriptEmbed inlineScriptHtml="window.__standalone = 1;" />);

    await waitFor(() => expect(order()).toEqual(["window.__standalone = 1;"]));
  });

  it("keeps going when a stylesheet fails", async () => {
    render(
      <ScriptEmbed
        stylesheetUrls={["https://cdn.example.com/broken.css"]}
        scriptUrl="https://cdn.example.com/widget.js"
      />,
    );

    await waitFor(() => expect(appends).toHaveLength(1));
    appends[0].element.dispatchEvent(new Event("error"));

    await waitFor(() =>
      expect(order()).toContain("https://cdn.example.com/widget.js"),
    );
  });
});

describe("ScriptEmbed deduplication", () => {
  it("is StrictMode double-mount safe", async () => {
    render(
      <StrictMode>
        <ScriptEmbed
          scriptUrl="https://cdn.example.com/strict.js"
          inlineScriptHtml="window.__strictInit = 1;"
        />
      </StrictMode>,
    );

    await waitFor(() => expect(appends).toHaveLength(1));
    fireLoad("https://cdn.example.com/strict.js");
    await flush();

    expect(
      order().filter((v) => v === "https://cdn.example.com/strict.js"),
    ).toHaveLength(1);
    expect(
      order().filter((v) => v === "window.__strictInit = 1;"),
    ).toHaveLength(1);
  });

  it("does not re-run on remount by default", async () => {
    const markup = (
      <ScriptEmbed inlineScriptHtml="window.__once = 1;" />
    );

    const first = render(markup);
    await waitFor(() => expect(order()).toEqual(["window.__once = 1;"]));
    first.unmount();

    render(markup);
    await flush();
    expect(order()).toEqual(["window.__once = 1;"]);
  });

  it("re-runs the inline script on remount when runOnEveryMount is set", async () => {
    const markup = (
      <ScriptEmbed inlineScriptHtml="window.__again = 1;" runOnEveryMount />
    );

    const first = render(markup);
    await waitFor(() => expect(order()).toHaveLength(1));
    first.unmount();

    render(markup);
    await waitFor(() => expect(order()).toHaveLength(2));
    expect(order()).toEqual(["window.__again = 1;", "window.__again = 1;"]);
  });

  it("stays double-mount safe even with runOnEveryMount under StrictMode", async () => {
    render(
      <StrictMode>
        <ScriptEmbed inlineScriptHtml="window.__strictAgain = 1;" runOnEveryMount />
      </StrictMode>,
    );

    await waitFor(() => expect(order()).toHaveLength(1));
    await flush();
    expect(order()).toHaveLength(1);
  });

  it("runs BOTH inline snippets when two blocks share one scriptUrl", async () => {
    // The registry's own exampleUsage shape: one loader URL, one companion mount
    // point and one init call per block. Keying the inline item on the URL alone
    // makes the second block's init silently vanish.
    render(
      <ScriptEmbed
        scriptUrl={UNTAPPD_URL}
        companionHtml='<div id="food-menu"></div>'
        inlineScriptHtml="window.__menus = (window.__menus || []).concat('food-menu');"
      />,
    );
    render(
      <ScriptEmbed
        scriptUrl={UNTAPPD_URL}
        companionHtml='<div id="drink-menu"></div>'
        inlineScriptHtml="window.__menus = (window.__menus || []).concat('drink-menu');"
      />,
    );

    await waitFor(() => expect(appends).toHaveLength(1));
    fireLoad(UNTAPPD_URL);

    await waitFor(() => expect(order()).toHaveLength(3));
    expect(order().filter((v) => v === UNTAPPD_URL)).toHaveLength(1);
    expect(order()).toContain("window.__menus = (window.__menus || []).concat('food-menu');");
    expect(order()).toContain("window.__menus = (window.__menus || []).concat('drink-menu');");
  });

  it("runs edited inline code when only inlineScriptHtml changes", async () => {
    const url = "https://cdn.example.com/edited.js";
    const view = render(
      <ScriptEmbed scriptUrl={url} inlineScriptHtml="window.__edited = 1;" />,
    );

    await waitFor(() => expect(appends).toHaveLength(1));
    fireLoad(url);
    await waitFor(() => expect(order()).toContain("window.__edited = 1;"));

    view.rerender(<ScriptEmbed scriptUrl={url} inlineScriptHtml="window.__edited = 2;" />);

    await waitFor(() => expect(order()).toContain("window.__edited = 2;"));
    expect(order().filter((v) => v === url)).toHaveLength(1);
  });

  it("honours an explicit scriptKey so two variants only load once", async () => {
    render(
      <ScriptEmbed
        scriptUrl="https://cdn.example.com/widget.js?v=1"
        scriptKey="shared-widget"
      />,
    );
    await waitFor(() => expect(appends).toHaveLength(1));

    render(
      <ScriptEmbed
        scriptUrl="https://cdn.example.com/widget.js?v=2"
        scriptKey="shared-widget"
      />,
    );
    await flush();

    expect(appends).toHaveLength(1);
  });
});

describe("ScriptEmbed url handling", () => {
  it("keeps a '|' inside a stylesheet url intact", async () => {
    // Google Fonts v1 hrefs carry an unencoded '|'; joining the array on '|'
    // for the dependency signature must not be split back into two urls.
    const href = "https://fonts.googleapis.com/css?family=Roboto|Open+Sans";
    render(
      <ScriptEmbed
        stylesheetUrls={[href]}
        scriptUrl="https://cdn.example.com/piped.js"
      />,
    );

    await waitFor(() => expect(appends.length).toBeGreaterThan(0));
    expect(appends).toHaveLength(1);
    expect(appends[0].kind).toBe("link");
    expect(appends[0].element.getAttribute("href")).toBe(href);
  });

  it("keeps a '|' inside an additional script url intact and still reaches the inline init", async () => {
    const piped = "https://cdn.example.com/widget.js?variants=a|b";
    render(
      <ScriptEmbed
        scriptUrl="https://cdn.example.com/one.js"
        additionalScriptUrls={[piped]}
        inlineScriptHtml="window.__pipeInit = 1;"
      />,
    );

    await waitFor(() => expect(appends).toHaveLength(1));
    fireLoad("https://cdn.example.com/one.js");

    await waitFor(() => expect(order()).toContain(piped));
    fireLoad(piped);

    await waitFor(() => expect(order()).toContain("window.__pipeInit = 1;"));
  });

  it("skips blank url entries instead of aborting the chain", async () => {
    render(
      <ScriptEmbed
        scriptUrl="https://cdn.example.com/one.js"
        additionalScriptUrls={["   "]}
        inlineScriptHtml="window.__blankInit = 1;"
      />,
    );

    await waitFor(() => expect(appends).toHaveLength(1));
    fireLoad("https://cdn.example.com/one.js");

    await waitFor(() => expect(order()).toContain("window.__blankInit = 1;"));
  });
});

describe("ScriptEmbed SPA remount", () => {
  it("re-attaches the widget DOM into the fresh container after a remount", async () => {
    const url = "https://cdn.example.com/spa-widget.js";
    const markup = (
      <ScriptEmbed
        scriptUrl={url}
        companionHtml='<div id="companion-mount"></div>'
      />
    );

    const first = render(markup);
    await waitFor(() => expect(appends).toHaveLength(1));

    // Stand in for the vendor script building its widget in the mount point.
    const mount = first.container.querySelector("#companion-mount");
    if (!mount) throw new Error("companion mount point missing");
    mount.innerHTML = '<div id="widget-body">menu</div>';

    fireLoad(url);
    await flush();
    first.unmount();

    const second = render(markup);
    await flush();

    expect(second.container.querySelector("#widget-body")?.textContent).toBe(
      "menu",
    );
    // The vendor script is still loaded exactly once.
    expect(order().filter((v) => v === url)).toHaveLength(1);
  });

  it("uses a fresh companion mount when runOnEveryMount re-runs the init", async () => {
    const url = "https://cdn.example.com/spa-rerun.js";
    const markup = (
      <ScriptEmbed
        scriptUrl={url}
        companionHtml='<div id="rerun-mount"></div>'
        inlineScriptHtml="window.__spaInit = 1;"
        runOnEveryMount
      />
    );

    const first = render(markup);
    await waitFor(() => expect(appends).toHaveLength(1));
    fireLoad(url);
    await waitFor(() => expect(order()).toContain("window.__spaInit = 1;"));

    const mount = first.container.querySelector("#rerun-mount");
    if (!mount) throw new Error("companion mount point missing");
    mount.innerHTML = '<span id="stale">stale</span>';
    first.unmount();

    const second = render(markup);
    await waitFor(() =>
      expect(
        order().filter((v) => v === "window.__spaInit = 1;"),
      ).toHaveLength(2),
    );
    expect(second.container.querySelector("#stale")).toBeNull();
    // The rebuilt mount point must actually be there — an empty container is
    // just as broken as a stale one.
    expect(second.container.querySelector("#rerun-mount")).not.toBeNull();
  });
});

/* -------------------------------------------------------------------------- */

/**
 * React commits DOM → cleanup → effect. The cleanup detaches the container's
 * children into the module-level park, so every same-instance effect re-run
 * (StrictMode's synthetic teardown, and every prop edit in the builder) starts
 * against an EMPTY container that React will not refill: it only rewrites
 * `dangerouslySetInnerHTML` when the `__html` string changes. Nothing below is
 * about remounting — these all run on ONE component instance.
 */
describe("ScriptEmbed same-instance effect re-run", () => {
  it("keeps the companion mount point under a StrictMode double mount with runOnEveryMount", async () => {
    const url = "https://cdn.example.com/strict-park.js";
    const { container } = render(
      <StrictMode>
        <ScriptEmbed
          scriptUrl={url}
          companionHtml='<div id="companion-mount"></div>'
          inlineScriptHtml="window.__strictPark = 1;"
          runOnEveryMount
        />
      </StrictMode>,
    );

    await waitFor(() => expect(appends).toHaveLength(1));
    fireLoad(url);
    await flush();

    const embed = container.querySelector(
      '[data-testid="script-embed-container"]',
    );
    expect(embed?.querySelector("#companion-mount")).not.toBeNull();
    // Still exactly one init: restoring the DOM must not double the widget.
    expect(
      order().filter((v) => v === "window.__strictPark = 1;"),
    ).toHaveLength(1);
  });

  it("leaves the in-flight script element connected when it restores the DOM", async () => {
    // Restoring the parked DOM must not detach the <script> the loader already
    // appended: it is still downloading, and the loader's document.write
    // watchdog reads its connectedness as "is this embed still alive?".
    const url = "https://cdn.example.com/still-loading.js";
    const { container } = render(
      <StrictMode>
        <ScriptEmbed
          scriptUrl={url}
          companionHtml='<div id="companion-mount"></div>'
        />
      </StrictMode>,
    );

    await waitFor(() => expect(appends).toHaveLength(1));
    await flush();

    const embed = container.querySelector(
      '[data-testid="script-embed-container"]',
    );
    expect(appends[0].element.isConnected).toBe(true);
    expect(embed?.contains(appends[0].element)).toBe(true);
    expect(embed?.querySelector("#companion-mount")).not.toBeNull();
  });

  it("keeps the live widget DOM when a prop edit re-runs the effect", async () => {
    const view = render(
      <ScriptEmbed
        scriptUrl="https://cdn.example.com/edit-a.js"
        companionHtml='<div id="companion-mount"></div>'
      />,
    );

    await waitFor(() => expect(appends).toHaveLength(1));
    const mount = view.container.querySelector("#companion-mount");
    if (!mount) throw new Error("companion mount point missing");
    mount.innerHTML = '<div id="widget-body">menu</div>';
    fireLoad("https://cdn.example.com/edit-a.js");
    await flush();

    // Only scriptUrl changes: the park key moves, but the widget must not.
    view.rerender(
      <ScriptEmbed
        scriptUrl="https://cdn.example.com/edit-b.js"
        companionHtml='<div id="companion-mount"></div>'
      />,
    );
    await flush();

    expect(view.container.querySelector("#widget-body")?.textContent).toBe(
      "menu",
    );
  });

  it("rebuilds the mount point from edited companionHtml", async () => {
    const url = "https://cdn.example.com/companion-edit.js";
    const view = render(
      <ScriptEmbed
        scriptUrl={url}
        companionHtml='<div id="mount-v1"></div>'
        inlineScriptHtml="window.__companion = 1;"
      />,
    );

    await waitFor(() => expect(appends).toHaveLength(1));
    fireLoad(url);
    await flush();

    view.rerender(
      <ScriptEmbed
        scriptUrl={url}
        companionHtml='<div id="mount-v2"></div>'
        inlineScriptHtml="window.__companion = 2;"
      />,
    );
    await flush();

    const embed = view.container.querySelector(
      '[data-testid="script-embed-container"]',
    );
    expect(embed?.querySelector("#mount-v2")).not.toBeNull();
    expect(embed?.querySelector("#mount-v1")).toBeNull();
  });

  it("rebuilds and re-inits a live runOnEveryMount instance on a prop edit", async () => {
    const inline = "window.__liveAgain = 1;";
    const view = render(
      <ScriptEmbed
        scriptUrl="https://cdn.example.com/live-a.js"
        companionHtml='<div id="companion-mount"></div>'
        inlineScriptHtml={inline}
        runOnEveryMount
      />,
    );

    await waitFor(() => expect(appends).toHaveLength(1));
    fireLoad("https://cdn.example.com/live-a.js");
    await waitFor(() => expect(order()).toContain(inline));

    const mount = view.container.querySelector("#companion-mount");
    if (!mount) throw new Error("companion mount point missing");
    mount.innerHTML = '<span id="stale">stale</span>';

    view.rerender(
      <ScriptEmbed
        scriptUrl="https://cdn.example.com/live-b.js"
        companionHtml='<div id="companion-mount"></div>'
        inlineScriptHtml={inline}
        runOnEveryMount
      />,
    );
    await waitFor(() =>
      expect(order()).toContain("https://cdn.example.com/live-b.js"),
    );
    fireLoad("https://cdn.example.com/live-b.js");
    await waitFor(() =>
      expect(order().filter((v) => v === inline)).toHaveLength(2),
    );

    const embed = view.container.querySelector(
      '[data-testid="script-embed-container"]',
    );
    expect(embed?.querySelector("#companion-mount")).not.toBeNull();
    expect(embed?.querySelector("#stale")).toBeNull();
  });
});

/* -------------------------------------------------------------------------- */

/**
 * P1 found by local browser E2E (`docs/component-library/impl/E2E-local.md` §3),
 * invisible to every test above.
 *
 * In the browser the load-order contract worked — the inline script ran at
 * t=301ms and mutated the companion mount point — and then at t=313ms React
 * re-applied the companion markup to the SAME container element and wiped both
 * the vendor's mutation and the `<script>` element. The loader's dedupe key is
 * retained by design, so the init never re-ran: a permanently blank widget,
 * with zero console output.
 *
 * The mechanism is React owning the subtree via `dangerouslySetInnerHTML`:
 *
 *   - react-dom 19 (`updateProperties` → `setProp`) compares the
 *     `dangerouslySetInnerHTML` PROP OBJECT by identity and then assigns
 *     `innerHTML` unconditionally. `{ __html }` is a fresh object literal on
 *     every render, so EVERY update commit that reaches the container
 *     re-applies the markup. That is the browser timeline above, and
 *     customer-sites ships react-dom 19.
 *   - react-dom 18 (pinned here) still guards on `lastHtml !== nextHtml`, so it
 *     re-applies when the `__html` string changes — and also when the prop
 *     object was absent for a commit and comes back with an IDENTICAL string,
 *     because `lastHtml` is then `undefined`. That is the sequence replayed
 *     below: same container element, same markup, a later commit, everything
 *     the vendor built destroyed.
 *
 * The fix is architectural: the container renders empty and the companion
 * markup is injected imperatively in an effect, so React never owns those
 * children and no commit can undo the widget.
 */
describe("ScriptEmbed companion subtree ownership", () => {
  it("keeps the vendor DOM when a later commit re-applies the companion markup", async () => {
    const url = "https://cdn.example.com/react-commit.js";
    const companion = '<div id="companion-mount"></div>';

    const view = render(
      <ScriptEmbed scriptUrl={url} companionHtml={companion} />,
    );
    await waitFor(() => expect(appends).toHaveLength(1));
    const scriptElement = appends[0].element;

    // Stand in for the vendor script building its widget in the mount point,
    // exactly as it did at t=301ms in the browser.
    const mount = view.container.querySelector("#companion-mount");
    if (!mount) throw new Error("companion mount point missing");
    mount.innerHTML = '<div id="widget-body">menu</div>';
    fireLoad(url);
    await flush();
    expect(view.container.querySelector("#widget-body")).not.toBeNull();

    // A later commit that re-applies the companion markup to the same
    // container. Nothing here is a script-prop edit, so the loader chain must
    // not re-run — and nothing may touch the widget's DOM.
    view.rerender(<ScriptEmbed scriptUrl={url} />);
    await flush();
    view.rerender(<ScriptEmbed scriptUrl={url} companionHtml={companion} />);
    await flush();

    expect(view.container.querySelector("#widget-body")?.textContent).toBe(
      "menu",
    );
    // The `<script>` element must survive too: its removal is what makes the
    // failure permanent (the loader's dedupe key is kept, so nothing re-runs).
    expect(scriptElement.isConnected).toBe(true);
    expect(order().filter((v) => v === url)).toHaveLength(1);
  });

  it("does not hand the companion subtree to React", () => {
    const { container } = render(
      <ScriptEmbed
        scriptUrl="https://cdn.example.com/owned.js"
        companionHtml='<div id="companion-mount"></div>'
      />,
    );

    const embed = container.querySelector('[data-testid="script-embed-container"]');
    expect(embed).not.toBeNull();

    // React records the props it owns on the host node. If
    // `dangerouslySetInnerHTML` is among them, React can re-apply the markup on
    // any later commit — the defect above. (Internal key, so the assertion is
    // made only when this React version exposes it.)
    const propsKey = Object.keys(embed as object).find((key) =>
      key.startsWith("__reactProps$"),
    );
    if (propsKey) {
      const ownedProps = (embed as unknown as Record<string, unknown>)[
        propsKey
      ] as Record<string, unknown>;
      expect(ownedProps).not.toHaveProperty("dangerouslySetInnerHTML");
    }

    // …and the markup is nonetheless present: the effect wrote it.
    expect(embed?.querySelector("#companion-mount")).not.toBeNull();
  });

  it("re-injects edited companionHtml when no script prop changes", async () => {
    // The builder edits companionHtml on its own all the time; the effect that
    // owns the subtree is now the only thing that can honour that edit.
    const url = "https://cdn.example.com/companion-only-edit.js";
    const view = render(
      <ScriptEmbed scriptUrl={url} companionHtml='<div id="mount-a"></div>' />,
    );

    await waitFor(() => expect(appends).toHaveLength(1));
    fireLoad(url);
    await flush();

    view.rerender(
      <ScriptEmbed scriptUrl={url} companionHtml='<div id="mount-b"></div>' />,
    );
    await flush();

    const embed = view.container.querySelector(
      '[data-testid="script-embed-container"]',
    );
    expect(embed?.querySelector("#mount-b")).not.toBeNull();
    expect(embed?.querySelector("#mount-a")).toBeNull();
    expect(order().filter((v) => v === url)).toHaveLength(1);
  });
});

describe("ScriptEmbed load strategy", () => {
  it("starts immediately with the afterInteractive default", async () => {
    render(<ScriptEmbed scriptUrl="https://cdn.example.com/eager.js" />);

    await waitFor(() => expect(appends).toHaveLength(1));
  });

  it("defers until idle with lazyOnload", async () => {
    render(
      <ScriptEmbed
        scriptUrl="https://cdn.example.com/lazy.js"
        loadStrategy="lazyOnload"
      />,
    );

    // useDeferredMount gates the first render pass; nothing is loaded yet.
    expect(appends).toHaveLength(0);

    await waitFor(() => expect(appends).toHaveLength(1));
    expect(appends[0].value).toBe("https://cdn.example.com/lazy.js");
  });
});

describe("ScriptEmbed document.write handling", () => {
  it("leaves document.write untouched by default", async () => {
    const original = document.write;
    render(<ScriptEmbed scriptUrl="https://cdn.example.com/plain.js" />);

    await waitFor(() => expect(appends).toHaveLength(1));
    expect(document.write).toBe(original);
  });

  it("routes legacy document.write output into the block container when allowed", async () => {
    const { container } = render(
      <ScriptEmbed
        scriptUrl="https://cdn.example.com/legacy.js"
        allowDocumentWrite
      />,
    );

    await waitFor(() => expect(appends).toHaveLength(1));

    document.write('<p id="legacy-output">written</p>');

    const embed = container.querySelector(
      '[data-testid="script-embed-container"]',
    );
    expect(embed?.querySelector("#legacy-output")?.textContent).toBe("written");
  });

  it("restores document.write when the block unmounts before the script settles", async () => {
    const original = document.write;
    const view = render(
      <ScriptEmbed scriptUrl="https://cdn.example.com/hung.js" allowDocumentWrite />,
    );

    await waitFor(() => expect(appends).toHaveLength(1));
    expect(document.write).not.toBe(original);

    // Neither load nor error ever fires (hung host); unmount must still tear
    // the global patch down instead of leaving it bound to a detached div.
    view.unmount();
    await flush();

    expect(document.write).toBe(original);
  });

  it("keeps the interception installed across a StrictMode double mount", async () => {
    const original = document.write;
    render(
      <StrictMode>
        <ScriptEmbed
          scriptUrl="https://cdn.example.com/strict-write.js"
          allowDocumentWrite
        />
      </StrictMode>,
    );

    await waitFor(() => expect(appends).toHaveLength(1));
    await flush();

    // StrictMode's synthetic unmount must not drop the patch while the real
    // script is still loading.
    expect(document.write).not.toBe(original);
  });

  it("stays silent when a load fails after the block unmounted", async () => {
    const view = render(
      <ScriptEmbed scriptUrl="https://cdn.example.com/late.js" />,
    );

    await waitFor(() => expect(appends).toHaveLength(1));
    view.unmount();
    appends[0].element.dispatchEvent(new Event("error"));
    await flush();

    expect(console.warn).not.toHaveBeenCalled();
  });
});

describe("ScriptEmbed containment and section passthrough", () => {
  it("uses auto sizing by default", () => {
    const { container } = render(
      <ScriptEmbed companionHtml='<div id="companion-mount"></div>' />,
    );

    const embed = container.querySelector<HTMLElement>(
      '[data-testid="script-embed-container"]',
    );
    expect(embed?.style.height).toBe("");
    expect(embed).not.toHaveClass("h-screen");
  });

  it("reserves a fixed height when asked", () => {
    const { container } = render(
      <ScriptEmbed
        companionHtml='<div id="companion-mount"></div>'
        containMode="fixed-height"
        fixedHeight="480px"
      />,
    );

    expect(
      container.querySelector<HTMLElement>(
        '[data-testid="script-embed-container"]',
      )?.style.height,
    ).toBe("480px");
  });

  it("reads a unitless fixedHeight as pixels", () => {
    // Block data is not format-validated upstream, and CSSOM drops a unitless
    // `height`, which collapses the reserved anti-layout-shift box.
    const { container } = render(
      <ScriptEmbed
        companionHtml='<div id="companion-mount"></div>'
        containMode="fixed-height"
        fixedHeight="640"
      />,
    );

    expect(
      container.querySelector<HTMLElement>(
        '[data-testid="script-embed-container"]',
      )?.style.height,
    ).toBe("640px");
  });

  it("reads a JSON number fixedHeight as pixels", () => {
    const { container } = render(
      <ScriptEmbed
        companionHtml='<div id="companion-mount"></div>'
        containMode="fixed-height"
        fixedHeight={640 as unknown as string}
      />,
    );

    expect(
      container.querySelector<HTMLElement>(
        '[data-testid="script-embed-container"]',
      )?.style.height,
    ).toBe("640px");
  });

  it("passes a non-pixel CSS length through untouched", () => {
    const { container } = render(
      <ScriptEmbed
        companionHtml='<div id="companion-mount"></div>'
        containMode="fixed-height"
        fixedHeight="50vh"
      />,
    );

    expect(
      container.querySelector<HTMLElement>(
        '[data-testid="script-embed-container"]',
      )?.style.height,
    ).toBe("50vh");
  });

  it("falls back to the default for a whitespace-only fixedHeight", () => {
    const { container } = render(
      <ScriptEmbed
        companionHtml='<div id="companion-mount"></div>'
        containMode="fixed-height"
        fixedHeight="   "
      />,
    );

    expect(
      container.querySelector<HTMLElement>(
        '[data-testid="script-embed-container"]',
      )?.style.height,
    ).toBe("600px");
  });

  it("falls back to a default fixed height", () => {
    const { container } = render(
      <ScriptEmbed
        companionHtml='<div id="companion-mount"></div>'
        containMode="fixed-height"
      />,
    );

    expect(
      container.querySelector<HTMLElement>(
        '[data-testid="script-embed-container"]',
      )?.style.height,
    ).toBe("600px");
  });

  it("uses the platform full-bleed idiom in full-screen mode", () => {
    const { container } = render(
      <ScriptEmbed
        companionHtml='<div id="companion-mount"></div>'
        containMode="full-screen"
      />,
    );

    expect(container.querySelector("section")).toHaveClass("py-0");
    expect(container.querySelector(".max-w-full")).not.toBeNull();
    expect(
      container.querySelector('[data-testid="script-embed-container"]'),
    ).toHaveClass("h-screen");
  });

  it("renders the section heading, className and default section id", () => {
    const { container } = render(
      <ScriptEmbed
        title="Order online"
        subtitle="Powered by our partner"
        className="custom-class"
        embedClassName="embed-class"
        companionHtml='<div id="companion-mount"></div>'
      />,
    );

    expect(screen.getByText("Order online")).toBeInTheDocument();
    expect(screen.getByText("Powered by our partner")).toBeInTheDocument();
    expect(container.querySelector("section")).toHaveClass("custom-class");
    expect(container.querySelector("section")?.id).toBe("script-embed");
    expect(
      container.querySelector('[data-testid="script-embed-container"]'),
    ).toHaveClass("embed-class");
  });
});
