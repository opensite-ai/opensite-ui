"use client";

import * as React from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import {
  imagePlaceholders,
  logoPlaceholders,
} from "../../../lib/mediaPlaceholders";
import { Carousel, CarouselContent, CarouselItem } from "../../ui/carousel";

export interface HeroDesignCarouselPortfolioProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

export function HeroDesignCarouselPortfolio({
  className,
  optixFlowConfig,
}: HeroDesignCarouselPortfolioProps): React.JSX.Element {
  return (
    <section className={cn("relative bg-background py-14", className)}>
      <div className="relative z-10 container mx-auto">
        <div className="py-8">
          <Img
            src={logoPlaceholders.darkHorizontalLogo}
            className="h-12 lg:h-16"
            alt=""
            optixFlowConfig={optixFlowConfig}
          />
        </div>
        <div className="flex flex-col gap-10 py-10 lg:py-28">
          <div className="hidden items-center gap-6 lg:flex">
            <div className="flex items-center gap-1.5 text-foreground">
              <DynamicIcon name="lucide/check-circle" size={24} />
              <span>Design Subscription Monthly</span>
            </div>
            <div className="flex items-center gap-1.5 text-foreground">
              <DynamicIcon name="lucide/check-circle" size={24} />
              <span>Rapid Delivery</span>
            </div>
            <div className="flex items-center gap-1.5 text-foreground">
              <DynamicIcon name="lucide/check-circle" size={24} />
              <span>Flexible Subscription</span>
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-1 flex-col gap-4">
              <h1 className="max-w-6xl text-4xl tracking-tighter text-foreground lg:text-7xl xl:text-9xl">
                The All You Can Design buffet to fuel your business growth
              </h1>
              <p className="text-lg text-foreground lg:text-2xl">
                Enjoy professional design expertise —{" "}
                <span className="font-semibold">
                  without the hefty price tag
                </span>
              </p>
            </div>
          </div>
          <Pressable
            href="#"
            asButton
            variant="outline"
            className="flex h-fit items-center gap-2.5 self-start rounded-full border-2 border-black px-2 py-1.5 text-sm font-semibold lg:px-4 lg:py-3.5 lg:text-base"
          >
            <Img
              src={imagePlaceholders[16]}
              alt=""
              className="size-9 rounded-full object-cover lg:size-11"
              optixFlowConfig={optixFlowConfig}
            />
            <span>Schedule a chat with me</span>
          </Pressable>
        </div>
      </div>
      <div className="relative flex flex-col">
        <Carousel
          opts={{
            loop: true,
            align: "center",
          }}
          plugins={[
            AutoScroll({
              speed: 1,
            }),
            Autoplay({
              playOnInit: true,
              delay: 1000,
            }),
          ]}
          className="relative mx-auto w-full max-w-full overflow-hidden from-white to-transparent before:absolute before:top-0 before:left-0 before:z-10 before:h-full before:w-[20%] before:bg-linear-to-r before:content-[''] after:absolute after:top-0 after:right-0 after:z-10 after:h-full after:w-[20%] after:bg-linear-to-l after:from-white after:to-transparent after:content-['']"
        >
          <CarouselContent className="ml-5 flex gap-5 pl-4">
            {[17, 18, 19, 20, 21, 22, 23, 24].map((idx) => (
              <CarouselItem key={idx} className="basis-[496px] bg-background">
                <div className="h-[380px] basis-[480px] overflow-hidden rounded-lg">
                  <Img
                    src={imagePlaceholders[idx]}
                    alt=""
                    className="size-full object-cover"
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <Pressable
        href="#"
        asButton
        variant="outline"
        className="relative z-10 mx-auto mt-10 flex h-fit items-center gap-2.5 rounded-full border-2 border-black px-4 py-3.5 text-sm font-semibold transition hover:bg-black hover:text-white lg:text-base"
      >
        <span>Explore my portfolio</span>
        <DynamicIcon name="lucide/arrow-up-right" size={24} />
      </Pressable>
    </section>
  );
}
