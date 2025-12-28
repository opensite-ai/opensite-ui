```tsx
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Hero1Props {
  badge?: string;
  heading: string;
  description: string;
  buttons?: {
    primary?: {
      text: string;
      url: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
  image: {
    src: string;
    alt: string;
  };
  className?: string;
}

const Hero1 = ({
  badge = "✨ Your Website Builder",
  heading = "Blocks Built With Shadcn & Tailwind",
  description = "Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.",
  buttons = {
    primary: {
      text: "Discover all components",
      url: "https://www.shadcnblocks.com",
    },
    secondary: {
      text: "View on GitHub",
      url: "https://www.shadcnblocks.com",
    },
  },
  image = {
    src: "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
    alt: "Hero section demo image showing interface components",
  },
  className,
}: Hero1Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {badge && (
              <Badge variant="outline">
                {badge}
                <ArrowUpRight className="ml-2 size-4" />
              </Badge>
            )}
            <h1 className="my-6 text-4xl font-bold text-pretty lg:text-6xl">
              {heading}
            </h1>
            <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
              {description}
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              {buttons.primary && (
                <Button asChild className="w-full sm:w-auto">
                  <a href={buttons.primary.url}>{buttons.primary.text}</a>
                </Button>
              )}
              {buttons.secondary && (
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <a href={buttons.secondary.url}>
                    {buttons.secondary.text}
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
          <img
            src={image.src}
            alt={image.alt}
            className="max-h-96 w-full rounded-md object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export { Hero1 };

```

```tsx
import { ArrowDownRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Hero2Props {
  className?: string;
}

const Hero2 = ({ className }: Hero2Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <div className="flex justify-end bg-muted">
            <img
              src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
              alt="placeholder hero"
              className="max-h-[600px] w-full rounded-md object-cover lg:max-h-[800px]"
            />
          </div>
          <div className="flex flex-col items-center text-center lg:max-w-3xl lg:items-start lg:text-left">
            <Badge variant="secondary">
              New Release
              <ArrowDownRight className="ml-2 size-4" />
            </Badge>
            <h1 className="my-6 text-4xl font-bold text-pretty md:text-5xl">
              Blocks built with Shadcn & Tailwind
            </h1>
            <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
              doloremque mollitia fugiat omnis! Porro facilis quo animi
              consequatur. Explicabo.
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              <Button className="w-full sm:w-auto">Primary Button</Button>
              <Button variant="outline" className="w-full sm:w-auto">
                Secondary Button
                <ArrowDownRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero2 };

```

```tsx
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Hero6Props {
  className?: string;
}

const Hero6 = ({ className }: Hero6Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <div className="z-10 flex flex-col items-center gap-8 text-center">
            <div className="max-w-3xl">
              <h1 className="mb-4 text-4xl font-semibold text-pretty lg:text-6xl">
                Build your next project with Blocks
              </h1>
              <p className="text-muted-foreground lg:text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
                doloremque mollitia fugiat omnis! Porro facilis quo animi
                consequatur. Explicabo.
              </p>
            </div>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row">
              <Button>
                Get started now
                <ChevronRight className="h-4" />
              </Button>
              <Button variant="ghost">
                Learn more
                <ChevronRight className="h-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-20 grid max-w-7xl gap-px bg-border p-px md:grid-cols-5">
          <img
            src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
            alt="placeholder"
            className="h-full max-h-[500px] w-full object-cover md:col-span-3 dark:invert"
          />
          <div className="relative md:col-span-2">
            <img
              src="https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u"
              alt="placeholder"
              className="h-full max-h-[500px] w-full object-cover dark:invert"
            />
            <Button variant="outline" className="absolute right-5 bottom-5">
              Learn more
              <ChevronRight className="h-4" />
            </Button>
          </div>
        </div>
        <div className="mx-auto mt-12 grid max-w-7xl grid-cols-2 place-items-center gap-6 md:grid-cols-4">
          <img
            src="https://cdn.ing/assets/files/record/286220/t34kymqu5g9xr85o89cji3kfuypb"
            alt="logo"
            className="h-5 sm:h-7 dark:invert"
          />
          <img
            src="https://cdn.ing/assets/files/record/286249/ff7m4wdw0zefj7d96v4ajmljuifc"
            alt="logo"
            className="h-9 sm:h-11 dark:invert"
          />
          <img
            src="https://cdn.ing/assets/files/record/286219/xflgk6oshkxpx4ku0rowz33ey6pi"
            alt="logo"
            className="h-4 sm:h-6 dark:hidden"
          />
          <img
            src="https://cdn.ing/assets/files/record/286251/c64yb2c255uig6vpe4gdlnten7rv"
            alt="logo"
            className="hidden h-4 sm:h-6 dark:block"
          />
          <img
            src="https://cdn.ing/assets/files/record/286252/xd7hyzbpkjwsauxm5j9yn9v44min"
            alt="logo"
            className="h-6 sm:h-7 dark:invert"
          />
        </div>
      </div>
    </section>
  );
};

export { Hero6 };

```

```tsx
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Hero8Props {
  className?: string;
}

const Hero8 = ({ className }: Hero8Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="overflow-hidden border-b border-muted">
        <div className="container">
          <div className="mx-auto flex max-w-5xl flex-col items-center">
            <div className="z-10 items-center text-center">
              <h1 className="mb-8 text-4xl font-semibold text-pretty lg:text-7xl">
                Build faster with Shadcnblocks
              </h1>
              <p className="mx-auto max-w-3xl text-muted-foreground lg:text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
                doloremque mollitia fugiat omnis! Porro facilis quo animi
                consequatur. Explicabo.
              </p>
              <div className="mt-12 flex w-full flex-col justify-center gap-2 sm:flex-row">
                <Button>
                  Get started now
                  <ChevronRight className="ml-2 h-4" />
                </Button>
                <Button variant="ghost">
                  Learn more
                  <ChevronRight className="ml-2 h-4" />
                </Button>
              </div>
            </div>
          </div>
          <img
            src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
            alt="placeholder"
            className="mx-auto mt-24 max-h-[700px] w-full max-w-7xl rounded-t-lg object-cover shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export { Hero8 };

```

```tsx
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/*
 * pattern generated at https://www.fffuel.co/ooorganize/
 */

interface Hero10Props {
  className?: string;
}

const Hero10 = ({ className }: Hero10Props) => {
  return (
    <section className={cn("relative p-0", className)}>
      <div className="absolute h-full w-full bg-[url('https://cdn.ing/assets/files/record/286186/nbdflpgp4ostrno079hygibsflp3')] [mask-image:linear-gradient(to_right,theme(colors.border),transparent,transparent,theme(colors.border))] bg-contain bg-repeat opacity-100 lg:block"></div>
      <div className="container py-28 md:py-32">
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <div className="z-10 mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
            <Badge
              variant="outline"
              className="transition-colors hover:bg-secondary/20"
            >
              New Release
            </Badge>
            <div>
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-pretty md:text-5xl lg:text-7xl">
                This is a heading for your new project
              </h1>
              <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg lg:text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
                doloremque mollitia fugiat omnis! Porro facilis quo animi
                consequatur.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <Button>Get Started</Button>
              <Button variant="outline">Learn More</Button>
            </div>

            <div className="mt-12 flex flex-col items-center gap-4 lg:mt-16">
              <p className="text-center text-sm text-muted-foreground">
                Powering the next generation of digital products
              </p>
              <div className="grid grid-cols-2 place-items-center items-center justify-center gap-6 opacity-80 sm:grid-cols-4 sm:gap-4">
                <img
                  src="https://cdn.ing/assets/files/record/286220/t34kymqu5g9xr85o89cji3kfuypb"
                  alt="ShadCN UI"
                  className="h-6 dark:invert"
                />
                <img
                  src="https://cdn.ing/assets/files/record/286252/xd7hyzbpkjwsauxm5j9yn9v44min"
                  alt="Vercel"
                  className="h-5 dark:invert"
                />
                <img
                  src="https://cdn.ing/assets/files/record/286284/cz20wf2l2tjokrxu563pcml7pkmu"
                  alt="Supabase"
                  className="h-6 dark:hidden"
                />
                <img
                  src="https://cdn.ing/assets/files/record/286217/zvgufvfrljos9ygzttuz01584m5r"
                  alt="Supabase"
                  className="hidden h-6 dark:block"
                />
                <img
                  src="https://cdn.ing/assets/files/record/286219/xflgk6oshkxpx4ku0rowz33ey6pi"
                  alt="Tailwind CSS"
                  className="h-5 dark:hidden"
                />
                <img
                  src="https://cdn.ing/assets/files/record/286251/c64yb2c255uig6vpe4gdlnten7rv"
                  alt="Tailwind CSS"
                  className="hidden h-5 dark:block"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero10 };

```

```tsx
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Hero11Props {
  className?: string;
}

const Hero11 = ({ className }: Hero11Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="border-b">
        <div className="container max-w-7xl">
          <div className="mx-auto flex max-w-5xl flex-col items-center">
            <div className="z-10 flex flex-col items-center gap-6 text-center">
              <img
                src="https://cdn.ing/assets/files/record/286209/4nowqz6c7v6vhzldvh9qdnhmkrwb"
                alt="logo"
                className="h-10 md:h-16"
              />
              <div>
                <h1 className="mb-4 text-3xl font-medium text-pretty lg:text-5xl">
                  Build your next project with Blocks
                </h1>
                <p className="max-w-3xl text-muted-foreground lg:text-xl">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
                  doloremque mollitia fugiat omnis! Porro facilis quo animi
                  consequatur. Explicabo.
                </p>
              </div>
              <Button>
                Get Started
                <ChevronRight className="h-4" />
              </Button>
            </div>
          </div>
          <img
            src="https://cdn.ing/assets/files/record/286207/ce9ss2hob7uml3u1mn8kjvsx93ts"
            alt="placeholder"
            className="mt-20 aspect-video w-full rounded-t-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export { Hero11 };

```

```tsx
import { ExternalLink } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button, buttonVariants } from "@/components/ui/button";

interface Hero12Props {
  className?: string;
}

const Hero12 = ({ className }: Hero12Props) => {
  return (
    <section className={cn("relative overflow-hidden py-32", className)}>
      <div className="absolute inset-x-0 top-0 flex h-full w-full items-center justify-center opacity-100">
        <img
          alt="background"
          src="https://cdn.ing/assets/files/record/286187/4gpn0yq2ptra8iwlvmwwv860ggwv"
          className="[mask-image:radial-gradient(75%_75%_at_center,white,transparent)] opacity-90"
        />
      </div>
      <div className="relative z-10 container">
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="rounded-xl bg-background/30 p-4 shadow-sm backdrop-blur-sm">
              <img
                src="https://cdn.ing/assets/files/record/286209/4nowqz6c7v6vhzldvh9qdnhmkrwb"
                alt="logo"
                className="h-16"
              />
            </div>
            <div>
              <h1 className="mb-6 text-2xl font-bold tracking-tight text-pretty lg:text-5xl">
                Build your next project with{" "}
                <span className="text-primary">Blocks</span>
              </h1>
              <p className="mx-auto max-w-3xl text-muted-foreground lg:text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
                doloremque mollitia fugiat omnis! Porro facilis quo animi
                consequatur. Explicabo.
              </p>
            </div>
            <div className="mt-6 flex justify-center gap-3">
              <Button className="shadow-sm transition-shadow hover:shadow">
                Get Started
              </Button>
              <Button variant="outline" className="group">
                Learn more{" "}
                <ExternalLink className="ml-2 h-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </div>
            <div className="mt-20 flex flex-col items-center gap-5">
              <p className="font-medium text-muted-foreground lg:text-left">
                Built with open-source technologies
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "group flex aspect-square h-12 items-center justify-center p-0",
                  )}
                >
                  <img
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcn-ui-icon.svg"
                    alt="shadcn/ui logo"
                    className="h-6 saturate-0 transition-all group-hover:saturate-100"
                  />
                </a>
                <a
                  href="#"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "group flex aspect-square h-12 items-center justify-center p-0",
                  )}
                >
                  <img
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/typescript-icon.svg"
                    alt="TypeScript logo"
                    className="h-6 saturate-0 transition-all group-hover:saturate-100"
                  />
                </a>

                <a
                  href="#"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "group flex aspect-square h-12 items-center justify-center p-0",
                  )}
                >
                  <img
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/react-icon.svg"
                    alt="React logo"
                    className="h-6 saturate-0 transition-all group-hover:saturate-100"
                  />
                </a>
                <a
                  href="#"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "group flex aspect-square h-12 items-center justify-center p-0",
                  )}
                >
                  <img
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/tailwind-icon.svg"
                    alt="Tailwind CSS logo"
                    className="h-6 saturate-0 transition-all group-hover:saturate-100"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero12 };

```

```tsx
import { Bell, PlayCircle } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Hero13Props {
  className?: string;
}

const Hero13 = ({ className }: Hero13Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <Badge
          variant="outline"
          className="mb-4 max-w-full text-sm font-normal lg:mb-10 lg:py-2 lg:pr-5 lg:pl-2"
        >
          <span className="mr-2 flex size-8 shrink-0 items-center justify-center rounded-full bg-accent">
            <Bell className="size-4" />
          </span>
          <p className="truncate whitespace-nowrap">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
            eaque distinctio iusto voluptas voluptatum sed!
          </p>
        </Badge>
        <h1 className="mb-6 text-4xl leading-none font-bold tracking-tighter md:text-[7vw] lg:text-8xl">
          Streamline your workflow experience.
        </h1>
        <p className="max-w-2xl text-muted-foreground md:text-[2vw] lg:text-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum dolor
          assumenda voluptatem nemo magni a maiores aspernatur.
        </p>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row lg:mt-10">
          <Button size="lg" className="w-full md:w-auto">
            Get a demo
          </Button>
          <Button size="lg" variant="outline" className="w-full md:w-auto">
            <PlayCircle className="mr-2 size-4" />
            Watch video
          </Button>
        </div>
      </div>
    </section>
  );
};

export { Hero13 };

```

```tsx
"use client";

import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const technologies = [
  {
    name: "Next",
    command: "npx create-next-app my-app",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/nextjs-icon.svg",
  },
  {
    name: "Vite",
    command: "npm create vite@latest",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/vite-icon.svg",
  },
  {
    name: "Remix",
    command: "npx create-remix@latest my-app",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/remix-icon.svg",
  },
  {
    name: "Gatsby",
    command: "npm init gatsby",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/gatsby-icon.svg",
  },
  {
    name: "Astro",
    command: "npm create astro@latest",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/astro-icon.svg",
  },

  {
    name: "Laravel",
    command: "laravel new my-app ",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/laravel-icon.svg",
  },
  {
    name: "React",
    command: "npx create-react-app my-app",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/react-icon.svg",
  },
];

interface Hero14Props {
  className?: string;
}

const Hero14 = ({ className }: Hero14Props) => {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    if (!api) return;

    // Set initial selection
    setCurrent(api.selectedScrollSnap());

    // Create a reusable update function
    const updateCurrent = () => {
      // Trigger fade out and then update with fade in
      setFadeIn(false);
      setTimeout(() => {
        setCurrent(api.selectedScrollSnap());
        setFadeIn(true);
      }, 200); // Short delay for the fade effect
    };

    // Add event listeners for both 'select' and 'settle'
    api.on("select", updateCurrent);
    api.on("settle", updateCurrent);

    // Clean up event listeners when component unmounts
    return () => {
      api.off("select", updateCurrent);
      api.off("settle", updateCurrent);
    };
  }, [api]);

  // Function to manually select a technology
  const selectTechnology = (index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  };

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col justify-center">
          <h1 className="mx-auto mb-4 max-w-2xl text-center text-4xl font-bold md:text-6xl">
            Install with one Command
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-center text-lg text-muted-foreground">
            Our library is compatible with all popular frameworks, download our
            SDK and get started in minutes.
          </p>
          <div className="mx-auto mt-8 mb-12 flex h-[60px] w-fit items-center gap-2 rounded-md bg-muted px-4 py-2 text-center">
            <div
              className={cn(
                "flex items-center gap-2 transition-opacity duration-300",
                fadeIn ? "opacity-100" : "opacity-0",
              )}
            >
              <img
                src={technologies[current]?.image}
                alt={technologies[current]?.name}
                className="h-4 md:h-7"
              />

              <p className="border-l px-2 font-mono text-sm">
                {technologies[current]?.command}
              </p>
            </div>
          </div>
        </div>
        <Carousel
          setApi={setApi}
          plugins={[plugin.current]}
          opts={{
            loop: true,
          }}
          className="relative mx-auto w-full max-w-3xl before:absolute before:top-0 before:bottom-0 before:left-0 before:z-10 before:w-36 before:bg-linear-to-r before:from-background before:to-transparent after:absolute after:top-0 after:right-0 after:bottom-0 after:z-10 after:w-36 after:bg-linear-to-l after:from-background after:to-transparent"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {technologies.map((technology, idx) => (
              <CarouselItem
                key={idx}
                className="basis-1/3 select-none sm:basis-1/4 md:basis-1/6"
              >
                <div
                  className={cn(
                    "flex cursor-pointer items-center justify-center gap-2 rounded-md border p-6",
                    idx === current ? "border-input" : "border-transparent",
                  )}
                  onClick={() => selectTechnology(idx)}
                >
                  <img
                    className="h-4 shrink-0 md:h-7"
                    src={technology.image}
                    alt={technology.name}
                  />
                  <p>{technology.name}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export { Hero14 };

```

```tsx
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Hero16Props {
  className?: string;
}

const Hero16 = ({ className }: Hero16Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container flex flex-col items-center text-center">
        <h1 className="my-3 text-3xl font-bold text-pretty sm:text-4xl md:my-6 lg:text-6xl">
          Welcome to Our Website
        </h1>
        <p className="mb-6 max-w-xl text-muted-foreground lg:mb-12 lg:text-2xl">
          Elig doloremque mollitia fugiat omnis! Porro facilis quo animi
          consequatur.
        </p>
        <div className="mb-6 flex gap-2 lg:mb-12">
          <Button>Primary</Button>
          <Button variant="outline">Secondary</Button>
        </div>
      </div>
      <div className="container">
        <div className="aspect-video [mask-image:linear-gradient(#000_80%,transparent_100%)]">
          <img
            src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
            alt="placeholder hero"
            className="h-full w-full rounded-md object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export { Hero16 };

```

```tsx
import { Expand, Globe, MoveRight, Rocket, Wrench } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Hero24Props {
  className?: string;
}

const Hero24 = ({ className }: Hero24Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="text-center">
          <img
            src="https://cdn.ing/assets/files/record/286209/4nowqz6c7v6vhzldvh9qdnhmkrwb"
            alt="placeholder"
            className="mx-auto mb-5 w-16 md:mb-6 md:w-24 lg:mb-7 lg:w-28"
          />
          <span className="mb-3 text-sm tracking-widest text-muted-foreground md:text-base">
            PLATFORM
          </span>
          <h1 className="mt-4 text-4xl font-semibold text-balance lg:text-6xl">
            Develop, launch, and grow your service with our platform
          </h1>
          <Button className="mt-8" size="lg">
            Start now for free
            <MoveRight className="ml-2" strokeWidth={1} />
          </Button>
        </div>
        <div className="mt-16 grid gap-px overflow-hidden rounded-lg border bg-input md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-3 bg-background p-5 md:gap-6">
            <Globe className="size-6 shrink-0" />
            <div>
              <h2 className="text-sm font-semibold md:text-base">
                Robust Infrastructure
              </h2>
              <p className="text-sm text-muted-foreground md:text-base">
                Reliable and scalable infrastructure, easy to manage.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 bg-background p-5 md:gap-6">
            <Rocket className="size-6 shrink-0" />
            <div>
              <h2 className="text-sm font-semibold md:text-base">Easy Setup</h2>
              <p className="text-sm text-muted-foreground md:text-base">
                Quick and simple configuration for any use case.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 bg-background p-5 md:gap-6">
            <Expand className="size-6 shrink-0" />
            <div>
              <h2 className="text-sm font-semibold md:text-base">
                Effortless Scaling
              </h2>
              <p className="text-sm text-muted-foreground md:text-base">
                Built to handle increased demand with ease.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 bg-background p-5 md:gap-6">
            <Wrench className="size-6 shrink-0" />
            <div>
              <h2 className="text-sm font-semibold md:text-base">
                Low Maintenance
              </h2>
              <p className="text-sm text-muted-foreground md:text-base">
                Focus on building, not on maintenance tasks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero24 };

```

```tsx
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Hero37Props {
  className?: string;
}

const Hero37 = ({ className }: Hero37Props) => {
  return (
    <section className={cn("overflow-hidden py-32", className)}>
      <div className="container flex flex-col items-center text-center">
        <p className="text-xs uppercase">New Release</p>
        <h1 className="my-3 text-2xl font-bold text-pretty sm:text-4xl md:my-6 lg:text-5xl">
          Welcome to Our Website
        </h1>
        <p className="mb-6 max-w-xl text-muted-foreground md:mb-12 lg:text-xl">
          Elig doloremque mollitia fugiat omnis! Porro facilis quo animi
          consequatur.
        </p>
        <div className="flex w-full flex-col justify-center gap-2 sm:flex-row">
          <Button className="w-full sm:w-auto">
            <ArrowRight className="mr-2 size-4" />
            Primary
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            Secondary
          </Button>
        </div>
      </div>
      <div className="mt-16 flex flex-col items-center justify-center lg:mt-32">
        <div className="b relative mx-auto aspect-square w-[95%] max-w-[31.25rem] sm:w-full">
          <div className="absolute inset-x-1/2 top-full z-0 flex w-[120rem] -translate-x-1/2 -translate-y-[4rem] md:-translate-y-[2rem]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              viewBox="0 0 800 800"
              className="h-full w-full text-muted-foreground opacity-20"
            >
              {Array.from(Array(4000).keys()).map((dot, index, array) => {
                const angle = 0.2 * index;
                const scalar = 300 + index * (100 / array.length);
                const x = Math.round(Math.cos(angle) * scalar);
                const y = Math.round(Math.sin(angle) * scalar);
                return (
                  <circle
                    key={index}
                    r={1}
                    cx={400 + x}
                    cy={400 + y}
                    fill="currentColor"
                    opacity={(array.length - index) / array.length}
                  />
                );
              })}
            </svg>
          </div>
          <div className="absolute inset-0 z-5 m-auto flex aspect-29/36 w-4/5 max-w-[16rem] translate-x-[-75%] translate-y-[10%] scale-[0.85] rotate-[-15deg] justify-center rounded-lg border border-border bg-accent opacity-60 md:w-[21.25rem] md:max-w-[21.25rem]"></div>
          <div className="absolute inset-0 z-10 m-auto flex aspect-29/36 w-4/5 max-w-[16rem] justify-center rounded-lg border border-border bg-accent md:w-[21.25rem] md:max-w-[21.25rem]"></div>
          <div className="absolute inset-0 z-5 m-auto flex aspect-29/36 w-4/5 max-w-[16rem] translate-x-[75%] translate-y-[10%] scale-[0.85] rotate-[15deg] justify-center rounded-lg border border-border bg-accent opacity-60 md:w-[21.25rem] md:max-w-[21.25rem]"></div>
        </div>
      </div>
    </section>
  );
};

export { Hero37 };

```

```tsx
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Hero38Props {
  className?: string;
}

const Hero38 = ({ className }: Hero38Props) => {
  return (
    <section className={cn("", className)}>
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center py-32 text-center lg:mx-auto lg:items-start lg:px-0 lg:text-left">
            <p>New Release</p>
            <h1 className="my-6 text-4xl font-bold text-pretty lg:text-6xl">
              Welcome to Our Website
            </h1>
            <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
              doloremque mollitia fugiat omnis! Porro facilis quo animi
              consequatur. Explicabo.
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              <Button className="w-full sm:w-auto">
                <ArrowRight className="mr-2 size-4" />
                Primary
              </Button>
              <Button variant="outline" className="w-full sm:w-auto">
                Secondary
              </Button>
            </div>
          </div>
          <div className="relative aspect-3/4">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                viewBox="0 0 800 800"
                className="h-full w-full text-muted-foreground opacity-20"
              >
                {Array.from(Array(720).keys()).map((dot, index, array) => {
                  const angle = 0.2 * index;
                  const scalar = 40 + index * (360 / array.length);
                  const x = Math.round(Math.cos(angle) * scalar);
                  const y = Math.round(Math.sin(angle) * scalar);

                  return (
                    <circle
                      key={index}
                      r={(3 * index) / array.length}
                      cx={400 + x}
                      cy={400 + y}
                      opacity={1 - Math.sin(angle)}
                    />
                  );
                })}
              </svg>
            </div>
            <div className="absolute top-[10%] left-[8%] flex aspect-5/6 w-[38%] justify-center rounded-lg border border-border bg-accent"></div>
            <div className="absolute top-[20%] right-[12%] flex aspect-square w-[20%] justify-center rounded-lg border border-border bg-accent"></div>
            <div className="absolute right-[24%] bottom-[24%] flex aspect-5/6 w-[38%] justify-center rounded-lg border border-border bg-accent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero38 };

```

```tsx
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Hero39Props {
  className?: string;
}

const Hero39 = ({ className }: Hero39Props) => {
  return (
    <section className={cn("", className)}>
      <div className="container flex flex-col items-center">
        <div className="2xl:w-[calc(min(100vw-2*theme(container.padding),100%+8rem))] w-full overflow-clip rounded-lg bg-accent/50">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="container flex flex-col items-center px-[4rem] py-16 text-center lg:mx-auto lg:items-start lg:px-[4rem] lg:py-32 lg:text-left">
              <p>New Release</p>
              <h1 className="my-6 text-4xl font-bold text-pretty lg:text-6xl">
                Welcome to Our Website
              </h1>
              <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
                doloremque mollitia fugiat omnis! Porro facilis quo animi
                consequatur. Explicabo.
              </p>
              <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
                <Button className="w-full sm:w-auto">
                  <ArrowRight className="mr-2 size-4" />
                  Primary
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="relative aspect-7/8 h-full w-full">
                <div className="absolute top-[12%] right-[50%] flex aspect-square w-[24%] justify-center rounded-lg border border-border bg-accent"></div>
                <div className="absolute top-[36%] right-[50%] flex aspect-5/6 w-[40%] justify-center rounded-lg border border-border bg-accent"></div>
                <div className="absolute bottom-[36%] left-[54%] flex aspect-5/6 w-[40%] justify-center rounded-lg border border-border bg-accent"></div>
                <div className="absolute bottom-[12%] left-[54%] flex aspect-square w-[24%] justify-center rounded-lg border border-border bg-accent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero39 };

```

```tsx
import {
  ArrowRight,
  ChartLine,
  Check,
  Cloud,
  CloudCog,
  Play,
  Share2,
  Sparkles,
  Video,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Marquee } from "@/components/magicui/marquee";
import { Button } from "@/components/ui/button";

const integrations = [
  {
    name: "Storage",
    description: "Store your videos in your favorite storage solution.",
    icon: Cloud,
  },
  {
    name: "AI",
    description: "Use AI to generate videos, images, and more.",
    icon: Sparkles,
  },
  {
    name: "Video Editing",
    description: "Edit your videos with your favorite video editing software.",
    icon: Video,
  },
  {
    name: "Video Hosting",
    description: "Host your videos on your favorite video hosting solution.",
    icon: CloudCog,
  },
  {
    name: "Social Media",
    description: "Share your videos on your favorite social media platforms.",
    icon: Share2,
  },
  {
    name: "Analytics",
    description:
      "Track video performance with your favorite analytics solution.",
    icon: ChartLine,
  },
];

interface Hero40Props {
  className?: string;
}

const Hero40 = ({ className }: Hero40Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex flex-col gap-6">
            <h1 className="text-6xl font-bold">
              Integrate with your favorite tools
            </h1>
            <p className="text-lg text-muted-foreground">
              Connect your favorite tools to your video production workflow.
              Streamline your creative process by integrating with the platforms
              and services you already use every day.
            </p>
            <div className="flex gap-4">
              <Button variant="outline" size="lg">
                <span>Watch Demo</span>
                <Play />
              </Button>
              <Button size="lg">
                <span>Get Started</span>
                <ArrowRight />
              </Button>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Check className="size-4 text-green-500" />
                <p className="text-sm text-muted-foreground">
                  <span className="font-bold">100+</span> integrations available
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Check className="size-4 text-green-500" />
                <p className="text-sm text-muted-foreground">
                  <span className="font-bold">30-day</span> free trial
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Check className="size-4 text-green-500" />
                <p className="text-sm text-muted-foreground">
                  <span className="font-bold">24/7</span> support included
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <img
              src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
              alt="placeholder"
              className="aspect-video w-full rounded-lg border border-border object-cover"
            />
            <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
              <Marquee className="[--duration:30s]">
                {integrations.map((integration) => (
                  <div
                    key={integration.name}
                    className="flex max-w-72 gap-2 rounded-lg border border-border p-4 dark:bg-muted"
                  >
                    <integration.icon className="mt-0.5 size-4 shrink-0" />
                    <div className="flex flex-col gap-2">
                      <p className="text-sm">{integration.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {integration.description}
                      </p>
                    </div>
                  </div>
                ))}
              </Marquee>
              <Marquee reverse className="[--duration:30s]">
                {integrations.map((integration) => (
                  <div
                    key={integration.name}
                    className="flex max-w-72 gap-2 rounded-lg border border-border p-4 dark:bg-muted"
                  >
                    <integration.icon className="mt-0.5 size-4 shrink-0" />
                    <div className="flex flex-col gap-2">
                      <p className="text-sm">{integration.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {integration.description}
                      </p>
                    </div>
                  </div>
                ))}
              </Marquee>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-background"></div>
              <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero40 };

```

```tsx
import { Minus } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Hero50Props {
  className?: string;
}

const Hero50 = ({ className }: Hero50Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container flex flex-col gap-7 text-center">
        <a
          href="#"
          className="group mx-auto mb-3 w-fit gap-3 rounded-full border px-5 py-2 text-sm"
        >
          <span className="mr-1 font-medium">
            Join our Community Collaboration Survey!
          </span>
          We’ll donate $20 for each response.
          <Minus className="mx-1 inline-block w-4" />
          <span className="font-semibold group-hover:underline">
            Take a tour
          </span>
        </a>
        <h1 className="mx-auto max-w-4xl text-4xl font-semibold text-balance lg:text-6xl">
          Community & business data, centralized
        </h1>
        <p className="mx-auto max-w-4xl text-muted-foreground lg:text-xl">
          Showcase the value of your community to the business. Talkbase sets
          the stage for successful cross-collaboration among community teams
          working with customer, marketing, sales, and product development.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button size="lg">Get started for free</Button>
          <Button size="lg" variant="outline">
            Book a demo
          </Button>
        </div>
      </div>
      <div className="relative px-8">
        <div className="absolute inset-0 top-1/2 h-full w-full bg-linear-to-b from-muted to-transparent to-50%"></div>
        <div className="relative mx-auto max-w-5xl">
          <img
            src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
            alt="placeholder"
            className="mt-20 max-h-[580px] w-full rounded-lg object-cover shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]"
          />
          <img
            src="https://cdn.ing/assets/files/record/286210/jdwpoe6le13i7l4hn0er8ay9t5n9"
            alt="placeholder"
            className="absolute top-1/2 -left-3 hidden max-h-56 -translate-y-1/2 rounded-lg object-cover shadow-md md:block xl:-left-10"
          />
          <img
            src="https://cdn.ing/assets/files/record/286211/1d12hqfn5zpsfloai89gqq98kht0"
            alt="placeholder"
            className="absolute top-1/3 -right-3 hidden h-24 w-24 -translate-y-1/2 rounded-lg bg-muted shadow-md md:block xl:-right-10"
          />
        </div>
      </div>
    </section>
  );
};

export { Hero50 };

```

```tsx
import { Globe } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Hero51Props {
  className?: string;
}

const Hero51 = ({ className }: Hero51Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="">
        <div className="relative container mx-auto max-w-xl py-10 text-center">
          <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,hsl(var(--muted))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted))_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_50%_100%_at_50%_50%,#000_60%,transparent_100%)] bg-[size:64px_64px]"></div>
          <h1 className="mb-3 text-4xl lg:text-7xl">
            Explore a World of Digital Assets
          </h1>
          <p className="mb-5 text-sm text-muted-foreground md:text-base">
            Discover the future of asset management, tokenization, and liquidity
            with our comprehensive marketplace.
          </p>
          <Button>Marketplace</Button>
          <div className="mt-7 flex items-start justify-center gap-2 font-medium md:text-xl">
            <Globe className="mt-0.5 h-auto w-5" />
            Global Partnerships and Innovation
          </div>
        </div>
        <div className="mx-auto mt-14 max-w-7xl overflow-hidden py-8">
          <div className="relative w-full">
            <img
              src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
              alt="placeholder"
              className="relative left-1/2 mx-auto max-h-[480px] w-full rounded-xl object-cover shadow-md lg:static lg:max-w-[60vw] xl:max-w-3xl"
            />
            <img
              src="https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u"
              alt="placeholder"
              className="absolute top-0 right-20 -z-10 hidden max-h-60 -rotate-12 rounded-xl object-cover shadow-md lg:block"
            />
            <img
              src="https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u"
              alt="placeholder"
              className="absolute right-20 bottom-0 hidden rotate-12 rounded-xl object-cover shadow-md md:max-h-60 lg:block"
            />
            <img
              src="https://cdn.ing/assets/files/record/286203/itwrx0hqshkompfxvikdmj77xoh4"
              alt="placeholder"
              className="absolute top-0 left-1/4 -z-10 max-h-44 -rotate-12 rounded-xl object-cover shadow-md min-[450px]:max-h-52 sm:left-1/3 md:max-h-60 lg:left-20"
            />
            <img
              src="https://cdn.ing/assets/files/record/286204/7rhj7uvcnozjm6c2q4txtptfcmpx"
              alt="placeholder"
              className="absolute bottom-0 left-1/4 max-h-44 rotate-12 rounded-xl object-cover shadow-md min-[450px]:max-h-52 sm:left-1/3 md:max-h-60 lg:left-20"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero51 };

```

```tsx
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Hero55Props {
  className?: string;
}

const Hero55 = ({ className }: Hero55Props) => {
  return (
    <section className={cn("relative py-32", className)}>
      <div className="container">
        <div className="flex flex-col items-center gap-10 text-center">
          <a
            href="#"
            className="flex items-center gap-2 rounded-full px-2 py-1 text-sm transition-colors hover:bg-muted"
          >
            <Badge>7 days ago</Badge>
            Slack integration is here!
            <ArrowRight className="h-auto w-4" />
          </a>
          <h1 className="text-4xl font-semibold lg:text-8xl">
            Manage design work right from the canvas
          </h1>
          <div className="flex w-full flex-col justify-center gap-2 sm:flex-row">
            <Button size="lg">Get started - it&apos;s free</Button>
            <Button size="lg" variant="outline">
              Book a demo
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 bg-[50%_0] bg-[url('https://deifkwefumgah.cloudfront.net/shadcnblocks/block/shadow-overlay.png')] bg-no-repeat"></div>
    </section>
  );
};

export { Hero55 };

```

```tsx
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Hero59Props {
  className?: string;
}

const Hero59 = ({ className }: Hero59Props) => {
  return (
    <section className={cn("dark relative h-screen bg-background", className)}>
      <div className="relative z-10 container mx-auto flex size-full max-w-3xl flex-col justify-center gap-4 lg:items-center lg:text-center">
        <span className="text-xs text-muted-foreground">
          BETA RELEASE AVAILABLE
        </span>
        <h1 className="text-5xl font-bold text-foreground lg:text-[4.2rem]">
          Unveiling MyBusiness Edition 1
        </h1>
        <p className="text-lg text-muted-foreground">
          Tailor and oversee any creative process from start to finish with
          unprecedented speed and efficiency.
        </p>
        <div className="flex lg:justify-center">
          <div className="flex min-w-fit flex-col gap-5 text-sm leading-[.96] whitespace-nowrap lg:flex-row lg:items-stretch">
            <Button className="h-fit flex-1 rounded-full px-6 py-3.5">
              Enroll in Beta
            </Button>
            <Button
              variant="outline"
              className="h-fit flex-1 rounded-full border border-white/50 bg-transparent px-6 py-3.5 text-foreground hover:bg-transparent"
            >
              Book a Demo
            </Button>
          </div>
        </div>
      </div>
      <video
        loop
        playsInline
        src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/video-5.mp4"
        className="absolute top-0 left-0 size-full object-cover"
        autoPlay
        muted
      />
    </section>
  );
};

export { Hero59 };

```

```tsx
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Hero60Props {
  className?: string;
}

const Hero60 = ({ className }: Hero60Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="relative max-w-5xl">
          <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,hsl(var(--muted))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted))_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_50%_100%_at_50%_50%,#000_60%,transparent_100%)] bg-[size:64px_64px]"></div>
          <h1 className="text-5xl leading-tight font-extrabold lg:text-8xl lg:leading-snug">
            Less complexity. <span className="mr-6">More</span>
            <span className="relative inline-block before:absolute before:top-0 before:-right-2 before:-bottom-2 before:-left-4 before:-z-10 before:rounded-lg before:bg-muted-foreground/15">
              efficiency.
            </span>
          </h1>
          <p className="mt-7 text-xl font-light lg:text-3xl">
            A powerful tool to streamline workflows, manage tasks, and deliver
            results efficiently.
          </p>
          <div className="mt-12 flex w-fit flex-col gap-2.5 text-center">
            <Button size="lg">
              Start Now for free
              <ChevronRight className="ml-2 h-auto w-4" />
            </Button>
            <p className="text-sm text-muted-foreground">
              No credit card required.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero60 };

```

```tsx
import { ArrowRight, DollarSign, Medal, Sparkle, Zap } from "lucide-react";

import { cn } from "@/lib/utils";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Hero68Props {
  className?: string;
}

const Hero68 = ({ className }: Hero68Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="border-x border-t border-dashed px-4 py-20 md:px-16">
          <div className="mx-auto max-w-3xl">
            <a
              href="#"
              className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm"
            >
              <Badge>New</Badge>
              v2.2 is out now!
              <ArrowRight className="inline size-4" />
            </a>
            <h1 className="my-4 mb-6 text-center text-3xl font-semibold lg:text-8xl">
              Fast websites for startups
            </h1>
            <p className="mx-auto mb-6 max-w-2xl text-center text-muted-foreground lg:text-xl">
              We craft powerful websites to accelerate your startup&apos;s
              growth.
            </p>
            <div className="flex flex-col justify-center gap-2 sm:flex-row">
              <Button size="lg" className="w-full gap-2 sm:w-auto lg:mt-10">
                <div className="size-2 rounded-full bg-green-400"></div>
                Start your free trial
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full gap-2 sm:w-auto lg:mt-10"
              >
                <Avatar className="size-8 rounded-full ring-1 ring-input">
                  <AvatarImage
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp"
                    alt="placeholder"
                  />
                </Avatar>
                Schedule a demo
              </Button>
            </div>
          </div>
        </div>
        <div className="relative grid border-x border-dashed md:grid-cols-3">
          <Sparkle className="absolute top-0 right-0 h-auto w-5 translate-x-2.5 -translate-y-2.5 fill-primary" />
          <Sparkle className="absolute top-0 left-0 h-auto w-5 -translate-x-2.5 -translate-y-2.5 fill-primary" />
          <div className="flex items-center gap-6 border-t border-dashed p-4 font-medium md:justify-center lg:p-10 lg:text-lg">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted text-sm lg:size-12 lg:text-base">
              <Zap className="w-5 lg:w-6" />
            </span>
            2-4 week delivery
          </div>
          <div className="flex items-center gap-6 border-x border-t border-dashed p-4 font-medium md:justify-center lg:p-10 lg:text-lg">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted text-sm lg:size-12 lg:text-base">
              <DollarSign className="w-5 lg:w-6" />
            </span>
            Upfront, no hidden fees
          </div>
          <div className="flex items-center gap-6 border-t border-dashed p-4 font-medium md:justify-center lg:p-10 lg:text-lg">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted text-sm lg:size-12 lg:text-base">
              <Medal className="w-5 lg:w-6" />
            </span>
            Full refund if not satisfied
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero68 };

```

```tsx
"use client";
import AutoScroll from "embla-carousel-auto-scroll";
import Autoplay from "embla-carousel-autoplay";
import { ArrowUpRight, CheckCircle } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface Hero70Props {
  className?: string;
}

const Hero70 = ({ className }: Hero70Props) => {
  return (
    <section className={cn("relative bg-background py-14", className)}>
      <div className="relative z-10 container mx-auto">
        <div className="py-8">
          <img
            src="https://cdn.ing/assets/files/record/286209/4nowqz6c7v6vhzldvh9qdnhmkrwb"
            className="h-12 lg:h-16"
            alt=""
          />
        </div>
        <div className="flex flex-col gap-10 py-10 lg:py-28">
          <div className="hidden items-center gap-6 lg:flex">
            <div className="flex items-center gap-1.5 text-foreground">
              <CheckCircle className="size-6" />
              <span>Design Subscription Monthly</span>
            </div>
            <div className="flex items-center gap-1.5 text-foreground">
              <CheckCircle className="size-6" />
              <span>Rapid Delivery</span>
            </div>
            <div className="flex items-center gap-1.5 text-foreground">
              <CheckCircle className="size-6" />
              <span>Flexible Subscription</span>
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-1 flex-col gap-4">
              <h1 className="max-w-6xl text-4xl tracking-tighter text-foreground lg:text-7xl xl:text-9xl">
                The All You Can Design buffet to fuel your business growth
              </h1>
              <p className="text-lg text-foreground lg:text-2xl">
                Enjoy professional design expertise —{" "}
                <span className="font-semibold">
                  without the hefty price tag
                </span>
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            className="flex h-fit items-center gap-[10px] self-start rounded-full border-2 border-black px-2 py-1.5 text-sm font-semibold lg:px-4 lg:py-3.5 lg:text-base"
          >
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp"
              alt=""
              className="size-9 rounded-full object-cover lg:size-11"
            />
            <span>Schedule a chat with me</span>
          </Button>
        </div>
      </div>
      <div className="relative flex flex-col">
        <Carousel
          opts={{
            loop: true,
            align: "center",
          }}
          plugins={[
            AutoScroll({
              speed: 1,
            }),
            Autoplay({
              playOnInit: true,
              delay: 1000,
            }),
          ]}
          className="relative mx-auto w-full max-w-full overflow-hidden from-white to-transparent before:absolute before:top-0 before:left-0 before:z-10 before:h-full before:w-[20%] before:bg-linear-to-r before:content-[''] after:absolute after:top-0 after:right-0 after:z-10 after:h-full after:w-[20%] after:bg-linear-to-l after:from-white after:to-transparent after:content-['']"
        >
          <CarouselContent className="ml-5 flex gap-5 pl-4">
            <CarouselItem className="basis-[496px] bg-background">
              <div className="h-[380px] basis-[480px] overflow-hidden rounded-lg">
                <img
                  src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
                  alt=""
                  className="size-full object-cover"
                />
              </div>
            </CarouselItem>
            <CarouselItem className="basis-[496px] bg-background">
              <div className="h-[380px] basis-[480px] overflow-hidden rounded-lg">
                <img
                  src="https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u"
                  alt=""
                  className="size-full object-cover"
                />
              </div>
            </CarouselItem>
            <CarouselItem className="basis-[496px] bg-background">
              <div className="h-[380px] basis-[480px] overflow-hidden rounded-lg">
                <img
                  src="https://cdn.ing/assets/files/record/286203/itwrx0hqshkompfxvikdmj77xoh4"
                  alt=""
                  className="size-full object-cover"
                />
              </div>
            </CarouselItem>
            <CarouselItem className="basis-[496px] bg-background">
              <div className="h-[380px] basis-[480px] overflow-hidden rounded-lg">
                <img
                  src="https://cdn.ing/assets/files/record/286204/7rhj7uvcnozjm6c2q4txtptfcmpx"
                  alt=""
                  className="size-full object-cover"
                />
              </div>
            </CarouselItem>
            <CarouselItem className="basis-[496px] bg-background">
              <div className="h-[380px] basis-[480px] overflow-hidden rounded-lg">
                <img
                  src="https://cdn.ing/assets/files/record/286205/e0az5aimgxvqa11grxzaok7fbsvr"
                  alt=""
                  className="size-full object-cover"
                />
              </div>
            </CarouselItem>
            <CarouselItem className="basis-[496px] bg-background">
              <div className="h-[380px] basis-[480px] overflow-hidden rounded-lg">
                <img
                  src="https://cdn.ing/assets/files/record/286206/qs3jazsupq75q1fgisnonwnohie2"
                  alt=""
                  className="size-full object-cover"
                />
              </div>
            </CarouselItem>
            <CarouselItem className="basis-[496px] bg-background">
              <div className="h-[380px] basis-[480px] overflow-hidden rounded-lg">
                <img
                  src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
                  alt=""
                  className="size-full object-cover"
                />
              </div>
            </CarouselItem>
            <CarouselItem className="basis-[496px] bg-background">
              <div className="h-[380px] basis-[480px] overflow-hidden rounded-lg">
                <img
                  src="https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u"
                  alt=""
                  className="size-full object-cover"
                />
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
      <Button
        variant="outline"
        className="relative z-10 mx-auto mt-10 flex h-fit items-center gap-2.5 rounded-full border-2 border-black px-4 py-3.5 text-sm font-semibold transition hover:bg-black hover:text-white lg:text-base"
      >
        <span>Explore my portfolio</span>
        <ArrowUpRight className="size-6!" />
      </Button>
    </section>
  );
};

export { Hero70 };

```

```tsx
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Hero71Props {
  className?: string;
}

const Hero71 = ({ className }: Hero71Props) => {
  return (
    <section
      className={cn(
        "bg-[linear-gradient(#fbf7ec,#e2f1ee)] py-20 text-center",
        className,
      )}
    >
      <div className="container flex flex-col items-center gap-5">
        <h1 className="max-w-2xl text-7xl font-medium text-foreground max-lg:text-5xl">
          Stay front and center with your clients.
        </h1>
        <p className="max-w-2xl text-muted-foreground max-lg:text-sm">
          We enhance client relationships by providing personalized solutions,
          fostering trust, and driving growth.{" "}
        </p>
        <div className="flex items-center gap-2.5 text-lg max-lg:flex-col max-lg:text-base">
          <Button className="w-fit rounded-md border px-8 py-1">Meet Us</Button>
          <Button
            variant="secondary"
            className="w-fit rounded-md border px-8 py-1"
          >
            Schedule a Demo
          </Button>
        </div>
        <img
          className="mt-10 w-[50%] rounded-xl shadow-[rgba(50,50,105,0.15)_0px_2px_5px_0px,rgba(0,0,0,0.05)_0px_1px_1px_0px] max-lg:w-full"
          src="https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u"
          alt=""
        />
      </div>
    </section>
  );
};

export { Hero71 };

```

```tsx
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface Hero75Props {
  className?: string;
}

const Hero75 = ({ className }: Hero75Props) => {
  return (
    <section className={cn("dark flex", className)}>
      <div className="flex w-full items-center justify-center bg-background lg:w-1/2">
        <div className="container my-10 flex w-[500px] flex-col gap-24">
          <h1 className="text-4xl text-foreground">
            Business{" "}
            <span className="bg-linear-to-tr from-foreground to-muted bg-clip-text text-transparent">
              PRO
            </span>
          </h1>
          <div>
            <h2 className="text-4xl text-foreground lg:text-6xl">
              Achieve More with Elite Access Pro
            </h2>
            <p className="mt-2.5 text-foreground lg:text-xl">
              Enhance your career hunt with increased visibility, first-look
              opportunities and monetary incentives!
            </p>
            <Button className="mt-10 flex h-fit items-center gap-2.5 rounded-xl px-5 py-4 font-bold">
              <span>Upgrade to premium </span>
              <ChevronRight className="size-5!" />
            </Button>
          </div>
          <div className="flex items-center gap-3.5">
            <div className="flex -space-x-3">
              <Avatar className="block size-11 min-h-11 min-w-11 rounded-full object-cover lg:size-11">
                <AvatarImage src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp" />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <Avatar className="block size-11 min-h-11 min-w-11 rounded-full object-cover lg:size-11">
                <AvatarImage src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp" />
                <AvatarFallback>B</AvatarFallback>
              </Avatar>
              <Avatar className="block size-11 min-h-11 min-w-11 rounded-full object-cover lg:size-11">
                <AvatarImage src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp" />
                <AvatarFallback>C</AvatarFallback>
              </Avatar>
              <Avatar className="block size-11 min-h-11 min-w-11 rounded-full object-cover lg:size-11">
                <AvatarImage src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp" />
                <AvatarFallback>D</AvatarFallback>
              </Avatar>
              <Avatar className="block size-11 min-h-11 min-w-11 rounded-full object-cover lg:size-11">
                <AvatarImage src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp" />
                <AvatarFallback>E</AvatarFallback>
              </Avatar>
            </div>
            <span className="text-xs text-foreground lg:text-sm">
              More than 1 million medical practitioners rely on CareerMed
            </span>
          </div>
        </div>
      </div>
      <img
        src="https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u"
        alt=""
        className="hidden h-screen w-1/2 object-cover lg:block"
      />
    </section>
  );
};

export { Hero75 };

```

```tsx
import { cn } from "@/lib/utils";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";

interface Hero76Props {
  className?: string;
}

const Hero76 = ({ className }: Hero76Props) => {
  return (
    <section
      className={cn(
        "container mx-auto mt-32 flex flex-col items-center gap-20 bg-background md:gap-40 md:text-center",
        className,
      )}
    >
      <div className="flex flex-col gap-10 md:items-center">
        <img
          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/figma-icon.svg"
          alt=""
          className="h-11 w-fit"
        />
        <div className="flex max-w-[880px] flex-col items-center gap-6">
          <h1 className="text-4xl tracking-tighter text-foreground capitalize md:text-5xl lg:text-6xl">
            <p>The continuously growing UI library for Shadcn & Figma</p>
          </h1>
          <div className="text-xl text-muted-foreground">
            <p>
              Create quicker, more efficiently, and boost your design expertise.
            </p>
            <p>Transform into an elite designer instantly</p>
          </div>
        </div>
        <Button className="h-fit self-center rounded-full px-6 py-3">
          Download Now
        </Button>
      </div>
      <div className="w-full overflow-hidden rounded-lg">
        <AspectRatio ratio={1.916786227 / 1}>
          <img
            src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
            alt=""
            className="size-full object-cover"
          />
        </AspectRatio>
      </div>
    </section>
  );
};

export { Hero76 };

```

```tsx
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Hero78Props {
  className?: string;
}

const Hero78 = ({ className }: Hero78Props) => {
  return (
    <section
      className={cn(
        "dark relative flex h-svh max-h-[1400px] w-svw overflow-hidden bg-[url('https://deifkwefumgah.cloudfront.net/shadcnblocks/block/full-width-backgrounds/pawel-czerwinski-IbHFznCKnqA-unsplash.jpg')] bg-cover bg-center bg-no-repeat font-sans after:absolute after:top-0 after:left-0 after:z-10 after:h-full after:w-full after:bg-black/20 after:content-[''] md:h-svh",
        className,
      )}
    >
      <div className="relative z-30 m-auto flex max-w-[46.25rem] flex-col items-center justify-center gap-6 px-5">
        <h1 className="text-center font-serif text-4xl leading-tight text-foreground md:text-6xl xl:text-[4.4rem]">
          Explore the wonders of science.
        </h1>
        <p className="text-center text-base text-foreground">
          From stunning skyscrapers to intricate bridges and innovative
          architectural marvels, each photo invites you to explore the
          artificial wonders of the world.
        </p>
        <Button className="h-fit w-fit rounded-full px-7 py-4 text-sm leading-tight font-medium">
          See all photos
        </Button>
      </div>
      <div className="pointer-events-none absolute inset-0 z-20 h-full w-full bg-[url('https://cdn.ing/assets/i/r/286188/zrqcp9hynh3j7p2laihwzfbujgrl/noise.png')] bg-repeat opacity-15" />
    </section>
  );
};

export { Hero78 };

```

```tsx
import { ArrowDown } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Hero79Props {
  className?: string;
}

const Hero79 = ({ className }: Hero79Props) => {
  return (
    <section
      className={cn(
        "dark h-screen w-screen bg-background bg-[url('https://deifkwefumgah.cloudfront.net/shadcnblocks/block/full-width-backgrounds/andrew-kliatskyi-MaVm_A0xhKk-unsplash.jpg')] bg-cover bg-center bg-no-repeat pt-12 pb-24",
        className,
      )}
    >
      <div className="container flex h-full flex-col justify-between px-5 xl:px-20">
        <img src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-white-1.svg" alt="" className="size-20" />
        <div className="flex items-end justify-between">
          <div className="flex w-full flex-col gap-8 md:w-2/3">
            <h1 className="text-6xl font-medium text-foreground md:text-[5.8rem]">
              Create your own fiber optics facility
            </h1>
            <p className="text-xl text-foreground md:text-2xl">
              CableCore Partnership. Worldwide network. Regional manufacturing
            </p>
          </div>
          <Button
            variant="ghost"
            className="hidden items-center gap-2 text-foreground hover:bg-transparent md:flex"
          >
            <span className="text-2xl">Read More</span>
            <ArrowDown className="size-6!" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export { Hero79 };

```

```tsx
"use client";

import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface Hero80Props {
  className?: string;
}

const Hero80 = ({ className }: Hero80Props) => {
  return (
    <section className={cn("relative overflow-hidden py-32", className)}>
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-x-0 -top-20 -bottom-20 bg-[radial-gradient(ellipse_35%_15%_at_40%_55%,hsl(var(--accent))_0%,transparent_100%)] lg:bg-[radial-gradient(ellipse_12%_20%_at_60%_45%,hsl(var(--accent))_0%,transparent_100%)]"></div>
      <div className="pointer-events-none absolute inset-x-0 -top-20 -bottom-20 bg-[radial-gradient(ellipse_35%_20%_at_70%_75%,hsl(var(--accent))_0%,transparent_80%)] lg:bg-[radial-gradient(ellipse_15%_30%_at_70%_65%,hsl(var(--accent))_0%,transparent_80%)]"></div>

      {/* Background pattern */}
      <div className="pointer-events-none absolute inset-x-0 -top-20 -bottom-20 bg-[radial-gradient(hsl(var(--accent-foreground)/0.1)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_60%_at_65%_50%,#000_0%,transparent_80%)] [background-size:8px_8px]"></div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          {/* Left Column */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <a
              href="https://www.shadcnblocks.com"
              className="my-6 text-xs font-bold tracking-[0.3em] text-muted-foreground uppercase hover:underline"
            >
              shadcnblocks.com
            </a>

            {/* Heading */}
            <h1 className="text-4xl font-semibold sm:text-5xl">
              Beautiful UI
              <br />
              <span className="text-muted-foreground">Made Simple</span>
            </h1>

            {/* Description */}
            <p className="my-8 max-w-xl text-muted-foreground lg:text-lg">
              Build stunning web applications faster with our premium collection
              of ready-to-use UI components. Perfect for developers and
              designers.
            </p>

            {/* Buttons */}
            <div className="flex w-full flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Button size="lg" className="w-full sm:w-auto">
                Browse Components
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                View Demo
              </Button>
            </div>

            {/* Avatar Stack and Stars */}
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:items-center">
              {/* Avatars */}
              <div className="flex -space-x-4">
                {[1, 2, 3, 4, 5].map((num) => (
                  <Avatar
                    key={num}
                    className="size-14 border-2 border-background shadow-sm ring-1 ring-border"
                  >
                    <AvatarImage
                      src={`https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-${num}.webp`}
                      alt={`Avatar ${num}`}
                    />
                  </Avatar>
                ))}
              </div>

              {/* Stars */}
              <div className="flex flex-col items-center sm:items-start">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-5 fill-primary" />
                  ))}
                  <span className="font-semibold">5.0</span>
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                  1000+ happy developers
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Images */}
          <div className="relative grid gap-4 lg:grid-cols-2">
            {/* Main Image */}
            <div className="relative aspect-3/4 w-full overflow-hidden rounded-lg bg-muted">
              <img
                src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
                alt="UI Components Preview"
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Secondary Image */}
            <div className="relative aspect-3/4 w-full overflow-hidden rounded-lg bg-muted lg:mt-8">
              <img
                src="https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u"
                alt="Component Examples"
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero80 };

```

```tsx
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";

interface Hero82Props {
  className?: string;
}

const Hero82 = ({ className }: Hero82Props) => {
  return (
    <section
      className={cn(
        "container flex flex-col gap-10 bg-background py-20 sm:gap-20",
        className,
      )}
    >
      <div className="flex flex-col gap-10 lg:w-[80%] lg:self-center">
        <h1 className="max-w-2xl text-6xl font-bold tracking-tight text-foreground md:text-7xl lg:text-8xl">
          A simple task timer to power your goals
        </h1>
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          {/* Animated Button */}
          <Button className="group h-fit rounded-xl p-4 text-xl font-semibold shadow-xl">
            <div className="size-full overflow-hidden">
              <div className="flex items-center transition-all group-hover:-translate-x-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -3.552713678800501e-15 820 950"
                  className="size-5 min-h-5 min-w-5"
                  fill="white"
                >
                  <path d="M404.345 229.846c52.467 0 98.494-20.488 138.08-61.465s59.38-88.626 59.38-142.947c0-5.966-.472-14.444-1.414-25.434-6.912.942-12.096 1.727-15.552 2.355-48.383 6.908-90.954 30.615-127.713 71.12-36.758 40.506-55.137 83.838-55.137 129.996 0 5.337.785 14.13 2.356 26.375zM592.379 950c37.387 0 78.701-25.59 123.943-76.772S796.122 761.915 820 692.836c-88.912-45.844-133.368-111.626-133.368-197.348 0-71.591 35.973-132.82 107.92-183.688-49.954-62.486-115.931-93.729-197.931-93.729-34.56 0-66.134 5.181-94.724 15.543l-17.908 6.594-24.035 9.42c-15.709 5.966-30.004 8.95-42.885 8.95-10.054 0-23.25-3.455-39.586-10.363l-18.38-7.536-17.436-7.065c-25.449-10.676-52.782-16.014-82-16.014-78.23 0-141.065 26.376-188.506 79.128C23.72 349.479 0 419.03 0 505.379c0 121.517 38.015 233.772 114.046 336.763C166.828 914.047 215.054 950 258.724 950c18.537 0 36.916-3.611 55.138-10.833l23.092-9.42 18.38-6.594c25.762-9.106 49.482-13.659 71.16-13.659 22.935 0 49.326 5.81 79.173 17.427l14.609 5.652C550.75 944.191 574.786 950 592.379 950z" />
                </svg>
                <span className="block min-w-[calc(100%-20px)]">
                  Download for Mac
                </span>
                <ArrowRight className="size-5! min-h-5 min-w-5" />
              </div>
            </div>
          </Button>
        </div>
      </div>
      <AspectRatio ratio={1.6 / 1} className="overflow-hidden rounded-3xl">
        <img
          src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
          alt=""
          className="size-full object-cover object-center"
        />
      </AspectRatio>
    </section>
  );
};

export { Hero82 };

```

```tsx
import { cn } from "@/lib/utils";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ButtonType {
  title: string;
  url: string;
  variant: "outline" | "default";
}

const BUTTONS: ButtonType[] = [
  {
    title: "Explore",
    url: "#",
    variant: "default",
  },
  {
    title: "Sign up",
    url: "#",
    variant: "outline",
  },
];

const IMAGES = [
  {
    src: "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
    alt: "",
    ratio: 0.644736842,
    className: "w-[30%]",
  },
  {
    src: "https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u",
    alt: "",
    ratio: 0.926829268,
    className: "w-[40%]",
  },
  {
    src: "https://cdn.ing/assets/files/record/286203/itwrx0hqshkompfxvikdmj77xoh4",
    alt: "",
    ratio: 0.644736842,
    className: "w-[30%]",
  },
];

interface Hero83Props {
  className?: string;
}

const Hero83 = ({ className }: Hero83Props) => {
  return (
    <section className={cn("bg-background py-32", className)}>
      <div className="container">
        <div className="flex flex-col items-center justify-center gap-10 pb-8">
          <Badge variant="secondary">Announcing our new features</Badge>
          <h1 className="max-w-lg text-center text-4xl font-semibold md:max-w-2xl md:text-6xl">
            Achieve More with Elite Access Pro
          </h1>
          <p className="max-w-lg text-center font-medium text-foreground">
            Enhance your career hunt with increased visibility, first-look
            opportunities and monetary incentives!
          </p>
          <div className="flex w-full max-w-lg flex-col items-center justify-center gap-4 md:flex-row md:gap-6">
            {BUTTONS.map((btn, index) => (
              <Button
                asChild
                variant={btn.variant}
                size="lg"
                className="w-full md:flex-1"
                key={`hero-btn-${index}`}
              >
                <a href={btn.url}>{btn.title}</a>
              </Button>
            ))}
          </div>
        </div>
        <div className="flex w-full items-end justify-center gap-4">
          {IMAGES.map((img, index) => (
            <div className={img.className} key={`hero-img-${index}`}>
              <AspectRatio ratio={img.ratio} className="rounded-md border">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="block size-full object-cover object-[50%_0%]"
                />
              </AspectRatio>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Hero83 };

```

```tsx
import { cn } from "@/lib/utils";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";

interface Hero84Props {
  className?: string;
}

const Hero84 = ({ className }: Hero84Props) => {
  return (
    <section
      className={cn(
        "h-svg dark overflow-hidden bg-background pt-12 font-sans md:pt-20",
        className,
      )}
    >
      <div className="container">
        <div className="mb-24 flex flex-col items-center gap-8">
          <Badge className="w-fit rounded-full border border-white bg-transparent px-8 py-2.5 text-center text-sm font-semibold text-foreground hover:bg-transparent">
            Uniqueness
          </Badge>
          <div>
            <h1 className="mb-5 text-center text-5xl font-bold text-foreground">
              Unify everything in one space
            </h1>
            <p className="max-w-[820px] text-center text-xl font-medium text-foreground">
              An all-in-one platform for seamless collaboration, our app merges
              client-facing portals with internal project management tools to
              streamline every phase of client projects.
            </p>
          </div>
        </div>
        <div className="relative mx-auto aspect-[2.488709677/1] max-w-[87.5rem]">
          <div className="absolute right-0 bottom-0 z-10 w-[27%] overflow-hidden">
            <AspectRatio ratio={0.924193548 / 1}>
              <img
                src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
                alt=""
                className="block size-full object-cover object-top-left"
              />
            </AspectRatio>
          </div>
          <div className="absolute right-[14%] bottom-0 z-20 w-[32%] overflow-hidden shadow-xl">
            <AspectRatio ratio={0.924193548 / 1}>
              <img
                src="https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u"
                alt=""
                className="block size-full object-cover object-top-left"
              />
            </AspectRatio>
          </div>
          <div className="absolute bottom-0 left-1/2 z-30 w-[37%] -translate-x-1/2 overflow-hidden shadow-xl">
            <AspectRatio ratio={0.924193548 / 1}>
              <img
                src="https://cdn.ing/assets/files/record/286203/itwrx0hqshkompfxvikdmj77xoh4"
                alt=""
                className="block size-full object-cover object-top-left"
              />
            </AspectRatio>
          </div>
          <div className="absolute bottom-0 left-[14%] z-20 w-[32%] overflow-hidden shadow-xl">
            <AspectRatio ratio={0.924193548 / 1}>
              <img
                src="https://cdn.ing/assets/files/record/286204/7rhj7uvcnozjm6c2q4txtptfcmpx"
                alt=""
                className="block size-full object-cover object-top-left"
              />
            </AspectRatio>
          </div>
          <div className="absolute bottom-0 left-0 z-10 w-[27%] overflow-hidden">
            <AspectRatio ratio={0.924193548 / 1}>
              <img
                src="https://cdn.ing/assets/files/record/286205/e0az5aimgxvqa11grxzaok7fbsvr"
                alt=""
                className="block size-full object-cover object-top-left"
              />
            </AspectRatio>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero84 };

```

```tsx
"use client";

import AutoScroll from "embla-carousel-auto-scroll";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface Hero85Props {
  className?: string;
}

const Hero85 = ({ className }: Hero85Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="mx-auto">
            <div className="flex w-fit items-center gap-2 rounded-full border px-2.5 py-1.5 text-xs font-medium">
              <Badge>AI-powered</Badge>
              Solutions for new businesses
            </div>
            <h1 className="mt-10 mb-4 text-3xl font-semibold lg:text-5xl">
              Revolutionizing Client Collaboration for Modern Services
            </h1>
            <p className="mx-auto text-muted-foreground lg:text-lg">
              Elevate your service-based business with customizable client
              portals and advanced back-office management
            </p>
            <div className="mt-10 flex flex-col gap-2 sm:flex-row">
              <Button size="lg" className="w-full gap-2 sm:w-auto">
                Start for Free
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full gap-2 sm:w-auto"
              >
                Schedule a Demo
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-8 lg:hidden">
            <Carousel
              opts={{
                loop: true,
              }}
              plugins={[
                AutoScroll({
                  speed: 0.8,
                }),
              ]}
              className="-mx-7"
            >
              <CarouselContent className="max-h-[350px]">
                <CarouselItem className="max-w-96">
                  <img
                    src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
                    alt="placeholder"
                  />
                </CarouselItem>
                <CarouselItem className="max-w-96">
                  <img
                    src="https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u"
                    alt="placeholder"
                  />
                </CarouselItem>
                <CarouselItem className="max-w-96">
                  <img
                    src="https://cdn.ing/assets/files/record/286203/itwrx0hqshkompfxvikdmj77xoh4"
                    alt="placeholder"
                  />
                </CarouselItem>
                <CarouselItem className="max-w-96">
                  <img
                    src="https://cdn.ing/assets/files/record/286204/7rhj7uvcnozjm6c2q4txtptfcmpx"
                    alt="placeholder"
                  />
                </CarouselItem>
              </CarouselContent>
            </Carousel>
            <Carousel
              opts={{
                loop: true,
              }}
              plugins={[
                AutoScroll({
                  speed: 0.8,
                  direction: "backward",
                }),
              ]}
              className="-mx-7"
            >
              <CarouselContent className="max-h-[350px]">
                <CarouselItem className="max-w-96">
                  <img
                    src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
                    alt="placeholder"
                  />
                </CarouselItem>
                <CarouselItem className="max-w-96">
                  <img
                    src="https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u"
                    alt="placeholder"
                  />
                </CarouselItem>
                <CarouselItem className="max-w-96">
                  <img
                    src="https://cdn.ing/assets/files/record/286203/itwrx0hqshkompfxvikdmj77xoh4"
                    alt="placeholder"
                  />
                </CarouselItem>
                <CarouselItem className="max-w-96">
                  <img
                    src="https://cdn.ing/assets/files/record/286204/7rhj7uvcnozjm6c2q4txtptfcmpx"
                    alt="placeholder"
                  />
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </div>
          <div className="hidden grid-cols-2 gap-8 lg:grid">
            <Carousel
              opts={{
                loop: true,
              }}
              plugins={[
                AutoScroll({
                  speed: 0.8,
                }),
              ]}
              orientation="vertical"
            >
              <CarouselContent className="max-h-[600px]">
                <CarouselItem>
                  <img
                    src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
                    alt="placeholder"
                  />
                </CarouselItem>
                <CarouselItem>
                  <img
                    src="https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u"
                    alt="placeholder"
                  />
                </CarouselItem>
                <CarouselItem>
                  <img
                    src="https://cdn.ing/assets/files/record/286203/itwrx0hqshkompfxvikdmj77xoh4"
                    alt="placeholder"
                  />
                </CarouselItem>
                <CarouselItem>
                  <img
                    src="https://cdn.ing/assets/files/record/286204/7rhj7uvcnozjm6c2q4txtptfcmpx"
                    alt="placeholder"
                  />
                </CarouselItem>
              </CarouselContent>
            </Carousel>
            <Carousel
              opts={{
                loop: true,
              }}
              plugins={[
                AutoScroll({
                  speed: 0.8,
                  direction: "backward",
                }),
              ]}
              orientation="vertical"
            >
              <CarouselContent className="max-h-[600px]">
                <CarouselItem>
                  <img
                    src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
                    alt="placeholder"
                  />
                </CarouselItem>
                <CarouselItem>
                  <img
                    src="https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u"
                    alt="placeholder"
                  />
                </CarouselItem>
                <CarouselItem>
                  <img
                    src="https://cdn.ing/assets/files/record/286203/itwrx0hqshkompfxvikdmj77xoh4"
                    alt="placeholder"
                  />
                </CarouselItem>
                <CarouselItem>
                  <img
                    src="https://cdn.ing/assets/files/record/286204/7rhj7uvcnozjm6c2q4txtptfcmpx"
                    alt="placeholder"
                  />
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero85 };

```

```tsx
import { cn } from "@/lib/utils";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";

interface Hero86Props {
  className?: string;
}

const Hero86 = ({ className }: Hero86Props) => {
  return (
    <section className={cn("pb-24", className)}>
      <div className="bg-muted pt-16 lg:pt-24">
        <div className="container flex flex-col items-center lg:flex-row lg:items-start">
          <div className="relative flex flex-col items-start gap-8 pb-20 lg:w-1/2">
            <h2 className="text-3xl leading-tight font-bold tracking-tighter text-foreground lg:text-5xl">
              Your ad campaigns excel with{" "}
              <span className="border-muted2 border-b-2">my expertise</span>,
              delivering optimized performance.
            </h2>
            <p className="text-lg text-foreground">
              I’ll maximize your ad campaigns' potential or teach you the
              strategies so you can manage them yourself!
            </p>
            <Button className="h-fit px-6 py-3.5 text-base font-medium lg:text-lg">
              I want to outsource your ads
            </Button>
          </div>
          <div className="relative flex w-full justify-center lg:w-1/2">
            <div className="relative z-10 -mb-16 h-auto w-[80%] max-w-[355px] lg:w-[520px]">
              <AspectRatio ratio={355 / 520} className="border-muted2 border">
                <img
                  src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
                  alt=""
                  className="size-full object-cover"
                />
              </AspectRatio>
            </div>
            <div className="absolute bottom-0 w-full overflow-hidden">
              <AspectRatio ratio={2} className="relative">
                <AspectRatio
                  ratio={1}
                  className="absolute w-full rounded-full bg-muted"
                />
              </AspectRatio>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero86 };

```

```tsx
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Hero87Props {
  className?: string;
}

const Hero87 = ({ className }: Hero87Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h1 className="text-5xl lg:text-7xl">
          The Perfectly Adaptable Product for Your Business
        </h1>
        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-lg text-muted-foreground lg:text-xl">
              It delivers unique and customizable products designed for your
              business. Say farewell to rigid options, lengthy launch times, and
              branding limitations. Embrace a product that evolves with your
              needs and fuels your innovation. Highnote is the adaptable
              solution for your business.
            </p>
            <Button size="lg" className="mt-12">
              Consult with an Expert
              <ArrowRight className="ml-2 h-auto w-4" />
            </Button>
          </div>
          <div className="relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 -top-1 -z-10 mx-auto h-full w-full max-w-3xl bg-[linear-gradient(to_right,hsl(var(--muted-foreground))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted-foreground))_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_50%_100%_at_50%_50%,#000_60%,transparent_100%)] bg-[size:56px_56px] opacity-15"></div>
            <img
              src="https://cdn.ing/assets/files/record/286208/nay46vdmppxuznd7eg5jnnf4qjv5"
              alt="placeholder"
              className="max-h-[400px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero87 };

```

```tsx
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Hero91Props {
  className?: string;
}

const Hero91 = ({ className }: Hero91Props) => {
  return (
    <section
      className={cn(
        "flex min-h-screen items-center justify-between bg-background py-14",
        className,
      )}
    >
      <div className="flex flex-col gap-5 px-[10%] lg:w-[50%] lg:pr-0">
        <p className="font-light text-foreground uppercase">
          Virtual Engagement Maximized & AI-Powered Content Transformation
        </p>
        <h1 className="text-5xl font-medium text-foreground md:text-6xl lg:text-7xl">
          Presentation Platform for Marketing Professionals
        </h1>
        <p className="my-8 text-foreground md:text-xl">
          Effortlessly Create, Deliver, and Reimagine All-Hands Corporate
          Meetings
        </p>
        <div className="flex flex-col gap-4 font-medium md:flex-row">
          <Button className="h-fit items-center gap-1 rounded-full px-6 py-3">
            Try it firsthand →
          </Button>
          <Button variant="secondary" className="h-fit rounded-full px-6 py-3">
            Schedule a demo
          </Button>
        </div>
      </div>
      <div className="relative hidden h-[720px] w-[45%] overflow-hidden rounded-l-full bg-black lg:block">
        <video
          autoPlay
          loop
          muted
          playsInline
          data-wf-ignore="true"
          data-object-fit="cover"
          className="h-full w-full rounded-tl-xl object-cover"
        >
          <source src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/video-1.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
};

export { Hero91 };

```

```tsx
import { ArrowRight, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Hero99Props {
  className?: string;
}

const Hero99 = ({ className }: Hero99Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 -top-1 -left-1 -z-10 h-full w-full bg-[linear-gradient(to_right,hsl(var(--muted-foreground))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted-foreground))_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_50%_100%_at_50%_50%,transparent_60%,#000_100%)] bg-[size:92px_92px] opacity-15"></div>
          <div className="mx-auto max-w-4xl">
            <a
              href="#"
              className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm"
            >
              How to create superior products
              <ArrowRight className="inline size-4" />
            </a>
            <h1 className="my-4 mb-6 text-center text-3xl font-semibold lg:text-8xl">
              Create effective solutions for diverse needs.
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-center text-muted-foreground lg:text-xl">
              Access all necessary resources for managing tasks and enhancing
              efficiency. Additionally, scale your capabilities across various
              projects.
            </p>
            <div className="flex flex-col justify-center gap-x-2 gap-y-3 sm:flex-row">
              <Button>
                Get Started
                <ChevronRight className="ml-2 h-auto w-4" />
              </Button>
              <Button variant="secondary">
                Discover Our Platform
                <ChevronRight className="ml-2 h-auto w-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-20 grid gap-6 md:grid-cols-10">
          <img
            src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
            alt="placeholder"
            className="h-full max-h-[500px] w-full rounded-xl object-cover md:col-span-3"
          />
          <img
            src="https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u"
            alt="placeholder"
            className="h-full max-h-[500px] w-full rounded-xl object-cover md:col-span-2"
          />
          <img
            src="https://cdn.ing/assets/files/record/286203/itwrx0hqshkompfxvikdmj77xoh4"
            alt="placeholder"
            className="h-full max-h-[500px] w-full rounded-xl object-cover md:col-span-5"
          />
        </div>
      </div>
    </section>
  );
};

export { Hero99 };

```

```tsx
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Hero100Props {
  className?: string;
}

const Hero100 = ({ className }: Hero100Props) => {
  return (
    <section className={cn("overflow-hidden font-sans", className)}>
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-10 md:flex-row">
          <div className="basis-2/4">
            <div className="mt-10 flex flex-col gap-2">
              <p className="text-base font-semibold text-muted-foreground">
                Client Relationship Management Software
              </p>
              <h1 className="mb-2 text-4xl leading-snug! font-medium text-black lg:text-5xl">
                Your contact management, all streamlined in a single platform
              </h1>
              <p className="mb-2 text-lg text-black/80">
                Providing a comprehensive view of everything you know about the
                people, companies, and organizations you work with.
              </p>
              <Button
                asChild
                variant="default"
                className="block h-fit w-fit rounded-full px-7 py-3 text-base font-semibold transition-transform hover:scale-105"
              >
                <a href="#">Try Free</a>
              </Button>
            </div>
          </div>
          <div className="relative basis-[42%] py-9 md:py-16">
            <div className="aspect-square w-full overflow-hidden">
              <img
                src="https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u"
                alt=""
                className="relative z-20 h-full w-full object-cover object-center"
              />
              <div className="absolute top-0 left-[6.25rem] z-10 aspect-[1.378254211/1] h-full w-[56.25rem] bg-muted" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero100 };

```

```tsx
"use client";
import AutoScroll from "embla-carousel-auto-scroll";
import Autoplay from "embla-carousel-autoplay";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface Hero103Props {
  className?: string;
}

const Hero103 = ({ className }: Hero103Props) => {
  return (
    <section
      className={cn(
        "dark bg-background bg-[url('https://cdn.ing/assets/i/r/286188/zrqcp9hynh3j7p2laihwzfbujgrl/noise.png')] py-12 font-sans md:py-20",
        className,
      )}
    >
      <div className="container">
        <div className="grid grid-cols-1 items-center justify-center gap-12 lg:grid-cols-[minmax(33.75rem,1fr)_1.5fr] lg:gap-8">
          <div>
            <div className="flex flex-col gap-3">
              <h1 className="text-4xl leading-tight text-foreground md:text-5xl lg:text-[3.5rem]">
                Anticipate greater value from your billing
              </h1>
              <p className="mb-5 text-lg text-foreground">
                Our service is a usage-based billing platform designed to
                accelerate your product launches. Effortlessly shape your
                pricing today and refine it with confidence tomorrow.
              </p>
              <div>
                <div className="flex flex-col items-center gap-4 lg:flex-row">
                  <div className="shrink-0">
                    <Button
                      asChild
                      className="block h-fit w-fit rounded-full px-6 py-3.5 font-mono text-[0.8125rem] leading-4 font-medium tracking-widest uppercase"
                    >
                      <a href="#">Get a Demo</a>
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    asChild
                    className="group flex h-fit items-center gap-2"
                  >
                    <a href="#">
                      <p className="font-mono text-sm font-medium text-foreground uppercase">
                        GUIDE TO EMBRACING USAGE-BASED PRICING
                      </p>
                      <ChevronRight className="h-4 w-4 shrink-0 stroke-foreground transition-transform group-hover:translate-x-2" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="relative mr-auto ml-auto aspect-[1.28581291/1] w-full max-w-[37.25rem] lg:mr-0 lg:ml-auto">
              <div className="relative mx-auto aspect-[1.020365896/1] h-full w-[79.35%] max-w-[29.5625rem] overflow-hidden rounded-3xl">
                <img
                  src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
                  alt=""
                  className="relative z-10 w-full object-cover"
                />
              </div>
              <div className="absolute top-[19.84%] -left-[-2%] z-30 aspect-[1.765043789/1] w-[30.49%] max-w-[11.875rem] overflow-hidden rounded-lg shadow-lg">
                <img
                  src="https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u"
                  alt=""
                  className="size-full object-cover"
                />
              </div>
              <div className="absolute top-[55%] left-[0%] z-30 aspect-[1.776555024/1] w-[43.6%] max-w-[16.375rem] overflow-hidden rounded-lg shadow-lg">
                <img
                  src="https://cdn.ing/assets/files/record/286203/itwrx0hqshkompfxvikdmj77xoh4"
                  alt=""
                  className="size-full object-cover"
                />
              </div>
              <div className="absolute top-[40%] right-[0%] z-30 aspect-[1.170212766/1] w-[26.48%] max-w-[10.3125rem] overflow-hidden rounded-lg shadow-lg">
                <img
                  src="https://cdn.ing/assets/files/record/286204/7rhj7uvcnozjm6c2q4txtptfcmpx"
                  alt=""
                  className="size-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-8 pt-28">
        <p className="px-5 text-center font-mono text-sm font-medium text-foreground uppercase">
          Trusted by the FASTEST-GROWING STARTUPS AND ENTERPRISES
        </p>
        <Carousel
          opts={{
            loop: true,
            align: "center",
          }}
          plugins={[
            AutoScroll({
              speed: 1,
            }),
            Autoplay({
              playOnInit: true,
              delay: 1000,
            }),
          ]}
          className="relative w-full max-w-(--breakpoint-2xl) overflow-hidden"
        >
          <CarouselContent className="items-center">
            <CarouselItem className="w-fit basis-auto px-7">
              <img
                src="https://cdn.ing/assets/files/record/286221/9o1roljuhclobrrmtcfz3o7ptppp"
                alt=""
                className="h-8 w-full object-fill"
              />
            </CarouselItem>
            <CarouselItem className="w-fit basis-auto px-7">
              <img
                src="https://cdn.ing/assets/files/record/286220/t34kymqu5g9xr85o89cji3kfuypb"
                alt=""
                className="h-8 w-full object-fill"
              />
            </CarouselItem>
            <CarouselItem className="w-fit basis-auto px-7">
              <img
                src="https://cdn.ing/assets/files/record/286217/zvgufvfrljos9ygzttuz01584m5r"
                alt=""
                className="h-8 w-full object-fill"
              />
            </CarouselItem>
            <CarouselItem className="w-fit basis-auto px-7">
              <img
                src="https://cdn.ing/assets/files/record/286219/xflgk6oshkxpx4ku0rowz33ey6pi"
                alt=""
                className="h-6 w-full object-fill"
              />
            </CarouselItem>
            <CarouselItem className="w-fit basis-auto px-7">
              <img
                src="https://cdn.ing/assets/files/record/286213/u1qta7tzk0yo7ij8hp84xh1lty3n"
                alt=""
                className="h-6 w-full object-fill"
              />
            </CarouselItem>
            <CarouselItem className="w-fit basis-auto px-7">
              <img
                src="https://cdn.ing/assets/files/record/286221/9o1roljuhclobrrmtcfz3o7ptppp"
                alt=""
                className="h-8 w-full object-fill"
              />
            </CarouselItem>
            <CarouselItem className="w-fit basis-auto px-7">
              <img
                src="https://cdn.ing/assets/files/record/286220/t34kymqu5g9xr85o89cji3kfuypb"
                alt=""
                className="h-8 w-full object-fill"
              />
            </CarouselItem>
            <CarouselItem className="w-fit basis-auto px-7">
              <img
                src="https://cdn.ing/assets/files/record/286217/zvgufvfrljos9ygzttuz01584m5r"
                alt=""
                className="h-8 w-full object-fill"
              />
            </CarouselItem>
            <CarouselItem className="w-fit basis-auto px-7">
              <img
                src="https://cdn.ing/assets/files/record/286219/xflgk6oshkxpx4ku0rowz33ey6pi"
                alt=""
                className="h-6 w-full object-fill"
              />
            </CarouselItem>
            <CarouselItem className="w-fit basis-auto px-7">
              <img
                src="https://cdn.ing/assets/files/record/286213/u1qta7tzk0yo7ij8hp84xh1lty3n"
                alt=""
                className="h-6 w-full object-fill"
              />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export { Hero103 };

```

```tsx
"use client";
import { Play } from "lucide-react";
import { Fragment, useState } from "react";

import { cn } from "@/lib/utils";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Hero116Props {
  className?: string;
}

const Hero116 = ({ className }: Hero116Props) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  return (
    <Fragment>
      <section
        className={cn("font-dm_sans bg-background py-12 md:py-24", className)}
      >
        <div className="container max-w-[1440px]">
          <div className="flex flex-col">
            <div className="flex flex-col items-center justify-center gap-8">
              <h1 className="max-w-[1000px] text-center text-[3.125rem] leading-none text-foreground md:text-[4.25rem] lg:text-[5.5rem]">
                Unlock impactful solutions for accelerated software growth
              </h1>
              <p className="max-w-[53.125rem] text-center text-lg leading-snug text-muted-foreground md:text-xl">
                Sign up on our website and use your account for as long as you’d
                like. Our team is always available to assist and dedicated to
                solving any issues you encounter.
              </p>
              <div className="flex flex-col items-center justify-center gap-3 md:flex-row">
                <Button
                  onClick={() => setIsVideoOpen(true)}
                  asChild
                  className="group flex h-fit w-fit items-center gap-2 overflow-hidden rounded-full px-5 py-2 text-base"
                >
                  <a href="#">
                    <span className="block overflow-hidden">
                      <span
                        data-text="See How it Works"
                        className="relative block text-nowrap transition-all group-hover:-translate-y-[110%] after:absolute after:top-[110%] after:left-0 after:h-full after:w-full after:content-[attr(data-text)]"
                      >
                        See How it Works
                      </span>
                    </span>
                    <Play className="size-4!" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="group block h-fit w-fit overflow-hidden rounded-full px-5 py-2 text-center text-base text-foreground"
                >
                  <a href="#">
                    <span className="block overflow-hidden">
                      <span
                        data-text="Get Started Now"
                        className="relative block text-nowrap transition-all group-hover:-translate-y-[110%] after:absolute after:top-[110%] after:left-0 after:h-full after:w-full after:content-[attr(data-text)]"
                      >
                        Get Started Now
                      </span>
                    </span>
                  </a>
                </Button>
              </div>
            </div>
            <div className="w-full py-[16%]">
              <div className="border-muted2 relative aspect-[2.716981132/1] w-full border">
                <div className="absolute -top-[28%] left-[18%] w-[28.47%] max-w-[25.625rem]">
                  <AspectRatio ratio={1.11372549 / 1}>
                    <img
                      src="https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u"
                      alt=""
                      className="size-full object-cover object-center"
                    />
                  </AspectRatio>
                </div>
                <div className="absolute -top-[28%] left-[51%] w-[18.75%] max-w-[16.875rem]">
                  <AspectRatio ratio={0.845559846 / 1}>
                    <img
                      src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
                      alt=""
                      className="size-full object-cover object-center"
                    />
                  </AspectRatio>
                </div>
                <div className="absolute -bottom-[14%] left-[51%] w-[38.19%] max-w-[34.375rem]">
                  <AspectRatio ratio={1.686153846 / 1}>
                    <img
                      src="https://cdn.ing/assets/files/record/286203/itwrx0hqshkompfxvikdmj77xoh4"
                      alt=""
                      className="size-full object-cover object-center"
                    />
                  </AspectRatio>
                </div>
                <div className="absolute -bottom-[30%] left-[10.7%] w-[38.19%] max-w-[34.375rem]">
                  <AspectRatio ratio={1.415041783 / 1}>
                    <img
                      src="https://cdn.ing/assets/files/record/286204/7rhj7uvcnozjm6c2q4txtptfcmpx"
                      alt=""
                      className="size-full object-cover object-center"
                    />
                  </AspectRatio>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Presentation Video</DialogTitle>
          </DialogHeader>
          <div className="aspect-video">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/your-video-id"
              title="Presentation Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export { Hero116 };

```

```tsx
"use client";
import { Play } from "lucide-react";
import { Fragment, useState } from "react";

import { cn } from "@/lib/utils";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Hero134Props {
  className?: string;
}

const Hero134 = ({ className }: Hero134Props) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  return (
    <Fragment>
      <section className={cn("bg-background py-12 md:py-20", className)}>
        <div className="overflow-hidden border-b border-muted">
          <div className="container">
            <div className="flex flex-col items-center gap-16 md:gap-24">
              <div className="flex flex-col items-center gap-8">
                <div className="flex flex-col items-center gap-7">
                  <h1 className="max-w-[920px] text-center text-4xl leading-tight font-semibold text-foreground md:text-6xl lg:text-7xl">
                    Quickly convert visitors into paying customers
                  </h1>
                  <p className="max-w-[750px] text-center text-base leading-relaxed font-normal text-muted-foreground md:text-xl">
                    Transform your smartphone or tablet into a powerful tool.
                    Effortlessly manage sales and inventory, engage customers,
                    and boost your revenue.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-8">
                  <Button className="group relative h-fit overflow-hidden rounded-full border-none px-6 py-5 font-semibold text-white max-lg:px-5 max-lg:py-3.5 lg:self-start">
                    <div className="relative z-10 flex items-center gap-2.5">
                      <span>Start Your Free Trial Today</span>
                    </div>
                    <div className="absolute bottom-16 -left-16 aspect-square w-16 rounded-full bg-pink-400 transition-all duration-300 group-hover:bottom-1/2 group-hover:-left-5 group-hover:w-[110%] group-hover:translate-y-1/2"></div>
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={() => setIsVideoOpen(true)}
                    className="flex h-fit w-fit items-center gap-2 text-lg font-semibold uppercase hover:bg-transparent"
                  >
                    <div className="flex h-10 w-10 rounded-full bg-primary">
                      <Play className="m-auto size-4 fill-white stroke-white" />
                    </div>
                    <div>Play Video</div>
                  </Button>
                </div>
              </div>
              <div className="w-full">
                <div className="relative h-fit w-full">
                  <div className="relative z-20 w-full max-w-[82.5rem] overflow-hidden rounded-t-xl md:rounded-t-3xl">
                    <AspectRatio ratio={2.095238095 / 1}>
                      <img
                        src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
                        alt=""
                        className="size-full object-cover object-center"
                      />
                    </AspectRatio>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="flex flex-col items-center gap-16 py-20">
            <p className="text-center text-xl font-medium text-primary">
              Trusted by these brands and many others
            </p>
            <div className="flex flex-wrap items-center justify-center gap-20">
              <img
                src="https://cdn.ing/assets/files/record/286222/4w39lhwei0pa97up2wjnay3j96gh"
                alt=""
                className="w-36 opacity-55"
              />
              <img
                src="https://cdn.ing/assets/files/record/286216/bw4zypgflisdtapxy0n4nbmsmtum"
                alt=""
                className="w-36 opacity-55"
              />
              <img
                src="https://cdn.ing/assets/files/record/286215/6wwi6yh2ax2nuo2vqa5gn9vozrgq"
                alt=""
                className="w-36 opacity-55"
              />
              <img
                src="https://cdn.ing/assets/files/record/286230/rl5ccu4bblexv7k2xj6ku4xig4xp"
                alt=""
                className="w-36 opacity-55"
              />
              <img
                src="https://cdn.ing/assets/files/record/286229/6tpue2feey9ja58jh6fwmh5aad0d"
                alt=""
                className="w-36 opacity-55"
              />
            </div>
          </div>
        </div>
      </section>
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Presentation Video</DialogTitle>
          </DialogHeader>
          <div className="aspect-video">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/your-video-id"
              title="Presentation Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export { Hero134 };

```

```tsx
"use client";
import { MessagesSquare, Play } from "lucide-react";
import { Fragment, useState } from "react";

import { cn } from "@/lib/utils";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Hero135Props {
  className?: string;
}

const Hero135 = ({ className }: Hero135Props) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <Fragment>
      <section
        className={cn("bg-primary/5 py-12 font-sans md:py-20", className)}
      >
        <div className="container">
          <div className="flex flex-col justify-center gap-8 lg:flex-row lg:items-center">
            <div className="flex flex-1 flex-col gap-10">
              <div className="flex w-fit items-center gap-2 rounded-md bg-muted py-2 pr-3 pl-4">
                <MessagesSquare className="h-7 w-7 stroke-primary" />
                <div className="text-lg font-bold text-foreground">
                  Customer Stories
                </div>
              </div>
              <h1 className="max-w-96 text-7xl font-medium text-foreground lg:text-8xl">
                Client Journeys
              </h1>
              <p className="max-w-96 text-3xl leading-normal text-muted-foreground lg:text-4xl">
                Inspiring tales of bold companies thriving with Us.
              </p>
            </div>
            <div className="flex-1">
              <div className="relative w-full overflow-hidden rounded-3xl">
                <AspectRatio ratio={1}>
                  <div className="size-full">
                    <video
                      src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/man-1.mp4"
                      muted
                      autoPlay
                      loop
                      className="size-full object-cover object-center"
                    />
                    <Button
                      size="icon"
                      onClick={() => setIsVideoOpen(true)}
                      className="absolute bottom-0 left-0 m-10 flex size-fit w-fit items-center gap-4 rounded-full bg-background py-3 pr-8 pl-3 transition-transform hover:scale-105 hover:bg-background"
                    >
                      <div className="flex h-20 w-20 rounded-full bg-primary">
                        <Play className="m-auto size-7! fill-white stroke-white" />
                      </div>
                      <div>
                        <div className="text-left text-base font-semibold text-foreground">
                          John Doe
                        </div>
                        <div className="text-left text-base font-medium text-muted-foreground">
                          CEO
                        </div>
                      </div>
                    </Button>
                  </div>
                </AspectRatio>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Presentation Video</DialogTitle>
          </DialogHeader>
          <div className="aspect-video">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/your-video-id"
              title="Presentation Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export { Hero135 };

```

```tsx
import { ArrowRight, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Hero136Props {
  className?: string;
}

const Hero136 = ({ className }: Hero136Props) => {
  return (
    <section className={cn("bg-background py-12 md:py-20", className)}>
      <div className="container max-w-[100rem]">
        <div className="flex flex-col items-center justify-center gap-5">
          <div className="mb-3 flex h-20 w-20 rounded-3xl bg-black shadow-[0_-16px_0_-8px_var(--color-gray-300),0_-30px_0_-14px_var(--color-gray-100)]">
            <Sparkles className="m-auto h-12 w-12 fill-white" />
          </div>
          <div className="max-w-[25rem] md:max-w-[31.25rem] lg:max-w-[43.75rem]">
            <h1 className="mb-6 text-center text-[2.75rem] leading-tight font-semibold text-foreground md:text-[3.5rem] lg:text-[4.375rem]">
              Unveil great design from the real world.
            </h1>
            <p className="text-center text-xl text-muted-foreground">
              Showcasing more than 500,000 screens and 2,000 iOS, Android, and
              Web apps — fresh content added every week.
            </p>
          </div>
          <div>
            <div className="mt-3 flex items-center justify-center gap-3">
              <Button
                asChild
                className="h-fit rounded-full border border-primary px-4 py-3 text-base font-semibold"
              >
                <a href="#">Join for free</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="flex h-fit items-center justify-center gap-2 rounded-full px-4 py-3 text-base font-semibold"
              >
                <a href="#">
                  <div>See our plans</div>
                  <span className="flex h-6 w-6 rounded-full bg-zinc-100">
                    <ArrowRight className="m-auto h-4 w-4" />
                  </span>
                </a>
              </Button>
            </div>
          </div>
          <div>
            <div className="py-10 md:py-16">
              <p className="text-center text-sm text-foreground/60">
                Trusted by design teams at
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-5 sm:flex-nowrap">
                <img
                  src="https://cdn.ing/assets/files/record/286222/4w39lhwei0pa97up2wjnay3j96gh"
                  alt=""
                  className="block h-3.5 w-auto opacity-50 md:h-5"
                />
                <img
                  src="https://cdn.ing/assets/files/record/286216/bw4zypgflisdtapxy0n4nbmsmtum"
                  alt=""
                  className="block h-3.5 w-auto opacity-50 md:h-5"
                />
                <img
                  src="https://cdn.ing/assets/files/record/286215/6wwi6yh2ax2nuo2vqa5gn9vozrgq"
                  alt=""
                  className="block h-3.5 w-auto opacity-50 md:h-5"
                />
                <img
                  src="https://cdn.ing/assets/files/record/286230/rl5ccu4bblexv7k2xj6ku4xig4xp"
                  alt=""
                  className="block h-3.5 w-auto opacity-50 md:h-5"
                />
                <img
                  src="https://cdn.ing/assets/files/record/286229/6tpue2feey9ja58jh6fwmh5aad0d"
                  alt=""
                  className="hidden h-3.5 w-auto opacity-50 md:block md:h-5"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full xl:px-8">
        <div className="relative mx-auto aspect-[1.259253731/1] w-full max-w-[96rem] overflow-hidden bg-zinc-950 xl:aspect-[1.896296296/1] xl:rounded-3xl">
          <div className="absolute -bottom-1 left-[56%] aspect-[1.151758794/-1] w-[100%] -translate-x-1/2 overflow-hidden rounded-tl-2xl bg-background xl:left-1/2 xl:aspect-[1.933988764/1] xl:w-[87.5%] xl:rounded-tr-2xl">
            <img
              src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
              alt=""
              className="w-full object-cover object-top-left"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero136 };

```

```tsx
import { ChevronRight, Star } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Hero141Props {
  className?: string;
}

const Hero141 = ({ className }: Hero141Props) => {
  return (
    <section
      className={cn(
        "dark relative h-svh max-h-[1400px] min-h-[600px] w-full overflow-hidden bg-background px-5 font-sans",
        className,
      )}
    >
      <div className="relative z-10 flex size-full">
        <div className="m-auto flex max-w-[25rem] flex-col items-center gap-9 sm:max-w-[31.25rem] md:max-w-[50rem]">
          <h1 className="bg-linear-to-br from-neutral-100 to-neutral-600 bg-clip-text text-center text-4xl leading-tight font-semibold text-transparent sm:text-5xl md:text-[4rem]">
            Liberate yourself from phone interruptions
          </h1>
          <Button
            asChild
            className="flex h-fit w-fit items-center justify-center gap-2 rounded-full px-7 py-3.5 font-medium shadow-[0_0_5px_5px_rgba(255,255,255,.3)] transition-all duration-500 hover:bg-neutral-200 hover:shadow-[0_0_10px_5px_rgba(255,255,255,.5)]"
          >
            <a href="#">
              <p>Buy Here</p>
              <ChevronRight className="size-5" />
            </a>
          </Button>
          <div>
            <div className="flex items-center justify-center gap-0.5">
              <Star className="fill-muted2-foreground size-3" />
              <Star className="fill-muted2-foreground size-3" />
              <Star className="fill-muted2-foreground size-3" />
              <Star className="fill-muted2-foreground size-3" />
              <Star className="fill-muted2-foreground size-3" />
            </div>
            <p className="mt-1.5 max-w-40 text-center text-xs leading-snug font-medium text-foreground/60">
              Trusted by 2,000+ high performing individuals
            </p>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 size-full before:absolute before:inset-0 before:bg-background/85 before:content-['']">
        <video
          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/video-1.mp4"
          muted
          autoPlay
          loop
          controls={false}
          className="size-full object-cover object-center"
        />
      </div>
    </section>
  );
};

export { Hero141 };

```

```tsx
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { BorderBeam } from "@/components/magicui/border-beam";
import { Button } from "@/components/ui/button";

interface Hero143Props {
  className?: string;
}

const Hero143 = ({ className }: Hero143Props) => {
  return (
    <section
      className={cn(
        "dark relative overflow-hidden bg-background py-12 font-sans md:py-20",
        className,
      )}
    >
      <div className="relative z-20 container max-w-[51.125rem]">
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center gap-8 px-4 pt-52 pb-32 md:pb-52">
            <div className="max-w-[25rem] sm:max-w-[33.75rem]">
              <h1 className="text-center text-4xl leading-tight font-semibold text-foreground [text-shadow:0_4px_4px_rgba(0,0,0,0.15)] sm:text-5xl md:text-[4rem]">
                Your fast track to everything.
              </h1>
            </div>
            <div className="max-w-[22.5rem] md:max-w-full">
              <p className="text-center text-sm leading-normal tracking-tight text-balance text-muted-foreground [text-shadow:0_4px_4px_rgba(0,0,0,0.25)] md:text-lg">
                A suite of robust productivity tools packed into an adaptable
                launcher—quick, intuitive, and dependable.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                asChild
                className="inline-flex h-fit w-full items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm leading-snug font-medium tracking-tight text-nowrap sm:w-fit"
              >
                <a href="#">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 384 512"
                    className="h-5 w-5 fill-gray-900"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path>
                  </svg>
                  <p>Download for Mac</p>
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/20 bg-linear-to-b from-white/5 to-white/15 px-3 py-2 text-sm leading-snug font-medium tracking-tight text-nowrap text-white transition-colors hover:border-white/40 sm:w-fit"
              >
                <a href="#">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 448 512"
                    className="h-5 w-5 fill-white"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 93.7l183.6-25.3v177.4H0V93.7zm0 324.6l183.6 25.3V268.4H0v149.9zm203.8 28L448 480V268.4H203.8v177.9zm0-380.6v180.1H448V32L203.8 65.7z"></path>
                  </svg>
                  <p>Join Windows waitlist</p>
                </a>
              </Button>
            </div>
            <div className="flex gap-6 text-xs text-muted-foreground">
              <span>v1.87.5</span>
              <span className="relative before:absolute before:-left-3 before:content-['|']">
                macOS 12+
              </span>
              <span className="relative before:absolute before:-left-3 before:content-['|']">
                <button>Install via homebrew</button>
              </span>
            </div>
          </div>
          <a
            href="#"
            className="group relative mt-10 flex h-8 items-center gap-3 overflow-hidden rounded-full border border-border/50 bg-background px-3 py-1 text-sm font-medium text-white"
          >
            <span>Download on iOS</span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <span>Join waitlist</span>
              <ArrowRight className="h-4 w-4 stroke-muted-foreground" />
            </span>
            <BorderBeam colorFrom="#fca5a5" colorTo="#ef4444" duration={3} />
          </a>
        </div>
      </div>
      <div className="absolute -top-24 z-10 h-full w-full before:absolute before:inset-0 before:size-full before:bg-[radial-gradient(circle_at_center,rgba(10,10,10,.3)_15%,rgba(10,10,10,1)_45%)] before:content-['']">
        <video
          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/video-2.mp4"
          loop
          muted
          autoPlay
          controls={false}
          className="block size-full object-cover object-center bg-blend-saturation"
        />
      </div>
    </section>
  );
};

export { Hero143 };

```

```tsx
import { ArrowDown } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Hero145Props {
  className?: string;
}

const Hero145 = ({ className }: Hero145Props) => {
  return (
    <section
      className={cn(
        "dark relative h-svh max-h-[1400px] w-full bg-[url(https://deifkwefumgah.cloudfront.net/shadcnblocks/block/full-width-backgrounds/andrew-kliatskyi-uBg4k82xnI4-unsplash.jpg)] bg-cover bg-position-[100%] bg-no-repeat before:absolute before:top-0 before:left-0 before:size-full before:bg-[radial-gradient(circle_at_100%_-100%,transparent_40%,rgba(0,0,0,.75)_85%)] before:content-['']",
        className,
      )}
    >
      <div className="relative z-10 container flex size-full max-w-412.5 flex-col justify-between pt-24 pb-14 md:justify-end">
        <div className="flex h-full flex-col justify-between gap-6 md:justify-end">
          <h1 className="text-4xl leading-9 font-bold text-foreground lg:text-5xl lg:leading-12! xl:text-7xl xl:leading-[5.5rem]!">
            <div className="mb-2">We help you to hire top</div>
            <div className="relative h-[calc(2.25rem*3)] md:h-[2.25rem] lg:h-[3rem] xl:h-[5.5rem]">
              <div className="absolute top-0 left-0 animate-[show-text_14s_ease-in-out_infinite_0s] will-change-[opacity]">
                Cybersecurity sales reps
              </div>
              <div className="absolute top-0 left-0 animate-[show-text_14s_ease-in-out_infinite_2s] opacity-0 will-change-[opacity]">
                Pen testers
              </div>
              <div className="absolute top-0 left-0 animate-[show-text_14s_ease-in-out_infinite_4s] opacity-0 will-change-[opacity]">
                Sales engineers
              </div>
              <div className="absolute top-0 left-0 animate-[show-text_14s_ease-in-out_infinite_6s] opacity-0 will-change-[opacity]">
                IAM architects
              </div>
              <div className="absolute top-0 left-0 animate-[show-text_14s_ease-in-out_infinite_8s] opacity-0 will-change-[opacity]">
                Chief Information Security Officers
              </div>
              <div className="absolute top-0 left-0 animate-[show-text_14s_ease-in-out_infinite_10s] opacity-0 will-change-[opacity]">
                Cloud security engineers
              </div>
              <div className="absolute top-0 left-0 animate-[show-text_14s_ease-in-out_infinite_12s] opacity-0 will-change-[opacity]">
                Application Security Engineers
              </div>
            </div>
          </h1>
          <div className="flex flex-col gap-8">
            <p className="text-lg text-foreground lg:text-2xl">
              Discover exceptional talent, fast.
            </p>
            <div className="flex flex-wrap items-center justify-between gap-5">
              <div className="flex flex-wrap items-center gap-5">
                <Button
                  asChild
                  className="h-fit w-fit rounded-full px-7 py-3.5 text-xs font-semibold text-nowrap uppercase lg:px-9 lg:py-5 lg:text-base"
                >
                  <a href="#">Join our network</a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-fit w-fit rounded-full border-white bg-transparent px-7 py-3.5 text-xs font-semibold text-nowrap text-white uppercase hover:bg-background/15 lg:px-9 lg:py-5 lg:text-base"
                >
                  <a href="#">Hire top talent</a>
                </Button>
              </div>
              <Button
                variant="link"
                className="flex h-fit w-fit items-center gap-2 text-xs font-semibold text-nowrap uppercase hover:no-underline lg:text-base"
              >
                <div>Scroll to explore</div>
                <ArrowDown className="size-3! stroke-white lg:size-4!" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero145 };

```

```tsx
"use client";
import { Play } from "lucide-react";
import { Fragment, useState } from "react";

import { cn } from "@/lib/utils";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Hero146Props {
  className?: string;
}

const Hero146 = ({ className }: Hero146Props) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  return (
    <Fragment>
      <section
        className={cn(
          "border-muted2 border-b bg-[url('https://cdn.ing/assets/files/record/286186/nbdflpgp4ostrno079hygibsflp3')] bg-[length:100%_100%] bg-center bg-no-repeat font-sans",
          className,
        )}
      >
        <div className="container pt-12 md:pt-24">
          <div className="flex flex-col items-center gap-5">
            <h1 className="max-w-[25rem] bg-linear-to-r from-neutral-900 via-neutral-700 to-neutral-800 bg-clip-text py-2 text-center text-4xl leading-tight font-semibold tracking-tighter text-transparent md:max-w-[43.75rem] md:text-6xl lg:max-w-[56.25rem] lg:text-[5rem]">
              AI agents for Enterprise deployed in no time
            </h1>
            <p className="max-w-[22.5rem] text-center text-base text-muted-foreground md:max-w-[35rem] lg:text-lg">
              Design and launch custom AI agents tailored to any workflow and
              integrated with every app—no coding needed.
            </p>
            <div className="pt-6">
              <Button className="block h-fit w-fit animate-shadow-ping rounded-md border border-neutral-950 bg-[linear-gradient(180deg,var(--color-neutral-600),var(--color-neutral-700),var(--color-neutral-900))] px-6 py-3.5 text-center text-lg text-white">
                <a href="#">Get Started</a>
              </Button>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[72rem] after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:z-20 after:block after:h-[45%] after:w-full after:bg-linear-to-t after:from-white after:to-transparent after:content-['']">
            <div className="mt-14 flex w-full flex-col items-center gap-5 rounded-2xl border border-neutral-200 bg-neutral-100 p-3">
              <p className="text-center text-xs font-medium text-foreground sm:text-sm md:text-lg">
                Watch how we build an autonomous AI agent in only{" "}
                <span className="underline">5 minutes</span>.
              </p>
              <div className="relative w-full rounded-xl border border-neutral-200 bg-neutral-50">
                <AspectRatio
                  ratio={3.002666667 / 1}
                  className="overflow-hidden"
                >
                  <div>
                    <img
                      src="https://cdn.ing/assets/files/record/286199/em26dugzamyy0nlbqdqq5r9h0xx8"
                      alt=""
                      className="w-full object-cover object-top-left"
                    />
                    <Button
                      onClick={() => setIsVideoOpen(true)}
                      size="icon"
                      className="absolute top-1/2 left-1/2 z-30 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neutral-500 shadow-[0_0_0_14px_var(--color-neutral-300)] transition-all hover:bg-neutral-600 hover:shadow-[0_0_0_0px_var(--color-neutral-300)] md:h-14 md:w-14 lg:h-20 lg:w-20"
                    >
                      <div className="m-auto aspect-square w-[45%]">
                        <Play className="h-full! w-full! fill-white stroke-white" />
                      </div>
                    </Button>
                  </div>
                </AspectRatio>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Presentation Video</DialogTitle>
          </DialogHeader>
          <div className="aspect-video">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/your-video-id"
              title="Presentation Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export { Hero146 };

```

```tsx
"use client";
import { CircleCheck } from "lucide-react";
import { Fragment, useState } from "react";

import { cn } from "@/lib/utils";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Hero149Props {
  className?: string;
}

const Hero149 = ({ className }: Hero149Props) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  return (
    <Fragment>
      <section
        className={cn(
          "font-plus_jakarta_sans relative overflow-hidden bg-background py-12 md:py-20",
          className,
        )}
      >
        <div className="relative z-20 container">
          <div className="mx-auto flex max-w-[900px] flex-col gap-8">
            <h1 className="text-center text-3xl leading-tight font-extrabold text-foreground sm:text-4xl md:text-7xl">
              Get all your design done using our service.
            </h1>
            <p className="mx-auto max-w-[90%] text-center text-base text-foreground md:text-lg">
              Equip your team with a top designer and boost your design
              capacity—in days, not months.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                asChild
                className="block h-fit w-fit rounded-md border-2 border-primary px-10 py-4 text-center text-lg font-bold"
              >
                <a href="#">Book a Demo</a>
              </Button>
              <Button
                asChild
                variant="outline"
                onClick={() => setIsVideoOpen(true)}
                className="block h-fit w-fit rounded-md border-2 bg-transparent px-10 py-4 text-lg font-bold"
              >
                <a href="#">How it Works</a>
              </Button>
            </div>
            <div className="mx-auto flex w-fit max-w-[585px] flex-col flex-wrap items-start justify-center gap-3 sm:w-full sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <CircleCheck className="size-5 fill-primary stroke-muted" />
                <p className="text-sm font-light text-muted-foreground">
                  Unlimited tasks
                </p>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck className="size-5 fill-primary stroke-muted" />
                <p className="text-sm font-light text-muted-foreground">
                  Results in less than 48h
                </p>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck className="size-5 fill-primary stroke-muted" />
                <p className="text-sm font-light text-muted-foreground">
                  Cancel Anytime
                </p>
              </div>
            </div>
          </div>
          <div className="mx-auto mt-16 w-full max-w-[1000px] overflow-hidden rounded-xl shadow-[4px_2px_3.123rem_rgba(0,0,0,.15)]">
            <AspectRatio ratio={1.406469761 / 1}>
              <img
                src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
                alt=""
                className="size-full object-cover object-center"
              />
            </AspectRatio>
          </div>
        </div>
        <img
          src="https://cdn.ing/assets/files/record/286197/c1rxtarndaf346hzf6rpui4kodbb"
          alt=""
          className="absolute top-auto bottom-[13%] left-[-3%] z-10 block w-full"
        />
        <div className="absolute top-auto bottom-[32%] left-[31%] z-10 size-full md:top-[-6%] md:bottom-auto md:left-[13.875rem]">
          <AspectRatio
            ratio={1}
            className="bg-[radial-gradient(closest-side,var(--color-accent),transparent)]"
          />
        </div>
      </section>
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Presentation Video</DialogTitle>
          </DialogHeader>
          <div className="aspect-video">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/your-video-id"
              title="Presentation Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export { Hero149 };

```

```tsx
import { cn } from "@/lib/utils";

import { AvatarGroup } from "@/components/shadcnblocks/avatar-group";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatars: Array<{
    image: string;
    fallback: string;
  }>;
}

interface Hero151Props {
  heading?: string;
  description?: string;
  button?: {
    text: string;
    url: string;
    className?: string;
  };
  testimonial?: Testimonial;
  images: {
    first: string;
    second: string;
    third: string;
    fourth: string;
  };
  className?: string;
}

const Hero151 = ({
  heading = "Blocks built with Shadcn & Tailwind",
  description = "Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.",
  button = {
    text: "Get Started",
    url: "#",
  },
  testimonial = {
    quote: "Focused strategy, swift delivery",
    author: "John Doe",
    role: "CEO",
    company: "Company",
    avatars: [
      { image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp", fallback: "AB" },
      { image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp", fallback: "CD" },
      { image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp", fallback: "EF" },
    ],
  },
  images = {
    first: "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
    second: "https://cdn.ing/assets/files/record/286210/jdwpoe6le13i7l4hn0er8ay9t5n9",
    third: "https://cdn.ing/assets/files/record/286211/1d12hqfn5zpsfloai89gqq98kht0",
    fourth: "https://cdn.ing/assets/files/record/286247/c92kzuar6li9m5lcm7ek8uckgfx0",
  },
  className,
}: Hero151Props) => {
  return (
    <section className={cn("py-12 md:py-20", className)}>
      <div className="container">
        <div className="flex flex-col items-center gap-8 md:flex-row">
          <div className="flex-1">
            <div className="flex flex-col gap-4 lg:gap-8">
              <h1 className="leading-tighter max-w-[80%] text-4xl font-semibold tracking-tight text-foreground lg:text-5xl xl:text-7xl">
                {heading}
              </h1>
              <p className="text-lg leading-relaxed text-muted-foreground xl:text-2xl">
                {description}
              </p>
            </div>
            <div className="my-6 lg:my-10">
              <Button asChild size="lg">
                <a href={button.url}>{button.text}</a>
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <AvatarGroup className="h-10">
                {testimonial.avatars.map((avatar, index) => (
                  <Avatar
                    key={index}
                    className="size-10 border-2 border-border"
                  >
                    <AvatarImage src={avatar.image} alt="" />
                    <AvatarFallback>{avatar.fallback}</AvatarFallback>
                  </Avatar>
                ))}
              </AvatarGroup>
              <div>
                <p className="mb-1 text-sm text-foreground/60 italic">
                  &quot;{testimonial.quote}&quot;
                </p>
                <p className="text-sm font-medium text-foreground/60">
                  {testimonial.author}, {testimonial.role} @
                  {testimonial.company}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full flex-1">
            <div className="w-full max-w-[50rem]">
              <AspectRatio ratio={1 / 1} className="h-full w-full">
                <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-[3.5%]">
                  <div className="overflow-hidden rounded-[5.2%] border border-muted bg-muted">
                    <img
                      src={images.first}
                      alt=""
                      className="object-fit h-full w-full object-center"
                    />
                  </div>
                  <div className="relative overflow-hidden rounded-[5.2%] border border-muted bg-muted">
                    <div className="absolute top-1/2 left-[5%] w-[110%] max-w-[25rem] -translate-y-1/2 overflow-hidden rounded-md">
                      <AspectRatio ratio={1.739130435 / 1}>
                        <img
                          src={images.second}
                          alt=""
                          className="size-full object-cover object-center"
                        />
                      </AspectRatio>
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-[5.2%] border border-muted bg-muted">
                    <div className="absolute top-[9%] left-[9%] w-[200%] max-w-[37.5rem] overflow-hidden rounded-md">
                      <AspectRatio ratio={1.6 / 1}>
                        <img
                          src={images.third}
                          alt=""
                          className="size-full object-cover object-center"
                        />
                      </AspectRatio>
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-[5.2%] border border-muted bg-muted">
                    <div className="relative top-[12%] left-[50%] w-[70%] max-w-[17.5rem] -translate-x-[50%]">
                      <AspectRatio ratio={0.52 / 1}>
                        <img
                          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mockups/phone-1.png"
                          alt=""
                          className="absolute z-20 w-full"
                        />
                        <img
                          src={images.fourth}
                          alt=""
                          className="absolute z-10 w-full rounded-[16%]"
                        />
                      </AspectRatio>
                    </div>
                  </div>
                </div>
              </AspectRatio>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero151 };

```

```tsx
import { MoveUpRight, Star } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Hero152Props {
  className?: string;
}

const Hero152 = ({ className }: Hero152Props) => {
  return (
    <section className={cn("bg-muted pt-12 font-sans md:pt-20", className)}>
      <div className="mx-auto max-w-[99rem] px-0 sm:px-8">
        <div className="container px-4">
          <div className="mx-auto flex max-w-[25rem] flex-col items-center gap-6 sm:max-w-[31.25rem] lg:max-w-[40rem]">
            <div className="flex items-center justify-center gap-2">
              <Star className="size-5 fill-black stroke-black" />
              <p className="text-sm text-nowrap">
                Trusted by over 7,000 customers
              </p>
            </div>
            <div className="mb-2">
              <h1 className="text-center text-[2.8125rem] leading-none font-bold sm:text-[3.9375rem] lg:text-[5.3125rem]">
                Design system that delivers
              </h1>
            </div>
            <p className="text-center text-base leading-snug text-balance text-muted-foreground sm:text-2xl">
              Create, prototype, and personalize any design—clean and
              effortless, in just minutes.
            </p>
            <div className="flex w-full flex-wrap items-center gap-4 md:w-fit">
              <Button
                variant="secondary"
                asChild
                className="group flex h-fit min-w-[11.25rem] flex-1 items-center justify-center gap-1 rounded-[5rem] border-2 border-black px-4 py-3 text-base font-semibold md:min-w-fit md:flex-none"
              >
                <a href="#">
                  <img
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcn-ui-icon.svg"
                    alt=""
                    className="block size-6 shrink-0"
                  />
                  <p className="text-nowrap transition-all duration-300 ease-in-out group-hover:text-primary">
                    Preview
                  </p>
                  <MoveUpRight className="size-6 shrink-0 stroke-black transition-all duration-300 ease-in-out group-hover:stroke-primary" />
                </a>
              </Button>
              <Button
                asChild
                variant="default"
                className="group flex h-fit min-w-[11.25rem] flex-1 items-center justify-center gap-1 rounded-[5rem] border-2 border-primary bg-primary px-4 py-3 text-base font-semibold text-nowrap text-white md:min-w-fit md:flex-none"
              >
                <a href="#">Get Module</a>
              </Button>
            </div>
          </div>
        </div>
        <div className="relative mt-16 aspect-[1.2/1] overflow-hidden sm:-right-[10%] sm:right-auto sm:mt-28 sm:aspect-[2.788990826/1]">
          <div className="absolute top-[11%] left-[8%] z-10 aspect-[0.7/1] w-[80%] sm:left-[4%] sm:w-[45%]">
            <div className="size-full [transform:rotateY(-30deg)_rotateX(-18deg)_rotate(-4deg)]">
              <img
                src="https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u"
                alt=""
                className="block size-full object-cover object-center"
              />
            </div>
          </div>
          <div className="absolute top-0 left-[70%] z-20 aspect-[0.7/1] w-[73%] -translate-x-1/2 sm:left-1/2 sm:w-[38%]">
            <div className="size-full [transform:rotateY(-30deg)_rotateX(-18deg)_rotate(-4deg)] shadow-[-25px_0px_20px_0px_rgba(0,0,0,.04)]">
              <img
                src="https://cdn.ing/assets/files/record/286210/jdwpoe6le13i7l4hn0er8ay9t5n9"
                alt=""
                className="block size-full object-cover object-center"
              />
            </div>
          </div>
          <div className="absolute top-[3%] -right-[45%] z-30 aspect-[0.7/1] w-[85%] sm:-right-[2%] sm:w-[50%]">
            <div className="size-full [transform:rotateY(-30deg)_rotateX(-18deg)_rotate(-4deg)] shadow-[-25px_0px_20px_0px_rgba(0,0,0,.04)]">
              <img
                src="https://cdn.ing/assets/files/record/286211/1d12hqfn5zpsfloai89gqq98kht0"
                alt=""
                className="block size-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero152 };

```

```tsx
import { MoveUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Hero157Props {
  className?: string;
}

const Hero157 = ({ className }: Hero157Props) => {
  return (
    <section
      className={cn(
        "dark relative h-svh max-h-[1400px] w-full overflow-hidden bg-[url('https://deifkwefumgah.cloudfront.net/shadcnblocks/block/full-width-backgrounds/andrew-kliatskyi-MaVm_A0xhKk-unsplash.jpg')] bg-cover bg-center bg-no-repeat py-12 font-poppins after:absolute after:top-0 after:left-0 after:block after:h-full after:w-full after:bg-black/65 after:content-[''] md:py-20",
        className,
      )}
    >
      <div className="relative z-20 container h-full w-full max-w-[85rem]">
        <div className="flex h-full w-full flex-col justify-end gap-12">
          <div className="flex max-w-[61.375rem] flex-col gap-1">
            <p className="text-sm leading-none text-muted-foreground uppercase">
              #WORLDS NUMBER ONE
            </p>
            <h1 className="text-3xl leading-snug! text-foreground md:text-4xl lg:text-6xl">
              Designing Distinctive Spaces with Cutting-Edge Architectural
              Innovations
            </h1>
          </div>
          <div className="flex w-full flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <p className="max-w-[20.25rem] border-l border-muted-foreground pl-6 text-base text-muted-foreground">
              Harnessing the power of architecture to reshape lives and uplift
              communities.
            </p>
            <div className="shrink-0">
              <Button
                asChild
                variant="outline"
                className="group flex h-fit w-fit items-center gap-3 rounded-full border border-muted-foreground/40 bg-transparent px-6 py-4 text-sm text-foreground uppercase hover:bg-transparent"
              >
                <a href="#">
                  <p className="group-hover:underline">Our projects</p>
                  <MoveUpRight className="h-4! w-4! fill-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero157 };

```

```tsx
import { MoveRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";

interface Hero158Props {
  className?: string;
}

const Hero158 = ({ className }: Hero158Props) => {
  return (
    <section className={cn("bg-primary/5 py-12 font-sans md:py-20", className)}>
      <div className="container max-w-[87.5rem]">
        <div className="grid grid-cols-1 gap-[5.625rem] lg:grid-cols-2">
          <div>
            <div className="flex flex-col gap-12">
              <div>
                <h1 className="mb-3 text-4xl font-bold md:text-5xl lg:text-6xl">
                  Uncover our vision for a more innovative, better future
                </h1>
                <p className="text-lg text-muted-foreground">
                  Be part of our journey to innovate and develop solutions that
                  enrich lives and fuel progress.
                </p>
              </div>
              <Button
                asChild
                className="group flex h-fit w-fit items-center gap-2 rounded-full px-8 py-3"
              >
                <a href="#">
                  <div className="font-medium text-white">Started for free</div>
                  <div className="relative h-6 w-7 overflow-hidden">
                    <div className="absolute top-0 left-0 flex -translate-x-1/2 items-center transition-all duration-500 group-hover:translate-x-0">
                      <MoveRight className="h-6! w-6! fill-white px-1" />
                      <MoveRight className="h-6! w-6! fill-white px-1" />
                    </div>
                  </div>
                </a>
              </Button>
            </div>
          </div>
          <div>
            <AspectRatio ratio={1.390658174 / 1}>
              <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-5 lg:max-w-[38.9375rem] lg:gap-8">
                <div className="col-[1/2] row-[1/3]">
                  <div className="h-full w-full overflow-hidden rounded-xl sm:rounded-2xl xl:rounded-3xl">
                    <img
                      src="https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u"
                      alt=""
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                </div>
                <div className="col-[2/3] row-[1/2]">
                  <div className="h-full w-full overflow-hidden rounded-xl sm:rounded-2xl xl:rounded-3xl">
                    <img
                      src="https://cdn.ing/assets/files/record/286210/jdwpoe6le13i7l4hn0er8ay9t5n9"
                      alt=""
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                </div>
                <div className="col-[2/3] row-[2/3]">
                  <div className="h-full w-full overflow-hidden rounded-xl sm:rounded-2xl xl:rounded-3xl">
                    <img
                      src="https://cdn.ing/assets/files/record/286211/1d12hqfn5zpsfloai89gqq98kht0"
                      alt=""
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                </div>
              </div>
            </AspectRatio>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero158 };

```

```tsx
import { MoveRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";

interface Hero159Props {
  className?: string;
}

const Hero159 = ({ className }: Hero159Props) => {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-primary/5 pt-28 pb-12 md:pt-40 md:pb-20 lg:pt-48",
        className,
      )}
    >
      <div className="relative z-10 container">
        <div className="grid grid-cols-1 gap-x-20 gap-y-10 md:grid-cols-[1fr_1fr] xl:gap-x-48">
          <div>
            <div className="flex h-full flex-col justify-between gap-6 md:gap-24">
              <div>
                <h1 className="mb-4 text-5xl leading-tight font-bold text-gray-900 lg:text-[3.625rem] xl:text-6xl">
                  Enabling your financial success
                </h1>
                <p className="text-lg text-muted-foreground">
                  Our platform offers powerful tools and insights to help you
                  manage, grow, and protect your financial assets.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-5">
                <Button
                  asChild
                  className="group flex h-fit w-fit items-center gap-2 rounded-full px-8 py-3"
                >
                  <a href="#">
                    <div className="font-medium text-white">
                      Started for free
                    </div>
                    <div className="relative h-6 w-7 overflow-hidden">
                      <div className="absolute top-0 left-0 flex -translate-x-1/2 items-center transition-all duration-500 group-hover:translate-x-0">
                        <MoveRight className="h-6! w-6! stroke-white px-1" />
                        <MoveRight className="h-6! w-6! stroke-white px-1" />
                      </div>
                    </div>
                  </a>
                </Button>
                <p className="text-muted-foreground">
                  No joining fee . No annual fee
                </p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="h-full w-full md:max-w-[37.5rem]">
              <img
                src="https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u"
                alt=""
                className="aspect-[1.026845638/1] h-full w-full rounded-xl object-cover object-center lg:aspect-[1.34529148/1]"
              />
            </div>
            <div className="absolute bottom-[4%] left-[4%] w-36 lg:w-56">
              <AspectRatio
                ratio={1.140102041 / 1}
                className="overflow-hidden rounded-lg border shadow-sm"
              >
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-white-1.svg"
                  alt=""
                  className="h-full w-full object-cover object-center"
                />
              </AspectRatio>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -top-36 right-0 hidden w-1/2 rounded-bl-[1.875rem] md:block md:h-[34.375rem] xl:h-[41.5625rem]">
        <img
          src="https://cdn.ing/assets/files/record/286207/ce9ss2hob7uml3u1mn8kjvsx93ts"
          alt=""
          className="h-full w-full object-cover object-center"
        />
      </div>
    </section>
  );
};

export { Hero159 };

```

```tsx
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Hero162Props {
  className?: string;
}

const Hero162 = ({ className }: Hero162Props) => {
  return (
    <section
      className={cn(
        "dark relative bg-background font-sans lg:h-[62.5rem]",
        className,
      )}
    >
      <div className="container flex h-full w-full items-center py-20 lg:py-0">
        <div className="mx-auto grid h-full w-full max-w-[87.5rem] grid-cols-1 items-center gap-20 lg:grid-cols-2">
          <div>
            <h1 className="mb-4 text-6xl leading-tight font-medium text-foreground">
              Setting New Industry Standards Through Excellence
            </h1>
            <p className="text-2xl text-foreground">
              Professional Support for Mental Wellness. Personalized Care for
              Emotional Balance.
            </p>
            <div className="mt-10">
              <Button
                asChild
                variant="outline"
                className="block h-fit w-fit rounded-lg border-2 border-white bg-transparent px-8 py-5 text-lg leading-tight font-medium text-white transition duration-500 hover:scale-105 hover:bg-background hover:text-black"
              >
                <a href="#">Our services</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="top-0 right-0 bottom-0 left-auto m-5 ml-0 w-full px-8 pb-5 lg:absolute lg:max-w-[50%] lg:px-0">
        <div className="grid h-full w-full grid-cols-1 grid-rows-[18.75rem_13.125rem_10rem] gap-5 md:grid-cols-[3fr_2fr] md:grid-rows-[80%_minmax(20%,9.375rem)]">
          <div className="row-[1/2] overflow-hidden md:col-[1/3]">
            <div className="h-full w-full overflow-hidden rounded-3xl bg-muted">
              <img
                src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
                alt=""
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <div className="col-[1/2] row-[2/3]">
            <div className="flex h-full flex-col gap-3 overflow-hidden rounded-3xl bg-muted p-5 px-5 md:flex-row md:items-center md:gap-7 md:py-8">
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl md:h-[7.5rem] md:w-[7.5rem]">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp"
                  alt=""
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="flex h-full w-full flex-col justify-between gap-2">
                <p className="text-lg font-medium text-foreground">
                  &quot;Since beginning therapy here, I feel more grounded and
                  at ease.&quot;
                </p>
                <p className="text-foreground">John Doe</p>
              </div>
            </div>
          </div>
          <div className="row-[3/4] md:col-[2/3] md:row-[2/3]">
            <div className="h-full w-full overflow-hidden rounded-3xl bg-muted">
              <img
                src="https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u"
                alt=""
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero162 };

```

```tsx
import { cn } from "@/lib/utils";

interface Hero163Props {
  className?: string;
}

const Hero163 = ({ className }: Hero163Props) => {
  return (
    <section
      className={cn("dark bg-background py-12 font-sans md:py-20", className)}
    >
      <div className="container">
        <div className="mx-auto mb-24 flex max-w-[900px] flex-col items-center gap-3">
          <p className="text-center text-foreground">Your Support Team</p>
          <h1 className="text-center text-4xl leading-tight font-medium text-foreground sm:text-5xl md:text-6xl">
            Experienced Professionals Committed to Your Mental Health
          </h1>
        </div>
        <div className="grid w-full max-w-[83.125rem] auto-cols-auto grid-cols-2 grid-rows-[auto_auto] justify-center gap-5 md:grid-cols-[repeat(4,1fr)]">
          <div className="col-[1/2] row-[1/2] w-full">
            <div className="h-full max-h-[19.375rem] w-full overflow-hidden rounded-2xl">
              <img
                src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
                alt=""
                className="block h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <div className="col-[2/3] row-[1/2] w-full md:col-[2/3] md:row-[1/2]">
            <div className="h-full max-h-[19.375rem] w-full overflow-hidden rounded-2xl">
              <img
                src="https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u"
                alt=""
                className="block h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <div className="col-[1/3] row-[3/4] w-full md:col-[1/3] md:row-[2/3]">
            <div className="flex h-full min-h-[9.375rem] flex-col gap-3 overflow-hidden rounded-3xl bg-muted p-5 px-5 md:flex-row md:items-center md:gap-7 md:py-8">
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl md:h-[7.5rem] md:w-[7.5rem]">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp"
                  alt=""
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="flex h-full w-full flex-col justify-between gap-2">
                <p className="text-lg font-medium text-foreground">
                  &quot;Since beginning therapy here, I feel more grounded and
                  at ease.&quot;
                </p>
                <p className="text-foreground">John Doe</p>
              </div>
            </div>
          </div>
          <div className="col-[1/3] row-[2/3] h-100 w-full md:col-[3/5] md:row-[1/3] md:h-auto">
            <div className="h-full max-h-130.5 w-full overflow-hidden rounded-2xl">
              <img
                src="https://cdn.ing/assets/files/record/286203/itwrx0hqshkompfxvikdmj77xoh4"
                alt=""
                className="block h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero163 };

```

```tsx
"use client";
import { Play } from "lucide-react";
import { Fragment, useState } from "react";

import { cn } from "@/lib/utils";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Hero164Props {
  className?: string;
}

const Hero164 = ({ className }: Hero164Props) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <Fragment>
      <section className={cn("font-onest py-12 md:py-28", className)}>
        <div className="container">
          <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <div className="flex h-full flex-col justify-between gap-12">
                <div className="flex max-w-[41.25rem] flex-col gap-9">
                  <h1 className="text-[2.5rem] leading-none text-primary sm:text-[3.4375rem] md:text-[4rem]">
                    Career Growth with Expert Mentorship
                  </h1>
                  <p className="text-lg font-medium text-primary md:text-xl">
                    Receive tailored mentorship aligned with your goals. Let
                    experienced mentors guide you to success with personalized
                    insights and dedicated support.
                  </p>
                  <Button
                    asChild
                    variant="default"
                    className="h-fit w-fit rounded-full px-8 py-4 font-semibold"
                  >
                    <a href="#">Sign up now</a>
                  </Button>
                </div>
                <div className="flex max-w-[24.375rem] flex-col gap-6">
                  <p className="text-xl text-primary">
                    Watch our introduction to discover our services
                  </p>
                  <Button
                    variant="ghost"
                    onClick={() => setIsVideoOpen(true)}
                    className="group relative flex aspect-video h-full w-full max-w-[24.375rem] overflow-hidden rounded-lg bg-accent bg-[url('https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u')] bg-[length:100%_100%] bg-center bg-no-repeat p-0 transition-all after:absolute after:block after:h-full after:w-full after:bg-background/5 after:content-[''] hover:bg-accent hover:bg-[length:120%_120%] hover:after:bg-black/15"
                  >
                    <AspectRatio ratio={16 / 9} className="flex h-full w-full">
                      <div className="m-auto aspect-square">
                        <Play className="h-10! w-10! fill-white stroke-white transition-transform group-hover:scale-125" />
                      </div>
                    </AspectRatio>
                  </Button>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
                alt=""
                className="aspect-4/5 h-full max-h-[62.5rem] w-full rounded-xl object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="sm:max-w-[50rem]">
          <DialogHeader>
            <DialogTitle>Presentation Video</DialogTitle>
          </DialogHeader>
          <div className="aspect-video">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/your-video-id"
              title="Presentation Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export { Hero164 };

```

```tsx
import { cn } from "@/lib/utils";

import { AspectRatio } from "@/components/ui/aspect-ratio";

interface Hero165Props {
  className?: string;
}

const Hero165 = ({ className }: Hero165Props) => {
  return (
    <section className={cn("bg-background py-12 md:py-20", className)}>
      <div className="container max-w-[98.125rem]">
        <div className="grid grid-cols-1 items-center justify-between gap-14 lg:grid-cols-2">
          <div className="w-full max-w-[41.625rem]">
            <AspectRatio ratio={0.815177479 / 1}>
              <div className="mx-auto grid h-full w-full grid-cols-[14.7%_47.29%_14.7%_14.7%] grid-rows-[34.7%_26.28%_34.7%] gap-x-[2.85%] gap-y-[2.32%]">
                <div className="col-[1/3] row-[1/3]">
                  <div className="h-full w-full overflow-hidden rounded-[2vw] bg-blue-100 lg:rounded-[1.2vw] xl:rounded-2xl">
                    <img
                      src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
                      alt=""
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                </div>
                <div className="col-[3/5] row-[2/3]">
                  <div className="h-full w-full overflow-hidden rounded-[2vw] bg-green-100 lg:rounded-[1.2vw] xl:rounded-2xl">
                    <img
                      src="https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u"
                      alt=""
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                </div>
                <div className="col-[2/4] row-[3/4]">
                  <div className="h-full w-full overflow-hidden rounded-[2vw] bg-pink-100 lg:rounded-[1.2vw] xl:rounded-2xl">
                    <img
                      src="https://cdn.ing/assets/files/record/286203/itwrx0hqshkompfxvikdmj77xoh4"
                      alt=""
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                </div>
              </div>
            </AspectRatio>
          </div>
          <div className="flex w-full max-w-[31.25rem] flex-col gap-14 lg:max-w-full">
            <h1 className="font-serif text-6xl text-foreground lg:text-7xl xl:text-[5rem]">
              Revolutionize your business operations
            </h1>
            <p className="font-montserrat text-2xl leading-snug text-foreground lg:text-3xl xl:text-4xl">
              The ultimate platform to unlock your agency’s capabilities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero165 };

```

```tsx
import { cn } from "@/lib/utils";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";

interface Hero166Props {
  className?: string;
}

const Hero166 = ({ className }: Hero166Props) => {
  return (
    <section className={cn("bg-background py-12 md:py-20", className)}>
      <div className="container max-w-[111rem]">
        <div className="grid w-full grid-cols-1 items-center justify-between gap-14 lg:grid-cols-2">
          <div className="flex w-full max-w-[31.25rem] flex-col gap-8 md:gap-14 lg:max-w-full">
            <h1 className="font-serif text-5xl text-foreground md:text-6xl lg:text-7xl xl:text-[5rem]">
              Revolutionize your business operations
            </h1>
            <p className="font-montserrat text-2xl leading-snug text-foreground lg:text-3xl xl:text-4xl">
              The ultimate platform to unlock your agency’s capabilities.
            </p>
            <Button
              asChild
              className="block h-fit w-fit rounded-lg px-7 py-3.5 text-lg font-medium transition-all duration-300 hover:-translate-y-1"
            >
              <a href="#">Book a Demo</a>
            </Button>
          </div>
          <div className="mx-auto w-full max-w-[52.875rem] lg:mx-0">
            <AspectRatio ratio={1.049627792 / 1}>
              <div className="grid w-full grid-cols-2 items-center justify-center gap-4">
                <div className="flex flex-col items-end justify-center gap-4">
                  <div className="relative animate-[transform1_15s_ease-in-out_infinite] overflow-hidden rounded-lg">
                    <img
                      src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
                      alt=""
                      className="absolute block h-full w-full animate-[image1_15s_ease-in-out_infinite] object-cover object-center"
                    />
                    <img
                      src="https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u"
                      alt=""
                      className="absolute block h-full w-full animate-[image2_15s_ease-in-out_infinite] object-cover object-center"
                    />
                  </div>
                  <div className="relative animate-[transform2_15s_ease-in-out_infinite] overflow-hidden rounded-lg">
                    <img
                      src="https://cdn.ing/assets/files/record/286203/itwrx0hqshkompfxvikdmj77xoh4"
                      alt=""
                      className="absolute block h-full w-full animate-[image1_15s_ease-in-out_infinite] object-cover object-center"
                    />
                    <img
                      src="https://cdn.ing/assets/files/record/286205/e0az5aimgxvqa11grxzaok7fbsvr"
                      alt=""
                      className="absolute block h-full w-full animate-[image2_15s_ease-in-out_infinite] object-cover object-center"
                    />
                    <img
                      src="https://cdn.ing/assets/files/record/286204/7rhj7uvcnozjm6c2q4txtptfcmpx"
                      alt=""
                      className="absolute block h-full w-full animate-[image3_15s_ease-in-out_infinite] object-cover object-center"
                    />
                  </div>
                </div>
                <div className="flex flex-col items-start justify-center gap-4">
                  <div className="relative animate-[transform4_15s_ease-in-out_infinite] overflow-hidden rounded-lg">
                    <img
                      src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
                      alt=""
                      className="absolute block h-full w-full animate-[image3_15s_ease-in-out_infinite] object-cover object-center"
                    />
                  </div>
                  <div className="relative animate-[transform3_15s_ease-in-out_infinite] overflow-hidden rounded-lg">
                    <img
                      src="https://cdn.ing/assets/files/record/286204/7rhj7uvcnozjm6c2q4txtptfcmpx"
                      alt=""
                      className="absolute block h-full w-full animate-[image1_15s_ease-in-out_infinite] object-cover object-center"
                    />
                    <img
                      src="https://cdn.ing/assets/files/record/286205/e0az5aimgxvqa11grxzaok7fbsvr"
                      alt=""
                      className="absolute block h-full w-full animate-[image2_15s_ease-in-out_infinite] object-cover object-center"
                    />
                    <img
                      src="https://cdn.ing/assets/files/record/286206/qs3jazsupq75q1fgisnonwnohie2"
                      alt=""
                      className="absolute block h-full w-full animate-[image3_15s_ease-in-out_infinite] object-cover object-center"
                    />
                  </div>
                </div>
              </div>
            </AspectRatio>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero166 };

```

```tsx
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Hero168Props {
  className?: string;
}

const Hero168 = ({ className }: Hero168Props) => {
  return (
    <section className={cn("overflow-hidden py-32", className)}>
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row xl:gap-20">
          <div className="flex w-full flex-col items-start text-left">
            <h1 className="mb-8 text-4xl font-normal text-pretty md:text-7xl">
              Welcome to Our Website
            </h1>
            <p className="mb-12 max-w-[70%] text-xl font-normal text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
              doloremque mollitia fugiat omnis! Porro facilis quo animi
              consequatur. Explicabo.
            </p>
            <div className="flex w-full justify-start md:justify-start">
              <Button className="px-5 py-3" variant="outline">
                Get Started <ArrowRight className="ml-2 size-4" />
              </Button>
            </div>
          </div>
          <div className="relative flex h-[600px] w-full rounded-md sm:h-[750px]">
            <div className="absolute flex h-[600px] w-screen rounded-md bg-linear-to-b from-muted/50 to-muted sm:h-[750px]">
              <img
                src="https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u"
                alt="placeholder"
                className="my-auto ml-20 block h-4/6 w-auto rounded-md object-cover md:w-2/5"
              />
              <div className="absolute top-1/2 -left-5 md:-left-20 lg:-left-44">
                <img
                  src="https://cdn.ing/assets/files/record/286210/jdwpoe6le13i7l4hn0er8ay9t5n9"
                  alt="placeholder"
                  className="mb-6 h-[134px] w-[230px] rounded-lg object-cover shadow-md lg:h-[142px] lg:w-[265px]"
                />
                <img
                  src="https://cdn.ing/assets/files/record/286211/1d12hqfn5zpsfloai89gqq98kht0"
                  alt="placeholder"
                  className="h-[115px] w-[230px] rounded-lg bg-muted shadow-md lg:h-[122px] lg:w-[265px]"
                />
              </div>
              <img
                src="https://cdn.ing/assets/files/record/286211/1d12hqfn5zpsfloai89gqq98kht0"
                alt="placeholder"
                className="absolute bottom-[70%] -left-5 h-[146px] w-[230px] rounded-lg bg-muted shadow-md md:bottom-10 md:left-1/4 lg:h-[156px] lg:w-[265px] 2xl:left-32"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero168 };

```

```tsx
import { FaGithub } from "react-icons/fa6";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Hero170Props {
  className?: string;
}

const Hero170 = ({ className }: Hero170Props) => {
  return (
    <section
      className={cn(
        "dark overflow-hidden bg-background pt-12 font-sans md:pt-20",
        className,
      )}
    >
      <div className="container">
        <div className="mx-auto max-w-[48.75rem]">
          <h1 className="mb-6 text-center text-3xl leading-tight font-bold text-foreground md:text-4xl lg:text-5xl">
            Unlock the potential of your startup with our app.
          </h1>
          <p className="mx-auto mb-9 max-w-[37.5rem] text-center text-base font-medium text-foreground md:text-lg">
            Experience a revolutionary dashboard that empowers your team with
            real-time data, efficient project management, and enhanced
            collaboration tools.
          </p>
          <div className="mb-10 flex flex-wrap items-center justify-center gap-5">
            <Button
              asChild
              className="block h-fit w-fit rounded-md px-7 py-[0.875rem] font-medium"
            >
              <a href="#">Download</a>
            </Button>
            <Button
              variant="secondary"
              asChild
              className="flex h-fit w-fit items-center gap-4 rounded-md px-7 py-[0.875rem] font-medium"
            >
              <a href="#">
                <FaGithub className="size-6!" />
                <div>Star on Github</div>
              </a>
            </Button>
          </div>
          <p className="mb-4 text-center text-muted-foreground">
            Explore our integration options.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button asChild size="icon" variant="ghost" className="block w-fit">
              <a href="#">
                <img
                  src="https://cdn.ing/assets/files/record/286209/4nowqz6c7v6vhzldvh9qdnhmkrwb"
                  alt=""
                  className="size-10 invert"
                />
              </a>
            </Button>
            <Button asChild size="icon" variant="ghost" className="block w-fit">
              <a href="#">
                <img
                  src="https://cdn.ing/assets/files/record/286208/nay46vdmppxuznd7eg5jnnf4qjv5"
                  alt=""
                  className="size-10 invert"
                />
              </a>
            </Button>
            <Button asChild size="icon" variant="ghost" className="block w-fit">
              <a href="#">
                <img
                  src="https://cdn.ing/assets/files/record/286214/pn9v9zz0de8jgz2mf8o1c11k8gxh"
                  alt=""
                  className="size-10 invert"
                />
              </a>
            </Button>
            <Button asChild size="icon" variant="ghost" className="block w-fit">
              <a href="#">
                <img
                  src="https://cdn.ing/assets/files/record/286235/x4po9fpjkd6cdxnfxaqya6emwvea"
                  alt=""
                  className="size-10 invert"
                />
              </a>
            </Button>
            <Button asChild size="icon" variant="ghost" className="block w-fit">
              <a href="#">
                <img
                  src="https://cdn.ing/assets/files/record/286234/bldwkc8wkq6nd3hkdqds9fy5lls9"
                  alt=""
                  className="size-10 invert"
                />
              </a>
            </Button>
          </div>
        </div>
        <div>
          <div className="relative mx-auto mt-16 w-full max-w-[52.8rem]">
            <img
              src="https://cdn.ing/assets/files/record/286199/em26dugzamyy0nlbqdqq5r9h0xx8"
              alt=""
              className="relative z-20 -mb-[2px] block w-full rounded-tl-lg rounded-tr-lg"
            />
            <img
              src="https://cdn.ing/assets/files/record/286198/yfsjx9thvtxzhl2qtshxyhkrm524"
              alt=""
              className="absolute top-0 right-0 z-10 h-20 w-20 translate-x-[20%] -translate-y-[30%] sm:h-32 sm:w-32 md:h-40 md:w-40"
            />
            <img
              src="https://cdn.ing/assets/files/record/286198/yfsjx9thvtxzhl2qtshxyhkrm524"
              alt=""
              className="absolute bottom-0 left-0 z-10 h-20 w-20 -translate-x-[30%] translate-y-[30%] sm:h-32 sm:w-32 md:h-40 md:w-40"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero170 };

```

```tsx
"use client";
import { Play } from "lucide-react";
import { Fragment, useState } from "react";

import { cn } from "@/lib/utils";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Hero173Props {
  className?: string;
}

const Hero173 = ({ className }: Hero173Props) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  return (
    <Fragment>
      <section className={cn("font-dm_sans py-12 md:py-20", className)}>
        <div className="container">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div className="flex flex-col gap-6">
              <p className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
                Harmony Creative Studio
              </p>
              <div className="flex max-w-[40rem] flex-col gap-6">
                <h1 className="text-4xl leading-tight font-medium md:text-5xl xl:text-6xl">
                  Boost your business with a brand-new website.
                </h1>
                <p className="text-xl text-balance text-muted-foreground">
                  Harmony is a full-service design studio crafting stunning
                  digital experiences and products.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 py-4">
                <Button
                  asChild
                  className="block h-fit w-fit rounded-sm px-5 py-3.5 text-sm font-medium tracking-wider text-nowrap uppercase"
                >
                  <a href="#">Discover now</a>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  onClick={() => setIsVideoOpen(true)}
                  className="flex h-fit w-fit flex-nowrap items-center gap-2 rounded-sm bg-transparent px-5 py-3.5 text-sm font-medium tracking-wider text-nowrap uppercase"
                >
                  <a href="#">
                    <Play className="h-3! w-3! fill-neutral-950" />
                    <p>How it works?</p>
                  </a>
                </Button>
              </div>
            </div>
            <div>
              <div className="relative mx-auto aspect-[0.789340102/1] max-w-[25rem]">
                <div className="absolute bottom-0 left-0 z-30 w-[63%]">
                  <AspectRatio
                    ratio={0.724137931 / 1}
                    className="overflow-hidden"
                  >
                    <img
                      src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
                      alt=""
                      className="size-full object-cover object-center"
                    />
                  </AspectRatio>
                </div>

                <div className="absolute top-1/2 left-1/2 z-20 w-[63%] -translate-x-1/2 -translate-y-1/2">
                  <AspectRatio
                    ratio={0.724137931 / 1}
                    className="overflow-hidden"
                  >
                    <img
                      src="https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u"
                      alt=""
                      className="size-full object-cover object-center"
                    />
                  </AspectRatio>
                </div>

                <div className="absolute top-0 right-0 z-10 w-[63%]">
                  <AspectRatio
                    ratio={0.724137931 / 1}
                    className="overflow-hidden"
                  >
                    <img
                      src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
                      alt=""
                      className="size-full object-cover object-center"
                    />
                  </AspectRatio>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Presentation Video</DialogTitle>
          </DialogHeader>
          <div className="aspect-video">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/your-video-id"
              title="Presentation Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export { Hero173 };

```

```tsx
import { ArrowDown } from "lucide-react";
import { Fragment } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Hero174Props {
  className?: string;
}

const Hero174 = ({ className }: Hero174Props) => {
  return (
    <Fragment>
      <section
        className={cn(
          "font-dm_sans dark relative h-svh max-h-[1400px] min-h-[600px] w-full bg-[url('https://deifkwefumgah.cloudfront.net/shadcnblocks/block/full-width-backgrounds/andrew-kliatskyi-MaVm_A0xhKk-unsplash.jpg')] bg-cover bg-center bg-no-repeat after:absolute after:inset-0 after:block after:size-full after:bg-zinc-950/50 after:content-['']",
          className,
        )}
      >
        <div className="relative z-10 mx-auto flex size-full max-w-[125rem] px-4 py-9">
          <div className="flex w-full flex-col justify-between gap-10">
            <div className="mx-auto flex max-w-[31.25rem] flex-1 flex-col items-center justify-center gap-7 sm:max-w-[37.5rem] md:max-w-[50rem]">
              <h1 className="text-center text-4xl leading-tight font-medium text-foreground sm:text-5xl md:text-6xl">
                Transform Your Vision Into Digital Reality
              </h1>
              <p className="text-center text-lg text-balance text-foreground md:text-2xl">
                We craft exceptional digital solutions that help brands stand
                out and make a lasting impact in the digital landscape.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button
                  asChild
                  className="block h-fit w-fit rounded-sm px-6 py-3.5 text-sm font-semibold tracking-wider text-nowrap uppercase"
                >
                  <a href="#">Explore Projects</a>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-lg bg-black/20 px-6 py-4 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="h-8 w-1 bg-primary"></div>
                <div className="text-sm font-medium text-muted-foreground">
                  <p className="text-primary">Global Headquarters</p>
                  <p>San Francisco, California</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="flex size-10 rounded-full border-2 border-primary transition-colors hover:bg-primary/20"
              >
                <ArrowDown className="m-auto size-5! stroke-primary" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export { Hero174 };

```

```tsx
import { cn } from "@/lib/utils";

import { AspectRatio } from "@/components/ui/aspect-ratio";

interface Hero178Props {
  className?: string;
}

const Hero178 = ({ className }: Hero178Props) => {
  return (
    <section
      className={cn(
        "relative border-b border-muted bg-background pt-10",
        className,
      )}
    >
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-2 md:gap-4 lg:grid-cols-2">
          <div className="flex w-full max-w-[31.25rem] flex-col gap-9 lg:max-w-[37.5rem] lg:py-[20%] xl:py-[26%]">
            <p className="font-mono text-[clamp(0.875rem,0.875vw,1rem)] text-muted-foreground">
              Customer Support
            </p>
            <h1 className="text-[clamp(3.5rem,calc(6.5vw+2.3rem),9.5rem)] leading-[0.85] tracking-[-0.03em] text-foreground">
              Change
              <br />
              their life
            </h1>
            <p className="text-[clamp(1.125rem,1.125vw,1.4rem)] leading-normal text-muted-foreground">
              Customer challenges and team missteps can cause chaos. Simplify
              delivering exceptional support with a platform designed for
              customer-focused teams like yours.
            </p>
          </div>
          <div>
            <div className="relative ml-8 aspect-square w-full max-w-[56.25rem] overflow-hidden lg:absolute lg:right-0 lg:bottom-0 lg:w-1/2">
              <div className="absolute right-0 bottom-0 w-[85%] overflow-hidden rounded-lg">
                <AspectRatio ratio={0.918918919 / 1}>
                  <img
                    src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
                    alt=""
                    className="block size-full object-cover object-top-left"
                  />
                </AspectRatio>
              </div>
              <div className="absolute bottom-0 left-[0%] w-[70%] overflow-hidden rounded-tl-lg">
                <AspectRatio ratio={1.9 / 1}>
                  <img
                    src="https://cdn.ing/assets/files/record/286210/jdwpoe6le13i7l4hn0er8ay9t5n9"
                    alt=""
                    className="block h-full w-full object-cover object-center"
                  />
                </AspectRatio>
              </div>
              <div className="absolute right-[5%] bottom-0 w-[40%] overflow-hidden rounded-tl-lg rounded-tr-lg shadow-md">
                <AspectRatio ratio={0.776119403 / 1}>
                  <img
                    src="https://cdn.ing/assets/files/record/286211/1d12hqfn5zpsfloai89gqq98kht0"
                    alt=""
                    className="block h-full w-full object-cover object-top"
                  />
                </AspectRatio>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero178 };

```

```tsx
import { cn } from "@/lib/utils";

import { AspectRatio } from "@/components/ui/aspect-ratio";

interface Hero179Props {
  className?: string;
}

const Hero179 = ({ className }: Hero179Props) => {
  return (
    <section
      className={cn("relative border-b border-muted bg-background", className)}
    >
      <div className="container pt-10">
        <div className="grid grid-cols-1 items-center gap-2 md:gap-4 lg:grid-cols-2">
          <div className="flex w-full max-w-[31.25rem] flex-col gap-9 lg:max-w-[37.5rem] lg:py-[20%] xl:py-[26%]">
            <p className="font-mono text-[clamp(0.875rem,0.875vw,1rem)] text-muted-foreground">
              Shared Inbox
            </p>
            <h1 className="text-[clamp(3.5rem,calc(6.5vw+2.3rem),9.5rem)] leading-[0.85] tracking-[-0.03em] text-foreground">
              Organize
              <br />
              Your Inbox
            </h1>
            <p className="text-[clamp(1.125rem,1.125vw,1.4rem)] leading-normal text-muted-foreground">
              Your email account doesn’t have to feel like chaos. A shared inbox
              unites all your email aliases, social messages, and teammates in
              one space, ensuring everyone gets the answers they need.
            </p>
          </div>
          <div>
            <div className="relative ml-8 aspect-square w-full max-w-[56.25rem] overflow-hidden lg:absolute lg:right-0 lg:bottom-0 lg:w-1/2">
              <div className="absolute right-0 bottom-0 w-[85%] overflow-hidden rounded-lg">
                <AspectRatio ratio={0.918918919 / 1}>
                  <img
                    src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
                    alt=""
                    className="block size-full object-cover object-top-left"
                  />
                </AspectRatio>
              </div>
              <div className="absolute right-0 bottom-0 w-[93%] overflow-hidden rounded-tl-lg shadow-md">
                <AspectRatio ratio={1.381308411 / 1}>
                  <img
                    src="https://cdn.ing/assets/files/record/286210/jdwpoe6le13i7l4hn0er8ay9t5n9"
                    alt=""
                    className="block size-full object-cover object-center"
                  />
                </AspectRatio>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero179 };

```

```tsx
import { cn } from "@/lib/utils";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";

interface Hero180Props {
  className?: string;
}

const Hero180 = ({ className }: Hero180Props) => {
  return (
    <section
      className={cn("bg-background py-12 font-sans md:py-20", className)}
    >
      <div className="container">
        <div className="flex flex-col gap-24">
          <div>
            <div className="relative z-10 mx-auto flex max-w-[55rem] flex-col gap-7">
              <h1 className="text-center text-5xl leading-[1.294] font-semibold text-foreground sm:text-[3.75rem] md:text-[4.25rem]">
                Conversation Intelligence{" "}
                <span className="relative text-nowrap after:absolute after:top-1/2 after:left-0 after:z-[-1] after:block after:h-[65%] after:w-full after:-translate-y-1/3 after:bg-muted after:content-['']">
                  at Your Fingertips
                </span>
              </h1>
              <p className="text-center text-xl leading-normal text-muted-foreground">
                Grain automates note-taking, record-keeping, and insight
                capture, allowing you to focus on what matters most—coaching
                your team and closing deals.
              </p>
              <div className="flex items-center justify-center gap-5">
                <Button
                  asChild
                  className="block h-fit w-fit rounded-full px-6 py-3 text-base leading-normal font-medium"
                >
                  <a href="#">Try For Free</a>
                </Button>
                <Button
                  asChild
                  variant="secondary"
                  className="block h-fit w-fit rounded-full px-6 py-3 text-base leading-normal font-medium"
                >
                  <a href="#">Book a Demo</a>
                </Button>
              </div>
            </div>
          </div>
          <div>
            <div className="mx-auto w-full max-w-[81.25rem]">
              <AspectRatio ratio={1.818181818 / 1}>
                <div className="relative flex size-full flex-col justify-between">
                  <AspectRatio
                    ratio={3.714285714 / 1}
                    className="w-full rounded-xl bg-[linear-gradient(transparent,var(--color-muted))]"
                  />
                  <AspectRatio
                    ratio={3.714285714 / 1}
                    className="w-full rounded-xl bg-[linear-gradient(var(--color-muted),transparent)]"
                  />
                  <div className="border-muted2 absolute top-1/2 left-1/2 z-10 w-[87.69%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border">
                    <AspectRatio ratio={1.594405594 / 1}>
                      <img
                        src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
                        alt=""
                        className="object-centers size-full object-cover"
                      />
                    </AspectRatio>
                  </div>
                  <div className="absolute -top-[50%] left-1/2 z-0 w-[60%] -translate-x-1/2">
                    <AspectRatio
                      ratio={1}
                      className="bg-[radial-gradient(closest-side,var(--color-accent),transparent)]"
                    />
                  </div>
                </div>
              </AspectRatio>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero180 };

```

```tsx
"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface Hero183Props {
  className?: string;
}

const Hero183 = ({ className }: Hero183Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const updateCurrent = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };

    updateCurrent();
    api.on("select", updateCurrent);

    return () => {
      api.off("select", updateCurrent);
    };
  }, [api]);

  return (
    <section className={cn("overflow-hidden py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-5xl text-center">
          <Badge variant="outline">Premium</Badge>
          <h1 className="mt-6 text-4xl font-bold md:text-6xl">
            Your Ultimate Business Solution.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground md:text-xl lg:px-32">
            Transform your business operations with our cutting-edge solutions
            designed to streamline workflows and boost team efficiency.
          </p>
          <div className="mt-8 flex justify-center gap-2">
            <Button size="lg">Get started</Button>
            <Button variant="outline" size="lg">
              Learn more
            </Button>
          </div>
        </div>
        <div className="relative mx-10 mt-16 hidden md:block">
          <div className="absolute top-0 -right-20 -left-20 z-10 h-px bg-[linear-gradient(to_right,transparent,hsl(var(--border))_4%,hsl(var(--border))_96%,transparent)]"></div>
          <div className="absolute -right-20 bottom-0 -left-20 z-10 h-px bg-[linear-gradient(to_right,transparent,hsl(var(--border))_4%,hsl(var(--border))_96%,transparent)]"></div>
          <div className="relative grid grid-cols-7 grid-rows-11 gap-4 lg:gap-6">
            <img
              src="https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u"
              alt="placeholder"
              className="col-span-2 row-span-4 row-start-2 aspect-video h-full rounded-lg border border-border object-cover"
            />
            <div className="col-span-3 col-start-3 row-span-full m-px rounded-lg bg-muted p-2.5">
              <img
                src="https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u"
                alt="placeholder"
                className="aspect-video h-full rounded-lg border border-border object-cover"
              />
            </div>
            <img
              src="https://cdn.ing/assets/files/record/286203/itwrx0hqshkompfxvikdmj77xoh4"
              alt="placeholder"
              className="col-span-2 row-span-5 row-start-2 aspect-video h-full rounded-lg border border-border object-cover"
            />
            <img
              src="https://cdn.ing/assets/files/record/286204/7rhj7uvcnozjm6c2q4txtptfcmpx"
              alt="placeholder"
              className="col-span-2 row-span-5 aspect-video h-full rounded-lg border border-border object-cover"
            />
            <img
              src="https://cdn.ing/assets/files/record/286205/e0az5aimgxvqa11grxzaok7fbsvr"
              alt="placeholder"
              className="col-span-2 row-span-4 aspect-video h-full rounded-lg border border-border object-cover"
            />
            <div className="absolute -top-[10%] -bottom-[10%] col-start-3 row-span-full row-start-1 w-px bg-[linear-gradient(to_bottom,transparent,hsl(var(--border))_5%,hsl(var(--border))_95%,transparent)]"></div>
            <div className="absolute -top-[10%] -bottom-[10%] -left-[17px] col-start-6 row-span-full row-start-1 w-px bg-[linear-gradient(to_bottom,transparent,hsl(var(--border))_5%,hsl(var(--border))_95%,transparent)] lg:-left-[25px]"></div>
          </div>
          <div className="absolute -top-full -bottom-1/2 -left-6 w-px bg-linear-to-b from-transparent via-border via-60% to-transparent"></div>
          <div className="absolute -top-full -right-6 -bottom-1/2 w-px bg-linear-to-b from-transparent via-border via-60% to-transparent"></div>
        </div>
        <div className="mt-16 md:hidden">
          <Carousel setApi={setApi} className="mx-auto max-w-md">
            <CarouselContent className="max-h-full">
              <CarouselItem>
                <div className="flex flex-col gap-3">
                  <img
                    src="https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u"
                    alt="placeholder"
                    className="aspect-video rounded-lg border border-border object-cover"
                  />
                  <img
                    src="https://cdn.ing/assets/files/record/286204/7rhj7uvcnozjm6c2q4txtptfcmpx"
                    alt="placeholder"
                    className="aspect-4/3 rounded-lg border border-border object-cover"
                  />
                </div>
              </CarouselItem>
              <CarouselItem>
                <img
                  src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
                  alt="placeholder"
                  className="h-full rounded-lg border border-border object-cover"
                />
              </CarouselItem>
              <CarouselItem>
                <div className="flex flex-col gap-3">
                  <img
                    src="https://cdn.ing/assets/files/record/286203/itwrx0hqshkompfxvikdmj77xoh4"
                    alt="placeholder"
                    className="aspect-4/3 rounded-lg border border-border object-cover"
                  />
                  <img
                    src="https://cdn.ing/assets/files/record/286205/e0az5aimgxvqa11grxzaok7fbsvr"
                    alt="placeholder"
                    className="aspect-video rounded-lg border border-border object-cover"
                  />
                </div>
              </CarouselItem>
            </CarouselContent>
            <div className="mt-6 flex justify-center">
              {Array.from({ length: 3 }).map((_, index) => (
                <span
                  key={index}
                  className={cn(
                    "mx-1.5 inline-block size-2 cursor-pointer rounded-full bg-muted-foreground/20 transition-colors duration-300",
                    index + 1 === current && "bg-muted-foreground/60",
                  )}
                  onClick={() => api && api.scrollTo(index)}
                />
              ))}
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export { Hero183 };

```

```tsx
import { cn } from "@/lib/utils";

interface Hero185Props {
  className?: string;
}

const Hero185 = ({ className }: Hero185Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="lg:border-y">
        <div className="container flex flex-col max-lg:divide-y lg:flex-row">
          <div className="flex-1 lg:border-l">
            <div className="lg:border-b lg:pr-8 lg:pb-5 lg:pl-2">
              <h1 className="mx-auto text-[2.5rem] leading-[1.2] tracking-[-1.6px] md:text-[4rem] md:leading-[1.15]! md:tracking-[-4.32px] lg:text-7xl">
                Empowering Productivity with Purpose
              </h1>
              <p className="mt-6 tracking-[-0.32px] text-muted-foreground">
                Our mission is to unlock potential by creating tools that
                elevate productivity and foster seamless collaboration.
              </p>
            </div>
            <div className="relative mt-10 aspect-[3/3.25] overflow-hidden md:mt-14 lg:mr-8 lg:mb-10 lg:ml-2">
              <img
                src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
                alt="About hero image"
                className="object-cover"
              />
            </div>
          </div>

          <div className="lg:border-x lg:px-8">
            <div className="flex justify-center gap-6 lg:gap-8">
              <div className="relative mt-20 aspect-[1/1.1] h-[200px] overflow-hidden lg:mt-32 lg:h-[296px]">
                <img
                  src="https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u"
                  alt="Team meeting"
                  className="object-cover"
                />
              </div>
              <div className="relative mt-10 aspect-[1/1.1] h-[200px] overflow-hidden lg:mt-16 lg:h-[296px]">
                <img
                  src="https://cdn.ing/assets/files/record/286203/itwrx0hqshkompfxvikdmj77xoh4"
                  alt="Team collaboration"
                  className="object-cover"
                />
              </div>
            </div>
            <p className="mt-10 px-4 tracking-[-0.32px] text-muted-foreground md:mt-14">
              Our mission is to enable individuals and teams to achieve their
              best work by delivering innovative tools that simplify workflows,
              enhance collaboration, and drive impactful outcomes. We&apos;re
              dedicated to creating a seamless productivity experience that
              helps people thrive in their work and reach new heights.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero185 };

```

```tsx
import {
  ArrowRight,
  Blend,
  ChartNoAxesColumn,
  CircleDot,
  Diamond,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

const features = [
  {
    title: "Tailored workflows",
    description: "Track progress across custom issue flows for your team.",
    icon: CircleDot,
  },
  {
    title: "Milestones",
    description: "Break projects down into concrete phases.",
    icon: Diamond,
  },
  {
    title: "Cross-team projects",
    description: "Collaborate across teams and departments.",
    icon: Blend,
  },
  {
    title: "Progress insights",
    description: "Track scope, velocity, and progress over time.",
    icon: ChartNoAxesColumn,
  },
];

interface Hero186Props {
  className?: string;
}

const Hero186 = ({ className }: Hero186Props) => {
  return (
    <section
      className={cn(
        "relative mx-2.5 mt-2.5 rounded-t-2xl rounded-b-[36px] bg-linear-to-b from-background via-background to-background lg:mx-4",
        className,
      )}
    >
      <div className="py-32">
        <div className="container flex flex-col justify-between gap-8 md:gap-14 lg:flex-row">
          {/* Left side - Main content */}
          <div className="flex-1">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              Shadcnblocks components for your next project
            </h1>

            <p className="mt-5 text-2xl text-muted-foreground">
              Streamline is the fit-for-purpose tool for planning and building
              modern software products.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button>Get started</Button>
              <a href="#">
                <Button variant="outline" className="h-auto">
                  <span className="flex items-center gap-2 text-start whitespace-pre-wrap">
                    Documentation <ArrowRight />
                  </span>
                </Button>
              </a>
            </div>
          </div>

          {/* Right side - Features */}
          <div className="relative flex flex-1 flex-col justify-center space-y-5 max-lg:pt-10 lg:ps-10">
            <DashedLine
              orientation="vertical"
              className="absolute top-0 left-0 max-lg:hidden"
            />
            <DashedLine
              orientation="horizontal"
              className="absolute top-0 lg:hidden"
            />
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="flex gap-2.5 lg:gap-5">
                  <Icon className="mt-1 size-4 shrink-0 lg:size-5" />
                  <div>
                    <h2 className="font-semibold">{feature.title}</h2>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="container mt-12 md:mt-20 lg:mt-24">
          <img
            src="https://cdn.ing/assets/files/record/286203/itwrx0hqshkompfxvikdmj77xoh4"
            alt="hero"
            className="w-full rounded-2xl object-cover object-center sm:h-[500px] lg:h-[793px]"
          />
        </div>
      </div>
    </section>
  );
};

interface DashedLineProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

const DashedLine = ({
  orientation = "horizontal",
  className,
}: DashedLineProps) => {
  const isHorizontal = orientation === "horizontal";

  return (
    <div
      className={cn(
        "relative text-muted-foreground",
        isHorizontal ? "h-px w-full" : "h-full w-px",
        className,
      )}
    >
      <div
        className={cn(
          isHorizontal
            ? [
                "h-px w-full",
                "bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,currentColor_4px,currentColor_10px)]",
                "[mask-image:linear-gradient(90deg,transparent,black_25%,black_75%,transparent)]",
              ]
            : [
                "h-full w-px",
                "bg-[repeating-linear-gradient(180deg,transparent,transparent_4px,currentColor_4px,currentColor_8px)]",
                "[mask-image:linear-gradient(180deg,transparent,black_25%,black_75%,transparent)]",
              ],
        )}
      />
    </div>
  );
};

export { Hero186 };

```

```tsx
"use client";

import {
  BarChart,
  Database,
  Layers,
  PieChart,
  SquareKanban,
} from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { BorderBeam } from "@/components/magicui/border-beam";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface Tab {
  title: string;
  icon: React.ReactNode;
  image: string;
}

export interface Hero195Props {
  title: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText?: string;
  primaryButtonUrl: string;
  secondaryButtonUrl?: string;
  tabs?: Tab[];
  className?: string;
}

const defaultTabs: Tab[] = [
  {
    title: "Insights",
    icon: <SquareKanban />,
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/dashboard/admin-dashboard-1.png",
  },
  {
    title: "Metrics",
    icon: <BarChart />,
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/dashboard/admin-dashboard-2.png",
  },
  {
    title: "Trends",
    icon: <PieChart />,
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/dashboard/admin-dashboard-3.png",
  },
  {
    title: "Sources",
    icon: <Database />,
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/dashboard/admin-users.png",
  },
  {
    title: "Models",
    icon: <Layers />,
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/dashboard/admin-developer.png",
  },
];

const Hero195 = ({
  title = "Beautiful blocks for Shadcn UI.",
  description = "Shadcnblocks.com offers the best collection of components and blocks for shadcn/ui.",
  primaryButtonText = "Download",
  primaryButtonUrl = "https://shadcnblocks.com",
  secondaryButtonUrl,
  secondaryButtonText,
  tabs = defaultTabs,
  className,
}: Hero195Props) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.title || "");

  return (
    <section className={cn("overflow-hidden", className)}>
      <div className="container">
        <div className="border-x border-border py-20">
          <div className="relative mx-auto max-w-2xl p-2">
            <h1 className="mx-1 mt-6 text-center text-5xl font-bold tracking-tighter md:text-7xl">
              {title}
            </h1>
            <p className="mx-2 mt-6 max-w-xl text-center text-lg font-medium text-muted-foreground md:text-xl">
              {description}
            </p>
            <div className="mx-2 mt-6 flex justify-center gap-2">
              <Button asChild>
                <a href={primaryButtonUrl}>{primaryButtonText}</a>
              </Button>
              {secondaryButtonText && (
                <Button variant="outline" asChild>
                  <a href={secondaryButtonUrl}>{secondaryButtonText}</a>
                </Button>
              )}
            </div>
          </div>
          <div className="mt-16 md:mt-20">
            <Tabs defaultValue={tabs[0]?.title} onValueChange={setActiveTab}>
              <div className="px-2">
                <TabsList className="mx-auto mb-6 flex h-auto w-fit max-w-xs flex-wrap justify-center gap-2 md:max-w-none">
                  {tabs.map((tab) => (
                    <TabsTrigger
                      key={tab.title}
                      value={tab.title}
                      className="font-normal text-muted-foreground"
                    >
                      {tab.icon}
                      {tab.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              <div className="relative isolate">
                <div className="relative z-10">
                  {tabs.map((tab) => (
                    <TabsContent
                      key={tab.title}
                      value={tab.title}
                      className={cn(
                        "-mx-px bg-background transition-opacity duration-500",
                        {
                          "animate-in opacity-100 fade-in":
                            activeTab === tab.title,
                          "opacity-0": activeTab !== tab.title,
                        },
                      )}
                    >
                      <img
                        src={tab.image}
                        alt={tab.title}
                        className="aspect-[16/10] w-full border border-border object-top shadow-[0_6px_20px_rgb(0,0,0,0.12)]"
                      />
                      <BorderBeam duration={8} size={100} />
                    </TabsContent>
                  ))}
                </div>
                <span className="absolute -inset-x-1/5 top-0 -z-10 h-px bg-border [mask-image:linear-gradient(to_right,transparent_1%,black_10%,black_90%,transparent_99%)]"></span>
                <span className="absolute -inset-x-1/5 bottom-0 -z-10 h-px bg-border [mask-image:linear-gradient(to_right,transparent_1%,black_10%,black_90%,transparent_99%)]"></span>

                <span className="absolute -inset-x-1/5 top-12 h-px border-t border-dashed border-border [mask-image:linear-gradient(to_right,transparent_1%,black_10%,black_90%,transparent_99%)]"></span>
                <span className="absolute -inset-x-1/5 bottom-12 h-px border-t border-dashed border-border [mask-image:linear-gradient(to_right,transparent_1%,black_10%,black_90%,transparent_99%)]"></span>

                <span className="absolute -inset-y-1/5 left-1/6 w-px border-r border-dashed border-border [mask-image:linear-gradient(to_bottom,transparent_1%,black_10%,black_90%,transparent_99%)]"></span>
                <span className="absolute -inset-y-1/5 right-1/6 w-px border-r border-dashed border-border [mask-image:linear-gradient(to_bottom,transparent_1%,black_10%,black_90%,transparent_99%)]"></span>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero195 };

```

```tsx
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  Calendar,
  Route,
  Text,
  Waypoints,
  Workflow,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Hero196Props {
  className?: string;
}

const TAB_LIST = [
  {
    icon: Calendar,
    title: "Scheduling",
    image: "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
  },
  {
    icon: Route,
    title: "Routing",
    image: "https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u",
  },
  {
    icon: Workflow,
    title: "Workflows",
    image: "https://cdn.ing/assets/files/record/286203/itwrx0hqshkompfxvikdmj77xoh4",
  },
  {
    icon: Text,
    title: "Forms",
    image: "https://cdn.ing/assets/files/record/286204/7rhj7uvcnozjm6c2q4txtptfcmpx",
  },
  {
    icon: Waypoints,
    title: "Enrichment",
    image: "https://cdn.ing/assets/files/record/286205/e0az5aimgxvqa11grxzaok7fbsvr",
  },
];

const formSchema = z
  .object({
    email: z.email({
      error: "Invalid email address",
    }),
  })
  .required({ email: true });

const HeroForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="w-full">
                  <div className="relative flex w-full flex-col gap-2 lg:block">
                    <Input
                      {...field}
                      type="email"
                      id="emailInput"
                      placeholder="What’s your work email?"
                      className="h-fit bg-background py-4 pr-5 pl-5 lg:pr-[13.75rem]"
                    />
                    <div className="top-1/2 right-2.5 lg:absolute lg:-translate-y-1/2">
                      <Button
                        type="submit"
                        className="w-full rounded-full lg:w-fit"
                      >
                        See Default in action
                        <ArrowRight />
                      </Button>
                    </div>
                  </div>
                  <FormMessage className="py-1" />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

interface Hero196Props {
  className?: string;
}

const Hero196 = ({ className }: Hero196Props) => {
  return (
    <section
      className={cn(
        "bg-muted bg-[url('https://cdn.ing/assets/files/record/286189/arez6gd2s7isn9i1o6c7sexdq7bl')] bg-[length:3.125rem_3.125rem] bg-repeat py-20",
        className,
      )}
    >
      <div className="container">
        <div className="flex w-full flex-col gap-14">
          <div className="flex w-full max-w-[80rem] flex-col items-center gap-6">
            <Badge
              asChild
              variant="outline"
              className="gap-2.5 rounded-full bg-background px-3! py-1.5 text-sm leading-[1.2] font-medium"
            >
              <a href="#">
                Introducing version 2.0!
                <ArrowRight className="size-base" />
              </a>
            </Badge>
            <h1 className="text-center text-[2.5rem] leading-[.97] font-bold sm:text-[3.5rem] md:text-[4rem]">
              Transform inbound with smarter routing, actionable insights, and
              fast scheduling
            </h1>
            <div className="flex w-full max-w-[36rem] flex-col items-center justify-center gap-6 pt-5">
              <p className="text-center text-[1.25rem] leading-snug font-medium text-foreground">
                Drive scalable growth with a single platform that automates
                scheduling, routing, enrichment, and intent workflows.
              </p>
              <div className="w-full max-w-[30rem]">
                <HeroForm />
              </div>
            </div>
          </div>
          <div>
            <Tabs
              defaultValue={TAB_LIST[0].title}
              className="w-full max-w-[85rem] gap-5 rounded-3xl bg-background p-2.5"
            >
              <TabsList className="flex h-fit w-full max-w-fit items-start justify-start gap-2.5 overflow-auto rounded-2xl bg-muted p-2.5 md:mx-auto md:items-center md:justify-center">
                {TAB_LIST.map((trigger, i) => (
                  <TabsTrigger
                    className="fshrink-0 bg-background px-5 py-2.5"
                    key={`tab-trigger-${i}`}
                    value={trigger.title}
                  >
                    <trigger.icon />
                    {trigger.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              {TAB_LIST.map((content, i) => (
                <TabsContent key={`tab-content-${i}`} value={content.title}>
                  <div className="aspect-[1.696202532] w-full overflow-hidden rounded-3xl">
                    <img
                      src={content.image}
                      alt=""
                      className="block size-full object-cover object-center"
                    />
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero196 };

```

```tsx
"use client";

import { motion } from "framer-motion";
import React from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Hero200Props {
  className?: string;
}

const Hero200 = ({ className }: Hero200Props) => {
  return (
    <section className={cn("bg-background py-32", className)}>
      <div className="border-b border-foreground/40">
        <div className="container flex flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-semibold tracking-tighter text-foreground/80 md:text-2xl">
            Shadcnblocks.com
          </h2>
          <h1 className="font-playfair text-4xl tracking-tighter text-foreground md:text-7xl">
            Blocks Built With
            <br />
            Shadcn And Tailwind CSS
            <br />
            Just Copy Paste Them.
          </h1>
          <Button className="my-10 rounded-2xl px-6 py-6 text-background shadow-[0px_1px_3px_#0000001a,inset_0px_2px_0px_#ffffff40] md:rounded-3xl md:px-12 md:py-8 md:text-lg">
            <p className="mr-1 text-xl text-background md:mr-3 md:text-2xl">
              
            </p>{" "}
            Sign up for free
          </Button>

          {/* Iphone mockup with content */}
          <div className="h-[500px] w-full overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 200, scale: 0.8 }}
              animate={{ opacity: 100, y: 0, scale: 1 }}
              transition={{ ease: [0, 0.71, 0.2, 1.01], duration: 0.8 }}
              className="relative mx-auto mt-6 flex h-[850px] w-[400px] items-center justify-center rounded-[75px] bg-black md:mt-12 md:h-[920px] md:w-[450px]"
            >
              <img
                className="absolute z-2 scale-105 object-cover"
                alt="Gold phone frame"
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mockups/phone-5.png"
              />
              <div className="h-full w-full">
                <div className="mt-20 flex justify-between px-0">
                  <h1 className="flex items-end gap-2 px-12 text-5xl font-semibold tracking-tight text-background md:text-6xl">
                    Mon
                    <div className="mb-2 size-3 rounded-full bg-red-500 md:size-5" />
                  </h1>
                  <div className="mt-2 mr-8 flex flex-col items-end">
                    <p className="text-lg tracking-tight text-muted-foreground md:text-xl">
                      Feburary 9
                    </p>
                    <p className="-mt-1 text-xl font-semibold tracking-tighter text-muted-foreground/50 md:text-2xl">
                      2025
                    </p>
                  </div>
                </div>
                <img
                  className="z-2 mx-auto mt-20 size-40 object-cover"
                  alt="Gold phone frame"
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-white-1.svg"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero200 };

```

```tsx
import { ChevronUp } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

const Hero203 = () => {
  return (
    <section className="bg-background py-32">
      <div className="relative container flex flex-col items-center px-0!">
        <div className="container flex w-full flex-col justify-between px-10 lg:flex-row">
          <div className="flex w-full flex-col gap-8">
            <a href="#" className="text-2xl font-semibold tracking-tighter">
              Shadcn Blocks
            </a>
            <h1 className="bg-re relative z-20 text-6xl font-semibold tracking-tighter md:text-8xl">
              The Blocks Built With Shadcn &amp; Tailwind.
            </h1>
            <p className="max-w-2xl tracking-tight text-muted-foreground md:text-xl">
              Finely crafted components built with React, Tailwind and Shadcn
              UI. Developers can copy and paste these blocks directly into their
              project.
            </p>
          </div>
          <div className="mt-8 flex flex-col items-start md:mt-18 lg:w-5/9 lg:items-center">
            <Button className="rounded-2xl px-6 py-6 text-background shadow-[0px_1px_3px_#0000001a,inset_0px_2px_0px_#ffffff40] md:rounded-3xl md:px-12 md:py-8 md:text-lg">
              <p className="mr-1 text-xl text-background md:mr-3 md:text-2xl">
                
              </p>{" "}
              Sign up for free
            </Button>
          </div>
        </div>
        <div className="flex w-full flex-col justify-between pr-10 md:mt-10 md:flex-row">
          <DottedDiv className="group h-160 w-120 p-4">
            <div className="relative h-full w-full bg-muted/50 p-4 transition-all ease-in-out group-hover:bg-muted">
              {/* Bg Image div */}
              <div className="relative h-full w-full overflow-hidden rounded-3xl">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-5oYbG-sEImY-unsplash.jpg"
                  alt="aiImage"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>
              </div>
              <div className="absolute top-4 -ml-4 flex h-full w-full flex-col items-center justify-between p-10">
                <p className="flex w-full items-center text-xl tracking-tighter text-background">
                  2025 <span className="mx-2 h-2.5 w-[1px] bg-background" />
                  March
                </p>
                <div className="flex flex-col items-center justify-center">
                  <h2 className="text-center text-6xl font-semibold tracking-tight text-background">
                    Shadcn <br />
                    Carousal
                  </h2>
                  <div className="mt-2 h-1 w-6 rounded-full bg-background" />
                  <p className="mt-10 max-w-sm px-2 text-center text-lg leading-5 font-light tracking-tighter text-background/80">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Iure debitis.
                  </p>
                </div>
                <a
                  href="#"
                  className="group mb-6 flex cursor-pointer flex-col items-center justify-center text-background"
                >
                  <ChevronUp
                    size={30}
                    className="transition-all ease-in-out group-hover:-translate-y-2"
                  />
                  <p className="text-xl tracking-tight text-background">
                    See All
                  </p>
                </a>
              </div>
            </div>
          </DottedDiv>
          <DottedDiv className="group h-160 w-120 p-4 lg:-mt-60">
            <div className="relative h-full w-full bg-muted/50 p-4 transition-all ease-in-out group-hover:bg-muted">
              {/* Bg Image div */}
              <div className="relative h-full w-full overflow-hidden rounded-3xl">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-majMgWtrF48-unsplash.jpg"
                  alt="aiImage"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>
              </div>
              <div className="absolute top-4 -ml-4 flex h-full w-full flex-col items-center justify-between p-10">
                <p className="flex w-full items-center text-xl tracking-tighter text-background">
                  2025 <span className="mx-2 h-2.5 w-[1px] bg-background" />
                  March
                </p>
                <div className="flex flex-col items-center justify-center">
                  <h2 className="text-center text-6xl font-semibold tracking-tight text-background">
                    Shadcn <br />
                    Carousal
                  </h2>
                  <div className="mt-2 h-1 w-6 rounded-full bg-background" />
                  <p className="mt-10 max-w-sm px-2 text-center text-lg leading-5 font-light tracking-tighter text-background/80">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Iure debitis.
                  </p>
                </div>
                <a
                  href="#"
                  className="group mb-6 flex cursor-pointer flex-col items-center justify-center text-background"
                >
                  <ChevronUp
                    size={30}
                    className="transition-all ease-in-out group-hover:-translate-y-2"
                  />
                  <p className="text-xl tracking-tight text-background">
                    See All
                  </p>
                </a>
              </div>
            </div>
          </DottedDiv>
        </div>
      </div>
    </section>
  );
};

export { Hero203 };

const DottedDiv = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("relative", className)}>
    <div className="absolute top-4 -left-25 h-[1.5px] w-[115%] bg-muted" />
    <div className="absolute bottom-4 -left-25 h-[1.5px] w-[115%] bg-muted" />
    <div className="absolute -top-25 left-4 h-[130%] w-[1.5px] bg-muted" />
    <div className="absolute -top-25 right-4 h-[130%] w-[1.5px] bg-muted" />
    <div className="absolute top-[12.5px] left-[12.5px] z-10 size-2 rounded-full bg-foreground" />
    <div className="absolute top-[12.5px] right-[12.5px] z-10 size-2 rounded-full bg-foreground" />
    <div className="absolute bottom-[12.5px] left-[12.5px] z-10 size-2 rounded-full bg-foreground" />
    <div className="absolute right-[12.5px] bottom-[12.5px] z-10 size-2 rounded-full bg-foreground" />
    {children}
  </div>
);

```

```tsx
"use client";

import { motion } from "framer-motion";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/effect-cards";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Hero210Props {
  className?: string;
}

const Hero210 = ({ className }: Hero210Props) => {
  const images = [
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random11.jpeg",
      alt: "Portrait of Joanna Doe in urban setting",
      name: "Joanna Doe",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random1.jpeg",
      alt: "Portrait of Joan Doe in natural lighting",
      name: "Joan Doe",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random2.jpeg",
      alt: "Portrait of Sarah Chen in studio setting",
      name: "Sarah Chen",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random11.jpeg",
      alt: "Portrait of Joanna Doe in urban setting",
      name: "Joanna Doe",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random1.jpeg",
      alt: "Portrait of Joan Doe in natural lighting",
      name: "Joan Doe",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random2.jpeg",
      alt: "Portrait of Sarah Chen in studio setting",
      name: "Sarah Chen",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random11.jpeg",
      alt: "Portrait of Joanna Doe in urban setting",
      name: "Joanna Doe",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random1.jpeg",
      alt: "Portrait of Joan Doe in natural lighting",
      name: "Joan Doe",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random2.jpeg",
      alt: "Portrait of Sarah Chen in studio setting",
      name: "Sarah Chen",
    },
  ];

  const css = `
  .mySwiperHero210 {
    width: 100%;
    height: 420px;
    padding-bottom: 50px;
  }
  
  .mySwiperHero210 .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
  }
  
  .mySwiperHero210 .swiper-slide img {
    display: block;
    width: 100%;
  }
  
  .swiper-3d .swiper-slide-shadow-left {
    background-image: none;
  }
    
  .swiper-3d .swiper-slide-shadow-right{
    background: none;
  }
  `;
  return (
    <section className={cn("py-32", className)}>
      <style>{css}</style>
      <div className="container px-0 sm:px-8">
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-4 px-8 sm:px-0">
          <h1 className="text-center font-calSans text-5xl lg:text-7xl">
            Boost your Professional Career
          </h1>
          <p className="text-center text-muted-foreground lg:text-lg">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus odit eius tenetur quaerat, aperiam, iste ea ex
          </p>
        </div>

        <div className="relative mt-12 h-[420px] w-full lg:px-20">
          <div className="absolute left-0 z-10 h-full w-12 bg-linear-to-r from-background to-transparent sm:via-background md:w-58 lg:left-16" />
          <div className="absolute right-0 z-10 h-full w-12 bg-gradient-to-l from-background to-transparent sm:via-background md:w-58 lg:right-16" />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <Swiper
              autoplay={{
                delay: 1500,
                disableOnInteraction: false,
              }}
              effect="coverflow"
              grabCursor={true}
              slidesPerView="auto"
              centeredSlides={true}
              loop={true}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              className="mySwiperHero210"
              modules={[EffectCoverflow, Autoplay]}
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    className="h-full w-full overflow-hidden rounded-3xl object-cover shadow-lg"
                    src={image.src}
                    alt={image.alt}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>

        <div className="relative mx-auto mt-4 flex w-fit justify-center">
          <Button className="rounded-full px-4 py-2 active:scale-105">
            Get Started
          </Button>
          <motion.div
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.3, delay: 1 }}
            className="absolute top-3 -right-30 h-1"
          >
            <p className="font-caveat text-xl tracking-tight">
              Try free tier now
            </p>
            <svg
              width="82"
              className="-translate-x-1/2 pr-4 dark:invert"
              height="45"
              viewBox="0 0 82 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                d="M80.2759 1.95576C67.8687 20.6075 49.1102 55.0246 21.9767 39.1283C15.3299 35.2342 12.7124 29.0489 9.38472 22.4634C9.24096 22.1789 6.96955 15.0574 7.91833 15.4904C10.4589 16.65 25.535 23.253 15.8013 18.8782C14.7716 18.4154 8.31018 14.0924 7.25323 14.6265C4.37354 16.0816 2.6512 30.2469 1.58546 33.4898"
                stroke="#1C1C1C"
                strokeWidth="2.40332"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { Hero210 };

```

```tsx
"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Hero229Props {
  className?: string;
}

const Hero229 = ({ className }: Hero229Props) => {
  return (
    <section
      className={cn(
        "relative h-[100dvh] w-[100dvw] overflow-hidden border bg-background py-32",
        className,
      )}
    >
      <div className="relative z-20 container flex flex-col items-center justify-center gap-4 text-center">
        <Button
          variant="secondary"
          className="text-md group mt-42 flex w-fit items-center justify-center gap-3 rounded-full bg-muted/60 px-5 py-1 tracking-tight"
        >
          <span className="size-2 rounded-full bg-foreground" />
          <span>See Pricing</span>
        </Button>
        <h1 className="max-w-3xl text-5xl font-medium tracking-tighter text-foreground md:text-7xl">
          Blocks Built <br /> With Shadcn & Tailwind.
        </h1>
        <p className="mt-5 max-w-xl text-muted-foreground/80">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum animi,
          ipsam provident optio delectus neque aliquid cumque. Beatae, odio!
        </p>
        <div className="flex gap-4">
          <Button
            variant="secondary"
            className="text-md group flex w-fit items-center justify-center gap-2 rounded-full px-4 py-1 tracking-tight"
          >
            <span>Documentation</span>
            <ArrowRight className="size-4 -rotate-45 transition-all ease-out group-hover:ml-3 group-hover:rotate-0" />
          </Button>
          <Button
            variant="default"
            className="text-md group flex w-fit items-center justify-center gap-2 rounded-full px-4 py-1 tracking-tight"
          >
            <span>Get Started</span>
            <ArrowRight className="size-4 -rotate-45 transition-all ease-out group-hover:ml-3 group-hover:rotate-0" />
          </Button>
        </div>
      </div>

      <Illustration1
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0, 0, 0, 1.12] }}
        className="absolute top-0 left-1/2 -translate-x-1/2"
      />
      <Illustration1
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0, 0, 0, 1.12] }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 scale-y-[-1]"
      />
      <Illustration2
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: [0, 0, 0, 1.12] }}
        className="absolute top-1/2 left-0 z-99 hidden -translate-y-1/2 md:block"
      />
      <Illustration2
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: [0, 0, 0, 1.12] }}
        className="absolute top-1/2 right-0 z-99 hidden -translate-y-1/2 scale-x-[-1] md:block"
      />
    </section>
  );
};

export { Hero229 };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Illustration1 = (props: any) => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={460}
      height={233}
      fill="none"
      {...props}
    >
      <path stroke="url(#a)" d="M141.338 232.625V5.075" />
      <path stroke="url(#b)" d="M176.338 232.625V5.075" />
      <path stroke="url(#c)" d="M212.338 231.625V4.075" />
      <path stroke="url(#d)" d="M248.338 230.625V3.075" />
      <path stroke="url(#e)" d="M284.338 229.625V2.075" />
      <path stroke="url(#f)" d="M320.338 228.625V1.075" />
      <path
        stroke="url(#g)"
        d="M459.649 152.723 351.613 69.264a11 11 0 0 1-4.275-8.705V.074"
      />
      <path
        stroke="url(#h)"
        d="m.338 152.723 108.036-83.459a11 11 0 0 0 4.275-8.705V.074"
      />
      <defs>
        <linearGradient
          id="a"
          x1={141.838}
          x2={141.838}
          y1={232.625}
          y2={5.074}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset={1} stopColor="#999" />
        </linearGradient>
        <linearGradient
          id="b"
          x1={176.838}
          x2={176.838}
          y1={232.625}
          y2={5.074}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset={1} stopColor="#999" />
        </linearGradient>
        <linearGradient
          id="c"
          x1={212.838}
          x2={212.838}
          y1={231.625}
          y2={4.074}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset={1} stopColor="#999" />
        </linearGradient>
        <linearGradient
          id="d"
          x1={248.838}
          x2={248.838}
          y1={230.625}
          y2={3.074}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset={1} stopColor="#999" />
        </linearGradient>
        <linearGradient
          id="e"
          x1={284.838}
          x2={284.838}
          y1={229.625}
          y2={2.074}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset={1} stopColor="#999" />
        </linearGradient>
        <linearGradient
          id="f"
          x1={320.838}
          x2={320.838}
          y1={228.625}
          y2={1.074}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset={1} stopColor="#999" />
        </linearGradient>
        <linearGradient
          id="g"
          x1={403.494}
          x2={403.494}
          y1={152.723}
          y2={0.074}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset={1} stopColor="#999" />
        </linearGradient>
        <linearGradient
          id="h"
          x1={56.494}
          x2={56.494}
          y1={152.723}
          y2={0.074}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset={1} stopColor="#999" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Illustration2 = (props: any) => {
  return (
    <motion.svg
      {...props}
      width="200"
      height="444"
      viewBox="0 0 323 444"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 442.957L209.048 442.957C212.366 442.957 215.508 441.458 217.596 438.879L321.802 310.196"
        stroke="url(#paint0_linear_290_207)"
      />
      <path
        d="M0 1.19531L209.048 1.19557C212.366 1.19558 215.508 2.69391 217.596 5.27302L321.802 133.956"
        stroke="url(#paint1_linear_290_207)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_290_207"
          x1="160.901"
          y1="442.957"
          x2="160.901"
          y2="310.196"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#999999" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_290_207"
          x1="160.901"
          y1="1.19531"
          x2="160.901"
          y2="133.956"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#999999" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
};

```

```tsx
"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface Hero230Props {
  className?: string;
}

const Hero230 = ({ className }: Hero230Props) => {
  const images = [
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random14.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw9.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random11.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/landscape5.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random15.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw4.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw5.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw6.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw7.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw8.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/person1.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/person2.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/person3.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random1.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random11.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw1.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random3.jpeg",
  ];
  const logos = [
    {
      id: "logo-1",
      description: "Logo 1",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/astro-wordmark.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-2",
      description: "Logo 2",
      image: "https://cdn.ing/assets/files/record/286222/4w39lhwei0pa97up2wjnay3j96gh",
      className: "h-7 w-auto",
    },
    {
      id: "logo-3",
      description: "Logo 3",
      image: "https://cdn.ing/assets/files/record/286216/bw4zypgflisdtapxy0n4nbmsmtum",
      className: "h-7 w-auto",
    },
    {
      id: "logo-4",
      description: "Logo 4",
      image: "https://cdn.ing/assets/files/record/286215/6wwi6yh2ax2nuo2vqa5gn9vozrgq",
      className: "h-7 w-auto",
    },
    {
      id: "logo-5",
      description: "Logo 5",
      image: "https://cdn.ing/assets/files/record/286230/rl5ccu4bblexv7k2xj6ku4xig4xp",
      className: "h-7 w-auto",
    },
    {
      id: "logo-6",
      description: "Logo 6",
      image: "https://cdn.ing/assets/files/record/286229/6tpue2feey9ja58jh6fwmh5aad0d",
      className: "h-5 w-auto",
    },
    {
      id: "logo-7",
      description: "Logo 7",
      image: "https://cdn.ing/assets/files/record/286232/e4357wegghlhmlpr1gue9ektg125",
      className: "h-7 w-auto",
    },
    {
      id: "logo-8",
      description: "Logo 8",
      image: "https://cdn.ing/assets/files/record/286227/uw8kpztosjoogahdto1ssnievsn2",
      className: "h-7 w-auto",
    },
    {
      id: "logo-1",
      description: "Logo 1",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/astro-wordmark.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-2",
      description: "Logo 2",
      image: "https://cdn.ing/assets/files/record/286222/4w39lhwei0pa97up2wjnay3j96gh",
      className: "h-7 w-auto",
    },
    {
      id: "logo-3",
      description: "Logo 3",
      image: "https://cdn.ing/assets/files/record/286216/bw4zypgflisdtapxy0n4nbmsmtum",
      className: "h-7 w-auto",
    },
    {
      id: "logo-4",
      description: "Logo 4",
      image: "https://cdn.ing/assets/files/record/286215/6wwi6yh2ax2nuo2vqa5gn9vozrgq",
      className: "h-7 w-auto",
    },
    {
      id: "logo-5",
      description: "Logo 5",
      image: "https://cdn.ing/assets/files/record/286230/rl5ccu4bblexv7k2xj6ku4xig4xp",
      className: "h-7 w-auto",
    },
    {
      id: "logo-6",
      description: "Logo 6",
      image: "https://cdn.ing/assets/files/record/286229/6tpue2feey9ja58jh6fwmh5aad0d",
      className: "h-5 w-auto",
    },
    {
      id: "logo-7",
      description: "Logo 7",
      image: "https://cdn.ing/assets/files/record/286232/e4357wegghlhmlpr1gue9ektg125",
      className: "h-7 w-auto",
    },
    {
      id: "logo-8",
      description: "Logo 8",
      image: "https://cdn.ing/assets/files/record/286227/uw8kpztosjoogahdto1ssnievsn2",
      className: "h-7 w-auto",
    },
  ];
  return (
    <section className={cn("py-32", className)}>
      <div className="container flex flex-col items-center justify-center gap-4 text-center">
        <Button
          variant="secondary"
          className="group flex w-fit items-center justify-center gap-3 rounded-full bg-muted/70 px-5 py-1"
        >
          <span className="size-2.5 rounded-full bg-foreground" />
          Flexible Plan customized for you
        </Button>
        <h1 className="max-w-3xl font-calSans text-5xl font-medium tracking-tight text-foreground md:text-7xl">
          Blocks Built <br /> With Shadcn & Tailwind.
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground/80">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum animi,
          ipsam provident optio delectus neque aliquid cumque. Beatae, odio!
        </p>
        <div className="mt-8 mb-12 flex gap-4">
          <Button
            variant="secondary"
            className="group flex w-fit items-center justify-center gap-2 rounded-full px-4 py-1 tracking-tight"
          >
            <span>Documentation</span>
            <ArrowRight className="size-4 -rotate-45 transition-all ease-out group-hover:ml-3 group-hover:rotate-0" />
          </Button>
          <Button
            variant="default"
            className="group flex w-fit items-center justify-center gap-2 rounded-full px-4 py-1 tracking-tight"
          >
            <span>Get Started</span>
            <ArrowRight className="size-4 -rotate-45 transition-all ease-out group-hover:ml-3 group-hover:rotate-0" />
          </Button>
        </div>

        <div className="relative mx-auto flex items-center justify-center">
          <Carousel
            plugins={[AutoScroll({ playOnInit: true })]}
            opts={{ loop: true, align: "start" }}
          >
            <CarouselContent className="ml-0">
              {logos.map((logo, index) => (
                <CarouselItem
                  key={index}
                  className="relative mr-6 flex h-15 basis-1/2 justify-center pl-0 opacity-30 sm:basis-1/4 md:basis-1/3 lg:basis-1/9"
                >
                  <div className="flex flex-col items-center justify-center">
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
          <div className="bg-gradient-t o-r absolute inset-y-0 left-0 w-32 from-background to-transparent"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent"></div>
        </div>
        <div className="relative mx-auto -mt-12 flex items-center justify-center">
          <Carousel
            plugins={[Autoplay({ delay: 1500 })]}
            opts={{ loop: true, align: "start" }}
          >
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem
                  key={index}
                  className="relative flex basis-1/2 translate-y-18 cursor-grab justify-center active:cursor-grabbing sm:basis-1/4 md:basis-1/3 lg:basis-1/5"
                >
                  <div className="easeOut mt-auto w-full overflow-hidden rounded-t-3xl border transition-all hover:-translate-y-18">
                    <img
                      src={image}
                      alt={image}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export { Hero230 };

```

```tsx
"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

const galleryImages = [
  [
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw1.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw2.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw3.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw4.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw5.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw6.jpeg",
  ],
  [
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw7.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw8.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw9.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw10.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw11.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw12.jpeg",
  ],
];

interface Hero234Props {
  className?: string;
}

const Hero234 = ({ className }: Hero234Props) => {
  return (
    <section
      className={cn(
        "relative min-h-screen overflow-hidden bg-background",
        className,
      )}
    >
      <div className="absolute inset-0 flex flex-col justify-center gap-4">
        {galleryImages.map((row, rowIndex) => (
          <motion.div
            key={rowIndex}
            className="flex gap-4 will-change-transform"
            animate={{
              x: rowIndex === 1 ? [-1920, 0] : [0, -1920],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...row, ...row, ...row].map((image, imageIndex) => (
              <motion.div
                key={`${rowIndex}-${imageIndex}`}
                className="relative flex-shrink-0 overflow-hidden rounded-lg"
                style={{
                  width: rowIndex === 1 ? "280px" : "240px",
                  height: rowIndex === 1 ? "350px" : "300px",
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={image}
                  alt={`Gallery image ${imageIndex + 1}`}
                  className="h-full w-full object-cover"
                />
              </motion.div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Left side masks */}
      <div className="absolute top-0 left-0 z-10 h-full w-[160px] bg-linear-to-r from-background to-transparent md:w-[200px]" />

      {/* Right side masks */}
      <div className="absolute top-0 right-0 z-10 h-full w-[160px] bg-gradient-to-l from-background to-transparent md:w-[200px]" />

      <div className="relative z-20 flex min-h-screen items-center justify-center">
        <motion.div
          className="rounded-lg bg-black/60 p-8 backdrop-blur-md md:p-12"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.h1
            className="text-3xl leading-tight text-white md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            A Studio <br />
            Crafting <br />
            Digital Art
          </motion.h1>

          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <Button size="lg" variant="secondary">
              View Projects
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export { Hero234 };

```
