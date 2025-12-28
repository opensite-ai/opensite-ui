"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../../ui/sheet";
import { AspectRatio } from "../../ui/aspect-ratio";
import { Input } from "../../ui/input";
import {
  logoPlaceholders,
  imagePlaceholders,
} from "../../../lib/mediaPlaceholders";

export interface OfferModalSheetNewsletterProps {
  /**
   * Logo configuration
   */
  logo?: {
    src: string;
    alt: string;
  };
  /**
   * Main title text for the offer
   */
  title?: string;
  /**
   * Description text below the title
   */
  description?: string;
  /**
   * Image configuration for the bottom section
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
   * Terms of use link URL
   */
  termsUrl?: string;
  /**
   * Privacy policy link URL
   */
  privacyUrl?: string;
  /**
   * Whether the sheet is open by default
   */
  defaultOpen?: boolean;
  /**
   * Callback when form is submitted
   */
  onSubmit?: (email: string) => void;
  /**
   * Additional CSS classes for the sheet content
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

const defaultProps: Partial<OfferModalSheetNewsletterProps> = {
  logo: {
    src: logoPlaceholders.logoMark,
    alt: "Opensite AI",
  },
  title: "Join Now & Enjoy 20% Off",
  description:
    "Join our mailing list for updates and offers. You can unsubscribe at any time.",
  image: {
    src: imagePlaceholders[1],
    alt: "Newsletter promotional image",
  },
  emailPlaceholder: "Email Address",
  buttonText: "Join",
  termsUrl: "#",
  privacyUrl: "#",
  defaultOpen: true,
};

/**
 * OfferModalSheetNewsletter - A side-sheet style newsletter signup modal that slides in from
 * the right. Features a logo, compelling headline, description, email signup form with rounded
 * inputs, legal consent links, and a square aspect ratio promotional image. The sheet design
 * provides a more immersive experience while maintaining easy dismissal. Perfect for premium
 * brands, lifestyle products, or any site wanting a sophisticated newsletter capture experience.
 *
 * @example
 * ```tsx
 * <OfferModalSheetNewsletter
 *   logo={{ src: "/logo.png", alt: "Brand Logo" }}
 *   title="Join Now & Enjoy 20% Off"
 *   description="Join our mailing list for updates and offers."
 *   image={{ src: "/promo.jpg", alt: "Promotional image" }}
 *   termsUrl="/terms"
 *   privacyUrl="/privacy"
 *   onSubmit={(email) => console.log('Subscribed:', email)}
 * />
 * ```
 */
export function OfferModalSheetNewsletter({
  logo = defaultProps.logo,
  title = defaultProps.title,
  description = defaultProps.description,
  image = defaultProps.image,
  emailPlaceholder = defaultProps.emailPlaceholder,
  buttonText = defaultProps.buttonText,
  termsUrl = defaultProps.termsUrl,
  privacyUrl = defaultProps.privacyUrl,
  defaultOpen = defaultProps.defaultOpen,
  onSubmit,
  className,
  optixFlowConfig,
}: OfferModalSheetNewsletterProps): React.JSX.Element {
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
    <Sheet defaultOpen={defaultOpen}>
      <SheetContent
        className={cn(
          "md:max-w-[600px] w-full max-md:max-w-[calc(100dvw-2.5rem)]! [&>button:hover>svg]:rotate-180 [&>button>svg]:size-5 [&>button>svg]:transition-all",
          className
        )}
      >
        <div className="max-h-full overflow-y-auto">
          <div className="space-y-4 p-6 md:p-16">
            <div className="basis-1/2 space-y-8">
              <SheetHeader className="gap-8 p-0">
                {logo && (
                  <Img
                    src={logo.src}
                    alt={logo.alt}
                    className="size-11 lg:size-16 dark:invert"
                    optixFlowConfig={optixFlowConfig}
                  />
                )}
                <div className="space-y-4">
                  <SheetTitle className="text-2xl font-medium leading-tight md:text-3xl lg:text-4xl">
                    {title}
                  </SheetTitle>
                  <SheetDescription className="text-xl leading-tight">
                    {description}
                  </SheetDescription>
                </div>
              </SheetHeader>
              <form onSubmit={handleSubmit}>
                <div className="flex items-start gap-3 max-sm:flex-col">
                  <div className="w-full flex-1">
                    <Input
                      type="email"
                      className="h-10 rounded-full px-6"
                      placeholder={emailPlaceholder}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      aria-invalid={!!error}
                    />
                    {error && (
                      <p className="text-destructive text-xs mt-1">{error}</p>
                    )}
                  </div>
                  <Pressable
                    size="lg"
                    variant="default"
                    className="sm:basis-30 rounded-full max-sm:w-full"
                    asButton
                    onClick={handleSubmit}
                  >
                    {buttonText}
                  </Pressable>
                </div>
              </form>
            </div>
            <p className="text-muted-foreground text-xs">
              By signing up, you consent to our{" "}
              <Pressable href={termsUrl} className="underline-offset-3 underline">
                Terms of Use
              </Pressable>{" "}
              and{" "}
              <Pressable href={privacyUrl} className="underline-offset-3 underline">
                Privacy Policy
              </Pressable>
              .
            </p>
          </div>
          {image && (
            <div className="h-1/2 basis-1/2">
              <AspectRatio ratio={1} className="overflow-hidden">
                <Img
                  src={image.src}
                  alt={image.alt}
                  className="block size-full object-cover object-center"
                  optixFlowConfig={optixFlowConfig}
                />
              </AspectRatio>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
