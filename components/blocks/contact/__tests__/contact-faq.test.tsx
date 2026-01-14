import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactFaq } from "../contact-faq";

describe("ContactFaq", () => {

  it("renders custom heading", () => {
    render(<ContactFaq heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ContactFaq description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders custom button text", () => {
    render(<ContactFaq buttonText="Custom Button" />);
    expect(screen.getByText("Custom Button")).toBeInTheDocument();
  });
    expect(button).toBeInTheDocument();
  });
});
