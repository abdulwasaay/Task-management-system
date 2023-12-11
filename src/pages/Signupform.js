import { useNavigate } from "react-router-dom";
import Signup from "../components/Signup/Signup";
import { useEffect } from "react";

export default function SignupForm(){
    const token = localStorage.getItem("token");
    const data = JSON.parse(token);
    const navigate = useNavigate();
    useEffect(() => {
       if (token) {
            if (data.userRole === "user") {
                navigate("/")
            }else{
                navigate("/admins")
            }
        }
    }, [navigate])

    return(
        <div>
            <Signup />
        </div>
    )
}