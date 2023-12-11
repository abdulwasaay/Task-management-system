import NavBar from "../Navbar/Navbar";
import TaskForm from "../taskForm/Form";


//  Layout component
// This component is calling in both admin and user page
//  This is a dynamic component for both users and admins
export default function Layout() {
    // get the token
    const token = localStorage.getItem("token")
    const data = JSON.parse(token)
    // conditional rendering
    if(token){
        if(data.userRole === "user"){
            return(
                <div >
                 <NavBar role="User"/>
                 <TaskForm />
                </ div>
            )
        }else{
            return(
                <div >
                 <NavBar role="Admin"/>
                 <TaskForm />
                </ div>
            )
        }
    }
}