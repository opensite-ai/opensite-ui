"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Img, type OptixFlowConfig } from "@page-speed/img";

import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";
import { imagePlaceholders, videoPlaceholders } from "../../../lib/mediaPlaceholders";

export interface ProjectVideoCarouselItem {
  thumbnailSrc: string;
  videoSrc: string;
  studioName: string;
  projectTitle: string;
}

export interface ProjectVideoCarouselProps {
  className?: string;
  heading?: string;
  subheading?: string;
  videoSections?: ProjectVideoCarouselItem[];
  optixFlowConfig?: OptixFlowConfig;
}

interface VideoSectionProps {
  videoSrc: string;
  thumbnailSrc: string;
  studioName: string;
  projectTitle: string;
  optixFlowConfig?: OptixFlowConfig;
}

const VideoSection: React.FC<VideoSectionProps> = ({
  videoSrc,
  thumbnailSrc,
  studioName,
  projectTitle,
  optixFlowConfig,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (isHovered) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="group relative h-[60vh] w-full cursor-pointer overflow-hidden md:h-[70vh]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Img
        src={thumbnailSrc}
        alt={projectTitle}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
          isHovered ? "opacity-0" : "opacity-100"
        }`}
        optixFlowConfig={optixFlowConfig}
      />

      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black/30 transition-all duration-500 group-hover:bg-black/20" />

      <div className="absolute inset-0 bottom-12 flex items-end">
        <div className="px-6 text-left text-white sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <p className="mb-2 text-xs font-medium tracking-wider uppercase opacity-80 sm:mb-3 sm:text-sm md:mb-4 md:text-base">
            {studioName}
          </p>
          <h2 className="max-w-md text-2xl font-light tracking-tight sm:text-3xl md:text-4xl lg:max-w-lg">
            {projectTitle}
          </h2>
        </div>
      </div>
    </div>
  );
};

const defaultVideoSections: ProjectVideoCarouselItem[] = [
  {
    thumbnailSrc: imagePlaceholders[56],
    videoSrc: videoPlaceholders[8],
    studioName: "MERIDIAN FILMS",
    projectTitle: "Coastal Reflections",
  },
  {
    thumbnailSrc: imagePlaceholders[57],
    videoSrc: videoPlaceholders[9],
    studioName: "ZENITH VISUALS",
    projectTitle: "Ethereal Moments",
  },
  {
    thumbnailSrc: imagePlaceholders[58],
    videoSrc: videoPlaceholders[10],
    studioName: "NEXUS CREATIVE",
    projectTitle: "Deserted Frontiers",
  },
  {
    thumbnailSrc: imagePlaceholders[59],
    videoSrc: videoPlaceholders[11],
    studioName: "PRISM STUDIOS",
    projectTitle: "Nature's Symphony",
  },
];

/**
 * ProjectVideoCarousel - Full-width video carousel with hover-to-play and navigation controls.
 *
 * Features a horizontally scrolling carousel of large video cards with navigation arrows.
 * Each card shows a thumbnail that transitions to playing video on hover. Cards are sized
 * to show partial peek of adjacent items, encouraging exploration. Includes a header section
 * with title and audio icon. The carousel loops infinitely and supports touch/swipe on mobile.
 * Perfect for showcasing video reels, film portfolios, or any video content that benefits
 * from a cinematic, browsable presentation.
 */
export function ProjectVideoCarousel({
  className,
  heading = "Explore Our Projects",
  subheading = "Our Work",
  videoSections = defaultVideoSections,
  optixFlowConfig,
}: ProjectVideoCarouselProps) {
  return (
    <section className={cn("w-full bg-background", className)}>
      <div className="container py-16">
        <div className="text-left text-foreground">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:mb-8 lg:text-8xl">
            {heading}
          </h1>

          <div className="flex items-center">
            <p className="mr-4 text-sm font-medium tracking-wider uppercase opacity-80">
              {subheading}
            </p>
            <div className="opacity-60">
              <DynamicIcon name="lucide/audio-lines" size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {videoSections.map((section, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:basis-4/5 md:pl-4 lg:basis-3/4 xl:basis-2/3"
              >
                <VideoSection
                  videoSrc={section.videoSrc}
                  thumbnailSrc={section.thumbnailSrc}
                  studioName={section.studioName}
                  projectTitle={section.projectTitle}
                  optixFlowConfig={optixFlowConfig}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 md:left-8" />
          <CarouselNext className="right-4 md:right-8" />
        </Carousel>
      </div>
    </section>
  );
}
