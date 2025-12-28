"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { imagePlaceholders, videoPlaceholders } from "../../../lib/mediaPlaceholders";

export interface ServicesListVideoShowcaseProps {
  className?: string;
  title?: string;
  description?: string;
  services?: Array<{
    icon?: string;
    title: string;
    description: string;
    videoUrl?: string;
    posterImage?: {
      src: string;
      alt: string;
    };
    ctaText?: string;
    ctaUrl?: string;
  }>;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultServices = [
  {
    icon: "lucide/code",
    title: "Web Development",
    description:
      "Custom websites and web applications built with modern technologies for optimal performance and user experience.",
    videoUrl: videoPlaceholders[0],
    posterImage: { src: imagePlaceholders[0], alt: "Web Development" },
    ctaText: "Learn More",
    ctaUrl: "#",
  },
  {
    icon: "lucide/smartphone",
    title: "Mobile Apps",
    description:
      "Native and cross-platform mobile applications that deliver exceptional user experiences on iOS and Android.",
    videoUrl: videoPlaceholders[1],
    posterImage: { src: imagePlaceholders[1], alt: "Mobile Apps" },
    ctaText: "Learn More",
    ctaUrl: "#",
  },
  {
    icon: "lucide/palette",
    title: "UI/UX Design",
    description:
      "User-centered design solutions that create engaging, intuitive experiences across all digital touchpoints.",
    videoUrl: videoPlaceholders[2],
    posterImage: { src: imagePlaceholders[2], alt: "UI/UX Design" },
    ctaText: "Learn More",
    ctaUrl: "#",
  },
];

/**
 * ServicesListVideoShowcase - A services layout featuring video showcases for each service.
 * Each service card includes an icon, title, description, video player with poster image, and CTA.
 * Videos play on hover or click. Perfect for showcasing services with dynamic video content
 * that demonstrates capabilities or processes.
 */
export function ServicesListVideoShowcase({
  className,
  title = "Our Services",
  description = "See our services in action. Hover over each card to watch a preview.",
  services = defaultServices,
  optixFlowConfig,
}: ServicesListVideoShowcaseProps) {
  const [playingIndex, setPlayingIndex] = React.useState<number | null>(null);
  const videoRefs = React.useRef<(HTMLVideoElement | null)[]>([]);

  const handleMouseEnter = (index: number) => {
    setPlayingIndex(index);
    videoRefs.current[index]?.play();
  };

  const handleMouseLeave = (index: number) => {
    setPlayingIndex(null);
    videoRefs.current[index]?.pause();
    if (videoRefs.current[index]) {
      videoRefs.current[index]!.currentTime = 0;
    }
  };

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              {title}
            </h2>
            <p className="mx-auto max-w-2xl text-lg tracking-tight text-muted-foreground md:text-xl">
              {description}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={index}
                className="group overflow-hidden rounded-xl border border-border transition-shadow hover:shadow-lg"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                <div className="relative aspect-video overflow-hidden">
                  {service.posterImage && (
                    <Img
                      src={service.posterImage.src}
                      alt={service.posterImage.alt}
                      className={cn(
                        "absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
                        playingIndex === index ? "opacity-0" : "opacity-100"
                      )}
                      optixFlowConfig={optixFlowConfig}
                    />
                  )}
                  {service.videoUrl && (
                    <video
                      ref={(el) => {
                        videoRefs.current[index] = el;
                      }}
                      src={service.videoUrl}
                      className="h-full w-full object-cover"
                      muted
                      loop
                      playsInline
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90">
                      <DynamicIcon
                        name={playingIndex === index ? "lucide/pause" : "lucide/play"}
                        className="h-5 w-5 text-foreground"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3">
                    {service.icon && (
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <DynamicIcon
                          name={service.icon}
                          className="h-5 w-5 text-primary"
                        />
                      </div>
                    )}
                    <h3 className="text-lg font-semibold">{service.title}</h3>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {service.description}
                  </p>
                  {service.ctaText && (
                    <Pressable
                      href={service.ctaUrl}
                      className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline"
                    >
                      {service.ctaText}
                      <DynamicIcon
                        name="lucide/arrow-right"
                        className="ml-1 h-4 w-4"
                      />
                    </Pressable>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
