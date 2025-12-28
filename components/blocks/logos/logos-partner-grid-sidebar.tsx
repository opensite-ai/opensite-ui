"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";

export interface LogosPartnerGridSidebarProps {
  className?: string;
  sidebarTitle?: string;
  sidebarDescription?: string;
  yearSections?: Array<{
    year: string;
    description: string;
  }>;
  partners?: Array<{
    name: string;
    logo: string;
  }>;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultYearSections = [
  {
    year: "2020",
    description: "Started with 10 founding partners who believed in our vision.",
  },
  {
    year: "2022",
    description: "Expanded to 50+ partners across multiple industries.",
  },
  {
    year: "2024",
    description: "Now serving 200+ partners globally with enterprise solutions.",
  },
];

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
  {
    name: "Partner 9",
    logo: "https://cdn.ing/assets/files/record/286209/4nowqz6c7v6vhzldvh9qdnhmkrwb",
  },
  {
    name: "Partner 10",
    logo: "https://cdn.ing/assets/files/record/286208/nay46vdmppxuznd7eg5jnnf4qjv5",
  },
  {
    name: "Partner 11",
    logo: "https://cdn.ing/assets/files/record/286214/pn9v9zz0de8jgz2mf8o1c11k8gxh",
  },
  {
    name: "Partner 12",
    logo: "https://cdn.ing/assets/files/record/286235/x4po9fpjkd6cdxnfxaqya6emwvea",
  },
];

export function LogosPartnerGridSidebar({
  className,
  sidebarTitle = "Our Partners",
  sidebarDescription = "We've partnered with industry leaders to deliver exceptional value to our customers.",
  yearSections = defaultYearSections,
  partners = defaultPartners,
  optixFlowConfig,
}: LogosPartnerGridSidebarProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              {sidebarTitle}
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              {sidebarDescription}
            </p>
            <div className="space-y-6">
              {yearSections.map((section, index) => (
                <div key={index} className="border-l-2 border-primary pl-4">
                  <p className="font-semibold text-primary">{section.year}</p>
                  <p className="text-sm text-muted-foreground">
                    {section.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center rounded-lg border border-border bg-card p-6 transition-colors hover:bg-accent"
                >
                  <Img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    width={80}
                    height={40}
                    className="h-10 w-auto object-contain grayscale transition-all hover:grayscale-0"
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
