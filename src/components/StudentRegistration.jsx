
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './StudentRegistration.css';
import Swal from 'sweetalert2';
import Loader from '../loader/Loader';
import { set } from 'lodash';
function StudentRegistrationForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        mobile: '',
        alternatemobile:'',
        email: '',
        dob: '',
        city: '',
        state: '',
        pincode: '',
        occupation: '',
        courses: [], // Courses array to hold selected course IDs
        address: '',
        gender: '',
    });
    const [courses, setCourses] = useState([]);
    const [message, setMessage] = useState('');
    // const [studentId, setStudentId] = useState(null); // State to hold the studentId
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const dropdownRef = useRef(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
const [loading,setloading] = useState(false);
    useEffect(() => {
        const fetchCourses = async () => {
            setloading(true);
            try {
                const response = await axios.get(`${apiUrl}/courses`);
                setCourses(response.data);
            } catch (error) {
                setMessage('Failed to fetch courses');
            }
            finally{
                setloading(false);
            }
        };
        fetchCourses();
    }, [apiUrl]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    // const { studentId } = response.data; // Extract studentId from server response

    // const handleChange = (e) => {
    //     const { name, value, type, checked } = e.target;
    //     if (type === 'checkbox') {
    //         setFormData(prevState => ({
    //             ...prevState,
    //             [name]: checked,
    //         }));
    //     } else {
    //         setFormData(prevState => ({
    //             ...prevState,
    //             [name]: value,
    //         }));
    //     }
    // };
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
    
        if (type === 'checkbox') {
            setFormData((prevState) => ({
                ...prevState,
                [name]: checked,
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: ["firstName", "middleName", "lastName"].includes(name)
                    ? value.toUpperCase() // Convert to uppercase for specific fields
                    : value, // Leave other fields unchanged
            }));
        }
    };

    const handleCourseSelection = (courseId) => {
        setFormData(prevState => {
            const selectedCourses = prevState.courses.includes(courseId)
                ? prevState.courses.filter(id => id !== courseId)
                : [...prevState.courses, courseId];
            return {
                ...prevState,
                courses: selectedCourses,
            };
        });
        setDropdownOpen(false);
    };
    const handleSaveAndExit = async (e) => {
        e.preventDefault();
        await handleSubmit(e, '/studentinfo');
        Swal.fire({
            icon: 'success',
            title: 'Enquiry Added Successfully',
            text: '',
        });
    };

    const handleSubmit = async (e, redirectPath = `/register`) => {
        e.preventDefault();
        setloading(true);
        try {
            // Map courses array to courseIds array
            const courseIds = formData.courses.map(courseId => courseId);
    
            // Update formData to include courseIds instead of courses
            const formDataWithCourseIds = {
                ...formData,
                courseIds: courseIds,
                courses: undefined, // Remove courses from formData
            };
    
            console.log('Form Data Before Submission:', formDataWithCourseIds); // Debugging: Log formData before submission
            const response = await axios.post(`${apiUrl}/students`, formDataWithCourseIds); // Ensure formData includes courseIds
            console.log('Response from Server:', response.data.student.studentId); // Debugging: Log response from server
            const studentId = response.data.student.studentId; // Extract studentId from server response
            console.log(`Student Id is ${studentId}`);
    
            
    
            // Set the studentId received from the server response
            // setStudentId(response.data.studentId);
            navigate(`${redirectPath}?studentId=${studentId}`);
    
        } catch (error) {
            console.error('Error registering student:', error); // Debugging: Log error if registration fails
            Swal.fire({
                icon: 'error',
                title: 'Failed to register student',
                text: 'Student with this email already exists',
            });
        }
        finally{
            setloading(false);
        }
    };
    
    

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         // Map courses array to courseIds array
    //         const courseIds = formData.courses.map(courseId => courseId);
    
    //         // Update formData to include courseIds instead of courses
    //         const formDataWithCourseIds = {
    //             ...formData,
    //             courseIds: courseIds,
    //             courses: undefined, // Remove courses from formData
    //         };
    
    //         console.log('Form Data Before Submission:', formDataWithCourseIds); // Debugging: Log formData before submission
    //         const response = await axios.post(`${apiUrl}/students`, formDataWithCourseIds); // Ensure formData includes courseIds
    //         console.log('Response from Server:', response.data.student.studentId); // Debugging: Log response from server
    //         const  studentId  = response.data.student.studentId; // Extract studentId from server response
    //         console.log(`Student Id is ${studentId}`);
    
    //         Swal.fire({
    //             icon: 'success',
    //             title: 'Registration Successful',
    //             text: '',
    //         });

    //         // Set the studentId received from the server response
    //         // setStudentId(response.data.studentId);
    //         navigate(`/register?studentId=${studentId}`);


    //     } catch (error) {
    //         console.error('Error registering student:', error); // Debugging: Log error if registration fails
    //         Swal.fire({
    //             icon: 'error',
    //             title: 'Failed to register student',
    //             text: 'Student with this email already exists',
    //         });
    //     }
    // };
    
    const handleReset = () => {
        setFormData({
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
            courses: [], // Reset courses array
            address: '',
            gender: '',
        });
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const titleStyle = {
        fontFamily: 'Times New Roman, Times, serif'
    };

    // useEffect(() => {
    //     // Redirect to /register with studentId in URL params
    //     if (studentId) {
    //         navigate(`/register?studentId=${studentId}`);
    //     }
    // }, [studentId, navigate]);
    if(loading){
       return <Loader/>
    }
    return (
        <div className="container">
            <div className="col-md-7 col-lg-8 col-xl-9" style={{ width: '100%' }}>
            <div className="card" style={{ width: 'inherit' }}>
              <div className="card-body">
            <h2 style={titleStyle}></h2><br />
            {message && <p className="error-message">{message}</p>}
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>        
                
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
                    <input type="email"  className="form-control" name="email" value={formData.email} onChange={handleChange} />
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="mb-3">
                    <label className="mb-2">Occupation <span className="text-danger"> *</span></label>
                    <input type="text"  className="form-control" name="occupation" value={formData.occupation} onChange={handleChange}  />
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
                    <div className="col-12 row-md-4">
                    <div className="mb-3">
                        <div className="custom-dropdown" ref={dropdownRef}>
                        <label htmlFor="courses">Courses:</label>

                            <div className="custom-dropdown-selected" onClick={toggleDropdown}>
                                {formData.courses.length > 0 ? formData.courses.map(courseId => {
                                    const course = courses.find(c => c.courseId === courseId);
                                    return (
                                        <div key={courseId} className="selected-course">
                                            {course.name}
                                            <span className="remove-course" onClick={(e) => {
                                                e.stopPropagation();
                                                handleCourseSelection(courseId);
                                            }}>×</span>
                                        </div>
                                    );
                                }) : 'Select Courses'}
                            </div>
                            {dropdownOpen && (
                                <div className="custom-dropdown-options">
                                    {courses.filter(course => !formData.courses.includes(course.courseId)).map(course => (
                                        <div
                                            key={course.courseId}
                                            className="custom-dropdown-option"
                                            onClick={() => handleCourseSelection(course.courseId)}
                                        >
                                            {course.name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div></div>
                    
                    
                                
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
                        <label className="mb-2">Zip Code <span className="text-danger"> *</span></label>
                        <input type="text" className="form-control" name="zip" value={formData.zip} onChange={handleChange} />
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

                {/* <div className="form-column">

                    <label htmlFor="address" >Address:</label>
                    <textarea id="address"className="form-column" name="address" rows="4" placeholder="Enter Address" required value={formData.address} onChange={handleChange}></textarea>
                </div> */}

               <div className="form-group">
                        <button type="reset" onClick={handleReset}>Reset</button>
                        <button type="submit">Submit and Next </button>
                        <button type="button" onClick={handleSaveAndExit}>Save and Exit</button>
                </div>

            </form>
        </div>
        </div>
        </div>
        </div>
    );
}

export default StudentRegistrationForm;
