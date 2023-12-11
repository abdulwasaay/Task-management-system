import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Layout from "../components/Layout/layout"

export default function Admin() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token")
    const data = JSON.parse(token)
    useEffect(() => {
        if (!token) {
            navigate("/login")
        } else if (token) {
            if (data.userRole === "user") {
                navigate("/")
            }
        }
    }, [navigate])
    if (token) {
        return (
            <Layout />
        )
    }
}