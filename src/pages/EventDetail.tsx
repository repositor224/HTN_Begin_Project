import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchEventById, fetchEvents } from "../api/events";
import type { TEvent } from "../types/event";
import { useAuth } from "../auth/AuthContext";
import "./EventDetail.css";

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [event, setEvent] = useState<TEvent | null>(null);
  const [allEvents, setAllEvents] = useState<TEvent[]>([]);

  
  useEffect(() => {
    fetchEvents().then(setAllEvents);
  }, []);

  useEffect(() => {
    if (id) fetchEventById(Number(id)).then(setEvent);
  }, [id]);

  if (!event) return <p className="loading">Loading event...</p>;

 
  const relatedEvents = event.related_events
    .map(relId => allEvents.find(e => e.id === relId))
    .filter(Boolean) as TEvent[];

  return (
    <div className="event-detail-page">
      <div className="event-detail-header">
        <h1>{event.name}</h1>
        <button
          className="logout-btn"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>

      <div className="event-detail-content">
        <div className="event-info">
          <p><strong>Type:</strong> {event.event_type}</p>
          <p>
            <strong>Time:</strong>{" "}
            {new Date(event.start_time).toLocaleString()} -{" "}
            {new Date(event.end_time).toLocaleString()}
          </p>
          {event.description && (
            <p className="description">{event.description}</p>
          )}
        </div>

        <div className="event-speakers">
          <h3>Speakers</h3>
          {event.speakers.length === 0 ? (
            <p>No speakers listed.</p>
          ) : (
            <ul>
              {event.speakers.map(s => (
                <li key={s.name}>{s.name}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="related-events">
          <h3>Related Events</h3>
          {relatedEvents.length === 0 ? (
            <p>No related events.</p>
          ) : (
            <ul>
              {relatedEvents.map(rel => (
                <li key={rel.id}>
                  <Link to={`/events/${rel.id}`} className="related-link">
                    {rel.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <button className="back-btn" onClick={() => navigate("/events")}>
        ← Back to Events
      </button>
    </div>
  );
}
