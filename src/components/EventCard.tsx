import type { TEvent } from "../types/event";
import "./EventCard.css";

type Props = {
  event: TEvent;
  color?: string; 
};

export default function EventCard({ event, color }: Props) {
  return (
    <div className="event-card" style={{ "--card-color": color } as React.CSSProperties}>
      <h2>{event.name}</h2>
      <p>
        {new Date(event.start_time).toLocaleString()} - {new Date(event.end_time).toLocaleString()}
      </p>
      <p className="event-type">{event.event_type}</p>
      <button
        className="view-detail-btn"
        onClick={() => (window.location.href = `/events/${event.id}`)}
      >
        View Detail
      </button>
    </div>
  );
}
