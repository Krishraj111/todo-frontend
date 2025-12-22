
import './style/App.css'
import NavBar from './components/NavBar'
import { Routes,Route } from 'react-router-dom'
import AddTask from './components/AddTask'
import List from './components/List'
import UpdateTask from './components/Updatetask'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Protected from './components/Protected'
import { useLocation,useNavigate } from "react-router-dom";
import { useEffect } from 'react'


function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const hideNavbar =
  location.pathname === "/login" ||
  location.pathname === "/signup";


//  useEffect(() => {
//   const checkAuth = async () => {
//     try {
//       const res = await fetch("http://localhost:3200/check-auth", {
//         method: "GET",
//         credentials: "include"
//       });

//       const data = await res.json();

//       if (data.success) {
//         localStorage.setItem("login", data.user.email);
//       } else {
//         localStorage.removeItem("login");
//         if (
//           location.pathname !== "/login" &&
//           location.pathname !== "/signup"
//         ) {
//           navigate("/login");
//         }
//       }
//     } catch (error) {
//       localStorage.removeItem("login");
//       if (
//         location.pathname !== "/login" &&
//         location.pathname !== "/signup"
//       ) {
//         navigate("/login");
//       }
//     }
//   };

//   checkAuth();
// }, []);

  return (
    <>
    {!hideNavbar && <NavBar />}
    
      <Routes>
        <Route path='/' element={<Protected><List/></Protected>}/>
          <Route path='/signup' element={<SignUp/>}/>
            <Route path='/login' element={<Login/>}/>
              <Route path='/add' element={<Protected><AddTask/></Protected>}/>
          <Route path='/update/:id' element={<Protected><UpdateTask/></Protected>}/>
      </Routes>
    </>
  )
}

export default App
