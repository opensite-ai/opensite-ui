"use client";

import { Icon, type IconProps } from "@page-speed/icon";

const DEFAULT_ICON_API_KEY = "au382bi7fsh96w9h9xlrnat2jglx";

export interface DynamicIconProps extends Omit<IconProps, "apiKey"> {
  apiKey?: string;
}

/**
 * Compatibility wrapper for legacy DynamicIcon usage across opensite-ui.
 *
 * It forwards all props to @page-speed/icon's Icon component and injects
 * a default API key so existing call sites continue to work unchanged.
 */
export function DynamicIcon({ apiKey, ...props }: DynamicIconProps) {
  return <Icon {...props} apiKey={apiKey ?? DEFAULT_ICON_API_KEY} />;
}
