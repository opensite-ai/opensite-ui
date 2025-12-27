"use client";

import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";

export interface MasonryMotionGridImage {
  src: string;
  alt: string;
  height: string;
}

export interface MasonryMotionGridProps {
  column1Images?: MasonryMotionGridImage[];
  column2Images?: MasonryMotionGridImage[];
  column3Images?: MasonryMotionGridImage[];
  column4Images?: MasonryMotionGridImage[];
  className?: string;
  /** Optional Optix Flow configuration for @page-speed/img */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultColumn1Images: MasonryMotionGridImage[] = [
  {
    src: "https://toastability-production.s3.amazonaws.com/xlp46pzk3a4d73jgjx4s7xdafwpn",
    alt: "Gallery Image 1",
    height: "23rem",
  },
  {
    src: "https://toastability-production.s3.amazonaws.com/g1iuifb3yzoofo9c7a00koyn6q1t",
    alt: "Gallery Image 2",
    height: "28rem",
  },
  {
    src: "https://toastability-production.s3.amazonaws.com/z9u4sdrj2oq3eds0qyui0nxsus3j",
    alt: "Gallery Image 3",
    height: "12rem",
  },
];

const defaultColumn2Images: MasonryMotionGridImage[] = [
  {
    src: "https://toastability-production.s3.amazonaws.com/63aotyt2pb4gqpccej2kkw8reson",
    alt: "Gallery Image 4",
    height: "13rem",
  },
  {
    src: "https://toastability-production.s3.amazonaws.com/pjgb223h1bjywdk15i3zi7pjhutg",
    alt: "Gallery Image 5",
    height: "32rem",
  },
  {
    src: "https://toastability-production.s3.amazonaws.com/xlp46pzk3a4d73jgjx4s7xdafwpn",
    alt: "Gallery Image 6",
    height: "18rem",
  },
];

const defaultColumn3Images: MasonryMotionGridImage[] = [
  {
    src: "https://toastability-production.s3.amazonaws.com/g1iuifb3yzoofo9c7a00koyn6q1t",
    alt: "Gallery Image 7",
    height: "32rem",
  },
  {
    src: "https://toastability-production.s3.amazonaws.com/z9u4sdrj2oq3eds0qyui0nxsus3j",
    alt: "Gallery Image 8",
    height: "32rem",
  },
];

const defaultColumn4Images: MasonryMotionGridImage[] = [
  {
    src: "https://toastability-production.s3.amazonaws.com/63aotyt2pb4gqpccej2kkw8reson",
    alt: "Gallery Image 9",
    height: "13rem",
  },
  {
    src: "https://toastability-production.s3.amazonaws.com/pjgb223h1bjywdk15i3zi7pjhutg",
    alt: "Gallery Image 10",
    height: "22.5rem",
  },
  {
    src: "https://toastability-production.s3.amazonaws.com/xlp46pzk3a4d73jgjx4s7xdafwpn",
    alt: "Gallery Image 11",
    height: "22rem",
  },
];

/**
 * MasonryMotionGrid displays images in an animated masonry grid layout.
 *
 * Features a 4-column (2 on mobile) masonry grid with staggered image heights.
 * Each image animates into view with scale, opacity, and vertical movement
 * using Framer Motion's whileInView trigger. Alternating columns animate from
 * different directions (up/down) for visual interest. The grid is duplicated
 * below for extended galleries. Ideal for portfolio showcases, photo galleries,
 * or any visual content requiring dynamic presentation.
 *
 * @example
 * ```tsx
 * <MasonryMotionGrid
 *   column1Images={[
 *     { src: "/images/photo-1.jpg", alt: "Photo 1", height: "23rem" }
 *   ]}
 *   column2Images={[
 *     { src: "/images/photo-2.jpg", alt: "Photo 2", height: "13rem" }
 *   ]}
 * />
 * ```
 */
export function MasonryMotionGrid({
  column1Images = defaultColumn1Images,
  column2Images = defaultColumn2Images,
  column3Images = defaultColumn3Images,
  column4Images = defaultColumn4Images,
  className,
  optixFlowConfig,
}: MasonryMotionGridProps) {
  const renderColumn = (
    images: MasonryMotionGridImage[],
    direction: "up" | "down"
  ) => (
    <div className="grid gap-4">
      {images.map((image, index) => (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
            y: direction === "up" ? 50 : -50,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
          }}
          key={index}
          className="w-full overflow-hidden rounded-2xl bg-muted"
          style={{ height: image.height }}
        >
          <Img
            className="h-full w-full rounded-2xl object-cover"
            src={image.src}
            alt={image.alt}
            loading="lazy"
            optixFlowConfig={optixFlowConfig}
          />
        </motion.div>
      ))}
    </div>
  );

  return (
    <section className={cn("py-32", className)}>
      <div className="relative container">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {renderColumn(column1Images, "up")}
          {renderColumn(column2Images, "down")}
          {renderColumn(column3Images, "up")}
          <div className="grid gap-4">
            {column4Images.map((image, index) => (
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
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                key={index}
                className="w-full overflow-hidden rounded-2xl bg-muted"
                style={{ height: image.height }}
              >
                <Img
                  className="h-full w-full rounded-2xl object-cover"
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  optixFlowConfig={optixFlowConfig}
                />
              </motion.div>
            ))}
            <div className="h-17 w-full rounded-2xl bg-muted" />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          {renderColumn(column1Images, "up")}
          {renderColumn(column2Images, "down")}
          {renderColumn(column3Images, "up")}
          <div className="grid gap-4">
            {column4Images.map((image, index) => (
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
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                key={index}
                className="w-full overflow-hidden rounded-2xl bg-muted"
                style={{ height: image.height }}
              >
                <Img
                  className="h-full w-full rounded-2xl object-cover"
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  optixFlowConfig={optixFlowConfig}
                />
              </motion.div>
            ))}
            <div className="h-17 w-full rounded-2xl bg-muted" />
          </div>
        </div>
      </div>
    </section>
  );
}
