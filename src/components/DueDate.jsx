import React, { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';



const DueDate = () => {
    const { enrollmentId } = useParams();
    const [selectedDate, setSelectedDate] = useState("");
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const navigate = useNavigate();
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Selected Date:", selectedDate);

        try {
          const response = await axios.patch(`${apiUrl}/updateDueDate/${enrollmentId}`, {
            dueDate: selectedDate, // Data being sent in the PATCH request
          });
    
          console.log("Response from server:", response.data);
          if (response.status === 200) {
            console.log("Date updated successfully!");
          }
          Swal.fire({
            icon: 'success',
            title: 'DueDate Updated Successfully',
            text: '',
          });
          
          navigate('/courses/viewenrollments');
        } catch (error) {
          console.error("Error while updating date:", error.response?.data || error.message);
          Swal.fire({
            icon: 'error',
            title: 'Error updating DueDate',
            text: '',
          });
        }
      };
    return(
        <>
        <form 
          onSubmit={handleSubmit} 
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            maxWidth: '300px',
            margin: '0 auto'
          }}
        >
              <label htmlFor="date-input">Select New Due Date:</label>
              <input
                type="date"
                id="date-input"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                required
              />
              <div className="form-actions">
                <button type="submit">Submit</button>
              </div>
        </form>
        </>
        
    );
}

export default DueDate;