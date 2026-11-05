"use client";

import * as React from "react";
import {
  EventsView as OpensiteEventsView,
  type EventsViewProps as OpensiteEventsViewProps,
} from "@opensite/events";

export interface EventsViewProps extends OpensiteEventsViewProps {}

/**
 * EventsView - Displays events with reservation panes opened when an event is
 * selected. Load `@opensite/events/style.css` once in the host application for
 * its styles.
 *
 * @example
 * ```tsx
 * <EventsView
 *   apiConfig={{
 *     events_api_url: "https://api.dashtrack.com/ticketing/ORG_KEY/events",
 *     regions_api_url: "https://api.dashtrack.com/locations",
 *     locations_api_url:
 *       "https://api.dashtrack.com/public_services/data_stores/ID/websites?subset=locations",
 *   }}
 *   layout="event_grid_layout"
 *   show_search
 * />
 * ```
 */
export function EventsView(props: EventsViewProps): React.JSX.Element {
  return <OpensiteEventsView {...props} />;
}