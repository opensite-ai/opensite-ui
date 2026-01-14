import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ComparisonAiModels } from "../comparison-ai-models";

vi.mock("@page-speed/img", () => ({
  Img: ({
    src,
    alt,
    className,
  }: {
    src: string;
    alt: string;
    className?: string;
  }) => <img src={src} alt={alt} className={className} data-testid="mock-img" />,
}));

describe("ComparisonAiModels", () => {
});

