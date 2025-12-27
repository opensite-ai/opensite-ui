"use client";

import * as React from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../ui/carousel";

export interface HeroAiPoweredCarouselProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

export function HeroAiPoweredCarousel({
  className,
  optixFlowConfig,
}: HeroAiPoweredCarouselProps): React.JSX.Element {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="mx-auto">
            <div className="flex w-fit items-center gap-2 rounded-full border px-2.5 py-1.5 text-xs font-medium">
              <Badge>AI-powered</Badge>
              Solutions for new businesses
            </div>
            <h1 className="mt-10 mb-4 text-3xl font-semibold lg:text-5xl">
              Revolutionizing Client Collaboration for Modern Services
            </h1>
            <p className="mx-auto text-muted-foreground lg:text-lg">
              Elevate your service-based business with customizable client
              portals and advanced back-office management
            </p>
            <div className="mt-10 flex flex-col gap-2 sm:flex-row">
              <Pressable href="#" asButton size="lg" variant="default" className="w-full gap-2 sm:w-auto">
                Start for Free
              </Pressable>
              <Pressable
                href="#"
                asButton
                variant="outline"
                size="lg"
                className="w-full gap-2 sm:w-auto"
              >
                Schedule a Demo
              </Pressable>
            </div>
          </div>
          <div className="flex flex-col gap-8 lg:hidden">
            <Carousel
              opts={{
                loop: true,
              }}
              plugins={[
                AutoScroll({
                  speed: 0.8,
                }),
              ]}
              className="-mx-7"
            >
              <CarouselContent className="max-h-[350px]">
                {[44, 45, 46, 47].map((idx) => (
                  <CarouselItem key={idx} className="max-w-96">
                    <Img
                      src={imagePlaceholders[idx]}
                      alt="placeholder"
                      optixFlowConfig={optixFlowConfig}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <Carousel
              opts={{
                loop: true,
              }}
              plugins={[
                AutoScroll({
                  speed: 0.8,
                  direction: "backward",
                }),
              ]}
              className="-mx-7"
            >
              <CarouselContent className="max-h-[350px]">
                {[48, 49, 50, 51].map((idx) => (
                  <CarouselItem key={idx} className="max-w-96">
                    <Img
                      src={imagePlaceholders[idx]}
                      alt="placeholder"
                      optixFlowConfig={optixFlowConfig}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
          <div className="hidden grid-cols-2 gap-8 lg:grid">
            <Carousel
              opts={{
                loop: true,
              }}
              plugins={[
                AutoScroll({
                  speed: 0.8,
                }),
              ]}
              orientation="vertical"
            >
              <CarouselContent className="max-h-[600px]">
                {[52, 53, 54, 55].map((idx) => (
                  <CarouselItem key={idx}>
                    <Img
                      src={imagePlaceholders[idx]}
                      alt="placeholder"
                      optixFlowConfig={optixFlowConfig}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <Carousel
              opts={{
                loop: true,
              }}
              plugins={[
                AutoScroll({
                  speed: 0.8,
                  direction: "backward",
                }),
              ]}
              orientation="vertical"
            >
              <CarouselContent className="max-h-[600px]">
                {[56, 57, 58, 59].map((idx) => (
                  <CarouselItem key={idx}>
                    <Img
                      src={imagePlaceholders[idx]}
                      alt="placeholder"
                      optixFlowConfig={optixFlowConfig}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}
