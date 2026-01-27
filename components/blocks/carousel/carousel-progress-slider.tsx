"use client";

/**
 * CarouselProgressSlider
 *
 * A context-based slider with animated progress bar indicators for each slide.
 * Features auto-advancing slides with visual progress feedback and smooth
 * transitions between content panels.
 *
 * Use cases:
 * - Feature walkthroughs with timed progression
 * - Onboarding flows with step indicators
 * - Product tours with progress tracking
 * - Content showcases with auto-advance
 */

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

interface ProgressSliderContextType {
  active: string;
  progress: number;
  handleButtonClick: (value: string) => void;
  vertical: boolean;
}

const ProgressSliderContext = React.createContext<
  ProgressSliderContextType | undefined
>(undefined);

function useProgressSliderContext(): ProgressSliderContextType {
  const context = React.useContext(ProgressSliderContext);
  if (!context) {
    throw new Error(
      "useProgressSliderContext must be used within a ProgressSlider"
    );
  }
  return context;
}

interface SliderBtnProps {
  children: React.ReactNode;
  value: string;
  className?: string;
  progressBarClass?: string;
}

function SliderBtn({
  children,
  value,
  className,
  progressBarClass,
}: SliderBtnProps) {
  const { active, progress, handleButtonClick, vertical } =
    useProgressSliderContext();

  return (
    <button
      className={cn(
        "relative",
        active === value ? "opacity-100" : "opacity-50",
        className
      )}
      onClick={() => handleButtonClick(value)}
    >
      {children}
      <div
        className="absolute inset-0 -z-10 max-h-full max-w-full overflow-hidden"
        role="progressbar"
        aria-valuenow={active === value ? progress : 0}
      >
        <span
          className={cn("absolute left-0", progressBarClass)}
          style={{
            [vertical ? "height" : "width"]:
              active === value ? `${progress}%` : "0%",
          }}
        />
      </div>
    </button>
  );
}

interface SliderWrapperProps {
  children: React.ReactNode;
  value: string;
  className?: string;
}

function SliderWrapper({ children, value, className }: SliderWrapperProps) {
  const { active } = useProgressSliderContext();

  return (
    <AnimatePresence mode="popLayout">
      {active === value && (
        <motion.div
          key={value}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn("", className)}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export interface ProgressSlide {
  /**
   * Unique identifier for the slide
   */
  id: string;
  /**
   * Slide title
   */
  title?: React.ReactNode;
  /**
   * Slide description
   */
  description?: React.ReactNode;
  /**
   * Image source URL
   */
  image: string;
  /**
   * Additional CSS classes for the slide
   */
  className?: string;
  /**
   * Additional CSS classes for the image
   */
  imageClassName?: string;
}

export interface CarouselProgressSliderProps {
  /**
   * Array of slides
   */
  slides?: ProgressSlide[];
  /**
   * Custom slot for rendering slides (overrides slides array)
   */
  slidesSlot?: React.ReactNode;
  /**
   * Duration for each slide in milliseconds
   */
  duration?: number;
  /**
   * Fast forward duration in milliseconds
   */
  fastDuration?: number;
  /**
   * Whether to use vertical progress bars
   */
  vertical?: boolean;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the content grid
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the image area
   */
  imageClassName?: string;
  /**
   * Additional CSS classes for the navigation area
   */
  navigationClassName?: string;
  /**
   * Additional CSS classes for the navigation buttons
   */
  buttonClassName?: string;
  /**
   * Additional CSS classes for the progress bar
   */
  progressBarClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
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
}

export function CarouselProgressSlider({
  slides,
  slidesSlot,
  duration = 5000,
  fastDuration = 400,
  vertical = false,
  className,
  containerClassName,
  contentClassName,
  imageClassName,
  navigationClassName,
  buttonClassName,
  progressBarClassName,
  optixFlowConfig,
  background = "white",
  spacing = "xl",
  pattern,
  patternOpacity,
}: CarouselProgressSliderProps): React.JSX.Element {
  const [active, setActive] = React.useState<string>(slides[0].id);
  const [progress, setProgress] = React.useState<number>(0);
  const [isFastForward, setIsFastForward] = React.useState<boolean>(false);
  const frame = React.useRef<number>(0);
  const firstFrameTime = React.useRef<number>(performance.now());
  const targetValue = React.useRef<string | null>(null);

  const sliderValues = React.useMemo(
    () => slides.map((slide) => slide.id),
    [slides]
  );

  React.useEffect(() => {
    if (sliderValues.length > 0) {
      firstFrameTime.current = performance.now();
      frame.current = requestAnimationFrame(animate);
    }
    return () => {
      cancelAnimationFrame(frame.current);
    };
  }, [sliderValues, active, isFastForward]);

  const animate = (now: number) => {
    const currentDuration = isFastForward ? fastDuration : duration;
    const elapsedTime = now - firstFrameTime.current;
    const timeFraction = elapsedTime / currentDuration;

    if (timeFraction <= 1) {
      setProgress(
        isFastForward
          ? progress + (100 - progress) * timeFraction
          : timeFraction * 100
      );
      frame.current = requestAnimationFrame(animate);
    } else {
      if (isFastForward) {
        setIsFastForward(false);
        if (targetValue.current !== null) {
          setActive(targetValue.current);
          targetValue.current = null;
        }
      } else {
        const currentIndex = sliderValues.indexOf(active);
        const nextIndex = (currentIndex + 1) % sliderValues.length;
        setActive(sliderValues[nextIndex]);
      }
      setProgress(0);
      firstFrameTime.current = performance.now();
    }
  };

  const handleButtonClick = (value: string) => {
    if (value !== active) {
      const elapsedTime = performance.now() - firstFrameTime.current;
      const currentProgress = (elapsedTime / duration) * 100;
      setProgress(currentProgress);
      targetValue.current = value;
      setIsFastForward(true);
      firstFrameTime.current = performance.now();
    }
  };

  return (
    <ProgressSliderContext.Provider
      value={{ active, progress, handleButtonClick, vertical }}
    >
      <Section
        background={background}
        spacing={spacing}
        className={cn(className)}
        pattern={pattern}
        patternOpacity={patternOpacity}
      >
        <div className={cn("container mx-auto px-4", containerClassName)}>
          <div className={cn("grid gap-8 lg:grid-cols-2", contentClassName)}>
            {/* Content area */}
            <div className={cn("relative min-h-[300px]", imageClassName)}>
              {slidesSlot ? (
                slidesSlot
              ) : (
                slides.map((slide) => (
                  <SliderWrapper
                    key={slide.id}
                    value={slide.id}
                    className={cn("absolute inset-0", slide.className)}
                  >
                    <div className="aspect-video overflow-hidden rounded-lg">
                      <Img
                        src={slide.image}
                        alt={typeof slide.title === "string" ? slide.title : `Slide ${slide.id}`}
                        className={cn("h-full w-full object-cover", slide.imageClassName)}
                        optixFlowConfig={optixFlowConfig}
                      />
                    </div>
                  </SliderWrapper>
                ))
              )}
            </div>

            {/* Navigation buttons */}
            <div className={cn("flex flex-col justify-center gap-4", navigationClassName)}>
              {slides.map((slide) => (
                <SliderBtn
                  key={slide.id}
                  value={slide.id}
                  className={cn("rounded-lg border p-4 text-left transition-colors hover:bg-muted", buttonClassName)}
                  progressBarClass={cn("bottom-0 h-1 bg-primary", progressBarClassName)}
                >
                  {slide.title && (
                    typeof slide.title === "string" ? (
                      <h3 className="text-lg font-semibold">{slide.title}</h3>
                    ) : (
                      <div>{slide.title}</div>
                    )
                  )}
                  {slide.description && (
                    typeof slide.description === "string" ? (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {slide.description}
                      </p>
                    ) : (
                      <div className="mt-1">{slide.description}</div>
                    )
                  )}
                </SliderBtn>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </ProgressSliderContext.Provider>
  );
}

