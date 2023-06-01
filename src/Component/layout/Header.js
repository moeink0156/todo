import { useContext } from "react"
import TodoContext from "../../Context/ContextTodo"
import { NavLink, useLocation } from "react-router-dom"
export default function Header() {
  let todoContext = useContext(TodoContext)
  let location = useLocation()
  let loginHandler = () => {
    todoContext.dispatch({ type: 'login' })
  }
  let logoutHandler = () => {
    todoContext.dispatch({ type: 'logout' })
  }
  return (
    <header>
      <div className="navbar navbar-dark bg-dark shadow-sm">
        <div className="container d-flex justify-content-between">
          <div className="d-flex">
            <ul className="nav">
              <a href="#" className="navbar-brand d-flex align-items-center">
                <strong>Todo App</strong>
              </a>
              <li className="nav-item">
                <NavLink className="nav-link" style={({ isActive }) => ({ color: isActive ? 'red' : 'white' })} to={"/"}>Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" style={({ isActive }) => ({ color: isActive ? 'red' : 'white' })} to={{
                  pathname: "/about",
                  search: "?name=moein",
                }}>About</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" style={({ isActive }) => ({ color: isActive ? 'red' : 'white' })} to={'/contact' + location.search + location.hash}>Contact</NavLink>
              </li>
            </ul>
          </div>
          {
            !todoContext.login ?
              <button type="button" className="btn btn-success" onClick={loginHandler}>login</button>
              :
              <button type="button" className="btn btn-danger" onClick={logoutHandler}>logout</button>
          }
        </div>

      </div>
    </header>
  )
}