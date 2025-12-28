"use client";

import * as React from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { patternSvgs } from "../../../lib/patternSvgs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../ui/carousel";

export interface LogosDoubleCarouselPatternProps {
  className?: string;
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonUrl?: string;
  secondaryButtonText?: string;
  secondaryButtonUrl?: string;
  topRowLogos?: Array<{
    name: string;
    logo: string;
  }>;
  bottomRowLogos?: Array<{
    name: string;
    logo: string;
  }>;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultTopRowLogos = [
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
];

const defaultBottomRowLogos = [
  {
    name: "Company 7",
    logo: "https://cdn.ing/assets/files/record/286220/t34kymqu5g9xr85o89cji3kfuypb",
  },
  {
    name: "Company 8",
    logo: "https://cdn.ing/assets/files/record/286251/c64yb2c255uig6vpe4gdlnten7rv",
  },
  {
    name: "Company 9",
    logo: "https://cdn.ing/assets/files/record/286209/4nowqz6c7v6vhzldvh9qdnhmkrwb",
  },
  {
    name: "Company 10",
    logo: "https://cdn.ing/assets/files/record/286208/nay46vdmppxuznd7eg5jnnf4qjv5",
  },
  {
    name: "Company 11",
    logo: "https://cdn.ing/assets/files/record/286214/pn9v9zz0de8jgz2mf8o1c11k8gxh",
  },
  {
    name: "Company 12",
    logo: "https://cdn.ing/assets/files/record/286235/x4po9fpjkd6cdxnfxaqya6emwvea",
  },
];

export function LogosDoubleCarouselPattern({
  className,
  title = "Trusted by industry leaders worldwide",
  description = "Join thousands of companies that rely on our platform to power their business operations and drive sustainable growth.",
  primaryButtonText = "Get started",
  primaryButtonUrl = "#",
  secondaryButtonText = "Learn more",
  secondaryButtonUrl = "#",
  topRowLogos = defaultTopRowLogos,
  bottomRowLogos = defaultBottomRowLogos,
  optixFlowConfig,
}: LogosDoubleCarouselPatternProps) {
  return (
    <section
      className={cn("relative py-32 overflow-hidden", className)}
      style={{
        backgroundImage: `url("${patternSvgs.dots}")`,
        backgroundSize: "30px 30px",
      }}
    >
      <div className="absolute inset-0 bg-linear-to-b from-background via-transparent to-background"></div>
      <div className="container relative z-10 mb-16 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
          {title}
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
          {description}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Pressable href={primaryButtonUrl} variant="default" asButton>
            {primaryButtonText}
          </Pressable>
          <Pressable href={secondaryButtonUrl} variant="outline" asButton>
            {secondaryButtonText}
          </Pressable>
        </div>
      </div>
      <div className="relative space-y-8">
        <Carousel
          opts={{ loop: true }}
          plugins={[AutoScroll({ playOnInit: true, speed: 0.6 })]}
        >
          <CarouselContent className="ml-0">
            {[...topRowLogos, ...topRowLogos].map((logo, index) => (
              <CarouselItem
                key={index}
                className="flex basis-1/3 justify-center pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
              >
                <div className="mx-6 flex shrink-0 items-center justify-center rounded-lg border border-border bg-background/80 p-4 backdrop-blur-sm">
                  <Img
                    src={logo.logo}
                    alt={`${logo.name} logo`}
                    width={100}
                    height={40}
                    className="h-8 w-auto object-contain"
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <Carousel
          opts={{ loop: true }}
          plugins={[AutoScroll({ playOnInit: true, speed: 0.6, direction: "backward" })]}
        >
          <CarouselContent className="ml-0">
            {[...bottomRowLogos, ...bottomRowLogos].map((logo, index) => (
              <CarouselItem
                key={index}
                className="flex basis-1/3 justify-center pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
              >
                <div className="mx-6 flex shrink-0 items-center justify-center rounded-lg border border-border bg-background/80 p-4 backdrop-blur-sm">
                  <Img
                    src={logo.logo}
                    alt={`${logo.name} logo`}
                    width={100}
                    height={40}
                    className="h-8 w-auto object-contain"
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
