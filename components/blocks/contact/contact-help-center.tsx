"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";

export interface ContactHelpCenterItem {
  /**
   * Card title
   */
  title: string;
  /**
   * Supporting description text
   */
  subtitle?: string;
  /**
   * Icon name for the card
   */
  icon: string;
  /**
   * Optional link destination
   */
  href?: string;
}

export interface ContactHelpCenterProps {
  /**
   * Eyebrow label above the heading
   */
  eyebrow?: React.ReactNode;
  /**
   * Heading text for the left column
   */
  heading?: React.ReactNode;
  /**
   * Description text for the left column
   */
  description?: React.ReactNode;
  /**
   * Title for the contact card list
   */
  cardTitle?: React.ReactNode;
  /**
   * Contact items to display
   */
  contactItems?: ContactHelpCenterItem[];
  /**
   * Custom slot for rendering contact items (overrides contactItems array)
   */
  contactItemsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the content wrapper
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the left column
   */
  leftColumnClassName?: string;
  /**
   * Additional CSS classes for the eyebrow text
   */
  eyebrowClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the card panel
   */
  cardPanelClassName?: string;
  /**
   * Additional CSS classes for the card title
   */
  cardTitleClassName?: string;
  /**
   * Additional CSS classes for the contact items container
   */
  contactItemsClassName?: string;
}

const defaultContactItems: ContactHelpCenterItem[] = [
  {
    title: "Schedule a Strategy Call",
    subtitle: "Book a coverage review with an OpenSite AI advisor.",
    icon: "lucide/calendar-check",
    href: "/schedule",
  },
  {
    title: "Email the Team",
    subtitle: "Reach us anytime at hello@opensite.ai.",
    icon: "lucide/mail",
    href: "mailto:hello@opensite.ai",
  },
  {
    title: "Call Support",
    subtitle: "Talk to a specialist at +1 (415) 555-0192.",
    icon: "lucide/phone",
    href: "tel:+14155550192",
  },
];

/**
 * ContactHelpCenter - Split layout with help copy on the left and
 * a contact card stack on the right. Works well for service centers,
 * support hubs, and onboarding touchpoints.
 */
export function ContactHelpCenter({
  eyebrow = "Support Center",
  heading = "Need help navigating coverage decisions?",
  description =
    "Our OpenSite AI advisors are ready to walk through policies, claims, and next steps so you can move forward with confidence.",
  cardTitle = "Contact Our Team",
  contactItems = defaultContactItems,
  contactItemsSlot,
  className,
  containerClassName,
  contentClassName,
  leftColumnClassName,
  eyebrowClassName,
  headingClassName,
  descriptionClassName,
  cardPanelClassName,
  cardTitleClassName,
  contactItemsClassName,
}: ContactHelpCenterProps): React.JSX.Element {
  const renderContactItems = () => {
    if (contactItemsSlot) return contactItemsSlot;
    return contactItems.map((item, idx) => (
      <Pressable
        key={`${item.title}-${idx}`}
        href={item.href}
        className="flex items-start gap-4 rounded-lg p-4 transition-colors hover:bg-muted/40"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <DynamicIcon name={item.icon} size={20} />
        </div>
        <div>
          <p className="font-semibold text-foreground">
            {item.title}
          </p>
          {item.subtitle ? (
            <p className="text-sm text-muted-foreground">
              {item.subtitle}
            </p>
          ) : null}
        </div>
      </Pressable>
    ));
  };

  return (
    <section className={cn("py-24", className)}>
      <div className={cn("container", containerClassName)}>
        <div className={cn("rounded-3xl bg-linear-to-br from-primary/5 via-background to-background p-8 md:p-12", contentClassName)}>
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <div className={cn("space-y-5", leftColumnClassName)}>
              {eyebrow && (
                typeof eyebrow === "string" ? (
                  <p className={cn("text-sm font-semibold uppercase tracking-[0.2em] text-primary", eyebrowClassName)}>
                    {eyebrow}
                  </p>
                ) : (
                  <div className={eyebrowClassName}>{eyebrow}</div>
                )
              )}
              {heading && (
                typeof heading === "string" ? (
                  <h2 className={cn("text-3xl font-bold text-foreground md:text-4xl", headingClassName)}>
                    {heading}
                  </h2>
                ) : (
                  <div className={headingClassName}>{heading}</div>
                )
              )}
              {description && (
                typeof description === "string" ? (
                  <p className={cn("text-muted-foreground", descriptionClassName)}>
                    {description}
                  </p>
                ) : (
                  <div className={descriptionClassName}>{description}</div>
                )
              )}
            </div>

            <div className={cn("rounded-2xl bg-background p-8 shadow-lg", cardPanelClassName)}>
              {cardTitle ? (
                typeof cardTitle === "string" ? (
                  <h3 className={cn("text-xl font-bold text-foreground", cardTitleClassName)}>
                    {cardTitle}
                  </h3>
                ) : (
                  <div className={cardTitleClassName}>{cardTitle}</div>
                )
              ) : null}

              <div className={cn("mt-6 space-y-4", contactItemsClassName)}>
                {renderContactItems()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
