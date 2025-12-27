"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";

export interface AboutStoryGalleryProps {
  className?: string;
  title?: string;
  description?: string;
  images?: Array<{
    src: string;
    alt: string;
    className?: string;
  }>;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultProps: Partial<AboutStoryGalleryProps> = {
  title: "Our Story",
  description: `We started with a vision to transform how businesses build software. What began as a small team with big ideas has grown into a platform trusted by thousands of companies worldwide.

Our journey has been defined by a commitment to innovation, user experience, and making powerful tools accessible to everyone. We believe that the best software is built when creativity meets simplicity.

Today, we continue to push boundaries, helping teams of all sizes bring their ideas to life without the traditional barriers of software development.`,
};

export function AboutStoryGallery({
  className,
  title = defaultProps.title,
  description = defaultProps.description,
  images,
  optixFlowConfig,
}: AboutStoryGalleryProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            {title}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground whitespace-pre-line">
            {description}
          </p>
        </div>

        {images && images.length > 0 && (
          <div className="mt-16 grid gap-4 md:grid-cols-3">
            {images.map((image, idx) => (
              <Img
                key={idx}
                src={image.src}
                alt={image.alt}
                className={cn(
                  "h-64 w-full rounded-xl object-cover",
                  image.className
                )}
                optixFlowConfig={optixFlowConfig}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
