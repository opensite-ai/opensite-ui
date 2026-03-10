"use client";

/**
 * CarouselFeatureBadge
 *
 * A two-column feature section with a badge label, headline, description text,
 * and an interactive carousel showcasing platform screenshots or feature images.
 * Includes previous/next navigation controls for browsing through carousel items.
 *
 * Use cases:
 * - Product feature showcases with visual demonstrations
 * - Platform overview sections with screenshot galleries
 * - Marketing landing pages highlighting key capabilities
 */

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import { CarouselPagination } from "../../ui/carousel-pagination";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import useEmblaCarousel from "embla-carousel-react";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ContainerMaxWidth,
  ImageItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { BlockActions } from "@/components/ui/block-actions";
import { ActionConfig } from "@page-speed/maps/components/geo-map";
import { ContentGroup, ContentGroupItem } from "@/components/ui/content-group";

export interface CarouselFeatureBadgeProps {
  /**
   * Variant of the slide layout
   */
  slideLayoutVariant?: "horizontal" | "vertical" | "square";
  /**
   * Badge/eyebrow content above heading
   */
  badge?: React.ReactNode;
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Array of image items for the carousel
   */
  items?: ImageItem[];
  /**
   * Custom slot for rendering carousel items (overrides items array)
   */
  itemsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the content column
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the badge
   */
  badgeClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the carousel container
   */
  carouselClassName?: string;
  /**
   * Additional CSS classes for each carousel item
   */
  carouselItemClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern name or URL
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * Optional max width for the content container
   */
  containerMaxWidth?: ContainerMaxWidth;
  /**
   * Array of action configurations for CTA buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
}

/**
 * Maps slide layout variants to Tailwind aspect ratio classes
 */
const SLIDE_LAYOUT_ASPECT_MAP: Record<
  NonNullable<CarouselFeatureBadgeProps["slideLayoutVariant"]>,
  string
> = {
  horizontal: "aspect-video",
  vertical: "aspect-[9/16]",
  square: "aspect-square",
};

export function CarouselFeatureBadge({
  badge,
  heading,
  description,
  items,
  itemsSlot,
  className,
  contentClassName,
  badgeClassName,
  headingClassName,
  descriptionClassName,
  carouselClassName,
  carouselItemClassName,
  optixFlowConfig,
  actions,
  actionsSlot,
  actionsClassName,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "xl",
  pattern,
  patternOpacity,
  slideLayoutVariant = "square",
  containerMaxWidth = "2xl",
}: CarouselFeatureBadgeProps): React.JSX.Element {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const scrollPrev = React.useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi?.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const renderCarouselItems = () => {
    if (itemsSlot) return itemsSlot;
    if (!items || items.length === 0) return null;

    return items.map((item, index) => (
      <div
        key={index}
        role="group"
        aria-roledescription="slide"
        className={cn(
          "min-w-0 shrink-0 grow-0 basis-full pl-4",
          carouselItemClassName,
        )}
      >
        <div
          className={cn(
            "flex items-center justify-center overflow-hidden rounded-2xl",
            SLIDE_LAYOUT_ASPECT_MAP[slideLayoutVariant],
          )}
        >
          <Img
            src={item.src}
            alt={item.alt}
            className={cn("h-full w-full object-cover", item.className)}
            optixFlowConfig={optixFlowConfig}
          />
        </div>
      </div>
    ));
  };

  const headerItems = React.useMemo(() => {
    const items: ContentGroupItem[] = [];

    if (heading) {
      if (typeof heading === "string") {
        items.push({
          _type: "text",
          as: "h2",
          className: cn(
            "text-left text-2xl font-semibold md:text-4xl lg:max-w-xl lg:text-6xl text-pretty",
            headingClassName,
          ),
          children: heading,
        });
      } else {
        items.push(heading);
      }
    }

    if (description) {
      if (typeof description === "string") {
        items.push({
          _type: "text",
          as: "p",
          className: cn(
            "max-w-full text-left text-lg leading-snug lg:max-w-sm text-balance text-lg",
            descriptionClassName,
          ),
          children: description,
        });
      } else {
        items.push(description);
      }
    }

    return items;
  }, [heading, headingClassName, description, descriptionClassName]);

  return (
    <Section
      background={background}
      spacing={spacing}
      className={className}
      pattern={pattern}
      patternOpacity={patternOpacity}
      containerMaxWidth={containerMaxWidth}
      containerClassName={containerClassName}
    >
      <div className="relative">
        <div className="grid grid-cols-1 items-end justify-end gap-6 md:gap-20 lg:grid-cols-2">
          <div
            className={cn("flex flex-col items-start gap-4", contentClassName)}
          >
            {badge &&
              (typeof badge === "string" ? (
                <Badge className={badgeClassName}>{badge}</Badge>
              ) : (
                badge
              ))}
            <ContentGroup items={headerItems} className="flex flex-col gap-2" />

            <BlockActions
              actions={actions}
              actionsSlot={actionsSlot}
              actionsClassName={actionsClassName}
            />
          </div>
          <div className={cn("w-full max-w-full", carouselClassName)}>
            <div className="relative">
              <div ref={emblaRef} className="overflow-hidden">
                <div className="flex -ml-4">{renderCarouselItems()}</div>
              </div>
              <CarouselPagination
                onPrevious={scrollPrev}
                onNext={scrollNext}
                canScrollPrevious={canScrollPrev}
                canScrollNext={canScrollNext}
                className="mt-4"
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
