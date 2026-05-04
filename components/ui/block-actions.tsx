import * as React from "react";
import { cn } from "../../lib/utils";
import { ActionConfig, Pressable } from "@/src";
import { buttonVariants } from "../../lib/button-variants";

/**
 * Mobile layout configuration for BlockActions.
 *
 * - `width: "fit"` (default) — buttons size to their content (intrinsic width).
 * - `width: "full"` — buttons stretch to fill the container width.
 * - `position` — horizontal alignment when `width` is `"fit"` (ignored when `"full"`).
 */
export type BlockActionsMobileConfig = {
  width?: "fit" | "full";
  position?: "left" | "center" | "right";
};

type Props = {
  /**
   * Vertical Spacing
   */
  verticalSpacing?: string;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Array of action configurations for CTA buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Mobile layout configuration (applies below `md` breakpoint).
   * @default { width: "full", position: "center" }
   */
  mobileConfig?: BlockActionsMobileConfig;
};

const MOBILE_CLASSES: Record<string, string> = {
  "fit-left": "items-start md:items-center",
  "fit-center": "items-center",
  "fit-right": "items-end md:items-center",
  "full-left": "items-stretch md:items-center",
  "full-center": "items-stretch md:items-center",
  "full-right": "items-stretch md:items-center",
};

function BlockActions({
  mobileConfig,
  actionsClassName,
  verticalSpacing = "mt-4 md:mt-8",
  actions,
  actionsSlot,
}: Props) {
  const width = mobileConfig?.width ?? "full";
  const position = mobileConfig?.position ?? "center";
  const mobileLayoutClass = MOBILE_CLASSES[`${width}-${position}`];

  if (actionsSlot) {
    return <div>{actionsSlot}</div>;
  } else if (actions && actions?.length > 0) {
    return (
      <div
        className={cn(
          "flex flex-col md:flex-row flex-wrap gap-4",
          mobileLayoutClass,
          actionsClassName,
          verticalSpacing,
        )}
      >
        {actions.map((action, index) => (
          <ActionComponent key={index} action={action} />
        ))}
      </div>
    );
  } else {
    return null;
  }
}

export type ActionComponentProps = {
  action: ActionConfig;
};

function ActionComponent({ action }: ActionComponentProps) {
  const {
    label,
    icon,
    iconAfter,
    children,
    href,
    onClick,
    asButton,
    variant,
    size,
    className: actionClassName,
    ...pressableProps
  } = action;
  const shouldStyleAsButton = asButton ?? true;
  const resolvedVariant = shouldStyleAsButton
    ? (variant ?? "default")
    : undefined;
  const resolvedSize = shouldStyleAsButton ? (size ?? "default") : undefined;

  return (
    <Pressable
      href={href}
      onClick={onClick}
      asButton={shouldStyleAsButton}
      variant={resolvedVariant}
      size={resolvedSize}
      data-slot={shouldStyleAsButton ? "button" : undefined}
      data-variant={resolvedVariant}
      data-size={resolvedSize}
      className={cn(
        shouldStyleAsButton &&
          buttonVariants({ variant: resolvedVariant, size: resolvedSize }),
        actionClassName,
      )}
      {...pressableProps}
    >
      {children ?? (
        <>
          {icon}
          {label}
          {iconAfter}
        </>
      )}
    </Pressable>
  );
}

export { BlockActions, ActionComponent };
