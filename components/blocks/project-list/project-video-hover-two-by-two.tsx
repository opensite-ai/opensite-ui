"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { Img, type OptixFlowConfig } from "@page-speed/img";

import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import { imagePlaceholders, videoPlaceholders } from "../../../lib/mediaPlaceholders";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

export interface ProjectVideoHoverTwoByTwoItem {
  thumbnailSrc: string;
  videoSrc: string;
  studioName: string;
  projectTitle: string;
}

export interface ProjectVideoHoverTwoByTwoProps {
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
  videoSections?: ProjectVideoHoverTwoByTwoItem[];
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
  pattern?: string;
  /**
   * Pattern opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
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
   * Additional CSS classes for the grid
   */
  gridClassName?: string;
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
  heading = "Explore Our Projects",
  subheading = "Our Work",
  videoSections,
  videoSectionsSlot,
  optixFlowConfig,
  background,
  spacing,
  pattern,
  patternOpacity,
  className,
  containerClassName,
  headerClassName,
  headingClassName,
  subheadingClassName,
  gridClassName,
  cardClassName,
}: ProjectVideoHoverTwoByTwoProps) {
  const renderVideoSections = () => {
    if (videoSectionsSlot) return videoSectionsSlot;
    if (!videoSections || videoSections.length === 0) return null;

    return videoSections.map((section, index) => (
      <VideoSection
        key={index}
        videoSrc={section.videoSrc}
        thumbnailSrc={section.thumbnailSrc}
        studioName={section.studioName}
        projectTitle={section.projectTitle}
        sectionClassName={cn("aspect-video", cardClassName)}
        optixFlowConfig={optixFlowConfig}
      />
    ));
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(className)}
    >
      <div className={cn("container mx-auto", containerClassName)}>
        <div className={cn("mb-12 text-left text-foreground", headerClassName)}>
          {heading && (
            typeof heading === "string" ? (
              <h1 className={cn("mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:mb-8 lg:text-8xl", headingClassName)}>
                {heading}
              </h1>
            ) : (
              <div className={headingClassName}>{heading}</div>
            )
          )}

          <div className="flex items-center">
            {subheading && (
              typeof subheading === "string" ? (
                <p className={cn("mr-4 text-sm font-medium tracking-wider uppercase opacity-80", subheadingClassName)}>
                  {subheading}
                </p>
              ) : (
                <div className={subheadingClassName}>{subheading}</div>
              )
            )}
            <div className="opacity-60">
              <DynamicIcon name="lucide/audio-lines" size={24} />
            </div>
          </div>
        </div>

        <div className={cn("grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8", gridClassName)}>
          {renderVideoSections()}
        </div>
      </div>
    </Section>
  );
}
