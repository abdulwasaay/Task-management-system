import { useState } from "react";
import "./Navbar.css"
import { NavLink, useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import MenuBar from "./menubar";

//  navbar component
export default function NavBar({ role }) {
    const [menuopenClass, setopenClass] = useState(false)
    const navigate = useNavigate()
    const [isclick, setIsclick] = useState(false)

    //  get the token 
    const token = localStorage.getItem("token");
    const userData = JSON.parse(token);

    //  Logout function
    const logoutHandler = (e) => {
        e.preventDefault();

        //  Log out button animation 
        setTimeout(() => {
            setIsclick(true)
        }, 100)
        setTimeout(() => {
            setIsclick(false)
        }, 200)

        //  when clicking on log out button remove the token and redirect to login page 
        localStorage.removeItem("token");
        navigate("/login")
    }

    //  responsive navbar closing function
    const closeHandler = (f)=>{
        setopenClass(f)
    }

    //  navbar UI
    return (
        <>
        <div className="navbar-container">
            <nav>
                <div>
                    <h1>{role}</h1>
                </div>
                {/* conditional routing */}
                <div>
                    {/* if user is an User than route becomes "/" otherwise "/admins" */}
                    {
                         token && (<NavLink to={`${userData.userRole === "user" ? "/" : "/admins"}`}>Home</NavLink>)
                    }
                    {/* if user is an Admin than route becomes "/admin/user" . This page is only for admins to see all users*/}
                    {
                        token && (userData.userRole === "admin" && <NavLink to={"/admin/users"}>View Users</NavLink>)
                    }
                    {/* if user is an User than route becomes "/users/tasks" otherwise "/admin/tasks" */}
                    {
                        token && (<NavLink to={`${userData.userRole === "user" ? "/users/tasks" : "/admin/tasks"}`}>Tasks</NavLink>)
                    }
                    {/* Logout functionality. On a click a class add to the button for clicking effect */}
                    <button className={`Logout-button ${isclick ? "logout-clicked" : ""}`} onClick={logoutHandler}>Logout</button>
                    {/* responsive navbar Hamburger button . On a click menu bar opens becomes true */}
                    <button onClick={()=> setopenClass(true) } className="menuButton"><MenuIcon /></button>
                </div>
            </nav>
        </div>
        {/* menuopenClass pass an a prop to the responsive navbar component which value is true or whether it is false */}
          <MenuBar openclass = {menuopenClass} func={closeHandler}/>
          </>
    )
}