import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactHelpCenter } from "../contact-help-center";

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">
      {children}
    </a>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>
      icon
    </span>
  ),
}));

describe("ContactHelpCenter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<ContactHelpCenter eyebrow="Support Center" heading="Need help navigating coverage decisions?" cardTitle="Contact Our Team" />);
    expect(screen.getByText("Support Center")).toBeInTheDocument();
    expect(screen.getByText("Need help navigating coverage decisions?")).toBeInTheDocument();
    expect(screen.getByText("Contact Our Team")).toBeInTheDocument();
  });

  it("renders custom eyebrow", () => {
    render(<ContactHelpCenter eyebrow="Help Desk" />);
    expect(screen.getByText("Help Desk")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<ContactHelpCenter heading="How can we help you today?" />);
    expect(screen.getByText("How can we help you today?")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ContactHelpCenter description="Our team is ready to assist you" />);
    expect(screen.getByText("Our team is ready to assist you")).toBeInTheDocument();
  });

  it("renders contact items", () => {
    const contactItems = [
      { title: "Email Support", subtitle: "support@example.com", icon: "lucide/mail" },
      { title: "Phone Support", subtitle: "1-800-123-4567", icon: "lucide/phone" },
    ];
    render(<ContactHelpCenter contactItems={contactItems} />);
    expect(screen.getByText("Email Support")).toBeInTheDocument();
    expect(screen.getByText("support@example.com")).toBeInTheDocument();
    expect(screen.getByText("Phone Support")).toBeInTheDocument();
  });

  it("applies custom className to section", () => {
    const { container } = render(<ContactHelpCenter className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
