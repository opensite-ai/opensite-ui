"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn, getTextColor, getAccentColor } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { Card } from "../../ui/card";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface CtaHeroFeatureCard {
  /**
   * Icon name for the card
   */
  iconName?: string;
  /**
   * Custom icon element
   */
  icon?: React.ReactNode;
  /**
   * Title of the card
   */
  title?: React.ReactNode;
  /**
   * Description of the card
   */
  description?: React.ReactNode;
  /**
   * Link URL for the card
   */
  href?: string;
  /**
   * Additional CSS classes for the card
   */
  className?: string;
}

export interface CtaHeroFeatureCardsProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description content below the heading
   */
  description?: React.ReactNode;
  /**
   * Array of action configurations for CTA buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Hero image URL
   */
  heroImage?: string;
  /**
   * Hero image alt text
   */
  heroImageAlt?: string;
  /**
   * Array of feature cards to display below
   */
  featureCards?: CtaHeroFeatureCard[];
  /**
   * Custom slot for rendering feature cards (overrides featureCards array)
   */
  featureCardsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the hero wrapper
   */
  heroClassName?: string;
  /**
   * Additional CSS classes for the overlay content
   */
  overlayClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Additional CSS classes for the feature cards grid
   */
  cardsGridClassName?: string;
  /**
   * Additional CSS classes for each feature card
   */
  cardClassName?: string;
  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern name or URL
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * CtaHeroFeatureCards - A CTA section with a hero image and centered content,
 * plus feature cards below for instant setup and documentation. Great for
 * product launches.
 *
 * @example
 * ```tsx
 * <CtaHeroFeatureCards
 *   heading="Build Something Amazing"
 *   description="Start building with our powerful tools."
 *   actions={[
 *     { label: "Get Started", href: "/signup", variant: "secondary", size: "lg" },
 *     { label: "Learn More", href: "/learn", variant: "outline", size: "lg" }
 *   ]}
 *   heroImage="/hero.jpg"
 *   featureCards={[
 *     { iconName: "lucide/zap", title: "Fast", description: "Lightning fast", href: "/docs" }
 *   ]}
 * />
 * ```
 */
export function CtaHeroFeatureCards({
  sectionId = "cta-hero-feature-cards",
  heading,
  description,
  actions,
  actionsSlot,
  heroImage,
  heroImageAlt,
  featureCards,
  featureCardsSlot,
  className,
  containerClassName,
  heroClassName,
  overlayClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  cardsGridClassName,
  cardClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
  optixFlowConfig,
}: CtaHeroFeatureCardsProps): React.JSX.Element {
  const actionsContent = useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div
        className={cn(
          "flex flex-col justify-center gap-3 sm:flex-row",
          actionsClassName,
        )}
      >
        {actions.map((action, index) => {
          const isFirstAction = index === 0;
          const isOutlineOnDark =
            action.variant === "outline" && isFirstAction === false;
          return (
            <Pressable
              key={index}
              href={action.href}
              onClick={action.onClick}
              variant={action.variant}
              size={action.size}
              className={cn(
                isOutlineOnDark &&
                  "border-background/30 bg-background/10 text-background hover:bg-background/20",
                action.className,
              )}
              aria-label={action["aria-label"]}
              asButton
            >
              {action.icon}
              {action.children ?? action.label}
              {action.iconAfter ??
                (isFirstAction && (
                  <DynamicIcon
                    name="lucide/arrow-right"
                    size={16}
                    className="ml-2"
                  />
                ))}
            </Pressable>
          );
        })}
      </div>
    );
  }, [actionsSlot, actions, actionsClassName]);

  const featureCardsContent = useMemo(() => {
    if (featureCardsSlot) return featureCardsSlot;
    if (!featureCards || featureCards.length === 0) return null;

    return (
      <div className={cn("grid gap-6 md:grid-cols-2", cardsGridClassName)}>
        {featureCards.map((card, index) => (
          <Pressable key={index} href={card.href}>
            <Card
              className={cn(
                "flex items-start gap-4 p-6 transition-colors hover:bg-accent",
                cardClassName,
                card.className,
              )}
            >
              {(card.icon || card.iconName) && (
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  {card.icon ??
                    (card.iconName && (
                      <DynamicIcon
                        name={card.iconName}
                        size={24}
                        className="text-primary"
                      />
                    ))}
                </div>
              )}
              <div className="flex-1">
                <h3 className="mb-2 font-semibold">{card.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {card.description}
                </p>
              </div>
              <DynamicIcon
                name="lucide/arrow-right"
                size={20}
                className="shrink-0 text-muted-foreground"
              />
            </Card>
          </Pressable>
        ))}
      </div>
    );
  }, [featureCardsSlot, featureCards, cardsGridClassName, cardClassName]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      className={cn(className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div className={cn("container", containerClassName)}>
        {heroImage ? (
          <div
            className={cn(
              "relative mb-12 overflow-hidden rounded-2xl",
              heroClassName,
            )}
          >
            <Img
              src={heroImage}
              alt={heroImageAlt}
              className="h-[400px] w-full object-cover"
              optixFlowConfig={optixFlowConfig}
            />
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center bg-foreground/40",
                overlayClassName,
              )}
            >
              <div className="max-w-2xl p-8 text-center text-background">
                {heading && (
                  typeof heading === "string" ? (
                    <h2
                      className={cn(
                        "mb-4 text-3xl font-bold md:text-5xl",
                        headingClassName,
                      )}
                    >
                      {heading}
                    </h2>
                  ) : (
                    <div className={cn("mb-4", headingClassName)}>{heading}</div>
                  )
                )}
                {description && (
                  typeof description === "string" ? (
                    <p
                      className={cn("mb-8 text-lg opacity-90", descriptionClassName)}
                    >
                      {description}
                    </p>
                  ) : (
                    <div className={cn("mb-8", descriptionClassName)}>{description}</div>
                  )
                )}
                {actionsContent}
              </div>
            </div>
          </div>
        ) : (
          (heading || description || actionsContent) && (
            <div className="mb-12 text-center">
              <div className="mx-auto max-w-2xl">
                {heading && (
                  typeof heading === "string" ? (
                    <h2
                      className={cn(
                        "mb-4 text-3xl font-bold md:text-5xl",
                        headingClassName,
                      )}
                    >
                      {heading}
                    </h2>
                  ) : (
                    <div className={cn("mb-4", headingClassName)}>{heading}</div>
                  )
                )}
                {description && (
                  typeof description === "string" ? (
                    <p
                      className={cn("mb-8 text-lg text-muted-foreground", descriptionClassName)}
                    >
                      {description}
                    </p>
                  ) : (
                    <div className={cn("mb-8", descriptionClassName)}>{description}</div>
                  )
                )}
                {actionsContent}
              </div>
            </div>
          )
        )}
        {featureCardsContent}
      </div>
    </Section>
  );
}
