"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";

export interface LogosCenteredSimpleProps {
  className?: string;
  title?: string;
  subtitle?: string;
  logos?: Array<{
    name: string;
    logo: string;
  }>;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultLogos = [
  {
    name: "Company 1",
    logo: "https://cdn.ing/assets/files/record/286222/4w39lhwei0pa97up2wjnay3j96gh",
  },
  {
    name: "Company 2",
    logo: "https://cdn.ing/assets/files/record/286252/xd7hyzbpkjwsauxm5j9yn9v44min",
  },
  {
    name: "Company 3",
    logo: "https://cdn.ing/assets/files/record/286216/bw4zypgflisdtapxy0n4nbmsmtum",
  },
  {
    name: "Company 4",
    logo: "https://cdn.ing/assets/files/record/286284/cz20wf2l2tjokrxu563pcml7pkmu",
  },
  {
    name: "Company 5",
    logo: "https://cdn.ing/assets/files/record/286215/6wwi6yh2ax2nuo2vqa5gn9vozrgq",
  },
  {
    name: "Company 6",
    logo: "https://cdn.ing/assets/files/record/286249/ff7m4wdw0zefj7d96v4ajmljuifc",
  },
];

export function LogosCenteredSimple({
  className,
  title = "Trusted by innovative companies",
  subtitle = "Join thousands of businesses that rely on our platform",
  logos = defaultLogos,
  optixFlowConfig,
}: LogosCenteredSimpleProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-2xl font-semibold md:text-3xl">{title}</h2>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0"
            >
              <Img
                src={logo.logo}
                alt={`${logo.name} logo`}
                width={120}
                height={48}
                className="h-12 w-auto object-contain"
                optixFlowConfig={optixFlowConfig}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
