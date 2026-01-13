import { useState, useEffect,Fragment } from "react";
import "../style/list.css";
import { Link } from "react-router-dom";
export default function List() {
  const [taskData, setTaskData] = useState();
  const[selectedTask,setSelectedTask]=useState([]);

  useEffect(() => {
    getListData();
  }, []);

  const getListData = async () => {
    let list = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks`,{
      credentials:"include"
    });
    list = await list.json();
    // console.log(list);
    if (list.success) {
      setTaskData(list.result);
    }else{
        alert("try after sometime")
    }
  };

const deleteTask = async (id) => {
      let item = await fetch(`${import.meta.env.VITE_BACKEND_URL}/delete/${id}`,{method:"delete",credentials:"include"});
    item = await item.json();
    if (item.success) {
      getListData();
    }else{
        alert("try after sometime")
    }

}

const selectAll=(event)=>{
   // console.log(event.target.checked);
    if(event.target.checked){
        let items=taskData.map((item)=>item._id);
       // console.log(items);
        setSelectedTask(items);
    }
    else{
        setSelectedTask([]);
    }

}
const selectSingleItem=(id)=>{
    console.log(id);
    if(selectedTask.includes(id)){
        let items=selectedTask.filter((item)=>item!==id);
        setSelectedTask([items]);
    }
    else{
        setSelectedTask([id,...selectedTask]);
    }
}

const deleteMultiple=async()=>{

    console.log(selectedTask);
     let item = await fetch(`${import.meta.env.VITE_BACKEND_URL}/delete-multiple`,
        {credentials:"include",
          method:"delete",
        body:JSON.stringify(selectedTask),
        headers:{
            'Content-Type':'Application/Json'
        }
    } 
    );
    item = await item.json();
    if (item.success) {
      getListData();
    }else{
        alert("try after sometime")
    }


}

  return (
    <div className="list-container">
      <h1>To do List</h1>
      <button onClick={deleteMultiple} className="delete-item delete-selected">Delete Selected</button>
      <ul className="task-list">
         <li className="list-header"><input onChange={selectAll} type="checkbox"/></li>
        <li className="list-header">S.No</li>
        <li className="list-header">Title</li>
        <li className="list-header">Description</li>
        <li className="list-header">Action</li>

        {taskData && taskData.map((item, index) => (
            // <Fragment key={item._id}>
            //     <li className="list-item"><input onChange={()=>selectSingleItem(item._id)} checked={selectedTask.includes(item._id)} type="checkbox"/></li>
            //   <li className="list-item">{index + 1}</li>
            //   <li className="list-item">{item.title}</li>
            //   <li className="list-item">{item.description}</li>
            //   <li className="list-item"><button onClick={() => deleteTask(item._id)} className="delete-item">Delete</button>
            //   <Link to={"update/"+item._id} className="update-item">Update</Link>
            //   </li>
            // </Fragment>

            <Fragment key={item._id}>

  <li className="list-item" data-label="Select">
    <input
      onChange={()=>selectSingleItem(item._id)}
      checked={selectedTask.includes(item._id)}
      type="checkbox"
    />
  </li>

  <li className="list-item" data-label="S.No">
    {index + 1}
  </li>

  <li className="list-item" data-label="Title">
    {item.title}
  </li>

  <li className="list-item" data-label="Description">
    {item.description}
  </li>

  <li className="list-item" data-label="Action">
    <button
      onClick={() => deleteTask(item._id)}
      className="delete-item"
    >
      Delete
    </button>
    <Link
      to={"update/" + item._id}
      className="update-item"
    >
      Update
    </Link>
  </li>

</Fragment>
          ))}
      </ul>
    </div>
  );
}
