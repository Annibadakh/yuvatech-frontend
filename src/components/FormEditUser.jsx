import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import { f } from 'html2pdf.js';

const FormEditUser = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        confPassword: '',
        role: '',
        addressLine1: '',
        addressLine2: '',
        pincode: '',
        city: '',
        state: '',
        district: '',
        country: '',
        taluka: '',
        mobileNumber: '',
        dob: '',
        gender: ''
    });
    
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const getUserById = async () => {
            try {
                const response = await axios.get(`${apiUrl}/users/${id}`);
                console.log(response.data);
                setPhotoPreview(`${apiUrl}/${response.data.photo}`); // Set the existing photo as preview
                
                setUserData({
                    name: response.data.name,
                    email: response.data.email,
                    role: response.data.role,
                    addressLine1: response.data.addressLine1,
                    addressLine2: response.data.addressLine2,
                    pincode: response.data.pincode,
                    city: response.data.city,
                    state: response.data.state,
                    district: response.data.district,
                    country: response.data.country,
                    taluka: response.data.taluka,
                    mobileNumber: response.data.mobileNumber,
                    dob: response.data.dob,
                    gender: response.data.gender,
                    password: '',
                    confPassword: ''
                });
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        };
        getUserById();
    }, [id]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
            setPhotoPreview(URL.createObjectURL(file)); // Preview the selected image
        }
    };
    const handleChange = (e) => {
      const { name, value } = e.target;
      setUserData(prevState => {
          const updatedData = {
              ...prevState,
              [name]: value
          };
  
          // Check if passwords match if either password or confirmPassword field is updated
          if (name === 'password' || name === 'confPassword') {
              setPasswordMatch(updatedData.password === updatedData.confPassword);
          }
  
          return updatedData;
      });
  };
  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
};

    const updateUser = async (e) => {
        e.preventDefault();
        if (userData.password !== userData.confPassword) {
          toast.error("Password and Confirm Password do not match");
          return;
      }
  
        try {
            const formData = new FormData();
            formData.append('name', userData.name);
            formData.append('email', userData.email);
            formData.append('password', userData.password);
            formData.append('confPassword', userData.confPassword);
            formData.append('role', userData.role);
            formData.append('addressLine1', userData.addressLine1);
            formData.append('addressLine2', userData.addressLine2);
            formData.append('city', userData.city);
            formData.append('state', userData.state);
            formData.append('district', userData.district);
            formData.append('country', userData.country);
            formData.append('taluka', userData.taluka);
            formData.append('mobileNumber', userData.mobileNumber);
            formData.append('dob', userData.dob);
            formData.append('gender', userData.gender);
            formData.append('pincode', userData.pincode);
            if (photo) {
                formData.append('image', photo); // Add the photo to the form data
            }

            await axios.patch(`${apiUrl}/users/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            Swal.fire({
                icon: 'success',
                title: 'Update Successfully',
                text: '',
            });
            navigate("/users");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
                console.log(error.response.data.msg);
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: `${error.response.data.msg}`,
              });
                
            }
        }
    };

    const updateCred = async (e) => {
      e.preventDefault();
      if (userData.password !== userData.confPassword) {
        toast.error("Password and Confirm Password do not match");
        return;
    }

      try {
          const formData = new FormData();
          formData.append('email', userData.email);
          formData.append('password', userData.password);
          formData.append('confPassword', userData.confPassword);
          formData.append('role', userData.role);
         

          await axios.patch(`${apiUrl}/users/${id}`, formData, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          });

          Swal.fire({
              icon: 'success',
              title: 'Update Successfully',
              text: '',
          });
          navigate("/users");
      } catch (error) {
          if (error.response) {
              setMsg(error.response.data.msg);
              console.log(error.response.data.msg);
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${error.response.data.msg}`,
            });
              
          }
      }
  };


    const titleStyle = {
        fontFamily: 'Times New Roman, Times, serif'
    };

    return (
      <>

      {userData.role !== 'student' && (
        <>
        <div className='container'>
            <ToastContainer />
            <div className="col-md-7 col-lg-8 col-xl-9" style={{ width: '100%' }}>
                <div className="card" style={{ width: 'inherit' }}>
                    <div className="card-body">
                        <h4 className="card-title">Basic Information</h4>
                        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded" style={{ width: 'fit-content' }}>
                            <li className="nav-item">
                                {/* Tab navigation items (if any) */}
                            </li>
                        </ul>
                        <br /><br />
                        <form onSubmit={updateUser}>
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
                        <input type="text"  className="form-control" name="mobile" value={userData.mobileNumber} onChange={handleChange} />
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
                    {/* <div className="col-12 col-md-4">
                    <div className="mb-3">
                          <label  className="mb-2"htmlFor="password">Password:</label>
                          <input className="form-control" type="password" id="password" name="password" placeholder="******" style={{ flexBasis: 'calc(50% - 5px)' }}  value={userData.password} onChange={handleChange} />
                      </div>
                      </div>
                      <div className="col-12 col-md-4">
                      <div className="mb-3">
                          <label  className="mb-2"htmlFor="confPassword">Confirm Password:</label>
                          <input className="form-control" type="password" id="confPassword" name="confPassword" placeholder="******" 
                            style={{ flexBasis: 'calc(50% - 5px)' }}  value={userData.confPassword} 
                            onChange={handleChange} />
      
                      </div>
                      </div> */}
            <div className="col-12 col-md-4">
                <div className="mb-3">
                    <label className="mb-2" htmlFor="password">Password:</label>
                    <input
                        className="form-control"
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        placeholder="******"
                        style={{ flexBasis: 'calc(50% - 5px)' }}
                        // value={userData.password}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="col-12 col-md-4">
                <div className="mb-3">
                    <label className="mb-2" htmlFor="confPassword">Confirm Password:</label>
                    <input
                        className="form-control"
                        type={showPassword ? 'text' : 'password'}
                        id="confPassword"
                        name="confPassword"
                        placeholder="******"
                        style={{ flexBasis: 'calc(50% - 5px)' }}
                        value={userData.confPassword}
                        onChange={handleChange}
                    />
                </div>
                {!passwordMatch && userData.password && userData.confPassword && (
                    <div className="text-danger">
                        Password and Confirm Password do not match
                    </div>
                )}
            </div>
            <div className="col-12 col-md-4 d-flex justify-content-center align-items-center">
    <div className="form-check d-flex align-items-center">
        <span
            className="me-2"
            onClick={handleShowPasswordToggle}
            style={{ cursor: 'pointer', fontSize: '1.5rem' }}
        >
            <i className={showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'}></i>
        </span>
        <label className="form-check-label" htmlFor="showPassword" style={{ marginBottom: 0 }}>
            Show Password
        </label>
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
                        <label className="mb-2">Pin Code <span className="text-danger"> *</span></label>
                        <input type="text" className="form-control" name="zip" value={userData.pincode} onChange={handleChange} />
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
                
                  <div className="submit-section">
                    <button type="submit" className="btn btn-primary submit-btn">Save Changes</button>
                  </div>
                        </form>
              </div>
            </div>
          </div>
        </div>
        </>
      )}
        {userData.role === 'student' && (
          <>
          <div className='container'>
            <ToastContainer />
            <h4 className="card-title" style={{position:'center'}}>Update Student Credentials</h4>

            <div className="col-md-7 col-lg-8 col-xl-9" style={{ width: '100%' }}>
            <form onSubmit={updateCred}>

                <div className="card" style={{ width: 'inherit' }}>
                    <div className="card-body">
                    <div className="row">

                     <div className="col-12 col-md-4">
                        <div className="mb-3">
                          <label className="mb-2" htmlFor="email">Email:</label>
                          <input type="email" className="form-control" id="email" name="email" placeholder="Enter Email" required value={userData.email} onChange={handleChange} />
                        </div>
                      
                      </div>
                      <div className="col-12 col-md-4">
                        <div className="mb-3">
                          <label className="mb-2" htmlFor="role">Role:</label>
                          <select id="role" name="role" required value={userData.role} onChange={handleChange}>
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                            <option value="student">Student</option>
                          </select>
                        </div>
                      </div>
                      
            <div className="row">

            <div className="col-12 col-md-4">
              <div className="mb-3">
                <label className="mb-2" htmlFor="password">Password:</label>
                <input
                  className="form-control"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="******"
                  onChange={handleChange}
                />
              </div>
            </div>
                    

            <div className="col-12 col-md-4">
              <div className="mb-3">
                <label className="mb-2" htmlFor="confPassword">Confirm Password:</label>
                <input
                  className="form-control"
                  type={showPassword ? 'text' : 'password'}
                  id="confPassword"
                  name="confPassword"
                  placeholder="******"
                  value={userData.confPassword}
                  onChange={handleChange}
                />
              </div>
            </div>  
            
            </div>          


            
            </div>
            </div>
            </div><div className="submit-section">
                    <button type="submit" className="btn btn-primary submit-btn">Save Changes</button>
            </div></form>
            </div></div>
          </>
          


        )}
            </>

      );
    // return (
    //     <div className="container" style={{ maxWidth: '650px', margin: '50px auto', padding: '20px', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
    //         <h2 style={titleStyle}>Update User</h2>
    //         <form onSubmit={updateUser}>
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
    //             <div className="form-group ">
    //                 <label htmlFor="confPassword">Confirm Password:</label>
    //                 <input type="password" id="confPassword" name="confPassword" style={{ flexBasis: 'calc(50% - 5px)' }} placeholder="******" required value={userData.confPassword} onChange={handleChange} />
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
    //                 <button type="submit" className="button is-success" style={{ backgroundColor: '#3c91e6', color: 'white' }}>Update</button>
    //             </div>
    //         </form>
    //     </div>
    // );
};

export default FormEditUser;
