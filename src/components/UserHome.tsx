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
  }, [(userDetails as any).user_id, eventsByUser]);

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
    <div className="ml-20">
      <h1 className="font-semibold mt-5 mb-5">Welcome back {(userDetails as any).first_name}</h1>
      <h2 className="mb-3">Here are your events:</h2>
      <div className="flex flex-wrap gap-[120px]">
      {eventsByUser.map((event) => (
         <div key={(event as any).event_id}>
        <div className="border-2 rounded-md border-black h-[250px] p-3" key={(event as any).event_id}>
          <p className="font-semibold">{(event as any).title}</p>
          <p>{(event as any).description}</p>
          <p>Location: {(event as any).location}</p>
          <p>Capacity: {(event as any).capacity}</p>
          <p>Organiser: {(event as any).organiser}</p>
          <p>Date: {" " + (event as any).date[8] +
              (event as any).date[9] +
              "-" +
              (event as any).date[5] +
              (event as any).date[6] +
              "-" +
              (event as any).date[0] +
              (event as any).date[1] +
              (event as any).date[2] +
              (event as any).date[3]}</p>
        </div>
        <button onClick={() => deleteEventButton((event as any).event_id)}>Delete event</button>
        </div>
      ))}
      </div>
      <button onClick={showForm} className="mt-20">Add an event</button>
      {show ? <PostEvent userDetails={(userDetails as any).user_id}/> :null}
      <div className="pt-5 font-bold"><button onClick={logout}>Logout</button></div>
      
    </div>
  );
}
