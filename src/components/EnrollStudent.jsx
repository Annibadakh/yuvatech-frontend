// EnrollStudent.js
import React from 'react';
import { useFormContext } from './MultiStepFormContext';

const EnrollStudent = () => {
  const { enrollStudentData, setEnrollStudentData } = useFormContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEnrollStudentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Enroll Student</h2>
      <form>
        <input
          type="text"
          name="firstName"
          placeholder="Enter First Name"
          value={enrollStudentData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="middleName"
          placeholder="Enter Middle Name"
          value={enrollStudentData.middleName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Enter Last Name"
          value={enrollStudentData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="dob"
          value={enrollStudentData.dob}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="mobile"
          pattern="[0-9]{10}"
          placeholder="Enter Mobile"
          value={enrollStudentData.mobile}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={enrollStudentData.email}
          onChange={handleChange}
          required
        />
        <div>
          <label>Gender:</label>
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={enrollStudentData.gender === 'Male'}
            onChange={handleChange}
            required
          />
          Male
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={enrollStudentData.gender === 'Female'}
            onChange={handleChange}
          />
          Female
          <input
            type="radio"
            name="gender"
            value="Other"
            checked={enrollStudentData.gender === 'Other'}
            onChange={handleChange}
          />
          Other
        </div>
      </form>
    </div>
  );
};

export default EnrollStudent;
