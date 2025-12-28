"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { Badge } from "../../ui/badge";

export interface LogosPartnerNetworkProps {
  className?: string;
  badge?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
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
  {
    name: "Partner 6",
    logo: "https://cdn.ing/assets/files/record/286249/ff7m4wdw0zefj7d96v4ajmljuifc",
  },
  {
    name: "Partner 7",
    logo: "https://cdn.ing/assets/files/record/286220/t34kymqu5g9xr85o89cji3kfuypb",
  },
  {
    name: "Partner 8",
    logo: "https://cdn.ing/assets/files/record/286251/c64yb2c255uig6vpe4gdlnten7rv",
  },
];

export function LogosPartnerNetwork({
  className,
  badge = "Partner Network",
  title = "Trusted by industry leaders",
  description = "Join thousands of companies that trust our platform to power their business operations and drive growth.",
  buttonText = "Become a partner",
  buttonUrl = "#",
  logos = defaultLogos,
  optixFlowConfig,
}: LogosPartnerNetworkProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col items-center text-center">
          <Badge variant="outline" className="mb-4">
            {badge}
          </Badge>
          <h2 className="mb-4 max-w-2xl text-3xl font-bold md:text-4xl">
            {title}
          </h2>
          <p className="mb-8 max-w-xl text-lg text-muted-foreground">
            {description}
          </p>
          <Pressable href={buttonUrl} variant="default" asButton>
            {buttonText}
          </Pressable>
        </div>
        <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4">
          {logos.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-4 grayscale transition-all hover:grayscale-0"
            >
              <Img
                src={partner.logo}
                alt={`${partner.name} logo`}
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
