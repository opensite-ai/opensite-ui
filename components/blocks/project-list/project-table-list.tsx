"use client";

import { Img, type OptixFlowConfig } from "@page-speed/img";

import { cn } from "../../../lib/utils";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface ProjectTableListItem {
  id: number;
  title: string;
  description: string;
  launchDate: string;
  image: string;
}

export interface ProjectTableListProps {
  className?: string;
  projects?: ProjectTableListItem[];
  optixFlowConfig?: OptixFlowConfig;
}

const defaultProjects: ProjectTableListItem[] = [
  {
    id: 1,
    title: "E-commerce Platform",
    description:
      "Designed and developed a fully scalable e-commerce platform from scratch, focusing on simplicity and performance, which transformed workflows for over 10,000 users across multiple industries.",
    launchDate: "04.17.2025",
    image: imagePlaceholders[32],
  },
  {
    id: 2,
    title: "Mobile Banking App",
    description:
      "Built a secure and intuitive mobile banking application with real-time transaction processing, biometric authentication, and seamless user experience for financial institutions.",
    launchDate: "03.15.2025",
    image: imagePlaceholders[33],
  },
  {
    id: 3,
    title: "AI Content Generator",
    description:
      "Developed an AI-powered content generation platform that helps marketers create engaging content, with advanced NLP capabilities and customizable templates.",
    launchDate: "02.28.2025",
    image: imagePlaceholders[34],
  },
  {
    id: 4,
    title: "Project Management Tool",
    description:
      "Created a comprehensive project management solution with real-time collaboration, task tracking, and analytics dashboard for remote teams and enterprises.",
    launchDate: "01.20.2025",
    image: imagePlaceholders[35],
  },
];

/**
 * ProjectTableList - Table-style project list with numbered rows and gallery thumbnails.
 *
 * Presents projects in a structured table format with three columns: project info
 * (number, title, date), description, and gallery thumbnail. Features a header row
 * visible on larger screens. Each row is separated by borders with generous padding.
 * The numbered format (01, 02, etc.) adds a professional, organized feel. Ideal for
 * case studies, portfolio items, or any project listing where detailed descriptions
 * and chronological ordering are important. Responsive layout stacks columns on mobile.
 */
export function ProjectTableList({
  className,
  projects = defaultProjects,
  optixFlowConfig,
}: ProjectTableListProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <ul className="relative w-full">
          <li className="hidden justify-between gap-10 border-b pt-15 pb-2 text-sm tracking-tight text-foreground/40 uppercase lg:flex lg:text-base">
            <p className="w-1/4">PROJECTS</p>
            <p className="w-2/4">DESCRIPTION</p>
            <p className="w-1/4 text-right">GALLERY</p>
          </li>
          {projects.map((project, index) => (
            <li
              key={project.id}
              className="flex w-full flex-col justify-between gap-10 border-b py-10 lg:flex-row lg:py-15"
            >
              <div className="flex gap-4 text-xl font-medium tracking-tighter uppercase lg:w-1/4">
                <p className="">0{index + 1}</p>
                <div className="flex flex-col gap-1">
                  <p>{project.title}</p>
                  <p>({project.launchDate})</p>
                </div>
              </div>
              <div className="text-2xl lg:w-2/4 lg:text-3xl">
                {project.description}
              </div>
              <div className="w-full text-right text-sm text-foreground/50 uppercase lg:h-30 lg:w-1/4 lg:pl-20 lg:text-base">
                <Img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover"
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
