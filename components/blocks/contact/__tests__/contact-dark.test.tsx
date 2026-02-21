import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactDark } from "../contact-dark";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>
      icon
    </span>
  ),
}));

describe("ContactDark", () => {
  it("renders with default props", () => {
    const { container } = render(<ContactDark />);
    expect(container).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<ContactDark heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ContactDark description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders contact heading and description", () => {
    render(
      <ContactDark
        contactHeading="Get in Touch"
        contactDescription="We'll respond within 24 hours"
      />,
    );
    expect(screen.getByText("Get in Touch")).toBeInTheDocument();
    expect(
      screen.getByText("We'll respond within 24 hours"),
    ).toBeInTheDocument();
  });

  it("renders contact options with icons", () => {
    render(
      <ContactDark
        contactOptions={[
          { icon: "lucide/phone", info: "+1 (555) 987-6543" },
          { icon: "lucide/mail", info: "support@example.com" },
        ]}
      />,
    );
    expect(screen.getByText("+1 (555) 987-6543")).toBeInTheDocument();
    expect(screen.getByText("support@example.com")).toBeInTheDocument();
  });

  it("renders social links", () => {
    render(
      <ContactDark
        socialLinks={[
          {
            icon: "lucide/twitter",
            href: "https://twitter.com",
            label: "Twitter",
          },
          {
            icon: "lucide/linkedin",
            href: "https://linkedin.com",
            label: "LinkedIn",
          },
        ]}
      />,
    );
    const icons = screen.getAllByTestId("mock-icon");
    expect(icons.length).toBeGreaterThanOrEqual(2);
  });

  it("applies custom className", () => {
    const { container } = render(<ContactDark className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
