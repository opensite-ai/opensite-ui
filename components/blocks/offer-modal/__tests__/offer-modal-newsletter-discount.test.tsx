import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { OfferModalNewsletterDiscount } from "../offer-modal-newsletter-discount";

describe("OfferModalNewsletterDiscount", () => {

  it("renders with custom title", () => {
    render(<OfferModalNewsletterDiscount title="Get 50% off today!" />);
    expect(screen.getByText("Get 50% off today!")).toBeInTheDocument();
  });

  it("renders with custom button text", () => {
    render(<OfferModalNewsletterDiscount buttonText="Sign Up Now" />);
    expect(screen.getByText("Sign Up Now")).toBeInTheDocument();
  });
    expect(input.value).toBe("test@example.com");
  });

    const form = input.closest("form");
    fireEvent.submit(form!);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith("test@example.com");
    });
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
