"use client";

import * as React from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import {
  imagePlaceholders,
  logoPlaceholders,
} from "../../../lib/mediaPlaceholders";
import { Carousel, CarouselContent, CarouselItem } from "../../ui/carousel";
import type { ActionConfig, ImageItem, FeatureItem, LogoItem, OptixFlowConfig } from "../../../src/types";

export interface HeroDesignCarouselPortfolioProps {
  /**
   * Logo configuration
   */
  logo?: LogoItem;
  /**
   * Custom slot for logo (overrides logo prop)
   */
  logoSlot?: React.ReactNode;
  /**
   * Array of feature highlights
   */
  features?: FeatureItem[];
  /**
   * Custom slot for features (overrides features array)
   */
  featuresSlot?: React.ReactNode;
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Primary action configuration (schedule chat button)
   */
  primaryAction?: ActionConfig;
  /**
   * Avatar image for primary action button
   */
  primaryActionAvatar?: string;
  /**
   * Secondary action configuration (portfolio button)
   */
  secondaryAction?: ActionConfig;
  /**
   * Custom slot for actions (overrides action props)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Array of carousel images
   */
  carouselImages?: ImageItem[];
  /**
   * Custom slot for carousel (overrides carouselImages array)
   */
  carouselSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the content area
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the features container
   */
  featuresClassName?: string;
  /**
   * Additional CSS classes for the carousel container
   */
  carouselClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

const defaultLogo: LogoItem = {
  src: logoPlaceholders.darkHorizontalLogo,
  alt: "",
  className: "h-12 lg:h-16",
};

const defaultFeatures: FeatureItem[] = [
  { icon: "lucide/check-circle", title: "Design Subscription Monthly" },
  { icon: "lucide/check-circle", title: "Rapid Delivery" },
  { icon: "lucide/check-circle", title: "Flexible Subscription" },
];

const defaultPrimaryAction: ActionConfig = {
  label: "Schedule a chat with me",
  href: "#",
  variant: "outline",
  className: "flex h-fit items-center gap-2.5 self-start rounded-full border-2 border-black px-2 py-1.5 text-sm font-semibold lg:px-4 lg:py-3.5 lg:text-base",
};

const defaultSecondaryAction: ActionConfig = {
  label: "Explore my portfolio",
  href: "#",
  variant: "outline",
  className: "relative z-10 mx-auto mt-10 flex h-fit items-center gap-2.5 rounded-full border-2 border-black px-4 py-3.5 text-sm font-semibold transition hover:bg-black hover:text-white lg:text-base",
  iconAfter: <DynamicIcon name="lucide/arrow-up-right" size={24} />,
};

const defaultCarouselImages: ImageItem[] = [
  { src: imagePlaceholders[17], alt: "" },
  { src: imagePlaceholders[18], alt: "" },
  { src: imagePlaceholders[19], alt: "" },
  { src: imagePlaceholders[20], alt: "" },
  { src: imagePlaceholders[21], alt: "" },
  { src: imagePlaceholders[22], alt: "" },
  { src: imagePlaceholders[23], alt: "" },
  { src: imagePlaceholders[24], alt: "" },
];

export function HeroDesignCarouselPortfolio({
  logo = defaultLogo,
  logoSlot,
  features = defaultFeatures,
  featuresSlot,
  heading = "The All You Can Design buffet to fuel your business growth",
  description = <>Enjoy professional design expertise — <span className="font-semibold">without the hefty price tag</span></>,
  primaryAction = defaultPrimaryAction,
  primaryActionAvatar = imagePlaceholders[16],
  secondaryAction = defaultSecondaryAction,
  actionsSlot,
  carouselImages = defaultCarouselImages,
  carouselSlot,
  className,
  containerClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  featuresClassName,
  carouselClassName,
  optixFlowConfig,
}: HeroDesignCarouselPortfolioProps): React.JSX.Element {
  const renderLogo = () => {
    if (logoSlot) return logoSlot;

    return (
      <Img
        src={logo.src}
        className={cn("h-12 lg:h-16", logo.className)}
        alt={logo.alt}
        optixFlowConfig={optixFlowConfig}
      />
    );
  };

  const renderFeatures = () => {
    if (featuresSlot) return featuresSlot;
    if (!features || features.length === 0) return null;

    return (
      <div className={cn("hidden items-center gap-6 lg:flex", featuresClassName)}>
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-1.5 text-foreground">
            <DynamicIcon name={feature.icon || "lucide/check-circle"} size={24} />
            <span>{feature.title}</span>
          </div>
        ))}
      </div>
    );
  };

  const renderPrimaryAction = () => {
    if (actionsSlot) return null;

    const { label, className: actionClassName, ...pressableProps } = primaryAction;
    return (
      <Pressable
        asButton
        className={actionClassName}
        {...pressableProps}
      >
        <Img
          src={primaryActionAvatar}
          alt=""
          className="size-9 rounded-full object-cover lg:size-11"
          optixFlowConfig={optixFlowConfig}
        />
        <span>{label}</span>
      </Pressable>
    );
  };

  const renderSecondaryAction = () => {
    if (actionsSlot) return null;

    const { label, iconAfter, className: actionClassName, ...pressableProps } = secondaryAction;
    return (
      <Pressable
        asButton
        className={actionClassName}
        {...pressableProps}
      >
        <span>{label}</span>
        {iconAfter}
      </Pressable>
    );
  };

  const renderCarousel = () => {
    if (carouselSlot) return carouselSlot;

    return (
      <Carousel
        opts={{
          loop: true,
          align: "center",
        }}
        plugins={[
          AutoScroll({
            speed: 1,
          }),
          Autoplay({
            playOnInit: true,
            delay: 1000,
          }),
        ]}
        className={cn("relative mx-auto w-full max-w-full overflow-hidden from-white to-transparent before:absolute before:top-0 before:left-0 before:z-10 before:h-full before:w-[20%] before:bg-linear-to-r before:content-[''] after:absolute after:top-0 after:right-0 after:z-10 after:h-full after:w-[20%] after:bg-linear-to-l after:from-white after:to-transparent after:content-['']", carouselClassName)}
      >
        <CarouselContent className="ml-5 flex gap-5 pl-4">
          {carouselImages.map((image, index) => (
            <CarouselItem key={index} className="basis-[496px] bg-background">
              <div className="h-[380px] basis-[480px] overflow-hidden rounded-lg">
                <Img
                  src={image.src}
                  alt={image.alt}
                  className={cn("size-full object-cover", image.className)}
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    );
  };

  return (
    <section className={cn("relative bg-background py-14", className)}>
      <div className={cn("relative z-10 container mx-auto", containerClassName)}>
        <div className="py-8">
          {renderLogo()}
        </div>
        <div className={cn("flex flex-col gap-10 py-10 lg:py-28", contentClassName)}>
          {renderFeatures()}
          <div className="flex">
            <div className="flex flex-1 flex-col gap-4">
              {heading && (
                typeof heading === "string" ? (
                  <h1 className={cn("max-w-6xl text-4xl tracking-tighter text-foreground lg:text-7xl xl:text-9xl", headingClassName)}>
                    {heading}
                  </h1>
                ) : (
                  <h1 className={cn("max-w-6xl text-4xl tracking-tighter text-foreground lg:text-7xl xl:text-9xl", headingClassName)}>
                    {heading}
                  </h1>
                )
              )}
              {description && (
                typeof description === "string" ? (
                  <p className={cn("text-lg text-foreground lg:text-2xl", descriptionClassName)}>
                    {description}
                  </p>
                ) : (
                  <p className={cn("text-lg text-foreground lg:text-2xl", descriptionClassName)}>
                    {description}
                  </p>
                )
              )}
            </div>
          </div>
          {actionsSlot || renderPrimaryAction()}
        </div>
      </div>
      <div className="relative flex flex-col">
        {renderCarousel()}
      </div>
      {actionsSlot || renderSecondaryAction()}
    </section>
  );
}
