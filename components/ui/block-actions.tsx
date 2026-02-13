import * as React from "react";
import { cn } from "../../lib/utils";
import { ActionConfig, Pressable } from "@/src";

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
   * @default { width: "fit", position: "left" }
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
  const renderAction = React.useCallback(
    (action: ActionConfig, idx: number) => {
      const {
        label,
        icon,
        iconAfter,
        children,
        href,
        onClick,
        className: actionClassName,
        ...pressableProps
      } = action;

      return (
        <Pressable
          key={idx}
          href={href}
          onClick={onClick}
          asButton={action.asButton || true}
          className={actionClassName}
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
    },
    [],
  );

  const width = mobileConfig?.width ?? "fit";
  const position = mobileConfig?.position ?? "left";
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
        {actions.map((action, index) => renderAction(action, index))}
      </div>
    );
  } else {
    return null;
  }
}

export { BlockActions };
