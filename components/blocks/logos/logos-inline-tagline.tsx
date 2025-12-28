"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";

export interface LogosInlineTaglineProps {
  className?: string;
  tagline?: string;
  partners?: Array<{
    name: string;
    logo: string;
  }>;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultPartners = [
  {
    name: "Partner 1",
    logo: "https://cdn.ing/assets/files/record/286222/4w39lhwei0pa97up2wjnay3j96gh",
  },
  {
    name: "Partner 2",
    logo: "https://cdn.ing/assets/files/record/286252/xd7hyzbpkjwsauxm5j9yn9v44min",
  },
  {
    name: "Partner 3",
    logo: "https://cdn.ing/assets/files/record/286216/bw4zypgflisdtapxy0n4nbmsmtum",
  },
  {
    name: "Partner 4",
    logo: "https://cdn.ing/assets/files/record/286284/cz20wf2l2tjokrxu563pcml7pkmu",
  },
  {
    name: "Partner 5",
    logo: "https://cdn.ing/assets/files/record/286215/6wwi6yh2ax2nuo2vqa5gn9vozrgq",
  },
];

export function LogosInlineTagline({
  className,
  tagline = "Used by the world's leading companies",
  partners = defaultPartners,
  optixFlowConfig,
}: LogosInlineTaglineProps) {
  return (
    <section
      className={cn(
        "container flex flex-wrap items-center justify-between gap-12 py-32",
        className
      )}
    >
      <p className="text-lg leading-[140%] tracking-[-0.32px] text-primary">
        {tagline}
      </p>
      <div className="flex flex-wrap items-center gap-x-8 gap-y-6 opacity-70 grayscale lg:gap-[60px]">
        {partners.map((partner, index) => (
          <Img
            key={index}
            src={partner.logo}
            alt={`${partner.name} logo`}
            width={109}
            height={48}
            className="object-contain"
            optixFlowConfig={optixFlowConfig}
          />
        ))}
      </div>
    </section>
  );
}
