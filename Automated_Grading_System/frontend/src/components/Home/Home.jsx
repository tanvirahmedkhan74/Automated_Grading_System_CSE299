import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { SERVER_BASE_URL } from "../Uri";

export default function Home() {
  const [user, setUser] = useState(null);
  const naviagte = useNavigate();
  useEffect(()=>{
    const userRetrieved = localStorage.getItem('user');
    if(userRetrieved) setUser(userRetrieved);
    else naviagte("/login"); // Navigate to login if logged out
  }, [])

  const logout = () => {
    localStorage.removeItem('user');
    window.open(`${SERVER_BASE_URL}/auth/logout`, "_self");
  };

  const goToProfile = () => {
    naviagte("/profile");
  }

  return (
    <div className={styles.container}>
      <h1 style={{ textAlign: "center" }}>Welcome</h1>
      <div className={styles.googleAuth}>
        <div>
          <img className={styles.image} src="./images/welcome.jpg" alt="Login" />
        </div>
        <div
          style={{
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "20px",
            borderRadius: "8px",
            marginRight: 50,
          }}
        >
          <button onClick={goToProfile} style={{padding: 20}}>
            <span>Profile</span>
          </button>
          <h2>Log Out</h2>
          <button
            style={{
              padding: 20,
              alignItems: "center",
              backgroundColor: "#007bff",
              color: "#fff",
            }}
            onClick={logout}
          >
            <img
              style={{ height: 20, width: 20, marginRight: 8 }}
              src="./images/google.png"
              alt="Sign In"
            />
            <span>Log Out! Bye Bye</span>
          </button>
        </div>
      </div>
    </div>
  );
}
