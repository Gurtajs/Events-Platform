import { useEffect, useState } from "react";
import { getAllEvents } from "../apiRequests";

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getAllEvents().then((events) => {
      setEvents(events);
    });
  }, []);

  let gapi = (window as any).gapi
  let CLIENT_ID = "354123669066-23tenv5a4ecn8d0nl2ia0n5nooh0obvb.apps.googleusercontent.com"
  let API_KEY = "AIzaSyCsDymlgEQYtegh8ahFEHizs0ka6RLA_Rk";

  let DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
  let SCOPES = "https://www.googleapis.com/auth/calendar.events";

  const handleClick = () => {
    gapi.load('client: auth2', () => {
      console.log('loaded client')

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
  }).then(() => {console.log('Google API Initialised')})


  gapi.client.load('calendar', 'v3', () => console.log('bam!'))

  const authInstance = gapi.auth2.getAuthInstance();
      if (authInstance) {
  authInstance.signIn().then(() => {
      let event = {
        'summary': 'Google I/O 2015',
        'location': '800 Howard St., San Francisco, CA 94103',
        'description': 'A chance to hear more about Google\'s developer products.',
        'start': {
          'dateTime': '2015-05-28T09:00:00-07:00',
          'timeZone': 'America/Los_Angeles'
        },
        'end': {
          'dateTime': '2015-05-28T17:00:00-07:00',
          'timeZone': 'America/Los_Angeles'
        },
        'recurrence': [
          'RRULE:FREQ=DAILY;COUNT=2'
        ],
        'attendees': [
          {'email': 'lpage@example.com'},
          {'email': 'sbrin@example.com'}
        ],
        'reminders': {
          'useDefault': false,
          'overrides': [
            {'method': 'email', 'minutes': 24 * 60},
            {'method': 'popup', 'minutes': 10}
          ]
        }
      };
      let request = gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        'resource': event,
      })

      request.execute(event => {
        console.log(event)
        window.open(event.htmlLink)
      })
    })}
  })
  }

  return (
    <div>
      <div className="flex flex-wrap gap-[120px] mt-10 ml-20">
      {events.map((event) => (
        <div key={(event as any).event_id} className="border-2 rounded-md border-black h-[250px] p-3">
          <p className="font-semibold">{(event as any).title}</p>
          <p>{(event as any).description}</p>
          <p>Location: {(event as any).location}</p>
          <p>Capacity: {(event as any).capacity}</p>
          <p>Organiser: {(event as any).organiser}</p>
          <p>Date: 
            {" " + (event as any).date[8] +
              (event as any).date[9] +
              "-" +
              (event as any).date[5] +
              (event as any).date[6] +
              "-" +
              (event as any).date[0] +
              (event as any).date[1] +
              (event as any).date[2] +
              (event as any).date[3]}</p>
          <div className="flex ml-[55px] mt-5"><button className="border border-gray-400 hover:border-blue-500 rounded px-4 py-2" onClick={handleClick}>Sign up for this event</button></div>
        </div>
      ))}
      </div>
    </div>
  );
}
