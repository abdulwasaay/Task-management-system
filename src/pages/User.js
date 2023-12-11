import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Layout from "../components/Layout/layout"

export default function Home() {
    const navigate = useNavigate()
    useEffect(()=>{
        const token = localStorage.getItem("token")
        const data = JSON.parse(token)
        if(!token){
            navigate("/login")
        }else if(token){
            if(data.userRole === "admin"){
                navigate("/admins")
            }
        }
    },[navigate])
    return(
        <Layout />
    )
}