import {useState, useContext} from 'react';
import { AuthContext } from "../AuthContext";
import {  signInWithEmailAndPassword} from 'firebase/auth';
import {  useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom"

const Login = () => {
    const navigate = useNavigate();
    const [emailMessage, setEmailMessage] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");
    const { email, setEmail, password, setPassword, auth } =
    useContext(AuthContext);

    const onLogin = (e:any) => {
      e.preventDefault(); 
      let isValid = true; 
  
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
      } else {
        setPasswordMessage(""); // Clear password error
      }
  
      // If validation fails, return early
      if (!isValid) return;
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/home")
            console.log(user);
        })
        .catch((error) => {
          if (error.code === "auth/invalid-credential") {
            setEmailMessage("Invalid credentials. Please try again.");
          } else if (error.code === "auth/wrong-password") {
            setPasswordMessage("Incorrect password. Please try again.");
          } else if (error.code === "auth/too-many-requests") {
            setEmailMessage("Too many login attempts. Please try again later.");
          } else {
            console.log("Error logging in:", error.message);
          }})
      }
  
        
    
    return (
      <div className='ml-20'>
        <div className='font-bold mt-10 mb-2 text-[20px]'>Login</div>
        <div className='w-[20%]'>
        <form className='flex flex-col'>
          <label htmlFor='email'>Email</label>
          <input className="border-2" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <div className='text-red-500'>{emailMessage}</div>
          <label htmlFor='password'>Password</label>
          <input className="border-2" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <div className='text-red-500'>{passwordMessage}</div>
          <button onClick={onLogin}>Login</button>
          <div className='mt-2'>Not a user? <Link to='/register' className='font-bold'>Register</Link></div>
        </form>
        </div>
      </div>
    );
  }

  export {Login}