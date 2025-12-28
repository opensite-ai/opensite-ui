```tsx
"use client";

import { Code, Cog, PenTool, Shrub } from "lucide-react";

import { cn } from "@/lib/utils";

interface Services4Props {
  className?: string;
}

const Services4 = ({ className }: Services4Props) => {
  const services = [
    {
      icon: <Cog className="h-6 w-6" />,
      title: "Product Strategy",
      description:
        "Strategic planning and market positioning to ensure your product meets user needs and business goals.",
      items: ["Market Research", "User Personas", "Competitive Analysis"],
    },
    {
      icon: <PenTool className="h-6 w-6" />,
      title: "Design",
      description:
        "Beautiful, user-centered designs that create engaging experiences across all platforms.",
      items: ["UI/UX Design", "Prototyping", "Interaction Design"],
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Web Development",
      description:
        "Modern, scalable web applications built with the latest technologies and best practices.",
      items: ["Frontend Dev", "Backend Dev", "API Integration"],
    },
    {
      icon: <Shrub className="h-6 w-6" />,
      title: "Marketing",
      description:
        "Data-driven strategies to launch successfully and scale your product efficiently.",
      items: ["SEO Strategy", "Analytics & Data", "A/B Testing"],
    },
  ];

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Services
            </h2>
            <p className="mx-auto max-w-2xl text-lg tracking-tight text-muted-foreground md:text-xl">
              We craft digital experiences that captivate and convert, bringing
              your vision to life.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {services.map((service, index) => (
              <div
                key={index}
                className="space-y-6 rounded-lg border border-border p-8 transition-shadow hover:shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-muted p-3">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                </div>
                <p className="leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <div className="space-y-2">
                  {service.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-foreground" />
                      <span className="text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Services4 };

```

```tsx
"use client";

import { Code, Cog, PenTool, Shrub } from "lucide-react";

import { cn } from "@/lib/utils";

interface Services5Props {
  className?: string;
}

const Services5 = ({ className }: Services5Props) => {
  const services = [
    {
      icon: <Cog className="h-6 w-6" />,
      title: "Product Strategy",
      description:
        "Comprehensive market analysis and strategic planning to position your product for success in competitive markets.",
      items: [
        "Market Research",
        "User Personas",
        "Competitive Analysis",
        "Product Roadmaps",
      ],
    },
    {
      icon: <PenTool className="h-6 w-6" />,
      title: "Design",
      description:
        "User-centered design solutions that create intuitive and engaging experiences across all digital touchpoints.",
      items: ["UI/UX Design", "Prototyping", "Design Systems", "User Testing"],
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Web Development",
      description:
        "Modern, scalable web applications built with cutting-edge technologies and development best practices.",
      items: [
        "Frontend Development",
        "Backend Development",
        "API Integration",
        "Performance Optimization",
      ],
    },
    {
      icon: <Shrub className="h-6 w-6" />,
      title: "Marketing",
      description:
        "Strategic marketing and optimization services to successfully launch and scale your digital products.",
      items: [
        "SEO Strategy",
        "Analytics Setup",
        "A/B Testing",
        "Growth Marketing",
      ],
    },
  ];

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-6xl space-y-16">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Services
            </h2>
            <p className="mx-auto max-w-2xl text-lg tracking-tight text-muted-foreground md:text-xl">
              End-to-end digital solutions designed to help your business thrive
              in the modern marketplace.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {services.map((service, index) => (
              <div key={index} className="space-y-6 rounded-xl bg-muted p-8">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg border border-border bg-background p-2">
                    {service.icon}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                    What's Included
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {service.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center gap-2">
                        <div className="h-1 w-1 rounded-full bg-foreground" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Services5 };

```

```tsx
"use client";

import { Code, Cog, PenTool, Shrub } from "lucide-react";

import { cn } from "@/lib/utils";

interface Services6Props {
  className?: string;
}

const Services6 = ({ className }: Services6Props) => {
  const services = [
    {
      icon: <Cog className="h-8 w-8" />,
      title: "Product Strategy",
      description:
        "From market research to user personas, we help you build products that matter.",
      items: ["Market Research", "User Personas"],
    },
    {
      icon: <PenTool className="h-8 w-8" />,
      title: "Design",
      description:
        "Beautiful, functional designs that create memorable user experiences.",
      items: ["UI/UX Design", "Prototyping", "Interaction Design"],
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Web Development",
      description:
        "Robust, scalable applications built with modern technologies and frameworks.",
      items: ["Frontend Dev", "Backend Dev"],
    },
    {
      icon: <Shrub className="h-8 w-8" />,
      title: "Marketing",
      description:
        "Strategic growth initiatives to scale your product and maximize impact.",
      items: ["SEO Strategy", "Analytics & Data", "A/B Testing"],
    },
  ];

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-6xl space-y-16">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Services
            </h2>
            <p className="mx-auto max-w-2xl text-lg tracking-tight text-muted-foreground md:text-xl">
              We deliver end-to-end digital solutions that drive results and
              exceed expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <div key={index} className="group space-y-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted transition-colors group-hover:bg-foreground group-hover:text-background">
                  {service.icon}
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">{service.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </div>
                <div className="space-y-2">
                  {service.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="text-xs font-medium text-muted-foreground"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Services6 };

```

```tsx
"use client";

import { Code, Cog, PenTool, Shrub } from "lucide-react";

import { cn } from "@/lib/utils";

interface Services7Props {
  className?: string;
}

const Services7 = ({ className }: Services7Props) => {
  const services = [
    {
      icon: <Cog className="h-6 w-6" />,
      title: "Product Strategy",
      description:
        "From market research to user personas, we help you build products that matter.",
      items: ["Market Research", "User Personas"],
    },
    {
      icon: <PenTool className="h-6 w-6" />,
      title: "Design",
      description:
        "Beautiful, functional designs that create memorable user experiences.",
      items: ["UI/UX Design", "Prototyping", "Interaction Design"],
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Web Development",
      description:
        "Robust, scalable applications built with modern technologies and frameworks.",
      items: ["Frontend Dev", "Backend Dev"],
    },
    {
      icon: <Shrub className="h-6 w-6" />,
      title: "Marketing",
      description:
        "Strategic growth initiatives to scale your product and maximize impact.",
      items: ["SEO Strategy", "Analytics & Data", "A/B Testing"],
    },
  ];

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-4xl space-y-16">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Services
            </h2>
            <p className="mx-auto max-w-2xl text-lg tracking-tight text-muted-foreground md:text-xl">
              Comprehensive solutions to bring your digital vision to life.
            </p>
          </div>

          <div className="space-y-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex flex-col items-start gap-6 rounded-lg border border-border p-6 transition-shadow hover:shadow-sm md:flex-row"
              >
                <div className="shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                    {service.icon}
                  </div>
                </div>
                <div className="flex-1 space-y-3">
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.items.map((item, itemIndex) => (
                      <span
                        key={itemIndex}
                        className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Services7 };

```

```tsx
"use client";

import { Code, Cog, PenTool, Shrub } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Services8Props {
  className?: string;
}

const Services8 = ({ className }: Services8Props) => {
  const services = [
    {
      icon: <Cog className="h-5 w-5" />,
      title: "Product Strategy",
      shortDescription: "Strategic planning and market positioning",
      description:
        "From market research to user personas, we help you build products that matter. Our strategic approach ensures your product meets real user needs.",
      items: [
        "Market Research",
        "User Personas",
        "Competitive Analysis",
        "Product Roadmaps",
      ],
      deliverables: [
        "Strategy Document",
        "User Persona Profiles",
        "Market Analysis Report",
      ],
    },
    {
      icon: <PenTool className="h-5 w-5" />,
      title: "Design",
      shortDescription: "User-centered design solutions",
      description:
        "Beautiful, functional designs that create memorable user experiences. We focus on both aesthetics and usability to create designs that convert.",
      items: [
        "UI/UX Design",
        "Prototyping",
        "Interaction Design",
        "Design Systems",
      ],
      deliverables: [
        "Design System",
        "Interactive Prototypes",
        "UI/UX Mockups",
      ],
    },
    {
      icon: <Code className="h-5 w-5" />,
      title: "Web Development",
      shortDescription: "Modern, scalable applications",
      description:
        "Robust, scalable applications built with modern technologies and frameworks. We ensure your application is fast, secure, and maintainable.",
      items: [
        "Frontend Dev",
        "Backend Dev",
        "API Integration",
        "Performance Optimization",
      ],
      deliverables: ["Source Code", "Documentation", "Deployment Guide"],
    },
    {
      icon: <Shrub className="h-5 w-5" />,
      title: "Marketing",
      shortDescription: "Growth and optimization strategies",
      description:
        "Strategic growth initiatives to scale your product and maximize impact. We use data-driven approaches to optimize your marketing efforts.",
      items: [
        "SEO Strategy",
        "Analytics & Data",
        "A/B Testing",
        "Content Marketing",
      ],
      deliverables: [
        "Marketing Plan",
        "Analytics Setup",
        "Performance Reports",
      ],
    },
  ];

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-3xl space-y-16">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Services
            </h2>
            <p className="text-lg tracking-tight text-muted-foreground md:text-xl">
              Click to learn more about each service we offer.
            </p>
          </div>

          <Accordion
            type="single"
            collapsible
            defaultValue="item-0"
            className="space-y-4"
          >
            {services.map((service, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-lg border border-border last:border-b"
              >
                <AccordionTrigger className="px-6 py-6 hover:bg-muted/50 hover:no-underline">
                  <div className="flex items-center gap-4">
                    {service.icon}
                    <div className="text-left">
                      <h3 className="text-lg font-semibold">{service.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {service.shortDescription}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-6 border-t border-b border-border bg-muted/20 p-6">
                  <p className="leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="mb-3 font-medium">Services Include:</h4>
                      <ul className="space-y-1">
                        {service.items.map((item, itemIndex) => (
                          <li
                            key={itemIndex}
                            className="flex items-center gap-2 text-sm"
                          >
                            <div className="h-1 w-1 rounded-full bg-foreground" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="mb-3 font-medium">Deliverables:</h4>
                      <ul className="space-y-1">
                        {service.deliverables.map((deliverable, delivIndex) => (
                          <li
                            key={delivIndex}
                            className="flex items-center gap-2 text-sm"
                          >
                            <div className="h-1 w-1 rounded-full bg-foreground" />
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export { Services8 };

```

```tsx
"use client";

import { ArrowRight, Code, Cog, PenTool, Shrub } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Services9Props {
  className?: string;
}

const Services9 = ({ className }: Services9Props) => {
  const services = [
    {
      icon: <Cog className="h-6 w-6" />,
      title: "Product Strategy",
      description:
        "From market research to user personas, we help you build products that matter.",
      items: ["Market Research", "User Personas"],
      duration: "2-4 weeks",
      price: "Starting at $5,000",
    },
    {
      icon: <PenTool className="h-6 w-6" />,
      title: "Design",
      description:
        "Beautiful, functional designs that create memorable user experiences.",
      items: ["UI/UX Design", "Prototyping", "Interaction Design"],
      duration: "3-6 weeks",
      price: "Starting at $8,000",
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Web Development",
      description:
        "Robust, scalable applications built with modern technologies and frameworks.",
      items: ["Frontend Dev", "Backend Dev"],
      duration: "6-12 weeks",
      price: "Starting at $15,000",
    },
    {
      icon: <Shrub className="h-6 w-6" />,
      title: "Marketing",
      description:
        "Strategic growth initiatives to scale your product and maximize impact.",
      items: ["SEO Strategy", "Analytics & Data", "A/B Testing"],
      duration: "Ongoing",
      price: "Starting at $3,000/mo",
    },
  ];

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-6xl space-y-16">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Services
            </h2>
            <p className="mx-auto max-w-2xl text-lg tracking-tight text-muted-foreground md:text-xl">
              Transparent pricing for world-class digital solutions tailored to
              your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex flex-col rounded-xl border border-border p-8 transition-shadow hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-muted p-2">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">
                      Duration
                    </div>
                    <div className="text-sm font-medium">
                      {service.duration}
                    </div>
                  </div>
                </div>

                <p className="mt-6 leading-relaxed text-muted-foreground">
                  {service.description}
                </p>

                <div className="mt-6 flex-1 space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">
                    What's included:
                  </div>
                  <ul className="space-y-1">
                    {service.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-center gap-2 text-sm"
                      >
                        <div className="h-1 w-1 rounded-full bg-foreground" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 border-t border-border pt-6">
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold">{service.price}</div>
                    <Button size="sm" variant="outline">
                      Get Started
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Services9 };

```

```tsx
"use client";

import {
  ArrowRight,
  CheckCircle,
  Code,
  Cog,
  PenTool,
  Shrub,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Services10Props {
  className?: string;
}

const Services10 = ({ className }: Services10Props) => {
  const services = [
    {
      icon: <Cog className="h-6 w-6" />,
      title: "Product Strategy",
      description:
        "From market research to user personas, we help you build products that matter. Our strategic approach ensures your product meets real user needs.",
      items: [
        "Market Research & Analysis",
        "User Personas & Journey Mapping",
        "Competitive Analysis",
        "Product Roadmap Development",
      ],
      deliverables: [
        "Strategy Document",
        "User Research Report",
        "Roadmap & Timeline",
      ],
      duration: "2-4 weeks",
      price: "Starting at $5,000",
      featured: false,
    },
    {
      icon: <PenTool className="h-6 w-6" />,
      title: "Design",
      description:
        "Beautiful, functional designs that create memorable user experiences. We focus on both aesthetics and usability to create designs that convert.",
      items: [
        "UI/UX Design",
        "Interactive Prototyping",
        "Design System Creation",
        "Usability Testing",
      ],
      deliverables: [
        "Design System",
        "Interactive Prototypes",
        "Design Specifications",
      ],
      duration: "3-6 weeks",
      price: "Starting at $8,000",
      featured: true,
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Web Development",
      description:
        "Robust, scalable applications built with modern technologies and frameworks. We ensure your application is fast, secure, and maintainable.",
      items: [
        "Frontend Development",
        "Backend Development",
        "API Integration",
        "Performance Optimization",
      ],
      deliverables: [
        "Source Code",
        "Technical Documentation",
        "Deployment Guide",
      ],
      duration: "6-12 weeks",
      price: "Starting at $15,000",
      featured: true,
    },
    {
      icon: <Shrub className="h-6 w-6" />,
      title: "Marketing",
      description:
        "Strategic growth initiatives to scale your product and maximize impact. We use data-driven approaches to optimize your marketing efforts.",
      items: [
        "SEO Strategy & Implementation",
        "Analytics & Performance Tracking",
        "A/B Testing & Optimization",
        "Content Marketing Strategy",
      ],
      deliverables: [
        "Marketing Plan",
        "Analytics Dashboard",
        "Performance Reports",
      ],
      duration: "Ongoing",
      price: "Starting at $3,000/mo",
      featured: false,
    },
  ];

  return (
    <section className={cn("bg-muted/30 py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-6xl space-y-16">
          <div className="space-y-4 text-center">
            <Badge variant="outline" className="bg-background">
              Our Services
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
              Comprehensive Digital Solutions
            </h2>
            <p className="mx-auto max-w-2xl text-lg tracking-tight text-muted-foreground md:text-xl">
              Transparent pricing for world-class digital solutions tailored to
              your specific business needs and growth objectives.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {services.map((service, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  service.featured
                    ? "border-primary/20 bg-background shadow-lg"
                    : "border-border bg-background/80 backdrop-blur-sm hover:bg-background"
                }`}
              >
                <div className="p-8">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`rounded-lg p-3 ${
                          service.featured
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {service.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">
                          {service.title}
                        </h3>
                        <div className="mt-1 text-sm text-muted-foreground">
                          {service.duration}
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="mt-6 leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>

                  <div className="mt-6 space-y-4">
                    <div>
                      <h4 className="mb-3 text-sm font-medium">
                        What's included:
                      </h4>
                      <ul className="space-y-2">
                        {service.items.map((item, itemIndex) => (
                          <li
                            key={itemIndex}
                            className="flex items-center gap-3 text-sm"
                          >
                            <CheckCircle className="h-4 w-4 shrink-0 text-green-600" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-lg bg-muted/50 p-4">
                      <h4 className="mb-2 text-sm font-medium">
                        Deliverables:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {service.deliverables.map((deliverable, delivIndex) => (
                          <Badge
                            key={delivIndex}
                            variant="secondary"
                            className="text-xs"
                          >
                            {deliverable}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 border-t border-border pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-semibold">
                          {service.price}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Custom quotes available
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant={service.featured ? "default" : "outline"}
                        className="transition-all group-hover:shadow-md"
                      >
                        Get Started
                        <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border bg-background p-8 text-center">
            <h3 className="mb-2 text-xl font-semibold">
              Need a custom solution?
            </h3>
            <p className="mb-6 text-muted-foreground">
              We offer tailored packages combining multiple services for
              comprehensive digital transformation.
            </p>
            <Button
              size="lg"
              className="bg-linear-to-r from-primary to-primary/80"
            >
              Schedule Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Services10 };

```

```tsx
"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type ServiceProps = {
  title: string;
  image: string;
  url: string;
};

const services: ServiceProps[] = [
  {
    title: "Web Development",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-6jEVl7xPH3E-unsplash.jpg",
    url: "",
  },
  {
    title: "Mobile App Development",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-gDmVqxZt1hg-unsplash.jpg",
    url: "",
  },
];

interface Services11Props {
  className?: string;
}

const Services11 = ({ className }: Services11Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="flex flex-col justify-between lg:col-span-1">
          <div>
            <h2 className="mb-4 text-4xl font-medium text-foreground md:text-6xl">
              Our Services
            </h2>
            <p className="w-72 text-base tracking-tight text-muted-foreground">
              We offer comprehensive digital solutions to help your business
              grow. From web development to mobile apps, we deliver quality
              results that exceed expectations.
            </p>
          </div>
          <Button variant="outline" className="mt-8 w-fit">
            View all services <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2">
          {services.map((service, idx) => (
            <motion.a
              key={idx}
              href={service.url}
              whileHover={{ opacity: 0.8 }}
              className="group block overflow-hidden rounded-xl"
            >
              <Card className="relative aspect-[3/4] overflow-hidden border-none bg-muted p-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <CardContent className="absolute inset-0 flex flex-col justify-start p-6">
                  <div className="pr-4 font-semibold text-white">
                    {service.title}
                  </div>
                </CardContent>
                <ArrowUpRight className="absolute top-6 right-6 h-6 w-6 text-white transition-transform group-hover:scale-110" />
              </Card>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Services11 };

```

```tsx
"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type ServiceProps = {
  title: string;
  image: string;
  url: string;
};

const services: ServiceProps[] = [
  {
    title: "Web Development",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-6jEVl7xPH3E-unsplash.jpg",
    url: "",
  },
  {
    title: "Mobile App Development",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-gDmVqxZt1hg-unsplash.jpg",
    url: "",
  },
  {
    title: "UI/UX Design",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-9__Q24sJqKg-unsplash.jpg",
    url: "",
  },
  {
    title: "Digital Marketing",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-duxeKbu9FDE-unsplash.jpg",
    url: "",
  },
  {
    title: "Cloud Solutions",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-5oYbG-sEImY-unsplash.jpg",
    url: "",
  },
];

interface Services12Props {
  className?: string;
}

const Services12 = ({ className }: Services12Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="flex flex-col justify-between lg:col-span-1">
          <div>
            <h2 className="mb-4 text-4xl font-medium text-foreground md:text-6xl">
              Featured Services
            </h2>
            <p className="w-72 text-base tracking-tight text-muted-foreground">
              We offer comprehensive digital solutions to help your business
              grow. From web development to mobile apps, we deliver quality
              results that exceed expectations.
            </p>
          </div>
          <Button variant="outline" className="mt-8 w-fit">
            View all services <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2">
          {/* Featured Services - First 2 */}
          {services.slice(0, 2).map((service, idx) => (
            <motion.a
              key={idx}
              href={service.url}
              whileHover={{ opacity: 0.8 }}
              className="group block overflow-hidden rounded-xl"
            >
              <Card className="relative aspect-[3/4] overflow-hidden p-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <CardContent className="absolute inset-0 flex flex-col justify-start p-6">
                  <div className="pr-4 font-semibold text-white">
                    {service.title}
                  </div>
                </CardContent>
                <ArrowUpRight className="absolute top-6 right-6 h-6 w-6 text-white transition-transform group-hover:scale-110" />
              </Card>
            </motion.a>
          ))}

          {/* Secondary Services - Remaining 3 */}
          <div className="col-span-full grid grid-cols-1 gap-4 sm:grid-cols-3">
            {services.slice(2).map((service, idx) => (
              <motion.a
                key={idx + 2}
                href={service.url}
                whileHover={{ opacity: 0.8 }}
                className="group block overflow-hidden rounded-xl"
              >
                <Card className="relative aspect-4/3 overflow-hidden p-0">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <CardContent className="absolute inset-0 flex flex-col justify-start p-4">
                    <div className="pr-4 text-sm font-semibold text-white">
                      {service.title}
                    </div>
                  </CardContent>
                  <ArrowUpRight className="absolute top-4 right-4 h-5 w-5 text-white transition-transform group-hover:scale-110" />
                </Card>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Services12 };

```

```tsx
"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type ServiceProps = {
  title: string;
  image: string;
  url: string;
  size?: "large" | "medium" | "small";
};

const services: ServiceProps[] = [
  {
    title: "Web Development",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-6jEVl7xPH3E-unsplash.jpg",
    url: "",
    size: "large",
  },
  {
    title: "Mobile App Development",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-gDmVqxZt1hg-unsplash.jpg",
    url: "",
    size: "medium",
  },
  {
    title: "UI/UX Design",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-9__Q24sJqKg-unsplash.jpg",
    url: "",
    size: "small",
  },
  {
    title: "Digital Marketing",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-duxeKbu9FDE-unsplash.jpg",
    url: "",
    size: "medium",
  },
  {
    title: "Cloud Solutions",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-5oYbG-sEImY-unsplash.jpg",
    url: "",
    size: "small",
  },
];

interface Services13Props {
  className?: string;
}

const Services13 = ({ className }: Services13Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="flex flex-col justify-between lg:col-span-1">
          <div>
            <h2 className="mb-4 text-4xl font-medium text-foreground md:text-6xl">
              Featured Services
            </h2>
            <p className="w-72 text-base tracking-tight text-muted-foreground">
              We offer comprehensive digital solutions to help your business
              grow. From web development to mobile apps, we deliver quality
              results that exceed expectations.
            </p>
          </div>
          <Button variant="outline" className="mt-8 w-fit">
            View all services <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2">
          {/* Web Development - Hero card */}
          <motion.a
            href={services[0].url}
            whileHover={{ opacity: 0.8, scale: 1.02 }}
            className="group col-span-1 block overflow-hidden rounded-xl sm:col-span-2"
          >
            <Card className="relative aspect-video overflow-hidden p-0">
              <img
                src={services[0].image}
                alt={services[0].title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <CardContent className="absolute inset-0 flex flex-col justify-end p-8">
                <div className="pr-4 text-2xl font-bold text-white">
                  {services[0].title}
                </div>
              </CardContent>
              <ArrowUpRight className="absolute top-8 right-8 h-8 w-8 text-white transition-transform group-hover:scale-110" />
            </Card>
          </motion.a>

          {/* Mobile App Development */}
          <motion.a
            href={services[1].url}
            whileHover={{ opacity: 0.8, scale: 1.02 }}
            className="group block overflow-hidden rounded-xl"
          >
            <Card className="relative aspect-4/5 overflow-hidden p-0">
              <img
                src={services[1].image}
                alt={services[1].title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <CardContent className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="pr-4 text-lg font-semibold text-white">
                  {services[1].title}
                </div>
              </CardContent>
              <ArrowUpRight className="absolute top-6 right-6 h-6 w-6 text-white transition-transform group-hover:scale-110" />
            </Card>
          </motion.a>

          {/* UI/UX Design */}
          <motion.a
            href={services[2].url}
            whileHover={{ opacity: 0.8, scale: 1.02 }}
            className="group block overflow-hidden rounded-xl"
          >
            <Card className="relative aspect-4/5 overflow-hidden p-0">
              <img
                src={services[2].image}
                alt={services[2].title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <CardContent className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="pr-4 text-lg font-semibold text-white">
                  {services[2].title}
                </div>
              </CardContent>
              <ArrowUpRight className="absolute top-6 right-6 h-6 w-6 text-white transition-transform group-hover:scale-110" />
            </Card>
          </motion.a>

          {/* Digital Marketing */}
          <motion.a
            href={services[3].url}
            whileHover={{ opacity: 0.8, scale: 1.02 }}
            className="group block overflow-hidden rounded-xl"
          >
            <Card className="relative aspect-4/5 overflow-hidden p-0">
              <img
                src={services[3].image}
                alt={services[3].title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <CardContent className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="pr-4 text-lg font-semibold text-white">
                  {services[3].title}
                </div>
              </CardContent>
              <ArrowUpRight className="absolute top-6 right-6 h-6 w-6 text-white transition-transform group-hover:scale-110" />
            </Card>
          </motion.a>

          {/* Cloud Solutions */}
          <motion.a
            href={services[4].url}
            whileHover={{ opacity: 0.8, scale: 1.02 }}
            className="group block overflow-hidden rounded-xl"
          >
            <Card className="relative aspect-4/5 overflow-hidden p-0">
              <img
                src={services[4].image}
                alt={services[4].title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <CardContent className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="pr-4 text-lg font-semibold text-white">
                  {services[4].title}
                </div>
              </CardContent>
              <ArrowUpRight className="absolute top-6 right-6 h-6 w-6 text-white transition-transform group-hover:scale-110" />
            </Card>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export { Services13 };

```

```tsx
"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type ServiceProps = {
  title: string;
  image: string;
  url: string;
};

const services: ServiceProps[] = [
  {
    title: "Web Development",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-6jEVl7xPH3E-unsplash.jpg",
    url: "",
  },
  {
    title: "Mobile App Development",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-gDmVqxZt1hg-unsplash.jpg",
    url: "",
  },
  {
    title: "UI/UX Design",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-9__Q24sJqKg-unsplash.jpg",
    url: "",
  },
  {
    title: "Digital Marketing",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-duxeKbu9FDE-unsplash.jpg",
    url: "",
  },
];

interface Services14Props {
  className?: string;
}

const Services14 = ({ className }: Services14Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="mb-4 text-4xl font-medium text-foreground md:text-6xl">
              Our Services
            </h2>
            <p className="w-80 text-base tracking-tight text-muted-foreground">
              We provide end-to-end digital solutions that transform your
              business. From concept to deployment, we ensure every project
              delivers exceptional results.
            </p>
          </div>
          <Button variant="outline" className="mt-8 w-fit">
            Explore services <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {services.map((service, idx) => (
            <motion.a
              key={idx}
              href={service.url}
              whileHover={{ opacity: 0.8 }}
              className="group block overflow-hidden rounded-lg"
            >
              <Card className="relative aspect-square overflow-hidden p-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <CardContent className="absolute inset-0 flex flex-col justify-end p-4">
                  <div className="font-semibold text-white">
                    {service.title}
                  </div>
                </CardContent>
                <ArrowUpRight className="absolute top-4 right-4 h-5 w-5 text-white transition-transform group-hover:scale-110" />
              </Card>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Services14 };

```

```tsx
"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type ServiceProps = {
  title: string;
  image: string;
  url: string;
  height: "tall" | "medium" | "short";
};

const services: ServiceProps[] = [
  {
    title: "Web Development",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-6jEVl7xPH3E-unsplash.jpg",
    url: "",
    height: "tall",
  },
  {
    title: "Mobile App Development",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-gDmVqxZt1hg-unsplash.jpg",
    url: "",
    height: "medium",
  },
  {
    title: "UI/UX Design",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-9__Q24sJqKg-unsplash.jpg",
    url: "",
    height: "short",
  },
  {
    title: "Digital Marketing",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-duxeKbu9FDE-unsplash.jpg",
    url: "",
    height: "tall",
  },
  {
    title: "Cloud Solutions",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-5oYbG-sEImY-unsplash.jpg",
    url: "",
    height: "tall",
  },
  {
    title: "Data Analytics",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-h4H-6HQ2zog-unsplash.jpg",
    url: "",
    height: "medium",
  },
];

interface Services15Props {
  className?: string;
}

const Services15 = ({ className }: Services15Props) => {
  const getHeightClass = (height: ServiceProps["height"]) => {
    switch (height) {
      case "tall":
        return "h-96";
      case "medium":
        return "h-72";
      case "short":
        return "h-56";
      default:
        return "h-56";
    }
  };

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mb-16 max-w-2xl">
          <h2 className="mb-4 text-4xl font-medium text-foreground md:text-6xl">
            Digital Solutions
          </h2>
          <p className="text-base tracking-tight text-muted-foreground">
            Transform your business with our comprehensive digital services. We
            combine creativity with technical expertise to deliver solutions
            that drive growth.
          </p>
        </div>

        {/* Masonry Layout using CSS Columns */}
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
          {services.map((service, idx) => (
            <motion.a
              key={idx}
              href={service.url}
              whileHover={{ y: -4 }}
              className="group mb-6 block break-inside-avoid overflow-hidden rounded-xl"
            >
              <Card
                className={`relative ${getHeightClass(service.height)} overflow-hidden p-0`}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                {/* Color overlay on hover */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <CardContent className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="font-semibold text-white">
                    {service.title}
                  </div>
                </CardContent>
                <ArrowUpRight className="absolute top-6 right-6 h-6 w-6 text-white transition-all duration-300 group-hover:rotate-45" />
              </Card>
            </motion.a>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" className="mx-auto">
            View all services <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export { Services15 };

```

```tsx
import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const services = [
  {
    title: "Product strategy",
    description:
      "Define clear objectives, align stakeholders, and prioritize initiatives that drive measurable impact.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/daria-nepriakhina-zoCDWPuiRuA-unsplash.jpg",
    categories: [
      "Vision & goals",
      "Stakeholder alignment",
      "Prioritization",
      "Roadmapping",
      "Delivery planning",
      "Metrics",
    ],
  },
  {
    title: "Growth marketing & lifecycle",
    description:
      "Full-funnel experimentation and lifecycle programs that acquire, activate, and retain customers.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/diggity-marketing-SB0WARG16HI-unsplash.jpg",
    categories: [
      "Acquisition",
      "Activation",
      "Retention",
      "Attribution",
      "Experimentation",
    ],
  },
  {
    title: "Content operations & SEO",
    description:
      "Operationalized content systems and search strategies that compound organic growth over time.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/stephen-dawson-qwtCeJ5cLYs-unsplash.jpg",
    categories: [
      "Topic mapping",
      "Technical SEO",
      "Editorial process",
      "Distribution",
    ],
  },
  {
    title: "AI Integration & Automation",
    description:
      "Leverage artificial intelligence and automation to streamline workflows, enhance decision-making, and unlock new business opportunities.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/marvin-meyer-SYTO3xs06fU-unsplash.jpg",
    categories: [
      "Process automation",
      "Machine learning",
      "Data analysis",
      "Chatbots",
      "Predictive analytics",
      "Custom AI solutions",
    ],
  },
];

interface Services16Props {
  className?: string;
}

const Services16 = ({ className }: Services16Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid items-start gap-4 md:grid-cols-4">
          <div className=""></div>
          <h1 className="col-span-3 text-6xl font-semibold sm:text-7xl md:text-8xl lg:text-9xl">
            Services.
          </h1>
        </div>
        <div className="mt-20">
          <Accordion type="multiple" defaultValue={["item-0"]}>
            {services.map((service, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex w-full grid-cols-4 items-center gap-4 sm:grid">
                    <span className="text-base text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="col-span-3 text-lg font-semibold tracking-tight">
                      {service.title}
                    </h2>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="flex grid-cols-4 pt-6 pb-12 sm:grid sm:gap-4">
                  <div />
                  <div className="col-span-3 grid gap-10 lg:grid-cols-5">
                    <div className="flex flex-col gap-4 md:flex-row md:gap-8 lg:col-span-3">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="aspect-[1.4] w-52 rounded-xl object-cover"
                      />
                      <div className="flex flex-col gap-2 sm:gap-3">
                        <h4 className="text-2xl font-medium tracking-tight sm:text-3xl">
                          {service.title}
                        </h4>
                        <p className="text-muted-foreground sm:text-base">
                          {service.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4 lg:col-span-2">
                      <p className="text-xs text-muted-foreground">
                        Categories
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {service.categories.map((category, index) => (
                          <Badge key={index}>{category}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export { Services16 };

```

```tsx
import { ArrowUpRight, Plus } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const services = [
  {
    title: "Web Design",
    category: "Design",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/tirza-van-dijk-o1SKqmgSDbg-unsplash.jpg",
  },
  {
    title: "Digital Marketing",
    category: "Marketing",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/adem-ay-Tk9m_HP4rgQ-unsplash.jpg",
  },
  {
    title: "App Development",
    category: "Development",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/marvin-meyer-SYTO3xs06fU-unsplash.jpg",
  },
  {
    title: "Content Creation",
    category: "Content",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/christin-hume-Hcfwew744z4-unsplash.jpg",
  },
];

interface Services18Props {
  className?: string;
}

const Services18 = ({ className }: Services18Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="size-3 rounded-sm bg-primary" />
            <p className="tracking-tight">Our Services</p>
          </div>
          <p className="text-sm">
            <span className="font-mono">+3000</span> projects completed
          </p>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-20 lg:grid-cols-3">
          <div className="flex flex-col gap-7">
            <h1 className="text-7xl font-semibold">Creative Solutions</h1>
            <p className="text-lg text-muted-foreground">
              Elevate your business with tailored digital strategies and
              impactful design.
            </p>
            <Separator />
            <div className="flex flex-col gap-5 tracking-tight">
              <div className="flex items-center gap-2.5">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-muted">
                  <Plus className="size-3.5" />
                </span>
                <p className="font-medium">Boost Engagement & Results</p>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-muted">
                  <Plus className="size-3.5" />
                </span>
                <p className="font-medium">Built for Tomorrow's Growth</p>
              </div>
            </div>
            <Button className="w-fit" size="lg">
              Get Started <ArrowUpRight />
            </Button>
          </div>
          <div className="col-span-2 space-y-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-md border bg-muted py-2 pr-6 pl-2 dark:bg-card"
              >
                <div className="flex items-center gap-5">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-20 w-32 rounded-sm border object-cover"
                  />
                  <div className="flex flex-col">
                    <h2 className="text-lg font-medium tracking-tight">
                      {service.title}
                    </h2>
                    <p className="tracking-tight text-muted-foreground">
                      {service.category}
                    </p>
                  </div>
                </div>
                <div className="hidden items-center gap-1.5 sm:flex">
                  {Array.from({ length: services.length }).map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        "size-2.5 rounded-full",
                        i <= index ? "bg-primary" : "bg-muted-foreground/20",
                      )}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Services18 };

```

```tsx
"use client";

import { motion, useSpring } from "framer-motion";
import React, { useState } from "react";

import { cn } from "@/lib/utils";

interface Services19Props {
  className?: string;
}

const Services19 = ({ className }: Services19Props) => {
  const SPRING = {
    mass: 0.1,
    stiffness: 100,
    damping: 10,
  };

  const xSpring = useSpring(0, SPRING);
  const ySpring = useSpring(0, SPRING);
  const scaleSpring = useSpring(0, SPRING);
  const opacity = useSpring(0, SPRING);

  const services = [
    {
      title: "Brand Identity",
      categories: ["Logo Design", "Brand Guidelines"],
      subcategories: ["Visual Identity", "Brand Strategy"],
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img1.png",
    },
    {
      title: "UI/UX Design",
      categories: ["User Interface", "User Experience"],
      subcategories: ["Wireframing", "Prototyping"],
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img2.png",
    },
    {
      title: "Web Development",
      categories: ["Frontend", "Backend"],
      subcategories: ["Responsive Design", "API Integration"],
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img3.png",
    },
    {
      title: "Digital Marketing",
      categories: ["SEO Optimization", "Content Strategy"],
      subcategories: ["Social Media", "Analytics"],
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img4.png",
    },
    {
      title: "Graphic Design",
      categories: ["Print Design", "Digital Assets"],
      subcategories: ["Brochures", "Social Graphics"],
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img5.png",
    },
    {
      title: "Consulting",
      categories: ["Strategy Planning", "Business Analysis"],
      subcategories: ["Market Research", "Competitive Analysis"],
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img6.png",
    },
  ];

  const handlePointerMove = (e: React.PointerEvent<HTMLTableElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    xSpring.set(e.clientX - bounds.left + 20);
    ySpring.set(e.clientY - bounds.top + 20);
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col items-center justify-center gap-15">
          <h1 className="text-4xl font-medium tracking-tighter lg:text-5xl">
            Services we{" "}
            <span className="font-instrumentSerif text-5xl font-normal italic lg:text-6xl">
              offer
            </span>
            <sup className="pl-2 align-top text-sm font-normal tracking-normal">
              [04]
            </sup>
          </h1>
          <div className="relative w-full">
            <table
              onPointerMove={handlePointerMove}
              onPointerEnter={() => {
                opacity.set(1);
                scaleSpring.set(1);
              }}
              onPointerLeave={() => {
                opacity.set(0);
                scaleSpring.set(0);
              }}
              className="w-full"
            >
              <tbody>
                {services.map((service, index) => (
                  <tr
                    key={index}
                    onPointerEnter={() => {
                      setCurrentIndex(index);
                    }}
                    className="group relative cursor-pointer border-b"
                  >
                    <td className="py-5">
                      <h3 className="text-xl font-medium tracking-tight lg:text-2xl">
                        {service.title}
                      </h3>
                    </td>
                    <td className="hidden lg:table-cell">
                      <div className="w-full max-w-2xs pr-5 text-center text-sm tracking-tighter text-foreground/30 group-hover:text-foreground lg:text-base">
                        <p>{service.categories[0]}</p>
                        <p>{service.categories[1]}</p>
                      </div>
                    </td>
                    <td className="text-right text-sm tracking-tighter text-foreground/30 group-hover:text-foreground lg:text-base">
                      <div>
                        <p>{service.subcategories[0]}</p>
                        <p>{service.subcategories[1]}</p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Cursor-following image */}
            <motion.div
              className="pointer-events-none absolute top-0 left-0 hidden size-40 border sm:block"
              style={{
                x: xSpring,
                y: ySpring,
                opacity: opacity,
                scale: scaleSpring,
              }}
            >
              <img
                src={services[currentIndex].image}
                alt=""
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Services19 };

```

```tsx
"use client";

import { motion } from "framer-motion";
import { CornerDownLeft, Milestone } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

const services = [
  {
    id: 1,
    title: "Branding",
    options: ["Logo Design", "Brand Identity", "Style Guide", "Color Palette"],
  },
  {
    id: 2,
    title: "Development",
    options: ["Web Apps", "Mobile Apps", "APIs", "Database Design", "DevOps"],
  },
  {
    id: 3,
    title: "Marketing",
    options: ["SEO", "Social Media", "Content Strategy", "Analytics"],
  },
  {
    id: 4,
    title: "Launch",
    options: ["Testing", "Deployment", "Go-Live Support", "Bug Fixes"],
  },
  {
    id: 5,
    title: "Support",
    options: ["24/7 Support", "Maintenance", "Updates", "Training"],
  },
];

interface Services20Props {
  className?: string;
}

const Services20 = ({ className }: Services20Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col justify-between gap-[10vw] lg:flex-row">
          <h2 className="pt-4 tracking-tight text-foreground/30 uppercase md:block">
            Services we provide
          </h2>
          <div className="w-full max-w-3xl px-2">
            <h1 className="text-3xl font-semibold tracking-tighter md:text-5xl">
              Our comprehensive approach to delivering exceptional results
              through a structured methodology
            </h1>
            <Button variant="ghost" className="mt-6 lg:text-base">
              <CornerDownLeft className="size-5 text-orange-500" /> Get in touch
            </Button>
          </div>
        </div>
        <ul className="mt-20 space-y-2">
          {services.map((service, index) => (
            <motion.li
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: index * 0.1,
              }}
              key={service.id}
              className="relative flex h-54 w-full flex-col justify-center gap-5 md:h-27 lg:flex-row lg:items-center lg:justify-between"
            >
              <div
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, transparent, transparent 2px, var(--muted) 2px, var(--muted) 4px)",
                }}
                className={cn(
                  "absolute left-1/2 h-54 w-screen -translate-x-1/2 md:h-27",
                )}
              ></div>

              <h3 className="relative z-1 text-3xl font-medium tracking-tight md:text-8xl">
                {service.title}
              </h3>
              <div className="relative z-10 flex w-full max-w-xs flex-wrap gap-2">
                {service.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className="flex items-center justify-center gap-3"
                  >
                    <Milestone className="size-5 text-muted-foreground" />{" "}
                    {option}
                  </div>
                ))}
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export { Services20 };

```

```tsx
"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { BorderButton } from "@/components/shadcnblocks/border-button";

// Custom hook to get previous value
const usePrevious = <T,>(value: T): T | undefined => {
  const [prev, setPrev] = useState<T | undefined>(undefined);
  const ref = useRef(value);

  useEffect(() => {
    setPrev(ref.current);
    ref.current = value;
  }, [value]);

  return prev;
};

interface Services21Props {
  className?: string;
}

const Services21 = ({ className }: Services21Props) => {
  const services = [
    {
      id: "{01}",
      title: "Product Design",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img11.png",
      description:
        "We begin by understanding your business goals, target audience, and current challenges. This phase involves research, analysis, and strategic planning to identify opportunities.",
    },
    {
      id: "{02}",
      title: "Brand Design",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img25.jpeg",
      description:
        "Based on our findings, we develop a comprehensive strategy that aligns with your objectives. This includes defining the approach, timeline, and key milestones for success.",
    },
    {
      id: "{03}",
      title: "UI/UX Design",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img10.png",
      description:
        "We bring the strategy to life through careful implementation and development. Our team works collaboratively to ensure every detail meets your requirements and standards.",
    },
    {
      id: "{04}",
      title: "Branding",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img9.png",
      description:
        "We continuously monitor performance and gather feedback to refine and improve the solution. This iterative process ensures long-term success and growth.",
    },
    {
      id: "{05}",
      title: " Packaging",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img25.jpeg",
      description:
        "We create comprehensive packaging solutions that protect your products while enhancing brand visibility. Our designs balance functionality with aesthetic appeal to drive consumer engagement.",
    },
  ];

  const [active, setActive] = useState<number>(0);
  const previousActive = usePrevious(active);

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex w-full flex-col justify-between lg:flex-row lg:gap-20">
          <div className="top-10 h-fit w-full space-y-7 py-8 lg:sticky lg:max-w-xs">
            <div className="relative h-90 overflow-hidden">
              {previousActive !== undefined && (
                <div className="absolute top-0 h-full w-full">
                  <img
                    src={services[previousActive].image}
                    className="h-full w-full object-cover"
                    alt=""
                  />
                </div>
              )}
              <motion.div
                initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                key={active}
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 20,
                }}
                className="h-full w-full"
              >
                <img
                  src={services[active].image}
                  className="h-full w-full object-cover"
                  alt=""
                />
              </motion.div>
            </div>
            <p className="font-semibold tracking-tight text-foreground/20 uppercase">
              {services[active].title}
            </p>
            <p className="text-base text-foreground/50">
              {services[active].description}
            </p>
          </div>
          <div className="relative w-full xl:pl-20">
            <ul>
              {services.map((service, index) => (
                <li
                  key={index}
                  onMouseEnter={() => setActive(index)}
                  className={cn(
                    "cursor-pointer border-b border-foreground/20 py-8 text-5xl font-semibold tracking-tight lg:text-7xl",
                  )}
                >
                  <div
                    className={index === active ? "opacity-100" : "opacity-20"}
                  >
                    <span>{service.title}</span>
                    <sup className="align-super text-sm text-red-500 lg:text-3xl">
                      {service.id}
                    </sup>
                  </div>
                </li>
              ))}
            </ul>
            <BorderButton className="group mt-10 border-red-100 bg-red-500/10 text-red-500">
              Get Started{" "}
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
            </BorderButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Services21 };

```

```tsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  ClockCircle,
  Shield,
  TrendingUp,
  Users,
} from "@mynaui/icons-react";

export default function Component() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <Badge variant="outline">Our Features</Badge>
        <h2 className="my-3 text-balance text-3xl font-bold tracking-tight">
          Mastering Project Management
        </h2>
        <p className="text-base text-muted-foreground">
          Elevate your projects with our comprehensive toolkit
        </p>
      </div>

      <div className="mb-6 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <Calendar className="mb-2 size-8 stroke-2 text-red-500" />
            <CardTitle>Timeline Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              Create and manage project timelines with ease. Set milestones,
              track deadlines, and visualize project progress in real-time.
            </p>
            <Button variant="outline">Explore Timelines</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Users className="mb-2 size-8 stroke-2 text-blue-500" />
            <CardTitle>Team Collaboration</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              Enhance team productivity with our collaboration tools. Share
              documents, communicate effectively, and work together seamlessly.
            </p>
            <Button variant="outline">Boost Teamwork</Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <TrendingUp className="mb-2 size-8 stroke-2 text-green-500" />
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              Track key performance indicators and project health. Generate
              insightful reports to make data-driven decisions.
            </p>
            <Button variant="outline">View Metrics</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <ClockCircle className="mb-2 size-8 stroke-2 text-yellow-500" />
            <CardTitle>Time Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              Monitor time spent on tasks and projects. Improve estimation
              accuracy and optimize resource allocation.
            </p>
            <Button variant="outline">Start Tracking</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Shield className="mb-2 size-8 stroke-2 text-purple-500" />
            <CardTitle>Risk Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              Identify, assess, and mitigate project risks. Stay prepared with
              contingency plans and proactive risk strategies.
            </p>
            <Button variant="outline">Manage Risks</Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

```

```tsx
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  Calendar,
  CircleDollarSign,
  ClipboardList,
  Globe,
  LifeBuoy,
  Lock,
  Mail,
  MessageSquareText,
  PenTool,
  Receipt,
  SearchCheck,
  ShieldCheck,
  Smartphone,
  Star,
  Users2,
  Wrench,
} from 'lucide-react';

interface IconFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FeatureCategory {
  id: string;
  name: string;
  description: string;
  features: IconFeature[];
}

export default function IconTabsCategories() {
  const categories: FeatureCategory[] = [
    {
      id: 'business',
      name: 'Business',
      description:
        "Essential features to help your business grow and succeed in today's competitive market.",
      features: [
        {
          icon: <Building2 className="h-5 w-5" />,
          title: 'Company Management',
          description:
            'Comprehensive tools to organize and manage your company structure efficiently.',
        },
        {
          icon: <CircleDollarSign className="h-5 w-5" />,
          title: 'Finance Tracking',
          description:
            'Real-time monitoring of revenue, expenses, and financial performance.',
        },
        {
          icon: <Receipt className="h-5 w-5" />,
          title: 'Invoicing',
          description:
            'Create and send professional invoices with automated payment reminders.',
        },
        {
          icon: <BriefcaseBusiness className="h-5 w-5" />,
          title: 'Client Management',
          description:
            'Organize client information and track engagement history in one place.',
        },
        {
          icon: <BarChart3 className="h-5 w-5" />,
          title: 'Performance Analytics',
          description:
            'Detailed insights and reporting to measure business performance.',
        },
        {
          icon: <Calendar className="h-5 w-5" />,
          title: 'Scheduling',
          description:
            'Efficiently manage appointments, meetings, and team availability.',
        },
      ],
    },
    {
      id: 'technology',
      name: 'Technology',
      description:
        'Cutting-edge technology features designed to enhance productivity and streamline operations.',
      features: [
        {
          icon: <Globe className="h-5 w-5" />,
          title: 'Cloud Integration',
          description:
            'Seamlessly connect with popular cloud services for data synchronization.',
        },
        {
          icon: <Lock className="h-5 w-5" />,
          title: 'Advanced Security',
          description:
            'Enterprise-grade encryption and protection for sensitive information.',
        },
        {
          icon: <Smartphone className="h-5 w-5" />,
          title: 'Mobile Optimization',
          description:
            'Fully responsive design that works perfectly on any device.',
        },
        {
          icon: <SearchCheck className="h-5 w-5" />,
          title: 'Smart Search',
          description:
            'AI-powered search functionality that learns from user behavior.',
        },
        {
          icon: <Wrench className="h-5 w-5" />,
          title: 'API Access',
          description:
            'Integrate our platform with your existing tools and workflows.',
        },
        {
          icon: <ClipboardList className="h-5 w-5" />,
          title: 'Version Control',
          description: 'Track changes and maintain document history with ease.',
        },
      ],
    },
    {
      id: 'support',
      name: 'Support',
      description:
        'Comprehensive support features to ensure you have help whenever you need it.',
      features: [
        {
          icon: <MessageSquareText className="h-5 w-5" />,
          title: 'Live Chat',
          description:
            'Connect with our support team instantly through our real-time chat system.',
        },
        {
          icon: <Mail className="h-5 w-5" />,
          title: 'Email Support',
          description:
            'Detailed responses to your inquiries with 24-hour turnaround time.',
        },
        {
          icon: <LifeBuoy className="h-5 w-5" />,
          title: 'Help Center',
          description:
            'Extensive knowledge base with guides, tutorials, and FAQs.',
        },
        {
          icon: <Users2 className="h-5 w-5" />,
          title: 'Community Forum',
          description:
            'Connect with other users to share tips and solve problems together.',
        },
        {
          icon: <ShieldCheck className="h-5 w-5" />,
          title: 'Priority Support',
          description:
            'Dedicated support agents for premium customers with expedited response times.',
        },
        {
          icon: <PenTool className="h-5 w-5" />,
          title: 'Custom Solutions',
          description:
            'Tailored support for your specific business needs and challenges.',
        },
      ],
    },
  ];

  const [activeTab, setActiveTab] = useState(categories[0].id);

  return (
    <section className="bg-background w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="mb-8 flex flex-col items-center justify-center space-y-4 text-center">
          <Badge className="px-3.5 py-1.5">Categories</Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Explore our features
          </h2>
          <p className="text-muted-foreground max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Discover our full suite of tools organized by category to help you
            find exactly what you need.
          </p>
        </div>

        <Tabs
          defaultValue={categories[0].id}
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-8"
        >
          <div className="flex justify-center">
            <TabsList className="grid h-fit w-full max-w-md grid-cols-3">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="text-sm md:text-base"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map((category) => (
            <TabsContent
              key={category.id}
              value={category.id}
              className="space-y-8"
            >
              <div className="text-center">
                <h3 className="mb-2 text-xl font-semibold">
                  {category.name} Features
                </h3>
                <p className="text-muted-foreground mx-auto max-w-2xl">
                  {category.description}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {category.features.map((feature, index) => (
                  <div
                    key={index}
                    className="group bg-card hover:border-primary/50 flex flex-col rounded-lg border p-6 transition-all duration-200 hover:shadow-md"
                  >
                    <div className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground mb-4 flex h-12 w-12 items-center justify-center rounded-full transition-all duration-200">
                      {feature.icon}
                    </div>
                    <h4 className="mb-2 text-lg font-medium">
                      {feature.title}
                    </h4>
                    <p className="text-muted-foreground mb-4 flex-1 text-sm">
                      {feature.description}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="group mt-auto w-fit"
                    >
                      <span className="text-sm">Learn more</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="flex justify-center pt-4">
                <Button asChild>
                  <a href="#">
                    Explore all {category.name.toLowerCase()} features
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Testimonial */}
        <div className="mt-24 text-center">
          <div className="bg-card relative mx-auto max-w-[800px] rounded-lg border p-8 shadow-sm">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <div className="bg-background flex h-6 w-6 items-center justify-center rounded-full border">
                <Star className="fill-primary text-primary h-3 w-3" />
              </div>
            </div>

            <blockquote className="text-muted-foreground relative text-lg font-medium italic">
              &ldquo;The categorized feature set has been a game-changer for our
              team. We can quickly find the tools we need and implement them
              into our workflow without any hassle.&rdquo;
            </blockquote>

            <div className="mt-6">
              <p className="font-medium">Alex Morgan</p>
              <p className="text-muted-foreground text-sm">
                Product Manager at TechCorp
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

```

```tsx
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function AnimatedFeaturesHero() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: 'Powerful Analytics',
      description:
        'Gain deep insights into user behavior and business metrics with our advanced analytics dashboard.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M3 3v18h18" />
          <path d="m19 9-5 5-4-4-3 3" />
        </svg>
      ),
    },
    {
      title: 'Team Collaboration',
      description:
        'Work seamlessly with your team in real-time with collaborative editing and shared workspaces.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      title: 'Smart Automation',
      description:
        'Automate repetitive tasks and workflows to save time and reduce errors in your processes.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14" />
          <path d="M2 20h20" />
          <path d="M14 12v.01" />
        </svg>
      ),
    },
    {
      title: 'Enterprise Security',
      description:
        'Rest easy with enterprise-grade security features including encryption, SSO, and compliance tools.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
    },
  ];

  return (
    <div className="from-background via-background to-muted/20 relative overflow-hidden bg-linear-to-b">
      <div className="container mx-auto px-4 py-24 md:px-6 md:py-32 2xl:max-w-[1400px]">
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Your platform for{' '}
            <span className="text-primary relative inline-flex">
              <span className="animate-text-gradient from-primary to-primary via-muted-foreground bg-linear-to-r bg-size-[200%_auto] bg-clip-text text-transparent">
                innovation
              </span>
            </span>
          </h1>
          <p className="text-muted-foreground mt-6 text-xl">
            A powerful, all-in-one platform that helps teams build better
            products, faster.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <a href="#">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#">Book a Demo</a>
            </Button>
          </div>
        </div>

        {/* Animated features showcase */}
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_500px]">
          {/* Left side animated tabs */}
          <div className="order-2 lg:order-1">
            <div className="bg-card rounded-xl border p-1">
              <div className="grid grid-cols-4 gap-1">
                {features.map((feature, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveFeature(index)}
                    className={`hover:bg-muted flex flex-col items-center justify-center rounded-lg p-3 text-center transition-colors ${
                      activeFeature === index
                        ? 'bg-primary text-primary-foreground hover:bg-primary'
                        : ''
                    }`}
                  >
                    <div className="mb-2">{feature.icon}</div>
                    <div className="text-xs font-medium">
                      {feature.title.split(' ')[0]}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 rounded-xl border p-6">
              <div className="flex items-center gap-4">
                <div
                  className={`rounded-full p-3 ${
                    activeFeature === 0
                      ? 'bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400'
                      : activeFeature === 1
                        ? 'bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400'
                        : activeFeature === 2
                          ? 'bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400'
                          : 'bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400'
                  }`}
                >
                  {features[activeFeature].icon}
                </div>
                <div>
                  <h3 className="font-medium">
                    {features[activeFeature].title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {features[activeFeature].description}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-2">
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
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-sm">
                    {activeFeature === 0
                      ? 'Real-time data visualization'
                      : activeFeature === 1
                        ? 'Real-time commenting and feedback'
                        : activeFeature === 2
                          ? 'Customizable workflow automation'
                          : 'Role-based access controls'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
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
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-sm">
                    {activeFeature === 0
                      ? 'Custom reports and dashboards'
                      : activeFeature === 1
                        ? 'Shared workspaces and permissions'
                        : activeFeature === 2
                          ? 'AI-powered suggestions'
                          : 'Data encryption at rest and in transit'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
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
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-sm">
                    {activeFeature === 0
                      ? 'Advanced filtering and segmentation'
                      : activeFeature === 1
                        ? 'Version history and comparison'
                        : activeFeature === 2
                          ? 'Scheduled tasks and triggers'
                          : 'Compliance with GDPR, HIPAA, SOC 2'}
                  </span>
                </div>
              </div>

              <div className="mt-6 border-t pt-6">
                <Button variant="ghost" size="sm" className="gap-1" asChild>
                  <a href="#">
                    Learn more about{' '}
                    {features[activeFeature].title.toLowerCase()}
                    <ArrowRight className="h-3 w-3" />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Right side animated illustration */}
          <div className="order-1 flex justify-center lg:order-2">
            <div className="relative aspect-square w-full max-w-md">
              {/* Animated illustration based on active feature */}
              <div
                className={`absolute inset-0 transition-opacity duration-500 ${
                  activeFeature === 0 ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="flex h-full w-full items-center justify-center rounded-xl border bg-linear-to-br from-blue-50 to-blue-100 p-8 dark:from-blue-950/30 dark:to-blue-900/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="240"
                    height="240"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-500"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M3 9h18" />
                    <path d="M3 15h18" />
                    <path d="M9 3v18" />
                    <path d="M15 3v18" />
                  </svg>
                </div>
              </div>

              <div
                className={`absolute inset-0 transition-opacity duration-500 ${
                  activeFeature === 1 ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="flex h-full w-full items-center justify-center rounded-xl border bg-linear-to-br from-purple-50 to-purple-100 p-8 dark:from-purple-950/30 dark:to-purple-900/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="240"
                    height="240"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-purple-500"
                  >
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    <circle cx="12" cy="2" r="1" />
                  </svg>
                </div>
              </div>

              <div
                className={`absolute inset-0 transition-opacity duration-500 ${
                  activeFeature === 2 ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="flex h-full w-full items-center justify-center rounded-xl border bg-linear-to-br from-green-50 to-green-100 p-8 dark:from-green-950/30 dark:to-green-900/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="240"
                    height="240"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-500"
                  >
                    <path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z" />
                    <path d="M12 13v8" />
                    <path d="M12 3v3" />
                  </svg>
                </div>
              </div>

              <div
                className={`absolute inset-0 transition-opacity duration-500 ${
                  activeFeature === 3 ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="flex h-full w-full items-center justify-center rounded-xl border bg-linear-to-br from-amber-50 to-amber-100 p-8 dark:from-amber-950/30 dark:to-amber-900/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="240"
                    height="240"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-amber-500"
                  >
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
              </div>
            </div>
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
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

export default function ProductCarouselHero() {
  const [activeIndex, setActiveIndex] = useState(0);

  const products = [
    {
      name: 'Premium Dashboard',
      description:
        'Analytics dashboard with advanced filtering and data visualization',
      image:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
      color: '#4f46e5',
    },
    {
      name: 'Mobile App',
      description:
        'Cross-platform mobile application with offline capabilities',
      image:
        'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3',
      color: '#0ea5e9',
    },
    {
      name: 'Design System',
      description: 'Comprehensive UI library with 100+ components and variants',
      image:
        'https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3',
      color: '#f59e0b',
    },
  ];

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + products.length) % products.length
    );
  };

  return (
    <div className="from-background to-muted/30 relative bg-linear-to-b">
      <div className="container mx-auto px-4 pt-24 pb-20 md:px-6 md:pt-32 md:pb-24 2xl:max-w-[1400px]">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <p className="text-primary text-sm font-medium tracking-widest uppercase">
                Introducing
              </p>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                Build beautiful products, faster.
              </h1>
              <p className="text-muted-foreground max-w-[600px] md:text-xl">
                Our comprehensive suite of tools helps teams design, develop,
                and deploy exceptional digital experiences.
              </p>
            </div>

            <ul className="space-y-2 pt-4">
              <li className="flex items-center gap-2">
                <Check className="text-primary h-5 w-5" />
                <span>Pre-built components save development time</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="text-primary h-5 w-5" />
                <span>Intuitive drag-and-drop interface</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="text-primary h-5 w-5" />
                <span>Regular updates and dedicated support</span>
              </li>
            </ul>

            <div className="flex flex-col gap-3 pt-4 sm:flex-row">
              <Button size="lg" asChild>
                <a href="#">Start Free Trial</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#">View Demo</a>
              </Button>
            </div>

            <div className="pt-6">
              <p className="text-muted-foreground mb-2 text-sm">
                Trusted by leading companies:
              </p>
              <div className="flex flex-wrap items-center gap-6">
                {['Microsoft', 'Airbnb', 'Spotify', 'Uber'].map(
                  (company, i) => (
                    <div
                      key={i}
                      className="text-muted-foreground/70 font-medium"
                    >
                      {company}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="relative">
            {/* Product showcase */}
            <div className="relative aspect-4/3 overflow-hidden rounded-xl border shadow-xl">
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  opacity: activeIndex === 0 ? 1 : 0,
                  zIndex: activeIndex === 0 ? 10 : 0,
                }}
              >
                <img
                  src={products[0].image}
                  alt={products[0].name}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                <div className="absolute right-0 bottom-0 left-0 p-6">
                  <h3 className="mb-1 text-xl font-bold text-white">
                    {products[0].name}
                  </h3>
                  <p className="text-sm text-white/80">
                    {products[0].description}
                  </p>
                </div>
              </div>

              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  opacity: activeIndex === 1 ? 1 : 0,
                  zIndex: activeIndex === 1 ? 10 : 0,
                }}
              >
                <img
                  src={products[1].image}
                  alt={products[1].name}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                <div className="absolute right-0 bottom-0 left-0 p-6">
                  <h3 className="mb-1 text-xl font-bold text-white">
                    {products[1].name}
                  </h3>
                  <p className="text-sm text-white/80">
                    {products[1].description}
                  </p>
                </div>
              </div>

              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  opacity: activeIndex === 2 ? 1 : 0,
                  zIndex: activeIndex === 2 ? 10 : 0,
                }}
              >
                <img
                  src={products[2].image}
                  alt={products[2].name}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                <div className="absolute right-0 bottom-0 left-0 p-6">
                  <h3 className="mb-1 text-xl font-bold text-white">
                    {products[2].name}
                  </h3>
                  <p className="text-sm text-white/80">
                    {products[2].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Carousel controls */}
            <div className="absolute right-0 -bottom-10 flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="h-10 w-10 rounded-full"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Previous</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="h-10 w-10 rounded-full"
              >
                <ArrowRight className="h-4 w-4" />
                <span className="sr-only">Next</span>
              </Button>
            </div>

            {/* Product indicators */}
            <div className="absolute -bottom-10 left-0 flex items-center gap-2">
              {products.map((product, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    activeIndex === index ? 'w-8' : 'w-2.5 opacity-50'
                  }`}
                  style={{ backgroundColor: product.color }}
                  aria-label={`View ${product.name}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

```

```tsx
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HeroSectionWithFeatureCards() {
  return (
    <>
      {/* Hero */}
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px] py-24 lg:py-32">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4">
            Powerful & Flexible
          </Badge>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
            Build beautiful interfaces with ease
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Our component library provides everything you need to create
            stunning web applications that look great on any device.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button size="lg">Get started</Button>
            <Button size="lg" variant="outline">
              View documentation
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="p-0 h-auto font-medium">
                  Learn more
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
                    className="ml-1 h-4 w-4"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Brands */}
        <div className="mt-20">
          <p className="text-center text-sm text-muted-foreground mb-6">
            TRUSTED BY LEADING COMPANIES WORLDWIDE
          </p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
            {brands.map((brand, index) => (
              <div key={index} className="flex items-center">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}

const features = [
  {
    title: "Responsive Design",
    description:
      "All components are fully responsive and adapt seamlessly to any screen size or device.",
    icon: (
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
        className="text-primary"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <line x1="3" x2="21" y1="9" y2="9" />
        <line x1="9" x2="9" y1="21" y2="9" />
      </svg>
    ),
  },
  {
    title: "Customizable Themes",
    description:
      "Easily customize colors, typography, and other design elements to match your brand.",
    icon: (
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
        className="text-primary"
      >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
        <line x1="21.17" x2="12" y1="8" y2="8" />
        <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
        <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
      </svg>
    ),
  },
  {
    title: "Accessible Components",
    description:
      "Built with accessibility in mind, ensuring your application is usable by everyone.",
    icon: (
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
        className="text-primary"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="m16 12-4-4-4 4" />
        <path d="M12 16V8" />
      </svg>
    ),
  },
  {
    title: "Dark Mode Support",
    description:
      "Seamlessly switch between light and dark modes with our built-in theming system.",
    icon: (
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
        className="text-primary"
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
    ),
  },
  {
    title: "Performance Optimized",
    description:
      "Lightweight components that load quickly and perform smoothly for the best user experience.",
    icon: (
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
        className="text-primary"
      >
        <path d="m13 2-2 2.5h3L12 7" />
        <path d="M12 22v-3" />
        <path d="M12 17v-2" />
        <path d="M12 11V9" />
        <path d="m17 8 5 3-5 3" />
        <path d="m7 8-5 3 5 3" />
      </svg>
    ),
  },
  {
    title: "Developer Friendly",
    description:
      "Well-documented components with TypeScript support for a smooth development experience.",
    icon: (
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
        className="text-primary"
      >
        <path d="M16 18a4 4 0 0 0-8 0" />
        <circle cx="12" cy="10" r="3" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
  },
];

const brands = [
  <svg
    key={1}
    className="w-20 h-auto"
    width={106}
    height={36}
    viewBox="0 0 106 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0)">
      <path
        d="M55.4732 9.52669C55.4732 10.6846 54.5258 11.6846 53.3153 11.6846C52.1048 11.6846 51.1574 10.7372 51.1574 9.52669C51.1574 8.31616 52.0521 7.36879 53.3153 7.36879C54.5785 7.47406 55.4732 8.42142 55.4732 9.52669ZM46.6837 13.8425C46.6837 14.053 46.6837 14.3688 46.6837 14.3688C46.6837 14.3688 45.6837 13.053 43.5258 13.053C39.9469 13.053 37.1574 15.7898 37.1574 19.5267C37.1574 23.2635 39.8942 26.0004 43.5258 26.0004C45.7363 26.0004 46.6837 24.6319 46.6837 24.6319V25.2109C46.6837 25.4741 46.8942 25.6846 47.1574 25.6846H49.789V13.3688C49.789 13.3688 47.3679 13.3688 47.1574 13.3688C46.8942 13.3688 46.6837 13.632 46.6837 13.8425ZM46.6837 21.7372C46.21 22.4741 45.21 23.1056 44.0521 23.1056C41.9469 23.1056 40.3679 21.7898 40.3679 19.5793C40.3679 17.3688 41.9995 16.053 44.0521 16.053C45.21 16.053 46.2627 16.6846 46.6837 17.4214V21.7372ZM51.789 13.3688H54.9469V25.6846H51.789V13.3688ZM98.789 13.053C96.6311 13.053 95.6311 14.3688 95.6311 14.3688V7.47406H92.4732V25.7372C92.4732 25.7372 94.8942 25.7372 95.1048 25.7372C95.3679 25.7372 95.5785 25.5267 95.5785 25.2635V24.6846C95.5785 24.6846 96.5785 26.053 98.7364 26.053C102.315 26.053 105.105 23.3162 105.105 19.5793C105.157 15.7898 102.368 13.053 98.789 13.053ZM98.2627 23.053C97.0521 23.053 96.1048 22.4214 95.6311 21.6846V17.2635C96.1048 16.632 97.1574 15.8951 98.2627 15.8951C100.368 15.8951 101.947 17.2109 101.947 19.4214C101.947 21.632 100.368 23.053 98.2627 23.053ZM90.8416 18.4214V25.7898H87.6837V18.7898C87.6837 16.7372 87.0521 15.9477 85.2627 15.9477C84.3153 15.9477 83.3153 16.4214 82.6837 17.1583V25.7372H79.5258V13.3688H81.9995C82.2627 13.3688 82.4732 13.5793 82.4732 13.8425V14.3688C83.3679 13.4214 84.6311 13.053 85.8416 13.053C87.21 13.053 88.3679 13.4214 89.2627 14.2109C90.4206 15.1583 90.8416 16.3162 90.8416 18.4214ZM71.8942 13.053C69.7364 13.053 68.7364 14.3688 68.7364 14.3688V7.47406H65.5785V25.7372C65.5785 25.7372 67.9995 25.7372 68.21 25.7372C68.4732 25.7372 68.6837 25.5267 68.6837 25.2635V24.6846C68.6837 24.6846 69.6837 26.053 71.8416 26.053C75.4206 26.053 78.21 23.3162 78.21 19.5793C78.2627 15.7898 75.4732 13.053 71.8942 13.053ZM71.3679 23.053C70.1574 23.053 69.21 22.4214 68.7364 21.6846V17.2635C69.21 16.632 70.2627 15.8951 71.3679 15.8951C73.4732 15.8951 75.0521 17.2109 75.0521 19.4214C75.0521 21.632 73.4732 23.053 71.3679 23.053ZM62.8416 13.053C63.789 13.053 64.2627 13.2109 64.2627 13.2109V16.1056C64.2627 16.1056 61.6311 15.2109 59.9995 17.1056V25.7372H56.8416V13.3688C56.8416 13.3688 59.2627 13.3688 59.4732 13.3688C59.7364 13.3688 59.9469 13.5793 59.9469 13.8425V14.3688C60.5785 13.6846 61.8942 13.053 62.8416 13.053ZM30.1574 24.6319C29.9995 24.2635 29.8416 23.7898 29.6837 23.4741C29.4206 22.8951 29.1574 22.3162 28.9469 21.7898L28.8942 21.7372C26.6311 16.8425 24.21 11.8425 21.6311 6.89511L21.5258 6.68458C21.2627 6.2109 20.9995 5.68458 20.7363 5.15827C20.4206 4.57932 20.1048 3.94774 19.5785 3.36879C18.5258 2.053 16.9995 1.31616 15.4206 1.31616C13.789 1.31616 12.3153 2.053 11.21 3.26353C10.6837 3.89511 10.3153 4.47406 9.99951 5.10564C9.73635 5.63195 9.47319 6.15827 9.21003 6.63195L9.10477 6.84248C6.57845 11.7372 4.10477 16.7372 1.84161 21.6846L1.78898 21.7372C1.57845 22.2635 1.3153 22.8425 1.05214 23.4214C0.894243 23.7898 0.736348 24.1583 0.578453 24.5793C0.1574 25.7898 -0.000494249 26.9477 0.210032 28.1056C0.578453 30.5793 2.21003 32.632 4.47319 33.5267C5.3153 33.8951 6.21003 34.053 7.10477 34.053C7.36793 34.053 7.68372 34.0004 7.94687 34.0004C9.05214 33.8951 10.1574 33.5267 11.21 32.8951C12.5785 32.1583 13.8416 31.053 15.2627 29.4741C16.6837 31.053 17.9995 32.1056 19.3153 32.8951C20.4206 33.5267 21.5258 33.8951 22.5785 34.0004C22.8416 34.053 23.1574 34.053 23.4206 34.053C24.3153 34.053 25.2627 33.8951 26.0521 33.5267C28.3679 32.632 29.9469 30.5267 30.3153 28.1056C30.6837 26.9477 30.5785 25.8425 30.1574 24.6319ZM15.3679 26.3162C13.5785 24.1056 12.4732 22.0004 12.0521 20.2109C11.8942 19.4741 11.8416 18.7898 11.9469 18.2109C11.9995 17.6846 12.21 17.2109 12.4732 16.8425C13.1048 15.9477 14.1574 15.4214 15.3679 15.4214C16.5785 15.4214 17.6837 15.9477 18.2627 16.8425C18.5258 17.2109 18.7363 17.6846 18.789 18.2109C18.8942 18.7898 18.8416 19.4741 18.6837 20.2109C18.2627 21.9477 17.1048 24.053 15.3679 26.3162ZM28.4206 27.8425C28.21 29.5267 27.0521 31.0004 25.4206 31.6846C24.6311 32.0004 23.789 32.1056 22.9469 32.0004C22.1048 31.8951 21.3153 31.632 20.4732 31.1583C19.3153 30.5267 18.1048 29.4741 16.7363 28.0004C18.8942 25.3688 20.21 22.8951 20.6837 20.7372C20.8942 19.7372 20.9469 18.7898 20.8416 17.9477C20.7363 17.1056 20.4206 16.3688 19.9469 15.7372C18.9469 14.2635 17.21 13.4214 15.3153 13.4214C13.4206 13.4214 11.6837 14.3162 10.6837 15.7372C10.21 16.3688 9.94687 17.1583 9.78898 17.9477C9.68372 18.7898 9.68372 19.7372 9.94687 20.7372C10.4206 22.8951 11.789 25.3688 13.8942 28.0004C12.5258 29.5267 11.3153 30.5267 10.1574 31.1583C9.3153 31.632 8.47319 31.8951 7.68372 32.0004C6.78898 32.1056 5.94687 31.9477 5.21003 31.6846C3.57845 31.053 2.47319 29.5267 2.21003 27.8425C2.10477 27.0004 2.1574 26.2109 2.52582 25.2635C2.63108 24.9477 2.78898 24.632 2.94687 24.2109C3.1574 23.6846 3.42056 23.1056 3.68372 22.5793L3.73635 22.5267C5.99951 17.632 8.42056 12.632 10.9469 7.78985L11.0521 7.57932C11.3153 7.10564 11.5785 6.57932 11.8416 6.053C12.1048 5.52669 12.4206 5.053 12.7363 4.63195C13.4206 3.84248 14.3679 3.42143 15.3679 3.42143C16.3679 3.42143 17.3153 3.84248 17.9995 4.63195C18.3679 5.053 18.6311 5.52669 18.8942 6.053C19.1574 6.52669 19.4206 7.053 19.6837 7.57932L19.789 7.78985C22.2627 12.6846 24.6837 17.6846 26.9469 22.5267V22.5793C27.21 23.1056 27.4206 23.6846 27.6837 24.2109C27.8416 24.5793 27.9995 24.9477 28.1048 25.2635C28.4732 26.1583 28.5785 27.0004 28.4206 27.8425Z"
        fill="currentColor"
        className=""
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect
          width="105.474"
          height={35}
          fill="currentColor"
          className=""
          transform="translate(0 0.26355)"
        />
      </clipPath>
    </defs>
  </svg>,
  <svg
    key={2}
    className="w-20 h-auto"
    width={140}
    height={47}
    viewBox="0 0 140 47"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.3991 8.15082C20.3991 9.61789 19.1416 10.8754 17.6745 10.8754C16.2075 10.8754 14.95 9.61789 14.95 8.15082C14.95 6.68375 16.2075 5.42627 17.6745 5.42627C19.1416 5.42627 20.3991 6.68375 20.3991 8.15082ZM17.6745 13.1109C16.0678 13.1109 14.8103 14.3684 14.8103 15.9752C14.8103 17.582 16.0678 18.8394 17.6745 18.8394C19.2813 18.8394 20.5388 17.582 20.5388 15.9752C20.5388 14.2985 19.2813 13.1109 17.6745 13.1109ZM17.6745 20.7257C16.0678 20.7257 14.7404 22.053 14.7404 23.6598C14.7404 25.2666 16.0678 26.5939 17.6745 26.5939C19.2813 26.5939 20.6087 25.2666 20.6087 23.6598C20.6785 22.053 19.2813 20.7257 17.6745 20.7257ZM17.6745 28.4802C16.0678 28.4802 14.8103 29.7376 14.8103 31.3444C14.8103 32.9512 16.0678 34.2087 17.6745 34.2087C19.2813 34.2087 20.5388 32.9512 20.5388 31.3444C20.5388 29.8075 19.2813 28.4802 17.6745 28.4802ZM17.6745 36.3744C16.2075 36.3744 14.95 37.6319 14.95 39.0989C14.95 40.566 16.2075 41.8235 17.6745 41.8235C19.1416 41.8235 20.3991 40.566 20.3991 39.0989C20.3991 37.6319 19.2115 36.3744 17.6745 36.3744ZM25.2195 12.7616C23.4729 12.7616 22.0059 14.2287 22.0059 15.9752C22.0059 17.7217 23.4729 19.1887 25.2195 19.1887C26.966 19.1887 28.433 17.7217 28.433 15.9752C28.433 14.2287 26.966 12.7616 25.2195 12.7616ZM25.2195 20.3764C23.4031 20.3764 21.8662 21.8434 21.8662 23.7297C21.8662 25.546 23.3332 27.083 25.2195 27.083C27.0358 27.083 28.5728 25.6159 28.5728 23.7297C28.5728 21.8434 27.0358 20.3764 25.2195 20.3764ZM25.2195 28.1309C23.4729 28.1309 22.0059 29.5979 22.0059 31.3444C22.0059 33.0909 23.4729 34.558 25.2195 34.558C26.966 34.558 28.433 33.0909 28.433 31.3444C28.433 29.5979 26.966 28.1309 25.2195 28.1309ZM32.9739 19.9572C31.0179 19.9572 29.2714 21.564 29.2714 23.6598C29.2714 25.6159 30.8781 27.3624 32.9739 27.3624C35.0698 27.3624 36.6765 25.7556 36.6765 23.6598C36.5368 21.564 34.93 19.9572 32.9739 19.9572ZM10.0598 13.4602C8.73243 13.4602 7.61466 14.578 7.61466 15.9053C7.61466 17.2327 8.73243 18.3504 10.0598 18.3504C11.3871 18.3504 12.5049 17.2327 12.5049 15.9053C12.5049 14.578 11.457 13.4602 10.0598 13.4602ZM10.0598 21.075C8.59271 21.075 7.47494 22.1927 7.47494 23.6598C7.47494 25.1269 8.59271 26.2446 10.0598 26.2446C11.5268 26.2446 12.6446 25.1269 12.6446 23.6598C12.6446 22.1927 11.5268 21.075 10.0598 21.075ZM10.0598 28.8295C8.73243 28.8295 7.61466 29.9472 7.61466 31.2746C7.61466 32.6019 8.73243 33.7197 10.0598 33.7197C11.3871 33.7197 12.5049 32.6019 12.5049 31.2746C12.5049 29.9472 11.457 28.8295 10.0598 28.8295ZM2.445 21.4941C1.18752 21.4941 0.209473 22.4722 0.209473 23.7297C0.209473 24.9871 1.18752 25.9652 2.445 25.9652C3.70249 25.9652 4.68053 24.9871 4.68053 23.7297C4.68053 22.4722 3.70249 21.4941 2.445 21.4941Z"
      fill="currentColor"
      className=""
    />
    <path
      d="M64.4812 18.9092C64.2018 18.9092 63.9922 19.1886 63.9922 19.3982V38.7495C63.9922 39.0289 64.2716 39.2385 64.4812 39.2385H66.7866C67.066 39.2385 67.2756 38.9591 67.2756 38.7495V19.3982C67.2756 19.1188 66.9962 18.9092 66.7866 18.9092H64.4812Z"
      fill="currentColor"
      className=""
    />
    <path
      d="M65.7389 10.7358C64.4815 10.7358 63.5034 11.7139 63.5034 12.9714C63.5034 14.2289 64.4815 15.2069 65.7389 15.2069C66.9964 15.2069 67.9745 14.2289 67.9745 12.9714C67.9745 11.7139 66.9266 10.7358 65.7389 10.7358Z"
      fill="currentColor"
      className=""
    />
    <path
      d="M114.082 18.9092C113.803 18.9092 113.593 19.1886 113.593 19.3982V38.7495C113.593 39.0289 113.873 39.2385 114.082 39.2385H116.388C116.667 39.2385 116.877 38.9591 116.877 38.7495V19.3982C116.877 19.1188 116.597 18.9092 116.388 18.9092H114.082Z"
      fill="currentColor"
      className=""
    />
    <path
      d="M115.2 10.7358C113.942 10.7358 112.964 11.7139 112.964 12.9714C112.964 14.2289 113.942 15.2069 115.2 15.2069C116.457 15.2069 117.435 14.2289 117.435 12.9714C117.435 11.7139 116.457 10.7358 115.2 10.7358Z"
      fill="currentColor"
      className=""
    />
    <path
      d="M138.603 37.3525C138.743 37.2127 138.743 37.073 138.743 37.0031C138.743 36.8634 138.743 36.8634 138.743 36.8634C138.743 36.8634 138.743 36.7237 138.603 36.7237C138.603 36.7237 138.463 36.584 138.324 36.584C138.184 36.584 138.184 36.584 138.044 36.584H137.416V38.3305H137.695V37.7018H138.044L138.533 38.3305H138.813L138.184 37.562C138.463 37.6319 138.603 37.4922 138.603 37.3525ZM137.765 37.4922V36.8634H138.254C138.394 36.8634 138.533 36.8634 138.603 37.0031C138.743 37.0031 138.743 37.1429 138.743 37.2826C138.743 37.4223 138.743 37.562 138.603 37.562C138.463 37.562 138.324 37.7018 138.254 37.7018H137.765V37.4922Z"
      fill="currentColor"
      className=""
    />
    <path
      d="M138.114 35.8853C137.276 35.8853 136.507 36.6537 136.507 37.492C136.507 38.3304 137.276 39.0988 138.114 39.0988C138.952 39.0988 139.721 38.3304 139.721 37.492C139.721 36.5839 139.022 35.8853 138.114 35.8853ZM138.114 38.9591C137.276 38.9591 136.647 38.3304 136.647 37.492C136.647 36.6537 137.276 36.025 138.114 36.025C138.952 36.025 139.581 36.6537 139.581 37.492C139.581 38.3304 138.883 38.9591 138.114 38.9591Z"
      fill="currentColor"
      className=""
    />
    <path
      d="M83.6928 22.0531C83.9722 22.0531 84.1818 21.7737 84.1818 21.5641V19.2587C84.1818 18.9793 83.9024 18.7697 83.6928 18.7697H78.7327V11.3645C78.7327 11.0851 78.4533 10.8755 78.2437 10.8755H75.9383C75.6588 10.8755 75.4493 11.1549 75.4493 11.3645V18.7697H73.0042C72.7247 18.7697 72.5151 19.0491 72.5151 19.2587V21.5641C72.5151 21.8436 72.7946 22.0531 73.0042 22.0531H75.4493V33.2308C75.4493 36.6539 77.7547 38.8895 81.108 38.8895H83.5531C83.8325 38.8895 84.0421 38.61 84.0421 38.4004V36.0951C84.0421 35.8156 83.7626 35.606 83.5531 35.606H81.4573C79.8505 35.606 78.7327 34.4883 78.7327 32.7418V21.9833L83.6928 22.0531Z"
      fill="currentColor"
      className=""
    />
    <path
      d="M132.735 22.0531C133.014 22.0531 133.224 21.7737 133.224 21.5641V19.2587C133.224 18.9793 132.944 18.7697 132.735 18.7697H127.775V11.3645C127.775 11.0851 127.495 10.8755 127.286 10.8755H124.98C124.701 10.8755 124.491 11.1549 124.491 11.3645V18.7697H122.046C121.767 18.7697 121.557 19.0491 121.557 19.2587V21.5641C121.557 21.8436 121.837 22.0531 122.046 22.0531H124.491V33.2308C124.491 36.6539 126.797 38.8895 130.15 38.8895H132.595C132.874 38.8895 133.084 38.61 133.084 38.4004V36.0951C133.084 35.8156 132.805 35.606 132.595 35.606H130.36C128.753 35.606 127.635 34.4883 127.635 32.7418V21.9833L132.735 22.0531Z"
      fill="currentColor"
      className=""
    />
    <path
      d="M49.8106 22.053V38.5401C49.8106 38.8195 50.09 39.0291 50.2996 39.0291H52.605C52.8844 39.0291 53.094 38.7497 53.094 38.5401V22.053H58.5431C58.8226 22.053 59.0321 21.7736 59.0321 21.564V19.2586C59.0321 18.9792 58.7527 18.7696 58.5431 18.7696H53.094V14.4383C53.094 12.6918 54.3515 11.5041 55.8186 11.5041H58.5431C58.8226 11.5041 59.0321 11.2247 59.0321 11.0151V8.70973C59.0321 8.43028 58.7527 8.2207 58.5431 8.2207H55.9583C52.5351 8.2207 49.8106 11.085 49.8106 14.3684V18.7696H47.3655C47.086 18.7696 46.8765 19.049 46.8765 19.2586V21.564C46.8765 21.8435 47.1559 22.053 47.3655 22.053H49.8106Z"
      fill="currentColor"
      className=""
    />
    <path
      d="M106.258 21.2148C104.442 19.2587 101.857 18.1409 99.1321 18.1409C96.5473 18.1409 93.9625 19.2587 92.3557 20.8655V8.57008C92.3557 8.29064 92.0763 8.08105 91.8667 8.08105H89.5613C89.2818 8.08105 89.0723 8.3605 89.0723 8.57008V28.8994C89.0723 36.4443 94.1022 39.7278 99.0623 39.7278C103.952 39.7278 109.052 36.3745 109.052 28.8994C109.052 25.8954 108.074 23.1709 106.258 21.2148ZM99.0623 36.584C94.1022 36.584 92.2858 32.6719 92.2858 28.9693C92.2858 24.4284 95.0104 21.4244 99.0623 21.4244C103.114 21.4244 105.839 24.4982 105.839 28.9693C105.769 32.6719 104.022 36.584 99.0623 36.584Z"
      fill="currentColor"
      className=""
    />
  </svg>,
  <svg
    key={3}
    className="w-20 h-auto"
    width={200}
    height={67}
    viewBox="0 0 200 67"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M44.6108 11.7537C45.9082 11.7537 47.1058 11.3545 48.0041 10.5561C48.9023 9.75767 49.4013 8.65988 49.4013 7.46227C49.4013 6.16487 48.9023 5.16686 48.0041 4.26866C47.1058 3.47026 46.008 3.07104 44.6108 3.07104C43.3134 3.07104 42.2156 3.47026 41.3174 4.36846C40.4192 5.26666 40.02 6.26467 40.02 7.46227C40.02 8.65988 40.4192 9.65787 41.3174 10.5561C42.2156 11.3545 43.3134 11.7537 44.6108 11.7537Z"
      fill="currentColor"
      className=""
    />
    <path
      d="M73.3534 0.176758V20.6358H73.1538C72.8544 20.1368 72.3554 19.6378 71.8564 19.1388C71.2576 18.6398 70.559 18.1408 69.7606 17.7416C68.9622 17.3424 68.064 16.9432 66.9662 16.6438C65.8684 16.3444 64.6708 16.2446 63.3734 16.2446C61.2776 16.2446 59.3814 16.6438 57.6847 17.4422C55.9881 18.2406 54.4911 19.3384 53.1937 20.7356C51.9961 22.1328 50.9981 23.7297 50.2995 25.6259C49.6009 27.5221 49.3015 29.5181 49.3015 31.6139C49.3015 33.7097 49.6009 35.8055 50.2995 37.6019C50.8983 39.4981 51.8963 41.0949 53.1937 42.4921C54.4911 43.8893 55.9881 44.9871 57.6847 45.7855C59.4812 46.5839 61.4772 46.9831 63.7726 46.9831C65.8684 46.9831 67.7646 46.5839 69.561 45.7855C71.3574 44.9871 72.7546 43.6897 73.8524 41.8933H73.9522V46.0849H80.8384V0.176758H73.3534ZM73.054 34.8075C72.6548 35.9053 72.056 36.8035 71.3574 37.6019C70.559 38.4003 69.6608 39.0989 68.6628 39.4981C67.565 39.9971 66.3674 40.1967 65.07 40.1967C63.7726 40.1967 62.575 39.9971 61.4772 39.4981C60.3794 38.9991 59.4812 38.4003 58.7826 37.6019C57.9841 36.8035 57.4851 35.9053 57.0859 34.8075C56.6867 33.7097 56.4871 32.7117 56.4871 31.5141C56.4871 30.4163 56.6867 29.3185 57.0859 28.2207C57.4851 27.1229 58.0839 26.2247 58.7826 25.4263C59.581 24.6279 60.4792 23.9293 61.4772 23.5301C62.575 23.031 63.7726 22.8314 65.07 22.8314C66.3674 22.8314 67.565 23.031 68.6628 23.5301C69.7606 24.0291 70.6588 24.6279 71.3574 25.4263C72.1558 26.2247 72.6548 27.1229 73.054 28.2207C73.4532 29.3185 73.6528 30.4163 73.6528 31.5141C73.6528 32.6119 73.4532 33.7097 73.054 34.8075Z"
      fill="currentColor"
      className=""
    />
    <path
      d="M130.739 19.9373L123.553 27.1229V40.3963H123.353C122.954 39.8973 122.555 39.3983 121.956 38.8993C121.357 38.4003 120.659 37.9013 119.86 37.5021C119.062 37.1029 118.164 36.7037 117.066 36.4043C116.367 36.2047 115.469 36.1049 114.571 36.0051L99.501 51.2746C99.501 53.3704 99.8004 55.3664 100.499 57.2626C101.098 59.1588 102.096 60.7556 103.393 62.1528C104.691 63.55 106.188 64.6478 107.884 65.3464C109.681 66.1448 111.677 66.544 113.872 66.544C115.968 66.544 117.864 66.1448 119.661 65.3464C121.457 64.548 122.854 63.2506 123.852 61.4542H123.952V65.8454H130.838V19.9373H130.739ZM123.253 54.4682C122.854 55.566 122.255 56.4642 121.557 57.2626C120.858 58.061 119.86 58.7596 118.862 59.1588C117.764 59.6578 116.667 59.8574 115.269 59.8574C113.972 59.8574 112.774 59.6578 111.677 59.1588C110.579 58.6598 109.681 58.061 108.982 57.2626C108.283 56.4642 107.685 55.566 107.285 54.4682C106.886 53.3704 106.687 52.3724 106.687 51.1748C106.687 50.077 106.886 48.9792 107.285 47.8814C107.685 46.7836 108.283 45.8854 108.982 45.087C109.681 44.2886 110.579 43.5899 111.677 43.1907C112.774 42.6917 113.872 42.4921 115.269 42.4921C116.567 42.4921 117.764 42.6917 118.862 43.1907C119.96 43.6897 120.858 44.2886 121.557 45.087C122.255 45.8854 122.854 46.7836 123.253 47.8814C123.653 48.9792 123.852 50.077 123.852 51.1748C123.852 52.3724 123.653 53.4702 123.253 54.4682Z"
      fill="currentColor"
      className=""
    />
    <path
      d="M162.275 44.9872C161.477 43.091 160.279 41.4941 158.882 40.1967C157.485 38.8993 155.788 37.8015 153.892 37.1029C151.996 36.4043 149.9 36.0051 147.704 36.0051C145.509 36.0051 143.513 36.4043 141.517 37.1029C139.621 37.8015 137.924 38.8993 136.527 40.1967C135.13 41.4941 134.032 43.091 133.134 44.9872C132.335 46.8834 131.936 48.9792 131.936 51.2746C131.936 53.57 132.335 55.6658 133.134 57.562C133.932 59.4582 135.13 61.055 136.527 62.3524C137.924 63.6498 139.621 64.7476 141.517 65.4462C143.413 66.1448 145.509 66.544 147.704 66.544C149.9 66.544 151.896 66.1448 153.892 65.4462C155.788 64.7476 157.485 63.6498 158.882 62.3524C160.279 61.055 161.377 59.4582 162.275 57.562C163.074 55.6658 163.473 53.57 163.473 51.2746C163.573 48.9792 163.174 46.8834 162.275 44.9872ZM155.689 54.4682C155.289 55.566 154.691 56.4642 153.992 57.2626C153.293 58.061 152.395 58.7596 151.297 59.1588C150.2 59.6578 149.102 59.8574 147.704 59.8574C146.407 59.8574 145.209 59.6578 144.112 59.1588C143.014 58.6598 142.116 58.061 141.417 57.2626C140.718 56.4642 140.12 55.566 139.72 54.4682C139.321 53.3704 139.122 52.3724 139.122 51.1748C139.122 50.077 139.321 48.9792 139.72 47.8814C140.12 46.7836 140.619 45.8854 141.417 45.087C142.116 44.2886 143.014 43.59 144.112 43.1908C145.209 42.6918 146.307 42.4922 147.704 42.4922C149.002 42.4922 150.2 42.6918 151.297 43.1908C152.395 43.6898 153.293 44.2886 153.992 45.087C154.691 45.8854 155.289 46.7836 155.689 47.8814C156.088 48.9792 156.287 50.077 156.287 51.1748C156.287 52.3724 156.088 53.4702 155.689 54.4682Z"
      fill="currentColor"
      className=""
    />
    <path
      d="M186.128 52.6718C185.329 51.574 184.431 50.6758 183.234 50.077C182.036 49.4782 180.838 48.9792 179.441 48.6798C178.144 48.3804 176.946 48.081 175.649 47.7816C174.451 47.4822 173.553 47.1828 172.755 46.7836C171.956 46.3844 171.557 45.6858 171.557 44.8874C171.557 43.7896 172.056 42.9912 172.954 42.4922C173.852 41.9932 174.85 41.7936 175.848 41.7936C178.244 41.7936 180.14 42.7916 181.537 44.7876L186.427 40.3963C185.23 38.7995 183.733 37.6019 181.836 37.0031C179.94 36.3045 178.044 36.0051 176.048 36.0051C174.551 36.0051 173.154 36.2047 171.757 36.5041C170.359 36.9033 169.062 37.4023 167.964 38.2007C166.866 38.9991 165.968 39.9971 165.369 41.0949C164.671 42.2926 164.371 43.6898 164.371 45.2866C164.371 47.1828 164.771 48.58 165.569 49.6778C166.367 50.7756 167.266 51.574 168.463 52.1728C169.661 52.7716 170.858 53.1708 172.256 53.4702C173.653 53.7696 174.85 53.9692 176.048 54.3684C177.246 54.6678 178.144 55.067 178.942 55.566C179.741 56.065 180.14 56.7636 180.14 57.7616C180.14 58.3604 179.94 58.8594 179.641 59.2586C179.341 59.6578 178.942 60.057 178.443 60.3564C177.944 60.6558 177.445 60.8554 176.846 60.9552C176.248 61.055 175.749 61.1548 175.25 61.1548C173.753 61.1548 172.455 60.8554 171.357 60.1568C170.26 59.4582 169.262 58.6598 168.363 57.562L163.473 62.1528C164.97 63.8494 166.667 65.047 168.563 65.6458C170.459 66.2446 172.555 66.6438 174.85 66.6438C176.248 66.6438 177.645 66.544 179.142 66.2446L187.425 57.9612C187.425 57.7616 187.425 57.562 187.425 57.3624C187.325 55.2666 186.926 53.7696 186.128 52.6718Z"
      fill="currentColor"
      className=""
    />
    <path
      d="M33.8322 17.3425L26.0478 37.5022H25.948L18.2634 17.3425L12.6746 22.9313L22.1556 46.085H29.8402L40.9181 18.1409V46.085H48.2035V17.3425H33.8322Z"
      fill="currentColor"
      className=""
    />
    <path
      d="M108.483 34.4084V29.4183C108.483 28.7197 108.483 27.9213 108.383 27.0231C108.383 26.1249 108.184 25.1269 107.984 24.2287C107.785 23.2307 107.385 22.3325 106.886 21.3345C106.387 20.4363 105.689 19.5381 104.691 18.8395C103.793 18.1409 102.595 17.5421 101.198 17.0431C99.8005 16.5441 98.0041 16.3445 96.0081 16.3445C93.7127 16.3445 91.5171 16.7437 89.3215 17.4423C87.1258 18.1409 85.2296 19.3385 83.6328 21.0351L87.4252 24.8275C88.4233 23.9293 89.5211 23.1309 90.9183 22.6319C92.2157 22.1329 93.7127 21.8335 95.2097 21.8335C97.1059 21.8335 98.7027 22.3325 100 23.2307C101.298 24.1289 101.896 25.5261 101.896 27.3225V28.1209H100.1C98.9023 28.1209 97.6049 28.1209 96.2077 28.2207C94.8105 28.3205 93.5131 28.4203 92.1159 28.6199C90.7187 28.8195 89.4213 29.2187 88.2237 29.6179C86.9262 30.0171 85.8284 30.6159 84.9302 31.4143C83.9322 32.1129 83.2336 33.1109 82.6348 34.2087C82.036 35.3066 81.8364 36.7038 81.8364 38.2008C81.8364 39.6978 82.1358 40.8954 82.7346 41.9932C83.3334 43.091 84.1318 43.9892 85.1298 44.6878C86.1278 45.3864 87.2256 45.9852 88.523 46.2846C89.8205 46.6838 91.1179 46.7836 92.4153 46.7836C94.0121 46.7836 95.4093 46.584 96.8065 46.085L108.483 34.4084ZM101.497 34.7078C101.497 36.8036 100.898 38.4004 99.7007 39.598C98.5031 40.7956 96.7067 41.3944 94.1119 41.3944C93.5131 41.3944 92.9143 41.2946 92.3155 41.1948C91.7167 41.095 91.1179 40.7956 90.7187 40.4962C90.2197 40.1968 89.8205 39.7976 89.5211 39.2986C89.2217 38.7996 89.0221 38.3006 89.0221 37.602C89.0221 36.5042 89.4213 35.7058 90.2197 35.107C91.0181 34.5082 91.9163 34.109 93.0141 33.8096C94.1119 33.5101 95.3095 33.3105 96.5071 33.2107C97.8045 33.1109 98.9023 33.1109 99.9003 33.1109H101.397V34.7078H101.497Z"
      fill="currentColor"
      className=""
    />
  </svg>,
];

```

```tsx
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

{
  /* Add this to the global css file 
@keyframes float {
        0% {
        transform: translateY(0px);
        }
        50% {
        transform: translateY(-10px);
        }
        100% {
        transform: translateY(0px);
        }
    }
    .animate-float {
        animation: float 3s ease-in-out infinite;
    }*/
}

export default function HeroSectionWithIntegrationShowcase() {
  const integrations = [
    {
      name: "GitHub",
      description: "Connect your repositories",
      category: "Development",
      icon: (
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
        >
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      ),
    },
    {
      name: "Figma",
      description: "Import design files",
      category: "Design",
      icon: (
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
        >
          <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
          <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
          <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
          <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
          <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
        </svg>
      ),
    },
    {
      name: "Slack",
      description: "Team notifications",
      category: "Communication",
      icon: (
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
        >
          <rect width="3" height="8" x="13" y="2" rx="1.5" />
          <rect width="3" height="8" x="13" y="14" rx="1.5" />
          <rect width="3" height="8" x="2" y="8" rx="1.5" />
          <rect width="3" height="8" x="19" y="8" rx="1.5" />
          <path d="M7.5 10.5H19" />
          <path d="M5 16.5h12.5" />
          <path d="M7.5 4.5h12.5" />
        </svg>
      ),
    },
    {
      name: "VS Code",
      description: "Code editor integration",
      category: "Development",
      icon: (
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
        >
          <path d="m16 3-4 4-4-4" />
          <path d="M4 7h16" />
          <path d="M4 11h16" />
          <path d="M4 15h16" />
          <path d="m16 19-4-4-4 4" />
        </svg>
      ),
    },
    {
      name: "Notion",
      description: "Documentation sync",
      category: "Productivity",
      icon: (
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
        >
          <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
          <path d="M8 8h8" />
          <path d="M8 12h8" />
          <path d="M8 16h8" />
        </svg>
      ),
    },
    {
      name: "AWS",
      description: "Cloud deployment",
      category: "Infrastructure",
      icon: (
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
        >
          <path d="M2 12a5 5 0 0 0 5 5 5 5 0 0 0 5-5 5 5 0 0 0-5-5 5 5 0 0 0-5 5" />
          <path d="M12 12a5 5 0 0 0 5 5 5 5 0 0 0 5-5 5 5 0 0 0-5-5 5 5 0 0 0-5 5" />
        </svg>
      ),
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
                Seamless Integration
              </Badge>
              <h1 className="mb-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Connect with your favorite tools
              </h1>
              <p className="text-muted-foreground mb-8 text-xl">
                Integrate with the tools you already use and love. Our platform
                works seamlessly with your existing workflow.
              </p>
              <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <Button size="lg">
                  Explore Integrations
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

            {/* Integration Grid */}
            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
              {integrations.map((integration, index) => (
                <Card
                  key={integration.name}
                  className={`group p-6 transition-all duration-300 hover:shadow-lg ${
                    index === 1 ? "md:translate-y-4" : ""
                  } ${index === 4 ? "md:-translate-y-4" : ""}`}
                >
                  <div className="mb-4 flex items-center gap-4">
                    <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg transition-transform group-hover:scale-110">
                      <div className="text-primary">{integration.icon}</div>
                    </div>
                    <div>
                      <h3 className="font-semibold">{integration.name}</h3>
                      <p className="text-muted-foreground text-sm">
                        {integration.description}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary">{integration.category}</Badge>
                </Card>
              ))}
            </div>

            {/* Integration Stats */}
            <div className="mt-16 text-center">
              <div className="mx-auto grid max-w-3xl grid-cols-2 gap-8 md:grid-cols-4">
                <div>
                  <p className="text-3xl font-bold">50+</p>
                  <p className="text-muted-foreground text-sm">
                    Available Integrations
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-bold">1M+</p>
                  <p className="text-muted-foreground text-sm">
                    API Requests Daily
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-bold">99.9%</p>
                  <p className="text-muted-foreground text-sm">Uptime</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">24/7</p>
                  <p className="text-muted-foreground text-sm">Support</p>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <Card className="animate-float absolute top-1/3 -right-4 hidden w-48 p-4 lg:block">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/10">
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
                    className="text-green-500"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <p className="font-medium">Easy to integrate</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}

```

```tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  ChevronRight,
  Code2,
  ExternalLink,
  LucideIcon,
  Maximize2,
  Pause,
  Play,
  Settings,
  Share2,
  Volume2,
  VolumeX,
  Zap,
} from 'lucide-react';

import { cn } from '@/lib/utils';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  videoThumbnail: string;
  videoPlaceholder: string;
  videoUrl: string; // In a real implementation, this would be a actual video URL
  videoDuration: string;
}

const features: Feature[] = [
  {
    id: 'easy-setup',
    title: 'Quick Setup',
    description:
      'Get started in minutes with our intuitive onboarding process and user-friendly interface.',
    icon: Zap,
    videoThumbnail:
      'https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=1200&auto=format&fit=crop',
    videoPlaceholder: 'Setup wizard showing a step-by-step process',
    videoUrl: '#', // Placeholder for demo purposes
    videoDuration: '1:42',
  },
  {
    id: 'advanced-customization',
    title: 'Advanced Customization',
    description:
      'Tailor the platform to your specific needs with extensive customization options and flexible settings.',
    icon: Settings,
    videoThumbnail:
      'https://images.unsplash.com/photo-1607706189992-eae578626c86?q=80&w=1200&auto=format&fit=crop',
    videoPlaceholder:
      'Customization interface with various settings being adjusted',
    videoUrl: '#', // Placeholder for demo purposes
    videoDuration: '2:17',
  },
  {
    id: 'code-integration',
    title: 'Seamless Integration',
    description:
      'Integrate with your existing tools and workflows using our comprehensive API and pre-built connectors.',
    icon: Code2,
    videoThumbnail:
      'https://images.unsplash.com/photo-1580894742597-87bc8789db3d?q=80&w=1200&auto=format&fit=crop',
    videoPlaceholder: 'Code editor showing API integration example',
    videoUrl: '#', // Placeholder for demo purposes
    videoDuration: '3:05',
  },
  {
    id: 'collaboration',
    title: 'Team Collaboration',
    description:
      'Work together seamlessly with real-time collaboration features and robust sharing capabilities.',
    icon: Share2,
    videoThumbnail:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
    videoPlaceholder: 'Multiple users collaborating on a shared document',
    videoUrl: '#', // Placeholder for demo purposes
    videoDuration: '2:51',
  },
];

export default function FeatureVideos() {
  const [activeFeature, setActiveFeature] = useState(features[0].id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentFeature =
    features.find((f) => f.id === activeFeature) || features[0];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation, this would control the video playback
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // In a real implementation, this would control the video audio
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    // In a real implementation, this would toggle fullscreen mode
  };

  return (
    <section className="container mx-auto space-y-12 px-4 py-24 md:px-6 2xl:max-w-[1400px]">
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          See our features in action
        </h2>
        <p className="text-muted-foreground mx-auto max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Watch detailed video demonstrations of our powerful platform
          capabilities
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
        <div className="space-y-6 lg:col-span-1">
          <div className="space-y-4">
            {features.map((feature) => (
              <Card
                key={feature.id}
                className={cn(
                  'cursor-pointer p-0 transition-all hover:shadow-md',
                  activeFeature === feature.id
                    ? 'border-primary bg-primary/5'
                    : 'hover:border-primary/50'
                )}
                onClick={() => {
                  setActiveFeature(feature.id);
                  setIsPlaying(false);
                }}
              >
                <CardContent className="flex items-start gap-4 p-4">
                  <div
                    className={cn(
                      'rounded-lg p-2',
                      activeFeature === feature.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    )}
                  >
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">{feature.title}</h3>
                    <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
                      {feature.description}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        <Play className="mr-1 h-3 w-3" />
                        {feature.videoDuration}
                      </Badge>
                      {activeFeature === feature.id && (
                        <span className="text-primary text-xs font-medium">
                          Currently viewing
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button asChild variant="outline" className="w-full">
            <a href="#">
              View all feature videos <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>

        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-xl border">
            <div className="relative aspect-video bg-black">
              {/* Video Thumbnail/Placeholder */}
              <img
                src={currentFeature.videoThumbnail}
                alt={currentFeature.videoPlaceholder}
                className={cn(
                  'object-cover transition-opacity duration-300',
                  isPlaying ? 'opacity-0' : 'opacity-100'
                )}
                priority
              />

              {/* Play Button Overlay (visible when not playing) */}
              {!isPlaying && (
                <div
                  className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/40"
                  onClick={togglePlay}
                >
                  <div className="bg-primary/90 hover:bg-primary text-primary-foreground flex h-16 w-16 scale-100 transform items-center justify-center rounded-full transition-transform hover:scale-105 md:h-20 md:w-20">
                    <Play className="h-8 w-8 md:h-10 md:w-10" />
                  </div>
                </div>
              )}

              {/* Video Controls (visible when playing) */}
              {isPlaying && (
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20"
                      onClick={togglePlay}
                    >
                      <Pause className="h-6 w-6" />
                    </Button>

                    <div className="flex items-center gap-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/20"
                        onClick={toggleMute}
                      >
                        {isMuted ? (
                          <VolumeX className="h-5 w-5" />
                        ) : (
                          <Volume2 className="h-5 w-5" />
                        )}
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/20"
                        onClick={toggleFullscreen}
                      >
                        <Maximize2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Video Progress Bar */}
                  <div className="relative mt-2 h-1 overflow-hidden rounded-full bg-white/30">
                    <div className="bg-primary absolute inset-y-0 left-0 w-[25%]" />
                  </div>
                </div>
              )}
            </div>

            <div className="bg-muted/20 border-t p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg font-semibold">
                    {currentFeature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {currentFeature.description}
                  </p>
                </div>
                <Button asChild className="md:shrink-0">
                  <a href="#">
                    Try this feature <ChevronRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-muted mt-8 rounded-xl p-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-bold">Want to see more?</h3>
            <p className="text-muted-foreground">
              Schedule a live demonstration with one of our product experts.
            </p>
          </div>
          <Button asChild size="lg">
            <a href="#">
              Book a demo <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

```

```tsx
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code2, Database, LineChart, Shield } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const features = [
  {
    title: 'Development',
    icon: Code2,
    description: 'Build with modern tools and frameworks',
    image:
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
    benefits: [
      'TypeScript & React Support',
      'Component Library',
      'API Integration',
      'Developer Tools',
    ],
  },
  {
    title: 'Analytics',
    icon: LineChart,
    description: 'Track and analyze your application metrics',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
    benefits: [
      'Real-time Monitoring',
      'Custom Dashboards',
      'Performance Metrics',
      'User Insights',
    ],
  },
  {
    title: 'Security',
    icon: Shield,
    description: 'Enterprise-grade security features',
    image:
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
    benefits: [
      'End-to-end Encryption',
      'Role-based Access',
      'Audit Logs',
      'Compliance Tools',
    ],
  },
  {
    title: 'Infrastructure',
    icon: Database,
    description: 'Scalable and reliable infrastructure',
    image:
      'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
    benefits: [
      'Auto-scaling',
      'Global CDN',
      'High Availability',
      'Disaster Recovery',
    ],
  },
];

export default function FeatureSectionWithTabs() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="container mx-auto space-y-8 px-4 py-24 md:px-6 2xl:max-w-[1400px]">
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Everything you need to build modern apps
        </h2>
        <p className="text-muted-foreground mx-auto max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Powerful features to help you build faster and scale better
        </p>
      </div>

      {/* Dropdown for mobile screens */}
      <div className="mb-4 flex w-full justify-center md:hidden">
        <Select
          value={activeTab.toString()}
          onValueChange={(value) => setActiveTab(parseInt(value))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a feature" />
          </SelectTrigger>
          <SelectContent>
            {features.map((feature, index) => (
              <SelectItem key={feature.title} value={index.toString()}>
                <div className="flex items-center gap-2">
                  <feature.icon className="size-4" />
                  {feature.title}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tabs for desktop screens */}
      <div className="hidden justify-center gap-4 overflow-x-auto py-2 md:flex">
        {features.map((feature, index) => (
          <Button
            key={feature.title}
            variant={activeTab === index ? 'default' : 'ghost'}
            className="gap-2"
            onClick={() => setActiveTab(index)}
          >
            <feature.icon className="size-4" />
            {feature.title}
          </Button>
        ))}
      </div>

      <Card className="overflow-hidden p-0">
        <div className="grid gap-0 lg:grid-cols-2">
          <CardContent className="flex flex-col justify-center space-y-6 p-6 lg:p-8">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">
                {features[activeTab].title}
              </h3>
              <p className="text-muted-foreground">
                {features[activeTab].description}
              </p>
            </div>

            <ul className="grid gap-3">
              {features[activeTab].benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="bg-primary size-2 rounded-full" />
                  {benefit}
                </li>
              ))}
            </ul>
          </CardContent>

          <div className="relative aspect-video lg:aspect-auto">
            <img
              src={features[activeTab].image}
              alt={features[activeTab].title}
              className="object-cover"
              priority
            />
          </div>
        </div>
      </Card>
    </section>
  );
}

```

```tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QuoteIcon } from 'lucide-react';

// Define types for culture aspects
type CultureAspect = {
  id: string;
  title: string;
  description: string;
  images: string[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
    avatar: string;
  };
};

// Company culture data
const cultureAspects: CultureAspect[] = [
  {
    id: 'innovation',
    title: 'Innovation First',
    description:
      'We believe in challenging the status quo and constantly pushing boundaries to create new solutions. Our innovation-driven approach encourages experimentation, learning from failures, and celebrating breakthrough successes.',
    images: [
      'https://images.unsplash.com/photo-1536148935331-408321065b18?q=80&w=800',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800',
    ],
    testimonial: {
      quote:
        'I&apos;ve never worked anywhere that so actively encourages creative thinking. We&apos;re given the time and resources to explore new ideas, even if they might not work out. That freedom to innovate without fear has led to our most successful products.',
      author: 'Sarah Chen',
      role: 'Product Designer',
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&h=150&fit=crop&crop=faces',
    },
  },
  {
    id: 'collaboration',
    title: 'Collaborative Spirit',
    description:
      'Our collaborative culture fosters open communication and cross-functional teamwork. We believe that diverse perspectives drive better outcomes, and we create intentional spaces for sharing ideas and working together across departments.',
    images: [
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800',
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800',
      'https://images.unsplash.com/photo-1558403194-611308249627?q=80&w=800',
    ],
    testimonial: {
      quote:
        "The walls between teams simply don't exist here. Developers, designers, marketers—we all work together with mutual respect. I've seen ideas transform when people from different backgrounds contribute their unique perspectives.",
      author: 'Marcus Johnson',
      role: 'Engineering Lead',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&fit=crop&crop=faces',
    },
  },
  {
    id: 'wellbeing',
    title: 'Wellbeing & Balance',
    description:
      'We prioritize the holistic wellbeing of our team, recognizing that the best work happens when people feel supported in all aspects of their lives. Our flexible policies and wellness initiatives reflect our commitment to sustainable work practices.',
    images: [
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800',
      'https://images.unsplash.com/photo-1571844307880-751c6d86f3f3?q=80&w=800',
      'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=800',
    ],
    testimonial: {
      quote:
        "I joined from a company where burnout was considered a badge of honor. Here, I'm encouraged to take time off, pursue hobbies, and bring my whole self to work. The result? I'm happier, healthier, and doing the best work of my career.",
      author: 'Elena Rodriguez',
      role: 'Customer Success Manager',
      avatar:
        'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=150&h=150&fit=crop&crop=faces',
    },
  },
  {
    id: 'growth',
    title: 'Continuous Growth',
    description:
      "Learning is embedded in our culture. We invest in our team's professional development through mentorship programs, learning budgets, and career pathing that nurtures both technical expertise and leadership skills.",
    images: [
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800',
    ],
    testimonial: {
      quote:
        "In three years, I've grown from a junior role to leading a team, supported every step of the way with training, challenges that stretched my abilities, and leaders who saw potential in me before I saw it in myself.",
      author: 'James Wilson',
      role: 'Marketing Director',
      avatar:
        'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=150&h=150&fit=crop&crop=faces',
    },
  },
];

export default function AboutSectionCompanyCulture() {
  const [activeTab, setActiveTab] = useState('innovation');

  return (
    <section className="bg-muted/25 py-24">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="mx-auto mb-12 max-w-3xl space-y-4 text-center">
          <div className="bg-primary/10 text-primary inline-block rounded-lg px-3 py-1 text-sm">
            Our Culture
          </div>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            What Makes Us Different
          </h2>
          <p className="text-muted-foreground">
            Our culture defines how we work together and the values that guide
            our decisions. It&apos;s what makes our company a special place to
            work and grow.
          </p>
        </div>

        <Tabs
          defaultValue="innovation"
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-8"
        >
          {/* Tabs navigation */}
          <div className="flex justify-center">
            <TabsList className="grid h-auto grid-cols-2 p-1 md:grid-cols-4">
              {cultureAspects.map((aspect) => (
                <TabsTrigger
                  key={aspect.id}
                  value={aspect.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-3 py-2.5"
                >
                  {aspect.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Tab content */}
          {cultureAspects.map((aspect) => (
            <TabsContent
              key={aspect.id}
              value={aspect.id}
              className="space-y-8"
            >
              {/* Description */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold tracking-tight">
                    {aspect.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {aspect.description}
                  </p>
                </div>

                {/* Testimonial */}
                <Card className="from-primary/5 to-primary/10 border-0 bg-linear-to-br p-0">
                  <CardContent className="space-y-4 p-6 pt-6">
                    <QuoteIcon className="text-primary/40 h-8 w-8" />
                    <p className="text-muted-foreground italic">
                      &quot;{aspect.testimonial.quote}&quot;
                    </p>
                    <div className="flex items-center gap-3 pt-2">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full">
                        <img
                          src={aspect.testimonial.avatar}
                          alt={aspect.testimonial.author}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">
                          {aspect.testimonial.author}
                        </h4>
                        <p className="text-muted-foreground text-xs">
                          {aspect.testimonial.role}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Images */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {aspect.images.map((image, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-4/3 overflow-hidden rounded-lg"
                  >
                    <img
                      src={image}
                      alt={`${aspect.title} culture`}
                      className="transform object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Bottom CTA */}
        <div className="bg-background relative mt-16 rounded-xl border p-8 md:p-12">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-2xl font-bold">Join Our Team</h3>
              <p className="text-muted-foreground mb-6">
                We&apos;re always looking for talented individuals who share our
                values and want to be part of building something meaningful.
                Explore our open positions and find where you might fit in.
              </p>
              <div className="flex gap-4">
                <Button asChild>
                  <a href="/careers">View Open Positions</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/about/values">Our Values</a>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=300',
                'https://images.unsplash.com/photo-1603201667141-5a2d4c673378?q=80&w=300',
                'https://images.unsplash.com/photo-1596079890744-c1a0462d0975?q=80&w=300',
              ].map((src, i) => (
                <div
                  key={i}
                  className="relative aspect-square overflow-hidden rounded-md"
                >
                  <img src={src} alt="Team culture" className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Decorative shapes */}
          <div className="bg-primary/10 absolute -top-5 -left-5 h-10 w-10 rounded-full" />
          <div className="bg-primary/10 absolute -right-5 -bottom-5 h-10 w-10 rounded-full" />
        </div>
      </div>
    </section>
  );
}
```

```tsx
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// Sample services data
const services = [
  {
    id: 'service-1',
    title: 'Web Development',
    shortDescription: 'Custom websites and web applications',
    fullDescription:
      'I build high-performance websites and applications that look great and work flawlessly across all devices. Using modern technologies like React, Next.js, and Tailwind CSS, I create digital experiences that help your business grow.',
    benefits: [
      'Responsive design that works on all devices',
      'Fast loading speeds and optimized performance',
      'SEO-friendly code structure',
      'Custom features tailored to your business needs',
      'Ongoing maintenance and support available',
    ],
    link: '#',
  },
  {
    id: 'service-2',
    title: 'UI/UX Design',
    shortDescription: 'User-centered design solutions',
    fullDescription:
      "Good design is about more than just aesthetics—it's about creating intuitive, enjoyable experiences for your users. I combine visual design with usability principles to create interfaces that delight your users and achieve your business goals.",
    benefits: [
      'User research and persona development',
      'Wireframing and prototyping',
      'Visual design with attention to brand consistency',
      'Usability testing and iteration',
      'Design systems that scale with your business',
    ],
    link: '#',
  },
  {
    id: 'service-3',
    title: 'E-commerce Solutions',
    shortDescription: 'Online stores that drive sales',
    fullDescription:
      'Turn your products into profit with a custom e-commerce solution that makes selling online simple. I create online stores that are easy to manage, secure for your customers, and optimized for conversions.',
    benefits: [
      'Seamless checkout experiences',
      'Product catalog management',
      'Secure payment processing',
      'Inventory management integrations',
      'Mobile-optimized shopping experience',
    ],
    link: '#',
  },
  {
    id: 'service-4',
    title: 'Digital Marketing & SEO',
    shortDescription: 'Strategies to increase visibility',
    fullDescription:
      "The best website in the world won't help your business if no one can find it. I develop comprehensive digital marketing and SEO strategies that drive qualified traffic to your site and convert visitors into customers.",
    benefits: [
      'Technical SEO optimization',
      'Keyword research and content strategy',
      'Local SEO for brick-and-mortar businesses',
      'Analytics setup and performance tracking',
      'Conversion rate optimization',
    ],
    link: '#',
  },
  {
    id: 'service-5',
    title: 'Website Maintenance',
    shortDescription: 'Keeping your site secure and updated',
    fullDescription:
      "A website is never truly 'finished.' I offer ongoing maintenance services to ensure your site remains secure, up-to-date, and performing at its best. From security updates to content changes, I'll keep your digital presence running smoothly.",
    benefits: [
      'Regular security updates and monitoring',
      'Performance optimization',
      'Content updates and additions',
      'Backup and recovery solutions',
      '24/7 support for critical issues',
    ],
    link: '#',
  },
];

export default function AccordionServices() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 2xl:max-w-[1400px]">
        {/* Section header */}
        <div className="mb-12 text-center md:mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            My Services
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            Click on any service to learn more about how I can help your
            business succeed online
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {services.map((service) => (
              <AccordionItem
                key={service.id}
                value={service.id}
                className="border-primary/10 border-b px-0"
              >
                <AccordionTrigger className="py-6 hover:no-underline">
                  <div className="flex flex-1 items-center text-left">
                    <div>
                      <h3 className="text-xl font-medium">{service.title}</h3>
                      <p className="text-muted-foreground text-sm">
                        {service.shortDescription}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="space-y-4">
                    <p>{service.fullDescription}</p>
                    <div>
                      <h4 className="text-muted-foreground mb-2 text-sm font-medium">
                        Key Benefits:
                      </h4>
                      <ul className="grid gap-2 sm:grid-cols-2">
                        {service.benefits.map((benefit, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm"
                          >
                            <span className="text-primary text-xl leading-tight">
                              •
                            </span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-2">
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={service.link}
                          className="inline-flex items-center gap-2"
                        >
                          <span>Learn more</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-12 text-center">
            <Button asChild>
              <a href="#" className="inline-flex items-center gap-2">
                <span>Get a custom quote</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
```

```tsx
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Sample services data
const services = [
  {
    id: 1,
    title: 'Web Development',
    description:
      'Custom websites and web applications with clean code and intuitive interfaces that engage your visitors.',
  },
  {
    id: 2,
    title: 'UI/UX Design',
    description:
      'User-centered design solutions that enhance usability and create enjoyable digital experiences.',
  },
  {
    id: 3,
    title: 'Digital Marketing',
    description:
      'Strategic campaigns that boost your online presence and connect you with your target audience.',
  },
  {
    id: 4,
    title: 'SEO Optimization',
    description:
      'Technical and content optimization to improve visibility and drive organic traffic to your website.',
  },
  {
    id: 5,
    title: 'Content Strategy',
    description:
      'Engaging, relevant content that resonates with your audience and supports your business goals.',
  },
];

export default function SplitLayoutFeature() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 2xl:max-w-[1400px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left column with intro text and CTA */}
          <div className="flex flex-col justify-center">
            <Badge className="mb-6 w-fit" variant="outline">
              Services
            </Badge>
            <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              How I Can Help You
            </h2>

            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
              I offer specialized services designed to help you establish a
              strong online presence and achieve your business goals. Each
              service can be tailored to your specific needs or combined into a
              comprehensive solution.
            </p>

            <div className="mt-2 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
              <Button size="lg" asChild>
                <a href="#" className="flex items-center gap-2">
                  <span>Get in touch</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#">View portfolio</a>
              </Button>
            </div>

            <div className="relative mt-12 hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                alt="Professional collaboration"
                width={500}
                height={300}
                className="rounded-lg object-cover"
              />
            </div>
          </div>

          {/* Right column with services list */}
          <div className="bg-card flex flex-col justify-center rounded-xl border p-8 shadow-sm">
            <h3 className="text-muted-foreground mb-8 text-lg font-medium">
              Specialized services to help your business grow
            </h3>

            <div className="space-y-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="border-border border-b pb-6 last:border-0 last:pb-0"
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 rounded-full p-1">
                      <Check className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">{service.title}</h4>
                      <p className="text-muted-foreground mt-1 text-sm">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button variant="outline" asChild className="w-full">
                <a href="#" className="flex items-center justify-center gap-2">
                  <span>Request custom service</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```
