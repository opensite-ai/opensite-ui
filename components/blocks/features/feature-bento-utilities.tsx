"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Badge } from "../../ui/badge";
import { Card } from "../../ui/card";
import { Separator } from "../../ui/separator";
import { Img } from "@page-speed/img";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface FeatureBentoUtilitiesProps {
  /**
   * Section label text
   */
  label?: string;
  /**
   * Main heading text
   */
  title?: string;
  /**
   * Supporting description text
   */
  description?: string;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

/**
 * Feature Bento Utilities - Bento-style grid layout with mixed card sizes
 * showcasing various utilities.
 *
 * Layout: Two-column bento grid with varying card heights and image cards.
 * Key features: Bento grid layout, sparkle icons, coming soon badge, image cards.
 * Best for: Feature dashboards, capability overviews, product highlights.
 *
 * @example
 * ```tsx
 * <FeatureBentoUtilities
 *   label="Utilities"
 *   title="Utilities for every use case"
 *   description="All the tools you need to get the job done."
 * />
 * ```
 */
export function FeatureBentoUtilities({
  label = "Utilities",
  title = "Utilites for every use case and platform you can think of.",
  description = "All the tools you need to get the job done. From apps to integrations, we have you covered.",
  className,
  optixFlowConfig,
}: FeatureBentoUtilitiesProps) {
  return (
    <section className={cn("bg-gray-50 py-32 dark:bg-background", className)}>
      <div className="container max-w-7xl">
        <div className="flex items-center gap-2 text-muted-foreground">
          <DynamicIcon name="lucide/square-dashed-mouse-pointer" size={20} />
          <p className="text-sm">{label}</p>
        </div>
        <Separator className="mt-3 mb-8" />
        <div className="flex flex-col justify-between gap-6 md:flex-row">
          <h2 className="text-3xl font-medium md:w-1/2">{title}</h2>
          <p className="md:w-1/2">{description}</p>
        </div>
        <div className="mt-11 flex flex-col gap-6 md:flex-row">
          <div className="flex w-full flex-col gap-6">
            <Card className="p-6">
              <p className="mb-1 font-medium">Apps</p>
              <p className="text-muted-foreground">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi
                laboriosam voluptatibus temporibus doloremque laudantium.
              </p>
            </Card>
            <Card className="overflow-hidden pt-0">
              <Img
                src={blockBrandedIconsAndPlaceholders.placeholder1}
                alt="Integrations"
                className="aspect-video w-full object-cover"
                loading="lazy"
                optixFlowConfig={optixFlowConfig}
              />
              <div className="p-6">
                <p className="mb-1 font-medium">Integrations</p>
                <p className="text-muted-foreground">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Animi laboriosam voluptatibus temporibus doloremque
                  laudantium.
                </p>
              </div>
            </Card>
            <Card className="p-6">
              <p className="mb-1 font-medium">Utilities</p>
              <p className="text-muted-foreground">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi
                laboriosam voluptatibus temporibus doloremque laudantium.
              </p>
            </Card>
            <Card className="p-6">
              <p className="mb-1 flex items-center gap-2 font-medium">
                Features <DynamicIcon name="lucide/sparkles" size={16} />
              </p>
              <p className="text-muted-foreground">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi
                laboriosam voluptatibus temporibus doloremque laudantium.
              </p>
            </Card>
          </div>
          <div className="flex w-full flex-col gap-6">
            <Card className="overflow-hidden pt-0">
              <Img
                src={blockBrandedIconsAndPlaceholders.placeholder1}
                alt="Integrations"
                className="aspect-video w-full object-cover"
                loading="lazy"
                optixFlowConfig={optixFlowConfig}
              />
              <div className="p-6">
                <p className="mb-1 flex items-center gap-2 font-medium">
                  Integrations <DynamicIcon name="lucide/sparkles" size={16} />
                </p>
                <p className="text-muted-foreground">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Animi laboriosam voluptatibus temporibus doloremque
                  laudantium.
                </p>
              </div>
            </Card>
            <Card className="p-6">
              <p className="mb-1 font-medium">Features</p>
              <p className="text-muted-foreground">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi
                laboriosam voluptatibus temporibus doloremque laudantium.
              </p>
            </Card>
            <Card className="p-6">
              <p className="mb-1 flex items-center gap-2 font-medium">
                Features <DynamicIcon name="lucide/sparkles" size={16} />
              </p>
              <p className="text-muted-foreground">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi
                laboriosam voluptatibus temporibus doloremque laudantium.
              </p>
            </Card>
            <Card className="border-dashed bg-transparent p-6 shadow-none">
              <div className="mb-1 flex items-center gap-2 font-medium">
                Search
                <Badge variant="outline">Coming soon</Badge>
              </div>
              <p className="text-muted-foreground">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi
                laboriosam voluptatibus temporibus doloremque laudantium.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
