/**
 * All UI components - tree-shakable exports
 *
 * Import specific components for optimal bundle sizes:
 *
 * @example
 * ```ts
 * // Recommended: Import specific components
 * import { Container, Section } from "@opensite/ui/components";
 *
 * // Or use granular imports
 * import { Container } from "@opensite/ui/components/container";
 * ```
 */

// Layout components
export { Container } from "../components/ui/container";
export { Section } from "../components/ui/section";

// Interactive components
export { AnimatedDialog } from "../components/ui/animated-dialog";

// Hero components
export { PageHeroBanner } from "../components/ui/page-hero-banner";

// shadcn UI components
export { Button } from "../components/ui/button";
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "../components/ui/card";
export { Badge } from "../components/ui/badge";
export { Popover, PopoverTrigger, PopoverContent } from "../components/ui/popover";

// Re-export types for convenience
export type {
  ContainerProps,
  ContainerMaxWidth,
  SectionProps,
  SectionBackground,
  SectionSpacing,
  AnimatedDialogProps,
  AnimatedDialogSize,
  PageHeroBannerProps,
} from "./types/index";
