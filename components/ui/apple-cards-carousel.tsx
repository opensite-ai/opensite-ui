"use client";
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { DynamicIcon } from "./dynamic-icon";
import { Img } from "@page-speed/img";
import { Pressable } from "@/lib/Pressable";
import type { OptixFlowConfig } from "../../src/types";

export interface AppleCarouselProps {
  /**
   * Array of card elements to display in the carousel
   */
  items: JSX.Element[];
  /**
   * Initial scroll position in pixels
   * @default 0
   */
  initialScroll?: number;
  /**
   * Additional CSS classes for the carousel wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the carousel container
   */
  containerClassName?: string;
}

export interface AppleCarouselCardData {
  /**
   * Post index
   */
  idx?: number;
  /**
   * Image source URL
   */
  src: string;
  /**
   * Card title text
   */
  title: string;
  /**
   * Card category/eyebrow text
   */
  category: string;
  /**
   * Optional content to display (used if action opens a dialog/modal)
   */
  content?: React.ReactNode;
}

export interface AppleCarouselCardAction {
  /**
   * Action type - determines what happens when the card is clicked
   */
  type: "link" | "dialog" | "lightbox" | "none";
  /**
   * For "link" type - the URL to navigate to
   */
  href?: string;
  /**
   * For any action type - custom onClick handler
   */
  onClick?: (card: AppleCarouselCardData, index: number) => void;
}

export const AppleCarouselContext = createContext<{
  onCardAction: (index: number) => void;
  currentIndex: number;
}>({
  onCardAction: () => {},
  currentIndex: 0,
});

export const AppleCarousel = ({
  items,
  initialScroll = 0,
  className,
  containerClassName,
}: AppleCarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeftHandler = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRightHandler = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleCardAction = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384; // (md:w-96)
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const isMobile = () => {
    return window && window.innerWidth < 768;
  };

  return (
    <AppleCarouselContext.Provider
      value={{ onCardAction: handleCardAction, currentIndex }}
    >
      <div className={cn("relative w-full", className)}>
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-4 [scrollbar-width:none] md:py-10"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div
            className={cn(
              "absolute right-0 z-1000 h-auto w-[5%] overflow-hidden bg-linear-to-l",
            )}
          ></div>

          <div
            className={cn(
              "flex flex-row justify-start gap-4 pl-4",
              "mx-auto max-w-7xl", // remove max-w-4xl if you want the carousel to span the full width of its container
              containerClassName,
            )}
          >
            {items.map((item, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.2 * index,
                  ease: "easeOut",
                }}
                key={"card" + index}
                className="rounded-3xl last:pr-[5%] md:last:pr-[33%]"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mr-10 flex justify-end gap-2">
          <Pressable
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full disabled:opacity-50"
            onClick={scrollLeftHandler}
            disabled={!canScrollLeft}
            asButton
          >
            <DynamicIcon name="lucide/arrow-left" className="h-6 w-6" />
          </Pressable>
          <Pressable
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full disabled:opacity-50"
            onClick={scrollRightHandler}
            disabled={!canScrollRight}
            asButton
          >
            <DynamicIcon name="lucide/arrow-right" className="h-6 w-6" />
          </Pressable>
        </div>
      </div>
    </AppleCarouselContext.Provider>
  );
};

export interface AppleCarouselCardProps {
  /**
   * Card data configuration
   */
  card: AppleCarouselCardData;
  /**
   * Card index in the carousel
   */
  index: number;
  /**
   * Action configuration for card clicks
   * @default { type: "none" }
   */
  action?: AppleCarouselCardAction;
  /**
   * Enable layout animations (for shared element transitions)
   * @default false
   */
  layout?: boolean;
  /**
   * OptixFlow configuration for optimized image loading
   */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * Additional CSS classes for the card wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the card image
   */
  imageClassName?: string;
  /**
   * Additional CSS classes for the card content area
   */
  contentClassName?: string;
}

/**
 * AppleCarouselCard - Individual card component for the Apple-style carousel.
 * Supports various action types: link navigation, dialog/lightbox opening, or custom handlers.
 */
export const AppleCarouselCard = ({
  card,
  index,
  action = { type: "none" },
  layout = false,
  optixFlowConfig,
  className,
  imageClassName,
  contentClassName,
}: AppleCarouselCardProps) => {
  const { onCardAction } = useContext(AppleCarouselContext);

  const handleClick = () => {
    onCardAction(index);

    if (action.onClick) {
      action.onClick(card, index);
    }
  };

  const cardContent = (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-linear-to-b from-black/50 via-transparent to-transparent" />
      <div className={cn("relative z-40 p-8", contentClassName)}>
        <motion.p
          layoutId={layout ? `category-${card.category}-${index}` : undefined}
          className="text-left font-sans text-sm font-medium text-white md:text-base"
        >
          {card.category}
        </motion.p>
        <motion.p
          layoutId={layout ? `title-${card.title}-${index}` : undefined}
          className="mt-2 max-w-xs text-left font-sans text-xl font-semibold text-balance text-white md:text-3xl"
        >
          {card.title}
        </motion.p>
      </div>
      <Img
        src={card.src}
        alt={card.title}
        className={cn(
          "absolute inset-0 z-10 h-full w-full object-cover",
          imageClassName,
        )}
        optixFlowConfig={optixFlowConfig}
      />
    </>
  );

  const cardClasses = cn(
    "relative z-10 flex h-80 w-56 flex-col items-start justify-start overflow-hidden rounded-3xl bg-gray-100 md:h-160 md:w-96 dark:bg-neutral-900",
    className,
  );

  // Render as Pressable (link or button)
  if (action.type === "link" && action.href) {
    return (
      <motion.div
        layoutId={layout ? `card-${card.title}-${index}` : undefined}
        className={cardClasses}
      >
        <Pressable
          href={action.href}
          onClick={handleClick}
          className="w-full h-full"
        >
          {cardContent}
        </Pressable>
      </motion.div>
    );
  }

  // Render as clickable div (for dialog, lightbox, or custom actions)
  if (action.type !== "none") {
    return (
      <motion.div
        layoutId={layout ? `card-${card.title}-${index}` : undefined}
        className={cardClasses}
      >
        <Pressable onClick={handleClick} asButton className="w-full h-full">
          {cardContent}
        </Pressable>
      </motion.div>
    );
  }

  // Render as non-interactive card
  return (
    <motion.div
      layoutId={layout ? `card-${card.title}-${index}` : undefined}
      className={cardClasses}
    >
      {cardContent}
    </motion.div>
  );
};
