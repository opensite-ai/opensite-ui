"use client";

import { ReactNode } from "react";
import { cn } from "../../lib/utils";
import { Container } from "./container";
import type { PageHeroBannerProps } from "../../src/types";

/**
 * Page Hero Banner component for full-width hero sections with image or video backgrounds
 *
 * @example
 * ```tsx
 * <PageHeroBanner
 *   imageUrl="https://example.com/hero.jpg"
 *   alt="Hero banner"
 *   minHeight="600px"
 * >
 *   <h1>Welcome to our site</h1>
 *   <p>Discover amazing content</p>
 * </PageHeroBanner>
 * ```
 */
export function PageHeroBanner({
  imageUrl,
  videoUrl,
  alt = "Hero banner",
  children,
  className = "",
  loading = "eager",
  minHeight = "500px",
  showOverlay = true,
  overlayOpacity = 0.6,
  contentMaxWidth = "4xl",
  overlayClassName,
  contentClassName,
  style,
  ...props
}: PageHeroBannerProps) {
  if (!imageUrl && !videoUrl) {
    throw new Error("PageHeroBanner requires either imageUrl or videoUrl");
  }

  if (imageUrl && videoUrl) {
    throw new Error(
      "PageHeroBanner cannot have both imageUrl and videoUrl. Please provide only one.",
    );
  }

  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      style={{
        minHeight,
        ...style,
      }}
      {...props}
    >
      {/* Image background */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={alt}
          loading={loading}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Video background */}
      {videoUrl && (
        <video
          src={videoUrl}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
      )}

      {/* Gradient overlay */}
      {showOverlay && (
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-b from-black via-black to-black",
            overlayClassName
          )}
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* Content */}
      <Container
        maxWidth={contentMaxWidth}
        className={cn("relative h-full flex items-center", contentClassName)}
        style={{ minHeight }}
      >
        <div className="relative text-background drop-shadow-lg py-16 md:py-24">
          {children}
        </div>
      </Container>
    </div>
  );
}
