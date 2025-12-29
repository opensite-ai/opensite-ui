"use client";

import * as React from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { patternSvgs } from "../../../lib/patternSvgs";
import { Section } from "../../ui/section";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../ui/carousel";
import type { PatternName } from "../../ui/pattern-background";
import type { ActionConfig, OptixFlowConfig, SectionBackground, SectionSpacing } from "../../../src/types";

export interface LogosDoubleCarouselPatternLogoItem {
  /**
   * Company/partner name
   */
  name: string;
  /**
   * Logo image URL
   */
  logo: string;
  /**
   * Additional CSS classes for the logo image
   */
  imgClassName?: string;
}

export interface LogosDoubleCarouselPatternProps {
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Main title/heading
   */
  title?: React.ReactNode;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Description text below the title
   */
  description?: React.ReactNode;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the header container
   */
  headerClassName?: string;
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
  /**
   * Array of logo configurations for the top row
   */
  topRowLogos?: LogosDoubleCarouselPatternLogoItem[];
  /**
   * Custom slot for rendering top row logos (overrides topRowLogos array)
   */
  topRowLogosSlot?: React.ReactNode;
  /**
   * Array of logo configurations for the bottom row
   */
  bottomRowLogos?: LogosDoubleCarouselPatternLogoItem[];
  /**
   * Custom slot for rendering bottom row logos (overrides bottomRowLogos array)
   */
  bottomRowLogosSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the logos container
   */
  logosClassName?: string;
  /**
   * Additional CSS classes for each carousel item
   */
  carouselItemClassName?: string;
  /**
   * Additional CSS classes for the logo wrapper
   */
  logoWrapperClassName?: string;
  /**
   * Additional CSS classes for the gradient overlay
   */
  overlayClassName?: string;
  /**
   * Background pattern type (defaults to dots)
   */
  backgroundPattern?: "dots" | "grid" | "none";
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
  pattern?: PatternName | string;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

const defaultTopRowLogos: LogosDoubleCarouselPatternLogoItem[] = [
  {
    name: "Company 1",
    logo: "https://cdn.ing/assets/files/record/286222/4w39lhwei0pa97up2wjnay3j96gh",
  },
  {
    name: "Company 2",
    logo: "https://cdn.ing/assets/files/record/286252/xd7hyzbpkjwsauxm5j9yn9v44min",
  },
  {
    name: "Company 3",
    logo: "https://cdn.ing/assets/files/record/286216/bw4zypgflisdtapxy0n4nbmsmtum",
  },
  {
    name: "Company 4",
    logo: "https://cdn.ing/assets/files/record/286284/cz20wf2l2tjokrxu563pcml7pkmu",
  },
  {
    name: "Company 5",
    logo: "https://cdn.ing/assets/files/record/286215/6wwi6yh2ax2nuo2vqa5gn9vozrgq",
  },
  {
    name: "Company 6",
    logo: "https://cdn.ing/assets/files/record/286249/ff7m4wdw0zefj7d96v4ajmljuifc",
  },
];

const defaultBottomRowLogos: LogosDoubleCarouselPatternLogoItem[] = [
  {
    name: "Company 7",
    logo: "https://cdn.ing/assets/files/record/286220/t34kymqu5g9xr85o89cji3kfuypb",
  },
  {
    name: "Company 8",
    logo: "https://cdn.ing/assets/files/record/286251/c64yb2c255uig6vpe4gdlnten7rv",
  },
  {
    name: "Company 9",
    logo: "https://cdn.ing/assets/files/record/286209/4nowqz6c7v6vhzldvh9qdnhmkrwb",
  },
  {
    name: "Company 10",
    logo: "https://cdn.ing/assets/files/record/286208/nay46vdmppxuznd7eg5jnnf4qjv5",
  },
  {
    name: "Company 11",
    logo: "https://cdn.ing/assets/files/record/286214/pn9v9zz0de8jgz2mf8o1c11k8gxh",
  },
  {
    name: "Company 12",
    logo: "https://cdn.ing/assets/files/record/286235/x4po9fpjkd6cdxnfxaqya6emwvea",
  },
];

const defaultActions: ActionConfig[] = [
  {
    label: "Get started",
    href: "#",
    variant: "default",
  },
  {
    label: "Learn more",
    href: "#",
    variant: "outline",
  },
];

/**
 * LogosDoubleCarouselPattern - A double-row logo carousel with pattern background.
 * Features two auto-scrolling rows moving in opposite directions with CTA buttons.
 */
export function LogosDoubleCarouselPattern({
  className,
  title = "Trusted by industry leaders worldwide",
  titleClassName,
  description = "Join thousands of companies that rely on our platform to power their business operations and drive sustainable growth.",
  descriptionClassName,
  headerClassName,
  actions = defaultActions,
  actionsSlot,
  actionsClassName,
  topRowLogos = defaultTopRowLogos,
  topRowLogosSlot,
  bottomRowLogos = defaultBottomRowLogos,
  bottomRowLogosSlot,
  logosClassName,
  carouselItemClassName,
  logoWrapperClassName,
  overlayClassName,
  backgroundPattern = "dots",
  background = "white",
  spacing = "xl",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: LogosDoubleCarouselPatternProps): React.JSX.Element {
  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return actions.map((action, index) => (
      <Pressable
        key={index}
        href={action.href}
        onClick={action.onClick}
        variant={action.variant || (index === 0 ? "default" : "outline")}
        asButton
        className={action.className}
      >
        {action.icon}
        {action.label}
        {action.iconAfter}
      </Pressable>
    ));
  };

  const renderTopRowLogos = () => {
    if (topRowLogosSlot) return topRowLogosSlot;
    if (!topRowLogos || topRowLogos.length === 0) return null;

    return (
      <Carousel
        opts={{ loop: true }}
        plugins={[AutoScroll({ playOnInit: true, speed: 0.6 })]}
      >
        <CarouselContent className="ml-0">
          {[...topRowLogos, ...topRowLogos].map((logo, index) => (
            <CarouselItem
              key={index}
              className={cn(
                "flex basis-1/3 justify-center pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6",
                carouselItemClassName
              )}
            >
              <div className={cn("mx-6 flex shrink-0 items-center justify-center rounded-lg border border-border bg-background/80 p-4 backdrop-blur-sm", logoWrapperClassName)}>
                <Img
                  src={logo.logo}
                  alt={`${logo.name} logo`}
                  width={100}
                  height={40}
                  className={cn("h-8 w-auto object-contain", logo.imgClassName)}
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    );
  };

  const renderBottomRowLogos = () => {
    if (bottomRowLogosSlot) return bottomRowLogosSlot;
    if (!bottomRowLogos || bottomRowLogos.length === 0) return null;

    return (
      <Carousel
        opts={{ loop: true }}
        plugins={[AutoScroll({ playOnInit: true, speed: 0.6, direction: "backward" })]}
      >
        <CarouselContent className="ml-0">
          {[...bottomRowLogos, ...bottomRowLogos].map((logo, index) => (
            <CarouselItem
              key={index}
              className={cn(
                "flex basis-1/3 justify-center pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6",
                carouselItemClassName
              )}
            >
              <div className={cn("mx-6 flex shrink-0 items-center justify-center rounded-lg border border-border bg-background/80 p-4 backdrop-blur-sm", logoWrapperClassName)}>
                <Img
                  src={logo.logo}
                  alt={`${logo.name} logo`}
                  width={100}
                  height={40}
                  className={cn("h-8 w-auto object-contain", logo.imgClassName)}
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    );
  };

  const getBackgroundStyle = () => {
    if (backgroundPattern === "none") return {};
    const patternUrl = backgroundPattern === "dots" ? patternSvgs.dots : patternSvgs.grid1;
    return {
      backgroundImage: `url("${patternUrl}")`,
      backgroundSize: "30px 30px",
    };
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn("overflow-hidden", className)}
      style={getBackgroundStyle()}
    >
      <div className={cn("absolute inset-0 bg-linear-to-b from-background via-transparent to-background", overlayClassName)} />
      <div className={cn("container relative z-10 mb-16 text-center", headerClassName)}>
        {title && (
          typeof title === "string" ? (
            <h2 className={cn("mb-4 text-3xl font-bold md:text-4xl lg:text-5xl", titleClassName)}>
              {title}
            </h2>
          ) : (
            <div className={titleClassName}>{title}</div>
          )
        )}
        {description && (
          typeof description === "string" ? (
            <p className={cn("mx-auto mb-8 max-w-2xl text-lg text-muted-foreground", descriptionClassName)}>
              {description}
            </p>
          ) : (
            <div className={descriptionClassName}>{description}</div>
          )
        )}
        <div className={cn("flex flex-wrap items-center justify-center gap-4", actionsClassName)}>
          {renderActions()}
        </div>
      </div>
      <div className={cn("relative space-y-8", logosClassName)}>
        {renderTopRowLogos()}
        {renderBottomRowLogos()}
      </div>
    </Section>
  );
}
