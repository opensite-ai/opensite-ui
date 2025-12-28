import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { ResourceListCourseCards } from "../resource-list-course-cards";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">{children}</a>
  ),
}));

vi.mock("../../../ui/avatar", () => ({
  Avatar: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={className} data-testid="mock-avatar">{children}</div>
  ),
  AvatarImage: ({ src, alt }: { src: string; alt?: string }) => (
    <img src={src} alt={alt} data-testid="mock-avatar-image" />
  ),
  AvatarFallback: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="mock-avatar-fallback">{children}</span>
  ),
}));

vi.mock("../../../ui/badge", () => ({
  Badge: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <span className={className} data-testid="mock-badge">{children}</span>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
  avatarPlaceholders: Array(20).fill("https://placeholder.com/avatar.jpg"),
}));

describe("ResourceListCourseCards", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    const { container } = render(<ResourceListCourseCards />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<ResourceListCourseCards className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders section element with proper structure", () => {
    const { container } = render(<ResourceListCourseCards />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("renders with custom courses", () => {
    const { container } = render(
      <ResourceListCourseCards 
        courses={[
          {
            badge: "Course",
            title: "Test Course",
            description: "Test course description",
            author: {
              name: "Test Author",
              title: "Test Title",
              avatar: "https://example.com/avatar.jpg",
            },
            image: "https://example.com/image.jpg",
            lessons: 10,
            videos: 15,
            duration: "30:00 minutes",
            audience: ["Developers"],
            gradient: "from-blue-100 to-purple-100",
            cta: {
              text: "Start",
              url: "/course/test",
            },
          },
        ]}
      />
    );
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("renders with multiple courses", () => {
    const { container } = render(
      <ResourceListCourseCards 
        courses={[
          {
            badge: "Course 1",
            title: "First Course",
            description: "First course description",
            author: {
              name: "Author 1",
              title: "Title 1",
              avatar: "https://example.com/avatar1.jpg",
            },
            image: "https://example.com/image1.jpg",
            lessons: 10,
            videos: 15,
            duration: "30:00 minutes",
            audience: ["Developers"],
            gradient: "from-blue-100 to-purple-100",
            cta: {
              text: "Start",
              url: "/course/1",
            },
          },
          {
            badge: "Course 2",
            title: "Second Course",
            description: "Second course description",
            author: {
              name: "Author 2",
              title: "Title 2",
              avatar: "https://example.com/avatar2.jpg",
            },
            image: "https://example.com/image2.jpg",
            lessons: 20,
            videos: 25,
            duration: "60:00 minutes",
            audience: ["Designers"],
            gradient: "from-green-100 to-blue-100",
            cta: {
              text: "Start",
              url: "/course/2",
            },
          },
        ]}
      />
    );
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });
});
