"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";

export interface HeroBadgeShadowOverlayProps {
  className?: string;
}

export function HeroBadgeShadowOverlay({
  className,
}: HeroBadgeShadowOverlayProps): React.JSX.Element {
  return (
    <section className={cn("relative py-32", className)}>
      <div className="container">
        <div className="flex flex-col items-center gap-10 text-center">
          <Pressable
            href="#"
            className="flex items-center gap-2 rounded-full px-2 py-1 text-sm transition-colors hover:bg-muted"
          >
            <Badge>7 days ago</Badge>
            Slack integration is here!
            <DynamicIcon name="lucide/arrow-right" size={16} />
          </Pressable>
          <h1 className="text-4xl font-semibold lg:text-8xl">
            Manage design work right from the canvas
          </h1>
          <div className="flex w-full flex-col justify-center gap-2 sm:flex-row">
            <Pressable href="#" asButton size="lg" variant="default">Get started - it&apos;s free</Pressable>
            <Pressable href="#" asButton size="lg" variant="outline">
              Book a demo
            </Pressable>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 bg-[50%_0] bg-[url('https://deifkwefumgah.cloudfront.net/shadcnblocks/block/shadow-overlay.png')] bg-no-repeat"></div>
    </section>
  );
}
