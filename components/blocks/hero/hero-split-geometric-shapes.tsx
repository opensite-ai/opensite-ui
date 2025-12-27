"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";

export interface HeroSplitGeometricShapesProps {
  className?: string;
}

export function HeroSplitGeometricShapes({
  className,
}: HeroSplitGeometricShapesProps): React.JSX.Element {
  return (
    <section className={cn("", className)}>
      <div className="container flex flex-col items-center">
        <div className="2xl:w-[calc(min(100vw-2*theme(container.padding),100%+8rem))] w-full overflow-clip rounded-lg bg-accent/50">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="container flex flex-col items-center px-[4rem] py-16 text-center lg:mx-auto lg:items-start lg:px-[4rem] lg:py-32 lg:text-left">
              <p>New Release</p>
              <h1 className="my-6 text-4xl font-bold text-pretty lg:text-6xl">
                Welcome to Our Website
              </h1>
              <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
                doloremque mollitia fugiat omnis! Porro facilis quo animi
                consequatur. Explicabo.
              </p>
              <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
                <Pressable href="#" asButton variant="default" className="w-full sm:w-auto">
                  <DynamicIcon name="lucide/arrow-right" size={16} className="mr-2" />
                  Primary
                </Pressable>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="relative aspect-7/8 h-full w-full">
                <div className="absolute top-[12%] right-[50%] flex aspect-square w-[24%] justify-center rounded-lg border border-border bg-accent"></div>
                <div className="absolute top-[36%] right-[50%] flex aspect-5/6 w-[40%] justify-center rounded-lg border border-border bg-accent"></div>
                <div className="absolute bottom-[36%] left-[54%] flex aspect-5/6 w-[40%] justify-center rounded-lg border border-border bg-accent"></div>
                <div className="absolute bottom-[12%] left-[54%] flex aspect-square w-[24%] justify-center rounded-lg border border-border bg-accent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
