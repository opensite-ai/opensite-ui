"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";

export interface LogosCertificationsGridProps {
  className?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  logos?: Array<{
    id: string;
    description: string;
    image: string;
  }>;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultLogos = [
  {
    id: "logo-1",
    description: "Logo 1",
    image: "https://cdn.ing/assets/files/record/286209/4nowqz6c7v6vhzldvh9qdnhmkrwb",
  },
  {
    id: "logo-2",
    description: "Logo 2",
    image: "https://cdn.ing/assets/files/record/286208/nay46vdmppxuznd7eg5jnnf4qjv5",
  },
  {
    id: "logo-3",
    description: "Logo 3",
    image: "https://cdn.ing/assets/files/record/286214/pn9v9zz0de8jgz2mf8o1c11k8gxh",
  },
  {
    id: "logo-4",
    description: "Logo 4",
    image: "https://cdn.ing/assets/files/record/286235/x4po9fpjkd6cdxnfxaqya6emwvea",
  },
  {
    id: "logo-5",
    description: "Logo 5",
    image: "https://cdn.ing/assets/files/record/286234/bldwkc8wkq6nd3hkdqds9fy5lls9",
  },
  {
    id: "logo-6",
    description: "Logo 6",
    image: "https://cdn.ing/assets/files/record/286233/176g648qa51ou4g3hfnywyldnc7a",
  },
];

export function LogosCertificationsGrid({
  className,
  title = "Our certifications say it all.",
  description = "In non libero bibendum odio pellentesque ullamcorper. Aenean condimentum, dolor commodo pulvinar bibendum.",
  buttonText = "Get in touch",
  buttonUrl = "#",
  logos = defaultLogos,
  optixFlowConfig,
}: LogosCertificationsGridProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid overflow-hidden rounded-xl border border-border md:grid-cols-2">
          <div className="my-auto px-6 py-10 sm:px-10 sm:py-12 lg:p-16">
            <div className="w-full md:max-w-md">
              <h2 className="mb-4 text-2xl font-semibold lg:text-3xl">
                {title}
              </h2>
              <p className="mb-6 text-lg">{description}</p>
              <Pressable
                href={buttonUrl}
                variant="default"
                asButton
                className="w-full md:w-fit"
              >
                <DynamicIcon name="lucide/arrow-right" className="mr-2 size-5" />
                {buttonText}
              </Pressable>
            </div>
          </div>
          <div className="grid grid-cols-3 border-t border-border md:border-t-0 md:border-l">
            {logos.map((logo) => (
              <div
                key={logo.id}
                className="-mb-px flex items-center justify-center border-r border-b border-border p-5 nth-[3n]:border-r-0 sm:p-6"
              >
                <Img
                  src={logo.image}
                  alt={logo.description}
                  className="size-12 object-cover object-center sm:size-16 lg:size-24"
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
