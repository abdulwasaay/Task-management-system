import { useEffect, useState } from "react"
import Tasks from "./Tasks/Tasks";

// TaskList component
// All tasks Get here
// calling in Tasks page.
export default function TaskList() {
    const [taskhtml, setTask] = useState();
    const [responseEdit, setResponseEdit] = useState();
    const [responseDelete, setResponseDelete] = useState();
    const token = localStorage.getItem("token");
    const taskData = JSON.parse(token);

    //  A function for edit the tasks and store them in the db.json
    const edithandler = async (id, editprompt, editeditem,) => {
        // If user exists and his role is user than endpoint becomes " http://localhost:3031/UserTasks/" + id. This is dynamic
        if (token) {
            if (taskData.userRole === "user") {
                try {
                    const res = await fetch(" http://localhost:3031/UserTasks/" + id, {
                        method: "PUT",
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(editeditem)
                    })
                    if (res.ok) {
                        // add response in a usestate
                        setResponseEdit(res)
                        alert(editprompt + " added successfully!")
                    }
                    else {
                        alert("error! adding  " + editprompt + "Please try again later!")
                    }
                } catch (err) {
                    alert("Some Thing went wrong!")
                    console.log(err)
                }
            } else {
                     // If user exists and his role is admin than endpoint becomes " http://localhost:3031/adminTasks/" + id. This is dynamic
                try {
                    const resp = await fetch("http://localhost:3031/adminTasks/" + id, {
                        method: "PUT",
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(editeditem)
                    })
                    if (resp.ok) {
                        // add response in a usestate
                        setResponseEdit(resp)
                        alert(editprompt + " added successfully!")
                    }
                    else {
                        alert("error! adding  " + editprompt + "Please try again later!")
                    }
                } catch (err) {
                    alert("Some Thing went wrong!")
                    console.log(err)
                }
            }
        }
    }

    // Remove the tasks function
    const removehandler = async (id) => {
        try {
            const respo = await fetch("http://localhost:3031/adminTasks/" + id, {
                method: "DELETE"
            })
            if (respo.ok) {
                // add response in a usestate
                setResponseDelete(respo)
                alert("Item deleted successfully!")
            } else {
                alert("Error deleting the Item!")
            }
        } catch (err) {
            alert("Some Thing went wrong!")
            console.log(err)
        }
    };

    // This useeffect works when there is an update in edit and delete responses
    useEffect(() => {
        // If loggin person is a user than get data from http://localhost:3031/UserTasks
        if (token) {
            if (taskData.userRole === "user") {
                const resUser = fetch(" http://localhost:3031/UserTasks" )
                resUser.then((response) => {
                    return response.json()
                }).then((mydata) => {
                    // map the founded data and pass to a component that returns a complete ui of task
                    const myData = mydata.map((task) => {
                        // edit handler function and delete handler passing as a props as a callback function
                        return <Tasks key={task.id} info={task} editer={edithandler} />
                    })
                    // add the ui to a usestate
                    setTask(myData)
                }).catch((err) => {
                    alert("Some Thing went wrong!")
                    console.log(err)
                })
            } else {
                // If loggin person is a admin than get data from http://localhost:3031/adminTasks
                const resAdmin = fetch(" http://localhost:3031/adminTasks")
                resAdmin.then((response) => {
                    return response.json()
                }).then((mydata) => {
                    // map the founded data and pass to a component that returns a complete ui of task
                    const myData = mydata.map((task) => {
                        // edit handler function and delete handler passing as a props as a callback function
                        return <Tasks key={task.id} info={task} editer={edithandler} remover={removehandler}/>
                    })
                    // add the ui to a usestate
                    setTask(myData)
                }).catch((err) => {
                    alert("Some Thing went wrong!")
                    console.log(err)
                })
            }
        }
    }, [responseEdit,responseDelete])
    return (
        <div>
            <h1 className="heading2">My Tasks</h1>
            <div className="main-Container">
                {taskhtml}
            </div>
        </div>
    )
}