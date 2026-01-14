import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactMap } from "../contact-map";

describe("ContactMap", () => {

  it("renders custom heading", () => {
    render(<ContactMap heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ContactMap description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders custom button text", () => {
    render(<ContactMap buttonText="Custom Button" />);
    expect(screen.getByText("Custom Button")).toBeInTheDocument();
  });
    expect(button).toBeInTheDocument();
  });
});
