import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'reactstrap';
import { FaEye } from 'react-icons/fa';
import Loader from '../loader/Loader';

function AddDocuments({ onDocumentsSubmit, studentId }) {
  const location = useLocation();
  const { studentId: pathStudentId } = useParams(); // For path parameter (/students/:studentId)
  const queryParams = new URLSearchParams(location.search);
  const queryStudentId = queryParams.get('studentId'); // For query parameter (?studentId=g3u299w)
  const resolvedStudentId = pathStudentId || queryStudentId || studentId; // Use path or query parameter, or prop value

  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  const [formData, setFormData] = useState({
    identityType: '',
    identityNo: '',
    photo: null,
    identityImage: null,
  });

  const [error, setError] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [identityImagePreview, setIdentityImagePreview] = useState(null);

  useEffect(() => {
    if (resolvedStudentId) {
      axios
        .get(`${apiUrl}/students/${resolvedStudentId}`)
        .then((response) => {
          const { identityType, identityNo, photo, identityImage } = response.data;
          setFormData({ identityType, identityNo, photo: null, identityImage: null });
          if (photo) {
            setPhotoPreview(`${apiUrl}/student/image/${resolvedStudentId}`);
          }
          if (identityImage) {
            setIdentityImagePreview(`${apiUrl}/student/imageidentity/${resolvedStudentId}`);
          }
        })
        .catch(() => setError('Failed to fetch student details'));
    }
  }, [resolvedStudentId, apiUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setFormData((prevFormData) => ({ ...prevFormData, photo: file }));
    const reader = new FileReader();
    reader.onload = () => {
      setPhotoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleIdentityImageChange = (event) => {
    const file = event.target.files[0];
    setFormData((prevFormData) => ({ ...prevFormData, identityImage: file }));
    const reader = new FileReader();
    reader.onload = () => {
      setIdentityImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { photo, identityImage, identityType, identityNo } = formData;
    // Ensure resolvedStudentId is valid
    if (!resolvedStudentId) {
      setError('Student ID is not valid');
      return;
    }
    try {
      // Update student identity data
      await axios.patch(`${apiUrl}/students/${resolvedStudentId}`, {
        identityType,
        identityNo,
      });

      // Upload documents only if there is a change in the image
      if (photo || identityImage) {
        const studentFormData = new FormData();
        if (photo) {
          studentFormData.append('image', photo);
        }
        if (identityImage) {
          studentFormData.append('identityImage', identityImage);
        }

        try {
          await axios.patch(`${apiUrl}/student/image/${resolvedStudentId}`, studentFormData);
        } catch (error) {
          setError('Failed to patch images');
          return;
        }
      }

      // Notify parent component about the documents submission
      if (onDocumentsSubmit) {
        onDocumentsSubmit();
      }
    } catch (error) {
      setError('Failed to update identity details');
    }
  };

  const handleReset = () => {
    setFormData({
      identityType: '',
      identityNo: '',
      photo: null,
      identityImage: null,
    });
    setPhotoPreview(null);
    setIdentityImagePreview(null);
  };

  const downloadImage = async (url, filename) => {
    try {
      const response = await fetch(url, {
        credentials: 'include' // Include cookies in the request
        // You may also need to include additional headers like Authorization if using JWT tokens
      });
      if (!response.ok) {
        throw new Error(`Failed to download image: ${response.status} ${response.statusText}`);
      }
      const blob = await response.blob();
      const objectURL = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = objectURL;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      // Handle the error gracefully, e.g., display an error message to the user
    }
  };

   return (
    <>
    <div className="container">
      <h2>IDENTITY FORM</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group-row">
          <div className="form-column">
            <label htmlFor="identityType">Identity Type:</label>
            <select id="identityType" name="identityType" value={formData.identityType} onChange={handleChange}>
              <option value="Driving License">Driving License</option>
              <option value="Aadhaar Card">Aadhaar Card</option>
              <option value="Pan Card">Pan Card</option>
              <option value="Voter ID">Voter ID</option>
              <option value="College ID">College ID</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-column">
            <label htmlFor="identityNo">Identity Number:</label>
            <input type="text" id="identityNo" name="identityNo" placeholder="Enter Identity Number" required value={formData.identityNo} onChange={handleChange} />
          </div>
        </div>
        <div className="form-group-row">
          <div className="form-column">
            <label htmlFor="photo">Student Photo:</label>
            <input type="file" id="photo" name="photo" accept="image/*" onChange={handlePhotoChange} />
            {photoPreview && (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' }}>
    <img
      src={photoPreview}
      alt="Student"
      style={{
        width: '200px',     // Adjust the width as needed
        height: '200px',    // Adjust the height as needed
        objectFit: 'cover', // Ensures the image covers the area without distortion
        borderRadius: '8px', // Optional: Rounds the corners of the image
        marginBottom: '10px',
        border: '1px solid #ddd' // Optional: Adds a border for better visibility
      }}
    />
    <Button color="danger" onClick={() => downloadImage(photoPreview, 'photo.png')}>
      Download
    </Button>
  </div>
)}

          </div>
          <div className="form-column">
            <label htmlFor="identityImage">Identity Image:</label>
            <input type="file" id="identityImage" name="identityImage" accept="image/*" onChange={handleIdentityImageChange} />
            {identityImagePreview && (
              <div className="image-preview">
                <img src={identityImagePreview} style={{
        width: '350px',     // Adjust the width as needed
        height: '200px',    // Adjust the height as needed
        objectFit: 'cover', // Ensures the image covers the area without distortion
        borderRadius: '8px', // Optional: Rounds the corners of the image
        marginBottom: '10px',
        border: '1px solid #ddd' // Optional: Adds a border for better visibility
      }}alt="Identity" />
                <Button color="danger" onClick={() => downloadImage(identityImagePreview, 'identity.png')}>
                  Download
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="form-actions">
          {/* <Button type="submit" color="primary">Submit</Button> */}
          <button type="button" style={{marginTop:"10px"}} onClick={handleReset}>Reset</button>
        </div>
      </form>
    </div>

    </>
  );
}

export default AddDocuments;
