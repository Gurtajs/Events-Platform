import { Link, useLocation } from "react-router-dom"


export default function NavBar() {
  const location = useLocation()
  const showLoginLink = location.pathname == "/"
  return (
    <div className="flex items-center justify-between">
    <h2>Logo</h2>
    {showLoginLink && (
      <div>Are you a staff member? <Link to='/login'>Login</Link></div>
    )}
    </div>
  )
  
}