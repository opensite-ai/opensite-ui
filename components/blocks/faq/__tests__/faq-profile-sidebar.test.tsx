import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  FaqProfileSidebar,
  type FaqProfileSidebarProps,
} from "../faq-profile-sidebar";

vi.mock("@page-speed/img", () => ({
  Img: ({
    src,
    alt,
    className,
  }: {
    src: string;
    alt: string;
    className?: string;
  }) => <img src={src} alt={alt} className={className} data-testid="mock-img" />,
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

describe("FaqProfileSidebar", () => {
  it("renders with default props", () => {
    render(<FaqProfileSidebar />);

    expect(
      screen.getByText("Frequently asked questions")
    ).toBeInTheDocument();
    expect(screen.getByText("Sarah Johnson")).toBeInTheDocument();
    expect(screen.getByText("Customer Success Manager")).toBeInTheDocument();
  });

  it("renders with custom heading and description", () => {
    render(
      <FaqProfileSidebar
        heading="Custom Heading"
        description="Custom description"
      />
    );

    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
    expect(screen.getByText("Custom description")).toBeInTheDocument();
  });

  it("renders custom profile information", () => {
    render(
      <FaqProfileSidebar
        profileName="John Doe"
        profileRole="Support Lead"
        profileDescription="I'm here to help!"
      />
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Support Lead")).toBeInTheDocument();
    expect(screen.getByText("I'm here to help!")).toBeInTheDocument();
  });

  it("renders custom items", () => {
    const customItems: FaqProfileSidebarProps["items"] = [
      { id: "1", question: "Custom Question 1", answer: "Custom Answer 1" },
      { id: "2", question: "Custom Question 2", answer: "Custom Answer 2" },
    ];

    render(<FaqProfileSidebar items={customItems} />);

    expect(screen.getByText("Custom Question 1")).toBeInTheDocument();
    expect(screen.getByText("Custom Question 2")).toBeInTheDocument();
  });

  it("renders contact section", () => {
    render(
      <FaqProfileSidebar
        contactText="Need help?"
        contactAction={{ label: "Contact Us", href: "/contact" }}
      />
    );

    expect(screen.getByText("Need help?")).toBeInTheDocument();
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <FaqProfileSidebar className="custom-class" />
    );

    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders empty items array", () => {
    render(<FaqProfileSidebar items={[]} />);

    expect(
      screen.getByText("Frequently asked questions")
    ).toBeInTheDocument();
  });

  it("renders profile image", () => {
    render(<FaqProfileSidebar />);

    const images = screen.getAllByTestId("mock-img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("renders pressable button", () => {
    render(<FaqProfileSidebar />);

    const pressables = screen.getAllByTestId("mock-pressable");
    expect(pressables.length).toBeGreaterThan(0);
  });
});

