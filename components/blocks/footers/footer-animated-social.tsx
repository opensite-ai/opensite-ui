"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";

/**
 * Social link configuration
 */
export interface FooterAnimatedSocialLink {
  /** Display name */
  name: string;
  /** Link URL */
  href: string;
}

/**
 * Props for the FooterAnimatedSocial component
 */
export interface FooterAnimatedSocialProps {
  /** Additional CSS classes */
  className?: string;
  /** Main heading text */
  heading?: string;
  /** Description text */
  description?: string;
  /** CTA button text */
  ctaText?: string;
  /** CTA button URL */
  ctaUrl?: string;
  /** Social media links */
  socialLinks?: FooterAnimatedSocialLink[];
  /** Copyright text */
  copyright?: string;
}

const defaultSocialLinks: FooterAnimatedSocialLink[] = [
  { name: "Instagram", href: "#" },
  { name: "X (Twitter)", href: "#" },
];

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
  className,
  heading = "Connect with Me",
  description = "No commitments. Just a quick chat to see if we click.",
  ctaText = "Get in Touch",
  ctaUrl = "#",
  socialLinks = defaultSocialLinks,
  copyright = `© Copyright ${new Date().getFullYear()}. All rights Reserved.`,
}: FooterAnimatedSocialProps): React.JSX.Element {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <footer>
          <div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col justify-between md:flex-row md:items-center"
            >
              <div className="space-y-8">
                <motion.div variants={itemVariants} className="space-y-6">
                  <h2 className="text-4xl leading-tight font-bold text-foreground lg:text-5xl">
                    {heading}
                  </h2>
                  <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Pressable
                    href={ctaUrl}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
                  >
                    {ctaText}
                  </Pressable>
                </motion.div>
              </div>

              <div className="mt-5 space-y-8 md:mt-0">
                <motion.div variants={itemVariants}>
                  <div className="space-y-6">
                    {socialLinks.map((link) => (
                      <motion.div
                        key={link.name}
                        variants={itemVariants}
                        whileHover={{ x: 4 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                      >
                        <Pressable
                          href={link.href}
                          className="group flex items-center gap-2 py-2 text-foreground transition-colors hover:text-foreground/80"
                        >
                          <span className="text-xl font-medium">
                            {link.name}
                          </span>
                          <DynamicIcon
                            name="lucide/arrow-up-right"
                            size={24}
                            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </Pressable>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-16"
            >
              <motion.div variants={itemVariants}>
                <div className="mb-8 h-px w-full bg-border" />
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"
              >
                <p className="text-sm text-muted-foreground">{copyright}</p>

                <div className="flex items-center gap-6 text-sm">
                  <span className="text-muted-foreground">
                    <motion.a
                      href="https://opensite.ai"
                      className="underline underline-offset-4 transition-colors hover:text-foreground"
                      whileHover={{ scale: 1.05 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      target="_blank"
                    >
                      AI Website and Automation Platform by Opensite
                    </motion.a>
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </footer>
      </div>
    </section>
  );
}
