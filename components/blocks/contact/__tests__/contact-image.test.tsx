import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactImage } from "../contact-image";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>
      icon
    </span>
  ),
}));

describe("ContactImage", () => {
  it("renders with provided props", () => {
    const { container } = render(
      <ContactImage heading="Test Heading" description="Test Description" />,
    );
    expect(container).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<ContactImage className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("renders eyebrow, heading, and description", () => {
    render(
      <ContactImage
        eyebrow="Get in Touch"
        heading="Contact Us"
        description="We'd love to hear from you."
      />,
    );
    expect(screen.getByText("Get in Touch")).toBeInTheDocument();
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
    expect(screen.getByText("We'd love to hear from you.")).toBeInTheDocument();
  });

  it("renders contact overlay items", () => {
    render(
      <ContactImage
        image={{ src: "/test.jpg", alt: "Test image" }}
        contactOverlays={[
          { icon: "lucide/phone", label: "Phone", title: "+1 (555) 987-6543" },
          { icon: "lucide/mail", label: "Email", title: "support@example.com" },
        ]}
      />,
    );
    expect(screen.getByText("Phone")).toBeInTheDocument();
    expect(screen.getByText("+1 (555) 987-6543")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("support@example.com")).toBeInTheDocument();
  });
});
