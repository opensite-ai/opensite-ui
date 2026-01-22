"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Container } from "../../ui/container";
import { Section } from "../../ui/section";
import { Img } from "@page-speed/img";
import type {
  SectionBackground,
  SectionSpacing,
  OptixFlowConfig,
} from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

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
  heading?: React.ReactNode;
  /**
   * Array of departments with their members
   */
  departments?: TeamDepartmentSectionsDepartment[];
  /**
   * Custom slot for rendering departments (overrides departments array)
   */
  departmentsSlot?: React.ReactNode;
  /**
   * Background style variant for the section
   * @default "white"
   */
  background?: SectionBackground;
  /**
   * Vertical spacing/margin variant
   * @default "lg"
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern name or URL
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for each department section
   */
  departmentClassName?: string;
  /**
   * Additional CSS classes for the department name
   */
  departmentNameClassName?: string;
  /**
   * Additional CSS classes for the members grid
   */
  membersGridClassName?: string;
  /**
   * Additional CSS classes for each member card
   */
  memberCardClassName?: string;
  /**
   * Additional CSS classes for the member avatar
   */
  memberAvatarClassName?: string;
  /**
   * Additional CSS classes for the member name
   */
  memberNameClassName?: string;
  /**
   * Additional CSS classes for the member role
   */
  memberRoleClassName?: string;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: OptixFlowConfig;
}

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
  heading,
  departments,
  departmentsSlot,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  className,
  headingClassName,
  departmentClassName,
  departmentNameClassName,
  membersGridClassName,
  memberCardClassName,
  memberAvatarClassName,
  memberNameClassName,
  memberRoleClassName,
  optixFlowConfig,
}: TeamDepartmentSectionsProps): React.JSX.Element {
  const renderDepartments = () => {
    if (departmentsSlot) return departmentsSlot;
    if (!departments || departments.length === 0) return null;

    return departments.map((department, deptIndex) => (
      <div
        key={deptIndex}
        className={cn(deptIndex > 0 ? "mt-6" : "", departmentClassName)}
      >
        <h3 className={cn("mb-6 text-lg font-medium", departmentNameClassName)}>
          {department.name}
        </h3>
        <div
          className={cn(
            "grid grid-cols-2 gap-4 border-t py-6 md:grid-cols-4",
            membersGridClassName,
          )}
        >
          {department.members.map((member, memberIndex) => (
            <div key={memberIndex} className={memberCardClassName}>
              <div
                className={cn(
                  "bg-background size-20 rounded-full border p-0.5 shadow shadow-zinc-950/5",
                  memberAvatarClassName,
                )}
              >
                <Img
                  className="aspect-square rounded-full object-cover"
                  src={member.avatar}
                  alt={member.name}
                  width={80}
                  height={80}
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
              <span className={cn("mt-2 block text-sm", memberNameClassName)}>
                {member.name}
              </span>
              <span
                className={cn(
                  "text-muted-foreground block text-xs",
                  memberRoleClassName,
                )}
              >
                {member.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
    >
      <Container maxWidth="lg">
        {heading &&
          (typeof heading === "string" ? (
            <h2
              className={cn(
                "mb-8 text-4xl font-bold md:mb-16 lg:text-5xl",
                headingClassName,
              )}
            >
              {heading}
            </h2>
          ) : (
            <div className={headingClassName}>{heading}</div>
          ))}

        {renderDepartments()}
      </Container>
    </Section>
  );
}
