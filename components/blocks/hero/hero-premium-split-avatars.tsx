"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface HeroPremiumSplitAvatarsProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

export function HeroPremiumSplitAvatars({
  className,
  optixFlowConfig,
}: HeroPremiumSplitAvatarsProps): React.JSX.Element {
  return (
    <section className={cn("dark flex", className)}>
      <div className="flex w-full items-center justify-center bg-background lg:w-1/2">
        <div className="container my-10 flex w-[500px] flex-col gap-24">
          <h1 className="text-4xl text-foreground">
            Business{" "}
            <span className="bg-linear-to-tr from-foreground to-muted bg-clip-text text-transparent">
              PRO
            </span>
          </h1>
          <div>
            <h2 className="text-4xl text-foreground lg:text-6xl">
              Achieve More with Elite Access Pro
            </h2>
            <p className="mt-2.5 text-foreground lg:text-xl">
              Enhance your career hunt with increased visibility, first-look
              opportunities and monetary incentives!
            </p>
            <Pressable href="#" asButton variant="default" className="mt-10 flex h-fit items-center gap-2.5 rounded-xl px-5 py-4 font-bold">
              <span>Upgrade to premium </span>
              <DynamicIcon name="lucide/chevron-right" size={20} />
            </Pressable>
          </div>
          <div className="flex items-center gap-3.5">
            <div className="flex -space-x-3">
              <Avatar className="block size-11 min-h-11 min-w-11 rounded-full object-cover lg:size-11">
                <AvatarImage src={imagePlaceholders[26]} />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <Avatar className="block size-11 min-h-11 min-w-11 rounded-full object-cover lg:size-11">
                <AvatarImage src={imagePlaceholders[27]} />
                <AvatarFallback>B</AvatarFallback>
              </Avatar>
              <Avatar className="block size-11 min-h-11 min-w-11 rounded-full object-cover lg:size-11">
                <AvatarImage src={imagePlaceholders[28]} />
                <AvatarFallback>C</AvatarFallback>
              </Avatar>
              <Avatar className="block size-11 min-h-11 min-w-11 rounded-full object-cover lg:size-11">
                <AvatarImage src={imagePlaceholders[29]} />
                <AvatarFallback>D</AvatarFallback>
              </Avatar>
              <Avatar className="block size-11 min-h-11 min-w-11 rounded-full object-cover lg:size-11">
                <AvatarImage src={imagePlaceholders[30]} />
                <AvatarFallback>E</AvatarFallback>
              </Avatar>
            </div>
            <span className="text-xs text-foreground lg:text-sm">
              More than 1 million professionals rely on our platform
            </span>
          </div>
        </div>
      </div>
      <Img
        src={imagePlaceholders[31]}
        alt=""
        className="hidden h-screen w-1/2 object-cover lg:block"
        optixFlowConfig={optixFlowConfig}
      />
    </section>
  );
}
