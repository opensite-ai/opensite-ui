"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Input } from "../../ui/input";

export interface HeroComingSoonCountdownProps {
  className?: string;
}

export function HeroComingSoonCountdown({
  className,
}: HeroComingSoonCountdownProps): React.JSX.Element {
  return (
    <section
      className={cn(
        "dark relative min-h-screen bg-background py-32",
        className,
      )}
    >
      <div className="container flex flex-col items-center justify-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-muted/30 px-4 py-2 text-sm text-muted-foreground">
          <DynamicIcon name="lucide/rocket" size={16} className="text-primary" />
          <span>Launching Soon</span>
        </div>
        <h1 className="mt-8 max-w-3xl text-5xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
          Something amazing is coming
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">
          We&apos;re working hard to bring you something special. Be the first to
          know when we launch.
        </p>
        <div className="mt-12 grid grid-cols-4 gap-4 md:gap-8">
          {[
            { value: "14", label: "Days" },
            { value: "08", label: "Hours" },
            { value: "32", label: "Minutes" },
            { value: "45", label: "Seconds" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-muted/50 text-3xl font-bold text-foreground md:h-24 md:w-24 md:text-5xl">
                {item.value}
              </div>
              <span className="mt-2 text-sm text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>
        <div className="mt-12 flex w-full max-w-md flex-col gap-4 sm:flex-row">
          <Input
            type="email"
            placeholder="Enter your email"
            className="h-12 flex-1 bg-muted/30 border-border/50"
          />
          <Pressable
            href="#"
            asButton
            variant="default"
            className="h-12 px-8"
          >
            Notify me
          </Pressable>
        </div>
        <div className="mt-16 flex items-center gap-6">
          <Pressable href="#" className="text-muted-foreground hover:text-foreground">
            <DynamicIcon name="lucide/twitter" size={20} />
          </Pressable>
          <Pressable href="#" className="text-muted-foreground hover:text-foreground">
            <DynamicIcon name="lucide/instagram" size={20} />
          </Pressable>
          <Pressable href="#" className="text-muted-foreground hover:text-foreground">
            <DynamicIcon name="lucide/linkedin" size={20} />
          </Pressable>
        </div>
      </div>
    </section>
  );
}
