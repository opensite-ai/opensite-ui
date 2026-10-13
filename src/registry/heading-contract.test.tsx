import * as React from "react";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { headingTag } from "../../lib/heading-level";
import { BLOCK_REGISTRY } from "./blocks";
import {
  BLOCK_HEADING_CONTRACT,
  getBlockHeadingContract,
} from "./heading-contract";

const TITLE = "HeadingContractTitleMarker";
const EYEBROW = "HeadingContractEyebrowMarker";

/**
 * Set a dot-path value ("slides.0.title"). Containers along the path are
 * copied first, so registry example props are never mutated.
 */
function setPath(target: Record<string, unknown>, path: string, value: unknown) {
  const keys = path.split(".");
  let node: Record<string, unknown> = target;
  keys.slice(0, -1).forEach((key, index) => {
    const nextIsIndex = /^\d+$/.test(keys[index + 1]);
    const current = node[key];
    const copy = Array.isArray(current)
      ? [...current]
      : current && typeof current === "object"
        ? { ...(current as Record<string, unknown>) }
        : nextIsIndex
          ? []
          : {};
    node[key] = copy;
    node = copy as Record<string, unknown>;
  });
  node[keys[keys.length - 1]] = value;
}

function renderBlock(id: string, extra: Record<string, unknown> = {}) {
  const block = BLOCK_REGISTRY[id];
  const contract = BLOCK_HEADING_CONTRACT[id];
  const props: Record<string, unknown> = { ...(block.exampleProps ?? {}) };
  setPath(props, contract.titleProp, TITLE);
  Object.entries(extra).forEach(([key, value]) => setPath(props, key, value));
  return render(React.createElement(block.component, props));
}

function titleHeadings(container: HTMLElement): Element[] {
  return Array.from(container.querySelectorAll("h1, h2, h3, h4, h5, h6")).filter(
    (heading) => heading.textContent?.includes(TITLE),
  );
}

describe("headingTag", () => {
  it("resolves levels 1-6 and falls back for missing or invalid levels", () => {
    expect(headingTag(1, 2)).toBe("h1");
    expect(headingTag(6, 1)).toBe("h6");
    expect(headingTag(undefined, 2)).toBe("h2");
    expect(headingTag(0 as never, 1)).toBe("h1");
    expect(headingTag(1.5 as never, 2)).toBe("h2");
  });
});

describe("block heading contract", () => {
  const ids = Object.keys(BLOCK_HEADING_CONTRACT);

  it("lists only registered blocks", () => {
    ids.forEach((id) => expect(BLOCK_REGISTRY[id], id).toBeDefined());
  });

  it("looks blocks up by id or block ref", () => {
    ids.forEach((id) => {
      const category = BLOCK_REGISTRY[id].category;
      expect(getBlockHeadingContract(id)).toBe(BLOCK_HEADING_CONTRACT[id]);
      expect(getBlockHeadingContract(`${category}/${id}`)).toBe(BLOCK_HEADING_CONTRACT[id]);
    });
    expect(getBlockHeadingContract("not-a-block")).toBeUndefined();
  });

  if (ids.length === 0) return;

  describe.each(ids)("%s", (id) => {
    const contract = BLOCK_HEADING_CONTRACT[id];

    it(`renders the primary title as h${contract.defaultHeadingLevel} by default`, () => {
      const { container } = renderBlock(id);
      const headings = titleHeadings(container);
      expect(headings.length).toBeGreaterThan(0);
      headings.forEach((heading) =>
        expect(heading.tagName).toBe(`H${contract.defaultHeadingLevel}`),
      );
      if (contract.defaultHeadingLevel !== 1) {
        expect(container.querySelectorAll("h1")).toHaveLength(0);
      }
    });

    it("renders exactly one h1, the primary title, for headingLevel 1", () => {
      const { container } = renderBlock(id, { headingLevel: 1 });
      const headings = titleHeadings(container);
      expect(headings.length).toBeGreaterThan(0);
      headings.forEach((heading) => expect(heading.tagName).toBe("H1"));
      expect(container.querySelectorAll("h1")).toHaveLength(1);
    });

    it("renders no h1 for headingLevel 2", () => {
      const { container } = renderBlock(id, { headingLevel: 2 });
      const headings = titleHeadings(container);
      expect(headings.length).toBeGreaterThan(0);
      headings.forEach((heading) => expect(heading.tagName).toBe("H2"));
      expect(container.querySelectorAll("h1")).toHaveLength(0);
    });

    contract.eyebrowProps.forEach((prop) => {
      it(`renders the ${prop} eyebrow outside <p>, before the title`, () => {
        const { container } = renderBlock(id, { [prop]: EYEBROW });
        const eyebrows = Array.from(container.querySelectorAll("*")).filter(
          (element) =>
            element.textContent === EYEBROW &&
            !Array.from(element.children).some((child) => child.textContent === EYEBROW),
        );
        expect(eyebrows.length).toBeGreaterThan(0);
        const [title] = titleHeadings(container);
        eyebrows.forEach((eyebrow) => {
          expect(eyebrow.closest("p")).toBeNull();
          expect(
            eyebrow.compareDocumentPosition(title) & Node.DOCUMENT_POSITION_FOLLOWING,
          ).toBeTruthy();
        });
      });
    });
  });
});
