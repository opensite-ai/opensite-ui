"use client";

import * as React from "react";
import { Container } from "../../ui/container";
import { Section } from "../../ui/section";
import { Img } from "@page-speed/img";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

/**
 * Configuration for Optix Flow image optimization
 */
export interface OptixFlowConfig {
  apiKey: string;
  compression?: number;
}

/**
 * Individual team member for TeamDepartmentSections
 */
export interface TeamDepartmentSectionsMember {
  name: string;
  role: string;
  avatar: string;
}

/**
 * Department group for TeamDepartmentSections
 */
export interface TeamDepartmentSectionsDepartment {
  name: string;
  members: TeamDepartmentSectionsMember[];
}

/**
 * Props for TeamDepartmentSections component
 */
export interface TeamDepartmentSectionsProps {
  /**
   * Section heading
   * @default "Our team"
   */
  heading?: string;
  /**
   * Array of departments with their members
   */
  departments?: TeamDepartmentSectionsDepartment[];
  /**
   * Background style variant for the section
   * @default "white"
   */
  background?: SectionBackground;
  /**
   * Vertical spacing/margin variant
   * @default "lg"
   */
  verticalMargin?: SectionSpacing;
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: OptixFlowConfig;
}

const defaultDepartments: TeamDepartmentSectionsDepartment[] = [
  {
    name: "Leadership",
    members: [
      {
        name: "Sarah Chen",
        role: "CEO & Founder",
        avatar: blockBrandedIconsAndPlaceholders.avatar1,
      },
      {
        name: "Marcus Rodriguez",
        role: "CTO",
        avatar: blockBrandedIconsAndPlaceholders.avatar2,
      },
      {
        name: "Priya Patel",
        role: "COO",
        avatar: blockBrandedIconsAndPlaceholders.avatar3,
      },
      {
        name: "David Kim",
        role: "CFO",
        avatar: blockBrandedIconsAndPlaceholders.avatar4,
      },
    ],
  },
  {
    name: "Engineering",
    members: [
      {
        name: "Emma Thompson",
        role: "VP of Engineering",
        avatar: blockBrandedIconsAndPlaceholders.avatar5,
      },
      {
        name: "Alex Johnson",
        role: "Senior Engineer",
        avatar: blockBrandedIconsAndPlaceholders.avatar6,
      },
      {
        name: "Lisa Wang",
        role: "Staff Engineer",
        avatar: blockBrandedIconsAndPlaceholders.avatar7,
      },
      {
        name: "Michael Brown",
        role: "Senior Engineer",
        avatar: blockBrandedIconsAndPlaceholders.avatar8,
      },
    ],
  },
  {
    name: "Marketing",
    members: [
      {
        name: "Jennifer Lee",
        role: "Head of Marketing",
        avatar: blockBrandedIconsAndPlaceholders.avatar1,
      },
      {
        name: "Robert Taylor",
        role: "Content Lead",
        avatar: blockBrandedIconsAndPlaceholders.avatar2,
      },
      {
        name: "Amanda Martinez",
        role: "Growth Manager",
        avatar: blockBrandedIconsAndPlaceholders.avatar3,
      },
      {
        name: "Chris Wilson",
        role: "Brand Designer",
        avatar: blockBrandedIconsAndPlaceholders.avatar4,
      },
    ],
  },
];

/**
 * TeamDepartmentSections - Team organized by department with section headers
 *
 * A structured team section that organizes members by department with clear
 * section headers. Each department has its own bordered section with a 4-column
 * grid of members showing circular avatars, names, and roles. Ideal for larger
 * organizations wanting to show team structure and hierarchy.
 *
 * @example
 * ```tsx
 * <TeamDepartmentSections
 *   heading="Our Team"
 *   departments={[
 *     {
 *       name: "Engineering",
 *       members: [
 *         { name: "John Doe", role: "Lead Engineer", avatar: "/avatars/john.jpg" }
 *       ]
 *     }
 *   ]}
 * />
 * ```
 */
export function TeamDepartmentSections({
  heading = "Our team",
  departments = defaultDepartments,
  background = "white",
  verticalMargin = "lg",
  className,
  optixFlowConfig,
}: TeamDepartmentSectionsProps): React.JSX.Element {
  return (
    <Section
      background={background}
      spacing={verticalMargin}
      className={className}
    >
      <Container maxWidth="lg">
        <h2 className="mb-8 text-4xl font-bold md:mb-16 lg:text-5xl">
          {heading}
        </h2>

        {departments.map((department, deptIndex) => (
          <div key={deptIndex} className={deptIndex > 0 ? "mt-6" : ""}>
            <h3 className="mb-6 text-lg font-medium">{department.name}</h3>
            <div className="grid grid-cols-2 gap-4 border-t py-6 md:grid-cols-4">
              {department.members.map((member, memberIndex) => (
                <div key={memberIndex}>
                  <div className="bg-background size-20 rounded-full border p-0.5 shadow shadow-zinc-950/5">
                    <Img
                      className="aspect-square rounded-full object-cover"
                      src={member.avatar}
                      alt={member.name}
                      width={80}
                      height={80}
                      optixFlowConfig={optixFlowConfig}
                    />
                  </div>
                  <span className="mt-2 block text-sm">{member.name}</span>
                  <span className="text-muted-foreground block text-xs">
                    {member.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Container>
    </Section>
  );
}
