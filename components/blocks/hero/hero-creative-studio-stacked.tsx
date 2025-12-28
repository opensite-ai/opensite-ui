"use client";

import * as React from "react";
import { Fragment, useState } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import { AspectRatio } from "../../ui/aspect-ratio";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";

export interface HeroCreativeStudioStackedProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

export function HeroCreativeStudioStacked({
  className,
  optixFlowConfig,
}: HeroCreativeStudioStackedProps): React.JSX.Element {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <Fragment>
      <section className={cn("bg-background py-12 md:py-20", className)}>
        <div className="container">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div className="flex flex-col gap-6">
              <p className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
                Harmony Creative Studio
              </p>
              <div className="flex max-w-160 flex-col gap-6">
                <h1 className="text-4xl leading-tight font-medium md:text-5xl xl:text-6xl">
                  Boost your business with a brand-new website.
                </h1>
                <p className="text-xl text-balance text-muted-foreground">
                  Harmony is a full-service design studio crafting stunning
                  digital experiences and products.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 py-4">
                <Pressable
                  href="#"
                  asButton
                  variant="default"
                  className="block h-fit w-fit rounded-sm px-5 py-3.5 text-sm font-medium tracking-wider text-nowrap uppercase"
                >
                  Discover now
                </Pressable>
                <Pressable
                  href="#"
                  onClick={() => setIsVideoOpen(true)}
                  asButton
                  variant="ghost"
                  className="flex h-fit w-fit flex-nowrap items-center gap-2 rounded-sm bg-transparent px-5 py-3.5 text-sm font-medium tracking-wider text-nowrap uppercase"
                >
                  <DynamicIcon
                    name="lucide/play"
                    size={12}
                    className="fill-neutral-950"
                  />
                  <p>How it works?</p>
                </Pressable>
              </div>
            </div>
            <div>
              <div className="relative mx-auto aspect-[0.789340102/1] max-w-100">
                <div className="absolute bottom-0 left-0 z-30 w-[63%]">
                  <AspectRatio
                    ratio={0.724137931 / 1}
                    className="overflow-hidden"
                  >
                    <Img
                      src={imagePlaceholders[7]}
                      alt=""
                      className="size-full object-cover object-center"
                      optixFlowConfig={optixFlowConfig}
                    />
                  </AspectRatio>
                </div>

                <div className="absolute top-1/2 left-1/2 z-20 w-[63%] -translate-x-1/2 -translate-y-1/2">
                  <AspectRatio
                    ratio={0.724137931 / 1}
                    className="overflow-hidden"
                  >
                    <Img
                      src={imagePlaceholders[8]}
                      alt=""
                      className="size-full object-cover object-center"
                      optixFlowConfig={optixFlowConfig}
                    />
                  </AspectRatio>
                </div>

                <div className="absolute top-0 right-0 z-10 w-[63%]">
                  <AspectRatio
                    ratio={0.724137931 / 1}
                    className="overflow-hidden"
                  >
                    <Img
                      src={imagePlaceholders[9]}
                      alt=""
                      className="size-full object-cover object-center"
                      optixFlowConfig={optixFlowConfig}
                    />
                  </AspectRatio>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Presentation Video</DialogTitle>
          </DialogHeader>
          <div className="aspect-video">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/your-video-id"
              title="Presentation Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
