"use client";

import * as React from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../ui/carousel";
import type { PatternName } from "../../ui/pattern-background";
import type { OptixFlowConfig, SectionBackground, SectionSpacing } from "../../../src/types";

export interface LogosMinimalCarouselLogoItem {
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

export interface LogosMinimalCarouselProps {
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Array of logo configurations
   */
  logos?: LogosMinimalCarouselLogoItem[];
  /**
   * Custom slot for rendering logos (overrides logos array)
   */
  logosSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the logos container
   */
  logosClassName?: string;
  /**
   * Additional CSS classes for the carousel wrapper
   */
  carouselClassName?: string;
  /**
   * Additional CSS classes for each carousel item
   */
  carouselItemClassName?: string;
  /**
   * Additional CSS classes for the logo wrapper
   */
  logoWrapperClassName?: string;
  /**
   * Additional CSS classes for the border container
   */
  borderContainerClassName?: string;
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

const defaultLogos: LogosMinimalCarouselLogoItem[] = [
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

/**
 * LogosMinimalCarousel - A minimal logo carousel with bordered container.
 * Features grayscale logos with hover effects in a clean, bordered design.
 */
export function LogosMinimalCarousel({
  className,
  logos = defaultLogos,
  logosSlot,
  logosClassName,
  carouselClassName,
  carouselItemClassName,
  logoWrapperClassName,
  borderContainerClassName,
  background = "white",
  spacing = "md",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: LogosMinimalCarouselProps): React.JSX.Element {
  const renderLogos = () => {
    if (logosSlot) return logosSlot;
    if (!logos || logos.length === 0) return null;

    return (
      <Carousel
        opts={{ loop: true }}
        plugins={[AutoScroll({ playOnInit: true, speed: 0.5 })]}
        className={carouselClassName}
      >
        <CarouselContent className="ml-0 py-8">
          {[...logos, ...logos].map((logo, index) => (
            <CarouselItem
              key={index}
              className={cn(
                "flex basis-1/3 justify-center border-r border-border pl-0 last:border-r-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6",
                carouselItemClassName
              )}
            >
              <div className={cn("flex shrink-0 items-center justify-center px-8", logoWrapperClassName)}>
                <Img
                  src={logo.logo}
                  alt={`${logo.name} logo`}
                  width={100}
                  height={32}
                  className={cn("h-8 w-auto object-contain opacity-50 grayscale transition-all hover:opacity-100 hover:grayscale-0", logo.imgClassName)}
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    );
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
    >
      <div className={cn("relative border-y border-border", borderContainerClassName, logosClassName)}>
        {renderLogos()}
      </div>
    </Section>
  );
}
