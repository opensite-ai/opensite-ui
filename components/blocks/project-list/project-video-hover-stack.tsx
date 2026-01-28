"use client";

import * as React from "react";
import { useMemo } from "react";
import { useEffect, useRef, useState } from "react";
import { Img, type OptixFlowConfig } from "@page-speed/img";

import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import { PatternName } from "@/components/ui/pattern-background";

export interface ProjectVideoHoverStackItem {
  thumbnailSrc: string;
  videoSrc: string;
  studioName: string;
  projectTitle: string;
}

export interface ProjectVideoHoverStackProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Subheading/label content
   */
  subheading?: React.ReactNode;
  /**
   * Array of video section configurations
   */
  videoSections?: ProjectVideoHoverStackItem[];
  /**
   * Custom slot for rendering video sections (overrides videoSections array)
   */
  videoSectionsSlot?: React.ReactNode;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * Section background style
   */
  background?: SectionBackground;
  /**
   * Section spacing
   */
  spacing?: SectionSpacing;
  /**
   * Background pattern
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the header area
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the subheading
   */
  subheadingClassName?: string;
  /**
   * Additional CSS classes for the video container
   */
  videoContainerClassName?: string;
  /**
   * Additional CSS classes for each card
   */
  cardClassName?: string;
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
      className="group relative h-[50vh] w-full cursor-pointer overflow-hidden"
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

/**
 * ProjectVideoHoverStack - Full-width stacked video sections with hover-to-play functionality.
 *
 * Features a large header section followed by full-width video cards stacked vertically.
 * Each card shows a thumbnail image that transitions to playing video on hover. Includes
 * studio name and project title overlaid on a dark gradient. The header includes a bold
 * title and audio icon indicator. Perfect for video production companies, film studios,
 * or any portfolio showcasing video content with an immersive, cinematic presentation.
 */
export function ProjectVideoHoverStack({
  heading,
  subheading,
  videoSections,
  videoSectionsSlot,
  optixFlowConfig,
  background,
  spacing,
  pattern,
  patternOpacity,
  className,
  headerClassName,
  headingClassName,
  subheadingClassName,
  videoContainerClassName,
  cardClassName,
}: ProjectVideoHoverStackProps) {
  const renderedVideoSections = useMemo(() => {
    if (videoSectionsSlot) return videoSectionsSlot;
    if (!videoSections || videoSections.length === 0) return null;

    return videoSections.map((section, index) => (
      <div key={index} className={cardClassName}>
        <VideoSection
          videoSrc={section.videoSrc}
          thumbnailSrc={section.thumbnailSrc}
          studioName={section.studioName}
          projectTitle={section.projectTitle}
          optixFlowConfig={optixFlowConfig}
        />
      </div>
    ));
  }, [videoSectionsSlot, videoSections, cardClassName, optixFlowConfig]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn("min-h-screen", className)}
    >
      <div className={cn("relative h-[50vh]", headerClassName)}>
        <div className="absolute inset-0 bottom-12 flex items-end">
          <div className="px-6 text-left text-foreground sm:px-8 md:px-12 lg:px-16 xl:px-20">
            {heading &&
              (typeof heading === "string" ? (
                <h1
                  className={cn(
                    "mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:mb-8 lg:text-8xl",
                    headingClassName,
                  )}
                >
                  {heading}
                </h1>
              ) : (
                <div className={headingClassName}>{heading}</div>
              ))}

            <div className="flex items-center">
              {subheading &&
                (typeof subheading === "string" ? (
                  <p
                    className={cn(
                      "mr-4 text-sm font-medium tracking-wider uppercase opacity-80",
                      subheadingClassName,
                    )}
                  >
                    {subheading}
                  </p>
                ) : (
                  <div className={subheadingClassName}>{subheading}</div>
                ))}
              <div className="opacity-60">
                <DynamicIcon name="lucide/audio-lines" size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={cn("w-full", videoContainerClassName)}>
        {renderedVideoSections}
      </div>
    </Section>
  );
}
