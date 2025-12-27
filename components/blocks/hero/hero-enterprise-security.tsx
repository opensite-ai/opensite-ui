"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders, logoPlaceholders } from "../../../lib/mediaPlaceholders";

export interface HeroEnterpriseSecurityProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

export function HeroEnterpriseSecurity({
  className,
  optixFlowConfig,
}: HeroEnterpriseSecurityProps): React.JSX.Element {
  return (
    <section className={cn("bg-background py-20 md:py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-2 text-sm">
            <DynamicIcon name="lucide/shield-check" size={16} className="text-green-500" />
            <span>Enterprise-grade security</span>
          </div>
          <h1 className="mt-8 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Security that scales with your business
          </h1>
          <p className="mt-6 text-lg text-muted-foreground md:text-xl">
            Protect your data with industry-leading security features. SOC 2
            Type II certified, GDPR compliant, and trusted by Fortune 500
            companies.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Pressable
              href="#"
              asButton
              variant="default"
              size="lg"
            >
              Request a demo
              <DynamicIcon name="lucide/arrow-right" size={16} className="ml-2" />
            </Pressable>
            <Pressable
              href="#"
              asButton
              variant="outline"
              size="lg"
            >
              View security docs
            </Pressable>
          </div>
        </div>
        <div className="mt-20 grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <DynamicIcon name="lucide/lock" size={24} className="text-green-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-foreground">
              End-to-end encryption
            </h3>
            <p className="text-sm text-muted-foreground">
              All data is encrypted at rest and in transit using AES-256
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <DynamicIcon name="lucide/key" size={24} className="text-blue-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-foreground">
              SSO & SAML
            </h3>
            <p className="text-sm text-muted-foreground">
              Integrate with your existing identity provider
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
              <DynamicIcon name="lucide/eye" size={24} className="text-purple-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-foreground">
              Audit logs
            </h3>
            <p className="text-sm text-muted-foreground">
              Complete visibility into all account activity
            </p>
          </div>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8">
          {[0, 1, 2, 3, 4].map((idx) => (
            <Img
              key={idx}
              src={logoPlaceholders.darkHorizontalLogo}
              alt=""
              className="h-8 opacity-50 grayscale"
              optixFlowConfig={optixFlowConfig}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
