import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-button text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-[var(--button-default-bg,hsl(var(--primary)))] text-[var(--button-default-fg,hsl(var(--primary-foreground)))] hover:bg-[var(--button-default-hover-bg,hsl(var(--primary)/0.9))]",
        destructive:
          "bg-[var(--button-destructive-bg,hsl(var(--destructive)))] text-[var(--button-destructive-fg,white)] hover:bg-[var(--button-destructive-hover-bg,hsl(var(--destructive)/0.9))] focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border-[var(--button-outline-border-width,1px)] border-[var(--button-outline-border,hsl(var(--border)))] bg-[var(--button-outline-bg,hsl(var(--background)))] text-[var(--button-outline-fg,inherit)] shadow-xs hover:bg-[var(--button-outline-hover-bg,hsl(var(--accent)))] hover:text-[var(--button-outline-hover-fg,hsl(var(--accent-foreground)))] dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-[var(--button-secondary-bg,hsl(var(--secondary)))] text-[var(--button-secondary-fg,hsl(var(--secondary-foreground)))] hover:bg-[var(--button-secondary-hover-bg,hsl(var(--secondary)/0.8))]",
        ghost:
          "bg-[var(--button-ghost-bg,transparent)] text-[var(--button-ghost-fg,inherit)] hover:bg-[var(--button-ghost-hover-bg,hsl(var(--accent)))] hover:text-[var(--button-ghost-hover-fg,hsl(var(--accent-foreground)))] dark:hover:bg-accent/50",
        link: "text-[var(--button-link-fg,hsl(var(--primary)))] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-[var(--button-height-md,2.25rem)] px-[var(--button-padding-x-md,1rem)] py-2 has-[>svg]:px-[calc(var(--button-padding-x-md,1rem)*0.75)]",
        sm: "h-[var(--button-height-sm,2rem)] rounded-button gap-1.5 px-[var(--button-padding-x-sm,0.75rem)] has-[>svg]:px-[calc(var(--button-padding-x-sm,0.75rem)*0.83)]",
        md: "h-[var(--button-height-md,2.25rem)] px-[var(--button-padding-x-md,1rem)] py-2 has-[>svg]:px-[calc(var(--button-padding-x-md,1rem)*0.75)]",
        lg: "h-[var(--button-height-lg,2.5rem)] rounded-button px-[var(--button-padding-x-lg,1.5rem)] has-[>svg]:px-[calc(var(--button-padding-x-lg,1.5rem)*0.67)]",
        icon: "size-[var(--button-height-md,2.25rem)]",
        "icon-sm": "size-[var(--button-height-sm,2rem)]",
        "icon-lg": "size-[var(--button-height-lg,2.5rem)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
