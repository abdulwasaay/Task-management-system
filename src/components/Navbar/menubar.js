import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import "./menubar.css"

// menubar component.
//  openclass found as a prop whose value is true or false
export default function MenuBar({openclass, func}) {
    const navigate = useNavigate();
    const [isclick, setIsclick] = useState(false)
    // get the token
    const token = localStorage.getItem("token");
    const userData = JSON.parse(token);
    // logout function
    const logoutHandler = (e) => {
        e.preventDefault();
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

    // Responsive navbar UI
    return (
        //  conditional styling
        // when openclass value is true openMenubar class works otherwise closemenubar works.
        <div className={`menubar-container ${openclass? "openMenubar":"closemenubar"}`}>
             <div className="close" >
                    <button onClick={()=> func(false)}><CloseIcon /></button>
                </div><hr />
            <nav>
                {/* conditional routing */}
                {/* if user is an User than navigate to "/" otherwise "/admins" */}
                {
                    token && (<div className="connections"><button onClick={() => {
                       
                        userData.userRole === "user" ? navigate("/") : navigate("/admins")
                    }} ><HomeIcon className="icon" />Home</button></div>)
                }
                  {/* if user is an Admin than navigate to "/admin/user" . This page is only for admins to see all users*/}
                {
                    token && (userData.userRole === "admin" && <div className="connections" style={{marginTop : "20px"}}><button onClick={() => {
                       
                        navigate("/admin/users")
                    }}><GroupIcon className="icon"/>Users</button></div>)
                }<br />
                {/* if user is an User than navigate to "/users/tasks" otherwise "/admin/tasks" */}
                {
                    token && (<div className="connections"><button onClick={() => {
                        
                        userData.userRole === "user" ? navigate("/users/tasks") : navigate("/admin/tasks")
                    }}><AssignmentReturnedIcon className="icon"/>Tasks</button></div>)
                }<br />
                <div className="connections">
                    {/* Logout functionality. On a click a class add to the button for clicking effect */}
                    <button className={`as ${isclick ? "logout-clicked" : ""}`} onClick={logoutHandler}> <LogoutIcon className="icon"/>Logout</button>
                </div>
            </nav>
        </div>
    )
}