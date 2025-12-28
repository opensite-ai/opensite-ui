```tsx
import { ArrowRight, Book, ChevronRight, File } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Cta3Props {
  className?: string;
}

const Cta3 = ({ className }: Cta3Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid grid-cols-1 flex-col gap-10 rounded-lg border p-6 shadow-sm lg:grid-cols-2 lg:px-20 lg:py-16">
          <div>
            <h4 className="mb-2 text-2xl font-bold lg:text-4xl">
              Call To Action
            </h4>
            <p className="text-muted-foreground">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Architecto illo praesentium nisi, accusantium quae.
            </p>
            <div className="mt-8 flex flex-col items-center gap-2 sm:flex-row">
              <Button className="w-full sm:w-auto">
                Get Started
                <ArrowRight className="ml-2 size-4" />
              </Button>
              <Button variant="outline" className="w-full sm:w-auto">
                Contact Sales
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <a href="#">
              <Card className="flex flex-row items-center justify-between gap-2 px-6 py-4 shadow-none hover:bg-accent">
                <div className="flex items-start gap-2">
                  <File className="size-4" />
                  <div>
                    <h5 className="mb-2 leading-4 font-medium">
                      Documentation
                    </h5>
                    <p className="text-sm text-muted-foreground">
                      Lorem ipsum dolor, sit amet consectetur.
                    </p>
                  </div>
                </div>
                <ChevronRight className="size-6" />
              </Card>
            </a>
            <a href="#">
              <Card className="flex flex-row items-center justify-between gap-2 px-6 py-4 shadow-none hover:bg-accent">
                <div className="flex items-start gap-2">
                  <Book className="size-4" />
                  <div>
                    <h5 className="mb-2 leading-4 font-medium">
                      Getting Started
                    </h5>
                    <p className="text-sm text-muted-foreground">
                      Lorem ipsum dolor, sit amet consectetur.
                    </p>
                  </div>
                </div>
                <ChevronRight className="size-6" />
              </Card>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Cta3 };

```

```tsx
import { ArrowRight, Check } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Cta4Props {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  items?: string[];
  className?: string;
}

const defaultItems = [
  "Easy Integration",
  "24/7 Support",
  "Customizable Design",
  "Scalable Performance",
  "Hundreds of Blocks",
];

const Cta4 = ({
  title = "Call to Action",
  description = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto illo praesentium nisi, accusantium quae.",
  buttonText = "Get Started",
  buttonUrl = "https://shadcnblocks.com",
  items = defaultItems,
  className,
}: Cta4Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="max-w-5xl">
            <div className="flex flex-col items-start justify-between gap-8 rounded-lg bg-muted px-6 py-10 md:flex-row lg:px-20 lg:py-16">
              <div className="md:w-1/2">
                <h4 className="mb-1 text-2xl font-bold md:text-3xl">{title}</h4>
                <p className="text-muted-foreground">{description}</p>
                <Button className="mt-6" asChild>
                  <a href={buttonUrl} target="_blank">
                    {buttonText} <ArrowRight className="size-4" />
                  </a>
                </Button>
              </div>
              <div className="md:w-1/3">
                <ul className="flex flex-col space-y-2 text-sm font-medium">
                  {items.map((item, idx) => (
                    <li className="flex items-center" key={idx}>
                      <Check className="mr-4 size-4 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Cta4 };

```

```tsx
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Cta5Props {
  className?: string;
}

const Cta5 = ({ className }: Cta5Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex w-full flex-col overflow-hidden rounded-lg bg-muted md:rounded-xl lg:flex-row lg:items-center">
          <div className="w-full shrink-0 self-stretch lg:w-1/2">
            <img
              src="https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u"
              alt="placeholder hero"
              className="aspect-3/2 w-full rounded-t-md object-cover md:rounded-t-none md:rounded-l-md"
            />
          </div>
          <div className="w-full shrink-0 px-4 py-6 md:p-8 lg:w-1/2 lg:px-16">
            <h3 className="mb-3 text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
              Call to Action
            </h3>
            <p className="mb-8 text-muted-foreground lg:text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
              doloremque mollitia fugiat omnis! Porro facilis quo animi
              consequatur. Explicabo.
            </p>
            <Button>Get Started</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Cta5 };

```

```tsx
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Cta6Props {
  className?: string;
}

const Cta6 = ({ className }: Cta6Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="max-w-full overflow-hidden border-y border-border bg-accent pt-10 md:pt-16 lg:pt-20">
        <div className="relative container flex flex-col md:flex-row md:space-x-12">
          <div className="mb-[18rem] md:mb-28 md:w-2/3 lg:shrink-0 xl:mb-20 xl:w-1/2">
            <h3 className="mb-3 text-4xl font-semibold md:mb-4 md:text-5xl lg:mb-6">
              Call to Action
            </h3>
            <p className="mb-8 text-muted-foreground lg:text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
              doloremque mollitia fugiat omnis! Porro facilis quo animi
              consequatur. Explicabo.
            </p>
            <Button>Get Started</Button>
          </div>
          <div className="absolute right-1/2 bottom-0 mr-6 h-min w-[110%] max-w-md translate-x-1/2 md:-right-36 md:mr-0 md:w-3/4 md:max-w-xl md:translate-x-0 lg:mt-auto xl:relative xl:right-0 xl:h-full xl:w-full xl:max-w-full">
            <div className="relative aspect-8/5 h-full min-h-[16rem] w-full">
              <div className="absolute top-0 right-0 z-40 flex aspect-3/5 w-3/5 -translate-x-[24%] translate-y-[24%] -rotate-[30deg] justify-center overflow-clip rounded-3xl bg-background shadow-lg shadow-foreground/20 md:max-xl:-translate-x-[8%] md:max-xl:translate-y-[16%]"></div>
              <div className="absolute top-0 right-0 z-40 flex aspect-3/5 w-3/5 -translate-x-[16%] translate-y-[8%] -rotate-[15deg] justify-center overflow-clip rounded-3xl bg-background shadow-xl shadow-foreground/20 md:max-xl:-translate-x-[6%] md:max-xl:translate-y-[6%]"></div>
              <div className="absolute top-0 right-0 z-40 flex aspect-3/5 w-3/5 items-center justify-center overflow-clip rounded-3xl bg-background shadow-2xl shadow-foreground/20"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Cta6 };

```

```tsx
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Cta7Props {
  className?: string;
}

const Cta7 = ({ className }: Cta7Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="relative rounded-xl border border-border bg-accent px-6 py-8 2xl:grid 2xl:grid-cols-2 2xl:px-14 2xl:py-10">
          <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
            <svg
              fill="none"
              width={404}
              height={384}
              viewBox="0 0 404 384"
              aria-hidden="true"
              className="absolute top-full left-full -translate-x-2/3 -translate-y-1/2 rotate-[60deg]"
            >
              <defs>
                <pattern
                  x={0}
                  y={0}
                  id="dots"
                  width={16}
                  height={16}
                  patternUnits="userSpaceOnUse"
                >
                  <circle
                    cx={2}
                    cy={2}
                    r={2}
                    fill="currentColor"
                    className="text-border"
                  />
                </pattern>
              </defs>
              <rect fill="url(#dots)" width={400} height={400} />
            </svg>
          </div>
          <div className="relative mb-12 2xl:mb-0">
            <h3 className="mb-6 text-2xl font-semibold md:mb-8 md:text-4xl lg:mb-12">
              Call to Action
            </h3>
            <p className="mb-6 text-xs tracking-widest text-muted-foreground uppercase">
              Experience the Difference
            </p>
            <ul className="grid gap-x-8 gap-y-4 text-muted-foreground md:grid-cols-2">
              <li className="flex items-center gap-2">
                <Check className="size-5 text-foreground" />
                Easy Integration
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-5 text-foreground" />
                24/7 Support
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-5 text-foreground" />
                Customizable Design
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-5 text-foreground" />
                Regular Updates
              </li>
            </ul>
          </div>
          <div className="relative flex items-end 2xl:justify-end">
            <Button size="lg">Get Started</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Cta7 };

```

```tsx
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Cta10Props {
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
  className?: string;
}

const Cta10 = ({
  heading = "Call to Action",
  description = "Build faster with our collection of pre-built blocks. Speed up your development and ship features in record time.",
  buttons = {
    primary: {
      text: "Buy Now",
      url: "https://www.shadcnblocks.com",
    },
  },
  className,
}: Cta10Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex w-full flex-col gap-16 overflow-hidden rounded-lg bg-accent p-8 md:rounded-xl lg:flex-row lg:items-center lg:p-12">
          <div className="flex-1">
            <h3 className="mb-3 text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
              {heading}
            </h3>
            <p className="max-w-xl text-muted-foreground lg:text-lg">
              {description}
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            {buttons.secondary && (
              <Button variant="outline" asChild>
                <a href={buttons.secondary.url}>{buttons.secondary.text}</a>
              </Button>
            )}
            {buttons.primary && (
              <Button asChild variant="default" size="lg">
                <a href={buttons.primary.url}>{buttons.primary.text}</a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Cta10 };

```

```tsx
import { cn } from "@/lib/utils";

interface Cta11Props {
  heading?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  buttonText?: string;
  buttonHref?: string;
  className?: string;
}

const Cta11 = ({
  heading = "Call to Action",
  description = "Build faster with our collection of pre-built blocks. Speed up your development and ship features in record time.",
  imageSrc = "https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u",
  imageAlt = "Call to action image",
  className,
}: Cta11Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex w-full flex-col gap-16 overflow-hidden rounded-lg bg-accent p-8 md:rounded-xl lg:flex-row lg:items-center lg:p-12">
          <div className="flex-1">
            <h3 className="mb-3 text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
              {heading}
            </h3>
            <p className="max-w-xl text-muted-foreground lg:text-lg">
              {description}
            </p>
          </div>
          <div className="shrink-0">
            <div className="flex flex-col justify-center gap-4 sm:flex-row sm:items-center">
              <div className="relative h-32 w-32 overflow-hidden rounded-lg sm:h-40 sm:w-40">
                <img src={imageSrc} alt={imageAlt} className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Cta11 };

```

```tsx
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Cta12Props {
  heading: string;
  description: string;
  buttons?: {
    primary?: {
      text: string;
      url: string;
      className?: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
  className?: string;
}

const Cta12 = ({
  heading = "Call to Action",
  description = "Build faster with our collection of pre-built blocks. Speed up your development and ship features in record time.",
  buttons = {
    primary: {
      text: "Buy Now",
      url: "https://www.shadcnblocks.com",
    },
    secondary: {
      text: "Contact Us",
      url: "https://www.shadcnblocks.com",
    },
  },
  className,
}: Cta12Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="rounded-lg bg-accent p-8 md:rounded-xl lg:p-12">
          <div className="mx-auto max-w-4xl text-center">
            <h3 className="mb-4 text-3xl font-semibold md:text-5xl lg:mb-6 lg:text-6xl">
              {heading}
            </h3>
            <p className="mb-8 text-lg font-medium text-muted-foreground lg:text-xl">
              {description}
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
              {buttons.primary && (
                <Button size="lg" className="w-full sm:w-auto" asChild>
                  <a href={buttons.primary.url}>{buttons.primary.text}</a>
                </Button>
              )}
              {buttons.secondary && (
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                  asChild
                >
                  <a href={buttons.secondary.url}>{buttons.secondary.text}</a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Cta12 };

```

```tsx
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Cta13Props {
  heading: string;
  description: string;
  buttons?: {
    primary?: {
      text: string;
      url: string;
      className?: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
  className?: string;
}

const Cta13 = ({
  heading = "Call to Action",
  description = "Build faster with our collection of pre-built blocks. Speed up your development and ship features in record time.",
  buttons = {
    primary: {
      text: "Buy Now",
      url: "https://www.shadcnblocks.com",
    },
    secondary: {
      text: "Contact Us",
      url: "https://www.shadcnblocks.com",
    },
  },
  className,
}: Cta13Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="rounded-lg bg-accent p-8 md:rounded-xl lg:p-12">
          <div className="max-w-4xl">
            <h3 className="mb-4 text-3xl font-semibold md:text-5xl lg:mb-6 lg:text-6xl">
              {heading}
            </h3>
            <p className="mb-8 text-lg font-medium text-muted-foreground lg:text-xl">
              {description}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              {buttons.primary && (
                <Button size="lg" className="w-full sm:w-auto" asChild>
                  <a href={buttons.primary.url}>{buttons.primary.text}</a>
                </Button>
              )}
              {buttons.secondary && (
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                  asChild
                >
                  <a href={buttons.secondary.url}>{buttons.secondary.text}</a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Cta13 };

```

```tsx
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Cta14Props {
  className?: string;
}

const Cta14 = ({ className }: Cta14Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex h-[620px] items-center justify-center overflow-hidden rounded-2xl bg-[linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0)),url('https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/pawel-czerwinski-O4fAgtXLRwI-unsplash.jpg')] bg-cover bg-center">
          <div className="flex flex-col gap-8 p-4 text-center">
            <h2 className="text-5xl font-bold text-primary-foreground">
              Start your free trial today.
            </h2>
            <p className="text-lg text-primary-foreground">
              Start with a 14-day free trial. No credit card required. No setup
              fees. Cancel anytime.
            </p>
            <div className="flex flex-col justify-center gap-2 sm:flex-row">
              <Button size="lg" variant="default">
                Get Started
              </Button>
              <Button size="lg" variant="secondary">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Cta14 };

```

```tsx
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Cta15Props {
  className?: string;
}

const Cta15 = ({ className }: Cta15Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-20 overflow-hidden rounded-2xl border bg-[radial-gradient(ellipse_30%_60%_at_100%_80%,var(--color-gray-200),transparent)] pt-20 sm:pl-16 lg:flex-row lg:bg-[radial-gradient(ellipse_50%_80%_at_40%_120%,var(--color-gray-200),transparent)] lg:pl-20">
          <div className="lg:texlf mx-auto max-w-md px-4 text-center md:px-0 lg:mx-0 lg:pb-20 lg:text-left">
            <p className="mb-6 font-medium">Ready to get started?</p>
            <h2 className="mb-6 text-4xl font-bold md:text-5xl">
              Start your free trial today.
            </h2>
            <p className="text-lg text-muted-foreground">
              Start with a 14-day free trial. No credit card required. No setup
              fees. Cancel anytime.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <Button>Get Started</Button>
              <Button variant="outline">Learn More</Button>
            </div>
          </div>
          <div className="relative w-full pl-4 sm:pl-0">
            <div className="absolute -bottom-8 -left-8 -z-10 h-4/5 w-4/5 rounded-tl-2xl rounded-br-2xl bg-stone-900/20 blur-2xl"></div>
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/pawel-czerwinski-O4fAgtXLRwI-unsplash.jpg"
              alt="placeholder"
              className="relative z-10 h-full max-h-[400px] w-full rounded-tl-2xl rounded-br-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export { Cta15 };

```

```tsx
import { Zap } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Cta16Props {
  className?: string;
}

const Cta16 = ({ className }: Cta16Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="flex h-[620px] items-center justify-center bg-[linear-gradient(rgba(0,0,0,.6),rgba(0,0,0,.6)),url('https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-xOLhD-qfoRI-unsplash.jpg')] bg-cover bg-center">
        <div className="container">
          <div className="flex flex-col gap-8 p-4 text-center text-primary-foreground">
            <div className="flex items-center justify-center gap-2 text-2xl font-medium">
              <Zap className="h-full w-7" /> Faster
            </div>
            <h2 className="text-5xl font-bold">Build your website faster.</h2>
            <div className="flex flex-col justify-center gap-2 sm:flex-row">
              <Button size="lg" variant="secondary">
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-0 bg-background/20 backdrop-blur-sm hover:bg-background/30 hover:text-primary-foreground"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Cta16 };

```

```tsx
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Cta17Props {
  className?: string;
}

const Cta17 = ({ className }: Cta17Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="flex items-center justify-center border bg-[url('https://cdn.ing/assets/files/record/286190/gtmia3sncjtzetdshc20zf1d3c17')] bg-cover bg-center py-20 text-center md:p-20">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-4 text-3xl font-semibold text-balance md:text-5xl">
              Start building your websites faster
            </h1>
            <p className="md:text-lg">
              Try our tools and services to build your website faster. Start
              with a 14-day free trial. No credit card required. No setup fees.
              Cancel anytime.
            </p>
            <div className="mt-11 flex flex-col justify-center gap-2 sm:flex-row">
              <Button size="lg">Get Started</Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Cta17 };

```

```tsx
import { Play } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Cta18Props {
  className?: string;
}

const Cta18 = ({ className }: Cta18Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container overflow-hidden">
        <div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-6 overflow-hidden rounded-xl border bg-muted/50 md:flex-row">
          <div className="max-w-xl self-center p-6 md:p-12">
            <h2 className="text-3xl font-semibold md:text-4xl">
              Explore Our Platform
            </h2>
            <p className="mt-4 text-muted-foreground md:text-lg">
              Discover the full potential of our platform. Try our interactive
              demo or watch a comprehensive walkthrough today.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button>Try Demo</Button>
              <Button variant="outline">
                Watch Video
                <Play className="ml-2" />
              </Button>
            </div>
          </div>
          <div className="relative ml-6 max-h-96 md:mt-8 md:ml-0">
            <img
              src="https://cdn.ing/assets/files/record/286214/pn9v9zz0de8jgz2mf8o1c11k8gxh"
              alt="placeholder"
              className="absolute -bottom-12 left-4 h-48 -translate-x-1/2 -rotate-[120deg]"
            />
            <img
              src="https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u"
              alt="placeholder"
              className="z-10 aspect-video h-full w-full rounded-tl-xl border-t border-l object-cover pt-3.5 pl-3.5 backdrop-blur-sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export { Cta18 };

```

```tsx
import { FileCode, Layers } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Cta19Props {
  className?: string;
}

const Cta19 = ({ className }: Cta19Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col rounded-xl border lg:flex-row">
          <div className="grow px-8 py-8 lg:px-16">
            <Badge variant="outline">Get Started</Badge>
            <div className="mt-4 max-w-xl">
              <h2 className="text-3xl font-semibold md:text-4xl">
                Transform your workflow with our enterprise solution
              </h2>
              <p className="mt-4 text-muted-foreground md:text-lg">
                Our platform streamlines complex operations at scale, providing
                comprehensive insights and intelligent automation capabilities.
                Achieve greater efficiency and productivity with our proven
                enterprise tools.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button>Start free trial</Button>
              <Button variant="outline">Schedule demo</Button>
            </div>
          </div>
          <div className="flex grow basis-5/12 flex-col justify-between border-t lg:border-t-0 lg:border-l">
            <a
              href="#"
              className="flex h-full items-center px-9 py-6 transition-colors hover:bg-muted/50 lg:justify-center"
            >
              <div className="flex gap-4">
                <FileCode
                  className="size-8 shrink-0 md:size-10"
                  strokeWidth={1.5}
                />
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-semibold md:text-xl">
                    Documentation
                  </h3>
                  <p className="max-w-lg text-muted-foreground md:text-lg">
                    Learn more about our platform&apos;s features and
                    capabilities.
                  </p>
                </div>
              </div>
            </a>
            <Separator />
            <a
              href="#"
              className="flex h-full items-center px-9 py-6 transition-colors hover:bg-muted/50 lg:justify-center"
            >
              <div className="flex gap-4">
                <Layers
                  className="size-8 shrink-0 md:size-10"
                  strokeWidth={1.5}
                />
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-semibold md:text-xl">
                    Interactive Demo
                  </h3>
                  <p className="max-w-lg text-muted-foreground md:text-lg">
                    Experience our platform firsthand with an interactive
                    demonstration of key features.
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Cta19 };

```

```tsx
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Cta20Props {
  className?: string;
}

const Cta20 = ({ className }: Cta20Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div>
          <p className="text-center text-sm">Transform your business today.</p>
          <div className="mt-4 flex items-center justify-between gap-4">
            <Separator className="shrink" />
            <Button size="lg">Get Started</Button>
            <Separator className="shrink" />
          </div>
        </div>
      </div>
    </section>
  );
};

export { Cta20 };

```

```tsx
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Cta21Props {
  className?: string;
}

const Cta21 = ({ className }: Cta21Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="relative h-[300px] overflow-hidden rounded-xl md:h-[500px]">
          <img
            src="https://images.unsplash.com/photo-1507623457503-9743b35aea95?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="placeholder"
            className="h-full w-full bg-bottom object-cover"
          />
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-8 p-6">
            <h2 className="text-center text-2xl font-semibold md:text-4xl">
              Innovation. Control. Success.
            </h2>
            <Button size="lg">
              Get Started Now
              <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Cta21 };

```

```tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import { z } from "zod";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z
  .object({
    email: z.email({ error: "Invalid email address" }),
  })
  .required({ email: true });

interface Cta22Props {
  className?: string;
}

const Cta22 = ({ className }: Cta22Props) => {
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
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          <div className="dark relative h-[350px] overflow-hidden rounded-xl bg-background text-white md:col-span-2">
            <div className="flex h-full flex-row p-4 sm:p-8 md:p-12">
              <div className="relative z-10 w-full self-center px-2 text-center sm:w-auto sm:flex-1 sm:px-0 md:text-left">
                <h1 className="mb-4 text-3xl font-bold sm:mb-6 sm:text-2xl md:text-3xl">
                  Download the notes app of tomorrow today.
                </h1>
                <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4 md:justify-start">
                  <Button>
                    <FaApple />
                    <span>Download for iOS</span>
                  </Button>
                  <Button variant="outline" className="border border-white">
                    <FaGooglePlay />
                    <span>Download for Android</span>
                  </Button>
                </div>
              </div>
              {/* Phone section */}
              <div className="relative z-10 hidden md:block">
                <div className="absolute top-0 left-1/2 h-[120%] w-[69%] -translate-x-1/2 overflow-hidden rounded-t-[32px]">
                  <img
                    src="https://cdn.ing/assets/files/record/286247/c92kzuar6li9m5lcm7ek8uckgfx0"
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="relative z-10 h-[350px] overflow-hidden">
                  <img
                    className="h-[600px] w-auto max-w-none"
                    src="https://cdn.ing/assets/i/r/286248/yc2corz15dowsy59vp38u6hikiwm/phone-2.png"
                    width={340}
                    height={600}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="hidden h-[350px] items-center justify-center rounded-xl bg-muted p-6 sm:flex sm:p-8 md:p-12">
            <div className="w-full">
              <h2 className="mb-2 text-xl font-semibold sm:text-2xl">
                Subscribe to our weekly newsletter
              </h2>
              <p className="mb-6 text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur adipiscing elidolor
                mattis sit phasellus.
              </p>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              id="emailInput"
                              placeholder="Enter your email"
                              className="w-full bg-background focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">
                      Subscribe <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Cta22 };

```

```tsx
import { ArrowRight, CheckCircle, Mail } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Cta23Props {
  className?: string;
}

const Cta23 = ({ className }: Cta23Props) => {
  return (
    <section className={cn("bg-muted py-32", className)}>
      <div className="container">
        <div className="flex flex-col items-start md:items-center">
          {/* Badge */}
          <Badge>
            <Mail className="mr-2 h-4 w-4" />
            Stay Informed
          </Badge>

          {/* Heading */}
          <h4 className="mt-4 text-2xl font-semibold tracking-tight md:text-center md:text-3xl xl:text-4xl">
            Subscribe to our newsletter
          </h4>

          {/* Description */}
          <p className="mt-2 text-lg font-medium text-muted-foreground md:text-center xl:text-xl">
            Get the <span className="text-primary">latest updates</span>,{" "}
            <span className="text-primary">tips</span>, and{" "}
            <span className="text-primary">exclusive</span> offers from AlignUI.
          </p>

          {/* Form */}
          <form className="mt-5 flex w-full flex-col gap-2 md:w-auto xl:mt-8 xl:gap-3">
            <div className="group relative flex w-full items-center gap-2 rounded-lg px-3 md:w-[416px]">
              <Input
                type="email"
                required
                placeholder="Enter your email..."
                className="bg-background"
              />
              <Button type="submit" aria-label="Submit form">
                <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
          </form>

          {/* Features */}
          <div className="mt-5 flex flex-wrap gap-4 md:justify-center xl:mt-8 xl:gap-7">
            <div className="flex items-center gap-2 text-sm xl:text-base">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Weekly updates
            </div>
            <div className="flex items-center gap-2 text-sm xl:text-base">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Exclusive content
            </div>
            <div className="flex items-center gap-2 text-sm xl:text-base">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Early access for features
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Cta23 };

```

```tsx
import { ArrowUpRight, BookOpen, Zap } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Cta26Props {
  className?: string;
}

const Cta26 = ({ className }: Cta26Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="relative h-96 overflow-hidden rounded-xl border border-border">
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/full-width-backgrounds/andrew-kliatskyi-LYZxo7oVFOI-unsplash.webp"
            alt="placeholder"
            className="hidden h-full w-full object-cover dark:block"
          />
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/full-width-backgrounds/denis96-gmsf4Zo2-rY-unsplash.webp"
            alt="placeholder"
            className="h-full w-full object-cover dark:hidden"
          />
          <div className="absolute inset-0 bg-radial from-background to-background/50 lg:to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 p-6">
            <div className="text-center">
              <h2 className="text-3xl font-semibold md:text-5xl">
                Try it free
              </h2>
              <p className="text-lg text-muted-foreground md:text-xl">
                Experience our platform and discover how it can transform your
                workflow
              </p>
            </div>
            <Button size="lg">
              Get started
              <ArrowUpRight className="size-4" />
            </Button>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <a
            href="#"
            className="flex flex-col items-start gap-8 rounded-xl border border-border bg-muted/50 px-10 py-8 transition-transform hover:-translate-y-0.5"
          >
            <span className="grid size-12 place-items-center rounded-lg border border-border">
              <Zap className="size-5" />
            </span>
            <div className="flex flex-col gap-1">
              <h3 className="text-2xl font-medium md:text-3xl">
                Instant setup
              </h3>
              <p className="text-muted-foreground">
                Get up and running in minutes with our guided onboarding
              </p>
            </div>
          </a>
          <a
            href="#"
            className="flex flex-col items-start gap-8 rounded-xl border border-border bg-muted/50 px-10 py-8 transition-transform hover:-translate-y-0.5"
          >
            <span className="grid size-12 place-items-center rounded-lg border border-border">
              <BookOpen className="size-5" />
            </span>
            <div className="flex flex-col gap-1">
              <h3 className="text-2xl font-medium md:text-3xl">
                Documentation
              </h3>
              <p className="text-muted-foreground">
                Comprehensive guides and tutorials to help you succeed
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export { Cta26 };

```

```tsx
import {
  ArrowRight,
  Clock,
  FileText,
  Lock,
  MessageSquare,
  Paperclip,
  Presentation,
  Shield,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

const list = [
  {
    icon: Lock,
    text: "Enterprise-grade SSO integration",
  },
  {
    icon: FileText,
    text: "Flexible billing and invoicing",
  },
  {
    icon: Shield,
    text: "Comprehensive security assessment",
  },
  {
    icon: Paperclip,
    text: "Custom service-level agreement",
  },
  {
    icon: Users,
    text: "Personalized account management",
  },
  {
    icon: Presentation,
    text: "Hands-on onboarding sessions",
  },
  {
    icon: Clock,
    text: "SLA-backed priority assistance",
  },
  {
    icon: MessageSquare,
    text: "Real-time chat with support team",
  },
];

const List = () => {
  return (
    <ul
      className={cn(
        "grid max-w-[36.25rem] grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2",
      )}
    >
      {list.map((item, i) => (
        <li key={`cta-item-${i}`} className="flex items-center gap-3">
          <item.icon className="size-5 stroke-white" />
          <div className="text-sm text-white">{item.text}</div>
        </li>
      ))}
    </ul>
  );
};

interface Cta28Props {
  className?: string;
}

const Cta28 = ({ className }: Cta28Props) => {
  return (
    <section
      className={cn("dark bg-background py-32 text-foreground", className)}
    >
      <div className="container">
        <div className="relative grid grid-cols-1 overflow-hidden rounded-[0.75rem] px-8 pt-10 pb-12 xl:grid-cols-2 xl:px-15.5 xl:pb-15.5">
          <div className="flex flex-col gap-6 md:gap-9">
            <p className="font-serif text-4xl md:text-6xl lg:text-7xl">
              <span className="block">Enterprise:</span>A solution for all
            </p>
            <p className="text-lg md:text-xl lg:text-2xl">
              Empower every teammate — and produce more videos!
            </p>
            <List />
            <div>
              <Button size="lg" className="w-full md:w-fit">
                Get in touch to discover more!
                <ArrowRight />
              </Button>
            </div>
          </div>
          <div className="hidden xl:block">
            <div className="absolute top-0 right-0 h-[40.9375rem] w-[36.875rem]">
              <div className="absolute top-0 right-0 aspect-[1.15] w-[14.375rem] opacity-60">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/fabian-centeno-njeVb6E3XB8-unsplash.jpg"
                  alt=""
                  className="size-full object-cover object-center"
                />
              </div>
              <div className="absolute top-50 right-0 z-10 aspect-[0.709248555] w-[17.5rem] overflow-hidden rounded-tl-md">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/jason-goodman-ZJlfUi5rTDU-unsplash.jpg"
                  alt=""
                  className="size-full object-cover object-center"
                />
              </div>
              <div className="absolute top-60 right-0 aspect-[1.353211009] w-[36.875rem] overflow-hidden rounded-tl-2xl opacity-25">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/redd-f-5U_28ojjgms-unsplash.jpg"
                  alt=""
                  className="size-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Cta28 };

```

```tsx
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Cta31Props {
  className?: string;
}

const Cta31 = ({ className }: Cta31Props) => {
  return (
    <section className={cn("overflow-hidden py-32", className)}>
      <div className="relative container">
        <h1 className="mx-auto max-w-4xl bg-linear-to-r from-primary/60 via-primary to-primary/60 bg-clip-text text-center text-4xl font-semibold text-transparent lg:text-6xl">
          Solutions for <br /> Modern Businesses
        </h1>
        <p className="mt-4 text-center text-lg lg:mt-10">
          Transform your workflow with cutting-edge technology
        </p>
        <div className="relative z-10 mt-8 flex justify-center lg:mt-16">
          <Button size="lg">
            Explore Our Solutions
            <ArrowRight />
          </Button>
        </div>
        <div className="inset-0 -z-10 flex justify-center lg:absolute">
          <div className="relative -top-8 flex justify-between sm:-top-20 lg:-top-0 lg:w-full">
            <div className="relative -left-20 min-h-44 min-w-[460px] translate-x-28 scale-80 sm:translate-x-0 lg:min-h-[292px] lg:scale-90 xl:scale-100">
              <span className="absolute right-0 -bottom-5 flex size-20 scale-60 items-center justify-center rounded-full border border-border p-4">
                <img
                  src="https://cdn.ing/assets/files/record/286277/mnd352db8b4yw19lraw6w29pyrub"
                  alt="logo"
                  className="brightness-0 invert-0 dark:invert"
                />
              </span>
              <span className="absolute right-24 bottom-1 flex size-20 items-center justify-center rounded-full border border-border p-4">
                <img
                  src="https://cdn.ing/assets/files/record/286265/vfrvdxgku0jn1jx9e5dya0xypkv1"
                  alt="logo"
                  className="brightness-0 invert-0 dark:invert"
                />
              </span>
              <span className="absolute right-44 bottom-7 flex size-20 scale-60 items-center justify-center rounded-full border border-border p-4">
                <img
                  src="https://cdn.ing/assets/files/record/286274/cgwhw53pp05jeq0oqh2td24liibn"
                  alt="logo"
                  className="brightness-0 invert-0 dark:invert"
                />
              </span>
              <span className="absolute right-44 bottom-28 flex size-20 items-center justify-center rounded-full border border-border p-4">
                <img
                  src="https://cdn.ing/assets/files/record/286281/3cuuq5ptj5bmgcudhs88fy0krmnz"
                  alt="logo"
                  className="brightness-0 invert-0 dark:invert"
                />
              </span>
              <span className="absolute bottom-4 left-24 flex size-20 items-center justify-center rounded-full border border-border p-4">
                <img
                  src="https://cdn.ing/assets/files/record/286282/c76zfn36i5cvqado2dtc31simuwf"
                  alt="logo"
                  className="brightness-0 invert-0 dark:invert"
                />
              </span>
              <span className="absolute bottom-24 left-20 flex size-20 scale-60 items-center justify-center rounded-full border border-border p-4">
                <img
                  src="https://cdn.ing/assets/files/record/286266/242pfzm04mnosbiz0jt3qgslu294"
                  alt="logo"
                  className="brightness-0 invert-0 dark:invert"
                />
              </span>
            </div>
            <div className="relative -right-20 min-h-44 min-w-[460px] -translate-x-28 scale-80 sm:translate-x-0 lg:min-h-[292px] lg:scale-90 xl:scale-100">
              <span className="absolute -bottom-5 left-0 flex size-20 scale-60 items-center justify-center rounded-full border border-border p-4">
                <img
                  src="https://cdn.ing/assets/files/record/286257/or0u77z9kzwgwim26rjowjhy270x"
                  alt="logo"
                  className="brightness-0 invert-0 dark:invert"
                />
              </span>
              <span className="absolute bottom-1 left-24 flex size-20 items-center justify-center rounded-full border border-border p-4">
                <img
                  src="https://cdn.ing/assets/files/record/286258/pzftug9yjmmp6nn5l06tj04k9i9y"
                  alt="logo"
                  className="brightness-0 invert-0 dark:invert"
                />
              </span>
              <span className="absolute bottom-7 left-44 flex size-20 scale-60 items-center justify-center rounded-full border border-border p-4">
                <img
                  src="https://cdn.ing/assets/files/record/286259/pjuleqkiqaky2825y4vjipc5f4u7"
                  alt="logo"
                  className="brightness-0 invert-0 dark:invert"
                />
              </span>
              <span className="absolute bottom-28 left-44 flex size-20 items-center justify-center rounded-full border border-border p-4">
                <img
                  src="https://cdn.ing/assets/files/record/286260/2d06gd97qf54lcod4mttiv0syv8a"
                  alt="logo"
                  className="brightness-0 invert-0 dark:invert"
                />
              </span>
              <span className="absolute right-24 bottom-4 flex size-20 items-center justify-center rounded-full border border-border p-4">
                <img
                  src="https://cdn.ing/assets/files/record/286262/qgkw8ove3rdue2fdl3j5k3v0iokl"
                  alt="logo"
                  className="brightness-0 invert-0 dark:invert"
                />
              </span>
              <span className="absolute right-20 bottom-24 flex size-20 scale-60 items-center justify-center rounded-full border border-border p-4">
                <img
                  src="https://cdn.ing/assets/files/record/286264/3b6ngdqxlah4a9esyr07nj01160f"
                  alt="logo"
                  className="brightness-0 invert-0 dark:invert"
                />
              </span>
            </div>
            <div className="absolute inset-0 bg-linear-to-r from-background/80 via-transparent to-background/80" />
          </div>
        </div>
      </div>
    </section>
  );
};

export { Cta31 };

```

```tsx
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Cta32Props {
  heading: string;
  highlightHeading: string;
  description: string;
  buttons?: {
    primary?: { text: string; url: string };
    secondary?: { text: string; url: string };
  };
  stats: { label: string; description: string }[];
  className?: string;
}

const Cta32 = ({
  heading = "Supercharge your ",
  highlightHeading = "workflow today",
  description = "Automate repetitive tasks, gain real-time insights, and collaborate seamlessly with your team. Optimizing your operations in just a few clicks.",
  buttons = {
    primary: {
      text: "Get Started",
      url: "https://www.shadcnblocks.com",
    },
    secondary: {
      text: "Learn More",
      url: "https://www.shadcnblocks.com",
    },
  },
  stats = [
    { label: "99.9%", description: "system uptime guaranteed" },
    { label: "10k+", description: "companies using our platform" },
    { label: "1M+", description: "automated tasks run daily" },
  ],
  className,
}: Cta32Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="relative z-10 container grid border-2 border-dashed border-muted p-0 md:grid-cols-2">
        <div className="relative m-2 flex flex-col justify-center gap-6 overflow-hidden rounded-lg border border-primary bg-background/70 p-8 backdrop-blur-sm lg:m-8">
          {/* Pattern background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-100">
            <img
              alt="pattern"
              src="https://cdn.ing/assets/files/record/286187/4gpn0yq2ptra8iwlvmwwv860ggwv"
              className="mask-[radial-gradient(circle_at_top_right,black,transparent_100%)]"
            />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold tracking-tight">
              {heading}
              <span className="text-primary">{highlightHeading}</span>
            </h2>
            <p className="mt-2 text-muted-foreground">{description}</p>
          </div>

          <div className="relative z-10 flex gap-4">
            {buttons.primary && (
              <Button asChild>
                <a href={buttons.primary.url}>{buttons.primary.text}</a>
              </Button>
            )}
            {buttons.secondary && (
              <Button variant="outline" asChild>
                <a href={buttons.secondary.url}>{buttons.secondary.text}</a>
              </Button>
            )}
          </div>
        </div>

        <div className="grid border-t-2 border-dashed border-muted md:border-t-0 md:border-l-2">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="border-b-2 border-dashed border-muted p-6 last:border-0"
            >
              <p className="text-2xl font-bold text-primary">{stat.label}</p>
              <p className="text-sm text-muted-foreground">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Cta32 };

```

```tsx
import { Button } from '@/components/ui/button';
import { ChevronRight, ArrowRight, Check } from 'lucide-react';

export default function SplitContentHero() {
  return (
    <div className="bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 py-16 md:px-6 md:py-24 2xl:max-w-[1400px]">
        <div className="grid items-center gap-8 md:grid-cols-2">
          {/* Left content */}
          <div className="flex flex-col space-y-4">
            <div className="focus:ring-ring bg-primary text-primary-foreground hover:bg-primary/80 inline-flex w-fit items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none">
              <span>New Release 2.0</span>
              <ChevronRight className="ml-1 h-3.5 w-3.5" />
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Transform your workflow with our platform
            </h1>
            <p className="text-muted-foreground max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our all-in-one solution helps teams collaborate, manage projects,
              and deliver exceptional results with ease.
            </p>
            <div className="flex flex-col gap-3 min-[400px]:flex-row">
              <Button size="lg" asChild>
                <a href="#">
                  Start for free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#">Book a demo</a>
              </Button>
            </div>
            <div className="flex items-center space-x-4 pt-4 text-sm">
              <div className="flex -space-x-2">
                <div className="bg-muted text-muted-foreground ring-background inline-flex h-8 w-8 items-center justify-center rounded-full ring-2">
                  JL
                </div>
                <div className="bg-muted text-muted-foreground ring-background inline-flex h-8 w-8 items-center justify-center rounded-full ring-2">
                  SD
                </div>
                <div className="bg-muted text-muted-foreground ring-background inline-flex h-8 w-8 items-center justify-center rounded-full ring-2">
                  TK
                </div>
                <div className="bg-primary text-primary-foreground ring-background inline-flex h-8 w-8 items-center justify-center rounded-full ring-2">
                  +8
                </div>
              </div>
              <div className="text-muted-foreground">
                Join 10,000+ teams using our platform
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="flex items-start gap-2">
                <div className="bg-primary/10 text-primary flex h-5 w-5 items-center justify-center rounded-full">
                  <Check className="h-4 w-4" />
                </div>
                <div className="text-sm">No credit card required</div>
              </div>
              <div className="flex items-start gap-2">
                <div className="bg-primary/10 text-primary flex h-5 w-5 items-center justify-center rounded-full">
                  <Check className="h-4 w-4" />
                </div>
                <div className="text-sm">Free 14-day trial</div>
              </div>
              <div className="flex items-start gap-2">
                <div className="bg-primary/10 text-primary flex h-5 w-5 items-center justify-center rounded-full">
                  <Check className="h-4 w-4" />
                </div>
                <div className="text-sm">Cancel anytime</div>
              </div>
              <div className="flex items-start gap-2">
                <div className="bg-primary/10 text-primary flex h-5 w-5 items-center justify-center rounded-full">
                  <Check className="h-4 w-4" />
                </div>
                <div className="text-sm">24/7 customer support</div>
              </div>
            </div>
          </div>

          {/* Right image */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative h-[450px] w-full max-w-[500px] overflow-hidden rounded-lg shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
                alt="Team working on digital projects"
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent"></div>
              <div className="absolute right-0 bottom-0 left-0 p-6">
                <div className="grid grid-cols-3 gap-2">
                  <div className="rounded-md bg-white/90 p-3 shadow-lg backdrop-blur dark:bg-gray-800/90">
                    <div className="text-muted-foreground text-xs">
                      Active Projects
                    </div>
                    <div className="text-foreground text-xl font-bold">86</div>
                  </div>
                  <div className="rounded-md bg-white/90 p-3 shadow-lg backdrop-blur dark:bg-gray-800/90">
                    <div className="text-muted-foreground text-xs">
                      Team Members
                    </div>
                    <div className="text-foreground text-xl font-bold">32</div>
                  </div>
                  <div className="rounded-md bg-white/90 p-3 shadow-lg backdrop-blur dark:bg-gray-800/90">
                    <div className="text-muted-foreground text-xs">
                      Completion
                    </div>
                    <div className="text-foreground text-xl font-bold">92%</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="bg-primary/10 absolute -right-20 -bottom-20 -z-10 h-[300px] w-[300px] rounded-full blur-3xl"></div>
            <div className="bg-secondary/10 absolute -top-10 right-10 -z-10 h-[200px] w-[200px] rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="via-foreground/10 absolute top-0 right-0 left-0 h-px bg-linear-to-r from-transparent to-transparent"></div>
    </div>
  );
}

```

```tsx
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { useState } from 'react';

export default function VideoBackgroundHero() {
  const [videoModal, setVideoModal] = useState(false);

  return (
    <div className="relative min-h-[85vh] overflow-hidden bg-black/90">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 h-full w-full object-cover opacity-40"
        poster="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
      >
        <source
          src="https://player.vimeo.com/progressive_redirect/playback/772380223/rendition/720p/file.mp4?loc=external"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-black/20"></div>

      {/* Content */}
      <div className="relative container mx-auto flex min-h-[85vh] flex-col items-center justify-center gap-6 px-4 py-24 text-center md:px-6 md:py-32 2xl:max-w-[1400px]">
        <div className="flex flex-col items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-white/10 px-3 py-1 text-sm font-medium text-white">
            Introducing Our Latest Innovation
          </span>
        </div>
        <h1 className="max-w-4xl text-4xl font-bold tracking-tighter text-white md:text-5xl/tight lg:text-6xl/tight">
          Revolutionize Your Digital Experience with Cutting-Edge Technology
        </h1>
        <p className="max-w-[700px] text-white/80 md:text-xl/relaxed">
          Discover how our platform is changing the way people interact with
          technology, creating seamless experiences that drive results.
        </p>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row">
          <Button size="lg" asChild variant={'secondary'}>
            <a href="#">
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button
            size="lg"
            variant="default"
            onClick={() => setVideoModal(true)}
          >
            <Play className="mr-2 h-4 w-4" />
            Watch Demo
          </Button>
        </div>

        <div className="mt-8 flex items-center gap-4 text-sm text-white/80">
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M12 2H2v10h10V2Z" />
              <path d="M22 12H12v10h10V12Z" />
              <path d="M22 2h-5v5h5V2Z" />
              <path d="M7 12H2v5h5v-5Z" />
            </svg>
            <span>Modern Interface</span>
          </div>
          <div className="h-1 w-1 rounded-full bg-white/30"></div>
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
              <line x1="18" x2="12" y1="9" y2="15" />
              <line x1="12" x2="18" y1="9" y2="15" />
            </svg>
            <span>Enterprise Ready</span>
          </div>
          <div className="h-1 w-1 rounded-full bg-white/30"></div>
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            </svg>
            <span>Secure by Design</span>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {videoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setVideoModal(false)}
        >
          <div
            className="relative w-full max-w-4xl p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-10 right-0 text-white hover:text-white/80"
              onClick={() => setVideoModal(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
              <span className="sr-only">Close</span>
            </button>
            <div className="aspect-video w-full overflow-hidden rounded-lg">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Product Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

```

```tsx
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function HeroSectionWithContentTabs() {
  const features = [
    {
      id: 'design',
      title: 'Design',
      description: 'Beautiful and accessible components',
      content: {
        title: 'Craft stunning interfaces',
        description:
          'Our components are designed with accessibility and aesthetics in mind. Create beautiful user interfaces that work for everyone.',
        image: 'https://placehold.co/800x600.jpeg',
        stats: [
          { label: 'Components', value: '200+' },
          { label: 'Themes', value: '15+' },
          { label: 'Templates', value: '50+' },
        ],
      },
    },
    {
      id: 'develop',
      title: 'Develop',
      description: 'Type-safe development experience',
      content: {
        title: 'Build with confidence',
        description:
          'Fully typed components ensure a smooth development experience. Get instant feedback and autocompletion in your IDE.',
        image: 'https://placehold.co/800x600.jpeg',
        stats: [
          { label: 'TypeScript', value: '100%' },
          { label: 'Test Coverage', value: '95%' },
          { label: 'Bundle Size', value: '12kb' },
        ],
      },
    },
    {
      id: 'deploy',
      title: 'Deploy',
      description: 'Optimized for production',
      content: {
        title: 'Ship faster than ever',
        description:
          'Zero-config deployments with optimal performance. Your applications are ready for production from day one.',
        image: 'https://placehold.co/800x600.jpeg',
        stats: [
          { label: 'Build Time', value: '<1s' },
          { label: 'Lighthouse', value: '100' },
          { label: 'Uptime', value: '99.9%' },
        ],
      },
    },
  ];

  return (
    <>
      {/* Hero */}
      <div className="">
        <div className="relative">
          {/* Background pattern */}
          <div className="absolute inset-0 -z-10 h-full w-full">
            <div className="absolute h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
            <div className="absolute top-0 right-0 bottom-0 left-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(120,119,198,0.1),transparent)]"></div>
          </div>

          <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <Badge variant="outline" className="mb-4">
                Complete Workflow
              </Badge>
              <h1 className="mb-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                From design to deployment
              </h1>
              <p className="text-muted-foreground mb-8 text-xl">
                Everything you need to build modern applications. Design,
                develop, and deploy with our comprehensive toolkit.
              </p>
              <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <Button size="lg">
                  Get Started
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-2 h-4 w-4"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Button>
                <Button size="lg" variant="outline">
                  View Documentation
                </Button>
              </div>
            </div>

            {/* Feature Tabs */}
            <div className="mx-auto max-w-5xl">
              <Tabs defaultValue="design" className="space-y-8">
                <TabsList className="mx-auto grid h-auto w-full max-w-2xl grid-cols-3 gap-4 bg-transparent">
                  {features.map((feature) => (
                    <TabsTrigger
                      key={feature.id}
                      value={feature.id}
                      className="group bg-accent data-[state=active]:bg-primary data-[state=active]:text-primary-foreground h-full"
                    >
                      <div className="p-2 text-left whitespace-normal">
                        <p className="font-semibold">{feature.title}</p>
                        <p className="group-data-[state=active]:text-muted text-muted-foreground text-sm">
                          {feature.description}
                        </p>
                      </div>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {features.map((feature) => (
                  <TabsContent key={feature.id} value={feature.id}>
                    <Card className="p-6">
                      <div className="grid items-center gap-8 lg:grid-cols-2">
                        <div>
                          <h2 className="mb-4 text-3xl font-bold">
                            {feature.content.title}
                          </h2>
                          <p className="text-muted-foreground mb-8">
                            {feature.content.description}
                          </p>
                          <div className="grid grid-cols-3 gap-4">
                            {feature.content.stats.map((stat) => (
                              <div key={stat.label}>
                                <p className="text-2xl font-bold">
                                  {stat.value}
                                </p>
                                <p className="text-muted-foreground text-sm">
                                  {stat.label}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="relative">
                          <div className="aspect-4/3 overflow-hidden rounded-lg">
                            <img
                              src={feature.content.image}
                              alt={feature.title}
                              width={800}
                              height={600}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          {/* Floating Elements */}
                          <Card className="absolute -right-4 -bottom-4 w-48 p-4">
                            <div className="flex items-center gap-3">
                              <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-primary"
                                >
                                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                                  <path d="m9 12 2 2 4-4" />
                                </svg>
                              </div>
                              <p className="font-medium">Ready to use</p>
                            </div>
                          </Card>
                        </div>
                      </div>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}

```

```tsx
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ArrowUpRight, Quote } from 'lucide-react';

export default function CaseStudyCTA() {
  return (
    <>
      {/* Case Study CTA Section */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
          <div className="grid items-center gap-10 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <div className="space-y-4">
                <Badge variant="outline" className="text-primary">
                  Case Study
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  How TechNova increased productivity by 200% with our platform
                </h2>
                <div className="text-muted-foreground flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1491349174775-aaafddd81942?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3"
                    alt="Jennifer Lee"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="text-sm">
                    <p className="text-foreground font-medium">Jennifer Lee</p>
                    <p>CTO, TechNova</p>
                  </div>
                </div>
                <p className="text-muted-foreground md:text-lg">
                  Learn how TechNova, a leading tech startup, transformed their
                  workflow and boosted team productivity with our comprehensive
                  solution.
                </p>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-full p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary h-5 w-5"
                    >
                      <path d="M6.5 6.5h11v11h-11z" />
                      <path d="m21 3-9 9" />
                      <path d="M21 14v7h-7" />
                      <path d="M3 21V10H10" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">The Challenge</h3>
                    <p className="text-muted-foreground">
                      Managing multiple projects across distributed teams with
                      outdated tools led to miscommunication and missed
                      deadlines.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-full p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary h-5 w-5"
                    >
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">The Solution</h3>
                    <p className="text-muted-foreground">
                      Implementing our comprehensive platform unified
                      communication, streamlined workflows, and provided
                      real-time tracking capabilities.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-full p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary h-5 w-5"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">The Results</h3>
                    <p className="text-muted-foreground">
                      200% increase in productivity, 50% reduction in meeting
                      time, and 30% faster project completion.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-primary/20 text-muted-foreground relative mt-8 border-l-4 pl-6 italic">
                <Quote className="bg-background text-primary absolute -top-2 -left-3 h-6 w-6 rounded-full" />
                <p className="md:text-lg">
                  &ldquo;The platform transformed how our teams collaborate.
                  We&apos;ve eliminated silos and can now deliver projects with
                  unprecedented speed and quality.&rdquo;
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button size="lg" asChild>
                  <a href="#">
                    Read Full Case Study
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="#">
                    Schedule a Demo
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="relative aspect-4/3 overflow-hidden rounded-xl border">
                <img
                  src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3"
                  alt="TechNova team collaborating on the platform"
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full border-2 border-white bg-white/20 p-2 backdrop-blur-sm transition-transform hover:scale-110">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-10 w-10 text-white"
                    >
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-card rounded-lg border p-4 text-center">
                  <div className="text-primary text-3xl font-bold">200%</div>
                  <p className="text-muted-foreground text-sm">
                    Productivity Increase
                  </p>
                </div>
                <div className="bg-card rounded-lg border p-4 text-center">
                  <div className="text-primary text-3xl font-bold">30%</div>
                  <p className="text-muted-foreground text-sm">
                    Faster Project Delivery
                  </p>
                </div>
              </div>
              <div className="bg-muted/40 mt-6 rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src="https://images.unsplash.com/photo-1560179304-6fc1d8749b23?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3"
                      alt="TechNova company logo"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span className="font-medium">TechNova</span>
                  </div>
                  <Badge variant="outline" className="bg-card">
                    SaaS
                  </Badge>
                </div>
                <div className="text-muted-foreground mt-2 text-xs">
                  <span className="font-medium">Industry:</span> Technology
                  <span className="mx-2">•</span>
                  <span className="font-medium">Team size:</span> 120+
                  <span className="mx-2">•</span>
                  <span className="font-medium">Region:</span> Global
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Case Study CTA Section */}
    </>
  );
}

```
