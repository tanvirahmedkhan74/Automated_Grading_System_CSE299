import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { SERVER_BASE_URL } from "../../Uri";

export default function Login() {
  const googleAuth = () => {
    window.open(`${SERVER_BASE_URL}/auth/google/callback`, "_self");
  };

  return (
    <div className={styles.container}>
      <h1 style={{ textAlign: "center" }}>
        Welcome, Please Log in to your Account
      </h1>
      <div className={styles.googleAuth}>
        <div>
          <img className={styles.image} src="./images/login.jpg" alt="Login" />
        </div>
        <div
          style={{
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "20px",
            borderRadius: "8px",
            marginRight: 50,
          }}
        >
          <h2>Login Credentials</h2>
          <button
            style={{
              padding: 20,
              alignItems: "center",
              backgroundColor: "#007bff",
              color: "#fff",
            }}
            onClick={googleAuth}
          >
            <img
              style={{ height: 20, width: 20, marginRight: 8 }}
              src="./images/google.png"
              alt="Sign In"
            />
            <span>Sign in With Google</span>
          </button>
          {/* <p>
            New Here ? <Link to={"/signUp"}>Sign Up</Link>
          </p> */}
        </div>
      </div>
    </div>
  );
}
