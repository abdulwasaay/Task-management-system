import { Link, useNavigate } from "react-router-dom"
import Button from "../Button/Button"
import "./signup.css"
import { useState } from "react"

//  Signup component
export default function Signup() {
    //  Regular expression
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\d!@#$%^&*()-_+=]{8,}$/;
    
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPass, setConfirmPassword] = useState();
    const [userOrAdmin, setUserorAdmin] = useState();
    const navigate = useNavigate();
    // Signup form submit function
    const submitHandler = async (e) => {
        e.preventDefault();
        // password length checking condition
        if (password.length < 8) {
            alert("Password must contains 8 characters!")
        }
        //  password strength checking using REgular Expressions
        else if (passwordRegex.test(password) === false) {
            alert("password must be strong ( eg: #WtrffU434#)!")
        }
        // password and confirm password must be equal
        else if (password !== confirmPass) {
            alert("Password must be same!")
        } else {
            // sending request to send data to local json (db.json)
            try {
                // get all the users first
                const resp = await fetch("http://localhost:3031/users")
                const data = await resp.json();
                // checking that whether that email already exists or not
                const found = data.find((u) => u.email.toLowerCase() === email.toLowerCase());
                // if not exists than add data to db.json file otherwise alert a message
                if (!found) {
                    const response = await fetch("http://localhost:3031/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            name, email, password, Role: userOrAdmin,
                        })
                    })
                    if (response.ok) {
                        alert("Signup successfull");
                        navigate("/login")
                    } else {
                        alert("User already exists")
                    }
                } else {
                    alert("User already exists!")
                }
            } catch (err) {
                alert("Something went wrong!")
                console.log(err)
            }
        }
    }
//  signup form ui
    return (
        <div className="container">
            <div className="child-container">
                <h1>Signup</h1>
                <hr />
                <form onSubmit={submitHandler}>

                    <input type="text" placeholder="Enter your name" required className="inputsearch" onChange={(e) => setName(e.target.value)} /><br />
                    <input type="email" placeholder="Enter your Email" required className="inputsearch" onChange={(e) => setEmail(e.target.value)} /><br />
                    <input type="password" placeholder="Enter your password" required className="inputsearch" onChange={(e) => setPassword(e.target.value)} /><br />
                    <input type="password" placeholder="Confirm password" required className="inputsearch" onChange={(e) => setConfirmPassword(e.target.value)} /><br />

                    <div className="checkbox-container">
                        <div>
                            <label htmlFor="checkUser">User ? </label>
                            <input type="radio" id="checkUser" name="role" value="user" required onChange={(e) => setUserorAdmin(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="checkAdmin">Admin ? </label>
                            <input type="radio" id="checkAdmin" name="role" value="admin" required onChange={(e) => setUserorAdmin(e.target.value)} /><br />
                        </div>
                    </div>
                    <Button type="submit" name="Signup" />
                </form>
                <div className="last-container">
                    <p>Already have an account?</p>
                    <Link to={"/login"}>&nbsp;Login</Link>
                </div>
            </div>
        </div>
    )
}