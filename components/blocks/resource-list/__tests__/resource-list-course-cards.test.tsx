import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
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

  it("renders courses with title", () => {
    const courses = [
      {
        title: "React Fundamentals",
        description: "Learn React basics",
        author: { name: "John Doe", title: "Senior Developer", avatar: "/avatar.jpg" },
        image: "/course.jpg",
        lessons: 10,
        videos: 20,
        duration: "5 hours",
        audience: ["Beginners"],
        gradient: "from-blue-500 to-purple-500",
        cta: { text: "Start Learning", url: "/course/react" },
      },
    ];
    render(<ResourceListCourseCards courses={courses} />);
    expect(screen.getByText("React Fundamentals")).toBeInTheDocument();
  });

  it("renders course description", () => {
    const courses = [
      {
        title: "Course",
        description: "Master modern web development",
        author: { name: "Jane", title: "Instructor", avatar: "/avatar.jpg" },
        image: "/img.jpg",
        lessons: 5,
        videos: 10,
        duration: "3 hours",
        audience: ["Developers"],
        gradient: "from-green-500",
        cta: { text: "Learn", url: "/learn" },
      },
    ];
    render(<ResourceListCourseCards courses={courses} />);
    expect(screen.getByText("Master modern web development")).toBeInTheDocument();
  });

  it("renders course author info", () => {
    const courses = [
      {
        title: "Course",
        description: "Description",
        author: { name: "Sarah Chen", title: "Lead Instructor", avatar: "/avatar.jpg" },
        image: "/img.jpg",
        lessons: 5,
        videos: 10,
        duration: "3 hours",
        audience: ["All levels"],
        gradient: "from-red-500",
        cta: { text: "Start", url: "/start" },
      },
    ];
    render(<ResourceListCourseCards courses={courses} />);
    expect(screen.getAllByText("Sarah Chen").length).toBeGreaterThan(0);
    expect(screen.getByText("Lead Instructor")).toBeInTheDocument();
  });

  it("renders course metadata", () => {
    const courses = [
      {
        title: "Course",
        description: "Description",
        author: { name: "Author", title: "Title", avatar: "/avatar.jpg" },
        image: "/img.jpg",
        lessons: 15,
        videos: 30,
        duration: "8 hours",
        audience: ["Beginners", "Intermediate"],
        gradient: "from-blue-500",
        cta: { text: "Start", url: "/start" },
      },
    ];
    render(<ResourceListCourseCards courses={courses} />);
    expect(screen.getByText("15 Lessons")).toBeInTheDocument();
    expect(screen.getByText(/30 Videos/)).toBeInTheDocument();
  });

  it("applies custom className to section", () => {
    const { container } = render(<ResourceListCourseCards className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
