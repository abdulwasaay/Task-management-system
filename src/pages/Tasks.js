import { useEffect } from "react";
import NavBar from "../components/Navbar/Navbar";
import TaskList from "../components/Tasklists/Tasklist";
import { useNavigate } from "react-router-dom";

export default function AllTasks() {
    const token = localStorage.getItem("token");
    const data = JSON.parse(token);
    const navigate = useNavigate()
    useEffect(() => {
        if (!token) {
            navigate("/login")
        } else if (token) {
            if (data.userRole === "user") {
                navigate("/users/tasks")
            }else{
                navigate("/admin/tasks")
            }
        }
    }, [navigate])

    if (token) {
        return (
            <>
                {
                    data.userRole === "user" ? (
                        <NavBar role="User" />
                    ) : (
                        <NavBar role="Admin" />
                    )
                }
                <TaskList />
            </>
        )
    }
}