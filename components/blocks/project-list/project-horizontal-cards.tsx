"use client";

import { Img, type OptixFlowConfig } from "@page-speed/img";

import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Badge } from "../../ui/badge";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface ProjectHorizontalCardsItem {
  title: string;
  image: string;
  description: string;
  client: string;
  role: string;
  technologies: string[];
  year: string;
  link: string;
}

export interface ProjectHorizontalCardsProps {
  className?: string;
  heading?: string;
  subheading?: string;
  projects?: ProjectHorizontalCardsItem[];
  optixFlowConfig?: OptixFlowConfig;
}

const defaultProjects: ProjectHorizontalCardsItem[] = [
  {
    title: "Brand Identity for Tech Startup",
    image: imagePlaceholders[5],
    description:
      "Created a complete brand identity system for an AI-driven tech startup, including logo design, color palette, typography, and usage guidelines.",
    client: "Nexus AI",
    role: "Brand Designer",
    technologies: ["Adobe Illustrator", "Photoshop", "Figma", "Brand Strategy"],
    year: "2023",
    link: "#",
  },
  {
    title: "E-Learning Platform Redesign",
    image: imagePlaceholders[6],
    description:
      "Completely redesigned the user experience for an online learning platform, focusing on improving navigation, content organization, and student engagement metrics.",
    client: "EduConnect",
    role: "UX Designer & Researcher",
    technologies: ["Figma", "Maze", "Miro", "User Research", "HTML/CSS"],
    year: "2022",
    link: "#",
  },
  {
    title: "Mobile Banking Application",
    image: imagePlaceholders[7],
    description:
      "Designed and developed a secure and intuitive mobile banking application that allows users to manage accounts, make payments, and track spending with advanced security features.",
    client: "SecureBank Ltd.",
    role: "Product Designer & Frontend Developer",
    technologies: [
      "React Native",
      "Redux",
      "Sketch",
      "UserTesting",
      "Biometric Auth",
    ],
    year: "2022",
    link: "#",
  },
];

/**
 * ProjectHorizontalCards - Wide horizontal cards with image sidebar and detailed metadata.
 *
 * Displays projects in stacked horizontal cards with a 1:2 image-to-content ratio.
 * Each card features a 16:9 image on the left, with technology badges, title, client/role/year
 * metadata, description, and "View Project" button on the right. Cards have subtle hover
 * effects and rounded corners. Perfect for design portfolios, case study listings, or any
 * showcase where project context (client, role, year) is as important as the visual.
 */
export function ProjectHorizontalCards({
  className,
  heading = "Featured Projects",
  subheading = "A selection of my most impactful work, demonstrating range and depth across industries.",
  projects = defaultProjects,
  optixFlowConfig,
}: ProjectHorizontalCardsProps) {
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
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-card overflow-hidden rounded-xl border shadow-sm transition-all hover:shadow-md"
            >
              <div className="grid md:grid-cols-3">
                <div className="relative aspect-video w-full overflow-hidden md:aspect-auto md:h-full">
                  <Img
                    src={project.image}
                    alt={project.title}
                    className="object-cover"
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>

                <div className="p-6 md:col-span-2 md:p-8">
                  <div className="mb-2 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <h3 className="mb-2 text-xl font-bold md:text-2xl">
                    {project.title}
                  </h3>

                  <div className="text-muted-foreground mb-4 flex flex-col flex-wrap gap-x-4 text-sm md:flex-row">
                    <span>{project.client}</span>
                    <span className="hidden md:inline">•</span>
                    <span>{project.role}</span>
                    <span className="hidden md:inline">•</span>
                    <span>{project.year}</span>
                  </div>

                  <p className="text-muted-foreground mb-6">
                    {project.description}
                  </p>

                  <Pressable href={project.link} variant="outline" size="sm">
                    View Project{" "}
                    <DynamicIcon
                      name="lucide/arrow-right"
                      size={14}
                      className="ml-1"
                    />
                  </Pressable>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
