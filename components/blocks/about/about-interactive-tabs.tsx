"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";

export interface AboutInteractiveTabsProps {
  className?: string;
  title?: string;
  subtitle?: string;
  tabs?: Array<{
    id: string;
    label: string;
    content: {
      title: string;
      description: string;
      image?: {
        src: string;
        alt: string;
      };
    };
  }>;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultTabs = [
  {
    id: "work",
    label: "Our Work",
    content: {
      title: "Crafting Digital Experiences",
      description:
        "We create beautiful, functional digital products that help businesses grow. From web applications to mobile apps, our portfolio showcases our commitment to excellence and innovation.",
    },
  },
  {
    id: "process",
    label: "Our Process",
    content: {
      title: "How We Build",
      description:
        "Our iterative approach combines design thinking with agile development. We start with discovery, move through design and development, and deliver products that exceed expectations.",
    },
  },
  {
    id: "values",
    label: "Our Values",
    content: {
      title: "What Drives Us",
      description:
        "Quality, transparency, and collaboration are at the heart of everything we do. We believe in building lasting relationships with our clients through honest communication and exceptional work.",
    },
  },
];

const defaultProps: Partial<AboutInteractiveTabsProps> = {
  title: "Discover Our Story",
  subtitle: "Learn more about who we are and what we do",
  tabs: defaultTabs,
};

export function AboutInteractiveTabs({
  className,
  title = defaultProps.title,
  subtitle = defaultProps.subtitle,
  tabs = defaultProps.tabs,
  optixFlowConfig,
}: AboutInteractiveTabsProps) {
  const [activeTab, setActiveTab] = React.useState(tabs?.[0]?.id ?? "");

  const activeContent = tabs?.find((tab) => tab.id === activeTab)?.content;

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
        </div>

        {tabs && tabs.length > 0 && (
          <div className="mt-16">
            <div className="flex flex-wrap justify-center gap-2 border-b">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "px-6 py-3 text-sm font-medium transition-colors",
                    activeTab === tab.id
                      ? "border-b-2 border-primary text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeContent && (
              <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-center">
                <div>
                  <h2 className="text-3xl font-bold">{activeContent.title}</h2>
                  <p className="mt-4 text-lg text-muted-foreground">
                    {activeContent.description}
                  </p>
                </div>
                {activeContent.image && (
                  <Img
                    src={activeContent.image.src}
                    alt={activeContent.image.alt}
                    className="rounded-2xl object-cover"
                    optixFlowConfig={optixFlowConfig}
                  />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
