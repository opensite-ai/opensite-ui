"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";

export interface HeroCenteredGradientCtaProps {
  className?: string;
}

export function HeroCenteredGradientCta({
  className,
}: HeroCenteredGradientCtaProps): React.JSX.Element {
  return (
    <section
      className={cn(
        "relative min-h-screen overflow-hidden bg-background py-32",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.3),transparent)]"></div>
      <div className="container relative z-10 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-muted/50 px-4 py-2 text-sm text-muted-foreground">
          <DynamicIcon
            name="lucide/sparkles"
            size={16}
            className="text-primary"
          />
          <span>Introducing our new platform</span>
        </div>
        <h1 className="mt-8 max-w-4xl text-5xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
          Build something{" "}
          <span className="bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            extraordinary
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Create stunning applications with our powerful platform. Ship faster,
          scale effortlessly, and delight your users.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Pressable
            href="#"
            asButton
            variant="default"
            size="lg"
            className="rounded-full px-8"
          >
            Get started free
            <DynamicIcon name="lucide/arrow-right" size={16} className="ml-2" />
          </Pressable>
          <Pressable
            href="#"
            asButton
            variant="outline"
            size="lg"
            className="rounded-full px-8"
          >
            <DynamicIcon name="lucide/play" size={16} className="mr-2" />
            Watch demo
          </Pressable>
        </div>
        <div className="mt-16 flex items-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <DynamicIcon
              name="lucide/check-circle"
              size={16}
              className="text-green-500"
            />
            <span>Free 14-day trial</span>
          </div>
          <div className="flex items-center gap-2">
            <DynamicIcon
              name="lucide/check-circle"
              size={16}
              className="text-green-500"
            />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <DynamicIcon
              name="lucide/check-circle"
              size={16}
              className="text-green-500"
            />
            <span>Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
}
