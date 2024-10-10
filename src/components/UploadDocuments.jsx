
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UploadDocuments = () => {
  const { studentId } = useParams(); // Dynamically extract studentId from URL
  const [photo, setPhoto] = useState(null);
  const [identityImage, setIdentityImage] = useState(null);
  const [identityType, setIdentityType] = useState('');
  const [identityNo, setIdentityNo] = useState('');
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_API_BASE_URL

  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  const handleIdentityImageChange = (event) => {
    setIdentityImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', photo);
    formData.append('identityImage', identityImage);
    formData.append('identityType', identityType);
    formData.append('identityNo', identityNo);

    try {
      await axios.post(`${apiUrl}/student/image/${studentId}`, formData);
      // console.log('Submitted');
      // Handle success
    } catch (error) {
      setError(error.message);
    }
  };
  const titleStyle = {
    fontFamily: 'Times New Roman, Times, serif'
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="photo">Photo:</label>
        <input type="file" id="photo" accept="image/*" onChange={handlePhotoChange} />
      </div>
      <div>
        <label htmlFor="identityImage">Identity Image:</label>
        <input type="file" id="identityImage" accept="image/*" onChange={handleIdentityImageChange} />
      </div>
      <div>
        <label htmlFor="identityType">Identity Type:</label>
        <input type="text" id="identityType" value={identityType} onChange={(e) => setIdentityType(e.target.value)} />
      </div>
      <div>
        <label htmlFor="identityNo">Identity Number:</label>
        <input type="text" id="identityNo" value={identityNo} onChange={(e) => setIdentityNo(e.target.value)} />
      </div>
      <button type="submit">Submit</button>
      {error && <p>Error uploading documents: {error}</p>}
    </form>
  );
};

export default UploadDocuments;
