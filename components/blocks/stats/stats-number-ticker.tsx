"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";

/**
 * A stat with number ticker animation
 */
export interface TickerStat {
  /**
   * The end value for the ticker animation
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
   * Description text
   */
  description?: string;
}

/**
 * Props for the StatsNumberTicker component
 */
export interface StatsNumberTickerProps {
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Badge text above the heading
   */
  badge?: string;
  /**
   * Main heading text
   */
  heading?: string;
  /**
   * Description text below the heading
   */
  description?: string;
  /**
   * Array of stats to display with ticker animation
   */
  stats?: TickerStat[];
  /**
   * Animation duration in milliseconds
   * @default 2500
   */
  animationDuration?: number;
}

const defaultStats: TickerStat[] = [
  {
    value: 10000,
    suffix: "+",
    label: "Active Users",
    description: "Growing community of professionals",
  },
  {
    value: 99.9,
    suffix: "%",
    label: "Uptime",
    description: "Enterprise-grade reliability",
  },
  {
    value: 150,
    suffix: "+",
    label: "Integrations",
    description: "Connect with your favorite tools",
  },
  {
    value: 4.9,
    label: "Rating",
    description: "Based on 2,000+ reviews",
  },
];

/**
 * Hook for number ticker animation with smooth digit transitions
 */
function useNumberTicker(
  endValue: number,
  duration: number = 2500,
  isVisible: boolean,
  decimals: number = 0
): string {
  const [displayValue, setDisplayValue] = React.useState("0");

  React.useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentValue = easeOutExpo * endValue;

      if (decimals > 0) {
        setDisplayValue(currentValue.toFixed(decimals));
      } else {
        setDisplayValue(Math.floor(currentValue).toLocaleString());
      }

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        // Ensure final value is exact
        if (decimals > 0) {
          setDisplayValue(endValue.toFixed(decimals));
        } else {
          setDisplayValue(endValue.toLocaleString());
        }
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [endValue, duration, isVisible, decimals]);

  return displayValue;
}

/**
 * Individual ticker stat component
 */
function TickerStatItem({
  stat,
  duration,
  isVisible,
}: {
  stat: TickerStat;
  duration: number;
  isVisible: boolean;
}) {
  // Determine decimal places based on the value
  const decimals = stat.value % 1 !== 0 ? 1 : 0;
  const displayValue = useNumberTicker(stat.value, duration, isVisible, decimals);

  return (
    <div className="rounded-xl border bg-card p-6 transition-shadow hover:shadow-md">
      <div className="mb-2 text-4xl font-bold tabular-nums md:text-5xl">
        {stat.prefix}
        {displayValue}
        {stat.suffix}
      </div>
      <div className="mb-1 text-lg font-semibold">{stat.label}</div>
      {stat.description && (
        <p className="text-sm text-muted-foreground">{stat.description}</p>
      )}
    </div>
  );
}

/**
 * StatsNumberTicker - A stats section featuring smooth number ticker animations
 * that count up when scrolled into view. Each stat card displays an animated
 * value with optional prefix/suffix, label, and description. Uses exponential
 * easing for a polished counting effect. Supports both integer and decimal values.
 * Ideal for landing pages, dashboards, or any section showcasing impressive metrics.
 *
 * @example
 * ```tsx
 * <StatsNumberTicker
 *   badge="By The Numbers"
 *   heading="Platform Statistics"
 *   stats={[
 *     { value: 10000, suffix: "+", label: "Active Users", description: "Growing community" },
 *     { value: 99.9, suffix: "%", label: "Uptime", description: "Enterprise-grade reliability" },
 *   ]}
 * />
 * ```
 */
export function StatsNumberTicker({
  className,
  badge = "By The Numbers",
  heading = "Platform Statistics",
  description = "Key metrics that demonstrate our platform's scale and reliability",
  stats = defaultStats,
  animationDuration = 2500,
}: StatsNumberTickerProps) {
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
          <Badge className="mb-4">{badge}</Badge>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">{heading}</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <TickerStatItem
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
