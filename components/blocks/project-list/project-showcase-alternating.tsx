"use client";

import { Img, type OptixFlowConfig } from "@page-speed/img";

import { cn } from "../../../lib/utils";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface ProjectShowcaseAlternatingItem {
  title: string;
  description: string;
  imagePath: string;
  imageAlt: string;
}

export interface ProjectShowcaseAlternatingProps {
  className?: string;
  heading?: string;
  projects?: ProjectShowcaseAlternatingItem[];
  optixFlowConfig?: OptixFlowConfig;
}

const defaultProjects: ProjectShowcaseAlternatingItem[] = [
  {
    title: "MOSAIC",
    description:
      "A vibrant fusion of city lights and digital artistry, this installation transforms urban landscapes into interactive canvases, inviting viewers to become part of the evolving masterpiece.",
    imagePath: imagePlaceholders[60],
    imageAlt: "Modern digital art installation",
  },
  {
    title: "IDENTITY REIMAGINED",
    description:
      "A bold rebranding journey, where classic design principles meet contemporary flair. This project breathes new life into established brands, crafting visual stories that resonate across every platform.",
    imagePath: imagePlaceholders[61],
    imageAlt: "Brand design mockups and materials",
  },
  {
    title: "SERENITY SPACES",
    description:
      "An exploration of harmony between architecture and human experience. This concept blends natural materials and open layouts to create environments that inspire calm and creativity.",
    imagePath: imagePlaceholders[62],
    imageAlt: "Architectural interior design concept",
  },
];

/**
 * ProjectShowcaseAlternating - Elegant alternating layout with large images and descriptive text.
 *
 * Features a serif-styled main heading followed by project cards in a 4:8 column split.
 * Each card displays the project title in bold uppercase, a detailed description, and a
 * large 4:3 aspect ratio image. The layout maintains consistent left-text, right-image
 * arrangement with generous vertical spacing between projects. Ideal for creative agencies,
 * design portfolios, or any showcase where storytelling and visual impact are equally
 * important.
 */
export function ProjectShowcaseAlternating({
  className,
  heading = "PROJECT SHOWCASE",
  projects = defaultProjects,
  optixFlowConfig,
}: ProjectShowcaseAlternatingProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h1 className="mb-16 font-serif text-4xl font-normal tracking-wide text-foreground md:mb-24 md:text-6xl lg:text-7xl">
          {heading}
        </h1>

        <div className="space-y-16 md:space-y-24 lg:space-y-32">
          {projects.map((project, index) => (
            <div
              key={index}
              className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12"
            >
              <div className="order-2 lg:order-1 lg:col-span-4">
                <h2 className="mb-4 font-sans text-base font-bold tracking-wider text-foreground uppercase md:text-base">
                  {project.title}
                </h2>
                <p className="max-w-sm font-sans text-sm leading-relaxed text-muted-foreground md:text-base">
                  {project.description}
                </p>
              </div>

              <div className="order-1 lg:order-2 lg:col-span-8">
                <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg border border-border">
                  <Img
                    src={project.imagePath}
                    alt={project.imageAlt}
                    className="h-full w-full object-cover"
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
