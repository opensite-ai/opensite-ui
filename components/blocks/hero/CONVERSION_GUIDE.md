# Hero Blocks useMemo Conversion Guide

## Status: 10/48 Complete

### Completed Files ✓
1. hero-design-carousel-portfolio.tsx
2. hero-design-showcase-logos.tsx
3. hero-design-system-3d.tsx
4. hero-developer-tools-code.tsx
5. hero-digital-agency-fullscreen.tsx
6. hero-ecommerce-product-showcase.tsx
7. hero-enterprise-security.tsx
8. hero-event-registration.tsx
9. hero-gradient-avatars-rating.tsx
10. hero-gradient-client-focused.tsx

### Remaining Files (38)
- hero-grid-pattern-efficiency.tsx
- hero-grid-pattern-solutions.tsx
- hero-logo-centered-screenshot.tsx
- hero-marketplace-scattered-images.tsx
- hero-mental-health-team.tsx
- hero-mentorship-video-split.tsx
- hero-minimal-centered-dark.tsx
- hero-mobile-app-download.tsx
- hero-newsletter-minimal.tsx
- hero-overlay-cta-grid.tsx
- hero-pattern-badge-logos.tsx
- hero-pattern-logo-tech-stack.tsx
- hero-platform-features-grid.tsx
- hero-portfolio-creative.tsx
- hero-premium-split-avatars.tsx
- hero-presentation-platform-video.tsx
- hero-pricing-comparison.tsx
- hero-product-showcase-floating.tsx
- hero-productivity-launcher-video.tsx
- hero-saas-dashboard-preview.tsx
- hero-shared-inbox-layered.tsx
- hero-software-growth-video-dialog.tsx
- hero-spiral-pattern-cards.tsx
- hero-split-geometric-shapes.tsx
- hero-split-icon-cards.tsx
- hero-split-image-newsletter.tsx
- hero-split-spiral-shapes.tsx
- hero-startup-launch-cta.tsx
- hero-stats-social-proof.tsx
- hero-task-timer-animated.tsx
- hero-tech-carousel.tsx
- hero-testimonial-image-grid.tsx
- hero-therapy-testimonial-grid.tsx
- hero-ui-library-showcase.tsx
- hero-video-background-dark.tsx
- hero-video-dialog-gradient.tsx
- hero-video-overlay-stars.tsx
- hero-welcome-asymmetric-images.tsx

## Conversion Pattern

### Step 1: Add useMemo import
```typescript
// Before
import * as React from "react";

// After
import * as React from "react";
import { useMemo } from "react";
```

### Step 2: Convert render functions
```typescript
// Before
const renderActions = () => {
  if (actionsSlot) return actionsSlot;
  if (!actions || actions.length === 0) return null;
  return (
    <div className={cn("flex gap-4", actionsClassName)}>
      {actions.map((action, index) => (
        <Pressable key={index} {...action} />
      ))}
    </div>
  );
};

// After
const renderActions = useMemo(() => {
  if (actionsSlot) return actionsSlot;
  if (!actions || actions.length === 0) return null;
  return (
    <div className={cn("flex gap-4", actionsClassName)}>
      {actions.map((action, index) => (
        <Pressable key={index} {...action} />
      ))}
    </div>
  );
}, [actionsSlot, actions, actionsClassName]);
```

### Step 3: Update JSX calls
```typescript
// Before
{renderActions()}

// After
{renderActions}
```

## Dependency Array Guidelines

### Common Dependencies by Render Function:

1. **renderActions**: `[actionsSlot, actions, actionsClassName]`
2. **renderBadge**: `[badgeSlot, badgeText, badgeIcon]`
3. **renderImages**: `[imagesSlot, images, imagesClassName, optixFlowConfig]`
4. **renderLogos**: `[logosSlot, logos, logosClassName, optixFlowConfig]`
5. **renderFeatures**: `[featuresSlot, features, featuresClassName]`
6. **renderStats**: `[statsSlot, stats, statsClassName]`
7. **renderVideo**: `[videoSlot, video, videoClassName]`
8. **renderCarousel**: `[carouselSlot, carouselImages, carouselClassName, optixFlowConfig]`

### Rule of Thumb:
- Include the corresponding `Slot` prop (e.g., `actionsSlot`)
- Include the data array/object (e.g., `actions`, `images`)
- Include className props used in the function
- Include `optixFlowConfig` if `<Img>` is rendered

## Automated Conversion Script

Use the provided `finish-conversion.sh` script to complete remaining files:

```bash
chmod +x finish-conversion.sh
./finish-conversion.sh
```

This will:
1. Add useMemo imports
2. Convert render functions
3. Update JSX calls
4. Add placeholder dependency arrays (MUST be manually reviewed!)

## Verification

After conversion, run:
```bash
pnpm build
```

All files should compile without errors.

##  Important Notes

- **useMemo** is used for memoization to prevent unnecessary re-renders
- Dependency arrays MUST include all props/state used in the function
- Missing dependencies can cause stale closure bugs
- Extra dependencies cause unnecessary re-computations
- When in doubt, include the dependency

## Common Patterns

### Pattern 1: Slot Override
```typescript
const renderX = useMemo(() => {
  if (xSlot) return xSlot;
  // ... rest of logic
}, [xSlot, ...]);
```

### Pattern 2: Conditional Rendering
```typescript
const renderX = useMemo(() => {
  if (!data || data.length === 0) return null;
  // ... rest of logic
}, [data, ...]);
```

### Pattern 3: Image Rendering
```typescript
const renderImage = useMemo(() => {
  if (imageSlot) return imageSlot;
  if (!image) return null;
  return (
    <Img
      src={image.src}
      alt={image.alt}
      className={cn(imageClassName, image.className)}
      optixFlowConfig={optixFlowConfig}
    />
  );
}, [imageSlot, image, imageClassName, optixFlowConfig]);
```
