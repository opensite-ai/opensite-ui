import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactPhotography } from "../contact-photography";

vi.mock("@page-speed/forms/integration", () => ({
  FormEngine: ({
    formEngineSetup,
    defaultFields,
  }: {
    formEngineSetup?: unknown;
    defaultFields?: Array<{ name: string; label?: string }>;
  }) => (
    <div data-testid="form-engine">
      {defaultFields?.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name}>{field.label ?? field.name}</label>
          <input id={field.name} aria-label={field.label ?? field.name} />
        </div>
      ))}
    </div>
  ),
}));

describe("ContactPhotography", () => {
  it("renders with provided props", () => {
    const { container } = render(
      <ContactPhotography
        heading="Test Heading"
        description="Test Description"
      />,
    );
    expect(container).toBeInTheDocument();
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ContactPhotography className="custom-class" />,
    );
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("renders split-screen layout with image", () => {
    const { container } = render(
      <ContactPhotography
        heading="Studio Contact"
        image={{ src: "/studio.jpg", alt: "Studio photo" }}
      />,
    );
    const img = container.querySelector("img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("alt", "Studio photo");
  });

  it("renders without image when imageSrc is not provided", () => {
    const { container } = render(<ContactPhotography heading="Contact Us" />);
    const img = container.querySelector("img");
    expect(img).not.toBeInTheDocument();
  });

  it("renders FormEngine when formEngineSetup is provided", () => {
    render(
      <ContactPhotography
        heading="Contact Us"
        formEngineSetup={{ api: {} as any }}
      />,
    );
    expect(screen.getByTestId("form-engine")).toBeInTheDocument();
  });

  it("does not render FormEngine when formEngineSetup is not provided", () => {
    render(<ContactPhotography heading="Contact Us" />);
    expect(screen.queryByTestId("form-engine")).not.toBeInTheDocument();
  });
});
