```tsx
import { cn } from "@/lib/utils";

interface Logos1Props {
  className?: string;
}

const Logos1 = ({ className }: Logos1Props) => {
  const partners = [
    {
      name: "Astro",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/astro-wordmark.svg",
    },
    {
      name: "Vercel",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/vercel-wordmark.svg",
    },
    {
      name: "Astro",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/astro-wordmark.svg",
    },
    {
      name: "Supabase",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/supabase-wordmark.svg",
    },
    {
      name: "Figma",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/figma-wordmark.svg",
    },
  ];

  return (
    <section
      className={cn(
        "container flex flex-wrap items-center justify-between gap-12 py-32",
        className,
      )}
    >
      <p className="text-lg leading-[140%] tracking-[-0.32px] text-primary">
        Used by the world&apos;s leading companies
      </p>
      <div className="flex flex-wrap items-center gap-x-8 gap-y-6 opacity-70 grayscale lg:gap-[60px]">
        {partners.map((partner, index) => (
          <img
            key={index}
            src={partner.logo}
            alt={`${partner.name} logo`}
            width={109}
            height={48}
            className="object-contain"
          />
        ))}
      </div>
    </section>
  );
};

export { Logos1 };

```

```tsx
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

const logos = [
  {
    id: "logo-1",
    description: "Logo 1",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg",
  },
  {
    id: "logo-2",
    description: "Logo 2",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-2.svg",
  },
  {
    id: "logo-3",
    description: "Logo 3",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-3.svg",
  },
  {
    id: "logo-4",
    description: "Logo 4",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-4.svg",
  },
  {
    id: "logo-5",
    description: "Logo 5",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-5.svg",
  },
  {
    id: "logo-6",
    description: "Logo 6",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-6.svg",
  },
];

interface Logos2Props {
  className?: string;
}

const Logos2 = ({ className }: Logos2Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid overflow-hidden rounded-xl border border-border md:grid-cols-2">
          <div className="my-auto px-6 py-10 sm:px-10 sm:py-12 lg:p-16">
            <div className="w-full md:max-w-md">
              <h2 className="mb-4 text-2xl font-semibold lg:text-3xl">
                Our certifications say it all.
              </h2>
              <p className="mb-6 text-lg">
                In non libero bibendum odio pellentesque ullamcorper. Aenean
                condimentum, dolor commodo pulvinar bibendum.
              </p>
              <Button className="w-full md:w-fit">
                <ArrowRight className="mr-2 size-5" />
                Get in touch
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-3 border-t border-border md:border-t-0 md:border-l">
            {logos.map((logo) => (
              <div
                key={logo.id}
                className="-mb-px flex items-center justify-center border-r border-b border-border p-5 nth-[3n]:border-r-0 sm:p-6"
              >
                <img
                  src={logo.image}
                  alt={logo.description}
                  className="size-12 object-cover object-center sm:size-16 lg:size-24"
                ></img>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Logos2 };

```

```tsx
// This template requires the Embla Auto Scroll plugin to be installed:
//
// npm install embla-carousel-auto-scroll

"use client";

import AutoScroll from "embla-carousel-auto-scroll";

import { cn } from "@/lib/utils";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface Logo {
  id: string;
  description: string;
  image: string;
  className?: string;
}

interface Logos3Props {
  heading?: string;
  logos?: Logo[];
  className?: string;
}

const Logos3 = ({
  heading = "Trusted by these companies",
  logos = [
    {
      id: "logo-1",
      description: "Logo 1",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/astro-wordmark.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-2",
      description: "Logo 2",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/figma-wordmark.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-3",
      description: "Logo 3",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/nextjs-wordmark.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-4",
      description: "Logo 4",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/react-wordmark.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-5",
      description: "Logo 5",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcn-ui-wordmark.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-6",
      description: "Logo 6",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/supabase-wordmark.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-7",
      description: "Logo 7",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/tailwind-wordmark.svg",
      className: "h-4 w-auto",
    },
    {
      id: "logo-8",
      description: "Logo 8",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/vercel-wordmark.svg",
      className: "h-7 w-auto",
    },
  ],
  className,
}: Logos3Props) => {
  return (
    <section className={cn("py-64", className)}>
      <div className="container flex flex-col items-center text-center">
        <h1 className="my-6 text-2xl font-bold text-pretty lg:text-4xl">
          {heading}
        </h1>
      </div>
      <div className="pt-10 md:pt-16 lg:pt-20">
        <div className="relative mx-auto flex items-center justify-center lg:max-w-5xl">
          <Carousel
            opts={{ loop: true }}
            plugins={[AutoScroll({ playOnInit: true })]}
          >
            <CarouselContent className="ml-0">
              {logos.map((logo) => (
                <CarouselItem
                  key={logo.id}
                  className="flex basis-1/3 justify-center pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
                >
                  <div className="mx-10 flex shrink-0 items-center justify-center">
                    <div>
                      <img
                        src={logo.image}
                        alt={logo.description}
                        className={logo.className}
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="absolute inset-y-0 left-0 w-12 bg-linear-to-r from-background to-transparent"></div>
          <div className="absolute inset-y-0 right-0 w-12 bg-linear-to-l from-background to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export { Logos3 };

```

```tsx
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const logos = [
  {
    name: "Astro",
    logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/astro-wordmark.svg",
  },
  {
    name: "Vercel",
    logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/vercel-wordmark.svg",
  },
  {
    name: "Supabase",
    logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/supabase-wordmark.svg",
  },
  {
    name: "Figma",
    logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/figma-wordmark.svg",
  },
  {
    name: "Astro",
    logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/nextjs-wordmark.svg",
  },
  {
    name: "Vercel",
    logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/github-wordmark.svg",
  },
  {
    name: "Astro",
    logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/sketch-wordmark.svg",
  },
  {
    name: "Supabase",
    logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/tailwind-wordmark.svg",
  },
];

interface Logos4Props {
  className?: string;
}

const Logos4 = ({ className }: Logos4Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="text-center">
          <Badge variant="outline">Referral Partners</Badge>
          <h1 className="mx-auto mt-8 mb-5 max-w-3xl text-4xl font-bold text-balance md:text-6xl">
            Join our partner network. Grow together with us.
          </h1>
          <p className="mx-auto max-w-3xl text-xl font-medium text-balance">
            Partner with leading companies in the industry, unlock new
            opportunities, and accelerate your business growth.
          </p>
          <Button size="lg" className="mt-8">
            Become a partner
          </Button>
        </div>
      </div>
      <div className="mx-auto mt-24 grid max-w-5xl grid-cols-2 place-items-center gap-x-4 gap-y-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {logos.map((logo) => (
          <img
            className="grayscale"
            src={logo.logo}
            key={logo.name}
            alt={logo.name}
            width={144}
            height={80}
          />
        ))}
      </div>
    </section>
  );
};

export { Logos4 };

```

```tsx
import { cn } from "@/lib/utils";

interface Logos5Props {
  className?: string;
}

const Logos5 = ({ className }: Logos5Props) => {
  const topRowCompanies = [
    {
      name: "Mercury",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mainline/logos/mercury.svg",
      width: 143,
      height: 26,
      href: "https://mercury.com",
    },
    {
      name: "Watershed",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mainline/logos/watershed.svg",
      width: 154,
      height: 31,
      href: "https://watershed.com",
    },
    {
      name: "Retool",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mainline/logos/retool.svg",
      width: 113,
      height: 22,
      href: "https://retool.com",
    },
    {
      name: "Descript",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mainline/logos/descript.svg",
      width: 112,
      height: 27,
      href: "https://descript.com",
    },
  ];

  const bottomRowCompanies = [
    {
      name: "Perplexity",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mainline/logos/perplexity.svg",
      width: 141,
      height: 32,
      href: "https://perplexity.com",
    },
    {
      name: "Monzo",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mainline/logos/monzo.svg",
      width: 104,
      height: 18,
      href: "https://monzo.com",
    },
    {
      name: "Ramp",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mainline/logos/ramp.svg",
      width: 105,
      height: 28,
      href: "https://ramp.com",
    },
    {
      name: "Raycast",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mainline/logos/raycast.svg",
      width: 128,
      height: 33,
      href: "https://raycast.com",
    },
    {
      name: "Arc",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mainline/logos/arc.svg",
      width: 90,
      height: 28,
      href: "https://arc.com",
    },
  ];

  return (
    <section className={cn("py-32", className)}>
      <div className="container space-y-10 lg:space-y-16">
        <div className="text-center">
          <h2 className="mb-4 text-xl font-bold text-balance md:text-2xl lg:text-3xl">
            Powering the world's best product teams.
            <br className="max-md:hidden" />
            <span className="text-muted-foreground">
              From next-gen startups to established enterprises.
            </span>
          </h2>
        </div>

        <div className="flex w-full flex-col items-center gap-8">
          {/* Top row - 4 logos */}
          <div className="grid grid-cols-2 items-center justify-items-center gap-x-12 gap-y-8 max-md:w-full sm:grid-cols-4 md:gap-x-20 lg:gap-x-28">
            {topRowCompanies.map((company, index) => (
              <a href={company.href} target="_blank" key={index}>
                <img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  width={company.width}
                  height={company.height}
                  className="object-contain transition-opacity hover:opacity-70"
                />
              </a>
            ))}
          </div>

          {/* Bottom row - 5 logos */}
          <div className="grid grid-cols-2 items-center justify-items-center gap-x-12 gap-y-8 max-md:w-full sm:grid-cols-5 md:gap-x-20 lg:gap-x-28">
            {bottomRowCompanies.map((company, index) => (
              <a href={company.href} target="_blank" key={index}>
                <img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  width={company.width}
                  height={company.height}
                  className="object-contain transition-opacity hover:opacity-70"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Logos5 };

```

```tsx
"use client";

import { cn } from "@/lib/utils";
const ITEMS = [
  {
    name: "Mercury",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mainline/logos/mercury.svg",
    width: 143,
    height: 26,
    href: "https://mercury.com",
  },
  {
    name: "Watershed",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mainline/logos/watershed.svg",
    width: 154,
    height: 31,
    href: "https://watershed.com",
  },
  {
    name: "Retool",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mainline/logos/retool.svg",
    width: 113,
    height: 22,
    href: "https://retool.com",
  },
  {
    name: "Descript",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mainline/logos/descript.svg",
    width: 112,
    height: 27,
    href: "https://descript.com",
  },
  {
    name: "Perplexity",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mainline/logos/perplexity.svg",
    width: 141,
    height: 32,
    href: "https://perplexity.ai",
  },
  {
    name: "Monzo",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mainline/logos/monzo.svg",
    width: 104,
    height: 18,
    href: "https://monzo.com",
  },
  {
    name: "Ramp",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mainline/logos/ramp.svg",
    width: 105,
    height: 28,
    href: "https://ramp.com",
  },
  {
    name: "Raycast",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mainline/logos/raycast.svg",
    width: 128,
    height: 33,
    href: "https://raycast.com",
  },
  {
    name: "Arc",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mainline/logos/arc.svg",
    width: 90,
    height: 28,
    href: "https://arc.com",
  },
];

interface Logos7Props {
  className?: string;
}

const Logos7 = ({ className }: Logos7Props) => {
  return (
    <section
      className={cn("overflow-hidden bg-muted py-32 dark:bg-muted", className)}
    >
      <div className="container text-center">
        <h2 className="text-xl font-semibold tracking-tight text-balance lg:text-3xl">
          Powering the world&apos;s best product teams.
          <br />
          <span className="text-muted-foreground">
            From next-gen startups to established enterprises.
          </span>
        </h2>
      </div>

      <div className="relative mt-10">
        <div className="flex w-full">
          {/* First marquee group */}
          <div className="flex shrink-0 animate-marquee items-center gap-12">
            {ITEMS.map((logo, index) => (
              <a href={logo.href} target="_blank" key={index} className="p-6">
                <img
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  className="object-contain transition-opacity hover:opacity-70"
                />
              </a>
            ))}
          </div>
          {/* Second marquee group */}
          <div className="flex shrink-0 animate-marquee items-center gap-12">
            {ITEMS.map((logo, index) => (
              <a href={logo.href} target="_blank" key={index} className="p-6">
                <img
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  className="object-contain transition-opacity hover:opacity-70"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Logos7 };

```

```tsx
import { cn } from "@/lib/utils";

interface Logo {
  name: string;
  logo: string;
  className: string;
}

interface Logos8Props {
  title?: string;
  subtitle?: string;
  logos?: Logo[];
  className?: string;
}

const Logos8 = ({
  title = "Trusted by these companies",
  subtitle = "Used by the world's leading companies",
  logos = [
    {
      name: "Vercel",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/vercel-wordmark.svg",
      className: "h-7 w-auto",
    },
    {
      name: "Astro",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/tailwind-wordmark.svg",
      className: "h-5 w-auto",
    },
    {
      name: "Supabase",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/supabase-wordmark.svg",
      className: "h-6 w-auto",
    },
    {
      name: "Figma",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/figma-wordmark.svg",
      className: "h-5 w-auto",
    },
    {
      name: "Astro",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/astro-wordmark.svg",
      className: "h-6 w-auto",
    },
  ],
  className,
}: Logos8Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="mt-1 text-muted-foreground">{subtitle}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-6 lg:gap-12">
            {logos.map((logo, index) => (
              <img
                key={index}
                src={logo.logo}
                alt={`${logo.name} logo`}
                width={109}
                height={48}
                className={logo.className}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Logos8 };

```

```tsx
"use client";

import AutoScroll from "embla-carousel-auto-scroll";

import { cn } from "@/lib/utils";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface Logos10Props {
  className?: string;
}

const Logos10 = ({ className }: Logos10Props) => {
  const logos = [
    {
      id: "logo-1",
      description: "Logo 1",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/astro-wordmark.svg",
      className: "h-7 w-auto dark:invert",
    },
    {
      id: "logo-2",
      description: "Logo 2",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-1.svg",
      className: "h-7 w-auto dark:invert",
    },
    {
      id: "logo-3",
      description: "Logo 3",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-2.svg",
      className: "h-7 w-auto dark:invert",
    },
    {
      id: "logo-4",
      description: "Logo 4",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-3.svg",
      className: "h-7 w-auto dark:invert",
    },
    {
      id: "logo-5",
      description: "Logo 5",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-4.svg",
      className: "h-7 w-auto dark:invert",
    },
    {
      id: "logo-6",
      description: "Logo 6",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-5.svg",
      className: "h-5 w-auto dark:invert",
    },
    {
      id: "logo-7",
      description: "Logo 7",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-6.svg",
      className: "h-7 w-auto dark:invert",
    },
    {
      id: "logo-8",
      description: "Logo 8",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-7.svg",
      className: "h-7 w-auto dark:invert",
    },
  ];

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h1 className="my-6 max-w-4xl text-4xl font-medium tracking-tighter text-foreground md:text-6xl">
          Discover how our tools have unlocked new{" "}
          <span className="text-muted-foreground/40">
            levels of creativity{" "}
          </span>
          and efficiency
        </h1>

        <div className="flex w-fit items-center justify-center gap-4 rounded-full bg-muted px-4 py-2 tracking-tight transition-all ease-in-out hover:gap-6">
          <span className="inline-block size-3 rounded-full bg-foreground" />
          <p className="text-foreground">Checkout Our Users</p>
        </div>

        <div className="relative mx-auto flex items-center justify-center pt-8">
          <Carousel
            opts={{ loop: true }}
            plugins={[AutoScroll({ playOnInit: true })]}
          >
            <CarouselContent className="ml-0">
              {logos.map((logo, index) => (
                <CarouselItem
                  key={logo.id}
                  className="relative flex h-35 basis-1/2 justify-center border border-r-0 border-border pl-0 sm:basis-1/4 md:basis-1/3 lg:basis-1/6"
                >
                  <div className="flex flex-col items-center justify-center lg:mx-10">
                    <p className="absolute top-2 left-2 text-xs tracking-tighter">
                      {(index + 1).toString().padStart(2, "0")}
                    </p>
                    <img
                      src={logo.image}
                      alt={logo.description}
                      className={logo.className}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-background to-transparent"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-background to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export { Logos10 };

```

```tsx
"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import React from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const bgPattern = {
  backgroundImage:
    "linear-gradient(135deg, var(--muted) 25%, transparent 25.5%, transparent 50%, var(--muted) 50.5%, var(--muted) 75%, transparent 75.5%, transparent)",
  backgroundSize: "10px 10px",
};

interface Logos11Props {
  className?: string;
}

const Logos11 = ({ className }: Logos11Props) => {
  const logos = [
    {
      id: "logo-1",
      description: "Logo 1",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/astro-wordmark.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-2",
      fill: true,
      description: "Logo 2",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/arc-white.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-3",
      description: "Logo 3",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-2.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-4",
      description: "Logo 4",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-3.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-5",
      description: "Logo 5",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-4.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-6",
      description: "Logo 6",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-5.svg",
      className: "h-5 w-auto",
    },
    {
      id: "logo-7",
      description: "Logo 7",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-6.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-8",
      description: "Logo 8",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-7.svg",
      className: "h-7 w-auto",
    },
  ];

  return (
    <section
      className={cn("relative grid w-screen overflow-hidden py-32", className)}
    >
      <div className="relative z-10 container h-full items-center justify-center gap-6">
        <div className="relative flex h-20 w-full items-center justify-center border border-x-0">
          <h1 className="text-3xl font-medium tracking-tighter uppercase md:text-4xl">
            Supported by the Finest
          </h1>
          <BgPattern />
        </div>
        <div className="w-full py-20">
          <Carousel
            opts={{ loop: true, align: "start" }}
            plugins={[AutoScroll({ playOnInit: true })]}
          >
            <CarouselContent className="ml-0">
              {logos.map((logo) => (
                <CarouselItem
                  key={logo.id}
                  className={cn(
                    "relative flex h-35 basis-1/2 justify-center border border-t-0 border-r-0 border-border pl-0 sm:basis-1/4 md:basis-1/3 lg:basis-1/6",
                    logo.fill && "bg-orange-500",
                  )}
                >
                  <div className="flex flex-col items-center justify-center lg:mx-10">
                    <img
                      src={logo.image}
                      alt={logo.description}
                      className={logo.className}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <Carousel
            opts={{ loop: true, align: "end" }}
            plugins={[AutoScroll({ playOnInit: true })]}
          >
            <CarouselContent className="ml-0">
              {logos.map((logo) => (
                <CarouselItem
                  key={logo.id}
                  className={cn(
                    "relative flex h-35 basis-1/2 justify-center border border-t-0 border-r-0 border-b-0 border-border pl-0 sm:basis-1/4 md:basis-1/3 lg:basis-1/6",
                    logo.fill && "bg-orange-500",
                  )}
                >
                  <div className="flex flex-col items-center justify-center lg:mx-10">
                    <img
                      src={logo.image}
                      alt={logo.description}
                      className={logo.className}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        <div className="relative flex h-20 w-full items-center justify-center border border-x-0">
          <Button className="h-12 rounded-none !px-8">Get Your Now</Button>
          <Button
            variant="ghost"
            className="flex h-12 items-center gap-3 rounded-none !px-8"
          >
            <PlayIcon />
            How it works
          </Button>
          <BgPattern sideLines={false} />
        </div>
      </div>
    </section>
  );
};

export { Logos11 };

const PlayIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="15"
      height="18"
      viewBox="0 0 15 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M1.11523 3.94458C1.11523 2.36225 2.86573 1.40657 4.19675 2.26222L12.4982 7.59889C13.7229 8.38617 13.7229 10.1763 12.4982 10.9636L4.19675 16.3003C2.86573 17.1559 1.11523 16.2003 1.11523 14.6179V3.94458Z"
        fill="black"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const BgPattern = ({ sideLines = true }: { sideLines?: boolean }) => {
  return (
    <>
      {/* bg pattern left */}
      <div
        className="absolute top-1/2 left-0 z-20 size-20 -translate-x-full -translate-y-1/2 border border-r-0"
        style={bgPattern}
      >
        <span className="absolute -top-1 -right-1 z-20 size-2 bg-foreground" />
        <span className="absolute -right-1 -bottom-1 z-20 size-2 bg-foreground" />
        <span className="absolute -bottom-1 -left-1 z-20 size-2 bg-foreground" />
        <span className="absolute -top-1 -left-1 z-20 size-2 bg-foreground" />
      </div>

      {/* bg pattern right */}
      <div
        className="absolute top-1/2 right-0 z-20 size-20 translate-x-full -translate-y-1/2 border border-l-0"
        style={bgPattern}
      >
        <span className="absolute -top-1 -right-1 z-20 size-2 bg-foreground" />
        <span className="absolute -right-1 -bottom-1 z-20 size-2 bg-foreground" />
        <span className="absolute -bottom-1 -left-1 z-20 size-2 bg-foreground" />
        <span className="absolute -top-1 -left-1 z-20 size-2 bg-foreground" />
      </div>

      {/* bg Lines left */}
      {sideLines && (
        <div className="absolute left-0 z-10 h-[200vh] w-px border-l" />
      )}
      {sideLines && (
        <div className="absolute -left-20 z-10 h-[200vh] w-px border-l" />
      )}

      {/* bg Lines right */}
      {sideLines && (
        <div className="absolute right-0 z-10 h-[200vh] w-px border-l" />
      )}
      {sideLines && (
        <div className="absolute -right-20 z-10 h-[200vh] w-px border-l" />
      )}
    </>
  );
};

```

```tsx
"use client";

import AutoScroll from "embla-carousel-auto-scroll";

import { cn } from "@/lib/utils";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface Logos12Props {
  className?: string;
}

const Logos12 = ({ className }: Logos12Props) => {
  const logos = [
    {
      id: "logo-1",
      description: "Logo 1",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/astro-wordmark.svg",
      className: "h-7 w-auto dark:invert",
    },
    {
      id: "logo-2",
      description: "Logo 2",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-1.svg",
      className: "h-7 w-auto dark:invert",
    },
    {
      id: "logo-3",
      description: "Logo 3",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-2.svg",
      className: "h-7 w-auto dark:invert",
    },
    {
      id: "logo-4",
      description: "Logo 4",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-3.svg",
      className: "h-7 w-auto dark:invert",
    },
    {
      id: "logo-5",
      description: "Logo 5",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-4.svg",
      className: "h-7 w-auto dark:invert",
    },
    {
      id: "logo-6",
      description: "Logo 6",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-5.svg",
      className: "h-5 w-auto dark:invert",
    },
    {
      id: "logo-7",
      description: "Logo 7",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-6.svg",
      className: "h-7 w-auto dark:invert",
    },
    {
      id: "logo-8",
      description: "Logo 8",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-7.svg",
      className: "h-7 w-auto dark:invert",
    },
  ];

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="relative mx-auto flex items-center justify-center pt-8">
          <Carousel
            opts={{ loop: true }}
            plugins={[AutoScroll({ playOnInit: true })]}
          >
            <CarouselContent className="ml-0">
              {logos.map((logo) => (
                <CarouselItem
                  key={logo.id}
                  className="relative mx-4 flex h-25 basis-1/2 justify-center border-y border-border pl-0 sm:basis-1/4 md:basis-1/3 lg:basis-1/7"
                >
                  <div className="flex flex-col items-center justify-center lg:mx-10">
                    <img
                      src={logo.image}
                      alt={logo.description}
                      className={logo.className}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-background to-transparent"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-background to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export { Logos12 };

```

```tsx
import { cn } from "@/lib/utils";

interface Logos13Props {
  className?: string;
}

const Logos13 = ({ className }: Logos13Props) => {
  const logos = [
    {
      id: "logo-1",
      description: "/2021",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/astro-wordmark.svg",
      className: "h-7 w-auto dark:invert",
    },
    {
      id: "logo-2",
      description: "/2022",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-1.svg",
      className: "h-7 w-auto dark:invert",
    },
    {
      id: "logo-3",
      description: "/2023",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-2.svg",
      className: "h-7 w-auto dark:invert",
    },
    {
      id: "logo-4",
      description: "/2024",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-3.svg",
      className: "h-7 w-auto dark:invert",
    },
    {
      id: "logo-5",
      description: "/2025",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-4.svg",
      className: "h-7 w-auto dark:invert",
    },
    {
      id: "logo-6",
      description: "/2026",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-5.svg",
      className: "h-5 w-auto dark:invert",
    },
  ];

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-6">
          <div className="top-10 col-span-2 flex h-fit w-fit items-center gap-3 py-8 lg:sticky">
            <span className="size-3 bg-orange-500" />
            <p className="text-xl text-foreground/30 uppercase lg:text-2xl">
              Our partners
            </p>
          </div>
          <ul className="col-span-4 grid w-full grid-cols-2 gap-2 lg:grid-cols-3">
            {logos.map((logo, index) => (
              <li
                key={index}
                className="relative flex h-72 items-center justify-center rounded-2xl bg-muted"
              >
                <div className="">
                  <img
                    src={logo.image}
                    alt={logo.description}
                    className={logo.className}
                  />
                </div>

                <p className="absolute right-4 bottom-4 font-mono text-sm tracking-tight text-foreground/40">
                  {logo.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export { Logos13 };

```

