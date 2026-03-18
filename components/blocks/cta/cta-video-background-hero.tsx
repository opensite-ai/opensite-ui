"use client";

import * as React from "react";
import { useMemo, useState, useEffect } from "react";
import { Video } from "@page-speed/video";
import { loadSkinFromJsDelivr, resolveVideoClasses, getSkinStyleObject } from '@page-speed/skins';
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface CtaVideoBackgroundHeroProps {
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
   * Video URL for the modal
   */
  modalVideoUrl?: string;
  /**
   * Background video URL
   */
  backgroundVideoUrl?: string;
  /**
   * Custom slot for rendering the video modal (overrides default modal)
   */
  modalSlot?: React.ReactNode;
  /**
   * Callback when modal opens
   */
  onModalOpen?: () => void;
  /**
   * Callback when modal closes
   */
  onModalClose?: () => void;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the video wrapper
   */
  videoWrapperClassName?: string;
  /**
   * Additional CSS classes for the overlay
   */
  overlayClassName?: string;
  /**
   * Additional CSS classes for the content wrapper
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
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
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
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * CtaVideoBackgroundHero - A hero CTA with looping video background, gradient
 * overlay, heading, description, and buttons including a video modal trigger.
 * High-impact visual design.
 *
 * @example
 * ```tsx
 * <CtaVideoBackgroundHero
 *   heading="Experience the Future"
 *   description="See how our platform transforms your workflow."
 *   actions={[
 *     { label: "Get Started", href: "/signup", variant: "secondary" },
 *     { label: "Watch Demo", href: "#", variant: "outline" }
 *   ]}
 *   backgroundVideoUrl="/background.mp4"
 * />
 * ```
 */
export function CtaVideoBackgroundHero({
  sectionId = "cta-video-background-hero",
  heading,
  description,
  actions,
  actionsSlot,
  modalVideoUrl,
  backgroundVideoUrl,
  modalSlot,
  onModalOpen,
  onModalClose,
  className,
  containerClassName,
  videoWrapperClassName,
  overlayClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
}: CtaVideoBackgroundHeroProps): React.JSX.Element {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [skinClasses, setSkinClasses] = useState<any>(null);
  const [skinStyle, setSkinStyle] = useState<any>(null);

  useEffect(() => {
    loadSkinFromJsDelivr('0.1.2', 'skins/video/base.json').then(skin => {
      setSkinClasses(resolveVideoClasses(skin));
      setSkinStyle(getSkinStyleObject(skin));
    });
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    onModalOpen?.();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    onModalClose?.();
  };

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
          const isVideoAction = action.label === "Watch Demo" || index === 1;
          return (
            <Pressable
              key={index}
              href={action.href}
              onClick={
                isVideoAction
                  ? (e) => {
                      e.preventDefault();
                      handleOpenModal();
                      action.onClick?.(e);
                    }
                  : action.onClick
              }
              variant={action.variant}
              size={action.size}
              className={cn(
                !isFirstAction &&
                  "border-background/30 text-background hover:bg-background/10",
                action.className,
              )}
              aria-label={action["aria-label"]}
              asButton
            >
              {action.icon ??
                (isVideoAction && (
                  <DynamicIcon name="lucide/play" size={16} className="mr-2" />
                ))}
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

  const modalContent = useMemo(() => {
    if (modalSlot) return modalSlot;
    if (!isModalOpen) return null;

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
        onClick={handleCloseModal}
      >
        <div
          className="relative w-full max-w-4xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleCloseModal}
            className="absolute -right-4 -top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-lg transition-colors hover:bg-gray-100"
          >
            <DynamicIcon name="lucide/x" size={20} />
          </button>
          {modalVideoUrl && (
            <Video
              src={modalVideoUrl}
              controls={true}
              autoPlay
              skinClasses={skinClasses || undefined}
              skinStyle={skinStyle || undefined}
              className="h-full w-full rounded-lg"
            />
          )}
        </div>
      </div>
    );
  }, [modalSlot, isModalOpen, modalVideoUrl]);

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
        <div
          className={cn(
            "relative h-[600px] overflow-hidden rounded-2xl",
            videoWrapperClassName,
          )}
        >
          {backgroundVideoUrl && (
            <Video
              src={backgroundVideoUrl}
              autoPlay
              loop
              muted
              playsInline
              controls={false}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          <div
            className={cn(
              "absolute inset-0 bg-linear-to-t from-foreground/80 via-foreground/50 to-foreground/30",
              overlayClassName,
            )}
          />
          <div className="relative z-10 flex h-full items-center justify-center">
            <div
              className={cn(
                "max-w-2xl p-8 text-center text-background",
                contentClassName,
              )}
            >
              {heading && (
                typeof heading === "string" ? (
                  <h2
                    className={cn(
                      "mb-6 text-4xl font-bold md:text-5xl lg:text-6xl",
                      headingClassName,
                    )}
                  >
                    {heading}
                  </h2>
                ) : (
                  <div className={cn("mb-6", headingClassName)}>{heading}</div>
                )
              )}
              {description && (
                typeof description === "string" ? (
                  <p
                    className={cn(
                      "mb-8 text-lg opacity-90 md:text-xl",
                      descriptionClassName,
                    )}
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
      </div>
      {modalContent}
    </Section>
  );
}
