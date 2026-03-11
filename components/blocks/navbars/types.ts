import type * as React from "react";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

/**
 * SHARED TYPE INTERFACES FOR ALL NAVBAR COMPONENTS
 * These types provide a consistent interface across all navbar blocks
 */

/**
 * Logo configuration interface - consistent across all navbars
 */
export interface LogoConfig {
  /** URL to navigate to when logo is clicked */
  url?: string;
  /** Image source for the logo */
  src?: string;
  /** Alt text for the logo image */
  alt?: string;
  /** Text title to display (alternative to image) */
  title?: React.ReactNode;
  /** Additional CSS classes for the logo */
  className?: string;
}

/**
 * Base link item - used across all navbar components
 * Supports both 'href' (preferred) and 'url' (legacy) for URLs
 */
export interface ILinkItem {
  /** Display text for the link */
  label: React.ReactNode;
  /** Optional description text */
  description?: React.ReactNode;
  /** URL the link navigates to (preferred) */
  href?: string;
  /** URL the link navigates to (legacy, use href instead) */
  url?: string;
  /** Icon element to display */
  icon?: React.ReactNode;
  /** Icon name for DynamicIcon component */
  iconName?: string;
  /** Image URL for visual representation */
  image?: string;
  /** Background color or image for the item */
  background?: string;
}

/**
 * Helper to get the URL from an ILinkItem (supports both href and url)
 */
export function getLinkUrl(item: ILinkItem): string {
  return item.href || item.url || "#";
}

/**
 * Group of links with optional metadata
 */
export interface IMenuLinkGroup {
  /** Group label/title */
  label: React.ReactNode;
  /** Optional group description */
  description?: string;
  /** Optional group image */
  image?: string;
  /** Links within this group */
  links: ILinkItem[];
}

/**
 * Layout types for mega menu dropdowns
 *
 * LAYOUT OPTIONS FOR AI PAGE BUILDER:
 *
 * 1. "animated-image-preview"
 *    - Visual: Grid layout with large image preview on left (360px wide), links list on right
 *    - Behavior: Image changes on hover based on which link is being hovered over
 *    - Best for: Product showcases, visual content navigation, feature highlights
 *
 * 2. "simple-grid"
 *    - Visual: 2-column responsive grid of cards with icons or images
 *    - Behavior: Static grid with hover effects on cards
 *    - Best for: Feature lists, service offerings, general navigation with icons
 *
 * 3. "list-with-icons"
 *    - Visual: Single column list of items with small icons on the left
 *    - Behavior: Compact list with hover effects
 *    - Best for: Simple navigation, documentation links, resource lists
 */
export type MegaMenuLayout =
  | "animated-image-preview"
  | "simple-grid"
  | "list-with-icons";

/**
 * Menu link configuration with layout-based dropdown options
 */
export interface IMenuLink {
  /** Display text for the menu trigger */
  label: React.ReactNode;
  /** Direct link URL (for non-dropdown items) */
  href?: string;
  /** Layout type for dropdown content */
  layout?: MegaMenuLayout;
  /** Links array for dropdown content */
  links?: ILinkItem[];
  /** Grouped links for more complex layouts */
  dropdownGroups?: IMenuLinkGroup[];
}

/**
 * Layout variant types for navbar components
 *
 * LAYOUT VARIANT OPTIONS:
 *
 * 1. "fullScreenContainerizedLinks" (default)
 *    - Visual: Full-screen navbar with links inside a standard container (responsive max-width)
 *    - Behavior: Navbar background spans full width, but logo/links/actions are containerized
 *    - Best for: Standard websites with consistent content width
 *
 * 2. "fullScreenFullWidthLinks"
 *    - Visual: Full-screen navbar without container constraints on links
 *    - Behavior: Navbar and all content span full width with custom padding
 *    - Best for: Wide layouts, edge-to-edge designs
 *
 * 3. "floatingBar"
 *    - Visual: Floating navbar style with rounded borders and shadow
 *    - Behavior: Navbar appears as a floating bar with border-radius and contained width
 *    - Best for: Modern, elevated navigation designs
 */
export type NavbarLayoutVariant =
  | "fullScreenContainerizedLinks"
  | "fullScreenFullWidthLinks"
  | "floatingBar";

/**
 * Base props shared by all navbar components
 */
export interface BaseNavbarProps {
  /** Additional CSS classes for the section */
  className?: string;
  /** Additional CSS classes for the container */
  containerClassName?: string;
  /** Logo configuration */
  logo?: LogoConfig;
  /** Custom slot for logo (overrides logo object) */
  logoSlot?: React.ReactNode;
  /** Additional CSS classes for the logo */
  logoClassName?: string;
  /** Layout variant for the navbar */
  layoutVariant?: NavbarLayoutVariant;
  /** Background style for the section */
  background?: SectionBackground;
  /** Vertical spacing for the section */
  spacing?: SectionSpacing;
  /** Optional background pattern name or URL */
  pattern?: PatternName | undefined;
  /** Pattern overlay opacity (0-1) */
  patternOpacity?: number;
  /** OptixFlow image optimization configuration */
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * Extended base props for navbars with navigation menus
 */
export interface NavbarWithMenuProps extends BaseNavbarProps {
  /** Additional CSS classes for the nav wrapper */
  navClassName?: string;
  /** Additional CSS classes for the navigation menu */
  navigationMenuClassName?: string;
  /** Additional CSS classes for the actions container */
  actionsClassName?: string;
}

/**
 * Props for navbars with standard action buttons
 */
export interface NavbarWithActionsProps extends NavbarWithMenuProps {
  /** Authentication/CTA action configurations */
  actions?: ActionConfig[];
  /** Custom slot for actions (overrides actions array) */
  actionsSlot?: React.ReactNode;
}

/**
 * Props for navbars with auth-specific action buttons
 */
export interface NavbarWithAuthActionsProps extends NavbarWithMenuProps {
  /** Authentication action configurations */
  authActions?: ActionConfig[];
  /** Custom slot for auth actions (overrides authActions array) */
  authActionsSlot?: React.ReactNode;
}
