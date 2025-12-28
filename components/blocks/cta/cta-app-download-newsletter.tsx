"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import { Input } from "../../ui/input";

export interface CtaAppDownloadNewsletterProps {
  /**
   * App section heading
   */
  appHeading?: string;
  /**
   * App section description
   */
  appDescription?: string;
  /**
   * App Store button URL
   */
  appStoreUrl?: string;
  /**
   * Google Play button URL
   */
  googlePlayUrl?: string;
  /**
   * Phone mockup image URL
   */
  phoneMockupImage?: string;
  /**
   * Newsletter section heading
   */
  newsletterHeading?: string;
  /**
   * Newsletter section description
   */
  newsletterDescription?: string;
  /**
   * Newsletter button text
   */
  newsletterButtonText?: string;
  /**
   * Email input placeholder
   */
  emailPlaceholder?: string;
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
 * CtaAppDownloadNewsletter - A two-column CTA grid featuring an app download
 * section with phone mockup and a newsletter subscription form. Perfect for
 * mobile app promotions.
 *
 * @example
 * ```tsx
 * <CtaAppDownloadNewsletter
 *   appHeading="Download Our App"
 *   appDescription="Get the best experience on mobile."
 *   appStoreUrl="https://apps.apple.com"
 *   googlePlayUrl="https://play.google.com"
 *   newsletterHeading="Stay Updated"
 *   newsletterDescription="Subscribe to our newsletter."
 * />
 * ```
 */
export function CtaAppDownloadNewsletter({
  appHeading = "Download Our App",
  appDescription = "Get the best experience on mobile. Download our app and access all features on the go.",
  appStoreUrl = "#",
  googlePlayUrl = "#",
  phoneMockupImage = imagePlaceholders[8],
  newsletterHeading = "Stay Updated",
  newsletterDescription = "Subscribe to our newsletter and never miss an update. Get the latest news, tips, and exclusive offers.",
  newsletterButtonText = "Subscribe",
  emailPlaceholder = "Enter your email",
  className,
  optixFlowConfig,
}: CtaAppDownloadNewsletterProps): React.JSX.Element {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-primary/10 to-primary/5 p-8 lg:p-12">
            <div className="relative z-10 max-w-sm">
              <h2 className="mb-4 text-2xl font-bold md:text-3xl">
                {appHeading}
              </h2>
              <p className="mb-8 text-muted-foreground">{appDescription}</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Pressable
                  href={appStoreUrl}
                  variant="default"
                  className="gap-2"
                  asButton
                >
                  <DynamicIcon name="simple-icons/apple" size={20} />
                  App Store
                </Pressable>
                <Pressable
                  href={googlePlayUrl}
                  variant="outline"
                  className="gap-2"
                  asButton
                >
                  <DynamicIcon name="simple-icons/googleplay" size={20} />
                  Google Play
                </Pressable>
              </div>
            </div>
            <div className="absolute -right-16 -bottom-16 h-64 w-48 rotate-12 opacity-20 lg:h-80 lg:w-60">
              <Img
                src={phoneMockupImage}
                alt=""
                className="h-full w-full object-contain"
                optixFlowConfig={optixFlowConfig}
              />
            </div>
          </div>

          <div className="flex flex-col justify-center rounded-2xl border bg-card p-8 lg:p-12">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">
              {newsletterHeading}
            </h2>
            <p className="mb-8 text-muted-foreground">
              {newsletterDescription}
            </p>
            <form className="flex flex-col gap-3 sm:flex-row">
              <Input
                type="email"
                placeholder={emailPlaceholder}
                className="flex-1"
              />
              <Pressable
                href="#"
                variant="default"
                className="shrink-0"
                asButton
                onClick={(e) => e.preventDefault()}
              >
                {newsletterButtonText}
                <DynamicIcon name="lucide/send" size={16} className="ml-2" />
              </Pressable>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
