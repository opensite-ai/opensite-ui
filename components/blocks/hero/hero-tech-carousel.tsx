"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { logoPlaceholders } from "../../../lib/mediaPlaceholders";
import type { CarouselApi } from "../../ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../ui/carousel";

const technologies = [
  {
    name: "Next",
    command: "npx create-next-app my-app",
  },
  {
    name: "Vite",
    command: "npm create vite@latest",
  },
  {
    name: "Remix",
    command: "npx create-remix@latest my-app",
  },
  {
    name: "Gatsby",
    command: "npm init gatsby",
  },
  {
    name: "Astro",
    command: "npm create astro@latest",
  },
  {
    name: "Laravel",
    command: "laravel new my-app",
  },
  {
    name: "React",
    command: "npx create-react-app my-app",
  },
];

export interface HeroTechCarouselProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

export function HeroTechCarousel({
  className,
  optixFlowConfig,
}: HeroTechCarouselProps): React.JSX.Element {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));
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

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col justify-center">
          <h1 className="mx-auto mb-4 max-w-2xl text-center text-4xl font-bold md:text-6xl">
            Install with one Command
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-center text-lg text-muted-foreground">
            Our library is compatible with all popular frameworks, download our
            SDK and get started in minutes.
          </p>
          <div className="mx-auto mt-8 mb-12 flex h-[60px] w-fit items-center gap-2 rounded-md bg-muted px-4 py-2 text-center">
            <div
              className={cn(
                "flex items-center gap-2 transition-opacity duration-300",
                fadeIn ? "opacity-100" : "opacity-0",
              )}
            >
              <Img
                src={logoPlaceholders.logoMark}
                alt={technologies[current]?.name}
                className="h-4 md:h-7"
                optixFlowConfig={optixFlowConfig}
              />
              <p className="border-l px-2 font-mono text-sm">
                {technologies[current]?.command}
              </p>
            </div>
          </div>
        </div>
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
                    src={logoPlaceholders.logoMark}
                    alt={technology.name}
                    optixFlowConfig={optixFlowConfig}
                  />
                  <p>{technology.name}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
