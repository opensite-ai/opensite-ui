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

export interface HeroVideoDialogGradientProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

export function HeroVideoDialogGradient({
  className,
  optixFlowConfig,
}: HeroVideoDialogGradientProps): React.JSX.Element {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  return (
    <Fragment>
      <section
        className={cn(
          "relative overflow-hidden bg-background py-12 font-sans md:py-20",
          className
        )}
      >
        <div className="relative z-20 container">
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col items-center gap-6">
              <h1 className="max-w-[920px] text-center text-4xl leading-tight font-semibold text-foreground md:text-6xl lg:text-7xl">
                Transform your workflow with intelligent automation
              </h1>
              <p className="max-w-[750px] text-center text-base leading-relaxed font-normal text-muted-foreground md:text-xl">
                Streamline your processes, reduce manual work, and focus on what
                matters most. Our platform helps teams work smarter, not harder.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <Pressable
                href="#"
                asButton
                variant="default"
                size="lg"
                className="rounded-full px-8"
              >
                Start free trial
                <DynamicIcon
                  name="lucide/arrow-right"
                  size={16}
                  className="ml-2"
                />
              </Pressable>
              <Pressable
                href="#"
                onClick={() => setIsVideoOpen(true)}
                asButton
                variant="outline"
                size="lg"
                className="rounded-full px-8"
              >
                <DynamicIcon name="lucide/play" size={16} className="mr-2" />
                Watch demo
              </Pressable>
            </div>
          </div>
          <div className="mx-auto mt-16 w-full max-w-[1000px] overflow-hidden rounded-xl shadow-[4px_2px_3.123rem_rgba(0,0,0,.15)]">
            <AspectRatio ratio={1.406469761 / 1}>
              <Img
                src={imagePlaceholders[101]}
                alt=""
                className="size-full object-cover object-center"
                optixFlowConfig={optixFlowConfig}
              />
            </AspectRatio>
          </div>
        </div>
        <div className="absolute top-auto bottom-[32%] left-[31%] z-10 size-full md:top-[-6%] md:bottom-auto md:left-55.5">
          <AspectRatio
            ratio={1}
            className="bg-[radial-gradient(closest-side,var(--color-accent),transparent)]"
          />
        </div>
      </section>
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Product Demo</DialogTitle>
          </DialogHeader>
          <div className="aspect-video">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/your-video-id"
              title="Product Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
