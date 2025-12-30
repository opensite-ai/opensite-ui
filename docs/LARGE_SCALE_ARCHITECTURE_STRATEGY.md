# Large Scale Architecture Strategy for Component Library

This document outlines comprehensive strategies for scaling the @opensite/ui component library to support thousands of semantic UI blocks while maintaining optimal NPM package size and ensuring exceptional performance for client websites. The strategies presented here align with the Semantic Site Builder architecture and the DashTrack Ecosystem Performance Guidelines.

## Executive Summary

The @opensite/ui component library faces a fundamental scaling challenge: as the library grows to support the full Semantic UI engine with 1000+ blocks, the NPM package size threatens to become unmanageable. This document presents five distinct architectural approaches, each with trade-offs between implementation complexity, runtime performance, and developer experience. The recommended path forward combines immediate optimizations (Approach A) with a phased migration to a hybrid architecture (Approach E) that leverages the Rust octane K/V store for component metadata and lazy-loading for runtime efficiency.

## Current State Analysis

### Package Size Breakdown (Before Optimization)

The initial analysis revealed two primary contributors to the 128.6 MB unpacked size:

The first major contributor was source maps, which accounted for approximately 65% of the package size. The registry.js.map and registry.cjs.map files alone were 9.5 MB each, and every component generated two .map files averaging 50-100 KB each. With 400+ components, this added roughly 80 MB to the package.

The second contributor was the registry bundling issue. The src/registry/blocks.ts file imports all 400+ components directly at the top of the file (lines 16-787), which forces the bundler to include every component in the registry output files. This resulted in registry.js (4.3 MB) and registry.cjs (4.5 MB) containing the entire component library.

### Immediate Optimization Results

By disabling source maps in the production build (via tsup.config.ts), we achieved the following reductions:

| Metric | Before | After | Reduction |
|--------|--------|-------|-----------|
| Package size | 24.4 MB | 6.5 MB | 73% |
| Unpacked size | 128.6 MB | 41.7 MB | 68% |
| Total files | 2,941 | 1,965 | 33% |

Source maps can still be generated for debugging by setting `GENERATE_SOURCEMAPS=true` during the build process.

## Architectural Approaches

### Approach A: Build Configuration Optimization (Implemented)

This approach focuses on optimizing the build process without changing the library's architecture.

The implementation involves disabling source maps by default in tsup.config.ts, using the environment variable `GENERATE_SOURCEMAPS=true` to enable them when needed for debugging. The .npmignore file was created to exclude development files from the published package, though this is secondary to the tsup configuration since the `files` field in package.json takes precedence.

The advantages of this approach include minimal code changes required, no breaking changes to the API, immediate and significant size reduction, and the ability to maintain source maps for local development. The disadvantages are that it doesn't address the registry bundling issue, provides limited scalability as the component count grows, and still includes all components in the registry files.

This approach is recommended as the immediate solution and has been implemented in this PR.

### Approach B: Metadata-Only Registry with Lazy Loading

This approach separates component metadata from component code, allowing the registry to be lightweight while components are loaded on-demand.

The architecture involves creating a new BlockMetadata interface that replaces the component field with modulePath and exportName fields. The registry would contain only metadata (id, name, description, semanticTags, category, modulePath, exportName, props, exampleUsage) without importing any components. A lazy loader utility would dynamically import components when needed.

```typescript
// src/registry/types.ts
export interface BlockMetadata {
  id: string;
  name: string;
  description: string;
  semanticTags: string[];
  category: BlockCategory;
  modulePath: string;  // e.g., "@opensite/ui/blocks/about/alternating-blocks"
  exportName: string;  // e.g., "AlternatingBlocks"
  props: string;
  exampleUsage: string;
}

// Lazy loader utility
export async function loadBlockComponent<T = any>(
  metadata: BlockMetadata
): Promise<React.ComponentType<T> | null> {
  try {
    const module = await import(metadata.modulePath);
    return module[metadata.exportName] || module.default;
  } catch (error) {
    console.error(`Failed to load block: ${metadata.id}`, error);
    return null;
  }
}
```

The estimated impact would reduce registry files from ~14 MB combined to ~500 KB, representing a 96% reduction in registry size. The advantages include dramatic registry size reduction, components loaded only when needed, no breaking changes if both registries are exported, and alignment with the Semantic Site Builder's AI-driven component discovery. The disadvantages are that it requires async component loading in consuming applications, adds complexity to the CMS and site builder, and may impact initial render time if not properly optimized.

This approach is recommended for Phase 2 implementation after validating the immediate optimizations.

### Approach C: Sub-Module Package Splitting

This approach splits the monolithic @opensite/ui package into multiple smaller packages organized by category or functionality.

The proposed package structure would include @opensite/ui-core for shared utilities, types, and base components; @opensite/ui-registry for metadata-only registry with no component imports; @opensite/ui-blocks-about for about section blocks; @opensite/ui-blocks-hero for hero section blocks; @opensite/ui-blocks-features for feature section blocks; and similar packages for each category (cta, testimonials, services, footer, header, pricing, team, stats, faq, contact, etc.).

```
@opensite/ui-core          (~500 KB) - Shared utilities, types, base components
@opensite/ui-registry      (~200 KB) - Metadata-only registry
@opensite/ui-blocks-about  (~2 MB)   - About section blocks
@opensite/ui-blocks-hero   (~2 MB)   - Hero section blocks
@opensite/ui-blocks-features (~2 MB) - Feature section blocks
... (one package per category)
```

The advantages include granular installation where applications only install needed categories, independent versioning and updates per category, smaller individual package sizes, and clear separation of concerns. The disadvantages are significant maintenance overhead with 20+ packages to manage, complex dependency management between packages, potential version conflicts, and a more complex developer experience for consumers.

This approach is not recommended as the primary strategy due to maintenance complexity, but could be considered for specific high-traffic categories.

### Approach D: Rust Octane K/V Store Integration

This approach leverages the existing Rust octane application's high-performance K/V store to serve component metadata and potentially component code on-demand.

The architecture would store component metadata in the octane K/V store, with the CMS and AI agents querying octane for component discovery. Component code would be served from CDN with octane providing routing and caching, and the client-side runtime would fetch components as needed.

```typescript
// Component metadata stored in octane K/V
interface OctaneBlockEntry {
  id: string;
  metadata: BlockMetadata;
  cdnPath: string;           // CDN URL for component bundle
  dependencies: string[];     // Required peer dependencies
  bundleSize: number;        // Size in bytes for budget tracking
  lastUpdated: string;       // ISO timestamp
}

// Client-side loader
class OctaneComponentLoader {
  private cache = new Map<string, React.ComponentType>();
  
  async loadComponent(id: string): Promise<React.ComponentType | null> {
    if (this.cache.has(id)) {
      return this.cache.get(id)!;
    }
    
    // Fetch metadata from octane
    const entry = await fetch(`${OCTANE_URL}/components/${id}`).then(r => r.json());
    
    // Load component from CDN
    const module = await import(/* webpackIgnore: true */ entry.cdnPath);
    const component = module[entry.metadata.exportName] || module.default;
    
    this.cache.set(id, component);
    return component;
  }
}
```

The advantages include near-zero NPM package size for the registry, instant updates without NPM publishes, leverages existing high-performance Rust infrastructure, enables sophisticated caching and analytics, and aligns with the platform's performance-first architecture. The disadvantages are that it requires octane infrastructure changes, adds network dependency for component discovery, more complex deployment pipeline, and requires careful cache invalidation strategy.

This approach is recommended for Phase 3 as a long-term scalability solution.

### Approach E: Hybrid Architecture (Recommended Long-Term)

This approach combines the best elements of the previous approaches into a cohesive architecture that scales with the platform's growth.

The architecture has three tiers. The first tier is the NPM Package containing core utilities, base components, and the most commonly used blocks (top 20-30 by usage). The second tier is the CDN Layer serving pre-built component bundles for all blocks with aggressive caching. The third tier is the Octane K/V Store providing component metadata, usage analytics, and intelligent prefetching hints.

```
┌─────────────────────────────────────────────────────────────────┐
│                     Client Website Request                       │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    @opensite/blocks Runtime                      │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │  Core Components │  │  Block Loader   │  │  Cache Manager  │ │
│  │  (NPM Package)   │  │  (Lazy Import)  │  │  (IndexedDB)    │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                                │
              ┌─────────────────┼─────────────────┐
              ▼                 ▼                 ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   NPM Package   │  │   CDN Layer     │  │  Octane K/V     │
│   (@opensite/ui)│  │  (Component     │  │  (Metadata +    │
│                 │  │   Bundles)      │  │   Analytics)    │
│  - Core utils   │  │                 │  │                 │
│  - Base comps   │  │  - All blocks   │  │  - Discovery    │
│  - Top 30 blocks│  │  - Versioned    │  │  - Prefetch     │
│  - Types        │  │  - Cached       │  │  - Usage stats  │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

The implementation phases would proceed as follows:

Phase 1 (Current PR) focuses on build optimization by disabling source maps, creating metadata types, and documenting the architecture strategy.

Phase 2 (Next Sprint) implements the metadata-only registry by refactoring blocks.ts to use BlockMetadata, creating a lazy loader utility, updating @opensite/blocks to use lazy loading, and adding prefetching for above-the-fold components.

Phase 3 (Q1 2026) involves CDN component serving by building individual component bundles for CDN deployment, implementing versioned CDN paths, adding cache headers aligned with toastability-service patterns, and creating a fallback to NPM package for offline/development.

Phase 4 (Q2 2026) completes the octane integration by adding component metadata endpoints to octane, implementing usage analytics collection, building intelligent prefetching based on page patterns, and adding A/B testing support for component variants.

The advantages of this hybrid approach include optimal performance through tiered loading, scalability to 10,000+ components without NPM size issues, leveraging existing infrastructure investments, graceful degradation when CDN/octane unavailable, and enabling advanced features like usage analytics and A/B testing. The disadvantages are the highest implementation complexity, requiring coordination across multiple services, and needing careful monitoring and fallback handling.

## Performance Considerations

### Core Web Vitals Alignment

All approaches must maintain compliance with the ecosystem's Core Web Vitals targets: LCP ≤ 2.5s, INP ≤ 200ms, and CLS ≤ 0.1.

For LCP optimization, critical above-the-fold components (hero, header) should be included in the NPM package or aggressively prefetched. Component bundles should be preloaded using `<link rel="preload">` hints, and the CDN should serve components from edge locations close to users.

For INP optimization, lazy loading should not block user interactions. Component hydration should be deferred for below-the-fold content, and event handlers should be attached immediately even before full component load.

For CLS prevention, component dimensions should be known before loading via metadata. Skeleton loaders should match final component dimensions, and layout shifts during component loading should be avoided.

### Bundle Size Budgets

The recommended bundle size budgets per component category are: Hero blocks should be under 50 KB gzipped, Feature blocks should be under 30 KB gzipped, Footer/Header blocks should be under 20 KB gzipped, and Utility components should be under 10 KB gzipped.

The total initial bundle (NPM package) should target under 100 KB gzipped for core utilities plus the top 30 blocks.

### Caching Strategy

The caching strategy should align with toastability-service patterns. Component bundles should have a browser TTL of 1 year with versioned URLs. Metadata should have a browser TTL of 1 hour with ETag revalidation. The client-side cache should use IndexedDB for offline support, storing the full React library and component code as described in the ecosystem guidelines.

## Migration Path

### For @opensite/blocks Consumers

The migration from the current approach to the hybrid architecture should be seamless for most use cases. The current import pattern of `import { BlocksRenderer } from "@opensite/blocks"` will continue to work, with the BlocksRenderer internally handling lazy loading. For advanced use cases requiring direct component access, a new async API will be provided: `const Hero = await loadBlock("hero-floating-images")`.

### For CMS/Builder Integration

The CMS will need updates to use the metadata-only registry for component discovery. The AI agent will query octane for semantic component matching. The preview system will use the same lazy loading as production sites.

### For Custom Integrations

Direct component imports like `import { AlternatingBlocks } from "@opensite/ui/blocks/about/alternating-blocks"` will continue to work for the NPM-included components. For CDN-served components, a loader utility will be provided.

## Monitoring and Analytics

### Key Metrics to Track

Component loading metrics should include time to first render per component, cache hit rates for CDN and IndexedDB, and fallback frequency when CDN is unavailable.

Bundle size metrics should track NPM package size over time, individual component bundle sizes, and total bytes transferred per page.

Usage analytics should monitor component usage frequency across all sites, unused components for potential deprecation, and error rates per component.

### Alerting Thresholds

Alerts should be configured for NPM package size exceeding 10 MB, any component bundle exceeding 100 KB gzipped, CDN cache hit rate falling below 95%, and component load time exceeding 500ms p95.

## Conclusion

The recommended path forward combines immediate build optimizations (Approach A, implemented in this PR) with a phased migration to the hybrid architecture (Approach E). This approach provides immediate relief for the NPM package size issue while establishing a scalable foundation for the full Semantic UI engine rollout.

The key success factors are maintaining backward compatibility throughout the migration, ensuring Core Web Vitals compliance at every phase, leveraging existing infrastructure (octane, toastability-service CDN), and implementing comprehensive monitoring before each phase.

The estimated timeline for full implementation is 6-9 months, with significant benefits realized at each phase. Phase 1 alone (this PR) reduces the package size by 68%, providing immediate relief for the publishing issues.
