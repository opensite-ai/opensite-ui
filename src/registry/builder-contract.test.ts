import { describe, expect, it } from "vitest";

import { BLOCK_REGISTRY } from "./blocks";
import {
  BUILDER_CONTRACT_VERSION,
  createBuilderContractBundle,
} from "./builder-contract";
import type { BlockRegistryEntry, BuilderContractBlockSource } from "./types";

function HeroSimpleCenteredImage() {
  return null;
}

function NavbarImagePreview() {
  return null;
}

function FooterSplitImageAccordion() {
  return null;
}

function AboutStoryExpertise() {
  return null;
}

const SAMPLE_BLOCKS = [
  {
    id: "hero-simple-centered-image",
    name: "Hero Simple Centered Image",
    description: "Hero block",
    semanticTags: ["hero", "image"],
    category: "hero",
    component: HeroSimpleCenteredImage,
    props: "HeroSimpleCenteredImageProps",
    exampleUsage: "<HeroSimpleCenteredImage />",
  },
  {
    id: "navbar-image-preview",
    name: "Navbar Image Preview",
    description: "Navbar block",
    semanticTags: ["navbar", "navigation"],
    category: "navbar",
    component: NavbarImagePreview,
    props: "NavbarImagePreviewProps",
    exampleUsage: "<NavbarImagePreview />",
  },
  {
    id: "footer-split-image-accordion",
    name: "Footer Split Image Accordion",
    description: "Footer block",
    semanticTags: ["footer", "newsletter"],
    category: "footer",
    component: FooterSplitImageAccordion,
    props: "FooterSplitImageAccordionProps",
    exampleUsage: "<FooterSplitImageAccordion />",
  },
  {
    id: "about-story-expertise",
    name: "About Story Expertise",
    description: "About block",
    semanticTags: ["about", "story"],
    category: "about",
    component: AboutStoryExpertise,
    props: "AboutStoryExpertiseProps",
    exampleUsage: "<AboutStoryExpertise />",
  },
] satisfies BlockRegistryEntry[];

const SAMPLE_SOURCES: Record<string, BuilderContractBlockSource> = {
  "hero-simple-centered-image": {
    exportPath: "./blocks/hero/hero-simple-centered-image",
    modulePath: "@opensite/ui/blocks/hero/hero-simple-centered-image",
    typesPath: "./dist/hero-simple-centered-image.d.ts",
    importPath: "./dist/hero-simple-centered-image.js",
    requirePath: "./dist/hero-simple-centered-image.cjs",
  },
  "navbar-image-preview": {
    exportPath: "./blocks/navbars/navbar-image-preview",
    modulePath: "@opensite/ui/blocks/navbars/navbar-image-preview",
    typesPath: "./dist/navbar-image-preview.d.ts",
    importPath: "./dist/navbar-image-preview.js",
    requirePath: "./dist/navbar-image-preview.cjs",
  },
  "footer-split-image-accordion": {
    exportPath: "./blocks/footers/footer-split-image-accordion",
    modulePath: "@opensite/ui/blocks/footers/footer-split-image-accordion",
    typesPath: "./dist/footer-split-image-accordion.d.ts",
    importPath: "./dist/footer-split-image-accordion.js",
    requirePath: "./dist/footer-split-image-accordion.cjs",
  },
};

const ABOUT_BLOCK_IDS = [
  "alternating-blocks",
  "about-mission-features",
  "about-stats-showcase",
  "about-company-profile",
  "about-vision-gallery",
  "about-developer-story",
  "about-story-gallery",
  "about-streamline-team",
  "about-developer-profile",
  "about-startup-team",
  "about-minimal-story",
  "about-story-hero",
  "about-stats-sidebar",
  "about-interactive-tabs",
  "about-mission-dual-image",
  "about-story-expertise",
  "about-network-spotlight",
  "about-location-info-hero",
  "about-split-hero",
  "about-mission-principles",
  "about-expandable-values",
  "community-initiatives",
  "about-culture-tabs",
] as const;

const ABOUT_BLOCK_IDS_WITH_MEDIA = [
  "alternating-blocks",
  "about-mission-features",
  "about-stats-showcase",
  "about-company-profile",
  "about-vision-gallery",
  "about-developer-story",
  "about-story-gallery",
  "about-streamline-team",
  "about-developer-profile",
  "about-startup-team",
  "about-minimal-story",
  "about-story-hero",
  "about-interactive-tabs",
  "about-mission-dual-image",
  "about-story-expertise",
  "about-network-spotlight",
  "about-location-info-hero",
  "about-split-hero",
  "community-initiatives",
  "about-culture-tabs",
] as const;

const ARTICLE_BLOCK_IDS = [
  "article-hero-prose",
  "article-sidebar-sticky",
  "article-toc-sidebar",
  "article-breadcrumb-social",
  "article-compact-toc",
  "article-chapters-author",
  "article-split-animated",
] as const;

const ARTICLE_BLOCK_IDS_WITH_MEDIA = [...ARTICLE_BLOCK_IDS] as const;

const FORBIDDEN_EXAMPLE_PATTERNS = [
  /\/images\//,
  /imagePlaceholders/,
  /videoPlaceholders/,
] as const;

const FORBIDDEN_ARTICLE_PROP_PATTERNS = [
  /\bshareUrls=/,
  /\bctaButtonText=/,
  /\bctaText=/,
  /\bctaHref=/,
] as const;

function collectStrings(value: unknown): string[] {
  if (typeof value === "string") {
    return [value];
  }

  if (Array.isArray(value)) {
    return value.flatMap((item) => collectStrings(item));
  }

  if (value && typeof value === "object") {
    return Object.values(value).flatMap((item) => collectStrings(item));
  }

  return [];
}

function collectMediaStrings(value: unknown, path: string[] = []): string[] {
  if (typeof value === "string") {
    const leaf = path[path.length - 1] ?? "";
    const pathText = path.join(".");
    const isAltText = /alt/i.test(leaf);
    const isMediaPath =
      /(src|image|images|avatar|logo|media)/i.test(pathText) && !isAltText;

    return isMediaPath ? [value] : [];
  }

  if (Array.isArray(value)) {
    return value.flatMap((item, index) =>
      collectMediaStrings(item, [...path, String(index)]),
    );
  }

  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, item]) =>
      collectMediaStrings(item, [...path, key]),
    );
  }

  return [];
}

describe("createBuilderContractBundle", () => {
  it("builds the required Phase 1 contract sections", () => {
    const bundle = createBuilderContractBundle({
      blocks: SAMPLE_BLOCKS,
      uiVersion: "3.2.1",
      exportedAt: "2026-03-26T00:00:00.000Z",
      blockSources: SAMPLE_SOURCES,
    });

    expect(bundle.metadata).toEqual({
      contractVersion: BUILDER_CONTRACT_VERSION,
      uiVersion: "3.2.1",
      exportedAt: "2026-03-26T00:00:00.000Z",
      source: "@opensite/ui",
      totalBlocks: 4,
    });

    expect(bundle.sharedLayout.canonicalLayoutKey).toBe("_layout");
    expect(bundle.dynamicSources.blog_feed.hydrationOwner).toBe("dashtrack-ai");
    expect(bundle.designTokens.canonicalSource).toBe("theme_config");
    expect(bundle.pageRules.blockEntry.requiredKeys).toEqual([
      "block_name",
      "block_ref",
      "data",
    ]);
  });

  it("normalizes block refs, block names, and layout roles from public exports", () => {
    const bundle = createBuilderContractBundle({
      blocks: SAMPLE_BLOCKS,
      uiVersion: "3.2.1",
      blockSources: SAMPLE_SOURCES,
    });

    const hero = bundle.blocks.find(
      (block) => block.componentId === "hero-simple-centered-image",
    );
    const navbar = bundle.blocks.find(
      (block) => block.componentId === "navbar-image-preview",
    );
    const footer = bundle.blocks.find(
      (block) => block.componentId === "footer-split-image-accordion",
    );
    const about = bundle.blocks.find(
      (block) => block.componentId === "about-story-expertise",
    );

    expect(hero).toMatchObject({
      blockName: "HeroSimpleCenteredImage",
      blockRef: "hero/hero-simple-centered-image",
      layoutRole: "page",
    });
    expect(navbar).toMatchObject({
      blockName: "NavbarImagePreview",
      blockRef: "navbars/navbar-image-preview",
      layoutRole: "header",
    });
    expect(footer).toMatchObject({
      blockName: "FooterSplitImageAccordion",
      blockRef: "footers/footer-split-image-accordion",
      layoutRole: "footer",
    });
    expect(about).toMatchObject({
      blockRef: "about/about-story-expertise",
      layoutRole: "page",
    });

    expect(bundle.sharedLayout.sections.header.allowedBlockRefs).toEqual([
      "navbars/navbar-image-preview",
    ]);
    expect(bundle.sharedLayout.sections.footer.allowedBlockRefs).toEqual([
      "footers/footer-split-image-accordion",
    ]);
  });

  it("propagates structured usage requirements and exampleProps into the contract", () => {
    const blocks: BlockRegistryEntry[] = [
      {
        ...SAMPLE_BLOCKS[0],
        importantUsageNotes: "Heading must stay under 40 characters.",
        usageRequirements: {
          requiredProps: ["heading", "featureImage"],
          propConstraints: {
            heading: { required: true, maxLength: 40 },
            smallImages: { count: 2, minItems: 2, maxItems: 2 },
          },
          mediaSlots: {
            featureImage: {
              path: "featureImage",
              roles: ["feature", "hero"],
              disallowedRoles: ["logo"],
              minPixelClass: "large",
              required: true,
            },
          },
          requiresSiteCapabilities: ["media_library"],
        },
        exampleProps: { heading: "Hello" },
      },
    ];

    const bundle = createBuilderContractBundle({
      blocks,
      uiVersion: "3.2.1",
    });
    const hero = bundle.blocks[0];

    expect(hero.importantUsageNotes).toContain("40 characters");
    expect(hero.usageRequirements?.requiredProps).toEqual([
      "heading",
      "featureImage",
    ]);
    expect(hero.usageRequirements?.propConstraints?.heading.maxLength).toBe(40);
    expect(hero.usageRequirements?.mediaSlots?.featureImage.roles).toEqual([
      "feature",
      "hero",
    ]);
    expect(hero.examples.exampleProps).toEqual({ heading: "Hello" });
    expect(hero.examples).not.toHaveProperty("defaultData");
  });

  it("falls back to null usage metadata when a block does not declare any", () => {
    const bundle = createBuilderContractBundle({
      blocks: SAMPLE_BLOCKS,
      uiVersion: "3.2.1",
    });

    for (const block of bundle.blocks) {
      expect(block.importantUsageNotes).toBeNull();
      expect(block.usageRequirements).toBeNull();
      expect(block.examples.exampleProps).toBeNull();
      expect(block.examples).not.toHaveProperty("defaultData");
    }
  });
});

describe("BLOCK_REGISTRY hero-mental-health-team contract", () => {
  const entry = BLOCK_REGISTRY["hero-mental-health-team"];

  it("is registered", () => {
    expect(entry).toBeDefined();
  });

  it("declares structured usage requirements (no featuredImage typo)", () => {
    const notes = entry.importantUsageNotes ?? "";
    expect(notes).toMatch(/featureImage/);
    expect(notes).not.toMatch(/featuredImage/);

    const requirements = entry.usageRequirements;
    expect(requirements).toBeDefined();
    expect(requirements?.requiredProps).toEqual(
      expect.arrayContaining([
        "heading",
        "smallImages",
        "featureImage",
        "testimonial",
      ]),
    );
  });

  it("constrains smallImages to exactly two items", () => {
    const smallImages = entry.usageRequirements?.propConstraints?.smallImages;
    expect(smallImages?.count).toBe(2);
    expect(smallImages?.minItems).toBe(2);
    expect(smallImages?.maxItems).toBe(2);
  });

  it("enforces heading <= 40 and description <= 130 characters", () => {
    const constraints = entry.usageRequirements?.propConstraints ?? {};
    expect(constraints.heading?.maxLength).toBe(40);
    expect(constraints.description?.maxLength).toBe(130);
  });

  it("pins action variants to default/outline", () => {
    const actions = entry.usageRequirements?.propConstraints?.actions;
    expect(actions?.pinnedValues).toEqual({
      "0.variant": "default",
      "1.variant": "outline",
    });
  });

  it("declares media slot roles for featureImage, smallImages, and the testimonial avatar", () => {
    const slots = entry.usageRequirements?.mediaSlots ?? {};

    expect(slots.featureImage?.roles).toEqual(
      expect.arrayContaining(["feature", "hero"]),
    );
    expect(slots.featureImage?.disallowedRoles).toEqual(
      expect.arrayContaining(["logo"]),
    );
    expect(slots.featureImage?.required).toBe(true);

    expect(slots["smallImages[]"]?.roles).toEqual(
      expect.arrayContaining(["thumbnail", "profile"]),
    );
    expect(slots["smallImages[]"]?.disallowedRoles).toEqual(
      expect.arrayContaining(["logo"]),
    );

    expect(slots["testimonial.avatarSrc"]?.roles).toEqual(
      expect.arrayContaining(["profile", "avatar"]),
    );
  });

  it("requires a sourced testimonial via site capabilities", () => {
    const capabilities = entry.usageRequirements?.requiresSiteCapabilities;
    expect(capabilities).toEqual(
      expect.arrayContaining(["reviews_or_testimonials"]),
    );
  });

  it("provides a structured exampleProps payload covering required slots", () => {
    const exampleProps = entry.exampleProps as
      | Record<string, unknown>
      | undefined;
    expect(exampleProps).toBeDefined();
    expect(Array.isArray(exampleProps?.smallImages)).toBe(true);
    expect((exampleProps?.smallImages as unknown[]).length).toBe(2);
    expect(exampleProps?.featureImage).toBeDefined();
    expect(exampleProps?.testimonial).toBeDefined();
  });

  it("does not expose the legacy defaultProps field", () => {
    expect(
      (entry as unknown as Record<string, unknown>).defaultProps,
    ).toBeUndefined();
  });

  it("uses absolute URLs (never relative paths) in exampleProps media", () => {
    const exampleProps = entry.exampleProps as Record<string, unknown>;
    const featureImage = exampleProps.featureImage as { src: string };
    const smallImages = exampleProps.smallImages as Array<{ src: string }>;
    const testimonial = exampleProps.testimonial as { avatarSrc: string };

    expect(featureImage.src).toMatch(/^https?:\/\//);
    for (const img of smallImages) {
      expect(img.src).toMatch(/^https?:\/\//);
    }
    expect(testimonial.avatarSrc).toMatch(/^https?:\/\//);
  });
});

describe("BLOCK_REGISTRY hero-mentorship-video-split contract", () => {
  const entry = BLOCK_REGISTRY["hero-mentorship-video-split"];

  it("is registered with structured metadata", () => {
    expect(entry).toBeDefined();
    expect(entry.importantUsageNotes).toBeDefined();
    expect(entry.usageRequirements).toBeDefined();
    expect(entry.exampleProps).toBeDefined();
  });

  it("warns against swapping image and video media in importantUsageNotes", () => {
    const notes = entry.importantUsageNotes ?? "";
    expect(notes).toMatch(/image/i);
    expect(notes).toMatch(/video/i);
    expect(notes.toLowerCase()).toMatch(/swap|never|not/);
  });

  it("declares media slot roles distinguishing image vs video", () => {
    const slots = entry.usageRequirements?.mediaSlots ?? {};

    expect(slots.image).toBeDefined();
    expect(slots.image?.roles).toEqual(expect.arrayContaining(["hero"]));
    expect(slots.image?.disallowedRoles ?? []).toEqual(
      expect.arrayContaining(["video-thumbnail"]),
    );
    expect(slots.image?.required).toBe(true);

    const videoSrcSlot = slots["modalVideo.video.src"];
    expect(videoSrcSlot).toBeDefined();
    expect(videoSrcSlot?.disallowedRoles ?? []).toEqual(
      expect.arrayContaining(["hero", "feature"]),
    );

    const posterSlot = slots["modalVideo.image.src"];
    expect(posterSlot).toBeDefined();
    expect(posterSlot?.roles).toEqual(
      expect.arrayContaining(["video-thumbnail"]),
    );
  });

  it("uses absolute URLs (never relative paths) for media in exampleProps", () => {
    const exampleProps = entry.exampleProps as Record<string, unknown>;
    const image = exampleProps.image as { src: string };
    const modalVideo = exampleProps.modalVideo as {
      image: { src: string };
      video: { src: string };
    };

    expect(image.src).toMatch(/^https?:\/\//);
    expect(modalVideo.image.src).toMatch(/^https?:\/\//);
    expect(modalVideo.video.src).toMatch(/^https?:\/\//);
  });

  it("does not expose the legacy defaultProps field", () => {
    expect(
      (entry as unknown as Record<string, unknown>).defaultProps,
    ).toBeUndefined();
  });
});

describe("BLOCK_REGISTRY about category contracts", () => {
  it("declares structured usage requirements and exampleProps for every about block", () => {
    for (const id of ABOUT_BLOCK_IDS) {
      const entry = BLOCK_REGISTRY[id];

      expect(entry, id).toBeDefined();
      expect(entry.importantUsageNotes, id).toBeTruthy();
      expect(entry.usageRequirements, id).toBeDefined();
      expect(entry.usageRequirements?.requiredProps, id).toBeDefined();
      expect(entry.usageRequirements?.propConstraints, id).toBeDefined();
      expect(entry.usageRequirements?.mediaSlots, id).toBeDefined();
      expect(entry.exampleProps, id).toBeDefined();
      expect(
        (entry as unknown as Record<string, unknown>).defaultProps,
        id,
      ).toBeUndefined();
    }
  });

  it("does not use legacy defaultData for about blocks in the builder contract", () => {
    const bundle = createBuilderContractBundle({
      blocks: Object.values(BLOCK_REGISTRY),
      uiVersion: "test",
    });

    for (const id of ABOUT_BLOCK_IDS) {
      const block = bundle.blocks.find((item) => item.componentId === id);

      expect(block, id).toBeDefined();
      expect(block?.examples, id).toHaveProperty("exampleProps");
      expect(block?.examples.exampleProps, id).not.toBeNull();
      expect(block?.examples, id).not.toHaveProperty("defaultData");
    }
  });

  it("keeps about exampleUsage and exampleProps free of relative or placeholder media", () => {
    for (const id of ABOUT_BLOCK_IDS) {
      const entry = BLOCK_REGISTRY[id];
      const exampleText = [
        entry.exampleUsage,
        ...collectStrings(entry.exampleProps),
      ].join("\n");

      for (const pattern of FORBIDDEN_EXAMPLE_PATTERNS) {
        expect(exampleText, id).not.toMatch(pattern);
      }
    }
  });

  it("uses current site capability keys for about source-backed data", () => {
    const legacyCapabilityKeys = [
      "metrics_or_stats",
      "pricing_data",
      "contact_info",
    ];

    for (const id of ABOUT_BLOCK_IDS) {
      const capabilities =
        BLOCK_REGISTRY[id].usageRequirements?.requiresSiteCapabilities ?? [];

      for (const capability of legacyCapabilityKeys) {
        expect(capabilities, id).not.toContain(capability);
      }
    }

    expect(
      BLOCK_REGISTRY["about-stats-showcase"].usageRequirements
        ?.requiresSiteCapabilities,
    ).toEqual(expect.arrayContaining(["stats_or_metrics"]));
    expect(
      BLOCK_REGISTRY["about-company-profile"].usageRequirements
        ?.requiresSiteCapabilities,
    ).toEqual(expect.arrayContaining(["stats_or_metrics"]));
    expect(
      BLOCK_REGISTRY["community-initiatives"].usageRequirements
        ?.requiresSiteCapabilities,
    ).toEqual(expect.arrayContaining(["stats_or_metrics"]));
    expect(
      BLOCK_REGISTRY["about-location-info-hero"].usageRequirements
        ?.requiresSiteCapabilities,
    ).toEqual(expect.arrayContaining(["locations"]));
  });

  it("declares image media slots where about blocks accept media", () => {
    for (const id of ABOUT_BLOCK_IDS_WITH_MEDIA) {
      const slots = BLOCK_REGISTRY[id].usageRequirements?.mediaSlots ?? {};

      expect(Object.keys(slots).length, id).toBeGreaterThan(0);

      for (const slot of Object.values(slots)) {
        expect(slot.note, `${id}:${slot.path}`).toMatch(/IMAGE .*ONLY/i);

        if (!slot.roles.includes("logo")) {
          expect(slot.disallowedRoles ?? [], `${id}:${slot.path}`).toEqual(
            expect.arrayContaining(["logo", "favicon", "video-thumbnail"]),
          );
        }
      }
    }
  });

  it("uses absolute media URLs in about exampleProps", () => {
    for (const id of ABOUT_BLOCK_IDS_WITH_MEDIA) {
      const mediaStrings = collectMediaStrings(BLOCK_REGISTRY[id].exampleProps);

      expect(mediaStrings.length, id).toBeGreaterThan(0);
      for (const value of mediaStrings) {
        expect(value, `${id}:${value}`).toMatch(/^https?:\/\//);
      }
    }
  });
});

describe("BLOCK_REGISTRY article category contracts", () => {
  it("declares structured usage requirements and exampleProps for every article block", () => {
    for (const id of ARTICLE_BLOCK_IDS) {
      const entry = BLOCK_REGISTRY[id];

      expect(entry, id).toBeDefined();
      expect(entry.importantUsageNotes, id).toBeTruthy();
      expect(entry.usageRequirements, id).toBeDefined();
      expect(entry.usageRequirements?.requiredProps, id).toBeDefined();
      expect(entry.usageRequirements?.propConstraints, id).toBeDefined();
      expect(entry.usageRequirements?.mediaSlots, id).toBeDefined();
      expect(entry.exampleProps, id).toBeDefined();
      expect(
        (entry as unknown as Record<string, unknown>).defaultProps,
        id,
      ).toBeUndefined();
    }
  });

  it("does not use legacy defaultData for article blocks in the builder contract", () => {
    const bundle = createBuilderContractBundle({
      blocks: Object.values(BLOCK_REGISTRY),
      uiVersion: "test",
    });

    for (const id of ARTICLE_BLOCK_IDS) {
      const block = bundle.blocks.find((item) => item.componentId === id);

      expect(block, id).toBeDefined();
      expect(block?.examples, id).toHaveProperty("exampleProps");
      expect(block?.examples.exampleProps, id).not.toBeNull();
      expect(block?.examples, id).not.toHaveProperty("defaultData");
    }
  });

  it("keeps article exampleUsage and exampleProps free of relative or placeholder media", () => {
    for (const id of ARTICLE_BLOCK_IDS) {
      const entry = BLOCK_REGISTRY[id];
      const exampleText = [
        entry.exampleUsage,
        ...collectStrings(entry.exampleProps),
      ].join("\n");

      for (const pattern of FORBIDDEN_EXAMPLE_PATTERNS) {
        expect(exampleText, id).not.toMatch(pattern);
      }

      for (const pattern of FORBIDDEN_ARTICLE_PROP_PATTERNS) {
        expect(entry.exampleUsage, id).not.toMatch(pattern);
      }
    }
  });

  it("requires source-backed blog, team, and media data for article blocks", () => {
    for (const id of ARTICLE_BLOCK_IDS) {
      const capabilities =
        BLOCK_REGISTRY[id].usageRequirements?.requiresSiteCapabilities ?? [];

      expect(capabilities, id).toEqual(
        expect.arrayContaining(["blog_posts", "team_members", "media_library"]),
      );
      expect(capabilities, id).not.toContain("pricing_data");
      expect(capabilities, id).not.toContain("metrics_or_stats");
    }
  });

  it("declares image media slots where article blocks accept media", () => {
    for (const id of ARTICLE_BLOCK_IDS_WITH_MEDIA) {
      const slots = BLOCK_REGISTRY[id].usageRequirements?.mediaSlots ?? {};

      expect(Object.keys(slots).length, id).toBeGreaterThan(0);

      for (const slot of Object.values(slots)) {
        expect(slot.note, `${id}:${slot.path}`).toMatch(/IMAGE .*ONLY/i);
        expect(slot.disallowedRoles ?? [], `${id}:${slot.path}`).toEqual(
          expect.arrayContaining(["logo", "favicon", "video-thumbnail"]),
        );
      }
    }
  });

  it("uses absolute media URLs in article exampleProps", () => {
    for (const id of ARTICLE_BLOCK_IDS_WITH_MEDIA) {
      const mediaStrings = collectMediaStrings(BLOCK_REGISTRY[id].exampleProps);

      expect(mediaStrings.length, id).toBeGreaterThan(0);
      for (const value of mediaStrings) {
        expect(value, `${id}:${value}`).toMatch(/^https?:\/\//);
      }
    }
  });
});

describe("createBuilderContractBundle output naming", () => {
  it("emits examples.exampleProps and no examples.defaultData for any block", () => {
    const allBlocks = Object.values(BLOCK_REGISTRY);
    const bundle = createBuilderContractBundle({
      blocks: allBlocks,
      uiVersion: "test",
    });

    for (const block of bundle.blocks) {
      expect(block.examples).toHaveProperty("exampleProps");
      expect(block.examples).not.toHaveProperty("defaultData");
    }
  });

  it("includes hero-mental-health-team example payload under exampleProps", () => {
    const allBlocks = Object.values(BLOCK_REGISTRY);
    const bundle = createBuilderContractBundle({
      blocks: allBlocks,
      uiVersion: "test",
    });

    const mentalHealth = bundle.blocks.find(
      (b) => b.componentId === "hero-mental-health-team",
    );
    expect(mentalHealth).toBeDefined();
    expect(mentalHealth?.examples.exampleProps).toBeDefined();
    expect(mentalHealth?.examples.exampleProps).not.toBeNull();
  });

  it("includes hero-mentorship-video-split usage requirements in bundle", () => {
    const allBlocks = Object.values(BLOCK_REGISTRY);
    const bundle = createBuilderContractBundle({
      blocks: allBlocks,
      uiVersion: "test",
    });

    const mentorship = bundle.blocks.find(
      (b) => b.componentId === "hero-mentorship-video-split",
    );
    expect(mentorship).toBeDefined();
    expect(mentorship?.usageRequirements?.mediaSlots).toBeDefined();
    expect(mentorship?.usageRequirements?.mediaSlots?.image).toBeDefined();
    expect(
      mentorship?.usageRequirements?.mediaSlots?.["modalVideo.video.src"],
    ).toBeDefined();
    expect(mentorship?.examples.exampleProps).toBeDefined();
  });
});
