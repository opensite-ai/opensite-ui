import React from "react";
import { cn } from "../../lib/utils";
import type { ContainerProps } from "../../src/types";

const maxWidthStyles = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
  "4xl": "max-w-[1536px]",
  full: "max-w-full",
};

/**
 * Container component for consistent content width and centering
 *
 * @example
 * ```tsx
 * <Container maxWidth="xl">
 *   <h1>Page Content</h1>
 * </Container>
 * ```
 */
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, maxWidth = "xl", className, as = "div", ...props }, ref) => {
    const Component = as as any;
    return (
      <Component
        ref={ref}
        className={cn(
          "mx-auto w-full px-4 sm:px-6 lg:px-8",
          maxWidthStyles[maxWidth],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Container.displayName = "Container";
