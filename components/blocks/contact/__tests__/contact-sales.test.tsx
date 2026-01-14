import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactSales } from "../contact-sales";

describe("ContactSales", () => {

  it("renders custom heading", () => {
    render(<ContactSales heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ContactSales description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders custom button text", () => {
    render(<ContactSales buttonText="Custom Button" />);
    expect(screen.getByText("Custom Button")).toBeInTheDocument();
  });
    expect(button).toBeInTheDocument();
  });
});
