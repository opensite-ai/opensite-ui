import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FreeFormDesign } from "../free-form-design";
import {
  FREE_FORM_MAX_DEPTH,
  FREE_FORM_MAX_NODES,
  collectFreeFormClassNames,
  filterFreeFormAttrs,
  isAbsoluteHttpsUrl,
  renderFreeFormTree,
  sanitizeFreeFormUrl,
  type FreeFormNode,
} from "../../../../lib/free-form-tree";

vi.mock("@page-speed/img", () => ({
  Img: ({
    src,
    alt,
    className,
  }: {
    src: string;
    alt?: string;
    className?: string;
  }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

// `poster` is forwarded on purpose: without it the poster-drop guard is
// structurally unobservable in the DOM and its test cannot fail.
vi.mock("@page-speed/video", () => ({
  Video: ({
    src,
    poster,
    className,
  }: {
    src: string;
    poster?: string;
    className?: string;
  }) => (
    <video
      src={src}
      poster={poster}
      className={className}
      data-testid="mock-video"
    />
  ),
}));

/** Builds a linear chain of nested divs `depth` levels deep with a text leaf. */
const nest = (depth: number, leaf = "deep-leaf"): FreeFormNode => {
  let node: FreeFormNode = { tag: "div", children: [leaf] };
  for (let i = 0; i < depth; i += 1) {
    node = { tag: "div", children: [node] };
  }
  return node;
};

describe("FreeFormDesign", () => {
  let warnSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    warnSpy.mockRestore();
    vi.clearAllMocks();
  });

  /* ------------------------------------------------------------------ */
  /* Tag allowlist                                                       */
  /* ------------------------------------------------------------------ */

  describe("tag allowlist", () => {
    it("renders allowlisted HTML structure with text children", () => {
      const { container } = render(
        <FreeFormDesign
          designTree={{
            tag: "div",
            className: "grid gap-4",
            children: [
              { tag: "h2", className: "text-4xl", children: ["Custom heading"] },
              { tag: "p", children: ["Custom body copy"] },
              {
                tag: "ul",
                children: [{ tag: "li", children: ["One"] }],
              },
            ],
          }}
        />,
      );

      expect(screen.getByText("Custom heading").tagName).toBe("H2");
      expect(screen.getByText("Custom body copy").tagName).toBe("P");
      expect(container.querySelector("ul > li")?.textContent).toBe("One");
      expect(container.querySelector("div.grid.gap-4")).not.toBeNull();
    });

    it("renders the allowlisted decorative SVG subset with camelCase tags", () => {
      const { container } = render(
        <FreeFormDesign
          designTree={{
            tag: "svg",
            attrs: { viewBox: "0 0 10 10", "aria-hidden": true },
            children: [
              {
                tag: "defs",
                children: [
                  {
                    tag: "linearGradient",
                    attrs: { id: "g1" },
                    children: [{ tag: "stop", attrs: { offset: "0%" } }],
                  },
                ],
              },
              { tag: "path", attrs: { d: "M0 0 L10 10" } },
            ],
          }}
        />,
      );

      expect(container.querySelector("svg")).not.toBeNull();
      expect(container.querySelector("linearGradient")).not.toBeNull();
      expect(container.querySelector("path")?.getAttribute("d")).toBe(
        "M0 0 L10 10",
      );
    });

    it("drops script/style/iframe nodes entirely, including their children", () => {
      const { container } = render(
        <FreeFormDesign
          designTree={{
            tag: "div",
            children: [
              { tag: "script", children: ["alert('xss')"] },
              { tag: "style", children: [".x{color:red}"] },
              { tag: "iframe", attrs: { src: "https://evil.example.com" } },
              { tag: "p", children: ["survivor"] },
            ],
          }}
        />,
      );

      expect(container.querySelector("script")).toBeNull();
      expect(container.querySelector("style")).toBeNull();
      expect(container.querySelector("iframe")).toBeNull();
      expect(container.textContent).not.toContain("alert('xss')");
      expect(container.textContent).not.toContain("color:red");
      expect(screen.getByText("survivor")).toBeInTheDocument();
    });

    it("degrades an unknown tag to <div> and preserves its children", () => {
      const { container } = render(
        <FreeFormDesign
          designTree={{
            tag: "marquee-thing",
            className: "kept-class",
            children: [{ tag: "span", children: ["still here"] }],
          }}
        />,
      );

      const degraded = container.querySelector("div.kept-class");
      expect(degraded).not.toBeNull();
      expect(degraded?.tagName).toBe("DIV");
      expect(screen.getByText("still here")).toBeInTheDocument();
    });

    it("degrades raw a/img/video tags to <div> (they must use the components)", () => {
      const { container } = render(
        <FreeFormDesign
          designTree={{
            tag: "div",
            children: [
              {
                tag: "a",
                attrs: { href: "https://example.com" },
                children: ["raw link"],
              },
              { tag: "img", attrs: { src: "https://cdn.ing/a.jpg" } },
              { tag: "video", attrs: { src: "https://cdn.ing/a.mp4" } },
            ],
          }}
        />,
      );

      expect(container.querySelector("a")).toBeNull();
      expect(container.querySelector("img")).toBeNull();
      expect(container.querySelector("video")).toBeNull();
      // children survive the degrade
      expect(screen.getByText("raw link")).toBeInTheDocument();
    });

    it("never renders children for void elements", () => {
      const { container } = render(
        <FreeFormDesign
          designTree={{
            tag: "div",
            children: [{ tag: "br", children: ["nope"] as never }],
          }}
        />,
      );
      expect(container.querySelector("br")).not.toBeNull();
      expect(container.textContent).not.toContain("nope");
    });
  });

  /* ------------------------------------------------------------------ */
  /* Attribute filtering                                                 */
  /* ------------------------------------------------------------------ */

  describe("attribute filtering", () => {
    it("drops every on* handler attribute before it ever reaches React", () => {
      // Asserted at the FILTER boundary, not just the DOM: react-dom independently
      // refuses string-valued `on*` props, so a DOM-only assertion would still pass
      // with the guard removed. This one fails the moment the guard is gone.
      expect(
        filterFreeFormAttrs({
          onclick: "alert(1)",
          onClick: "alert(2)",
          ONERROR: "alert(3)",
          onmouseover: "alert(4)",
          onFocus: "alert(5)",
          id: "kept",
        }),
      ).toEqual({ id: "kept" });

      const { container } = render(
        <FreeFormDesign
          designTree={{
            tag: "div",
            attrs: {
              onclick: "alert(1)",
              onClick: "alert(2)",
              ONERROR: "alert(3)",
              onmouseover: "alert(4)",
              id: "kept",
            },
          }}
        />,
      );

      const el = container.querySelector("#kept") as HTMLElement;
      expect(el).not.toBeNull();
      const names = Array.from(el.attributes).map((a) => a.name.toLowerCase());
      expect(names.filter((n) => n.startsWith("on"))).toEqual([]);
      expect(el.outerHTML).not.toContain("alert(");
    });

    it("drops javascript:, data: and vbscript: URLs from href-ish attrs", () => {
      const { container } = render(
        <FreeFormDesign
          designTree={{
            tag: "div",
            children: [
              {
                tag: "Pressable",
                attrs: { href: "javascript:alert(1)" },
                children: ["js link"],
              },
              {
                tag: "Pressable",
                attrs: { href: "data:text/html;base64,PHN2Zz4=" },
                children: ["data link"],
              },
              {
                tag: "Pressable",
                attrs: { href: "vbscript:msgbox(1)" },
                children: ["vb link"],
              },
            ],
          }}
        />,
      );

      const anchors = Array.from(container.querySelectorAll("[href]"));
      expect(anchors).toEqual([]);
      expect(container.innerHTML).not.toContain("javascript:");
      expect(container.innerHTML).not.toContain("data:text/html");
      expect(container.innerHTML).not.toContain("vbscript:");
    });

    it("rejects control-character-obfuscated javascript URLs", () => {
      expect(sanitizeFreeFormUrl("java\tscript:alert(1)")).toBeNull();
      expect(sanitizeFreeFormUrl("JAVA\nSCRIPT:alert(1)")).toBeNull();
      expect(sanitizeFreeFormUrl(" javascript:alert(1)")).toBeNull();
      expect(sanitizeFreeFormUrl("https://example.com/x")).toBe(
        "https://example.com/x",
      );
      expect(sanitizeFreeFormUrl("/about")).toBe("/about");
      expect(sanitizeFreeFormUrl("#anchor")).toBe("#anchor");
      expect(sanitizeFreeFormUrl("mailto:a@b.com")).toBe("mailto:a@b.com");
    });

    it("drops the style attribute so the class manifest stays complete", () => {
      const { container } = render(
        <FreeFormDesign
          designTree={{
            tag: "div",
            attrs: { style: "background:url(javascript:alert(1))", id: "s" },
          }}
        />,
      );
      expect(container.querySelector("#s")?.getAttribute("style")).toBeNull();
    });

    it("never honors dangerouslySetInnerHTML or any object-valued attribute", () => {
      const attrs = {
        dangerouslySetInnerHTML: { __html: "<img src=x onerror=alert(1)>" },
        innerHTML: "<b>nope</b>",
        someObject: { a: 1 },
      } as unknown as Record<string, string>;

      const { container } = render(
        <FreeFormDesign designTree={{ tag: "div", attrs }} />,
      );

      expect(container.querySelector("img")).toBeNull();
      expect(container.innerHTML).not.toContain("onerror");
      expect(container.innerHTML).not.toContain("<b>nope</b>");
      expect(filterFreeFormAttrs(attrs)).toEqual({});
    });

    it("keeps safe attributes, aria-*/data-*, and maps HTML names to React props", () => {
      expect(
        filterFreeFormAttrs({
          id: "x",
          "aria-label": "Label",
          "data-foo": "bar",
          tabindex: 0,
          colspan: 2,
          for: "field",
          role: "note",
        }),
      ).toEqual({
        id: "x",
        "aria-label": "Label",
        "data-foo": "bar",
        tabIndex: 0,
        colSpan: 2,
        htmlFor: "field",
        role: "note",
      });
    });

    it("drops class/className from attrs so node.className stays the only source", () => {
      expect(
        filterFreeFormAttrs({ class: "sneaky", className: "sneaky2" }),
      ).toEqual({});
    });
  });

  /* ------------------------------------------------------------------ */
  /* Component nodes                                                     */
  /* ------------------------------------------------------------------ */

  describe("component nodes", () => {
    it("renders a Pressable node with href, variant and aria-label", () => {
      const { container } = render(
        <FreeFormDesign
          designTree={{
            tag: "Pressable",
            className: "inline-flex",
            attrs: {
              href: "https://example.com/book",
              variant: "default",
              size: "lg",
              "aria-label": "Book a table",
            },
            children: ["Book now"],
          }}
        />,
      );

      const link = container.querySelector('a[href="https://example.com/book"]');
      expect(link).not.toBeNull();
      expect(link?.getAttribute("aria-label")).toBe("Book a table");
      expect(link?.textContent).toContain("Book now");
    });

    it("renders an Img node with an absolute https src", () => {
      render(
        <FreeFormDesign
          designTree={{
            tag: "Img",
            className: "w-full",
            attrs: {
              src: "https://cdn.ing/assets/i/r/1/x/photo.webp",
              alt: "Dining room",
            },
          }}
        />,
      );

      const img = screen.getByTestId("mock-img");
      expect(img).toHaveAttribute(
        "src",
        "https://cdn.ing/assets/i/r/1/x/photo.webp",
      );
      expect(img).toHaveAttribute("alt", "Dining room");
      expect(img).toHaveClass("w-full");
    });

    it("drops Img/Video nodes whose src is not an absolute https URL", () => {
      render(
        <FreeFormDesign
          designTree={{
            tag: "div",
            children: [
              { tag: "Img", attrs: { src: "/local/photo.webp" } },
              { tag: "Img", attrs: { src: "http://cdn.ing/photo.webp" } },
              { tag: "Img", attrs: {} },
              { tag: "Video", attrs: { src: "clip.mp4" } },
            ],
          }}
        />,
      );

      expect(screen.queryAllByTestId("mock-img")).toHaveLength(0);
      expect(screen.queryAllByTestId("mock-video")).toHaveLength(0);
      expect(isAbsoluteHttpsUrl("https://cdn.ing/a.mp4")).toBe(true);
      expect(isAbsoluteHttpsUrl("http://cdn.ing/a.mp4")).toBe(false);
    });

    it("renders a Video node and drops a non-https poster", () => {
      // Asserted at the RENDER boundary as well as the DOM: the props the block
      // hands to <Video> are the real contract surface (mirrors the on*-handler
      // test above, which exists because DOM-only assertions were unfalsifiable).
      const videoProps = (poster: string): Record<string, unknown> => {
        const { content } = renderFreeFormTree({
          tag: "Video",
          attrs: { src: "https://cdn.ing/assets/v/clip.mp4", poster },
        });
        return (content as unknown as { props: Record<string, unknown> }).props;
      };

      expect(videoProps("/relative-poster.jpg").poster).toBeUndefined();
      expect(videoProps("poster.jpg").poster).toBeUndefined();
      expect(videoProps("http://cdn.ing/poster.jpg").poster).toBeUndefined();
      // …while the node itself still renders, and an https poster survives.
      expect(videoProps("/relative-poster.jpg").src).toBe(
        "https://cdn.ing/assets/v/clip.mp4",
      );
      expect(videoProps("https://cdn.ing/assets/v/poster.jpg").poster).toBe(
        "https://cdn.ing/assets/v/poster.jpg",
      );

      const { rerender } = render(
        <FreeFormDesign
          designTree={{
            tag: "Video",
            attrs: {
              src: "https://cdn.ing/assets/v/clip.mp4",
              poster: "/relative-poster.jpg",
            },
          }}
        />,
      );

      const video = screen.getByTestId("mock-video");
      expect(video).toHaveAttribute("src", "https://cdn.ing/assets/v/clip.mp4");
      expect(video).not.toHaveAttribute("poster");

      rerender(
        <FreeFormDesign
          designTree={{
            tag: "Video",
            attrs: {
              src: "https://cdn.ing/assets/v/clip.mp4",
              poster: "https://cdn.ing/assets/v/poster.jpg",
            },
          }}
        />,
      );
      expect(screen.getByTestId("mock-video")).toHaveAttribute(
        "poster",
        "https://cdn.ing/assets/v/poster.jpg",
      );
    });
  });

  /* ------------------------------------------------------------------ */
  /* Text nodes                                                          */
  /* ------------------------------------------------------------------ */

  describe("string children", () => {
    it("renders markup-looking strings as literal escaped text, never as elements", () => {
      const { container } = render(
        <FreeFormDesign
          designTree={{
            tag: "p",
            children: ["<b>bold?</b> <img src=x onerror=alert(1)>"],
          }}
        />,
      );

      expect(container.querySelector("b")).toBeNull();
      expect(container.querySelector("img")).toBeNull();
      expect(container.textContent).toContain(
        "<b>bold?</b> <img src=x onerror=alert(1)>",
      );
    });

    it("renders numeric children and skips empty strings", () => {
      const { container } = render(
        <FreeFormDesign
          designTree={{
            tag: "p",
            children: ["", 42 as unknown as string, " units"],
          }}
        />,
      );
      expect(container.querySelector("p")?.textContent).toBe("42 units");
    });
  });

  /* ------------------------------------------------------------------ */
  /* Caps                                                                */
  /* ------------------------------------------------------------------ */

  describe("depth and node caps", () => {
    it("stops descending past the depth cap and reports truncation", () => {
      const result = renderFreeFormTree(nest(FREE_FORM_MAX_DEPTH + 10));
      expect(result.truncated).toBe(true);

      const { container } = render(
        <FreeFormDesign designTree={nest(FREE_FORM_MAX_DEPTH + 10)} />,
      );
      expect(container.textContent).not.toContain("deep-leaf");
      expect(container.querySelector("section")).toHaveAttribute(
        "data-free-form-truncated",
        "true",
      );
    });

    it("renders a tree just inside the depth cap intact", () => {
      const result = renderFreeFormTree(nest(FREE_FORM_MAX_DEPTH - 2));
      expect(result.truncated).toBe(false);
      const { container } = render(
        <FreeFormDesign designTree={nest(FREE_FORM_MAX_DEPTH - 2)} />,
      );
      expect(container.textContent).toContain("deep-leaf");
    });

    it("pins the depth boundary: exactly MAX_DEPTH levels render, MAX_DEPTH+1 is cut", () => {
      // `nest(n)` produces n+1 nested elements, i.e. n+1 LEVELS. The published
      // contract is "capped at FREE_FORM_MAX_DEPTH levels", so the last tree that
      // renders whole is nest(MAX_DEPTH - 1) and the first that is cut is
      // nest(MAX_DEPTH). Pinned in both directions so the cap can only move
      // deliberately (an off-by-one in either direction fails here).
      const atCap = renderFreeFormTree(nest(FREE_FORM_MAX_DEPTH - 1));
      expect(atCap.truncated).toBe(false);
      expect(atCap.nodeCount).toBe(FREE_FORM_MAX_DEPTH + 1); // elements + text leaf

      const overCap = renderFreeFormTree(nest(FREE_FORM_MAX_DEPTH));
      expect(overCap.truncated).toBe(true);
      expect(overCap.nodeCount).toBe(FREE_FORM_MAX_DEPTH);

      const { container } = render(
        <FreeFormDesign designTree={nest(FREE_FORM_MAX_DEPTH - 1)} />,
      );
      expect(container.textContent).toContain("deep-leaf");
      expect(container.querySelector("section")).not.toHaveAttribute(
        "data-free-form-truncated",
      );
    });

    it("stops at the node cap and reports truncation", () => {
      const children: FreeFormNode[] = Array.from(
        { length: FREE_FORM_MAX_NODES + 500 },
        (_unused, index) => ({ tag: "span", attrs: { id: `n${index}` } }),
      );
      const result = renderFreeFormTree({ tag: "div", children });

      expect(result.truncated).toBe(true);
      expect(result.nodeCount).toBeLessThanOrEqual(FREE_FORM_MAX_NODES);

      const { container } = render(
        <FreeFormDesign designTree={{ tag: "div", children }} />,
      );
      expect(container.querySelectorAll("span").length).toBeLessThanOrEqual(
        FREE_FORM_MAX_NODES,
      );
      expect(container.querySelector("#n0")).not.toBeNull();
      expect(
        container.querySelector(`#n${FREE_FORM_MAX_NODES + 499}`),
      ).toBeNull();
    });

    it("does not report truncation when the budget is consumed by the LAST sibling", () => {
      // The budget is spent exactly, but nothing was cut — reporting `truncated`
      // here would stamp data-free-form-truncated on a complete render and lie to
      // any tooling keyed on that marker.
      const exact = renderFreeFormTree(
        { tag: "div", children: [{ tag: "span" }] },
        { maxNodes: 2 },
      );
      expect(exact.nodeCount).toBe(2);
      expect(exact.truncated).toBe(false);

      const { container } = render(
        <FreeFormDesign designTree={{ tag: "div", children: [{ tag: "span" }] }} />,
      );
      expect(container.querySelector("section")).not.toHaveAttribute(
        "data-free-form-truncated",
      );

      // Contrast: one more sibling than the budget allows IS a real cut.
      const cut = renderFreeFormTree(
        { tag: "div", children: [{ tag: "span" }, { tag: "span" }] },
        { maxNodes: 2 },
      );
      expect(cut.nodeCount).toBe(2);
      expect(cut.truncated).toBe(true);

      // …and so is a trailing TEXT child that no longer fits.
      const cutText = renderFreeFormTree(
        { tag: "div", children: [{ tag: "span" }, "overflow"] },
        { maxNodes: 2 },
      );
      expect(cutText.truncated).toBe(true);
    });

    it("does not mark an in-budget tree as truncated", () => {
      const result = renderFreeFormTree({
        tag: "div",
        children: [{ tag: "p", children: ["hi"] }],
      });
      expect(result.truncated).toBe(false);
      expect(result.nodeCount).toBe(3); // div + p + text
    });
  });

  /* ------------------------------------------------------------------ */
  /* className manifest semantics                                        */
  /* ------------------------------------------------------------------ */

  describe("className manifest vs sectionClassName", () => {
    it("never applies className (the manifest) to any rendered element", () => {
      const { container } = render(
        <FreeFormDesign
          className="manifest-token-a manifest-token-b"
          designTree={{ tag: "div", className: "real-class", children: ["x"] }}
        />,
      );

      expect(container.innerHTML).not.toContain("manifest-token-a");
      expect(container.innerHTML).not.toContain("manifest-token-b");
      expect(container.querySelector(".real-class")).not.toBeNull();
    });

    it("applies sectionClassName to the Section element", () => {
      const { container } = render(
        <FreeFormDesign
          sectionClassName="bg-secondary custom-section"
          className="manifest-only"
          designTree={{ tag: "div", children: ["x"] }}
        />,
      );

      const section = container.querySelector("section");
      expect(section).toHaveClass("custom-section");
      expect(section).not.toHaveClass("manifest-only");
    });

    it("collectFreeFormClassNames mirrors what Octane derives server-side", () => {
      expect(
        collectFreeFormClassNames({
          tag: "div",
          className: "grid  gap-4",
          children: [
            { tag: "p", className: "text-lg", children: ["x"] },
            { tag: "span", className: "grid" },
          ],
        }),
      ).toEqual(["gap-4", "grid", "text-lg"]);
    });

    it("folds sectionClassName/containerClassName tokens into the manifest", () => {
      // The safelist extractors scan ONLY blockProps.className, so any token that
      // lives under another prop name has no compiled CSS rule on a live site
      // unless it is mirrored here. Octane's derive_free_form_class_manifests must
      // fold the same two props before it overwrites data.className.
      const sectionClassName = "bg-[#0b1120] py-[7rem]";
      const containerClassName = "px-0 lg:px-0";

      expect(
        collectFreeFormClassNames(
          { tag: "div", className: "grid gap-4" },
          { extraClassNames: [sectionClassName, containerClassName, undefined] },
        ),
      ).toEqual([
        "bg-[#0b1120]",
        "gap-4",
        "grid",
        "lg:px-0",
        "px-0",
        "py-[7rem]",
      ]);

      // Deduped against tree tokens, and a class-free tree still yields a manifest.
      expect(
        collectFreeFormClassNames(
          { tag: "div", className: "bg-[#0b1120]" },
          { extraClassNames: ["bg-[#0b1120]"] },
        ),
      ).toEqual(["bg-[#0b1120]"]);
      expect(
        collectFreeFormClassNames(
          { tag: "div" },
          { extraClassNames: ["bg-secondary"] },
        ),
      ).toEqual(["bg-secondary"]);
    });
  });

  /* ------------------------------------------------------------------ */
  /* Section passthrough + empty state                                   */
  /* ------------------------------------------------------------------ */

  describe("section passthrough and empty state", () => {
    it("renders the empty state label when there is no tree", () => {
      render(<FreeFormDesign emptyStateLabel="Design not configured yet" />);
      expect(
        screen.getByText("Design not configured yet"),
      ).toBeInTheDocument();
    });

    it("renders no content and no invented copy when tree and label are absent", () => {
      const { container } = render(<FreeFormDesign />);
      const section = container.querySelector("section");
      expect(section).not.toBeNull();
      expect(section?.textContent).toBe("");
    });

    it("renders nothing but the empty state when the tree is malformed", () => {
      render(
        <FreeFormDesign
          designTree={{ notATag: true } as unknown as FreeFormNode}
          emptyStateLabel="Nothing to show"
        />,
      );
      expect(screen.getByText("Nothing to show")).toBeInTheDocument();
    });

    it("passes sectionId, title and subtitle through to the Section", () => {
      const { container } = render(
        <FreeFormDesign
          sectionId="clone-section"
          title="Section Title"
          subtitle="Eyebrow"
          designTree={{ tag: "div", children: ["body"] }}
        />,
      );
      expect(container.querySelector("section")?.id).toBe("clone-section");
      expect(screen.getByText("Section Title")).toBeInTheDocument();
      expect(screen.getByText("Eyebrow")).toBeInTheDocument();
    });

    it("marks the rendered root with data-free-form-design", () => {
      const { container } = render(
        <FreeFormDesign designTree={{ tag: "div", children: ["x"] }} />,
      );
      expect(
        container.querySelector('[data-free-form-design="root"]'),
      ).not.toBeNull();
    });
  });
});
