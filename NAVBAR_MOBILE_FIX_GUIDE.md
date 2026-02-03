# Navbar Mobile Fix Guide

This guide explains how to apply the mobile menu fixes to all navbar blocks.

## Issues Fixed

1. **Mobile container padding**: Navbar content was pushed against screen edges with no horizontal padding
2. **Mobile menu portal issue**: Sheet component used portals that broke out of iframe/preview containers

## Changes Made

### 1. Layout Variant Utils (Affects All Navbars)
**File**: `components/blocks/navbars/layout-variant-utils.ts`

Added responsive horizontal padding to both layout variants:

```typescript
// Before:
innerContainerClasses: cn(
  isContainerizedLinks && "container",
  isFullWidthLinks && "mx-auto w-full px-2 sm:px-4 lg:px-8",
  customClasses?.containerClassName,
),

// After:
innerContainerClasses: cn(
  isContainerizedLinks && "container px-4 sm:px-6 lg:px-8",
  isFullWidthLinks && "mx-auto w-full px-4 sm:px-6 lg:px-8",
  customClasses?.containerClassName,
),
```

**Result**: All navbars now have proper horizontal padding on mobile (16px on mobile, 24px on tablet, 32px on desktop).

### 2. New Shared Mobile Menu Component
**File**: `components/ui/navbar-mobile-menu.tsx` (NEW)

Created a reusable mobile menu component that:
- Does NOT use portals (stays in React tree)
- Uses fixed positioning that respects container boundaries
- Includes smooth animations
- Has built-in close button
- Provides scrollable content area
- Prevents body scroll when open

**Key Features**:
```typescript
<NavbarMobileMenu
  open={open}
  onClose={() => setOpen(false)}
  title="Mobile Navigation"
  contentClassName="pt-4 pb-20"
>
  {/* Your mobile menu content */}
</NavbarMobileMenu>
```

### 3. Updated NavbarEnterpriseMega
**File**: `components/blocks/navbars/navbar-enterprise-mega.tsx`

**Changes**:
1. Replaced Sheet import with NavbarMobileMenu:
```typescript
// Before:
import { Sheet, SheetContent, SheetTitle } from "../../ui/sheet";

// After:
import { NavbarMobileMenu } from "../../ui/navbar-mobile-menu";
```

2. Updated MobileNavigationMenu component:
```typescript
// Before: Used Sheet with portal
<Sheet open={open} onOpenChange={setOpen}>
  <SheetContent side="top" className="inset-0 z-998 h-dvh w-full bg-background pt-16">
    <div className="h-full overflow-y-auto pt-4 pb-20">
      <div className="container">
        {/* content */}
      </div>
    </div>
  </SheetContent>
</Sheet>

// After: Uses NavbarMobileMenu without portal
<NavbarMobileMenu
  open={open}
  onClose={() => setOpen(false)}
  title="Mobile Navigation"
  contentClassName="pt-4 pb-20"
>
  <div className="max-w-screen-sm mx-auto">
    {/* content */}
  </div>
</NavbarMobileMenu>
```

## How to Apply to Other Navbar Blocks

For each navbar block (EXCEPT `navbar-fullscreen-menu.tsx` which already works correctly):

### Step 1: Update Imports
Replace the Sheet import with NavbarMobileMenu:

```typescript
// Find this line:
import { Sheet, SheetContent, SheetTitle } from "../../ui/sheet";

// Replace with:
import { NavbarMobileMenu } from "../../ui/navbar-mobile-menu";
```

### Step 2: Update Mobile Menu Component
Find the mobile navigation component (usually named `MobileNavigationMenu` or similar) and update it:

**Pattern to find**:
```typescript
<Sheet open={open} onOpenChange={setOpen}>
  <SheetContent side="top" className="...">
    {/* mobile menu content */}
  </SheetContent>
</Sheet>
```

**Replace with**:
```typescript
<NavbarMobileMenu
  open={open}
  onClose={() => setOpen(false)}
  title="Mobile Navigation"
>
  {/* mobile menu content - keep the same */}
</NavbarMobileMenu>
```

### Step 3: Update Content Wrapper
Inside NavbarMobileMenu, wrap your content with a max-width container:

```typescript
<NavbarMobileMenu open={open} onClose={() => setOpen(false)}>
  <div className="max-w-screen-sm mx-auto">
    {/* Your existing mobile menu content */}
  </div>
</NavbarMobileMenu>
```

### Step 4: Remove Sheet-specific Props
Remove any Sheet-specific props like:
- `aria-describedby`
- `side="top"`
- SheetTitle components (NavbarMobileMenu handles accessibility)

## Complete Example

Here's a complete before/after for a typical mobile menu:

### Before:
```typescript
const MobileNav = ({ open, setOpen, menuItems }) => {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="top"
        className="inset-0 z-998 h-dvh w-full bg-background pt-16"
      >
        <div className="h-full overflow-y-auto pt-4 pb-20">
          <div className="container">
            <nav className="flex flex-col gap-4">
              {menuItems.map(item => (
                <a key={item.href} href={item.href}>{item.label}</a>
              ))}
            </nav>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
```

### After:
```typescript
const MobileNav = ({ open, setOpen, menuItems }) => {
  return (
    <NavbarMobileMenu
      open={open}
      onClose={() => setOpen(false)}
      title="Mobile Navigation"
      contentClassName="pt-4 pb-20"
    >
      <div className="max-w-screen-sm mx-auto">
        <nav className="flex flex-col gap-4">
          {menuItems.map(item => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>
      </div>
    </NavbarMobileMenu>
  );
};
```

## Affected Navbar Files

Apply these changes to ALL navbar blocks EXCEPT `navbar-fullscreen-menu.tsx`:

- ✅ navbar-enterprise-mega.tsx (DONE)
- [ ] navbar-mega-menu.tsx
- [ ] navbar-dropdown-menu.tsx
- [ ] navbar-centered-menu.tsx
- [ ] navbar-feature-grid.tsx
- [ ] navbar-floating-pill.tsx
- [ ] navbar-platform-resources.tsx
- [ ] navbar-image-preview.tsx
- [ ] navbar-dark-icons.tsx
- [ ] navbar-animated-preview.tsx
- [ ] navbar-multi-column-groups.tsx
- [ ] navbar-sidebar-mobile.tsx
- [ ] navbar-transparent-overlay.tsx
- [ ] navbar-education-platform.tsx
- [ ] navbar-sticky-compact.tsx
- [ ] navbar-search-focused.tsx
- [ ] navbar-simple-links.tsx
- [ ] navbar-split-cta.tsx
- [ ] navbar-icon-links.tsx
- [ ] navbar-tabbed-sections.tsx
- ❌ navbar-fullscreen-menu.tsx (SKIP - already works correctly)

## Testing

After applying the changes to a navbar:

1. Build the module: `pnpm build`
2. Test in the showcase: `pnpm dev` (in opensite-ui-showcase)
3. Verify:
   - Desktop view works as before
   - Mobile view has proper padding around logo and hamburger
   - Mobile menu stays within preview iframe
   - Mobile menu has proper padding and max-width
   - Close button works
   - Scrolling works for long menus

## Benefits

1. ✅ Mobile menus stay within iframe/container boundaries
2. ✅ Proper responsive padding on all screen sizes
3. ✅ Consistent mobile menu behavior across all navbars
4. ✅ Better accessibility with proper titles
5. ✅ Simpler component structure (no portal complexity)
6. ✅ Easier to debug and customize
