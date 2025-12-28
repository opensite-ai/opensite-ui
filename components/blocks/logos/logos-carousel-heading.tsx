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

export interface LogosCarouselHeadingProps {
  className?: string;
  heading?: string;
  logos?: Array<{
    id: string;
    description: string;
    image: string;
    className?: string;
  }>;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultLogos = [
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

export function LogosCarouselHeading({
  className,
  heading = "Trusted by these companies",
  logos = defaultLogos,
  optixFlowConfig,
}: LogosCarouselHeadingProps) {
  return (
    <section className={cn("py-64", className)}>
      <div className="container flex flex-col items-center text-center">
        <h1 className="my-6 text-2xl font-bold text-pretty lg:text-4xl">
          {heading}
        </h1>
      </div>
      <div className="pt-10 md:pt-16 lg:pt-20">
        <div className="relative mx-auto flex items-center justify-center lg:max-w-5xl">
          <Carousel
            opts={{ loop: true }}
            plugins={[AutoScroll({ playOnInit: true })]}
          >
            <CarouselContent className="ml-0">
              {logos.map((logo) => (
                <CarouselItem
                  key={logo.id}
                  className="flex basis-1/3 justify-center pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
                >
                  <div className="mx-10 flex shrink-0 items-center justify-center">
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
          <div className="absolute inset-y-0 left-0 w-12 bg-linear-to-r from-background to-transparent"></div>
          <div className="absolute inset-y-0 right-0 w-12 bg-linear-to-l from-background to-transparent"></div>
        </div>
      </div>
    </section>
  );
}
