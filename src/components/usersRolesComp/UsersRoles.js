import { useEffect, useState } from "react"
import "./UserRoles.css"

export default function UserandRoles() {
    const [usersfound, setUsersfound] = useState([]);
    useEffect(() => {
        const response = fetch("http://localhost:3031/users")
        response.then((res) => {
            return res.json()
        }).then((users) => {
            setUsersfound(users)
        }).catch((err) => {
            console.log(err)
        })

    }, [])

    const usersData = usersfound.map((u) => {
        return (
            <div className="Allusers-childContainer">
                <p>{u.id}</p>
                <div>
                    <b>Name: </b>
                    <h3>{u.name}</h3>
                </div>
                <div>
                    <b>Role: </b>
                    <h3>{u.Role}</h3>
                </div>
            </div>
        )
    })
        return (
            <>
            <h1 className="heading1">All Users</h1>
            <div className="AllusersContainer">
                {usersData}
            </div>
            </>
        )
}