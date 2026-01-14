import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ArticleHeroProse } from "../article-hero-prose";
import type { ArticleHeroProsePost } from "../article-hero-prose";

// Mock the Img component from @page-speed/img
vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

// Mock the DynamicIcon component
vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, size }: { name: string; size: number }) => (
    <span data-testid={`icon-${name}`} data-size={size} />
  ),
}));

// Mock date-fns format function
vi.mock("date-fns", () => ({
  format: (date: Date, formatStr: string) => {
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  },
}));

describe("ArticleHeroProse", () => {
  const mockPost: ArticleHeroProsePost = {
    title: "Test Article Title",
    authorName: "Jane Doe",
    image: "https://example.com/image.jpg",
    pubDate: new Date("2024-03-15"),
    description: "This is a test article description.",
    authorImage: "https://example.com/avatar.jpg",
  };
});

