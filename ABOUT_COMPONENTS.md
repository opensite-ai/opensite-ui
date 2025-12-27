```tsx
import { CircleArrowRight, Files, Settings } from "lucide-react";

import { cn } from "@/lib/utils";

interface About1Props {
  className?: string;
}

const About1 = ({ className }: About1Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container flex flex-col gap-16 lg:gap-28">
        <div className="flex flex-col gap-4 lg:gap-8">
          <h1 className="text-4xl font-semibold tracking-tighter lg:text-7xl">
            About Us
          </h1>
          <p className="max-w-xl text-xl">
            Shadcnblocks.com makes it easy to build customer portals, CRMs,
            internal tools, and other business applications for your team. In
            minutes, not months.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
            alt="placeholder"
            className="size-full max-h-96 rounded-2xl object-cover"
          />
          <div className="flex flex-col justify-between gap-10 rounded-2xl bg-muted bg-[url('https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/christin-hume-Hcfwew744z4-unsplash.jpg')] bg-cover bg-center p-10">
            <p className="text-sm font-semibold text-white">OUR MISSION</p>
            <p className="text-lg font-medium text-white">
              We believe that building software should be insanely easy. That
              everyone should have the freedom to create the tools they need,
              without any developers, designers or drama.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-6 md:gap-20">
          <div className="max-w-xl">
            <h2 className="mb-4 text-3xl font-semibold tracking-tight md:text-5xl">
              We make creating software easy.
            </h2>
            <p className="text-lg text-muted-foreground">
              We aim to help empower 1,000,000 teams to create their own
              software. Here is how we plan on doing it.
            </p>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            <div className="flex flex-col">
              <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                <Files className="size-5" />
              </div>
              <h3 className="mt-2 mb-3 text-lg font-semibold">
                Being radically open
              </h3>
              <p className="text-muted-foreground">
                We believe there’s no room for big egos and there’s always time
                to help each other. We strive to give and receive feedback,
                ideas, perspectives
              </p>
            </div>
            <div className="flex flex-col">
              <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                <CircleArrowRight className="size-5" />
              </div>
              <h3 className="mt-2 mb-3 text-lg font-semibold">
                Moving the needle
              </h3>
              <p className="text-muted-foreground">
                Boldly, bravely and with clear aims. We seek out the big
                opportunities and double down on the most important things to
                work on.
              </p>
            </div>
            <div className="flex flex-col">
              <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                <Settings className="size-5" />
              </div>
              <h3 className="mt-2 mb-3 text-lg font-semibold">
                Optimizing for empowerment
              </h3>
              <p className="text-muted-foreground">
                We believe that everyone should be empowered to do whatever they
                think is in the company&apos;s best interests.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { About1 };

```

```tsx
import { cn } from "@/lib/utils";

interface About2Props {
  className?: string;
}

const About2 = ({ className }: About2Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="flex flex-col gap-28">
        <div className="container flex flex-col gap-10 text-center md:gap-24">
          <div className="mx-auto flex max-w-3xl flex-col gap-6">
            <h1 className="text-4xl font-medium md:text-6xl">Our Background</h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Discover how our solution simplifies complex processes, making it
              easier to manage key operations and deliver exceptional
              experiences.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-12">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
              alt="placeholder"
              className="size-full max-h-96 rounded-xl object-cover md:col-span-5"
            />
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg"
              alt="placeholder"
              className="size-full max-h-96 rounded-xl object-cover md:col-span-4"
            />
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg"
              alt="placeholder"
              className="size-full max-h-96 rounded-xl object-cover md:col-span-3"
            />
          </div>
        </div>
        <div className="container flex flex-col gap-16">
          <h2 className="max-w-3xl text-4xl font-medium md:text-5xl">
            We excel in our field, but skill isn&apos;t everything we offer.
          </h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
            <div className="flex flex-col gap-6 border-b pb-8">
              <p className="text-4xl font-medium md:text-5xl">21M</p>
              <p className="text-muted-foreground">Global Reach of Users</p>
            </div>
            <div className="flex flex-col gap-6 border-b pb-8">
              <p className="text-4xl font-medium md:text-5xl">12+</p>
              <p className="text-muted-foreground">Years of Expertise</p>
            </div>
            <div className="flex flex-col gap-6 border-b pb-8">
              <p className="text-4xl font-medium md:text-5xl">654</p>
              <p className="text-muted-foreground">Projects Completed</p>
            </div>
            <div className="flex flex-col gap-6 border-b pb-8">
              <p className="text-4xl font-medium md:text-5xl">113k+</p>
              <p className="text-muted-foreground">Monthly Active Users</p>
            </div>
            <div className="flex flex-col gap-6 border-b pb-8">
              <p className="text-4xl font-medium md:text-5xl">461k</p>
              <p className="text-muted-foreground">Registered Accounts</p>
            </div>
            <div className="flex flex-col gap-6 border-b pb-8">
              <p className="text-4xl font-medium md:text-5xl">98+</p>
              <p className="text-muted-foreground">Daily Users</p>
            </div>
          </div>
        </div>
        <div className="bg-muted/50 py-24">
          <div className="container flex flex-col items-center gap-11">
            <p className="text-center text-xl font-medium">
              Trusted by leading product teams worldwide.
            </p>
            <div className="grid grid-cols-2 gap-x-7 gap-y-12 lg:grid-cols-4">
              <div className="flex items-center gap-3">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg"
                  alt="logo"
                  className="h-8 w-auto md:h-14"
                />
                <p className="text-xl font-semibold md:text-4xl">Acme</p>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-2.svg"
                  alt="logo"
                  className="h-8 w-auto md:h-14"
                />
                <p className="text-xl font-semibold md:text-4xl">Creative</p>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-3.svg"
                  alt="logo"
                  className="h-8 w-auto md:h-14"
                />
                <p className="text-xl font-semibold md:text-4xl">Octan</p>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-4.svg"
                  alt="logo"
                  className="h-8 w-auto md:h-14"
                />
                <p className="text-xl font-semibold md:text-4xl">Newco</p>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-5.svg"
                  alt="logo"
                  className="h-8 w-auto md:h-14"
                />
                <p className="text-xl font-semibold md:text-4xl">Contoso</p>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-6.svg"
                  alt="logo"
                  className="h-8 w-auto md:h-14"
                />
                <p className="text-xl font-semibold md:text-4xl">Fabrikam</p>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg"
                  alt="logo"
                  className="h-8 w-auto md:h-14"
                />
                <p className="text-xl font-semibold md:text-4xl">Litware</p>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-2.svg"
                  alt="logo"
                  className="h-8 w-auto md:h-14"
                />
                <p className="text-xl font-semibold md:text-4xl">Northwind</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container flex flex-col items-center gap-14">
          <h2 className="text-center text-4xl font-semibold md:text-5xl">
            See the Benefits Firsthand
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="grid grid-cols-1 gap-6 md:col-span-2 md:grid-cols-2 md:flex-row lg:col-span-1 lg:grid-cols-1 lg:flex-col">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg"
                alt="placeholder"
                className="max-h-96 w-full rounded-xl object-cover"
              />
              <div className="flex flex-col justify-center rounded-xl bg-muted p-8">
                <p className="mb-2 text-4xl font-medium">21M</p>
                <p className="mb-6 font-semibold">Global Users</p>
                <p className="text-muted-foreground">
                  Streamline tasks and boost efficiency by up to 80% using our
                  tools.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                alt="placeholder"
                className="h-full rounded-xl object-cover"
              />
              <div className="absolute right-6 bottom-6 left-6 rounded-xl bg-background p-4">
                <div className="mb-4 flex items-center gap-2">
                  <img
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg"
                    alt="placeholder"
                    className="h-7 w-auto"
                  />
                  <span className="text-lg font-semibold">Acme.</span>
                </div>
                <p className="mb-6 text-sm">
                  Our solution helps you reduce costs by half with improved
                  operations.
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="font-medium">John Doe,</span>
                  <span className="text-sm text-muted-foreground">
                    CEO at Acme.
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="rounded-xl bg-muted p-8">
                <p className="mb-2 text-4xl font-medium">97%</p>
                <p className="mb-6 font-semibold">Minimized Errors</p>
                <p className="text-muted-foreground">
                  Achieve greater accuracy and efficiency with our advanced
                  toolkit.
                </p>
              </div>
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg"
                alt="placeholder"
                className="max-h-96 rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { About2 };

```

```tsx
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface About3Props {
  className?: string;
  title: string;
  description?: string;
  mainImage: {
    src: string;
    alt: string;
  };
  secondaryImage: {
    src: string;
    alt: string;
  };
  breakout: {
    src?: string;
    alt?: string;
    title: string;
    description: string;
    buttonText?: string;
    buttonUrl?: string;
  };
  companiesTitle?: string;
  companies?: Array<{
    src: string;
    alt: string;
  }> | null;
  achievementsTitle?: string;
  achievementsDescription?: string;
  achievements?: Array<{
    label: string;
    value: string;
  }>;
}

const About3 = ({ className, ...props }: About3Props) => {
  const {
    title,
    description,
    mainImage,
    secondaryImage,
    breakout,
    companiesTitle,
    companies,
    achievementsTitle,
    achievementsDescription,
    achievements,
  } = { ...defaultProps, ...props };
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mb-14 grid gap-5 text-center md:grid-cols-2 md:text-left">
          <h1 className="text-5xl font-semibold">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div className="grid gap-7 lg:grid-cols-3">
          <img
            src={mainImage.src}
            alt={mainImage.alt}
            className="size-full max-h-[620px] rounded-xl object-cover lg:col-span-2"
          />
          <div className="flex flex-col gap-7 md:flex-row lg:flex-col">
            <div className="flex flex-col justify-between gap-6 rounded-xl bg-muted p-7 md:w-1/2 lg:w-auto">
              <img
                src={breakout.src}
                alt={breakout.alt}
                className="mr-auto h-12 dark:invert"
              />
              <div>
                <p className="mb-2 text-lg font-semibold">{breakout.title}</p>
                <p className="text-muted-foreground">{breakout.description}</p>
              </div>
              <Button variant="outline" className="mr-auto" asChild>
                <a href={breakout.buttonUrl} target="_blank">
                  {breakout.buttonText}
                </a>
              </Button>
            </div>
            <img
              src={secondaryImage.src}
              alt={secondaryImage.alt}
              className="grow basis-0 rounded-xl object-cover md:w-1/2 lg:min-h-0 lg:w-auto"
            />
          </div>
        </div>
        {companies && (
          <div className="py-32">
            <p className="text-center">{companiesTitle} </p>
            <div className="mt-8 flex flex-wrap justify-center gap-8">
              {companies.map((company, idx) => (
                <div
                  className="flex items-center gap-3"
                  key={company.src + idx}
                >
                  <img
                    src={company.src}
                    alt={company.alt}
                    className="h-6 w-auto md:h-8 dark:invert"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="relative overflow-hidden rounded-xl bg-muted p-7 md:p-16">
          <div className="flex flex-col gap-4 text-center md:text-left">
            <h2 className="text-3xl font-semibold md:text-4xl">
              {achievementsTitle}
            </h2>
            <p className="max-w-xl text-muted-foreground">
              {achievementsDescription}
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 text-center lg:grid-cols-4">
            {achievements.map((item, idx) => (
              <div className="flex flex-col gap-2" key={item.label + idx}>
                <span className="text-4xl font-semibold md:text-5xl">
                  {item.value}
                </span>
                <p className="text-sm md:text-base">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { About3 };

const defaultCompanies = [
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-1.svg",
    alt: "Arc",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-2.svg",
    alt: "Descript",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-3.svg",
    alt: "Mercury",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-4.svg",
    alt: "Ramp",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-5.svg",
    alt: "Retool",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-6.svg",
    alt: "Watershed",
  },
];

const defaultAchievements = [
  { label: "Companies ", value: "300+" },
  { label: "Projects Finalized", value: "800+" },
  { label: "Happy Customers", value: "99%" },
  { label: "Recognized Awards", value: "10+" },
];

const defaultProps = {
  title: "About Us",
  description:
    "Shadcnblocks is a passionate team dedicated to creating innovative solutions that empower businesses to thrive in the digital age.",
  mainImage: {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
    alt: "placeholder",
  },
  secondaryImage: {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
    alt: "placeholder",
  },
  breakout: {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg",
    alt: "logo",
    title: "Hundreds of blocks at Shadcnblocks.com",
    description:
      "Providing businesses with effective tools to improve workflows, boost efficiency, and encourage growth.",
    buttonText: "Discover more",
    buttonUrl: "https://shadcnblocks.com",
  },
  companiesTitle: "Valued by clients worldwide",
  companies: defaultCompanies,
  achievementsTitle: "Our Achievements in Numbers",
  achievementsDescription:
    "Providing businesses with effective tools to improve workflows, boost efficiency, and encourage growth.",
  achievements: defaultAchievements,
};

```

```tsx
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface About4Props {
  className?: string;
}

const About4 = ({ className }: About4Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto flex max-w-3xl flex-col gap-8 pb-28 text-center">
          <h1 className="text-4xl font-semibold md:text-7xl">About Us</h1>
          <p className="text-xl font-medium text-muted-foreground">
            Meet our team, discover our values, and learn how we balance work,
            life, and everything in between.
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
            alt="placeholder"
            className="max-h-80 w-full object-cover"
          />
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg"
            alt="placeholder"
            className="max-h-80 w-full object-cover"
          />
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg"
            alt="placeholder"
            className="max-h-80 w-full object-cover"
          />
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg"
            alt="placeholder"
            className="max-h-80 w-full object-cover"
          />
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-5.svg"
            alt="placeholder"
            className="max-h-80 w-full object-cover"
          />
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-6.svg"
            alt="placeholder"
            className="max-h-80 w-full object-cover"
          />
        </div>
        <div className="mx-auto grid max-w-5xl gap-28 py-28 md:grid-cols-2">
          <div>
            <h2 className="mb-5 text-4xl font-semibold">Our Vision</h2>
            <p className="text-xl leading-8 font-medium text-muted-foreground">
              For years, the process of building custom software has remained
              challenging. Today, visual builders exist, but tailored solutions
              still require technical expertise and a lot of time. This is a
              problem for businesses and individuals alike.
              <br />
              <br />
              What if you could create custom software without writing a single
              line of code? What if you could build your own tools.
              <br />
              <br />
              With our platform, you can! Our tools let you design layouts and
              create functionality—all without needing to code.
              <br />
              <br />
              We believe that everyone should be able to build their own
              solutions, regardless of their technical background.
            </p>
          </div>
          <div>
            <h2 className="mb-5 text-4xl font-semibold">Our Creators</h2>
            <p className="text-xl leading-8 font-medium text-muted-foreground">
              <a href="#" className="mr-1 underline">
                Our Company
              </a>
              has been building web tools for over a decade, focusing on
              efficiency and user control in every project. We know that the
              best solutions are the ones that you can create yourself.
              <br />
              <br />
              We initially developed these solutions for our own team, and now
              everyone can benefit from them too. We are proud to offer a
              platform that is accessible to all, regardless of technical
              expertise.
              <br />
              <br />
              Our team is made up of talented individuals who are passionate
              about creating tools that empower users to build their own
              solutions with ease. We are dedicated to helping you achieve your
              goals, and we can’t wait to see what you create!
            </p>
          </div>
        </div>
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-8 rounded-2xl bg-muted/50 p-14 text-center md:flex-row md:text-left">
          <h3 className="text-3xl font-semibold">
            Part of
            <br />
            Our Global Team
          </h3>
          <Button size="lg">Get to know the team</Button>
        </div>
      </div>
    </section>
  );
};

export { About4 };

```

```tsx
import { cn } from "@/lib/utils";

interface About5Props {
  className?: string;
}

const About5 = ({ className }: About5Props) => {
  return (
    <section className={cn("bg-muted py-32 dark:bg-background", className)}>
      <div className="container">
        <div className="grid gap-14 pb-32 md:grid-cols-2">
          <div>
            <p className="text-sm font-medium">ABOUT US</p>
            <h1 className="mt-4 text-3xl font-medium md:text-4xl">
              Simplifying Complex Workflows with Developer-Focused Solutions
            </h1>
          </div>
          <p className="md:text-lg">
            Our platform provides intuitive solutions for managing and scaling
            projects. We offer seamless integrations, clear abstractions, and
            powerful tools to enhance developer productivity and collaboration
            across teams of all sizes and experience levels.
          </p>
        </div>
        <img
          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg"
          alt="placeholder"
          className="ml-auto aspect-video max-h-[550px] rounded-xl object-cover"
        />
        <p className="mt-6 text-center text-xl lg:text-right">
          Committed to removing complexity from development processes
        </p>
        <div className="flex flex-col justify-between gap-14 py-40 lg:flex-row">
          <p className="mx-auto max-w-xl text-center text-2xl lg:mx-0 lg:text-left">
            We are a team of passionate developers, designers, and
            entrepreneurs.
          </p>
          <div className="grid shrink-0 grid-cols-2 items-center gap-6 md:grid-cols-4">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/vercel-wordmark.svg"
              alt="logo"
              className="mx-auto max-h-6 md:mx-0 dark:invert"
            />
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcn-ui-wordmark.svg"
              alt="logo"
              className="mx-auto max-h-9 md:mx-0 dark:invert"
            />
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/tailwind-wordmark-light.svg"
              alt="logo"
              className="mx-auto max-h-7 md:mx-0 md:max-h-9 dark:hidden"
            />
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/tailwind-wordmark-dark.svg"
              alt="logo"
              className="mx-auto hidden max-h-7 md:mx-0 md:max-h-9 dark:block"
            />
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/supabase-wordmark.svg"
              alt="logo"
              className="mx-auto max-h-9 md:mx-0 dark:hidden"
            />
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/supabase-wordmark-dark.svg"
              alt="logo"
              className="mx-auto hidden max-h-9 md:mx-0 dark:block"
            />
          </div>
        </div>
        <div className="grid gap-14 lg:grid-cols-4 xl:grid-cols-5">
          <div className="md:col-span-2 xl:col-span-3">
            <h2 className="mb-10 text-4xl font-medium">Why We Began</h2>
            <p className="text-lg">
              We&apos;ve seen firsthand the challenges developers face with
              complex infrastructures. Instead of redoing the same work, we
              wanted to create a system that simplifies the entire workflow from
              start to finish and allows developers to focus on what they do
              best. Our platform is designed to help teams collaborate and scale
              projects efficiently.
              <br />
              <br />
              Our mission is to provide developers with the tools they need to
              build and scale projects efficiently. We believe that by removing
              the barriers to entry.
              <br />
              <br />
              collaboration and productivity, we can help teams focus on what
              they do best: creating amazing products.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-6 text-center">
              <div className="flex flex-col items-center justify-center gap-2 rounded-xl border bg-background bg-card p-6">
                <span className="text-2xl md:text-4xl">2024</span>
                <span className="text-sm text-muted-foreground md:text-lg">
                  Launched
                </span>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 rounded-xl border bg-background bg-card p-6">
                <span className="text-2xl md:text-4xl">$2.2M</span>
                <span className="text-sm text-muted-foreground md:text-lg">
                  Pre-Seed Round
                </span>
              </div>
            </div>
          </div>
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg"
            alt="placeholder"
            className="rounded-xl md:col-span-2"
          />
        </div>
      </div>
    </section>
  );
};

export { About5 };

```

```tsx
import { cn } from "@/lib/utils";

interface About6Props {
  className?: string;
}

const About6 = ({ className }: About6Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col items-center justify-start gap-6 lg:flex-row">
          <div className="flex w-full flex-col items-start justify-start gap-24 lg:w-1/2">
            <div className="pr-6">
              <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:mb-10 lg:text-6xl">
                Our Story
              </h1>
              <p className="mb-9 lg:text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
                alias repellendus perferendis earum facilis est soluta
                consequatur placeat hic aliquid exercitationem, ex molestias nam
                veniam distinctio maxime culpa magnam autem.
              </p>
              <p className="text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Similique dolore quas placeat expedita aliquam rerum tempore
                amet, sequi ipsa ad quam, adipisci exercitationem nihil,
                sapiente laborum minus doloribus consequuntur sed. Quo
                repudiandae nihil quas voluptates, aut beatae reiciendis aliquid
                perspiciatis quae explicabo inventore temporibus laborum,
                nostrum omnis quos excepturi dolorum reprehenderit vel labore
                eaque libero perferendis? Qui illo numquam beatae?
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/annie-spratt-MChSQHxGZrQ-unsplash.jpg"
                alt="about 1"
                className="aspect-[0.7] w-full rounded-lg object-cover md:w-1/2"
              />
              <div className="flex w-full flex-col items-center justify-center gap-6 md:w-1/2">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/annie-spratt-AkftcHujUmk-unsplash.jpg"
                  alt="about 2"
                  className="aspect-[1.1] rounded-lg object-cover"
                />
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/annie-spratt-vGgn0xLdy8s-unsplash.jpg"
                  alt="about 3"
                  className="aspect-[0.7] rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-12 pt-12 lg:w-1/2 lg:pt-48">
            <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/johnson-wang-iI4sR_nkkbc-unsplash.jpg"
                alt="about 4"
                className="aspect-[0.9] w-full rounded-lg object-cover md:w-1/2"
              />
              <div className="flex w-full flex-col items-center justify-center gap-6 md:w-1/2">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/nastuh-abootalebi-eHD8Y1Znfpk-unsplash.jpg"
                  alt="about 5"
                  className="aspect-[0.8] rounded-lg object-cover"
                />
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/alvin-engler-bIhpiQA009k-unsplash.jpg"
                  alt="about 6"
                  className="aspect-[0.9] rounded-lg object-cover"
                />
              </div>
            </div>
            <div className="px-8">
              <h1 className="mb-8 text-2xl font-semibold lg:mb-6">
                Our Workplace
              </h1>
              <p className="mb-9 lg:text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
                quae vel rem tenetur illum aspernatur. Ea, facere soluta cumque
                laboriosam repudiandae quaerat inventore dolores saepe pariatur,
                adipisci atque voluptate doloribus!
              </p>
              <p className="text-muted-foreground">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure
                aliquid laudantium minus distinctio exercitationem odio non
                nihil blanditiis quae, beatae assumenda ad reiciendis soluta
                dolorem. Natus repellendus quidem dolorum temporibus!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { About6 };

```

```tsx
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface About7Props {
  className?: string;
}

const About7 = ({ className }: About7Props) => {
  return (
    <section
      className={cn(
        "bg-mint-[#E9EDE8] dark:bg-mint-[#2F332E] py-32",
        className,
      )}
    >
      <div className="container">
        <div className="max-w-xl lg:translate-x-32">
          <h2 className="mb-4 text-2xl font-semibold text-muted-foreground md:text-3xl">
            About Us
          </h2>

          <h1 className="max-w-[600px] flex-1 text-3xl leading-tight font-semibold tracking-tight text-balance md:text-4xl lg:text-5xl">
            We&apos;re Streamline. We&apos;re a different kind of planning tool
            that enables builders to create the future now.
          </h1>
        </div>

        {/* Large Image Below */}
        <div className="relative mt-12 flex gap-4">
          <div className="max-lg:-translate-x-20">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
              alt="Modern workspace with an iMac displaying 'DO MORE'"
              width={800}
              height={500}
            />
          </div>
          {/* Right Column - Image */}
          <div className="border-mint-50 -right-10 bottom-0 aspect-[1.5/1.4] w-[max(30vw,220px)] translate-y-20 max-lg:absolute max-lg:border-[16px] lg:-translate-y-20">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg"
              alt="Person working on a laptop"
              className="object-cover"
            />
          </div>
        </div>

        {/* Text Below Image */}
        <div className="mt-28 max-w-xl lg:mt-10 lg:translate-x-32">
          <p className="text-lg">
            Tasks have changed, are changing, and will continue to change — for
            the better. Now is the time for productivity to be user-first and
            internet-first. But in order to do this — it needs a new foundation.
          </p>
        </div>

        <div className="mt-6 space-y-6 md:mt-8 md:space-y-8 lg:mt-10 lg:space-y-10">
          {/* Dynamic System Section */}
          <h2 className="max-w-xl text-2xl font-semibold md:text-3xl lg:translate-x-32">
            We were always told that to-do apps can&apos;t be dynamic systems.
          </h2>
          <p className="max-w-xl text-lg lg:translate-x-32">
            Everyone tried fixing the problem by adding features, integrations,
            and layers of complexity. We have spent our careers using,
            designing, and rethinking tools like Trello, Notion, and Asana,
            encountering this problem firsthand. The existing solutions
            don&apos;t work. We believe a to-do app needs to be a dynamic
            system. But we had to start from ground zero.
          </p>
          <div className="grid gap-6 py-6 md:grid-cols-2 lg:py-10">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg"
              alt="Team members collaborating"
              width={600}
              height={400}
              className="rounded-lg"
            />
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg"
              alt="Team meeting in a conference room"
              width={600}
              height={400}
              className="rounded-lg"
            />
          </div>

          {/* Timeline Section */}
          <p className="ml-auto max-w-xl text-lg lg:-translate-x-32">
            We started building Streamline in 2019 and launched in 2022. Every
            single feature has been built from scratch — with no unnecessary
            complexity or outdated tools. We are purpose-built to redefine
            productivity for the next hundred years.
          </p>

          {/* Team Section */}
          <h2 className="ml-auto max-w-xl text-2xl font-semibold md:text-3xl lg:-translate-x-32">
            We are a bit of an unusual team — not your standard tech startup.
          </h2>
          <div className="ml-auto max-w-xl text-lg lg:-translate-x-32">
            <p>
              We are 100% founder and team-owned, sustainable, and we keep our
              team small. Over time, we&apos;ll make this page more polished,
              but right now we&apos;re focused on delivering for our users. If
              you&apos;d
              <br />
              like to collaborate, check out our open roles:
            </p>
            <Button
              variant="outline"
              size="lg"
              className="mt-6 md:mt-8 lg:mt-10"
            >
              <a href="#" className="">
                <span className="flex items-center gap-2 text-start whitespace-pre-wrap">
                  View Open roles
                  <ArrowRight className="size-4" />
                </span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { About7 };

```

```tsx
import React from "react";

import { cn } from "@/lib/utils";

interface About9Props {
  className?: string;
}

const About9 = ({ className }: About9Props) => {
  return (
    <section className={cn("py-16 md:py-32", className)}>
      <div className="container">
        <div className="max-w-6xl">
          <h1 className="mb-6 max-w-4xl text-3xl leading-tight font-medium tracking-tight md:text-4xl">
            Hi, were a team of developers with a passion for building scalable
            and efficient web applications.
          </h1>

          <div className="mb-8 flex justify-center">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/nubelson-fernandes-tAJYoec13xk-unsplash.jpg"
              alt="Team at work"
              className="w-full rounded-sm object-cover"
            />
          </div>

          <div className="mx-auto mb-16 flex w-full max-w-6xl flex-col justify-between gap-12 md:flex-row">
            <div className="text-base font-medium">
              <span className="block text-muted-foreground">
                Full Stack Developer
              </span>
              <span className="font-semibold text-foreground">
                San Francisco CA
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/flags/united-states.png"
                  alt="United States"
                  className="h-4 w-4"
                />
              </span>
            </div>

            <div className="mt-8 w-full md:mt-0 md:w-2/3">
              <p className="font-base w-full text-lg leading-[28px] text-muted-foreground md:w-3/4">
                I am a passionate and innovative Full Stack Developer with over
                6 years of experience in building scalable web applications. My
                journey began with a fascination for problem-solving and a deep
                interest in emerging technologies.
                <br />
                <br />
                Specializing in React, Node.js, and cloud technologies, I've
                helped startups and enterprises build robust digital solutions.
                From e-commerce platforms to SaaS applications, I focus on
                creating user-centric experiences with clean, maintainable code
                architecture.
              </p>

              <div className="mt-12">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/nastuh-abootalebi-eHD8Y1Znfpk-unsplash.jpg"
                  alt="Work environment"
                  className="w-full rounded-sm object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { About9 };

```

```tsx
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

const profile = {
  title: "SaaS Startup",
  subtitle: "Building the future of productivity",
  bio: `We're a team of passionate innovators building cutting-edge SaaS solutions that help businesses streamline their operations and boost productivity. Our mission is to create software that not only solves today's problems but anticipates tomorrow's challenges.`,
  vision: `We believe in the power of technology to transform how businesses operate. Our goal is to build intuitive, scalable solutions that grow with our customers and adapt to their evolving needs.`,
  outro: `Join thousands of businesses that trust our platform to power their success. Let's build something amazing together.`,
  team: [
    { id: "01", item: "Sarah Chen", type: "CEO & Co-founder" },
    { id: "02", item: "Marcus Rodriguez", type: "CTO & Co-founder" },
    { id: "03", item: "Emily Watson", type: "Head of Product" },
    { id: "04", item: "David Kim", type: "Lead Engineer" },
    { id: "05", item: "Lisa Thompson", type: "Head of Design" },
    { id: "06", item: "Alex Johnson", type: "Head of Marketing" },
    { id: "07", item: "Rachel Green", type: "Head of Sales" },
  ],
};

interface About10Props {
  className?: string;
}

const About10 = ({ className }: About10Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col-reverse gap-5 md:flex-row md:gap-12">
          <div className="w-full md:w-1/3 md:pr-4">
            <div className="sticky top-20 md:p-6">
              <div className="mb-8">
                <div className="mb-6 flex items-center gap-4">
                  <img
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/futuristic-device-design-qcufu.png"
                    alt="SaaS Startup Team"
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{profile.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {profile.subtitle}
                    </p>
                  </div>
                </div>
              </div>

              <nav>
                <div className="py-4">
                  <div className="group flex p-0 text-start text-xl font-medium hover:bg-transparent sm:text-2xl">
                    <span className="border-b-2 border-border pb-0.5 transition-colors">
                      Contact Us
                    </span>
                    <ArrowUpRight className="ml-1 h-6 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </nav>
            </div>
          </div>

          <div className="w-full md:w-2/3 md:p-6">
            <div className="max-w-4xl">
              <h1 className="mb-12 text-7xl font-semibold">About Us</h1>

              <div className="space-y-12">
                <p className="w-full text-2xl leading-[36px] font-medium md:max-w-2xl">
                  {profile.bio}
                </p>

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                  <h2 className="text-2xl font-medium">Core Philosophy</h2>
                  <p className="leading-relaxed">{profile.vision}</p>
                </div>

                <div className="my-12">
                  <img
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw12.jpeg"
                    alt="SaaS startup office"
                    className="rounded-2xl object-cover"
                  />
                </div>

                <div>
                  <h2 className="mb-8 text-2xl font-medium">Our Team</h2>
                  <div className="space-y-6">
                    {profile.team.map(({ id, item, type }) => (
                      <div
                        key={id}
                        className="flex items-center justify-between border-b py-4"
                      >
                        <div className="flex items-center gap-4">
                          <span className="font-mono text-sm text-muted-foreground">
                            {id}
                          </span>
                          <span className="text-base">{item}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-16">
                  <p className="leading-relaxed">{profile.outro}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { About10 };

```

```tsx
import React from "react";

import { cn } from "@/lib/utils";

interface About13Props {
  className?: string;
}

const About13 = ({ className }: About13Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container space-y-10 lg:space-y-20">
        <div className="w-full grid-cols-6 gap-10 lg:grid">
          <div />
          <h1 className="col-span-4 text-5xl font-semibold tracking-tighter lg:pr-24 lg:pl-10 lg:text-8xl">
            Our story
          </h1>
        </div>
        <div className="grid-cols-6 space-y-12 lg:grid lg:space-y-0 xl:gap-10">
          <p className="hidden text-foreground/40 lg:block">
            Our Crew, Our story
          </p>
          <div className="col-span-2 lg:pr-24 lg:pl-10">
            <p className="text-foreground/40">
              We aim to bring diverse minds together, turning ideas into
              experiences that matter.
            </p>
            <div className="mt-5 flex items-center gap-5 lg:mt-20">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/avatar1.png"
                className="size-12"
                alt="avatr"
              />
              <div>
                <h3 className="text-lg font-medium tracking-tight">John Doe</h3>
                <p className="text-sm text-foreground/40">Creative Director</p>
              </div>
            </div>
          </div>
          <div className="col-span-3 mt-32 lg:mt-0 lg:pl-10">
            <h2 className="text-2xl font-medium tracking-tight lg:text-3xl">
              We are a team of creators, thinkers, and builders who believe in
              crafting experiences that truly connect. Our story is built on
              passion, innovation, and the drive to bring meaningful ideas to
              life.
            </h2>
            <p className="mt-6 text-base text-foreground/40 lg:mt-18 lg:text-lg">
              We ask: What&apos;s the goal? Who&apos;s it for? How do we make it
              effortless? We begin with why, who, and how to make it better.
            </p>
          </div>
        </div>
        <div>
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img10.png"
            alt="about us iamge"
            className="mt-4 h-150 w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export { About13 };

```

```tsx
import React from "react";

import { cn } from "@/lib/utils";

interface About14Props {
  className?: string;
}

const About14 = ({ className }: About14Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container space-y-10 lg:space-y-20">
        <div className="w-full grid-cols-6 gap-10 space-y-5 lg:grid lg:space-y-0">
          <h1 className="col-span-2 text-5xl font-semibold tracking-tighter lg:text-8xl">
            Our story
          </h1>
          <div />
          <div className="col-span-3 flex items-center justify-center">
            <p className="w-fit text-foreground/40 lg:translate-y-2">
              We ask: What&apos;s the goal? Who&apos;s it for? How do we make it
              effortless?
              <br className="hidden lg:block" />
              We begin with why, who, and how to make it better.
            </p>
          </div>
        </div>
        <div>
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img1.png"
            alt="about us iamge"
            className="mt-4 h-132 w-full object-cover"
          />
        </div>
        <div className="grid grid-cols-1 gap-10 space-y-12 lg:grid-cols-6 lg:space-y-0">
          <p className="hidden text-foreground/40 lg:block">
            Our Crew, Our story
          </p>
          <div className="order-2 col-span-2 lg:order-none lg:pr-24 lg:pl-10">
            <p className="text-foreground/40">
              We aim to bring diverse minds together, turning ideas into
              experiences that matter.
            </p>
            <div className="mt-5 flex items-center gap-5 lg:mt-12">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/avatar1.png"
                className="size-12"
                alt="avatr"
              />
              <div>
                <h3 className="text-lg font-medium tracking-tight">John Doe</h3>
                <p className="text-sm text-foreground/40">Creative Director</p>
              </div>
            </div>
          </div>
          <div className="order-1 col-span-3 lg:order-none lg:mt-0 lg:pl-10">
            <h2 className="text-2xl font-medium tracking-tight lg:text-3xl">
              We are a team of creators, thinkers, and builders who believe in
              crafting experiences that truly connect. Our story is built on
              passion, innovation, and the drive to bring meaningful ideas to
              life.
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export { About14 };

```

```tsx
import React from "react";

import { cn } from "@/lib/utils";

const stats = [
  {
    number: "80K+",
    description:
      "From 80K+ users reached to 20+ startups supported, these numbers reflect the scale, impact, and consistency of my work.",
  },
  {
    number: "20+",
    description:
      "Startups supported with innovative solutions and strategic guidance to help them scale and succeed in their markets.",
  },
  {
    number: "95%",
    description:
      "Client satisfaction rate achieved through dedicated support, quality deliverables, and long-term partnerships built on trust.",
  },
];

interface About16Props {
  className?: string;
}

const About16 = ({ className }: About16Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-6">
          <div className="top-10 col-span-2 flex h-fit w-fit items-center gap-3 lg:sticky">
            <span className="size-2 bg-orange-500" />
            <p className="text-foreground/30 uppercase">Why us?</p>
          </div>
          <div className="col-span-4 ml-auto max-w-3xl space-y-10">
            <h1 className="text-3xl font-medium tracking-tight lg:text-4xl">
              "We are a team of creators, thinkers, and builders who believe in
              crafting experiences that truly connect. Our story is built on
              passion, innovation, and the drive to bring meaningful ideas to
              life."
            </h1>

            <p className="text-lg text-foreground/40">
              We ask: What's the goal? Who's it for? How do we make it
              effortless?
              <br className="hidden lg:block" />
              We begin with why, who, and how to make it better.
            </p>

            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img11.png"
              alt=""
              className="pointer-events-none h-110 w-full object-cover"
            />
            <ul className="mt-14">
              {stats.map((stat, index) => (
                <li key={index} className="grid grid-cols-5 border-b py-8">
                  <h3 className="col-span-2 text-4xl font-medium">
                    {stat.number}
                  </h3>
                  <p className="col-span-3">{stat.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export { About16 };

```

```tsx
"use client";

import React, { useState } from "react";

import { cn } from "@/lib/utils";

interface About17Props {
  className?: string;
}

const About17 = ({ className }: About17Props) => {
  const [active, setActive] = useState<string>("Information");

  const LINKS = [
    {
      title: "Information",
      href: "#",
      img: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img11.png",
    },
    {
      title: "Work",
      href: "#",
      img: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img9.png",
    },

    {
      title: "Journal",
      href: "#",
      img: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img10.png",
    },

    {
      title: "Archive",
      href: "#",
      img: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img6.png",
    },
  ];

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid grid-cols-1 gap-15 lg:grid-cols-7 lg:gap-12">
          <div className="top-10 col-span-3 h-fit w-fit text-2xl tracking-tight">
            <p className="font-medium">
              Independent Designer & Founding Engineer
            </p>
            <div className="mt-4 flex items-center gap-6 text-foreground/30">
              <p>
                {new Date().toLocaleTimeString("en-US", {
                  timeZone: "America/Chicago",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
              <p>CST</p>
            </div>
          </div>
          <div className="col-span-4 ml-auto max-w-3xl space-y-10 lg:pl-15">
            <h1 className="text-2xl font-medium tracking-tight">
              John Doe blends creativity with technical expertise to design and
              build digital products that are not only functional but also
              delightful to use. With a strong foundation in full-stack
              development and a sharp eye for design, he transforms ideas into
              products that scale seamlessly from concept to launch.
            </h1>
          </div>
        </div>
        <div className="mt-15 grid grid-cols-1 gap-4 border-t py-10 lg:grid-cols-7 lg:gap-12 lg:gap-15">
          <ul className="top-10 order-2 col-span-3 flex h-fit w-fit gap-10 tracking-tight lg:order-none">
            {LINKS.map((link) => (
              <li
                key={link.title}
                className={cn(
                  "cursor-pointer",
                  active === link.title
                    ? "text-foreground"
                    : "text-foreground/30",
                )}
                onClick={() => setActive(link.title)}
              >
                {link.title}
              </li>
            ))}
          </ul>
          <ul className="order-1 col-span-4 ml-auto flex w-full max-w-3xl gap-10 font-medium tracking-tight text-foreground/40 lg:order-none lg:pl-15 lg:text-2xl">
            <li className="text-foreground">Austrlia</li>
            <li>Brisbane</li>
            <li>+1 (000) 023 0123</li>
          </ul>
        </div>
        <div className="h-150">
          <img
            className="h-full w-full object-cover"
            src={LINKS.find((link) => link.title === active)?.img}
            alt=""
          />
        </div>
      </div>
    </section>
  );
};

export { About17 };

```

```tsx
import React from "react";

import { cn } from "@/lib/utils";

interface About18Props {
  className?: string;
}

const About18 = ({ className }: About18Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid grid-cols-1 gap-15 lg:grid-cols-7 lg:gap-12">
          <p className="col-span-2 font-medium">Our mission</p>

          <div className="col-span-4 ml-auto max-w-4xl space-y-10 lg:pl-15">
            <h1 className="text-2xl font-medium tracking-tight">
              We transform ideas into digital experiences that inspire and
              engage. Every project is an opportunity to push boundaries,
              challenge conventions, and create something extraordinary that
              leaves a lasting impact.
            </h1>
            <p className="w-fit text-lg text-foreground/40 lg:translate-y-2">
              Our approach: Research deeply, design thoughtfully, and deliver
              excellence. We believe in the power of collaboration, continuous
              learning, and staying ahead of industry trends.
            </p>
          </div>
        </div>
        <div className="my-20 grid grid-cols-2 items-center gap-4">
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img2.png"
            alt=""
            className="h-150 w-full object-cover saturate-0"
          />
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img1.png"
            alt=""
            className="h-150 w-full object-cover"
          />
        </div>
        <div className="grid grid-cols-1 gap-15 lg:grid-cols-7 lg:gap-12">
          <p className="col-span-2 font-medium">What drives us</p>

          <div className="col-span-4 ml-auto max-w-4xl space-y-10 lg:pl-15">
            <h1 className="text-2xl font-medium tracking-tight">
              We are a team of creators, thinkers, and builders who believe in
              crafting experiences that truly connect. Our story is built on
              passion, innovation, and the drive to bring meaningful ideas to
              life.
            </h1>
            <p className="w-fit text-lg text-foreground/40 lg:translate-y-2">
              We ask: What's the goal? Who's it for? How do we make it
              effortless?
              <br className="hidden lg:block" />
              We begin with why, who, and how to make it better.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { About18 };

```
