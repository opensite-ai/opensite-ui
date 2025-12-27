"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Badge } from "../../ui/badge";

export interface HeroPricingComparisonProps {
  className?: string;
}

export function HeroPricingComparison({
  className,
}: HeroPricingComparisonProps): React.JSX.Element {
  return (
    <section className={cn("bg-background py-20 md:py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="outline" className="mb-4">
            Simple Pricing
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Choose the plan that&apos;s right for you
          </h1>
          <p className="mt-6 text-lg text-muted-foreground md:text-xl">
            Start free and scale as you grow. No hidden fees, no surprises.
            Cancel anytime.
          </p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-8">
            <h3 className="text-lg font-semibold text-foreground">Starter</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Perfect for individuals and small projects
            </p>
            <div className="mt-6">
              <span className="text-4xl font-bold text-foreground">$0</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <Pressable
              href="#"
              asButton
              variant="outline"
              className="mt-6 w-full"
            >
              Get started free
            </Pressable>
            <ul className="mt-8 space-y-4">
              {["Up to 3 projects", "Basic analytics", "Community support"].map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm">
                  <DynamicIcon name="lucide/check" size={16} className="text-green-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative rounded-2xl border-2 border-primary bg-card p-8">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge>Most Popular</Badge>
            </div>
            <h3 className="text-lg font-semibold text-foreground">Pro</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              For growing teams and businesses
            </p>
            <div className="mt-6">
              <span className="text-4xl font-bold text-foreground">$29</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <Pressable
              href="#"
              asButton
              variant="default"
              className="mt-6 w-full"
            >
              Start free trial
            </Pressable>
            <ul className="mt-8 space-y-4">
              {["Unlimited projects", "Advanced analytics", "Priority support", "Custom integrations", "Team collaboration"].map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm">
                  <DynamicIcon name="lucide/check" size={16} className="text-green-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8">
            <h3 className="text-lg font-semibold text-foreground">Enterprise</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              For large organizations with custom needs
            </p>
            <div className="mt-6">
              <span className="text-4xl font-bold text-foreground">Custom</span>
            </div>
            <Pressable
              href="#"
              asButton
              variant="outline"
              className="mt-6 w-full"
            >
              Contact sales
            </Pressable>
            <ul className="mt-8 space-y-4">
              {["Everything in Pro", "Dedicated support", "SLA guarantee", "Custom contracts", "On-premise option"].map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm">
                  <DynamicIcon name="lucide/check" size={16} className="text-green-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
