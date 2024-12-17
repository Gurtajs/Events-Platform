import { deleteEvent, getEventsByUser, getUserByEmail } from "../apiRequests";
import { AuthContext } from "../AuthContext";
import { useContext, useState, useEffect } from "react";
import {useNavigate } from 'react-router-dom';
import PostEvent from "./PostEvent";

export default function UserHome() {
  const { email, setEmail } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState([]);
  const [eventsByUser, setEventsbyUser] = useState([]);
  const [show, setShow] = useState(false)
  const navigate = useNavigate();
  useEffect(() => {
    if (email) {
      getUserByEmail(email).then((user) => {
        setUserDetails(user);
      });
    }
  }, [email]);

  useEffect(() => {
    if ((userDetails as any).user_id) {
      getEventsByUser((userDetails as any).user_id).then((events) => {
        setEventsbyUser(events);
      });
    }
  }, [(userDetails as any).user_id]);

  const deleteEventButton = (eventId: number) => {
    deleteEvent((userDetails as any).user_id, eventId)
      .then(() => {
        setEventsbyUser((prevEvents) =>
          prevEvents.filter((event) => (event as any).event_id !== eventId)
        );
      })}

  const showForm = () => {
    setShow((prevShow) => !prevShow)
  }

  const logout = () => {
    navigate("/")
  }

  return (
    <>
      <h1>Welcome back {(userDetails as any).first_name}</h1>
      <h2>Here are your events:</h2>
      {eventsByUser.map((event) => (
        <div className="mb-8" key={(event as any).event_id}>
          <p className="font-semibold">{(event as any).title}</p>
          <p>{(event as any).description}</p>
          <p>Location: {(event as any).location}</p>
          <p>Capacity: {(event as any).capacity}</p>
          <p>Organiser: {(event as any).organiser}</p>
          <p>Date: {(event as any).date}</p>
          <button onClick={() => deleteEventButton((event as any).event_id)}>Delete event</button>
        </div>
      ))}
      <button onClick={showForm}>Add an event</button>
      {show ? <PostEvent userDetails={(userDetails as any).user_id}/> :null}
      <div className="pt-5"><button onClick={logout}>Logout</button></div>
      
    </>
  );
}
