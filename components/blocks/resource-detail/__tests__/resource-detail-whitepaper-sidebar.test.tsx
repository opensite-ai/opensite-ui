import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ResourceDetailWhitepaperSidebar } from "../resource-detail-whitepaper-sidebar";

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

vi.mock("../../../../lib/blockBrandedIconsAndPlaceholders", () => ({
  blockBrandedIconsAndPlaceholders: {
    integration1: "https://placeholder.com/integration1.svg",
    integration2: "https://placeholder.com/integration2.svg",
    integration3: "https://placeholder.com/integration3.svg",
    integration4: "https://placeholder.com/integration4.svg",
  },
}));

vi.mock("@page-speed/pdf-viewer", () => ({
  PDFViewer: ({ url, height }: { url: string; height: string | number }) => (
    <div data-testid="mock-pdf-viewer" data-url={url} data-height={height} />
  ),
}));

describe("ResourceDetailWhitepaperSidebar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders sidebar with resource type", () => {
    render(<ResourceDetailWhitepaperSidebar sidebar={{ resourceType: "Whitepaper" }} />);
    expect(screen.getByText("Whitepaper")).toBeInTheDocument();
  });

  it("renders sidebar with resource title", () => {
    render(<ResourceDetailWhitepaperSidebar sidebar={{ resourceTitle: "The Complete Guide" }} />);
    expect(screen.getByText("The Complete Guide")).toBeInTheDocument();
  });

  it("renders download options title", () => {
    render(<ResourceDetailWhitepaperSidebar sidebar={{ downloadOptionsTitle: "Download Options" }} />);
    expect(screen.getByText("Download Options")).toBeInTheDocument();
  });

  it("renders download description", () => {
    render(<ResourceDetailWhitepaperSidebar sidebar={{ downloadDescription: "Download for offline reading" }} />);
    expect(screen.getByText("Download for offline reading")).toBeInTheDocument();
  });

  it("renders read time", () => {
    render(<ResourceDetailWhitepaperSidebar sidebar={{ readTime: "5 minutes" }} />);
    expect(screen.getByText(/5 minutes/)).toBeInTheDocument();
  });

  it("applies custom className to section", () => {
    const { container } = render(
      <ResourceDetailWhitepaperSidebar
        className="custom-class"
        sidebar={{ resourceType: "Whitepaper" }}
      />
    );
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("routes dedicated sidebar icon names and preserves custom nodes", () => {
    const view = render(
      <ResourceDetailWhitepaperSidebar
        sidebar={{
          resourceType: "Whitepaper",
          resourceTypeIcon: "lucide/book-open",
          downloadOptionsTitle: "Download Options",
          downloadOptionsIcon: <span data-testid="custom-download-icon" />,
          shareTitle: "Share",
          shareIcon: 0,
        }}
      />,
    );

    let resourceHeading = screen.getByText("Whitepaper").closest("h3")!;
    expect(
      within(resourceHeading).getByTestId("mock-dynamic-icon"),
    ).toHaveAttribute("data-name", "lucide/book-open");
    expect(resourceHeading).not.toHaveTextContent("lucide/book-open");

    const downloadHeading = screen
      .getByText("Download Options")
      .closest("h3")!;
    expect(
      within(downloadHeading).getByTestId("custom-download-icon"),
    ).toBeInTheDocument();
    expect(
      within(downloadHeading).queryByTestId("mock-dynamic-icon"),
    ).not.toBeInTheDocument();

    let shareHeading = Array.from(
      view.container.querySelectorAll("h3"),
    ).find((heading) => heading.textContent === "0Share")!;
    expect(shareHeading).toHaveTextContent("0Share");
    expect(
      within(shareHeading).queryByTestId("mock-dynamic-icon"),
    ).not.toBeInTheDocument();

    view.rerender(
      <ResourceDetailWhitepaperSidebar
        sidebar={{
          resourceType: "Whitepaper",
          resourceTypeIcon: (
            <span data-testid="custom-resource-type-icon" />
          ),
          downloadOptionsTitle: "Download Options",
          downloadOptionsIcon: "lucide/download",
          shareTitle: "Share",
          shareIcon: "lucide/share-2",
        }}
      />,
    );
    const customResourceTypeIcon = screen.getByTestId(
      "custom-resource-type-icon",
    );
    resourceHeading = customResourceTypeIcon.closest("h3")!;
    expect(resourceHeading).toContainElement(customResourceTypeIcon);
    expect(
      within(resourceHeading).queryByTestId("mock-dynamic-icon"),
    ).not.toBeInTheDocument();

    const downloadOptionsStringIcon = view.container.querySelector(
      '[data-name="lucide/download"]',
    ) as HTMLElement;
    const downloadOptionsHeading = downloadOptionsStringIcon.closest("h3")!;
    expect(downloadOptionsStringIcon).toBeInTheDocument();
    expect(downloadOptionsHeading).not.toHaveTextContent("lucide/download");

    const shareStringIcon = view.container.querySelector(
      '[data-name="lucide/share-2"]',
    ) as HTMLElement;
    shareHeading = shareStringIcon.closest("h3")!;
    expect(shareStringIcon).toBeInTheDocument();
    expect(shareHeading).not.toHaveTextContent("lucide/share-2");

    view.rerender(
      <ResourceDetailWhitepaperSidebar
        sidebar={{
          shareTitle: "Share",
          shareIcon: <span data-testid="custom-share-icon" />,
        }}
      />,
    );
    const customShareIcon = screen.getByTestId("custom-share-icon");
    shareHeading = customShareIcon.closest("h3")!;
    expect(shareHeading).toContainElement(customShareIcon);
    expect(
      within(shareHeading).queryByTestId("mock-dynamic-icon"),
    ).not.toBeInTheDocument();

    view.rerender(
      <ResourceDetailWhitepaperSidebar
        sidebar={{
          resourceType: "Whitepaper",
          resourceTypeIcon: "",
          downloadOptionsTitle: "Download Options",
          downloadOptionsIcon: false,
          shareTitle: "Share",
          shareIcon: "",
        }}
      />,
    );
    resourceHeading = screen.getByText("Whitepaper").closest("h3")!;
    shareHeading = Array.from(view.container.querySelectorAll("h3")).find(
      (heading) => heading.textContent === "Share",
    )!;
    expect(
      within(resourceHeading).queryByTestId("mock-dynamic-icon"),
    ).not.toBeInTheDocument();
    expect(
      within(
        screen.getByText("Download Options").closest("h3")!,
      ).queryByTestId("mock-dynamic-icon"),
    ).not.toBeInTheDocument();
    expect(
      within(shareHeading).queryByTestId("mock-dynamic-icon"),
    ).not.toBeInTheDocument();
  });

  it("routes download action icons while preserving children composition", () => {
    const { container, rerender } = render(
      <ResourceDetailWhitepaperSidebar
        sidebar={{
          primaryDownloadAction: {
            label: "PDF",
            href: "/pdf",
            icon: "lucide/file-down",
            iconAfter: "lucide/arrow-right",
            className: "custom-download-action",
          },
          secondaryDownloadAction: {
            href: "/children",
            icon: "lucide/hidden",
            iconAfter: "lucide/external-link",
            children: <span data-testid="download-action-children" />,
          },
        }}
      />,
    );

    const primaryAction = container.querySelector(
      '[href="/pdf"]',
    ) as HTMLElement;
    expect(
      within(primaryAction).getAllByTestId("mock-dynamic-icon").map((icon) =>
        icon.getAttribute("data-name"),
      ),
    ).toEqual(["lucide/file-down", "lucide/arrow-right"]);
    expect(primaryAction).not.toHaveTextContent("lucide/file-down");
    expect(primaryAction).not.toHaveTextContent("lucide/arrow-right");
    expect(primaryAction).toHaveClass("custom-download-action");

    const childrenAction = container.querySelector(
      '[href="/children"]',
    ) as HTMLElement;
    expect(
      within(childrenAction).getByTestId("download-action-children"),
    ).toBeInTheDocument();
    expect(
      within(childrenAction).getByTestId("mock-dynamic-icon"),
    ).toHaveAttribute("data-name", "lucide/external-link");
    expect(childrenAction).not.toHaveTextContent("lucide/hidden");

    rerender(
      <ResourceDetailWhitepaperSidebar
        sidebar={{
          primaryDownloadAction: {
            href: "/custom-download",
            icon: <span data-testid="custom-download-leading-icon" />,
            iconAfter: <span data-testid="custom-download-trailing-icon" />,
          },
        }}
      />,
    );
    const customDownloadAction = container.querySelector(
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
      <ResourceDetailWhitepaperSidebar
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
