// // import React from 'react';

// // const BasicInformationForm = () => {
// //   return (
// //     <div className='container'>
// //       <div className="col-md-7 col-lg-8 col-xl-9" style={{width:'100%'}}>
// //       <div className="card" style={{width:'inherit'}}>
// //         <div className="card-body" >
// //           <form>
// //             <h4 className="card-title">Basic Information</h4>
// //             <div className="row">
// //               <div className="col-12 col-md-12">
// //                 <div className="mb-3">
// //                   <div className="change-avatar">
// //                     <div className="profile-img">
// //                       <img src="https://res.cloudinary.com/dlxxazfjh/image/upload/v1716631991/twinsis/l4yqrwxhcxjix9xijeow.jpg" alt="User Image" />
// //                     </div>
// //                     <div className="upload-img">
// //                       <div className="change-photo-btn">
// //                         <span><i className="fa fa-upload"></i> Upload Photo</span>
// //                         <input type="file" className="upload" accept=".png, .jpg, .jpeg" />
// //                       </div>
// //                       <small className="form-text text-muted">Allowed JPG, PNG and JPEG. Max size of 2MB</small>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //               <div className="col-12 col-md-6">
// //                 <div className="mb-3">
// //                   <label className="mb-2">Name<span className="text-danger"> *</span></label>
// //                   <input type="text" className="form-control" name="name" value="Akshay" />
// //                 </div>
// //                 <div className="mb-3">
// //                   <label className="mb-2">Name<span className="text-danger"> *</span></label>
// //                   <input type="text" className="form-control" name="name" value="Akshay" />
// //                 </div>
// //                 <div className="mb-3">
// //                   <label className="mb-2">Name<span className="text-danger"> *</span></label>
// //                   <input type="text" className="form-control" name="name" value="Akshay" />
// //                 </div>
// //               </div>
// //               <div className="col-12 col-md-6">
// //                 <div className="mb-3">
// //                   <label className="mb-2">Mobile No. <span className="text-danger"> *</span></label>
// //                   <input type="text" readOnly className="form-control" name="mobile" value="8485856752" />
// //                 </div>
// //               </div>
// //               <div className="col-12 col-md-6">
// //                 <div className="mb-3">
// //                   <label className="mb-2">Emergency Mobile No.</label>
// //                   <input type="text" className="form-control" name="emergencyNumber" value="" />
// //                 </div>
// //               </div>
// //               <div className="col-12 col-md-6">
// //                 <div className="mb-3">
// //                   <label className="mb-2">Date of Birth <span className="text-danger"> *</span></label>
// //                   <div>
// //                     <input type="date" className="form-control datetimepicker" name="dob" value="2024-05-10T00:00:00.000Z" />
// //                   </div>
// //                 </div>
// //               </div>
// //               {/* <div className="col-12 col-md-6">
// //                 <div className="mb-3">
// //                   <label className="mb-2">Age <span className="text-danger"> *</span></label>
// //                   <input type="text" className="form-control" name="age" value="22" />
// //                 </div>
// //               </div> */}
// //               {/* <div className="col-12 col-md-6">
// //                 <div className="mb-3">
// //                   <label className="mb-2">Blood Group <span className="text-danger"> *</span></label>
// //                   <select className="form-select form-control" name="bloodType">
// //                     <option>A-</option>
// //                     <option>A+</option>
// //                     <option>B-</option>
// //                     <option>B+</option>
// //                     <option>AB-</option>
// //                     <option>AB+</option>
// //                     <option>O-</option>
// //                     <option>O+</option>
// //                   </select>
// //                 </div>
// //               </div> */}
// //               <div className="col-12 col-md-6">
// //                 <div className="mb-3">
// //                   <label className="mb-2">Gender <span className="text-danger"> *</span></label>
// //                   <select className="form-select form-control" name="gender">
// //                     <option>Select</option>
// //                     <option>Male</option>
// //                     <option>Female</option>
// //                     <option>Other</option>
// //                   </select>
// //                 </div>
// //               </div>
// //               {/* <div className="col-12 col-md-6">
// //                 <div className="mb-3">
// //                   <label className="mb-2">Height(ft)</label>
// //                   <input type="number" className="form-control" name="height" value="20" />
// //                 </div>
// //               </div>
// //               <div className="col-12 col-md-6">
// //                 <div className="mb-3">
// //                   <label className="mb-2">Weight(kg)</label>
// //                   <input type="number" className="form-control" name="weight" value="50" />
// //                 </div>
// //               </div> */}
// //               <div className="col-12">
// //                 <div className="mb-3">
// //                   <label className="mb-2">Email ID <span className="text-danger"> *</span></label>
// //                   <input type="email" readOnly className="form-control" name="email" value="akshayshinde@gmail.com" />
// //                 </div>
// //               </div>
// //               <div className="col-12 col-md-6">
// //                 <div className="mb-3">
// //                   <label className="mb-2">Previous diseaseName 1</label>
// //                   <div className="d-flex gap-3">
// //                     <input type="text" className="form-control" placeholder="Previous diseaseName" value="covid-19" />
// //                     <input type="text" className="form-control" placeholder="Year" value="2020" />
// //                   </div>
// //                 </div>
// //                 <div className="add-more mt-2">
// //                   <a className="add-education"><i className="fa fa-plus-circle"></i> Add More</a>
// //                 </div>
// //               </div>
// //               <div className="col-12">
// //                 <div className="mb-3">
// //                   <h4 className="card-title">Address Line</h4>
// //                   <label className="mb-2">Address Line <span className="text-danger"> *</span></label>
// //                   <input type="text" className="form-control" name="addressLine1" value="Pohegaon (BK)" />
// //                 </div>
// //               </div>
// //               <div className="col-12 col-md-6">
// //                 <div className="mb-3">
// //                   <label className="mb-2">City <span className="text-danger"> *</span></label>
// //                   <input type="text" className="form-control" name="city" value="Kopargaon" />
// //                 </div>
// //               </div>
// //               <div className="col-12 col-md-6">
// //                 <div className="mb-3">
// //                   <label className="mb-2">State <span className="text-danger"> *</span></label>
// //                   <input type="text" className="form-control" name="state" value="Maharashtra" />
// //                 </div>
// //               </div>
// //               <div className="col-12 col-md-6">
// //                 <div className="mb-3">
// //                   <label className="mb-2">Zip Code <span className="text-danger"> *</span></label>
// //                   <input type="text" className="form-control" name="zip" value="423605" />
// //                 </div>
// //               </div>
// //               <div className="col-12 col-md-6">
// //                 <div className="mb-3">
// //                   <label className="mb-2">Country <span className="text-danger"> *</span></label>
// //                   <input type="text" className="form-control" name="country" value="India" />
// //                 </div>
// //               </div>
// //             </div>
// //             <div className="submit-section">
// //               <button type="submit" className="btn btn-primary submit-btn">Save Changes</button>
// //             </div>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //     </div>
// //   );
// // };

// // export default BasicInformationForm;



// import React from 'react';

// const BasicInformationForm = () => {
//   return (
//     <div className='container'>
//       <div className="col-md-7 col-lg-8 col-xl-9" style={{ width: '100%' }}>
//         <div className="card" style={{ width: 'inherit' }}>
//           <div className="card-body">
//           <h4 className="card-title">Basic Information</h4>

//           <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded">
//                         <li className="nav-item">
//                           <a
//                             className="nav-link active"
                            
//                             data-bs-toggle="tab"
//                             onClick={() => ("lab")}
//                           >
//                             Profile
//                           </a>
//                         </li>
//                         <li className="nav-item">
//                           <a
//                             className="nav-link"
//                             data-bs-toggle="tab"
//                             onClick={() => ("radiology")}
//                           >
//                             Identity Documents
//                           </a>
//                         </li>
//           </ul>
//         <br />        <br />

//             <form>
//               <div className="row">
//                 <div className="col-12">
//                   <div className="mb-3">
//                     <div className="change-avatar">
//                       <div className="profile-img">
//                         <img src="https://res.cloudinary.com/dlxxazfjh/image/upload/v1716631991/twinsis/l4yqrwxhcxjix9xijeow.jpg" alt="User Image" />
//                       </div>
//                       <div className="upload-img">
//                         <div className="change-photo-btn">
//                           <span><i className="fa fa-upload"></i> Upload Photo</span>
//                           <input type="file" className="upload" accept=".png, .jpg, .jpeg" />
//                         </div>
//                         <small className="form-text text-muted">Allowed JPG, PNG and JPEG. Max size of 2MB</small>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-12 col-md-4">
//                   <div className="mb-3">
//                     <label className="mb-2">First Name<span className="text-danger"> *</span></label>
//                     <input type="text" className="form-control" name="name" value="Akshay" />
//                   </div>
//                 </div>
//                 <div className="col-12 col-md-4">
//                   <div className="mb-3">
//                     <label className="mb-2">Middle Name<span className="text-danger"> *</span></label>
//                     <input type="text" className="form-control" name="name" value="Akshay" />
//                   </div>
//                 </div>
//                 <div className="col-12 col-md-4">
//                   <div className="mb-3">
//                     <label className="mb-2">Last Name<span className="text-danger"> *</span></label>
//                     <input type="text" className="form-control" name="name" value="Akshay" />
//                   </div>
//                 </div>
//                 <div className="col-12 col-md-4">
//                   <div className="mb-3">
//                     <label className="mb-2">Mobile No. <span className="text-danger"> *</span></label>
//                     <input type="text" readOnly className="form-control" name="mobile" value="8485856752" />
//                   </div>
//                 </div>
//                 <div className="col-12 col-md-4">
//                   <div className="mb-3">
//                     <label className="mb-2">Alternate Mobile No.</label>
//                     <input type="text" className="form-control" name="emergencyNumber" value="" />
//                   </div>
//                 </div>
//                 <div className="col-12 col-md-4">
//                   <div className="mb-3">
//                     <label className="mb-2">Email ID <span className="text-danger"> *</span></label>
//                     <input type="email" readOnly className="form-control" name="email" value="akshayshinde@gmail.com" />
//                   </div>
//                 </div>
//                 <div className="col-12 col-md-4">
//                   <div className="mb-3">
//                     <label className="mb-2">Date of Birth <span className="text-danger"> *</span></label>
//                     <input type="date" className="form-control datetimepicker" name="dob" value="2024-05-10T00:00:00.000Z" />
//                   </div>
//                 </div>
//                 <div className="col-12 col-md-4">
//                   <div className="mb-3">
//                     <label className="mb-2">Gender <span className="text-danger"> *</span></label>
//                     <select className="form-select form-control" name="gender">
//                       <option>Select</option>
//                       <option>Male</option>
//                       <option>Female</option>
//                       <option>Other</option>
//                     </select>
//                   </div>
//                 </div>
//                 <div className="col-12 col-md-4">
//                   <div className="mb-3">
//                     <label className="mb-2">Occcupation <span className="text-danger"> *</span></label>
//                     <input type="email" readOnly className="form-control" name="email" value="akshayshinde@gmail.com" />
//                   </div>
//                 </div>
//                 <div className="row">
//   <div className="col-md-6">
//     <div className="mb-3">
//       <label className="mb-2">Address Line 1 <span className="text-danger"> *</span></label>
//       <input type="text" className="form-control" name="addressLine1" value="Pohegaon (BK)" style={{ width: '100%' }} />
//     </div>
//   </div>
  
// </div>
// <div className="row">
//   <div className="col-md-6">
//     <div className="mb-3">
//       <label className="mb-2">Address Line 1 <span className="text-danger"> *</span></label>
//       <input type="text" className="form-control" name="addressLine1" value="Pohegaon (BK)" style={{ width: '100%' }} />
//     </div>
//   </div>
  
// </div>


                
                
//                 <div className="col-12 col-md-4">
//                   <div className="mb-3">
//                     <label className="mb-2">City <span className="text-danger"> *</span></label>
//                     <input type="text" className="form-control" name="city" value="Kopargaon" />
//                   </div>
//                 </div>
//                 <div className="col-12 col-md-4">
//                   <div className="mb-3">
//                     <label className="mb-2">Zip Code <span className="text-danger"> *</span></label>
//                     <input type="text" className="form-control" name="zip" value="423605" />
//                   </div>
//                 </div>
//                 <div className="col-12 col-md-4">
//                   <div className="mb-3">
//                     <label className="mb-2">Taluka <span className="text-danger"> *</span></label>
//                     <input type="text" className="form-control" name="city" value="Kopargaon" />
//                   </div>
//                 </div>
//                 <div className="col-12 col-md-4">
//                   <div className="mb-3">
//                     <label className="mb-2">District <span className="text-danger"> *</span></label>
//                     <input type="text" className="form-control" name="city" value="Kopargaon" />
//                   </div>
//                 </div>
//                 <div className="col-12 col-md-4">
//                   <div className="mb-3">
//                     <label className="mb-2">State <span className="text-danger"> *</span></label>
//                     <input type="text" className="form-control" name="state" value="Maharashtra" />
//                   </div>
//                 </div>
                
//                 <div className="col-12 col-md-4">
//                   <div className="mb-3">
//                     <label className="mb-2">Country <span className="text-danger"> *</span></label>
//                     <input type="text" className="form-control" name="country" value="India" />
//                   </div>
//                 </div>
//               </div>
//               <div className="submit-section">
//                 <button type="submit" className="btn btn-primary submit-btn">Save Changes</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BasicInformationForm;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';
import { FaEye } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddDocuments from './AddDocuments';
const BasicInformationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    mobile: '',
    alternatemobile: '',
    email: '',
    dob: '',
    gender: '',
    occupation: '',
    addressLine1: '',
    city: '',
    pincode: '',
    taluka: '',
    district: '',
    state: '',
    country: '',
  });
  const [photoPreview, setPhotoPreview] = useState(''); // New state for image preview
  const [photo, setPhoto] = useState(null); // New state for the selected file
  const [studentId, setStudentId] = useState(''); // State to store student ID
  const [showIdentityDocuments, setShowIdentityDocuments] = useState(false);
  const [showProfile, setShowProfile] = useState(true);
  const apiUrl = process.env.REACT_APP_API_BASE_URL


  const [identityImagePreview, setIdentityImagePreview] = useState(null);



  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/profile`);
        const data = response.data;
        setFormData(data);
        setPhotoPreview(`${apiUrl}/${data.photo}`); // Set the existing photo as preview
        setStudentId(data.studentId); // Set the student ID
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleTabChange1 = (tab) => {
    setShowProfile(tab === 'profile');
    setShowIdentityDocuments(tab === 'identityDocuments');
  };
  
  const handleTabChange2 = (tab) => {
    setShowIdentityDocuments(tab === 'identityDocuments');

    setShowProfile(tab === 'profile');
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file)); // Preview the selected image
    }
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update basic profile data
      await axios.patch(`${apiUrl}/profile`, formData);

      // Upload photo if a new one has been selected
      if (photo) {
        const formDataToUpload = new FormData();
        formDataToUpload.append('image', photo);
        await axios.patch(`${apiUrl}/student/image/${studentId}`, formDataToUpload, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      toast.success('Profile updated successfully!', { position: toast.POSITION.TOP_RIGHT });    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className='container'>
          <ToastContainer />

      <div className="col-md-7 col-lg-8 col-xl-9" style={{ width: '100%' }}>
        <div className="card" style={{ width: 'inherit' }}>
          <div className="card-body">
            <h4 className="card-title">Basic Information</h4>
            <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded" style={{width:'fit-content'}}>
  <li className="nav-item">
    <a 
      className={`nav-link ${showProfile ? 'active' : ''}`} 
      onClick={() => handleTabChange2('profile')}
      data-bs-toggle="tab"
    >
      Profile
    </a>
  </li>
  <li className="nav-item">
    <a 
      className={`nav-link ${showIdentityDocuments ? 'active' : ''}`} 
      onClick={() => handleTabChange1('identityDocuments')}
      data-bs-toggle="tab"
    >
      Identity Documents
    </a>
  </li>
            </ul>

                        <br /><br />
            <form onSubmit={handleSubmit}>
            {showProfile && (

              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <div className="change-avatar">
                      <div className="profile-img">
                        <img src={photoPreview} alt="User Image" />
                      </div>
                      <div className="upload-img">
                        <div className="change-photo-btn">
                          <span><i className="fa fa-upload"></i> Upload Photo</span>
                          <input type="file" className="upload" accept=".png, .jpg, .jpeg" onChange={handleFileChange} />
                        </div>
                        <small className="form-text text-muted">Allowed JPG, PNG and JPEG. Max size of 2MB</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="mb-3">
                    <label className="mb-2">First Name <span className="text-danger"> *</span></label>
                    <input type="text" className="form-control" name="firstName" value={formData.firstName} onChange={handleChange} />
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="mb-3">
                    <label className="mb-2">Middle Name <span className="text-danger"> *</span></label>
                    <input type="text" className="form-control" name="middleName" value={formData.middleName} onChange={handleChange} />
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="mb-3">
                    <label className="mb-2">Last Name <span className="text-danger"> *</span></label>
                    <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={handleChange} />
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="mb-3">
                    <label className="mb-2">Mobile No. <span className="text-danger"> *</span></label>
                    <input type="text" readOnly className="form-control" name="mobile" value={formData.mobile} />
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="mb-3">
                    <label className="mb-2">Alternate Mobile No.</label>
                    <input type="text" className="form-control" name="alternatemobile" value={formData.alternatemobile} onChange={handleChange} />
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="mb-3">
                    <label className="mb-2">Email ID <span className="text-danger"> *</span></label>
                    <input type="email" readOnly className="form-control" name="email" value={formData.email} />
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
                    <label className="mb-2">Occupation <span className="text-danger"> *</span></label>
                    <input type="text" readOnly className="form-control" name="occupation" value={formData.occupation} />
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="mb-3">
                    <label className="mb-2">Address Line 1 <span className="text-danger"> *</span></label>
                    <input type="text" className="form-control" name="addressLine1" value={formData.addressLine1} onChange={handleChange} />
                  </div>
                </div>
                <div className="col-12 col-md-4">
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
              </div>)}
              {showIdentityDocuments && (
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
              )}
              <div className="submit-section">
                <button type="submit" className="btn btn-primary submit-btn">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInformationForm;
