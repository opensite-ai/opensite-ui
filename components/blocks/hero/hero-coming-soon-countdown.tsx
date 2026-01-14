"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Input } from "../../ui/input";
import type { ActionConfig, SocialLinkItem } from "../../../src/types";

/**
 * Countdown item configuration
 */
export interface CountdownItem {
  value: string;
  label: string;
}

export interface HeroComingSoonCountdownProps {
  /**
   * Badge icon name (DynamicIcon format)
   */
  badgeIcon?: string;
  /**
   * Badge text content
   */
  badgeText?: React.ReactNode;
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Countdown items array
   */
  countdownItems?: CountdownItem[];
  /**
   * Custom slot for countdown (overrides countdownItems)
   */
  countdownSlot?: React.ReactNode;
  /**
   * Email input placeholder text
   */
  emailPlaceholder?: string;
  /**
   * Submit button action configuration
   */
  submitAction?: ActionConfig;
  /**
   * Custom slot for the form (overrides email input and submit)
   */
  formSlot?: React.ReactNode;
  /**
   * Social link items
   */
  socialLinks?: Array<SocialLinkItem & { iconName?: string }>;
  /**
   * Custom slot for social links (overrides socialLinks array)
   */
  socialLinksSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the badge
   */
  badgeClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the countdown container
   */
  countdownClassName?: string;
  /**
   * Additional CSS classes for the form container
   */
  formClassName?: string;
  /**
   * Additional CSS classes for the social links container
   */
  socialLinksClassName?: string;
}

export function HeroComingSoonCountdown({
  badgeIcon = "lucide/rocket",
  badgeText = "Launching Soon",
  heading = "Something amazing is coming",
  description = "We're working hard to bring you something special. Be the first to know when we launch.",
  countdownItems,
  countdownSlot,
  emailPlaceholder = "Enter your email",
  submitAction,
  formSlot,
  socialLinks,
  socialLinksSlot,
  className,
  containerClassName,
  badgeClassName,
  headingClassName,
  descriptionClassName,
  countdownClassName,
  formClassName,
  socialLinksClassName,
}: HeroComingSoonCountdownProps): React.JSX.Element {
  const renderCountdown = () => {
    if (countdownSlot) return countdownSlot;
    if (!countdownItems || countdownItems.length === 0) return null;

    return countdownItems.map((item) => (
      <div key={item.label} className="flex flex-col items-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-muted/50 text-3xl font-bold text-foreground md:h-24 md:w-24 md:text-5xl">
          {item.value}
        </div>
        <span className="mt-2 text-sm text-muted-foreground">{item.label}</span>
      </div>
    ));
  };

  const renderForm = () => {
    if (formSlot) return formSlot;

    const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = submitAction;
    
    return (
      <>
        <Input
          type="email"
          placeholder={emailPlaceholder}
          className="h-12 flex-1 bg-muted/30 border-border/50"
        />
        <Pressable
          asButton
          className={actionClassName}
          {...pressableProps}
        >
          {children ?? (
            <>
              {icon}
              {label}
              {iconAfter}
            </>
          )}
        </Pressable>
      </>
    );
  };

  const renderSocialLinks = () => {
    if (socialLinksSlot) return socialLinksSlot;
    if (!socialLinks || socialLinks.length === 0) return null;

    return socialLinks.map((link, index) => (
      <Pressable
        key={index}
        href={link.href}
        className={cn("text-muted-foreground hover:text-foreground", link.className)}
      >
        {link.icon ?? (link.iconName && <DynamicIcon name={link.iconName} size={20} />)}
      </Pressable>
    ));
  };

  return (
    <section
      className={cn(
        "dark relative min-h-screen bg-background py-32",
        className,
      )}
    >
      <div className={cn("container flex flex-col items-center justify-center text-center", containerClassName)}>
        <div className={cn("inline-flex items-center gap-2 rounded-full border border-border/50 bg-muted/30 px-4 py-2 text-sm text-muted-foreground", badgeClassName)}>
          <DynamicIcon name={badgeIcon} size={16} className="text-primary" />
          <span>{badgeText}</span>
        </div>
        {heading && (
          typeof heading === "string" ? (
            <h1 className={cn("mt-8 max-w-3xl text-5xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl", headingClassName)}>
              {heading}
            </h1>
          ) : (
            <div className={cn("mt-8", headingClassName)}>{heading}</div>
          )
        )}
        {description && (
          typeof description === "string" ? (
            <p className={cn("mt-6 max-w-xl text-lg text-muted-foreground md:text-xl", descriptionClassName)}>
              {description}
            </p>
          ) : (
            <div className={cn("mt-6", descriptionClassName)}>{description}</div>
          )
        )}
        {(countdownSlot || (countdownItems && countdownItems.length > 0)) && (
          <div className={cn("mt-12 grid grid-cols-4 gap-4 md:gap-8", countdownClassName)}>
            {renderCountdown()}
          </div>
        )}
        <div className={cn("mt-12 flex w-full max-w-md flex-col gap-4 sm:flex-row", formClassName)}>
          {renderForm()}
        </div>
        {(socialLinksSlot || (socialLinks && socialLinks.length > 0)) && (
          <div className={cn("mt-16 flex items-center gap-6", socialLinksClassName)}>
            {renderSocialLinks()}
          </div>
        )}
      </div>
    </section>
  );
}
