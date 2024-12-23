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
    const [firstNameMessage, setFirstNameMessage] = useState("");
    const [lastNameMessage, setLastNameMessage] = useState("");
    const [ageMessage, setAgeMessage] = useState("");
    const [emailMessage, setEmailMessage] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");
    const [emailAlreadyInUse, setEmailAlreadyInUse] = useState(false); 

    const onSubmit = async (e: any) => {

      e.preventDefault()

      let isValid = true;

      // First name validation
      if (!firstName.trim()) {
        setFirstNameMessage("First name is required.");
        isValid = false;
      } else {
        setFirstNameMessage("");
      }
  
      // Last name validation
      if (!lastName.trim()) {
        setLastNameMessage("Last name is required.");
        isValid = false;
      } else {
        setLastNameMessage("");
      }
  
      // Age validation
      if (!age || Number(age) <= 0) {
        setAgeMessage("Please enter a valid age.");
        isValid = false;
      } else {
        setAgeMessage("");
      }
  
      // Email validation
      if (!email) {
        setEmailMessage("Email is required.");
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setEmailMessage("Please enter a valid email address.");
        isValid = false;
      } else {
        setEmailMessage("");
      }
  
      // Password validation
      if (!password) {
        setPasswordMessage("Password is required.");
        isValid = false;
      } else if (password.length < 6) {
        setPasswordMessage("Password must be at least 6 characters long.");
        isValid = false;
      } else {
        setPasswordMessage("");
      }
  
      // Stop if validation fails
      if (!isValid) return;
  
      await createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            // Signed in
            postUser(firstName, lastName, age, email)
            navigate("/login")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            if (errorCode === "auth/email-already-in-use") {
              setEmailAlreadyInUse(true);
        }
        else {
          setEmailAlreadyInUse(false);
        }
        }
      );
    }

    return(
    <div className='ml-20'>
      <div className='font-bold mt-10 mb-2 text-[20px]'>Register</div>
      <div className="w-[20%]">
        <form className="flex flex-col" onSubmit={onSubmit}>
          <label htmlFor="firstName">First name</label>
          <input
            className="border-2"
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {firstNameMessage && <p style={{ color: "red" }}>{firstNameMessage}</p>}

          <label htmlFor="lastName">Last name</label>
          <input
            className="border-2"
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {lastNameMessage && <p style={{ color: "red" }}>{lastNameMessage}</p>}

          <label htmlFor="age">Age</label>
          <input
            className="border-2"
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          {ageMessage && <p style={{ color: "red" }}>{ageMessage}</p>}

          <label htmlFor="email">Email</label>
          <input
            className="border-2"
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
           {emailMessage && <p style={{ color: "red" }}>{emailMessage}</p>}
           {emailAlreadyInUse ? <p style={{ color: "red" }}>Email already in use</p> : ""}
          <label htmlFor="password">Password</label>
          <input
            className="border-2"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordMessage && <p style={{ color: "red" }}>{passwordMessage}</p>}

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
      )
}

export {Signup}