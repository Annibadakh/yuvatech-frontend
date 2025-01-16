
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button } from 'reactstrap';
import { useMultiStepForm } from './MultiStepFormContext';
import './StudentRegistration.css';
import Swal from 'sweetalert2';
import Loader from '../loader/Loader';
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
const[loading,setLoading] = useState(false);
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
        }finally {
          setLoading(false);  
        }
      
      }  
    };
  
    fetchEnrollmentDetails();
  }, [enrollmentId, apiUrl]);
  
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: ["firstName", "middleName", "lastName"].includes(name)
        ? value.toUpperCase()
        : value, // Convert to uppercase for specific fields
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
    setLoading(true);
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
    finally {
      setLoading(false);  
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

  if (loading) {
    return <Loader />;
  }


  return (
    <div className="container">
      <h2 style={{marginBottom:"10px"}}>ENROLLMENT FORM</h2>
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
          <button style={{marginTop:"10px"}} type="button"onClick={handleReset}>Reset</button>
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
