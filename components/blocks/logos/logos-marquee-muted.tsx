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

export interface LogosMarqueeMutedLogoItem {
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

export interface LogosMarqueeMutedProps {
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Heading text above the logo carousel
   */
  heading?: React.ReactNode;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Array of logo configurations
   */
  logos?: LogosMarqueeMutedLogoItem[];
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
   * Additional CSS classes for the left fade gradient
   */
  leftFadeClassName?: string;
  /**
   * Additional CSS classes for the right fade gradient
   */
  rightFadeClassName?: string;
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

const defaultLogos: LogosMarqueeMutedLogoItem[] = [
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
  {
    name: "Company 7",
    logo: "https://cdn.ing/assets/files/record/286220/t34kymqu5g9xr85o89cji3kfuypb",
  },
  {
    name: "Company 8",
    logo: "https://cdn.ing/assets/files/record/286251/c64yb2c255uig6vpe4gdlnten7rv",
  },
];

/**
 * LogosMarqueeMuted - A muted logo carousel with auto-scrolling animation.
 * Features grayscale logos on a muted background with fade gradients on edges.
 */
export function LogosMarqueeMuted({
  className,
  heading = "Trusted by leading companies",
  headingClassName,
  logos = defaultLogos,
  logosSlot,
  logosClassName,
  carouselClassName,
  carouselItemClassName,
  logoWrapperClassName,
  leftFadeClassName,
  rightFadeClassName,
  background = "muted",
  spacing = "lg",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: LogosMarqueeMutedProps): React.JSX.Element {
  const renderLogos = () => {
    if (logosSlot) return logosSlot;
    if (!logos || logos.length === 0) return null;

    return (
      <Carousel
        opts={{ loop: true }}
        plugins={[AutoScroll({ playOnInit: true, speed: 1 })]}
        className={carouselClassName}
      >
        <CarouselContent className="ml-0">
          {[...logos, ...logos].map((logo, index) => (
            <CarouselItem
              key={index}
              className={cn(
                "flex basis-1/3 justify-center pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6",
                carouselItemClassName
              )}
            >
              <div className={cn("mx-8 flex shrink-0 items-center justify-center", logoWrapperClassName)}>
                <Img
                  src={logo.logo}
                  alt={`${logo.name} logo`}
                  width={120}
                  height={40}
                  className={cn("h-8 w-auto object-contain opacity-60 grayscale", logo.imgClassName)}
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
      {heading && (
        <div className="container mb-12">
          {typeof heading === "string" ? (
            <p className={cn("text-center text-lg font-medium text-muted-foreground", headingClassName)}>
              {heading}
            </p>
          ) : (
            <div className={headingClassName}>{heading}</div>
          )}
        </div>
      )}
      <div className={cn("relative", logosClassName)}>
        {renderLogos()}
        <div className={cn("pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-muted to-transparent", leftFadeClassName)} />
        <div className={cn("pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-muted to-transparent", rightFadeClassName)} />
      </div>
    </Section>
  );
}
