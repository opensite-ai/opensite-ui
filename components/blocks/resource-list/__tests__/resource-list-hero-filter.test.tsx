import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { ResourceListHeroFilter } from "../resource-list-hero-filter";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("@page-speed/forms", () => ({
  useForm: () => ({
    form: {},
  }),
  Form: ({ children }: { children: React.ReactNode }) => <form data-testid="mock-form">{children}</form>,
  Field: ({ children }: { children: React.ReactNode }) => <div data-testid="mock-field">{children}</div>,
  TextInput: ({ placeholder }: { placeholder?: string }) => (
    <input type="text" placeholder={placeholder} data-testid="mock-text-input" />
  ),
}));

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">{children}</a>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

vi.mock("../../../lib/patternSvgs", () => ({
  patternSvgs: {
    squareAltGrid: "https://placeholder.com/pattern.svg",
  },
}));

describe("ResourceListHeroFilter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    const { container } = render(<ResourceListHeroFilter />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<ResourceListHeroFilter className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders section element with proper structure", () => {
    const { container } = render(<ResourceListHeroFilter />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("renders with custom title and description", () => {
    const { container } = render(
      <ResourceListHeroFilter 
        title="Custom Title" 
        description="Custom Description" 
      />
    );
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("renders with custom breadcrumb", () => {
    const { container } = render(
      <ResourceListHeroFilter 
        breadcrumb={[
          { label: "Home", link: "/" },
          { label: "Resources", link: "/resources" },
        ]}
      />
    );
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("renders with custom categories", () => {
    const { container } = render(
      <ResourceListHeroFilter 
        categories={[
          { label: "All", value: "all" },
          { label: "Tech", value: "tech" },
        ]}
      />
    );
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("renders with custom posts", () => {
    const { container } = render(
      <ResourceListHeroFilter 
        posts={[
          {
            category: "Tech",
            title: "Test Post",
            summary: "Test summary",
            link: "/test",
            cta: "Read More",
            thumbnail: "https://example.com/image.jpg",
          },
        ]}
      />
    );
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });
});
