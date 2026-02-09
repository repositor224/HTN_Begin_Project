import { useEffect, useState } from "react";
import { fetchEvents } from "../api/events";
import type { TEvent } from "../types/event";
import { useAuth } from "../auth/AuthContext";
import EventCard from "../components/EventCard";
import { useNavigate } from "react-router-dom";
import "./Events.css";

export default function Events() {
  const { isLoggedIn, isGuest, logout } = useAuth();
  const navigate = useNavigate();

  const [events, setEvents] = useState<TEvent[]>([]);


  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [durationFilter, setDurationFilter] = useState(0); 
  const [startTimeFilter, setStartTimeFilter] = useState(""); 
  const [onlyFuture, setOnlyFuture] = useState(false);

  const NOW = new Date("2021-12-01T00:00:00Z").getTime();

  useEffect(() => {
    fetchEvents().then(data => {
      const sorted = data.sort((a, b) => a.start_time - b.start_time);
      setEvents(sorted);
    });
  }, []);

  const visibleEvents = events.filter(event => {
    
    if (isGuest && event.permission !== "public") return false;

    // Private is hidden when login as a guest
    if (!isLoggedIn && !isGuest && event.permission === "private") return false;

    if (onlyFuture && event.start_time < NOW) return false;
    if (search && !event.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (typeFilter !== "all" && event.event_type !== typeFilter) return false;

    // Duration filter. Only include the events with a duration of maximum X minutes
    if (durationFilter > 0) {
      const durationMinutes = (event.end_time - event.start_time) / (1000 * 60);
      if (durationMinutes > durationFilter) return false;
    }

    // Filter the events based on their start time
    if (startTimeFilter) {
      const chosenTime = new Date(startTimeFilter).getTime();
      if (event.start_time < chosenTime) return false;
    }

    return true;
  });

  return (
    <div className="events-page">
      {}
      <div className="events-top-fixed">
        <div className="events-header">
          <h1>Events</h1>
          <button
            className="logout-btn"
            onClick={() => {
              if (isGuest) navigate("/login");
              else {
                logout();
                navigate("/login");
              }
            }}
          >
            {isGuest ? "Login" : "Logout"}
          </button>
        </div>

        {}
        <div className="events-filters">
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="all">All Types</option>
            <option value="workshop">Workshop</option>
            <option value="activity">Activity</option>
            <option value="tech_talk">Tech Talk</option>
          </select>

          <label>
            Max Duration (minutes):
            <input
              type="range"
              min={0}
              max={300}
              step={5}
              value={durationFilter}
              onChange={(e) => setDurationFilter(Number(e.target.value))}
            />
            {durationFilter} min
          </label>

          <label>
            Start on/after:
            <input
              type="datetime-local"
              value={startTimeFilter}
              onChange={(e) => setStartTimeFilter(e.target.value)}
            />
          </label>

          <label>
            <input
              type="checkbox"
              checked={onlyFuture}
              onChange={(e) => setOnlyFuture(e.target.checked)}
            />
            Only show events happening now or in the future
          </label>
        </div>
      </div>

      {}
      <div className="events-grid-container">
        {visibleEvents.map(event => (
          <EventCard
            key={event.id}
            event={event}
            color={getRandomColor(event.id)}
          />
        ))}
      </div>
    </div>
  );
}

// Helper function to make different colours for the Event Box at Event Page
function getRandomColor(seed: number) {
  const colors = ["#f87171", "#60a5fa", "#34d399", "#fbbf24", "#a78bfa"];
  return colors[seed % colors.length];
}
