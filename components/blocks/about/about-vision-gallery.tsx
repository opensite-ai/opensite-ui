"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";

export interface AboutVisionGalleryProps {
  className?: string;
  title?: string;
  subtitle?: string;
  images?: Array<{
    src: string;
    alt: string;
  }>;
  visionTitle?: string;
  visionContent?: string;
  creatorsTitle?: string;
  creatorsContent?: string;
  creatorsLinkText?: string;
  creatorsLinkUrl?: string;
  ctaTitle?: string;
  ctaButtonText?: string;
  ctaButtonUrl?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultProps: Partial<AboutVisionGalleryProps> = {
  title: "About Us",
  subtitle:
    "Meet our team, discover our values, and learn how we balance work, life, and everything in between.",
  visionTitle: "Our Vision",
  visionContent: `For years, the process of building custom software has remained challenging. Today, visual builders exist, but tailored solutions still require technical expertise and a lot of time. This is a problem for businesses and individuals alike.

What if you could create custom software without writing a single line of code? What if you could build your own tools.

With our platform, you can! Our tools let you design layouts and create functionality—all without needing to code.

We believe that everyone should be able to build their own solutions, regardless of their technical background.`,
  creatorsTitle: "Our Creators",
  creatorsLinkText: "Our Company",
  creatorsLinkUrl: "#",
  creatorsContent: `has been building web tools for over a decade, focusing on efficiency and user control in every project. We know that the best solutions are the ones that you can create yourself.

We initially developed these solutions for our own team, and now everyone can benefit from them too. We are proud to offer a platform that is accessible to all, regardless of technical expertise.

Our team is made up of talented individuals who are passionate about creating tools that empower users to build their own solutions with ease. We are dedicated to helping you achieve your goals, and we can't wait to see what you create!`,
  ctaTitle: "Part of Our Global Team",
  ctaButtonText: "Get to know the team",
  ctaButtonUrl: "#",
};

export function AboutVisionGallery({
  className,
  title = defaultProps.title,
  subtitle = defaultProps.subtitle,
  images,
  visionTitle = defaultProps.visionTitle,
  visionContent = defaultProps.visionContent,
  creatorsTitle = defaultProps.creatorsTitle,
  creatorsContent = defaultProps.creatorsContent,
  creatorsLinkText = defaultProps.creatorsLinkText,
  creatorsLinkUrl = defaultProps.creatorsLinkUrl,
  ctaTitle = defaultProps.ctaTitle,
  ctaButtonText = defaultProps.ctaButtonText,
  ctaButtonUrl = defaultProps.ctaButtonUrl,
  optixFlowConfig,
}: AboutVisionGalleryProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto flex max-w-3xl flex-col gap-8 pb-28 text-center">
          <h1 className="text-4xl font-semibold md:text-7xl">{title}</h1>
          <p className="text-xl font-medium text-muted-foreground">
            {subtitle}
          </p>
        </div>
        {images && images.length > 0 && (
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {images.map((image, idx) => (
              <Img
                key={idx}
                src={image.src}
                alt={image.alt}
                className="max-h-80 w-full object-cover"
                optixFlowConfig={optixFlowConfig}
              />
            ))}
          </div>
        )}
        <div className="mx-auto grid max-w-5xl gap-28 py-28 md:grid-cols-2">
          <div>
            <h2 className="mb-5 text-4xl font-semibold">{visionTitle}</h2>
            <p className="text-xl leading-8 font-medium text-muted-foreground whitespace-pre-line">
              {visionContent}
            </p>
          </div>
          <div>
            <h2 className="mb-5 text-4xl font-semibold">{creatorsTitle}</h2>
            <p className="text-xl leading-8 font-medium text-muted-foreground">
              {creatorsLinkText && creatorsLinkUrl && (
                <Pressable href={creatorsLinkUrl} className="mr-1 underline">
                  {creatorsLinkText}
                </Pressable>
              )}
              {creatorsContent}
            </p>
          </div>
        </div>
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-8 rounded-2xl bg-muted/50 p-14 text-center md:flex-row md:text-left">
          <h3 className="text-3xl font-semibold whitespace-pre-line">
            {ctaTitle}
          </h3>
          {ctaButtonText && ctaButtonUrl && (
            <Pressable href={ctaButtonUrl} size="lg" variant="default" asButton>
              {ctaButtonText}
            </Pressable>
          )}
        </div>
      </div>
    </section>
  );
}
