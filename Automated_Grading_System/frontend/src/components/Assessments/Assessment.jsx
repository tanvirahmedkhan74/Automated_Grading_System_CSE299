import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { SERVER_BASE_URL } from "../Uri";
import axios from "axios";
import Button from "react-bootstrap/Button";

export default function Assessment() {
  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state || null;

  const [_id, setId] = useState(item?._id || "");
  const [update, setUpdate] = useState(false);

  const [title, setTitle] = useState(item?.title || "");
  const [description, setDescription] = useState(item?.description || "");
  const [rubricLink, setRubricLink] = useState(item?.rubricLink || "");
  const [studentInfoLink, setStudentInfoLink] = useState(
    item?.studentInfoLink || ""
  );
  const [startDate, setStartDate] = useState(
    item?.startDate?.substring(0, 10) || ""
  );
  const [endDate, setEndDate] = useState(item?.endDate?.substring(0, 10) || "");
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if(item){
      setUpdate(true);
    }
    console.log('Item', item);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userRetrieved = JSON.parse(localStorage.getItem("user"));
    console.log(files);

    const formData = new FormData();
    formData.append('_id', _id);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('rubricLink', rubricLink);
    formData.append('studentInfoLink', studentInfoLink);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    formData.append('update', update);
  
    // Add multiple files (if applicable)
    for (let i = 0; i < files.length; i++) {
      formData.append('pdfs', files[i]);
    }

    axios
      .post(
        `${SERVER_BASE_URL}/db/saveAssessment/${userRetrieved.user.googleId}`,
        formData
      )
      .then((response) => {
        console.log("Submission Success");
        navigate("/profile");
      });
  };

  const handleFileUpload = (event) => {
    for(const [key, value] of Object.entries(event.target.files)){
      setFiles([...files, value]);
    }
  };

  const handleFileDelete = (index) => {
    setFiles([...files.slice(0, index), ...files.slice(index + 1)]);
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            required={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Rubric Link:</label>
          <input
            type="text"
            value={rubricLink}
            required={true}
            onChange={(e) => setRubricLink(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Student Info Link:</label>
          <input
            type="text"
            value={studentInfoLink}
            required={true}
            onChange={(e) => setStudentInfoLink(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            defaultValue={Date.now}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            required={true}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <input type="file" name="pdfs" multiple onChange={handleFileUpload} />
        </div>
        <p>Selected File's List: </p>
        {[...files].map((file, key) => (
          <div key={key} style={{ display: "flex", flexDirection: "row" }}>
            <p>{file.name}</p>
            <button
              type="button"
              style={{ color: "red", backgroundColor: "transparent" }}
              onClick={() => handleFileDelete(key)}
            >
              Delete
            </button>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
