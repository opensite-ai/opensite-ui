import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactFeedback } from "../contact-feedback";

describe("ContactFeedback", () => {

  it("renders custom heading", () => {
    render(<ContactFeedback heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ContactFeedback description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders custom button text", () => {
    render(<ContactFeedback buttonText="Custom Button" />);
    expect(screen.getByText("Custom Button")).toBeInTheDocument();
  });
    expect(button).toBeInTheDocument();
  });
});
