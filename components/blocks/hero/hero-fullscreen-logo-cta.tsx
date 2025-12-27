"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders, logoPlaceholders } from "../../../lib/mediaPlaceholders";

export interface HeroFullscreenLogoCtaProps {
  className?: string;
  backgroundImage?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

export function HeroFullscreenLogoCta({
  className,
  backgroundImage = imagePlaceholders[34],
  optixFlowConfig,
}: HeroFullscreenLogoCtaProps): React.JSX.Element {
  return (
    <section
      className={cn(
        "dark h-screen w-screen bg-background bg-cover bg-center bg-no-repeat pt-12 pb-24",
        className,
      )}
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <div className="container flex h-full flex-col justify-between px-5 xl:px-20">
        <Img src={logoPlaceholders.lightHorizontalLogo} alt="" className="size-20" optixFlowConfig={optixFlowConfig} />
        <div className="flex items-end justify-between">
          <div className="flex w-full flex-col gap-8 md:w-2/3">
            <h1 className="text-6xl font-medium text-foreground md:text-[5.8rem]">
              Create your own fiber optics facility
            </h1>
            <p className="text-xl text-foreground md:text-2xl">
              CableCore Partnership. Worldwide network. Regional manufacturing
            </p>
          </div>
          <Pressable
            href="#"
            asButton
            variant="ghost"
            className="hidden items-center gap-2 text-foreground hover:bg-transparent md:flex"
          >
            <span className="text-2xl">Read More</span>
            <DynamicIcon name="lucide/arrow-down" size={24} />
          </Pressable>
        </div>
      </div>
    </section>
  );
}
