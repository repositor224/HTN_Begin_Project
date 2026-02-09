import type { TEvent } from "../types/event";

const BASE_URL = "https://api.hackthenorth.com/v3";

export async function fetchEvents(): Promise<TEvent[]> {
  const res = await fetch(`${BASE_URL}/events`);
  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }
  return res.json();
}

export async function fetchEventById(id: number): Promise<TEvent> {
  const res = await fetch(`${BASE_URL}/events/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch event");
  }
  return res.json();
}
