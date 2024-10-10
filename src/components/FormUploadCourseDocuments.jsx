import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
const FormUploadCourseDocuments = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const [document, setDocument] = useState(null); // Changed from empty string to null
  const apiUrl = process.env.REACT_APP_API_BASE_URL

  const handleDocumentChange = (event) => {
    setDocument(event.target.files[0]);
  };

  useEffect(() => {
    const getCourseById = async () => {
      try {
        if (!id) {
          // console.log("Id not found");
          navigate("/courses");
          return;
        }
        const response = await axios.get(`${apiUrl}/courses/${id}`);
        // setName(response.data.name);
        // setDescription(response.data.description);
        // setPrice(response.data.price);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getCourseById();
  }, [id, navigate]);

  const updateCourseDocuments = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('courseId', id);
      formData.append('title', name);
      formData.append('description', description);
      formData.append('file', document); // Append the file to FormData

      await axios.post(`${apiUrl}/materials`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
        },
      });
      Swal.fire({
        icon: 'success',
        title: 'Upload Successfully',
        text: '',
      });
      navigate("/courses");
    } catch (error) {
      if (error.response) {
        // console.log(error.response);
        // console.log(id);
        setMsg("error.response.data.msgFields Required");
      }
    }
  };
  const titleStyle = {
    fontFamily: 'Times New Roman, Times, serif'
  };

  return (
    <div  className="container add-course-container">
      <h2 style={titleStyle} className="subtitle">Add Course Documents</h2>
      {/* <div className="card is-shadowless">
        <div className="card-content">
          <div className="content"> */}
            <form onSubmit={updateCourseDocuments}>
              {/* <p className="has-text-centered">{msg}</p> */}
              <div className="form-grid">
                <div className="form-row">

                <label className="label">Name</label>
                  <input
                    type="text"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Course Name"
                  />
                </div>
                <div className="form-group full-width">

              <label className="label">Description</label>
                  <textarea
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Course Description"
                  />

                </div>
                <div className="form-row">

                <label htmlFor="document">Upload Document (PDF format):</label>
                <input type="file" id="document" name="document" accept="application/pdf" required onChange={handleDocumentChange} />
                </div>
             </div>
             <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    ADD
                  </button>
                </div>
              </div>

              

            </form>
        </div>
    //   </div>
    // </div>
  );
};

export default FormUploadCourseDocuments;
