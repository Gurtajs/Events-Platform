import { useEffect, useState } from "react";
import loader from "../assets/loading.gif"

declare const google: any;
import { getAllEvents } from "../apiRequests";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [eventStates, setEventStates] = useState<any>({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginMessage, setShowLoginMessage] = useState(false); 
  const [loading, setLoading] = useState(true)

  const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
  const SCOPES = "https://www.googleapis.com/auth/calendar.events";
  let tokenClient: any;

  useEffect(() => {
    getAllEvents().then((events) => {
      setEvents(events);
      setLoading(false)
      const initialStates = events.reduce((acc: any, event:any) => {
        acc[event.event_id] = {
          showLoginButton: true,
          showSignUpButton: false,
          loginMessage: false,
          signUpMessage: false,
        };
        return acc;
      }, {});
      setEventStates(initialStates);
    });

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      console.log("GIS script loaded successfully.");
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleClick = async (event: any) => {
    if (!accessToken) {
      console.log("Initializing Token Client...");
      tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: async (tokenResponse: any) => {
          console.log("Token Response:", tokenResponse);
          if (tokenResponse.access_token) {
            setAccessToken(tokenResponse.access_token);
            setIsLoggedIn(true);
            setShowLoginMessage(true); 
            setEventStates((prevState: any) => {
              const updatedStates: { [key: string]: any } = {};
              for (const eventId in prevState) {
                updatedStates[eventId] = {
                  ...prevState[eventId],
                  showLoginButton: false,
                  loginMessage: false,
                  showSignUpButton: true,
                };
              }
              return updatedStates;
            });
          } else {
            console.error("No access token received!");
          }
        },
      });
      tokenClient.requestAccessToken();
    } else {
      await addEventToCalendar(event);
    }
  };

  const addEventToCalendar = async (event: any) => {
    const eventId = event.event_id;
    if (!accessToken) {
      console.error("User is not authenticated!");
      return;
    }

    const googleEvent = {
      summary: event.title,
      location: event.location,
      description: event.description,
      start: {
        dateTime: event.date,
      },
      end: {
        dateTime: new Date(
          new Date(event.date).getTime() + 60 * 60 * 1000
        ).toISOString(),
      },
    };

    try {
      const response = await fetch(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(googleEvent),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setEventStates((prevState: any) => ({
          ...prevState,
          [eventId]: {
            ...prevState[eventId],
            showSignUpButton: false,
            signUpMessage: true,
          },
        }));
        setShowLoginMessage(false); 
        console.log("Event created successfully:", result);
      } else {
        console.error("Error creating event:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) {
    return   <div className="flex justify-center mt-20"><img src={loader} alt="loader" width={100} height={100}/></div>
  }

  return (
    <div>
       {showLoginMessage && isLoggedIn && (
        <p className="text-green-500 mt-5 ml-20">
          You have successfully logged in your Google email!
        </p>
      )}
      <div className="flex flex-wrap gap-[100px] mt-10 ml-20 mr-20">
        {events.map((event: any) => (
          <div
            key={event.event_id}
            className="border-2 rounded-md border-black min-h-[300px] w-[350px] p-3"
          >
            <p className="font-semibold">{event.title}</p>
            <p>{event.description}</p>
            <p>Location: {event.location}</p>
            <p>Capacity: {event.capacity}</p>
            <p>Organiser: {event.organiser}</p>
            <p>
              Date:{" "}
              {event.date[8] +
                event.date[9] +
                "-" +
                event.date[5] +
                event.date[6] +
                "-" +
                event.date[0] +
                event.date[1] +
                event.date[2] +
                event.date[3]}
            </p>
            <div className="mt-5 flex flex-col">
              {eventStates[event.event_id]?.showLoginButton && !isLoggedIn && (
                <button
                  className="border border-gray-400 hover:border-blue-500 rounded px-4 py-2 bg-blue-300"
                  onClick={() => handleClick(event)}
                >
                  Login to your Google email to Sign up
                </button>
              )}
              {eventStates[event.event_id]?.showSignUpButton && isLoggedIn && (
                <button
                  className="border border-gray-400 hover:border-blue-500 rounded px-4 py-2 bg-blue-400"
                  onClick={() => addEventToCalendar(event)}
                >
                  Add event to Google Calendar
                </button>
              )}
              {eventStates[event.event_id]?.signUpMessage && (
                <p className="text-green-500 mt-2">
                  You have successfully signed up for this event!
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
