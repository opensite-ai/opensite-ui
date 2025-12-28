```tsx
import { cn } from "@/lib/utils";

interface CaseStudies1Props {
  className?: string;
}

const CaseStudies1 = ({ className }: CaseStudies1Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto grid max-w-2xl gap-6 lg:max-w-5xl lg:grid-cols-2">
          <a
            href="#"
            className="group relative row-span-2 flex aspect-square h-full flex-col justify-between overflow-hidden rounded-2xl p-6 shadow-md lg:aspect-auto lg:p-10"
          >
            <img
              src="https://images.unsplash.com/photo-1623496258831-091279081ac5?q=80&w=2021&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="placeholder"
              className="absolute inset-0 h-full w-full rounded-2xl object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 to-black/10"></div>
            <img
              src="https://cdn.ing/assets/files/record/286213/u1qta7tzk0yo7ij8hp84xh1lty3n"
              alt="logo"
              className="isolate h-7 w-fit"
            />
            <h2 className="isolate max-w-sm text-lg font-semibold text-white lg:text-xl lg:font-semibold">
              Discover how our solutions drive business growth
            </h2>
          </a>
          <a
            href="#"
            className="group relative flex aspect-3/2 h-full flex-col justify-between overflow-hidden rounded-2xl p-6 shadow-md md:aspect-2/1 lg:p-10"
          >
            <img
              src="https://images.unsplash.com/photo-1572733438515-8f143a854f72?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="placeholder"
              className="absolute inset-0 h-full w-full rounded-2xl object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 to-black/10"></div>
            <img
              src="https://cdn.ing/assets/files/record/286221/9o1roljuhclobrrmtcfz3o7ptppp"
              alt="logo"
              className="isolate h-9 w-fit"
            />
            <h2 className="isolate max-w-sm text-lg font-semibold text-white lg:text-xl lg:font-semibold">
              Learn how our platform enhances business performance
            </h2>
          </a>
          <a
            href="#"
            className="group relative flex aspect-3/2 h-full flex-col justify-between overflow-hidden rounded-2xl p-6 shadow-md md:aspect-2/1 lg:p-10"
          >
            <img
              src="https://images.unsplash.com/photo-1648665336208-def77a1ec189?q=80&w=2022&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="placeholder"
              className="absolute inset-0 h-full w-full rounded-2xl object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 to-black/10"></div>
            <img
              src="https://cdn.ing/assets/files/record/286220/t34kymqu5g9xr85o89cji3kfuypb"
              alt="logo"
              className="isolate h-8 w-fit"
            />
            <h2 className="isolate max-w-sm text-lg font-semibold text-white lg:text-xl lg:font-semibold">
              Discover how our tools empower your business for the future
            </h2>
          </a>
          <a
            href="#"
            className="group relative flex aspect-3/2 h-full flex-col justify-between overflow-hidden rounded-2xl p-6 shadow-md md:aspect-2/1 lg:p-10"
          >
            <img
              src="https://images.unsplash.com/photo-1648665336176-7cb286e77d63?q=80&w=2022&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="placeholder"
              className="absolute inset-0 h-full w-full rounded-2xl object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 to-black/10"></div>
            <img
              src="https://cdn.ing/assets/files/record/286219/xflgk6oshkxpx4ku0rowz33ey6pi"
              alt="logo"
              className="isolate h-7 w-fit"
            />
            <h2 className="isolate max-w-sm text-lg font-semibold text-white lg:text-xl lg:font-semibold">
              Explore how our services can benefit your business
            </h2>
          </a>
          <a
            href="#"
            className="group relative row-span-2 flex aspect-square h-full flex-col justify-between overflow-hidden rounded-2xl p-6 shadow-md lg:aspect-auto lg:p-10"
          >
            <img
              src="https://images.unsplash.com/photo-1647418413367-5ef9301153d9?q=80&w=2021&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="placeholder"
              className="absolute inset-0 h-full w-full rounded-2xl object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 to-black/10"></div>
            <img
              src="https://cdn.ing/assets/files/record/286218/ew5ms7l6bv8i04759jw82uyub0sp"
              alt="logo"
              className="isolate h-6 w-fit"
            />
            <h2 className="isolate max-w-sm text-lg font-semibold text-white lg:text-xl lg:font-semibold">
              See how our offerings boost your success in business
            </h2>
          </a>
          <a
            href="#"
            className="group relative flex aspect-3/2 h-full flex-col justify-between overflow-hidden rounded-2xl p-6 shadow-md md:aspect-2/1 lg:p-10"
          >
            <img
              src="https://images.unsplash.com/photo-1647517649469-ba454dc72896?q=80&w=2021&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="placeholder"
              className="absolute inset-0 h-full w-full rounded-2xl object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 to-black/10"></div>
            <img
              src="https://cdn.ing/assets/files/record/286217/zvgufvfrljos9ygzttuz01584m5r"
              alt="logo"
              className="isolate h-8 w-fit"
            />
            <h2 className="isolate max-w-sm text-lg font-semibold text-white lg:text-xl lg:font-semibold">
              Learn how our services can elevate your success in business growth
            </h2>
          </a>
        </div>
      </div>
    </section>
  );
};

export { CaseStudies1 };

```

```tsx
import { cn } from "@/lib/utils";

import { Separator } from "@/components/ui/separator";

interface CaseStudies2Props {
  className?: string;
}

const CaseStudies2 = ({ className }: CaseStudies2Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col gap-6 text-center">
          <p className="font-medium">4500+ Satisfied Customers</p>
          <h2 className="text-4xl font-medium md:text-5xl">
            Real results from real users
          </h2>
        </div>
        <div className="mt-20">
          <div className="grid gap-16 lg:grid-cols-3 xl:gap-24">
            <div className="flex flex-col gap-10 border-border sm:flex-row lg:col-span-2 lg:border-r lg:pr-16 xl:pr-24">
              <img
                src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
                alt="placeholder"
                className="aspect-29/35 h-full w-full max-w-60 rounded-2xl object-cover"
              />
              <div className="flex h-full flex-col justify-between gap-10">
                <q className="sm:text-xl">
                  This productivity tool transformed how we collaborate. Our
                  team's workflow improved dramatically, and we've cut meeting
                  time by half while increasing output.
                </q>
                <div className="flex items-end gap-6">
                  <div className="flex flex-col gap-1">
                    <p className="text-lg font-semibold text-primary">
                      Michael Rivera
                    </p>
                    <p className="text-muted-foreground">Product Director</p>
                  </div>
                  <img
                    src="https://cdn.ing/assets/files/record/286216/bw4zypgflisdtapxy0n4nbmsmtum"
                    alt="logo"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-10 self-center lg:flex-col">
              <div className="flex flex-col gap-2">
                <p className="text-4xl font-medium text-primary sm:text-5xl">
                  98%
                </p>
                <p className="font-semibold text-primary">
                  Customer Satisfaction
                </p>
                <p className="text-muted-foreground">From verified reviews</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-4xl font-medium text-primary sm:text-5xl">
                  3.8x
                </p>
                <p className="font-semibold text-primary">ROI Improvement</p>
                <p className="text-muted-foreground">Within first quarter</p>
              </div>
            </div>
          </div>
          <Separator className="my-20" />
          <div className="grid gap-16 lg:grid-cols-3 xl:gap-24">
            <div className="flex flex-col gap-10 border-border sm:flex-row lg:col-span-2 lg:border-r lg:pr-16 xl:pr-24">
              <img
                src="https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u"
                alt="placeholder"
                className="aspect-29/35 h-full w-full max-w-60 rounded-2xl object-cover"
              />
              <div className="flex h-full flex-col justify-between gap-10">
                <q className="sm:text-xl">
                  The interface is intuitive and customizable to our needs. We
                  implemented it across departments with minimal training and
                  saw immediate results.
                </q>
                <div className="flex items-end gap-6">
                  <div className="flex flex-col gap-1">
                    <p className="text-lg font-semibold text-primary">
                      Sarah Chen
                    </p>
                    <p className="text-muted-foreground">Operations Lead</p>
                  </div>
                  <img
                    src="https://cdn.ing/assets/files/record/286215/6wwi6yh2ax2nuo2vqa5gn9vozrgq"
                    alt="logo"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-10 self-center lg:flex-col">
              <div className="flex flex-col gap-2">
                <p className="text-4xl font-medium text-primary sm:text-5xl">
                  4.2x
                </p>
                <p className="font-semibold text-primary">Team Efficiency</p>
                <p className="text-muted-foreground">
                  Proven productivity gains
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-4xl font-medium text-primary sm:text-5xl">
                  72%
                </p>
                <p className="font-semibold text-primary">Reduced Task Time</p>
                <p className="text-muted-foreground">Across all projects</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { CaseStudies2 };

```

```tsx
import { MoveRight } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

interface CaseStudyItem {
  logo: string;
  company: string;
  tags: string;
  title: string;
  subtitle: string;
  image: string;
  link?: string;
}

interface CaseStudies3Props {
  featuredCasestudy?: CaseStudyItem;
  casestudies?: CaseStudyItem[];
  className?: string;
}

const defaultFeaturedCasestudy: CaseStudyItem = {
  logo: "https://cdn.ing/assets/files/record/286209/4nowqz6c7v6vhzldvh9qdnhmkrwb",
  company: "Acme",
  tags: "ARTIFICIAL INTELLIGENCE / ENTERPRISE SOLUTIONS",
  title: "Workflow Automation for the Digital Age.",
  subtitle: "How to automate your workflow with AI.",
  image: "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
  link: "https://shadcnblocks.com",
};

const defaultCasestudies: CaseStudyItem[] = [
  {
    logo: "https://cdn.ing/assets/files/record/286208/nay46vdmppxuznd7eg5jnnf4qjv5",
    company: "Super",
    tags: "DATA MIGRATION / SOFTWARE SOLUTIONS",
    title: "Enhance data migration with AI.",
    subtitle: "A data migration platform toward a data-driven future.",
    image: "",
    link: "https://shadcnblocks.com",
  },
  {
    logo: "https://cdn.ing/assets/files/record/286214/pn9v9zz0de8jgz2mf8o1c11k8gxh",
    company: "Advent",
    tags: "ARTIFICIAL INTELLIGENCE / DATA SOLUTIONS",
    title: "Strategic AI for a future-proof business.",
    subtitle: "Mastering AI for more efficient operations.",
    image: "",
    link: "https://shadcnblocks.com",
  },
];

const CaseStudies3 = ({
  featuredCasestudy = defaultFeaturedCasestudy,
  casestudies = defaultCasestudies,
  className,
}: CaseStudies3Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="border border-border">
          <a
            href={featuredCasestudy.link || "#"}
            className="group grid gap-4 overflow-hidden px-6 transition-colors duration-500 ease-out hover:bg-muted/40 lg:grid-cols-2 xl:px-28"
          >
            <div className="flex flex-col justify-between gap-4 pt-8 md:pt-16 lg:pb-16">
              <div className="flex items-center gap-2 text-2xl font-medium">
                <img src={featuredCasestudy.logo} alt="logo" className="h-9" />
                {featuredCasestudy.company}
              </div>
              <div>
                <span className="text-xs text-muted-foreground sm:text-sm">
                  {featuredCasestudy.tags}
                </span>
                <h2 className="mt-4 mb-5 text-2xl font-semibold text-balance sm:text-3xl sm:leading-10">
                  {featuredCasestudy.title}
                  <span className="font-medium text-primary/50 transition-colors duration-500 ease-out group-hover:text-primary/70">
                    {" "}
                    {featuredCasestudy.subtitle}
                  </span>
                </h2>
                <div className="flex items-center gap-2 font-medium">
                  Read case study
                  <MoveRight className="h-4 w-4 transition-transform duration-500 ease-out group-hover:translate-x-1" />
                </div>
              </div>
            </div>
            <div className="relative isolate py-16">
              <div className="relative isolate h-full border border-border bg-background p-2">
                <div className="h-full overflow-hidden">
                  <img
                    src={featuredCasestudy.image}
                    alt="placeholder"
                    className="aspect-14/9 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </a>
          <div className="flex border-t border-border">
            <div className="hidden w-28 shrink-0 bg-[radial-gradient(var(--muted-foreground)_1px,transparent_1px)] [background-size:10px_10px] opacity-15 xl:block"></div>
            <div className="grid lg:grid-cols-2">
              {casestudies.map((item, idx) => (
                <a
                  key={item.company}
                  href={item.link || "#"}
                  className={`group flex flex-col justify-between gap-12 border-border bg-background px-6 py-8 transition-colors duration-500 ease-out hover:bg-muted/40 md:py-16 lg:pb-16 xl:gap-16 ${
                    idx === 0
                      ? "xl:border-l xl:pl-8"
                      : "border-t lg:border-t-0 lg:border-l xl:border-r xl:pl-8"
                  }`}
                >
                  <div className="flex items-center gap-2 text-2xl font-medium">
                    <img src={item.logo} alt="logo" className="h-9" />
                    {item.company}
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground sm:text-sm">
                      {item.tags}
                    </span>
                    <h2 className="mt-4 mb-5 text-2xl font-semibold text-balance sm:text-3xl sm:leading-10">
                      {item.title}
                      <span className="font-medium text-primary/50 transition-colors duration-500 ease-out group-hover:text-primary/70">
                        {" "}
                        {item.subtitle}
                      </span>
                    </h2>
                    <div className="flex items-center gap-2 font-medium">
                      Read case study
                      <MoveRight className="h-4 w-4 transition-transform duration-500 ease-out group-hover:translate-x-1" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
            <div className="hidden w-28 shrink-0 bg-[radial-gradient(var(--muted-foreground)_1px,transparent_1px)] [background-size:10px_10px] opacity-15 xl:block"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { CaseStudies3 };

```

```tsx
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const CUSTOMER_DATA = {
  company: {
    logo: "https://cdn.ing/assets/files/record/286231/otqj8cnwnrtp3bdk6tfu0pdr1z5a",
    name: "",
  },
  stats: [
    {
      number: "45%",
      text: "improvement in onboarding completion",
    },
    {
      number: "61%",
      text: "reduction in time-to-value",
    },
    {
      number: "3x",
      text: "increase in user activation",
    },
  ],
  author: {
    name: "Sarah Williams",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
    role: "CTO, monzo",
  },
  title: "How We Optimized Our Onboarding Flow to Triple User Activation",
  summary:
    "Learn how we revamped our product onboarding experience using our in-house toolkit and reduced time-to-value by over 60%.",
  link: "#",
};

interface AuthorProps {
  image: string;
  name: string;
  role: string;
}

const Author = ({ image, name, role }: AuthorProps) => {
  return (
    <div className="flex items-center gap-2.5">
      <Avatar className="size-10 rounded-[.5rem] border bg-background">
        <AvatarImage src={image} alt={name} />
        <AvatarFallback>{name}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-0.5">
        <div className="text-sm leading-normal font-medium">{name}</div>
        <div className="text-sm leading-normal font-medium">{role}</div>
      </div>
    </div>
  );
};

interface CaseStudies4Props {
  className?: string;
}

const CaseStudies4 = ({ className }: CaseStudies4Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex w-full flex-col items-stretch justify-between gap-10 rounded-[.5rem] bg-muted p-10 lg:flex-row">
          <div className="flex w-full max-w-[30rem] flex-col gap-10 rounded-[.5rem] bg-background p-5">
            <div className="max-w-[4.875rem]">
              <img
                src={CUSTOMER_DATA.company.logo}
                alt={CUSTOMER_DATA.company.name}
                className="block size-full object-contain object-center"
              />
            </div>
            <div className="flex w-full flex-col gap-8 sm:flex-row">
              {CUSTOMER_DATA.stats.map((item, i) => (
                <div
                  className="flex flex-col gap-1"
                  key={`stats-use-case-${i}`}
                >
                  <div className="text-xl font-semibold">{item.number}</div>
                  <div className="text-sm font-medium text-muted-foreground">
                    {item.text}
                  </div>
                </div>
              ))}
            </div>
            <Author {...CUSTOMER_DATA.author} />
          </div>
          <div className="flex max-w-[32rem] flex-col gap-5">
            <h2 className="text-2xl leading-none font-bold md:text-3xl lg:text-4xl">
              {CUSTOMER_DATA.title}
            </h2>
            <p className="text-base font-medium text-foreground">
              {CUSTOMER_DATA.summary}
            </p>
            <div className="shrink-0">
              <Button asChild variant="outline" size="sm">
                <a href={CUSTOMER_DATA.link}>
                  Read Story
                  <ArrowRight />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { CaseStudies4 };

```
