import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ServiceDetailProseMinimal } from "../service-detail-prose-minimal";

describe("ServiceDetailProseMinimal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    const { container } = render(<ServiceDetailProseMinimal />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<ServiceDetailProseMinimal className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders the title", () => {
    render(<ServiceDetailProseMinimal title="Custom Service Title" />);
    expect(screen.getByText("Custom Service Title")).toBeInTheDocument();
  });

  it("renders the intro title and description", () => {
    render(
      <ServiceDetailProseMinimal
        introTitle="Custom Intro Title"
        introDescription="Custom intro description text"
      />
    );
    expect(screen.getByText("Custom Intro Title")).toBeInTheDocument();
    expect(screen.getByText("Custom intro description text")).toBeInTheDocument();
  });

  it("renders content sections", () => {
    render(
      <ServiceDetailProseMinimal
        contentSections={[
          {
            title: "Section Title",
            paragraphs: ["First paragraph", "Second paragraph"],
          },
        ]}
      />
    );
    expect(screen.getByText("Section Title")).toBeInTheDocument();
    expect(screen.getByText("First paragraph")).toBeInTheDocument();
    expect(screen.getByText("Second paragraph")).toBeInTheDocument();
  });

  it("renders services list", () => {
    render(
      <ServiceDetailProseMinimal
        servicesList={{
          title: "Our Services",
          items: ["Service 1", "Service 2", "Service 3"],
        }}
      />
    );
    expect(screen.getByText("Our Services")).toBeInTheDocument();
    expect(screen.getByText("Service 1")).toBeInTheDocument();
    expect(screen.getByText("Service 2")).toBeInTheDocument();
    expect(screen.getByText("Service 3")).toBeInTheDocument();
  });

  it("renders section element with proper structure", () => {
    const { container } = render(<ServiceDetailProseMinimal />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
    expect(container.querySelector(".container")).toBeInTheDocument();
  });
});
