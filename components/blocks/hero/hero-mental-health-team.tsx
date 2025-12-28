"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface HeroMentalHealthTeamProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

export function HeroMentalHealthTeam({
  className,
  optixFlowConfig,
}: HeroMentalHealthTeamProps): React.JSX.Element {
  return (
    <section
      className={cn("dark bg-background py-12 font-sans md:py-20", className)}
    >
      <div className="container">
        <div className="mx-auto mb-24 flex max-w-[900px] flex-col items-center gap-3">
          <p className="text-center text-foreground">Your Support Team</p>
          <h1 className="text-center text-4xl leading-tight font-medium text-foreground sm:text-5xl md:text-6xl">
            Experienced Professionals Committed to Your Mental Health
          </h1>
        </div>
        <div className="grid w-full max-w-332.5 auto-cols-auto grid-cols-2 grid-rows-[auto_auto] justify-center gap-5 md:grid-cols-[repeat(4,1fr)]">
          <div className="col-[1/2] row-[1/2] w-full">
            <div className="h-full max-h-77.5 w-full overflow-hidden rounded-2xl">
              <Img
                src={imagePlaceholders[111]}
                alt=""
                className="block h-full w-full object-cover object-center"
                optixFlowConfig={optixFlowConfig}
              />
            </div>
          </div>
          <div className="col-[2/3] row-[1/2] w-full md:col-[2/3] md:row-[1/2]">
            <div className="h-full max-h-77.5 w-full overflow-hidden rounded-2xl">
              <Img
                src={imagePlaceholders[112]}
                alt=""
                className="block h-full w-full object-cover object-center"
                optixFlowConfig={optixFlowConfig}
              />
            </div>
          </div>
          <div className="col-[1/3] row-[3/4] w-full md:col-[1/3] md:row-[2/3]">
            <div className="flex h-full min-h-37.5 flex-col gap-3 overflow-hidden rounded-3xl bg-muted p-5 px-5 md:flex-row md:items-center md:gap-7 md:py-8">
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl md:h-30 md:w-30">
                <Img
                  src={imagePlaceholders[113]}
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
          <div className="col-[1/3] row-[2/3] h-100 w-full md:col-[3/5] md:row-[1/3] md:h-auto">
            <div className="h-full max-h-130.5 w-full overflow-hidden rounded-2xl">
              <Img
                src={imagePlaceholders[114]}
                alt=""
                className="block h-full w-full object-cover object-center"
                optixFlowConfig={optixFlowConfig}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
