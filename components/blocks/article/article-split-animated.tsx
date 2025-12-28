"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Separator } from "../../ui/separator";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface ArticleSplitAnimatedProps {
  className?: string;
  title?: string;
  description?: string;
  image?: string;
  authorName?: string;
  authorImage?: string;
  authorRole?: string;
  publishDate?: string;
  readTime?: string;
  category?: string;
  categoryHref?: string;
  ctaText?: string;
  ctaHref?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultProps: Partial<ArticleSplitAnimatedProps> = {
  title: "The Evolution of Design Systems in Modern Product Development",
  description:
    "Explore how design systems have transformed from simple style guides into comprehensive ecosystems that power the world's most successful digital products. Learn the principles, patterns, and practices that make design systems effective.",
  image: imagePlaceholders[2],
  authorName: "David Park",
  authorImage: imagePlaceholders[10],
  authorRole: "Design Lead",
  publishDate: "January 15, 2025",
  readTime: "8 min read",
  category: "Design",
  categoryHref: "#",
  ctaText: "Read Full Article",
  ctaHref: "#",
};

export function ArticleSplitAnimatedComponent({
  className,
  title = defaultProps.title,
  description = defaultProps.description,
  image = defaultProps.image,
  authorName = defaultProps.authorName,
  authorImage = defaultProps.authorImage,
  authorRole = defaultProps.authorRole,
  publishDate = defaultProps.publishDate,
  readTime = defaultProps.readTime,
  category = defaultProps.category,
  categoryHref = defaultProps.categoryHref,
  ctaText = defaultProps.ctaText,
  ctaHref = defaultProps.ctaHref,
  optixFlowConfig,
}: ArticleSplitAnimatedProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative aspect-4/3 overflow-hidden rounded-2xl lg:aspect-auto lg:h-full"
          >
            <Img
              src={image || ""}
              alt={title || "Article image"}
              className="h-full w-full object-cover"
              optixFlowConfig={optixFlowConfig}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <Pressable
                href={categoryHref}
                className="inline-block rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/30"
              >
                {category}
              </Pressable>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{publishDate}</span>
              <Separator orientation="vertical" className="h-4" />
              <span>{readTime}</span>
            </div>

            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              {title}
            </h2>

            <p className="mt-4 text-lg text-muted-foreground">{description}</p>

            <div className="mt-8 flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={authorImage} />
                <AvatarFallback>{authorName?.charAt(0) || "A"}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{authorName}</p>
                <p className="text-sm text-muted-foreground">{authorRole}</p>
              </div>
            </div>

            <div className="mt-8">
              <Pressable href={ctaHref} asButton variant="default" size="lg">
                {ctaText}
              </Pressable>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export { ArticleSplitAnimatedComponent as ArticleSplitAnimated };
