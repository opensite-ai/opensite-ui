import type {
  BlockCategory,
  BlockRegistryEntry,
  BuilderContractBlock,
  BuilderContractBlockSource,
  BuilderContractBundle,
  BuilderContractLayoutRole,
} from "./types";

export const BUILDER_CONTRACT_VERSION = "v1";

export interface CreateBuilderContractBundleOptions {
  blocks: BlockRegistryEntry[];
  uiVersion: string;
  exportedAt?: string;
  source?: string;
  blockSources?: Record<string, BuilderContractBlockSource>;
}

const REQUIRED_TOKEN_FAMILIES = [
  "color",
  "typography",
  "spacing",
  "radius",
  "shadow",
] as const;

const REQUIRED_SEMANTIC_COLOR_ROLES = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "destructive-foreground",
  "border",
  "input",
  "ring",
] as const;

function toPascalCase(value: string): string {
  return value
    .split(/[-_\/]/)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join("");
}

function normalizeCategorySegment(category: BlockCategory): string {
  if (category === "navbar") {
    return "navbars";
  }

  if (category === "footer") {
    return "footers";
  }

  return category;
}

function inferLayoutRole(
  blockRef: string,
  category: BlockCategory,
): BuilderContractLayoutRole {
  if (blockRef.startsWith("navbars/") || category === "navbar") {
    return "header";
  }

  if (blockRef.startsWith("footers/") || category === "footer") {
    return "footer";
  }

  return "page";
}

function normalizeBlock(
  block: BlockRegistryEntry,
  source: BuilderContractBlockSource | undefined,
): BuilderContractBlock {
  const blockRef =
    source?.exportPath.replace(/^\.\/blocks\//, "") ??
    `${normalizeCategorySegment(block.category)}/${block.id}`;
  const component = block.component as React.ComponentType & {
    displayName?: string;
  };
  const blockName =
    component.displayName || component.name || toPascalCase(block.id);

  return {
    componentId: block.id,
    blockName,
    blockRef,
    displayName: block.name,
    description: block.description,
    category: block.category,
    semanticTags: [...block.semanticTags],
    layoutRole: inferLayoutRole(blockRef, block.category),
    propsContract: {
      type: "typescript-type-reference",
      reference: block.props,
      runtimeSchema: null,
      runtimeSchemaStatus: "missing",
    },
    examples: {
      exampleUsage: block.exampleUsage || null,
      exampleProps: block.exampleProps
        ? (JSON.parse(JSON.stringify(block.exampleProps)) as Record<
            string,
            unknown
          >)
        : null,
    },
    source: source ?? null,
    importantUsageNotes: block.importantUsageNotes ?? null,
    usageRequirements: block.usageRequirements
      ? (JSON.parse(JSON.stringify(block.usageRequirements)) as NonNullable<
          BlockRegistryEntry["usageRequirements"]
        >)
      : null,
  };
}

export function createBuilderContractBundle({
  blocks,
  uiVersion,
  exportedAt = new Date().toISOString(),
  source = "@opensite/ui",
  blockSources = {},
}: CreateBuilderContractBundleOptions): BuilderContractBundle {
  const normalizedBlocks = blocks
    .map((block) => normalizeBlock(block, blockSources[block.id]))
    .sort((left, right) => left.blockRef.localeCompare(right.blockRef));

  const headerBlockRefs = normalizedBlocks
    .filter((block) => block.layoutRole === "header")
    .map((block) => block.blockRef);
  const footerBlockRefs = normalizedBlocks
    .filter((block) => block.layoutRole === "footer")
    .map((block) => block.blockRef);

  return {
    metadata: {
      contractVersion: BUILDER_CONTRACT_VERSION,
      uiVersion,
      exportedAt,
      source,
      totalBlocks: normalizedBlocks.length,
    },
    blocks: normalizedBlocks,
    sharedLayout: {
      canonicalLayoutKey: "_layout",
      sections: {
        header: {
          sourceType: "website_navbar",
          sourceOfTruth: "WebsiteNavBar",
          aiAuthoring: "variant_request_only",
          canonicalPayloadKey: "header",
          allowedBlockRefs: headerBlockRefs,
        },
        footer: {
          sourceType: "shared_footer_page",
          sourceOfTruth: "aliased/shared footer pages",
          aiAuthoring: "variant_request_only",
          canonicalPayloadKey: "footer",
          allowedBlockRefs: footerBlockRefs,
        },
      },
    },
    dynamicSources: {
      blog_feed: {
        sourceType: "blog_feed",
        symbolic: true,
        hydrationOwner: "dashtrack-ai",
        hydrationPhase: "routing-build",
        canonicalPayloadExpectation:
          "Keep blog feed requests symbolic in canonical page JSON until routing-build hydration resolves them.",
        requiredFields: ["type"],
        optionalFields: [
          "limit",
          "offset",
          "category",
          "tag",
          "featuredOnly",
          "bindTo",
        ],
      },
      blog_post: {
        sourceType: "blog_post",
        symbolic: true,
        hydrationOwner: "dashtrack-ai",
        hydrationPhase: "routing-build",
        canonicalPayloadExpectation:
          "Keep blog post requests symbolic in canonical page JSON until routing-build hydration resolves them.",
        requiredFields: ["type"],
        optionalFields: ["slug", "current", "bindTo"],
      },
      testimonials_feed: {
        sourceType: "testimonials_feed",
        symbolic: true,
        hydrationOwner: "dashtrack-ai",
        hydrationPhase: "routing-build",
        canonicalPayloadExpectation:
          "Keep testimonials feed requests symbolic in canonical page JSON until routing-build hydration resolves them into TestimonialItem[] (or a single TestimonialItem for single-bind blocks). Wire mapping: content -> quote, reviewer_name -> author, rating -> rating (only when numeric; never fabricated), profile_url + platform -> linkConfig; avatars are intentionally left unmapped in Phase 2 because review avatar URLs are hotlinked and rot-prone.",
        requiredFields: ["type"],
        optionalFields: ["limit", "minRating", "platforms", "locationId", "bindTo"],
      },
      instagram_feed: {
        sourceType: "instagram_feed",
        symbolic: true,
        hydrationOwner: "dashtrack-ai",
        hydrationPhase: "routing-build",
        canonicalPayloadExpectation:
          "Keep Instagram feed requests symbolic in canonical page JSON until routing-build hydration resolves them.",
        requiredFields: ["type"],
        optionalFields: ["limit", "profile", "hashtag", "bindTo"],
      },
      events_feed: {
        sourceType: "events_feed",
        symbolic: true,
        hydrationOwner: "dashtrack-ai",
        hydrationPhase: "routing-build",
        canonicalPayloadExpectation:
          "Keep events feed requests symbolic in canonical page JSON until routing-build hydration resolves them. events_feed is the first EXPANDING source (expands: true): ONE symbolic block hydrates into N hero-event-registration block instances, one per event occurrence (limit default 6, hard cap 12). Wire mapping (§4.1d; never fabricate — omit any field with no real data): title -> heading, description -> description (omitted when blank), starts_at -> badgeText (short date badge, e.g. 'JUL 18'), starts_at in the event timezone -> locationLabel, location_name or custom_address -> locationSublabel, image_url -> image ({src, alt: title}, only when present), price_from -> stats[{value: '$X', label: 'From'}], recurring_summary -> stats[{value, label: 'Schedule'}], registration_url -> actions[{label: 'Register', href}]. stats, actions, and image are omitted entirely when no real data exists. The 'events' capability is soft: hero-event-registration is dual-use (authored single-event/catering usage stays legitimate), so octane must not hard-drop on the capability alone.",
        requiredFields: ["type"],
        optionalFields: ["limit", "upcomingOnly", "locationIds", "bindTo"],
        expands: true,
      },
    },
    designTokens: {
      canonicalSource: "theme_config",
      derivedArtifacts: ["tailwind_css"],
      requiredTokenFamilies: [...REQUIRED_TOKEN_FAMILIES],
      requiredSemanticColorRoles: [...REQUIRED_SEMANTIC_COLOR_ROLES],
      policy:
        "theme_config is canonical and tailwind_css must be derived from it; blocks should consume semantic tokens rather than hardcoded theme values.",
    },
    pageRules: {
      outputFormat: "route-map",
      routeKeyPattern: "^/$|^/.+",
      sharedLayoutKey: "_layout",
      routeEntry: {
        requiredKeys: ["pageId", "pageIds", "blocks"],
        blocksKey: "blocks",
      },
      blockEntry: {
        requiredKeys: ["block_name", "block_ref", "data"],
        blockRefSource: "BuilderContractBundle.blocks[].blockRef",
        blockNameSource: "BuilderContractBundle.blocks[].blockName",
      },
      sharedLayoutComposition: {
        owner: "dashtrack-ai",
        headerSource: "WebsiteNavBar",
        footerSource: "aliased/shared footer pages",
      },
      dynamicHydration: {
        symbolicInCanonicalPageJson: true,
        owner: "dashtrack-ai",
        phase: "routing-build",
      },
    },
  };
}
