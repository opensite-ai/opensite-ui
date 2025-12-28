"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import { AspectRatio } from "../../ui/aspect-ratio";

export interface HeroTestimonialImageGridProps {
  heading?: string;
  description?: string;
  button?: {
    text: string;
    url: string;
  };
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    company: string;
    avatars: Array<{
      image: string;
      fallback: string;
    }>;
  };
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

export function HeroTestimonialImageGrid({
  heading = "Blocks built with Opensite AI & Tailwind",
  description = "Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.",
  button = {
    text: "Get Started",
    url: "#",
  },
  testimonial = {
    quote: "Focused strategy, swift delivery",
    author: "John Doe",
    role: "CEO",
    company: "Company",
    avatars: [
      { image: imagePlaceholders[87], fallback: "AB" },
      { image: imagePlaceholders[88], fallback: "CD" },
      { image: imagePlaceholders[89], fallback: "EF" },
    ],
  },
  className,
  optixFlowConfig,
}: HeroTestimonialImageGridProps): React.JSX.Element {
  return (
    <section className={cn("py-12 md:py-20", className)}>
      <div className="container">
        <div className="flex flex-col items-center gap-8 md:flex-row">
          <div className="flex-1">
            <div className="flex flex-col gap-4 lg:gap-8">
              <h1 className="leading-tighter max-w-[80%] text-4xl font-semibold tracking-tight text-foreground lg:text-5xl xl:text-7xl">
                {heading}
              </h1>
              <p className="text-lg leading-relaxed text-muted-foreground xl:text-2xl">
                {description}
              </p>
            </div>
            <div className="my-6 lg:my-10">
              <Pressable href={button.url} asButton size="lg" variant="default">
                {button.text}
              </Pressable>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex -space-x-2">
                {testimonial.avatars.map((avatar, index) => (
                  <Avatar
                    key={index}
                    className="size-10 border-2 border-border"
                  >
                    <AvatarImage src={avatar.image} alt="" />
                    <AvatarFallback>{avatar.fallback}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div>
                <p className="mb-1 text-sm text-foreground/60 italic">
                  &quot;{testimonial.quote}&quot;
                </p>
                <p className="text-sm font-medium text-foreground/60">
                  {testimonial.author}, {testimonial.role} @
                  {testimonial.company}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full flex-1">
            <div className="w-full max-w-200">
              <AspectRatio ratio={1 / 1} className="h-full w-full">
                <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-[3.5%]">
                  <div className="overflow-hidden rounded-[5.2%] border border-muted bg-muted">
                    <Img
                      src={imagePlaceholders[90]}
                      alt=""
                      className="object-fit h-full w-full object-center"
                      optixFlowConfig={optixFlowConfig}
                    />
                  </div>
                  <div className="relative overflow-hidden rounded-[5.2%] border border-muted bg-muted">
                    <div className="absolute top-1/2 left-[5%] w-[110%] max-w-100 -translate-y-1/2 overflow-hidden rounded-md">
                      <AspectRatio ratio={1.739130435 / 1}>
                        <Img
                          src={imagePlaceholders[91]}
                          alt=""
                          className="size-full object-cover object-center"
                          optixFlowConfig={optixFlowConfig}
                        />
                      </AspectRatio>
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-[5.2%] border border-muted bg-muted">
                    <div className="absolute top-[9%] left-[9%] w-[200%] max-w-[37.5rem] overflow-hidden rounded-md">
                      <AspectRatio ratio={1.6 / 1}>
                        <Img
                          src={imagePlaceholders[92]}
                          alt=""
                          className="size-full object-cover object-center"
                          optixFlowConfig={optixFlowConfig}
                        />
                      </AspectRatio>
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-[5.2%] border border-muted bg-muted">
                    <div className="relative top-[12%] left-[50%] w-[70%] max-w-[17.5rem] -translate-x-[50%]">
                      <AspectRatio ratio={0.52 / 1}>
                        <Img
                          src={imagePlaceholders[93]}
                          alt=""
                          className="absolute z-10 w-full rounded-[16%]"
                          optixFlowConfig={optixFlowConfig}
                        />
                      </AspectRatio>
                    </div>
                  </div>
                </div>
              </AspectRatio>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
