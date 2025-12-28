import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OfferModalSheetNewsletter } from "../offer-modal-sheet-newsletter";

describe("OfferModalSheetNewsletter", () => {
  it("renders with default props", () => {
    render(<OfferModalSheetNewsletter />);
    expect(screen.getByText("Join Now & Enjoy 20% Off")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Join our mailing list for updates and offers. You can unsubscribe at any time."
      )
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email Address")).toBeInTheDocument();
    expect(screen.getByText("Join")).toBeInTheDocument();
  });

  it("renders with custom title", () => {
    render(<OfferModalSheetNewsletter title="Get Exclusive Access" />);
    expect(screen.getByText("Get Exclusive Access")).toBeInTheDocument();
  });

  it("renders with custom description", () => {
    render(
      <OfferModalSheetNewsletter description="Subscribe for special deals." />
    );
    expect(screen.getByText("Subscribe for special deals.")).toBeInTheDocument();
  });

  it("renders with custom button text", () => {
    render(<OfferModalSheetNewsletter buttonText="Subscribe" />);
    expect(screen.getByText("Subscribe")).toBeInTheDocument();
  });

  it("renders with custom email placeholder", () => {
    render(
      <OfferModalSheetNewsletter emailPlaceholder="Enter email" />
    );
    expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument();
  });

  it("renders logo with custom src and alt", () => {
    render(
      <OfferModalSheetNewsletter
        logo={{ src: "/custom-logo.png", alt: "Custom Logo" }}
      />
    );
    expect(screen.getByAltText("Custom Logo")).toBeInTheDocument();
  });

  it("renders image with custom src and alt", () => {
    render(
      <OfferModalSheetNewsletter
        image={{ src: "/custom-image.jpg", alt: "Custom Image" }}
      />
    );
    expect(screen.getByAltText("Custom Image")).toBeInTheDocument();
  });

  it("renders terms and privacy links", () => {
    render(<OfferModalSheetNewsletter />);
    expect(screen.getByText("Terms of Use")).toBeInTheDocument();
    expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
  });

  it("renders terms link with custom URL", () => {
    render(<OfferModalSheetNewsletter termsUrl="/custom-terms" />);
    const termsLink = screen.getByText("Terms of Use");
    expect(termsLink).toHaveAttribute("href", "/custom-terms");
  });

  it("renders privacy link with custom URL", () => {
    render(<OfferModalSheetNewsletter privacyUrl="/custom-privacy" />);
    const privacyLink = screen.getByText("Privacy Policy");
    expect(privacyLink).toHaveAttribute("href", "/custom-privacy");
  });

  it("renders sheet content when open", () => {
    render(<OfferModalSheetNewsletter />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("handles email input changes", () => {
    render(<OfferModalSheetNewsletter />);
    const input = screen.getByPlaceholderText("Email Address") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "test@example.com" } });
    expect(input.value).toBe("test@example.com");
  });

  it("calls onSubmit with valid email", async () => {
    const onSubmit = vi.fn();
    render(<OfferModalSheetNewsletter onSubmit={onSubmit} />);

    const input = screen.getByPlaceholderText("Email Address");
    fireEvent.change(input, { target: { value: "test@example.com" } });

    const form = input.closest("form");
    fireEvent.submit(form!);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith("test@example.com");
    });
  });

  it("shows error for empty email", async () => {
    const user = userEvent.setup();
    render(<OfferModalSheetNewsletter />);

    const input = screen.getByPlaceholderText("Email Address");
    const submitButton = screen.getByText("Join");

    // Click the input to focus it
    await user.click(input);
    // Tab away to blur and trigger touched state
    await user.tab();
    // Click submit button
    await user.click(submitButton);

    // Find error by class name since the component renders a plain div
    // Note: The @page-speed/forms Field component also renders an error, so we need to find the one with text-destructive class
    await waitFor(async () => {
      const errors = screen.getAllByText("Please enter an email address");
      const errorMessage = errors.find(el => el.classList.contains("text-destructive"));
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveClass("text-destructive");
    }, { timeout: 3000 });
  });

  it("shows error for invalid email format", async () => {
    const user = userEvent.setup();
    render(<OfferModalSheetNewsletter />);

    const input = screen.getByPlaceholderText("Email Address");
    const submitButton = screen.getByText("Join");

    // Type invalid email
    await user.type(input, "invalid-email");
    // Tab away to blur and trigger touched state
    await user.tab();
    // Click submit button
    await user.click(submitButton);

    // Find error by class name since the component renders a plain div
    // Note: The @page-speed/forms Field component also renders an error, so we need to find the one with text-destructive class
    await waitFor(async () => {
      const errors = screen.getAllByText("Please enter a valid email address");
      const errorMessage = errors.find(el => el.classList.contains("text-destructive"));
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveClass("text-destructive");
    }, { timeout: 3000 });
  });

  it("clears error when user types", async () => {
    const user = userEvent.setup();
    render(<OfferModalSheetNewsletter />);

    const input = screen.getByPlaceholderText("Email Address");
    const submitButton = screen.getByText("Join");

    // Click input, tab to blur, then submit to trigger error
    await user.click(input);
    await user.tab();
    await user.click(submitButton);

    // Wait for error to appear
    // Note: The @page-speed/forms Field component also renders an error, so we need to find the one with text-destructive class
    await waitFor(async () => {
      const errors = screen.getAllByText("Please enter an email address");
      const errorMessage = errors.find(el => el.classList.contains("text-destructive"));
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveClass("text-destructive");
    }, { timeout: 3000 });

    // Click input and type to clear the error
    await user.click(input);
    await user.type(input, "t");

    // Wait for error to disappear
    await waitFor(() => {
      const errors = screen.queryAllByText("Please enter an email address");
      const componentError = errors.find(el => el.classList.contains("text-destructive"));
      expect(componentError).toBeUndefined();
    }, { timeout: 3000 });
  });

  it("does not call onSubmit with invalid email", () => {
    const onSubmit = vi.fn();
    render(<OfferModalSheetNewsletter onSubmit={onSubmit} />);

    const input = screen.getByPlaceholderText("Email Address");
    fireEvent.change(input, { target: { value: "invalid" } });

    const form = input.closest("form");
    fireEvent.submit(form!);

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("renders with defaultOpen false", () => {
    render(<OfferModalSheetNewsletter defaultOpen={false} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders consent text", () => {
    render(<OfferModalSheetNewsletter />);
    expect(
      screen.getByText(/By signing up, you consent to our/i)
    ).toBeInTheDocument();
  });

  it("renders Join button", () => {
    render(<OfferModalSheetNewsletter />);
    expect(screen.getByText("Join")).toBeInTheDocument();
  });

  it("combines all custom props correctly", () => {
    const onSubmit = vi.fn();
    render(
      <OfferModalSheetNewsletter
        logo={{ src: "/logo.png", alt: "Logo" }}
        title="Custom Title"
        description="Custom description"
        image={{ src: "/image.jpg", alt: "Image" }}
        emailPlaceholder="Email"
        buttonText="Sign Up"
        termsUrl="/terms"
        privacyUrl="/privacy"
        className="my-class"
        onSubmit={onSubmit}
      />
    );

    expect(screen.getByAltText("Logo")).toBeInTheDocument();
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText("Custom description")).toBeInTheDocument();
    expect(screen.getByAltText("Image")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
    expect(screen.getByText("Terms of Use")).toHaveAttribute("href", "/terms");
    expect(screen.getByText("Privacy Policy")).toHaveAttribute("href", "/privacy");
  });
});
