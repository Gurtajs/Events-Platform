import {useState, useContext} from 'react';
import {useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { postUser } from '../apiRequests.js';
import { AuthContext } from "../AuthContext";

const Signup = () => {
    const navigate = useNavigate();

    const { email, setEmail, password, setPassword, auth } =
    useContext(AuthContext);

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [age, setAge] = useState("")

    const onSubmit = async (e: any) => {
      e.preventDefault()
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            postUser(firstName, lastName, age, email)
            navigate("/login")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ..
        });
    }

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
            <input className="border-2" type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} />
             <label htmlFor='firstName'>Email</label>
             <input className="border-2" type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
             <label htmlFor='firstName'>Password</label>
             <input className="border-2" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" onClick={onSubmit}>Register</button>
          </form>
          </div>
        </>
      )
}

export {Signup}