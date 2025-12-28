"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import type { ActionConfig, OptixFlowConfig } from "../../../src/types";

export interface FeatureTabbedContentImageFeatureItem {
  /**
   * Feature content
   */
  content?: React.ReactNode;
  /**
   * Icon element (overrides default check icon)
   */
  icon?: React.ReactNode;
  /**
   * Icon name for dynamic icon loading
   */
  iconName?: string;
  /**
   * Additional CSS classes for the item
   */
  className?: string;
}

export interface FeatureTabbedContentImageSlide {
  /**
   * Unique identifier
   */
  id: number | string;
  /**
   * Tab name content
   */
  tabName?: React.ReactNode;
  /**
   * Slide title content
   */
  title?: React.ReactNode;
  /**
   * Slide description content
   */
  description?: React.ReactNode;
  /**
   * Array of feature bullet points (can be strings or FeatureTabbedContentImageFeatureItem objects)
   */
  features?: (string | FeatureTabbedContentImageFeatureItem)[];
  /**
   * Custom slot for features (overrides features array)
   */
  featuresSlot?: React.ReactNode;
  /**
   * Array of action configurations for CTA buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Image source URL
   */
  image?: string;
  /**
   * Image alt text
   */
  imageAlt?: string;
  /**
   * Custom slot for image (overrides image)
   */
  imageSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the slide content
   */
  className?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the features list
   */
  featuresClassName?: string;
  /**
   * Additional CSS classes for the image
   */
  imageClassName?: string;
}

export interface FeatureTabbedContentImageProps {
  /**
   * Main heading content
   */
  title?: React.ReactNode;
  /**
   * Supporting description content
   */
  description?: React.ReactNode;
  /**
   * Array of tab slides
   */
  slides?: FeatureTabbedContentImageSlide[];
  /**
   * Custom slot for rendering slides (overrides slides array)
   */
  slidesSlot?: React.ReactNode;
  /**
   * Default active tab value
   */
  defaultTab?: string;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the header wrapper
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the tabs wrapper
   */
  tabsWrapperClassName?: string;
  /**
   * Additional CSS classes for the tabs component
   */
  tabsClassName?: string;
  /**
   * Additional CSS classes for the tabs list
   */
  tabsListClassName?: string;
  /**
   * Additional CSS classes for each tab trigger
   */
  tabTriggerClassName?: string;
  /**
   * Additional CSS classes for each tab content
   */
  tabContentClassName?: string;
  /**
   * Additional CSS classes for the content grid
   */
  contentGridClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

const defaultSlides: FeatureTabbedContentImageSlide[] = [
  {
    id: 1,
    tabName: "Products",
    title: "Pre-built Components for Rapid Development",
    description:
      "Accelerate your workflow with our library of ready-to-use, fully customizable UI components designed for modern web applications.",
    features: [
      "Cross-platform Integrations",
      "Responsive Components",
      "Accessible Blocks",
      "Customizable Templates",
    ],
    actions: [
      {
        label: "Explore Products",
        href: "#",
        variant: "outline",
        size: "sm",
        iconAfter: <DynamicIcon name="lucide/arrow-right" size={16} />,
      },
    ],
    image: blockBrandedIconsAndPlaceholders.placeholder1,
  },
  {
    id: 2,
    tabName: "Services",
    title: "Expert Solutions for Every Challenge",
    description:
      "Our comprehensive services help you build, scale, and optimize your digital presence with expert guidance every step of the way.",
    features: [
      "Technical Consulting",
      "Implementation Support",
      "Performance Optimization",
      "Ongoing Maintenance",
    ],
    actions: [
      {
        label: "Explore Services",
        href: "#",
        variant: "outline",
        size: "sm",
        iconAfter: <DynamicIcon name="lucide/arrow-right" size={16} />,
      },
    ],
    image: blockBrandedIconsAndPlaceholders.placeholderDark1,
  },
  {
    id: 3,
    tabName: "Company",
    title: "We Build the Future of Web Development",
    description:
      "Founded by industry experts, we're committed to creating tools that empower developers to build better digital experiences faster.",
    features: [
      "Remote-first Culture",
      "Open Source Contributors",
      "Community-driven",
      "Continuous Innovation",
    ],
    actions: [
      {
        label: "Explore Company",
        href: "#",
        variant: "outline",
        size: "sm",
        iconAfter: <DynamicIcon name="lucide/arrow-right" size={16} />,
      },
    ],
    image: blockBrandedIconsAndPlaceholders.placeholder3,
  },
  {
    id: 4,
    tabName: "Portfolio",
    title: "Showcasing Client Success Stories",
    description:
      "Explore our diverse portfolio of successful implementations across industries, from startups to enterprise-level organizations.",
    features: [
      "Case Studies",
      "Implementation Examples",
      "Success Metrics",
      "Client Testimonials",
    ],
    actions: [
      {
        label: "Explore Portfolio",
        href: "#",
        variant: "outline",
        size: "sm",
        iconAfter: <DynamicIcon name="lucide/arrow-right" size={16} />,
      },
    ],
    image: blockBrandedIconsAndPlaceholders.placeholder4,
  },
  {
    id: 5,
    tabName: "Resources",
    title: "Knowledge to Power Your Development",
    description:
      "Access our comprehensive collection of tutorials, guides, and best practices to help you get the most from our platform.",
    features: [
      "Developer Guides",
      "Video Tutorials",
      "API Documentation",
      "Community Forums",
    ],
    actions: [
      {
        label: "Explore Resources",
        href: "#",
        variant: "outline",
        size: "sm",
        iconAfter: <DynamicIcon name="lucide/arrow-right" size={16} />,
      },
    ],
    image: blockBrandedIconsAndPlaceholders.placeholder5,
  },
];

/**
 * Feature Tabbed Content Image - Tabbed interface with content and images
 * that change based on selected tab.
 *
 * Layout: Centered header, horizontal tabs, two-column content with image.
 * Key features: Tab navigation, checklist features, CTA button per tab, responsive images.
 * Best for: Product/service categories, multi-section content, portfolio showcases.
 *
 * @example
 * ```tsx
 * <FeatureTabbedContentImage
 *   title="Building Better Digital Experiences"
 *   slides={[
 *     {
 *       id: 1,
 *       tabName: "Products",
 *       title: "Pre-built Components",
 *       description: "Accelerate your workflow.",
 *       features: ["Cross-platform", "Responsive"],
 *       actions: [{ label: "Explore", href: "#", variant: "outline" }],
 *       image: "/products.jpg"
 *     },
 *   ]}
 * />
 * ```
 */
export function FeatureTabbedContentImage({
  title = "Building Better Digital Experiences",
  description = "Discover how our platform empowers developers and businesses to create exceptional web applications with less code and more creativity.",
  slides = defaultSlides,
  slidesSlot,
  defaultTab = "1",
  className,
  containerClassName,
  headerClassName,
  titleClassName,
  descriptionClassName,
  tabsWrapperClassName,
  tabsClassName,
  tabsListClassName,
  tabTriggerClassName,
  tabContentClassName,
  contentGridClassName,
  optixFlowConfig,
}: FeatureTabbedContentImageProps): React.JSX.Element {
  const renderFeatures = (slide: FeatureTabbedContentImageSlide) => {
    if (slide.featuresSlot) return slide.featuresSlot;
    if (!slide.features || slide.features.length === 0) return null;

    return slide.features.map((feature, index) => {
      const isString = typeof feature === "string";
      const content = isString ? feature : feature.content;
      const iconElement = isString ? (
        <DynamicIcon name="lucide/check-circle-2" size={16} />
      ) : (
        feature.icon ?? (feature.iconName ? <DynamicIcon name={feature.iconName} size={16} /> : <DynamicIcon name="lucide/check-circle-2" size={16} />)
      );
      const itemClassName = isString ? undefined : feature.className;

      return (
        <li key={index} className={cn("flex items-center gap-2", itemClassName)}>
          {iconElement}
          <span className="font-medium">{content}</span>
        </li>
      );
    });
  };

  const renderActions = (slide: FeatureTabbedContentImageSlide) => {
    if (slide.actionsSlot) return slide.actionsSlot;
    if (!slide.actions || slide.actions.length === 0) return null;

    return slide.actions.map((action, index) => {
      if (action.children) {
        return (
          <Pressable
            key={index}
            href={action.href}
            onClick={action.onClick}
            variant={action.variant}
            size={action.size}
            className={cn("mt-8", action.className)}
            aria-label={action["aria-label"]}
            asButton
          >
            {action.children}
          </Pressable>
        );
      }

      return (
        <Pressable
          key={index}
          href={action.href}
          onClick={action.onClick}
          variant={action.variant}
          size={action.size}
          className={cn("mt-8", action.className)}
          aria-label={action["aria-label"]}
          asButton
        >
          {action.icon}
          {action.label}
          {action.iconAfter}
        </Pressable>
      );
    });
  };

  const renderImage = (slide: FeatureTabbedContentImageSlide) => {
    if (slide.imageSlot) return slide.imageSlot;
    if (!slide.image) return null;

    const imageAlt = slide.imageAlt || (typeof slide.title === "string" ? slide.title : "Tab content image");

    return (
      <Img
        src={slide.image}
        alt={imageAlt}
        className={cn("order-first max-h-[400px] w-full rounded-lg object-cover md:order-last", slide.imageClassName)}
        loading="lazy"
        optixFlowConfig={optixFlowConfig}
      />
    );
  };

  const renderSlides = () => {
    if (slidesSlot) return slidesSlot;
    if (!slides || slides.length === 0) return null;

    return (
      <>
        <TabsList className={cn("flex h-auto gap-x-2 p-2", tabsListClassName)}>
          {slides.map((slide) => (
            <TabsTrigger
              key={slide.id}
              value={slide.id.toString()}
              className={cn("text-sm hover:bg-background md:text-base", tabTriggerClassName)}
            >
              {slide.tabName}
            </TabsTrigger>
          ))}
        </TabsList>
        {slides.map((slide) => (
          <TabsContent
            value={slide.id.toString()}
            key={slide.id}
            className={cn("max-w-5xl", tabContentClassName)}
          >
            <div className={cn("grid grid-cols-1 items-center gap-10 md:grid-cols-2", contentGridClassName, slide.className)}>
              <div>
                {slide.title && (
                  typeof slide.title === "string" ? (
                    <h2 className={cn("mb-4 text-2xl font-semibold lg:text-4xl", slide.titleClassName)}>
                      {slide.title}
                    </h2>
                  ) : (
                    <div className={cn("mb-4 text-2xl font-semibold lg:text-4xl", slide.titleClassName)}>
                      {slide.title}
                    </div>
                  )
                )}
                {slide.description && (
                  typeof slide.description === "string" ? (
                    <p className={cn("text-muted-foreground lg:text-xl", slide.descriptionClassName)}>
                      {slide.description}
                    </p>
                  ) : (
                    <div className={cn("text-muted-foreground lg:text-xl", slide.descriptionClassName)}>
                      {slide.description}
                    </div>
                  )
                )}
                {(slide.features && slide.features.length > 0) || slide.featuresSlot ? (
                  <ul className={cn("mt-8 grid grid-cols-1 gap-2 lg:grid-cols-2", slide.featuresClassName)}>
                    {renderFeatures(slide)}
                  </ul>
                ) : null}
                {renderActions(slide)}
              </div>
              {renderImage(slide)}
            </div>
          </TabsContent>
        ))}
      </>
    );
  };

  return (
    <section className={cn("py-32", className)}>
      <div className={cn("container", containerClassName)}>
        <div className={cn("mx-auto flex max-w-3xl flex-col items-center gap-6", headerClassName)}>
          {title && (
            typeof title === "string" ? (
              <h2 className={cn("text-center text-3xl font-semibold lg:text-5xl", titleClassName)}>
                {title}
              </h2>
            ) : (
              <div className={cn("text-center text-3xl font-semibold lg:text-5xl", titleClassName)}>
                {title}
              </div>
            )
          )}
          {description && (
            typeof description === "string" ? (
              <p className={cn("text-center text-balance text-muted-foreground lg:text-xl", descriptionClassName)}>
                {description}
              </p>
            ) : (
              <div className={cn("text-center text-balance text-muted-foreground lg:text-xl", descriptionClassName)}>
                {description}
              </div>
            )
          )}
        </div>
        <div className={cn("mt-12", tabsWrapperClassName)}>
          <Tabs
            defaultValue={defaultTab}
            className={cn("mx-auto flex w-fit flex-col items-center gap-8 md:gap-12", tabsClassName)}
          >
            {renderSlides()}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
