import * as React from "react";
import { cn } from "../../../lib/utils";
import { Section } from "../../ui/section";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

export interface AlternatingBlockSection {
  content: React.ReactNode;
  media: React.ReactNode;
  mediaLeft?: boolean;
}

export interface AlternatingBlocksProps {
  /**
   * Array of sections to display with alternating layout
   */
  sections: AlternatingBlockSection[];
  /**
   * Section title (optional)
   */
  title?: string;
  /**
   * Section subtitle/eyebrow (optional)
   */
  subtitle?: string;
  /**
   * Background style variant
   * @default "white"
   */
  background?: SectionBackground;
  /**
   * Vertical spacing variant
   * @default "lg"
   */
  spacing?: SectionSpacing;
  /**
   * Additional CSS classes for the Section wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the content container
   */
  contentClassName?: string;
}

/**
 * AlternatingBlocks component displays content sections with alternating media placement.
 * Uses the Section component for consistent spacing, backgrounds, and optional titles.
 *
 * @example
 * ```tsx
 * <AlternatingBlocks
 *   title="Our Story"
 *   subtitle="About Us"
 *   background="gray"
 *   spacing="xl"
 *   sections={[
 *     {
 *       content: <div><h3>Title</h3><p>Description</p></div>,
 *       media: <img src="..." alt="..." />,
 *       mediaLeft: false
 *     }
 *   ]}
 * />
 * ```
 */
export function AlternatingBlocks({
  sections,
  title,
  subtitle,
  background = "white",
  spacing = "lg",
  className,
  contentClassName,
}: AlternatingBlocksProps) {
  return (
    <Section
      title={title}
      subtitle={subtitle}
      background={background}
      spacing={spacing}
      className={className}
    >
      <div className={cn("mx-auto w-full max-w-[900px]", contentClassName)}>
        <div className="space-y-12">
          {sections?.map((section, index) => (
            <div
              key={index}
              className="grid items-center gap-8 md:grid-cols-2 md:gap-12"
            >
              <div className={section.mediaLeft ? "md:order-2" : ""}>
                {section.content}
              </div>

              <div
                className={cn(
                  "aspect-[4/3] overflow-hidden rounded-lg border",
                  section.mediaLeft ? "md:order-1" : ""
                )}
              >
                <div className="flex h-full w-full items-center justify-center">
                  {section.media}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
