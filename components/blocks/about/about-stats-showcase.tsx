"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";

export interface AboutStatsShowcaseProps {
  className?: string;
  title?: string;
  description?: string;
  images?: Array<{
    src: string;
    alt: string;
    colSpan?: number;
  }>;
  statsTitle?: string;
  stats?: Array<{
    value: string;
    label: string;
  }>;
  logosTitle?: string;
  logos?: Array<{
    src: string;
    alt: string;
    name: string;
  }>;
  benefitsTitle?: string;
  benefits?: Array<{
    image: {
      src: string;
      alt: string;
    };
    stat?: {
      value: string;
      label: string;
      description: string;
    };
    testimonial?: {
      logo: {
        src: string;
        alt: string;
      };
      company: string;
      quote: string;
      author: string;
      role: string;
    };
  }>;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultStats = [
  { value: "21M", label: "Global Reach of Users" },
  { value: "12+", label: "Years of Expertise" },
  { value: "654", label: "Projects Completed" },
  { value: "113k+", label: "Monthly Active Users" },
  { value: "461k", label: "Registered Accounts" },
  { value: "98+", label: "Daily Users" },
];

const defaultProps: Partial<AboutStatsShowcaseProps> = {
  title: "Our Background",
  description:
    "Discover how our solution simplifies complex processes, making it easier to manage key operations and deliver exceptional experiences.",
  statsTitle:
    "We excel in our field, but skill isn't everything we offer.",
  stats: defaultStats,
  logosTitle: "Trusted by leading product teams worldwide.",
  benefitsTitle: "See the Benefits Firsthand",
};

export function AboutStatsShowcase({
  className,
  title = defaultProps.title,
  description = defaultProps.description,
  images,
  statsTitle = defaultProps.statsTitle,
  stats = defaultProps.stats,
  logosTitle = defaultProps.logosTitle,
  logos,
  benefitsTitle = defaultProps.benefitsTitle,
  benefits,
  optixFlowConfig,
}: AboutStatsShowcaseProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="flex flex-col gap-28">
        <div className="container flex flex-col gap-10 text-center md:gap-24">
          <div className="mx-auto flex max-w-3xl flex-col gap-6">
            <h1 className="text-4xl font-medium md:text-6xl">{title}</h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              {description}
            </p>
          </div>
          {images && images.length > 0 && (
            <div className="grid gap-6 md:grid-cols-12">
              {images.map((image, idx) => (
                <Img
                  key={idx}
                  src={image.src}
                  alt={image.alt}
                  className={cn(
                    "size-full max-h-96 rounded-xl object-cover",
                    image.colSpan ? `md:col-span-${image.colSpan}` : "md:col-span-4"
                  )}
                  optixFlowConfig={optixFlowConfig}
                />
              ))}
            </div>
          )}
        </div>
        <div className="container flex flex-col gap-16">
          <h2 className="max-w-3xl text-4xl font-medium md:text-5xl">
            {statsTitle}
          </h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
            {stats?.map((stat, idx) => (
              <div className="flex flex-col gap-6 border-b pb-8" key={idx}>
                <p className="text-4xl font-medium md:text-5xl">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        {logos && logos.length > 0 && (
          <div className="bg-muted/50 py-24">
            <div className="container flex flex-col items-center gap-11">
              <p className="text-center text-xl font-medium">{logosTitle}</p>
              <div className="grid grid-cols-2 gap-x-7 gap-y-12 lg:grid-cols-4">
                {logos.map((logo, idx) => (
                  <div className="flex items-center gap-3" key={idx}>
                    <Img
                      src={logo.src}
                      alt={logo.alt}
                      className="h-8 w-auto md:h-14"
                      optixFlowConfig={optixFlowConfig}
                    />
                    <p className="text-xl font-semibold md:text-4xl">
                      {logo.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {benefits && benefits.length > 0 && (
          <div className="container flex flex-col items-center gap-14">
            <h2 className="text-center text-4xl font-semibold md:text-5xl">
              {benefitsTitle}
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex flex-col gap-6">
                  {benefit.image && (
                    <Img
                      src={benefit.image.src}
                      alt={benefit.image.alt}
                      className="max-h-96 w-full rounded-xl object-cover"
                      optixFlowConfig={optixFlowConfig}
                    />
                  )}
                  {benefit.stat && (
                    <div className="flex flex-col justify-center rounded-xl bg-muted p-8">
                      <p className="mb-2 text-4xl font-medium">
                        {benefit.stat.value}
                      </p>
                      <p className="mb-6 font-semibold">{benefit.stat.label}</p>
                      <p className="text-muted-foreground">
                        {benefit.stat.description}
                      </p>
                    </div>
                  )}
                  {benefit.testimonial && (
                    <div className="rounded-xl bg-background p-4">
                      <div className="mb-4 flex items-center gap-2">
                        <Img
                          src={benefit.testimonial.logo.src}
                          alt={benefit.testimonial.logo.alt}
                          className="h-7 w-auto"
                          optixFlowConfig={optixFlowConfig}
                        />
                        <span className="text-lg font-semibold">
                          {benefit.testimonial.company}
                        </span>
                      </div>
                      <p className="mb-6 text-sm">{benefit.testimonial.quote}</p>
                      <div className="flex items-baseline gap-1">
                        <span className="font-medium">
                          {benefit.testimonial.author},
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {benefit.testimonial.role}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
