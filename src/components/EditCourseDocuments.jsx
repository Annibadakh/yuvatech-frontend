import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Loader from '../loader/Loader';

const EditDocuments = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [msg, setMsg] = useState("");
  const [documentUrl, setDocumentUrl] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [document, setDocument] = useState(null);
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const [loading, setLoading] = useState(true); // Loading state

  const handleDocumentChange = (event) => {
    setDocument(event.target.files[0]);
  };

  const viewDocument = (materialId) => {
    window.open(`${apiUrl}/materials/show/${materialId}`, '_blank');
  };

  useEffect(() => {
    const getMaterialById = async () => {
      try {
        const response = await axios.get(`${apiUrl}/materials/doc/${id}`);
        const { title, description, fileUrl } = response.data; // Assuming the API response contains title, description, and fileUrl fields
        setName(title);
        setDescription(description);
        setDocumentUrl(fileUrl);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        } else {
          console.error("Error fetching material by ID:", error.message);
        }
      }
    };

    if (id) {
      getMaterialById();
    } else {
      navigate("/courses"); // Redirect to courses page if id is not provided
    }
  }, [id, navigate, apiUrl]);
  const titleStyle = {
    fontFamily: 'Times New Roman, Times, serif'
  };

  const updateCourseDocuments = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", name);
      formData.append("description", description);
      if (document) {
        formData.append("file", document);
      }

      const response = await axios.patch(
        `${apiUrl}/materials/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Log the updated response data
      console.log("Updated Course Documents:", response.data);

      Swal.fire({
        icon: "success",
        title: "Update Successful",
        text: "",
      });
      navigate("/courses");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msgFieldsRequired);
      } else {
        console.error("Error updating course documents:", error.message);
      }
    }
    finally {
      setLoading(false); // End loading
    }
  };

  
  if (loading) {
    return <Loader />;
  }

  return (



    <div className="container add-course-container">
    <h2 style={titleStyle}>Edit Course Documents</h2>
    {msg && <p className="error">{msg}</p>}
    <form onSubmit={updateCourseDocuments}>
      <div className="form-grid">
        <div className="form-row">
          <label htmlFor="name">Document Name:</label>
          <input 
            type="text" 
            className="input" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            placeholder="Course Name" 
          />
        </div>
  
        <div className="form-group full-width">
          <label htmlFor="description">Description:</label>
          <textarea 
            id="description" 
            name="description" 
            rows="4" 
            placeholder="Enter Description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
  
        {documentUrl && (
          <>
            <div className="form-row">
              <label className="label">Current Document:</label>
              <button
                type="button"
                className="button is-link is-light"
                onClick={() => viewDocument(id)}
                style={{width:'250px'}}
              >
                <FontAwesomeIcon icon={faEye}  /> View Document
              </button>
            </div>
  
            <div className="form-row">
              <label htmlFor="document">Upload Document: (PDF format):</label>
              <input 
                type="file" 
                id="document" 
                name="document" 
                accept="application/pdf" 
                onChange={handleDocumentChange}
              />
            </div>
  
            <div className="form-group full-width">
              <button type="submit" >Submit</button>
            </div>
          </>
        )}
      </div>
    </form>
  </div>
  


  );
};

export default EditDocuments;
