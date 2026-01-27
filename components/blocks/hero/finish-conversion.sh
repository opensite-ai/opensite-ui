#!/bin/bash

# Automated script to finish useMemo conversion for remaining 38 hero blocks
# This handles the mechanical parts - dependency arrays MUST be manually reviewed!

set -e

echo "========================================="
echo "Hero Blocks useMemo Conversion Script"
echo "========================================="
echo ""
echo "This script will:"
echo "  1. Add useMemo imports (if missing)"
echo "  2. Convert render functions to useMemo"
echo "  3. Update JSX calls {renderX()} to {renderX}"
echo "  4. Add placeholder dependency arrays"
echo ""
echo "⚠️  WARNING: Dependency arrays will need manual review!"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Aborted."
    exit 1
fi

FILES=(
  "hero-grid-pattern-efficiency.tsx"
  "hero-grid-pattern-solutions.tsx"
  "hero-logo-centered-screenshot.tsx"
  "hero-marketplace-scattered-images.tsx"
  "hero-mental-health-team.tsx"
  "hero-mentorship-video-split.tsx"
  "hero-minimal-centered-dark.tsx"
  "hero-mobile-app-download.tsx"
  "hero-newsletter-minimal.tsx"
  "hero-overlay-cta-grid.tsx"
  "hero-pattern-badge-logos.tsx"
  "hero-pattern-logo-tech-stack.tsx"
  "hero-platform-features-grid.tsx"
  "hero-portfolio-creative.tsx"
  "hero-premium-split-avatars.tsx"
  "hero-presentation-platform-video.tsx"
  "hero-pricing-comparison.tsx"
  "hero-product-showcase-floating.tsx"
  "hero-productivity-launcher-video.tsx"
  "hero-saas-dashboard-preview.tsx"
  "hero-shared-inbox-layered.tsx"
  "hero-software-growth-video-dialog.tsx"
  "hero-spiral-pattern-cards.tsx"
  "hero-split-geometric-shapes.tsx"
  "hero-split-icon-cards.tsx"
  "hero-split-image-newsletter.tsx"
  "hero-split-spiral-shapes.tsx"
  "hero-startup-launch-cta.tsx"
  "hero-stats-social-proof.tsx"
  "hero-task-timer-animated.tsx"
  "hero-tech-carousel.tsx"
  "hero-testimonial-image-grid.tsx"
  "hero-therapy-testimonial-grid.tsx"
  "hero-ui-library-showcase.tsx"
  "hero-video-background-dark.tsx"
  "hero-video-dialog-gradient.tsx"
  "hero-video-overlay-stars.tsx"
  "hero-welcome-asymmetric-images.tsx"
)

converted=0
skipped=0

for file in "${FILES[@]}"; do
  if [ ! -f "$file" ]; then
    echo "  ✗ File not found: $file"
    ((skipped++))
    continue
  fi

  echo "Processing: $file"

  # Step 1: Ensure useMemo import is present (already done but check again)
  if ! grep -q "import { useMemo } from \"react\";" "$file"; then
    echo "  ⚠️  useMemo import missing, adding..."
    sed -i '' 's/import \* as React from "react";/import * as React from "react";\nimport { useMemo } from "react";/' "$file"
  fi

  # Step 2: Convert render function declarations
  # Pattern: const renderX = () => {  →  const renderX = useMemo(() => {
  perl -i -pe 's/^(\s+const render\w+) = \(\) => \{/$1 = useMemo(() => {/' "$file"

  # Step 3: Convert function closings to add dependency arrays
  # This is complex - we'll add empty arrays as placeholders
  # Pattern: };  →  }, []);  (but only for render functions with useMemo)
  # We do this by looking for closing braces that follow useMemo patterns

  # Create temp file for processing
  temp_file="${file}.temp"
  awk '
  /const render\w+ = useMemo/ { in_render = 1; brace_count = 0 }
  in_render {
    # Count braces
    for (i=1; i<=length($0); i++) {
      c = substr($0, i, 1)
      if (c == "{") brace_count++
      else if (c == "}") brace_count--
    }

    # If we find the closing brace at depth 0, convert it
    if (brace_count == 0 && $0 ~ /^\s+\};$/) {
      sub(/\};$/, "}, []);")
      in_render = 0
    }
  }
  { print }
  ' "$file" > "$temp_file"
  mv "$temp_file" "$file"

  # Step 4: Update JSX calls {renderX()} → {renderX}
  perl -i -pe 's/\{(render\w+)\(\)\}/\{$1\}/g' "$file"

  echo "  ✓ Converted"
  ((converted++))
done

echo ""
echo "========================================="
echo "Conversion Complete!"
echo "========================================="
echo "  Converted: $converted files"
echo "  Skipped: $skipped files"
echo ""
echo "⚠️  CRITICAL NEXT STEPS:"
echo ""
echo "1. Manually review EVERY converted file"
echo "2. Add proper dependencies to useMemo arrays"
echo "3. Use CONVERSION_GUIDE.md for dependency patterns"
echo "4. Run 'pnpm build' to verify"
echo ""
echo "Common dependencies:"
echo "  - renderActions: [actionsSlot, actions, actionsClassName]"
echo "  - renderImages: [imagesSlot, images, imagesClassName, optixFlowConfig]"
echo "  - renderBadge: [badgeSlot, badgeText, badgeIcon]"
echo ""
echo "See CONVERSION_GUIDE.md for complete patterns!"
echo ""
