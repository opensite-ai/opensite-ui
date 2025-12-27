"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";

export interface AboutMinimalStoryProps {
  className?: string;
  title?: string;
  content?: string;
  author?: {
    name: string;
    role: string;
    avatar?: {
      src: string;
      alt: string;
    };
  };
  featuredImage?: {
    src: string;
    alt: string;
  };
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultProps: Partial<AboutMinimalStoryProps> = {
  title: "Our Story",
  content: `Every great company starts with a simple idea. Ours was born from frustration with the complexity of modern software development. We believed there had to be a better way.

In 2019, our founders came together with a shared vision: make building software as intuitive as using it. What started as a side project quickly grew into something bigger as more developers discovered our tools.

Today, we're proud to serve thousands of teams worldwide, from solo entrepreneurs to Fortune 500 companies. But our mission remains the same: empower everyone to build the software they need.`,
  author: {
    name: "Jordan Mitchell",
    role: "Founder & CEO",
  },
};

export function AboutMinimalStory({
  className,
  title = defaultProps.title,
  content = defaultProps.content,
  author = defaultProps.author,
  featuredImage,
  optixFlowConfig,
}: AboutMinimalStoryProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-3xl">
          {author && (
            <div className="mb-12 flex items-center gap-4">
              {author.avatar ? (
                <Img
                  src={author.avatar.src}
                  alt={author.avatar.alt}
                  className="h-16 w-16 rounded-full object-cover"
                  optixFlowConfig={optixFlowConfig}
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  {author.name.charAt(0)}
                </div>
              )}
              <div>
                <p className="font-semibold">{author.name}</p>
                <p className="text-sm text-muted-foreground">{author.role}</p>
              </div>
            </div>
          )}

          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            {title}
          </h1>

          <p className="mt-8 text-lg leading-relaxed text-muted-foreground whitespace-pre-line">
            {content}
          </p>

          {featuredImage && (
            <Img
              src={featuredImage.src}
              alt={featuredImage.alt}
              className="mt-12 w-full rounded-2xl object-cover"
              optixFlowConfig={optixFlowConfig}
            />
          )}
        </div>
      </div>
    </section>
  );
}
