"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Img, type OptixFlowConfig } from "@page-speed/img";

import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders, videoPlaceholders } from "../../../lib/mediaPlaceholders";

export interface ProjectVideoHoverRoundedItem {
  thumbnailSrc: string;
  videoSrc: string;
  studioName: string;
  projectTitle: string;
}

export interface ProjectVideoHoverRoundedProps {
  className?: string;
  heading?: string;
  subheading?: string;
  videoSections?: ProjectVideoHoverRoundedItem[];
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
      className="group relative h-[50vh] w-full cursor-pointer overflow-hidden rounded-lg md:h-[60vh]"
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

const defaultVideoSections: ProjectVideoHoverRoundedItem[] = [
  {
    thumbnailSrc: imagePlaceholders[48],
    videoSrc: videoPlaceholders[0],
    studioName: "MERIDIAN FILMS",
    projectTitle: "Coastal Reflections",
  },
  {
    thumbnailSrc: imagePlaceholders[49],
    videoSrc: videoPlaceholders[1],
    studioName: "ZENITH VISUALS",
    projectTitle: "Ethereal Moments",
  },
  {
    thumbnailSrc: imagePlaceholders[50],
    videoSrc: videoPlaceholders[2],
    studioName: "NEXUS CREATIVE",
    projectTitle: "Deserted Frontiers",
  },
  {
    thumbnailSrc: imagePlaceholders[51],
    videoSrc: videoPlaceholders[3],
    studioName: "PRISM STUDIOS",
    projectTitle: "Nature's Symphony",
  },
];

/**
 * ProjectVideoHoverRounded - Rounded video cards with vertical spacing and hover-to-play.
 *
 * Displays video cards in a single column with rounded corners and generous vertical
 * spacing between each card. Each card shows a thumbnail that transitions to playing
 * video on hover. Features a container-width header section with title and audio icon.
 * The rounded corners and spacing create a softer, more modern aesthetic compared to
 * edge-to-edge layouts. Ideal for portfolios that want a cleaner, more contained
 * presentation of video content.
 */
export function ProjectVideoHoverRounded({
  className,
  heading = "Explore Our Projects",
  subheading = "Our Work",
  videoSections = defaultVideoSections,
  optixFlowConfig,
}: ProjectVideoHoverRoundedProps) {
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

        <div className="space-y-8 md:space-y-12">
          {videoSections.map((section, index) => (
            <div key={index}>
              <VideoSection
                videoSrc={section.videoSrc}
                thumbnailSrc={section.thumbnailSrc}
                studioName={section.studioName}
                projectTitle={section.projectTitle}
                optixFlowConfig={optixFlowConfig}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
