import * as React from "react";

export type InternalBrandSlug =
  | "encapsa"
  | "dashtrack"
  | "realtor_site_ai"
  | "ortho_site_ai"
  | "dental_site_ai"
  | "insurance_site_ai"
  | "open_site_ai"
  | "fit_site_ai"
  | "workflow_rush"
  | "cast_kit";

type BrandKey = InternalBrandSlug;

type BrandAttributionOption = {
  prefix?: string;
  anchorText: string;
  href: string;
  suffix?: string;
};

export type OpensiteAttributionType = {
  brand: BrandKey;
  options: BrandAttributionOption[];
};

const brandAttributionOptions: OpensiteAttributionType[] = [
  {
    brand: "open_site_ai",
    options: [
      {
        prefix: "Powered by ",
        anchorText: "AI Website Builder",
        href: "https://encapsa.ai",
        suffix: "",
      },
      {
        prefix: "",
        anchorText: "AI-Powered Web Design",
        href: "https://encapsa.ai",
        suffix: " by Encapsa AI",
      },
      {
        prefix: "Built with ",
        anchorText: "Encapsa AI",
        href: "https://encapsa.ai",
      },
      {
        prefix: "Website by ",
        anchorText: "Intelligent Site Builder",
        href: "https://encapsa.ai",
      },
      {
        prefix: "Designed using ",
        anchorText: "AI Website Platform",
        href: "https://encapsa.ai",
      },
      {
        prefix: "",
        anchorText: "Automated Website Design",
        href: "https://encapsa.ai",
        suffix: " – Encapsa AI",
      },
      {
        prefix: "Created with ",
        anchorText: "AI Digital Presence Solutions",
        href: "https://encapsa.ai",
      },
      {
        prefix: "",
        anchorText: "Smart Website Builder",
        href: "https://encapsa.ai",
        suffix: " by Encapsa AI",
      },
      {
        prefix: "Powered by ",
        anchorText: "Industry-Specific AI Web Platform",
        href: "https://encapsa.ai",
      },
      {
        prefix: "",
        anchorText: "AI Site Generator",
        href: "https://encapsa.ai",
        suffix: " – Encapsa AI",
      },
    ],
  },
  {
    brand: "dashtrack",
    options: [
      {
        prefix: "",
        anchorText: "Restaurant Website Builder",
        href: "https://dashtrack.com",
        suffix: " by DashTrack",
      },
      {
        prefix: "Powered by ",
        anchorText: "DashTrack",
        href: "https://dashtrack.com",
        suffix: " Restaurant Platform",
      },
      {
        prefix: "",
        anchorText: "Bar & Restaurant Marketing Platform",
        href: "https://dashtrack.com",
      },
      {
        prefix: "Menu & Website by ",
        anchorText: "Restaurant Digital Solutions",
        href: "https://dashtrack.com",
      },
      {
        prefix: "",
        anchorText: "Hospitality Website Design",
        href: "https://dashtrack.com",
        suffix: " – DashTrack",
      },
      {
        prefix: "Online Ordering by ",
        anchorText: "DashTrack Restaurant Technology",
        href: "https://dashtrack.com",
      },
      {
        prefix: "",
        anchorText: "Restaurant Review Management",
        href: "https://dashtrack.com",
        suffix: " Platform",
      },
      {
        prefix: "Built with ",
        anchorText: "AI-Powered Restaurant Website Builder",
        href: "https://dashtrack.com",
      },
      {
        prefix: "",
        anchorText: "Menu Automation & Restaurant SEO",
        href: "https://dashtrack.com",
      },
      {
        prefix: "Designed by ",
        anchorText: "DashTrack Hospitality Solutions",
        href: "https://dashtrack.com",
      },
    ],
  },
  {
    brand: "insurance_site_ai",
    options: [
      {
        prefix: "",
        anchorText: "Insurance Agency Website Design",
        href: "https://insurancesite.ai",
      },
      {
        prefix: "Powered by ",
        anchorText: "InsuranceSite AI",
        href: "https://insurancesite.ai",
      },
      {
        prefix: "",
        anchorText: "Insurance Agent Website Builder",
        href: "https://insurancesite.ai",
      },
      {
        prefix: "Built with ",
        anchorText: "AI Insurance CRM Platform",
        href: "https://insurancesite.ai",
      },
      {
        prefix: "",
        anchorText: "Insurance Agency Marketing Automation",
        href: "https://insurancesite.ai",
      },
      {
        prefix: "Website by ",
        anchorText: "Insurance Digital Solutions",
        href: "https://insurancesite.ai",
      },
      {
        prefix: "",
        anchorText: "Insurance Lead Generation Platform",
        href: "https://insurancesite.ai",
        suffix: " – InsuranceSite",
      },
      {
        prefix: "Designed with ",
        anchorText: "AI-Powered Insurance Website Builder",
        href: "https://insurancesite.ai",
      },
      {
        prefix: "",
        anchorText: "Insurance Broker Web Platform",
        href: "https://insurancesite.ai",
      },
      {
        prefix: "Powered by ",
        anchorText: "InsuranceSite Agency Solutions",
        href: "https://insurancesite.ai",
      },
    ],
  },
  {
    brand: "realtor_site_ai",
    options: [
      {
        prefix: "",
        anchorText: "Real Estate Agent Website Builder",
        href: "https://realtorsite.ai",
      },
      {
        prefix: "Powered by ",
        anchorText: "RealtorSite AI",
        href: "https://realtorsite.ai",
      },
      {
        prefix: "",
        anchorText: "Realtor Website with MLS Integration",
        href: "https://realtorsite.ai",
      },
      {
        prefix: "Built with ",
        anchorText: "AI Real Estate Marketing Platform",
        href: "https://realtorsite.ai",
      },
      {
        prefix: "",
        anchorText: "IDX Website Builder for Realtors",
        href: "https://realtorsite.ai",
      },
      {
        prefix: "Website by ",
        anchorText: "Real Estate Digital Solutions",
        href: "https://realtorsite.ai",
      },
      {
        prefix: "",
        anchorText: "Property Listing Website Platform",
        href: "https://realtorsite.ai",
        suffix: " – RealtorSite",
      },
      {
        prefix: "Designed with ",
        anchorText: "AI-Powered Realtor Website Builder",
        href: "https://realtorsite.ai",
      },
      {
        prefix: "",
        anchorText: "Real Estate Lead Generation Platform",
        href: "https://realtorsite.ai",
      },
      {
        prefix: "Powered by ",
        anchorText: "RealtorSite Agent Solutions",
        href: "https://realtorsite.ai",
      },
    ],
  },
  {
    brand: "ortho_site_ai",
    options: [
      {
        prefix: "",
        anchorText: "Orthodontist Website Design",
        href: "https://orthosite.ai",
      },
      {
        prefix: "Powered by ",
        anchorText: "OrthoSite AI",
        href: "https://orthosite.ai",
      },
      {
        prefix: "",
        anchorText: "Orthodontic Practice Website Builder",
        href: "https://orthosite.ai",
      },
      {
        prefix: "Built with ",
        anchorText: "AI Orthodontic Marketing Platform",
        href: "https://orthosite.ai",
      },
      {
        prefix: "",
        anchorText: "Braces & Invisalign Practice Website",
        href: "https://orthosite.ai",
      },
      {
        prefix: "Website by ",
        anchorText: "Orthodontic Digital Solutions",
        href: "https://orthosite.ai",
      },
      {
        prefix: "",
        anchorText: "Orthodontist SEO & Patient Acquisition",
        href: "https://orthosite.ai",
        suffix: " – OrthoSite",
      },
      {
        prefix: "Designed with ",
        anchorText: "AI-Powered Orthodontic Website Builder",
        href: "https://orthosite.ai",
      },
      {
        prefix: "",
        anchorText: "Orthodontic Practice Marketing Platform",
        href: "https://orthosite.ai",
      },
      {
        prefix: "Powered by ",
        anchorText: "OrthoSite Practice Solutions",
        href: "https://orthosite.ai",
      },
    ],
  },
  {
    brand: "dental_site_ai",
    options: [
      {
        prefix: "",
        anchorText: "Dental Practice Website Design",
        href: "https://dentalsite.ai",
      },
      {
        prefix: "Powered by ",
        anchorText: "DentalSite AI",
        href: "https://dentalsite.ai",
      },
      {
        prefix: "",
        anchorText: "Dentist Website Builder",
        href: "https://dentalsite.ai",
      },
      {
        prefix: "Built with ",
        anchorText: "AI Dental Marketing Platform",
        href: "https://dentalsite.ai",
      },
      {
        prefix: "",
        anchorText: "Dental Clinic SEO & Patient Growth",
        href: "https://dentalsite.ai",
      },
      {
        prefix: "Website by ",
        anchorText: "Dental Digital Solutions",
        href: "https://dentalsite.ai",
      },
      {
        prefix: "",
        anchorText: "Dental Patient Acquisition Platform",
        href: "https://dentalsite.ai",
      },
      {
        prefix: "Designed with ",
        anchorText: "AI-Powered Dental Website Builder",
        href: "https://dentalsite.ai",
      },
      {
        prefix: "",
        anchorText: "Dental Practice Marketing Automation",
        href: "https://dentalsite.ai",
      },
      {
        prefix: "Powered by ",
        anchorText: "DentalSite Practice Solutions",
        href: "https://dentalsite.ai",
      },
    ],
  },
  {
    brand: "fit_site_ai",
    options: [
      {
        prefix: "",
        anchorText: "Personal Trainer Website Builder",
        href: "https://fitsite.ai",
      },
      {
        prefix: "Powered by ",
        anchorText: "FitSite AI",
        href: "https://fitsite.ai",
      },
      {
        prefix: "",
        anchorText: "Gym Website Design",
        href: "https://fitsite.ai",
      },
      {
        prefix: "Built with ",
        anchorText: "AI Fitness Marketing Platform",
        href: "https://fitsite.ai",
      },
      {
        prefix: "",
        anchorText: "Fitness Studio Website Builder",
        href: "https://fitsite.ai",
      },
      {
        prefix: "Website by ",
        anchorText: "Personal Training Digital Solutions",
        href: "https://fitsite.ai",
      },
      {
        prefix: "",
        anchorText: "Gym CRM & Member Management Platform",
        href: "https://fitsite.ai",
        suffix: " – FitSite",
      },
      {
        prefix: "Designed with ",
        anchorText: "AI-Powered Fitness Website Builder",
        href: "https://fitsite.ai",
      },
      {
        prefix: "",
        anchorText: "Fitness Business Marketing Automation",
        href: "https://fitsite.ai",
      },
      {
        prefix: "Powered by ",
        anchorText: "FitSite Gym Solutions",
        href: "https://fitsite.ai",
      },
    ],
  },
  {
    brand: "cast_kit",
    options: [
      {
        prefix: "",
        anchorText: "Podcast Website Builder",
        href: "https://castkit.com",
      },
      {
        prefix: "Powered by ",
        anchorText: "CastKit",
        href: "https://castkit.com",
      },
      {
        prefix: "",
        anchorText: "Podcaster Website & Hosting Platform",
        href: "https://castkit.com",
      },
      {
        prefix: "Built with ",
        anchorText: "AI Podcast Marketing Tools",
        href: "https://castkit.com",
      },
      {
        prefix: "",
        anchorText: "Podcast SEO & Content Repurposing",
        href: "https://castkit.com",
      },
      {
        prefix: "Website by ",
        anchorText: "Podcast Digital Solutions",
        href: "https://castkit.com",
      },
      {
        prefix: "",
        anchorText: "Podcast Distribution Platform",
        href: "https://castkit.com",
        suffix: " – CastKit",
      },
      {
        prefix: "Designed with ",
        anchorText: "AI-Powered Podcast Website Builder",
        href: "https://castkit.com",
      },
      {
        prefix: "",
        anchorText: "Podcast Show Notes & Transcript Platform",
        href: "https://castkit.com",
      },
      {
        prefix: "Powered by ",
        anchorText: "CastKit Podcasting Solutions",
        href: "https://castkit.com",
      },
    ],
  },
];

const brandAttributionMap: Record<BrandKey, BrandAttributionOption[]> =
  brandAttributionOptions.reduce(
    (acc, entry) => {
      acc[entry.brand] = entry.options;
      return acc;
    },
    {} as Record<BrandKey, BrandAttributionOption[]>,
  );

type BrandAttributionBaseProps = {
  variant?: "div" | "span";
  containerClassName?: string;
  linkClassName?: string;
  internalBrandSlug: InternalBrandSlug;
  optionIndex: number; // 0–9
};

/**
 * Safely build a URL with ?source=&sourceRef= query params.
 * Uses location.host and location.href in the browser, no-op on server.
 */
function buildTrackedHref(baseHref: string): string {
  if (typeof window === "undefined") {
    // SSR / static render: just return base href
    return baseHref;
  }

  try {
    const url = new URL(baseHref);
    const source = window.location.host;
    const sourceRef = window.location.href;

    // You may want to namespace these if needed, but this matches your spec
    url.searchParams.set("source", source);
    url.searchParams.set("sourceRef", sourceRef);

    return url.toString();
  } catch {
    // If baseHref is not a valid absolute URL, fall back gracefully
    try {
      const url = new URL(baseHref, window.location.origin);
      const source = window.location.host;
      const sourceRef = window.location.href;

      url.searchParams.set("source", source);
      url.searchParams.set("sourceRef", sourceRef);

      return url.toString();
    } catch {
      // Worst case, just return the original href
      return baseHref;
    }
  }
}

export const BrandAttribution: React.FC<BrandAttributionBaseProps> = ({
  variant = "span",
  containerClassName,
  linkClassName,
  internalBrandSlug,
  optionIndex,
}) => {
  const options = brandAttributionMap[internalBrandSlug];

  if (!options || optionIndex < 0 || optionIndex >= options.length) {
    return null;
  }

  const { prefix = "", anchorText, href, suffix = "" } = options[optionIndex];

  const ContainerEl = variant;

  // Initialize with base href to match server render
  const [trackedHref, setTrackedHref] = React.useState(href);

  // Add tracking params only on client after hydration
  React.useEffect(() => {
    setTrackedHref(buildTrackedHref(href));
  }, [href]);

  return (
    <ContainerEl className={containerClassName}>
      {prefix}
      <a
        href={trackedHref}
        target="_blank"
        rel="noreferrer noopener"
        className={linkClassName}
      >
        {anchorText}
      </a>
      {suffix}
    </ContainerEl>
  );
};
