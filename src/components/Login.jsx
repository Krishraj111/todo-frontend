import "../style/addtask.css";
import { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";

export default function Login() {
    const [userData, setUserData] = useState({});
    const navigate=useNavigate();
    useEffect(()=>{
      if(localStorage.getItem('login')){
        navigate('/')
    }
},[]);

        const handleLogin=async()=>{
       console.log(userData);
        let result=await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`,{
            method:"POST",
            body:JSON.stringify(userData),
            credentials: "include",
            headers:{
                'Content-Type':'Application/Json'
            } 
        })

        result=await result.json();
        if(result.success){ 
          // console.log(result);
           document.cookie="token="+result.token
           localStorage.setItem('login',userData.email)
           window.dispatchEvent(new Event("localStorage-change"));
            navigate('/')
        }else{
          alert("login failed")
        }
  }





  return (
    <div className="container">
      <h1>Login</h1>
      <label htmlFor="">Email:</label>
      <input
      onChange={(event)=>setUserData({...userData,email:event.target.value})} 
      type="text" name="email" placeholder="Enter your email" />
      <br />
      <label htmlFor="">Password:</label>
      <input 
      onChange={(event)=>setUserData({...userData,password:event.target.value})} 
      type="password" name="password" placeholder="Enter your password" />
      <br />
      <button onClick={handleLogin} className="submit">Login</button>
      <Link className="link" to="/signup">Sign Up</Link>
    </div>
  );
}
 