import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ResourceDetailDocumentSidebar } from "../resource-detail-document-sidebar";

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

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({
    name,
    size,
    className,
  }: {
    name?: React.ReactNode | string;
    size?: number;
    className?: string;
  }) =>
    typeof name === "string" ? (
      <span
        data-testid="mock-dynamic-icon"
        data-name={name}
        data-size={size}
        className={className}
      />
    ) : (
      <>{name}</>
    ),
}));

vi.mock("../../../ui/avatar", () => ({
  Avatar: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div className={className} data-testid="mock-avatar">
      {children}
    </div>
  ),
  AvatarImage: ({ src, alt }: { src: string; alt?: string }) => (
    <img src={src} alt={alt} data-testid="mock-avatar-image" />
  ),
}));

vi.mock("../../../ui/breadcrumb", () => ({
  Breadcrumb: ({ children }: { children: React.ReactNode }) => (
    <nav data-testid="mock-breadcrumb">{children}</nav>
  ),
  BreadcrumbList: ({ children }: { children: React.ReactNode }) => (
    <ol data-testid="mock-breadcrumb-list">{children}</ol>
  ),
  BreadcrumbItem: ({ children }: { children: React.ReactNode }) => (
    <li data-testid="mock-breadcrumb-item">{children}</li>
  ),
  BreadcrumbLink: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href?: string;
  }) => (
    <a href={href} data-testid="mock-breadcrumb-link">
      {children}
    </a>
  ),
  BreadcrumbPage: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="mock-breadcrumb-page">{children}</span>
  ),
  BreadcrumbSeparator: () => (
    <span data-testid="mock-breadcrumb-separator">/</span>
  ),
}));

vi.mock("../../../ui/separator", () => ({
  Separator: ({ className }: { className?: string }) => (
    <hr className={className} data-testid="mock-separator" />
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

vi.mock("../../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

vi.mock("../../../../lib/blockBrandedIconsAndPlaceholders", () => ({
  blockBrandedIconsAndPlaceholders: {
    avatar1: "https://placeholder.com/avatar1.jpg",
  },
}));

describe("ResourceDetailDocumentSidebar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with custom title", () => {
    const { container } = render(
      <ResourceDetailDocumentSidebar title="Custom Document Title" />
    );
    const heading = container.querySelector("h1");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Custom Document Title");
  });

  it("routes dedicated feature and download action icon names", () => {
    const view = render(
      <ResourceDetailDocumentSidebar
        sidebar={{
          downloadAction: {
            label: "Download",
            href: "/download",
            icon: "lucide/download",
            iconAfter: "lucide/arrow-right",
            className: "custom-download-action",
          },
          featuresTitle: "Features",
          features: [
            { text: "String feature", icon: "lucide/sparkles" },
            {
              text: "Custom feature",
              icon: <span data-testid="custom-feature-icon" />,
            },
            { text: "Zero feature", icon: 0 },
            { text: "False feature", icon: false },
            { text: "Empty feature", icon: "" },
            { text: "Default feature" },
          ],
        }}
      />,
    );

    const downloadAction = view.container.querySelector(
      '[href="/download"]',
    ) as HTMLElement;
    expect(
      within(downloadAction)
        .getAllByTestId("mock-dynamic-icon")
        .map((icon) => icon.getAttribute("data-name")),
    ).toEqual(["lucide/download", "lucide/arrow-right"]);
    expect(downloadAction).not.toHaveTextContent("lucide/download");
    expect(downloadAction).not.toHaveTextContent("lucide/arrow-right");
    expect(downloadAction).toHaveClass("custom-download-action");

    const stringFeature = screen.getByText("String feature").closest("li")!;
    expect(
      within(stringFeature).getByTestId("mock-dynamic-icon"),
    ).toHaveAttribute("data-name", "lucide/sparkles");
    expect(stringFeature).not.toHaveTextContent("lucide/sparkles");

    const customFeature = screen.getByText("Custom feature").closest("li")!;
    expect(
      within(customFeature).getByTestId("custom-feature-icon"),
    ).toBeInTheDocument();
    expect(
      within(customFeature).queryByTestId("mock-dynamic-icon"),
    ).not.toBeInTheDocument();

    const zeroFeature = screen.getByText("Zero feature").closest("li")!;
    expect(zeroFeature).toHaveTextContent("0Zero feature");
    expect(
      within(zeroFeature).queryByTestId("mock-dynamic-icon"),
    ).not.toBeInTheDocument();

    for (const text of ["False feature", "Empty feature"]) {
      const feature = screen.getByText(text).closest("li")!;
      expect(
        within(feature).queryByTestId("mock-dynamic-icon"),
      ).not.toBeInTheDocument();
    }

    const defaultFeature = screen.getByText("Default feature").closest("li")!;
    const defaultIcon =
      within(defaultFeature).getByTestId("mock-dynamic-icon");
    expect(defaultIcon).toHaveAttribute("data-name", "lucide/check-circle-2");
    expect(defaultIcon).toHaveAttribute("data-size", "16");
    expect(defaultIcon).toHaveClass("text-primary");

    view.rerender(
      <ResourceDetailDocumentSidebar
        sidebar={{
          downloadAction: {
            href: "/download",
            icon: "lucide/hidden",
            iconAfter: "lucide/hidden-after",
            children: <span data-testid="download-action-children" />,
          },
        }}
      />,
    );
    const childrenAction = view.container.querySelector(
      '[href="/download"]',
    ) as HTMLElement;
    expect(
      within(childrenAction).getByTestId("download-action-children"),
    ).toBeInTheDocument();
    expect(
      within(childrenAction).queryByTestId("mock-dynamic-icon"),
    ).not.toBeInTheDocument();

    view.rerender(
      <ResourceDetailDocumentSidebar
        sidebar={{
          downloadAction: {
            href: "/custom-download",
            icon: <span data-testid="custom-download-leading-icon" />,
            iconAfter: <span data-testid="custom-download-trailing-icon" />,
          },
        }}
      />,
    );
    const customDownloadAction = view.container.querySelector(
      '[href="/custom-download"]',
    ) as HTMLElement;
    expect(
      within(customDownloadAction).getByTestId(
        "custom-download-leading-icon",
      ),
    ).toBeInTheDocument();
    expect(
      within(customDownloadAction).getByTestId(
        "custom-download-trailing-icon",
      ),
    ).toBeInTheDocument();
    expect(
      within(customDownloadAction).queryByTestId("mock-dynamic-icon"),
    ).not.toBeInTheDocument();
  });

  it("routes share action icons while preserving node and children behavior", () => {
    const { container } = render(
      <ResourceDetailDocumentSidebar
        sidebar={{
          shareTitle: "Share",
          shareActions: [
            {
              href: "/string",
              icon: "lucide/linkedin",
              iconAfter: "lucide/arrow-up-right",
              className: "custom-share-action",
            },
            {
              href: "/custom",
              icon: <span data-testid="custom-leading-icon" />,
              iconAfter: <span data-testid="custom-trailing-icon" />,
            },
            { href: "/sentinel", icon: 0, iconAfter: false },
            { href: "/empty", icon: "", iconAfter: "" },
            {
              href: "/children",
              icon: "lucide/hidden",
              children: <span data-testid="share-action-children" />,
            },
          ],
        }}
      />,
    );

    const stringAction = container.querySelector(
      '[href="/string"]',
    ) as HTMLElement;
    expect(
      within(stringAction).getAllByTestId("mock-dynamic-icon").map((icon) =>
        icon.getAttribute("data-name"),
      ),
    ).toEqual(["lucide/linkedin", "lucide/arrow-up-right"]);
    expect(stringAction).not.toHaveTextContent("lucide/linkedin");
    expect(stringAction).not.toHaveTextContent("lucide/arrow-up-right");
    expect(stringAction).toHaveClass("custom-share-action");

    const customAction = container.querySelector(
      '[href="/custom"]',
    ) as HTMLElement;
    expect(
      within(customAction).getByTestId("custom-leading-icon"),
    ).toBeInTheDocument();
    expect(
      within(customAction).getByTestId("custom-trailing-icon"),
    ).toBeInTheDocument();

    const sentinelAction = container.querySelector(
      '[href="/sentinel"]',
    ) as HTMLElement;
    expect(sentinelAction).toHaveTextContent("0");
    expect(
      within(sentinelAction).queryByTestId("mock-dynamic-icon"),
    ).not.toBeInTheDocument();

    const emptyAction = container.querySelector(
      '[href="/empty"]',
    ) as HTMLElement;
    expect(
      within(emptyAction).queryByTestId("mock-dynamic-icon"),
    ).not.toBeInTheDocument();

    const childrenAction = container.querySelector(
      '[href="/children"]',
    ) as HTMLElement;
    expect(
      within(childrenAction).getByTestId("share-action-children"),
    ).toBeInTheDocument();
    expect(
      within(childrenAction).queryByTestId("mock-dynamic-icon"),
    ).not.toBeInTheDocument();
  });
});
