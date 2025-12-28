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

// Context types
interface ProgressSliderContextType {
  active: string;
  progress: number;
  handleButtonClick: (value: string) => void;
  vertical: boolean;
}

// Create context
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

// Slider Button component
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

// Slider Wrapper component
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

// Main component props
export interface CarouselProgressSliderProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
  duration?: number;
  fastDuration?: number;
  vertical?: boolean;
  slides?: Array<{
    id: string;
    title: string;
    description: string;
    image: string;
  }>;
}

export function CarouselProgressSlider({
  className,
  optixFlowConfig,
  duration = 5000,
  fastDuration = 400,
  vertical = false,
  slides,
}: CarouselProgressSliderProps): React.JSX.Element {
  const defaultSlides = React.useMemo(
    () =>
      Array.from({ length: 4 }).map((_, index) => ({
        id: `slide-${index}`,
        title: `Feature ${index + 1}`,
        description: `Discover the amazing capabilities of feature ${index + 1}`,
        image: imagePlaceholders[index % imagePlaceholders.length],
      })),
    []
  );

  const sliderSlides = slides || defaultSlides;
  const [active, setActive] = React.useState<string>(sliderSlides[0].id);
  const [progress, setProgress] = React.useState<number>(0);
  const [isFastForward, setIsFastForward] = React.useState<boolean>(false);
  const frame = React.useRef<number>(0);
  const firstFrameTime = React.useRef<number>(performance.now());
  const targetValue = React.useRef<string | null>(null);

  const sliderValues = React.useMemo(
    () => sliderSlides.map((slide) => slide.id),
    [sliderSlides]
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
      <section className={cn("relative w-full py-12", className)}>
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Content area */}
            <div className="relative min-h-[300px]">
              {sliderSlides.map((slide) => (
                <SliderWrapper
                  key={slide.id}
                  value={slide.id}
                  className="absolute inset-0"
                >
                  <div className="aspect-video overflow-hidden rounded-lg">
                    <Img
                      src={slide.image}
                      alt={slide.title}
                      className="h-full w-full object-cover"
                      optixFlowConfig={optixFlowConfig}
                    />
                  </div>
                </SliderWrapper>
              ))}
            </div>

            {/* Navigation buttons */}
            <div className="flex flex-col justify-center gap-4">
              {sliderSlides.map((slide) => (
                <SliderBtn
                  key={slide.id}
                  value={slide.id}
                  className="rounded-lg border p-4 text-left transition-colors hover:bg-muted"
                  progressBarClass="bottom-0 h-1 bg-primary"
                >
                  <h3 className="text-lg font-semibold">{slide.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {slide.description}
                  </p>
                </SliderBtn>
              ))}
            </div>
          </div>
        </div>
      </section>
    </ProgressSliderContext.Provider>
  );
}

