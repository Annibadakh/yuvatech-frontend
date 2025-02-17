import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './StudentRegistration.css';
import Swal from 'sweetalert2';
import Loader from '../loader/Loader';

function EditEnrollmentForm() {
    const { enrollmentId } = useParams();
    const [formData, setFormData] = useState({
        studentId: '',
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
        status: '',
        address: '',
        gender: '',
        addressLine1: '',
        addressLine2: '',
        taluka: '',
        district: '',
        country: '',

    });
    const [courses, setCourses] = useState([]);
    const [message, setMessage] = useState('');
    const apiUrl = process.env.REACT_APP_API_BASE_URL
  const [loading, setLoading] = useState(false); // Loading state

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${apiUrl}/enroll/${enrollmentId}`)
            .then(response => {
                const { student, courseId, status, ...enrollmentData } = response.data;
                setFormData(prevState => ({
                    ...prevState,
                    ...student,
                    courseId,
                    status,
                    ...enrollmentData
                }));
            })
            .catch(error => setMessage('Failed to fetch enrollment data: ' + error.message));

        axios.get(`${apiUrl}/courses`)
            .then(response => setCourses(response.data))
            .catch(error => setMessage('Failed to fetch courses: ' + error.message));
    }, [enrollmentId]);

    useEffect(() => {
        if (formData.studentId) {
            axios.get(`${apiUrl}/students/${formData.studentId}`)
                .then(response => {
                    const { firstName, middleName, lastName, mobile,alternatemobile, email, dob, city, state, pincode, occupation, address, addressLine1,addressLine2,gender,taluka,district,country } = response.data;
                    setFormData(prevState => ({
                        ...prevState,
                        firstName,
                        middleName,
                        lastName,
                        mobile,
                        alternatemobile,

                        email,
                        dob,
                        city,
                        state,
                        pincode,
                        occupation,
                        address,
                        addressLine1,
                        addressLine2,
                        taluka,
                        district ,
                        country,

                        gender
                    }));
                })
                .catch(error => setMessage('Failed to fetch student details: ' + error.message));
        }
    }, [formData.studentId]);
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Update student information
            await axios.patch(`${apiUrl}/students/${formData.studentId}`, {
                firstName: formData.firstName,
                middleName: formData.middleName,
                lastName: formData.lastName,
                mobile: formData.mobile,
                alternatemobile: formData.alternatemobile,

                email: formData.email,
                dob: formData.dob,
                city: formData.city,
                state: formData.state,
                pincode: formData.pincode,
                occupation: formData.occupation,
                address: formData.address,
                gender: formData.gender,
                addressLine1: formData.addressLine1,
                addressLine2: formData.addressLine2,
                taluka: formData.taluka,
                district: formData.district,
                country: formData.country

            });

            // Update enrollment details
            await axios.patch(`${apiUrl}/enroll/${enrollmentId}`, {
                courseId: formData.courseId,
                status: formData.status,
                address: formData.address,
                gender: formData.gender
            });
            Swal.fire({
                icon: 'success',
                title: 'Enrollment Updated Successfully',
                text: '',
              });

            navigate('/courses/viewenrollments');
        } catch (error) {
            setMessage('Failed to update student/enrollment: ' + error.message);
        }
        finally {
          setLoading(false); // End loading
        }
    };
    const titleStyle = {
        fontFamily: 'Times New Roman, Times, serif'
      };
      

    const handleReset = () => {
        setFormData({
            studentId: '',
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
            status: '',
            address: '',
            gender: '',
            addressLine1: '',
            addressLine2: '',
            taluka: '',
            district: '',
            country: '',

        });
    };

    
  if (loading) {
    return <Loader />;
  }

    return (
        <div className="container">
            <h2 style={titleStyle}>ENROLLMENT FORM</h2>
            {message && <p className="error-message">{message}</p>}
            <form onSubmit={handleSubmit}>
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
<input type="email"  className="form-control" name="email" value={formData.email} />
</div>
</div>
<div className="col-12 col-md-4">
<div className="mb-3">
<label className="mb-2">Occupation <span className="text-danger"> *</span></label>
<input type="text"  className="form-control" name="occupation" value={formData.occupation} />
</div>
</div>


<div className="col-12 col-md-4">
    <div className="mb-3">
        <label>Gender:</label>
        <label className="mb-2">Gender <span className="text-danger"> *</span></label>
<select  name="gender" value={formData.gender} onChange={handleChange}>
  <option value="">Select</option>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
  <option value="Other">Other</option>
</select>
    </div>
</div>  
    <div className="col-12 col-md-4">
    <div className="mb-3">
                        <label htmlFor="studentId">Student ID:</label>
                        <input type="text" id="studentId" name="studentId" placeholder="Enter Student ID" required value={formData.studentId} onChange={handleChange} /><br />
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <label htmlFor="courseId">Course:</label>
                    <select id="courseId" name="courseId" required value={formData.courseId} onChange={handleChange}>
                        <option value="">Select a Course</option>
                        {courses.map(course => (
                            <option key={course.courseId} value={course.courseId}>{course.name}</option>
                        ))}
                    </select>
                </div>
                
                <div className="col-12 col-md-4">
                <label htmlFor="status">Status:</label>
                    <select id="status" name="status" required value={formData.status} onChange={handleChange}>
                        <option value="">Select Status</option>
                        <option value="completed">Completed</option>
                        <option value="enrolled">Enrolled</option>
                        <option value="dropped">Cancelled</option>
                    </select>
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
    <label className="mb-2">Zip Code <span className="text-danger"> *</span></label>
    <input type="text" className="form-control" name="zip" value={formData.pincode} onChange={handleChange} />
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
                    
                    <button type="submit">Submit</button>
                    <button type="reset" onClick={handleReset}>Reset</button>
                </div>
            </form>
        </div>
    );
}

export default EditEnrollmentForm;

