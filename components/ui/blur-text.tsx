import { useEffect, useRef, useState, useMemo } from "react";
import {
  motion,
  type TargetAndTransition,
  type Transition,
  type Easing,
} from "framer-motion";

const buildKeyframes = (
  from: TargetAndTransition,
  steps: TargetAndTransition[],
): TargetAndTransition => {
  const keys = new Set([
    ...Object.keys(from),
    ...steps.flatMap((s) => Object.keys(s)),
  ]);

  const keyframes: Record<string, unknown[]> = {};
  keys.forEach((k) => {
    keyframes[k] = [
      (from as Record<string, unknown>)[k],
      ...steps.map((s) => (s as Record<string, unknown>)[k]),
    ];
  });
  return keyframes as unknown as TargetAndTransition;
};

interface BlurTextProps {
  text?: string;
  delay?: number;
  className?: string;
  /** HTML element to render as (default: "p") */
  as?: React.ElementType;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  animationFrom?: TargetAndTransition;
  animationTo?: TargetAndTransition[];
  easing?: Easing | Easing[];
  onAnimationComplete?: () => void;
  stepDuration?: number;
}

export const BlurText = ({
  text = "",
  delay = 200,
  className = "",
  as: Component = "p",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = (t: number) => t,
  onAnimationComplete,
  stepDuration = 0.35,
}: BlurTextProps) => {
  const elements = useMemo(() => {
    if (animateBy === "words") {
      return text.split(" ");
    } else {
      return text.split("");
    }
  }, [text, animateBy]);

  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(currentRef);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo(
    () =>
      direction === "top"
        ? { filter: "blur(10px)", opacity: 0, y: -50 }
        : { filter: "blur(10px)", opacity: 0, y: 50 },
    [direction],
  );

  const defaultTo = useMemo(
    () => [
      {
        filter: "blur(5px)",
        opacity: 0.5,
        y: direction === "top" ? 5 : -5,
      },
      {
        filter: "blur(0px)",
        opacity: 1,
        y: 0,
      },
    ],
    [direction],
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) =>
    stepCount <= 1 ? 0 : i / (stepCount - 1),
  );

  return (
    <Component
      ref={ref}
      className={className}
      style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}
    >
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

        const spanTransition: Transition = {
          duration: totalDuration,
          times: times as number[],
          delay: inView ? (index * delay) / 1000 : 0,
          ease: easing,
        };

        return (
          <motion.span
            className="inline-block will-change-[transform,filter,opacity]"
            key={index}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={spanTransition}
            onAnimationComplete={
              index === elements.length - 1 && inView
                ? onAnimationComplete
                : undefined
            }
            style={animateBy === "words" ? { marginRight: "0.5em" } : {}}
          >
            {segment === " " ? "\u00A0" : segment}
          </motion.span>
        );
      })}
    </Component>
  );
};
