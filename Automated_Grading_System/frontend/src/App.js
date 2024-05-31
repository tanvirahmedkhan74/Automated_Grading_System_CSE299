import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Login from "./components/Auth/Login";
import Home from "./components/Home/Home";
import "./App.css";
import Redirect from "./components/Auth/LoginRedirect/Redirect";
import Profile from "./components/User/Profile";
import Assessment from "./components/Assessments/Assessment";

function App() {
  const [user, setUser] = useState(null);

  useEffect(()=>{
    const userRetrieved = localStorage.getItem('user');
    if(user) setUser(userRetrieved);
  }, [])

  return (
    <>
      <div
        className="App"
        style={{ backgroundColor: "#503C3C", padding: "20px" }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#FFFFFF",
            fontSize: "32px",
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "1px",
            lineHeight: "1.5",
          }}
        >
          Automated Assessment of Student Answers using LLMs and Prompt
          Engineering
        </h1>
      </div>

      <div>
        <Routes>
          {/* Auth Routes */}
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route path='/redirect' element={<Redirect/>}/>

          {/* Profile Routes */}
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/assessment" element={<Assessment/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
