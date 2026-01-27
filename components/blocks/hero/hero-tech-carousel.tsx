"use client";

import * as React from "react";
import { useMemo } from "react";
import { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import type { CarouselApi } from "../../ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../ui/carousel";
import type {OptixFlowConfig, SectionBackground, SectionSpacing} from "../../../src/types";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";

export interface TechnologyItem {
  /**
   * Technology name
   */
  name: string;
  /**
   * Installation command
   */
  command: string;
  /**
   * Logo image source (optional, uses default if not provided)
   */
  logo?: string;
}

export interface HeroTechCarouselProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Array of technology items for the carousel
   */
  technologies?: TechnologyItem[];
  /**
   * Custom slot for carousel (overrides technologies array)
   */
  carouselSlot?: React.ReactNode;
  /**
   * Autoplay delay in milliseconds
   */
  autoplayDelay?: number;  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern name
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;

  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

export function HeroTechCarousel({
  heading,
  description,
  technologies,
  carouselSlot,
  autoplayDelay = 4000,
  background,
  spacing,
  pattern,
  patternOpacity,
  className,
  containerClassName,
  headingClassName,
  descriptionClassName,
  optixFlowConfig,
}: HeroTechCarouselProps): React.JSX.Element {
  const plugin = useRef(Autoplay({ delay: autoplayDelay, stopOnInteraction: false }));
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    const updateCurrent = () => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrent(api.selectedScrollSnap());
        setFadeIn(true);
      }, 200);
    };

    api.on("select", updateCurrent);
    api.on("settle", updateCurrent);

    return () => {
      api.off("select", updateCurrent);
      api.off("settle", updateCurrent);
    };
  }, [api]);

  const selectTechnology = (index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  };

  const renderCarousel = useMemo(() => {
    if (carouselSlot) return carouselSlot;
    if (!technologies || technologies.length === 0) return null;

    return (
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        opts={{
          loop: true,
        }}
        className="relative mx-auto w-full max-w-3xl before:absolute before:top-0 before:bottom-0 before:left-0 before:z-10 before:w-36 before:bg-linear-to-r before:from-background before:to-transparent after:absolute after:top-0 after:right-0 after:bottom-0 after:z-10 after:w-36 after:bg-linear-to-l after:from-background after:to-transparent"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {technologies.map((technology, idx) => (
            <CarouselItem
              key={idx}
              className="basis-1/3 select-none sm:basis-1/4 md:basis-1/6"
            >
              <div
                className={cn(
                  "flex cursor-pointer items-center justify-center gap-2 rounded-md border p-6",
                  idx === current ? "border-input" : "border-transparent",
                )}
                onClick={() => selectTechnology(idx)}
              >
                <Img
                  className="h-4 shrink-0 md:h-7"
                  src={technology.logo}
                  alt={technology.name}
                  optixFlowConfig={optixFlowConfig}
                />
                <p>{technology.name}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    );
  }, [carouselSlot, technologies, setApi, plugin, current, selectTechnology, optixFlowConfig]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(className)}
    >
      <div className={cn("container", containerClassName)}>
        <div className="flex flex-col justify-center">
          {heading && (
            typeof heading === "string" ? (
              <h1 className={cn("mx-auto mb-4 max-w-2xl text-center text-4xl font-bold md:text-6xl", headingClassName)}>
                {heading}
              </h1>
            ) : (
              <h1 className={cn("mx-auto mb-4 max-w-2xl text-center text-4xl font-bold md:text-6xl", headingClassName)}>
                {heading}
              </h1>
            )
          )}
          {description && (
            typeof description === "string" ? (
              <p className={cn("mx-auto mt-4 max-w-xl text-center text-lg text-muted-foreground", descriptionClassName)}>
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            )
          )}
          {technologies && technologies.length > 0 && (
            <div className="mx-auto mt-8 mb-12 flex h-[60px] w-fit items-center gap-2 rounded-md bg-muted px-4 py-2 text-center">
              <div
                className={cn(
                  "flex items-center gap-2 transition-opacity duration-300",
                  fadeIn ? "opacity-100" : "opacity-0",
                )}
              >
                <Img
                  src={technologies[current]?.logo}
                  alt={technologies[current]?.name}
                  className="h-4 md:h-7"
                  optixFlowConfig={optixFlowConfig}
                />
                <p className="border-l px-2 font-mono text-sm">
                  {technologies[current]?.command}
                </p>
              </div>
            </div>
          )}
        </div>
        {renderCarousel}
      </div>
    </Section>
  );
}
