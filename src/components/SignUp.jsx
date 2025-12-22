import "../style/addtask.css";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function SignUp() {
    const [userData, setUserData] = useState({});
    const navigate=useNavigate();

    //     useEffect(()=>{
    //       if(localStorage.getItem('login')){
    //         navigate('/')
    //     }
    // },[]);

    const handleSignUp=async()=>{
       console.log(userData);
        let result=await fetch(`${import.meta.env.VITE_BACKEND_URL}/signup`,{
            method:"POST",
            body:JSON.stringify(userData),
            credentials: "include",
            headers:{
                'Content-Type':'application/json'
            } 
        })

        result=await result.json();
        if(result.success){
           console.log(result);
           //document.cookie="token="+result.token
            localStorage.setItem('login',userData.email)
            navigate('/')
        }else{
        alert("try after sometime")
        }
  }


  return (
    <div className="container">
      <h1>Sign Up</h1>
      <label htmlFor="">Name:</label>
      <input 
      onChange={(event)=>setUserData({...userData,name:event.target.value})} 
      type="text" name="name" placeholder="Enter User name" />
      <br />
      <label htmlFor="">Email:</label>
      <input
      onChange={(event)=>setUserData({...userData,email:event.target.value})} 
      type="text" name="email" placeholder="Enter your email" />
      <br />
      <label htmlFor="">Password:</label>
      <input 
      onChange={(event)=>setUserData({...userData,password:event.target.value})} 
      type="text" name="password" placeholder="Enter your password" />
      <br />
      <button onClick={handleSignUp} className="submit">Sign Up</button>
       <Link className="link" to="/login">Login</Link>
    </div>
  );
}
