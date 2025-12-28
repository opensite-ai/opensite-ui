"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";

export interface LogosTwoRowGridProps {
  className?: string;
  heading?: string;
  companies?: Array<{
    name: string;
    logo: string;
    url?: string;
  }>;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultCompanies = [
  {
    name: "Company 1",
    logo: "https://cdn.ing/assets/files/record/286222/4w39lhwei0pa97up2wjnay3j96gh",
    url: "#",
  },
  {
    name: "Company 2",
    logo: "https://cdn.ing/assets/files/record/286252/xd7hyzbpkjwsauxm5j9yn9v44min",
    url: "#",
  },
  {
    name: "Company 3",
    logo: "https://cdn.ing/assets/files/record/286216/bw4zypgflisdtapxy0n4nbmsmtum",
    url: "#",
  },
  {
    name: "Company 4",
    logo: "https://cdn.ing/assets/files/record/286284/cz20wf2l2tjokrxu563pcml7pkmu",
    url: "#",
  },
  {
    name: "Company 5",
    logo: "https://cdn.ing/assets/files/record/286215/6wwi6yh2ax2nuo2vqa5gn9vozrgq",
    url: "#",
  },
  {
    name: "Company 6",
    logo: "https://cdn.ing/assets/files/record/286249/ff7m4wdw0zefj7d96v4ajmljuifc",
    url: "#",
  },
  {
    name: "Company 7",
    logo: "https://cdn.ing/assets/files/record/286220/t34kymqu5g9xr85o89cji3kfuypb",
    url: "#",
  },
  {
    name: "Company 8",
    logo: "https://cdn.ing/assets/files/record/286251/c64yb2c255uig6vpe4gdlnten7rv",
    url: "#",
  },
  {
    name: "Company 9",
    logo: "https://cdn.ing/assets/files/record/286209/4nowqz6c7v6vhzldvh9qdnhmkrwb",
    url: "#",
  },
  {
    name: "Company 10",
    logo: "https://cdn.ing/assets/files/record/286208/nay46vdmppxuznd7eg5jnnf4qjv5",
    url: "#",
  },
];

export function LogosTwoRowGrid({
  className,
  heading = "Trusted by leading companies worldwide",
  companies = defaultCompanies,
  optixFlowConfig,
}: LogosTwoRowGridProps) {
  const firstRow = companies.slice(0, Math.ceil(companies.length / 2));
  const secondRow = companies.slice(Math.ceil(companies.length / 2));

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <p className="mb-12 text-center text-lg text-muted-foreground">
          {heading}
        </p>
        <div className="space-y-8">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
            {firstRow.map((company, index) => (
              <Pressable
                key={index}
                href={company.url}
                className="opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0"
              >
                <Img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  width={120}
                  height={40}
                  className="h-10 w-auto object-contain"
                  optixFlowConfig={optixFlowConfig}
                />
              </Pressable>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
            {secondRow.map((company, index) => (
              <Pressable
                key={index}
                href={company.url}
                className="opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0"
              >
                <Img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  width={120}
                  height={40}
                  className="h-10 w-auto object-contain"
                  optixFlowConfig={optixFlowConfig}
                />
              </Pressable>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
