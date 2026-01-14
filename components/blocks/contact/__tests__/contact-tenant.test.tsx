import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactTenant } from "../contact-tenant";

describe("ContactTenant", () => {

  it("renders custom heading", () => {
    render(<ContactTenant heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ContactTenant description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders custom button text", () => {
    render(<ContactTenant buttonText="Custom Button" />);
    expect(screen.getByText("Custom Button")).toBeInTheDocument();
  });
    expect(button).toBeInTheDocument();
  });
});
