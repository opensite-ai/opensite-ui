"use client";

import * as React from "react";
import { Icon, type IconProps } from "@page-speed/icon";

const DEFAULT_ICON_API_KEY = "au382bi7fsh96w9h9xlrnat2jglx";

export type DynamicIconName = IconProps["name"] | React.ReactNode;

export interface DynamicIconProps extends Omit<IconProps, "apiKey" | "name"> {
  name?: DynamicIconName;
  apiKey?: string;
}

/**
 * Compatibility wrapper for legacy DynamicIcon usage across opensite-ui.
 *
 * String names are forwarded to @page-speed/icon's Icon component with a
 * default API key. React nodes are rendered as-is for custom icon slots.
 */
export const DynamicIcon = React.memo(function DynamicIcon({
  apiKey,
  name,
  ...props
}: DynamicIconProps) {
  if (name == null) return null;

  if (typeof name !== "string") {
    return <>{name}</>;
  }

  return <Icon {...props} name={name} apiKey={apiKey ?? DEFAULT_ICON_API_KEY} />;
});

DynamicIcon.displayName = "DynamicIcon";
