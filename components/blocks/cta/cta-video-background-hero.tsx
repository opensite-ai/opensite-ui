"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { videoPlaceholders } from "../../../lib/mediaPlaceholders";
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
  pattern?: PatternName | string;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
}

const defaultActions: ActionConfig[] = [
  { label: "Get Started", href: "#", variant: "secondary", size: "lg" },
  { label: "Watch Demo", href: "#", variant: "outline", size: "lg" },
];

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
  heading = "Experience the Future",
  description = "See how our platform transforms your workflow. Join thousands of teams already building amazing products.",
  actions = defaultActions,
  actionsSlot,
  modalVideoUrl = videoPlaceholders[0],
  backgroundVideoUrl = videoPlaceholders[1],
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
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
}: CtaVideoBackgroundHeroProps): React.JSX.Element {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    onModalOpen?.();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    onModalClose?.();
  };

  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div
        className={cn(
          "flex flex-col justify-center gap-3 sm:flex-row",
          actionsClassName
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
                  "border-white/30 text-white hover:bg-white/10",
                action.className
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
  };

  const renderModal = () => {
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
          <video controls autoPlay className="w-full rounded-lg">
            <source src={modalVideoUrl} type="video/mp4" />
          </video>
        </div>
      </div>
    );
  };

  return (
    <Section
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
            videoWrapperClassName
          )}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={backgroundVideoUrl} type="video/mp4" />
          </video>
          <div
            className={cn(
              "absolute inset-0 bg-linear-to-t from-black/80 via-black/50 to-black/30",
              overlayClassName
            )}
          />
          <div className="relative z-10 flex h-full items-center justify-center">
            <div
              className={cn(
                "max-w-2xl p-8 text-center text-white",
                contentClassName
              )}
            >
              <h2
                className={cn(
                  "mb-6 text-4xl font-bold md:text-5xl lg:text-6xl",
                  headingClassName
                )}
              >
                {heading}
              </h2>
              <p
                className={cn(
                  "mb-8 text-lg opacity-90 md:text-xl",
                  descriptionClassName
                )}
              >
                {description}
              </p>
              {renderActions()}
            </div>
          </div>
        </div>
      </div>
      {renderModal()}
    </Section>
  );
}
