import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { GeoMap } from "../geo-map";

vi.mock("@page-speed/maps", () => ({
  MapLibre: ({ markers = [] }: { markers?: Array<{ id: string; element?: () => React.ReactNode }> }) => (
    <div data-testid="mock-map">
      {markers.map((marker) => (
        <div key={marker.id}>{marker.element ? marker.element() : null}</div>
      ))}
    </div>
  ),
}));

describe("GeoMap", () => {
  it("renders marker panel content when a marker is clicked", () => {
    render(
      <GeoMap
        markers={[
          {
            id: "phoenix",
            latitude: 33.4484,
            longitude: -112.074,
            title: "Phoenix Flagship",
            summary: "Downtown location",
            actions: [{ label: "Directions", href: "/directions" }],
          },
        ]}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "View Phoenix Flagship" }));

    expect(screen.getByText("Phoenix Flagship")).toBeInTheDocument();
    expect(screen.getByText("Downtown location")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Directions" })).toBeInTheDocument();
  });

  it("supports nested clusters and selecting a location from cluster details", () => {
    render(
      <GeoMap
        clusters={[
          {
            id: "southwest",
            title: "Southwest Region",
            markers: [
              {
                id: "phoenix",
                latitude: 33.4484,
                longitude: -112.074,
                title: "Phoenix",
                summary: "Arizona",
              },
              {
                id: "las-vegas",
                latitude: 36.1699,
                longitude: -115.1398,
                title: "Las Vegas",
                summary: "Nevada",
              },
            ],
          },
        ]}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "View 2 clustered locations" }));
    expect(screen.getByText("Southwest Region")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Phoenix/i }));
    expect(screen.getByText("Phoenix")).toBeInTheDocument();
    expect(screen.getByText("Arizona")).toBeInTheDocument();
  });
});
