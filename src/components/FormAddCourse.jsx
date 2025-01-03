
// <---------Final code----------->---------------------------------------------------------------------


import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './AddNewCourse.css';
import Swal from 'sweetalert2';
const FormAddCourse = () => {
  const [courseData, setCourseData] = useState({
    name: "",
    price: "",
    description: "",
    examFees: "",
    courseFees: "",
    duration: "",
    status: "active" // Default status set to active
  });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_BASE_URL

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCourseData(prev => ({ ...prev, [name]: value }));
  };

  const saveCourse = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/courses`, courseData);
      Swal.fire({
        icon: 'success',
        title: 'Course Added Successfully',
        text: '',
      });
      navigate("/courses");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  const titleStyle = {
    fontFamily: 'Times New Roman, Times, serif'
  };
  return (
    <div className="container add-course-container">
      <h2 style={titleStyle} >Add New Course</h2>
      {msg && <p className="error">{msg}</p>}
      <form onSubmit={saveCourse}>
        <div className="form-grid">
          <div className="form-row">
            <label htmlFor="name">Course Name:</label>
            <input type="text" id="name" name="name" required value={courseData.name} onChange={handleChange} />
          </div>
          {/* <div className="form-row">
            <label htmlFor="price">Price:</label>
            <input type="number" id="price" name="price" required value={courseData.price} onChange={handleChange} />
          </div> */}
          <div className="form-row">
            <label htmlFor="examFees">Exam Fees:</label>
            <input type="number" id="examFees" name="examFees" value={courseData.examFees} onChange={handleChange} />
          </div>
          <div className="form-row">
            <label htmlFor="courseFees">Course Fees:</label>
            <input type="number" id="courseFees" name="courseFees" value={courseData.courseFees} onChange={handleChange} />
          </div>
          <div className="form-row">
            <label htmlFor="duration">Duration (in Month):</label>
            <input type="number" id="duration" name="duration" value={courseData.duration} onChange={handleChange} />
          </div>
          <div className="form-row">
            <label htmlFor="status">Status:</label>
            <select id="status" name="status" required value={courseData.status} onChange={handleChange}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="form-group full-width">
            <label htmlFor="description">Description:</label>
            <textarea id="description" name="description" rows="4" placeholder="Enter Description" value={courseData.description} onChange={handleChange}></textarea>
          </div>
          <div className="form-group full-width">
          <button type="submit" style={{color: "white"}}>Submit</button>

          </div>
        </div>
      </form>
    </div>
  );
};

export default FormAddCourse;
