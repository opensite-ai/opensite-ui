"use client";

import * as React from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../ui/carousel";

export interface LogosNumberedCarouselProps {
  className?: string;
  headline?: string;
  logos?: Array<{
    name: string;
    logo: string;
  }>;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultLogos = [
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

export function LogosNumberedCarousel({
  className,
  headline = "Powering the world's best product teams.",
  logos = defaultLogos,
  optixFlowConfig,
}: LogosNumberedCarouselProps) {
  return (
    <section className={cn("py-32 overflow-hidden", className)}>
      <div className="container mb-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <h2 className="text-2xl font-bold md:text-3xl lg:text-4xl">
            {headline}
          </h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">
              {logos.length.toString().padStart(2, "0")}
            </span>
            <span>companies trust us</span>
          </div>
        </div>
      </div>
      <div className="relative">
        <Carousel
          opts={{ loop: true }}
          plugins={[AutoScroll({ playOnInit: true, speed: 0.8 })]}
        >
          <CarouselContent className="ml-0">
            {[...logos, ...logos].map((logo, index) => (
              <CarouselItem
                key={index}
                className="flex basis-1/3 justify-center pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
              >
                <div className="group relative mx-6 flex shrink-0 items-center justify-center">
                  <span className="absolute -top-4 left-0 text-xs font-medium text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                    {(index % logos.length + 1).toString().padStart(2, "0")}
                  </span>
                  <Img
                    src={logo.logo}
                    alt={`${logo.name} logo`}
                    width={120}
                    height={40}
                    className="h-10 w-auto object-contain opacity-60 grayscale transition-all group-hover:opacity-100 group-hover:grayscale-0"
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-linear-to-r from-background to-transparent"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-linear-to-l from-background to-transparent"></div>
      </div>
    </section>
  );
}
