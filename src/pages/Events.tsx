import { useEffect, useState } from "react";
import { fetchEvents } from "../api/events";
import type { TEvent } from "../types/event";
import { useAuth } from "../auth/AuthContext";
import EventCard from "../components/EventCard";
import { useNavigate } from "react-router-dom";
import "./Events.css";

export default function Events() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const [events, setEvents] = useState<TEvent[]>([]);

  // Definition of Filters
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [durationFilter, setDurationFilter] = useState(0);
  const [startTimeFilter, setStartTimeFilter] = useState(""); 
  const [onlyFuture, setOnlyFuture] = useState(false);

  const NOW = new Date("2021-12-01T00:00:00Z").getTime();

  // Five types of colour used for the project. Since each row has five events, A row will include all five colors and each event box will have 1 color
  const colors = ["#f87171", "#fbbf24", "#34d399", "#60a5fa", "#a78bfa"];

  useEffect(() => {
    fetchEvents().then(data => {
      const sorted = data.sort((a, b) => a.start_time - b.start_time);
      setEvents(sorted);
    });
  }, []);

  const visibleEvents = events.filter(event => { //filter the events based on those differnet types of filters
    if (!isLoggedIn && event.permission === "private") return false;
    if (onlyFuture && event.start_time < NOW) return false;
    if (search && !event.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (typeFilter !== "all" && event.event_type !== typeFilter) return false;

    // Duration filter (used with the slider)
    if (durationFilter > 0) {
      const durationMinutes = (event.end_time - event.start_time) / (1000 * 60);
      if (durationMinutes > durationFilter) return false;
    }

    
    if (startTimeFilter) {
      const chosenTime = new Date(startTimeFilter).getTime();
      if (event.start_time < chosenTime) return false;
    }

    return true;
  });

  return (
    <div className="events-page">

      {/* Make sure the top part does not move as a result */}
      <div className="events-top-fixed">
        <div className="events-header">
          <h1>Events</h1>
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

        <div className="events-filters">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Filter based on event type */}
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="all">All Types</option>
            <option value="workshop">Workshop</option>
            <option value="activity">Activity</option>
            <option value="tech_talk">Tech Talk</option>
          </select>

          {/* SLider is here*/}
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

          {/* Filter events that start after a specific time*/}
          <label>
            Start on/after:
            <input
              type="datetime-local"
              value={startTimeFilter}
              onChange={(e) => setStartTimeFilter(e.target.value)}
            />
          </label>

          {/* Checkbox which only shows events happening now in the future*/}
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

      
      <div className="events-grid-container">
        {visibleEvents.map((event, index) => (
          <EventCard
            key={event.id}
            event={event}
            color={colors[index % colors.length]} 
          />
        ))}
      </div>
    </div>
  );
}
