
// // // // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // // // import axios from 'axios';
// // // // // // // // // // import { useParams, useNavigate } from 'react-router-dom';
// // // // // // // // // // import { Button } from 'reactstrap';
// // // // // // // // // // import './StudentRegistration.css';



// // // // // // // // // // function EnrollmentForm() {
// // // // // // // // // //   const { id: studentId } = useParams();
// // // // // // // // // //   const navigate = useNavigate();
// // // // // // // // // //   const apiUrl = process.env.REACT_APP_API_BASE_URL

// // // // // // // // // //   const [formData, setFormData] = useState({
// // // // // // // // // //     studentId,
// // // // // // // // // //     firstName: '',
// // // // // // // // // //     middleName: '',
// // // // // // // // // //     lastName: '',
// // // // // // // // // //     mobile: '',
// // // // // // // // // //     email: '',
// // // // // // // // // //     dob: '',
// // // // // // // // // //     city: '',
// // // // // // // // // //     state: '',
// // // // // // // // // //     pincode: '',
// // // // // // // // // //     occupation: '',
// // // // // // // // // //     courseId: '',
// // // // // // // // // //     address: '',
// // // // // // // // // //     gender: '',
// // // // // // // // // //     photo: null,
// // // // // // // // // //     identityImage: null,
// // // // // // // // // //     identityType: '',
// // // // // // // // // //     identityNo: '',
// // // // // // // // // //   });

// // // // // // // // // //   const [courses, setCourses] = useState([]);
// // // // // // // // // //   const [message, setMessage] = useState('');
// // // // // // // // // //   const [error, setError] = useState(null);
// // // // // // // // // //   const [photoPreview, setPhotoPreview] = useState(null);
// // // // // // // // // //   const [identityImagePreview, setIdentityImagePreview] = useState(null);

// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     axios
// // // // // // // // // //       .get(`${apiUrl}/courses`)
// // // // // // // // // //       .then((response) => setCourses(response.data))
// // // // // // // // // //       .catch(() => setMessage('Failed to fetch courses'));
// // // // // // // // // //   }, []);

// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     if (studentId) {
// // // // // // // // // //       axios
// // // // // // // // // //         .get(`${apiUrl}/students/${studentId}`)
// // // // // // // // // //         .then((response) => {
// // // // // // // // // //           setFormData((prevFormData) => ({ ...prevFormData, ...response.data }));
// // // // // // // // // //           if (response.data.photo) {
// // // // // // // // // //             setPhotoPreview(`${apiUrl}/student/image/${studentId}`);
// // // // // // // // // //           }
// // // // // // // // // //           if (response.data.identityImage) {
// // // // // // // // // //             setIdentityImagePreview(`${apiUrl}/student/imageidentity/${studentId}`);
// // // // // // // // // //           }
// // // // // // // // // //         })
// // // // // // // // // //         .catch(() => setMessage('Failed to fetch student details'));
// // // // // // // // // //     }
// // // // // // // // // //   }, [studentId]);
  

// // // // // // // // // //   const handleChange = (e) => {
// // // // // // // // // //     const { name, value } = e.target;
// // // // // // // // // //     setFormData((prevState) => ({
// // // // // // // // // //       ...prevState,
// // // // // // // // // //       [name]: value,
// // // // // // // // // //     }));
// // // // // // // // // //   };
  
  
// // // // // // // // // //   const handlePhotoChange = (event) => {
// // // // // // // // // //     const file = event.target.files[0];
// // // // // // // // // //     setFormData((prevFormData) => ({ ...prevFormData, photo: file }));
// // // // // // // // // //     const reader = new FileReader();
// // // // // // // // // //     reader.onload = () => {
// // // // // // // // // //       setPhotoPreview(reader.result);
// // // // // // // // // //     };
// // // // // // // // // //     reader.readAsDataURL(file);
// // // // // // // // // //   };

// // // // // // // // // //   const handleIdentityImageChange = (event) => {
// // // // // // // // // //     const file = event.target.files[0];
// // // // // // // // // //     setFormData((prevFormData) => ({ ...prevFormData, identityImage: file }));
// // // // // // // // // //     const reader = new FileReader();
// // // // // // // // // //     reader.onload = () => {
// // // // // // // // // //       setIdentityImagePreview(reader.result);
// // // // // // // // // //     };
// // // // // // // // // //     reader.readAsDataURL(file);
// // // // // // // // // //   };

  
// // // // // // // // // //   const downloadImage = async (url, filename) => {
// // // // // // // // // //     try {
// // // // // // // // // //         const response = await fetch(url, {
// // // // // // // // // //             credentials: 'include' // Include cookies in the request
// // // // // // // // // //             // You may also need to include additional headers like Authorization if using JWT tokens
// // // // // // // // // //         });
// // // // // // // // // //         if (!response.ok) {
// // // // // // // // // //             throw new Error(`Failed to download image: ${response.status} ${response.statusText}`);
// // // // // // // // // //         }
// // // // // // // // // //         const blob = await response.blob();
// // // // // // // // // //         const objectURL = URL.createObjectURL(blob);
// // // // // // // // // //         const link = document.createElement('a');
// // // // // // // // // //         link.href = objectURL;
// // // // // // // // // //         link.setAttribute('download', filename);
// // // // // // // // // //         document.body.appendChild(link);
// // // // // // // // // //         link.click();
// // // // // // // // // //         document.body.removeChild(link);
// // // // // // // // // //     } catch (error) {
// // // // // // // // // //         // console.error('Error downloading image:', error);
// // // // // // // // // //         // Handle the error gracefully, e.g., display an error message to the user
// // // // // // // // // //     }
// // // // // // // // // // };


  
  


// // // // // // // // // // const handleSubmit = async (e) => {
// // // // // // // // // //   e.preventDefault();
// // // // // // // // // //   const { photo, identityImage, identityType, identityNo, ...studentData } = formData;

// // // // // // // // // //   try {
// // // // // // // // // //     // Update student data
// // // // // // // // // //     // console.log('Updating student data...');
// // // // // // // // // //     await axios.patch(`${apiUrl}/students/${studentId}`, {
// // // // // // // // // //       ...studentData,
// // // // // // // // // //       identityType,
// // // // // // // // // //       identityNo,
// // // // // // // // // //     });
// // // // // // // // // //     // console.log('Student data updated successfully.');

// // // // // // // // // //     // Upload documents only if there is a change in the image
// // // // // // // // // //     if (photo || identityImage) {
// // // // // // // // // //       // console.log('Uploading images...');

// // // // // // // // // //       const studentFormData = new FormData();
// // // // // // // // // //       // Append photo if present and not already uploaded
// // // // // // // // // //       if (photo) {
// // // // // // // // // //         // console.log('Appending photo...');
// // // // // // // // // //         studentFormData.append('image', photo);
// // // // // // // // // //       }
// // // // // // // // // //       // Append identityImage if present and not already uploaded
// // // // // // // // // //       if (identityImage) {
// // // // // // // // // //         // console.log('Appending identityImage...');
// // // // // // // // // //         studentFormData.append('identityImage', identityImage);
// // // // // // // // // //       }

// // // // // // // // // //       try {
// // // // // // // // // //         // If either photo or identityImage is present, patch the images
// // // // // // // // // //         // console.log('Patching images...');
// // // // // // // // // //         await axios.patch(`${apiUrl}/student/image/${studentId}`, studentFormData);
// // // // // // // // // //         // console.log('Images patched successfully.');
// // // // // // // // // //       } catch (error) {
// // // // // // // // // //         // Handle error
// // // // // // // // // //         // console.error('Error patching images:', error);
// // // // // // // // // //         setError('Failed to patch images');
// // // // // // // // // //       }
// // // // // // // // // //     } else {
// // // // // // // // // //       // console.log('No new images selected. Skipping image upload.');
// // // // // // // // // //     }

// // // // // // // // // //     // Enroll student
// // // // // // // // // //     // console.log('Enrolling student...');
// // // // // // // // // //     await axios.post(`${apiUrl}/enroll`, {
// // // // // // // // // //       studentId,
// // // // // // // // // //       courseId: studentData.courseId,
// // // // // // // // // //     });
// // // // // // // // // //     // console.log('Student enrolled successfully.');
// // // // // // // // // //     navigate('/payments');
// // // // // // // // // //   } catch (error) {
// // // // // // // // // //     setError('Failed to enroll/update student');
// // // // // // // // // //   }
// // // // // // // // // // };






  
// // // // // // // // // //   const handleReset = () => {
// // // // // // // // // //     setFormData({
// // // // // // // // // //       studentId,
// // // // // // // // // //       firstName: '',
// // // // // // // // // //       middleName: '',
// // // // // // // // // //       lastName: '',
// // // // // // // // // //       mobile: '',
// // // // // // // // // //       email: '',
// // // // // // // // // //       dob: '',
// // // // // // // // // //       city: '',
// // // // // // // // // //       state: '',
// // // // // // // // // //       pincode: '',
// // // // // // // // // //       occupation: '',
// // // // // // // // // //       courseId: '',
// // // // // // // // // //       address: '',
// // // // // // // // // //       gender: '',
// // // // // // // // // //       photo: null,
// // // // // // // // // //       identityImage: null,
// // // // // // // // // //       identityType: '',
// // // // // // // // // //       identityNo: '',
// // // // // // // // // //     });
// // // // // // // // // //     setPhotoPreview(null);
// // // // // // // // // //     setIdentityImagePreview(null);
// // // // // // // // // //   };

// // // // // // // // // //   return (
// // // // // // // // // //     <div className="container">
// // // // // // // // // //       <h2>ENROLLMENT FORM</h2>
// // // // // // // // // //       {message && <p className="error-message">{message}</p>}
// // // // // // // // // //       <form onSubmit={handleSubmit}>
// // // // // // // // // //         <div className="form-group-row">
// // // // // // // // // //           <div className="form-column">
// // // // // // // // // //             <label htmlFor="studentId">Student ID:</label>
// // // // // // // // // //             <input type="text" id="studentId" name="studentId" placeholder="Enter Student ID" required value={formData.studentId} readOnly />
// // // // // // // // // //             <br />
// // // // // // // // // //           </div>
// // // // // // // // // //         </div>
// // // // // // // // // //         <div className="form-group-row">
// // // // // // // // // //           <div className="form-column">
// // // // // // // // // //             <label htmlFor="firstName">First Name:</label>
// // // // // // // // // //             <input type="text" id="firstName" name="firstName" placeholder="Enter First Name" required value={formData.firstName} onChange={handleChange} />
// // // // // // // // // //           </div>
// // // // // // // // // //           <div className="form-column">
// // // // // // // // // //             <label htmlFor="middleName">Middle Name:</label>
// // // // // // // // // //             <input type="text" id="middleName" name="middleName" placeholder="Enter Middle Name" value={formData.middleName} onChange={handleChange} />
// // // // // // // // // //           </div>
// // // // // // // // // //           <div className="form-column">
// // // // // // // // // //             <label htmlFor="lastName">Last Name:</label>
// // // // // // // // // //             <input type="text" id="lastName" name="lastName" placeholder="Enter Last Name" required value={formData.lastName} onChange={handleChange} />
// // // // // // // // // //           </div>
// // // // // // // // // //         </div>
// // // // // // // // // //         <div className="form-group-row">
// // // // // // // // // //           <div className="form-column">
// // // // // // // // // //             <label htmlFor="mobile">Mobile Number:</label>
// // // // // // // // // //             <input type="tel" id="mobile" name="mobile" pattern="[0-9]{10}" placeholder="Enter Mobile" required value={formData.mobile} onChange={handleChange} />
// // // // // // // // // //           </div>
// // // // // // // // // //           <div className="form-column">
// // // // // // // // // //             <label htmlFor="email">Email:</label>
// // // // // // // // // //             <input type="email" id="email" name="email" placeholder="Enter Email" required value={formData.email} onChange={handleChange} />
// // // // // // // // // //           </div>
// // // // // // // // // //           <div className="form-column">
// // // // // // // // // //             <label htmlFor="dob">Date of Birth:</label>
// // // // // // // // // //             <input type="date" id="dob" name="dob" required value={formData.dob} onChange={handleChange} />
// // // // // // // // // //           </div>
// // // // // // // // // //         </div>
// // // // // // // // // //         <div className="form-group-row">
// // // // // // // // // //           <div className="form-column">
// // // // // // // // // //             <label htmlFor="city">City:</label>
// // // // // // // // // //             <input type="text" id="city" name="city" placeholder="Enter City" required value={formData.city} onChange={handleChange} />
// // // // // // // // // //           </div>
// // // // // // // // // //           <div className="form-column">
// // // // // // // // // //             <label htmlFor="state">State:</label>
// // // // // // // // // //             <input type="text" id="state" name="state" placeholder="Enter State" required value={formData.state} onChange={handleChange} />
// // // // // // // // // //           </div>
// // // // // // // // // //           <div className="form-column">
// // // // // // // // // //             <label htmlFor="pincode">Pincode:</label>
// // // // // // // // // //             <input type="text" id="pincode" name="pincode" placeholder="Enter Pincode" required value={formData.pincode} onChange={handleChange} />
// // // // // // // // // //           </div>
// // // // // // // // // //         </div>
// // // // // // // // // //         <div className="form-group">
// // // // // // // // // //           <label htmlFor="occupation">Occupation:</label>
// // // // // // // // // //           <input type="text" id="occupation" name="occupation" placeholder="Enter Occupation" value={formData.occupation} onChange={handleChange} />
// // // // // // // // // //         </div>
// // // // // // // // // //         <div className="form-group">
// // // // // // // // // //           <label htmlFor="address">Address:</label>
// // // // // // // // // //           <textarea id="address" name="address" rows="4" placeholder="Enter Address" required value={formData.address} onChange={handleChange}></textarea>
// // // // // // // // // //         </div>
// // // // // // // // // //         <div className="form-group">
// // // // // // // // // //           <label>Gender:</label>
// // // // // // // // // //           <input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} /> Male
// // // // // // // // // //           <input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} /> Female
// // // // // // // // // //           <input type="radio" name="gender" value="Other" checked={formData.gender === 'Other'} onChange={handleChange} /> Other
// // // // // // // // // //         </div>
// // // // // // // // // //         <div className="form-group">
// // // // // // // // // //           <label htmlFor="courseId">Course:</label>
// // // // // // // // // //           <select id="courseId" name="courseId" required value={formData.courseId} onChange={handleChange}>
// // // // // // // // // //             <option value="">Select a Course</option>
// // // // // // // // // //             {courses.map((course) => (
// // // // // // // // // //               <option key={course.courseId} value={course.courseId}>{course.name}</option>
// // // // // // // // // //             ))}
// // // // // // // // // //           </select>
// // // // // // // // // //         </div>
       
// // // // // // // // // //         <div className="form-group">
// // // // // // // // // //         <div>
// // // // // // // // // //   <label htmlFor="identityImage">Identity Image:</label>
// // // // // // // // // //   {identityImagePreview && (
// // // // // // // // // //     <div>
// // // // // // // // // //       <img src={identityImagePreview} alt="Identity Image Preview" style={{ maxWidth: '100px', maxHeight: '100px' }} className="image-preview" />
// // // // // // // // // //       <button type="button" onClick={() => downloadImage(`${apiUrl}/student/images/${studentId}/identity`, `${formData.firstName}_${formData.lastName}_${formData.studentId}_identity.jpg`)} className="download-button">Download</button>

// // // // // // // // // //     </div>
// // // // // // // // // //   )}
// // // // // // // // // //   <input type="file" id="identityImage" name="identityImage" accept="image/*" onChange={handleIdentityImageChange} />
// // // // // // // // // // </div>
// // // // // // // // // // <div>
// // // // // // // // // //   <label htmlFor="photo">Photo:</label>
// // // // // // // // // //   {photoPreview && (
// // // // // // // // // //     <div>
// // // // // // // // // //       <img src={photoPreview} alt="Photo Preview" style={{ maxWidth: '100px', maxHeight: '100px' }} className="image-preview" />
// // // // // // // // // //       <button type="button" onClick={() => downloadImage(`${apiUrl}/student/images/${studentId}/photo`, `${formData.firstName}_${formData.lastName}_${formData.studentId}_photo.jpg`)} className="download-button">Download</button>

// // // // // // // // // //     </div>
// // // // // // // // // //   )}
// // // // // // // // // //   <input type="file" id="image" name="image" accept="image/*" onChange={handlePhotoChange} />
// // // // // // // // // // </div>

// // // // // // // // // // </div>


        
// // // // // // // // // //         <div>
// // // // // // // // // //   <label htmlFor="identityType">Identity Type:</label>
// // // // // // // // // //   <select id="identityType" name="identityType" value={formData.identityType} onChange={handleChange}>
// // // // // // // // // //   <option value="Driving License">Driving License</option>
// // // // // // // // // //                     <option value="Aadhaar Card">Aadhaar Card</option>
// // // // // // // // // //                     <option value="Pan Card">Pan Card</option>
// // // // // // // // // //                     <option value="Voter ID">Voter ID</option>
// // // // // // // // // //                     <option value="College ID">College ID</option>
// // // // // // // // // //                     <option value="Other">Other</option>
// // // // // // // // // //   </select>
// // // // // // // // // // </div>
// // // // // // // // // // <div>
// // // // // // // // // //   <label htmlFor="identityNo">Identity Number:</label>
// // // // // // // // // //   <input type="text" id="identityNo" name="identityNo" value={formData.identityNo} onChange={handleChange} />
// // // // // // // // // // </div>

// // // // // // // // // //         <div className="form-group" style={{marginTop:"20px"}}>
// // // // // // // // // //           <Button type="reset" color="secondary" onClick={handleReset}>Reset</Button>
// // // // // // // // // //           <Button type="submit" color="primary">Submit</Button>

// // // // // // // // // //         </div>
// // // // // // // // // //       </form>
// // // // // // // // // //       {error && <p>Error: {error}</p>}
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // }

// // // // // // // // // // export default EnrollmentForm;





// // // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // // import axios from 'axios';
// // // // // // // // // import { useParams, useNavigate } from 'react-router-dom';
// // // // // // // // // import { Button } from 'reactstrap';
// // // // // // // // // import './StudentRegistration.css';

// // // // // // // // // function EnrollmentForm() {
// // // // // // // // //   // const { id: studentId } = useParams();
// // // // // // // // //   const {studentId}= useParams();
// // // // // // // // //   const navigate = useNavigate();
// // // // // // // // //   const apiUrl = process.env.REACT_APP_API_BASE_URL;

// // // // // // // // //   const [formData, setFormData] = useState({
// // // // // // // // //     studentId,
// // // // // // // // //     firstName: '',
// // // // // // // // //     middleName: '',
// // // // // // // // //     lastName: '',
// // // // // // // // //     mobile: '',
// // // // // // // // //     email: '',
// // // // // // // // //     dob: '',
// // // // // // // // //     city: '',
// // // // // // // // //     state: '',
// // // // // // // // //     pincode: '',
// // // // // // // // //     occupation: '',
// // // // // // // // //     courseId: '',
// // // // // // // // //     address: '',
// // // // // // // // //     gender: '',
// // // // // // // // //     photo: null,
// // // // // // // // //     identityImage: null,
// // // // // // // // //     identityType: '',
// // // // // // // // //     identityNo: '',
// // // // // // // // //   });

// // // // // // // // //   const [courses, setCourses] = useState([]);
// // // // // // // // //   const [message, setMessage] = useState('');
// // // // // // // // //   const [error, setError] = useState(null);
// // // // // // // // //   const [photoPreview, setPhotoPreview] = useState(null);
// // // // // // // // //   const [identityImagePreview, setIdentityImagePreview] = useState(null);

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     axios
// // // // // // // // //       .get(`${apiUrl}/courses`)
// // // // // // // // //       .then((response) => setCourses(response.data))
// // // // // // // // //       .catch(() => setMessage('Failed to fetch courses'));
// // // // // // // // //   }, []);

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     if (studentId) {
// // // // // // // // //       axios
// // // // // // // // //         .get(`${apiUrl}/students/${studentId}`)
// // // // // // // // //         .then((response) => {
// // // // // // // // //           setFormData((prevFormData) => ({ ...prevFormData, ...response.data }));
// // // // // // // // //           if (response.data.photo) {
// // // // // // // // //             setPhotoPreview(`${apiUrl}/student/image/${studentId}`);
// // // // // // // // //           }
// // // // // // // // //           if (response.data.identityImage) {
// // // // // // // // //             setIdentityImagePreview(`${apiUrl}/student/imageidentity/${studentId}`);
// // // // // // // // //           }
// // // // // // // // //         })
// // // // // // // // //         .catch(() => setMessage('Failed to fetch student details'));
// // // // // // // // //     }
// // // // // // // // //   }, [studentId]);

// // // // // // // // //   const handleChange = (e) => {
// // // // // // // // //     const { name, value } = e.target;
// // // // // // // // //     setFormData((prevState) => ({
// // // // // // // // //       ...prevState,
// // // // // // // // //       [name]: value,
// // // // // // // // //     }));
// // // // // // // // //   };

// // // // // // // // //   const handlePhotoChange = (event) => {
// // // // // // // // //     const file = event.target.files[0];
// // // // // // // // //     setFormData((prevFormData) => ({ ...prevFormData, photo: file }));
// // // // // // // // //     const reader = new FileReader();
// // // // // // // // //     reader.onload = () => {
// // // // // // // // //       setPhotoPreview(reader.result);
// // // // // // // // //     };
// // // // // // // // //     reader.readAsDataURL(file);
// // // // // // // // //   };

// // // // // // // // //   const handleIdentityImageChange = (event) => {
// // // // // // // // //     const file = event.target.files[0];
// // // // // // // // //     setFormData((prevFormData) => ({ ...prevFormData, identityImage: file }));
// // // // // // // // //     const reader = new FileReader();
// // // // // // // // //     reader.onload = () => {
// // // // // // // // //       setIdentityImagePreview(reader.result);
// // // // // // // // //     };
// // // // // // // // //     reader.readAsDataURL(file);
// // // // // // // // //   };

// // // // // // // // //   const downloadImage = async (url, filename) => {
// // // // // // // // //     try {
// // // // // // // // //       const response = await fetch(url, {
// // // // // // // // //         credentials: 'include' // Include cookies in the request
// // // // // // // // //         // You may also need to include additional headers like Authorization if using JWT tokens
// // // // // // // // //       });
// // // // // // // // //       if (!response.ok) {
// // // // // // // // //         throw new Error(`Failed to download image: ${response.status} ${response.statusText}`);
// // // // // // // // //       }
// // // // // // // // //       const blob = await response.blob();
// // // // // // // // //       const objectURL = URL.createObjectURL(blob);
// // // // // // // // //       const link = document.createElement('a');
// // // // // // // // //       link.href = objectURL;
// // // // // // // // //       link.setAttribute('download', filename);
// // // // // // // // //       document.body.appendChild(link);
// // // // // // // // //       link.click();
// // // // // // // // //       document.body.removeChild(link);
// // // // // // // // //     } catch (error) {
// // // // // // // // //       // Handle the error gracefully, e.g., display an error message to the user
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const handleSubmit = async (e) => {
// // // // // // // // //     e.preventDefault();
// // // // // // // // //     const { photo, identityImage, identityType, identityNo, ...studentData } = formData;

// // // // // // // // //     try {
// // // // // // // // //       // Update student data
// // // // // // // // //       await axios.patch(`${apiUrl}/students/${studentId}`, {
// // // // // // // // //         ...studentData,
// // // // // // // // //         identityType,
// // // // // // // // //         identityNo,
// // // // // // // // //       });

// // // // // // // // //       // Upload documents only if there is a change in the image
// // // // // // // // //       if (photo || identityImage) {
// // // // // // // // //         const studentFormData = new FormData();
// // // // // // // // //         if (photo) {
// // // // // // // // //           studentFormData.append('image', photo);
// // // // // // // // //         }
// // // // // // // // //         if (identityImage) {
// // // // // // // // //           studentFormData.append('identityImage', identityImage);
// // // // // // // // //         }

// // // // // // // // //         try {
// // // // // // // // //           await axios.patch(`${apiUrl}/student/image/${studentId}`, studentFormData);
// // // // // // // // //         } catch (error) {
// // // // // // // // //           setError('Failed to patch images');
// // // // // // // // //         }
// // // // // // // // //       }

// // // // // // // // //       // Enroll student
// // // // // // // // //       await axios.post(`${apiUrl}/enroll`, {
// // // // // // // // //         studentId,
// // // // // // // // //         courseId: studentData.courseId,
// // // // // // // // //       });
      
// // // // // // // // //       navigate('/courses/viewenrollments');
// // // // // // // // //     } catch (error) {
// // // // // // // // //       setError('Failed to enroll/update student');
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const handleReset = () => {
// // // // // // // // //     setFormData({
// // // // // // // // //       studentId,
// // // // // // // // //       firstName: '',
// // // // // // // // //       middleName: '',
// // // // // // // // //       lastName: '',
// // // // // // // // //       mobile: '',
// // // // // // // // //       email: '',
// // // // // // // // //       dob: '',
// // // // // // // // //       city: '',
// // // // // // // // //       state: '',
// // // // // // // // //       pincode: '',
// // // // // // // // //       occupation: '',
// // // // // // // // //       courseId: '',
// // // // // // // // //       address: '',
// // // // // // // // //       gender: '',
// // // // // // // // //       photo: null,
// // // // // // // // //       identityImage: null,
// // // // // // // // //       identityType: '',
// // // // // // // // //       identityNo: '',
// // // // // // // // //     });
// // // // // // // // //     setPhotoPreview(null);
// // // // // // // // //     setIdentityImagePreview(null);
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     <div className="container">
// // // // // // // // //       <h2>ENROLLMENT FORM</h2>
// // // // // // // // //       {message && <p className="error-message">{message}</p>}
// // // // // // // // //       <form onSubmit={handleSubmit}>
// // // // // // // // //         <div className="form-group-row">
// // // // // // // // //           <div className="form-column">
// // // // // // // // //             <label htmlFor="studentId">Student ID:</label>
// // // // // // // // //             <input type="text" id="studentId" name="studentId" placeholder="Enter Student ID" required value={formData.studentId} readOnly />
// // // // // // // // //             <br />
// // // // // // // // //           </div>
// // // // // // // // //         </div>
// // // // // // // // //         <div className="form-group-row">
// // // // // // // // //           <div className="form-column">
// // // // // // // // //             <label htmlFor="firstName">First Name:</label>
// // // // // // // // //             <input type="text" id="firstName" name="firstName" placeholder="Enter First Name" required value={formData.firstName} onChange={handleChange} />
// // // // // // // // //           </div>
// // // // // // // // //           <div className="form-column">
// // // // // // // // //             <label htmlFor="middleName">Middle Name:</label>
// // // // // // // // //             <input type="text" id="middleName" name="middleName" placeholder="Enter Middle Name" value={formData.middleName} onChange={handleChange} />
// // // // // // // // //           </div>
// // // // // // // // //           <div className="form-column">
// // // // // // // // //             <label htmlFor="lastName">Last Name:</label>
// // // // // // // // //             <input type="text" id="lastName" name="lastName" placeholder="Enter Last Name" required value={formData.lastName} onChange={handleChange} />
// // // // // // // // //           </div>
// // // // // // // // //         </div>
// // // // // // // // //         <div className="form-group-row">
// // // // // // // // //           <div className="form-column">
// // // // // // // // //             <label htmlFor="mobile">Mobile Number:</label>
// // // // // // // // //             <input type="tel" id="mobile" name="mobile" pattern="[0-9]{10}" placeholder="Enter Mobile" required value={formData.mobile} onChange={handleChange} />
// // // // // // // // //           </div>
// // // // // // // // //           <div className="form-column">
// // // // // // // // //             <label htmlFor="email">Email:</label>
// // // // // // // // //             <input type="email" id="email" name="email" placeholder="Enter Email" required value={formData.email} onChange={handleChange} />
// // // // // // // // //           </div>
// // // // // // // // //           <div className="form-column">
// // // // // // // // //             <label htmlFor="dob">Date of Birth:</label>
// // // // // // // // //             <input type="date" id="dob" name="dob" required value={formData.dob} onChange={handleChange} />
// // // // // // // // //           </div>
// // // // // // // // //         </div>
// // // // // // // // //         <div className="form-group-row">
// // // // // // // // //           <div className="form-column">
// // // // // // // // //             <label htmlFor="city">City:</label>
// // // // // // // // //             <input type="text" id="city" name="city" placeholder="Enter City" required value={formData.city} onChange={handleChange} />
// // // // // // // // //           </div>
// // // // // // // // //           <div className="form-column">
// // // // // // // // //             <label htmlFor="state">State:</label>
// // // // // // // // //             <input type="text" id="state" name="state" placeholder="Enter State" required value={formData.state} onChange={handleChange} />
// // // // // // // // //           </div>
// // // // // // // // //           <div className="form-column">
// // // // // // // // //             <label htmlFor="pincode">Pincode:</label>
// // // // // // // // //             <input type="text" id="pincode" name="pincode" placeholder="Enter Pincode" required value={formData.pincode} onChange={handleChange} />
// // // // // // // // //           </div>
// // // // // // // // //         </div>
// // // // // // // // //         <div className="form-group">
// // // // // // // // //           <label htmlFor="occupation">Occupation:</label>
// // // // // // // // //           <input type="text" id="occupation" name="occupation" placeholder="Enter Occupation" value={formData.occupation} onChange={handleChange} />
// // // // // // // // //         </div>
// // // // // // // // //         <div className="form-group">
// // // // // // // // //           <label htmlFor="address">Address:</label>
// // // // // // // // //           <textarea id="address" name="address" rows="4" placeholder="Enter Address" required value={formData.address} onChange={handleChange}></textarea>
// // // // // // // // //         </div>
// // // // // // // // //         <div className="form-group">
// // // // // // // // //           <label>Gender:</label>
// // // // // // // // //           <input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} /> Male
// // // // // // // // //           <input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} /> Female
// // // // // // // // //           <input type="radio" name="gender" value="Other" checked={formData.gender === 'Other'} onChange={handleChange} /> Other
// // // // // // // // //         </div>
// // // // // // // // //         <div className="form-group">
// // // // // // // // //           <label htmlFor="courseId">Course:</label>
// // // // // // // // //           <select id="courseId" name="courseId" required value={formData.courseId} onChange={handleChange}>
// // // // // // // // //             <option value="">Select a Course</option>
// // // // // // // // //             {courses.map((course) => (
// // // // // // // // //               <option key={course.courseId} value={course.courseId}>{course.name}</option>
// // // // // // // // //             ))}
// // // // // // // // //           </select>
// // // // // // // // //         </div>
       
// // // // // // // // //         <div className="form-group">
// // // // // // // // //         <div>
// // // // // // // // //   <label htmlFor="identityImage">Identity Image:</label>
// // // // // // // // //   {identityImagePreview && (
// // // // // // // // //     <div>
// // // // // // // // //       <img src={identityImagePreview} alt="Identity Image Preview" style={{ maxWidth: '100px', maxHeight: '100px' }} className="image-preview" />
// // // // // // // // //       <button type="button" onClick={() => downloadImage(`${apiUrl}/student/images/${studentId}/identity`, `${formData.firstName}_${formData.lastName}_${formData.studentId}_identity.jpg`)} className="download-button">Download</button>

// // // // // // // // //     </div>
// // // // // // // // //   )}
// // // // // // // // //   <input type="file" id="identityImage" name="identityImage" accept="image/*" onChange={handleIdentityImageChange} />
// // // // // // // // // </div>
// // // // // // // // // <div>
// // // // // // // // //   <label htmlFor="photo">Photo:</label>
// // // // // // // // //   {photoPreview && (
// // // // // // // // //     <div>
// // // // // // // // //       <img src={photoPreview} alt="Photo Preview" style={{ maxWidth: '100px', maxHeight: '100px' }} className="image-preview" />
// // // // // // // // //       <button type="button" onClick={() => downloadImage(`${apiUrl}/student/images/${studentId}/photo`, `${formData.firstName}_${formData.lastName}_${formData.studentId}_photo.jpg`)} className="download-button">Download</button>

// // // // // // // // //     </div>
// // // // // // // // //   )}
// // // // // // // // //   <input type="file" id="image" name="image" accept="image/*" onChange={handlePhotoChange} />
// // // // // // // // // </div>

// // // // // // // // // </div>


        
// // // // // // // // //         <div>
// // // // // // // // //   <label htmlFor="identityType">Identity Type:</label>
// // // // // //   // <select id="identityType" name="identityType" value={formData.identityType} onChange={handleChange}>
// // // // // //   // <option value="Driving License">Driving License</option>
// // // // // //   //                   <option value="Aadhaar Card">Aadhaar Card</option>
// // // // // //   //                   <option value="Pan Card">Pan Card</option>
// // // // // //   //                   <option value="Voter ID">Voter ID</option>
// // // // // //   //                   <option value="College ID">College ID</option>
// // // // // //   //                   <option value="Other">Other</option>
// // // // // //   // </select>
// // // // // // // // // </div>
// // // // // // // // // <div>
// // // // // // // // //   <label htmlFor="identityNo">Identity Number:</label>
// // // // // // // // //   <input type="text" id="identityNo" name="identityNo" value={formData.identityNo} onChange={handleChange} />
// // // // // // // // // </div>

// // // // // // // // //         <div className="form-group" style={{marginTop:"20px"}}>
// // // // // // // // //           <Button type="reset" color="secondary" onClick={handleReset}>Reset</Button>
// // // // // // // // //           <Button type="submit" color="primary">Submit</Button>

// // // // // // // // //         </div>
// // // // // // // // //       </form>
// // // // // // // // //       {error && <p>Error: {error}</p>}
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }

// // // // // // // // // export default EnrollmentForm;

// // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // import axios from 'axios';
// // // // // // // import { useLocation, useNavigate,useParams } from 'react-router-dom';
// // // // // // // import { Button } from 'reactstrap';
// // // // // // // import './StudentRegistration.css';

// // // // // // // function EnrollmentForm({setEnrollmentId}) {
// // // // // // //   const location = useLocation();
// // // // // // //   const navigate = useNavigate();
// // // // // // //   const apiUrl = process.env.REACT_APP_API_BASE_URL;
// // // // // // //   // const location = useLocation();
// // // // // // //   const { studentId: pathStudentId } = useParams(); // For path parameter (/students/:studentId)
// // // // // // //   const queryParams = new URLSearchParams(location.search);
// // // // // // //   const queryStudentId = queryParams.get('studentId'); // For query parameter (?studentId=g3u299w)
// // // // // // //   const studentId = pathStudentId || queryStudentId; // Use path parameter if available, otherwise use query parameter

// // // // // // //   // // Extracting studentId from query parameter
// // // // // // //   // const searchParams = new URLSearchParams(location.search);
// // // // // // //   // const studentId = searchParams.get('studentId');

// // // // // // //   const [formData, setFormData] = useState({
// // // // // // //     studentId,
// // // // // // //     firstName: '',
// // // // // // //     middleName: '',
// // // // // // //     lastName: '',
// // // // // // //     mobile: '',
// // // // // // //     email: '',
// // // // // // //     dob: '',
// // // // // // //     city: '',
// // // // // // //     state: '',
// // // // // // //     pincode: '',
// // // // // // //     occupation: '',
// // // // // // //     courseId: '',
// // // // // // //     address: '',
// // // // // // //     gender: '',
// // // // // // //     photo: null,
// // // // // // //     identityImage: null,
// // // // // // //     identityType: '',
// // // // // // //     identityNo: '',
// // // // // // //   });

// // // // // // //   const [courses, setCourses] = useState([]);
// // // // // // //   const [message, setMessage] = useState('');
// // // // // // //   const [error, setError] = useState(null);
// // // // // // //   const [photoPreview, setPhotoPreview] = useState(null);
// // // // // // //   const [identityImagePreview, setIdentityImagePreview] = useState(null);

// // // // // // //   useEffect(() => {
// // // // // // //     axios
// // // // // // //       .get(`${apiUrl}/courses`)
// // // // // // //       .then((response) => setCourses(response.data))
// // // // // // //       .catch(() => setMessage('Failed to fetch courses'));
// // // // // // //   }, []);

// // // // // // //   useEffect(() => {
// // // // // // //     if (studentId) {
// // // // // // //       axios
// // // // // // //         .get(`${apiUrl}/students/${studentId}`)
// // // // // // //         .then((response) => {
// // // // // // //           setFormData((prevFormData) => ({ ...prevFormData, ...response.data }));
// // // // // // //           if (response.data.photo) {
// // // // // // //             setPhotoPreview(`${apiUrl}/student/image/${studentId}`);
// // // // // // //           }
// // // // // // //           if (response.data.identityImage) {
// // // // // // //             setIdentityImagePreview(`${apiUrl}/student/imageidentity/${studentId}`);
// // // // // // //           }
// // // // // // //         })
// // // // // // //         .catch(() => setMessage('Failed to fetch student details'));
// // // // // // //     }
// // // // // // //   }, [studentId]);

// // // // // // //   const handleChange = (e) => {
// // // // // // //     const { name, value } = e.target;
// // // // // // //     setFormData((prevState) => ({
// // // // // // //       ...prevState,
// // // // // // //       [name]: value,
// // // // // // //     }));
// // // // // // //   };

// // // // // // //   const handlePhotoChange = (event) => {
// // // // // // //     const file = event.target.files[0];
// // // // // // //     setFormData((prevFormData) => ({ ...prevFormData, photo: file }));
// // // // // // //     const reader = new FileReader();
// // // // // // //     reader.onload = () => {
// // // // // // //       setPhotoPreview(reader.result);
// // // // // // //     };
// // // // // // //     reader.readAsDataURL(file);
// // // // // // //   };

// // // // // // //   const handleIdentityImageChange = (event) => {
// // // // // // //     const file = event.target.files[0];
// // // // // // //     setFormData((prevFormData) => ({ ...prevFormData, identityImage: file }));
// // // // // // //     const reader = new FileReader();
// // // // // // //     reader.onload = () => {
// // // // // // //       setIdentityImagePreview(reader.result);
// // // // // // //     };
// // // // // // //     reader.readAsDataURL(file);
// // // // // // //   };

// // // // // // //   const downloadImage = async (url, filename) => {
// // // // // // //     try {
// // // // // // //       const response = await fetch(url, {
// // // // // // //         credentials: 'include' // Include cookies in the request
// // // // // // //         // You may also need to include additional headers like Authorization if using JWT tokens
// // // // // // //       });
// // // // // // //       if (!response.ok) {
// // // // // // //         throw new Error(`Failed to download image: ${response.status} ${response.statusText}`);
// // // // // // //       }
// // // // // // //       const blob = await response.blob();
// // // // // // //       const objectURL = URL.createObjectURL(blob);
// // // // // // //       const link = document.createElement('a');
// // // // // // //       link.href = objectURL;
// // // // // // //       link.setAttribute('download', filename);
// // // // // // //       document.body.appendChild(link);
// // // // // // //       link.click();
// // // // // // //       document.body.removeChild(link);
// // // // // // //     } catch (error) {
// // // // // // //       // Handle the error gracefully, e.g., display an error message to the user
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // const handleSubmit = async (e) => {
// // // // // // //   //   e.preventDefault();
// // // // // // //   //   const { photo, identityImage, identityType, identityNo, ...studentData } = formData;

// // // // // // //   //   try {
// // // // // // //   //     // Update student data
// // // // // // //   //     await axios.patch(`${apiUrl}/students/${studentId}`, {
// // // // // // //   //       ...studentData,
// // // // // // //   //       identityType,
// // // // // // //   //       identityNo,
// // // // // // //   //     });

// // // // // // //   //     // Upload documents only if there is a change in the image
// // // // // // //   //     if (photo || identityImage) {
// // // // // // //   //       const studentFormData = new FormData();
// // // // // // //   //       if (photo) {
// // // // // // //   //         studentFormData.append('image', photo);
// // // // // // //   //       }
// // // // // // //   //       if (identityImage) {
// // // // // // //   //         studentFormData.append('identityImage', identityImage);
// // // // // // //   //       }

// // // // // // //   //       try {
// // // // // // //   //         await axios.patch(`${apiUrl}/student/image/${studentId}`, studentFormData);
// // // // // // //   //       } catch (error) {
// // // // // // //   //         setError('Failed to patch images');
// // // // // // //   //       }
// // // // // // //   //     }

// // // // // // //   //     // Enroll student
// // // // // // //   //     await axios.post(`${apiUrl}/enroll`, {
// // // // // // //   //       studentId,
// // // // // // //   //       courseId: studentData.courseId,
// // // // // // //   //     });
      
// // // // // // //   //     navigate('/courses/viewenrollments');
// // // // // // //   //   } catch (error) {
// // // // // // //   //     setError('Failed to enroll/update student');
// // // // // // //   //   }
// // // // // // //   // };

// // // // // // //   const handleSubmit = async (e) => {
// // // // // // //     e.preventDefault();
// // // // // // //     const { photo, identityImage, identityType, identityNo, ...studentData } = formData;

// // // // // // //     try {
// // // // // // //       // Update student data
// // // // // // //       await axios.patch(`${apiUrl}/students/${studentId}`, {
// // // // // // //         ...studentData,
// // // // // // //         identityType,
// // // // // // //         identityNo,
// // // // // // //       });

// // // // // // //       // Upload documents only if there is a change in the image
// // // // // // //       if (photo || identityImage) {
// // // // // // //         const studentFormData = new FormData();
// // // // // // //         if (photo) {
// // // // // // //           studentFormData.append('image', photo);
// // // // // // //         }
// // // // // // //         if (identityImage) {
// // // // // // //           studentFormData.append('identityImage', identityImage);
// // // // // // //         }

// // // // // // //         try {
// // // // // // //           await axios.patch(`${apiUrl}/student/image/${studentId}`, studentFormData);
// // // // // // //         } catch (error) {
// // // // // // //           setError('Failed to patch images');
// // // // // // //         }
// // // // // // //       }

// // // // // // //       // Enroll student
// // // // // // //       const enrollResponse = await axios.post(`${apiUrl}/enroll`, {
// // // // // // //         studentId,
// // // // // // //         courseId: studentData.courseId,
// // // // // // //       });

// // // // // // //       // Set the enrollment ID
// // // // // // //       setEnrollmentId(enrollResponse.data.enrollmentId);
      
// // // // // // //       navigate('/courses/viewenrollments');
// // // // // // //     } catch (error) {
// // // // // // //       setError('Failed to enroll/update student');
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleReset = () => {
// // // // // // //     setFormData({
// // // // // // //       studentId,
// // // // // // //       firstName: '',
// // // // // // //       middleName: '',
// // // // // // //       lastName: '',
// // // // // // //       mobile: '',
// // // // // // //       email: '',
// // // // // // //       dob: '',
// // // // // // //       city: '',
// // // // // // //       state: '',
// // // // // // //       pincode: '',
// // // // // // //       occupation: '',
// // // // // // //       courseId: '',
// // // // // // //       address: '',
// // // // // // //       gender: '',
// // // // // // //       photo: null,
// // // // // // //       identityImage: null,
// // // // // // //       identityType: '',
// // // // // // //       identityNo: '',
// // // // // // //     });
// // // // // // //     setPhotoPreview(null);
// // // // // // //     setIdentityImagePreview(null);
// // // // // // //   };
// // // // // // import React, { useState, useEffect } from 'react';
// // // // // // import axios from 'axios';
// // // // // // import { useLocation, useNavigate, useParams } from 'react-router-dom';
// // // // // // import { Button } from 'reactstrap';
// // // // // // import { useMultiStepForm } from './MultiStepFormContext';
// // // // // // import './StudentRegistration.css';

// // // // // // function EnrollmentForm({ onEnrollmentSubmit }) {
// // // // // //   const location = useLocation();
// // // // // //   const navigate = useNavigate();
// // // // // //   const apiUrl = process.env.REACT_APP_API_BASE_URL;
// // // // // //   const { studentId: pathStudentId } = useParams();
// // // // // //   const queryParams = new URLSearchParams(location.search);
// // // // // //   const queryStudentId = queryParams.get('studentId');
// // // // // //   const studentId = pathStudentId || queryStudentId;

// // // // // //   const { setEnrollmentId } = useMultiStepForm();  // Import the context

// // // // // //   const [formData, setFormData] = useState({
// // // // // //     studentId,
// // // // // //     firstName: '',
// // // // // //     middleName: '',
// // // // // //     lastName: '',
// // // // // //     mobile: '',
// // // // // //     email: '',
// // // // // //     dob: '',
// // // // // //     city: '',
// // // // // //     state: '',
// // // // // //     pincode: '',
// // // // // //     occupation: '',
// // // // // //     courseId: '',
// // // // // //     address: '',
// // // // // //     gender: '',
// // // // // //     photo: null,
// // // // // //     identityImage: null,
// // // // // //     identityType: '',
// // // // // //     identityNo: '',
// // // // // //   });

// // // // // //   const [courses, setCourses] = useState([]);
// // // // // //   const [message, setMessage] = useState('');
// // // // // //   const [error, setError] = useState(null);
// // // // // //   const [photoPreview, setPhotoPreview] = useState(null);
// // // // // //   const [identityImagePreview, setIdentityImagePreview] = useState(null);

// // // // // //   useEffect(() => {
// // // // // //     axios
// // // // // //       .get(`${apiUrl}/courses`)
// // // // // //       .then((response) => setCourses(response.data))
// // // // // //       .catch(() => setMessage('Failed to fetch courses'));
// // // // // //   }, []);

// // // // // //   useEffect(() => {
// // // // // //     if (studentId) {
// // // // // //       axios
// // // // // //         .get(`${apiUrl}/students/${studentId}`)
// // // // // //         .then((response) => {
// // // // // //           setFormData((prevFormData) => ({ ...prevFormData, ...response.data }));
// // // // // //           if (response.data.photo) {
// // // // // //             setPhotoPreview(`${apiUrl}/student/image/${studentId}`);
// // // // // //           }
// // // // // //           if (response.data.identityImage) {
// // // // // //             setIdentityImagePreview(`${apiUrl}/student/imageidentity/${studentId}`);
// // // // // //           }
// // // // // //         })
// // // // // //         .catch(() => setMessage('Failed to fetch student details'));
// // // // // //     }
// // // // // //   }, [studentId]);

// // // // // //   const handleChange = (e) => {
// // // // // //     const { name, value } = e.target;
// // // // // //     setFormData((prevState) => ({
// // // // // //       ...prevState,
// // // // // //       [name]: value,
// // // // // //     }));
// // // // // //   };

// // // // // //   const handlePhotoChange = (event) => {
// // // // // //     const file = event.target.files[0];
// // // // // //     setFormData((prevFormData) => ({ ...prevFormData, photo: file }));
// // // // // //     const reader = new FileReader();
// // // // // //     reader.onload = () => {
// // // // // //       setPhotoPreview(reader.result);
// // // // // //     };
// // // // // //     reader.readAsDataURL(file);
// // // // // //   };

// // // // // //   const handleIdentityImageChange = (event) => {
// // // // // //     const file = event.target.files[0];
// // // // // //     setFormData((prevFormData) => ({ ...prevFormData, identityImage: file }));
// // // // // //     const reader = new FileReader();
// // // // // //     reader.onload = () => {
// // // // // //       setIdentityImagePreview(reader.result);
// // // // // //     };
// // // // // //     reader.readAsDataURL(file);
// // // // // //   };

// // // // // //   const downloadImage = async (url, filename) => {
// // // // // //     try {
// // // // // //       const response = await fetch(url, {
// // // // // //         credentials: 'include'
// // // // // //       });
// // // // // //       if (!response.ok) {
// // // // // //         throw new Error(`Failed to download image: ${response.status} ${response.statusText}`);
// // // // // //       }
// // // // // //       const blob = await response.blob();
// // // // // //       const objectURL = URL.createObjectURL(blob);
// // // // // //       const link = document.createElement('a');
// // // // // //       link.href = objectURL;
// // // // // //       link.setAttribute('download', filename);
// // // // // //       document.body.appendChild(link);
// // // // // //       link.click();
// // // // // //       document.body.removeChild(link);
// // // // // //     } catch (error) {
// // // // // //       // Handle the error gracefully
// // // // // //     }
// // // // // //   };

// // // // // //   // const handleSubmit = async (e) => {
// // // // // //   //   e.preventDefault();
// // // // // //   //   const { photo, identityImage, identityType, identityNo, ...studentData } = formData;

// // // // // //   //   try {
// // // // // //   //     // Update student data
// // // // // //   //     await axios.patch(`${apiUrl}/students/${studentId}`, {
// // // // // //   //       ...studentData,
// // // // // //   //       identityType,
// // // // // //   //       identityNo,
// // // // // //   //     });

// // // // // //   //     // Upload documents only if there is a change in the image
// // // // // //   //     if (photo || identityImage) {
// // // // // //   //       const studentFormData = new FormData();
// // // // // //   //       if (photo) {
// // // // // //   //         studentFormData.append('image', photo);
// // // // // //   //       }
// // // // // //   //       if (identityImage) {
// // // // // //   //         studentFormData.append('identityImage', identityImage);
// // // // // //   //       }

// // // // // //   //       try {
// // // // // //   //         await axios.patch(`${apiUrl}/student/image/${studentId}`, studentFormData);
// // // // // //   //       } catch (error) {
// // // // // //   //         setError('Failed to patch images');
// // // // // //   //       }
// // // // // //   //     }

// // // // // //   //     // Enroll student
// // // // // //   //     const enrollResponse = await axios.post(`${apiUrl}/enroll`, {
// // // // // //   //       studentId,
// // // // // //   //       courseId: studentData.courseId,
// // // // // //   //     });

// // // // // //   //     // Set the enrollment ID
// // // // // //   //     setEnrollmentId(enrollResponse.data.enrollmentId);
      
// // // // // //   //     navigate('/courses/viewenrollments');
// // // // // //   //   } catch (error) {
// // // // // //   //     setError('Failed to enroll/update student');
// // // // // //   //   }
// // // // // //   // };
// // // // // //   const handleSubmit = async (e) => {
// // // // // //     e.preventDefault();
// // // // // //     const { photo, identityImage, identityType, identityNo, ...studentData } = formData;

// // // // // //     try {
// // // // // //       // Update student data
// // // // // //       await axios.patch(`${apiUrl}/students/${studentId}`, {
// // // // // //         ...studentData,
// // // // // //         identityType,
// // // // // //         identityNo,
// // // // // //       });

// // // // // //       // Upload documents only if there is a change in the image
// // // // // //       if (photo || identityImage) {
// // // // // //         const studentFormData = new FormData();
// // // // // //         if (photo) {
// // // // // //           studentFormData.append('image', photo);
// // // // // //         }
// // // // // //         if (identityImage) {
// // // // // //           studentFormData.append('identityImage', identityImage);
// // // // // //         }

// // // // // //         try {
// // // // // //           await axios.patch(`${apiUrl}/student/image/${studentId}`, studentFormData);
// // // // // //         } catch (error) {
// // // // // //           setError('Failed to patch images');
// // // // // //         }
// // // // // //       }

// // // // // //       // Enroll student
// // // // // //       const enrollResponse = await axios.post(`${apiUrl}/enroll`, {
// // // // // //         studentId,
// // // // // //         courseId: studentData.courseId,
// // // // // //       });

// // // // // //       // Set the enrollment ID
// // // // // //       setEnrollmentId(enrollResponse.data.enrollmentId);
// // // // // //       console.log(`Enrollment Id passed ${enrollResponse.data.enrollmentId}`);

// // // // // //       // Notify parent component about the enrollment submission
// // // // // //       if (onEnrollmentSubmit) {
// // // // // //         onEnrollmentSubmit(enrollResponse.data.enrollmentId);
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       setError('Failed to enroll/update student');
// // // // // //     }
// // // // // //   };

// // // // // //   const handleReset = () => {
// // // // // //     setFormData({
// // // // // //       studentId,
// // // // // //       firstName: '',
// // // // // //       middleName: '',
// // // // // //       lastName: '',
// // // // // //       mobile: '',
// // // // // //       email: '',
// // // // // //       dob: '',
// // // // // //       city: '',
// // // // // //       state: '',
// // // // // //       pincode: '',
// // // // // //       occupation: '',
// // // // // //       courseId: '',
// // // // // //       address: '',
// // // // // //       gender: '',
// // // // // //       photo: null,
// // // // // //       identityImage: null,
// // // // // //       identityType: '',
// // // // // //       identityNo: '',
// // // // // //     });
// // // // // //     setPhotoPreview(null);
// // // // // //     setIdentityImagePreview(null);
// // // // // //   };
// // // // // //   return (
// // // // // //     <div className="container">
// // // // // //       <h2>ENROLLMENT FORM</h2>
// // // // // //       {message && <p className="error-message">{message}</p>}
// // // // // //       <form onSubmit={handleSubmit}>
// // // // // //         <div className="form-group-row">
// // // // // //           <div className="form-column">
// // // // // //             <label htmlFor="studentId">Student ID:</label>
// // // // // //             <input type="text" id="studentId" name="studentId" placeholder="Enter Student ID" required value={formData.studentId} readOnly />
// // // // // //             <br />
// // // // // //           </div>
// // // // // //         </div>
// // // // // //         <div className="form-group-row">
// // // // // //           <div className="form-column">
// // // // // //             <label htmlFor="firstName">First Name:</label>
// // // // // //             <input type="text" id="firstName" name="firstName" placeholder="Enter First Name" required value={formData.firstName} onChange={handleChange} />
// // // // // //           </div>
// // // // // //           <div className="form-column">
// // // // // //             <label htmlFor="middleName">Middle Name:</label>
// // // // // //             <input type="text" id="middleName" name="middleName" placeholder="Enter Middle Name" value={formData.middleName} onChange={handleChange} />
// // // // // //           </div>
// // // // // //           <div className="form-column">
// // // // // //             <label htmlFor="lastName">Last Name:</label>
// // // // // //             <input type="text" id="lastName" name="lastName" placeholder="Enter Last Name" required value={formData.lastName} onChange={handleChange} />
// // // // // //           </div>
// // // // // //         </div>
// // // // // //         <div className="form-group-row">
// // // // // //           <div className="form-column">
// // // // // //             <label htmlFor="mobile">Mobile Number:</label>
// // // // // //             <input type="tel" id="mobile" name="mobile" pattern="[0-9]{10}" placeholder="Enter Mobile" required value={formData.mobile} onChange={handleChange} />
// // // // // //           </div>
// // // // // //           <div className="form-column">
// // // // // //             <label htmlFor="email">Email:</label>
// // // // // //             <input type="email" id="email" name="email" placeholder="Enter Email" required value={formData.email} onChange={handleChange} />
// // // // // //           </div>
// // // // // //           <div className="form-column">
// // // // // //             <label htmlFor="dob">Date of Birth:</label>
// // // // // //             <input type="date" id="dob" name="dob" required value={formData.dob} onChange={handleChange} />
// // // // // //           </div>
// // // // // //         </div>
// // // // // //         <div className="form-group-row">
// // // // // //           <div className="form-column">
// // // // // //             <label htmlFor="city">City:</label>
// // // // // //             <input type="text" id="city" name="city" placeholder="Enter City" required value={formData.city} onChange={handleChange} />
// // // // // //           </div>
// // // // // //           <div className="form-column">
// // // // // //             <label htmlFor="state">State:</label>
// // // // // //             <input type="text" id="state" name="state" placeholder="Enter State" required value={formData.state} onChange={handleChange} />
// // // // // //           </div>
// // // // // //           <div className="form-column">
// // // // // //             <label htmlFor="pincode">Pincode:</label>
// // // // // //             <input type="text" id="pincode" name="pincode" placeholder="Enter Pincode" required value={formData.pincode} onChange={handleChange} />
// // // // // //           </div>
// // // // // //         </div>
// // // // // //         <div className="form-group">
// // // // // //           <label htmlFor="occupation">Occupation:</label>
// // // // // //           <input type="text" id="occupation" name="occupation" placeholder="Enter Occupation" value={formData.occupation} onChange={handleChange} />
// // // // // //         </div>
// // // // // //         <div className="form-group">
// // // // // //           <label htmlFor="address">Address:</label>
// // // // // //           <textarea id="address" name="address" rows="4" placeholder="Enter Address" required value={formData.address} onChange={handleChange}></textarea>
// // // // // //         </div>
// // // // // //         <div className="form-group">
// // // // // //           <label>Gender:</label>
// // // // // //           <input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} /> Male
// // // // // //           <input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} /> Female
// // // // // // <input type="radio" name="gender" value="Other" checked={formData.gender === 'Other'} onChange={handleChange} /> Other
// // // // // // </div>
// // // // // // <div className="form-group-row">
// // // // // // <div className="form-column">
// // // // // // <label htmlFor="courseId">Course:</label>
// // // // // // <select id="courseId" name="courseId" required value={formData.courseId} onChange={handleChange}>
// // // // // //   <option value="">Select a Course</option>
// // // // // //   {courses.map((course) => (
// // // // // //     <option key={course.courseId} value={course.courseId}>{course.name}</option>
// // // // // //   ))}
// // // // // // </select>

// // // // // // </div>
// // // // // // </div>
// // // // // // {/* <div className="form-group-row">
// // // // // // <div className="form-column">
// // // // // // <label htmlFor="identityType">Identity Type:</label>
// // // // // // {/* <input type="text" id="identityType" name="identityType" placeholder="Enter Identity Type" required value={formData.identityType} onChange={handleChange} /> 
// // // // // // <select id="identityType" name="identityType" value={formData.identityType} onChange={handleChange}>
// // // // // //   <option value="Driving License">Driving License</option>
// // // // // //                     <option value="Aadhaar Card">Aadhaar Card</option>
// // // // // //                     <option value="Pan Card">Pan Card</option>
// // // // // //                     <option value="Voter ID">Voter ID</option>
// // // // // //                     <option value="College ID">College ID</option>
// // // // // //                     <option value="Other">Other</option>
// // // // // //   </select>
// // // // // // </div>
// // // // // // <div className="form-column">
// // // // // // <label htmlFor="identityNo">Identity Number:</label>
// // // // // // <input type="text" id="identityNo" name="identityNo" placeholder="Enter Identity Number" required value={formData.identityNo} onChange={handleChange} />
// // // // // // </div>
// // // // // // </div>
// // // // // // <div className="form-group-row">
// // // // // // <div className="form-column">
// // // // // // <label htmlFor="photo">Student Photo:</label>
// // // // // // <input type="file" id="photo" name="photo" accept="image/*" onChange={handlePhotoChange} />
// // // // // // {photoPreview && (
// // // // // // <div className="image-preview">
// // // // // // <img src={photoPreview} alt="Student" />
// // // // // // <Button color="danger" onClick={() => downloadImage(photoPreview, 'photo.png')}>
// // // // // // Download
// // // // // // </Button>
// // // // // // </div>
// // // // // // )}
// // // // // // </div>
// // // // // // <div className="form-column">
// // // // // // <label htmlFor="identityImage">Identity Image:</label>
// // // // // // <input type="file" id="identityImage" name="identityImage" accept="image/*" onChange={handleIdentityImageChange} />
// // // // // // {identityImagePreview && (
// // // // // // <div className="image-preview">
// // // // // // <img src={identityImagePreview} alt="Identity" />
// // // // // // <Button color="danger" onClick={() => downloadImage(identityImagePreview, 'identity.png')}>
// // // // // // Download
// // // // // // </Button>
// // // // // // </div>
// // // // // // )}
// // // // // // </div>
// // // // // // </div> 
// // // // // // */}
// // // // // // {error && <p className="error-message">{error}</p>}
// // // // // // <div className="form-actions">
// // // // // // <Button type="submit" color="primary">Submit</Button>
// // // // // // <Button type="button" color="secondary" onClick={handleReset}>Reset</Button>
// // // // // // </div>
// // // // // // </form>
// // // // // // </div>
// // // // // // );
// // // // // // }

// // // // // // export default EnrollmentForm;

// // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // import axios from 'axios';
// // // // // // // import { useLocation, useParams, useNavigate } from 'react-router-dom';
// // // // // // // import { Button } from 'reactstrap';
// // // // // // // import './StudentRegistration.css';

// // // // // // // function EnrollmentForm() {
// // // // // // //   const location = useLocation();
// // // // // // //   const { studentId: pathStudentId } = useParams(); // For path parameter (/students/:studentId)
// // // // // // //   const queryParams = new URLSearchParams(location.search);
// // // // // // //   const queryStudentId = queryParams.get('studentId'); // For query parameter (?studentId=g3u299w)
// // // // // // //   const studentId = pathStudentId || queryStudentId; // Use path parameter if available, otherwise use query parameter

// // // // // // //   const navigate = useNavigate();
// // // // // // //   const apiUrl = process.env.REACT_APP_API_BASE_URL;

// // // // // // //   const [formData, setFormData] = useState({
// // // // // // //     studentId,
// // // // // // //     firstName: '',
// // // // // // //     middleName: '',
// // // // // // //     lastName: '',
// // // // // // //     mobile: '',
// // // // // // //     email: '',
// // // // // // //     dob: '',
// // // // // // //     city: '',
// // // // // // //     state: '',
// // // // // // //     pincode: '',
// // // // // // //     occupation: '',
// // // // // // //     courseId: '',
// // // // // // //     address: '',
// // // // // // //     gender: '',
// // // // // // //     photo: null,
// // // // // // //     identityImage: null,
// // // // // // //     identityType: '',
// // // // // // //     identityNo: '',
// // // // // // //   });

// // // // // // //   const [courses, setCourses] = useState([]);
// // // // // // //   const [message, setMessage] = useState('');
// // // // // // //   const [error, setError] = useState(null);
// // // // // // //   const [photoPreview, setPhotoPreview] = useState(null);
// // // // // // //   const [identityImagePreview, setIdentityImagePreview] = useState(null);

// // // // // // //   useEffect(() => {
// // // // // // //     axios
// // // // // // //       .get(`${apiUrl}/courses`)
// // // // // // //       .then((response) => setCourses(response.data))
// // // // // // //       .catch(() => setMessage('Failed to fetch courses'));
// // // // // // //   }, []);

// // // // // // //   useEffect(() => {
// // // // // // //     if (studentId) {
// // // // // // //       axios
// // // // // // //         .get(`${apiUrl}/students/${studentId}`)
// // // // // // //         .then((response) => {
// // // // // // //           setFormData((prevFormData) => ({ ...prevFormData, ...response.data }));
// // // // // // //           if (response.data.photo) {
// // // // // // //             setPhotoPreview(`${apiUrl}/student/image/${studentId}`);
// // // // // // //           }
// // // // // // //           if (response.data.identityImage) {
// // // // // // //             setIdentityImagePreview(`${apiUrl}/student/imageidentity/${studentId}`);
// // // // // // //           }
// // // // // // //         })
// // // // // // //         .catch(() => setMessage('Failed to fetch student details'));
// // // // // // //     }
// // // // // // //   }, [studentId]);

// // // // // // //   const handleChange = (e) => {
// // // // // // //     const { name, value } = e.target;
// // // // // // //     setFormData((prevState) => ({
// // // // // // //       ...prevState,
// // // // // // //       [name]: value,
// // // // // // //     }));
// // // // // // //   };

// // // // // // //   const handlePhotoChange = (event) => {
// // // // // // //     const file = event.target.files[0];
// // // // // // //     setFormData((prevFormData) => ({ ...prevFormData, photo: file }));
// // // // // // //     const reader = new FileReader();
// // // // // // //     reader.onload = () => {
// // // // // // //       setPhotoPreview(reader.result);
// // // // // // //     };
// // // // // // //     reader.readAsDataURL(file);
// // // // // // //   };

// // // // // // //   const handleIdentityImageChange = (event) => {
// // // // // // //     const file = event.target.files[0];
// // // // // // //     setFormData((prevFormData) => ({ ...prevFormData, identityImage: file }));
// // // // // // //     const reader = new FileReader();
// // // // // // //     reader.onload = () => {
// // // // // // //       setIdentityImagePreview(reader.result);
// // // // // // //     };
// // // // // // //     reader.readAsDataURL(file);
// // // // // // //   };

// // // // // // //   const downloadImage = async (url, filename) => {
// // // // // // //     try {
// // // // // // //       const response = await fetch(url, {
// // // // // // //         credentials: 'include' // Include cookies in the request
// // // // // // //         // You may also need to include additional headers like Authorization if using JWT tokens
// // // // // // //       });
// // // // // // //       if (!response.ok) {
// // // // // // //         throw new Error(`Failed to download image: ${response.status} ${response.statusText}`);
// // // // // // //       }
// // // // // // //       const blob = await response.blob();
// // // // // // //       const objectURL = URL.createObjectURL(blob);
// // // // // // //       const link = document.createElement('a');
// // // // // // //       link.href = objectURL;
// // // // // // //       link.setAttribute('download', filename);
// // // // // // //       document.body.appendChild(link);
// // // // // // //       link.click();
// // // // // // //       document.body.removeChild(link);
// // // // // // //     } catch (error) {
// // // // // // //       // Handle the error gracefully, e.g., display an error message to the user
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleSubmit = async (e) => {
// // // // // // //     e.preventDefault();
// // // // // // //     const { photo, identityImage, identityType, identityNo, ...studentData } = formData;

// // // // // // //     try {
// // // // // // //       // Update student data
// // // // // // //       await axios.patch(`${apiUrl}/students/${studentId}`, {
// // // // // // //         ...studentData,
// // // // // // //         identityType,
// // // // // // //         identityNo,
// // // // // // //       });

// // // // // // //       // Upload documents only if there is a change in the image
// // // // // // //       if (photo || identityImage) {
// // // // // // //         const studentFormData = new FormData();
// // // // // // //         if (photo) {
// // // // // // //           studentFormData.append('image', photo);
// // // // // // //         }
// // // // // // //         if (identityImage) {
// // // // // // //           studentFormData.append('identityImage', identityImage);
// // // // // // //         }

// // // // // // //         try {
// // // // // // //           await axios.patch(`${apiUrl}/student/image/${studentId}`, studentFormData);
// // // // // // //         } catch (error) {
// // // // // // //           setError('Failed to patch images');
// // // // // // //         }
// // // // // // //       }

// // // // // // //       // Enroll student
// // // // // // //       await axios.post(`${apiUrl}/enroll`, {
// // // // // // //         studentId,
// // // // // // //         courseId: studentData.courseId,
// // // // // // //       });
      
// // // // // // //       navigate('/courses/viewenrollments');
// // // // // // //     } catch (error) {
// // // // // // //       setError('Failed to enroll/update student');
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleReset = () => {
// // // // // // //     setFormData({
// // // // // // //       studentId,
// // // // // // //       firstName: '',
// // // // // // //       middleName: '',
// // // // // // //       lastName: '',
// // // // // // //       mobile: '',
// // // // // // //       email: '',
// // // // // // //       dob: '',
// // // // // // //       city: '',
// // // // // // //       state: '',
// // // // // // //       pincode: '',
// // // // // // //       occupation: '',
// // // // // // //       courseId: '',
// // // // // // //       address: '',
// // // // // // //       gender: '',
// // // // // // //       photo: null,
// // // // // // //       identityImage: null,
// // // // // // //       identityType: '',
// // // // // // //       identityNo: '',
// // // // // // //     });
// // // // // // //     setPhotoPreview(null);
// // // // // // //     setIdentityImagePreview(null);
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div className="container">
// // // // // // //       <h2>ENROLLMENT FORM</h2>
// // // // // // //       {message && <p className="error-message">{message}</p>}
// // // // // // //       <form onSubmit={handleSubmit}>
// // // // // // //         <div className="form-group-row">
// // // // // // //           <div className="form-column">
// // // // // // //             <label htmlFor="studentId">Student ID:</label>
// // // // // // //             <input type="text" id="studentId" name="studentId" placeholder="Enter Student ID" required value={formData.studentId} readOnly />
// // // // // // //             <br />
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //         <div className="form-group-row">
// // // // // // //           <div className="form-column">
// // // // // // //             <label htmlFor="firstName">First Name:</label>
// // // // // // //             <input type="text" id="firstName" name="firstName" placeholder="Enter First Name" required value={formData.firstName} onChange={handleChange} />
// // // // // // //           </div>
// // // // // // //           <div className="form-column">
// // // // // // //             <label htmlFor="middleName">Middle Name:</label>
// // // // // // //             <input type="text" id="middleName" name="middleName" placeholder="Enter Middle Name" value={formData.middleName} onChange={handleChange} />
// // // // // // //           </div>
// // // // // // //           <div className="form-column">
// // // // // // //             <label htmlFor="lastName">Last Name:</label>
// // // // // // //             <input type="text" id="lastName" name="lastName" placeholder="Enter Last Name" required value={formData.lastName} onChange={handleChange} />
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //         <div className="form-group-row">
// // // // // // //           <div className="form-column">
// // // // // // //             <label htmlFor="mobile">Mobile Number:</label>
// // // // // // //             <input type="tel" id="mobile" name="mobile" pattern="[0-9]{10}" placeholder="Enter Mobile" required value={formData.mobile} onChange={handleChange} />
// // // // // // //           </div>
// // // // // // //           <div className="form-column">
// // // // // // //             <label htmlFor="email">Email:</label>
// // // // // // //             <input type="email" id="email" name="email" placeholder="Enter Email" required value={formData.email} onChange={handleChange} />
// // // // // // //           </div>
// // // // // // //           <div className="form-column">
// // // // // // //             <label htmlFor="dob">Date of Birth:</label>
// // // // // // //             <input type="date" id="dob" name="dob" required value={formData.dob} onChange={handleChange} />
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //         <div className="form-group-row">
// // // // // // //           <div className="form-column">
// // // // // // //             <label htmlFor="city">City:</label>
// // // // // // //             <input type="text" id="city" name="city" placeholder="Enter City" required value={formData.city} onChange={handleChange} />
// // // // // // //           </div>
// // // // // // //           <div className="form-column">
// // // // // // //             <label htmlFor="state">State:</label>
// // // // // // //             <input type="text" id="state" name="state" placeholder="Enter State" required value={formData.state} onChange={handleChange} />
// // // // // // //           </div>
// // // // // // //           <div className="form-column">
// // // // // // //             <label htmlFor="pincode">Pincode:</label>
// // // // // // //             <input type="text" id="pincode" name="pincode" placeholder="Enter Pincode" required value={formData.pincode} onChange={handleChange} />
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //         <div className="form-group">
// // // // // // //           <label htmlFor="occupation">Occupation:</label>
// // // // // // //           <input type="text" id="occupation" name="occupation" placeholder="Enter Occupation" value={formData.occupation} onChange={handleChange} />
// // // // // // //         </div>
// // // // // // //         <div className="form-group">
// // // // // // //           <label htmlFor="address">Address:</label>
// // // // // // //           <textarea id="address" name="address" rows="4" placeholder="Enter Address" required value={formData.address} onChange={handleChange}></textarea>
// // // // // // //         </div>
// // // // // // //         <div className="form-group-row">
// // // // // // //           <div className="form-column">
// // // // // // //             <label htmlFor="gender">Gender:</label>
// // // // // // //             <select id="gender" name="gender" required value={formData.gender} onChange={handleChange}>
// // // // // // //               <option value="">Select Gender</option>
// // // // // // //               <option value="Male">Male</option>
// // // // // // //               <option value="Female">Female</option>
// // // // // // //               <option value="Other">Other</option>
// // // // // // //             </select>
// // // // // // //           </div>
// // // // // // //           <div className="form-column">
// // // // // // //             <label htmlFor="courseId">Select Course:</label>
// // // // // // //             <select id="courseId" name="courseId" required value={formData.courseId} onChange={handleChange}>
// // // // // // //               <option value="">Select Course</option>
// // // // // // //               {courses.map((course) => (
// // // // // // //                 <option key={course.id} value={course.id}>
// // // // // // //                   {course.name}
// // // // // // //                 </option>
// // // // // // //               ))}
// // // // // // //             </select>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //         <div className="form-group-row">
// // // // // // //           <div className="form-column">
// // // // // // //             <label htmlFor="identityType">Identity Type:</label>
// // // // // // //             <input type="text" id="identityType" name="identityType" placeholder="Enter Identity Type" value={formData.identityType} onChange={handleChange} />
// // // // // // //           </div>
// // // // // // //           <div className="form-column">
// // // // // // //             <label htmlFor="identityNo">Identity Number:</label>
// // // // // // //             <input type="text" id="identityNo" name="identityNo" placeholder="Enter Identity Number" value={formData.identityNo} onChange={handleChange} />
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //         <div className="form-group-row">
// // // // // // //           <div className="form-column">
// // // // // // //             <label htmlFor="photo">Student Photo:</label>
// // // // // // //             <input type="file" id="photo" name="photo" accept="image/*" onChange={handlePhotoChange} />
// // // // // // //             {photoPreview && (
// // // // // // //               <div className="image-preview">
// // // // // // //                 <img src={photoPreview} alt="Student Photo Preview" />
// // // // // // //                 <Button onClick={() => downloadImage(photoPreview, 'student-photo.jpg')} color="primary">
// // // // // // //                   Download Photo
// // // // // // //                 </Button>
// // // // // // //               </div>
// // // // // // //             )}
// // // // // // //           </div>
// // // // // // //           <div className="form-column">
// // // // // // //             <label htmlFor="identityImage">Identity Image:</label>
// // // // // // //             <input type="file" id="identityImage" name="identityImage" accept="image/*" onChange={handleIdentityImageChange} />
// // // // // // //             {identityImagePreview && (
// // // // // // //               <div className="image-preview">
// // // // // // //                 <img src={identityImagePreview} alt="Identity Image Preview" />
// // // // // // //                 <Button onClick={() => downloadImage(identityImagePreview, 'identity-image.jpg')} color="primary">
// // // // // // //                   Download Identity Image
// // // // // // //                 </Button>
// // // // // // //               </div>
// // // // // // //             )}
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //         <div className="form-group-row">
// // // // // // //           <div className="form-column">
// // // // // // //             <Button type="submit" color="primary">
// // // // // // //               Enroll
// // // // // // //             </Button>
// // // // // // //           </div>
// // // // // // //           <div className="form-column">
// // // // // // //             <Button type="button" color="secondary" onClick={handleReset}>
// // // // // // //               Reset
// // // // // // //             </Button>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //         {error && <p className="error-message">{error}</p>}
// // // // // // //       </form>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // // export default EnrollmentForm;

// // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // import axios from 'axios';
// // // // // // // import { useLocation, useParams, useNavigate } from 'react-router-dom';
// // // // // // // import { Button } from 'reactstrap';
// // // // // // // import './StudentRegistration.css';

// // // // // // // function EnrollmentForm() {
// // // // // //   // const location = useLocation();
// // // // // //   // const { studentId: pathStudentId } = useParams(); // For path parameter (/students/:studentId)
// // // // // //   // const queryParams = new URLSearchParams(location.search);
// // // // // //   // const queryStudentId = queryParams.get('studentId'); // For query parameter (?studentId=g3u299w)
// // // // // //   // const studentId = pathStudentId || queryStudentId; // Use path parameter if available, otherwise use query parameter

// // // // // // //   const navigate = useNavigate();
// // // // // // //   const apiUrl = process.env.REACT_APP_API_BASE_URL;

// // // // // // //   const [formData, setFormData] = useState({
// // // // // // //     studentId,
// // // // // // //     firstName: '',
// // // // // // //     middleName: '',
// // // // // // //     lastName: '',
// // // // // // //     mobile: '',
// // // // // // //     email: '',
// // // // // // //     dob: '',
// // // // // // //     city: '',
// // // // // // //     state: '',
// // // // // // //     pincode: '',
// // // // // // //     occupation: '',
// // // // // // //     courseId: '',
// // // // // // //     address: '',
// // // // // // //     gender: '',
// // // // // // //     photo: null,
// // // // // // //     identityImage: null,
// // // // // // //     identityType: '',
// // // // // // //     identityNo: '',
// // // // // // //   });

// // // // // // //   const [courses, setCourses] = useState([]);
// // // // // // //   const [message, setMessage] = useState('');
// // // // // // //   const [error, setError] = useState(null);
// // // // // // //   const [photoPreview, setPhotoPreview] = useState(null);
// // // // // // //   const [identityImagePreview, setIdentityImagePreview] = useState(null);

// // // // // // //   useEffect(() => {
// // // // // // //     axios
// // // // // // //       .get(`${apiUrl}/courses`)
// // // // // // //       .then((response) => setCourses(response.data))
// // // // // // //       .catch(() => setMessage('Failed to fetch courses'));
// // // // // // //   }, [apiUrl]);

// // // // // // //   useEffect(() => {
// // // // // // //     if (studentId) {
// // // // // // //       axios
// // // // // // //         .get(`${apiUrl}/students/${studentId}`)
// // // // // // //         .then((response) => {
// // // // // // //           setFormData((prevFormData) => ({ ...prevFormData, ...response.data }));
// // // // // // //           if (response.data.photo) {
// // // // // // //             setPhotoPreview(`${apiUrl}/student/image/${studentId}`);
// // // // // // //           }
// // // // // // //           if (response.data.identityImage) {
// // // // // // //             setIdentityImagePreview(`${apiUrl}/student/imageidentity/${studentId}`);
// // // // // // //           }
// // // // // // //         })
// // // // // // //         .catch(() => setMessage('Failed to fetch student details'));
// // // // // // //     }
// // // // // // //   }, [studentId, apiUrl]);

// // // // // // //   const handleChange = (e) => {
// // // // // // //     const { name, value } = e.target;
// // // // // // //     setFormData((prevState) => ({
// // // // // // //       ...prevState,
// // // // // // //       [name]: value,
// // // // // // //     }));
// // // // // // //   };

// // // // // // //   const handlePhotoChange = (event) => {
// // // // // // //     const file = event.target.files[0];
// // // // // // //     setFormData((prevFormData) => ({ ...prevFormData, photo: file }));
// // // // // // //     const reader = new FileReader();
// // // // // // //     reader.onload = () => {
// // // // // // //       setPhotoPreview(reader.result);
// // // // // // //     };
// // // // // // //     reader.readAsDataURL(file);
// // // // // // //   };

// // // // // // //   const handleIdentityImageChange = (event) => {
// // // // // // //     const file = event.target.files[0];
// // // // // // //     setFormData((prevFormData) => ({ ...prevFormData, identityImage: file }));
// // // // // // //     const reader = new FileReader();
// // // // // // //     reader.onload = () => {
// // // // // // //       setIdentityImagePreview(reader.result);
// // // // // // //     };
// // // // // // //     reader.readAsDataURL(file);
// // // // // // //   };

// // // // // // //   const downloadImage = async (url, filename) => {
// // // // // // //     try {
// // // // // // //       const response = await fetch(url, {
// // // // // // //         credentials: 'include' // Include cookies in the request
// // // // // // //         // You may also need to include additional headers like Authorization if using JWT tokens
// // // // // // //       });
// // // // // // //       if (!response.ok) {
// // // // // // //         throw new Error(`Failed to download image: ${response.status} ${response.statusText}`);
// // // // // // //       }
// // // // // // //       const blob = await response.blob();
// // // // // // //       const objectURL = URL.createObjectURL(blob);
// // // // // // //       const link = document.createElement('a');
// // // // // // //       link.href = objectURL;
// // // // // // //       link.setAttribute('download', filename);
// // // // // // //       document.body.appendChild(link);
// // // // // // //       link.click();
// // // // // // //       document.body.removeChild(link);
// // // // // // //     } catch (error) {
// // // // // // //       // Handle the error gracefully, e.g., display an error message to the user
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleSubmit = async (e) => {
// // // // // // //     e.preventDefault();
// // // // // // //     const { photo, identityImage, identityType, identityNo, ...studentData } = formData;

// // // // // // //     try {
// // // // // // //       // Update student data
// // // // // // //       await axios.patch(`${apiUrl}/students/${studentId}`, {
// // // // // // //         ...studentData,
// // // // // // //         identityType,
// // // // // // //         identityNo,
// // // // // // //       });

// // // // // // //       // Upload documents only if there is a change in the image
// // // // // // //       if (photo || identityImage) {
// // // // // // //         const studentFormData = new FormData();
// // // // // // //         if (photo) {
// // // // // // //           studentFormData.append('image', photo);
// // // // // // //         }
// // // // // // //         if (identityImage) {
// // // // // // //           studentFormData.append('identityImage', identityImage);
// // // // // // //         }

// // // // // // //         try {
// // // // // // //           await axios.patch(`${apiUrl}/student/image/${studentId}`, studentFormData);
// // // // // // //         } catch (error) {
// // // // // // //           setError('Failed to patch images');
// // // // // // //         }
// // // // // // //       }

// // // // // // //       // Enroll student
// // // // // // //       await axios.post(`${apiUrl}/enroll`, {
// // // // // // //         studentId,
// // // // // // //         courseId: studentData.courseId,
// // // // // // //       });

// // // // // // //       navigate('/courses/viewenrollments');
// // // // // // //     } catch (error) {
// // // // // // //       setError('Failed to enroll/update student');
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleReset = () => {
// // // // // // //     setFormData({
// // // // // // //       studentId,
// // // // // // //       firstName: '',
// // // // // // //       middleName: '',
// // // // // // //       lastName: '',
// // // // // // //       mobile: '',
// // // // // // //       email: '',
// // // // // // //       dob: '',
// // // // // // //       city: '',
// // // // // // //       state: '',
// // // // // // //       pincode: '',
// // // // // // //       occupation: '',
// // // // // // //       courseId: '',
// // // // // // //       address: '',
// // // // // // //       gender: '',
// // // // // // //       photo: null,
// // // // // // //       identityImage: null,
// // // // // // //       identityType: '',
// // // // // // //       identityNo: '',
// // // // // // //     });
// // // // // // //     setPhotoPreview(null);
// // // // // // //     setIdentityImagePreview(null);
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div className="container">
// // // // // // //       <h2>ENROLLMENT FORM</h2>
// // // // // // //       {message && <p className="error-message">{message}</p>}
// // // // // // //       <form onSubmit={handleSubmit}>
// // // // // // //         <div className="form-group-row">
// // // // // // //           <div className="form-column">
// // // // // // //             <label htmlFor="studentId">Student ID:</label>
// // // // // // //             <input type="text" id="studentId" name="studentId" placeholder="Enter Student ID" required value={formData.studentId} readOnly />
// // // // // // //             <br />
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //         <div className="form-group-row">
// // // // // // //           <div className="form-column">
// // // // // // //             <label htmlFor="firstName">First Name:</label>
// // // // // // //             <input type="text" id="firstName" name="firstName" placeholder="Enter First Name" required value={formData.firstName} onChange={handleChange} />
// // // // // // //           </div>
// // // // // // //           <div className="form-column">
// // // // // // //             <label htmlFor="middleName">Middle Name:</label>
// // // // // // //             <input type="text" id="middleName" name="middleName" placeholder="Enter Middle Name" value={formData.middleName} onChange={handleChange} />
// // // // // // //           </div>
// // // // // // //           <div className="form-column">
// // // // // // //             <label htmlFor="lastName">Last Name:</label>
// // // // // // //             <input type="text" id="lastName" name="lastName" placeholder="Enter Last Name" required value={formData.lastName} onChange={handleChange} />
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //         <div className="form-group-row">
// // // // // // //           <div className="form-column">
// // // // // // //             <label htmlFor="mobile">Mobile Number:</label>
// // // // // // //             <input type="tel" id="mobile" name="mobile" pattern="[0-9]{10}" placeholder="Enter Mobile" required value={formData.mobile} onChange={handleChange} />
// // // // // // //           </div>
// // // // // // //           <div className="form-column">
// // // // // // //             <label htmlFor="email">Email:</label>
// // // // // // //             <input type="email" id="email" name="email" placeholder="Enter Email" required value={formData.email} onChange={handleChange} />
// // // // // // //           </div>
// // // // // // //           <div className="form-column">
// // // // // // //             <label htmlFor="dob">Date of Birth:</label>
// // // // // // //             <input type="date" id="dob" name="dob" required value={formData.dob} onChange={handleChange} />
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //         <div className="form-group-row">
// // // // // // //           <div className="form-column">
// // // // // // //             <label htmlFor="city">City:</label>
// // // // // // //             <input type="text" id="city" name="city" placeholder="Enter City" required value={formData.city} onChange={handleChange} />
// // // // // // //           </div>
// // // // // // //           <div className="form-column">
// // // // // // //             <label htmlFor="state">State:</label>
// // // // // // //             <input type="text" id="state" name="state" placeholder="Enter State" required value={formData.state} onChange={handleChange} />
// // // // // // //           </div>
// // // // // // //           <div className="form-column">
// // // // // // //             <label htmlFor="pincode">Pincode:</label>
// // // // // // //             <input type="text" id="pincode" name="pincode" placeholder="Enter Pincode" required value={formData.pincode} onChange={handleChange} />
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //         <div className="form-group">
// // // // // // //           <label htmlFor="occupation">Occupation:</label>
// // // // // // //           <input type="text" id="occupation" name="occupation" placeholder="Enter Occupation" value={formData.occupation} onChange={handleChange} />
// // // // // // //         </div>
// // // // // // //         <div className="form-group">
// // // // // // //           <label htmlFor="address">Address:</label>
// // // // // // //           <textarea id="address" name="address" rows="4" placeholder="Enter Address" required value={formData.address} onChange={handleChange}></textarea>
// // // // // // //         </div>
// // // // // // //         <div className="form-group-row">
// // // // // // //           <div className="form-column">
// // // // // // //             <label htmlFor="gender">Gender:</label>
// // // // // // //             <select id="gender" name="gender" required value={formData.gender} onChange={handleChange}>
// // // // // // //               <option value="">Select Gender</option>
// // // // // // //               <option value="Male">Male</option>
// // // // // // //               <option value="Female">Female</option>
// // // // // // //               <option value="Other">Other</option>
// // // // // // //             </select>
// // // // // // //           </div>
// // // // // // //           <div className="form-column">
// // // // // // //             <label htmlFor="courseId">Select Course:</label>
// // // // // // //             <select id="courseId" name="courseId" required value={formData.courseId} onChange={handleChange}>
// // // // // // //               <option value="">Select Course</option>
// // // // // // //               {courses.map((course) => (
// // // // // // //                 <option key={course.id} value={course.id}>
// // // // // // //                   {course.name}
// // // // // // //                 </option>
// // // // // // //               ))}
// // // // // // //             </select>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //         <div className="form-group-row">
// // // // // // //           <div className="form-column">
// // // // // // //             <label htmlFor="identityType">Identity Type:</label>
// // // // // // //             <select id="identityType" name="identityType" value={formData.identityType} onChange={handleChange}>
// // // // // // //   <option value="Driving License">Driving License</option>
// // // // // // //                     <option value="Aadhaar Card">Aadhaar Card</option>
// // // // // // //                     <option value="Pan Card">Pan Card</option>
// // // // // // //                     <option value="Voter ID">Voter ID</option>
// // // // // // //                     <option value="College ID">College ID</option>
// // // // // // //                     <option value="Other">Other</option>
// // // // // // //   </select>
// // // // // // //           </div>
// // // // // // //           <div className="form-column">
// // // // // // //             <label htmlFor="identityNo">Identity Number:</label>
// // // // // // //             <input type="text" id="identityNo" name="identityNo" placeholder="Enter Identity Number" value={formData.identityNo} onChange={handleChange} />
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //         <div className="form-group-row">
// // // // // // //           <div className="form-column">
// // // // // // //             <label htmlFor="photo">Student Photo:</label>
// // // // // // //             <input type="file" id="photo" name="photo" accept="image/*" onChange={handlePhotoChange} />
// // // // // // //             {photoPreview && (
// // // // // // //               <div className="image-preview">
// // // // // // //                 <img src={photoPreview} alt="Student Photo Preview" />
// // // // // // //                 <Button onClick={() => downloadImage(photoPreview, 'student-photo.jpg')} color="primary">
// // // // // // //                   Download Photo
// // // // // // //                 </Button>
// // // // // // //               </div>
// // // // // // //             )}
// // // // // // //           </div>
// // // // // // //           <div className="form-column">
// // // // // // //             <label htmlFor="identityImage">Identity Image:</label>
// // // // // // //             <input type="file" id="identityImage" name="identityImage" accept="image/*" onChange={handleIdentityImageChange} />
// // // // // // //             {identityImagePreview && (
// // // // // // //               <div className="image-preview">
// // // // // // //                 <img src={identityImagePreview} alt="Identity Image Preview" />
// // // // // // //                 <Button onClick={() => downloadImage(identityImagePreview, 'identity-image.jpg')} color="primary">
// // // // // // //                   Download Identity Image
// // // // // // //                 </Button>
// // // // // // //               </div>
// // // // // // //             )}
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //         <div className="form-group-row">
// // // // // // //           <div className="form-column">
// // // // // // //             <Button type="submit" color="primary">
// // // // // // //               Enroll
// // // // // // //             </Button>
// // // // // // //           </div>
// // // // // // //           <div className="form-column">
// // // // // // //             <Button type="button" color="secondary" onClick={handleReset}>
// // // // // // //               Reset
// // // // // // //             </Button>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //         {error && <p className="error-message">{error}</p>}
// // // // // // //       </form>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // // export default EnrollmentForm;



// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';
// // // import { useLocation, useNavigate, useParams } from 'react-router-dom';
// // // import { Button } from 'reactstrap';
// // // import { useMultiStepForm } from './MultiStepFormContext';
// // // import './StudentRegistration.css';

// // // function EnrollmentForm({ onEnrollmentSubmit }) {
// // //   const location = useLocation();
// // //   const navigate = useNavigate();
// // //   const apiUrl = process.env.REACT_APP_API_BASE_URL;
// // //   const { studentId: pathStudentId } = useParams();
// // //   const queryParams = new URLSearchParams(location.search);
// // //   const queryStudentId = queryParams.get('studentId');
// // //   const studentId = pathStudentId || queryStudentId;

// // //   const { setEnrollmentId } = useMultiStepForm();  // Import the context

// // //   const [formData, setFormData] = useState({
// // //     studentId,
// // //     firstName: '',
// // //     middleName: '',
// // //     lastName: '',
// // //     mobile: '',
// // //     email: '',
// // //     dob: '',
// // //     city: '',
// // //     state: '',
// // //     pincode: '',
// // //     occupation: '',
// // //     courseId: '',
// // //     address: '',
// // //     gender: '',
// // //     photo: null,
// // //     identityImage: null,
// // //     identityType: '',
// // //     identityNo: '',
// // //   });

// // //   const [courses, setCourses] = useState([]);
// // //   const [message, setMessage] = useState('');
// // //   const [error, setError] = useState(null);
// // //   const [photoPreview, setPhotoPreview] = useState(null);
// // //   const [identityImagePreview, setIdentityImagePreview] = useState(null);

// // //   useEffect(() => {
// // //     axios
// // //       .get(`${apiUrl}/courses`)
// // //       .then((response) => setCourses(response.data))
// // //       .catch(() => setMessage('Failed to fetch courses'));
// // //   }, []);

// // //   useEffect(() => {
// // //     if (studentId) {
// // //       axios
// // //         .get(`${apiUrl}/students/${studentId}`)
// // //         .then((response) => {
// // //           setFormData((prevFormData) => ({ ...prevFormData, ...response.data }));
// // //           if (response.data.photo) {
// // //             setPhotoPreview(`${apiUrl}/student/image/${studentId}`);
// // //           }
// // //           if (response.data.identityImage) {
// // //             setIdentityImagePreview(`${apiUrl}/student/imageidentity/${studentId}`);
// // //           }
// // //         })
// // //         .catch(() => setMessage('Failed to fetch student details'));
// // //     }
// // //   }, [studentId]);

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

// // //   const downloadImage = async (url, filename) => {
// // //     try {
// // //       const response = await fetch(url, {
// // //         credentials: 'include'
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
// // //       // Handle the error gracefully
// // //     }
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     const { photo, identityImage, identityType, identityNo, ...studentData } = formData;
  
// // //     try {
// // //       // Update student data
// // //       await axios.patch(`${apiUrl}/students/${studentId}`, {
// // //         ...studentData,
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
  
// // //       // Enroll student
// // //       const enrollResponse = await axios.post(`${apiUrl}/enroll`, {
// // //         studentId,
// // //         courseId: studentData.courseId,
// // //       });
  
// // //       // Log the entire response to inspect its structure
// // //       console.log('enrollResponse:', enrollResponse);
  
// // //       // Ensure we're accessing the enrollment ID correctly
// // //       const enrollmentId = enrollResponse.data.enrollment.enrollmentId;
// // //       if (enrollmentId) {
// // //         setEnrollmentId(enrollmentId);
// // //         console.log(`Enrollment ID passed successfully. Enrollment ID is ${enrollmentId}`);
  
// // //         // Notify parent component about the enrollment submission
// // //         if (onEnrollmentSubmit) {
// // //           onEnrollmentSubmit(enrollmentId);
// // //         }
// // //       } else {
// // //         setError('Enrollment ID is undefined');
// // //         console.log('Enrollment ID is undefined in the response');
// // //       }
// // //     } catch (error) {
// // //       setError('Failed to enroll/update student');
// // //     }
// // //   };
  

// // //   const handleReset = () => {
// // //     setFormData({
// // //       studentId,
// // //       firstName: '',
// // //       middleName: '',
// // //       lastName: '',
// // //       mobile: '',
// // //       email: '',
// // //       dob: '',
// // //       city: '',
// // //       state: '',
// // //       pincode: '',
// // //       occupation: '',
// // //       courseId: '',
// // //       address: '',
// // //       gender: '',
// // //       photo: null,
// // //       identityImage: null,
// // //       identityType: '',
// // //       identityNo: '',
// // //     });
// // //     setPhotoPreview(null);
// // //     setIdentityImagePreview(null);
// // //   };

// // //   return (
// // //     <div className="container">
// // //       <h2>ENROLLMENT FORM</h2>
// // //       {message && <p className="error-message">{message}</p>}
// // //       <form onSubmit={handleSubmit}>
// // //         <div className="form-group-row">
// // //           <div className="form-column">
// // //             <label htmlFor="studentId">Student ID:</label>
// // //             <input type="text" id="studentId" name="studentId" placeholder="Enter Student ID" required value={formData.studentId} readOnly />
// // //             <br />
// // //           </div>
// // //         </div>
// // //         <div className="form-group-row">
// // //           <div className="form-column">
// // //             <label htmlFor="firstName">First Name:</label>
// // //             <input type="text" id="firstName" name="firstName" placeholder="Enter First Name" required value={formData.firstName} onChange={handleChange} />
// // //           </div>
// // //           <div className="form-column">
// // //             <label htmlFor="middleName">Middle Name:</label>
// // //             <input type="text" id="middleName" name="middleName" placeholder="Enter Middle Name" value={formData.middleName} onChange={handleChange} />
// // //           </div>
// // //           <div className="form-column">
// // //             <label htmlFor="lastName">Last Name:</label>
// // //             <input type="text" id="lastName" name="lastName" placeholder="Enter Last Name" required value={formData.lastName} onChange={handleChange} />
// // //           </div>
// // //         </div>
// // //         <div className="form-group-row">
// // //           <div className="form-column">
// // //             <label htmlFor="mobile">Mobile Number:</label>
// // //             <input type="tel" id="mobile" name="mobile" pattern="[0-9]{10}" placeholder="Enter Mobile" required value={formData.mobile} onChange={handleChange} />
// // //           </div>
// // //           <div className="form-column">
// // //             <label htmlFor="email">Email:</label>
// // //             <input type="email" id="email" name="email" placeholder="Enter Email" required value={formData.email} onChange={handleChange} />
// // //           </div>
// // //           <div className="form-column">
// // //             <label htmlFor="dob">Date of Birth:</label>
// // //             <input type="date" id="dob" name="dob" required value={formData.dob} onChange={handleChange} />
// // //           </div>
// // //         </div>
// // //         <div className="form-group-row">
// // //           <div className="form-column">
// // //             <label htmlFor="city">City:</label>
// // //             <input type="text" id="city" name="city" placeholder="Enter City" required value={formData.city} onChange={handleChange} />
// // //           </div>
// // //           <div className="form-column">
// // //             <label htmlFor="state">State:</label>
// // //             <input type="text" id="state" name="state" placeholder="Enter State" required value={formData.state} onChange={handleChange} />
// // //           </div>
// // //           <div className="form-column">
// // //             <label htmlFor="pincode">Pincode:</label>
// // //             <input type="text" id="pincode" name="pincode" placeholder="Enter Pincode" required value={formData.pincode} onChange={handleChange} />
// // //           </div>
// // //         </div>
// // //         <div className="form-group">
// // //           <label htmlFor="occupation">Occupation:</label>
// // //           <input type="text" id="occupation" name="occupation" placeholder="Enter Occupation" value={formData.occupation} onChange={handleChange} />
// // //         </div>
// // //         <div className="form-group">
// // //           <label htmlFor="address">Address:</label>
// // //           <textarea id="address" name="address" rows="4" placeholder="Enter Address" required value={formData.address} onChange={handleChange}></textarea>
// // //         </div>
// // //         <div className="form-group">
// // //           <label>Gender:</label>
// // //           <input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} /> Male
// // //           <input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} /> Female
// // //           <input type="radio" name="gender" value="Other" checked={formData.gender === 'Other'} onChange={handleChange} /> Other
// // //         </div>
// // //         <div className="form-group-row">
// // //           <div className="form-column">
// // //             <label htmlFor="courseId">Course:</label>
// // //             <select id="courseId" name="courseId" required value={formData.courseId} onChange={handleChange}>
// // //               <option value="">Select a Course</option>
// // //               {courses.map((course) => (
// // //                 <option key={course.courseId} value={course.courseId}>{course.name}</option>
// // //               ))}
// // //             </select>
// // //           </div>
// // //         </div>
// // //         {/* <div className="form-group-row">
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
// // //         </div> */}
// // //         {error && <p className="error-message">{error}</p>}
// // //         <div className="form-actions">
// // //           <Button type="submit" color="primary">Submit</Button>
// // //           <Button type="button" color="secondary" onClick={handleReset}>Reset</Button>
// // //         </div>
// // //       </form>
// // //     </div>
// // //   );
// // // }

// // // export default EnrollmentForm;

// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';
// // // import { useLocation, useNavigate, useParams } from 'react-router-dom';
// // // import { Button } from 'reactstrap';
// // // import { useMultiStepForm } from './MultiStepFormContext';
// // // import './StudentRegistration.css';

// // // function EnrollmentForm({ onEnrollmentSubmit }) {
// // //   const location = useLocation();
// // //   const navigate = useNavigate();
// // //   const apiUrl = process.env.REACT_APP_API_BASE_URL;
// // //   const { studentId: pathStudentId } = useParams();
// // //   const queryParams = new URLSearchParams(location.search);
// // //   const queryStudentId = queryParams.get('studentId');
// // //   const studentId = pathStudentId || queryStudentId;

// // //   const { setEnrollmentId } = useMultiStepForm();  // Import the context

// // //   const [formData, setFormData] = useState({
// // //     studentId,
// // //     firstName: '',
// // //     middleName: '',
// // //     lastName: '',
// // //     mobile: '',
// // //     email: '',
// // //     dob: '',
// // //     city: '',
// // //     state: '',
// // //     pincode: '',
// // //     occupation: '',
// // //     courseId: '',
// // //     address: '',
// // //     gender: '',
// // //     photo: null,
// // //     identityImage: null,
// // //     identityType: '',
// // //     identityNo: '',
// // //   });

// // //   const [courses, setCourses] = useState([]);
// // //   const [message, setMessage] = useState('');
// // //   const [error, setError] = useState(null);
// // //   const [photoPreview, setPhotoPreview] = useState(null);
// // //   const [identityImagePreview, setIdentityImagePreview] = useState(null);

// // //   useEffect(() => {
// // //     axios
// // //       .get(`${apiUrl}/courses`)
// // //       .then((response) => setCourses(response.data))
// // //       .catch(() => setMessage('Failed to fetch courses'));
// // //   }, [apiUrl]);

// // //   useEffect(() => {
// // //     if (studentId) {
// // //       axios
// // //         .get(`${apiUrl}/students/${studentId}`)
// // //         .then((response) => {
// // //           setFormData((prevFormData) => ({ ...prevFormData, ...response.data }));
// // //           if (response.data.photo) {
// // //             setPhotoPreview(`${apiUrl}/student/image/${studentId}`);
// // //           }
// // //           if (response.data.identityImage) {
// // //             setIdentityImagePreview(`${apiUrl}/student/imageidentity/${studentId}`);
// // //           }
// // //         })
// // //         .catch(() => setMessage('Failed to fetch student details'));
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

// // //   const downloadImage = async (url, filename) => {
// // //     try {
// // //       const response = await fetch(url, {
// // //         credentials: 'include'
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
// // //       // Handle the error gracefully
// // //     }
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     const { photo, identityImage, identityType, identityNo, ...studentData } = formData;
  
// // //     try {
// // //       // Update student data
// // //       await axios.patch(`${apiUrl}/students/${studentId}`, {
// // //         ...studentData,
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
  
// // //       // Enroll student
// // //       const enrollResponse = await axios.post(`${apiUrl}/enroll`, {
// // //         studentId,
// // //         courseId: studentData.courseId,
// // //       });
  
// // //       // Log the entire response to inspect its structure
// // //       console.log('enrollResponse:', enrollResponse);
  
// // //       // Ensure we're accessing the enrollment ID correctly
// // //       const enrollmentId = enrollResponse.data.enrollment.enrollmentId;
// // //       if (enrollmentId) {
// // //         setEnrollmentId(enrollmentId);
// // //         console.log(`Enrollment ID passed successfully. Enrollment ID is ${enrollmentId}`);
  
// // //         // Notify parent component about the enrollment submission
// // //         if (onEnrollmentSubmit) {
// // //           onEnrollmentSubmit(enrollmentId);
// // //         }
// // //       } else {
// // //         setError('Enrollment ID is undefined');
// // //         console.log('Enrollment ID is undefined in the response');
// // //       }
// // //     } catch (error) {
// // //       setError('Failed to enroll/update student');
// // //     }
// // //   };
  

// // //   const handleReset = () => {
// // //     setFormData({
// // //       studentId,
// // //       firstName: '',
// // //       middleName: '',
// // //       lastName: '',
// // //       mobile: '',
// // //       email: '',
// // //       dob: '',
// // //       city: '',
// // //       state: '',
// // //       pincode: '',
// // //       occupation: '',
// // //       courseId: '',
// // //       address: '',
// // //       gender: '',
// // //       photo: null,
// // //       identityImage: null,
// // //       identityType: '',
// // //       identityNo: '',
// // //     });
// // //     setPhotoPreview(null);
// // //     setIdentityImagePreview(null);
// // //   };

// // //   return (
// // //     <div className="container">
// // //       <h2>ENROLLMENT FORM</h2>
// // //       {message && <p className="error-message">{message}</p>}
// // //       <form onSubmit={handleSubmit}>
// // //         <div className="form-group-row">
// // //           <div className="form-column">
// // //             <label htmlFor="studentId">Student ID:</label>
// // //             <input type="text" id="studentId" name="studentId" placeholder="Enter Student ID" required value={formData.studentId} readOnly />
// // //             <br />
// // //           </div>
// // //         </div>
// // //         <div className="form-group-row">
// // //           <div className="form-column">
// // //             <label htmlFor="firstName">First Name:</label>
// // //             <input type="text" id="firstName" name="firstName" placeholder="Enter First Name" required value={formData.firstName} onChange={handleChange} />
// // //           </div>
// // //           <div className="form-column">
// // //             <label htmlFor="middleName">Middle Name:</label>
// // //             <input type="text" id="middleName" name="middleName" placeholder="Enter Middle Name" value={formData.middleName} onChange={handleChange} />
// // //           </div>
// // //           <div className="form-column">
// // //             <label htmlFor="lastName">Last Name:</label>
// // //             <input type="text" id="lastName" name="lastName" placeholder="Enter Last Name" required value={formData.lastName} onChange={handleChange} />
// // //           </div>
// // //         </div>
// // //         <div className="form-group-row">
// // //           <div className="form-column">
// // //             <label htmlFor="mobile">Mobile Number:</label>
// // //             <input type="tel" id="mobile" name="mobile" pattern="[0-9]{10}" placeholder="Enter Mobile" required value={formData.mobile} onChange={handleChange} />
// // //           </div>
// // //           <div className="form-column">
// // //             <label htmlFor="email">Email:</label>
// // //             <input type="email" id="email" name="email" placeholder="Enter Email" required value={formData.email} onChange={handleChange} />
// // //           </div>
// // //           <div className="form-column">
// // //             <label htmlFor="dob">Date of Birth:</label>
// // //             <input type="date" id="dob" name="dob" required value={formData.dob} onChange={handleChange} />
// // //           </div>
// // //         </div>
// // //         <div className="form-group">
// // //           <label>Gender:</label>
// // //           <input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} /> Male
// // //           <input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} /> Female
// // //           <input type="radio" name="gender" value="Other" checked={formData.gender === 'Other'} onChange={handleChange} /> Other
// // //         </div>

// // //         <div className="form-group">
// // //           <label htmlFor="occupation">Occupation:</label>
// // //           <input type="text" id="occupation" name="occupation" placeholder="Enter Occupation" value={formData.occupation} onChange={handleChange} />
// // //         </div>
// // //         <div className="form-group-row">
// // //           <div className="form-column">
// // //             <label htmlFor="courseId">Course:</label>
// // //             <select id="courseId" name="courseId" required value={formData.courseId} onChange={handleChange}>
// // //               <option value="">Select a Course</option>
// // //               {courses.map((course) => (
// // //                 <option key={course.courseId} value={course.courseId}>{course.name}</option>
// // //               ))}
// // //             </select>
// // //           </div>
// // //         </div>
// // //         <div className="form-group-row">
// // //           <div className="form-column">
// // //             <label htmlFor="city">City:</label>
// // //             <input type="text" id="city" name="city" placeholder="Enter City" required value={formData.city} onChange={handleChange} />
// // //           </div>
// // //           <div className="form-column">
// // //             <label htmlFor="state">State:</label>
// // //             <input type="text" id="state" name="state" placeholder="Enter State" required value={formData.state} onChange={handleChange} />
// // //           </div>
// // //           <div className="form-column">
// // //             <label htmlFor="pincode">Pincode:</label>
// // //             <input type="text" id="pincode" name="pincode" placeholder="Enter Pincode" required value={formData.pincode} onChange={handleChange} />
// // //           </div>
// // //         </div>
// // //         <div className="form-group">
// // //           <label htmlFor="address">Address:</label>
// // //           <textarea id="address" name="address" rows="4" placeholder="Enter Address" required value={formData.address} onChange={handleChange}></textarea>
// // //         </div>


// // //         {/* <div className="form-group-row">
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
// // //         </div> */}
// // //         {error && <p className="error-message">{error}</p>}
// // //         <div className="form-actions">
// // //           <Button type="submit" color="primary">Submit</Button>
// // //           <Button type="button" color="secondary" onClick={handleReset}>Reset</Button>
// // //         </div>
// // //       </form>
// // //     </div>
// // //   );
// // // }

// // // export default EnrollmentForm;



// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { useLocation, useNavigate, useParams } from 'react-router-dom';
// // import { Button } from 'reactstrap';
// // import { useMultiStepForm } from './MultiStepFormContext';
// // import './StudentRegistration.css';

// // function EnrollmentForm({ onEnrollmentSubmit }) {
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const apiUrl = process.env.REACT_APP_API_BASE_URL;
// //   const { studentId: pathStudentId } = useParams();
// //   const queryParams = new URLSearchParams(location.search);
// //   const queryStudentId = queryParams.get('studentId');
// //   const studentId = pathStudentId || queryStudentId;

// //   const { setEnrollmentId } = useMultiStepForm();  // Import the context
// //   const { setStudentId } = useMultiStepForm();  // Import the context


// //   const [formData, setFormData] = useState({
// //     studentId,
// //     firstName: '',
// //     middleName: '',
// //     lastName: '',
// //     mobile: '',
// //     alternatemobile:'',
// //     email: '',
// //     dob: '',
// //     city: '',
// //     state: '',
// //     pincode: '',
// //     occupation: '',
// //     courseId: '',
// //     address: '',
// //     gender: '',
// //     photo: null,
// //     identityImage: null,
// //     identityType: '',
// //     identityNo: '',
// //   });

// //   const [courses, setCourses] = useState([]);
// //   const [message, setMessage] = useState('');
// //   const [error, setError] = useState(null);
// //   const [photoPreview, setPhotoPreview] = useState(null);
// //   const [identityImagePreview, setIdentityImagePreview] = useState(null);

// //   useEffect(() => {
// //     axios
// //       .get(`${apiUrl}/courses`)
// //       .then((response) => setCourses(response.data))
// //       .catch(() => setMessage('Failed to fetch courses'));
// //   }, [apiUrl]);

// //   useEffect(() => {
// //     if (studentId) {
// //       axios
// //         .get(`${apiUrl}/students/${studentId}`)
// //         .then((response) => {
// //           setFormData((prevFormData) => ({ ...prevFormData, ...response.data }));
// //           if (response.data.photo) {
// //             setPhotoPreview(`${apiUrl}/student/image/${studentId}`);
// //           }
// //           if (response.data.identityImage) {
// //             setIdentityImagePreview(`${apiUrl}/student/imageidentity/${studentId}`);
// //           }
// //         })
// //         .catch(() => setMessage('Failed to fetch student details'));
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

// //   const downloadImage = async (url, filename) => {
// //     try {
// //       const response = await fetch(url, {
// //         credentials: 'include'
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
// //       // Handle the error gracefully
// //     }
// //   };


// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const { photo, identityImage, identityType, identityNo, ...studentData } = formData;
  
// //     try {
// //       let newStudentResponse;
  
// //       // Create a new student if studentId is not present
// //       if (!formData.studentId) {
// //         try {
// //           newStudentResponse = await axios.post(`${apiUrl}/students`, studentData);
// //           formData.studentId = newStudentResponse.data.student.studentId;
// //           console.log('New student created:', newStudentResponse.data);
// //         } catch (error) {
// //           setError('Failed to create new student');
// //           console.error('Failed to create new student:', error.response || error.message);
// //           return;
// //         }
// //       } else {
// //         // Update student data
// //         try {
// //           await axios.patch(`${apiUrl}/students/${formData.studentId}`, {
// //             ...studentData,
// //             identityType,
// //             identityNo,
// //           });
// //           console.log('Student updated:', formData.studentId);
// //         } catch (error) {
// //           setError('Failed to update student data');
// //           console.error('Failed to update student data:', error.response || error.message);
// //           return;
// //         }
// //       }
  
// //       // Upload documents only if there is a change in the image
// //       // if (photo || identityImage) {
// //       //   const studentFormData = new FormData();
// //       //   if (photo) {
// //       //     studentFormData.append('image', photo);
// //       //   }
// //       //   if (identityImage) {
// //       //     studentFormData.append('identityImage', identityImage);
// //       //   }
  
// //       //   try {
// //       //     await axios.patch(`${apiUrl}/student/image/${formData.studentId}`, studentFormData);
// //       //     console.log('Images uploaded for student:', formData.studentId);
// //       //   } catch (error) {
// //       //     setError('Failed to upload images');
// //       //     console.error('Failed to upload images:', error.response || error.message);
// //       //     return;
// //       //   }
// //       // }
  
// //       // Enroll student
// //       try {
// //         console.log('Enrolling student with ID:', formData.studentId);
// //         const enrollResponse = await axios.post(`${apiUrl}/enroll`, {
// //           studentId: formData.studentId,
// //           courseId: studentData.courseId,
// //         });
  
// //         const enrollmentId = enrollResponse.data.enrollment?.enrollmentId;
// //         if (enrollmentId) {
// //           setEnrollmentId(enrollmentId);
// //           console.log(`Enrollment ID passed successfully. Enrollment ID is ${enrollmentId}`);
  
// //           // Notify parent component about the enrollment submission
// //           if (onEnrollmentSubmit) {
// //             onEnrollmentSubmit(enrollmentId, formData.studentId);
// //           }
// //         } else {
// //           setError('Enrollment ID is undefined');
// //           console.error('Enrollment ID is undefined in the response:', enrollResponse);
// //         }
// //       } catch (error) {
// //         setError('Failed to enroll student');
// //         console.error('Failed to enroll student:', error.response || error.message);
// //       }
// //     } catch (error) {
// //       setError('An unexpected error occurred');
// //       console.error('An unexpected error occurred:', error);
// //     }
  
// //     // Log when studentId is passed
// //     console.log('Current studentId:', formData.studentId);
// //   };
  

  

// //   const handleReset = () => {
// //     setFormData({
// //       studentId,
// //       firstName: '',
// //       middleName: '',
// //       lastName: '',
// //       mobile: '',
// //       alternatemobile:'',
// //       email: '',
// //       dob: '',
// //       city: '',
// //       state: '',
// //       pincode: '',
// //       occupation: '',
// //       courseId: '',
// //       address: '',
// //       gender: '',
// //       photo: null,
// //       identityImage: null,
// //       identityType: '',
// //       identityNo: '',
// //     });
// //     setPhotoPreview(null);
// //     setIdentityImagePreview(null);
// //   };

// //   return (
// //     <div className="container">
// //       <h2>ENROLLMENT FORM</h2>
// //       {message && <p className="error-message">{message}</p>}
// //       <form onSubmit={handleSubmit}>
// //         {/* Hidden Student ID Field */}
// //         <input type="hidden" id="studentId" name="studentId" value={formData.studentId} />
        
// //         <div className="form-group-row">
// //           <div className="form-column">
// //             <label htmlFor="firstName">First Name:</label>
// //             <input type="text" id="firstName" name="firstName" placeholder="Enter First Name" required value={formData.firstName} onChange={handleChange} />
// //           </div>
// //           <div className="form-column">
// //             <label htmlFor="middleName">Middle Name:</label>
// //             <input type="text" id="middleName" name="middleName" placeholder="Enter Middle Name" value={formData.middleName} onChange={handleChange} />
// //           </div>
// //           <div className="form-column">
// //             <label htmlFor="lastName">Last Name:</label>
// //             <input type="text" id="lastName" name="lastName" placeholder="Enter Last Name" required value={formData.lastName} onChange={handleChange} />
// //           </div>
// //         </div>
// //         <div className="form-group-row">
// //           <div className="form-column">
// //             <label htmlFor="mobile">Mobile Number:</label>
// //             <input type="tel" id="mobile" name="mobile" pattern="[0-9]{10}" placeholder="Enter Mobile" required value={formData.mobile} onChange={handleChange} />
// //           </div>
// //           <div className="form-column">
// //             <label htmlFor="alternatemobile">Alternate Mobile Number:</label>
// //             <input type="tel" id="alternatemobile" name="alternatemobile" pattern="[0-9]{10}" placeholder="Enter Mobile" required value={formData.alternatemobile} onChange={handleChange} />
// //           </div>
// //           <div className="form-column">
// //             <label htmlFor="email">Email:</label>
// //             <input type="email" id="email" name="email" placeholder="Enter Email" required value={formData.email} onChange={handleChange} />
// //           </div>
// //           <div className="form-column">
// //             <label htmlFor="dob">Date of Birth:</label>
// //             <input type="date" id="dob" name="dob" required value={formData.dob} onChange={handleChange} />
// //           </div>
// //         </div>
// //         <div className="form-group">
// //           <label>Gender:</label>
// //           <input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} /> Male
// //           <input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} /> Female
// //           <input type="radio" name="gender" value="Other" checked={formData.gender === 'Other'} onChange={handleChange} /> Other
// //         </div>
// //         <div className="form-group">
// //           <label htmlFor="occupation">Occupation:</label>
// //           <input type="text" id="occupation" name="occupation" placeholder="Enter Occupation" value={formData.occupation} onChange={handleChange} />
// //         </div>
// //         <div className="form-group-row">
// //           <div className="form-column">
// //             <label htmlFor="courseId">Course:</label>
//             // <select id="courseId" name="courseId" required value={formData.courseId} onChange={handleChange}>
//             //   <option value="">Select a Course</option>
//             //   {courses.map((course) => (
//             //     <option key={course.courseId} value={course.courseId}>{course.name}</option>
//             //   ))}
//             // </select>
// //           </div>
// //         </div>
// //         <div className="form-group-row">
// //           <div className="form-column">
// //             <label htmlFor="city">City:</label>
// //             <input type="text" id="city" name="city" placeholder="Enter City" required value={formData.city} onChange={handleChange} />
// //           </div>
// //           <div className="form-column">
// //             <label htmlFor="state">State:</label>
// //             <input type="text" id="state" name="state" placeholder="Enter State" required value={formData.state} onChange={handleChange} />
// //           </div>
// //           <div className="form-column">
// //             <label htmlFor="pincode">Pincode:</label>
// //             <input type="text" id="pincode" name="pincode" placeholder="Enter Pincode" required value={formData.pincode} onChange={handleChange} />
// //           </div>
// //         </div>
// //         <div className="form-group">
// //           <label htmlFor="address">Address:</label>
// //           <textarea id="address" name="address" rows="4" placeholder="Enter Address" required value={formData.address} onChange={handleChange}></textarea>
// //         </div>
// //         {error && <p className="error-message">{error}</p>}
// //         <div className="form-actions">
// //           <Button type="submit" color="primary">Submit</Button>
// //           <Button type="button" color="secondary" onClick={handleReset}>Reset</Button>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // }

// // export default EnrollmentForm;


// //   // const handleSubmit = async (e) => {
// //   //   e.preventDefault();
// //   //   const { photo, identityImage, identityType, identityNo, ...studentData } = formData;
  
// //   //   try {
// //   //     let newStudentResponse;
  
// //   //     // Create a new student if studentId is not present
// //   //     if (!formData.studentId) {
// //   //       try {
// //   //         newStudentResponse = await axios.post(`${apiUrl}/students`, studentData);
// //   //         formData.studentId = newStudentResponse.data.student.studentId;
// //   //         console.log('New student created:', newStudentResponse.data);
// //   //       } catch (error) {
// //   //         setError('Failed to create new student');
// //   //         console.error('Failed to create new student:', error.response || error.message);
// //   //         return;
// //   //       }
// //   //     } else {
// //   //       // Update student data
// //   //       try {
// //   //         await axios.patch(`${apiUrl}/students/${formData.studentId}`, {
// //   //           ...studentData,
// //   //           identityType,
// //   //           identityNo,
// //   //         });
// //   //         console.log('Student updated:', formData.studentId);
// //   //       } catch (error) {
// //   //         setError('Failed to update student data');
// //   //         console.error('Failed to update student data:', error.response || error.message);
// //   //         return;
// //   //       }
// //   //     }
  
// //   //     // Upload documents only if there is a change in the image
// //   //     if (photo || identityImage) {
// //   //       const studentFormData = new FormData();
// //   //       if (photo) {
// //   //         studentFormData.append('image', photo);
// //   //       }
// //   //       if (identityImage) {
// //   //         studentFormData.append('identityImage', identityImage);
// //   //       }
  
// //   //       try {
// //   //         await axios.patch(`${apiUrl}/student/image/${formData.studentId}`, studentFormData);
// //   //         console.log('Images uploaded for student:', formData.studentId);
// //   //       } catch (error) {
// //   //         setError('Failed to upload images');
// //   //         console.error('Failed to upload images:', error.response || error.message);
// //   //         return;
// //   //       }
// //   //     }
  
// //   //     // Enroll student
// //   //     try {
// //   //       console.log('Enrolling student with ID:', formData.studentId);
// //   //       const enrollResponse = await axios.post(`${apiUrl}/enroll`, {
// //   //         studentId: formData.studentId,
// //   //         courseId: studentData.courseId,
// //   //       });
  
// //   //       const enrollmentId = enrollResponse.data.enrollment?.enrollmentId;
// //   //       if (enrollmentId) {
// //   //         setEnrollmentId(enrollmentId);
// //   //         console.log(`Enrollment ID passed successfully. Enrollment ID is ${enrollmentId}`);
  
// //   //         // Notify parent component about the enrollment submission
// //   //         if (onEnrollmentSubmit) {
// //   //           onEnrollmentSubmit(enrollmentId,formData.studentId);
// //   //         }
// //   //       } else {
// //   //         setError('Enrollment ID is undefined');
// //   //         console.error('Enrollment ID is undefined in the response:', enrollResponse);
// //   //       }
// //   //     } catch (error) {
// //   //       setError('Failed to enroll student');
// //   //       console.error('Failed to enroll student:', error.response || error.message);
// //   //     }
// //   //   } catch (error) {
// //   //     setError('An unexpected error occurred');
// //   //     console.error('An unexpected error occurred:', error);
// //   //   }
// //   // };
  
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import { Button } from 'reactstrap';
// import { useMultiStepForm } from './MultiStepFormContext';
// import './StudentRegistration.css';

// function EnrollmentForm({ onEnrollmentSubmit }) {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const apiUrl = process.env.REACT_APP_API_BASE_URL;
//   const { studentId: pathStudentId, enrollmentId: pathEnrollmentId } = useParams();
//   const queryParams = new URLSearchParams(location.search);
//   const queryStudentId = queryParams.get('studentId');
//   const queryEnrollmentId = queryParams.get('enrollmentId');
//   const studentId = pathStudentId || queryStudentId;
//   const enrollmentId = pathEnrollmentId || queryEnrollmentId;

//   const { setEnrollmentId, setStudentId } = useMultiStepForm();

//   const [formData, setFormData] = useState({
//     studentId,
//     firstName: '',
//     middleName: '',
//     lastName: '',
//     mobile: '',
//     alternatemobile:'',
//     email: '',
//     dob: '',
//     city: '',
//     state: '',
//     pincode: '',
//     occupation: '',
//     courseId: '',
//     address: '',
//     gender: '',
//     photo: null,
//     identityImage: null,
//     identityType: '',
//     identityNo: '',
//   });

//   const [courses, setCourses] = useState([]);
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState(null);
//   const [photoPreview, setPhotoPreview] = useState(null);
//   const [identityImagePreview, setIdentityImagePreview] = useState(null);

//   useEffect(() => {
//     axios
//       .get(`${apiUrl}/courses`)
//       .then((response) => setCourses(response.data))
//       .catch(() => setMessage('Failed to fetch courses'));
//   }, [apiUrl]);

//   useEffect(() => {
//     if (studentId) {
//       axios
//         .get(`${apiUrl}/students/${studentId}`)
//         .then((response) => {
//           setFormData((prevFormData) => ({ ...prevFormData, ...response.data }));
//           if (response.data.photo) {
//             setPhotoPreview(`${apiUrl}/student/image/${studentId}`);
//           }
//           if (response.data.identityImage) {
//             setIdentityImagePreview(`${apiUrl}/student/imageidentity/${studentId}`);
//           }
//         })
//         .catch(() => setMessage('Failed to fetch student details'));
//     }
//   }, [studentId, apiUrl]);

//   useEffect(() => {
//     if (enrollmentId) {
//       axios
//         .get(`${apiUrl}/enroll/${enrollmentId}`)
//         .then((response) => {
//           setFormData((prevFormData) => ({
//             ...prevFormData,
//             ...response.data.student,
//             courseId: response.data.courseId
//           }));
//         })
//         .catch(() => setMessage('Failed to fetch enrollment details'));
//     }
//   }, [enrollmentId, apiUrl]);

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
//     const { photo, identityImage, identityType, identityNo, ...studentData } = formData;

//     try {
//       let newStudentResponse;

//       // Create a new student if studentId is not present
//       if (!formData.studentId) {
//         try {
//           newStudentResponse = await axios.post(`${apiUrl}/students`, studentData);
//           formData.studentId = newStudentResponse.data.student.studentId;
//           console.log('New student created:', newStudentResponse.data);
//         } catch (error) {
//           setError('Failed to create new student');
//           console.error('Failed to create new student:', error.response || error.message);
//           return;
//         }
//       } else {
//         // Update student data
//         try {
//           await axios.patch(`${apiUrl}/students/${formData.studentId}`, {
//             ...studentData,
//             identityType,
//             identityNo,
//           });
//           console.log('Student updated:', formData.studentId);
//         } catch (error) {
//           setError('Failed to update student data');
//           console.error('Failed to update student data:', error.response || error.message);
//           return;
//         }
//       }

//       // Enroll student or update enrollment
//       try {
//         if (enrollmentId) {
//           await axios.patch(`${apiUrl}/enroll/${enrollmentId}`, {
//             studentId: formData.studentId,
//             courseId: studentData.courseId,
//           });
//           console.log('Enrollment updated:', enrollmentId);
//         } else {
//           const enrollResponse = await axios.post(`${apiUrl}/enroll`, {
//             studentId: formData.studentId,
//             courseId: studentData.courseId,
//           });

//           const newEnrollmentId = enrollResponse.data.enrollment?.enrollmentId;
//           if (newEnrollmentId) {
//             setEnrollmentId(newEnrollmentId);
//             console.log(`Enrollment ID passed successfully. Enrollment ID is ${newEnrollmentId}`);

//             // Notify parent component about the enrollment submission
//             if (onEnrollmentSubmit) {
//               onEnrollmentSubmit(newEnrollmentId, formData.studentId);
//             }
//           } else {
//             setError('Enrollment ID is undefined');
//             console.error('Enrollment ID is undefined in the response:', enrollResponse);
//           }
//         }
//       } catch (error) {
//         setError('Failed to enroll or update enrollment');
//         console.error('Failed to enroll or update enrollment:', error.response || error.message);
//       }
//     } catch (error) {
//       setError('An unexpected error occurred');
//       console.error('An unexpected error occurred:', error);
//     }

//     // Log when studentId is passed
//     console.log('Current studentId:', formData.studentId);
//   };

//   const handleReset = () => {
//     setFormData({
//       studentId,
//       firstName: '',
//       middleName: '',
//       lastName: '',
//       mobile: '',
//       alternatemobile:'',
//       email: '',
//       dob: '',
//       city: '',
//       state: '',
//       pincode: '',
//       occupation: '',
//       courseId: '',
//       address: '',
//       gender: '',
//       photo: null,
//       identityImage: null,
//       identityType: '',
//       identityNo: '',
//     });
//     setPhotoPreview(null);
//     setIdentityImagePreview(null);
//   };

//   return (
//     <div className="container">
//       <h2>ENROLLMENT FORM</h2>
//       {message && <p className="error-message">{message}</p>}
//       <form onSubmit={handleSubmit}>
//         <input type="hidden" id="studentId" name="studentId" value={formData.studentId} />
//         <div className="form-group-row">
//           <div className="form-column">
//             <label htmlFor="firstName">First Name:</label>
//             <input type="text" id="firstName" name="firstName" placeholder="Enter First Name" required value={formData.firstName} onChange={handleChange} />
//           </div>
//           <div className="form-column">
//             <label htmlFor="middleName">Middle Name:</label>
//             <input type="text" id="middleName" name="middleName" placeholder="Enter Middle Name" value={formData.middleName} onChange={handleChange} />
//           </div>
//           <div className="form-column">
//             <label htmlFor="lastName">Last Name:</label>
//             <input type="text" id="lastName" name="lastName" placeholder="Enter Last Name" required value={formData.lastName} onChange={handleChange} />
//           </div>
//         </div>
//         <div className="form-group-row">
//           <div className="form-column">
//             <label htmlFor="mobile">Mobile Number:</label>
//             <input type="tel" id="mobile" name="mobile" pattern="[0-9]{10}" placeholder="Enter Mobile" required value={formData.mobile} onChange={handleChange} />
//           </div>
//           <div className="form-column">
//             <label htmlFor="alternatemobile">Alternate Mobile Number:</label>
//             <input type="tel" id="alternatemobile" name="alternatemobile" pattern="[0-9]{10}" placeholder="Enter Alternate Mobile" value={formData.alternatemobile} onChange={handleChange} />
//           </div>
//           <div className="form-column">
//             <label htmlFor="email">Email:</label>
//             <input type="email" id="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} />
//           </div>
//         </div>
//         <div className="form-group-row">
//           <div className="form-column">
//             <label htmlFor="dob">Date of Birth:</label>
//             <input type="date" id="dob" name="dob" required value={formData.dob} onChange={handleChange} />
//           </div>
//           <div className="form-column">
//             <label htmlFor="city">City:</label>
//             <input type="text" id="city" name="city" placeholder="Enter City" required value={formData.city} onChange={handleChange} />
//           </div>
//           <div className="form-column">
//             <label htmlFor="state">State:</label>
//             <input type="text" id="state" name="state" placeholder="Enter State" required value={formData.state} onChange={handleChange} />
//           </div>
//         </div>
//         <div className="form-group-row">
//           <div className="form-column">
//             <label htmlFor="pincode">Pincode:</label>
//             <input type="text" id="pincode" name="pincode" placeholder="Enter Pincode" required value={formData.pincode} onChange={handleChange} />
//           </div>
//           <div className="form-column">
//             <label htmlFor="occupation">Occupation:</label>
//             <input type="text" id="occupation" name="occupation" placeholder="Enter Occupation" value={formData.occupation} onChange={handleChange} />
//           </div>
//           <div className="form-column">
//             <label htmlFor="courseId">Course:</label>
            // <select id="courseId" name="courseId" required value={formData.courseId} onChange={handleChange}>
            //   <option value="">Select a Course</option>
            //   {courses.map((course) => (
            //     <option key={course.courseId} value={course.courseId}>{course.name}</option>
            //   ))}
            // </select>
//           </div>
//         </div>
//         <div className="form-group">
//           <label htmlFor="address">Address:</label>
//           <textarea id="address" name="address" placeholder="Enter Address" required value={formData.address} onChange={handleChange}></textarea>
//         </div>
//         <div className="form-group-row">
//           <div className="form-column">
//             <label htmlFor="gender">Gender:</label>
//             <select id="gender" name="gender" required value={formData.gender} onChange={handleChange}>
//               <option value="">Select Gender</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//               <option value="other">Other</option>
//             </select>
//           </div>
//           <div className="form-column">
//             <label htmlFor="photo">Upload Photo:</label>
//             <input type="file" id="photo" name="photo" accept="image/*" onChange={handlePhotoChange} />
//             {photoPreview && <img src={photoPreview} alt="Photo Preview" style={{ marginTop: '10px', maxWidth: '100px' }} />}
//           </div>
//           <div className="form-column">
//             <label htmlFor="identityImage">Upload Identity Image:</label>
//             <input type="file" id="identityImage" name="identityImage" accept="image/*" onChange={handleIdentityImageChange} />
//             {identityImagePreview && <img src={identityImagePreview} alt="Identity Image Preview" style={{ marginTop: '10px', maxWidth: '100px' }} />}
//           </div>
//         </div>
//         <div className="form-group-row">
//           <div className="form-column">
//             <label htmlFor="identityType">Identity Type:</label>
//             <select id="identityType" name="identityType" required value={formData.identityType} onChange={handleChange}>
//               <option value="">Select Identity Type</option>
//               <option value="aadhaar">Aadhaar</option>
//               <option value="pan">PAN</option>
//               <option value="passport">Passport</option>
//             </select>
//           </div>
//           <div className="form-column">
//             <label htmlFor="identityNo">Identity Number:</label>
//             <input type="text" id="identityNo" name="identityNo" placeholder="Enter Identity Number" required value={formData.identityNo} onChange={handleChange} />
//           </div>
//         </div>
//         <div className="form-group-row">
//           <div className="form-column">
//             <Button color="primary" type="submit">Submit</Button>
//           </div>
//           <div className="form-column">
//             <Button color="secondary" type="reset" onClick={handleReset}>Reset</Button>
//           </div>
//         </div>
//         {error && <div className="error-message">{error}</div>}
//       </form>
//     </div>
//   );
// }

// export default EnrollmentForm;

//------------------------------------------------------------------------------------------------------------------------------------------

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button } from 'reactstrap';
import { useMultiStepForm } from './MultiStepFormContext';
import './StudentRegistration.css';
import Swal from 'sweetalert2';

function EnrollmentForm({ onEnrollmentSubmit,enrollmentId: receivedEnrollmentId, studentId:responsestudentId, }) {
  const location = useLocation();
  const navigate = useNavigate();
  // const [error, setError] = useState(null);

  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const { studentId: pathStudentId, enrollmentId: pathEnrollmentId } = useParams();
  const queryParams = new URLSearchParams(location.search);
  const queryStudentId = queryParams.get('studentId');
  const queryEnrollmentId = queryParams.get('enrollmentId');
  const studentId = pathStudentId || queryStudentId || responsestudentId;
  const enrollmentId = pathEnrollmentId || queryEnrollmentId || receivedEnrollmentId;

  const { setEnrollmentId, setStudentId } = useMultiStepForm();
  useEffect(() => {
    console.log(`EnrollmentForm received enrollmentId: ${enrollmentId}`);
    console.log(`EnrollmentForm received studentID: ${studentId}`);

  }, [enrollmentId]);

  
  const [formData, setFormData] = useState({
    studentId,
    firstName: '',
    middleName: '',
    lastName: '',
    mobile: '',
    alternatemobile: '',
    email: '',
    dob: '',
    city: '',
    state: '',
    pincode: '',
    occupation: '',
    courseId: '',
    address: '',
    gender: '',
    photo: null,
    identityImage: null,
    identityType: '',
    identityNo: '',
  });

  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [identityImagePreview, setIdentityImagePreview] = useState(null);

  useEffect(() => {
    axios
      .get(`${apiUrl}/courses`)
      .then((response) => setCourses(response.data))
      .catch(() => setMessage('Failed to fetch courses'));
  }, [apiUrl]);

  useEffect(() => {
    if (studentId) {
      axios
        .get(`${apiUrl}/students/${studentId}`)
        .then((response) => {
          setFormData((prevFormData) => ({
            ...prevFormData,
            ...response.data,
            studentId,
          }));
          console.log(response.data);
          if (response.data.photo) {
            setPhotoPreview(`${apiUrl}/student/image/${studentId}`);
          }
          if (response.data.identityImage) {
            setIdentityImagePreview(`${apiUrl}/student/imageidentity/${studentId}`);
          }
        })
        .catch(() => setMessage('Failed to fetch student details'));
    }
  }, [studentId, apiUrl]);

  // useEffect(() => {
  //   if (enrollmentId) {
  //     axios
  //       .get(`${apiUrl}/enroll/${enrollmentId}`)
  //       .then((response) => {
  //         setFormData((prevFormData) => ({
  //           ...prevFormData,
  //           ...response.data.student,
  //           courseId: response.data.courseId,
  //           enrollmentId,
  //         }));
  //       })
  //       .catch(() => setMessage('Failed to fetch enrollment details'));
  //   }
  // }, [enrollmentId, apiUrl]);
  useEffect(() => {
    const fetchEnrollmentDetails = async () => {
      if (enrollmentId) {
        try {
          const response = await axios.get(`${apiUrl}/enroll/${enrollmentId}`);
          setFormData((prevFormData) => ({
            ...prevFormData,
            ...response.data.student,
            courseId: response.data.courseId,
            enrollmentId,
          }));
        } catch (error) {
          console.error('Failed to fetch enrollment details:', error);
          // Optionally, handle the error here, but do not set the message
        }
      }
    };
  
    fetchEnrollmentDetails();
  }, [enrollmentId, apiUrl]);
  
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
    if (!formData.courseId) {
      Swal.fire('Error', 'Please select a course before submitting the form.', 'error');
      return;
    }
    const { photo, identityImage, identityType, identityNo, ...studentData } = formData;
  
    try {
      let newStudentResponse;
  
      // Create a new student if studentId is not present
      if (!formData.studentId) {
        try {
          newStudentResponse = await axios.post(`${apiUrl}/students`, studentData);
          formData.studentId = newStudentResponse.data.student.studentId;
          console.log('New student created:', newStudentResponse.data);
        } catch (error) {
          setError('Failed to create new student');
          console.error('Failed to create new student:', error.response || error.message);
          return;
        }
      } else {
        // Update student data
        try {
          await axios.patch(`${apiUrl}/students/${formData.studentId}`, {
            ...studentData,
            identityType,
            identityNo,
          });
          console.log('Student updated:', formData.studentId);
        } catch (error) {
          setError('Failed to update student data');
          console.error('Failed to update student data:', error.response || error.message);
          return;
        }
      }
      onEnrollmentSubmit(null, formData.studentId, formData.courseId);
            console.log(`CourseId is ${formData.courseId}`);
  
      // Enroll student or update enrollment
      // try {
      //   if (enrollmentId) {
      //     await axios.patch(`${apiUrl}/enroll/${enrollmentId}`, {
      //       studentId: formData.studentId,
      //       courseId: studentData.courseId,
      //     });
      //     onEnrollmentSubmit(enrollmentId, formData.studentId, formData.courseId);
      //     console.log('Enrollment updated:', enrollmentId);
      //   } else {
      //     // Notify parent component about the enrollment submission
      //     if (onEnrollmentSubmit) {
      //       onEnrollmentSubmit(null, formData.studentId, formData.courseId);
      //       console.log(`CourseId is ${formData.courseId}`);
            
      //     }
      //   }
      // } catch (error) {
      //   setError('Failed to enroll or update enrollment');
      //   console.error('Failed to enroll or update enrollment:', error.response || error.message);
      // }
    } catch (error) {
      setError('An unexpected error occurred');
      console.error('An unexpected error occurred:', error);
    }
  
    // Log when studentId is passed
    console.log('Current studentId:', formData.studentId);
  };
  



  const handleReset = () => {
    setFormData({
      studentId,
      firstName: '',
      middleName: '',
      lastName: '',
      mobile: '',
      alternatemobile: '',
      email: '',
      dob: '',
      city: '',
      state: '',
      pincode: '',
      occupation: '',
      courseId: '',
      address: '',
      gender: '',
      photo: null,
      identityImage: null,
      identityType: '',
      identityNo: '',
    });
    setPhotoPreview(null);
    setIdentityImagePreview(null);
  };

  return (
    <div className="container">
      <h2>ENROLLMENT FORM</h2>
      {message && <p className="error-message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="hidden" id="studentId" name="studentId" value={formData.studentId} />
        <div className="row">

                    <div className="col-12 col-md-4">
                        <div className="mb-3">
                        <label className="mb-3" htmlFor="firstName">First Name:</label>
                                    <input type="text" className="form-control" id="firstName" name="firstName" placeholder="Enter First Name" required value={formData.firstName} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="col-12 col-md-4">   

                            <div className="mb-3">
                                <label className="mb-3"  htmlFor="middleName">Middle Name:</label>
                                <input type="text" className="form-control" id="middleName" name="middleName" placeholder="Enter Middle Name" value={formData.middleName} onChange={handleChange} />
                            </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="mb-3">
                        <label className="mb-3"  htmlFor="lastName">Last Name:</label>
                        <input type="text" className="form-control" id="lastName" name="lastName" placeholder="Enter Last Name" required value={formData.lastName} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="col-12 col-md-4">
                  <div className="mb-3">
                    <label className="mb-2">Date of Birth <span className="text-danger"> *</span></label>
                    <input type="date" className="form-control datetimepicker" name="dob" value={formData.dob} onChange={handleChange} />
                  </div>
                </div>
                    <div className="col-12 col-md-4">
                        <div className="mb-3">
                    {/* <div className="form-column"> */}
                        <label className="mb-2" htmlFor="mobile">Mobile Number: <span className="text-danger"> *</span></label>
                        <input type="tel" className="form-control" id="mobile" name="mobile" pattern="[0-9]{10}" placeholder="Enter Mobile" required value={formData.mobile} onChange={handleChange} />
                    </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="mb-3">
                    
                        <label  className="mb-2" htmlFor="alternatemobile">Alternate Mobile Number: <span className="text-danger"> *</span></label>
                        <input type="tel" className="form-control" id="alternatemobile" name="alternatemobile" pattern="[0-9]{10}" placeholder="Enter Mobile" required value={formData.alternatemobile} onChange={handleChange} />
                    </div>
                    </div>
                    <div className="col-12 col-md-4">
                  <div className="mb-3">
                    <label className="mb-2">Email ID <span className="text-danger"> *</span></label>
                    <input type="email"  className="form-control" name="email" value={formData.email} onChange={handleChange}/>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="mb-3">
                    <label className="mb-2">Occupation <span className="text-danger"> *</span></label>
                    <input type="text"  className="form-control" name="occupation" value={formData.occupation} onChange={handleChange} />
                  </div>
                </div>

                    <div className="col-12 col-md-4">
                        <div className="mb-3">
                            <label>Gender:</label>
                            <label className="mb-2">Gender <span className="text-danger"> *</span></label>
                    <select className="form-select form-control" name="gender" value={formData.gender} onChange={handleChange}>
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                        </div>
                    </div>  

                    
                    <div className="col-12 col-md-4">
                        <div className="mb-3">
          <label className="mb-3" htmlFor="courseId">Course <span style={{ color: 'red' }}>*</span></label>
  <select  className="form-select form-control" id="courseId" name="courseId" required value={formData.courseId} onChange={handleChange}>
    <option value="">Select a Course</option>
    {courses.map((course) => (
      <option key={course.courseId} value={course.courseId}>{course.name}</option>
    ))}
  </select>
        </div>
        </div>
                    
                    
                    
                                
                    <div className="col-12 row-md-4">
                      <div className="mb-3">
                        <label className="mb-2">Address Line 1 <span className="text-danger"> *</span></label>
                        <input type="text" className="form-control" name="addressLine1" value={formData.addressLine1} onChange={handleChange} />
                      </div>
                      <div className="mb-3">
                        <label className="mb-2">Address Line 2 <span className="text-danger"> *</span></label>
                        <input type="text" className="form-control" name="addressLine2" value={formData.addressLine2} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="col-12 row-md-4">
                      <div className="mb-3">
                        <label className="mb-2">City <span className="text-danger"> *</span></label>
                        <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="col-12 col-md-4">
                      <div className="mb-3">
                        <label className="mb-2">Pin Code <span className="text-danger"> *</span></label>
                        <input type="text" className="form-control" name="pincode" value={formData.pincode} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="col-12 col-md-4">
                      <div className="mb-3">
                        <label className="mb-2">Taluka <span className="text-danger"> *</span></label>
                        <input type="text" className="form-control" name="taluka" value={formData.taluka} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="col-12 col-md-4">
                      <div className="mb-3">
                        <label className="mb-2">District <span className="text-danger"> *</span></label>
                        <input type="text" className="form-control" name="district" value={formData.district} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="col-12 col-md-4">
                      <div className="mb-3">
                        <label className="mb-2">State <span className="text-danger"> *</span></label>
                        <input type="text" className="form-control" name="state" value={formData.state} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="col-12 col-md-4">
                      <div className="mb-3">
                        <label className="mb-2">Country <span className="text-danger"> *</span></label>
                        <input type="text" className="form-control" name="country" value={formData.country} onChange={handleChange} />
                      </div>
                    </div>
                    
                </div>
        
       
        <div className="form-group">
          {/* <Button type="submit" color="primary">Submit</Button> */}
          <Button type="button" color="secondary" onClick={handleReset}>Reset</Button>
        </div>
      </form>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default EnrollmentForm;



  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!formData.courseId) {
      
  //     Swal.fire('Error','Please select a course before submitting the form.','error');
  //     return;
  //   }
  //   const { photo, identityImage, identityType, identityNo, ...studentData } = formData;

  //   try {
  //     let newStudentResponse;

  //     // Create a new student if studentId is not present
  //     if (!formData.studentId) {
  //       try {
  //         newStudentResponse = await axios.post(`${apiUrl}/students`, studentData);
  //         formData.studentId = newStudentResponse.data.student.studentId;
  //         console.log('New student created:', newStudentResponse.data);
  //       } catch (error) {
  //         setError('Failed to create new student');
  //         console.error('Failed to create new student:', error.response || error.message);
  //         return;
  //       }
  //     } else {
  //       // Update student data
  //       try {
  //         await axios.patch(`${apiUrl}/students/${formData.studentId}`, {
  //           ...studentData,
  //           identityType,
  //           identityNo,
  //         });
  //         console.log('Student updated:', formData.studentId);
  //       } catch (error) {
  //         setError('Failed to update student data');
  //         console.error('Failed to update student data:', error.response || error.message);
  //         return;
  //       }
  //     }

  //     // Enroll student or update enrollment
  //     try {
  //       if (enrollmentId) {
  //         await axios.patch(`${apiUrl}/enroll/${enrollmentId}`, {
  //           studentId: formData.studentId,
  //           courseId: studentData.courseId,
  //         });
  //         onEnrollmentSubmit(enrollmentId,studentId);

  //         console.log('Enrollment updated:', enrollmentId);

  //       } else {
  //         const enrollResponse = await axios.post(`${apiUrl}/enroll`, {
  //           studentId: formData.studentId,
  //           courseId: studentData.courseId,
  //         });

  //         const newEnrollmentId = enrollResponse.data.enrollment?.enrollmentId;
  //         if (newEnrollmentId) {
  //           setEnrollmentId(newEnrollmentId);
  //           console.log(`Enrollment ID passed successfully. Enrollment ID is ${newEnrollmentId}`);

  //           // Notify parent component about the enrollment submission
  //           if (onEnrollmentSubmit) {
  //             onEnrollmentSubmit(newEnrollmentId, formData.studentId);
  //           }
  //         } else {
  //           setError('Enrollment ID is undefined');
  //           console.error('Enrollment ID is undefined in the response:', enrollResponse);
  //         }
  //       }
  //     } catch (error) {
  //       setError('Failed to enroll or update enrollment');
  //       console.error('Failed to enroll or update enrollment:', error.response || error.message);
  //     }
  //   } catch (error) {
  //     setError('An unexpected error occurred');
  //     console.error('An unexpected error occurred:', error);
  //   }

  //   // Log when studentId is passed
  //   console.log('Current studentId:', formData.studentId);
  // };
