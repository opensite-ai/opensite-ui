import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { OfferModalNewsletterDiscount } from "../offer-modal-newsletter-discount";

describe("OfferModalNewsletterDiscount", () => {
  it("renders with default props", () => {
    render(<OfferModalNewsletterDiscount />);
    expect(
      screen.getByText("Join our newsletter and enjoy 35% off your first order")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByText("Subscribe")).toBeInTheDocument();
    expect(screen.getByText("Close")).toBeInTheDocument();
  });

  it("renders with custom title", () => {
    render(<OfferModalNewsletterDiscount title="Get 50% off today!" />);
    expect(screen.getByText("Get 50% off today!")).toBeInTheDocument();
  });

  it("renders with custom button text", () => {
    render(<OfferModalNewsletterDiscount buttonText="Sign Up Now" />);
    expect(screen.getByText("Sign Up Now")).toBeInTheDocument();
  });

  it("renders with custom close button text", () => {
    render(<OfferModalNewsletterDiscount closeButtonText="Dismiss" />);
    expect(screen.getByText("Dismiss")).toBeInTheDocument();
  });

  it("renders with custom email placeholder", () => {
    render(
      <OfferModalNewsletterDiscount emailPlaceholder="Enter your email" />
    );
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
  });

  it("renders dialog content when open", () => {
    render(<OfferModalNewsletterDiscount />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("handles email input changes", () => {
    render(<OfferModalNewsletterDiscount />);
    const input = screen.getByPlaceholderText("Email") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "test@example.com" } });
    expect(input.value).toBe("test@example.com");
  });

  it("calls onSubmit with email when form is submitted", () => {
    const onSubmit = vi.fn();
    render(<OfferModalNewsletterDiscount onSubmit={onSubmit} />);

    const input = screen.getByPlaceholderText("Email");
    fireEvent.change(input, { target: { value: "test@example.com" } });

    const form = input.closest("form");
    fireEvent.submit(form!);

    expect(onSubmit).toHaveBeenCalledWith("test@example.com");
  });

  it("does not call onSubmit when email is empty", () => {
    const onSubmit = vi.fn();
    render(<OfferModalNewsletterDiscount onSubmit={onSubmit} />);

    const input = screen.getByPlaceholderText("Email");
    const form = input.closest("form");
    fireEvent.submit(form!);

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("renders email input with required attribute", () => {
    render(<OfferModalNewsletterDiscount />);
    const input = screen.getByPlaceholderText("Email");
    expect(input).toHaveAttribute("type", "email");
    expect(input).toBeRequired();
  });

  it("renders close button", () => {
    render(<OfferModalNewsletterDiscount />);
    expect(screen.getByText("Close")).toBeInTheDocument();
  });

  it("renders with defaultOpen false", () => {
    render(<OfferModalNewsletterDiscount defaultOpen={false} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("combines all custom props correctly", () => {
    const onSubmit = vi.fn();
    render(
      <OfferModalNewsletterDiscount
        title="Custom Title"
        emailPlaceholder="Your email"
        buttonText="Join"
        closeButtonText="X"
        className="my-custom-class"
        onSubmit={onSubmit}
      />
    );

    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Your email")).toBeInTheDocument();
    expect(screen.getByText("Join")).toBeInTheDocument();
    expect(screen.getByText("X")).toBeInTheDocument();
  });
});
