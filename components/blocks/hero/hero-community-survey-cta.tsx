"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface HeroCommunitySurveyCtaProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

export function HeroCommunitySurveyCta({
  className,
  optixFlowConfig,
}: HeroCommunitySurveyCtaProps): React.JSX.Element {
  return (
    <section className={cn("py-32", className)}>
      <div className="container flex flex-col gap-7 text-center">
        <Pressable
          href="#"
          className="group mx-auto mb-3 w-fit gap-3 rounded-full border px-5 py-2 text-sm"
        >
          <span className="mr-1 font-medium">
            Join our Community Collaboration Survey!
          </span>
          We&apos;ll donate $20 for each response.
          <DynamicIcon name="lucide/minus" size={16} className="mx-1 inline-block" />
          <span className="font-semibold group-hover:underline">
            Take a tour
          </span>
        </Pressable>
        <h1 className="mx-auto max-w-4xl text-4xl font-semibold text-balance lg:text-6xl">
          Community & business data, centralized
        </h1>
        <p className="mx-auto max-w-4xl text-muted-foreground lg:text-xl">
          Showcase the value of your community to the business. Talkbase sets
          the stage for successful cross-collaboration among community teams
          working with customer, marketing, sales, and product development.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Pressable href="#" asButton size="lg" variant="default">Get started for free</Pressable>
          <Pressable href="#" asButton size="lg" variant="outline">
            Book a demo
          </Pressable>
        </div>
      </div>
      <div className="relative px-8">
        <div className="absolute inset-0 top-1/2 h-full w-full bg-linear-to-b from-muted to-transparent to-50%"></div>
        <div className="relative mx-auto max-w-5xl">
          <Img
            src={imagePlaceholders[7]}
            alt="placeholder"
            className="mt-20 max-h-[580px] w-full rounded-lg object-cover shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]"
            optixFlowConfig={optixFlowConfig}
          />
          <Img
            src={imagePlaceholders[8]}
            alt="placeholder"
            className="absolute top-1/2 -left-3 hidden max-h-56 -translate-y-1/2 rounded-lg object-cover shadow-md md:block xl:-left-10"
            optixFlowConfig={optixFlowConfig}
          />
          <Img
            src={imagePlaceholders[9]}
            alt="placeholder"
            className="absolute top-1/3 -right-3 hidden h-24 w-24 -translate-y-1/2 rounded-lg bg-muted shadow-md md:block xl:-right-10"
            optixFlowConfig={optixFlowConfig}
          />
        </div>
      </div>
    </section>
  );
}
