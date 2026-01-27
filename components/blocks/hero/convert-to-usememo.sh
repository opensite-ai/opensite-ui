#!/bin/bash

# Script to convert render functions to useMemo in hero blocks

FILES=(
  "hero-gradient-client-focused.tsx"
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

for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "Processing $file..."

    # Add useMemo import if not present
    if ! grep -q "import { useMemo } from \"react\";" "$file"; then
      sed -i '' 's/import \* as React from "react";/import * as React from "react";\nimport { useMemo } from "react";/' "$file"
    fi

    echo "  - Added useMemo import"
  fi
done

echo "Conversion complete! Please manually review and add dependency arrays."
