"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface HeroDashedBorderFeaturesProps {
  className?: string;
}

export function HeroDashedBorderFeatures({
  className,
}: HeroDashedBorderFeaturesProps): React.JSX.Element {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="border-x border-t border-dashed px-4 py-20 md:px-16">
          <div className="mx-auto max-w-3xl">
            <Pressable
              href="#"
              className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm"
            >
              <Badge>New</Badge>
              v2.2 is out now!
              <DynamicIcon name="lucide/arrow-right" size={16} />
            </Pressable>
            <h1 className="my-4 mb-6 text-center text-3xl font-semibold lg:text-8xl">
              Fast websites for startups
            </h1>
            <p className="mx-auto mb-6 max-w-2xl text-center text-muted-foreground lg:text-xl">
              We craft powerful websites to accelerate your startup&apos;s
              growth.
            </p>
            <div className="flex flex-col justify-center gap-2 sm:flex-row">
              <Pressable href="#" asButton size="lg" variant="default" className="w-full gap-2 sm:w-auto lg:mt-10">
                <div className="size-2 rounded-full bg-green-400"></div>
                Start your free trial
              </Pressable>
              <Pressable
                href="#"
                asButton
                variant="outline"
                size="lg"
                className="w-full gap-2 sm:w-auto lg:mt-10"
              >
                <Avatar className="size-8 rounded-full ring-1 ring-input">
                  <AvatarImage
                    src={imagePlaceholders[15]}
                    alt="placeholder"
                  />
                </Avatar>
                Schedule a demo
              </Pressable>
            </div>
          </div>
        </div>
        <div className="relative grid border-x border-dashed md:grid-cols-3">
          <DynamicIcon name="lucide/sparkle" size={20} className="absolute top-0 right-0 translate-x-2.5 -translate-y-2.5 fill-primary" />
          <DynamicIcon name="lucide/sparkle" size={20} className="absolute top-0 left-0 -translate-x-2.5 -translate-y-2.5 fill-primary" />
          <div className="flex items-center gap-6 border-t border-dashed p-4 font-medium md:justify-center lg:p-10 lg:text-lg">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted text-sm lg:size-12 lg:text-base">
              <DynamicIcon name="lucide/zap" size={20} />
            </span>
            2-4 week delivery
          </div>
          <div className="flex items-center gap-6 border-x border-t border-dashed p-4 font-medium md:justify-center lg:p-10 lg:text-lg">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted text-sm lg:size-12 lg:text-base">
              <DynamicIcon name="lucide/dollar-sign" size={20} />
            </span>
            Upfront, no hidden fees
          </div>
          <div className="flex items-center gap-6 border-t border-dashed p-4 font-medium md:justify-center lg:p-10 lg:text-lg">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted text-sm lg:size-12 lg:text-base">
              <DynamicIcon name="lucide/medal" size={20} />
            </span>
            Full refund if not satisfied
          </div>
        </div>
      </div>
    </section>
  );
}
