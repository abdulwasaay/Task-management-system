import { useState } from "react";
import Button from "../Button/Button";
import "./taskform.css"

//  Task form component
// This component is same for both admins and users
// This component is calling in Layout component
export default function TaskForm() {
    // ALl form fields value add in a state.
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [status, setStatus] = useState();
    const [date, setDate] = useState();

    //  task submit form function
    const taskSubmitHandler = async (e) => {
        e.preventDefault();
        // variables for current date and the deadline date selected by the user
        const todayDate = new Date();
        const todayDay = todayDate.getDate()+1;
        const todayMonth= todayDate.getMonth()+1;
        const todayYear = todayDate.getFullYear();
        const selectedDate = new Date(date);
        const day = selectedDate.getDate() + 1;
        const month = selectedDate.getMonth() + 1;
        const year = selectedDate.getFullYear();
        const role = localStorage.getItem("token")
        const user = JSON.parse(role);
        
        // Checking whether the input deadline date is bigger than current date or not
        if (day<todayDay || month<todayMonth || year<todayYear){
            alert("Please enter a strong Deadline")
        }
        // checking title lenth
        else if (title.length > 30) {
            alert("Your title is too much long")
        }
        else if (title.length < 10) {
            alert("Your title is too much short")
        }
        // checking descxription length
        else if (description.length > 100) {
            alert("Your description is too much long")
        }
        else if (description.length < 60) {
            alert("Your description is too much Short")
        }
        else {
            // Since this component is dynamic for both admins and users
            // So checking the condition if the logged in person is a user or admin
            //  If user so endpoint becomes  http://localhost:3031/UserTasks where UserTasks is a colledtion in db.json to store user tasks
            //  If admin so endpoint becomes  http://localhost:3031/adminTasks where adminTasks is a colledtion in db.json to store admin tasks
            if (user.userRole === "user") {
                try {
                    const res = await fetch("  http://localhost:3031/UserTasks", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            user:user.email,title, description, status, deadline: day + ":" + month + ":" + year,
                        })
                    })
                    if (res.ok) {
                        alert("title added!")
                    } else {
                        alert("error adding the title!")
                    }
                } catch (err) {
                    alert("Something went wrong")
                    console.log(err)
                }
            } else {
                try {
                    const res = await fetch("http://localhost:3031/adminTasks", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            user:user.email,title, description, status, deadline: day + ":" + month + ":" + year,
                        })
                    })
                    if (res.ok) {
                        alert("title added!")
                    } else {
                        alert("error adding the title!")
                    }
                } catch (err) {
                    alert("Something went wrong")
                    console.log(err)
                }
            }
        }
    }

//  Title form UI
    return (
        <div className="parentTask-container">
            <div className="childTaskContainer">
                <h1>Task Form</h1>
                <hr />
                <form onSubmit={taskSubmitHandler}>
                    <input type="name" placeholder="Enter the Title" required className="inputsearch" onChange={(e) => setTitle(e.target.value)} /><br />
                    <textarea placeholder="Enter the description" required className="inputsearch" onChange={(e) => setDescription(e.target.value)}></textarea><br />
                    <label htmlFor="status">Status:&nbsp;</label>
                    <select id="status" onChange={(e) => setStatus(e.target.value)} required>
                        <option name="status" value="Pending">Pending</option>
                        <option name="status" value="Completed">Completed</option>
                    </select><br />
                    <label htmlFor="date" >Deadline:&nbsp;</label>
                    <input type="date" id="date" onChange={(e) => setDate(e.target.value)} required />
                    <Button type="submit" name="Submit" />
                </form>
            </div>
        </div>
    )
}