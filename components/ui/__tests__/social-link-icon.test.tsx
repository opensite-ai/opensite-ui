import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { SocialLinkIcon } from "../social-link-icon";

vi.mock("@opensite/hooks/usePlatformFromUrl", () => ({
  usePlatformFromUrl: () => undefined,
}));

vi.mock("../dynamic-icon", () => ({
  DynamicIcon: ({ name }: { name?: ReactNode | string }) =>
    typeof name === "string" ? (
      <span data-testid="mock-dynamic-icon" data-name={name} />
    ) : (
      <>{name}</>
    ),
}));

describe("SocialLinkIcon", () => {
  it("returns an override name through DynamicIcon without visible raw text", () => {
    const { container } = render(
      <SocialLinkIcon
        platformName="instagram"
        href="https://instagram.com/opensite"
        label="Instagram"
        iconNameOverride="lucide/camera"
        iconOnly
      />,
    );

    expect(screen.getByTestId("mock-dynamic-icon")).toHaveAttribute(
      "data-name",
      "lucide/camera",
    );
    expect(container).not.toHaveTextContent("lucide/camera");
  });

  it("preserves a custom override element", () => {
    render(
      <SocialLinkIcon
        platformName="instagram"
        href="https://instagram.com/opensite"
        label="Instagram"
        iconNameOverride={<span data-testid="custom-icon" />}
      />,
    );

    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it.each([
    ["empty string", ""],
    ["false", false],
    ["zero", 0],
  ] as const)(
    "preserves the existing fallback for %s overrides",
    (_, override) => {
      render(
        <SocialLinkIcon
          platformName="instagram"
          href="https://instagram.com/opensite"
          label="Instagram"
          iconNameOverride={override}
        />,
      );

      expect(screen.getByTestId("mock-dynamic-icon")).toHaveAttribute(
        "data-name",
        "cib/instagram",
      );
    },
  );
});
