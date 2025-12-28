"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Img, type OptixFlowConfig } from "@page-speed/img";

import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders, videoPlaceholders } from "../../../lib/mediaPlaceholders";

export interface ProjectVideoHoverTwoByTwoItem {
  thumbnailSrc: string;
  videoSrc: string;
  studioName: string;
  projectTitle: string;
}

export interface ProjectVideoHoverTwoByTwoProps {
  className?: string;
  heading?: string;
  subheading?: string;
  videoSections?: ProjectVideoHoverTwoByTwoItem[];
  optixFlowConfig?: OptixFlowConfig;
}

interface VideoSectionProps {
  videoSrc: string;
  thumbnailSrc: string;
  studioName: string;
  projectTitle: string;
  sectionClassName?: string;
  optixFlowConfig?: OptixFlowConfig;
}

const VideoSection: React.FC<VideoSectionProps> = ({
  videoSrc,
  thumbnailSrc,
  studioName,
  projectTitle,
  sectionClassName = "",
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
      className={`group relative w-full cursor-pointer overflow-hidden rounded-lg ${sectionClassName}`}
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

const defaultVideoSections: ProjectVideoHoverTwoByTwoItem[] = [
  {
    thumbnailSrc: imagePlaceholders[52],
    videoSrc: videoPlaceholders[4],
    studioName: "MERIDIAN FILMS",
    projectTitle: "Coastal Reflections",
  },
  {
    thumbnailSrc: imagePlaceholders[53],
    videoSrc: videoPlaceholders[5],
    studioName: "ZENITH VISUALS",
    projectTitle: "Ethereal Moments",
  },
  {
    thumbnailSrc: imagePlaceholders[54],
    videoSrc: videoPlaceholders[6],
    studioName: "NEXUS CREATIVE",
    projectTitle: "Deserted Frontiers",
  },
  {
    thumbnailSrc: imagePlaceholders[55],
    videoSrc: videoPlaceholders[7],
    studioName: "PRISM STUDIOS",
    projectTitle: "Nature's Symphony",
  },
];

/**
 * ProjectVideoHoverTwoByTwo - 2x2 video grid with 16:9 aspect ratio cards.
 *
 * Displays exactly four video cards in a balanced 2x2 grid layout with video aspect
 * ratio (16:9) for each card. Features rounded corners and consistent gap spacing.
 * Each card shows a thumbnail that transitions to playing video on hover. Includes
 * a container-width header with title and audio icon. Perfect for showcasing a
 * curated selection of four featured video projects in a symmetrical, balanced
 * presentation.
 */
export function ProjectVideoHoverTwoByTwo({
  className,
  heading = "Explore Our Projects",
  subheading = "Our Work",
  videoSections = defaultVideoSections,
  optixFlowConfig,
}: ProjectVideoHoverTwoByTwoProps) {
  return (
    <section className={cn("bg-background py-8 md:py-32", className)}>
      <div className="container mx-auto">
        <div className="mb-12 text-left text-foreground">
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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {videoSections.map((section, index) => (
            <VideoSection
              key={index}
              videoSrc={section.videoSrc}
              thumbnailSrc={section.thumbnailSrc}
              studioName={section.studioName}
              projectTitle={section.projectTitle}
              sectionClassName="aspect-video"
              optixFlowConfig={optixFlowConfig}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
