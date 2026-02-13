import * as React from "react";
import { cn } from "../../lib/utils";
import { ActionConfig, Pressable } from "@/src";

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
};
function BlockActions({
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
        className: actionClassName,
        ...pressableProps
      } = action;

      return (
        <Pressable
          key={idx}
          asButton
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

  if (actionsSlot) {
    return <div>{actionsSlot}</div>;
  } else if (actions && actions?.length > 0) {
    return (
      <div
        className={cn(
          "flex flex-col md:flex-row flex-wrap gap-4",
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
