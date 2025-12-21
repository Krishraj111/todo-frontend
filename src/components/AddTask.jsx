import '../style/addtask.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



export default function AddTask(){
    const[taskData,setTaskData]=useState();
    const navigate=useNavigate();



    const handleAddTask=async()=>{
        console.log(taskData);
        let result=await fetch(`${import.meta.env.VITE_BACKEND_URL}/add-task`,{
            method:"POST",
            body:JSON.stringify(taskData),
            credentials:"include",
            headers:{
                'Content-Type':'Application/Json'
            } 
        })

        result=await result.json();
        if(result.success){
            navigate('/'); 
            console.log("new task added");
        }else{
            alert("try after sometime")
        }
    }



    return (
    <div className="container">
        <h1>Add New Task</h1>
            <label htmlFor="">Title:</label>
            <input onChange={(event)=>setTaskData({...taskData,title:event.target.value })} type="text" name="title" placeholder="Enter task title"/>
            <br />
            <label htmlFor="">Description:</label>
            <textarea onChange={(event)=>setTaskData({...taskData,description:event.target.value })} rows={4} name="description" placeholder="Enter task description"></textarea>
            <br />
            <button onClick={handleAddTask} className="submit">Add New Task</button> 
    </div>
    )
}
