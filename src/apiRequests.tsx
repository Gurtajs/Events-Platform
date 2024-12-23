import axios from "axios";

function getAllEvents() {
  return axios.get("https://events-platform-be-4f92.onrender.com/api/events").then((response) => {
    return response.data.events;
  });
}

function postUser(
  first_name: string,
  last_name: string,
  age: string,
  email: string
) {
  return axios
    .post("https://events-platform-be-4f92.onrender.com/api/users", {
      first_name,
      last_name,
      age,
      email,
    })
    .then((response) => {
      console.log(response);
      response.data.user;
    });
}

function getUserByEmail(email: string) {
  return axios
    .get(`https://events-platform-be-4f92.onrender.com/api/users/emails/${email}`)
    .then((response) => {
      return response.data.user;
    });
}

function getEventsByUser(user_id: number) {
  return axios
    .get(`https://events-platform-be-4f92.onrender.com/api/users/${user_id}/events`)
    .then((response) => {
      return response.data.events;
    });
}

function deleteEvent(user_id: number, event_id: number) {
  return axios.delete(
    `https://events-platform-be-4f92.onrender.com/api/users/${user_id}/events/${event_id}`
  );
}

function postEventByUser(user_id: number, title: string, description: string, location: string, date: string, capacity: string, organiser: string) {
  return axios.post(`https://events-platform-be-4f92.onrender.com/api/users/${user_id}/events`, {
    user_id,
    title,
    description,
    location,
    date,
    capacity,
    organiser,
  }).then((response) => {
    console.log(response);
    return response.data.user;
  });
}

function postToGoogleCalendar(title: string, location: string, date: string, organiser: string) {
  return axios.post("https://events-platform-be-4f92.onrender.com/api/add-event", {
    title,
    location,
    date,
    organiser,
  }).then((response) => {
    return response.data
  })
}

export {
  getAllEvents,
  postUser,
  getUserByEmail,
  getEventsByUser,
  deleteEvent,
  postEventByUser,
  postToGoogleCalendar
};
