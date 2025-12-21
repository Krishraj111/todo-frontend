import {Link,useNavigate} from 'react-router-dom' 
import '../style/navbar.css'
import { useState } from 'react';
import { useEffect } from 'react';


function NavBar() {
  const [login,setLogin]=useState(localStorage.getItem('login')); 
  const navigate=useNavigate();

  const logout=async()=>{
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/logout`, {
  method: "POST",
  credentials: "include"
});

    localStorage.removeItem('login');
   // return <Navigate to="/login" replace/>;
   setLogin(null);
   navigate('/login');
  //  setTimeout(() => {
  //   navigate('/login');
  //  },0);
  }

  const toggleTheme = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
};


  useEffect(()=>{
    if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
    const handleStorge=()=>{
      setLogin(localStorage.getItem('login'));
    }
    window.addEventListener("localStorage-change",handleStorge); 
    return ()=>{
      window.removeEventListener("localStorage-change",handleStorge);
    }

  },[])

  return (
    <nav className="navbar">
      <div className='logo'>To Do App</div>
      <ul className='nav-links'>
        {login?
          <>
          <li><Link to="/">List</Link></li>
        <li><Link to="/add">Add task</Link></li>
        <li><Link onClick={logout}>Logout</Link></li>
        <li>
  <button onClick={toggleTheme} style={{cursor:"pointer"}}>
    🌙
  </button>
</li>

        
          </>:null
        }
        
      </ul>
    </nav>
  )
}

export default NavBar 