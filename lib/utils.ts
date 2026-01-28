import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Maps brightness prop values to Tailwind classes
 * Values 10-40 use arbitrary values for finer control on bright images
 */
export const BRIGHTNESS_CLASS_MAP: Record<string, string> = {
  "10": "brightness-[.1]",
  "20": "brightness-[.2]",
  "25": "brightness-[.25]",
  "30": "brightness-[.3]",
  "40": "brightness-[.4]",
  "50": "brightness-50",
  "75": "brightness-75",
  "100": "brightness-100",
};
