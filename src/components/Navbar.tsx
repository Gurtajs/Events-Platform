import { Link, useLocation } from "react-router-dom"
import {  useNavigate } from 'react-router-dom'


export default function NavBar() {
  const location = useLocation()
  const showLoginLink = location.pathname == "/"
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/")
  }

  return (
    <div className="flex items-center justify-between pl-10 pr-10 gap-1">
    <h2 className="font-bold text-[30px]"><button onClick={goToHome}>Events Finder</button></h2>
    {showLoginLink && (
      <div className="text-[15px]">Are you a staff member? <Link to='/login' className="font-bold">Login</Link></div>
    )}
    </div>
  )
  
}