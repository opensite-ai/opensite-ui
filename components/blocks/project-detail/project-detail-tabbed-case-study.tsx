"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Img } from "@page-speed/img";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface ProjectDetailTabbedCaseStudyTab {
  id: string;
  label: string;
  content: string;
}

export interface ProjectDetailTabbedCaseStudyContentSection {
  title: string;
  content: string;
  image?: {
    src?: string;
    alt: string;
  };
  imagePosition?: "left" | "right";
}

export interface ProjectDetailTabbedCaseStudyTestimonial {
  quote: string;
  author: string;
  role: string;
  avatar?: string;
}

export interface ProjectDetailTabbedCaseStudyTool {
  name: string;
  icon?: string;
}

export interface ProjectDetailTabbedCaseStudyProps {
  className?: string;
  title?: string;
  subtitle?: string;
  heroImage?: {
    src?: string;
    alt?: string;
  };
  tabs?: ProjectDetailTabbedCaseStudyTab[];
  contentSections?: ProjectDetailTabbedCaseStudyContentSection[];
  testimonial?: ProjectDetailTabbedCaseStudyTestimonial;
  tools?: ProjectDetailTabbedCaseStudyTool[];
  backHref?: string;
  backLabel?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultTabs: ProjectDetailTabbedCaseStudyTab[] = [
  {
    id: "overview",
    label: "Overview",
    content:
      "A comprehensive digital transformation project that redefined how the client engages with their customers across all touchpoints.",
  },
  {
    id: "challenge",
    label: "Challenge",
    content:
      "The client faced declining engagement and needed to modernize their digital presence while maintaining brand consistency.",
  },
  {
    id: "solution",
    label: "Solution",
    content:
      "We developed a unified design system and implemented a new customer experience platform that increased engagement by 150%.",
  },
  {
    id: "results",
    label: "Results",
    content:
      "The project delivered measurable improvements across all KPIs, including a 40% increase in conversion rates and 60% improvement in customer satisfaction.",
  },
];

const defaultContentSections: ProjectDetailTabbedCaseStudyContentSection[] = [
  {
    title: "Research & Discovery",
    content:
      "We began with extensive user research, conducting interviews and analyzing behavioral data to understand pain points and opportunities. This informed our strategic direction and ensured alignment with user needs.",
    image: {
      src: imagePlaceholders[72],
      alt: "Research and discovery process",
    },
    imagePosition: "right",
  },
  {
    title: "Design & Prototyping",
    content:
      "Our design team created multiple concepts and iterated based on stakeholder feedback. We developed interactive prototypes to validate our approach before moving into development.",
    image: {
      src: imagePlaceholders[73],
      alt: "Design and prototyping",
    },
    imagePosition: "left",
  },
  {
    title: "Implementation & Launch",
    content:
      "The development phase followed agile methodologies, with regular sprints and continuous integration. We launched in phases to minimize risk and gather real-world feedback.",
    image: {
      src: imagePlaceholders[74],
      alt: "Implementation and launch",
    },
    imagePosition: "right",
  },
];

const defaultTestimonial: ProjectDetailTabbedCaseStudyTestimonial = {
  quote:
    "Working with this team transformed our digital presence. The results exceeded our expectations and have had a lasting impact on our business.",
  author: "Sarah Chen",
  role: "Chief Marketing Officer, Acme Corp",
  avatar: imagePlaceholders[75],
};

const defaultTools: ProjectDetailTabbedCaseStudyTool[] = [
  { name: "Figma", icon: "simple-icons/figma" },
  { name: "React", icon: "simple-icons/react" },
  { name: "TypeScript", icon: "simple-icons/typescript" },
  { name: "Tailwind CSS", icon: "simple-icons/tailwindcss" },
  { name: "Next.js", icon: "simple-icons/nextdotjs" },
];

const defaultProps: ProjectDetailTabbedCaseStudyProps = {
  title: "Digital Transformation Case Study",
  subtitle: "How we helped Acme Corp reimagine their customer experience",
  heroImage: {
    src: imagePlaceholders[76],
    alt: "Case study hero",
  },
  tabs: defaultTabs,
  contentSections: defaultContentSections,
  testimonial: defaultTestimonial,
  tools: defaultTools,
  backHref: "/projects",
  backLabel: "Back to Projects",
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export function ProjectDetailTabbedCaseStudy(
  props: ProjectDetailTabbedCaseStudyProps
): React.JSX.Element {
  const {
    className,
    title = defaultProps.title,
    subtitle = defaultProps.subtitle,
    heroImage = defaultProps.heroImage,
    tabs = defaultProps.tabs,
    contentSections = defaultProps.contentSections,
    testimonial = defaultProps.testimonial,
    tools = defaultProps.tools,
    backHref = defaultProps.backHref,
    backLabel = defaultProps.backLabel,
    optixFlowConfig,
  } = props;

  const [activeTab, setActiveTab] = React.useState(tabs?.[0]?.id || "");

  return (
    <article className={cn("py-24 md:py-32", className)}>
      <div className="container">
        {backHref && (
          <motion.div {...fadeInUp} className="mb-12">
            <Pressable
              href={backHref}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <DynamicIcon name="lucide/arrow-left" size={16} />
              {backLabel}
            </Pressable>
          </motion.div>
        )}

        <motion.header {...fadeInUp} className="mb-16 max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">{subtitle}</p>
        </motion.header>

        <motion.div {...fadeInUp} className="mb-16">
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-muted">
            <Img
              src={heroImage?.src || imagePlaceholders[76]}
              alt={heroImage?.alt || "Case study hero"}
              className="h-full w-full object-cover"
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        </motion.div>

        {tabs && tabs.length > 0 && (
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-16"
          >
            <div className="border-b border-border">
              <nav className="flex gap-8 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "whitespace-nowrap border-b-2 pb-4 text-sm font-medium transition-colors",
                      activeTab === tab.id
                        ? "border-foreground text-foreground"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
            <div className="mt-8">
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  className={cn(
                    "transition-opacity duration-300",
                    activeTab === tab.id ? "block" : "hidden"
                  )}
                >
                  <p className="text-lg leading-relaxed text-muted-foreground max-w-3xl">
                    {tab.content}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {contentSections && contentSections.length > 0 && (
          <div className="space-y-24">
            {contentSections.map((section, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={cn(
                  "grid gap-12 lg:grid-cols-2 lg:gap-16 items-center",
                  section.imagePosition === "left" && "lg:flex-row-reverse"
                )}
              >
                <div
                  className={cn(
                    section.imagePosition === "left" && "lg:order-2"
                  )}
                >
                  <h2 className="mb-6 text-2xl font-semibold text-foreground">
                    {section.title}
                  </h2>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {section.content}
                  </p>
                </div>
                {section.image && (
                  <div
                    className={cn(
                      "relative aspect-4/3 overflow-hidden rounded-2xl bg-muted",
                      section.imagePosition === "left" && "lg:order-1"
                    )}
                  >
                    <Img
                      src={section.image.src || imagePlaceholders[72 + index]}
                      alt={section.image.alt}
                      className="h-full w-full object-cover"
                      optixFlowConfig={optixFlowConfig}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {testimonial && (
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-24 rounded-2xl bg-muted/30 p-8 md:p-12"
          >
            <blockquote className="text-xl leading-relaxed text-foreground md:text-2xl">
              "{testimonial.quote}"
            </blockquote>
            <div className="mt-6 flex items-center gap-4">
              {testimonial.avatar && (
                <div className="h-12 w-12 overflow-hidden rounded-full bg-muted">
                  <Img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="h-full w-full object-cover"
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>
              )}
              <div>
                <p className="font-medium text-foreground">
                  {testimonial.author}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {tools && tools.length > 0 && (
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16"
          >
            <h2 className="mb-6 text-sm font-medium tracking-wider text-muted-foreground uppercase">
              Tools & Technologies
            </h2>
            <div className="flex flex-wrap gap-4">
              {tools.map((tool, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 rounded-full border border-border px-4 py-2"
                >
                  {tool.icon && (
                    <DynamicIcon
                      name={tool.icon}
                      size={16}
                      className="text-muted-foreground"
                    />
                  )}
                  <span className="text-sm font-medium text-foreground">
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </article>
  );
}
