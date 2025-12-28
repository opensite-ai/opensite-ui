import React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Separator } from "../../ui/separator";

interface LegacyFeature {
  text: string;
}

interface ModernFeature {
  emoji: string;
  text: string;
}

export interface ComparisonLegacyModernProps {
  className?: string;
  title?: string;
  titleHighlight?: string;
  subtitle?: string;
  legacyTitle?: string;
  legacyFeatures?: LegacyFeature[];
  modernTitle?: string;
  modernFeatures?: ModernFeature[];
}

const defaultLegacyFeatures: LegacyFeature[] = [
  { text: "One-size-fits-all project tools with generic workflows." },
  { text: "Clunky, overcomplicated, and hard to adopt." },
  { text: "Scattered data stitched together with brittle integrations." },
  { text: "Minimal automation leading to manual reporting." },
  { text: "Slow, risky migrations that disrupt delivery." },
  { text: "Aging tech with limited cloud and mobile support." },
  { text: "High price tags without measurable outcomes." },
  { text: "Surprise fees for training, support, and integrations." },
];

const defaultModernFeatures: ModernFeature[] = [
  { emoji: "🧭", text: "Built for modern product and engineering teams." },
  { emoji: "💡", text: "Opinionated defaults with a simple, modern UX." },
  { emoji: "📊", text: "Unified workspace as your single source of truth." },
  { emoji: "⚡", text: "Automation and AI that cut busywork." },
  { emoji: "🧰", text: "Guided, low-risk migrations measured in weeks." },
  { emoji: "☁️", text: "Cloud-native, secure, and always up to date." },
  { emoji: "📈", text: "Improves velocity with a clear, provable ROI." },
  { emoji: "💬", text: "Straightforward, transparent pricing." },
];

/**
 * ComparisonLegacyModern - Legacy vs Modern features split layout
 *
 * Displays a two-column comparison between legacy/old approaches and modern/new
 * solutions. The legacy column uses muted styling with X icons for pain points,
 * while the modern column uses a bordered card with emoji indicators for benefits.
 * Features are separated by dividers for clear visual hierarchy.
 *
 * Best for: Digital transformation messaging, product modernization pitches,
 * before/after comparisons, migration benefits, upgrade justifications.
 */
export function ComparisonLegacyModern({
  className,
  title = "Why Teams are",
  titleHighlight = "Moving to Modern Tools",
  subtitle = "Old tools slow your team down and don't help you ship faster. Modern tools help you ship faster.",
  legacyTitle = "Legacy Features",
  legacyFeatures = defaultLegacyFeatures,
  modernTitle = "New Features",
  modernFeatures = defaultModernFeatures,
}: ComparisonLegacyModernProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col gap-6 text-center md:gap-12">
          <h2 className="text-4xl font-medium md:text-5xl lg:text-7xl">
            <span className="text-muted-foreground">{title} </span>
            <br /> {titleHighlight}
          </h2>
          <p className="text-lg">{subtitle}</p>
        </div>
        <div className="mt-20 grid gap-12 lg:grid-cols-2 lg:gap-0">
          <div className="rounded-3xl bg-muted p-6 lg:rounded-r-none lg:p-12">
            <h3 className="text-2xl font-medium">{legacyTitle}</h3>
            <ul className="mt-9 space-y-3">
              {legacyFeatures.map((feature, idx) => (
                <React.Fragment key={idx}>
                  <div className="flex items-center gap-2">
                    <DynamicIcon
                      name="lucide/x"
                      size={16}
                      className="my-1.5 shrink-0 text-muted-foreground"
                    />
                    <li className="text-sm">{feature.text}</li>
                  </div>
                  {idx !== legacyFeatures.length - 1 && <Separator />}
                </React.Fragment>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-y p-6 lg:rounded-l-none lg:border-l-0 lg:p-12">
            <h3 className="text-2xl font-medium">{modernTitle}</h3>
            <ul className="mt-9 space-y-3">
              {modernFeatures.map((feature, idx) => (
                <React.Fragment key={idx}>
                  <li className="flex items-center gap-2 text-sm">
                    <span className="text-lg">{feature.emoji}</span>
                    {feature.text}
                  </li>
                  {idx !== modernFeatures.length - 1 && <Separator />}
                </React.Fragment>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
