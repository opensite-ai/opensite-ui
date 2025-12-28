"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";

/**
 * A stat with animated counter
 */
export interface AnimatedStat {
  /**
   * The end value for the counter animation
   */
  value: number;
  /**
   * Prefix for the value (e.g., "$", "+")
   */
  prefix?: string;
  /**
   * Suffix for the value (e.g., "%", "K", "M", "+")
   */
  suffix?: string;
  /**
   * The label for the stat
   */
  label: string;
  /**
   * Icon name in format: prefix/name (e.g., "lucide/users")
   */
  icon?: string;
}

/**
 * Props for the StatsAnimatedCounter component
 */
export interface StatsAnimatedCounterProps {
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Main heading text
   */
  heading?: string;
  /**
   * Description text below the heading
   */
  description?: string;
  /**
   * Array of stats to display with animated counters
   */
  stats?: AnimatedStat[];
  /**
   * Animation duration in milliseconds
   * @default 2000
   */
  animationDuration?: number;
}

const defaultStats: AnimatedStat[] = [
  { value: 500, suffix: "+", label: "Projects Completed", icon: "lucide/folder-check" },
  { value: 98, suffix: "%", label: "Client Satisfaction", icon: "lucide/heart" },
  { value: 50, suffix: "M+", label: "Revenue Generated", prefix: "$", icon: "lucide/dollar-sign" },
  { value: 24, suffix: "/7", label: "Support Available", icon: "lucide/headphones" },
];

/**
 * Hook for animated counter with intersection observer
 */
function useAnimatedCounter(
  endValue: number,
  duration: number = 2000,
  isVisible: boolean
): number {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * endValue));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [endValue, duration, isVisible]);

  return count;
}

/**
 * Individual animated stat component
 */
function AnimatedStatItem({
  stat,
  duration,
  isVisible,
}: {
  stat: AnimatedStat;
  duration: number;
  isVisible: boolean;
}) {
  const count = useAnimatedCounter(stat.value, duration, isVisible);

  return (
    <div className="flex flex-col items-center text-center">
      {stat.icon && (
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <DynamicIcon name={stat.icon} size={28} className="text-primary" />
        </div>
      )}
      <div className="mb-2 text-4xl font-bold md:text-5xl">
        {stat.prefix}
        {count}
        {stat.suffix}
      </div>
      <div className="text-muted-foreground">{stat.label}</div>
    </div>
  );
}

/**
 * StatsAnimatedCounter - A stats section featuring animated number counters that
 * trigger when scrolled into view. Each stat displays an optional icon, animated
 * value with prefix/suffix, and label. Uses intersection observer to start the
 * animation only when visible. Ideal for impact sections, achievements, or any
 * metrics that benefit from engaging number animations.
 *
 * @example
 * ```tsx
 * <StatsAnimatedCounter
 *   heading="Our Impact in Numbers"
 *   stats={[
 *     { value: 500, suffix: "+", label: "Projects Completed", icon: "lucide/folder-check" },
 *     { value: 98, suffix: "%", label: "Client Satisfaction", icon: "lucide/heart" },
 *   ]}
 *   animationDuration={2000}
 * />
 * ```
 */
export function StatsAnimatedCounter({
  className,
  heading = "Our Impact in Numbers",
  description = "Real results that speak for themselves",
  stats = defaultStats,
  animationDuration = 2000,
}: StatsAnimatedCounterProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className={cn(
        "container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]",
        className
      )}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">{heading}</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <AnimatedStatItem
              key={index}
              stat={stat}
              duration={animationDuration}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
