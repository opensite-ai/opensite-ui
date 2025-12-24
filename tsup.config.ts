import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    components: "src/components.ts",
    container: "components/ui/container.tsx",
    section: "components/ui/section.tsx",
    "animated-dialog": "components/ui/animated-dialog.tsx",
    "page-hero-banner": "components/ui/page-hero-banner.tsx",
    button: "components/ui/button.tsx",
    card: "components/ui/card.tsx",
    badge: "components/ui/badge.tsx",
    popover: "components/ui/popover.tsx",
    "dynamic-icon": "components/ui/dynamic-icon.tsx",
    pressable: "lib/Pressable.tsx",
    hooks: "lib/hooks.ts",
    "use-navigation": "lib/useNavigation.ts",
    "alternating-blocks": "src/alternating-blocks.ts",
    "media-hover-ctas": "src/media-hover-ctas.ts",
    "feature-showcase": "src/feature-showcase.ts",
    registry: "src/registry.ts",
    utils: "lib/utils.ts",
    types: "src/types/index.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: false,
  external: [
    "react",
    "react-dom",
    "framer-motion",
    "@opensite/hooks",
    "@legendapp/state",
    "valibot",
  ],
  // Note: "use client" directive removed - should be added by consuming application
  // For Next.js 13+ App Router, add "use client" at the top of files that import this library
});
