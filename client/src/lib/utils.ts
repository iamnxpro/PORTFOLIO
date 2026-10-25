import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Supports external previews as well as local images placed in client/public/images for GitHub Pages.
 * Local paths are resolved against Vite's BASE_URL, so they also work when the site is
 * deployed to a GitHub Pages sub-path.
 */
export const imageUrl = (source: string) => {
  if (source.startsWith("http")) return source;
  return `${import.meta.env.BASE_URL}${source.replace(/^\//, "")}`;
};
