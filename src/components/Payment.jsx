// // // // Payment.js
// // // import React, { useState } from 'react';
// // // import { useFormContext } from './MultiStepFormContext';
// // // import axios from 'axios';
// // // import Swal from 'sweetalert2';
// // // import { useNavigate } from 'react-router-dom';

// // // const Payment = () => {
// // //   const { enrollStudentData, addDocumentsData, paymentData, setPaymentData, next } = useFormContext();
// // //   const navigate = useNavigate();
// // //   const apiUrl = process.env.REACT_APP_API_BASE_URL;

// // //   const handleChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setPaymentData((prevData) => ({
// // //       ...prevData,
// // //       [name]: value,
// // //     }));
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
    // const formData = {
    //   ...enrollStudentData,
    //   ...addDocumentsData,
    //   ...paymentData,
    // };
// // //     try {
// // //       const response = await axios.post(`${apiUrl}/students`, formData);
// // //       Swal.fire({
// // //         icon: 'success',
// // //         title: 'Registration Successful',
// // //         text: '',
// // //       });
// // //       navigate('/studentinfo');
// // //     } catch (error) {
// // //       Swal.fire({
// // //         icon: 'error',
// // //         title: 'Failed to register student',
// // //         text: 'Student With Email Already Exists',
// // //       });
// // //     }
// // //   };

// // //   return (
// // //     <div>
// // //       <h2>Payment</h2>
// // //       <form onSubmit={handleSubmit}>
// // //         <input
// // //           type="text"
// // //           name="course"
// // //           placeholder="Enter Course"
// // //           value={paymentData.course}
// // //           onChange={handleChange}
// // //           required
// // //         />
// // //         <button type="submit">Submit</button>
// // //       </form>
// // //     </div>
// // //   );
// // // };

// // // export default Payment;
// // import React, { useState } from 'react';
// // import axios from 'axios';

// // const Payment = () => {
// //     const [enrollmentId, setEnrollmentId] = useState('');
// //     const [totalFees, setTotalFees] = useState(null);
// //     const [discount, setDiscount] = useState(0);
// //     const [applicableFees, setApplicableFees] = useState(null);
// //     const [message, setMessage] = useState('');

// //     const fetchFees = async () => {
// //         try {
// //             const response = await axios.get(`http://localhost:5000/fees/${enrollmentId}`);
// //             setTotalFees(response.data.totalFees);
// //             setApplicableFees(response.data.totalFees - discount);
// //         } catch (error) {
// //             setMessage('Error fetching fees: ' + (error.response?.data?.error || error.message));
// //         }
// //     };

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         try {
// //             const response = await axios.post('http://localhost:5000/set-fees', {
// //                 enrollmentId,
// //                 discount: parseInt(discount, 10),
// //             });
// //             setMessage(response.data.message);
// //             setApplicableFees(totalFees - discount);
// //         } catch (error) {
// //             setMessage('Error setting fees: ' + (error.response?.data?.error || error.message));
// //         }
// //     };

// //     return (
// //         <div>
// //             <h2>Set Fees for Enrollment</h2>
// //             <div>
// //                 <label htmlFor="enrollmentId">Enrollment ID:</label>
// //                 <input
// //                     type="text"
// //                     id="enrollmentId"
// //                     value={enrollmentId}
// //                     onChange={(e) => setEnrollmentId(e.target.value)}
// //                 />
// //                 <button onClick={fetchFees}>Fetch Fees</button>
// //             </div>
// //             {totalFees !== null && (
// //                 <>
// //                     <div>
// //                         <label htmlFor="totalFees">Total Fees:</label>
// //                         <input type="number" id="totalFees" value={totalFees} readOnly />
// //                     </div>
// //                     <div>
// //                         <label htmlFor="discount">Discount:</label>
// //                         <input
// //                             type="number"
// //                             id="discount"
// //                             value={discount}
// //                             onChange={(e) => {
// //                                 setDiscount(e.target.value);
// //                                 setApplicableFees(totalFees - e.target.value);
// //                             }}
// //                             required
// //                         />
// //                     </div>
// //                     <div>
// //                         <label htmlFor="applicableFees">Applicable Fees:</label>
// //                         <input type="number" id="applicableFees" value={applicableFees} readOnly />
// //                     </div>
// //                 </>
// //             )}
// //             <form onSubmit={handleSubmit}>
// //                 <button type="submit">Set Fees</button>
// //             </form>
// //             {message && <p>{message}</p>}
// //         </div>
// //     );
// // };

// // export default Payment;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
// // import './Payment.css';  // Assuming you have a CSS file for styling

// const Payment = () => {
//     const [enrollmentId, setEnrollmentId] = useState('');
//     const [totalFees, setTotalFees] = useState(null);
//     const [discount, setDiscount] = useState(0);
//     const [applicableFees, setApplicableFees] = useState(null);
//     const [message, setMessage] = useState('');

//     const fetchFees = async () => {
//         try {
//             const response = await axios.get(`http://localhost:5000/fees/${enrollmentId}`);
//             setTotalFees(response.data.totalFees);
//             setApplicableFees(response.data.totalFees - discount);
//         } catch (error) {
//             setMessage('Error fetching fees: ' + (error.response?.data?.error || error.message));
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:5000/set-fees', {
//                 enrollmentId,
//                 discount: parseInt(discount, 10),
//             });
//             setMessage(response.data.message);
//             setApplicableFees(totalFees - discount);
//         } catch (error) {
//             setMessage('Error setting fees: ' + (error.response?.data?.error || error.message));
//         }
//     };

//     return (
//         <div className="payment-container">
//             <h2>Set Fees for Enrollment</h2>
//             <div className="fetch-fees">
//                 <FormGroup>
//                     <Label htmlFor="enrollmentId">Enrollment ID:</Label>
//                     <Input
//                         type="text"
//                         id="enrollmentId"
//                         value={enrollmentId}
//                         onChange={(e) => setEnrollmentId(e.target.value)}
//                     />
//                 </FormGroup>
//                 <Button color="primary" onClick={fetchFees}>Fetch Fees</Button>
//             </div>
//             {totalFees !== null && (
//                 <>
//                     <FormGroup>
//                         <Label htmlFor="totalFees">Total Fees:</Label>
//                         <Input type="number" id="totalFees" value={totalFees} readOnly />
//                     </FormGroup>
//                     <FormGroup>
//                         <Label htmlFor="discount">Discount:</Label>
//                         <Input
//                             type="number"
//                             id="discount"
//                             value={discount}
//                             onChange={(e) => {
//                                 setDiscount(e.target.value);
//                                 setApplicableFees(totalFees - e.target.value);
//                             }}
//                             required
//                         />
//                     </FormGroup>
//                     <FormGroup>
//                         <Label htmlFor="applicableFees">Applicable Fees:</Label>
//                         <Input type="number" id="applicableFees" value={applicableFees} readOnly />
//                     </FormGroup>
//                 </>
//             )}
//             <Form onSubmit={handleSubmit}>
//                 <Button type="submit" color="success">Set Fees</Button>
//             </Form>
//             {message && <p className="message">{message}</p>}
//         </div>
//     );
// };

// export default Payment;

// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { debounce } from 'lodash';
// import { useLocation } from 'react-router-dom';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import styles from './PaymentForm.module.css';
// import Invoice from './Invoice'; // Adjust the path as per your project structure

// function Payment() {
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const enrollmentIdFromParams = searchParams.get('enrollmentId');

//   const [paymentData, setPaymentData] = useState({
//     enrollmentId: enrollmentIdFromParams ? enrollmentIdFromParams : '',
//     studentName: '',
//     paymentAmount: '',
//     balanceAmount: '',
//     newBalanceLeft: '',
//     paymentMode: '',
//     notes: '',
//     discount: '', // Added discount field
//   });
  // const handleChange = async (e) => {
  //   const { name, value } = e.target;
  //   setPaymentData(prev => ({ ...prev, [name]: value }));

  //   if (name === 'paymentAmount' && value) {
  //     validatePaymentAmount(value, paymentData.balanceAmount, paymentData.discount);
  //   }

  //   if (name === 'discount' && value) {
  //     validatePaymentAmount(paymentData.paymentAmount, paymentData.balanceAmount, value);
  //   }

  //   if (name === "enrollmentId") {
  //     setPaymentData(prev => ({ ...prev, [name]: value }));
  //     await fetchEnrollmentById(value);
  //   }
  // };


  // const validatePaymentAmount = (paymentAmount, balanceAmount, discount) => {
  //   const paymentAmountFloat = parseFloat(paymentAmount);
  //   const balanceAmountFloat = parseFloat(balanceAmount);
  //   const discountFloat = parseFloat(discount);
  //   const newBalanceLeft = balanceAmountFloat - paymentAmountFloat - discountFloat;

  //   if (newBalanceLeft < 0) {
  //     setErrors(prev => ({ ...prev, paymentAmountError: 'Payment amount and discount cannot exceed the balance amount.' }));
  //   } else {
  //     setErrors(prev => ({ ...prev, paymentAmountError: '' }));
  //     setPaymentData(prev => ({ ...prev, newBalanceLeft: newBalanceLeft.toFixed(2) }));
  //   }
  // };
  import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { debounce } from 'lodash';
import { useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import styles from './PaymentForm.module.css';
import Invoice from './Invoice'; // Adjust the path as per your project structure
import html2pdf from 'html2pdf.js';

function Payment({ studentId, enrollmentId, courseId }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const enrollmentIdFromParams = searchParams.get('enrollmentId') || enrollmentId;

  const [paymentData, setPaymentData] = useState({
    enrollmentId: enrollmentIdFromParams ? enrollmentIdFromParams : enrollmentId,
    studentName: '',
    paymentAmount: '',
    balanceAmount: '',
    newBalanceLeft: '',
    paymentMode: '',
    notes: '',
    discount: '',
    totalFees: '',
    courseName: '',
    address: '',
    duedate: '',
  });

  const [errors, setErrors] = useState({});
  const [receipt, setReceipt] = useState(null);
  const [email, setEmail] = useState('');
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const [buttonsVisible, setButtonsVisible] = useState(true);

  const [amountdata, setAmountData] = useState({
    totalamount: 0,
    expenses: 0,
    balance: 0
  });

  useEffect(() => {
    fetchAmountData();
  }, []);

  const fetchAmountData = () => {
    axios.get(`${apiUrl}/amount/list`)
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Failed to fetch amount data');
        }
        return res.data; // Assuming the response data contains the amount data
      })
      .then(data => {
        const fetchedData = data.amountdata;
        console.log('Amount data fetched successfully:', fetchedData);
        setAmountData(fetchedData);
      })
      .catch(err => console.error('Error fetching amount data:', err));
  };

  useEffect(() => {
    fetchEnrollments().catch((err) => {
      Swal.fire('Error', 'Failed to fetch enrollments.', 'error');
    });
  }, []);

  async function fetchEnrollments() {
    const response = await axios.get(`${apiUrl}/enroll`);
    return response.data;
  }

  useEffect(() => {
    if (enrollmentIdFromParams) {
      fetchEnrollmentById(enrollmentIdFromParams);
    }
  }, [enrollmentIdFromParams]);

  useEffect(() => {
    if (studentId) {
      fetchStudentById(studentId);
    }
    if (courseId) {
      fetchCourseById(courseId);
    }
  }, [studentId, courseId]);

  const fetchStudentById = async (id) => {
    if (!id) return;
    try {
      const response = await axios.get(`${apiUrl}/students/${id}`);
      const student = response.data;
      const studentName = `${student?.firstName || ''} ${student?.middleName || ''} ${student?.lastName || ''}`.trim();

      setPaymentData((prev) => ({
        ...prev,
        studentName,
        address: [
          student?.addressLine1 || '',
          student?.addressLine2 || '',
          student?.city || '',
          student?.district || '',
          student?.taluka || '',
          student?.state || '',
          student?.country || '',
        ]
          .filter(part => part.trim() !== '') // Filter out empty parts
          .join(', '), // Join non-empty parts with a comma
      }));
      
    } catch (error) {
      Swal.fire('Error', 'Failed to fetch student by ID.', 'error');
      setPaymentData((prev) => ({ ...prev, studentName: '', address: '' }));
    }
  };

  const fetchCourseById = async (id) => {
    if (!id) return;
    try {
      const response = await axios.get(`${apiUrl}/courses/${id}`);
      const course = response.data;
      const totalFees = course?.courseFees + course?.examFees || 0;
      setPaymentData((prev) => ({
        ...prev,
        courseName: course?.name || '',
        totalFees: totalFees.toString(),
      }));
    } catch (error) {
      Swal.fire('Error', 'Failed to fetch course by ID.', 'error');
      setPaymentData((prev) => ({ ...prev, courseName: '', totalFees: '' }));
    }
  };

  const fetchEnrollmentById = async (id) => {
    if (!id) return;
    try {
      const response = await axios.get(`${apiUrl}/enroll/${id}`);
      const enrollment = response.data;
      updatePaymentDataFromEnrollment(enrollment);
    } catch (error) {
      Swal.fire('Error', 'Failed to fetch enrollment by ID.', 'error');
      setPaymentData((prev) => ({
        ...prev,
        studentName: '',
        balanceAmount: '',
        newBalanceLeft: '',
      }));
    }
  };

  const updatePaymentDataFromEnrollment = (enrollment) => {
    const courseFees = enrollment?.course?.courseFees || 0;
    const examFees = enrollment?.course?.examFees || 0;
    const totalFees = courseFees + examFees;
    setPaymentData((prev) => ({
      ...prev,
      studentName: enrollment?.studentName || '',

      balanceAmount: enrollment?.balanceAmount?.toString() || '',
      newBalanceLeft: enrollment?.balanceAmount?.toString() || '',
      totalFees: totalFees.toString(),
      courseName: enrollment.course?.name || '',
      address: enrollment.student?.address || '',
    }));
  };

  const debouncedFetchEnrollmentById = useCallback(
    debounce((id) => {
      fetchEnrollmentById(id);
    }, 1000),
    []
  );

  // const handleChange = async (e) => {
  //   const { name, value } = e.target;

  //   let paymentAmount = parseFloat(value);
  //   if (name !== 'paymentAmount') {
  //     paymentAmount = parseFloat(paymentData.paymentAmount) || 0;
  //   }

  //   let discount = parseFloat(value);
  //   if (name !== 'discount') {
  //     discount = parseFloat(paymentData.discount) || 0;
  //   }

  //   const totalFees = parseFloat(paymentData.totalFees) || 0;
  //   const applicableFees = totalFees - discount;

  //   const newBalanceLeft = isNaN(applicableFees - paymentAmount)
  //     ? paymentData.balanceAmount
  //     : applicableFees - paymentAmount;

  //   setPaymentData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //     applicableFees: applicableFees.toFixed(2),
  //     newBalanceLeft: newBalanceLeft.toFixed(2),
  //   }));

  //   if (name === 'enrollmentId') {
  //     await fetchEnrollmentById(value);
  //   }
  // };

  // const validatePaymentAmount = (paymentAmount, balanceAmount, discount) => {
  //   const totalFees = parseFloat(paymentData.totalFees || 0);
  //   const applicableFees = totalFees - parseFloat(discount || 0);
  //   const newBalanceLeft = applicableFees - parseFloat(paymentAmount || 0);

  //   if (newBalanceLeft < 0) {
  //     setErrors((prev) => ({
  //       ...prev,
  //       paymentAmountError: 'Payment amount cannot exceed the applicable fees.',
  //     }));
  //   } else {
  //     setErrors((prev) => ({ ...prev, paymentAmountError: '' }));
  //     setPaymentData((prev) => ({
  //       ...prev,
  //       newBalanceLeft: newBalanceLeft.toFixed(2),
  //     }));
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (errors.paymentAmountError) {
  //     Swal.fire('Error', errors.paymentAmountError, 'error');
  //     return;
  //   }

  //   try {
  //     const paymentDetails = {
  //       amount: parseFloat(paymentData.paymentAmount),
  //       paymentMethod: paymentData.paymentMode,
  //       notes: paymentData.notes,
  //     };

  //     const enrollResponse = await axios.post(`${apiUrl}/enroll`, {
  //       studentId: studentId,
  //       courseId: courseId,
  //       discount: parseFloat(paymentData.discount),
  //       paymentDetails,
  //     });

  //     const enrollmentId = enrollResponse.data.payment.enrollmentId;

  //     setPaymentData((prev) => ({
  //       ...prev,
  //       enrollmentId: enrollmentId,
  //     }));

  //     const addressData = await fetchAddress();
  //     const fullAddress = `${addressData.addressLine1}, ${addressData.addressLine2}, ${addressData.city}, ${addressData.district}, ${addressData.taluka}, ${addressData.state}, ${addressData.country}`;
  //     const receiptData = {
  //       enrollmentId: enrollmentId,
  //       studentName: paymentData.studentName,
  //       address: paymentData.address,
  //       paymentAmount: paymentData.paymentAmount,
  //       paymentMode: paymentData.paymentMode,
  //       notes: paymentData.notes,
  //       date: new Date().toLocaleString(),
  //       applicableFees: paymentData.applicableFees,
  //       newBalanceLeft: paymentData.newBalanceLeft,
  //       fullAddress: fullAddress,
  //       courses: [
  //         {
  //           name: paymentData.courseName,
  //           totalFees: paymentData.applicableFees,
  //           amountPaid: paymentData.paymentAmount,
  //           pendingFees: '$1000',
  //         },
  //       ],
  //     };

  //     setReceipt(receiptData);

  //     Swal.fire('Success', 'Payment submitted successfully!', 'success');
  //   } catch (error) {
  //     Swal.fire('Error', 'Failed to submit payment.', 'error');
  //   }
  // };

  // const handlePrint = async () => {
  //   const element = document.getElementById('receiptContainer');
  //   if (!element) {
  //     console.error('Receipt container not found');
  //     return;
  //   }

  //   const canvas = await html2canvas(element);
  //   const imgData = canvas.toDataURL('image/png');
  //   const pdf = new jsPDF({
  //     orientation: 'portrait',
  //     unit: 'mm',
  //     format: 'a4',
  //   });
  //   pdf.addImage(
  //     imgData,
  //     'PNG',
  //     0,
  //     0,
  //     pdf.internal.pageSize.getWidth(),
  //     pdf.internal.pageSize.getHeight()
  //   );
  //   pdf.save('payment_receipt.pdf');
  // };

  // const debouncedFetchEnrollmentById = useCallback(debounce((id) => {
  //   fetchEnrollmentById(id);
  // }, 1000), []);


// const handleChange = async (e) => {
//   const { name, value } = e.target;

//   let paymentAmount = parseFloat(paymentData.paymentAmount) || 0;
//   let discount = parseFloat(paymentData.discount) || 0;
//   if (name === 'paymentAmount') {
//     paymentAmount = parseFloat(value) || 0;
//   }
//   if (name === 'discount') {
//     discount = parseFloat(value) || 0;
//   }

//   const totalFees = parseFloat(paymentData.totalFees) || 0;
//   const applicableFees = totalFees - discount;
//   console.log(`Applicable fees ${applicableFees}`);
  
//   const newBalanceLeft = isNaN(applicableFees - paymentAmount) ? parseFloat(paymentData.balanceAmount) || 0 : applicableFees - paymentAmount;
// console.log(newBalanceLeft);


//   setPaymentData(prev => ({
//     ...prev,
//     [name]: value,
//     applicableFees: isNaN(applicableFees) ? '' : applicableFees.toFixed(2),
//     newBalanceLeft: isNaN(newBalanceLeft) ? '' : newBalanceLeft.toFixed(2),
    
//   }));
//   setPaymentData(prev => ({ ...prev, newBalanceLeft: newBalanceLeft.toFixed(2) }));

//   if (name === 'enrollmentId') {
//     await fetchEnrollmentById(value);
//   }
//   validatePaymentAmount(paymentAmount, discount); // Validate on input change

// };

  
  
  
//   const validatePaymentAmount = (paymentAmount, balanceAmount, discount) => {
//     const totalFees = parseFloat(paymentData.totalFees || 0);
//     const applicableFees = totalFees - parseFloat(discount || 0);


    
//     console.log(`in applicable fees ${applicableFees}`);
    

//     // const newBalanceLeft = applicableFees - parseFloat(paymentAmount || 0);
//     const newBalanceLeft = isNaN(applicableFees - paymentAmount) ? parseFloat(paymentData.balanceAmount) || 0 : applicableFees - paymentAmount;

//     console.log(`in validate ${newBalanceLeft}`);
    
  
//     if (newBalanceLeft < 0) {
//       setErrors(prev => ({ ...prev, paymentAmountError: 'Payment amount cannot exceed the applicable fees.' }));
//     } else {
//       setErrors(prev => ({ ...prev, paymentAmountError: '' }));
//       setPaymentData(prev => ({ ...prev, newBalanceLeft: newBalanceLeft.toFixed(2) }));
//     }
//   };
  
const handleChange = async (e) => {
  const { name, value } = e.target;

  let paymentAmount = parseFloat(paymentData.paymentAmount) || 0;
  let discount = parseFloat(paymentData.discount) || 0;

  // Update paymentAmount and discount based on input field
  if (name === 'paymentAmount') {
    paymentAmount = parseFloat(value) || 0;
  }
  if (name === 'discount') {
    discount = parseFloat(value) || 0;
  }

  const totalFees = parseFloat(paymentData.totalFees) || 0;
  const applicableFees = totalFees - discount; // Calculate applicable fees
  
  console.log(`Applicable fees ${applicableFees}`);

  // Calculate new balance left after applying the payment amount
  const newBalanceLeft = isNaN(applicableFees - paymentAmount) 
    ? parseFloat(paymentData.balanceAmount) || 0 
    : applicableFees - paymentAmount;
  
  console.log(`New Balance Left: ${newBalanceLeft}`);

  // Set new values in paymentData
  setPaymentData(prev => ({
    ...prev,
    [name]: value, // update the field that changed (e.g., paymentAmount, discount)
    applicableFees: isNaN(applicableFees) ? '' : applicableFees.toFixed(2),
    newBalanceLeft: isNaN(newBalanceLeft) ? '' : newBalanceLeft.toFixed(2),
  }));

  // If enrollmentId changes, fetch enrollment by ID
  if (name === 'enrollmentId') {
    await fetchEnrollmentById(value);
  }

  // Validate the payment after any change
  validatePaymentAmount(paymentAmount, parseFloat(paymentData.balanceAmount) || 0, discount);
};

const validatePaymentAmount = (paymentAmount, balanceAmount, discount) => {
  const totalFees = parseFloat(paymentData.totalFees || 0);
  const applicableFees = totalFees - discount; // Keep calculation consistent

  console.log(`In validate: applicable fees ${applicableFees}`);

  // Calculate the new balance after payment
  const newBalanceLeft = isNaN(applicableFees - paymentAmount) 
    ? balanceAmount 
    : applicableFees - paymentAmount;

  console.log(`In validate: new balance left ${newBalanceLeft}`);

  // Error handling and setting the new balance
  if (newBalanceLeft < 0) {
    setErrors(prev => ({ ...prev, paymentAmountError: 'Payment amount cannot exceed the applicable fees.' }));
  } else {
    setErrors(prev => ({ ...prev, paymentAmountError: '' }));
    setPaymentData(prev => ({ ...prev, newBalanceLeft: newBalanceLeft.toFixed(2) }));
  }
};

  const fetchAddress = async () => {
    try {
      const response = await axios.get(`${apiUrl}/me`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch address information:', error);
      Swal.fire('Error', 'Failed to fetch address information.', 'error');
      return null;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errors.paymentAmountError) {
      Swal.fire('Error', errors.paymentAmountError, 'error');
      return;
    }
  
    try {

      // First, enroll the student
      let newPaymentId ; // Use existing paymentId if available

      const paymentDetails = {
        amount: parseFloat(paymentData.paymentAmount),
        paymentMethod: paymentData.paymentMode,
        notes: paymentData.notes,
        duedate: paymentData.duedate,
    };
    console.log(`Payment Details ${paymentDetails}`);
    console.log(paymentDetails);
    

      const enrollResponse = await axios.post(`${apiUrl}/enroll`, {
        studentId: studentId,  // Use paymentData instead of formData
        courseId: courseId,    // Use paymentData instead of studentData
        discount: parseFloat(paymentData.discount), 
        paymentDetails// Add discount to enroll API call
      });
  console.log(enrollResponse);
   newPaymentId = enrollResponse.data.payment.paymentId; // Use existing paymentId if available
   console.log(`Payment ID ${newPaymentId}`);
   

      // Extract the enrollmentId from the response
      const enrollmentId = enrollResponse.data.payment.enrollmentId;
  console.log(`EnrollmentId for payment ${enrollmentId}`);
  
      // Update paymentData with the new enrollmentId
      setPaymentData(prev => ({
        ...prev,
        enrollmentId: enrollmentId,
      }));
  console.log(`Payment EnrollmentId ${enrollmentId}`);
  
      // Submit the payment using the generated enrollmentId
      // await axios.post(`${apiUrl}/payments`, {
      //   enrollmentId: paymentData.enrollmentId,
      //   amount: parseFloat(paymentData.paymentAmount),
      //   paymentMethod: paymentData.paymentMode,
      //   notes: paymentData.notes,
      // });

      const newTotalAmount = parseInt(paymentData.paymentAmount);
      const updatedInitialValues = {
        sendcurrval: newTotalAmount,
        sendamounttype: "Amount",
        sendpaymentid: newPaymentId
      };
      await axios.post(`${apiUrl}/amount/initialValues`, updatedInitialValues);
  
      const addressData = await fetchAddress();
      const fullAddress = `${addressData.addressLine1}, ${addressData.addressLine2}, ${addressData.city}, ${addressData.district}, ${addressData.taluka}, ${addressData.state}, ${addressData.country}`;
      const receiptData = {
        enrollmentId: enrollmentId, // Use the new enrollmentId
        studentName: paymentData.studentName,
        address: paymentData.address,
        paymentAmount: paymentData.paymentAmount,
        paymentMode: paymentData.paymentMode,
        paymentId: newPaymentId,
        notes: paymentData.notes,
        date: new Date().toLocaleString(),
        applicableFees: paymentData.applicableFees,
        newBalanceLeft: paymentData.newBalanceLeft,
        fullAddress: fullAddress, // Including the address data
        duedate: paymentData.duedate,
        courses: [
          { name: paymentData.courseName, totalFees: paymentData.applicableFees, amountPaid: paymentData.paymentAmount, pendingFees: '$1000' },
        ]
      };
  
      setReceipt(receiptData);
  
      Swal.fire('Success', 'Payment submitted successfully!', 'success');
      setPaymentData({
        enrollmentId: '',
        studentName: '',
        paymentAmount: '',
        balanceAmount: '',
        newBalanceLeft: '',
        paymentMode: '',
        notes: '',
        discount: '',
        totalFees: '',
        courseName: '',
        address: '',
        duedate: '',
      });
    } catch (error) {
      console.log(`Error in payment ${error}`);
      
      Swal.fire('Error', 'Failed to submit payment.', 'error');
    }
    setButtonsVisible(false);};
  
  


  const handlePrint2 = () => {
    const element = document.getElementById('printableReceipt');
    console.log('Printing the receipt...');
    if (!element) {
        console.error('Printable receipt container not found');
        return;
    }

    const opt = {
        margin: 1,
        filename: 'receipt.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(element).set(opt).save();
};

  const handlePrint = () => {
      const element = document.getElementById('receiptContainer');
      console.log('in print of form');
      if (!element) {
          console.error('Receipt container not found');
          return;
      }
  
      const opt = {
          margin: 1,
          filename: 'receipt.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
  
      html2pdf().from(element).set(opt).save();
  };

 
  // const handlePrint = async () => {
  //   const element = document.getElementById('receiptContainer'); // Get the element by ID
  //   console.log(`in print of form`);
  //   if (!element) {
  //     console.error('Receipt container not found');
  //     return;
  //   }
  
  //   const canvas = await html2canvas(element);
  //   const imgData = canvas.toDataURL('image/png');
  //   const pdf = new jsPDF({
  //     orientation: 'portrait', // or 'landscape' depending on your needs
  //     unit: 'mm',
  //     format: 'a4'
  //   });
  //   pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
  //   pdf.save('receipt.pdf');
  // };

  const handleDownload = async () => {
    const element = document.getElementById('receipt');
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      format: 'a4'
    });
    pdf.addImage(imgData, 'PNG', 10, 10);
    pdf.save('receipt.pdf');
  };

  const handleEmail = async () => {
    const element = document.getElementById('receipt');
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      format: 'a4'
    });
    pdf.addImage(imgData, 'PNG', 10, 10);
    const pdfBase64 = pdf.output('datauristring').split(',')[1]; // Get base64 string of PDF

    try {
      const response = await axios.post(`${apiUrl}/send-email`, {
        to: email,
        subject: 'Payment Receipt',
        text: 'Please find attached the payment receipt.',
        pdfBase64: pdfBase64
      });

      console.log('Email sent:', response.data); // Log response for debugging

      Swal.fire('Success', 'Email sent successfully!', 'success');
    } catch (error) {
      console.error('Failed to send email:', error); // Log detailed error for debugging
      Swal.fire('Error', 'Failed to send email.', 'error');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2>Payment Form Test</h2>
        <form onSubmit={handleSubmit}>
          {/* <div className={styles.formGroup}>
            <label htmlFor="enrollmentId">Enrollment ID:</label>
            <input type="text" id="enrollmentId" name="enrollmentId" placeholder="Enter Enrollment ID" value={paymentData.enrollmentId} onChange={handleChange} />
          </div> */}
          <div className={styles.formGroup}>
            <label htmlFor="studentName">Student Name:</label>
            <input type="text" id="studentName" name="studentName" placeholder="Enter Student Name" value={paymentData.studentName} readOnly />
          </div>
          <div className={styles.formGroup}>
  <label htmlFor="totalFees">Total Fees:</label>
  <input
    type="number"
    id="totalFees"
    name="totalFees"
    placeholder="Total Fees"
    value={paymentData.totalFees}
    readOnly
  />
</div>

<div className={styles.formGroup}>
  <label htmlFor="discount">Discount:</label>
  <input
    type="text"
    id="discount"
    name="discount"
    placeholder="Enter Discount"
    value={paymentData.discount}
    onChange={handleChange}
    pattern="[0-9]*" // This allows only numeric input
    inputMode="numeric" // This ensures a numeric keyboard is shown on mobile devices
    style={{ 
      MozAppearance: 'textfield', /* For Firefox */
      appearance: 'textfield' /* For other browsers */
    }}
  />
</div>

          
          
          <div className={styles.formGroup}>
            <label htmlFor="balanceAmount">Applicable Amount:</label>
            <input type="text" id="applicableFees" name="applicableFees" placeholder="applicableFees Amount" value={paymentData.applicableFees} disabled />
          </div>
          <div className={styles.formGroup}>
  <label htmlFor="paymentAmount">Payment Amount:</label>
  <input
    type="text"
    id="paymentAmount"
    name="paymentAmount"
    placeholder="Enter Payment Amount"
    value={paymentData.paymentAmount}
    onChange={handleChange}
    pattern="[0-9]*" // This allows only numeric input
    inputMode="numeric" // This ensures a numeric keyboard is shown on mobile devices
    style={{ 
      MozAppearance: 'textfield', /* For Firefox */
      appearance: 'textfield' /* For other browsers */
    }}
  />
  {errors.paymentAmountError && <div className={styles.errorMessage}>{errors.paymentAmountError}</div>}
</div>

          <div className={styles.formGroup}>
            <label htmlFor="newBalanceLeft">New Balance Left:</label>
            <input type="text" id="newBalanceLeft" name="newBalanceLeft" placeholder="New Balance Left" value={paymentData.newBalanceLeft} disabled />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="paymentMode">Payment Mode:</label>
            <select id="paymentMode" name="paymentMode" value={paymentData.paymentMode} onChange={handleChange}>
              <option value="">Select Payment Mode</option>
              <option value="Cash">Cash</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="Online Transfer">Online Transfer</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="notes">Notes:</label>
            <textarea id="notes" name="notes" placeholder="Enter any notes here" value={paymentData.notes} onChange={handleChange}></textarea>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="due">Due Date:</label>
            <input id='due' className='due' name='duedate' value={paymentData.duedate} onChange={handleChange} type="date"/>
          </div>
          <div className={styles.formActions}>
            <button type="reset">Reset</button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>

      <div id="printableReceipt" className={styles.receiptContainer}>
        {receipt && (
          <Invoice
            enrollmentId={receipt.enrollmentId}
            studentName={receipt.studentName}
            address={receipt.address}
            

            paymentAmount={receipt.paymentAmount}
            paymentId={receipt.paymentId}
            paymentMode={receipt.paymentMode}
            notes={receipt.notes}
            date={receipt.date}
            applicableFees={receipt.applicableFees} // Add this line
            balanceAmount={receipt.newBalanceLeft}
            fullAddress={receipt.fullAddress}
            duedate={receipt.duedate}// Add this line

            navigateto='/courses/viewenrollments'
            courses={receipt.courses}
            onPrint={handlePrint}
            onDownload={handleDownload}
            onEmail={handleEmail}
            email={email}
            setEmail={setEmail}
          />
        )}
      </div>


    </div>
  );
};

export default Payment;



//-----20-8-2024

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (errors.paymentAmountError) {
  //     Swal.fire('Error', errors.paymentAmountError, 'error');
  //     return;
  //   }
  
  //   try {
  //     const enrollResponse = await axios.post(`${apiUrl}/enroll`, {
  //       studentId: formData.studentId,
  //       courseId: studentData.courseId,
  //       discount: parseFloat(paymentData.discount), // Add discount to enroll API call
  //     });
  
  //     await axios.post(`${apiUrl}/payments`, {
  //       enrollmentId: paymentData.enrollmentId,
  //       amount: parseFloat(paymentData.paymentAmount),
  //       paymentMethod: paymentData.paymentMode,
  //       notes: paymentData.notes,
  //     });
  
  //     const addressData = await fetchAddress();
  //     const fullAddress = `${addressData.addressLine1}, ${addressData.addressLine2}, ${addressData.city}, ${addressData.district}, ${addressData.taluka}, ${addressData.state}, ${addressData.country}`;
  //     const receiptData = {
  //       enrollmentId: paymentData.enrollmentId,
  //       studentName: paymentData.studentName,
  //       address: paymentData.address,
  //       paymentAmount: paymentData.paymentAmount,
  //       paymentMode: paymentData.paymentMode,
  //       notes: paymentData.notes,
  //       date: new Date().toLocaleString(),
  //       applicableFees: paymentData.applicableFees,
  //       newBalanceLeft: paymentData.newBalanceLeft,
  //       fullAddress: fullAddress, // Including the address data
  //       courses: [
  //         { name: paymentData.courseName, totalFees: paymentData.applicableFees, amountPaid: paymentData.paymentAmount, pendingFees: '$1000' },
  //       ]
  //     };
  
  //     setReceipt(receiptData);
  
  //     Swal.fire('Success', 'Payment submitted successfully!', 'success');
  //   } catch (error) {
  //     Swal.fire('Error', 'Failed to submit payment.', 'error');
  //   }
  // };
  


//-----------


 // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (errors.paymentAmountError) {
  //     Swal.fire('Error', errors.paymentAmountError, 'error');
  //     return;
  //   }

  //   try {
  //     await axios.post(`${apiUrl}/set-fees`, {
  //       enrollmentId: paymentData.enrollmentId,
  //       discount: parseFloat(paymentData.discount),
        
  //     });

  //     await axios.post(`${apiUrl}/payments`, {
  //       enrollmentId: paymentData.enrollmentId,
  //       amount: parseFloat(paymentData.paymentAmount),
  //       paymentMethod: paymentData.paymentMode,
  //       notes: paymentData.notes,
  //     });
  //     const addressData = await fetchAddress();
  //     const fullAddress = `${addressData.addressLine1}, ${addressData.addressLine2}, ${addressData.city}, ${addressData.district}, ${addressData.taluka}, ${addressData.state}, ${addressData.country}`;
  //     const receiptData = {
  //       enrollmentId: paymentData.enrollmentId,
  //       studentName: paymentData.studentName,
  //       address: paymentData.address,

  //       paymentAmount: paymentData.paymentAmount,
  //       paymentMode: paymentData.paymentMode,
  //       notes: paymentData.notes,
  //       date: new Date().toLocaleString(),
  //       applicableFees: paymentData.applicableFees,
  //       newBalanceLeft: paymentData.newBalanceLeft,
  //       fullAddress: fullAddress, // Including the address data


  //       courses: [
  //         { name: paymentData.courseName, totalFees: paymentData.applicableFees, amountPaid: paymentData.paymentAmount, pendingFees: '$1000' },
  //         // Add more courses as needed
  //       ]
  //     };

  //     setReceipt(receiptData);

  //     Swal.fire('Success', 'Payment submitted successfully!', 'success');
  //   } catch (error) {
  //     Swal.fire('Error', 'Failed to submit payment.', 'error');
  //   }
  // };

  // const handlePrint = async () => {
  //   const element = document.getElementById('receipt');
  //   const canvas = await html2canvas(element);
  //   const imgData = canvas.toDataURL('image/png');
  //   const pdf = new jsPDF({
  //     format: 'a4'
  //   });
  //   pdf.addImage(imgData, 'PNG', 10, 10);
  //   const pdfBlob = pdf.output('blob');
  //   const url = URL.createObjectURL(pdfBlob);
  //   window.open(url, '_blank');
  // };
  
