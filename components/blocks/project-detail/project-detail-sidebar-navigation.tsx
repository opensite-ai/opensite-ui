"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Img } from "@page-speed/img";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface ProjectDetailSidebarNavigationSection {
  id: string;
  title: string;
  content: string;
}

export interface ProjectDetailSidebarNavigationProps {
  className?: string;
  title?: string;
  subtitle?: string;
  year?: string;
  category?: string;
  client?: string;
  heroImage?: {
    src?: string;
    alt?: string;
  };
  sections?: ProjectDetailSidebarNavigationSection[];
  backHref?: string;
  backLabel?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultSections: ProjectDetailSidebarNavigationSection[] = [
  {
    id: "overview",
    title: "Overview",
    content:
      "A comprehensive brand identity project that reimagines the visual language of a heritage company for the modern era. This project involved extensive research, strategic planning, and creative execution across multiple touchpoints.",
  },
  {
    id: "challenge",
    title: "The Challenge",
    content:
      "The client faced the challenge of maintaining brand recognition while appealing to a younger demographic. Our task was to create a visual system that honored their legacy while feeling fresh and contemporary.",
  },
  {
    id: "approach",
    title: "Our Approach",
    content:
      "We began with an extensive discovery phase, conducting stakeholder interviews and competitive analysis. This informed our creative direction and ensured alignment with business objectives throughout the project.",
  },
  {
    id: "solution",
    title: "The Solution",
    content:
      "The final identity system includes a refined logo, comprehensive color palette, typography guidelines, and a flexible design system that works across digital and print applications.",
  },
  {
    id: "results",
    title: "Results",
    content:
      "The rebrand has been met with overwhelmingly positive reception, with a 45% increase in brand awareness and significant improvement in customer engagement metrics across all channels.",
  },
];

const defaultProps: ProjectDetailSidebarNavigationProps = {
  title: "Brand Evolution",
  subtitle: "Strategic Rebranding",
  year: "2024",
  category: "Brand Identity",
  client: "Heritage Co.",
  heroImage: {
    src: imagePlaceholders[8],
    alt: "Brand evolution project showcase",
  },
  sections: defaultSections,
  backHref: "/projects",
  backLabel: "All Projects",
};

export function ProjectDetailSidebarNavigation(
  props: ProjectDetailSidebarNavigationProps
): React.JSX.Element {
  const {
    className,
    title = defaultProps.title,
    subtitle = defaultProps.subtitle,
    year = defaultProps.year,
    category = defaultProps.category,
    client = defaultProps.client,
    heroImage = defaultProps.heroImage,
    sections = defaultProps.sections,
    backHref = defaultProps.backHref,
    backLabel = defaultProps.backLabel,
    optixFlowConfig,
  } = props;

  const [activeSection, setActiveSection] = React.useState(
    sections?.[0]?.id || ""
  );

  React.useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections?.map((section) =>
        document.getElementById(section.id)
      );

      sectionElements?.forEach((element, index) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sections?.[index]?.id || "");
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <article className={cn("py-24 md:py-32", className)}>
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <aside className="lg:col-span-3">
            <div className="sticky top-24 space-y-8">
              {backHref && (
                <Pressable
                  href={backHref}
                  className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  <DynamicIcon name="lucide/arrow-left" size={16} />
                  {backLabel}
                </Pressable>
              )}

              <nav className="space-y-1">
                {sections?.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={cn(
                      "block w-full text-left px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                      activeSection === section.id
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>

              <div className="space-y-3 border-t border-border pt-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-medium text-foreground">{category}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Client</span>
                  <span className="font-medium text-foreground">{client}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Year</span>
                  <span className="font-medium text-foreground">{year}</span>
                </div>
              </div>
            </div>
          </aside>

          <main className="lg:col-span-9">
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                {title}
              </h1>
              <p className="mt-4 text-xl text-muted-foreground">{subtitle}</p>
            </motion.header>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-16"
            >
              <div className="relative aspect-video overflow-hidden rounded-2xl bg-muted">
                <Img
                  src={heroImage?.src || imagePlaceholders[8]}
                  alt={heroImage?.alt || "Project hero image"}
                  className="h-full w-full object-cover"
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
            </motion.div>

            <div className="space-y-24">
              {sections?.map((section, index) => (
                <motion.section
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="scroll-mt-24"
                >
                  <h2 className="mb-6 text-2xl font-semibold text-foreground">
                    {section.title}
                  </h2>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {section.content}
                  </p>
                </motion.section>
              ))}
            </div>
          </main>
        </div>
      </div>
    </article>
  );
}
