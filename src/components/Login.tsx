import {useState} from 'react'
import { Link } from "react-router-dom"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <>
      <div>Login</div>
      <div className='w-[20%]'>
      <form className='flex flex-col'>
        <label htmlFor='email'>Email</label>
        <input className="border-2" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor='password'>Password</label>
        <input className="border-2" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button>Login</button>
        <div>Not a user? <Link to='/register'>Register</Link></div>
      </form>
      </div>
    </>
  );
}
