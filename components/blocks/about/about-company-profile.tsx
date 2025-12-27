"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";

export interface AboutCompanyProfileProps {
  className?: string;
  title?: string;
  description?: string;
  mainImage?: {
    src: string;
    alt: string;
  };
  secondaryImage?: {
    src: string;
    alt: string;
  };
  breakout?: {
    logo?: {
      src: string;
      alt: string;
    };
    title: string;
    description: string;
    buttonText?: string;
    buttonUrl?: string;
  };
  companiesTitle?: string;
  companies?: Array<{
    src: string;
    alt: string;
  }>;
  achievementsTitle?: string;
  achievementsDescription?: string;
  achievements?: Array<{
    label: string;
    value: string;
  }>;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultAchievements = [
  { label: "Companies", value: "300+" },
  { label: "Projects Finalized", value: "800+" },
  { label: "Happy Customers", value: "99%" },
  { label: "Recognized Awards", value: "10+" },
];

const defaultProps: Partial<AboutCompanyProfileProps> = {
  title: "About Us",
  description:
    "Opensite AI is a passionate team dedicated to creating innovative solutions that empower businesses to thrive in the digital age.",
  breakout: {
    title: "Hundreds of blocks at Opensite AI",
    description:
      "Providing businesses with effective tools to improve workflows, boost efficiency, and encourage growth.",
    buttonText: "Discover more",
    buttonUrl: "https://opensite.ai",
  },
  companiesTitle: "Valued by clients worldwide",
  achievementsTitle: "Our Achievements in Numbers",
  achievementsDescription:
    "Providing businesses with effective tools to improve workflows, boost efficiency, and encourage growth.",
  achievements: defaultAchievements,
};

export function AboutCompanyProfile({
  className,
  title = defaultProps.title,
  description = defaultProps.description,
  mainImage,
  secondaryImage,
  breakout = defaultProps.breakout,
  companiesTitle = defaultProps.companiesTitle,
  companies,
  achievementsTitle = defaultProps.achievementsTitle,
  achievementsDescription = defaultProps.achievementsDescription,
  achievements = defaultProps.achievements,
  optixFlowConfig,
}: AboutCompanyProfileProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mb-14 grid gap-5 text-center md:grid-cols-2 md:text-left">
          <h1 className="text-5xl font-semibold">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div className="grid gap-7 lg:grid-cols-3">
          {mainImage && (
            <Img
              src={mainImage.src}
              alt={mainImage.alt}
              className="size-full max-h-[620px] rounded-xl object-cover lg:col-span-2"
              optixFlowConfig={optixFlowConfig}
            />
          )}
          <div className="flex flex-col gap-7 md:flex-row lg:flex-col">
            {breakout && (
              <div className="flex flex-col justify-between gap-6 rounded-xl bg-muted p-7 md:w-1/2 lg:w-auto">
                {breakout.logo && (
                  <Img
                    src={breakout.logo.src}
                    alt={breakout.logo.alt}
                    className="mr-auto h-12 dark:invert"
                    optixFlowConfig={optixFlowConfig}
                  />
                )}
                <div>
                  <p className="mb-2 text-lg font-semibold">{breakout.title}</p>
                  <p className="text-muted-foreground">{breakout.description}</p>
                </div>
                {breakout.buttonText && breakout.buttonUrl && (
                  <Pressable
                    href={breakout.buttonUrl}
                    variant="outline"
                    asButton
                    className="mr-auto"
                  >
                    {breakout.buttonText}
                  </Pressable>
                )}
              </div>
            )}
            {secondaryImage && (
              <Img
                src={secondaryImage.src}
                alt={secondaryImage.alt}
                className="grow basis-0 rounded-xl object-cover md:w-1/2 lg:min-h-0 lg:w-auto"
                optixFlowConfig={optixFlowConfig}
              />
            )}
          </div>
        </div>
        {companies && companies.length > 0 && (
          <div className="py-32">
            <p className="text-center">{companiesTitle}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-8">
              {companies.map((company, idx) => (
                <div className="flex items-center gap-3" key={idx}>
                  <Img
                    src={company.src}
                    alt={company.alt}
                    className="h-6 w-auto md:h-8 dark:invert"
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="relative overflow-hidden rounded-xl bg-muted p-7 md:p-16">
          <div className="flex flex-col gap-4 text-center md:text-left">
            <h2 className="text-3xl font-semibold md:text-4xl">
              {achievementsTitle}
            </h2>
            <p className="max-w-xl text-muted-foreground">
              {achievementsDescription}
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 text-center lg:grid-cols-4">
            {achievements?.map((item, idx) => (
              <div className="flex flex-col gap-2" key={idx}>
                <span className="text-4xl font-semibold md:text-5xl">
                  {item.value}
                </span>
                <p className="text-sm md:text-base">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
