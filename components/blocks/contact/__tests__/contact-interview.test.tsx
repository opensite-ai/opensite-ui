import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactInterview } from "../contact-interview";

describe("ContactInterview", () => {

  it("renders custom heading", () => {
    render(<ContactInterview heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ContactInterview description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders custom button text", () => {
    render(<ContactInterview buttonText="Custom Button" />);
    expect(screen.getByText("Custom Button")).toBeInTheDocument();
  });
    expect(button).toBeInTheDocument();
  });
});
