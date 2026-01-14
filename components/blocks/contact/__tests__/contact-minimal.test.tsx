import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactMinimal } from "../contact-minimal";

describe("ContactMinimal", () => {

  it("renders custom heading", () => {
    render(<ContactMinimal heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ContactMinimal description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders custom button text", () => {
    render(<ContactMinimal buttonText="Custom Button" />);
    expect(screen.getByText("Custom Button")).toBeInTheDocument();
  });
    expect(button).toBeInTheDocument();
  });
});
