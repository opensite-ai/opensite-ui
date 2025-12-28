"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface TimelineScrollItem {
  title: string;
  description: string;
  date: string;
  image: string;
}

export interface TimelineScrollHighlightProps {
  className?: string;
  heading?: React.ReactNode;
  items?: TimelineScrollItem[];
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultItems: TimelineScrollItem[] = [
  {
    title: "Company Foundation",
    description:
      "Started our journey with a simple idea: make technology accessible to everyone. What began as a small team of three developers in a garage has now become the foundation of our mission to democratize software development.",
    date: "2020",
    image: blockBrandedIconsAndPlaceholders.placeholder1,
  },
  {
    title: "First Product Launch",
    description:
      "After months of development, we launched our first product to the public. The response was overwhelming - 10,000 users signed up in the first week, validating our vision and giving us the confidence to scale further.",
    date: "2021",
    image: blockBrandedIconsAndPlaceholders.placeholder2,
  },
  {
    title: "Series A Funding",
    description:
      "Secured our Series A round led by prominent VCs who believed in our mission. This funding allowed us to expand our team, invest in R&D, and prepare for international expansion.",
    date: "2022",
    image: blockBrandedIconsAndPlaceholders.placeholder3,
  },
  {
    title: "Global Expansion",
    description:
      "Opened offices in London, Tokyo, and São Paulo, marking our transition from a local startup to a global technology company. Our platform now serves over 500,000 users across 50 countries.",
    date: "2023",
    image: blockBrandedIconsAndPlaceholders.placeholder4,
  },
];

export function TimelineScrollHighlight({
  className,
  heading,
  items = defaultItems,
  optixFlowConfig,
}: TimelineScrollHighlightProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = itemRefs.current.findIndex(
            (ref) => ref === entry.target
          );
          if (index !== -1) {
            setActiveIndex(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    itemRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const defaultHeading = (
    <>
      <span className="font-medium">From Startup to Global Platform</span>
      <br />
      <span className="text-muted-foreground"> Our Journey</span>
    </>
  );

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h1 className="max-w-4xl text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl">
          {heading || defaultHeading}
        </h1>
      </div>
      <div className="relative mt-16 lg:mt-28">
        <div className="sticky top-0 z-10 border-y bg-background py-3.5">
          <div className="container">
            <div className="flex justify-between gap-4 text-2xl md:text-4xl">
              <p className="font-mono text-muted-foreground">
                {String(activeIndex + 1).padStart(2, "0")}
              </p>
              <p className="font-mono">{items[activeIndex]?.date}</p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="flex flex-col">
            {items.map((item, index) => (
              <div
                key={index}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                className={cn(
                  "flex flex-col items-center gap-7 py-14 opacity-50 transition-opacity duration-300 md:flex-row md:gap-10 md:py-20",
                  index === activeIndex && "opacity-100"
                )}
              >
                <Img
                  src={item.image}
                  alt={item.title}
                  className="aspect-16/12 rounded-lg border object-cover md:w-1/3 md:max-w-[440px]"
                  optixFlowConfig={optixFlowConfig}
                />
                <div>
                  <h2 className="mb-3 text-2xl font-medium md:mb-4 md:text-4xl">
                    {item.title}
                  </h2>
                  <p className="text-muted-foreground md:text-balance">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
