import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { OfferModalMembershipImage } from "../offer-modal-membership-image";

describe("OfferModalMembershipImage", () => {
  it("renders with default props", () => {
    render(<OfferModalMembershipImage />);
    expect(screen.getByText("Treat Yourself!")).toBeInTheDocument();
    expect(
      screen.getByText("Become a Member & Enjoy 20% Off")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Sign up to receive our latest updates — you can unsubscribe whenever you like."
      )
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email Address")).toBeInTheDocument();
  });

  it("renders with custom overline", () => {
    render(<OfferModalMembershipImage overline="Special Offer!" />);
    expect(screen.getByText("Special Offer!")).toBeInTheDocument();
  });

  it("renders with custom title", () => {
    render(<OfferModalMembershipImage title="Join Our VIP Club" />);
    expect(screen.getByText("Join Our VIP Club")).toBeInTheDocument();
  });

  it("renders with custom description", () => {
    render(
      <OfferModalMembershipImage description="Get exclusive access to deals." />
    );
    expect(screen.getByText("Get exclusive access to deals.")).toBeInTheDocument();
  });

  it("renders with custom button text", () => {
    render(<OfferModalMembershipImage buttonText="Sign Up" />);
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
  });

  it("renders with custom email placeholder", () => {
    render(
      <OfferModalMembershipImage emailPlaceholder="Your email here" />
    );
    expect(screen.getByPlaceholderText("Your email here")).toBeInTheDocument();
  });

  it("renders image with custom src and alt", () => {
    render(
      <OfferModalMembershipImage
        image={{ src: "/custom-image.jpg", alt: "Custom promo" }}
      />
    );
    expect(screen.getByAltText("Custom promo")).toBeInTheDocument();
  });

  it("renders dialog content when open", () => {
    render(<OfferModalMembershipImage />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("handles email input changes", () => {
    render(<OfferModalMembershipImage />);
    const input = screen.getByPlaceholderText("Email Address") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "test@example.com" } });
    expect(input.value).toBe("test@example.com");
  });

  it("calls onSubmit with valid email", async () => {
    const onSubmit = vi.fn();
    render(<OfferModalMembershipImage onSubmit={onSubmit} />);

    const input = screen.getByPlaceholderText("Email Address");
    fireEvent.change(input, { target: { value: "test@example.com" } });

    const form = input.closest("form");
    fireEvent.submit(form!);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith("test@example.com");
    });
  });

  it("shows error for empty email", async () => {
    render(<OfferModalMembershipImage />);

    const input = screen.getByPlaceholderText("Email Address");
    const form = input.closest("form");
    fireEvent.submit(form!);

    const errorMessage = await screen.findByText("Please enter an email address", {}, { timeout: 3000 });
    expect(errorMessage).toBeInTheDocument();
  });

  it("shows error for invalid email format", async () => {
    render(<OfferModalMembershipImage />);

    const input = screen.getByPlaceholderText("Email Address");
    fireEvent.change(input, { target: { value: "invalid-email" } });

    const form = input.closest("form");
    fireEvent.submit(form!);

    const errorMessage = await screen.findByText("Please enter a valid email address", {}, { timeout: 3000 });
    expect(errorMessage).toBeInTheDocument();
  });

  it("clears error when user types", async () => {
    render(<OfferModalMembershipImage />);

    const input = screen.getByPlaceholderText("Email Address");
    const form = input.closest("form");
    fireEvent.submit(form!);

    // Wait for error to appear
    const errorMessage = await screen.findByText("Please enter an email address", {}, { timeout: 3000 });
    expect(errorMessage).toBeInTheDocument();

    // Type in the field to clear the error
    fireEvent.change(input, { target: { value: "t" } });

    // Wait for error to disappear
    await waitFor(() => {
      expect(screen.queryByText("Please enter an email address")).not.toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it("does not call onSubmit with invalid email", () => {
    const onSubmit = vi.fn();
    render(<OfferModalMembershipImage onSubmit={onSubmit} />);

    const input = screen.getByPlaceholderText("Email Address");
    fireEvent.change(input, { target: { value: "invalid" } });

    const form = input.closest("form");
    fireEvent.submit(form!);

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("renders with defaultOpen false", () => {
    render(<OfferModalMembershipImage defaultOpen={false} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders Get Offer button text", () => {
    render(<OfferModalMembershipImage />);
    expect(screen.getByText("Get Offer")).toBeInTheDocument();
  });

  it("combines all custom props correctly", () => {
    const onSubmit = vi.fn();
    render(
      <OfferModalMembershipImage
        overline="Limited Time"
        title="Join Now"
        description="Don't miss out!"
        emailPlaceholder="Email"
        buttonText="Subscribe"
        image={{ src: "/promo.jpg", alt: "Promo" }}
        className="my-class"
        onSubmit={onSubmit}
      />
    );

    expect(screen.getByText("Limited Time")).toBeInTheDocument();
    expect(screen.getByText("Join Now")).toBeInTheDocument();
    expect(screen.getByText("Don't miss out!")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByText("Subscribe")).toBeInTheDocument();
    expect(screen.getByAltText("Promo")).toBeInTheDocument();
  });
});
