```tsx
"use client";

import { ArrowUpRight, Plus } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

const data = [
  {
    id: "item-1",
    title: "Case study 1",
    href: "#",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
    logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcn-ui-wordmark.svg",
    company: "Company Name",
  },
  {
    id: "item-2",
    title: "Case study 2",
    href: "#",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-2.svg",
    logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/astro-wordmark.svg",
    company: "Company Name",
  },
  {
    id: "item-3",
    title: "Case study 3",
    href: "#",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-3.svg",
    logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/vercel-wordmark.svg",
    company: "Company Name",
  },
];

interface Gallery1Props {
  className?: string;
}

const Gallery1 = ({ className }: Gallery1Props) => {
  const [selection, setSelection] = useState(data[0].id);
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col gap-5 lg:aspect-1336/420 lg:flex-row">
          {data.map((item) => (
            <div
              key={item.id}
              data-state={selection === item.id ? "open" : "closed"}
              className='group max-lg:w-full max-lg:flex-1 max-md:h-[200px] md:max-lg:aspect-1336/420 lg:transform-gpu lg:transition-all lg:data-[state="closed"]:w-[20%] lg:data-[state="closed"]:duration-500 lg:data-[state="open"]:w-[60%] lg:data-[state="open"]:duration-400'
              onMouseEnter={() => {
                setSelection(item.id);
              }}
            >
              <a
                href={item.href}
                className="relative block h-full w-full overflow-hidden rounded-xl bg-primary text-primary-foreground dark:bg-card"
              >
                <div className='absolute -inset-[50%] hidden h-[200%] w-[200%] md:block lg:group-data-[state="closed"]:blur-sm'>
                  <div className="absolute top-[calc(25%+40px)] aspect-square h-[calc(50%+40px)] max-lg:right-[calc(50%+40px)] lg:right-[50%]">
                    <div className="h-full w-full overflow-clip rounded-xl">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  </div>
                  <div className="absolute inset-y-[25%] left-[50%] flex aspect-389/420 h-[50%] items-center justify-center max-lg:hidden">
                    <img
                      src={item.logo}
                      alt={item.company}
                      className="h-8 invert"
                    />
                  </div>
                  <div className="absolute top-[50%] left-[50%] flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent max-lg:hidden">
                    <Plus className="size-8 text-accent-foreground" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 hidden h-[50%] bg-linear-to-t from-primary from-50% to-transparent lg:block"></div>
                </div>
                <div className="relative flex flex-col justify-between gap-4 md:absolute md:inset-0 md:max-lg:inset-x-[50%] md:max-lg:w-[50%]">
                  <div className='flex h-[80px] items-center gap-2 p-4 transition-opacity delay-200 duration-500 lg:group-data-[state="closed"]:opacity-0'>
                    <Badge variant="secondary">Commercial</Badge>
                    <Badge variant="secondary">Multiloan</Badge>
                  </div>
                  <div className='flex flex-col gap-2 p-4 transition-all delay-200 delay-250 duration-500 lg:group-data-[state="closed"]:translate-y-4 lg:group-data-[state="closed"]:opacity-0'>
                    <div className="lg:hidden">
                      <img
                        src={item.logo}
                        alt={item.company}
                        className="h-5 invert lg:h-6"
                      />
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-base font-medium lg:text-lg">
                        {item.title}
                      </div>
                      <div className="flex size-8 items-center justify-center rounded-full bg-background text-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 lg:size-10">
                        <ArrowUpRight className="size-4 lg:size-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Gallery1 };

```

```tsx
"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
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

const data = [
  {
    id: "feature-1",
    title: "Smart AI Assistant",
    description:
      "Powered by advanced language models to handle complex queries, automate tasks, and provide intelligent responses with high accuracy.",
    label: "Core AI",
    href: "https://www.shadcnblocks.com",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
  },
  {
    id: "feature-2",
    title: "Data Analytics",
    description:
      "Transform raw data into actionable insights using machine learning algorithms and predictive analytics for informed decision-making.",
    label: "Analytics",
    href: "https://www.shadcnblocks.com",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
  },
  {
    id: "feature-3",
    title: "Process Automation",
    description:
      "Streamline workflows and automate repetitive tasks with intelligent process automation, increasing efficiency and reducing errors.",
    label: "Automation",
    href: "https://www.shadcnblocks.com",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
  },
  {
    id: "feature-4",
    title: "Knowledge Base",
    description:
      "Access and manage comprehensive information with our AI-powered knowledge base that learns and improves from each interaction.",
    label: "Learning",
    href: "https://www.shadcnblocks.com",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
  },
  {
    id: "feature-5",
    title: "API Integration",
    description:
      "Seamlessly integrate with existing systems through our robust API framework, enabling smooth data exchange and functionality extension.",
    label: "Integration",
    href: "https://www.shadcnblocks.com",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
  },
];

interface Gallery3Props {
  className?: string;
}

const Gallery3 = ({ className }: Gallery3Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mb-8 flex items-end justify-between md:mb-14 lg:mb-16">
          <h2 className="text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl">
            Case Studies
          </h2>
          <div className="shrink-0 gap-2 md:flex">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                carouselApi?.scrollPrev();
              }}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                carouselApi?.scrollNext();
              }}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
        >
          <CarouselContent className="mr-[20px] ml-[20px] 2xl:mr-[calc(50vw-700px+20px)] 2xl:ml-[calc(50vw-700px+20px)]">
            {data.map((item) => (
              <CarouselItem
                key={item.id}
                className="max-w-[320px] pl-[20px] lg:max-w-[360px]"
              >
                <a
                  href={item.href}
                  className="group flex flex-col justify-between rounded-xl bg-muted p-6"
                >
                  <div>
                    <div className="flex aspect-3/2 overflow-clip rounded-xl">
                      <div className="flex-1">
                        <div className="relative h-full w-full origin-bottom transition duration-300 group-hover:scale-105">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Badge>{item.label}</Badge>
                  </div>
                  <div className="mb-2 line-clamp-3 pt-4 text-lg font-medium break-words md:mb-3 md:pt-4 md:text-xl lg:pt-4 lg:text-2xl">
                    {item.title}
                  </div>
                  <div className="mb-8 line-clamp-2 text-sm text-muted-foreground md:mb-12 md:text-base lg:mb-9">
                    {item.description}
                  </div>
                  <div className="flex items-center text-sm">
                    Read more{" "}
                    <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export { Gallery3 };

```

```tsx
"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export interface Gallery4Item {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
}

export interface Gallery4Props {
  title?: string;
  description?: string;
  items: Gallery4Item[];
  className?: string;
}

const data = [
  {
    id: "shadcn-ui",
    title: "shadcn/ui: Building a Modern Component Library",
    description:
      "Explore how shadcn/ui revolutionized React component libraries by providing a unique approach to component distribution and customization, making it easier for developers to build beautiful, accessible applications.",
    href: "https://ui.shadcn.com",
    image:
      "https://images.unsplash.com/photo-1551250928-243dc937c49d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMjN8fHx8fHwyfHwxNzIzODA2OTM5fA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: "tailwind",
    title: "Tailwind CSS: The Utility-First Revolution",
    description:
      "Discover how Tailwind CSS transformed the way developers style their applications, offering a utility-first approach that speeds up development while maintaining complete design flexibility.",
    href: "https://tailwindcss.com",
    image:
      "https://images.unsplash.com/photo-1551250928-e4a05afaed1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMjR8fHx8fHwyfHwxNzIzODA2OTM5fA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: "astro",
    title: "Astro: The All-in-One Web Framework",
    description:
      "Learn how Astro's innovative 'Islands Architecture' and zero-JS-by-default approach is helping developers build faster websites while maintaining rich interactivity where needed.",
    href: "https://astro.build",
    image:
      "https://images.unsplash.com/photo-1536735561749-fc87494598cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxNzd8fHx8fHwyfHwxNzIzNjM0NDc0fA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: "react",
    title: "React: Pioneering Component-Based UI",
    description:
      "See how React continues to shape modern web development with its component-based architecture, enabling developers to build complex user interfaces with reusable, maintainable code.",
    href: "https://react.dev",
    image:
      "https://images.unsplash.com/photo-1548324215-9133768e4094?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMzF8fHx8fHwyfHwxNzIzNDM1MzA1fA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: "nextjs",
    title: "Next.js: The React Framework for Production",
    description:
      "Explore how Next.js has become the go-to framework for building full-stack React applications, offering features like server components, file-based routing, and automatic optimization.",
    href: "https://nextjs.org",
    image:
      "https://images.unsplash.com/photo-1550070881-a5d71eda5800?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMjV8fHx8fHwyfHwxNzIzNDM1Mjk4fA&ixlib=rb-4.0.3&q=80&w=1080",
  },
];

const Gallery4 = ({
  title = "Case Studies",
  description = "Discover how leading companies and developers are leveraging modern web technologies to build exceptional digital experiences. These case studies showcase real-world applications and success stories.",
  items = data,
  className,
}: Gallery4Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mb-8 flex items-end justify-between md:mb-14 lg:mb-16">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-medium md:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="max-w-lg text-muted-foreground">{description}</p>
          </div>
          <div className="hidden shrink-0 gap-2 md:flex">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                carouselApi?.scrollPrev();
              }}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                carouselApi?.scrollNext();
              }}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
        >
          <CarouselContent className="ml-0 2xl:mr-[max(0rem,calc(50vw-700px))] 2xl:ml-[max(8rem,calc(50vw-700px))]">
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="max-w-[320px] pl-[20px] lg:max-w-[360px]"
              >
                <a href={item.href} className="group rounded-xl">
                  <div className="group relative h-full min-h-[27rem] max-w-full overflow-hidden rounded-xl md:aspect-5/4 lg:aspect-16/9">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 h-full bg-[linear-gradient(transparent_20%,var(--primary)_100%)] mix-blend-multiply" />
                    <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6 text-primary-foreground md:p-8">
                      <div className="mb-2 pt-4 text-xl font-semibold md:mb-3 md:pt-4 lg:pt-4">
                        {item.title}
                      </div>
                      <div className="mb-8 line-clamp-2 md:mb-12 lg:mb-9">
                        {item.description}
                      </div>
                      <div className="flex items-center text-sm">
                        Read more{" "}
                        <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="mt-8 flex justify-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-colors ${
                currentSlide === index ? "bg-primary" : "bg-primary/20"
              }`}
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export { Gallery4 };

```

```tsx
"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface GalleryItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  image: string;
}

interface Gallery6Props {
  heading?: string;
  demoUrl?: string;
  items?: GalleryItem[];
  className?: string;
}

const Gallery6 = ({
  heading = "Gallery",
  demoUrl = "https://www.shadcnblocks.com",
  items = [
    {
      id: "item-1",
      title: "Build Modern UIs",
      summary:
        "Create stunning user interfaces with our comprehensive design system.",
      url: "#",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
    },
    {
      id: "item-2",
      title: "Computer Vision Technology",
      summary:
        "Powerful image recognition and processing capabilities that allow AI systems to analyze, understand, and interpret visual information from the world.",
      url: "#",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
    },
    {
      id: "item-3",
      title: "Machine Learning Automation",
      summary:
        "Self-improving algorithms that learn from data patterns to automate complex tasks and make intelligent decisions with minimal human intervention.",
      url: "#",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
    },
    {
      id: "item-4",
      title: "Predictive Analytics",
      summary:
        "Advanced forecasting capabilities that analyze historical data to predict future trends and outcomes, helping businesses make data-driven decisions.",
      url: "#",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
    },
    {
      id: "item-5",
      title: "Neural Network Architecture",
      summary:
        "Sophisticated AI models inspired by human brain structure, capable of solving complex problems through deep learning and pattern recognition.",
      url: "#",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
    },
  ],
  className,
}: Gallery6Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mb-8 flex flex-col justify-between md:mb-14 md:flex-row md:items-end lg:mb-16">
          <div>
            <h2 className="mb-3 text-3xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
              {heading}
            </h2>
            <a
              href={demoUrl}
              className="group flex items-center gap-1 text-sm font-medium md:text-base lg:text-lg"
            >
              Book a demo
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          <div className="mt-8 flex shrink-0 items-center justify-start gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollPrev();
              }}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollNext();
              }}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full max-w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
          className="relative w-full max-w-full md:left-[-1rem]"
        >
          <CarouselContent className="hide-scrollbar w-full max-w-full md:-mr-4 md:ml-8 2xl:mr-[max(0rem,calc(50vw-700px-1rem))] 2xl:ml-[max(8rem,calc(50vw-700px+1rem))]">
            {items.map((item) => (
              <CarouselItem key={item.id} className="ml-8 md:max-w-[452px]">
                <a
                  href={item.url}
                  className="group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex aspect-3/2 overflow-clip rounded-xl">
                      <div className="flex-1">
                        <div className="relative h-full w-full origin-bottom transition duration-300 group-hover:scale-105">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-2 line-clamp-3 pt-4 text-lg font-medium break-words md:mb-3 md:pt-4 md:text-xl lg:pt-4 lg:text-2xl">
                    {item.title}
                  </div>
                  <div className="mb-8 line-clamp-2 text-sm text-muted-foreground md:mb-12 md:text-base lg:mb-9">
                    {item.summary}
                  </div>
                  <div className="flex items-center text-sm">
                    Read more{" "}
                    <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export { Gallery6 };

```

```tsx
"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import { MoveRight } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const images = [
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-5.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-6.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-5.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-6.svg",
];

interface Gallery7Props {
  className?: string;
}

const Gallery7 = ({ className }: Gallery7Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mb-12 grid grid-cols-1 gap-x-12 gap-y-6 md:mb-16 md:grid-cols-2 md:gap-x-24">
          <div className="flex flex-col gap-8 md:gap-12">
            <h1 className="text-3xl font-bold md:text-4xl">
              Bringing your data to life with the power of AI
            </h1>
          </div>
          <p>
            We thrive on the power of AI. Our team is made up of some of the
            most talented people in the world, and we&apos;re looking for new
            ways to push the boundaries of what&apos;s possible. We&apos;re a
            team of data scientists.
          </p>
          <a href="#" className="font-medium hover:underline">
            Explore our solutions <MoveRight className="ml-2 inline size-5" />
          </a>
        </div>
      </div>
      <div className="w-full">
        <div className="max-w-[100vw] overflow-x-hidden">
          <Carousel
            opts={{
              loop: true,
            }}
            plugins={[
              AutoScroll({
                speed: 0.9,
              }),
            ]}
            className="pointer-events-none"
          >
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index} className="basis-auto">
                  <div className="max-h-80 max-w-60">
                    <img
                      src={image}
                      alt="placeholder"
                      className={cn(
                        "mt-7 h-full w-full rounded-md object-cover",
                        index % 2 === 0 && "mt-16",
                      )}
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

export { Gallery7 };

```

```tsx
import { MoveRight } from "lucide-react";
import { Fragment } from "react";

import { cn } from "@/lib/utils";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";

const resources = [
  {
    title: "Getting Started with Templates",
    category: "guide",
    link: "#",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
  },
  {
    title: "Template Pricing & Plans",
    category: "pricing",
    link: "#",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
  },
  {
    title: "Introducing Our New Template Builder",
    category: "news",
    link: "#",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
  },
  {
    title: "Modern Design Patterns: Creating Responsive Templates for 2025",
    category: "tutorial",
    link: "#",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
  },
  {
    title: "The Ultimate Guide to Template Customization",
    category: "ebook",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-5.svg",
  },
  {
    title: "Template Success Stories: Year in Review",
    category: "blog",
    link: "#",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-6.svg",
  },
];

interface Gallery8Props {
  className?: string;
}

const Gallery8 = ({ className }: Gallery8Props) => {
  return (
    <section className={cn("overflow-hidden py-32", className)}>
      <div className="container">
        <h2 className="text-2xl font-bold text-pretty">
          Start building with our template collection
        </h2>
        <Carousel>
          <div className="mt-6 grid gap-x-14 gap-y-10 lg:mt-16 lg:grid-cols-3">
            <div className="order-3 flex flex-col gap-6 lg:order-none">
              {resources.slice(0, 3).map((resource, idx) => (
                <Fragment key={idx}>
                  <div className="flex flex-col gap-1">
                    <div className="font-mono text-sm text-muted-foreground uppercase">
                      {resource.category}
                    </div>
                    <a
                      href={resource.link}
                      className="group flex items-center gap-2 font-semibold"
                    >
                      {resource.title}
                      <MoveRight className="mt-0.5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </div>
                  <Separator />
                </Fragment>
              ))}
              <a
                href="#"
                className="group flex items-center gap-2 font-semibold"
              >
                View all resources
                <MoveRight className="mt-0.5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
            <div className="order-1 lg:order-none lg:col-span-2 [&>div[data-slot=carousel-content]]:overflow-visible [&>div[data-slot=carousel-content]]:[clip-path:inset(-100vw_-100vw_-100vw_0)]">
              <CarouselContent className="ml-0 max-w-[min(calc(100vw-4rem),24rem)] select-none sm:max-w-96">
                {resources.map((item, idx) => (
                  <CarouselItem
                    className={cn(
                      "w-fit border-y border-l border-border pl-0 transition-colors duration-300 hover:bg-muted/50",
                      idx === resources.length - 1 && "border-r",
                    )}
                    key={idx}
                  >
                    <a href={item.link} className="block h-full">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="aspect-video object-cover"
                      />
                      <div className="px-6 py-8">
                        <div className="text-sm text-muted-foreground uppercase">
                          {item.category}
                        </div>
                        <h3 className="mt-2 text-xl font-semibold lg:text-2xl">
                          {item.title}
                        </h3>
                      </div>
                    </a>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </div>
            <div className="order-2 flex items-center gap-4 lg:order-none lg:col-start-2">
              <CarouselPrevious className="static size-12 translate-x-0 translate-y-0" />
              <CarouselNext className="static size-12 translate-x-0 translate-y-0" />
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export { Gallery8 };

```

```tsx
"use client";

import { Code, GitBranch, Sparkle } from "lucide-react";
import { startTransition, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const sections = [
  {
    img: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
    title: "Design",
    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, autem.",
    logo: <Code className="h-5 w-5" />,
  },
  {
    img: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
    title: "Develop",
    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, autem.",
    logo: <GitBranch className="h-5 w-5" />,
  },
  {
    img: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
    title: "Ship",
    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, autem.",
    logo: <Sparkle className="h-5 w-5" />,
  },
];

interface Gallery9Props {
  className?: string;
}

const Gallery9 = ({ className }: Gallery9Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const updateCurrent = () => {
      startTransition(() => {
        setCurrent(api.selectedScrollSnap() + 1);
      });
    };

    startTransition(() => {
      setCurrent(api.selectedScrollSnap() + 1);
    });

    api.on("select", updateCurrent);

    return () => {
      api.off("select", updateCurrent);
    };
  }, [api]);

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mb-20 flex flex-col items-center justify-center gap-8">
          <h1 className="text-4xl">
            Cut the time it takes to close your books
          </h1>

          <Badge
            variant="secondary"
            className="px-5 py-2 text-base font-normal"
          >
            Lorem ipsum dolor sit amet consectetur.
          </Badge>
        </div>
        <Carousel setApi={setApi} className="flex flex-col gap-10">
          <CarouselContent>
            {sections.map((item, index) => (
              <CarouselItem className="h-full w-full" key={index}>
                <img
                  src={item.img}
                  alt="logo"
                  className="aspect-square h-full w-full object-cover md:aspect-[2]"
                />
                <div className="mt-8 flex cursor-pointer flex-col gap-2 md:hidden">
                  <div>{item.logo}</div>
                  <div className="text-lg font-medium">{item.title}</div>
                  <div className="text-lg text-muted-foreground">
                    {item.text}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mb-8 hidden justify-between gap-8 md:flex">
            {sections.map((section, index) => (
              <div
                key={index}
                onClick={() => api?.scrollTo(index)}
                className="flex cursor-pointer flex-col gap-2"
              >
                <div>{section.logo}</div>
                <div className="text-lg font-medium">{section.title}</div>
                <div
                  className={cn(
                    "text-lg hover:text-muted-foreground",
                    index + 1 === current
                      ? "text-muted-foreground"
                      : "text-muted-foreground/50",
                  )}
                >
                  {section.text}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-8">
            <div>
              {current} / {sections.length}
            </div>
            <div className="flex items-center justify-start gap-2">
              <CarouselPrevious
                className="static translate-y-0"
                disabled={false}
              />
              <CarouselNext className="static translate-y-0" disabled={false} />
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export { Gallery9 };

```

```tsx
"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
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

interface DataItem {
  id: string;
  username: string;
  quote: string;
  author: string;
  image: string;
  bgColor: string;
}

const DATA: DataItem[] = [
  {
    id: "item-1",
    username: "@techinnovator",
    quote:
      "Their team transformed our vision into a seamless, user-friendly app. The attention to detail and commitment to quality is unmatched!",
    author: "Sarah",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
    bgColor: "bg-green-300",
  },
  {
    id: "item-2",
    username: "@startupfounder",
    quote:
      "From ideation to deployment, they delivered a robust solution that scaled with our business. Truly a partner in our growth journey.",
    author: "James",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-5.svg",
    bgColor: "bg-orange-300",
  },
  {
    id: "item-3",
    username: "@enterpriseleader",
    quote:
      "Their expertise in cloud solutions helped us optimize our operations and reduce costs significantly. Highly recommend their services!",
    author: "Emily",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
    bgColor: "bg-purple-300",
  },
  {
    id: "item-4",
    username: "@productmanager",
    quote:
      "The team's ability to understand complex requirements and deliver on time is exceptional. They made the development process stress-free.",
    author: "Michael",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
    bgColor: "bg-green-300",
  },
  {
    id: "item-5",
    username: "@cto",
    quote:
      "Their innovative approach to software development has been a game-changer for our organization. We couldn't be happier with the results!",
    author: "Laura",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
    bgColor: "bg-orange-300",
  },
];

interface Gallery10Props {
  className?: string;
}

const Gallery10 = ({ className }: Gallery10Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentIndex(carouselApi.selectedScrollSnap());
    };

    updateSelection();
    carouselApi.on("select", updateSelection);

    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  // Calculate the progress bar width and position
  const progressWidth = 240;
  const progressIndicatorWidth = progressWidth / DATA.length;
  const progressOffset = currentIndex * progressIndicatorWidth;

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-6 px-4 lg:flex-row lg:px-10">
          {/* Left Side: Text Content and Navigation Buttons */}
          <div className="flex flex-col justify-between lg:h-[460px] lg:w-[445px] lg:pr-10">
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-semibold lg:text-4xl">
                Building the Future, One Line of Code at a Time
              </h2>
              <p className="text-lg text-muted-foreground">
                From startups to enterprises, we empower businesses with
                cutting-edge software solutions. Hear from our satisfied
                clients.
              </p>
            </div>

            {/* Navigation Buttons Aligned to Bottom */}
            <div className="hidden justify-start gap-4 lg:flex">
              <Button
                size="icon"
                className="rounded-full"
                variant="outline"
                onClick={() => carouselApi?.scrollPrev()}
                disabled={!canScrollPrev}
              >
                <ArrowLeft className="size-4" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="rounded-full"
                onClick={() => carouselApi?.scrollNext()}
                disabled={!canScrollNext}
              >
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>

          {/* Right Side: Carousel */}
          <div className="relative w-full overflow-hidden pb-12 lg:flex-1">
            <Carousel
              setApi={setCarouselApi}
              opts={{
                align: "start",
                dragFree: true,
              }}
            >
              <CarouselContent>
                {DATA.map((testimonial) => (
                  <CarouselItem
                    key={testimonial.id}
                    className="min-w-[800px] flex-1"
                  >
                    <div className="flex gap-2">
                      <div className="h-[460px] w-[400px]">
                        <img
                          src={testimonial.image}
                          alt={testimonial.username}
                          className="aspect-[1] h-full w-full rounded-2xl object-cover"
                        />
                      </div>

                      {/* Quote Section */}
                      <div
                        className={`relative flex h-[460px] w-[400px] flex-col items-start justify-end rounded-2xl p-8 ${testimonial.bgColor}`}
                      >
                        <Badge className="mb-auto bg-background px-4 py-2 text-black">
                          {testimonial.username}
                        </Badge>
                        <span className="-rotate-[4deg] text-7xl leading-none">
                          “
                        </span>
                        <p className="text-xl font-semibold">
                          {testimonial.quote}
                        </p>
                        <p className="mt-4 text-lg font-medium">
                          {testimonial.author}
                        </p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {/* Progress Indicator */}
            <div className="absolute bottom-4 left-1/2 h-[2px] w-[240px] -translate-x-1/2 rounded bg-gray-200">
              <div
                className="h-[2px] rounded bg-primary transition-transform duration-300 ease-out"
                style={{
                  width: `${progressIndicatorWidth}px`,
                  transform: `translateX(${progressOffset}px)`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Gallery10 };

```

```tsx
"use client";

import { Palette, Sparkles, Star } from "lucide-react";
import { startTransition, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface DataItem {
  src: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const DATA: DataItem[] = [
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
    title: "Elegant Design",
    description:
      "Discover our beautifully crafted designs that blend style and functionality.",
    icon: Palette,
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
    title: "Premium Quality",
    description:
      "Experience the finest materials and craftsmanship in every piece.",
    icon: Star,
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
    title: "Modern Aesthetics",
    description:
      "Stay ahead of the curve with our contemporary and trendy collections.",
    icon: Sparkles,
  },
];

interface Gallery13Props {
  className?: string;
}

const Gallery13 = ({ className }: Gallery13Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    startTransition(() => {
      setActiveIndex(api.selectedScrollSnap());
    });
    api.on("select", () => {
      startTransition(() => {
        setActiveIndex(api.selectedScrollSnap());
      });
    });
  }, [api]);

  const ActiveIcon = DATA[activeIndex].icon;

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <Carousel setApi={setApi} className="w-full">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
            {/* Left Side */}
            <div className="md:col-span-2">
              <div className="flex h-full flex-col gap-8 rounded-lg bg-muted px-8 py-16">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-background shadow-lg ring-1 ring-gray-200">
                  <ActiveIcon className="h-6 w-6" />
                </div>
                <div className="flex flex-col gap-4">
                  <h2 className="text-3xl font-medium">
                    {DATA[activeIndex].title}
                  </h2>
                  <p className="mb-4 text-base text-muted-foreground">
                    {DATA[activeIndex].description}
                  </p>
                  <div className="flex items-center gap-4">
                    <CarouselPrevious className="relative top-0 right-0 left-0 translate-x-0 translate-y-0 p-5 transition-all duration-200 hover:bg-black hover:text-white" />
                    <CarouselNext className="relative top-0 right-0 left-0 translate-x-0 translate-y-0 p-5 transition-all duration-200 hover:bg-black hover:text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="h-full md:col-span-3">
              <CarouselContent>
                {DATA.map((image, index) => (
                  <CarouselItem key={index} className="h-full">
                    <div className="aspect-2/1 h-full w-full">
                      <img
                        src={image.src}
                        alt={image.title}
                        className="h-full w-full rounded-lg object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export { Gallery13 };

```

```tsx
"use client";

import { startTransition, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const carouselItems = [
  {
    image:
      "https://images.unsplash.com/photo-1589100787575-fad1dcaa9d17?q=80&w=1953&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Responsive",
    description:
      "Our templates are built with a mobile-first approach, ensuring your website looks stunning on all devices and screen sizes.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1698516923130-8845104b6224?q=80&w=2022&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Clean Code",
    description:
      "Each template is crafted with clean, well-structured code following best practices to make customization and maintenance simple.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1647517649508-855580038bfd?q=80&w=2022&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Copy & Paste",
    description:
      "Our templates are designed for easy copy and paste functionality, allowing you to quickly implement components and features into your projects.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1586869871566-d8e41dd50318?q=80&w=1970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Easy Updates",
    description:
      "Regular updates and maintenance ensure your template stays current with the latest web standards and security practices.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1588065394015-68bf7e40738d?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Modern Stack",
    description:
      "Built with the latest technologies including React, Tailwind CSS and shadcn/ui for a modern development experience.",
  },
];

interface Gallery14Props {
  className?: string;
}

const Gallery14 = ({ className }: Gallery14Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    startTransition(() => {
      setCurrent(api.selectedScrollSnap() + 1);
    });

    api.on("select", () => {
      startTransition(() => {
        setCurrent(api.selectedScrollSnap() + 1);
      });
    });
  }, [api]);

  return (
    <section className={cn("overflow-hidden py-32", className)}>
      <div className="container">
        <Carousel setApi={setApi}>
          <div className="grid gap-8 md:gap-4 lg:grid-cols-2 [&>div[data-slot=carousel-content]]:overflow-visible [&>div[data-slot=carousel-content]]:[clip-path:inset(-100vw_-100vw_-100vw_0)]">
            <div>
              <h2 className="text-4xl font-semibold md:text-6xl">
                Code less. <br />{" "}
                <span className="text-primary/40">Build faster.</span>
              </h2>
              <p className="mt-8 text-xl text-primary">
                Start with our templates, customize to your needs.
              </p>
              <div className="mt-8 hidden items-center gap-4 md:flex">
                <CarouselPrevious className="static size-12 translate-x-0 translate-y-0" />
                <CarouselNext className="static size-12 translate-x-0 translate-y-0" />
              </div>
            </div>

            <CarouselContent className="max-w-[400px] select-none">
              {carouselItems.map((item, idx) => (
                <CarouselItem className="w-fit" key={idx}>
                  <div className="relative aspect-4/5 max-h-[500px] rounded-2xl">
                    <div className="absolute inset-0 rounded-2xl bg-linear-to-b from-primary to-transparent to-40% dark:from-background" />
                    <img
                      src={item.image}
                      alt={item.title}
                      className="size-full rounded-2xl bg-cover"
                    />
                    <div className="absolute inset-0 p-8">
                      <p className="text-sm font-semibold text-background/50 dark:text-foreground/50">
                        <span className="mr-1 text-background dark:text-foreground">
                          {item.title}.
                        </span>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </div>
        </Carousel>
        <div className="mt-8 flex items-center lg:ml-[50%]">
          {Array.from({ length: carouselItems.length }).map((_, index) => (
            <span
              key={index}
              className={cn(
                "flex h-8 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-muted-foreground/15 text-xs font-semibold whitespace-nowrap transition-all duration-300",
                index + 1 === current ? "w-32" : "m-4 size-4",
              )}
              onClick={() => api && api.scrollTo(index)}
            >
              <span
                className={cn(
                  "inline-block transition-all duration-300",
                  index + 1 === current
                    ? "translate-x-0 opacity-100"
                    : "translate-x-6 opacity-0",
                )}
              >
                {carouselItems[index].title}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Gallery14 };

```

```tsx
"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
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

interface DatItem {
  id: string;
  title: string;
  price: string;
  image: string;
  hoverImage: string;
  tag: string;
}

const DATA: DatItem[] = [
  {
    id: "1",
    title: "Custom Web Development",
    price: "$1,500",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
    hoverImage: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-5oYbG-sEImY-unsplash.jpg",
    tag: "Tailored Solutions",
  },
  {
    id: "2",
    title: "Mobile App Development",
    price: "$2,000",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
    hoverImage: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-duxeKbu9FDE-unsplash.jpg",
    tag: "iOS & Android",
  },
  {
    id: "3",
    title: "Cloud Solutions",
    price: "$3,000",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
    hoverImage: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-majMgWtrF48-unsplash.jpg",
    tag: "Scalable Infrastructure",
  },
  {
    id: "4",
    title: "UI/UX Design",
    price: "$1,200",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-6.svg",
    hoverImage: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-xYFl3Q9am1E-unsplash.jpg",
    tag: "User-Centric Design",
  },
  {
    id: "5",
    title: "E-Commerce Platforms",
    price: "$2,500",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
    hoverImage: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-9__Q24sJqKg-unsplash.jpg",
    tag: "Seamless Shopping",
  },
  {
    id: "6",
    title: "AI & Machine Learning",
    price: "$5,000",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
    hoverImage: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-5oYbG-sEImY-unsplash.jpg",
    tag: "Smart Automation",
  },
  {
    id: "7",
    title: "DevOps Services",
    price: "$2,800",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
    hoverImage: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-duxeKbu9FDE-unsplash.jpg",
    tag: "Efficient Workflows",
  },
  {
    id: "8",
    title: "Cybersecurity Solutions",
    price: "$4,000",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-6.svg",
    hoverImage: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-majMgWtrF48-unsplash.jpg",
    tag: "Secure Systems",
  },
];

interface Gallery15Props {
  className?: string;
}

const Gallery15 = ({ className }: Gallery15Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentIndex(carouselApi.selectedScrollSnap());
    };

    updateSelection();
    carouselApi.on("select", updateSelection);

    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  // Calculate the progress bar width and position
  const progressWidth = 240;
  const progressIndicatorWidth = progressWidth / DATA.length;
  const progressOffset = currentIndex * progressIndicatorWidth;

  return (
    <section className={cn("py-32", className)}>
      <div className="px-4 lg:px-10">
        <div className="mb-6 flex flex-col justify-between md:flex-row md:items-end">
          <div>
            <h2 className="text-3xl font-semibold md:text-4xl">Our Services</h2>
          </div>
          <div className="mt-8 flex shrink-0 items-center justify-start gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="rounded-full"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              className="rounded-full"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            align: "start",
          }}
        >
          <CarouselContent className="px-4 pb-10 lg:px-10">
            {DATA.map((product) => (
              <CarouselItem key={product.id} className="min-w-[334px] flex-1">
                <a
                  href={`/services/${product.id}`}
                  className="group relative flex h-full flex-col items-start justify-start gap-2"
                >
                  <div className="w-full">
                    <div className="group relative z-10 overflow-hidden rounded-2xl">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                        style={{ aspectRatio: "3/4" }}
                      />
                      <img
                        src={product.hoverImage}
                        alt={product.title}
                        className="absolute top-0 left-0 z-10 h-full w-full rounded-2xl object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{ aspectRatio: "3/4" }}
                      />

                      <Badge
                        className="absolute top-4 left-4 bg-background px-4 py-2"
                        variant="outline"
                      >
                        {product.tag}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3>{product.title}</h3>
                    <span>
                      Starting at <span>{product.price}</span>
                    </span>
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Progress Indicator */}
        <div className="absolute bottom-0 left-1/2 h-[2px] w-[240px] -translate-x-1/2 rounded bg-gray-200">
          <div
            className="h-[2px] rounded bg-black transition-transform duration-300 ease-out"
            style={{
              width: `${progressIndicatorWidth}px`,
              transform: `translateX(${progressOffset}px)`,
            }}
          />
        </div>
      </div>
    </section>
  );
};

export { Gallery15 };

```

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const items = [
  {
    title: (
      <>
        <span className="bg-gradient-to-b from-foreground/20 to-muted-foreground bg-clip-text text-transparent">
          Explore Our
        </span>
        <br />
        Core Features
      </>
    ),
    description: (
      <>
        Dive deep into the robust functionalities designed to streamline your
        workflow. Benefit from intuitive design, seamless integration, and
        powerful customization options.
        <br />
        <br />
        Explore how our platform adapts to your evolving needs, ensuring
        long-term value and efficiency.
      </>
    ),
    note: "Comprehensive documentation and dedicated support channels are available to assist you.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
    category: "Features",
  },
  {
    title: (
      <>
        <span className="bg-gradient-to-b from-foreground/20 to-muted-foreground bg-clip-text text-transparent">
          Solutions for
        </span>
        <br />
        Every Scenario
      </>
    ),
    description: (
      <>
        <p>
          Discover how our platform addresses diverse challenges across various
          domains:
        </p>
        <ul className="my-4 ml-6 list-disc">
          <li>Enhancing team collaboration efficiency.</li>
          <li>Optimizing critical resource allocation.</li>
          <li>Streamlining complex data analysis.</li>
        </ul>
        <p>We provide adaptable tools for your unique context.</p>
      </>
    ),
    note: "Leverage our expertise in integration and custom development for specific needs.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
    category: "Solutions",
  },
  {
    title: (
      <>
        <span className="bg-gradient-to-b from-foreground/20 to-muted-foreground bg-clip-text text-transparent">
          Building the
        </span>
        <br />
        Future Together
      </>
    ),
    description: (
      <>
        <p>
          Get a glimpse into our ongoing commitment to innovation and
          improvement:
        </p>
        <ul className="my-4 ml-6 list-disc">
          <li>Next-generation user interface design.</li>
          <li>Advanced analytics capabilities rollout.</li>
          <li>Expanded third-party integration ecosystem.</li>
        </ul>
        <p>
          We're constantly evolving based on user feedback and industry trends.
        </p>
      </>
    ),
    note: "Our dedicated R&D team is focused on delivering cutting-edge solutions.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
    category: "Roadmap",
  },
];

interface Gallery16Props {
  className?: string;
}

const Gallery16 = ({ className }: Gallery16Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(items[0].category);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({
    width: 0,
    left: 0,
  });

  useEffect(() => {
    const currentIndex = items.findIndex((item) => item.category === current);
    const activeTab = tabRefs.current[currentIndex];

    if (activeTab) {
      const { offsetWidth, offsetLeft } = activeTab;
      setIndicatorStyle({
        width: offsetWidth,
        left: offsetLeft,
      });
    }
  }, [current]);

  useEffect(() => {
    if (!api) {
      return;
    }

    const currentIndex = items.findIndex((item) => item.category === current);
    api.scrollTo(currentIndex);

    const onSelect = () => {
      const idx = api.selectedScrollSnap();
      setCurrent(items[idx].category);
    };
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api, current]);

  return (
    <section className={cn("overflow-hidden py-32", className)}>
      <div className="container">
        <Carousel
          setApi={setApi}
          className="[&>div[data-slot=carousel-content]]:overflow-visible"
        >
          <div className="flex items-center justify-between">
            <Tabs
              value={current}
              onValueChange={setCurrent}
              className="mb-8 flex justify-center"
            >
              <TabsList className="relative h-auto gap-6 bg-background">
                {items.map((item, idx) => (
                  <TabsTrigger
                    key={idx}
                    ref={(el) => {
                      tabRefs.current[idx] = el;
                    }}
                    value={item.category}
                    className="text-base transition-all duration-700 ease-out [&[data-state=active]]:shadow-none"
                  >
                    {item.category}
                  </TabsTrigger>
                ))}
                <div
                  className="absolute bottom-0 h-0.5 bg-primary transition-all duration-700 ease-out"
                  style={{
                    width: `${indicatorStyle.width}px`,
                    left: `${indicatorStyle.left}px`,
                  }}
                />
              </TabsList>
            </Tabs>
            <div className="hidden items-center gap-4 sm:flex">
              <CarouselPrevious className="static size-10 translate-0" />
              <CarouselNext className="static size-10 translate-0" />
            </div>
          </div>
          <CarouselContent className="max-w-4xl">
            {items.map((item, idx) => (
              <CarouselItem key={idx} className="w-fit max-w-4xl">
                <div className="grid h-full max-w-4xl gap-10 rounded-xl border border-border p-6 shadow-sm select-none sm:p-10 md:max-h-[450px] md:grid-cols-2 lg:gap-20">
                  <div className="flex flex-col justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-medium sm:text-4xl">
                        {item.title}
                      </h2>
                      <div className="mt-4 text-sm text-muted-foreground sm:mt-6">
                        {item.description}
                      </div>
                    </div>
                    <p className="mt-4 text-xs text-muted-foreground sm:mt-6">
                      {item.note}
                    </p>
                  </div>
                  <div className="rounded-xl border border-border p-2">
                    <img
                      src={item.image}
                      alt="placeholder"
                      className="h-full w-full rounded-xl object-cover"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export { Gallery16 };

```

```tsx
"use client";

import { startTransition, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";

const IMAGES = [
  { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg", alt: "" },
  { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-2.svg", alt: "" },
  { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-3.svg", alt: "" },
  { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-4.svg", alt: "" },
  { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-5.svg", alt: "" },
  { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg", alt: "" },
  { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-2.svg", alt: "" },
  { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-3.svg", alt: "" },
  { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-4.svg", alt: "" },
  { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-5.svg", alt: "" },
];

interface Gallery17Props {
  className?: string;
}

const Gallery17 = ({ className }: Gallery17Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    startTransition(() => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + 1);
    });

    api.on("select", () => {
      startTransition(() => {
        setCurrent(api.selectedScrollSnap() + 1);
      });
    });
  }, [api]);

  return (
    <section className={cn("overflow-hidden py-32", className)}>
      <div className="container md:px-45">
        <Carousel
          className="mx-auto w-full max-w-[50rem] [&>div:nth-child(1)]:md:overflow-visible"
          setApi={setApi}
          opts={{
            startIndex: 1,
          }}
        >
          <CarouselContent>
            {IMAGES.map((img, index) => (
              <CarouselItem key={`carousel-img-${index}`}>
                <div
                  className={`aspect-[1.333333333] max-w-[50rem] overflow-hidden rounded-[0.75rem] transition-all duration-300 ${
                    current === index + 1
                      ? "scale-100 opacity-100"
                      : "scale-70 opacity-40"
                  }`}
                >
                  <img
                    className="block size-full object-cover object-center"
                    src={img.src}
                    alt={img.alt}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-4 hidden md:block">
            <CarouselPrevious
              className="size-10 max-[767px]:static max-[767px]:translate-y-0 md:left-[-6.25rem] md:size-14 lg:left-[-9.9375rem] lg:size-14 [&>svg]:!size-6"
              variant="default"
            />
            <CarouselNext
              className="size-10 max-[767px]:static max-[767px]:translate-y-0 md:right-[-6.25rem] md:size-14 lg:right-[-9.9375rem] lg:size-14 [&>svg]:!size-6"
              variant="default"
            />
          </div>
        </Carousel>
        <div className="mx-auto mt-10 flex w-full max-w-[33.9375rem] items-center justify-center">
          {Array.from({ length: count }).map((_, index) => (
            <button
              aria-label={`Go to slide ${index + 1}`}
              key={`carousel-dot-btn-${index}`}
              className="p-2"
              onClick={() => {
                api?.scrollTo(index);
              }}
            >
              <div
                className={`size-3 rounded-full ${current === index + 1 ? "bg-black" : "bg-black/10"}`}
              ></div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Gallery17 };

```

```tsx
"use client";

import { motion } from "framer-motion";
import React from "react";

import { cn } from "@/lib/utils";

interface Gallery25Props {
  className?: string;
}

const Gallery25 = ({ className }: Gallery25Props) => {
  const column1Images = [
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw1.jpeg",
      alt: "Gallery Image 1",
      height: "23rem",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw2.jpeg",
      alt: "Gallery Image 2",
      height: "28rem",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw3.jpeg",
      alt: "Gallery Image 3",
      height: "12rem",
    },
  ];

  const column2Images = [
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw4.jpeg",
      alt: "Gallery Image 4",
      height: "13rem",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw5.jpeg",
      alt: "Gallery Image 5",
      height: "32rem",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw6.jpeg",
      alt: "Gallery Image 6",
      height: "18rem",
    },
  ];

  const column3Images = [
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw7.jpeg",
      alt: "Gallery Image 7",
      height: "32rem",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw8.jpeg",
      alt: "Gallery Image 8",
      height: "32rem",
    },
  ];

  const column4Images = [
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw9.jpeg",
      alt: "Gallery Image 9",
      height: "13rem",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw10.jpeg",
      alt: "Gallery Image 10",
      height: "22.5rem",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw11.jpeg",
      alt: "Gallery Image 11",
      height: "22rem",
    },
  ];

  return (
    <section className={cn("py-32", className)}>
      <div className="relative container">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {/* Column 1 */}
          <div className="grid gap-4">
            {column1Images.map((image, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  y: 50,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                key={index}
                className="w-full overflow-hidden rounded-2xl bg-muted"
                style={{ height: image.height }}
              >
                <img
                  className="h-full w-full rounded-2xl object-cover"
                  src={image.src}
                  alt={image.alt}
                />
              </motion.div>
            ))}
          </div>

          {/* Column 2 */}
          <div className="grid gap-4">
            {column2Images.map((image, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  y: -50,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                key={index}
                className="w-full overflow-hidden rounded-2xl bg-muted"
                style={{ height: image.height }}
              >
                <img
                  className="h-full w-full rounded-2xl object-cover"
                  src={image.src}
                  alt={image.alt}
                />
              </motion.div>
            ))}
          </div>

          {/* Column 3 */}
          <div className="grid gap-4">
            {column3Images.map((image, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  y: 50,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                key={index}
                className="w-full overflow-hidden rounded-2xl bg-muted"
                style={{ height: image.height }}
              >
                <img
                  className="h-full w-full rounded-2xl object-cover"
                  src={image.src}
                  alt={image.alt}
                />
              </motion.div>
            ))}
          </div>

          {/* Column 4 */}
          <div className="grid gap-4">
            {column4Images.map((image, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  y: -50,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                key={index}
                className="w-full overflow-hidden rounded-2xl bg-muted"
                style={{ height: image.height }}
              >
                <img
                  className="h-full w-full rounded-2xl object-cover"
                  src={image.src}
                  alt={image.alt}
                />
              </motion.div>
            ))}
            <div className="h-17 w-full rounded-2xl bg-muted"></div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          {/* Column 1 */}
          <div className="grid gap-4">
            {column1Images.map((image, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  y: 50,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                key={index}
                className="w-full overflow-hidden rounded-2xl bg-muted"
                style={{ height: image.height }}
              >
                <img
                  className="h-full w-full rounded-2xl object-cover"
                  src={image.src}
                  alt={image.alt}
                />
              </motion.div>
            ))}
          </div>

          {/* Column 2 */}
          <div className="grid gap-4">
            {column2Images.map((image, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  y: -50,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                key={index}
                className="w-full overflow-hidden rounded-2xl bg-muted"
                style={{ height: image.height }}
              >
                <img
                  className="h-full w-full rounded-2xl object-cover"
                  src={image.src}
                  alt={image.alt}
                />
              </motion.div>
            ))}
          </div>

          {/* Column 3 */}
          <div className="grid gap-4">
            {column3Images.map((image, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  y: 50,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                key={index}
                className="w-full overflow-hidden rounded-2xl bg-muted"
                style={{ height: image.height }}
              >
                <img
                  className="h-full w-full rounded-2xl object-cover"
                  src={image.src}
                  alt={image.alt}
                />
              </motion.div>
            ))}
          </div>

          {/* Column 4 */}
          <div className="grid gap-4">
            {column4Images.map((image, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  y: -50,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                key={index}
                className="w-full overflow-hidden rounded-2xl bg-muted"
                style={{ height: image.height }}
              >
                <img
                  className="h-full w-full rounded-2xl object-cover"
                  src={image.src}
                  alt={image.alt}
                />
              </motion.div>
            ))}
            <div className="h-17 w-full rounded-2xl bg-muted"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Gallery25 };

```

```tsx
"use client";

import { motion } from "framer-motion";
import React from "react";

import { cn } from "@/lib/utils";

interface Gallery26Props {
  className?: string;
}

const Gallery26 = ({ className }: Gallery26Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="relative container">
        <div className="grid grid-cols-5 gap-4">
          <BlurVignette
            radius="24px"
            inset="10px"
            transitionLength="100px"
            blur="15px"
            className="col-span-2 h-82 rounded-[2.5rem]"
          >
            <img
              width={200}
              height={200}
              className="size-full rounded-[2.5rem] object-cover"
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw13.jpeg"
              alt=""
            />
          </BlurVignette>
          <BlurVignette
            radius="24px"
            inset="10px"
            transitionLength="100px"
            blur="15px"
            className="col-span-3 h-82 rounded-[2.5rem]"
          >
            <img
              width={200}
              height={200}
              className="size-full rounded-[2.5rem] object-cover"
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw8.jpeg"
              alt=""
            />
          </BlurVignette>
          <BlurVignette
            radius="24px"
            inset="10px"
            transitionLength="100px"
            blur="15px"
            className="col-span-5 h-100 rounded-[2.5rem]"
          >
            <img
              width={200}
              height={200}
              className="size-full rounded-[2.5rem] object-cover"
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw12.jpeg"
              alt=""
            />
          </BlurVignette>
          <BlurVignette
            radius="24px"
            inset="10px"
            transitionLength="100px"
            blur="15px"
            className="col-span-2 h-82 rounded-[2.5rem]"
          >
            <img
              width={200}
              height={200}
              className="size-full rounded-[2.5rem] object-cover"
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw9.jpeg"
              alt=""
            />
          </BlurVignette>
          <BlurVignette
            radius="24px"
            inset="10px"
            transitionLength="100px"
            blur="15px"
            className="col-span-3 h-82 rounded-[2.5rem]"
          >
            <img
              width={200}
              height={200}
              className="size-full rounded-[2.5rem] object-cover"
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw13.jpeg"
              alt=""
            />
          </BlurVignette>

          <BlurVignette
            radius="24px"
            inset="10px"
            transitionLength="100px"
            blur="15px"
            className="col-span-3 h-82 rounded-[2.5rem]"
          >
            <img
              width={200}
              height={200}
              className="size-full rounded-[2.5rem] object-cover"
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw8.jpeg"
              alt=""
            />
          </BlurVignette>
          <BlurVignette
            radius="24px"
            inset="10px"
            transitionLength="100px"
            blur="15px"
            className="col-span-2 h-82 rounded-[2.5rem]"
          >
            <img
              width={200}
              height={200}
              className="size-full rounded-[2.5rem] object-cover"
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw13.jpeg"
              alt=""
            />
          </BlurVignette>
          <BlurVignette
            radius="24px"
            inset="10px"
            transitionLength="100px"
            blur="15px"
            className="col-span-5 h-100 rounded-[2.5rem]"
          >
            <img
              width={200}
              height={200}
              className="size-full rounded-[2.5rem] object-cover"
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw12.jpeg"
              alt=""
            />
          </BlurVignette>
          <BlurVignette
            radius="24px"
            inset="10px"
            transitionLength="100px"
            blur="15px"
            className="col-span-2 h-82 rounded-[2.5rem]"
          >
            <img
              width={200}
              height={200}
              className="size-full rounded-[2.5rem] object-cover"
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw9.jpeg"
              alt=""
            />
          </BlurVignette>
          <BlurVignette
            radius="24px"
            inset="10px"
            transitionLength="100px"
            blur="15px"
            className="col-span-3 h-82 rounded-[2.5rem]"
          >
            <img
              width={200}
              height={200}
              className="size-full rounded-[2.5rem] object-cover transition-all ease-in-out"
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw13.jpeg"
              alt=""
            />
          </BlurVignette>
        </div>
      </div>
    </section>
  );
};

export { Gallery26 };

interface BlurVignetteProps {
  children: React.ReactNode;
  className?: string;
  radius?: string;
  inset?: string;
  transitionLength?: string;
  blur?: string;
}

const BlurVignette = ({
  children,
  className = "",
  radius = "24px",
  inset = "16px",
  transitionLength = "32px",
  blur = "21px",
}: BlurVignetteProps) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.9,
        y: -50,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      viewport={{ once: true, amount: 0.2 }}
      className={`group relative cursor-pointer overflow-hidden ${className}`}
    >
      <style>
        {`
          .blur-vignette {
            --radius: ${radius};
            --inset: ${inset};
            --transition-length: ${transitionLength};
            --blur: ${blur};
            position: absolute;
            inset: 0;
            -webkit-backdrop-filter: blur(var(--blur));
            backdrop-filter: blur(var(--blur));
            --r: max(var(--transition-length), calc(var(--radius) - var(--inset)));
            --corner-size: calc(var(--r) + var(--inset)) calc(var(--r) + var(--inset));
            --corner-gradient: transparent 0px,
              transparent calc(var(--r) - var(--transition-length)), 
              black var(--r);
            --fill-gradient: black, 
              black var(--inset),
              transparent calc(var(--inset) + var(--transition-length)),
              transparent calc(100% - var(--transition-length) - var(--inset)),
              black calc(100% - var(--inset));
            --fill-narrow-size: calc(100% - (var(--inset) + var(--r)) * 2);
            --fill-farther-position: calc(var(--inset) + var(--r));
            -webkit-mask-image: linear-gradient(to right, var(--fill-gradient)),
              linear-gradient(to bottom, var(--fill-gradient)),
              radial-gradient(at bottom right, var(--corner-gradient)),
              radial-gradient(at bottom left, var(--corner-gradient)),
              radial-gradient(at top left, var(--corner-gradient)),
              radial-gradient(at top right, var(--corner-gradient));
            -webkit-mask-size: 100% var(--fill-narrow-size), 
              var(--fill-narrow-size) 100%,
              var(--corner-size), 
              var(--corner-size), 
              var(--corner-size),
              var(--corner-size);
            -webkit-mask-position: 0 var(--fill-farther-position), 
              var(--fill-farther-position) 0,
              0 0, 
              100% 0, 
              100% 100%, 
              0 100%;
            -webkit-mask-repeat: no-repeat;
            opacity: 0;
            transition: opacity 0.3s ease;    
        }

        .blur-vignette.active {
        opacity: 1;
        }

        .group:hover .blur-vignette {
        opacity: 0;
        }
        `}
      </style>
      <div className="blur-vignette active }" />
      {children}
    </motion.div>
  );
};

```

```tsx
"use client";

import { cn } from "@/lib/utils";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const images = [
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/alex-tyson-2Fv_otxbGtg-unsplash.jpg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/jason-leung-6uoj7DL6BFk-unsplash.jpg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/jonathan-borba-UisC7KLAWjs-unsplash.jpg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/jean-philippe-delberghe-fnIIuaEHvII-unsplash.jpg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/jonathan-borba-YdomJdFdbDo-unsplash.jpg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/jose-angel-rios-ux9cu6FLsFE-unsplash.jpg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/zhao-yangyang-4uMRVFnJcP4-unsplash.jpg",
];

interface Gallery28Props {
  className?: string;
}

const Gallery28 = ({ className }: Gallery28Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h2 className="mb-4 text-center text-4xl font-semibold">
          Beautiful Interiors.
        </h2>
        <p className="text-center text-sm text-muted-foreground">
          Explore our curated collection of stunning interior designs.
          <br />
          Each space tells a unique story through thoughtful design and
          attention to detail.
        </p>
        <div className="mt-10">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="mx-auto w-full max-w-6xl"
          >
            <CarouselContent
              style={{
                backfaceVisibility: "hidden",
              }}
            >
              {images.map((image, index) => (
                <CarouselItem key={index} className="basis-1/2">
                  <img
                    src={image}
                    alt="placeholder"
                    className="aspect-[3.8/5] w-full rounded-xl object-cover"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-5 scale-120 border-none bg-black/30 text-white hover:bg-black/50 hover:text-white dark:bg-black/30 dark:hover:bg-black/50" />
            <CarouselNext className="right-5 scale-120 border-none bg-black/30 text-white hover:bg-black/50 hover:text-white dark:bg-black/30 dark:hover:bg-black/50" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export { Gallery28 };

```
