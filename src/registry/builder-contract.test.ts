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

  it("propagates structured usage requirements and defaultProps into the contract", () => {
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
        defaultProps: { heading: "Hello" },
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
    expect(hero.examples.defaultData).toEqual({ heading: "Hello" });
  });

  it("falls back to null usage metadata when a block does not declare any", () => {
    const bundle = createBuilderContractBundle({
      blocks: SAMPLE_BLOCKS,
      uiVersion: "3.2.1",
    });

    for (const block of bundle.blocks) {
      expect(block.importantUsageNotes).toBeNull();
      expect(block.usageRequirements).toBeNull();
      expect(block.examples.defaultData).toBeNull();
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

  it("provides a structured defaultProps payload covering required slots", () => {
    const defaultProps = entry.defaultProps as
      | Record<string, unknown>
      | undefined;
    expect(defaultProps).toBeDefined();
    expect(Array.isArray(defaultProps?.smallImages)).toBe(true);
    expect((defaultProps?.smallImages as unknown[]).length).toBe(2);
    expect(defaultProps?.featureImage).toBeDefined();
    expect(defaultProps?.testimonial).toBeDefined();
  });
});
