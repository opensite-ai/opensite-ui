```tsx
"use client";

import { Easing, motion } from "framer-motion";
import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";

const easeTransition: Easing = [0.25, 0.1, 0.25, 1];

interface Industry {
  name: string;
  description: string;
  image: string;
  imageAlt: string;
  url: string;
}

interface Industries1Props {
  title: string;
  industryLabel: string;
  industries: Industry[];
  className?: string;
}

const Industries1 = ({
  className,
  title = "Industries",
  industryLabel = "Overview",
  industries = [
    {
      name: "Healthcare",
      description:
        "Revolutionary medical solutions and digital health platforms that improve patient outcomes and streamline healthcare delivery.",
      image: "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
      imageAlt: "Healthcare technology illustration",
      url: "http://shadcnblocks.com/blocks",
    },
    {
      name: "Fintech",
      description:
        "Cutting-edge financial technology solutions that transform banking, payments, and investment management for the digital age.",
      image: "https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u",
      imageAlt: "Financial technology illustration",
      url: "http://shadcnblocks.com/blocks",
    },
    {
      name: "E-commerce",
      description:
        "Comprehensive online retail platforms and marketplace solutions that drive sales and enhance customer experiences.",
      image: "https://cdn.ing/assets/files/record/286203/itwrx0hqshkompfxvikdmj77xoh4",
      imageAlt: "E-commerce platform illustration",
      url: "http://shadcnblocks.com/blocks",
    },
    {
      name: "Education",
      description:
        "Innovative learning management systems and educational technology that empower students and educators worldwide.",
      image: "https://cdn.ing/assets/files/record/286204/7rhj7uvcnozjm6c2q4txtptfcmpx",
      imageAlt: "Educational technology illustration",
      url: "http://shadcnblocks.com/blocks",
    },
  ],
}: Industries1Props) => {
  return (
    <section className={cn("py-16", className)}>
      <div className="container">
        <h2 className="mb-8 text-3xl font-medium text-foreground">{title}</h2>
        <div className="grid grid-cols-1 gap-1 lg:grid-cols-2 xl:grid-cols-4">
          {industries.map((industry, index) => (
            <a href={industry.url} key={index}>
              <motion.div
                key={index}
                className="group relative overflow-hidden bg-muted"
                whileHover="hover"
                initial="initial"
              >
                {/* Default state: Image and heading */}
                <motion.div
                  variants={{
                    initial: {
                      opacity: 1,
                      pointerEvents: "auto",
                      clipPath: "inset(0% 0% 0% 0%)",
                    },
                    hover: {
                      opacity: 0,
                      pointerEvents: "none",
                      clipPath: "inset(0% 0% 100% 0%)",
                    },
                  }}
                  transition={{ duration: 0.4, ease: easeTransition }}
                  className="relative z-0 flex h-full min-h-120 flex-col items-center justify-center lg:min-h-144 xl:min-h-112"
                >
                  <div className="flex h-full justify-center">
                    <img
                      src={industry.image}
                      alt={industry.imageAlt}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h3 className="absolute bottom-10 text-lg font-medium text-foreground">
                    {industry.name}
                  </h3>
                </motion.div>

                {/* Black overlay - slides up from bottom */}
                <motion.div
                  className="absolute inset-0 z-10 bg-black"
                  variants={{
                    initial: { y: "100%" },
                    hover: { y: "0%" },
                  }}
                  transition={{ duration: 0.4, ease: easeTransition }}
                  style={{ willChange: "transform" }}
                />

                {/* Hover state: Description */}
                <motion.div
                  variants={{
                    initial: { opacity: 0, y: 20 },
                    hover: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.4, ease: easeTransition }}
                  className="absolute inset-0 z-20 flex min-h-120 items-center justify-center p-8 text-white lg:min-h-144 xl:min-h-112"
                >
                  <div className="space-y-3">
                    <p className="font-medium opacity-90">{industryLabel}:</p>
                    <p>{industry.description}</p>
                  </div>
                </motion.div>

                {/* Plus button */}
                <motion.div
                  className="absolute top-4 right-4 z-30"
                  variants={{
                    initial: { opacity: 0.7, rotate: 0 },
                    hover: { opacity: 1, rotate: 90 },
                  }}
                  transition={{ duration: 0.4, ease: easeTransition }}
                >
                  <div className="relative rounded-full p-2">
                    <div className="absolute inset-0 rounded-full bg-muted-foreground/20" />
                    <motion.div
                      className="absolute inset-0 rounded-full bg-muted-foreground"
                      variants={{
                        initial: { opacity: 0 },
                        hover: { opacity: 1 },
                      }}
                      transition={{ duration: 0.4, ease: easeTransition }}
                    />
                    <Plus className="relative z-10 size-4" />
                  </div>
                </motion.div>
              </motion.div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Industries1 };

```

```tsx
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

interface Industry {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

interface Industries2Props {
  badge: string;
  heading: string;
  services: Industry[];
  className?: string;
}

const Industries2 = ({
  className,
  badge = "Industries",
  heading = "Transforming industries through innovative technology solutions that drive efficiency, growth, and sustainable operations.",
  services = [
    {
      title: "Mining",
      description:
        "Empowering mining operations with advanced automation systems, real-time monitoring solutions, safety management platforms, and resource optimization technologies that maximize efficiency and ensure sustainable extraction practices.",
      imageSrc: "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
      imageAlt: "Mining industry icon",
    },
    {
      title: "Finance",
      description:
        "Delivering secure, scalable financial technology solutions including digital banking platforms, payment processing systems, risk management tools, and regulatory compliance frameworks that enable financial institutions to innovate and compete effectively.",
      imageSrc: "https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u",
      imageAlt: "Finance industry icon",
    },
    {
      title: "Energy",
      description:
        "Transforming energy operations with smart grid technologies, renewable energy management systems, predictive maintenance solutions, and demand forecasting tools that optimize resource allocation and improve sustainability.",
      imageSrc: "https://cdn.ing/assets/files/record/286203/itwrx0hqshkompfxvikdmj77xoh4",
      imageAlt: "Energy industry icon",
    },
    {
      title: "Construction",
      description:
        "Streamlining construction projects with project management platforms, BIM integration, real-time collaboration tools, and safety monitoring systems that reduce costs, improve timelines, and enhance on-site productivity.",
      imageSrc: "https://cdn.ing/assets/files/record/286204/7rhj7uvcnozjm6c2q4txtptfcmpx",
      imageAlt: "Construction industry icon",
    },
  ],
}: Industries2Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        {/* Header Section */}
        <div className="mb-16">
          {badge && (
            <Badge
              variant="outline"
              className="mb-4 rounded-none border-0 bg-muted p-2 text-primary uppercase"
            >
              {badge}
            </Badge>
          )}
          <h2 className="max-w-2xl text-3xl leading-tight font-bold text-balance lg:text-4xl">
            {heading}
          </h2>
        </div>

        {/* Services Grid */}
        <div className="space-y-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="border-b border-border pb-8 first:border-t first:pt-8 last:border-b-0"
            >
              <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-12 md:items-center md:gap-8">
                <div className="order-2 md:order-none md:col-span-4">
                  <h3 className="text-lg font-semibold text-foreground md:text-xl">
                    {service.title}
                  </h3>
                </div>
                <div className="order-1 md:order-none md:col-span-2 md:flex md:justify-center">
                  <img
                    src={service.imageSrc}
                    alt={service.imageAlt}
                    className="h-12 w-12 object-contain md:h-16 md:w-16"
                  />
                </div>
                <div className="order-3 md:order-none md:col-span-6">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Industries2 };

```

```tsx
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface Project {
  year: string;
  name: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  url: string;
}

interface Industries3Props {
  labels: string[];
  projects: Project[];
  className?: string;
}

const Industries3 = ({
  className,
  labels = ["Year", "Industry", "Description"],
  projects = [
    {
      year: "/2024",
      name: "/Consumer Tech",
      description: "Innovative consumer electronics and smart device solutions",
      imageSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/artistic-portrait-glitch-yqp6z.png",
      imageAlt: "TechFlow automation platform",
      url: "http://shadcnblocks.com/blocks",
    },
    {
      year: "/2023",
      name: "/Biotech",
      description:
        "Cutting-edge biotechnology research and pharmaceutical development",
      imageSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/alvin-engler-bIhpiQA009k-unsplash.jpg",
      imageAlt: "DataViz Pro analytics dashboard",
      url: "http://shadcnblocks.com/blocks",
    },
    {
      year: "/2023",
      name: "/Cybersecurity",
      description: "Enterprise-grade security solution for data protection",
      imageSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/futuristic-device-design-qcufu.png",
      imageAlt: "SecureVault security platform",
      url: "http://shadcnblocks.com/blocks",
    },
    {
      year: "/2022",
      name: "/Healthtech",
      description: "Integrated healthcare management system with telemedicine",
      imageSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/israel-andrade-YI_9SivVt_s-unsplash.jpg",
      imageAlt: "HealthConnect medical platform",
      url: "http://shadcnblocks.com/blocks",
    },
  ],
}: Industries3Props) => {
  return (
    <section className={cn("min-h-screen bg-muted py-16", className)}>
      <div className="container mx-auto flex flex-col gap-8 px-8">
        {/* Header Row */}
        <div className="grid grid-cols-2 gap-8 font-medium text-muted-foreground md:grid-cols-3">
          <div className="order-2 pl-10 text-sm md:order-1 lg:pl-10">
            {labels[0]}
          </div>
          <div className="order-1 pl-5 text-sm md:order-2 md:pl-0">
            {labels[1]}
          </div>
          <div className="hidden text-sm md:order-3 lg:block">{labels[2]}</div>
        </div>

        {/* Project Rows */}
        <div className="space-y-0">
          {projects.map((project, index) => (
            <a href={project.url} key={index}>
              <div className="group relative mb-2 flex min-h-[100px] flex-col justify-center md:min-h-0 lg:mb-0">
                <div className="relative z-3 grid grid-cols-2 gap-8 transition-all duration-300 md:grid-cols-3 lg:hover:rounded-lg lg:hover:font-medium lg:hover:text-secondary lg:hover:shadow-lg">
                  {/* Year Column */}
                  <div className="order-2 flex items-center md:order-1">
                    <span className="pl-10 text-xs font-medium text-secondary opacity-100 lg:opacity-0 lg:group-hover:opacity-100">
                      {project.year}
                    </span>
                  </div>

                  {/* Project Name and Description Column */}
                  <div className="order-1 col-span-1 grid grid-cols-2 gap-8 border-b border-muted-foreground/20 p-5 transition-all duration-300 md:order-2 md:col-span-2 md:p-10 md:pr-0 md:pl-0 lg:group-hover:border-transparent">
                    {/* Project Name */}
                    <div className="flex items-center">
                      <span className="ml-0 pl-0 text-xl font-medium text-secondary transition-all duration-300 md:text-2xl lg:text-foreground lg:group-hover:pl-2 lg:group-hover:text-secondary">
                        {project.name}
                      </span>
                    </div>

                    {/* Description and Button */}
                    <div className="hidden items-center justify-between gap-4 lg:flex lg:pr-10">
                      <span className="text-sm text-secondary/80 opacity-100 lg:opacity-0 lg:group-hover:opacity-100">
                        {project.description}
                      </span>

                      {/* Action Button */}
                      <button className="flex translate-x-full items-center justify-center rounded-full bg-primary p-1 text-secondary opacity-100 shadow-md transition-all duration-300 ease-out lg:opacity-0 lg:group-hover:translate-x-0 lg:group-hover:opacity-100">
                        <ArrowUpRight />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Background Image */}
                <img
                  src={project.imageSrc}
                  alt={project.imageAlt}
                  className="absolute inset-0 z-1 h-full w-full object-cover opacity-100 transition-all duration-300 lg:opacity-0 lg:group-hover:opacity-100"
                />

                {/* Overlay */}
                <div className="absolute inset-0 z-2 bg-black/20 opacity-100 transition-all duration-300 lg:opacity-0 lg:group-hover:opacity-100" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Industries3 };

```

```tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CornerDownRight } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Contractor {
  id: string;
  category: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  learnMoreUrl: string;
}

interface Industries4Props {
  heading: string;
  contractors: Contractor[];
  className?: string;
}

const Industries4 = ({
  className,
  heading = "Powering Rewewable Industries",
  contractors = [
    {
      id: "mining-enterprises",
      category: "Hydro",
      title:
        "Revolutionizing Hydroelectric Power Generation Through Smart Dam Management",
      imageSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/industry/hydro.jpg",
      imageAlt: "Hydroelectricity operations site",
      learnMoreUrl: "#",
    },
    {
      id: "global-finance",
      category: "Wind",
      title:
        "Maximizing Wind Farm Efficiency with AI-Powered Turbine Optimization",
      imageSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/industry/wind.jpg",
      imageAlt: "Wind power generation",
      learnMoreUrl: "#",
    },
    {
      id: "elite-fashion",
      category: "Solar",
      title:
        "Scaling Solar Infrastructure with Advanced Photovoltaic Grid Integration",
      imageSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/industry/solar.jpg",
      imageAlt: "Solar power generation",
      learnMoreUrl: "#",
    },
  ],
}: Industries4Props) => {
  const [activeContractor, setActiveContractor] = useState(
    contractors[0]?.id || "",
  );

  const handleContractorHover = (contractorId: string) => {
    setActiveContractor(contractorId);
  };

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container">
        {/* Heading */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl">{heading}</h2>
        </div>

        {/* Mobile Contractor Showcase */}
        <div className="space-y-6 lg:hidden">
          {contractors.map((contractor) => (
            <a
              key={contractor.id}
              href={contractor.learnMoreUrl}
              className="block overflow-hidden rounded-lg border border-border"
            >
              {/* Image */}
              <div className="relative aspect-video w-full">
                <img
                  src={contractor.imageSrc}
                  alt={contractor.imageAlt}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="space-y-4 p-6">
                <div className="flex items-center">
                  <span className="text-xl font-semibold">
                    {contractor.category}
                  </span>
                </div>
                <h3 className="text-lg leading-tight text-muted-foreground">
                  {contractor.title}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-0 text-sm font-medium text-primary hover:text-primary/80"
                  asChild
                >
                  <a href={contractor.learnMoreUrl}>
                    <CornerDownRight className="mr-1 h-3 w-3" />
                    Learn more
                  </a>
                </Button>
              </div>
            </a>
          ))}
        </div>

        {/* Desktop Contractor Showcase */}
        <div className="hidden h-128 overflow-hidden border border-border lg:flex">
          {contractors.map((contractor) => (
            <a
              key={contractor.id}
              href={contractor.learnMoreUrl}
              className={`flex h-full cursor-pointer gap-6 overflow-hidden border-l border-border first:border-l-0 ${
                activeContractor === contractor.id ? "flex-1" : "w-48"
              }`}
              onMouseEnter={() => handleContractorHover(contractor.id)}
            >
              <div className="flex h-full min-w-0 flex-col justify-between gap-8 p-6">
                {/* Logo */}
                <div className="flex h-14 w-32 items-center">
                  <span className="text-xl font-semibold">
                    {contractor.category}
                  </span>
                </div>

                <div className="flex flex-col justify-between gap-8">
                  {/* Expanded Content  */}
                  <AnimatePresence>
                    {activeContractor === contractor.id && (
                      <motion.div
                        key={`content-${contractor.id}`}
                        className="space-y-4"
                      >
                        <h3 className="text-lg leading-tight text-muted-foreground">
                          {contractor.title}
                        </h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-0 text-sm font-medium text-primary hover:text-primary/80"
                          asChild
                        >
                          <a href={contractor.learnMoreUrl}>
                            <CornerDownRight className="mr-1 h-3 w-3" />
                            Learn more
                          </a>
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Image  */}
              <AnimatePresence>
                {activeContractor === contractor.id && (
                  <motion.div
                    key={contractor.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className={`relative h-full min-w-0 ${
                      contractor.id === contractors[0]?.id
                        ? "w-96 shrink-0"
                        : "flex-1"
                    }`}
                  >
                    <img
                      src={contractor.imageSrc}
                      alt={contractor.imageAlt}
                      className="h-full w-full object-cover"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Industries4 };

```
