import { describe, expect, it } from "vitest";

import { BLOCK_REGISTRY } from "./blocks";

const TARGET_BLOCK_IDS = [
  "hero-mental-health-team",
  "hero-mentorship-video-split",
] as const;

const RELATIVE_IMAGES_PATH = /(^|["'\s(])\/images\//;
const PLACEHOLDER_KEY_RE = /\b(image|video)Placeholders\b/;

function serializeExampleProps(value: unknown): string {
  return JSON.stringify(value ?? null);
}

describe("example media safety for AI-facing blocks", () => {
  for (const id of TARGET_BLOCK_IDS) {
    describe(id, () => {
      const entry = BLOCK_REGISTRY[id];

      it("is registered", () => {
        expect(entry, `block ${id} must exist in BLOCK_REGISTRY`).toBeDefined();
      });

      it("exampleUsage contains no relative /images/ paths", () => {
        const usage = entry?.exampleUsage ?? "";
        expect(usage).not.toMatch(RELATIVE_IMAGES_PATH);
      });

      it("exampleUsage references no imagePlaceholders/videoPlaceholders props", () => {
        const usage = entry?.exampleUsage ?? "";
        expect(usage).not.toMatch(PLACEHOLDER_KEY_RE);
      });

      it("exampleProps contains no relative /images/ paths", () => {
        const serialized = serializeExampleProps(entry?.exampleProps);
        expect(serialized).not.toMatch(RELATIVE_IMAGES_PATH);
      });

      it("exampleProps contains no imagePlaceholders/videoPlaceholders keys", () => {
        const serialized = serializeExampleProps(entry?.exampleProps);
        expect(serialized).not.toMatch(PLACEHOLDER_KEY_RE);
      });
    });
  }

  it("hero-mentorship-video-split example separates image and video with absolute URLs", () => {
    const entry = BLOCK_REGISTRY["hero-mentorship-video-split"];
    const exampleProps = entry?.exampleProps as
      | {
          image?: { src?: string };
          modalVideo?: {
            image?: { src?: string };
            video?: { src?: string };
          };
        }
      | undefined;

    expect(exampleProps).toBeDefined();

    const heroImageSrc = exampleProps?.image?.src ?? "";
    const posterSrc = exampleProps?.modalVideo?.image?.src ?? "";
    const videoSrc = exampleProps?.modalVideo?.video?.src ?? "";

    // All three slots populated.
    expect(heroImageSrc).not.toBe("");
    expect(posterSrc).not.toBe("");
    expect(videoSrc).not.toBe("");

    // All three are absolute URLs.
    for (const src of [heroImageSrc, posterSrc, videoSrc]) {
      expect(src).toMatch(/^https?:\/\//);
    }

    // Image slots are image assets; video slot is a video asset. They are
    // distinguishable URLs so a consumer can't conflate the two roles.
    expect(heroImageSrc).not.toBe(videoSrc);
    expect(posterSrc).not.toBe(videoSrc);
  });

  it("hero-mental-health-team example uses absolute URLs for every media slot", () => {
    const entry = BLOCK_REGISTRY["hero-mental-health-team"];
    const exampleProps = entry?.exampleProps as
      | {
          smallImages?: Array<{ src?: string }>;
          featureImage?: { src?: string };
          testimonial?: { avatarSrc?: string };
        }
      | undefined;

    expect(exampleProps).toBeDefined();

    const mediaSrcs: string[] = [
      ...(exampleProps?.smallImages?.map((img) => img?.src ?? "") ?? []),
      exampleProps?.featureImage?.src ?? "",
      exampleProps?.testimonial?.avatarSrc ?? "",
    ];

    expect(mediaSrcs.length).toBeGreaterThan(0);
    for (const src of mediaSrcs) {
      expect(src).toMatch(/^https?:\/\//);
    }
  });
});
