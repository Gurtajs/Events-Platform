import {useState} from 'react';
import {  signInWithEmailAndPassword} from 'firebase/auth';
import {  useNavigate } from 'react-router-dom'
import {auth} from '../firebase.js'
import { Link } from "react-router-dom"

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = (e:any) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/home")
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
    }
    return (
      <>
        <div>Login</div>
        <div className='w-[20%]'>
        <form className='flex flex-col'>
          <label htmlFor='email'>Email</label>
          <input className="border-2" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor='password'>Password</label>
          <input className="border-2" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={onLogin}>Login</button>
          <div>Not a user? <Link to='/register'>Register</Link></div>
        </form>
        </div>
      </>
    );
  }

  export {Login}