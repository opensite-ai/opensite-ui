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

export interface LogosCarouselHeadingLogoItem {
  /**
   * Unique identifier for the logo
   */
  id: string;
  /**
   * Description/alt text for the logo
   */
  description: string;
  /**
   * Logo image URL
   */
  image: string;
  /**
   * Additional CSS classes for the logo image
   */
  className?: string;
}

export interface LogosCarouselHeadingProps {
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Main heading text
   */
  heading?: React.ReactNode;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the header container
   */
  headerClassName?: string;
  /**
   * Array of logo configurations
   */
  logos?: LogosCarouselHeadingLogoItem[];
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

const defaultLogos: LogosCarouselHeadingLogoItem[] = [
  {
    id: "logo-1",
    description: "Logo 1",
    image: "https://cdn.ing/assets/files/record/286222/4w39lhwei0pa97up2wjnay3j96gh",
    className: "h-7 w-auto",
  },
  {
    id: "logo-2",
    description: "Logo 2",
    image: "https://cdn.ing/assets/files/record/286215/6wwi6yh2ax2nuo2vqa5gn9vozrgq",
    className: "h-7 w-auto",
  },
  {
    id: "logo-3",
    description: "Logo 3",
    image: "https://cdn.ing/assets/files/record/286249/ff7m4wdw0zefj7d96v4ajmljuifc",
    className: "h-7 w-auto",
  },
  {
    id: "logo-4",
    description: "Logo 4",
    image: "https://cdn.ing/assets/files/record/286216/bw4zypgflisdtapxy0n4nbmsmtum",
    className: "h-7 w-auto",
  },
  {
    id: "logo-5",
    description: "Logo 5",
    image: "https://cdn.ing/assets/files/record/286220/t34kymqu5g9xr85o89cji3kfuypb",
    className: "h-7 w-auto",
  },
  {
    id: "logo-6",
    description: "Logo 6",
    image: "https://cdn.ing/assets/files/record/286284/cz20wf2l2tjokrxu563pcml7pkmu",
    className: "h-7 w-auto",
  },
  {
    id: "logo-7",
    description: "Logo 7",
    image: "https://cdn.ing/assets/files/record/286251/c64yb2c255uig6vpe4gdlnten7rv",
    className: "h-4 w-auto",
  },
  {
    id: "logo-8",
    description: "Logo 8",
    image: "https://cdn.ing/assets/files/record/286252/xd7hyzbpkjwsauxm5j9yn9v44min",
    className: "h-7 w-auto",
  },
];

/**
 * LogosCarouselHeading - A logo carousel with a prominent centered heading.
 * Features auto-scrolling logos with fade gradients on edges.
 */
export function LogosCarouselHeading({
  className,
  heading = "Trusted by these companies",
  headingClassName,
  headerClassName,
  logos = defaultLogos,
  logosSlot,
  logosClassName,
  carouselClassName,
  carouselItemClassName,
  logoWrapperClassName,
  leftFadeClassName,
  rightFadeClassName,
  background = "white",
  spacing = "xl",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: LogosCarouselHeadingProps): React.JSX.Element {
  const renderLogos = () => {
    if (logosSlot) return logosSlot;
    if (!logos || logos.length === 0) return null;

    return (
      <Carousel
        opts={{ loop: true }}
        plugins={[AutoScroll({ playOnInit: true })]}
        className={carouselClassName}
      >
        <CarouselContent className="ml-0">
          {logos.map((logo) => (
            <CarouselItem
              key={logo.id}
              className={cn(
                "flex basis-1/3 justify-center pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6",
                carouselItemClassName
              )}
            >
              <div className={cn("mx-10 flex shrink-0 items-center justify-center", logoWrapperClassName)}>
                <div>
                  <Img
                    src={logo.image}
                    alt={logo.description}
                    className={logo.className}
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>
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
        <div className={cn("container flex flex-col items-center text-center", headerClassName)}>
          {typeof heading === "string" ? (
            <h1 className={cn("my-6 text-2xl font-bold text-pretty lg:text-4xl", headingClassName)}>
              {heading}
            </h1>
          ) : (
            <div className={headingClassName}>{heading}</div>
          )}
        </div>
      )}
      <div className="pt-10 md:pt-16 lg:pt-20">
        <div className={cn("relative mx-auto flex items-center justify-center lg:max-w-5xl", logosClassName)}>
          {renderLogos()}
          <div className={cn("absolute inset-y-0 left-0 w-12 bg-linear-to-r from-background to-transparent", leftFadeClassName)} />
          <div className={cn("absolute inset-y-0 right-0 w-12 bg-linear-to-l from-background to-transparent", rightFadeClassName)} />
        </div>
      </div>
    </Section>
  );
}
