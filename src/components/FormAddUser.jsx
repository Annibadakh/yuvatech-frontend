
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import Loader from '../loader/Loader';
const FormAddUser = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        confPassword: '',
        role: '',
        photo: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        district: '',
        country: '',
        taluka: '',
        mobileNumber: '',
        pincode :'',
        gender:'',
        dob:''
        
    });
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
const [loading, setLoading] = useState(false); // Loading state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
            setPhotoPreview(URL.createObjectURL(file)); // Preview the selected image
        }
    };

    const saveUser = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
          // Prepare form data
          const formData = new FormData();
          formData.append('name', userData.name || '');
          formData.append('email', userData.email || '');
          formData.append('password', userData.password || '');
          formData.append('confPassword', userData.confPassword || '');
          formData.append('role', userData.role || '');
          formData.append('addressLine1', userData.addressLine1 || '');
          formData.append('addressLine2', userData.addressLine2 || '');
          formData.append('city', userData.city || '');
          formData.append('state', userData.state || '');
          formData.append('district', userData.district || '');
          formData.append('country', userData.country || '');
          formData.append('taluka', userData.taluka || '');
          formData.append('mobileNumber', userData.mobile || '');
          formData.append('pincode',userData.pincode || '');
          formData.append('gender',userData.gender|| '');
          formData.append('dob',userData.dob || '');
  
          // Append the selected photo to form data if it exists
          if (photo) {
              formData.append('image', photo);
          }
  
          // Log the form data for debugging
          for (let [key, value] of formData.entries()) {
              console.log(`${key}:`, value);
          }
  
          // Send the POST request to create a user
          const response = await axios.post(`${apiUrl}/users`, formData, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          });
  
          console.log(response);
  
          // Success alert and navigation
          Swal.fire({
              icon: 'success',
              title: 'User Added Successfully',
              text: '',
          });
          navigate("/users");
      } catch (error) {
        if (error.response) {
          console.log(error.response.data); // Log the full error response
          setMsg(error.response.data.msg);
      }
      }
      finally{
        setLoading(false);  
      }
  };
  
  if (loading) {
      return <Loader />;
  }
  

    return (
        <div className='container'>
            <ToastContainer />
            <div className="col-md-7 col-lg-8 col-xl-9" style={{ width: '100%' }}>
                <div className="card" style={{ width: 'inherit' }}>
                    <div className="card-body">
                        <h4 className="card-title">Basic Information</h4>
                        <form onSubmit={saveUser}>
                            <div className="row">
                                <div className="col-12">
                                    <div className="mb-3">
                                        <div className="change-avatar">
                                            <div className="profile-img">
                                                <img src={photoPreview} alt="User Image" />
                                            </div>
                                            <div className="upload-img">
                                                <div className="change-photo-btn">
                                                    <div style={{width:"150px"}}><FontAwesomeIcon icon={faUpload} /> Upload Photo</div>
                                                    <input type="file" className="upload" accept=".png, .jpg, .jpeg" onChange={handleFileChange} />
                                                </div>
                                                <small className="form-text text-muted">Allowed JPG, PNG and JPEG. Max size of 2MB</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                    <div className="col-12 col-md-4">
                      <div className="mb-3">
                      <label className="mb-2" htmlFor="name">Name:</label>
                      <input type="text" id="name" name="name" placeholder="Enter Name" required value={userData.name} onChange={handleChange} />
                      </div>
                    </div>
                    {/* <div className="col-12 col-md-4">
                      <div className="mb-3">
                        <label className="mb-2">Middle Name <span className="text-danger"> *</span></label>
                        <input type="text" className="form-control" name="middleName" value={userData.middleName} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="col-12 col-md-4">
                      <div className="mb-3">
                        <label className="mb-2">Last Name <span className="text-danger"> *</span></label>
                        <input type="text" className="form-control" name="lastName" value={userData.lastName} onChange={handleChange} />
                      </div>
                    </div> */}
                    <div className="col-12 col-md-4">
                      <div className="mb-3">
                        <label className="mb-2">Mobile No. <span className="text-danger"> *</span></label>
                        <input type="text"  className="form-control" name="mobile" value={userData.mobile} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="col-12 col-md-4">
                      <div className="mb-3">
                      <label className="mb-2"htmlFor="email">Email:</label>
                      <input type="email"   className="form-control" id="email" name="email" placeholder="Enter Email" required value={userData.email} onChange={handleChange} />
                      </div>
                    </div>
                    {/* <div className="col-12 col-md-4">
                      <div className="mb-3">
                        <label className="mb-2">Email ID <span className="text-danger"> *</span></label>
                        <input type="email" readOnly className="form-control" name="email" value={userData.email} />
                      </div>
                    </div> */}
                    <div className="col-12 col-md-4">
                      <div className="mb-3">
                        <label className="mb-2">Date of Birth <span className="text-danger"> *</span></label>
                        <input type="date" className="form-control datetimepicker" name="dob" value={userData.dob} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="col-12 col-md-4">
                      <div className="mb-3">
                        <label className="mb-2">Gender <span className="text-danger"> *</span></label>
                        <select className="form-select form-control" name="gender" value={userData.gender} onChange={handleChange}>
                          <option value="">Select</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-12 col-md-4">
                      {/* <div className="mb-3">
                        <label className="mb-2">Occupation <span className="text-danger"> *</span></label>
                        <input type="text" readOnly className="form-control" name="occupation" value={userData.occupation} />
                      </div> */}
                      <div className="mb-3">
      
                      <label htmlFor="role">Role:</label>
                          <select id="role" name="role" required value={userData.role} onChange={handleChange}>
                              <option value="">Select Role</option>
                              <option value="admin">Admin</option>
                              <option value="user">User</option>
                              <option value="student">Student</option>
                          </select>
                      </div>
                    </div>
                    <div className="col-12 col-md-4">
      
                    <div className="mb-3">
                          <label  className="mb-2"htmlFor="password">Password:</label>
                          <input className="form-control" type="password" id="password" name="password" placeholder="******" style={{ flexBasis: 'calc(50% - 5px)' }} required value={userData.password} onChange={handleChange} />
                      </div>
                      </div>
                      <div className="col-12 col-md-4">

                      <div className="mb-3">
                          <label  className="mb-2"htmlFor="confPassword">Confirm Password:</label>
                          <input className="form-control" type="password" id="confPassword" name="confPassword" placeholder="******" 
                            style={{ flexBasis: 'calc(50% - 5px)' }} required value={userData.confPassword} 
                            onChange={handleChange} />
      
                      </div>
                      </div>
      
                    <div className="col-12 row-md-4">
                      <div className="mb-3">
                        <label className="mb-2">Address Line 1 <span className="text-danger"> *</span></label>
                        <input type="text" className="form-control" name="addressLine1" value={userData.addressLine1} onChange={handleChange} />
                      </div>
                      <div className="mb-3">
                        <label className="mb-2">Address Line 2 <span className="text-danger"> *</span></label>
                        <input type="text" className="form-control" name="addressLine2" value={userData.addressLine2} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="col-12 row-md-4">
                      <div className="mb-3">
                        <label className="mb-2">City <span className="text-danger"> *</span></label>
                        <input type="text" className="form-control" name="city" value={userData.city} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="col-12 col-md-4">
                      <div className="mb-3">
                        <label className="mb-2">Pincode <span className="text-danger"> *</span></label>
                        <input type="text" className="form-control" name="pincode" value={userData.pincode} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="col-12 col-md-4">
                      <div className="mb-3">
                        <label className="mb-2">Taluka <span className="text-danger"> *</span></label>
                        <input type="text" className="form-control" name="taluka" value={userData.taluka} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="col-12 col-md-4">
                      <div className="mb-3">
                        <label className="mb-2">District <span className="text-danger"> *</span></label>
                        <input type="text" className="form-control" name="district" value={userData.district} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="col-12 col-md-4">
                      <div className="mb-3">
                        <label className="mb-2">State <span className="text-danger"> *</span></label>
                        <input type="text" className="form-control" name="state" value={userData.state} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="col-12 col-md-4">
                      <div className="mb-3">
                        <label className="mb-2">Country <span className="text-danger"> *</span></label>
                        <input type="text" className="form-control" name="country" value={userData.country} onChange={handleChange} />
                      </div>
                    </div>
                  </div>
                {/* )} */}
                  {/* {showIdentityDocuments &&  */}
                  
                    {/* <div>
                      <div className="form-group-row">
                        <div className="form-column">
                          <label htmlFor="identityType">Identity Type:</label>
                          <select id="identityType" name="identityType" value={userData.identityType} onChange={handleChange}>
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
                          <input type="text" id="identityNo" name="identityNo" placeholder="Enter Identity Number" required value={userData.identityNo} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="form-group-row">
                        <div className="form-column">
                          <label htmlFor="photo">Student Photo:</label>
                          <input type="file" id="photo" name="photo" accept="image/*" onChange={handlePhotoChange} />
                          {userData.photo && (
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
                          {userData.identityImage && (
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
                      
                    </div> */}
                  
                  {/* } */}
                  <div className="submit-section">
                    <button type="submit">Save</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
};

export default FormAddUser;
  // return (
    //     <div className="container" style={{ maxWidth: '650px', margin: '50px auto', padding: '20px', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
    //         <h2 style={titleStyle}>Add New User</h2>
    //         <form onSubmit={saveUser}>
    //             <p className="has-text-centered">{msg}</p>
    //             <div className="form-group">
    //                 <label htmlFor="name">Name:</label>
    //                 <input type="text" id="name" name="name" placeholder="Enter Name" required value={userData.name} onChange={handleChange} />
    //             </div>
    //             <div className="form-group">
    //                 <label htmlFor="email">Email:</label>
    //                 <input type="email" id="email" name="email" placeholder="Enter Email" required value={userData.email} onChange={handleChange} />
    //             </div>
    //             <div className="form-group">
    //                 <label htmlFor="password">Password:</label>
    //                 <input type="password" id="password" name="password" placeholder="******" style={{ flexBasis: 'calc(50% - 5px)' }} required value={userData.password} onChange={handleChange} />
    //             </div>
    //             <div className="form-group">
    //                 <label htmlFor="confPassword">Confirm Password:</label>
    //                 <input type="password" id="confPassword" name="confPassword" placeholder="******" 
    //                   style={{ flexBasis: 'calc(50% - 5px)' }} required value={userData.confPassword} 
    //                   onChange={handleChange} />

    //             </div>
    //             <div className="form-group">
    //                 <label htmlFor="role">Role:</label>
    //                 <select id="role" name="role" required value={userData.role} onChange={handleChange}>
    //                     <option value="">Select Role</option>
    //                     <option value="admin">Admin</option>
    //                     <option value="user">User</option>
    //                     <option value="student">Student</option>
    //                 </select>
    //             </div>
    //             <div className="form-actions">
    //                 <button type="submit" className="button is-success" style={{ backgroundColor: '#3c91e6', color: 'white' }}>Save</button>
    //             </div>
    //         </form>
    //     </div>
    // );


