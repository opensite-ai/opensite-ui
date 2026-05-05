"use client";

import * as React from "react";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { FooterCopyright } from "../../ui/footer-copyright";
import { BrandAttribution } from "../../ui/brand-attribution";
import { SocialLinkIcon } from "../../ui/social-link-icon";
import { Section } from "../../ui/section";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";
import type { FooterSocialLink } from "./types";

/**
 * Props for the FooterAnimatedSocial component
 */
export interface FooterAnimatedSocialProps {
  /** Main heading text */
  heading?: React.ReactNode;
  /** Description text */
  description?: React.ReactNode;
  /** CTA button text */
  ctaText?: React.ReactNode;
  /** CTA button URL */
  ctaUrl?: string;
  /** Social media links */
  socialLinks?: FooterSocialLink[];
  /** Brand/company name for the copyright notice */
  copyright?: string;
  /** Additional CSS classes for the section wrapper */
  className?: string;
  /** Additional CSS classes for the content wrapper */
  contentClassName?: string;
  /** Additional CSS classes for the main layout */
  layoutClassName?: string;
  /** Additional CSS classes for the left column */
  leftColumnClassName?: string;
  /** Additional CSS classes for the heading */
  headingClassName?: string;
  /** Additional CSS classes for the description */
  descriptionClassName?: string;
  /** Additional CSS classes for the CTA button */
  ctaClassName?: string;
  /** Additional CSS classes for the right column */
  rightColumnClassName?: string;
  /** Additional CSS classes for the social links section */
  socialLinksClassName?: string;
  /** Additional CSS classes for social link items */
  socialLinkClassName?: string;
  /** Additional CSS classes for the bottom section */
  bottomClassName?: string;
  /** Additional CSS classes for the separator */
  separatorClassName?: string;
  /** Additional CSS classes for the copyright section */
  copyrightClassName?: string;
  /** Section background variant */
  background?: SectionBackground;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /** Section spacing variant */
  spacing?: SectionSpacing;
  /** Optional background pattern */
  pattern?: PatternName;
  /** Pattern opacity (0-1) */
  patternOpacity?: number;
  /** Optional Section ID */
  sectionId?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

/**
 * FooterAnimatedSocial - An animated footer with Framer Motion effects and social links.
 *
 * Features smooth entrance animations, a prominent heading with CTA button,
 * animated social links with hover effects, and a clean separator. Ideal for
 * modern websites, portfolios, and creative projects that want to add visual
 * polish and interactivity to their footer.
 */
export function FooterAnimatedSocial({
  sectionId = "footer-animated-social",
  heading,
  description,
  ctaText,
  ctaUrl,
  socialLinks,
  copyright,
  className,
  contentClassName,
  layoutClassName,
  leftColumnClassName,
  headingClassName,
  descriptionClassName,
  ctaClassName,
  rightColumnClassName,
  socialLinksClassName,
  socialLinkClassName,
  bottomClassName,
  separatorClassName,
  copyrightClassName,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "py-6 md:py-32",
  pattern,
  patternOpacity,
}: FooterAnimatedSocialProps): React.JSX.Element {
  const socialLinksContent = useMemo(() => {
    if (!socialLinks || socialLinks.length === 0) return null;

    return socialLinks.map((link, idx) => (
      <motion.div
        key={idx}
        variants={itemVariants}
        whileHover={{ x: 4 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      >
        <SocialLinkIcon
          href={link.href}
          label={link.label}
          iconNameOverride={link.iconNameOverride}
          iconSize={24}
          className={cn(
            "group flex items-center gap-2 py-2 transition-colors hover:opacity-70",
            socialLinkClassName,
          )}
        />
      </motion.div>
    ));
  }, [socialLinks, socialLinkClassName]);

  return (
    <Section
      id="footer-animated-social"
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(className)}
      containerClassName={containerClassName}
    >
      <div className={cn(contentClassName)}>
        <footer>
          <div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={cn(
                "flex flex-col justify-between md:flex-row md:items-center",
                layoutClassName,
              )}
            >
              <div className={cn("space-y-8", leftColumnClassName)}>
                <motion.div variants={itemVariants} className="space-y-6">
                  <h2
                    className={cn(
                      "text-4xl leading-tight font-bold lg:text-5xl",
                      headingClassName,
                    )}
                  >
                    {heading}
                  </h2>
                  <p
                    className={cn(
                      "max-w-md text-lg leading-relaxed opacity-80",
                      descriptionClassName,
                    )}
                  >
                    {description}
                  </p>
                </motion.div>

                {ctaUrl && ctaText && (
                  <motion.div variants={itemVariants}>
                    <Pressable
                      href={ctaUrl}
                      className={cn(
                        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border h-11 px-8 hover:opacity-80",
                        ctaClassName,
                      )}
                    >
                      {ctaText}
                    </Pressable>
                  </motion.div>
                )}
              </div>

              <div
                className={cn(
                  "flex flex-row md:flex-col flex-wrap items-center justify-center gap-4 md:gap-2",
                  rightColumnClassName,
                )}
              >
                <motion.div variants={itemVariants}>
                  <div
                    className={cn(
                      "flex flex-row md:flex-col items-center gap-4 md:gap-6",
                      socialLinksClassName,
                    )}
                  >
                    {socialLinksContent}
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={cn("mt-16", bottomClassName)}
            >
              <motion.div variants={itemVariants}>
                <div
                  className={cn(
                    "mb-8 h-px w-full opacity-20",
                    separatorClassName,
                  )}
                  style={{ backgroundColor: "currentColor" }}
                />
              </motion.div>

              <motion.div
                variants={itemVariants}
                className={cn(
                  "flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center",
                  copyrightClassName,
                )}
              >
                <FooterCopyright
                  copyright={copyright}
                  className="text-sm opacity-70"
                />

                <div className="flex items-center gap-6 text-sm opacity-70">
                  <BrandAttribution
                    internalBrandSlug="open_site_ai"
                    optionIndex={2}
                    variant="span"
                    linkClassName="underline underline-offset-4 transition-colors hover:opacity-100"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </footer>
      </div>
    </Section>
  );
}
