"use client";

import { Img, type OptixFlowConfig } from "@page-speed/img";

import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Badge } from "../../ui/badge";
import { Card, CardContent } from "../../ui/card";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface ProjectWorkShowcaseProject {
  title: string;
  image: string;
  description: string;
  link: string;
}

export interface ProjectWorkShowcaseItem {
  role: string;
  company: string;
  duration: string;
  description: string;
  technologies: string[];
  projects: ProjectWorkShowcaseProject[];
}

export interface ProjectWorkShowcaseProps {
  className?: string;
  heading?: string;
  subheading?: string;
  experiences?: ProjectWorkShowcaseItem[];
  optixFlowConfig?: OptixFlowConfig;
}

const defaultExperiences: ProjectWorkShowcaseItem[] = [
  {
    role: "Lead Frontend Developer",
    company: "Webflow Solutions",
    duration: "2021 - Present",
    description:
      "Managed a team of developers building responsive and accessible web applications for enterprise clients.",
    technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    projects: [
      {
        title: "Healthcare Portal Redesign",
        image: imagePlaceholders[119],
        description:
          "Led the complete overhaul of a healthcare provider's patient portal, improving accessibility and mobile experience.",
        link: "#",
      },
      {
        title: "E-commerce Platform",
        image: imagePlaceholders[120],
        description:
          "Built a custom shopping experience with personalized recommendations and seamless checkout flow.",
        link: "#",
      },
    ],
  },
  {
    role: "Frontend Developer",
    company: "Digital Craftsmen",
    duration: "2018 - 2021",
    description:
      "Developed user interfaces for web applications with a focus on performance and responsive design.",
    technologies: ["JavaScript", "Vue.js", "SCSS", "Webpack"],
    projects: [
      {
        title: "Banking Dashboard",
        image: imagePlaceholders[121],
        description:
          "Created an intuitive dashboard for tracking personal finances and investment portfolios.",
        link: "#",
      },
      {
        title: "Real Estate Listings",
        image: imagePlaceholders[122],
        description:
          "Built a property search platform with advanced filtering and interactive map features.",
        link: "#",
      },
    ],
  },
  {
    role: "Web Developer",
    company: "Creative Tech Labs",
    duration: "2016 - 2018",
    description:
      "Worked on building responsive websites and interactive features for marketing campaigns.",
    technologies: ["HTML", "CSS", "JavaScript", "jQuery", "PHP"],
    projects: [
      {
        title: "Corporate Website Redesign",
        image: imagePlaceholders[123],
        description:
          "Redesigned and implemented a modern website for a financial services company.",
        link: "#",
      },
      {
        title: "Interactive Product Showcase",
        image: imagePlaceholders[124],
        description:
          "Created an interactive 3D product visualization tool for a hardware manufacturer.",
        link: "#",
      },
    ],
  },
];

/**
 * ProjectWorkShowcase - Work experience cards with embedded project galleries.
 *
 * Displays professional experience in stacked full-width cards, each containing a header
 * section with role, company, duration, description, and technology badges. Below the
 * header, a "Key Projects" section shows 2-column grid of project cards with images,
 * titles, descriptions, and "View Project" links. Perfect for developer portfolios or
 * any professional showcase where work history needs to be tied to specific deliverables
 * and project outcomes.
 */
export function ProjectWorkShowcase({
  className,
  heading = "Work Experience & Projects",
  subheading = "Explore my professional experience and key projects I've contributed to in each role.",
  experiences = defaultExperiences,
  optixFlowConfig,
}: ProjectWorkShowcaseProps) {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {heading}
          </h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
            {subheading}
          </p>
        </div>

        <div className="space-y-10">
          {experiences.map((experience, index) => (
            <Card key={index} className="overflow-hidden p-0">
              <CardContent className="p-0">
                <div className="bg-muted/50 p-6 md:p-8">
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    <div>
                      <h3 className="text-2xl font-bold">{experience.role}</h3>
                      <div className="text-muted-foreground my-1 flex items-center gap-2">
                        <span className="font-medium">
                          {experience.company}
                        </span>
                        <span>•</span>
                        <span>{experience.duration}</span>
                      </div>
                      <p className="text-muted-foreground mt-2 max-w-3xl">
                        {experience.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {experience.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <h4 className="mb-4 font-semibold">Key Projects</h4>

                  <div className="grid gap-6 sm:grid-cols-2">
                    {experience.projects.map((project, projectIndex) => (
                      <div
                        key={projectIndex}
                        className="group overflow-hidden rounded-lg border"
                      >
                        <div className="relative aspect-video overflow-hidden">
                          <Img
                            src={project.image}
                            alt={project.title}
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            optixFlowConfig={optixFlowConfig}
                          />
                        </div>
                        <div className="p-4">
                          <h5 className="font-bold">{project.title}</h5>
                          <p className="text-muted-foreground mt-1 text-sm">
                            {project.description}
                          </p>
                          <Pressable
                            href={project.link}
                            size="sm"
                            variant="ghost"
                            className="mt-2 px-0"
                          >
                            View Project
                            <DynamicIcon
                              name="lucide/external-link"
                              size={14}
                              className="ml-1"
                            />
                          </Pressable>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
