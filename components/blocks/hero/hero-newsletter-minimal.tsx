"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Input } from "../../ui/input";

export interface HeroNewsletterMinimalProps {
  className?: string;
}

export function HeroNewsletterMinimal({
  className,
}: HeroNewsletterMinimalProps): React.JSX.Element {
  return (
    <section
      className={cn(
        "relative min-h-[80vh] bg-background py-32",
        className,
      )}
    >
      <div className="container flex flex-col items-center justify-center text-center">
        <h1 className="max-w-3xl text-5xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
          Stay ahead of the curve
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">
          Join 50,000+ professionals who get our weekly insights on design,
          development, and business growth.
        </p>
        <div className="mt-10 flex w-full max-w-md flex-col gap-4 sm:flex-row">
          <Input
            type="email"
            placeholder="Enter your email"
            className="h-12 flex-1"
          />
          <Pressable
            href="#"
            asButton
            variant="default"
            className="h-12 px-8"
          >
            Subscribe
            <DynamicIcon name="lucide/arrow-right" size={16} className="ml-2" />
          </Pressable>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Free forever. No spam. Unsubscribe anytime.
        </p>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <DynamicIcon name="lucide/mail" size={16} />
            <span>Weekly newsletter</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <DynamicIcon name="lucide/users" size={16} />
            <span>50K+ subscribers</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <DynamicIcon name="lucide/star" size={16} />
            <span>4.9/5 rating</span>
          </div>
        </div>
      </div>
    </section>
  );
}
