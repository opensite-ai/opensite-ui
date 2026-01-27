#!/bin/bash

# Batch convert render functions to useMemo
# This script handles the mechanical conversion, but dependency arrays must be manually reviewed

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

echo "Starting batch conversion..."
echo "Files to process: ${#FILES[@]}"
echo ""

for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "Processing: $file"

    # Convert: const renderX = () => { to const renderX = useMemo(() => {
    perl -i -pe 's/^(\s+const render\w+ = )\(\) => \{/$1useMemo(() => {/' "$file"

    # Replace JSX calls {renderX()} with {renderX}
    perl -i -pe 's/\{(render\w+)\(\)\}/\{$1\}/g' "$file"

    echo "  ✓ Converted render functions"
    echo "  ⚠️  NOTE: Dependency arrays set to [], need manual review!"
    echo ""
  else
    echo "  ✗ File not found: $file"
  fi
done

# Now add placeholder dependency arrays - these MUST be manually reviewed
for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    # Add }, []); after function closings that don't have dependency arrays yet
    # This is a simple placeholder - dependencies must be added manually
    perl -i -pe 's/^(\s+)\};(\s*$)/$1}, []);$2/ if /useMemo/' "$file"
  fi
done

echo ""
echo "========================================="
echo "✅ Batch conversion complete!"
echo "========================================="
echo ""
echo "⚠️  IMPORTANT: All dependency arrays are set to []"
echo "   You MUST manually review each file and add proper dependencies!"
echo ""
echo "   Pattern: useMemo(() => { ... }, [dep1, dep2]);"
echo ""
