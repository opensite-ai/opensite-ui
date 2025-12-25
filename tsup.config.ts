import { defineConfig, type Options } from "tsup";
import { writeFileSync, readFileSync } from "fs";
import { join } from "path";

// Entry points that contain client-side React hooks and need "use client" directive
const clientEntryNames = new Set([
  "animated-dialog",
  "page-hero-banner",
  "dynamic-icon",
  "pressable",
  "hooks",
  "use-navigation",
  "media-hover-ctas",
  "feature-showcase",
  "team-media-showcase",
  "footer-links-grid",
  "footer-social-newsletter",
  "footer-social-apps",
  "footer-simple-centered",
  "footer-brand-description",
  "footer-newsletter-grid",
  "footer-cta-banner",
  "footer-contact-card",
  "footer-background-card",
  "footer-animated-social",
  "footer-newsletter-minimal",
  "footer-cta-social",
  "footer-nav-social",
  "components",
  "index",
]);

// Shared configuration
const sharedConfig: Partial<Options> = {
  format: ["esm", "cjs"],
  dts: true,
  splitting: false,
  sourcemap: true,
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
};

// All entries
const allEntries = {
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
  "team-media-showcase": "src/team-media-showcase.ts",
  "footer-links-grid": "src/footer-links-grid.ts",
  "footer-social-newsletter": "src/footer-social-newsletter.ts",
  "footer-social-apps": "src/footer-social-apps.ts",
  "footer-simple-centered": "src/footer-simple-centered.ts",
  "footer-brand-description": "src/footer-brand-description.ts",
  "footer-newsletter-grid": "src/footer-newsletter-grid.ts",
  "footer-cta-banner": "src/footer-cta-banner.ts",
  "footer-contact-card": "src/footer-contact-card.ts",
  "footer-background-card": "src/footer-background-card.ts",
  "footer-animated-social": "src/footer-animated-social.ts",
  "footer-newsletter-minimal": "src/footer-newsletter-minimal.ts",
  "footer-cta-social": "src/footer-cta-social.ts",
  "footer-nav-social": "src/footer-nav-social.ts",
  registry: "src/registry.ts",
  utils: "lib/utils.ts",
  types: "src/types/index.ts",
};

export default defineConfig({
  ...sharedConfig,
  entry: allEntries,
  clean: true,
  // Add "use client" directive to client components after build
  onSuccess: async () => {
    const distDir = "dist";

    for (const entryName of clientEntryNames) {
      // Process both ESM and CJS outputs
      const files = [
        join(distDir, `${entryName}.js`),
        join(distDir, `${entryName}.cjs`),
      ];

      for (const filePath of files) {
        try {
          const content = readFileSync(filePath, "utf-8");
          // Only add if not already present
          if (!content.startsWith('"use client"')) {
            writeFileSync(filePath, `"use client";\n${content}`);
          }
        } catch {
          // File might not exist, skip
        }
      }
    }

    console.log("✓ Added 'use client' directive to client components");
  },
});
