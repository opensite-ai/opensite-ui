import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactCard } from "../contact-card";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>
      icon
    </span>
  ),
}));

describe("ContactCard", () => {
  it("renders with provided props", () => {
    const { container } = render(
      <ContactCard heading="Test Heading" description="Test Description" />,
    );
    expect(container).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<ContactCard className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("renders heading and description", () => {
    render(
      <ContactCard
        heading="Get In Touch"
        description="We'd love to hear from you."
      />,
    );
    expect(screen.getByText("Get In Touch")).toBeInTheDocument();
    expect(screen.getByText("We'd love to hear from you.")).toBeInTheDocument();
  });

  it("renders contact options with icons", () => {
    render(
      <ContactCard
        contactOptions={[
          {
            icon: "Phone",
            info: "+1 (555) 987-6543",
            href: "tel:+15559876543",
          },
          { icon: "Mail", info: "support@example.com" },
        ]}
      />,
    );
    expect(screen.getByText("+1 (555) 987-6543")).toBeInTheDocument();
    expect(screen.getByText("support@example.com")).toBeInTheDocument();
    const icons = screen.getAllByTestId("mock-icon");
    expect(icons.length).toBeGreaterThanOrEqual(2);
  });
});
