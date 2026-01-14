import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OfferModalMembershipImage } from "../offer-modal-membership-image";

describe("OfferModalMembershipImage", () => {

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

  it("renders image with custom src and alt", () => {
    render(
      <OfferModalMembershipImage
        image={{ src: "/custom-image.jpg", alt: "Custom promo" }}
      />
    );
    expect(screen.getByAltText("Custom promo")).toBeInTheDocument();
  });
    expect(input.value).toBe("test@example.com");
  });

    const form = input.closest("form");
    fireEvent.submit(form!);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith("test@example.com");
    });
  });
  });
  });

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

    const form = input.closest("form");
    fireEvent.submit(form!);

    expect(onSubmit).not.toHaveBeenCalled();
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
