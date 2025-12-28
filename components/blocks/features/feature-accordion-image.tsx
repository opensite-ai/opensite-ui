"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface FeatureAccordionImageItem {
  /**
   * Accordion item title
   */
  title: string;
  /**
   * Accordion item content
   */
  content: string;
  /**
   * Image source URL for this item
   */
  imageSrc: string;
  /**
   * Image alt text
   */
  imageAlt: string;
}

export interface FeatureAccordionImageProps {
  /**
   * Main heading text
   */
  title?: string;
  /**
   * Supporting description text
   */
  description?: string;
  /**
   * Array of accordion items
   */
  items?: FeatureAccordionImageItem[];
  /**
   * Default open item value
   */
  defaultValue?: string;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

/**
 * Feature Accordion Image - Accordion-based feature display with images that
 * change based on the selected accordion item.
 *
 * Layout: Two-column layout with accordion on left, dynamic image on right.
 * Key features: Accordion navigation, dynamic images, smooth transitions.
 * Best for: Feature explanations, product tours, FAQ with visuals.
 *
 * @example
 * ```tsx
 * <FeatureAccordionImage
 *   title="How It Works"
 *   description="Learn about our process"
 *   items={[
 *     {
 *       title: "Step 1: Sign Up",
 *       content: "Create your account in minutes.",
 *       imageSrc: "/step1.jpg",
 *       imageAlt: "Sign up process"
 *     },
 *   ]}
 * />
 * ```
 */
export function FeatureAccordionImage({
  title = "How It Works",
  description = "Learn about our simple process to get started with our platform.",
  items = [
    {
      title: "Create Your Account",
      content:
        "Sign up in minutes with just your email. No credit card required to get started. You'll have immediate access to all basic features.",
      imageSrc: blockBrandedIconsAndPlaceholders.placeholder1,
      imageAlt: "Account creation",
    },
    {
      title: "Configure Your Settings",
      content:
        "Customize your workspace to match your workflow. Set up integrations, invite team members, and configure notifications.",
      imageSrc: blockBrandedIconsAndPlaceholders.placeholderDark1,
      imageAlt: "Settings configuration",
    },
    {
      title: "Start Building",
      content:
        "Use our intuitive drag-and-drop builder to create stunning pages. Access hundreds of pre-built components and templates.",
      imageSrc: blockBrandedIconsAndPlaceholders.placeholder3,
      imageAlt: "Building process",
    },
    {
      title: "Launch & Scale",
      content:
        "Deploy your project with one click. Monitor performance, gather analytics, and scale as your business grows.",
      imageSrc: blockBrandedIconsAndPlaceholders.placeholder4,
      imageAlt: "Launch and scale",
    },
  ],
  defaultValue = "item-0",
  className,
  optixFlowConfig,
}: FeatureAccordionImageProps) {
  const [activeItem, setActiveItem] = React.useState(defaultValue);
  const activeIndex = parseInt(activeItem.replace("item-", ""), 10) || 0;
  const currentImage = items[activeIndex] || items[0];

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mb-12 text-center">
          {title && (
            <h2 className="text-3xl font-semibold md:text-4xl lg:text-5xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-4 text-muted-foreground lg:text-lg">
              {description}
            </p>
          )}
        </div>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Accordion
            type="single"
            collapsible
            value={activeItem}
            onValueChange={setActiveItem}
            className="w-full"
          >
            {items.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-medium">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="relative aspect-video overflow-hidden rounded-xl lg:aspect-square">
            <Img
              src={currentImage.imageSrc}
              alt={currentImage.imageAlt}
              className="h-full w-full object-cover transition-opacity duration-300"
              loading="lazy"
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
