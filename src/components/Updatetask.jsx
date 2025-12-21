import '../style/addtask.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom';

export default function UpdateTask(){
    const[taskData,setTaskData]=useState();
    const navigate=useNavigate();

    const {id}=useParams();

      useEffect(() => {
        getTask(id);
      }, []);

const getTask = async (id) => {
        let task=await fetch(`${import.meta.env.VITE_BACKEND_URL}/task/${id}`, {
  credentials: "include"
})
        task=await task.json();
        if(task.result){
            setTaskData(task.result);
        }
}

const UpdateTask=async()=>{
    console.log("function called",taskData);
    let task=await fetch(`${import.meta.env.VITE_BACKEND_URL}/update-task`,{
        credentials: "include",
        method:"put",
        body:JSON.stringify(taskData),
        headers:{
            'Content-Type':'Application/Json'
        } 
    });
    task=await task.json();
    if(task.result){
        navigate('/');

    }
}

    return (
    <div className="container">
        <h1>Update Task</h1>
            <label htmlFor="">Title:</label>
            <input value={taskData?.title} onChange={(event)=>setTaskData({...taskData,title:event.target.value })} type="text" name="title" placeholder="Enter task title"/>
            <br />
            <label htmlFor="">Description:</label>
            <textarea value={taskData?.description} onChange={(event)=>setTaskData({...taskData,description:event.target.value })} rows={4} name="description" placeholder="Enter task description"></textarea>
            <br />
            <button onClick={UpdateTask} className="submit">Update Task</button> 
    </div>
    )
}
