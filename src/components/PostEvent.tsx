import { useState } from "react"
import {postEventByUser} from "../apiRequests"

export default function PostEvent({userDetails, setEventsbyUser}: any) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [date, setDate] = useState("")
  const [capacity, setCapacity] = useState("")
  const [organiser, setOrganiser] = useState("")

  const [titleMessage, setTitleMessage] = useState("");
  const [descriptionMessage, setDescriptionMessage] = useState("");
  const [locationMessage, setLocationMessage] = useState("");
  const [dateMessage, setDateMessage] = useState("");
  const [capacityMessage, setCapacityMessage] = useState("");
  const [organiserMessage, setOrganiserMessage] = useState("");

  const onPost = (e: any) => {
    e.preventDefault();

    let isValid = true;

    // Title validation
    if (!title.trim()) {
      setTitleMessage("Title is required.");
      isValid = false;
    } else {
      setTitleMessage("");
    }

    // Description validation
    if (!description.trim()) {
      setDescriptionMessage("Description is required.");
      isValid = false;
    } else {
      setDescriptionMessage("");
    }

    // Location validation
    if (!location.trim()) {
      setLocationMessage("Location is required.");
      isValid = false;
    } else {
      setLocationMessage("");
    }

    // Date validation
    if (!date.trim()) {
      setDateMessage("Date is required.");
      isValid = false;
    } else if (isNaN(Date.parse(date))) {
      setDateMessage("Please enter a valid date (YYYY-MM-DD).");
      isValid = false;
    } else {
      setDateMessage("");
    }

    // Capacity validation
    if (!capacity || isNaN(Number(capacity)) || Number(capacity) <= 0) {
      setCapacityMessage("Capacity must be a positive number.");
      isValid = false;
    } else {
      setCapacityMessage("");
    }

    // Organiser validation
    if (!organiser.trim()) {
      setOrganiserMessage("Organiser name is required.");
      isValid = false;
    } else {
      setOrganiserMessage("");
    }

    // Stop if validation fails
    if (!isValid) return;
      postEventByUser(userDetails,
      title,
      description,
      location,
      date,
      capacity,
      organiser).then((newEvent) => {
        console.log(newEvent)
      setEventsbyUser((prevEvents: any) => [...prevEvents, newEvent]);
      setTitle("");
      setDescription("");
      setLocation("");
      setDate("");
      setCapacity("");
      setOrganiser("");
  })
  }

  return(
    <>
    <div className="w-[20%]">
      <form className="flex flex-col" onSubmit={onPost}>
        <label htmlFor="title">Title</label>
        <input
          className="border-2"
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {titleMessage && <p style={{ color: "red" }}>{titleMessage}</p>}

        <label htmlFor="description">Description</label>
        <input
          className="border-2"
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {descriptionMessage && <p style={{ color: "red" }}>{descriptionMessage}</p>}

        <label htmlFor="location">Location</label>
        <input
          className="border-2"
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        {locationMessage && <p style={{ color: "red" }}>{locationMessage}</p>}

        <label htmlFor="date">Date</label>
        <input
          className="border-2"
          type="text"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        {dateMessage && <p style={{ color: "red" }}>{dateMessage}</p>}

        <label htmlFor="capacity">Capacity</label>
        <input
          className="border-2"
          type="number"
          id="capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />
        {capacityMessage && <p style={{ color: "red" }}>{capacityMessage}</p>}

        <label htmlFor="organiser">Organiser</label>
        <input
          className="border-2"
          type="text"
          id="organiser"
          value={organiser}
          onChange={(e) => setOrganiser(e.target.value)}
        />
        {organiserMessage && <p style={{ color: "red" }}>{organiserMessage}</p>}

        <button type="submit" className='border border-gray-400 hover:border-blue-500 rounded px-4 py-1 bg-sky-300 mt-3'>Add this event</button>
      </form>
    </div>
  </>
  )
}