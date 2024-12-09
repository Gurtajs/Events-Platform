import { useEffect, useState } from "react";
import { getAllEvents } from "../apiRequests";

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getAllEvents().then((events) => {
      setEvents(events);
    });
  }, []);

  return (
    <>
      <h2 className="mb-2 mt-2">All events:</h2>
      {events.map((event) => (
        <div className="mb-8" key={(event as any).event_id}>
          <p className="font-semibold">{(event as any).title}</p>
          <p>{(event as any).description}</p>
          <p>Location: {(event as any).location}</p>
          <p>Capacity: {(event as any).capacity}</p>
          <p>Organiser: {(event as any).organiser}</p>
          <p>Date: {(event as any).date}</p>
          <button className="border border-gray-400 hover:border-blue-500 rounded px-4 py-2">Sign up for this event</button>
        </div>
      ))}
    </>
  );
}
