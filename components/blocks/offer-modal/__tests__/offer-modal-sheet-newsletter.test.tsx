import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OfferModalSheetNewsletter } from "../offer-modal-sheet-newsletter";

describe("OfferModalSheetNewsletter", () => {

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
