"use client";

import * as React from "react";
import {
  GetTicketButton as EventsGetTicketButton,
  type GetTicketButtonProps as EventsGetTicketButtonProps,
} from "@opensite/events";

export interface GetTicketButtonProps extends EventsGetTicketButtonProps {}

/**
 * GetTicketButton - Opens the event reservation pane from a standalone button.
 * Load `@opensite/events/style.css` once in the host application for its styles.
 *
 * @example
 * ```tsx
 * <GetTicketButton
 *   apiConfig={{
 *     events_api_url: "https://api.dashtrack.com/ticketing/ORG_KEY/events",
 *     regions_api_url: "https://api.dashtrack.com/locations",
 *     locations_api_url:
 *       "https://api.dashtrack.com/public_services/data_stores/ID/websites?subset=locations",
 *   }}
 *   eventId={6364}
 *   label="Get Tickets"
 * />
 * ```
 */
export function GetTicketButton(
  props: GetTicketButtonProps,
): React.JSX.Element {
  return <EventsGetTicketButton {...props} />;
}