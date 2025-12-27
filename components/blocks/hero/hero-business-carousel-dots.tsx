"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Badge } from "../../ui/badge";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import type { CarouselApi } from "../../ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../ui/carousel";

export interface HeroBusinessCarouselDotsProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

export function HeroBusinessCarouselDots({
  className,
  optixFlowConfig,
}: HeroBusinessCarouselDotsProps): React.JSX.Element {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const updateCurrent = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };

    updateCurrent();
    api.on("select", updateCurrent);

    return () => {
      api.off("select", updateCurrent);
    };
  }, [api]);

  const carouselImages = [
    imagePlaceholders[17],
    imagePlaceholders[18],
    imagePlaceholders[19],
    imagePlaceholders[20],
    imagePlaceholders[21],
  ];

  return (
    <section className={cn("overflow-hidden py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-5xl text-center">
          <Badge variant="outline">Premium</Badge>
          <h1 className="mt-6 text-4xl font-bold md:text-6xl">
            Your Ultimate Business Solution.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground md:text-xl lg:px-32">
            Transform your business operations with our cutting-edge solutions
            designed to streamline workflows and boost team efficiency.
          </p>
          <div className="mt-8 flex justify-center gap-2">
            <Pressable href="#" asButton variant="default" size="lg">
              Get started
            </Pressable>
            <Pressable href="#" asButton variant="outline" size="lg">
              Learn more
            </Pressable>
          </div>
        </div>
        <div className="relative mx-10 mt-16 hidden md:block">
          <div className="absolute top-0 -right-20 -left-20 z-10 h-px bg-[linear-gradient(to_right,transparent,hsl(var(--border))_4%,hsl(var(--border))_96%,transparent)]"></div>
          <div className="absolute bottom-0 -right-20 -left-20 z-10 h-px bg-[linear-gradient(to_right,transparent,hsl(var(--border))_4%,hsl(var(--border))_96%,transparent)]"></div>
          <div className="absolute -top-20 left-0 z-10 h-[calc(100%+160px)] w-px bg-[linear-gradient(to_bottom,transparent,hsl(var(--border))_4%,hsl(var(--border))_96%,transparent)]"></div>
          <div className="absolute -top-20 right-0 z-10 h-[calc(100%+160px)] w-px bg-[linear-gradient(to_bottom,transparent,hsl(var(--border))_4%,hsl(var(--border))_96%,transparent)]"></div>
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {carouselImages.map((src, index) => (
                <CarouselItem key={index}>
                  <Img
                    src={src}
                    alt={`Slide ${index + 1}`}
                    className="aspect-video w-full rounded-lg object-cover"
                    optixFlowConfig={optixFlowConfig}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="mt-4 flex justify-center gap-2">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  "h-2 w-2 rounded-full transition-colors",
                  current === index + 1 ? "bg-primary" : "bg-muted"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
