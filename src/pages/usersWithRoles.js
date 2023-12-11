import { useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar/Navbar";
import UserandRoles from "../components/usersRolesComp/UsersRoles";
import { useEffect } from "react";

export default function AllUsers() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const data = JSON.parse(token);
    useEffect(() => {
        if (!token) {
            navigate("/login")
        } else if (token) {
            if (data.userRole === "user") {
                navigate("/")
            }
        }
    }, [navigate]);

    if (token) {
        return (
            <>
                <NavBar role="Admin" />
                <UserandRoles />
            </>
        )
    }
}