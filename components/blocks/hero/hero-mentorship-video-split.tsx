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

export interface HeroMentorshipVideoSplitProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

export function HeroMentorshipVideoSplit({
  className,
  optixFlowConfig,
}: HeroMentorshipVideoSplitProps): React.JSX.Element {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <Fragment>
      <section className={cn("font-onest py-12 md:py-28", className)}>
        <div className="container">
          <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <div className="flex h-full flex-col justify-between gap-12">
                <div className="flex max-w-165 flex-col gap-9">
                  <h1 className="text-[2.5rem] leading-none text-primary sm:text-[3.4375rem] md:text-[4rem]">
                    Career Growth with Expert Mentorship
                  </h1>
                  <p className="text-lg font-medium text-primary md:text-xl">
                    Receive tailored mentorship aligned with your goals. Let
                    experienced mentors guide you to success with personalized
                    insights and dedicated support.
                  </p>
                  <Pressable
                    href="#"
                    asButton
                    variant="default"
                    className="h-fit w-fit rounded-full px-8 py-4 font-semibold"
                  >
                    Sign up now
                  </Pressable>
                </div>
                <div className="flex max-w-97.5 flex-col gap-6">
                  <p className="text-xl text-primary">
                    Watch our introduction to discover our services
                  </p>
                  <Pressable
                    href="#"
                    onClick={() => setIsVideoOpen(true)}
                    asButton
                    variant="ghost"
                    className="group relative flex aspect-video h-full w-full max-w-97.5 overflow-hidden rounded-lg bg-accent p-0 transition-all hover:bg-accent"
                  >
                    <AspectRatio ratio={16 / 9} className="flex h-full w-full">
                      <Img
                        src={imagePlaceholders[115]}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover"
                        optixFlowConfig={optixFlowConfig}
                      />
                      <div className="m-auto aspect-square z-10">
                        <DynamicIcon
                          name="lucide/play"
                          size={40}
                          className="fill-white stroke-white transition-transform group-hover:scale-125"
                        />
                      </div>
                    </AspectRatio>
                  </Pressable>
                </div>
              </div>
            </div>
            <div>
              <Img
                src={imagePlaceholders[116]}
                alt=""
                className="aspect-4/5 h-full max-h-250 w-full rounded-xl object-cover object-center"
                optixFlowConfig={optixFlowConfig}
              />
            </div>
          </div>
        </div>
      </section>
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="sm:max-w-200">
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
