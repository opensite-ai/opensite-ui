import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { StrictMode } from "react";
import { createPortal } from "react-dom";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import {
  TripleseatForm,
  __resetTripleseatFormStateForTests,
} from "../tripleseat-form";
import {
  TRIPLESEAT_BODY_MARKER_CLASS,
  __resetTripleseatStyleStateForTests,
} from "../tripleseat-style";
import { __resetScriptLoaderForTests } from "../../../../lib/script-loader";

/**
 * `navigateTo` is the only third-party surface we mock: the assertion we care
 * about is "an internal successRedirectPath becomes an in-app navigation", not
 * jsdom's History implementation. Everything else in this suite drives the real
 * component against a stubbed `ts_script.js`.
 */
const navigateSpy = vi.hoisted(() => vi.fn());

vi.mock("@page-speed/router", async (importOriginal) => {
  const actual = await importOriginal<Record<string, unknown>>();
  return {
    ...actual,
    useNavigation: () => ({
      navigateTo: navigateSpy,
      replace: vi.fn(),
      reload: vi.fn(),
    }),
  };
});

/* -------------------------------------------------------------------------- */
/* Fixtures                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * FAKE credentials, shaped like the real thing (numeric id + 40-char hex key).
 * Every assertion here only checks that the two values round-trip into the
 * script src and the dedupe key, so a live customer's TripleSeat id and public
 * key must never be committed as a fixture — anyone reading this repo could POST
 * leads into that customer's account with them.
 */
const LEAD_FORM_ID = "12345";
const PUBLIC_KEY = "0000000000000000000000000000000000000000";
/** A second, distinct fake form — for the multi-instance cases. */
const SECOND_LEAD_FORM_ID = "67890";
const SECOND_PUBLIC_KEY = "1111111111111111111111111111111111111111";

const REQUIRED_PROPS = {
  leadFormId: LEAD_FORM_ID,
  publicKey: PUBLIC_KEY,
  degradedMessage: "The booking form is unavailable right now.",
  retryLabel: "Try again",
};

/**
 * What `ts_script.js` actually emits: form markup written beside its own script
 * tag, plus a `<script>` for Google reCAPTCHA — all through `document.write`.
 */
const FORM_MARKUP = [
  '<form id="tripleseat_embed_form">',
  "<h2>Event Details</h2>",
  '<input id="dp_lead_event_date" />',
  '<div class="g-recaptcha" data-sitekey="test-site-key"></div>',
  '<div id="lead_form_submit"><button type="submit">Send</button></div>',
  "</form>",
  '<script src="https://www.google.com/recaptcha/api.js"></script>',
].join("");

interface JQueryResult {
  remove: () => void;
  is: (selector: string) => boolean;
  replaceWith: (html: string) => void;
}

interface TestWindow extends Window {
  TS?: {
    jQuery?: (selector: unknown) => JQueryResult;
    lead_form_embed?: { init?: () => void; form_selector?: string };
    custom_success_callback?: (successMessage: string) => void;
  };
  grecaptcha?: {
    render?: (element: Element, params: { sitekey: string | null }) => number;
    reset?: (widgetId?: number) => void;
    __opensiteTripleseatPatched?: boolean;
  };
}

const testWindow = (): TestWindow => window as unknown as TestWindow;

/**
 * The block's page-global state lives on a version-keyed `globalThis` slot (the
 * same pattern the script loader uses) so that every inlined dist copy of the
 * module shares one realm. Tests reach it to prove the anchoring.
 */
interface TripleseatRealmSlot {
  activeCaptchaWidgetId: { current: number | null };
  activeSuccessHandler: { current: ((message: string) => void) | null };
}

const realmSlot = (): TripleseatRealmSlot | undefined =>
  (
    globalThis as {
      __opensiteTripleseatStateV1?: TripleseatRealmSlot;
    }
  ).__opensiteTripleseatStateV1;

const getContainer = (): HTMLElement =>
  screen.getByTestId("tripleseat-container");

const embedScripts = (host: HTMLElement = getContainer()): HTMLScriptElement[] =>
  Array.from(
    host.querySelectorAll<HTMLScriptElement>('script[src*="api.tripleseat.com"]'),
  );

const getEmbedScript = (): HTMLScriptElement => {
  // The newest attempt owns the live write interception, so anything that
  // simulates the vendor executing has to drive the LAST script node.
  const scripts = embedScripts();
  const script = scripts[scripts.length - 1];
  if (!script) throw new Error("embed script was not placed in the container");
  return script;
};

/** Let the macrotask-deferred write-interception release run (a real unmount). */
const flushDeferredRelease = (): void => {
  act(() => {
    vi.advanceTimersByTime(0);
  });
};

const countHeadScripts = (fragment: string): number =>
  document.head.querySelectorAll(`script[src*="${fragment}"]`).length;

/** Simulate ts_script.js: write markup while the interception is armed, then load. */
const runEmbedScript = (markup: string = FORM_MARKUP): void => {
  const script = getEmbedScript();
  document.write(markup);
  fireEvent.load(script);
};

/** Fail the embed script instead of loading it (rejection settles a microtask later). */
const failEmbedScript = async (): Promise<void> => {
  const script = getEmbedScript();
  await act(async () => {
    fireEvent.error(script);
  });
};

const installGrecaptcha = (
  widgetId = 42,
): { render: ReturnType<typeof vi.fn>; reset: ReturnType<typeof vi.fn> } => {
  const renderFn = vi.fn(() => widgetId);
  const resetFn = vi.fn();
  testWindow().grecaptcha = { render: renderFn, reset: resetFn };
  return { render: renderFn, reset: resetFn };
};

/**
 * A vendor stub whose jQuery actually mutates the DOM, so the success callback
 * really does leave `#tsLeadSuccessMessage` behind in the container the way
 * `ts_script.js` does. Needed by anything that asserts on the marker's lifetime.
 */
const installRealisticTripleseatGlobals = (container: HTMLElement): void => {
  testWindow().TS = {
    jQuery: (selector: unknown) => {
      const node =
        typeof selector === "string" ? container.querySelector(selector) : null;
      return {
        remove: () => node?.remove(),
        is: () => true,
        replaceWith: (html: string) => {
          if (!node) return;
          node.insertAdjacentHTML("beforebegin", html);
          node.remove();
        },
      };
    },
    lead_form_embed: { init: vi.fn(), form_selector: "#tripleseat_embed_form" },
  };
};

const styleText = (): string =>
  document.querySelector("style[data-opensite-tripleseat]")?.textContent ?? "";

const installTripleseatGlobals = (): {
  init: ReturnType<typeof vi.fn>;
  replaceWith: ReturnType<typeof vi.fn>;
} => {
  const init = vi.fn();
  const replaceWith = vi.fn();
  testWindow().TS = {
    jQuery: () => ({ remove: vi.fn(), is: () => true, replaceWith }),
    lead_form_embed: { init, form_selector: "#tripleseat_embed_form" },
  };
  return { init, replaceWith };
};

/** Advance the watchdog. Wrapped in act() so React flushes the state it sets. */
const tick = (ms: number): void => {
  act(() => {
    vi.advanceTimersByTime(ms);
  });
};

/** Invoke a callback the vendor holds, flushing the React updates it triggers. */
const asVendor = (fn: () => void): void => {
  act(() => {
    fn();
  });
};

/* -------------------------------------------------------------------------- */

describe("TripleseatForm", () => {
  beforeEach(() => {
    vi.useFakeTimers({
      toFake: [
        "setTimeout",
        "clearTimeout",
        "setInterval",
        "clearInterval",
        "Date",
      ],
    });
    vi.spyOn(console, "info").mockImplementation(() => {});
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
    navigateSpy.mockClear();
    __resetScriptLoaderForTests();
    __resetTripleseatFormStateForTests();
    __resetTripleseatStyleStateForTests();
  });

  afterEach(() => {
    cleanup();
    delete testWindow().TS;
    delete testWindow().grecaptcha;
    document.head
      .querySelectorAll("script")
      .forEach((script) => script.remove());
    document.documentElement.style.removeProperty("--primary");
    document.documentElement.style.removeProperty("--foreground");
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("renders nothing without both credentials", () => {
    const { container } = render(
      <TripleseatForm {...REQUIRED_PROPS} publicKey={undefined} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  /* (a) ------------------------------------------------------------------- */
  it("places the embed script in the container, form markup beside it, and written scripts in head", () => {
    render(<TripleseatForm {...REQUIRED_PROPS} />);

    const script = getEmbedScript();
    expect(script.src).toContain(`lead_form_id=${LEAD_FORM_ID}`);
    expect(script.src).toContain(`public_key=${PUBLIC_KEY}`);

    runEmbedScript();

    // Markup written by the embed lands in the block's container...
    expect(
      getContainer().querySelector("#tripleseat_embed_form"),
    ).not.toBeNull();
    // ...but written <script> nodes are re-created into <head> so they execute.
    expect(countHeadScripts("recaptcha/api.js")).toBe(1);
    expect(
      getContainer().querySelector('script[src*="recaptcha/api.js"]'),
    ).toBeNull();
  });

  /* (b) ------------------------------------------------------------------- */
  it("watchdog re-renders an emptied reCAPTCHA container with its own data-sitekey", () => {
    render(<TripleseatForm {...REQUIRED_PROPS} />);
    runEmbedScript();
    const grecaptcha = installGrecaptcha();

    tick(1000);

    expect(grecaptcha.render).toHaveBeenCalledTimes(1);
    const [element, params] = grecaptcha.render.mock.calls[0] as [
      Element,
      { sitekey: string | null },
    ];
    expect(element).toBe(getContainer().querySelector(".g-recaptcha"));
    expect(params.sitekey).toBe("test-site-key");
  });

  it("watchdog adopts a widget Google already rendered instead of re-rendering", () => {
    render(<TripleseatForm {...REQUIRED_PROPS} />);
    runEmbedScript();
    const grecaptcha = installGrecaptcha();
    const captcha = getContainer().querySelector(".g-recaptcha") as HTMLElement;
    captcha.appendChild(document.createElement("div"));

    tick(3000);

    expect(grecaptcha.render).not.toHaveBeenCalled();
  });

  /* (c) ------------------------------------------------------------------- */
  it("redirects argument-less grecaptcha.reset() to the adopted widget id", () => {
    render(<TripleseatForm {...REQUIRED_PROPS} />);
    runEmbedScript();
    const grecaptcha = installGrecaptcha(7);

    tick(1000);

    testWindow().grecaptcha?.reset?.();
    expect(grecaptcha.reset).toHaveBeenCalledWith(7);

    // An explicit id is still honoured.
    testWindow().grecaptcha?.reset?.(99);
    expect(grecaptcha.reset).toHaveBeenLastCalledWith(99);
  });

  it("patches grecaptcha.reset exactly once (sentinel guarded)", () => {
    render(<TripleseatForm {...REQUIRED_PROPS} />);
    runEmbedScript();
    installGrecaptcha();

    tick(1000);
    const patched = testWindow().grecaptcha?.reset;
    tick(5000);

    expect(testWindow().grecaptcha?.reset).toBe(patched);
    expect(testWindow().grecaptcha?.__opensiteTripleseatPatched).toBe(true);
  });

  /* (d) ------------------------------------------------------------------- */
  it("shows the degraded state after the bounded reCAPTCHA wait and retries the reCAPTCHA script", () => {
    render(
      <TripleseatForm
        {...REQUIRED_PROPS}
        recaptchaTimeoutSeconds={2}
        degradedTitle="Form unavailable"
        contactPhone="(432) 238-6131"
        contactEmail="events@example.com"
      />,
    );
    runEmbedScript();

    // Still inside the window: nothing user-visible yet.
    tick(1000);
    expect(screen.queryByTestId("tripleseat-degraded")).toBeNull();

    tick(2000);

    const degraded = screen.getByTestId("tripleseat-degraded");
    expect(degraded).toBeInTheDocument();
    expect(screen.getByText("Form unavailable")).toBeInTheDocument();
    expect(
      screen.getByText(REQUIRED_PROPS.degradedMessage),
    ).toBeInTheDocument();
    expect(screen.getByText("(432) 238-6131")).toBeInTheDocument();
    expect(screen.getByText("events@example.com")).toBeInTheDocument();
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining("[opensite-tripleseat]"),
    );

    const before = countHeadScripts("recaptcha/api.js");
    fireEvent.click(screen.getByTestId("tripleseat-retry"));

    // Retry re-requests the reCAPTCHA script itself.
    expect(countHeadScripts("recaptcha/api.js")).toBe(before + 1);
    // Review round 2: the panel STAYS. Hiding the business's phone and email
    // behind another full timeout is the lost lead this state exists to
    // prevent, so recovery is announced by the watchdog instead of by
    // optimistically dropping back to "loading".
    expect(screen.getByTestId("tripleseat-degraded")).toBeInTheDocument();
    expect(screen.getByText("(432) 238-6131")).toBeInTheDocument();
    expect(screen.getByTestId("tripleseat-retry")).toBeDisabled();
  });

  it("does not degrade when the form initialises without a captcha", () => {
    render(<TripleseatForm {...REQUIRED_PROPS} recaptchaTimeoutSeconds={2} />);
    runEmbedScript('<form id="tripleseat_embed_form"><input /></form>');
    installTripleseatGlobals();

    tick(5000);

    expect(screen.queryByTestId("tripleseat-degraded")).toBeNull();
  });

  it("degrades when the embed script itself fails to load", async () => {
    render(<TripleseatForm {...REQUIRED_PROPS} />);
    await failEmbedScript();

    expect(screen.getByTestId("tripleseat-degraded")).toBeInTheDocument();
  });

  /* (e) ------------------------------------------------------------------- */
  it("renders the in-place success UI when TripleSeat reports a submission", () => {
    render(
      <TripleseatForm
        {...REQUIRED_PROPS}
        successTitle="Request received"
        successMessage="Our events team will reply shortly."
      />,
    );
    runEmbedScript();
    installTripleseatGlobals();

    tick(1000);
    expect(typeof testWindow().TS?.custom_success_callback).toBe("function");

    asVendor(() =>
      testWindow().TS?.custom_success_callback?.("Thanks from TripleSeat"),
    );

    expect(screen.getByTestId("tripleseat-success")).toBeInTheDocument();
    expect(screen.getByText("Request received")).toBeInTheDocument();
    expect(
      screen.getByText("Our events team will reply shortly."),
    ).toBeInTheDocument();
    // TripleSeat's own message is third-party content but may render.
    expect(screen.getByText("Thanks from TripleSeat")).toBeInTheDocument();
    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it("SPA-navigates to an internal successRedirectPath after the confirmation is shown", () => {
    render(
      <TripleseatForm
        {...REQUIRED_PROPS}
        successRedirectPath="/thank-you"
        successTitle="Request received"
      />,
    );
    runEmbedScript();
    installTripleseatGlobals();
    tick(1000);

    asVendor(() => testWindow().TS?.custom_success_callback?.(""));

    expect(screen.getByTestId("tripleseat-success")).toBeInTheDocument();
    expect(navigateSpy).not.toHaveBeenCalled();

    tick(2000);

    expect(navigateSpy).toHaveBeenCalledWith("/thank-you");
  });

  it("succeeds from the backup marker even if the callback was never installed", () => {
    render(<TripleseatForm {...REQUIRED_PROPS} successTitle="Received" />);
    runEmbedScript();

    const marker = document.createElement("div");
    marker.id = "tsLeadSuccessMessage";
    getContainer().appendChild(marker);

    tick(1000);

    expect(screen.getByTestId("tripleseat-success")).toBeInTheDocument();
  });

  /* (f) ------------------------------------------------------------------- */
  it("emits hsl(var(--x)) on bare-HSL-triplet sites", () => {
    document.documentElement.style.setProperty("--primary", "36 90% 54%");

    render(<TripleseatForm {...REQUIRED_PROPS} />);

    const css =
      document.querySelector("style[data-opensite-tripleseat]")?.textContent ??
      "";
    expect(css).toContain("hsl(var(--primary))");
    expect(css).toContain("color-mix(in srgb, hsl(var(--primary)) 30%");
  });

  it("emits var(--x) on sites whose vars are already complete colours", () => {
    document.documentElement.style.setProperty(
      "--primary",
      "oklch(0.72 0.16 62)",
    );

    render(<TripleseatForm {...REQUIRED_PROPS} />);

    const css =
      document.querySelector("style[data-opensite-tripleseat]")?.textContent ??
      "";
    expect(css).toContain("var(--primary)");
    expect(css).not.toContain("hsl(var(--primary))");
  });

  it("scopes body-portalled jQuery-UI rules behind the body marker", () => {
    render(<TripleseatForm {...REQUIRED_PROPS} />);

    const css =
      document.querySelector("style[data-opensite-tripleseat]")?.textContent ??
      "";
    expect(css).toContain(`body.${TRIPLESEAT_BODY_MARKER_CLASS} #ui-datepicker-div`);
    expect(css).toContain(`body.${TRIPLESEAT_BODY_MARKER_CLASS} div.timeselect`);
    // The select indicator must not bake a colour into a data URI.
    expect(css).not.toContain("data:image/svg+xml");
    expect(css).toContain("currentColor");
    // iOS zoom guard.
    expect(css).toContain("font-size: 16px !important");
  });

  /* (g) ------------------------------------------------------------------- */
  it("clears the watchdog and the body marker on unmount", () => {
    const { unmount } = render(<TripleseatForm {...REQUIRED_PROPS} />);
    runEmbedScript();

    expect(
      document.body.classList.contains(TRIPLESEAT_BODY_MARKER_CLASS),
    ).toBe(true);
    expect(vi.getTimerCount()).toBeGreaterThan(0);

    unmount();
    // The one timer a real unmount leaves behind is the macrotask-deferred
    // write-interception release (StrictMode's cleanup+re-setup cancels it).
    flushDeferredRelease();

    expect(
      document.body.classList.contains(TRIPLESEAT_BODY_MARKER_CLASS),
    ).toBe(false);
    expect(vi.getTimerCount()).toBe(0);
    expect(document.querySelector("style[data-opensite-tripleseat]")).toBeNull();
  });

  it("keeps the body marker while another instance is still mounted", () => {
    const first = render(<TripleseatForm {...REQUIRED_PROPS} />);
    render(<TripleseatForm {...REQUIRED_PROPS} sectionId="second" />);

    first.unmount();

    expect(
      document.body.classList.contains(TRIPLESEAT_BODY_MARKER_CLASS),
    ).toBe(true);
  });

  /* (h) ------------------------------------------------------------------- */
  it("is idempotent across a remount: one script, form DOM re-attached", () => {
    const first = render(<TripleseatForm {...REQUIRED_PROPS} />);
    runEmbedScript();
    expect(
      getContainer().querySelector("#tripleseat_embed_form"),
    ).not.toBeNull();

    first.unmount();
    render(<TripleseatForm {...REQUIRED_PROPS} />);

    expect(
      document.querySelectorAll('script[src*="api.tripleseat.com"]'),
    ).toHaveLength(1);
    expect(
      getContainer().querySelector("#tripleseat_embed_form"),
    ).not.toBeNull();
  });

  it("re-initialises detached form bindings when the datepicker is gone", () => {
    render(<TripleseatForm {...REQUIRED_PROPS} />);
    runEmbedScript();

    const init = vi.fn();
    testWindow().TS = {
      jQuery: () => ({ remove: vi.fn(), is: () => false, replaceWith: vi.fn() }),
      lead_form_embed: { init, form_selector: "#tripleseat_embed_form" },
    };

    tick(1000);

    expect(init).toHaveBeenCalled();
  });

  /* -- Review round 1 ------------------------------------------------------ */

  /* R1-1 (P1, security): successRedirectPath must never reach a location sink. */
  it.each([
    ["a javascript: payload", "javascript:fetch('https://attacker.example')"],
    ["an external https URL", "https://attacker.example/thanks"],
    ["a protocol-relative host", "//attacker.example/thanks"],
    ["a backslash-normalized host", "/\\attacker.example/thanks"],
    // R2-4: the URL parser strips ASCII tab/LF/CR BEFORE parsing, so each of
    // these resolves to a protocol-relative host.
    ["a tab-split protocol-relative host", "/\t/attacker.example/thanks"],
    ["a newline-split protocol-relative host", "/\n/attacker.example/thanks"],
    ["a carriage-return-split host", "/\r/attacker.example/thanks"],
    ["a tab-split backslash host", "/\t\\attacker.example/thanks"],
  ])(
    "refuses %s as successRedirectPath and stays on the in-place confirmation",
    (_label, target) => {
      const hrefBefore = window.location.href;

      render(
        <TripleseatForm
          {...REQUIRED_PROPS}
          successRedirectPath={target}
          successTitle="Request received"
        />,
      );
      runEmbedScript();
      installTripleseatGlobals();
      tick(1000);

      asVendor(() => testWindow().TS?.custom_success_callback?.(""));
      tick(5000);

      expect(navigateSpy).not.toHaveBeenCalled();
      expect(window.location.href).toBe(hrefBefore);
      expect(screen.getByTestId("tripleseat-success")).toBeInTheDocument();
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining("ignoring non-internal successRedirectPath"),
      );
    },
  );

  /* R1-2 (P1): the per-site stylesheet is async — branding must self-heal. */
  it("emits var() references before the site stylesheet lands and re-derives once it does", () => {
    render(<TripleseatForm {...REQUIRED_PROPS} />);

    // Nothing resolved at mount: the reference survives, the literal is only an
    // in-CSS fallback (a baked literal could never recover).
    expect(styleText()).toContain("var(--primary, canvastext)");
    expect(styleText()).not.toContain("hsl(var(--primary))");

    // The per-site bundle lands after mount, on the bare-HSL-triplet vintage.
    document.documentElement.style.setProperty("--primary", "36 90% 54%");
    tick(1000);

    expect(styleText()).toContain("hsl(var(--primary))");
    expect(styleText()).not.toContain("var(--primary, canvastext)");
  });

  it("re-derives branding on the site's stylesheet-readiness event", () => {
    render(<TripleseatForm {...REQUIRED_PROPS} />);
    expect(styleText()).toContain("var(--primary, canvastext)");

    document.documentElement.style.setProperty("--primary", "oklch(0.72 0.16 62)");
    act(() => {
      document.dispatchEvent(new Event("dashtrack:tailwindInlineReady"));
    });

    expect(styleText()).toContain("var(--primary)");
    expect(styleText()).not.toContain("var(--primary, canvastext)");
  });

  /* R1-3 (P1): a submitted form must not resurrect as a success state. */
  it("does not re-enter success on a remount after a submission", () => {
    const first = render(
      <TripleseatForm
        {...REQUIRED_PROPS}
        successRedirectPath="/thank-you"
        successTitle="Request received"
      />,
    );
    runEmbedScript();
    installRealisticTripleseatGlobals(getContainer());
    tick(1000);

    asVendor(() => testWindow().TS?.custom_success_callback?.(""));
    expect(screen.getByTestId("tripleseat-success")).toBeInTheDocument();
    expect(getContainer().querySelector("#tsLeadSuccessMessage")).not.toBeNull();

    first.unmount();
    navigateSpy.mockClear();
    render(
      <TripleseatForm
        {...REQUIRED_PROPS}
        successRedirectPath="/thank-you"
        successTitle="Request received"
      />,
    );
    tick(3000);

    expect(screen.queryByTestId("tripleseat-success")).toBeNull();
    expect(getContainer().querySelector("#tsLeadSuccessMessage")).toBeNull();
    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it("does not let one block's success marker put another block into success", () => {
    render(
      <>
        <TripleseatForm {...REQUIRED_PROPS} successTitle="Request received" />
        <TripleseatForm
          {...REQUIRED_PROPS}
          leadFormId={SECOND_LEAD_FORM_ID}
          publicKey={SECOND_PUBLIC_KEY}
          sectionId="second"
          successTitle="Request received"
        />
      </>,
    );

    const [firstContainer] = screen.getAllByTestId("tripleseat-container");
    const marker = document.createElement("div");
    marker.id = "tsLeadSuccessMessage";
    firstContainer.appendChild(marker);

    tick(1000);

    expect(screen.getAllByTestId("tripleseat-success")).toHaveLength(1);
  });

  /* R1-4 (P2): the block operates on the document it was rendered into. */
  it("marks the document it is portalled into, not the host page", () => {
    const frame = document.createElement("iframe");
    document.body.appendChild(frame);
    const frameDocument = frame.contentDocument as Document;
    const frameRoot = frameDocument.createElement("div");
    frameDocument.body.appendChild(frameRoot);

    render(<>{createPortal(<TripleseatForm {...REQUIRED_PROPS} />, frameRoot)}</>);

    expect(
      frameDocument.body.classList.contains(TRIPLESEAT_BODY_MARKER_CLASS),
    ).toBe(true);
    expect(
      document.body.classList.contains(TRIPLESEAT_BODY_MARKER_CLASS),
    ).toBe(false);

    cleanup();
    frame.remove();
  });

  /* R1-5 (P2): the page-global reset patch needs a page-global widget id. */
  it("routes an argument-less grecaptcha.reset to the newest widget across instances", () => {
    render(
      <>
        <TripleseatForm {...REQUIRED_PROPS} />
        <TripleseatForm
          {...REQUIRED_PROPS}
          leadFormId={SECOND_LEAD_FORM_ID}
          publicKey={SECOND_PUBLIC_KEY}
          sectionId="second"
        />
      </>,
    );

    for (const container of screen.getAllByTestId("tripleseat-container")) {
      const captcha = document.createElement("div");
      captcha.className = "g-recaptcha";
      captcha.setAttribute("data-sitekey", "test-site-key");
      container.appendChild(captcha);
    }

    let nextWidgetId = 1;
    const resetFn = vi.fn();
    testWindow().grecaptcha = {
      render: vi.fn(() => nextWidgetId++),
      reset: resetFn,
    };

    tick(1000);

    // Both instances rendered a widget; the patch belongs to the page, so it
    // must resolve to the widget that is actually live (the second one).
    testWindow().grecaptcha?.reset?.();
    expect(resetFn).toHaveBeenCalledWith(2);
  });

  /* R1-6 (P3): degraded must not stack on a dead form or reserve blank space. */
  it("drops the reserved height and inerts the container while degraded", () => {
    render(<TripleseatForm {...REQUIRED_PROPS} recaptchaTimeoutSeconds={2} />);
    runEmbedScript();

    tick(3000);

    expect(screen.getByTestId("tripleseat-degraded")).toBeInTheDocument();
    expect(getContainer().style.minHeight).toBe("");
    expect(getContainer().hasAttribute("inert")).toBe(true);
  });

  /* R1-7 (P3): an embed that never settles is a script failure, not a captcha one. */
  it("classifies a stalled embed script as a script failure and does not re-request api.js", () => {
    render(<TripleseatForm {...REQUIRED_PROPS} recaptchaTimeoutSeconds={2} />);
    // The embed script neither loads nor errors — it just never settles.

    tick(3000);
    expect(screen.getByTestId("tripleseat-degraded")).toBeInTheDocument();

    const before = countHeadScripts("recaptcha/api.js");
    fireEvent.click(screen.getByTestId("tripleseat-retry"));

    expect(countHeadScripts("recaptcha/api.js")).toBe(before);
  });

  /* R1-8 (P3): StrictMode double-mount is what the dedupe/parking design is for. */
  it("survives a StrictMode double-mount: one script, one form", () => {
    render(
      <StrictMode>
        <TripleseatForm {...REQUIRED_PROPS} />
      </StrictMode>,
    );
    runEmbedScript();

    expect(
      document.querySelectorAll('script[src*="api.tripleseat.com"]'),
    ).toHaveLength(1);
    expect(document.querySelectorAll("#tripleseat_embed_form")).toHaveLength(1);
    expect(
      document.body.classList.contains(TRIPLESEAT_BODY_MARKER_CLASS),
    ).toBe(true);
  });

  /* R1-9 (P3): a vendor-owned sentinel that never latches must not loop forever. */
  it("bounds the form-binding repair when jQuery-UI never claims the date input", () => {
    render(<TripleseatForm {...REQUIRED_PROPS} />);
    runEmbedScript();

    const init = vi.fn();
    testWindow().TS = {
      jQuery: () => ({ remove: vi.fn(), is: () => false, replaceWith: vi.fn() }),
      lead_form_embed: { init, form_selector: "#tripleseat_embed_form" },
    };

    tick(30000);

    expect(init.mock.calls.length).toBeLessThanOrEqual(5);
    expect(init).toHaveBeenCalled();
  });

  it("still evaluates the degraded deadline when a repair throws every tick", () => {
    render(<TripleseatForm {...REQUIRED_PROPS} recaptchaTimeoutSeconds={2} />);
    runEmbedScript();

    testWindow().TS = {
      jQuery: () => ({
        remove: vi.fn(),
        is: () => false,
        replaceWith: vi.fn(),
      }),
      lead_form_embed: {
        init: () => {
          throw new Error("jQuery-UI datepicker plugin is missing");
        },
        form_selector: "#tripleseat_embed_form",
      },
    };

    tick(3000);

    expect(screen.getByTestId("tripleseat-degraded")).toBeInTheDocument();
  });

  /* -- Review round 2 ------------------------------------------------------ */

  /* R2-1 (P2, contract §5): unmount must restore document.write. */
  it("releases the document.write interception when it unmounts mid-load", () => {
    const originalWrite = document.write;

    const { unmount } = render(<TripleseatForm {...REQUIRED_PROPS} />);
    // The embed neither loads nor errors: the patch is live and bound to a
    // container React is about to detach.
    expect(document.write).not.toBe(originalWrite);

    unmount();
    flushDeferredRelease();

    expect(document.write).toBe(originalWrite);
  });

  /* R2-1b (P2): a remount after a mid-load unmount must own the write target. */
  it("re-arms the embed for the new container when a remount follows a mid-load unmount", () => {
    const first = render(<TripleseatForm {...REQUIRED_PROPS} />);
    expect(embedScripts()).toHaveLength(1);

    // Unmount while the request is still in flight, then come back (SPA nav).
    first.unmount();
    flushDeferredRelease();
    render(<TripleseatForm {...REQUIRED_PROPS} />);

    // The parked (abandoned) script came back with the form DOM, and a fresh
    // attempt was issued — the loader would otherwise hand back the pending
    // promise, arming nothing and leaving this container empty forever.
    expect(embedScripts()).toHaveLength(2);

    // The fresh attempt owns the write target: the vendor's markup lands HERE.
    act(() => {
      document.write(FORM_MARKUP);
    });
    expect(
      getContainer().querySelector("#tripleseat_embed_form"),
    ).not.toBeNull();
  });

  /* R2-2 (P2): the vendor's page-global callback must reach the LIVE instance. */
  it("dispatches the vendor success callback to the live instance after a remount", () => {
    const first = render(
      <TripleseatForm
        {...REQUIRED_PROPS}
        successRedirectPath="/thank-you"
        successTitle="Request received"
      />,
    );
    runEmbedScript();
    installTripleseatGlobals();
    tick(1000);
    expect(typeof testWindow().TS?.custom_success_callback).toBe("function");

    first.unmount();
    flushDeferredRelease();
    navigateSpy.mockClear();

    render(
      <TripleseatForm
        {...REQUIRED_PROPS}
        successRedirectPath="/thank-you"
        successTitle="Request received"
      />,
    );
    tick(1000);

    // The callback is installed once per page and still holds the closure the
    // FIRST instance installed; it must dispatch to whoever is mounted now.
    asVendor(() =>
      testWindow().TS?.custom_success_callback?.("Thanks from TripleSeat"),
    );

    expect(screen.getByTestId("tripleseat-success")).toBeInTheDocument();
    expect(screen.getByText("Thanks from TripleSeat")).toBeInTheDocument();

    tick(5000);

    // Exactly one navigation: the dead instance cannot schedule a second,
    // uncancellable one behind the live instance's back.
    expect(navigateSpy).toHaveBeenCalledTimes(1);
    expect(navigateSpy).toHaveBeenCalledWith("/thank-you");
  });

  it("ignores a vendor success callback fired after the last instance unmounted", () => {
    const view = render(
      <TripleseatForm
        {...REQUIRED_PROPS}
        successRedirectPath="/thank-you"
        successTitle="Request received"
      />,
    );
    runEmbedScript();
    installTripleseatGlobals();
    tick(1000);

    view.unmount();
    flushDeferredRelease();
    navigateSpy.mockClear();

    asVendor(() => testWindow().TS?.custom_success_callback?.(""));
    tick(5000);

    expect(navigateSpy).not.toHaveBeenCalled();
  });

  /* R2-3 (P2): the retry must actually re-attempt, and must not hide contacts. */
  it("re-requests a stalled embed on retry and keeps the fallback contacts visible", () => {
    render(
      <TripleseatForm
        {...REQUIRED_PROPS}
        recaptchaTimeoutSeconds={2}
        contactPhone="(432) 238-6131"
        contactEmail="events@example.com"
      />,
    );
    // The embed script neither loads nor errors — it just never settles.
    tick(3000);
    expect(screen.getByTestId("tripleseat-degraded")).toBeInTheDocument();

    const apiBefore = countHeadScripts("recaptcha/api.js");
    fireEvent.click(screen.getByTestId("tripleseat-retry"));

    // A fresh dedupe key, so the request is genuinely re-issued...
    expect(embedScripts()).toHaveLength(2);
    // ...api.js is still not re-requested (a stalled embed is not a captcha
    // failure)...
    expect(countHeadScripts("recaptcha/api.js")).toBe(apiBefore);
    // ...and the contact details stay on screen for the whole attempt.
    expect(screen.getByTestId("tripleseat-degraded")).toBeInTheDocument();
    expect(screen.getByText("(432) 238-6131")).toBeInTheDocument();
    expect(screen.getByText("events@example.com")).toBeInTheDocument();
    expect(screen.getByTestId("tripleseat-retry")).toBeDisabled();

    // The retry attempt owns the write target, so a vendor that finally answers
    // recovers the block.
    const retryScript = getEmbedScript();
    act(() => {
      document.write('<form id="tripleseat_embed_form"><input /></form>');
      fireEvent.load(retryScript);
    });
    installTripleseatGlobals();
    tick(1000);

    expect(screen.queryByTestId("tripleseat-degraded")).toBeNull();
  });

  it("re-enables the retry affordance when the re-attempt runs out its window", () => {
    render(<TripleseatForm {...REQUIRED_PROPS} recaptchaTimeoutSeconds={2} />);
    tick(3000);

    fireEvent.click(screen.getByTestId("tripleseat-retry"));
    expect(screen.getByTestId("tripleseat-retry")).toBeDisabled();

    tick(3000);

    expect(screen.getByTestId("tripleseat-degraded")).toBeInTheDocument();
    expect(screen.getByTestId("tripleseat-retry")).toBeEnabled();
  });

  /* R2-5 (P3): page-global state must be realm-global, not per dist bundle. */
  it("anchors its page-global state on a version-keyed globalThis slot", () => {
    render(<TripleseatForm {...REQUIRED_PROPS} />);
    runEmbedScript();
    const grecaptcha = installGrecaptcha(11);

    tick(1000);

    expect(realmSlot()?.activeCaptchaWidgetId.current).toBe(11);

    // tsup builds with `splitting: false`, so a host that imports both the
    // registry and the subpath gets two inlined copies of this module. The
    // reset patch is installed by whichever copy wins the race, so it has to
    // read the widget id through the shared slot, not a private module box.
    const slot = realmSlot();
    if (!slot) throw new Error("realm slot was never created");
    slot.activeCaptchaWidgetId.current = 99;

    testWindow().grecaptcha?.reset?.();

    expect(grecaptcha.reset).toHaveBeenLastCalledWith(99);
  });

  /* R2-6 (P3): the binding probe is container-scoped like the success probe. */
  it("does not re-initialise a neighbouring block's form bindings", () => {
    render(
      <>
        <TripleseatForm {...REQUIRED_PROPS} />
        <TripleseatForm
          {...REQUIRED_PROPS}
          leadFormId={SECOND_LEAD_FORM_ID}
          publicKey={SECOND_PUBLIC_KEY}
          sectionId="second"
        />
      </>,
    );

    // Only the FIRST block's container has the vendor's (global-id) date input.
    const [firstContainer] = screen.getAllByTestId("tripleseat-container");
    const dateInput = document.createElement("input");
    dateInput.id = "dp_lead_event_date";
    firstContainer.appendChild(dateInput);

    const init = vi.fn();
    testWindow().TS = {
      jQuery: () => ({ remove: vi.fn(), is: () => false, replaceWith: vi.fn() }),
      lead_form_embed: { init, form_selector: "#tripleseat_embed_form" },
    };

    tick(1000);

    // The empty neighbour must not burn its own repair budget re-binding a form
    // it does not own.
    expect(init).toHaveBeenCalledTimes(1);
  });
});
