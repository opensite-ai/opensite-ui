import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { TimelineTabbedPhases } from "../timeline-tabbed-phases";

vi.mock("@page-speed/img", () => ({
  Img: ({
    src,
    alt,
    className,
  }: {
    src: string;
    alt: string;
    className?: string;
  }) => (
    <img
      src={src}
      alt={alt}
      className={className}
      data-testid="mock-img"
    />
  ),
}));

vi.mock("../../../../lib/Pressable", () => ({
  Pressable: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href?: string;
    className?: string;
  }) => (
    <a href={href} className={className} data-testid="mock-pressable">
      {children}
    </a>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, size }: { name: string; size: number }) => (
    <span data-testid="mock-dynamic-icon" data-name={name} data-size={size}>
      {name}
    </span>
  ),
}));

vi.mock("../../../ui/card", () => ({
  Card: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div className={className} data-testid="mock-card">
      {children}
    </div>
  ),
  CardContent: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div className={className} data-testid="mock-card-content">
      {children}
    </div>
  ),
}));

vi.mock("../../../ui/tabs", () => ({
  Tabs: ({
    children,
    defaultValue,
    className,
  }: {
    children: React.ReactNode;
    defaultValue?: string;
    className?: string;
  }) => (
    <div className={className} data-testid="mock-tabs" data-default={defaultValue}>
      {children}
    </div>
  ),
  TabsList: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div className={className} data-testid="mock-tabs-list">
      {children}
    </div>
  ),
  TabsTrigger: ({
    children,
    value,
    className,
  }: {
    children: React.ReactNode;
    value: string;
    className?: string;
  }) => (
    <button className={className} data-testid="mock-tabs-trigger" data-value={value}>
      {children}
    </button>
  ),
  TabsContent: ({
    children,
    value,
    className,
  }: {
    children: React.ReactNode;
    value: string;
    className?: string;
  }) => (
    <div className={className} data-testid="mock-tabs-content" data-value={value}>
      {children}
    </div>
  ),
}));

vi.mock("../../../../lib/blockBrandedIconsAndPlaceholders", () => ({
  blockBrandedIconsAndPlaceholders: {
    placeholder1: "https://placeholder.com/1.jpg",
    placeholder2: "https://placeholder.com/2.jpg",
    placeholder3: "https://placeholder.com/3.jpg",
    placeholder4: "https://placeholder.com/4.jpg",
  },
}));

vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      className,
    }: {
      children: React.ReactNode;
      className?: string;
    }) => <div className={className}>{children}</div>,
  },
}));

describe("TimelineTabbedPhases", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom heading", () => {
    const { getByText } = render(
      <TimelineTabbedPhases heading="Custom Heading" />
    );
    expect(getByText("Custom Heading")).toBeInTheDocument();
  });
});
