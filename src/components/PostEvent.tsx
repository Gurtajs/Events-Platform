import { useState } from "react"
import {postEventByUser} from "../apiRequests"

export default function PostEvent({userDetails}) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [date, setDate] = useState("")
  const [capacity, setCapacity] = useState("")
  const [organiser, setOrganiser] = useState("")

  const onPost = (e: any) => {
    e.preventDefault()
      postEventByUser(userDetails,
      title,
      description,
      location,
      date,
      capacity,
      organiser)
  }

  return(
    <>
       <div>Add event</div>
          <div className='w-[20%]'>
          <form className='flex flex-col'>
            <label htmlFor='title'>Title</label>
            <input className="border-2" type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <label htmlFor='description'>Description</label>
            <input className="border-2" type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <label htmlFor='location'>location</label>
            <input className="border-2" type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
            <label htmlFor='date'>date</label>
            <input className="border-2" type="text" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
             <label htmlFor='date'>Capacity</label>
             <input className="border-2" type="number" id="capacity" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
             <label htmlFor='capacity'>Organiser</label>
             <input className="border-2" type="taxt" id="organiser" value={organiser} onChange={(e) => setOrganiser(e.target.value)} />
            <button type="submit" onClick={onPost}>Add this event</button>
          </form>
          </div>
      <button>Add Event</button>
    
    
    </>
  )
}