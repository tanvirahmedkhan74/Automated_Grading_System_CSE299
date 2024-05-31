import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import axios from "axios";
import { SERVER_BASE_URL } from "../Uri";
import Assessment from "../Assessments/Assessment";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [assessment, setAssessment] = useState([]);

  const getAssessments = async () => {
    const response = await axios.get(
      `${SERVER_BASE_URL}/db/getAssessments/${user.googleId}`
    );
    setAssessment(response.data);
  };

  useEffect(() => {
    const userRetrieved = JSON.parse(localStorage.getItem("user"));

    if (!userRetrieved) {
      navigate("/login");
    } else {
      setUser(userRetrieved.user);
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (user) await getAssessments();
    })();
  }, [user]);

  return (
    <div className={styles.container}>
      <div>
        <h2 style={{ textAlign: "center" }}>Welcome {user?.displayName}</h2>
        <div className={styles.heading}>
          <h2 style={{ marginLeft: 20 }}>Your Asseessments: </h2>
          <button
            style={{ padding: 20, marginRight: 50, backgroundColor: "#CCD3CA" }}
            onClick={() => navigate("/assessment", {state: false})}
          >
            <span style={{ fontSize: 18 }}>New Assessment</span>
          </button>
        </div>
        <div>
          <div className={styles.title}>
            <h3>Title</h3>
            <h3>Description</h3>
            <h3>Deadline</h3>
          </div>
          <div>
            {assessment?.map((item, key) => (
              <div className={styles.items} key={key}>
                <button onClick={() => navigate("/assessment", { state: item })}>
                    <h3>{item.title}</h3>
                </button>
                <h3>{item.description}</h3>
                <h3>{item.endDate?.substring(0, 10)}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
