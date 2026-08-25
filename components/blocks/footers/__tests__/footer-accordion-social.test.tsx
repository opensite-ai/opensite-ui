import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FooterAccordionSocial } from "../footer-accordion-social";

// Runs the REAL Pressable on purpose: the defect under test is Pressable's
// span fallback when a link item reaches it without a usable href.

const sections = (key: "href" | "link") => [
  {
    title: "Areas",
    id: "areas",
    items: [
      { text: "Paradise Valley", [key]: "/areas/paradise-valley" },
      { text: "Scottsdale", [key]: "/areas/scottsdale" },
    ],
  },
];

describe("FooterAccordionSocial", () => {
  it("renders schema-keyed ({text, href}) section items as anchors", () => {
    render(<FooterAccordionSocial footerLinks={sections("href")} />);

    const link = screen
      .getAllByText("Paradise Valley")
      .map((el) => el.closest("a"))
      .find(Boolean);
    expect(link).toBeTruthy();
    expect(link!).toHaveAttribute("href", "/areas/paradise-valley");
  });

  // Generated shared-layout payloads (octane `footer_section_items`) shipped
  // items keyed {text, link}; without the alias every generated footer
  // rendered dead <span>s (davidkoonrealestate.com, 2026-08-24 — 12 live
  // sites affected).
  it("renders generated-payload ({text, link}) section items as anchors", () => {
    render(<FooterAccordionSocial footerLinks={sections("link")} />);

    const link = screen
      .getAllByText("Scottsdale")
      .map((el) => el.closest("a"))
      .find(Boolean);
    expect(link).toBeTruthy();
    expect(link!).toHaveAttribute("href", "/areas/scottsdale");
  });
});
