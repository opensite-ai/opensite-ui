import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactSchedule } from "../contact-schedule";

describe("ContactSchedule", () => {

  it("renders custom heading", () => {
    render(<ContactSchedule heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ContactSchedule description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders custom button text", () => {
    render(<ContactSchedule buttonText="Custom Button" />);
    expect(screen.getByText("Custom Button")).toBeInTheDocument();
  });
    expect(button).toBeInTheDocument();
  });
});
