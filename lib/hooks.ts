/**
 * Hooks module for @opensite/ui
 *
 * Exports all custom React hooks used in the OpenSite UI library.
 */

export { useNavigation } from "./useNavigation";
export type { UseNavigationArgs, UseNavigationReturn } from "./useNavigation";

export { useResponsiveLayout } from "./useResponsiveLayout";
export type { UseResponsiveLayoutArgs } from "./useResponsiveLayout";

export { useRouteChangeClose } from "./useRouteChangeClose";

// Re-export types for convenience
export type { LinkType } from "./useNavigation";
