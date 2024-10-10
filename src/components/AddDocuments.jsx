// // // // // // // AddDocuments.js
// // // // // // import React from 'react';
// // // // // // import { useFormContext } from './MultiStepFormContext';

// // // // // // const AddDocuments = () => {
// // // // // //   const { addDocumentsData, setAddDocumentsData } = useFormContext();

// // // // // //   const handleChange = (e) => {
// // // // // //     const { name, value } = e.target;
// // // // // //     setAddDocumentsData((prevData) => ({
// // // // // //       ...prevData,
// // // // // //       [name]: value,
// // // // // //     }));
// // // // // //   };

// // // // // //   return (
// // // // // //     <div>
// // // // // //       <h2>Add Documents</h2>
// // // // // //       <form>
// // // // // //         <textarea
// // // // // //           name="address"
// // // // // //           rows="4"
// // // // // //           placeholder="Enter Address"
// // // // // //           value={addDocumentsData.address}
// // // // // //           onChange={handleChange}
// // // // // //           required
// // // // // //         />
// // // // // //         <input
// // // // // //           type="text"
// // // // // //           name="city"
// // // // // //           placeholder="Enter City"
// // // // // //           value={addDocumentsData.city}
// // // // // //           onChange={handleChange}
// // // // // //           required
// // // // // //         />
// // // // // //         <input
// // // // // //           type="text"
// // // // // //           name="state"
// // // // // //           placeholder="Enter State"
// // // // // //           value={addDocumentsData.state}
// // // // // //           onChange={handleChange}
// // // // // //           required
// // // // // //         />
// // // // // //         <input
// // // // // //           type="text"
// // // // // //           name="pincode"
// // // // // //           placeholder="Enter Pincode"
// // // // // //           value={addDocumentsData.pincode}
// // // // // //           onChange={handleChange}
// // // // // //           required
// // // // // //         />
// // // // // //         <input
// // // // // //           type="text"
// // // // // //           name="occupation"
// // // // // //           placeholder="Enter Occupation"
// // // // // //           value={addDocumentsData.occupation}
// // // // // //           onChange={handleChange}
// // // // // //           required
// // // // // //         />
// // // // // //       </form>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default AddDocuments;
// // // // // import React, { useState, useEffect } from 'react';
// // // // // import { Button } from 'antd';
// // // // // import { useLocation, useParams } from 'react-router-dom';
// // // // // import axios from 'axios'; // Import axios

// // // // // const AddDocuments = ({ setFormData }) => {
// // // // //   const location = useLocation();
// // // // //   const { studentId: pathStudentId } = useParams(); // For path parameter (/students/:studentId)
// // // // //   const queryParams = new URLSearchParams(location.search);
// // // // //   const queryStudentId = queryParams.get('studentId'); // For query parameter (?studentId=g3u299w)
// // // // //   const studentId = pathStudentId || queryStudentId; // Use path parameter if available, otherwise use query parameter

// // // // //   const apiUrl = process.env.REACT_APP_API_BASE_URL;

// // // // //   const [formData, updateFormData] = useState({
// // // // //     studentId,
// // // // //     identityType: '',
// // // // //     identityNo: '',
// // // // //     photo: null,
// // // // //     identityImage: null,
// // // // //   });

// // // // //   const [photoPreview, setPhotoPreview] = useState(null);
// // // // //   const [identityImagePreview, setIdentityImagePreview] = useState(null);

// // // // //   useEffect(() => {
// // // // //     // Fetch initial data based on studentId
// // // // //     if (studentId) {
// // // // //       axios
// // // // //         .get(`${apiUrl}/students/${studentId}`)
// // // // //         .then((response) => {
// // // // //           const { firstName, middleName, lastName, mobile, email, dob, city, state, pincode, occupation, courseId, address, gender, photo, identityImage } = response.data;
// // // // //           updateFormData((prevData) => ({
// // // // //             ...prevData,
// // // // //             firstName,
// // // // //             middleName,
// // // // //             lastName,
// // // // //             mobile,
// // // // //             email,
// // // // //             dob,
// // // // //             city,
// // // // //             state,
// // // // //             pincode,
// // // // //             occupation,
// // // // //             courseId,
// // // // //             address,
// // // // //             gender,
// // // // //             photo,
// // // // //             identityImage,
// // // // //           }));
// // // // //           if (photo) {
// // // // //             setPhotoPreview(`${apiUrl}/student/image/${studentId}`);
// // // // //           }
// // // // //           if (identityImage) {
// // // // //             setIdentityImagePreview(`${apiUrl}/student/imageidentity/${studentId}`);
// // // // //           }
// // // // //         })
// // // // //         .catch(() => console.error('Failed to fetch student details'));
// // // // //     }
// // // // //   }, [studentId, apiUrl]);

// // // // //   const handleChange = (e) => {
// // // // //     const { name, value } = e.target;
// // // // //     updateFormData((prevData) => ({
// // // // //       ...prevData,
// // // // //       [name]: value,
// // // // //     }));
// // // // //   };

// // // // //   const handleFileChange = (e) => {
// // // // //     const { name, files } = e.target;
// // // // //     updateFormData((prevData) => ({
// // // // //       ...prevData,
// // // // //       [name]: files[0], // Assuming single file selection
// // // // //     }));
// // // // //   };

// // // // //   const downloadImage = async (url, filename) => {
// // // // //     try {
// // // // //       const response = await fetch(url, {
// // // // //         credentials: 'include', // Include cookies in the request
// // // // //         // You may also need to include additional headers like Authorization if using JWT tokens
// // // // //       });
// // // // //       if (!response.ok) {
// // // // //         throw new Error(`Failed to download image: ${response.status} ${response.statusText}`);
// // // // //       }
// // // // //       const blob = await response.blob();
// // // // //       const objectURL = URL.createObjectURL(blob);
// // // // //       const link = document.createElement('a');
// // // // //       link.href = objectURL;
// // // // //       link.setAttribute('download', filename);
// // // // //       document.body.appendChild(link);
// // // // //       link.click();
// // // // //       document.body.removeChild(link);
// // // // //     } catch (error) {
// // // // //       console.error('Error downloading image:', error);
// // // // //       // Handle the error gracefully, e.g., display an error message to the user
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="identity-form-container">
// // // // //       <div className="form-group-row">
// // // // //         <div className="form-column">
// // // // //           <label htmlFor="identityType">Identity Type:</label>
// // // // //  <label htmlFor="identityType">Identity Type:</label>
// // // // //   <select id="identityType" name="identityType" value={formData.identityType} onChange={handleChange}>
// // // // //   <option value="Driving License">Driving License</option>
// // // // //                     <option value="Aadhaar Card">Aadhaar Card</option>
// // // // //                     <option value="Pan Card">Pan Card</option>
// // // // //                     <option value="Voter ID">Voter ID</option>
// // // // //                     <option value="College ID">College ID</option>
// // // // //                     <option value="Other">Other</option>
// // // // //   </select>
// // // // //         </div>
// // // // //         <div className="form-column">
// // // // //           <label htmlFor="identityNo">Identity Number:</label>
// // // // //           <input
// // // // //             type="text"
// // // // //             id="identityNo"
// // // // //             name="identityNo"
// // // // //             placeholder="Enter Identity Number"
// // // // //             value={formData.identityNo}
// // // // //             onChange={handleChange}
// // // // //           />
// // // // //         </div>
// // // // //       </div>
// // // // //       <div className="form-group-row">
// // // // //         <div className="form-column">
// // // // //           <label htmlFor="photo">Student Photo:</label>
// // // // //           <input type="file" id="photo" name="photo" accept="image/*" onChange={handleFileChange} />
// // // // //           {formData.photo && (
// // // // //             <div className="image-preview">
// // // // //               <img src={URL.createObjectURL(formData.photo)} alt="Student Photo Preview" />
// // // // //               <Button onClick={() => downloadImage(URL.createObjectURL(formData.photo), 'student-photo.jpg')} type="primary">
// // // // //                 Download Photo
// // // // //               </Button>
// // // // //             </div>
// // // // //           )}
// // // // //         </div>
// // // // //         <div className="form-column">
// // // // //           <label htmlFor="identityImage">Identity Image:</label>
// // // // //           <input type="file" id="identityImage" name="identityImage" accept="image/*" onChange={handleFileChange} />
// // // // //           {formData.identityImage && (
// // // // //             <div className="image-preview">
// // // // //               <img src={URL.createObjectURL(formData.identityImage)} alt="Identity Image Preview" />
// // // // //               <Button
// // // // //                 onClick={() => downloadImage(URL.createObjectURL(formData.identityImage), 'identity-image.jpg')}
// // // // //                 type="primary"
// // // // //               >
// // // // //                 Download Identity Image
// // // // //               </Button>
// // // // //             </div>
// // // // //           )}
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default AddDocuments;
// // // // import React, { useState, useEffect } from 'react';
// // // // import axios from 'axios';
// // // // import { Button } from 'reactstrap';

// // // // function AddDocuments({ studentId, apiUrl }) {
// // // //   const [formData, setFormData] = useState({
// // // //     identityType: '',
// // // //     identityNo: '',
// // // //     photo: null,
// // // //     identityImage: null,
// // // //   });

// // // //   const [error, setError] = useState(null);
// // // //   const [photoPreview, setPhotoPreview] = useState(null);
// // // //   const [identityImagePreview, setIdentityImagePreview] = useState(null);

// // // //   useEffect(() => {
// // // //     if (studentId) {
// // // //       axios
// // // //         .get(`${apiUrl}/students/${studentId}`)
// // // //         .then((response) => {
// // // //           const { identityType, identityNo, photo, identityImage } = response.data;
// // // //           setFormData({ identityType, identityNo, photo: null, identityImage: null });
// // // //           if (photo) {
// // // //             setPhotoPreview(`${apiUrl}/student/image/${studentId}`);
// // // //           }
// // // //           if (identityImage) {
// // // //             setIdentityImagePreview(`${apiUrl}/student/imageidentity/${studentId}`);
// // // //           }
// // // //         })
// // // //         .catch(() => setError('Failed to fetch student details'));
// // // //     }
// // // //   }, [studentId, apiUrl]);

// // // //   const handleChange = (e) => {
// // // //     const { name, value } = e.target;
// // // //     setFormData((prevState) => ({
// // // //       ...prevState,
// // // //       [name]: value,
// // // //     }));
// // // //   };

// // // //   const handlePhotoChange = (event) => {
// // // //     const file = event.target.files[0];
// // // //     setFormData((prevFormData) => ({ ...prevFormData, photo: file }));
// // // //     const reader = new FileReader();
// // // //     reader.onload = () => {
// // // //       setPhotoPreview(reader.result);
// // // //     };
// // // //     reader.readAsDataURL(file);
// // // //   };

// // // //   const handleIdentityImageChange = (event) => {
// // // //     const file = event.target.files[0];
// // // //     setFormData((prevFormData) => ({ ...prevFormData, identityImage: file }));
// // // //     const reader = new FileReader();
// // // //     reader.onload = () => {
// // // //       setIdentityImagePreview(reader.result);
// // // //     };
// // // //     reader.readAsDataURL(file);
// // // //   };

// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();
// // // //     const { photo, identityImage, identityType, identityNo } = formData;

// // // //     try {
// // // //       // Update student identity data
// // // //       await axios.patch(`${apiUrl}/students/${studentId}`, {
// // // //         identityType,
// // // //         identityNo,
// // // //       });

// // // //       // Upload documents only if there is a change in the image
// // // //       if (photo || identityImage) {
// // // //         const studentFormData = new FormData();
// // // //         if (photo) {
// // // //           studentFormData.append('image', photo);
// // // //         }
// // // //         if (identityImage) {
// // // //           studentFormData.append('identityImage', identityImage);
// // // //         }

// // // //         try {
// // // //           await axios.patch(`${apiUrl}/student/image/${studentId}`, studentFormData);
// // // //         } catch (error) {
// // // //           setError('Failed to patch images');
// // // //         }
// // // //       }
// // // //     } catch (error) {
// // // //       setError('Failed to update identity details');
// // // //     }
// // // //   };

// // // //   const handleReset = () => {
// // // //     setFormData({
// // // //       identityType: '',
// // // //       identityNo: '',
// // // //       photo: null,
// // // //       identityImage: null,
// // // //     });
// // // //     setPhotoPreview(null);
// // // //     setIdentityImagePreview(null);
// // // //   };

// // // //   const downloadImage = async (url, filename) => {
// // // //     try {
// // // //       const response = await fetch(url, {
// // // //         credentials: 'include' // Include cookies in the request
// // // //         // You may also need to include additional headers like Authorization if using JWT tokens
// // // //       });
// // // //       if (!response.ok) {
// // // //         throw new Error(`Failed to download image: ${response.status} ${response.statusText}`);
// // // //       }
// // // //       const blob = await response.blob();
// // // //       const objectURL = URL.createObjectURL(blob);
// // // //       const link = document.createElement('a');
// // // //       link.href = objectURL;
// // // //       link.setAttribute('download', filename);
// // // //       document.body.appendChild(link);
// // // //       link.click();
// // // //       document.body.removeChild(link);
// // // //     } catch (error) {
// // // //       // Handle the error gracefully, e.g., display an error message to the user
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="container">
// // // //       <h2>IDENTITY FORM</h2>
// // // //       {error && <p className="error-message">{error}</p>}
// // // //       <form onSubmit={handleSubmit}>
// // // //         <div className="form-group-row">
// // // //           <div className="form-column">
// // // //             <label htmlFor="identityType">Identity Type:</label>
// // // //             <select id="identityType" name="identityType" value={formData.identityType} onChange={handleChange}>
// // // //               <option value="Driving License">Driving License</option>
// // // //               <option value="Aadhaar Card">Aadhaar Card</option>
// // // //               <option value="Pan Card">Pan Card</option>
// // // //               <option value="Voter ID">Voter ID</option>
// // // //               <option value="College ID">College ID</option>
// // // //               <option value="Other">Other</option>
// // // //             </select>
// // // //           </div>
// // // //           <div className="form-column">
// // // //             <label htmlFor="identityNo">Identity Number:</label>
// // // //             <input type="text" id="identityNo" name="identityNo" placeholder="Enter Identity Number" required value={formData.identityNo} onChange={handleChange} />
// // // //           </div>
// // // //         </div>
// // // //         <div className="form-group-row">
// // // //           <div className="form-column">
// // // //             <label htmlFor="photo">Student Photo:</label>
// // // //             <input type="file" id="photo" name="photo" accept="image/*" onChange={handlePhotoChange} />
// // // //             {photoPreview && (
// // // //               <div className="image-preview">
// // // //                 <img src={photoPreview} alt="Student" />
// // // //                 <Button color="danger" onClick={() => downloadImage(photoPreview, 'photo.png')}>
// // // //                   Download
// // // //                 </Button>
// // // //               </div>
// // // //             )}
// // // //           </div>
// // // //           <div className="form-column">
// // // //             <label htmlFor="identityImage">Identity Image:</label>
// // // //             <input type="file" id="identityImage" name="identityImage" accept="image/*" onChange={handleIdentityImageChange} />
// // // //             {identityImagePreview && (
// // // //               <div className="image-preview">
// // // //                 <img src={identityImagePreview} alt="Identity" />
// // // //                 <Button color="danger" onClick={() => downloadImage(identityImagePreview, 'identity.png')}>
// // // //                   Download
// // // //                 </Button>
// // // //               </div>
// // // //             )}
// // // //           </div>
// // // //         </div>
// // // //         <div className="form-actions">
// // // //           <Button type="submit" color="primary">Submit</Button>
// // // //           <Button type="button" color="secondary" onClick={handleReset}>Reset</Button>
// // // //         </div>
// // // //       </form>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default AddDocuments ;
// // // import React, { useState, useEffect } from 'react';
// // // import { useLocation, useNavigate, useParams } from 'react-router-dom';
// // // import axios from 'axios';
// // // import { Button } from 'reactstrap';

// // // function AddDocuments() {
// // //   const location = useLocation();
// // //   const navigate = useNavigate();
// // //   const apiUrl = process.env.REACT_APP_API_BASE_URL;
// // //   const { studentId: pathStudentId } = useParams(); // For path parameter (/students/:studentId)
// // //   const queryParams = new URLSearchParams(location.search);
// // //   const queryStudentId = queryParams.get('studentId'); // For query parameter (?studentId=g3u299w)
// // //   const studentId = pathStudentId || queryStudentId; // Use path parameter if available, otherwise use query parameter

// // //   const [formData, setFormData] = useState({
// // //     identityType: '',
// // //     identityNo: '',
// // //     photo: null,
// // //     identityImage: null,
// // //   });

// // //   const [error, setError] = useState(null);
// // //   const [photoPreview, setPhotoPreview] = useState(null);
// // //   const [identityImagePreview, setIdentityImagePreview] = useState(null);

// // //   useEffect(() => {
// // //     if (studentId) {
// // //       axios
// // //         .get(`${apiUrl}/students/${studentId}`)
// // //         .then((response) => {
// // //           const { identityType, identityNo, photo, identityImage } = response.data;
// // //           setFormData({ identityType, identityNo, photo: null, identityImage: null });
// // //           if (photo) {
// // //             setPhotoPreview(`${apiUrl}/student/image/${studentId}`);
// // //           }
// // //           if (identityImage) {
// // //             setIdentityImagePreview(`${apiUrl}/student/imageidentity/${studentId}`);
// // //           }
// // //         })
// // //         .catch(() => setError('Failed to fetch student details'));
// // //     }
// // //   }, [studentId, apiUrl]);

// // //   const handleChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setFormData((prevState) => ({
// // //       ...prevState,
// // //       [name]: value,
// // //     }));
// // //   };

// // //   const handlePhotoChange = (event) => {
// // //     const file = event.target.files[0];
// // //     setFormData((prevFormData) => ({ ...prevFormData, photo: file }));
// // //     const reader = new FileReader();
// // //     reader.onload = () => {
// // //       setPhotoPreview(reader.result);
// // //     };
// // //     reader.readAsDataURL(file);
// // //   };

// // //   const handleIdentityImageChange = (event) => {
// // //     const file = event.target.files[0];
// // //     setFormData((prevFormData) => ({ ...prevFormData, identityImage: file }));
// // //     const reader = new FileReader();
// // //     reader.onload = () => {
// // //       setIdentityImagePreview(reader.result);
// // //     };
// // //     reader.readAsDataURL(file);
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     const { photo, identityImage, identityType, identityNo } = formData;

// // //     try {
// // //       // Update student identity data
// // //       await axios.patch(`${apiUrl}/students/${studentId}`, {
// // //         identityType,
// // //         identityNo,
// // //       });

// // //       // Upload documents only if there is a change in the image
// // //       if (photo || identityImage) {
// // //         const studentFormData = new FormData();
// // //         if (photo) {
// // //           studentFormData.append('image', photo);
// // //         }
// // //         if (identityImage) {
// // //           studentFormData.append('identityImage', identityImage);
// // //         }

// // //         try {
// // //           await axios.patch(`${apiUrl}/student/image/${studentId}`, studentFormData);
// // //         } catch (error) {
// // //           setError('Failed to patch images');
// // //         }
// // //       }
// // //     } catch (error) {
// // //       setError('Failed to update identity details');
// // //     }
// // //   };

// // //   const handleReset = () => {
// // //     setFormData({
// // //       identityType: '',
// // //       identityNo: '',
// // //       photo: null,
// // //       identityImage: null,
// // //     });
// // //     setPhotoPreview(null);
// // //     setIdentityImagePreview(null);
// // //   };

// // //   const downloadImage = async (url, filename) => {
// // //     try {
// // //       const response = await fetch(url, {
// // //         credentials: 'include' // Include cookies in the request
// // //         // You may also need to include additional headers like Authorization if using JWT tokens
// // //       });
// // //       if (!response.ok) {
// // //         throw new Error(`Failed to download image: ${response.status} ${response.statusText}`);
// // //       }
// // //       const blob = await response.blob();
// // //       const objectURL = URL.createObjectURL(blob);
// // //       const link = document.createElement('a');
// // //       link.href = objectURL;
// // //       link.setAttribute('download', filename);
// // //       document.body.appendChild(link);
// // //       link.click();
// // //       document.body.removeChild(link);
// // //     } catch (error) {
// // //       // Handle the error gracefully, e.g., display an error message to the user
// // //     }
// // //   };

// // //   return (
// // //     <div className="container">
// // //       <h2>IDENTITY FORM</h2>
// // //       {error && <p className="error-message">{error}</p>}
// // //       <form onSubmit={handleSubmit}>
// // //         <div className="form-group-row">
// // //           <div className="form-column">
// // //             <label htmlFor="identityType">Identity Type:</label>
// // //             <select id="identityType" name="identityType" value={formData.identityType} onChange={handleChange}>
// // //               <option value="Driving License">Driving License</option>
// // //               <option value="Aadhaar Card">Aadhaar Card</option>
// // //               <option value="Pan Card">Pan Card</option>
// // //               <option value="Voter ID">Voter ID</option>
// // //               <option value="College ID">College ID</option>
// // //               <option value="Other">Other</option>
// // //             </select>
// // //           </div>
// // //           <div className="form-column">
// // //             <label htmlFor="identityNo">Identity Number:</label>
// // //             <input type="text" id="identityNo" name="identityNo" placeholder="Enter Identity Number" required value={formData.identityNo} onChange={handleChange} />
// // //           </div>
// // //         </div>
// // //         <div className="form-group-row">
// // //           <div className="form-column">
// // //             <label htmlFor="photo">Student Photo:</label>
// // //             <input type="file" id="photo" name="photo" accept="image/*" onChange={handlePhotoChange} />
// // //             {photoPreview && (
// // //               <div className="image-preview">
// // //                 <img src={photoPreview} alt="Student" />
// // //                 <Button color="danger" onClick={() => downloadImage(photoPreview, 'photo.png')}>
// // //                   Download
// // //                 </Button>
// // //               </div>
// // //             )}
// // //           </div>
// // //           <div className="form-column">
// // //             <label htmlFor="identityImage">Identity Image:</label>
// // //             <input type="file" id="identityImage" name="identityImage" accept="image/*" onChange={handleIdentityImageChange} />
// // //             {identityImagePreview && (
// // //               <div className="image-preview">
// // //                 <img src={identityImagePreview} alt="Identity" />
// // //                 <Button color="danger" onClick={() => downloadImage(identityImagePreview, 'identity.png')}>
// // //                   Download
// // //                 </Button>
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>
// // //         <div className="form-actions">
// // //           <Button type="submit" color="primary">Submit</Button>
// // //           <Button type="button" color="secondary" onClick={handleReset}>Reset</Button>
// // //         </div>
// // //       </form>
// // //     </div>
// // //   );
// // // }

// // // export default AddDocuments;
// // import React, { useState, useEffect } from 'react';
// // import { useLocation, useNavigate, useParams } from 'react-router-dom';
// // import axios from 'axios';
// // import { Button } from 'reactstrap';

// // function AddDocuments() {
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const apiUrl = process.env.REACT_APP_API_BASE_URL;
// //   const { studentId: pathStudentId } = useParams(); // For path parameter (/students/:studentId)
// //   const queryParams = new URLSearchParams(location.search);
// //   const queryStudentId = queryParams.get('studentId'); // For query parameter (?studentId=g3u299w)
// //   const studentId = pathStudentId || queryStudentId; // Use path parameter if available, otherwise use query parameter

// //   const [formData, setFormData] = useState({
// //     identityType: '',
// //     identityNo: '',
// //     photo: null,
// //     identityImage: null,
// //   });

// //   const [error, setError] = useState(null);
// //   const [photoPreview, setPhotoPreview] = useState(null);
// //   const [identityImagePreview, setIdentityImagePreview] = useState(null);

// //   useEffect(() => {
// //     if (studentId) {
// //       axios
// //         .get(`${apiUrl}/students/${studentId}`)
// //         .then((response) => {
// //           const { identityType, identityNo, photo, identityImage } = response.data;
// //           setFormData({ identityType, identityNo, photo: null, identityImage: null });
// //           if (photo) {
// //             setPhotoPreview(`${apiUrl}/student/image/${studentId}`);
// //           }
// //           if (identityImage) {
// //             setIdentityImagePreview(`${apiUrl}/student/imageidentity/${studentId}`);
// //           }
// //         })
// //         .catch(() => setError('Failed to fetch student details'));
// //     }
// //   }, [studentId, apiUrl]);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prevState) => ({
// //       ...prevState,
// //       [name]: value,
// //     }));
// //   };

// //   const handlePhotoChange = (event) => {
// //     const file = event.target.files[0];
// //     setFormData((prevFormData) => ({ ...prevFormData, photo: file }));
// //     const reader = new FileReader();
// //     reader.onload = () => {
// //       setPhotoPreview(reader.result);
// //     };
// //     reader.readAsDataURL(file);
// //   };

// //   const handleIdentityImageChange = (event) => {
// //     const file = event.target.files[0];
// //     setFormData((prevFormData) => ({ ...prevFormData, identityImage: file }));
// //     const reader = new FileReader();
// //     reader.onload = () => {
// //       setIdentityImagePreview(reader.result);
// //     };
// //     reader.readAsDataURL(file);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const { photo, identityImage, identityType, identityNo } = formData;

// //     try {
// //       // Update student identity data
// //       await axios.patch(`${apiUrl}/students/${studentId}`, {
// //         identityType,
// //         identityNo,
// //       });

// //       // Upload documents only if there is a change in the image
// //       if (photo || identityImage) {
// //         const studentFormData = new FormData();
// //         if (photo) {
// //           studentFormData.append('image', photo);
// //         }
// //         if (identityImage) {
// //           studentFormData.append('identityImage', identityImage);
// //         }

// //         try {
// //           await axios.patch(`${apiUrl}/student/image/${studentId}`, studentFormData);
// //         } catch (error) {
// //           setError('Failed to patch images');
// //           return;
// //         }
// //       }

// //       // Navigate to /payments on successful form submission
// //       navigate('/payments');
// //     } catch (error) {
// //       setError('Failed to update identity details');
// //     }
// //   };

// //   const handleReset = () => {
// //     setFormData({
// //       identityType: '',
// //       identityNo: '',
// //       photo: null,
// //       identityImage: null,
// //     });
// //     setPhotoPreview(null);
// //     setIdentityImagePreview(null);
// //   };

// //   const downloadImage = async (url, filename) => {
// //     try {
// //       const response = await fetch(url, {
// //         credentials: 'include' // Include cookies in the request
// //         // You may also need to include additional headers like Authorization if using JWT tokens
// //       });
// //       if (!response.ok) {
// //         throw new Error(`Failed to download image: ${response.status} ${response.statusText}`);
// //       }
// //       const blob = await response.blob();
// //       const objectURL = URL.createObjectURL(blob);
// //       const link = document.createElement('a');
// //       link.href = objectURL;
// //       link.setAttribute('download', filename);
// //       document.body.appendChild(link);
// //       link.click();
// //       document.body.removeChild(link);
// //     } catch (error) {
// //       // Handle the error gracefully, e.g., display an error message to the user
// //     }
// //   };

// //   return (
// //     <div className="container">
// //       <h2>IDENTITY FORM</h2>
// //       {error && <p className="error-message">{error}</p>}
// //       <form onSubmit={handleSubmit}>
// //         <div className="form-group-row">
// //           <div className="form-column">
// //             <label htmlFor="identityType">Identity Type:</label>
// //             <select id="identityType" name="identityType" value={formData.identityType} onChange={handleChange}>
// //               <option value="Driving License">Driving License</option>
// //               <option value="Aadhaar Card">Aadhaar Card</option>
// //               <option value="Pan Card">Pan Card</option>
// //               <option value="Voter ID">Voter ID</option>
// //               <option value="College ID">College ID</option>
// //               <option value="Other">Other</option>
// //             </select>
// //           </div>
// //           <div className="form-column">
// //             <label htmlFor="identityNo">Identity Number:</label>
// //             <input type="text" id="identityNo" name="identityNo" placeholder="Enter Identity Number" required value={formData.identityNo} onChange={handleChange} />
// //           </div>
// //         </div>
// //         <div className="form-group-row">
// //           <div className="form-column">
// //             <label htmlFor="photo">Student Photo:</label>
// //             <input type="file" id="photo" name="photo" accept="image/*" onChange={handlePhotoChange} />
// //             {photoPreview && (
// //               <div className="image-preview">
// //                 <img src={photoPreview} alt="Student" />
// //                 <Button color="danger" onClick={() => downloadImage(photoPreview, 'photo.png')}>
// //                   Download
// //                 </Button>
// //               </div>
// //             )}
// //           </div>
// //           <div className="form-column">
// //             <label htmlFor="identityImage">Identity Image:</label>
// //             <input type="file" id="identityImage" name="identityImage" accept="image/*" onChange={handleIdentityImageChange} />
// //             {identityImagePreview && (
// //               <div className="image-preview">
// //                 <img src={identityImagePreview} alt="Identity" />
// //                 <Button color="danger" onClick={() => downloadImage(identityImagePreview, 'identity.png')}>
// //                   Download
// //                 </Button>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //         <div className="form-actions">
// //           <Button type="submit" color="primary">Submit</Button>
// //           <Button type="button" color="secondary" onClick={handleReset}>Reset</Button>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // }

// // export default AddDocuments;


// // AddDocuments.js
// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import { Button } from 'reactstrap';

// function AddDocuments({ onDocumentsSubmit }) {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const apiUrl = process.env.REACT_APP_API_BASE_URL;
//   const { studentId: pathStudentId } = useParams(); // For path parameter (/students/:studentId)
//   const queryParams = new URLSearchParams(location.search);
//   const queryStudentId = queryParams.get('studentId'); // For query parameter (?studentId=g3u299w)
//   const studentId = pathStudentId || queryStudentId  ; // Use path parameter if available, otherwise use query parameter

//   const [formData, setFormData] = useState({
//     identityType: '',
//     identityNo: '',
//     photo: null,
//     identityImage: null,
//   });

//   const [error, setError] = useState(null);
//   const [photoPreview, setPhotoPreview] = useState(null);
//   const [identityImagePreview, setIdentityImagePreview] = useState(null);

//   useEffect(() => {
//     if (studentId) {
//       axios
//         .get(`${apiUrl}/students/${studentId}`)
//         .then((response) => {
//           const { identityType, identityNo, photo, identityImage } = response.data;
//           setFormData({ identityType, identityNo, photo: null, identityImage: null });
//           if (photo) {
//             setPhotoPreview(`${apiUrl}/student/image/${studentId}`);
//           }
//           if (identityImage) {
//             setIdentityImagePreview(`${apiUrl}/student/imageidentity/${studentId}`);
//           }
//         })
//         .catch(() => setError('Failed to fetch student details'));
//     }
//   }, [studentId, apiUrl]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handlePhotoChange = (event) => {
//     const file = event.target.files[0];
//     setFormData((prevFormData) => ({ ...prevFormData, photo: file }));
//     const reader = new FileReader();
//     reader.onload = () => {
//       setPhotoPreview(reader.result);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleIdentityImageChange = (event) => {
//     const file = event.target.files[0];
//     setFormData((prevFormData) => ({ ...prevFormData, identityImage: file }));
//     const reader = new FileReader();
//     reader.onload = () => {
//       setIdentityImagePreview(reader.result);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { photo, identityImage, identityType, identityNo } = formData;

//     try {
//       // Update student identity data
//       await axios.patch(`${apiUrl}/students/${studentId}`, {
//         identityType,
//         identityNo,
//       });

//       // Upload documents only if there is a change in the image
//       if (photo || identityImage) {
//         const studentFormData = new FormData();
//         if (photo) {
//           studentFormData.append('image', photo);
//         }
//         if (identityImage) {
//           studentFormData.append('identityImage', identityImage);
//         }

//         try {
//           await axios.patch(`${apiUrl}/student/image/${studentId}`, studentFormData);
//         } catch (error) {
//           setError('Failed to patch images');
//           return;
//         }
//       }

//       // Notify parent component about the documents submission
//       if (onDocumentsSubmit) {
//         onDocumentsSubmit();
//       }
//     } catch (error) {
//       setError('Failed to update identity details');
//     }
//   };

//   const handleReset = () => {
//     setFormData({
//       identityType: '',
//       identityNo: '',
//       photo: null,
//       identityImage: null,
//     });
//     setPhotoPreview(null);
//     setIdentityImagePreview(null);
//   };

//   const downloadImage = async (url, filename) => {
//     try {
//       const response = await fetch(url, {
//         credentials: 'include' // Include cookies in the request
//         // You may also need to include additional headers like Authorization if using JWT tokens
//       });
//       if (!response.ok) {
//         throw new Error(`Failed to download image: ${response.status} ${response.statusText}`);
//       }
//       const blob = await response.blob();
//       const objectURL = URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = objectURL;
//       link.setAttribute('download', filename);
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     } catch (error) {
//       // Handle the error gracefully, e.g., display an error message to the user
//     }
//   };

//   return (
//     <div className="container">
//       <h2>IDENTITY FORM</h2>
//       {error && <p className="error-message">{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <div className="form-group-row">
//           <div className="form-column">
//             <label htmlFor="identityType">Identity Type:</label>
//             <select id="identityType" name="identityType" value={formData.identityType} onChange={handleChange}>
//               <option value="Driving License">Driving License</option>
//               <option value="Aadhaar Card">Aadhaar Card</option>
//               <option value="Pan Card">Pan Card</option>
//               <option value="Voter ID">Voter ID</option>
//               <option value="College ID">College ID</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>
//           <div className="form-column">
//             <label htmlFor="identityNo">Identity Number:</label>
//             <input type="text" id="identityNo" name="identityNo" placeholder="Enter Identity Number" required value={formData.identityNo} onChange={handleChange} />
//           </div>
//         </div>
//         <div className="form-group-row">
//           <div className="form-column">
//             <label htmlFor="photo">Student Photo:</label>
//             <input type="file" id="photo" name="photo" accept="image/*" onChange={handlePhotoChange} />
//             {photoPreview && (
//               <div className="image-preview">
//                 <img src={photoPreview} alt="Student" />
//                 <Button color="danger" onClick={() => downloadImage(photoPreview, 'photo.png')}>
//                   Download
//                 </Button>
//               </div>
//             )}
//           </div>
//           <div className="form-column">
//             <label htmlFor="identityImage">Identity Image:</label>
//             <input type="file" id="identityImage" name="identityImage" accept="image/*" onChange={handleIdentityImageChange} />
//             {identityImagePreview && (
//               <div className="image-preview">
//                 <img src={identityImagePreview} alt="Identity" />
//                 <Button color="danger" onClick={() => downloadImage(identityImagePreview, 'identity.png')}>
//                   Download
//                 </Button>
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="form-actions">
//           <Button type="submit" color="primary">Submit</Button>
//           <Button type="button" color="secondary" onClick={handleReset}>Reset</Button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default AddDocuments;
import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'reactstrap';
import { FaEye } from 'react-icons/fa';
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
          <Button type="button" color="secondary" onClick={handleReset}>Reset</Button>
        </div>
      </form>
    </div>
/* <div className='container'>
      <div className="col-md-7 col-lg-8 col-xl-9" style={{ width: '100%' }}>
        <div className="card" style={{ width: 'inherit' }}>
          <div className="card-body">
            <h4 className="card-title">Basic Information</h4>

            

            <form onSubmit={handleSubmit}>
              {
                <div>
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
                      {formData.photo && (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' }}>
                          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <Button color="info" onClick={() => photoPreview(!setPhotoPreview)}>
                              <FaEye /> View
                            </Button>
                            <Button color="danger" onClick={() => downloadImage(photoPreview, 'photo.png')}>
                              Download
                            </Button>
                          </div>
                          {setPhotoPreview && (
                            <img
                              src={photoPreview}
                              alt="Student"
                              style={{
                                width: '200px',
                                height: '200px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                                border: '1px solid #ddd',
                                marginTop: '10px'
                              }}
                            />
                          )}
                        </div>
                      )}
                    </div>
                    <div className="form-column">
                      <label htmlFor="identityImage">Identity Image:</label>
                      <input type="file" id="identityImage" name="identityImage" accept="image/*" onChange={handleIdentityImageChange} />
                      {formData.identityImage && (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' }}>
                          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <Button color="info" onClick={() => identityImagePreview(!setIdentityImagePreview)}>
                              <FaEye /> View
                            </Button>
                            <Button color="danger" onClick={() => downloadImage(identityImagePreview, 'identity.png')}>
                              Download
                            </Button>
                          </div>
                          {setIdentityImagePreview && (
                            <img
                              src={identityImagePreview}
                              alt="Identity"
                              style={{
                                width: '350px',
                                height: '200px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                                border: '1px solid #ddd',
                                marginTop: '10px'
                              }}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              }

              <div className="form-actions">
                <Button type="button" color="secondary" onClick={handleReset}>Reset</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div> */
  );
}

export default AddDocuments;
