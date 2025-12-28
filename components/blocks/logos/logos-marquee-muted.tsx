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

export interface LogosMarqueeMutedProps {
  className?: string;
  heading?: string;
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

export function LogosMarqueeMuted({
  className,
  heading = "Trusted by leading companies",
  logos = defaultLogos,
  optixFlowConfig,
}: LogosMarqueeMutedProps) {
  return (
    <section className={cn("bg-muted py-24", className)}>
      <div className="container mb-12">
        <p className="text-center text-lg font-medium text-muted-foreground">
          {heading}
        </p>
      </div>
      <div className="relative">
        <Carousel
          opts={{ loop: true }}
          plugins={[AutoScroll({ playOnInit: true, speed: 1 })]}
        >
          <CarouselContent className="ml-0">
            {[...logos, ...logos].map((logo, index) => (
              <CarouselItem
                key={index}
                className="flex basis-1/3 justify-center pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
              >
                <div className="mx-8 flex shrink-0 items-center justify-center">
                  <Img
                    src={logo.logo}
                    alt={`${logo.name} logo`}
                    width={120}
                    height={40}
                    className="h-8 w-auto object-contain opacity-60 grayscale"
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-muted to-transparent"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-muted to-transparent"></div>
      </div>
    </section>
  );
}
