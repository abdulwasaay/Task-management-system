import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PendingIcon from '@mui/icons-material/Pending';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import "./Task.css"

// Tasks UI component
// this renders on TaskList component

export default function Tasks({ info , editer, remover }) {
    // get the token
    const token = localStorage.getItem("token");
    const data = JSON.parse(token);

    // task edit handler
    const editHandler = (e)=>{
        e.preventDefault()
        const promptChange = prompt("What you want to edit (title, description, status or deadline) ?");
        
        // checking if user input equals to title
        if (promptChange === "title"){
            const newPrompt = prompt("Please enter new  "+promptChange);

            // checking if input is null or not
            if (newPrompt === null || newPrompt=== undefined ){
                alert(newPrompt+" may not be null or undefined!")
            }
            // checking the title's length
            else if (newPrompt.length > 30) {
                alert("Your title is too much long")
            }
            else if (newPrompt.length < 10) {
                alert("Your title is too much short")
            }
            else{
                // other wise pass the data to my editer callback function that I made in Tasklist component
                editer(info.id,promptChange,{title:newPrompt,description:info.description,status:info.status,deadline:info.deadline})
            }
        }
        // checking if user input equals to description
        else if (promptChange === "description"){
            const newPrompt = prompt("Please enter new "+promptChange);

              // checking if input is null or not
            if (newPrompt === null || newPrompt=== undefined){
                alert(newPrompt+" may not be null or undefined!")
            }

            // checking the description's length
            else if (newPrompt.length > 100) {
                alert("Your description is too much long")
            }
            else if (newPrompt.length < 60) {
                alert("Your description is too much Short")
            }
        
            else{
                // other wise pass the data to my editer callback function that I made in Tasklist component
            editer(info.id,promptChange,{title:info.title,description:newPrompt,status:info.status,deadline:info.deadline})
            }   
        }
        // checking if user input equals to deadline
        else if (promptChange === "deadline"){
            const newPrompt = prompt("Please enter new "+promptChange);

              // checking if input is null or not
            if (newPrompt === null || newPrompt=== undefined){
                alert(newPrompt+" may not be null or undefined!")
            }else{
                // other wise pass the data to my editer callback function that I made in Tasklist component
            editer(info.id,promptChange,{title:info.title,description:info.description,status:info.status,deadline:newPrompt})
            }
        }
        // checking if user input equals to status
        else if (promptChange === "status"){
            const newPrompt = prompt("Please enter new "+promptChange);

              // checking if input is null or not
            if (newPrompt === null || newPrompt=== undefined){
                alert(newPrompt+" may not be null or undefined!")
            }
            else if (newPrompt=== "Completed" || newPrompt==="Pending"){
                // other wise pass the data to my editer callback function that I made in Tasklist component
                editer(info.id,promptChange,{title:info.title,description:info.description,status: newPrompt,deadline:info.deadline})
            }else{
                alert("Status must be of two types (Pending or Completed)");
            }
        }else{
            alert("invalid Data!")
        }

    }

    // delete handler function to delte tasks
    const deleteHandler = (e)=>{
        e.preventDefault()
        // pass the data to my  delete handler callback function that I made in Tasklist component
        remover(info.id)
    };

    // All Tasks UI 
    return (
        <div className='Task-container'>
            <div className='task-childContainer'>
                <div>
                    <DateRangeIcon className='icons' style={{fontSize: "medium", color:"gray"}}/>
                    <QueryBuilderIcon className='icons clock' style={{fontSize: "small", color:"gray"}}/>
                    <p>{info.deadline}</p>
                </div>
                <div>
                    {
                        // Dynamic rendering 
                        // if status is pending than returns pending icon otherwise completed icon 
                        info.status === "Pending" ? (
                            <div>
                                <PendingIcon className='icons' style={{fontSize: "medium", marginTop: "1px", marginRight: "2px", color:"gray"}}/>
                                <p>{info.status}</p>
                            </div>
                        ) : (
                            <div>
                                <CheckIcon className='icons' style={{fontSize: "medium", color:"gray", marginTop: "1px", marginRight: "2px"}}/>
                                <p>{info.status}</p>
                            </div>
                        )
                    }
                </div>
                
            </div>
            <hr />
            <div className='content'>
                <h3>{info.title}</h3>
                <p>{info.description}</p>
            </div>
            <div className='edit'>
                <button onClick={editHandler}><EditIcon className='icons'/></button>
                {/* if role is admin than shows the delete button because only admin are allowed to delete the tasks */}
                {data.userRole==="admin" && <button onClick={deleteHandler}><DeleteIcon className='icons'/></button>}
            </div>
        </div>
    )

}