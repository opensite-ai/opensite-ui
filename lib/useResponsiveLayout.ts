"use client";

import { useMemo } from "react";
import type { DirectionConfig } from "@/src/types/blocks";

export type UseResponsiveLayoutArgs = {
  /**
   * Direction configuration for desktop and mobile layouts.
   *
   * Assumes the component's DOM order is: content first, media second.
   * - `mediaRight` / `mediaLeft` controls desktop (row) direction.
   * - `mediaTop` / `mediaBottom` controls mobile (column) direction.
   *
   * @default { desktop: 'mediaRight', mobile: 'mediaTop' }
   */
  directionConfig?: DirectionConfig;
};

export const useResponsiveLayout = ({
  directionConfig = { desktop: "mediaRight", mobile: "mediaTop" },
}: UseResponsiveLayoutArgs) => {
  const responsiveClassName = useMemo(() => {
    const desktopOrder =
      directionConfig.desktop === "mediaRight"
        ? "lg:flex-row"
        : "lg:flex-row-reverse";

    const mobileOrder =
      directionConfig.mobile === "mediaTop" ? "flex-col-reverse" : "flex-col";

    return `${mobileOrder} ${desktopOrder}`;
  }, [directionConfig.desktop, directionConfig.mobile]);

  return { responsiveClassName };
};
