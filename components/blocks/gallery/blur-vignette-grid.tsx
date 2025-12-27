"use client";

import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";

export interface BlurVignetteGridImage {
  src: string;
  alt: string;
  colSpan: number;
  height: string;
}

export interface BlurVignetteGridProps {
  images?: BlurVignetteGridImage[];
  className?: string;
  /** Optional Optix Flow configuration for @page-speed/img */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultImages: BlurVignetteGridImage[] = [
  {
    src: "https://toastability-production.s3.amazonaws.com/xlp46pzk3a4d73jgjx4s7xdafwpn",
    alt: "Gallery image 1",
    colSpan: 2,
    height: "h-82",
  },
  {
    src: "https://toastability-production.s3.amazonaws.com/g1iuifb3yzoofo9c7a00koyn6q1t",
    alt: "Gallery image 2",
    colSpan: 3,
    height: "h-82",
  },
  {
    src: "https://toastability-production.s3.amazonaws.com/z9u4sdrj2oq3eds0qyui0nxsus3j",
    alt: "Gallery image 3",
    colSpan: 5,
    height: "h-100",
  },
  {
    src: "https://toastability-production.s3.amazonaws.com/63aotyt2pb4gqpccej2kkw8reson",
    alt: "Gallery image 4",
    colSpan: 2,
    height: "h-82",
  },
  {
    src: "https://toastability-production.s3.amazonaws.com/pjgb223h1bjywdk15i3zi7pjhutg",
    alt: "Gallery image 5",
    colSpan: 3,
    height: "h-82",
  },
  {
    src: "https://toastability-production.s3.amazonaws.com/xlp46pzk3a4d73jgjx4s7xdafwpn",
    alt: "Gallery image 6",
    colSpan: 3,
    height: "h-82",
  },
  {
    src: "https://toastability-production.s3.amazonaws.com/g1iuifb3yzoofo9c7a00koyn6q1t",
    alt: "Gallery image 7",
    colSpan: 2,
    height: "h-82",
  },
  {
    src: "https://toastability-production.s3.amazonaws.com/z9u4sdrj2oq3eds0qyui0nxsus3j",
    alt: "Gallery image 8",
    colSpan: 5,
    height: "h-100",
  },
  {
    src: "https://toastability-production.s3.amazonaws.com/63aotyt2pb4gqpccej2kkw8reson",
    alt: "Gallery image 9",
    colSpan: 2,
    height: "h-82",
  },
  {
    src: "https://toastability-production.s3.amazonaws.com/pjgb223h1bjywdk15i3zi7pjhutg",
    alt: "Gallery image 10",
    colSpan: 3,
    height: "h-82",
  },
];

interface BlurVignetteProps {
  children: React.ReactNode;
  className?: string;
  radius?: string;
  inset?: string;
  transitionLength?: string;
  blur?: string;
}

function BlurVignette({
  children,
  className = "",
  radius = "24px",
  inset = "16px",
  transitionLength = "32px",
  blur = "21px",
}: BlurVignetteProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.9,
        y: -50,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      viewport={{ once: true, amount: 0.2 }}
      className={`group relative cursor-pointer overflow-hidden ${className}`}
    >
      <style>
        {`
          .blur-vignette {
            --radius: ${radius};
            --inset: ${inset};
            --transition-length: ${transitionLength};
            --blur: ${blur};
            position: absolute;
            inset: 0;
            -webkit-backdrop-filter: blur(var(--blur));
            backdrop-filter: blur(var(--blur));
            --r: max(var(--transition-length), calc(var(--radius) - var(--inset)));
            --corner-size: calc(var(--r) + var(--inset)) calc(var(--r) + var(--inset));
            --corner-gradient: transparent 0px,
              transparent calc(var(--r) - var(--transition-length)), 
              black var(--r);
            --fill-gradient: black, 
              black var(--inset),
              transparent calc(var(--inset) + var(--transition-length)),
              transparent calc(100% - var(--transition-length) - var(--inset)),
              black calc(100% - var(--inset));
            --fill-narrow-size: calc(100% - (var(--inset) + var(--r)) * 2);
            --fill-farther-position: calc(var(--inset) + var(--r));
            -webkit-mask-image: linear-gradient(to right, var(--fill-gradient)),
              linear-gradient(to bottom, var(--fill-gradient)),
              radial-gradient(at bottom right, var(--corner-gradient)),
              radial-gradient(at bottom left, var(--corner-gradient)),
              radial-gradient(at top left, var(--corner-gradient)),
              radial-gradient(at top right, var(--corner-gradient));
            -webkit-mask-size: 100% var(--fill-narrow-size), 
              var(--fill-narrow-size) 100%,
              var(--corner-size), 
              var(--corner-size), 
              var(--corner-size),
              var(--corner-size);
            -webkit-mask-position: 0 var(--fill-farther-position), 
              var(--fill-farther-position) 0,
              0 0, 
              100% 0, 
              100% 100%, 
              0 100%;
            -webkit-mask-repeat: no-repeat;
            opacity: 0;
            transition: opacity 0.3s ease;    
        }

        .blur-vignette.active {
        opacity: 1;
        }

        .group:hover .blur-vignette {
        opacity: 0;
        }
        `}
      </style>
      <div className="blur-vignette active" />
      {children}
    </motion.div>
  );
}

/**
 * BlurVignetteGrid displays images in a grid with animated blur vignette effect.
 *
 * Features a 5-column grid with varying column spans (2, 3, or 5) and heights.
 * Each image is wrapped in a BlurVignette component that applies a CSS blur
 * mask effect around the edges, which fades out on hover to reveal the full
 * image. Images animate into view with Framer Motion. Ideal for artistic
 * photo galleries, portfolio showcases, or any visual content requiring an
 * elegant, gallery-like presentation.
 *
 * @example
 * ```tsx
 * <BlurVignetteGrid
 *   images={[
 *     { src: "/images/photo-1.jpg", alt: "Photo 1", colSpan: 2, height: "h-82" },
 *     { src: "/images/photo-2.jpg", alt: "Photo 2", colSpan: 3, height: "h-82" }
 *   ]}
 * />
 * ```
 */
export function BlurVignetteGrid({
  images = defaultImages,
  className,
  optixFlowConfig,
}: BlurVignetteGridProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="relative container">
        <div className="grid grid-cols-5 gap-4">
          {images.map((image, index) => (
            <BlurVignette
              key={index}
              radius="24px"
              inset="10px"
              transitionLength="100px"
              blur="15px"
              className={cn(
                `col-span-${image.colSpan}`,
                image.height,
                "rounded-[2.5rem]"
              )}
            >
              <Img
                width={200}
                height={200}
                className="size-full rounded-[2.5rem] object-cover"
                src={image.src}
                alt={image.alt}
                loading="lazy"
                optixFlowConfig={optixFlowConfig}
              />
            </BlurVignette>
          ))}
        </div>
      </div>
    </section>
  );
}
