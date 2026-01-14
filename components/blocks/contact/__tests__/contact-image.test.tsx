import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactImage } from "../contact-image";

describe("ContactImage", () => {

  it("renders custom heading", () => {
    render(<ContactImage heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ContactImage description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders custom button text", () => {
    render(<ContactImage buttonText="Custom Button" />);
    expect(screen.getByText("Custom Button")).toBeInTheDocument();
  });
    expect(button).toBeInTheDocument();
  });
});
