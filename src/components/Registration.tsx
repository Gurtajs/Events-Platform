import {useState} from 'react'

export default function Registration() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [age, setAge] = useState("")

  return(
    <>
      <div>Register</div>
      <div className='w-[20%]'>
      <form className='flex flex-col'>
        <label htmlFor='firstName'>First name</label>
        <input className="border-2" type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <label htmlFor='lastName'>Last name</label>
        <input className="border-2" type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <label htmlFor='age'>Age</label>
        <input className="border-2" type="text" id="age" value={age} onChange={(e) => setLastName(e.target.value)} />
        <button>Register</button>
      </form>
      </div>
    </>
  )
}