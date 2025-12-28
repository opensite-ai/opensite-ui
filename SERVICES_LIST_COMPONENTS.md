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
                <div className="flex-shrink-0">
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
                            <CheckCircle className="h-4 w-4 flex-shrink-0 text-green-600" />
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
              className="bg-gradient-to-r from-primary to-primary/80"
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
                <Card className="relative aspect-[4/3] overflow-hidden p-0">
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
            <Card className="relative aspect-[16/9] overflow-hidden p-0">
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
            <Card className="relative aspect-[4/5] overflow-hidden p-0">
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
            <Card className="relative aspect-[4/5] overflow-hidden p-0">
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
            <Card className="relative aspect-[4/5] overflow-hidden p-0">
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
            <Card className="relative aspect-[4/5] overflow-hidden p-0">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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