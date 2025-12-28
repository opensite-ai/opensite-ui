"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface HeroTherapyTestimonialGridProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

export function HeroTherapyTestimonialGrid({
  className,
  optixFlowConfig,
}: HeroTherapyTestimonialGridProps): React.JSX.Element {
  return (
    <section
      className={cn("bg-background py-12 font-sans md:py-20", className)}
    >
      <div className="container">
        <div className="mx-auto mb-16 flex max-w-[900px] flex-col items-center gap-6">
          <h1 className="text-center text-4xl leading-tight font-medium text-foreground sm:text-5xl md:text-6xl">
            Compassionate Care for Your Mental Wellness Journey
          </h1>
          <p className="text-center text-lg text-muted-foreground md:text-xl">
            Our team of experienced therapists is dedicated to helping you
            navigate life&apos;s challenges with personalized support.
          </p>
          <Pressable
            href="#"
            asButton
            variant="default"
            className="h-fit rounded-full px-8 py-4 font-semibold"
          >
            Book a consultation
          </Pressable>
        </div>
        <div className="grid w-full auto-cols-auto grid-cols-1 grid-rows-[auto_auto_auto] justify-center gap-5 md:grid-cols-2">
          <div className="col-[1/2] row-[1/2] w-full">
            <div className="h-full max-h-100 w-full overflow-hidden rounded-2xl">
              <Img
                src={imagePlaceholders[107]}
                alt=""
                className="block h-full w-full object-cover object-center"
                optixFlowConfig={optixFlowConfig}
              />
            </div>
          </div>
          <div className="col-[1/2] row-[2/3] md:col-[2/3] md:row-[1/2]">
            <div className="h-full max-h-100 w-full overflow-hidden rounded-2xl">
              <Img
                src={imagePlaceholders[108]}
                alt=""
                className="block h-full w-full object-cover object-center"
                optixFlowConfig={optixFlowConfig}
              />
            </div>
          </div>
          <div className="col-[1/2] row-[3/4] md:col-[1/2] md:row-[2/3]">
            <div className="flex h-full min-h-37.5 flex-col gap-3 overflow-hidden rounded-3xl bg-muted p-5 px-5 md:flex-row md:items-center md:gap-7 md:py-8">
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl md:h-30 md:w-30">
                <Img
                  src={imagePlaceholders[109]}
                  alt=""
                  className="h-full w-full object-cover object-center"
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
              <div className="flex h-full w-full flex-col justify-between gap-2">
                <p className="text-lg font-medium text-foreground">
                  &quot;Since beginning therapy here, I feel more grounded and
                  at ease.&quot;
                </p>
                <p className="text-foreground">John Doe</p>
              </div>
            </div>
          </div>
          <div className="row-[4/5] md:col-[2/3] md:row-[2/3]">
            <div className="h-full w-full overflow-hidden rounded-2xl bg-muted">
              <Img
                src={imagePlaceholders[110]}
                alt=""
                className="h-full w-full object-cover object-center"
                optixFlowConfig={optixFlowConfig}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
