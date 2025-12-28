"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import { DynamicIcon } from "../../ui/dynamic-icon";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "../../ui/dialog";
import { Input } from "../../ui/input";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface OfferModalMembershipImageProps {
  /**
   * Overline text displayed above the title
   */
  overline?: string;
  /**
   * Main title text for the offer
   */
  title?: string;
  /**
   * Description text displayed below the form
   */
  description?: string;
  /**
   * Image configuration for the header
   */
  image?: {
    src: string;
    alt: string;
  };
  /**
   * Placeholder text for the email input
   */
  emailPlaceholder?: string;
  /**
   * Text for the submit button
   */
  buttonText?: string;
  /**
   * Whether the dialog is open by default
   */
  defaultOpen?: boolean;
  /**
   * Callback when form is submitted
   */
  onSubmit?: (email: string) => void;
  /**
   * Additional CSS classes for the dialog content
   */
  className?: string;
  /**
   * Optional configuration for OptixFlow image optimization
   */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultProps: Partial<OfferModalMembershipImageProps> = {
  overline: "Treat Yourself!",
  title: "Become a Member & Enjoy 20% Off",
  description:
    "Sign up to receive our latest updates — you can unsubscribe whenever you like.",
  image: {
    src: imagePlaceholders[0],
    alt: "Promotional offer image",
  },
  emailPlaceholder: "Email Address",
  buttonText: "Get Offer",
  defaultOpen: true,
};

/**
 * OfferModalMembershipImage - A visually rich membership offer modal featuring a header image,
 * overline text, compelling title, email signup form with icon, and descriptive footer text.
 * Includes responsive design with mobile-optimized layout and hover animations on the close button.
 * Ideal for e-commerce membership programs, exclusive offers, or premium newsletter signups.
 *
 * @example
 * ```tsx
 * <OfferModalMembershipImage
 *   overline="Treat Yourself!"
 *   title="Become a Member & Enjoy 20% Off"
 *   description="Sign up to receive our latest updates."
 *   image={{ src: "/promo.jpg", alt: "Promotional image" }}
 *   onSubmit={(email) => console.log('Subscribed:', email)}
 * />
 * ```
 */
export function OfferModalMembershipImage({
  overline = defaultProps.overline,
  title = defaultProps.title,
  description = defaultProps.description,
  image = defaultProps.image,
  emailPlaceholder = defaultProps.emailPlaceholder,
  buttonText = defaultProps.buttonText,
  defaultOpen = defaultProps.defaultOpen,
  onSubmit,
  className,
  optixFlowConfig,
}: OfferModalMembershipImageProps): React.JSX.Element {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter an email address");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (onSubmit) {
      onSubmit(email);
    }
  };

  return (
    <Dialog defaultOpen={defaultOpen}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          "data-[state=closed]:slide-out-to-bottom-30 data-[state=open]:slide-in-from-bottom-30 sm:max-w-[760px] lg:max-w-[470px] group max-h-[calc(100dvh-2rem)] max-w-full gap-0 rounded-none border-none p-0 max-lg:bottom-0 max-lg:top-auto max-lg:translate-y-0",
          className
        )}
      >
        <div className="absolute -end-px -top-px z-10">
          <DialogClose asChild>
            <Pressable
              size="icon-sm"
              variant="default"
              className="origin-top-right rounded-none transition-all duration-300 lg:scale-50 lg:opacity-0 lg:group-hover:scale-100 lg:group-hover:opacity-100 [@media(hover:none)]:scale-100 [@media(hover:none)]:opacity-100"
              asButton
            >
              <DynamicIcon name="lucide/x" size={16} />
            </Pressable>
          </DialogClose>
        </div>
        {image && (
          <div className="max-h-[290px] h-full overflow-hidden max-lg:hidden">
            <Img
              src={image.src}
              alt={image.alt}
              className="block size-full object-cover object-[50%_15%]"
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        )}
        <div className="lg:px-15 space-y-5 overflow-y-auto px-9 py-5 lg:py-7">
          <div className="space-y-2.5">
            <p className="text-center text-sm font-bold uppercase leading-none">
              {overline}
            </p>
            <DialogTitle className="text-center text-3xl font-bold">
              {title}
            </DialogTitle>
          </div>
          <form className="space-y-2.5" onSubmit={handleSubmit}>
            <div className="flex items-center gap-2.5">
              <div className="relative flex-1">
                <Input
                  type="email"
                  placeholder={emailPlaceholder}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  className="pr-10"
                  aria-invalid={!!error}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <DynamicIcon name="lucide/mail" size={16} />
                </div>
              </div>
              <Pressable
                size="icon"
                variant="default"
                className="lg:hidden"
                asButton
                onClick={handleSubmit}
              >
                <DynamicIcon name="lucide/arrow-right" size={16} />
              </Pressable>
            </div>
            {error && (
              <p className="text-destructive text-xs">{error}</p>
            )}
            <Pressable
              className="w-full max-lg:hidden"
              variant="default"
              asButton
              onClick={handleSubmit}
            >
              {buttonText}
            </Pressable>
          </form>
          <DialogFooter>
            <DialogDescription className="text-muted-foreground text-center text-xs leading-relaxed">
              {description}
            </DialogDescription>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
