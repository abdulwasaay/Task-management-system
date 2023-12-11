import { Link, useNavigate } from "react-router-dom"
import Button from "../Button/Button"
import "../Signup/signup.css"
import { useEffect, useState } from "react";

// Login component
export default function Login() {
    const navigate = useNavigate();
    // When this component renders it checks in useEffect function
    // whether user already logged in or not if logged in and if 
    // it's role is user than redirected to "/" page which is a users page 
    // and if admin than redirected to "/admins " page other wise on error page
    useEffect(() => {
        const token = localStorage.getItem("token")
        const datas = JSON.parse(token)
        if (datas) {
            if (datas.userRole === "user") {
                navigate("/")
            }
            else if (datas.userRole === "admin") {
                navigate("/admins")
            } else {
                navigate("/*")
            }
        }
    }, [navigate])
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    //  logged in function
    const loginHandler = async (e) => {
        e.preventDefault();
        // checking length of the password
        if (password.length < 8) {
            alert("Password must contains 8 characters!")
        } else {
            try {
                // Firstly get all the users from db.json and match that wheteher loggin
                // credentials match the credentials in the data base or not 
                const loginResponse = await fetch("http://localhost:3031/users/");
                const data = await loginResponse.json();
                const user = data.find((u) => u.email.toLowerCase() === email.toLowerCase());

                // if not match alert the error messagaes.
                if (!user) {
                    alert("user doesnot found!")
                }
                else if (user.password !== password) {
                    alert("Incorrect Password!")
                } else {
                    // if matched than generate a unique token for each user by user Id
                    const token = `###$&&^?#@^&*&${user.id}`
                    alert("login successfull")
                    // store the token, username and His/her role in local storage 
                    localStorage.setItem("token", JSON.stringify({
                        "JWT token": token,
                        "email": user.email,
                        "userRole": user.Role,
                    }))
                    // get the token here 
                    const tokens = localStorage.getItem("token")
                    const data = JSON.parse(tokens)
                    //  if already loggedin 
                    if (data) {
                        // if he is admin than redirected to admin page
                        if (data.userRole === "admin") {
                            navigate("/admins")
                            
                        }
                        // if he is user than redirected to User page
                        else if (data.userRole === "user") {
                            navigate("/")
                            
                        }else{
                            navigate("/*")
                        }
                    }
                }
            } catch (err) {
                console.log(err)
            }
        }

    }

    //  login page UI;
    return (
        <div className="container">
            <div className="child-container">
                <h1>Login</h1>
                <hr />
                <form onSubmit={loginHandler}>


                    <input type="email" placeholder="Enter your Email" required className="inputsearch" onChange={(e) => setEmail(e.target.value)} /><br />
                    <input type="password" placeholder="Enter your password" required className="inputsearch" onChange={(e) => setPassword(e.target.value)} /><br />

                    <Button type="submit" name="Login" />
                </form>
                <div className="last-container">
                    <p>Don't have an account?</p>
                    <Link to={"/signup"}>&nbsp;Signup</Link>
                </div>
            </div>
        </div>
    )
}