import axios from "axios";

function getAllEvents() {
  return axios.get("http://localhost:9090/api/events").then((response) => {
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
    .post("http://localhost:9090/api/users", {
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
    .get(`http://localhost:9090/api/users/emails/${email}`)
    .then((response) => {
      return response.data.user;
    });
}

function getEventsByUser(user_id: number) {
  return axios
    .get(`http://localhost:9090/api/users/${user_id}/events`)
    .then((response) => {
      return response.data.events;
    });
}

function deleteEvent(user_id: number, event_id: number) {
  return axios.delete(
    `http://localhost:9090/api/users/${user_id}/events/${event_id}`
  );
}

function postEventByUser(user_id: number, title: string, description: string, location: string, date: string, capacity: string, organiser: string) {
  return axios.post(`http://localhost:9090/api/users/${user_id}/events`, {
    user_id,
    title,
    description,
    location,
    date,
    capacity,
    organiser,
  }).then((response) => {
    console.log(response);
    response.data.user;
  });
}

export {
  getAllEvents,
  postUser,
  getUserByEmail,
  getEventsByUser,
  deleteEvent,
  postEventByUser
};
