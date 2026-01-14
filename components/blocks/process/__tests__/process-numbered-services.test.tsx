import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProcessNumberedServices } from "../process-numbered-services";

describe("ProcessNumberedServices", () => {
  const mockServices = [
    {
      number: "01",
      title: "Consulting",
      description: "Strategic guidance for your business",
      capabilities: ["Strategy", "Planning"],
      ctaText: "Learn more",
      ctaUrl: "/consulting",
    },
    {
      number: "02",
      title: "Development",
      description: "Building robust solutions",
      capabilities: ["Web", "Mobile"],
      ctaText: "Learn more",
      ctaUrl: "/development",
    },
    {
      number: "03",
      title: "Support",
      description: "Ongoing maintenance and support",
      capabilities: ["24/7 Support", "Monitoring"],
      ctaText: "Learn more",
      ctaUrl: "/support",
    },
  ];

  it("renders title and description", () => {
    render(
      <ProcessNumberedServices
        title="What We Offer"
        description="Our range of services"
      />
    );
    expect(screen.getByText("What We Offer")).toBeInTheDocument();
    expect(screen.getByText("Our range of services")).toBeInTheDocument();
  });

  it("renders all provided services", () => {
    render(<ProcessNumberedServices services={mockServices} />);
    expect(screen.getByText("Consulting")).toBeInTheDocument();
    expect(screen.getByText("Development")).toBeInTheDocument();
    expect(screen.getByText("Support")).toBeInTheDocument();
  });

  it("renders service descriptions", () => {
    render(<ProcessNumberedServices services={mockServices} />);
    expect(
      screen.getByText("Strategic guidance for your business")
    ).toBeInTheDocument();
    expect(screen.getByText("Building robust solutions")).toBeInTheDocument();
    expect(
      screen.getByText("Ongoing maintenance and support")
    ).toBeInTheDocument();
  });

  it("renders service numbers", () => {
    render(<ProcessNumberedServices services={mockServices} />);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("02")).toBeInTheDocument();
    expect(screen.getByText("03")).toBeInTheDocument();
  });

  it("renders capabilities", () => {
    render(<ProcessNumberedServices services={mockServices} />);
    expect(screen.getByText("Strategy")).toBeInTheDocument();
    expect(screen.getByText("Planning")).toBeInTheDocument();
    expect(screen.getByText("Web")).toBeInTheDocument();
    expect(screen.getByText("Mobile")).toBeInTheDocument();
    expect(screen.getByText("24/7 Support")).toBeInTheDocument();
    expect(screen.getByText("Monitoring")).toBeInTheDocument();
  });

  it("renders CTA links", () => {
    render(<ProcessNumberedServices services={mockServices} />);
    const learnMoreLinks = screen.getAllByText("Learn more");
    expect(learnMoreLinks.length).toBe(3);
  });

  it("renders CTA links with correct hrefs", () => {
    render(<ProcessNumberedServices services={mockServices} />);
    const consultingLink = screen.getAllByText("Learn more")[0].closest("a");
    expect(consultingLink).toHaveAttribute("href", "/consulting");
  });

  it("renders grid layout for services", () => {
    const { container } = render(
      <ProcessNumberedServices services={mockServices} />
    );
    const serviceRows = container.querySelectorAll(".lg\\:grid-cols-12");
    expect(serviceRows.length).toBe(3);
  });

  it("renders with empty services array", () => {
    const { container } = render(<ProcessNumberedServices services={[]} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders service number badges with hover effect", () => {
    const { container } = render(
      <ProcessNumberedServices services={mockServices} />
    );
    const badges = container.querySelectorAll(".rounded-full.border-2.border-primary");
    expect(badges.length).toBe(3);
    badges.forEach((badge) => {
      expect(badge.className).toContain("group-hover:bg-primary");
    });
  });

  it("renders capabilities with check icons", () => {
    const { container } = render(
      <ProcessNumberedServices services={mockServices} />
    );
    const capabilityItems = container.querySelectorAll(".rounded-lg.bg-muted\\/50");
    expect(capabilityItems.length).toBe(6);
  });

  it("renders services with border top", () => {
    const { container } = render(
      <ProcessNumberedServices services={mockServices} />
    );
    const serviceRows = container.querySelectorAll(".border-t");
    expect(serviceRows.length).toBe(3);
  });

  it("renders services without CTA", () => {
    const servicesWithoutCta = [
      {
        number: "01",
        title: "Service 1",
        description: "Description 1",
      },
    ];
    render(<ProcessNumberedServices services={servicesWithoutCta} />);
    expect(screen.getByText("Service 1")).toBeInTheDocument();
    expect(screen.queryByText("Learn more")).not.toBeInTheDocument();
  });

  it("renders services without capabilities", () => {
    const servicesWithoutCapabilities = [
      {
        number: "01",
        title: "Service 1",
        description: "Description 1",
        ctaText: "Learn more",
        ctaUrl: "/service",
      },
    ];
    render(<ProcessNumberedServices services={servicesWithoutCapabilities} />);
    expect(screen.getByText("Service 1")).toBeInTheDocument();
  });

  it("renders capabilities grid with two columns on small screens", () => {
    const { container } = render(
      <ProcessNumberedServices services={mockServices} />
    );
    const capabilitiesGrid = container.querySelector(".sm\\:grid-cols-2");
    expect(capabilitiesGrid).toBeInTheDocument();
  });
});
