
// // // // // // // // // // // // // // // // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // // // // // // // // // // // // // // // import axios from 'axios';
// // // // // // // // // // // // // // // // // // import Swal from 'sweetalert2';
// // // // // // // // // // // // // // // // // // import { debounce } from 'lodash';
// // // // // // // // // // // // // // // // // // import { useLocation } from 'react-router-dom';

// // // // // // // // // // // // // // // // // // function PaymentForm() {
// // // // // // // // // // // // // // // // // //   const location = useLocation();
// // // // // // // // // // // // // // // // // //   const searchParams = new URLSearchParams(location.search);
// // // // // // // // // // // // // // // // // //   const enrollmentIdFromParams = searchParams.get('enrollmentId');

// // // // // // // // // // // // // // // // // //   const [paymentData, setPaymentData] = useState({
// // // // // // // // // // // // // // // // // //     enrollmentId: enrollmentIdFromParams ? enrollmentIdFromParams : '',
// // // // // // // // // // // // // // // // // //     studentName: '',
// // // // // // // // // // // // // // // // // //     paymentAmount: '',
// // // // // // // // // // // // // // // // // //     balanceAmount: '',
// // // // // // // // // // // // // // // // // //     newBalanceLeft: '',
// // // // // // // // // // // // // // // // // //     paymentMode: '',
// // // // // // // // // // // // // // // // // //     notes: '',
// // // // // // // // // // // // // // // // // //   });
// // // // // // // // // // // // // // // // // //   const [errors, setErrors] = useState({});
// // // // // // // // // // // // // // // // // //   const apiUrl = process.env.REACT_APP_API_BASE_URL;

// // // // // // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // // // // // //     fetchEnrollments().catch(err => {
// // // // // // // // // // // // // // // // // //       Swal.fire('Error', 'Failed to fetch enrollments.', 'error');
// // // // // // // // // // // // // // // // // //     });
// // // // // // // // // // // // // // // // // //   }, []);

// // // // // // // // // // // // // // // // // //   async function fetchEnrollments() {
// // // // // // // // // // // // // // // // // //     const response = await axios.get(`${apiUrl}/enroll`);
// // // // // // // // // // // // // // // // // //     return response.data; 
// // // // // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // // // // // //     if (enrollmentIdFromParams) {
// // // // // // // // // // // // // // // // // //       fetchEnrollmentById(enrollmentIdFromParams);
// // // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // // //   }, [enrollmentIdFromParams]);

// // // // // // // // // // // // // // // // // //   const fetchEnrollmentById = async (id) => {
// // // // // // // // // // // // // // // // // //     if (!id) return;
// // // // // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // // // // //       const response = await axios.get(`${apiUrl}/enroll/${id}`);
// // // // // // // // // // // // // // // // // //       const enrollment = response.data;
// // // // // // // // // // // // // // // // // //       updatePaymentDataFromEnrollment(enrollment);
// // // // // // // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // // // // // // //       Swal.fire('Error', 'Failed to fetch enrollment by ID.', 'error');
// // // // // // // // // // // // // // // // // //       setPaymentData(prev => ({ ...prev, studentName: '', balanceAmount: '', newBalanceLeft: '' }));
// // // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // // // //   const updatePaymentDataFromEnrollment = (enrollment) => {
// // // // // // // // // // // // // // // // // //     setPaymentData(prev => ({
// // // // // // // // // // // // // // // // // //       ...prev,
// // // // // // // // // // // // // // // // // //       studentName: enrollment?.studentName || '',
// // // // // // // // // // // // // // // // // //       balanceAmount: enrollment?.balanceAmount?.toString() || '',
// // // // // // // // // // // // // // // // // //       newBalanceLeft: enrollment?.balanceAmount?.toString() || '',
// // // // // // // // // // // // // // // // // //     }));
// // // // // // // // // // // // // // // // // //   };
  
// // // // // // // // // // // // // // // // // //   const debouncedFetchEnrollmentById = useCallback(debounce((id) => {
// // // // // // // // // // // // // // // // // //     fetchEnrollmentById(id);
// // // // // // // // // // // // // // // // // //   }, 1000), []);

// // // // // // // // // // // // // // // // // //   const handleChange = async (e) => {
// // // // // // // // // // // // // // // // // //     const { name, value } = e.target;
// // // // // // // // // // // // // // // // // //     setPaymentData(prev => ({ ...prev, [name]: value }));
  
// // // // // // // // // // // // // // // // // //     if (name === 'paymentAmount' && value) {
// // // // // // // // // // // // // // // // // //       validatePaymentAmount(value, paymentData.balanceAmount);
// // // // // // // // // // // // // // // // // //     }
  
// // // // // // // // // // // // // // // // // //     if (name === "enrollmentId") {
// // // // // // // // // // // // // // // // // //       setPaymentData(prev => ({ ...prev, [name]: value }));
// // // // // // // // // // // // // // // // // //       await fetchEnrollmentById(value);
// // // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // // //   };
  
// // // // // // // // // // // // // // // // // //   const validatePaymentAmount = (paymentAmount, balanceAmount) => {
// // // // // // // // // // // // // // // // // //     const paymentAmountFloat = parseFloat(paymentAmount);
// // // // // // // // // // // // // // // // // //     const balanceAmountFloat = parseFloat(balanceAmount);
// // // // // // // // // // // // // // // // // //     const newBalanceLeft = balanceAmountFloat - paymentAmountFloat;

// // // // // // // // // // // // // // // // // //     if (newBalanceLeft < 0) {
// // // // // // // // // // // // // // // // // //       setErrors(prev => ({ ...prev, paymentAmountError: 'Payment amount cannot exceed the balance amount.' }));
// // // // // // // // // // // // // // // // // //     } else {
// // // // // // // // // // // // // // // // // //       setErrors(prev => ({ ...prev, paymentAmountError: '' }));
// // // // // // // // // // // // // // // // // //       setPaymentData(prev => ({ ...prev, newBalanceLeft: newBalanceLeft.toFixed(2) }));
// // // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // // // //   const handleSubmit = async (e) => {
// // // // // // // // // // // // // // // // // //     e.preventDefault();
// // // // // // // // // // // // // // // // // //     if (errors.paymentAmountError) {
// // // // // // // // // // // // // // // // // //       Swal.fire('Error', errors.paymentAmountError, 'error');
// // // // // // // // // // // // // // // // // //       return;
// // // // // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // // // // //       await axios.post(`${apiUrl}/payments`, {
// // // // // // // // // // // // // // // // // //         enrollmentId: paymentData.enrollmentId,
// // // // // // // // // // // // // // // // // //         amount: parseFloat(paymentData.paymentAmount),
// // // // // // // // // // // // // // // // // //         paymentMethod: paymentData.paymentMode,
// // // // // // // // // // // // // // // // // //         notes: paymentData.notes,
// // // // // // // // // // // // // // // // // //       });
// // // // // // // // // // // // // // // // // //       Swal.fire('Success', 'Payment submitted successfully!', 'success');
// // // // // // // // // // // // // // // // // //       window.location.href = '/paymentdetails';
// // // // // // // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // // // // // // //       Swal.fire('Error', 'Failed to submit payment.', 'error');
// // // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // // // // //     <div className="container" style={{ maxWidth: '650px', margin: '50px auto', padding: '20px', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
// // // // // // // // // // // // // // // // // //       <h2 style={{ fontFamily: 'Times New Roman, Times, serif' }}>Payment Form</h2>
// // // // // // // // // // // // // // // // // //       <form onSubmit={handleSubmit}>
// // // // // // // // // // // // // // // // // //         <div className="form-group">
// // // // // // // // // // // // // // // // // //           <label htmlFor="enrollmentId">Enrollment ID:</label>
// // // // // // // // // // // // // // // // // //           <input type="text" id="enrollmentId" name="enrollmentId" placeholder="Enter Enrollment ID" value={paymentData.enrollmentId} onChange={handleChange} />
// // // // // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // // // // //         <div className="form-group">
// // // // // // // // // // // // // // // // // //           <label htmlFor="studentName">Student Name:</label>
// // // // // // // // // // // // // // // // // //           <input type="text" id="studentName" name="studentName" placeholder="Enter Student Name" value={paymentData.studentName} readOnly />
// // // // // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // // // // //         <div className="form-group">
// // // // // // // // // // // // // // // // // //           <label htmlFor="paymentAmount">Payment Amount:</label>
// // // // // // // // // // // // // // // // // //           <input type="number" id="paymentAmount" name="paymentAmount" placeholder="Enter Payment Amount" value={paymentData.paymentAmount} onChange={handleChange} />
// // // // // // // // // // // // // // // // // //           {errors.paymentAmountError && <div style={{ color: 'red', marginTop: '5px' }}>{errors.paymentAmountError}</div>}
// // // // // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // // // // //         <div className="form-group">
// // // // // // // // // // // // // // // // // //           <label htmlFor="balanceAmount">Balance Amount:</label>
// // // // // // // // // // // // // // // // // //           <input type="text" id="balanceAmount" name="balanceAmount" placeholder="Balance Amount" value={paymentData.balanceAmount} disabled />
// // // // // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // // // // //         <div className="form-group">
// // // // // // // // // // // // // // // // // //           <label htmlFor="newBalanceLeft">New Balance Left:</label>
// // // // // // // // // // // // // // // // // //           <input type="text" id="newBalanceLeft" name="newBalanceLeft" placeholder="New Balance Left" value={paymentData.newBalanceLeft} disabled />
// // // // // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // // // // //         <div className="form-group">
// // // // // // // // // // // // // // // // // //           <label htmlFor="paymentMode">Payment Mode:</label>
// // // // // // // // // // // // // // // // // //           <select id="paymentMode" name="paymentMode" value={paymentData.paymentMode} onChange={handleChange}>
// // // // // // // // // // // // // // // // // //             <option value="">Select Payment Mode</option>
// // // // // // // // // // // // // // // // // //             <option value="Cash">Cash</option>
// // // // // // // // // // // // // // // // // //             <option value="Credit Card">Credit Card</option>
// // // // // // // // // // // // // // // // // //             <option value="Debit Card">Debit Card</option>
// // // // // // // // // // // // // // // // // //             <option value="Online Transfer">Online Transfer</option>
// // // // // // // // // // // // // // // // // //           </select>
// // // // // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // // // // //         <div className="form-group">
// // // // // // // // // // // // // // // // // //           <label htmlFor="notes">Notes:</label>
// // // // // // // // // // // // // // // // // //           <textarea id="notes" name="notes" placeholder="Enter any notes here" value={paymentData.notes} onChange={handleChange}></textarea>
// // // // // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // // // // //         <div className="form-actions" style={{ display: 'flex', justifyContent: 'space-between' }}>
// // // // // // // // // // // // // // // // // //           <button type="reset" style={{ order: 1 }}>Reset</button>
// // // // // // // // // // // // // // // // // //           <button type="submit" style={{ order: 2 }}>Submit</button>
// // // // // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // // // // //       </form>
// // // // // // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // // export default PaymentForm;
// // // // // // // // // // // // // // // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // // // // // // // // // // // // // // import axios from 'axios';
// // // // // // // // // // // // // // // // // import Swal from 'sweetalert2';
// // // // // // // // // // // // // // // // // import { debounce } from 'lodash';
// // // // // // // // // // // // // // // // // import { useLocation } from 'react-router-dom';
// // // // // // // // // // // // // // // // // import html2canvas from 'html2canvas';
// // // // // // // // // // // // // // // // // import jsPDF from 'jspdf';
// // // // // // // // // // // // // // // // // import styles from './Paymentform.module.css';  // Import CSS module

// // // // // // // // // // // // // // // // // function PaymentForm() {
// // // // // // // // // // // // // // // // //   const location = useLocation();
// // // // // // // // // // // // // // // // //   const searchParams = new URLSearchParams(location.search);
// // // // // // // // // // // // // // // // //   const enrollmentIdFromParams = searchParams.get('enrollmentId');

// // // // // // // // // // // // // // // // //   const [paymentData, setPaymentData] = useState({
// // // // // // // // // // // // // // // // //     enrollmentId: enrollmentIdFromParams ? enrollmentIdFromParams : '',
// // // // // // // // // // // // // // // // //     studentName: '',
// // // // // // // // // // // // // // // // //     paymentAmount: '',
// // // // // // // // // // // // // // // // //     balanceAmount: '',
// // // // // // // // // // // // // // // // //     newBalanceLeft: '',
// // // // // // // // // // // // // // // // //     paymentMode: '',
// // // // // // // // // // // // // // // // //     notes: '',
// // // // // // // // // // // // // // // // //   });
// // // // // // // // // // // // // // // // //   const [errors, setErrors] = useState({});
// // // // // // // // // // // // // // // // //   const [receipt, setReceipt] = useState(null); // New state for receipt
// // // // // // // // // // // // // // // // //   const apiUrl = process.env.REACT_APP_API_BASE_URL;

// // // // // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // // // // //     fetchEnrollments().catch(err => {
// // // // // // // // // // // // // // // // //       Swal.fire('Error', 'Failed to fetch enrollments.', 'error');
// // // // // // // // // // // // // // // // //     });
// // // // // // // // // // // // // // // // //   }, []);

// // // // // // // // // // // // // // // // //   async function fetchEnrollments() {
// // // // // // // // // // // // // // // // //     const response = await axios.get(`${apiUrl}/enroll`);
// // // // // // // // // // // // // // // // //     return response.data; 
// // // // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // // // // //     if (enrollmentIdFromParams) {
// // // // // // // // // // // // // // // // //       fetchEnrollmentById(enrollmentIdFromParams);
// // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // //   }, [enrollmentIdFromParams]);

// // // // // // // // // // // // // // // // //   const fetchEnrollmentById = async (id) => {
// // // // // // // // // // // // // // // // //     if (!id) return;
// // // // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // // // //       const response = await axios.get(`${apiUrl}/enroll/${id}`);
// // // // // // // // // // // // // // // // //       const enrollment = response.data;
// // // // // // // // // // // // // // // // //       updatePaymentDataFromEnrollment(enrollment);
// // // // // // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // // // // // //       Swal.fire('Error', 'Failed to fetch enrollment by ID.', 'error');
// // // // // // // // // // // // // // // // //       setPaymentData(prev => ({ ...prev, studentName: '', balanceAmount: '', newBalanceLeft: '' }));
// // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // // //   const updatePaymentDataFromEnrollment = (enrollment) => {
// // // // // // // // // // // // // // // // //     setPaymentData(prev => ({
// // // // // // // // // // // // // // // // //       ...prev,
// // // // // // // // // // // // // // // // //       studentName: enrollment?.studentName || '',
// // // // // // // // // // // // // // // // //       balanceAmount: enrollment?.balanceAmount?.toString() || '',
// // // // // // // // // // // // // // // // //       newBalanceLeft: enrollment?.balanceAmount?.toString() || '',
// // // // // // // // // // // // // // // // //     }));
// // // // // // // // // // // // // // // // //   };
  
// // // // // // // // // // // // // // // // //   const debouncedFetchEnrollmentById = useCallback(debounce((id) => {
// // // // // // // // // // // // // // // // //     fetchEnrollmentById(id);
// // // // // // // // // // // // // // // // //   }, 1000), []);

// // // // // // // // // // // // // // // // //   const handleChange = async (e) => {
// // // // // // // // // // // // // // // // //     const { name, value } = e.target;
// // // // // // // // // // // // // // // // //     setPaymentData(prev => ({ ...prev, [name]: value }));
  
// // // // // // // // // // // // // // // // //     if (name === 'paymentAmount' && value) {
// // // // // // // // // // // // // // // // //       validatePaymentAmount(value, paymentData.balanceAmount);
// // // // // // // // // // // // // // // // //     }
  
// // // // // // // // // // // // // // // // //     if (name === "enrollmentId") {
// // // // // // // // // // // // // // // // //       setPaymentData(prev => ({ ...prev, [name]: value }));
// // // // // // // // // // // // // // // // //       await fetchEnrollmentById(value);
// // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // //   };
  
// // // // // // // // // // // // // // // // //   const validatePaymentAmount = (paymentAmount, balanceAmount) => {
// // // // // // // // // // // // // // // // //     const paymentAmountFloat = parseFloat(paymentAmount);
// // // // // // // // // // // // // // // // //     const balanceAmountFloat = parseFloat(balanceAmount);
// // // // // // // // // // // // // // // // //     const newBalanceLeft = balanceAmountFloat - paymentAmountFloat;

// // // // // // // // // // // // // // // // //     if (newBalanceLeft < 0) {
// // // // // // // // // // // // // // // // //       setErrors(prev => ({ ...prev, paymentAmountError: 'Payment amount cannot exceed the balance amount.' }));
// // // // // // // // // // // // // // // // //     } else {
// // // // // // // // // // // // // // // // //       setErrors(prev => ({ ...prev, paymentAmountError: '' }));
// // // // // // // // // // // // // // // // //       setPaymentData(prev => ({ ...prev, newBalanceLeft: newBalanceLeft.toFixed(2) }));
// // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // // //   const handleSubmit = async (e) => {
// // // // // // // // // // // // // // // // //     e.preventDefault();
// // // // // // // // // // // // // // // // //     if (errors.paymentAmountError) {
// // // // // // // // // // // // // // // // //       Swal.fire('Error', errors.paymentAmountError, 'error');
// // // // // // // // // // // // // // // // //       return;
// // // // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // // // //       await axios.post(`${apiUrl}/payments`, {
// // // // // // // // // // // // // // // // //         enrollmentId: paymentData.enrollmentId,
// // // // // // // // // // // // // // // // //         amount: parseFloat(paymentData.paymentAmount),
// // // // // // // // // // // // // // // // //         paymentMethod: paymentData.paymentMode,
// // // // // // // // // // // // // // // // //         notes: paymentData.notes,
// // // // // // // // // // // // // // // // //       });

// // // // // // // // // // // // // // // // //       // Generate receipt
// // // // // // // // // // // // // // // // //       const receiptData = {
// // // // // // // // // // // // // // // // //         enrollmentId: paymentData.enrollmentId,
// // // // // // // // // // // // // // // // //         studentName: paymentData.studentName,
// // // // // // // // // // // // // // // // //         paymentAmount: paymentData.paymentAmount,
// // // // // // // // // // // // // // // // //         paymentMode: paymentData.paymentMode,
// // // // // // // // // // // // // // // // //         notes: paymentData.notes,
// // // // // // // // // // // // // // // // //         date: new Date().toLocaleString(),
// // // // // // // // // // // // // // // // //       };

// // // // // // // // // // // // // // // // //       setReceipt(receiptData);

// // // // // // // // // // // // // // // // //       Swal.fire('Success', 'Payment submitted successfully!', 'success');
// // // // // // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // // // // // //       Swal.fire('Error', 'Failed to submit payment.', 'error');
// // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // // //   const handlePrint = () => {
// // // // // // // // // // // // // // // // //     window.print();
// // // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // // //   const handleDownload = async () => {
// // // // // // // // // // // // // // // // //     const element = document.getElementById('receipt');
// // // // // // // // // // // // // // // // //     const canvas = await html2canvas(element);
// // // // // // // // // // // // // // // // //     const imgData = canvas.toDataURL('image/png');
// // // // // // // // // // // // // // // // //     const pdf = new jsPDF();
// // // // // // // // // // // // // // // // //     pdf.addImage(imgData, 'PNG', 10, 10);
// // // // // // // // // // // // // // // // //     pdf.save('receipt.pdf');
// // // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // // // //     <div className={styles.container}>
// // // // // // // // // // // // // // // // //       <div className={styles.formContainer}>
// // // // // // // // // // // // // // // // //         <h2>Payment Form</h2>
// // // // // // // // // // // // // // // // //         <form onSubmit={handleSubmit}>
// // // // // // // // // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // // // // // // // // //             <label htmlFor="enrollmentId">Enrollment ID:</label>
// // // // // // // // // // // // // // // // //             <input type="text" id="enrollmentId" name="enrollmentId" placeholder="Enter Enrollment ID" value={paymentData.enrollmentId} onChange={handleChange} />
// // // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // // // // // // // // //             <label htmlFor="studentName">Student Name:</label>
// // // // // // // // // // // // // // // // //             <input type="text" id="studentName" name="studentName" placeholder="Enter Student Name" value={paymentData.studentName} readOnly />
// // // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // // // // // // // // //             <label htmlFor="paymentAmount">Payment Amount:</label>
// // // // // // // // // // // // // // // // //             <input type="number" id="paymentAmount" name="paymentAmount" placeholder="Enter Payment Amount" value={paymentData.paymentAmount} onChange={handleChange} />
// // // // // // // // // // // // // // // // //             {errors.paymentAmountError && <div className={styles.errorMessage}>{errors.paymentAmountError}</div>}
// // // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // // // // // // // // //             <label htmlFor="balanceAmount">Balance Amount:</label>
// // // // // // // // // // // // // // // // //             <input type="text" id="balanceAmount" name="balanceAmount" placeholder="Balance Amount" value={paymentData.balanceAmount} disabled />
// // // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // // // // // // // // //             <label htmlFor="newBalanceLeft">New Balance Left:</label>
// // // // // // // // // // // // // // // // //             <input type="text" id="newBalanceLeft" name="newBalanceLeft" placeholder="New Balance Left" value={paymentData.newBalanceLeft} disabled />
// // // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // // // // // // // // //             <label htmlFor="paymentMode">Payment Mode:</label>
// // // // // // // // // // // // // // // // //             <select id="paymentMode" name="paymentMode" value={paymentData.paymentMode} onChange={handleChange}>
// // // // // // // // // // // // // // // // //               <option value="">Select Payment Mode</option>
// // // // // // // // // // // // // // // // //               <option value="Cash">Cash</option>
// // // // // // // // // // // // // // // // //               <option value="Credit Card">Credit Card</option>
// // // // // // // // // // // // // // // // //               <option value="Debit Card">Debit Card</option>
// // // // // // // // // // // // // // // // //               <option value="Online Transfer">Online Transfer</option>
// // // // // // // // // // // // // // // // //             </select>
// // // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // // // // // // // // //             <label htmlFor="notes">Notes:</label>
// // // // // // // // // // // // // // // // //             <textarea id="notes" name="notes" placeholder="Enter any notes here" value={paymentData.notes} onChange={handleChange}></textarea>
// // // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // // //           <div className={styles.formActions}>
// // // // // // // // // // // // // // // // //             <button type="reset">Reset</button>
// // // // // // // // // // // // // // // // //             <button type="submit">Submit</button>
// // // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // // //         </form>
// // // // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // // // //       <div className={styles.receiptContainer}>
// // // // // // // // // // // // // // // // //         {receipt && (
// // // // // // // // // // // // // // // // //           <div id="receipt">
// // // // // // // // // // // // // // // // //             <h3>Payment Receipt</h3>
// // // // // // // // // // // // // // // // //             <p><strong>Enrollment ID:</strong> {receipt.enrollmentId}</p>
// // // // // // // // // // // // // // // // //             <p><strong>Student Name:</strong> {receipt.studentName}</p>
// // // // // // // // // // // // // // // // //             <p><strong>Payment Amount:</strong> {receipt.paymentAmount}</p>
// // // // // // // // // // // // // // // // //             <p><strong>Payment Mode:</strong> {receipt.paymentMode}</p>
// // // // // // // // // // // // // // // // //             <p><strong>Notes:</strong> {receipt.notes}</p>
// // // // // // // // // // // // // // // // //             <p><strong>Date:</strong> {receipt.date}</p>
// // // // // // // // // // // // // // // // //             <div className={styles.receiptActions}>
// // // // // // // // // // // // // // // // //               <button onClick={handlePrint}>Print</button>
// // // // // // // // // // // // // // // // //               <button onClick={handleDownload}>Download</button>
// // // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // // //         )}
// // // // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // export default PaymentForm;

// // // // // // // // // // // // // // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // // // // // // // // // // // // // import axios from 'axios';
// // // // // // // // // // // // // // // // import Swal from 'sweetalert2';
// // // // // // // // // // // // // // // // import { debounce } from 'lodash';
// // // // // // // // // // // // // // // // import { useLocation } from 'react-router-dom';
// // // // // // // // // // // // // // // // import html2canvas from 'html2canvas';
// // // // // // // // // // // // // // // // import jsPDF from 'jspdf';
// // // // // // // // // // // // // // // // import styles from './PaymentForm.module.css';  // Import CSS module

// // // // // // // // // // // // // // // // function PaymentForm() {
// // // // // // // // // // // // // // // //   const location = useLocation();
// // // // // // // // // // // // // // // //   const searchParams = new URLSearchParams(location.search);
// // // // // // // // // // // // // // // //   const enrollmentIdFromParams = searchParams.get('enrollmentId');

// // // // // // // // // // // // // // // //   const [paymentData, setPaymentData] = useState({
// // // // // // // // // // // // // // // //     enrollmentId: enrollmentIdFromParams ? enrollmentIdFromParams : '',
// // // // // // // // // // // // // // // //     studentName: '',
// // // // // // // // // // // // // // // //     paymentAmount: '',
// // // // // // // // // // // // // // // //     balanceAmount: '',
// // // // // // // // // // // // // // // //     newBalanceLeft: '',
// // // // // // // // // // // // // // // //     paymentMode: '',
// // // // // // // // // // // // // // // //     notes: '',
// // // // // // // // // // // // // // // //   });
// // // // // // // // // // // // // // // //   const [errors, setErrors] = useState({});
// // // // // // // // // // // // // // // //   const [receipt, setReceipt] = useState(null); // New state for receipt
// // // // // // // // // // // // // // // //   const apiUrl = process.env.REACT_APP_API_BASE_URL;

// // // // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // // // //     fetchEnrollments().catch(err => {
// // // // // // // // // // // // // // // //       Swal.fire('Error', 'Failed to fetch enrollments.', 'error');
// // // // // // // // // // // // // // // //     });
// // // // // // // // // // // // // // // //   }, []);

// // // // // // // // // // // // // // // //   async function fetchEnrollments() {
// // // // // // // // // // // // // // // //     const response = await axios.get(`${apiUrl}/enroll`);
// // // // // // // // // // // // // // // //     return response.data; 
// // // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // // // //     if (enrollmentIdFromParams) {
// // // // // // // // // // // // // // // //       fetchEnrollmentById(enrollmentIdFromParams);
// // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // //   }, [enrollmentIdFromParams]);

// // // // // // // // // // // // // // // //   const fetchEnrollmentById = async (id) => {
// // // // // // // // // // // // // // // //     if (!id) return;
// // // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // // //       const response = await axios.get(`${apiUrl}/enroll/${id}`);
// // // // // // // // // // // // // // // //       const enrollment = response.data;
// // // // // // // // // // // // // // // //       updatePaymentDataFromEnrollment(enrollment);
// // // // // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // // // // //       Swal.fire('Error', 'Failed to fetch enrollment by ID.', 'error');
// // // // // // // // // // // // // // // //       setPaymentData(prev => ({ ...prev, studentName: '', balanceAmount: '', newBalanceLeft: '' }));
// // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // //   const updatePaymentDataFromEnrollment = (enrollment) => {
// // // // // // // // // // // // // // // //     setPaymentData(prev => ({
// // // // // // // // // // // // // // // //       ...prev,
// // // // // // // // // // // // // // // //       studentName: enrollment?.studentName || '',
// // // // // // // // // // // // // // // //       balanceAmount: enrollment?.balanceAmount?.toString() || '',
// // // // // // // // // // // // // // // //       newBalanceLeft: enrollment?.balanceAmount?.toString() || '',
// // // // // // // // // // // // // // // //     }));
// // // // // // // // // // // // // // // //   };
  
// // // // // // // // // // // // // // // //   const debouncedFetchEnrollmentById = useCallback(debounce((id) => {
// // // // // // // // // // // // // // // //     fetchEnrollmentById(id);
// // // // // // // // // // // // // // // //   }, 1000), []);

// // // // // // // // // // // // // // // //   const handleChange = async (e) => {
// // // // // // // // // // // // // // // //     const { name, value } = e.target;
// // // // // // // // // // // // // // // //     setPaymentData(prev => ({ ...prev, [name]: value }));
  
// // // // // // // // // // // // // // // //     if (name === 'paymentAmount' && value) {
// // // // // // // // // // // // // // // //       validatePaymentAmount(value, paymentData.balanceAmount);
// // // // // // // // // // // // // // // //     }
  
// // // // // // // // // // // // // // // //     if (name === "enrollmentId") {
// // // // // // // // // // // // // // // //       setPaymentData(prev => ({ ...prev, [name]: value }));
// // // // // // // // // // // // // // // //       await fetchEnrollmentById(value);
// // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // //   };
  
// // // // // // // // // // // // // // // //   const validatePaymentAmount = (paymentAmount, balanceAmount) => {
// // // // // // // // // // // // // // // //     const paymentAmountFloat = parseFloat(paymentAmount);
// // // // // // // // // // // // // // // //     const balanceAmountFloat = parseFloat(balanceAmount);
// // // // // // // // // // // // // // // //     const newBalanceLeft = balanceAmountFloat - paymentAmountFloat;

// // // // // // // // // // // // // // // //     if (newBalanceLeft < 0) {
// // // // // // // // // // // // // // // //       setErrors(prev => ({ ...prev, paymentAmountError: 'Payment amount cannot exceed the balance amount.' }));
// // // // // // // // // // // // // // // //     } else {
// // // // // // // // // // // // // // // //       setErrors(prev => ({ ...prev, paymentAmountError: '' }));
// // // // // // // // // // // // // // // //       setPaymentData(prev => ({ ...prev, newBalanceLeft: newBalanceLeft.toFixed(2) }));
// // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // //   const handleSubmit = async (e) => {
// // // // // // // // // // // // // // // //     e.preventDefault();
// // // // // // // // // // // // // // // //     if (errors.paymentAmountError) {
// // // // // // // // // // // // // // // //       Swal.fire('Error', errors.paymentAmountError, 'error');
// // // // // // // // // // // // // // // //       return;
// // // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // // //       await axios.post(`${apiUrl}/payments`, {
// // // // // // // // // // // // // // // //         enrollmentId: paymentData.enrollmentId,
// // // // // // // // // // // // // // // //         amount: parseFloat(paymentData.paymentAmount),
// // // // // // // // // // // // // // // //         paymentMethod: paymentData.paymentMode,
// // // // // // // // // // // // // // // //         notes: paymentData.notes,
// // // // // // // // // // // // // // // //       });

// // // // // // // // // // // // // // // //       // Generate receipt
// // // // // // // // // // // // // // // //       const receiptData = {
// // // // // // // // // // // // // // // //         enrollmentId: paymentData.enrollmentId,
// // // // // // // // // // // // // // // //         studentName: paymentData.studentName,
// // // // // // // // // // // // // // // //         paymentAmount: paymentData.paymentAmount,
// // // // // // // // // // // // // // // //         paymentMode: paymentData.paymentMode,
// // // // // // // // // // // // // // // //         notes: paymentData.notes,
// // // // // // // // // // // // // // // //         date: new Date().toLocaleString(),
// // // // // // // // // // // // // // // //       };

// // // // // // // // // // // // // // // //       setReceipt(receiptData);

// // // // // // // // // // // // // // // //       Swal.fire('Success', 'Payment submitted successfully!', 'success');
// // // // // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // // // // //       Swal.fire('Error', 'Failed to submit payment.', 'error');
// // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // //   const handlePrint = async () => {
// // // // // // // // // // // // // // // //     const element = document.getElementById('receipt');
// // // // // // // // // // // // // // // //     const canvas = await html2canvas(element);
// // // // // // // // // // // // // // // //     const imgData = canvas.toDataURL('image/png');
// // // // // // // // // // // // // // // //     const pdf = new jsPDF();
// // // // // // // // // // // // // // // //     pdf.addImage(imgData, 'PNG', 10, 10);
// // // // // // // // // // // // // // // //     pdf.autoPrint();
// // // // // // // // // // // // // // // //     window.open(pdf.output('bloburl'), '_blank');
// // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // //   const handleDownload = async () => {
// // // // // // // // // // // // // // // //     const element = document.getElementById('receipt');
// // // // // // // // // // // // // // // //     const canvas = await html2canvas(element);
// // // // // // // // // // // // // // // //     const imgData = canvas.toDataURL('image/png');
// // // // // // // // // // // // // // // //     const pdf = new jsPDF();
// // // // // // // // // // // // // // // //     pdf.addImage(imgData, 'PNG', 10, 10);
// // // // // // // // // // // // // // // //     pdf.save('receipt.pdf');
// // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // // //     <div className={styles.container}>
// // // // // // // // // // // // // // // //       <div className={styles.formContainer}>
// // // // // // // // // // // // // // // //         <h2>Payment Form</h2>
// // // // // // // // // // // // // // // //         <form onSubmit={handleSubmit}>
// // // // // // // // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // // // // // // // //             <label htmlFor="enrollmentId">Enrollment ID:</label>
// // // // // // // // // // // // // // // //             <input type="text" id="enrollmentId" name="enrollmentId" placeholder="Enter Enrollment ID" value={paymentData.enrollmentId} onChange={handleChange} />
// // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // // // // // // // //             <label htmlFor="studentName">Student Name:</label>
// // // // // // // // // // // // // // // //             <input type="text" id="studentName" name="studentName" placeholder="Enter Student Name" value={paymentData.studentName} readOnly />
// // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // // // // // // // //             <label htmlFor="paymentAmount">Payment Amount:</label>
// // // // // // // // // // // // // // // //             <input type="number" id="paymentAmount" name="paymentAmount" placeholder="Enter Payment Amount" value={paymentData.paymentAmount} onChange={handleChange} />
// // // // // // // // // // // // // // // //             {errors.paymentAmountError && <div className={styles.errorMessage}>{errors.paymentAmountError}</div>}
// // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // // // // // // // //             <label htmlFor="balanceAmount">Balance Amount:</label>
// // // // // // // // // // // // // // // //             <input type="text" id="balanceAmount" name="balanceAmount" placeholder="Balance Amount" value={paymentData.balanceAmount} disabled />
// // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // // // // // // // //             <label htmlFor="newBalanceLeft">New Balance Left:</label>
// // // // // // // // // // // // // // // //             <input type="text" id="newBalanceLeft" name="newBalanceLeft" placeholder="New Balance Left" value={paymentData.newBalanceLeft} disabled />
// // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // // // // // // // //             <label htmlFor="paymentMode">Payment Mode:</label>
// // // // // // // // // // // // // // // //             <select id="paymentMode" name="paymentMode" value={paymentData.paymentMode} onChange={handleChange}>
// // // // // // // // // // // // // // // //               <option value="">Select Payment Mode</option>
// // // // // // // // // // // // // // // //               <option value="Cash">Cash</option>
// // // // // // // // // // // // // // // //               <option value="Credit Card">Credit Card</option>
// // // // // // // // // // // // // // // //               <option value="Debit Card">Debit Card</option>
// // // // // // // // // // // // // // // //               <option value="Online Transfer">Online Transfer</option>
// // // // // // // // // // // // // // // //             </select>
// // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // // // // // // // //             <label htmlFor="notes">Notes:</label>
// // // // // // // // // // // // // // // //             <textarea id="notes" name="notes" placeholder="Enter any notes here" value={paymentData.notes} onChange={handleChange}></textarea>
// // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // //           <div className={styles.formActions}>
// // // // // // // // // // // // // // // //             <button type="reset">Reset</button>
// // // // // // // // // // // // // // // //             <button type="submit">Submit</button>
// // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // //         </form>
// // // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // // //       <div className={styles.receiptContainer}>
// // // // // // // // // // // // // // // //         {receipt && (
// // // // // // // // // // // // // // // //           <div id="receipt">
// // // // // // // // // // // // // // // //             <h3>Payment Receipt</h3>
// // // // // // // // // // // // // // // //             <p><strong>Enrollment ID:</strong> {receipt.enrollmentId}</p>
// // // // // // // // // // // // // // // //             <p><strong>Student Name:</strong> {receipt.studentName}</p>
// // // // // // // // // // // // // // // //             <p><strong>Payment Amount:</strong> {receipt.paymentAmount}</p>
// // // // // // // // // // // // // // // //             <p><strong>Payment Mode:</strong> {receipt.paymentMode}</p>
// // // // // // // // // // // // // // // //             <p><strong>Notes:</strong> {receipt.notes}</p>
// // // // // // // // // // // // // // // //             <p><strong>Date:</strong> {receipt.date}</p>
            
// // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // //         )}
// // // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // // //       <div className={styles.receiptActions}>
// // // // // // // // // // // // // // // //               <button onClick={handlePrint}>Print</button>
// // // // // // // // // // // // // // // //               <button onClick={handleDownload}>Download</button>
// // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // //     </div>
    
// // // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // export default PaymentForm;
// // // // // // // // // // // // // // // // PaymentForm.js


// // // // // // // // // // // // // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // // // // // // // // // // // // import axios from 'axios';
// // // // // // // // // // // // // // // import Swal from 'sweetalert2';
// // // // // // // // // // // // // // // import { debounce } from 'lodash';
// // // // // // // // // // // // // // // import { useLocation } from 'react-router-dom';
// // // // // // // // // // // // // // // import html2canvas from 'html2canvas';
// // // // // // // // // // // // // // // import jsPDF from 'jspdf';
// // // // // // // // // // // // // // // import styles from './PaymentForm.module.css';

// // // // // // // // // // // // // // // function PaymentForm() {
// // // // // // // // // // // // // // //   const location = useLocation();
// // // // // // // // // // // // // // //   const searchParams = new URLSearchParams(location.search);
// // // // // // // // // // // // // // //   const enrollmentIdFromParams = searchParams.get('enrollmentId');

// // // // // // // // // // // // // // //   const [paymentData, setPaymentData] = useState({
// // // // // // // // // // // // // // //     enrollmentId: enrollmentIdFromParams ? enrollmentIdFromParams : '',
// // // // // // // // // // // // // // //     studentName: '',
// // // // // // // // // // // // // // //     paymentAmount: '',
// // // // // // // // // // // // // // //     balanceAmount: '',
// // // // // // // // // // // // // // //     newBalanceLeft: '',
// // // // // // // // // // // // // // //     paymentMode: '',
// // // // // // // // // // // // // // //     notes: '',
// // // // // // // // // // // // // // //   });
// // // // // // // // // // // // // // //   const [errors, setErrors] = useState({});
// // // // // // // // // // // // // // //   const [receipt, setReceipt] = useState(null);
// // // // // // // // // // // // // // //   const [email, setEmail] = useState(''); // New state for email input
// // // // // // // // // // // // // // //   const apiUrl = process.env.REACT_APP_API_BASE_URL;

// // // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // // //     fetchEnrollments().catch(err => {
// // // // // // // // // // // // // // //       Swal.fire('Error', 'Failed to fetch enrollments.', 'error');
// // // // // // // // // // // // // // //     });
// // // // // // // // // // // // // // //   }, []);

// // // // // // // // // // // // // // //   async function fetchEnrollments() {
// // // // // // // // // // // // // // //     const response = await axios.get(`${apiUrl}/enroll`);
// // // // // // // // // // // // // // //     return response.data; 
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // // //     if (enrollmentIdFromParams) {
// // // // // // // // // // // // // // //       fetchEnrollmentById(enrollmentIdFromParams);
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //   }, [enrollmentIdFromParams]);

// // // // // // // // // // // // // // //   const fetchEnrollmentById = async (id) => {
// // // // // // // // // // // // // // //     if (!id) return;
// // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // //       const response = await axios.get(`${apiUrl}/enroll/${id}`);
// // // // // // // // // // // // // // //       const enrollment = response.data;
// // // // // // // // // // // // // // //       updatePaymentDataFromEnrollment(enrollment);
// // // // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // // // //       Swal.fire('Error', 'Failed to fetch enrollment by ID.', 'error');
// // // // // // // // // // // // // // //       setPaymentData(prev => ({ ...prev, studentName: '', balanceAmount: '', newBalanceLeft: '' }));
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   const updatePaymentDataFromEnrollment = (enrollment) => {
// // // // // // // // // // // // // // //     setPaymentData(prev => ({
// // // // // // // // // // // // // // //       ...prev,
// // // // // // // // // // // // // // //       studentName: enrollment?.studentName || '',
// // // // // // // // // // // // // // //       balanceAmount: enrollment?.balanceAmount?.toString() || '',
// // // // // // // // // // // // // // //       newBalanceLeft: enrollment?.balanceAmount?.toString() || '',
// // // // // // // // // // // // // // //     }));
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   const debouncedFetchEnrollmentById = useCallback(debounce((id) => {
// // // // // // // // // // // // // // //     fetchEnrollmentById(id);
// // // // // // // // // // // // // // //   }, 1000), []);

// // // // // // // // // // // // // // //   const handleChange = async (e) => {
// // // // // // // // // // // // // // //     const { name, value } = e.target;
// // // // // // // // // // // // // // //     setPaymentData(prev => ({ ...prev, [name]: value }));

// // // // // // // // // // // // // // //     if (name === 'paymentAmount' && value) {
// // // // // // // // // // // // // // //       validatePaymentAmount(value, paymentData.balanceAmount);
// // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // //     if (name === "enrollmentId") {
// // // // // // // // // // // // // // //       setPaymentData(prev => ({ ...prev, [name]: value }));
// // // // // // // // // // // // // // //       await fetchEnrollmentById(value);
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   const validatePaymentAmount = (paymentAmount, balanceAmount) => {
// // // // // // // // // // // // // // //     const paymentAmountFloat = parseFloat(paymentAmount);
// // // // // // // // // // // // // // //     const balanceAmountFloat = parseFloat(balanceAmount);
// // // // // // // // // // // // // // //     const newBalanceLeft = balanceAmountFloat - paymentAmountFloat;

// // // // // // // // // // // // // // //     if (newBalanceLeft < 0) {
// // // // // // // // // // // // // // //       setErrors(prev => ({ ...prev, paymentAmountError: 'Payment amount cannot exceed the balance amount.' }));
// // // // // // // // // // // // // // //     } else {
// // // // // // // // // // // // // // //       setErrors(prev => ({ ...prev, paymentAmountError: '' }));
// // // // // // // // // // // // // // //       setPaymentData(prev => ({ ...prev, newBalanceLeft: newBalanceLeft.toFixed(2) }));
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   const handleSubmit = async (e) => {
// // // // // // // // // // // // // // //     e.preventDefault();
// // // // // // // // // // // // // // //     if (errors.paymentAmountError) {
// // // // // // // // // // // // // // //       Swal.fire('Error', errors.paymentAmountError, 'error');
// // // // // // // // // // // // // // //       return;
// // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // //       await axios.post(`${apiUrl}/payments`, {
// // // // // // // // // // // // // // //         enrollmentId: paymentData.enrollmentId,
// // // // // // // // // // // // // // //         amount: parseFloat(paymentData.paymentAmount),
// // // // // // // // // // // // // // //         paymentMethod: paymentData.paymentMode,
// // // // // // // // // // // // // // //         notes: paymentData.notes,
// // // // // // // // // // // // // // //       });

// // // // // // // // // // // // // // //       const receiptData = {
// // // // // // // // // // // // // // //         enrollmentId: paymentData.enrollmentId,
// // // // // // // // // // // // // // //         studentName: paymentData.studentName,
// // // // // // // // // // // // // // //         paymentAmount: paymentData.paymentAmount,
// // // // // // // // // // // // // // //         paymentMode: paymentData.paymentMode,
// // // // // // // // // // // // // // //         notes: paymentData.notes,
// // // // // // // // // // // // // // //         date: new Date().toLocaleString(),
// // // // // // // // // // // // // // //       };

// // // // // // // // // // // // // // //       setReceipt(receiptData);

// // // // // // // // // // // // // // //       Swal.fire('Success', 'Payment submitted successfully!', 'success');
// // // // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // // // //       Swal.fire('Error', 'Failed to submit payment.', 'error');
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   const handlePrint = async () => {
// // // // // // // // // // // // // // //     const element = document.getElementById('receipt');
// // // // // // // // // // // // // // //     const canvas = await html2canvas(element);
// // // // // // // // // // // // // // //     const imgData = canvas.toDataURL('image/png');
// // // // // // // // // // // // // // //     const pdf = new jsPDF();
// // // // // // // // // // // // // // //     pdf.addImage(imgData, 'PNG', 10, 10);
// // // // // // // // // // // // // // //     pdf.autoPrint();
// // // // // // // // // // // // // // //     window.open(pdf.output('bloburl'), '_blank');
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   const handleDownload = async () => {
// // // // // // // // // // // // // // //     const element = document.getElementById('receipt');
// // // // // // // // // // // // // // //     const canvas = await html2canvas(element);
// // // // // // // // // // // // // // //     const imgData = canvas.toDataURL('image/png');
// // // // // // // // // // // // // // //     const pdf = new jsPDF();
// // // // // // // // // // // // // // //     pdf.addImage(imgData, 'PNG', 10, 10);
// // // // // // // // // // // // // // //     pdf.save('receipt.pdf');
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   const handleEmail = async () => {
// // // // // // // // // // // // // // //     const element = document.getElementById('receipt');
// // // // // // // // // // // // // // //     const canvas = await html2canvas(element);
// // // // // // // // // // // // // // //     const imgData = canvas.toDataURL('image/png');
// // // // // // // // // // // // // // //     const pdf = new jsPDF();
// // // // // // // // // // // // // // //     pdf.addImage(imgData, 'PNG', 10, 10);
// // // // // // // // // // // // // // //     const pdfBase64 = pdf.output('datauristring').split(',')[1]; // Get base64 string of PDF
  
// // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // //       const response = await axios.post(`${apiUrl}/send-email`, {
// // // // // // // // // // // // // // //         to: email,
// // // // // // // // // // // // // // //         subject: 'Payment Receipt',
// // // // // // // // // // // // // // //         text: 'Please find attached the payment receipt.',
// // // // // // // // // // // // // // //         pdfBase64: pdfBase64
// // // // // // // // // // // // // // //       });
  
// // // // // // // // // // // // // // //       console.log('Email sent:', response.data); // Log response for debugging
  
// // // // // // // // // // // // // // //       Swal.fire('Success', 'Email sent successfully!', 'success');
// // // // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // // // //       console.error('Failed to send email:', error); // Log detailed error for debugging
// // // // // // // // // // // // // // //       Swal.fire('Error', 'Failed to send email.', 'error');
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //   };
  

// // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // //     <div className={styles.container}>
// // // // // // // // // // // // // // //       <div className={styles.formContainer}>
// // // // // // // // // // // // // // //         <h2>Payment Form</h2>
// // // // // // // // // // // // // // //         <form onSubmit={handleSubmit}>
// // // // // // // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // // // // // // //             <label htmlFor="enrollmentId">Enrollment ID:</label>
// // // // // // // // // // // // // // //             <input type="text" id="enrollmentId" name="enrollmentId" placeholder="Enter Enrollment ID" value={paymentData.enrollmentId} onChange={handleChange} />
// // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // // // // // // //             <label htmlFor="studentName">Student Name:</label>
// // // // // // // // // // // // // // //             <input type="text" id="studentName" name="studentName" placeholder="Enter Student Name" value={paymentData.studentName} readOnly />
// // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // // // // // // //             <label htmlFor="paymentAmount">Payment Amount:</label>
// // // // // // // // // // // // // // //             <input type="number" id="paymentAmount" name="paymentAmount" placeholder="Enter Payment Amount" value={paymentData.paymentAmount} onChange={handleChange} />
// // // // // // // // // // // // // // //             {errors.paymentAmountError && <div className={styles.errorMessage}>{errors.paymentAmountError}</div>}
// // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // // // // // // //             <label htmlFor="balanceAmount">Balance Amount:</label>
// // // // // // // // // // // // // // //             <input type="text" id="balanceAmount" name="balanceAmount" placeholder="Balance Amount" value={paymentData.balanceAmount} disabled />
// // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // // // // // // //             <label htmlFor="newBalanceLeft">New Balance Left:</label>
// // // // // // // // // // // // // // //             <input type="text" id="newBalanceLeft" name="newBalanceLeft" placeholder="New Balance Left" value={paymentData.newBalanceLeft} disabled />
// // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // // // // // // //             <label htmlFor="paymentMode">Payment Mode:</label>
// // // // // // // // // // // // // // //             <select id="paymentMode" name="paymentMode" value={paymentData.paymentMode} onChange={handleChange}>
// // // // // // // // // // // // // // //               <option value="">Select Payment Mode</option>
// // // // // // // // // // // // // // //               <option value="Cash">Cash</option>
// // // // // // // // // // // // // // //               <option value="Credit Card">Credit Card</option>
// // // // // // // // // // // // // // //               <option value="Debit Card">Debit Card</option>
// // // // // // // // // // // // // // //               <option value="Online Transfer">Online Transfer</option>
// // // // // // // // // // // // // // //             </select>
// // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // // // // // // //             <label htmlFor="notes">Notes:</label>
// // // // // // // // // // // // // // //             <textarea id="notes" name="notes" placeholder="Enter any notes here" value={paymentData.notes} onChange={handleChange}></textarea>
// // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // //           <div className={styles.formActions}>
// // // // // // // // // // // // // // //             <button type="reset">Reset</button>
// // // // // // // // // // // // // // //             <button type="submit">Submit</button>
// // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // //         </form>
// // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // //       <div className={styles.receiptContainer}>
// // // // // // // // // // // // // // //         {receipt && (
// // // // // // // // // // // // // // //           <div id="receipt">
// // // // // // // // // // // // // // //             <h3>Payment Receipt</h3>
// // // // // // // // // // // // // // //             <p><strong>Enrollment ID:</strong> {receipt.enrollmentId}</p>
// // // // // // // // // // // // // // //             <p><strong>Student Name:</strong> {receipt.studentName}</p>
// // // // // // // // // // // // // // //             <p><strong>Payment Amount:</strong> {receipt.paymentAmount}</p>
// // // // // // // // // // // // // // //             <p><strong>Payment Mode:</strong> {receipt.paymentMode}</p>
// // // // // // // // // // // // // // //             <p><strong>Notes:</strong> {receipt.notes}</p>
// // // // // // // // // // // // // // //             <p><strong>Date:</strong> {receipt.date}</p>
// // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // //         )}
// // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // //       <div className={styles.receiptActions}>
// // // // // // // // // // // // // // //         <button onClick={handlePrint}>Print</button>
// // // // // // // // // // // // // // //         <button onClick={handleDownload}>Download</button>
// // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // //       <div className={styles.emailContainer}>
// // // // // // // // // // // // // // //         <input
// // // // // // // // // // // // // // //           type="email"
// // // // // // // // // // // // // // //           placeholder="Enter email to send receipt"
// // // // // // // // // // // // // // //           value={email}
// // // // // // // // // // // // // // //           onChange={(e) => setEmail(e.target.value)}
// // // // // // // // // // // // // // //         />
// // // // // // // // // // // // // // //         <button onClick={handleEmail}>Send Email</button>
// // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // export default PaymentForm;


// // // // // // // // // // // // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // // // // // // // // // // // import axios from 'axios';
// // // // // // // // // // // // // // import Swal from 'sweetalert2';
// // // // // // // // // // // // // // import { debounce } from 'lodash';
// // // // // // // // // // // // // // import { useLocation } from 'react-router-dom';
// // // // // // // // // // // // // // import html2canvas from 'html2canvas';
// // // // // // // // // // // // // // import jsPDF from 'jspdf';
// // // // // // // // // // // // // // import styles from './PaymentForm.module.css';

// // // // // // // // // // // // // // function PaymentForm() {
// // // // // // // // // // // // // //   const location = useLocation();
// // // // // // // // // // // // // //   const searchParams = new URLSearchParams(location.search);
// // // // // // // // // // // // // //   const enrollmentIdFromParams = searchParams.get('enrollmentId');

// // // // // // // // // // // // // //   const [paymentData, setPaymentData] = useState({
// // // // // // // // // // // // // //     enrollmentId: enrollmentIdFromParams ? enrollmentIdFromParams : '',
// // // // // // // // // // // // // //     studentName: '',
// // // // // // // // // // // // // //     paymentAmount: '',
// // // // // // // // // // // // // //     balanceAmount: '',
// // // // // // // // // // // // // //     newBalanceLeft: '',
// // // // // // // // // // // // // //     paymentMode: '',
// // // // // // // // // // // // // //     notes: '',
// // // // // // // // // // // // // //   });
// // // // // // // // // // // // // //   const [errors, setErrors] = useState({});
// // // // // // // // // // // // // //   const [receipt, setReceipt] = useState(null);
// // // // // // // // // // // // // //   const [email, setEmail] = useState(''); // New state for email input
// // // // // // // // // // // // // //   const apiUrl = process.env.REACT_APP_API_BASE_URL;

// // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // //     fetchEnrollments().catch(err => {
// // // // // // // // // // // // // //       Swal.fire('Error', 'Failed to fetch enrollments.', 'error');
// // // // // // // // // // // // // //     });
// // // // // // // // // // // // // //   }, []);

// // // // // // // // // // // // // //   async function fetchEnrollments() {
// // // // // // // // // // // // // //     const response = await axios.get(`${apiUrl}/enroll`);
// // // // // // // // // // // // // //     return response.data; 
// // // // // // // // // // // // // //   }

// // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // //     if (enrollmentIdFromParams) {
// // // // // // // // // // // // // //       fetchEnrollmentById(enrollmentIdFromParams);
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // //   }, [enrollmentIdFromParams]);

// // // // // // // // // // // // // //   const fetchEnrollmentById = async (id) => {
// // // // // // // // // // // // // //     if (!id) return;
// // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // //       const response = await axios.get(`${apiUrl}/enroll/${id}`);
// // // // // // // // // // // // // //       const enrollment = response.data;
// // // // // // // // // // // // // //       updatePaymentDataFromEnrollment(enrollment);
// // // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // // //       Swal.fire('Error', 'Failed to fetch enrollment by ID.', 'error');
// // // // // // // // // // // // // //       setPaymentData(prev => ({ ...prev, studentName: '', balanceAmount: '', newBalanceLeft: '' }));
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   const updatePaymentDataFromEnrollment = (enrollment) => {
// // // // // // // // // // // // // //     setPaymentData(prev => ({
// // // // // // // // // // // // // //       ...prev,
// // // // // // // // // // // // // //       studentName: enrollment?.studentName || '',
// // // // // // // // // // // // // //       balanceAmount: enrollment?.balanceAmount?.toString() || '',
// // // // // // // // // // // // // //       newBalanceLeft: enrollment?.balanceAmount?.toString() || '',
// // // // // // // // // // // // // //     }));
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   const debouncedFetchEnrollmentById = useCallback(debounce((id) => {
// // // // // // // // // // // // // //     fetchEnrollmentById(id);
// // // // // // // // // // // // // //   }, 1000), []);

// // // // // // // // // // // // // //   const handleChange = async (e) => {
// // // // // // // // // // // // // //     const { name, value } = e.target;
// // // // // // // // // // // // // //     setPaymentData(prev => ({ ...prev, [name]: value }));

// // // // // // // // // // // // // //     if (name === 'paymentAmount' && value) {
// // // // // // // // // // // // // //       validatePaymentAmount(value, paymentData.balanceAmount);
// // // // // // // // // // // // // //     }

// // // // // // // // // // // // // //     if (name === "enrollmentId") {
// // // // // // // // // // // // // //       setPaymentData(prev => ({ ...prev, [name]: value }));
// // // // // // // // // // // // // //       await fetchEnrollmentById(value);
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   const validatePaymentAmount = (paymentAmount, balanceAmount) => {
// // // // // // // // // // // // // //     const paymentAmountFloat = parseFloat(paymentAmount);
// // // // // // // // // // // // // //     const balanceAmountFloat = parseFloat(balanceAmount);
// // // // // // // // // // // // // //     const newBalanceLeft = balanceAmountFloat - paymentAmountFloat;

// // // // // // // // // // // // // //     if (newBalanceLeft < 0) {
// // // // // // // // // // // // // //       setErrors(prev => ({ ...prev, paymentAmountError: 'Payment amount cannot exceed the balance amount.' }));
// // // // // // // // // // // // // //     } else {
// // // // // // // // // // // // // //       setErrors(prev => ({ ...prev, paymentAmountError: '' }));
// // // // // // // // // // // // // //       setPaymentData(prev => ({ ...prev, newBalanceLeft: newBalanceLeft.toFixed(2) }));
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   const handleSubmit = async (e) => {
// // // // // // // // // // // // // //     e.preventDefault();
// // // // // // // // // // // // // //     if (errors.paymentAmountError) {
// // // // // // // // // // // // // //       Swal.fire('Error', errors.paymentAmountError, 'error');
// // // // // // // // // // // // // //       return;
// // // // // // // // // // // // // //     }

// // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // //       await axios.post(`${apiUrl}/payments`, {
// // // // // // // // // // // // // //         enrollmentId: paymentData.enrollmentId,
// // // // // // // // // // // // // //         amount: parseFloat(paymentData.paymentAmount),
// // // // // // // // // // // // // //         paymentMethod: paymentData.paymentMode,
// // // // // // // // // // // // // //         notes: paymentData.notes,
// // // // // // // // // // // // // //       });

// // // // // // // // // // // // // //       const receiptData = {
// // // // // // // // // // // // // //         enrollmentId: paymentData.enrollmentId,
// // // // // // // // // // // // // //         studentName: paymentData.studentName,
// // // // // // // // // // // // // //         paymentAmount: paymentData.paymentAmount,
// // // // // // // // // // // // // //         paymentMode: paymentData.paymentMode,
// // // // // // // // // // // // // //         notes: paymentData.notes,
// // // // // // // // // // // // // //         date: new Date().toLocaleString(),
// // // // // // // // // // // // // //       };

// // // // // // // // // // // // // //       setReceipt(receiptData);

// // // // // // // // // // // // // //       Swal.fire('Success', 'Payment submitted successfully!', 'success');
// // // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // // //       Swal.fire('Error', 'Failed to submit payment.', 'error');
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   const handlePrint = async () => {
// // // // // // // // // // // // // //     const element = document.getElementById('receipt');
// // // // // // // // // // // // // //     const canvas = await html2canvas(element);
// // // // // // // // // // // // // //     const imgData = canvas.toDataURL('image/png');
// // // // // // // // // // // // // //     const pdf = new jsPDF();
// // // // // // // // // // // // // //     pdf.addImage(imgData, 'PNG', 10, 10);
// // // // // // // // // // // // // //     pdf.autoPrint();
// // // // // // // // // // // // // //     window.open(pdf.output('bloburl'), '_blank');
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   const handleDownload = async () => {
// // // // // // // // // // // // // //     const element = document.getElementById('receipt');
// // // // // // // // // // // // // //     const canvas = await html2canvas(element);
// // // // // // // // // // // // // //     const imgData = canvas.toDataURL('image/png');
// // // // // // // // // // // // // //     const pdf = new jsPDF();
// // // // // // // // // // // // // //     pdf.addImage(imgData, 'PNG', 10, 10);
// // // // // // // // // // // // // //     pdf.save('receipt.pdf');
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   const handleEmail = async () => {
// // // // // // // // // // // // // //     const element = document.getElementById('receipt');
// // // // // // // // // // // // // //     const canvas = await html2canvas(element);
// // // // // // // // // // // // // //     const imgData = canvas.toDataURL('image/png');
// // // // // // // // // // // // // //     const pdf = new jsPDF();
// // // // // // // // // // // // // //     pdf.addImage(imgData, 'PNG', 10, 10);
// // // // // // // // // // // // // //     const pdfBase64 = pdf.output('datauristring').split(',')[1]; // Get base64 string of PDF
  
// // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // //       const response = await axios.post(`${apiUrl}/send-email`, {
// // // // // // // // // // // // // //         to: email,
// // // // // // // // // // // // // //         subject: 'Payment Receipt',
// // // // // // // // // // // // // //         text: 'Please find attached the payment receipt.',
// // // // // // // // // // // // // //         pdfBase64: pdfBase64
// // // // // // // // // // // // // //       });
  
// // // // // // // // // // // // // //       console.log('Email sent:', response.data); // Log response for debugging
  
// // // // // // // // // // // // // //       Swal.fire('Success', 'Email sent successfully!', 'success');
// // // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // // //       console.error('Failed to send email:', error); // Log detailed error for debugging
// // // // // // // // // // // // // //       Swal.fire('Error', 'Failed to send email.', 'error');
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // //     <div className={styles.container}>
// // // // // // // // // // // // // //       <div className={styles.formContainer}>
// // // // // // // // // // // // // //         <h2>Payment Form</h2>
// // // // // // // // // // // // // //         <form onSubmit={handleSubmit}>
// // // // // // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // // // // // //             <label htmlFor="enrollmentId">Enrollment ID:</label>
// // // // // // // // // // // // // //             <input type="text" id="enrollmentId" name="enrollmentId" placeholder="Enter Enrollment ID" value={paymentData.enrollmentId} onChange={handleChange} />
// // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // // // // // //             <label htmlFor="studentName">Student Name:</label>
// // // // // // // // // // // // // //             <input type="text" id="studentName" name="studentName" placeholder="Enter Student Name" value={paymentData.studentName} readOnly />
// // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // // // // // //             <label htmlFor="paymentAmount">Payment Amount:</label>
// // // // // // // // // // // // // //             <input type="number" id="paymentAmount" name="paymentAmount" placeholder="Enter Payment Amount" value={paymentData.paymentAmount} onChange={handleChange} />
// // // // // // // // // // // // // //             {errors.paymentAmountError && <div className={styles.errorMessage}>{errors.paymentAmountError}</div>}
// // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // // // // // //             <label htmlFor="balanceAmount">Balance Amount:</label>
// // // // // // // // // // // // // //             <input type="text" id="balanceAmount" name="balanceAmount" placeholder="Balance Amount" value={paymentData.balanceAmount} disabled />
// // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // // // // // //             <label htmlFor="newBalanceLeft">New Balance Left:</label>
// // // // // // // // // // // // // //             <input type="text" id="newBalanceLeft" name="newBalanceLeft" placeholder="New Balance Left" value={paymentData.newBalanceLeft} disabled />
// // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // // // // // //             <label htmlFor="paymentMode">Payment Mode:</label>
// // // // // // // // // // // // // //             <select id="paymentMode" name="paymentMode" value={paymentData.paymentMode} onChange={handleChange}>
// // // // // // // // // // // // // //               <option value="">Select Payment Mode</option>
// // // // // // // // // // // // // //               <option value="Cash">Cash</option>
// // // // // // // // // // // // // //               <option value="Credit Card">Credit Card</option>
// // // // // // // // // // // // // //               <option value="Debit Card">Debit Card</option>
// // // // // // // // // // // // // //               <option value="Online Transfer">Online Transfer</option>
// // // // // // // // // // // // // //             </select>
// // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // // // // // //             <label htmlFor="notes">Notes:</label>
// // // // // // // // // // // // // //             <textarea id="notes" name="notes" placeholder="Enter any notes here" value={paymentData.notes} onChange={handleChange}></textarea>
// // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // //           <div className={styles.formActions}>
// // // // // // // // // // // // // //             <button type="reset">Reset</button>
// // // // // // // // // // // // // //             <button type="submit">Submit</button>
// // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // //         </form>
// // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // //       <div className={styles.receiptContainer}>
// // // // // // // // // // // // // //         {receipt && (
// // // // // // // // // // // // // //           <div id="receipt">
// // // // // // // // // // // // // //             <div className="page-container">Page <span className="page"></span> of <span className="pages"></span></div>
// // // // // // // // // // // // // //             <div className="logo-container">
// // // // // // // // // // // // // //               <img style={{ height: '18px' }} src="https://app.useanvil.com/img/email-logo-black.png" alt="Logo" />
// // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // //             <table className="invoice-info-container">
// // // // // // // // // // // // // //               <tr>
// // // // // // // // // // // // // //                 <td rowSpan="2" className="client-name">Client Name</td>
// // // // // // // // // // // // // //                 <td>{receipt.studentName}</td>
// // // // // // // // // // // // // //               </tr>
// // // // // // // // // // // // // //               <tr>
// // // // // // // // // // // // // //                 <td>123 Main Street</td>
// // // // // // // // // // // // // //               </tr>
// // // // // // // // // // // // // //               <tr>
// // // // // // // // // // // // // //                 <td>Invoice Date: <strong>{receipt.date}</strong></td>
// // // // // // // // // // // // // //                 <td>San Francisco CA, 94103</td>
// // // // // // // // // // // // // //               </tr>
// // // // // // // // // // // // // //               <tr>
// // // // // // // // // // // // // //                 <td>Invoice No: <strong>{receipt.enrollmentId}</strong></td>
// // // // // // // // // // // // // //                 <td>hello@useanvil.com</td>
// // // // // // // // // // // // // //               </tr>
// // // // // // // // // // // // // //             </table>
// // // // // // // // // // // // // //             <table className="line-items-container">
// // // // // // // // // // // // // //               <thead>
// // // // // // // // // // // // // //                 <tr>
// // // // // // // // // // // // // //                   <th className="heading-quantity">Qty</th>
// // // // // // // // // // // // // //                   <th className="heading-description">Description</th>
// // // // // // // // // // // // // //                   <th className="heading-price">Price</th>
// // // // // // // // // // // // // //                   <th className="heading-subtotal">Subtotal</th>
// // // // // // // // // // // // // //                 </tr>
// // // // // // // // // // // // // //               </thead>
// // // // // // // // // // // // // //               <tbody>
// // // // // // // // // // // // // //                 <tr>
// // // // // // // // // // // // // //                   <td>1</td>
// // // // // // // // // // // // // //                   <td>Payment</td>
// // // // // // // // // // // // // //                   <td className="right">{receipt.paymentAmount}</td>
// // // // // // // // // // // // // //                   <td className="bold">{receipt.paymentAmount}</td>
// // // // // // // // // // // // // //                 </tr>
// // // // // // // // // // // // // //               </tbody>
// // // // // // // // // // // // // //             </table>
// // // // // // // // // // // // // //             <table className="line-items-container has-bottom-border">
// // // // // // // // // // // // // //               <thead>
// // // // // // // // // // // // // //                 <tr>
// // // // // // // // // // // // // //                   <th>Payment Info</th>
// // // // // // // // // // // // // //                   <th>Due By</th>
// // // // // // // // // // // // // //                   <th>Total Due</th>
// // // // // // // // // // // // // //                 </tr>
// // // // // // // // // // // // // //               </thead>
// // // // // // // // // // // // // //               <tbody>
// // // // // // // // // // // // // //                 <tr>
// // // // // // // // // // // // // //                   <td className="payment-info">
// // // // // // // // // // // // // //                     <div>Account No: <strong>123567744</strong></div>
// // // // // // // // // // // // // //                     <div>Routing No: <strong>120000547</strong></div>
// // // // // // // // // // // // // //                   </td>
// // // // // // // // // // // // // //                   <td className="large">{new Date().toLocaleDateString()}</td>
// // // // // // // // // // // // // //                   <td className="large total">{receipt.paymentAmount}</td>
// // // // // // // // // // // // // //                 </tr>
// // // // // // // // // // // // // //               </tbody>
// // // // // // // // // // // // // //             </table>
// // // // // // // // // // // // // //             <div className="footer">
// // // // // // // // // // // // // //               <div className="footer-info">
// // // // // // // // // // // // // //                 <span>hello@useanvil.com</span> | <span>555 444 6666</span> | <span>useanvil.com</span>
// // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // //               <div className="footer-thanks">
// // // // // // // // // // // // // //                 <img src="https://github.com/anvilco/html-pdf-invoice-template/raw/main/img/heart.png" alt="heart" />
// // // // // // // // // // // // // //                 <span>Thank you!</span>
// // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // //         )}
// // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // //       {/* <div className={styles.receiptActions}>
// // // // // // // // // // // // // //         <button onClick={handlePrint}>Print</button>
// // // // // // // // // // // // // //         <button onClick={handleDownload}>Download</button>
// // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // //       <div className={styles.emailContainer}>
// // // // // // // // // // // // // //         <input
// // // // // // // // // // // // // //           type="email"
// // // // // // // // // // // // // //           placeholder="Enter email to send receipt"
// // // // // // // // // // // // // //           value={email}
// // // // // // // // // // // // // //           onChange={(e) => setEmail(e.target.value)}
// // // // // // // // // // // // // //         />
// // // // // // // // // // // // // //         <button onClick={handleEmail}>Send Email</button>
// // // // // // // // // // // // // //       </div> */}
// // // // // // // // // // // // // //     </div>
    
    
// // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // }

// // // // // // // // // // // // // // export default PaymentForm;

// // // // // // // // // // // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // // // // // // // // // // import axios from 'axios';
// // // // // // // // // // // // // import Swal from 'sweetalert2';
// // // // // // // // // // // // // import { debounce } from 'lodash';
// // // // // // // // // // // // // import { useLocation } from 'react-router-dom';
// // // // // // // // // // // // // import html2canvas from 'html2canvas';
// // // // // // // // // // // // // import jsPDF from 'jspdf';
// // // // // // // // // // // // // import styles from './PaymentForm.module.css';

// // // // // // // // // // // // // function PaymentForm() {
// // // // // // // // // // // // //   const location = useLocation();
// // // // // // // // // // // // //   const searchParams = new URLSearchParams(location.search);
// // // // // // // // // // // // //   const enrollmentIdFromParams = searchParams.get('enrollmentId');

// // // // // // // // // // // // //   const [paymentData, setPaymentData] = useState({
// // // // // // // // // // // // //     enrollmentId: enrollmentIdFromParams ? enrollmentIdFromParams : '',
// // // // // // // // // // // // //     studentName: '',
// // // // // // // // // // // // //     paymentAmount: '',
// // // // // // // // // // // // //     balanceAmount: '',
// // // // // // // // // // // // //     newBalanceLeft: '',
// // // // // // // // // // // // //     paymentMode: '',
// // // // // // // // // // // // //     notes: '',
// // // // // // // // // // // // //   });
// // // // // // // // // // // // //   const [errors, setErrors] = useState({});
// // // // // // // // // // // // //   const [receipt, setReceipt] = useState(null);
// // // // // // // // // // // // //   const [email, setEmail] = useState(''); // New state for email input
// // // // // // // // // // // // //   const apiUrl = process.env.REACT_APP_API_BASE_URL;

// // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // //     fetchEnrollments().catch(err => {
// // // // // // // // // // // // //       Swal.fire('Error', 'Failed to fetch enrollments.', 'error');
// // // // // // // // // // // // //     });
// // // // // // // // // // // // //   }, []);

// // // // // // // // // // // // //   async function fetchEnrollments() {
// // // // // // // // // // // // //     const response = await axios.get(`${apiUrl}/enroll`);
// // // // // // // // // // // // //     return response.data; 
// // // // // // // // // // // // //   }

// // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // //     if (enrollmentIdFromParams) {
// // // // // // // // // // // // //       fetchEnrollmentById(enrollmentIdFromParams);
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   }, [enrollmentIdFromParams]);

// // // // // // // // // // // // //   const fetchEnrollmentById = async (id) => {
// // // // // // // // // // // // //     if (!id) return;
// // // // // // // // // // // // //     try {
// // // // // // // // // // // // //       const response = await axios.get(`${apiUrl}/enroll/${id}`);
// // // // // // // // // // // // //       const enrollment = response.data;
// // // // // // // // // // // // //       updatePaymentDataFromEnrollment(enrollment);
// // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // //       Swal.fire('Error', 'Failed to fetch enrollment by ID.', 'error');
// // // // // // // // // // // // //       setPaymentData(prev => ({ ...prev, studentName: '', balanceAmount: '', newBalanceLeft: '' }));
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const updatePaymentDataFromEnrollment = (enrollment) => {
// // // // // // // // // // // // //     setPaymentData(prev => ({
// // // // // // // // // // // // //       ...prev,
// // // // // // // // // // // // //       studentName: enrollment?.studentName || '',
// // // // // // // // // // // // //       balanceAmount: enrollment?.balanceAmount?.toString() || '',
// // // // // // // // // // // // //       newBalanceLeft: enrollment?.balanceAmount?.toString() || '',
// // // // // // // // // // // // //     }));
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const debouncedFetchEnrollmentById = useCallback(debounce((id) => {
// // // // // // // // // // // // //     fetchEnrollmentById(id);
// // // // // // // // // // // // //   }, 1000), []);

// // // // // // // // // // // // //   const handleChange = async (e) => {
// // // // // // // // // // // // //     const { name, value } = e.target;
// // // // // // // // // // // // //     setPaymentData(prev => ({ ...prev, [name]: value }));

// // // // // // // // // // // // //     if (name === 'paymentAmount' && value) {
// // // // // // // // // // // // //       validatePaymentAmount(value, paymentData.balanceAmount);
// // // // // // // // // // // // //     }

// // // // // // // // // // // // //     if (name === "enrollmentId") {
// // // // // // // // // // // // //       setPaymentData(prev => ({ ...prev, [name]: value }));
// // // // // // // // // // // // //       await fetchEnrollmentById(value);
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const validatePaymentAmount = (paymentAmount, balanceAmount) => {
// // // // // // // // // // // // //     const paymentAmountFloat = parseFloat(paymentAmount);
// // // // // // // // // // // // //     const balanceAmountFloat = parseFloat(balanceAmount);
// // // // // // // // // // // // //     const newBalanceLeft = balanceAmountFloat - paymentAmountFloat;

// // // // // // // // // // // // //     if (newBalanceLeft < 0) {
// // // // // // // // // // // // //       setErrors(prev => ({ ...prev, paymentAmountError: 'Payment amount cannot exceed the balance amount.' }));
// // // // // // // // // // // // //     } else {
// // // // // // // // // // // // //       setErrors(prev => ({ ...prev, paymentAmountError: '' }));
// // // // // // // // // // // // //       setPaymentData(prev => ({ ...prev, newBalanceLeft: newBalanceLeft.toFixed(2) }));
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const handleSubmit = async (e) => {
// // // // // // // // // // // // //     e.preventDefault();
// // // // // // // // // // // // //     if (errors.paymentAmountError) {
// // // // // // // // // // // // //       Swal.fire('Error', errors.paymentAmountError, 'error');
// // // // // // // // // // // // //       return;
// // // // // // // // // // // // //     }

// // // // // // // // // // // // //     try {
// // // // // // // // // // // // //       await axios.post(`${apiUrl}/payments`, {
// // // // // // // // // // // // //         enrollmentId: paymentData.enrollmentId,
// // // // // // // // // // // // //         amount: parseFloat(paymentData.paymentAmount),
// // // // // // // // // // // // //         paymentMethod: paymentData.paymentMode,
// // // // // // // // // // // // //         notes: paymentData.notes,
// // // // // // // // // // // // //       });

// // // // // // // // // // // // //       const receiptData = {
// // // // // // // // // // // // //         enrollmentId: paymentData.enrollmentId,
// // // // // // // // // // // // //         studentName: paymentData.studentName,
// // // // // // // // // // // // //         paymentAmount: paymentData.paymentAmount,
// // // // // // // // // // // // //         paymentMode: paymentData.paymentMode,
// // // // // // // // // // // // //         notes: paymentData.notes,
// // // // // // // // // // // // //         date: new Date().toLocaleString(),
// // // // // // // // // // // // //       };

// // // // // // // // // // // // //       setReceipt(receiptData);

// // // // // // // // // // // // //       Swal.fire('Success', 'Payment submitted successfully!', 'success');
// // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // //       Swal.fire('Error', 'Failed to submit payment.', 'error');
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const handlePrint = async () => {
// // // // // // // // // // // // //     const element = document.getElementById('receipt');
// // // // // // // // // // // // //     const canvas = await html2canvas(element);
// // // // // // // // // // // // //     const imgData = canvas.toDataURL('image/png');
// // // // // // // // // // // // //     const pdf = new jsPDF({
// // // // // // // // // // // // //       format: 'a4'
// // // // // // // // // // // // //     });
// // // // // // // // // // // // //     pdf.addImage(imgData, 'PNG', 10, 10);
// // // // // // // // // // // // //     const pdfBlob = pdf.output('blob');
// // // // // // // // // // // // //     const url = URL.createObjectURL(pdfBlob);
// // // // // // // // // // // // //     window.open(url, '_blank');
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const handleDownload = async () => {
// // // // // // // // // // // // //     const element = document.getElementById('receipt');
// // // // // // // // // // // // //     const canvas = await html2canvas(element);
// // // // // // // // // // // // //     const imgData = canvas.toDataURL('image/png');
// // // // // // // // // // // // //     const pdf = new jsPDF({
// // // // // // // // // // // // //       format: 'a4'
// // // // // // // // // // // // //     });
// // // // // // // // // // // // //     pdf.addImage(imgData, 'PNG', 10, 10);
// // // // // // // // // // // // //     pdf.save('receipt.pdf');
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const handleEmail = async () => {
// // // // // // // // // // // // //     const element = document.getElementById('receipt');
// // // // // // // // // // // // //     const canvas = await html2canvas(element);
// // // // // // // // // // // // //     const imgData = canvas.toDataURL('image/png');
// // // // // // // // // // // // //     const pdf = new jsPDF({
// // // // // // // // // // // // //       format: 'a4'
// // // // // // // // // // // // //     });
// // // // // // // // // // // // //     pdf.addImage(imgData, 'PNG', 10, 10);
// // // // // // // // // // // // //     const pdfBase64 = pdf.output('datauristring').split(',')[1]; // Get base64 string of PDF
  
// // // // // // // // // // // // //     try {
// // // // // // // // // // // // //       const response = await axios.post(`${apiUrl}/send-email`, {
// // // // // // // // // // // // //         to: email,
// // // // // // // // // // // // //         subject: 'Payment Receipt',
// // // // // // // // // // // // //         text: 'Please find attached the payment receipt.',
// // // // // // // // // // // // //         pdfBase64: pdfBase64
// // // // // // // // // // // // //       });
  
// // // // // // // // // // // // //       console.log('Email sent:', response.data); // Log response for debugging
  
// // // // // // // // // // // // //       Swal.fire('Success', 'Email sent successfully!', 'success');
// // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // //       console.error('Failed to send email:', error); // Log detailed error for debugging
// // // // // // // // // // // // //       Swal.fire('Error', 'Failed to send email.', 'error');
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   return (
// // // // // // // // // // // // //     <div className={styles.container}>
// // // // // // // // // // // // //       <div className={styles.formContainer}>
// // // // // // // // // // // // //         <h2>Payment Form</h2>
// // // // // // // // // // // // //         <form onSubmit={handleSubmit}>
// // // // // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // // // // //             <label htmlFor="enrollmentId">Enrollment ID:</label>
// // // // // // // // // // // // //             <input type="text" id="enrollmentId" name="enrollmentId" placeholder="Enter Enrollment ID" value={paymentData.enrollmentId} onChange={handleChange} />
// // // // // // // // // // // // //           </div>
// // // // // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // // // // //             <label htmlFor="studentName">Student Name:</label>
// // // // // // // // // // // // //             <input type="text" id="studentName" name="studentName" placeholder="Enter Student Name" value={paymentData.studentName} readOnly />
// // // // // // // // // // // // //           </div>
// // // // // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // // // // //             <label htmlFor="paymentAmount">Payment Amount:</label>
// // // // // // // // // // // // //             <input type="number" id="paymentAmount" name="paymentAmount" placeholder="Enter Payment Amount" value={paymentData.paymentAmount} onChange={handleChange} />
// // // // // // // // // // // // //             {errors.paymentAmountError && <div className={styles.errorMessage}>{errors.paymentAmountError}</div>}
// // // // // // // // // // // // //           </div>
// // // // // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // // // // //             <label htmlFor="balanceAmount">Balance Amount:</label>
// // // // // // // // // // // // //             <input type="text" id="balanceAmount" name="balanceAmount" placeholder="Balance Amount" value={paymentData.balanceAmount} disabled />
// // // // // // // // // // // // //           </div>
// // // // // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // // // // //             <label htmlFor="newBalanceLeft">New Balance Left:</label>
// // // // // // // // // // // // //             <input type="text" id="newBalanceLeft" name="newBalanceLeft" placeholder="New Balance Left" value={paymentData.newBalanceLeft} disabled />
// // // // // // // // // // // // //           </div>
// // // // // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // // // // //             <label htmlFor="paymentMode">Payment Mode:</label>
// // // // // // // // // // // // //             <select id="paymentMode" name="paymentMode" value={paymentData.paymentMode} onChange={handleChange}>
// // // // // // // // // // // // //               <option value="">Select Payment Mode</option>
// // // // // // // // // // // // //               <option value="Cash">Cash</option>
// // // // // // // // // // // // //               <option value="Credit Card">Credit Card</option>
// // // // // // // // // // // // //               <option value="Debit Card">Debit Card</option>
// // // // // // // // // // // // //               <option value="Online Transfer">Online Transfer</option>
// // // // // // // // // // // // //             </select>
// // // // // // // // // // // // //           </div>
// // // // // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // // // // //             <label htmlFor="notes">Notes:</label>
// // // // // // // // // // // // //             <textarea id="notes" name="notes" placeholder="Enter any notes here" value={paymentData.notes} onChange={handleChange}></textarea>
// // // // // // // // // // // // //           </div>
// // // // // // // // // // // // //           <div className={styles.formActions}>
// // // // // // // // // // // // //             <button type="reset">Reset</button>
// // // // // // // // // // // // //             <button type="submit">Submit</button>
// // // // // // // // // // // // //           </div>
// // // // // // // // // // // // //         </form>
// // // // // // // // // // // // //       </div>
// // // // // // // // // // // // //       <div className={styles.receiptContainer}>
// // // // // // // // // // // // //         {receipt && (
// // // // // // // // // // // // //           <div id="receipt">
// // // // // // // // // // // // //             <div className="page-container">Page <span className="page"></span> of <span className="pages"></span></div>
// // // // // // // // // // // // //             <div className="logo-container">
// // // // // // // // // // // // //               <img style={{ height: '18px' }} src="https://app.useanvil.com/img/email-logo-black.png" alt="Logo" />
// // // // // // // // // // // // //             </div>
// // // // // // // // // // // // //             <table className="invoice-info-container">
// // // // // // // // // // // // //               <tr>
// // // // // // // // // // // // //                 <td rowSpan="2" className="client-name">Client Name</td>
// // // // // // // // // // // // //                 <td>{receipt.studentName}</td>
// // // // // // // // // // // // //               </tr>
// // // // // // // // // // // // //               <tr>
// // // // // // // // // // // // //                 <td>123 Main Street</td>
// // // // // // // // // // // // //               </tr>
// // // // // // // // // // // // //               <tr>
// // // // // // // // // // // // //                 <td>Invoice Date: <strong>{receipt.date}</strong></td>
// // // // // // // // // // // // //                 <td>San Francisco CA, 94103</td>
// // // // // // // // // // // // //               </tr>
// // // // // // // // // // // // //               <tr>
// // // // // // // // // // // // //                 <td>Invoice No: <strong>{receipt.enrollmentId}</strong></td>
// // // // // // // // // // // // //                 <td>hello@useanvil.com</td>
// // // // // // // // // // // // //               </tr>
// // // // // // // // // // // // //             </table>
// // // // // // // // // // // // //             <table className="line-items-container">
// // // // // // // // // // // // //               <thead>
// // // // // // // // // // // // //                 <tr>
// // // // // // // // // // // // //                   <th className="heading-quantity">Qty</th>
// // // // // // // // // // // // //                   <th className="heading-description">Description</th>
// // // // // // // // // // // // //                   <th className="heading-price">Price</th>
// // // // // // // // // // // // //                   <th className="heading-subtotal">Subtotal</th>
// // // // // // // // // // // // //                 </tr>
// // // // // // // // // // // // //               </thead>
// // // // // // // // // // // // //               <tbody>
// // // // // // // // // // // // //                 <tr>
// // // // // // // // // // // // //                   <td>1</td>
// // // // // // // // // // // // //                   <td>Payment</td>
// // // // // // // // // // // // //                   <td className="right">{receipt.paymentAmount}</td>
// // // // // // // // // // // // //                   <td className="bold">{receipt.paymentAmount}</td>
// // // // // // // // // // // // //                 </tr>
// // // // // // // // // // // // //               </tbody>
// // // // // // // // // // // // //             </table>
// // // // // // // // // // // // //             <table className="line-items-container has-bottom-border">
// // // // // // // // // // // // //               <thead>
// // // // // // // // // // // // //                 <tr>
// // // // // // // // // // // // //                   <th>Payment Info</th>
// // // // // // // // // // // // //                   <th>Due By</th>
// // // // // // // // // // // // //                   <th>Total Due</th>
// // // // // // // // // // // // //                 </tr>
// // // // // // // // // // // // //               </thead>
// // // // // // // // // // // // //               <tbody>
// // // // // // // // // // // // //                 <tr>
// // // // // // // // // // // // //                   <td className="payment-info">
// // // // // // // // // // // // //                     <div>Account No: <strong>123567744</strong></div>
// // // // // // // // // // // // //                     <div>Routing No: <strong>120000547</strong></div>
// // // // // // // // // // // // //                   </td>
// // // // // // // // // // // // //                   <td className="large">{new Date().toLocaleDateString()}</td>
// // // // // // // // // // // // //                   <td className="large total">{receipt.paymentAmount}</td>
// // // // // // // // // // // // //                 </tr>
// // // // // // // // // // // // //               </tbody>
// // // // // // // // // // // // //             </table>
// // // // // // // // // // // // //             <div className="footer">
// // // // // // // // // // // // //               <div className="footer-info">
// // // // // // // // // // // // //                 <span>hello@useanvil.com</span> | <span>555 444 6666</span> | <span>useanvil.com</span>
// // // // // // // // // // // // //               </div>
// // // // // // // // // // // // //               <div className="footer-thanks">
// // // // // // // // // // // // //                 <img src="https://github.com/anvilco/html-pdf-invoice-template/raw/main/img/heart.png" alt="heart" />
// // // // // // // // // // // // //                 <span>Thank you!</span>
// // // // // // // // // // // // //               </div>
// // // // // // // // // // // // //             </div>
// // // // // // // // // // // // //           </div>
// // // // // // // // // // // // //         )}
// // // // // // // // // // // // //       </div>
// // // // // // // // // // // // //       <div className={styles.receiptActions}>
// // // // // // // // // // // // //         <button onClick={handlePrint}>Print</button>
// // // // // // // // // // // // //         <button onClick={handleDownload}>Download</button>
// // // // // // // // // // // // //       </div>
// // // // // // // // // // // // //       <div className={styles.emailContainer}>
// // // // // // // // // // // // //         <input
// // // // // // // // // // // // //           type="email"
// // // // // // // // // // // // //           placeholder="Enter email to send receipt"
// // // // // // // // // // // // //           value={email}
// // // // // // // // // // // // //           onChange={(e) => setEmail(e.target.value)}
// // // // // // // // // // // // //         />
// // // // // // // // // // // // //         <button onClick={handleEmail}>Send Email</button>
// // // // // // // // // // // // //       </div>
// // // // // // // // // // // // //     </div>
// // // // // // // // // // // // //   );
// // // // // // // // // // // // // }

// // // // // // // // // // // // // export default PaymentForm;
// // // // // // // // // // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // // // // // // // // // import axios from 'axios';
// // // // // // // // // // // // import Swal from 'sweetalert2';
// // // // // // // // // // // // import { debounce } from 'lodash';
// // // // // // // // // // // // import { useLocation } from 'react-router-dom';
// // // // // // // // // // // // import html2canvas from 'html2canvas';
// // // // // // // // // // // // import jsPDF from 'jspdf';
// // // // // // // // // // // // import styles from './PaymentForm.module.css';

// // // // // // // // // // // // function PaymentForm() {
// // // // // // // // // // // //   const location = useLocation();
// // // // // // // // // // // //   const searchParams = new URLSearchParams(location.search);
// // // // // // // // // // // //   const enrollmentIdFromParams = searchParams.get('enrollmentId');

// // // // // // // // // // // //   const [paymentData, setPaymentData] = useState({
// // // // // // // // // // // //     enrollmentId: enrollmentIdFromParams ? enrollmentIdFromParams : '',
// // // // // // // // // // // //     studentName: '',
// // // // // // // // // // // //     paymentAmount: '',
// // // // // // // // // // // //     balanceAmount: '',
// // // // // // // // // // // //     newBalanceLeft: '',
// // // // // // // // // // // //     paymentMode: '',
// // // // // // // // // // // //     notes: '',
// // // // // // // // // // // //   });
// // // // // // // // // // // //   const [errors, setErrors] = useState({});
// // // // // // // // // // // //   const [receipt, setReceipt] = useState(null);
// // // // // // // // // // // //   const [email, setEmail] = useState('');
// // // // // // // // // // // //   const apiUrl = process.env.REACT_APP_API_BASE_URL;

// // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // //     fetchEnrollments().catch(err => {
// // // // // // // // // // // //       Swal.fire('Error', 'Failed to fetch enrollments.', 'error');
// // // // // // // // // // // //     });
// // // // // // // // // // // //   }, []);

// // // // // // // // // // // //   async function fetchEnrollments() {
// // // // // // // // // // // //     const response = await axios.get(`${apiUrl}/enroll`);
// // // // // // // // // // // //     return response.data;
// // // // // // // // // // // //   }

// // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // //     if (enrollmentIdFromParams) {
// // // // // // // // // // // //       fetchEnrollmentById(enrollmentIdFromParams);
// // // // // // // // // // // //     }
// // // // // // // // // // // //   }, [enrollmentIdFromParams]);

// // // // // // // // // // // //   const fetchEnrollmentById = async (id) => {
// // // // // // // // // // // //     if (!id) return;
// // // // // // // // // // // //     try {
// // // // // // // // // // // //       const response = await axios.get(`${apiUrl}/enroll/${id}`);
// // // // // // // // // // // //       const enrollment = response.data;
// // // // // // // // // // // //       updatePaymentDataFromEnrollment(enrollment);
// // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // //       Swal.fire('Error', 'Failed to fetch enrollment by ID.', 'error');
// // // // // // // // // // // //       setPaymentData(prev => ({ ...prev, studentName: '', balanceAmount: '', newBalanceLeft: '' }));
// // // // // // // // // // // //     }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const updatePaymentDataFromEnrollment = (enrollment) => {
// // // // // // // // // // // //     setPaymentData(prev => ({
// // // // // // // // // // // //       ...prev,
// // // // // // // // // // // //       studentName: enrollment?.studentName || '',
// // // // // // // // // // // //       balanceAmount: enrollment?.balanceAmount?.toString() || '',
// // // // // // // // // // // //       newBalanceLeft: enrollment?.balanceAmount?.toString() || '',
// // // // // // // // // // // //     }));
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const debouncedFetchEnrollmentById = useCallback(debounce((id) => {
// // // // // // // // // // // //     fetchEnrollmentById(id);
// // // // // // // // // // // //   }, 1000), []);

// // // // // // // // // // // //   const handleChange = async (e) => {
// // // // // // // // // // // //     const { name, value } = e.target;
// // // // // // // // // // // //     setPaymentData(prev => ({ ...prev, [name]: value }));

// // // // // // // // // // // //     if (name === 'paymentAmount' && value) {
// // // // // // // // // // // //       validatePaymentAmount(value, paymentData.balanceAmount);
// // // // // // // // // // // //     }

// // // // // // // // // // // //     if (name === "enrollmentId") {
// // // // // // // // // // // //       setPaymentData(prev => ({ ...prev, [name]: value }));
// // // // // // // // // // // //       await fetchEnrollmentById(value);
// // // // // // // // // // // //     }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const validatePaymentAmount = (paymentAmount, balanceAmount) => {
// // // // // // // // // // // //     const paymentAmountFloat = parseFloat(paymentAmount);
// // // // // // // // // // // //     const balanceAmountFloat = parseFloat(balanceAmount);
// // // // // // // // // // // //     const newBalanceLeft = balanceAmountFloat - paymentAmountFloat;

// // // // // // // // // // // //     if (newBalanceLeft < 0) {
// // // // // // // // // // // //       setErrors(prev => ({ ...prev, paymentAmountError: 'Payment amount cannot exceed the balance amount.' }));
// // // // // // // // // // // //     } else {
// // // // // // // // // // // //       setErrors(prev => ({ ...prev, paymentAmountError: '' }));
// // // // // // // // // // // //       setPaymentData(prev => ({ ...prev, newBalanceLeft: newBalanceLeft.toFixed(2) }));
// // // // // // // // // // // //     }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const handleSubmit = async (e) => {
// // // // // // // // // // // //     e.preventDefault();
// // // // // // // // // // // //     if (errors.paymentAmountError) {
// // // // // // // // // // // //       Swal.fire('Error', errors.paymentAmountError, 'error');
// // // // // // // // // // // //       return;
// // // // // // // // // // // //     }

// // // // // // // // // // // //     try {
// // // // // // // // // // // //       await axios.post(`${apiUrl}/payments`, {
// // // // // // // // // // // //         enrollmentId: paymentData.enrollmentId,
// // // // // // // // // // // //         amount: parseFloat(paymentData.paymentAmount),
// // // // // // // // // // // //         paymentMethod: paymentData.paymentMode,
// // // // // // // // // // // //         notes: paymentData.notes,
// // // // // // // // // // // //       });

// // // // // // // // // // // //       const receiptData = {
// // // // // // // // // // // //         enrollmentId: paymentData.enrollmentId,
// // // // // // // // // // // //         studentName: paymentData.studentName,
// // // // // // // // // // // //         paymentAmount: paymentData.paymentAmount,
// // // // // // // // // // // //         paymentMode: paymentData.paymentMode,
// // // // // // // // // // // //         notes: paymentData.notes,
// // // // // // // // // // // //         date: new Date().toLocaleString(),
// // // // // // // // // // // //         courses: [
// // // // // // // // // // // //           { name: 'Course 1', totalFees: '$1000', amountPaid: paymentData.paymentAmount, pendingFees: '$1000' },
// // // // // // // // // // // //           // Add more courses as needed
// // // // // // // // // // // //         ]
// // // // // // // // // // // //       };

// // // // // // // // // // // //       setReceipt(receiptData);

// // // // // // // // // // // //       Swal.fire('Success', 'Payment submitted successfully!', 'success');
// // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // //       Swal.fire('Error', 'Failed to submit payment.', 'error');
// // // // // // // // // // // //     }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const handlePrint = async () => {
// // // // // // // // // // // //     const element = document.getElementById('receipt');
// // // // // // // // // // // //     const canvas = await html2canvas(element);
// // // // // // // // // // // //     const imgData = canvas.toDataURL('image/png');
// // // // // // // // // // // //     const pdf = new jsPDF({
// // // // // // // // // // // //       format: 'a4'
// // // // // // // // // // // //     });
// // // // // // // // // // // //     pdf.addImage(imgData, 'PNG', 10, 10);
// // // // // // // // // // // //     const pdfBlob = pdf.output('blob');
// // // // // // // // // // // //     const url = URL.createObjectURL(pdfBlob);
// // // // // // // // // // // //     window.open(url, '_blank');
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const handleDownload = async () => {
// // // // // // // // // // // //     const element = document.getElementById('receipt');
// // // // // // // // // // // //     const canvas = await html2canvas(element);
// // // // // // // // // // // //     const imgData = canvas.toDataURL('image/png');
// // // // // // // // // // // //     const pdf = new jsPDF({
// // // // // // // // // // // //       format: 'a4'
// // // // // // // // // // // //     });
// // // // // // // // // // // //     pdf.addImage(imgData, 'PNG', 10, 10);
// // // // // // // // // // // //     pdf.save('receipt.pdf');
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const handleEmail = async () => {
// // // // // // // // // // // //     const element = document.getElementById('receipt');
// // // // // // // // // // // //     const canvas = await html2canvas(element);
// // // // // // // // // // // //     const imgData = canvas.toDataURL('image/png');
// // // // // // // // // // // //     const pdf = new jsPDF({
// // // // // // // // // // // //       format: 'a4'
// // // // // // // // // // // //     });
// // // // // // // // // // // //     pdf.addImage(imgData, 'PNG', 10, 10);
// // // // // // // // // // // //     const pdfBase64 = pdf.output('datauristring').split(',')[1]; // Get base64 string of PDF

// // // // // // // // // // // //     try {
// // // // // // // // // // // //       const response = await axios.post(`${apiUrl}/send-email`, {
// // // // // // // // // // // //         to: email,
// // // // // // // // // // // //         subject: 'Payment Receipt',
// // // // // // // // // // // //         text: 'Please find attached the payment receipt.',
// // // // // // // // // // // //         pdfBase64: pdfBase64
// // // // // // // // // // // //       });

// // // // // // // // // // // //       console.log('Email sent:', response.data); // Log response for debugging

// // // // // // // // // // // //       Swal.fire('Success', 'Email sent successfully!', 'success');
// // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // //       console.error('Failed to send email:', error); // Log detailed error for debugging
// // // // // // // // // // // //       Swal.fire('Error', 'Failed to send email.', 'error');
// // // // // // // // // // // //     }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   return (
// // // // // // // // // // // //     <div className={styles.container}>
// // // // // // // // // // // //       <div className={styles.formContainer}>
// // // // // // // // // // // //         <h2>Payment Form</h2>
// // // // // // // // // // // //         <form onSubmit={handleSubmit}>
// // // // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // // // //             <label htmlFor="enrollmentId">Enrollment ID:</label>
// // // // // // // // // // // //             <input type="text" id="enrollmentId" name="enrollmentId" placeholder="Enter Enrollment ID" value={paymentData.enrollmentId} onChange={handleChange} />
// // // // // // // // // // // //           </div>
// // // // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // // // //             <label htmlFor="studentName">Student Name:</label>
// // // // // // // // // // // //             <input type="text" id="studentName" name="studentName" placeholder="Enter Student Name" value={paymentData.studentName} readOnly />
// // // // // // // // // // // //           </div>
// // // // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // // // //             <label htmlFor="paymentAmount">Payment Amount:</label>
// // // // // // // // // // // //             <input type="number" id="paymentAmount" name="paymentAmount" placeholder="Enter Payment Amount" value={paymentData.paymentAmount} onChange={handleChange} />
// // // // // // // // // // // //             {errors.paymentAmountError && <div className={styles.errorMessage}>{errors.paymentAmountError}</div>}
// // // // // // // // // // // //           </div>
// // // // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // // // //             <label htmlFor="balanceAmount">Balance Amount:</label>
// // // // // // // // // // // //             <input type="text" id="balanceAmount" name="balanceAmount" placeholder="Balance Amount" value={paymentData.balanceAmount} disabled />
// // // // // // // // // // // //           </div>
// // // // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // // // //             <label htmlFor="newBalanceLeft">New Balance Left:</label>
// // // // // // // // // // // //             <input type="text" id="newBalanceLeft" name="newBalanceLeft" placeholder="New Balance Left" value={paymentData.newBalanceLeft} disabled />
// // // // // // // // // // // //           </div>
// // // // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // // // //             <label htmlFor="paymentMode">Payment Mode:</label>
// // // // // // // // // // // //             <select id="paymentMode" name="paymentMode" value={paymentData.paymentMode} onChange={handleChange}>
// // // // // // // // // // // //               <option value="">Select Payment Mode</option>
// // // // // // // // // // // //               <option value="Cash">Cash</option>
// // // // // // // // // // // //               <option value="Credit Card">Credit Card</option>
// // // // // // // // // // // //               <option value="Debit Card">Debit Card</option>
// // // // // // // // // // // //               <option value="Online Transfer">Online Transfer</option>
// // // // // // // // // // // //             </select>
// // // // // // // // // // // //           </div>
// // // // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // // // //             <label htmlFor="notes">Notes:</label>
// // // // // // // // // // // //             <textarea id="notes" name="notes" placeholder="Enter any notes here" value={paymentData.notes} onChange={handleChange}></textarea>
// // // // // // // // // // // //           </div>
// // // // // // // // // // // //           <div className={styles.formActions}>
// // // // // // // // // // // //             <button type="reset">Reset</button>
// // // // // // // // // // // //             <button type="submit">Submit</button>
// // // // // // // // // // // //           </div>
// // // // // // // // // // // //         </form>
// // // // // // // // // // // //       </div>
// // // // // // // // // // // //       <div className={styles.receiptContainer}>
// // // // // // // // // // // //         {receipt && (
// // // // // // // // // // // //           <div id="receipt" className={styles.receipt}>
// // // // // // // // // // // //             <h3>Payment Receipt</h3>
// // // // // // // // // // // //             <div className={styles.receiptDetails}>
// // // // // // // // // // // //               <div><strong>Enrollment ID:</strong> {receipt.enrollmentId}</div>
// // // // // // // // // // // //               <div><strong>Student Name:</strong> {receipt.studentName}</div>
// // // // // // // // // // // //               <div><strong>Payment Amount:</strong> ${receipt.paymentAmount}</div>
// // // // // // // // // // // //               <div><strong>Payment Mode:</strong> {receipt.paymentMode}</div>
// // // // // // // // // // // //               <div><strong>Notes:</strong> {receipt.notes}</div>
// // // // // // // // // // // //               <div><strong>Date:</strong> {receipt.date}</div>
// // // // // // // // // // // //             </div>
// // // // // // // // // // // //             <div className={styles.courses}>
// // // // // // // // // // // //               <h4>Courses:</h4>
// // // // // // // // // // // //               {receipt.courses.map((course, index) => (
// // // // // // // // // // // //                 <div key={index} className={styles.course}>
// // // // // // // // // // // //                   <div><strong>Course Name:</strong> {course.name}</div>
// // // // // // // // // // // //                   <div><strong>Total Fees:</strong> {course.totalFees}</div>
// // // // // // // // // // // //                   <div><strong>Amount Paid:</strong> ${course.amountPaid}</div>
// // // // // // // // // // // //                   <div><strong>Pending Fees:</strong> {course.pendingFees}</div>
// // // // // // // // // // // //                 </div>
// // // // // // // // // // // //               ))}
// // // // // // // // // // // //             </div>
// // // // // // // // // // // //             <div className={styles.receiptActions}>
// // // // // // // // // // // //               <button onClick={handlePrint}>Print</button>
// // // // // // // // // // // //               <button onClick={handleDownload}>Download</button>
// // // // // // // // // // // //               <div className={styles.emailSection}>
// // // // // // // // // // // //                 <input type="email" placeholder="Enter Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
// // // // // // // // // // // //                 <button onClick={handleEmail}>Email</button>
// // // // // // // // // // // //               </div>
// // // // // // // // // // // //             </div>
// // // // // // // // // // // //           </div>
// // // // // // // // // // // //         )}
// // // // // // // // // // // //       </div>
// // // // // // // // // // // //     </div>
// // // // // // // // // // // //   );
// // // // // // // // // // // // }

// // // // // // // // // // // // export default PaymentForm;
// // // // // // // // // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // // // // // // // // import axios from 'axios';
// // // // // // // // // // // import Swal from 'sweetalert2';
// // // // // // // // // // // import { debounce } from 'lodash';
// // // // // // // // // // // import { useLocation } from 'react-router-dom';
// // // // // // // // // // // import html2canvas from 'html2canvas';
// // // // // // // // // // // import jsPDF from 'jspdf';
// // // // // // // // // // // import styles from './PaymentForm.module.css';
// // // // // // // // // // // import Invoice from './Invoice'; // Adjust the path as per your project structure

// // // // // // // // // // // function PaymentForm() {
// // // // // // // // // // //   const location = useLocation();
// // // // // // // // // // //   const searchParams = new URLSearchParams(location.search);
// // // // // // // // // // //   const enrollmentIdFromParams = searchParams.get('enrollmentId');

// // // // // // // // // // //   const [paymentData, setPaymentData] = useState({
// // // // // // // // // // //     enrollmentId: enrollmentIdFromParams ? enrollmentIdFromParams : '',
// // // // // // // // // // //     studentName: '',
// // // // // // // // // // //     paymentAmount: '',
// // // // // // // // // // //     balanceAmount: '',
// // // // // // // // // // //     newBalanceLeft: '',
// // // // // // // // // // //     paymentMode: '',
// // // // // // // // // // //     notes: '',
// // // // // // // // // // //   });
// // // // // // // // // // //   const [errors, setErrors] = useState({});
// // // // // // // // // // //   const [receipt, setReceipt] = useState(null);
// // // // // // // // // // //   const [email, setEmail] = useState('');
// // // // // // // // // // //   const apiUrl = process.env.REACT_APP_API_BASE_URL;

// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     fetchEnrollments().catch(err => {
// // // // // // // // // // //       Swal.fire('Error', 'Failed to fetch enrollments.', 'error');
// // // // // // // // // // //     });
// // // // // // // // // // //   }, []);

// // // // // // // // // // //   async function fetchEnrollments() {
// // // // // // // // // // //     const response = await axios.get(`${apiUrl}/enroll`);
// // // // // // // // // // //     return response.data;
// // // // // // // // // // //   }

// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     if (enrollmentIdFromParams) {
// // // // // // // // // // //       fetchEnrollmentById(enrollmentIdFromParams);
// // // // // // // // // // //     }
// // // // // // // // // // //   }, [enrollmentIdFromParams]);

// // // // // // // // // // //   const fetchEnrollmentById = async (id) => {
// // // // // // // // // // //     if (!id) return;
// // // // // // // // // // //     try {
// // // // // // // // // // //       const response = await axios.get(`${apiUrl}/enroll/${id}`);
// // // // // // // // // // //       const enrollment = response.data;
// // // // // // // // // // //       updatePaymentDataFromEnrollment(enrollment);
// // // // // // // // // // //     } catch (error) {
// // // // // // // // // // //       Swal.fire('Error', 'Failed to fetch enrollment by ID.', 'error');
// // // // // // // // // // //       setPaymentData(prev => ({ ...prev, studentName: '', balanceAmount: '', newBalanceLeft: '' }));
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   const updatePaymentDataFromEnrollment = (enrollment) => {
// // // // // // // // // // //     setPaymentData(prev => ({
// // // // // // // // // // //       ...prev,
// // // // // // // // // // //       studentName: enrollment?.studentName || '',
// // // // // // // // // // //       balanceAmount: enrollment?.balanceAmount?.toString() || '',
// // // // // // // // // // //       newBalanceLeft: enrollment?.balanceAmount?.toString() || '',
// // // // // // // // // // //     }));
// // // // // // // // // // //   };

// // // // // // // // // // //   const debouncedFetchEnrollmentById = useCallback(debounce((id) => {
// // // // // // // // // // //     fetchEnrollmentById(id);
// // // // // // // // // // //   }, 1000), []);

// // // // // // // // // // //   const handleChange = async (e) => {
// // // // // // // // // // //     const { name, value } = e.target;
// // // // // // // // // // //     setPaymentData(prev => ({ ...prev, [name]: value }));

// // // // // // // // // // //     if (name === 'paymentAmount' && value) {
// // // // // // // // // // //       validatePaymentAmount(value, paymentData.balanceAmount);
// // // // // // // // // // //     }

// // // // // // // // // // //     if (name === "enrollmentId") {
// // // // // // // // // // //       setPaymentData(prev => ({ ...prev, [name]: value }));
// // // // // // // // // // //       await fetchEnrollmentById(value);
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   const validatePaymentAmount = (paymentAmount, balanceAmount) => {
// // // // // // // // // // //     const paymentAmountFloat = parseFloat(paymentAmount);
// // // // // // // // // // //     const balanceAmountFloat = parseFloat(balanceAmount);
// // // // // // // // // // //     const newBalanceLeft = balanceAmountFloat - paymentAmountFloat;

// // // // // // // // // // //     if (newBalanceLeft < 0) {
// // // // // // // // // // //       setErrors(prev => ({ ...prev, paymentAmountError: 'Payment amount cannot exceed the balance amount.' }));
// // // // // // // // // // //     } else {
// // // // // // // // // // //       setErrors(prev => ({ ...prev, paymentAmountError: '' }));
// // // // // // // // // // //       setPaymentData(prev => ({ ...prev, newBalanceLeft: newBalanceLeft.toFixed(2) }));
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   const handleSubmit = async (e) => {
// // // // // // // // // // //     e.preventDefault();
// // // // // // // // // // //     if (errors.paymentAmountError) {
// // // // // // // // // // //       Swal.fire('Error', errors.paymentAmountError, 'error');
// // // // // // // // // // //       return;
// // // // // // // // // // //     }

// // // // // // // // // // //     try {
// // // // // // // // // // //       await axios.post(`${apiUrl}/payments`, {
// // // // // // // // // // //         enrollmentId: paymentData.enrollmentId,
// // // // // // // // // // //         amount: parseFloat(paymentData.paymentAmount),
// // // // // // // // // // //         paymentMethod: paymentData.paymentMode,
// // // // // // // // // // //         notes: paymentData.notes,
// // // // // // // // // // //       });

// // // // // // // // // // //       const receiptData = {
// // // // // // // // // // //         enrollmentId: paymentData.enrollmentId,
// // // // // // // // // // //         studentName: paymentData.studentName,
// // // // // // // // // // //         paymentAmount: paymentData.paymentAmount,
// // // // // // // // // // //         paymentMode: paymentData.paymentMode,
// // // // // // // // // // //         notes: paymentData.notes,
// // // // // // // // // // //         date: new Date().toLocaleString(),
// // // // // // // // // // //         courses: [
// // // // // // // // // // //           { name: 'Course 1', totalFees: '$1000', amountPaid: paymentData.paymentAmount, pendingFees: '$1000' },
// // // // // // // // // // //           // Add more courses as needed
// // // // // // // // // // //         ]
// // // // // // // // // // //       };

// // // // // // // // // // //       setReceipt(receiptData);

// // // // // // // // // // //       Swal.fire('Success', 'Payment submitted successfully!', 'success');
// // // // // // // // // // //     } catch (error) {
// // // // // // // // // // //       Swal.fire('Error', 'Failed to submit payment.', 'error');
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   const handlePrint = async () => {
// // // // // // // // // // //     const element = document.getElementById('receipt');
// // // // // // // // // // //     const canvas = await html2canvas(element);
// // // // // // // // // // //     const imgData = canvas.toDataURL('image/png');
// // // // // // // // // // //     const pdf = new jsPDF({
// // // // // // // // // // //       format: 'a4'
// // // // // // // // // // //     });
// // // // // // // // // // //     pdf.addImage(imgData, 'PNG', 10, 10);
// // // // // // // // // // //     const pdfBlob = pdf.output('blob');
// // // // // // // // // // //     const url = URL.createObjectURL(pdfBlob);
// // // // // // // // // // //     window.open(url, '_blank');
// // // // // // // // // // //   };

// // // // // // // // // // //   const handleDownload = async () => {
// // // // // // // // // // //     const element = document.getElementById('receipt');
// // // // // // // // // // //     const canvas = await html2canvas(element);
// // // // // // // // // // //     const imgData = canvas.toDataURL('image/png');
// // // // // // // // // // //     const pdf = new jsPDF({
// // // // // // // // // // //       format: 'a4'
// // // // // // // // // // //     });
// // // // // // // // // // //     pdf.addImage(imgData, 'PNG', 10, 10);
// // // // // // // // // // //     pdf.save('receipt.pdf');
// // // // // // // // // // //   };

// // // // // // // // // // //   const handleEmail = async () => {
// // // // // // // // // // //     const element = document.getElementById('receipt');
// // // // // // // // // // //     const canvas = await html2canvas(element);
// // // // // // // // // // //     const imgData = canvas.toDataURL('image/png');
// // // // // // // // // // //     const pdf = new jsPDF({
// // // // // // // // // // //       format: 'a4'
// // // // // // // // // // //     });
// // // // // // // // // // //     pdf.addImage(imgData, 'PNG', 10, 10);
// // // // // // // // // // //     const pdfBase64 = pdf.output('datauristring').split(',')[1]; // Get base64 string of PDF

// // // // // // // // // // //     try {
// // // // // // // // // // //       const response = await axios.post(`${apiUrl}/send-email`, {
// // // // // // // // // // //         to: email,
// // // // // // // // // // //         subject: 'Payment Receipt',
// // // // // // // // // // //         text: 'Please find attached the payment receipt.',
// // // // // // // // // // //         pdfBase64: pdfBase64
// // // // // // // // // // //       });

// // // // // // // // // // //       console.log('Email sent:', response.data); // Log response for debugging

// // // // // // // // // // //       Swal.fire('Success', 'Email sent successfully!', 'success');
// // // // // // // // // // //     } catch (error) {
// // // // // // // // // // //       console.error('Failed to send email:', error); // Log detailed error for debugging
// // // // // // // // // // //       Swal.fire('Error', 'Failed to send email.', 'error');
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   return (
// // // // // // // // // // //     <div className={styles.container}>
// // // // // // // // // // //       <div className={styles.formContainer}>
// // // // // // // // // // //         <h2>Payment Form</h2>
// // // // // // // // // // //         <form onSubmit={handleSubmit}>
// // // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // // //             <label htmlFor="enrollmentId">Enrollment ID:</label>
// // // // // // // // // // //             <input type="text" id="enrollmentId" name="enrollmentId" placeholder="Enter Enrollment ID" value={paymentData.enrollmentId} onChange={handleChange} />
// // // // // // // // // // //           </div>
// // // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // // //             <label htmlFor="studentName">Student Name:</label>
// // // // // // // // // // //             <input type="text" id="studentName" name="studentName" placeholder="Enter Student Name" value={paymentData.studentName} readOnly />
// // // // // // // // // // //           </div>
// // // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // // //             <label htmlFor="paymentAmount">Payment Amount:</label>
// // // // // // // // // // //             <input type="number" id="paymentAmount" name="paymentAmount" placeholder="Enter Payment Amount" value={paymentData.paymentAmount} onChange={handleChange} />
// // // // // // // // // // //             {errors.paymentAmountError && <div className={styles.errorMessage}>{errors.paymentAmountError}</div>}
// // // // // // // // // // //           </div>
// // // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // // //             <label htmlFor="balanceAmount">Balance Amount:</label>
// // // // // // // // // // //             <input type="text" id="balanceAmount" name="balanceAmount" placeholder="Balance Amount" value={paymentData.balanceAmount} disabled />
// // // // // // // // // // //           </div>
// // // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // // //             <label htmlFor="newBalanceLeft">New Balance Left:</label>
// // // // // // // // // // //             <input type="text" id="newBalanceLeft" name="newBalanceLeft" placeholder="New Balance Left" value={paymentData.newBalanceLeft} disabled />
// // // // // // // // // // //           </div>
// // // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // // //             <label htmlFor="paymentMode">Payment Mode:</label>
// // // // // // // // // // //             <select id="paymentMode" name="paymentMode" value={paymentData.paymentMode} onChange={handleChange}>
// // // // // // // // // // //               <option value="">Select Payment Mode</option>
// // // // // // // // // // //               <option value="Cash">Cash</option>
// // // // // // // // // // //               <option value="Credit Card">Credit Card</option>
// // // // // // // // // // //               <option value="Debit Card">Debit Card</option>
// // // // // // // // // // //               <option value="Online Transfer">Online Transfer</option>
// // // // // // // // // // //             </select>
// // // // // // // // // // //           </div>
// // // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // // //             <label htmlFor="notes">Notes:</label>
// // // // // // // // // // //             <textarea id="notes" name="notes" placeholder="Enter any notes here" value={paymentData.notes} onChange={handleChange}></textarea>
// // // // // // // // // // //           </div>
// // // // // // // // // // //           <div className={styles.formActions}>
// // // // // // // // // // //             <button type="reset">Reset</button>
// // // // // // // // // // //             <button type="submit">Submit</button>
// // // // // // // // // // //           </div>
// // // // // // // // // // //         </form>
// // // // // // // // // // //       </div>

// // // // // // // // // // //       <div className={styles.receiptContainer}>
// // // // // // // // // // //         {receipt && (
// // // // // // // // // // //           <Invoice
// // // // // // // // // // //             enrollmentId={receipt.enrollmentId}
// // // // // // // // // // //             studentName={receipt.studentName}
// // // // // // // // // // //             paymentAmount={receipt.paymentAmount}
// // // // // // // // // // //             paymentMode={receipt.paymentMode}
// // // // // // // // // // //             notes={receipt.notes}
// // // // // // // // // // //             date={receipt.date}
// // // // // // // // // // //             courses={receipt.courses}
// // // // // // // // // // //             onPrint={handlePrint}
// // // // // // // // // // //             onDownload={handleDownload}
// // // // // // // // // // //             onEmail={handleEmail}
// // // // // // // // // // //             email={email}
// // // // // // // // // // //             setEmail={setEmail}
// // // // // // // // // // //           />
// // // // // // // // // // //         )}
// // // // // // // // // // //       </div>
// // // // // // // // // // //     </div>
// // // // // // // // // // //   );
// // // // // // // // // // // }

// // // // // // // // // // // export default PaymentForm;

// // // // // // // // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // // // // // // // import axios from 'axios';
// // // // // // // // // // import Swal from 'sweetalert2';
// // // // // // // // // // import { debounce } from 'lodash';
// // // // // // // // // // import { useLocation } from 'react-router-dom';
// // // // // // // // // // import html2canvas from 'html2canvas';
// // // // // // // // // // import jsPDF from 'jspdf';
// // // // // // // // // // import styles from './PaymentForm.module.css';
// // // // // // // // // // import Invoice from './Invoice'; // Adjust the path as per your project structure

// // // // // // // // // // function PaymentForm() {
// // // // // // // // // //   const location = useLocation();
// // // // // // // // // //   const searchParams = new URLSearchParams(location.search);
// // // // // // // // // //   const enrollmentIdFromParams = searchParams.get('enrollmentId');

// // // // // // // // // //   const [studentNames, setStudentNames] = useState([]);
// // // // // // // // // //   const [paymentData, setPaymentData] = useState({
// // // // // // // // // //     enrollmentId: enrollmentIdFromParams ? enrollmentIdFromParams : '',
// // // // // // // // // //     studentName: '',
// // // // // // // // // //     paymentAmount: '',
// // // // // // // // // //     balanceAmount: '',
// // // // // // // // // //     newBalanceLeft: '',
// // // // // // // // // //     paymentMode: '',
// // // // // // // // // //     notes: '',
// // // // // // // // // //   });
// // // // // // // // // //   const [errors, setErrors] = useState({});
// // // // // // // // // //   const [receipt, setReceipt] = useState(null);
// // // // // // // // // //   const [email, setEmail] = useState('');
// // // // // // // // // //   const apiUrl = process.env.REACT_APP_API_BASE_URL;

// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     fetchStudentNames().catch(err => {
// // // // // // // // // //       Swal.fire('Error', 'Failed to fetch student names.', 'error');
// // // // // // // // // //     });

// // // // // // // // // //     fetchEnrollments().catch(err => {
// // // // // // // // // //       Swal.fire('Error', 'Failed to fetch enrollments.', 'error');
// // // // // // // // // //     });
// // // // // // // // // //   }, []);

// // // // // // // // // //   async function fetchStudentNames() {
// // // // // // // // // //     const response = await axios.get(`${apiUrl}/enroll`);
// // // // // // // // // //     const students = response.data.map(student => ({
// // // // // // // // // //       id: student.studentId,
// // // // // // // // // //       name: student.student.fullName
// // // // // // // // // //     }));
// // // // // // // // // //     setStudentNames(students);
// // // // // // // // // //     return students;
// // // // // // // // // //   }

// // // // // // // // // //   async function fetchEnrollments() {
// // // // // // // // // //     const response = await axios.get(`${apiUrl}/enroll`);
// // // // // // // // // //     return response.data;
// // // // // // // // // //   }

// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     if (enrollmentIdFromParams) {
// // // // // // // // // //       fetchEnrollmentById(enrollmentIdFromParams);
// // // // // // // // // //     }
// // // // // // // // // //   }, [enrollmentIdFromParams]);

// // // // // // // // // //   const fetchEnrollmentById = async (id) => {
// // // // // // // // // //     if (!id) return;
// // // // // // // // // //     try {
// // // // // // // // // //       const response = await axios.get(`${apiUrl}/enroll/${id}`);
// // // // // // // // // //       const enrollment = response.data;
// // // // // // // // // //       updatePaymentDataFromEnrollment(enrollment);
// // // // // // // // // //     } catch (error) {
// // // // // // // // // //       Swal.fire('Error', 'Failed to fetch enrollment by ID.', 'error');
// // // // // // // // // //       setPaymentData(prev => ({ ...prev, studentName: '', balanceAmount: '', newBalanceLeft: '' }));
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const updatePaymentDataFromEnrollment = (enrollment) => {
// // // // // // // // // //     setPaymentData(prev => ({
// // // // // // // // // //       ...prev,
// // // // // // // // // //       studentName: enrollment?.student.fullName || '',
// // // // // // // // // //       balanceAmount: enrollment?.balanceAmount?.toString() || '',
// // // // // // // // // //       newBalanceLeft: enrollment?.balanceAmount?.toString() || '',
// // // // // // // // // //     }));
// // // // // // // // // //   };

// // // // // // // // // //   const debouncedFetchEnrollmentById = useCallback(debounce((id) => {
// // // // // // // // // //     fetchEnrollmentById(id);
// // // // // // // // // //   }, 1000), []);

// // // // // // // // // //   const handleChange = async (e) => {
// // // // // // // // // //     const { name, value } = e.target;
// // // // // // // // // //     setPaymentData(prev => ({ ...prev, [name]: value }));

// // // // // // // // // //     if (name === 'paymentAmount' && value) {
// // // // // // // // // //       validatePaymentAmount(value, paymentData.balanceAmount);
// // // // // // // // // //     }

// // // // // // // // // //     if (name === "studentName") {
// // // // // // // // // //       const selectedStudent = studentNames.find(student => student.name === value);
// // // // // // // // // //       if (selectedStudent) {
// // // // // // // // // //         setPaymentData(prev => ({
// // // // // // // // // //           ...prev,
// // // // // // // // // //           enrollmentId: selectedStudent.id,
// // // // // // // // // //           studentName: selectedStudent.name
// // // // // // // // // //         }));
// // // // // // // // // //         await fetchEnrollmentById(selectedStudent.id);
// // // // // // // // // //       }
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const validatePaymentAmount = (paymentAmount, balanceAmount) => {
// // // // // // // // // //     const paymentAmountFloat = parseFloat(paymentAmount);
// // // // // // // // // //     const balanceAmountFloat = parseFloat(balanceAmount);
// // // // // // // // // //     const newBalanceLeft = balanceAmountFloat - paymentAmountFloat;

// // // // // // // // // //     if (newBalanceLeft < 0) {
// // // // // // // // // //       setErrors(prev => ({ ...prev, paymentAmountError: 'Payment amount cannot exceed the balance amount.' }));
// // // // // // // // // //     } else {
// // // // // // // // // //       setErrors(prev => ({ ...prev, paymentAmountError: '' }));
// // // // // // // // // //       setPaymentData(prev => ({ ...prev, newBalanceLeft: newBalanceLeft.toFixed(2) }));
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const handleSubmit = async (e) => {
// // // // // // // // // //     e.preventDefault();
// // // // // // // // // //     if (errors.paymentAmountError) {
// // // // // // // // // //       Swal.fire('Error', errors.paymentAmountError, 'error');
// // // // // // // // // //       return;
// // // // // // // // // //     }

// // // // // // // // // //     try {
// // // // // // // // // //       await axios.post(`${apiUrl}/payments`, {
// // // // // // // // // //         enrollmentId: paymentData.enrollmentId,
// // // // // // // // // //         amount: parseFloat(paymentData.paymentAmount),
// // // // // // // // // //         paymentMethod: paymentData.paymentMode,
// // // // // // // // // //         notes: paymentData.notes,
// // // // // // // // // //       });

// // // // // // // // // //       const receiptData = {
// // // // // // // // // //         enrollmentId: paymentData.enrollmentId,
// // // // // // // // // //         studentName: paymentData.studentName,
// // // // // // // // // //         paymentAmount: paymentData.paymentAmount,
// // // // // // // // // //         paymentMode: paymentData.paymentMode,
// // // // // // // // // //         notes: paymentData.notes,
// // // // // // // // // //         date: new Date().toLocaleString(),
// // // // // // // // // //         courses: [
// // // // // // // // // //           { name: 'Course 1', totalFees: '$1000', amountPaid: paymentData.paymentAmount, pendingFees: '$1000' },
// // // // // // // // // //           // Add more courses as needed
// // // // // // // // // //         ]
// // // // // // // // // //       };

// // // // // // // // // //       setReceipt(receiptData);

// // // // // // // // // //       Swal.fire('Success', 'Payment submitted successfully!', 'success');
// // // // // // // // // //     } catch (error) {
// // // // // // // // // //       Swal.fire('Error', 'Failed to submit payment.', 'error');
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const handlePrint = async () => {
// // // // // // // // // //     const element = document.getElementById('receipt');
// // // // // // // // // //     const canvas = await html2canvas(element);
// // // // // // // // // //     const imgData = canvas.toDataURL('image/png');
// // // // // // // // // //     const pdf = new jsPDF({
// // // // // // // // // //       format: 'a4'
// // // // // // // // // //     });
// // // // // // // // // //     pdf.addImage(imgData, 'PNG', 10, 10);
// // // // // // // // // //     const pdfBlob = pdf.output('blob');
// // // // // // // // // //     const url = URL.createObjectURL(pdfBlob);
// // // // // // // // // //     window.open(url, '_blank');
// // // // // // // // // //   };

// // // // // // // // // //   const handleDownload = async () => {
// // // // // // // // // //     const element = document.getElementById('receipt');
// // // // // // // // // //     const canvas = await html2canvas(element);
// // // // // // // // // //     const imgData = canvas.toDataURL('image/png');
// // // // // // // // // //     const pdf = new jsPDF({
// // // // // // // // // //       format: 'a4'
// // // // // // // // // //     });
// // // // // // // // // //     pdf.addImage(imgData, 'PNG', 10, 10);
// // // // // // // // // //     pdf.save('receipt.pdf');
// // // // // // // // // //   };

// // // // // // // // // //   const handleEmail = async () => {
// // // // // // // // // //     const element = document.getElementById('receipt');
// // // // // // // // // //     const canvas = await html2canvas(element);
// // // // // // // // // //     const imgData = canvas.toDataURL('image/png');
// // // // // // // // // //     const pdf = new jsPDF({
// // // // // // // // // //       format: 'a4'
// // // // // // // // // //     });
// // // // // // // // // //     pdf.addImage(imgData, 'PNG', 10, 10);
// // // // // // // // // //     const pdfBase64 = pdf.output('datauristring').split(',')[1]; // Get base64 string of PDF

// // // // // // // // // //     try {
// // // // // // // // // //       const response = await axios.post(`${apiUrl}/send-email`, {
// // // // // // // // // //         to: email,
// // // // // // // // // //         subject: 'Payment Receipt',
// // // // // // // // // //         text: 'Please find attached the payment receipt.',
// // // // // // // // // //         pdfBase64: pdfBase64
// // // // // // // // // //       });

// // // // // // // // // //       console.log('Email sent:', response.data); // Log response for debugging

// // // // // // // // // //       Swal.fire('Success', 'Email sent successfully!', 'success');
// // // // // // // // // //     } catch (error) {
// // // // // // // // // //       console.error('Failed to send email:', error); // Log detailed error for debugging
// // // // // // // // // //       Swal.fire('Error', 'Failed to send email.', 'error');
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   return (
// // // // // // // // // //     <div className={styles.container}>
// // // // // // // // // //       <div className={styles.formContainer}>
// // // // // // // // // //         <h2>Payment Form</h2>
// // // // // // // // // //         <form onSubmit={handleSubmit}>
// // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // //             <label htmlFor="studentName">Student Name:</label>
// // // // // // // // // //             <select id="studentName" name="studentName" value={paymentData.studentName} onChange={handleChange}>
// // // // // // // // // //               <option value="">Select Student Name</option>
// // // // // // // // // //               {studentNames.map(student => (
// // // // // // // // // //                 <option key={student.id} value={student.name}>{student.name}</option>
// // // // // // // // // //               ))}
// // // // // // // // // //             </select>
// // // // // // // // // //           </div>
// // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // //             <label htmlFor="paymentAmount">Payment Amount:</label>
// // // // // // // // // //             <input type="number" id="paymentAmount" name="paymentAmount" placeholder="Enter Payment Amount" value={paymentData.paymentAmount} onChange={handleChange} />
// // // // // // // // // //             {errors.paymentAmountError && <div className={styles.errorMessage}>{errors.paymentAmountError}</div>}
// // // // // // // // // //           </div>
// // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // //             <label htmlFor="balanceAmount">Balance Amount:</label>
// // // // // // // // // //             <input type="text" id="balanceAmount" name="balanceAmount" placeholder="Balance Amount" value={paymentData.balanceAmount} disabled />
// // // // // // // // // //           </div>
// // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // //             <label htmlFor="newBalanceLeft">New Balance Left:</label>
// // // // // // // // // //             <input type="text" id="newBalanceLeft" name="newBalanceLeft" placeholder="New Balance Left" value={paymentData.newBalanceLeft} disabled />
// // // // // // // // // //           </div>
// // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // //             <label htmlFor="paymentMode">Payment Mode:</label>
// // // // // // // // // //             <select id="paymentMode" name="paymentMode" value={paymentData.paymentMode} onChange={handleChange}>
// // // // // // // // // //               <option value="">Select Payment Mode</option>
// // // // // // // // // //               <option value="Cash">Cash</option>
// // // // // // // // // //               <option value="Credit Card">Credit Card</option>
// // // // // // // // // //               <option value="Debit Card">Debit Card</option>
// // // // // // // // // //               <option value="Online Transfer">Online Transfer</option>
// // // // // // // // // //             </select>
// // // // // // // // // //           </div>
// // // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // // //             <label htmlFor="notes">Notes:</label>
// // // // // // // // // //             <textarea id="notes" name="notes" placeholder="Enter any notes here" value={paymentData.notes} onChange={handleChange}></textarea>
// // // // // // // // // //           </div>
// // // // // // // // // //           <div className={styles.formActions}>
// // // // // // // // // //             <button type="reset">Reset</button>
// // // // // // // // // //             <button type="submit">Submit</button>
// // // // // // // // // //           </div>
// // // // // // // // // //         </form>
// // // // // // // // // //       </div>

// // // // // // // // // //       <div className={styles.receiptContainer}>
// // // // // // // // // //         {receipt && (
// // // // // // // // // //           <Invoice
// // // // // // // // // //             enrollmentId={receipt.enrollmentId}
// // // // // // // // // //             studentName={receipt.studentName}
// // // // // // // // // //             paymentAmount={receipt.paymentAmount}
// // // // // // // // // //             paymentMode={receipt.paymentMode}
// // // // // // // // // //             notes={receipt.notes}
// // // // // // // // // //             date={receipt.date}
// // // // // // // // // //             courses={receipt.courses}
// // // // // // // // // //             onPrint={handlePrint}
// // // // // // // // // //             onDownload={handleDownload}
// // // // // // // // // //             onEmail={handleEmail}
// // // // // // // // // //             email={email}
// // // // // // // // // //             setEmail={setEmail}
// // // // // // // // // //           />
// // // // // // // // // //         )}
// // // // // // // // // //       </div>
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // }

// // // // // // // // // // export default PaymentForm;
// // // // // // // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // // // // // // import axios from 'axios';
// // // // // // // // // import Swal from 'sweetalert2';
// // // // // // // // // import { debounce } from 'lodash';
// // // // // // // // // import { useLocation } from 'react-router-dom';
// // // // // // // // // import html2canvas from 'html2canvas';
// // // // // // // // // import jsPDF from 'jspdf';
// // // // // // // // // import styles from './PaymentForm.module.css';
// // // // // // // // // import Invoice from './Invoice'; // Adjust the path as per your project structure

// // // // // // // // // function PaymentForm() {
// // // // // // // // //   const location = useLocation();
// // // // // // // // //   const searchParams = new URLSearchParams(location.search);
// // // // // // // // //   const enrollmentIdFromParams = searchParams.get('enrollmentId');

// // // // // // // // //   const [paymentData, setPaymentData] = useState({
// // // // // // // // //     enrollmentId: enrollmentIdFromParams ? enrollmentIdFromParams : '',
// // // // // // // // //     studentName: '',
// // // // // // // // //     paymentAmount: '',
// // // // // // // // //     balanceAmount: '',
// // // // // // // // //     newBalanceLeft: '',
// // // // // // // // //     paymentMode: '',
// // // // // // // // //     notes: '',
// // // // // // // // //   });
// // // // // // // // //   const [errors, setErrors] = useState({});
// // // // // // // // //   const [receipt, setReceipt] = useState(null);
// // // // // // // // //   const [email, setEmail] = useState('');
// // // // // // // // //   const [enrollments, setEnrollments] = useState([]);
// // // // // // // // //   const apiUrl = process.env.REACT_APP_API_BASE_URL;

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     fetchEnrollments().catch(err => {
// // // // // // // // //       console.error('Failed to fetch enrollments:', err);
// // // // // // // // //       Swal.fire('Error', 'Failed to fetch enrollments.', 'error');
// // // // // // // // //     });
// // // // // // // // //   }, []);

// // // // // // // // //   async function fetchEnrollments() {
// // // // // // // // //     try {
// // // // // // // // //       const response = await axios.get(`${apiUrl}/enroll`);
// // // // // // // // //       setEnrollments(response.data); // Assuming response.data is an array of enrollments with studentName and courseName
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error('Error fetching enrollments:', error);
// // // // // // // // //       Swal.fire('Error', 'Failed to fetch enrollments.', 'error');
// // // // // // // // //     }
// // // // // // // // //   }

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     if (enrollmentIdFromParams) {
// // // // // // // // //       fetchEnrollmentById(enrollmentIdFromParams);
// // // // // // // // //     }
// // // // // // // // //   }, [enrollmentIdFromParams]);

// // // // // // // // //   const fetchEnrollmentById = async (id) => {
// // // // // // // // //     if (!id) return;
// // // // // // // // //     try {
// // // // // // // // //       const response = await axios.get(`${apiUrl}/enroll/${id}`);
// // // // // // // // //       const enrollment = response.data;
// // // // // // // // //       updatePaymentDataFromEnrollment(enrollment);
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error('Error fetching enrollment by ID:', error);
// // // // // // // // //       Swal.fire('Error', 'Failed to fetch enrollment by ID.', 'error');
// // // // // // // // //       setPaymentData(prev => ({ ...prev, studentName: '', balanceAmount: '', newBalanceLeft: '' }));
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const updatePaymentDataFromEnrollment = (enrollment) => {
// // // // // // // // //     setPaymentData(prev => ({
// // // // // // // // //       ...prev,
// // // // // // // // //       studentName: enrollment?.studentName || '',
// // // // // // // // //       balanceAmount: enrollment?.balanceAmount?.toString() || '',
// // // // // // // // //       newBalanceLeft: enrollment?.balanceAmount?.toString() || '',
// // // // // // // // //     }));
// // // // // // // // //   };

// // // // // // // // //   const debouncedFetchEnrollmentById = useCallback(debounce((id) => {
// // // // // // // // //     fetchEnrollmentById(id);
// // // // // // // // //   }, 1000), []);

// // // // // // // // //   const handleChange = async (e) => {
// // // // // // // // //     const { name, value } = e.target;
// // // // // // // // //     setPaymentData(prev => ({ ...prev, [name]: value }));

// // // // // // // // //     if (name === 'paymentAmount' && value) {
// // // // // // // // //       validatePaymentAmount(value, paymentData.balanceAmount);
// // // // // // // // //     }

// // // // // // // // //     if (name === 'studentName' || name === 'courseName') {
// // // // // // // // //       const selectedEnrollment = enrollments.find(enrollment => enrollment.studentName === paymentData.studentName && enrollment.courseName === paymentData.courseName);
// // // // // // // // //       if (selectedEnrollment) {
// // // // // // // // //         setPaymentData(prev => ({
// // // // // // // // //           ...prev,
// // // // // // // // //           enrollmentId: selectedEnrollment.enrollmentId,
// // // // // // // // //           studentName: selectedEnrollment.studentName,
// // // // // // // // //           balanceAmount: selectedEnrollment.balanceAmount.toString(),
// // // // // // // // //           newBalanceLeft: selectedEnrollment.balanceAmount.toString(),
// // // // // // // // //         }));
// // // // // // // // //       } else {
// // // // // // // // //         console.error('Selected enrollment not found.');
// // // // // // // // //         Swal.fire('Error', 'Failed to find enrollment details.', 'error');
// // // // // // // // //         setPaymentData(prev => ({ ...prev, enrollmentId: '', balanceAmount: '', newBalanceLeft: '' }));
// // // // // // // // //       }
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const validatePaymentAmount = (paymentAmount, balanceAmount) => {
// // // // // // // // //     const paymentAmountFloat = parseFloat(paymentAmount);
// // // // // // // // //     const balanceAmountFloat = parseFloat(balanceAmount);
// // // // // // // // //     const newBalanceLeft = balanceAmountFloat - paymentAmountFloat;

// // // // // // // // //     if (newBalanceLeft < 0) {
// // // // // // // // //       setErrors(prev => ({ ...prev, paymentAmountError: 'Payment amount cannot exceed the balance amount.' }));
// // // // // // // // //     } else {
// // // // // // // // //       setErrors(prev => ({ ...prev, paymentAmountError: '' }));
// // // // // // // // //       setPaymentData(prev => ({ ...prev, newBalanceLeft: newBalanceLeft.toFixed(2) }));
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const handleSubmit = async (e) => {
// // // // // // // // //     e.preventDefault();
// // // // // // // // //     if (errors.paymentAmountError) {
// // // // // // // // //       Swal.fire('Error', errors.paymentAmountError, 'error');
// // // // // // // // //       return;
// // // // // // // // //     }

// // // // // // // // //     try {
// // // // // // // // //       await axios.post(`${apiUrl}/payments`, {
// // // // // // // // //         enrollmentId: paymentData.enrollmentId,
// // // // // // // // //         amount: parseFloat(paymentData.paymentAmount),
// // // // // // // // //         paymentMethod: paymentData.paymentMode,
// // // // // // // // //         notes: paymentData.notes,
// // // // // // // // //       });

// // // // // // // // //       const receiptData = {
// // // // // // // // //         enrollmentId: paymentData.enrollmentId,
// // // // // // // // //         studentName: paymentData.studentName,
// // // // // // // // //         paymentAmount: paymentData.paymentAmount,
// // // // // // // // //         paymentMode: paymentData.paymentMode,
// // // // // // // // //         notes: paymentData.notes,
// // // // // // // // //         date: new Date().toLocaleString(),
// // // // // // // // //         courses: [
// // // // // // // // //           { name: 'Course 1', totalFees: '$1000', amountPaid: paymentData.paymentAmount, pendingFees: '$1000' },
// // // // // // // // //           // Add more courses as needed
// // // // // // // // //         ]
// // // // // // // // //       };

// // // // // // // // //       setReceipt(receiptData);

// // // // // // // // //       Swal.fire('Success', 'Payment submitted successfully!', 'success');
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error('Error submitting payment:', error);
// // // // // // // // //       Swal.fire('Error', 'Failed to submit payment.', 'error');
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const handlePrint = async () => {
// // // // // // // // //     const element = document.getElementById('receipt');
// // // // // // // // //     const canvas = await html2canvas(element);
// // // // // // // // //     const imgData = canvas.toDataURL('image/png');
// // // // // // // // //     const pdf = new jsPDF({
// // // // // // // // //       format: 'a4'
// // // // // // // // //     });
// // // // // // // // //     pdf.addImage(imgData, 'PNG', 10, 10);
// // // // // // // // //     const pdfBlob = pdf.output('blob');
// // // // // // // // //     const url = URL.createObjectURL(pdfBlob);
// // // // // // // // //     window.open(url, '_blank');
// // // // // // // // //   };

// // // // // // // // //   const handleDownload = async () => {
// // // // // // // // //     const element = document.getElementById('receipt');
// // // // // // // // //     const canvas = await html2canvas(element);
// // // // // // // // //     const imgData = canvas.toDataURL('image/png');
// // // // // // // // //     const pdf = new jsPDF({
// // // // // // // // //       format: 'a4'
// // // // // // // // //     });
// // // // // // // // //     pdf.addImage(imgData, 'PNG', 10, 10);
// // // // // // // // //     pdf.save('receipt.pdf');
// // // // // // // // //   };

// // // // // // // // //   const handleEmail = async () => {
// // // // // // // // //     const element = document.getElementById('receipt');
// // // // // // // // //     const canvas = await html2canvas(element);
// // // // // // // // //     const imgData = canvas.toDataURL('image/png');
// // // // // // // // //     const pdf = new jsPDF({
// // // // // // // // //       format: 'a4'
// // // // // // // // //     });
// // // // // // // // //     pdf.addImage(imgData, 'PNG', 10, 10);
// // // // // // // // //     const pdfBase64 = pdf.output('datauristring').split(',')[1]; // Get base64 string of PDF

// // // // // // // // //     try {
// // // // // // // // //       const response = await axios.post(`${apiUrl}/send-email`, {
// // // // // // // // //         to: email,
// // // // // // // // //         subject: 'Payment Receipt',
// // // // // // // // //         text: 'Please find attached the payment receipt.',
// // // // // // // // //         pdfBase64: pdfBase64
// // // // // // // // //       });

// // // // // // // // //       console.log('Email sent:', response.data); // Log response for debugging

// // // // // // // // //       Swal.fire('Success', 'Email sent successfully!', 'success');
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error('Failed to send email:', error); // Log detailed error for debugging
// // // // // // // // //       Swal.fire('Error', 'Failed to send email.', 'error');
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   console.log('Enrollments:', enrollments); // Log enrollments for debugging

// // // // // // // // //   return (
// // // // // // // // //     <div className={styles.container}>
// // // // // // // // //       <div className={styles.formContainer}>
// // // // // // // // //         <h2>Payment Form</h2>
// // // // // // // // //         <form onSubmit={handleSubmit}>
// // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // //             <label htmlFor="studentName">Student Name:</label>
// // // // // // // // //             <select id="studentName" name="studentName" value={paymentData.studentName} onChange={handleChange}>
// // // // // // // // //               <option value="">Select Student Name</option>
// // // // // // // // //               {enrollments.map(enrollment => (
// // // // // // // // //                 <option key={enrollment.enrollmentId} value={enrollment.studentName}>{enrollment.studentName}</option>
// // // // // // // // //               ))}
// // // // // // // // //             </select>
// // // // // // // // //           </div>
// // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // //             <label htmlFor="courseName">Course Name:</label>
// // // // // // // // //             <select id="courseName" name="courseName" value={paymentData.courseName} onChange={handleChange}>
// // // // // // // // //               <option value="">Select Course Name</option>
// // // // // // // // //               {enrollments.map(enrollment => (
// // // // // // // // //                 <option key={enrollment.enrollmentId} value={enrollment.courseName}>{enrollment.courseName}</option>
// // // // // // // // //               ))}
// // // // // // // // //             </select>
// // // // // // // // //           </div>
// // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // //             <label htmlFor="paymentAmount">Payment Amount:</label>
// // // // // // // // //             <input type="number" id="paymentAmount" name="paymentAmount" placeholder="Enter Payment Amount" value={paymentData.paymentAmount} onChange={handleChange} />
// // // // // // // // //             {errors.paymentAmountError && <div className={styles.errorMessage}>{errors.paymentAmountError}</div>}
// // // // // // // // //           </div>
// // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // //             <label htmlFor="balanceAmount">Balance Amount:</label>
// // // // // // // // //             <input type="text" id="balanceAmount" name="balanceAmount" placeholder="Balance Amount" value={paymentData.balanceAmount} disabled />
// // // // // // // // //           </div>
// // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // //             <label htmlFor="newBalanceLeft">New Balance Left:</label>
// // // // // // // // //             <input type="text" id="newBalanceLeft" name="newBalanceLeft" placeholder="New Balance Left" value={paymentData.newBalanceLeft} disabled />
// // // // // // // // //           </div>
// // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // //             <label htmlFor="paymentMode">Payment Mode:</label>
// // // // // // // // //             <select id="paymentMode" name="paymentMode" value={paymentData.paymentMode} onChange={handleChange}>
// // // // // // // // //               <option value="">Select Payment Mode</option>
// // // // // // // // //               <option value="Cash">Cash</option>
// // // // // // // // //               <option value="Credit Card">Credit Card</option>
// // // // // // // // //               <option value="Debit Card">Debit Card</option>
// // // // // // // // //               <option value="Online Transfer">Online Transfer</option>
// // // // // // // // //             </select>
// // // // // // // // //           </div>
// // // // // // // // //           <div className={styles.formGroup}>
// // // // // // // // //             <label htmlFor="notes">Notes:</label>
// // // // // // // // //             <textarea id="notes" name="notes" placeholder="Enter any notes here" value={paymentData.notes} onChange={handleChange}></textarea>
// // // // // // // // //           </div>
// // // // // // // // //           <div className={styles.formActions}>
// // // // // // // // //             <button type="reset">Reset</button>
// // // // // // // // //             <button type="submit">Submit</button>
// // // // // // // // //           </div>
// // // // // // // // //         </form>
// // // // // // // // //       </div>

// // // // // // // // //       <div className={styles.receiptContainer}>
// // // // // // // // //         {receipt && (
// // // // // // // // //           <Invoice
// // // // // // // // //             enrollmentId={receipt.enrollmentId}
// // // // // // // // //             studentName={receipt.studentName}
// // // // // // // // //             paymentAmount={receipt.paymentAmount}
// // // // // // // // //             paymentMode={receipt.paymentMode}
// // // // // // // // //             notes={receipt.notes}
// // // // // // // // //             date={receipt.date}
// // // // // // // // //             courses={receipt.courses}
// // // // // // // // //             onPrint={handlePrint}
// // // // // // // // //             onDownload={handleDownload}
// // // // // // // // //             onEmail={handleEmail}
// // // // // // // // //             email={email}
// // // // // // // // //             setEmail={setEmail}
// // // // // // // // //           />
// // // // // // // // //         )}
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }

// // // // // // // // // export default PaymentForm;
// // // // // // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // // // // // import axios from 'axios';
// // // // // // // // import Swal from 'sweetalert2';
// // // // // // // // import { debounce } from 'lodash';
// // // // // // // // import { useLocation } from 'react-router-dom';
// // // // // // // // import html2canvas from 'html2canvas';
// // // // // // // // import jsPDF from 'jspdf';
// // // // // // // // import styles from './PaymentForm.module.css';
// // // // // // // // import Invoice from './Invoice'; // Adjust the path as per your project structure

// // // // // // // // function PaymentForm() {
// // // // // // // //   const location = useLocation();
// // // // // // // //   const searchParams = new URLSearchParams(location.search);
// // // // // // // //   const enrollmentIdFromParams = searchParams.get('enrollmentId');

// // // // // // // //   const [paymentData, setPaymentData] = useState({
// // // // // // // //     enrollmentId: enrollmentIdFromParams ? enrollmentIdFromParams : '',
// // // // // // // //     studentId: '',
// // // // // // // //     studentName: '',
// // // // // // // //     courseId: '',
// // // // // // // //     courseName: '',
// // // // // // // //     paymentAmount: '',
// // // // // // // //     balanceAmount: '',
// // // // // // // //     newBalanceLeft: '',
// // // // // // // //     paymentMode: '',
// // // // // // // //     notes: '',
// // // // // // // //   });
// // // // // // // //   const [errors, setErrors] = useState({});
// // // // // // // //   const [receipt, setReceipt] = useState(null);
// // // // // // // //   const [email, setEmail] = useState('');
// // // // // // // //   const [enrollments, setEnrollments] = useState([]);
// // // // // // // //   const apiUrl = process.env.REACT_APP_API_BASE_URL;

// // // // // // // //   useEffect(() => {
// // // // // // // //     fetchEnrollments().catch(err => {
// // // // // // // //       Swal.fire('Error', 'Failed to fetch enrollments.', 'error');
// // // // // // // //     });
// // // // // // // //   }, []);

// // // // // // // //   async function fetchEnrollments() {
// // // // // // // //     const response = await axios.get(`${apiUrl}/enroll`);
// // // // // // // //     setEnrollments(response.data);
// // // // // // // //     console.log('Fetched enrollments:', response.data); // Debugging log
// // // // // // // //   }

// // // // // // // //   useEffect(() => {
// // // // // // // //     if (enrollmentIdFromParams) {
// // // // // // // //       fetchEnrollmentById(enrollmentIdFromParams);
// // // // // // // //     }
// // // // // // // //   }, [enrollmentIdFromParams]);

// // // // // // // //   const fetchEnrollmentById = async (id) => {
// // // // // // // //     if (!id) return;
// // // // // // // //     try {
// // // // // // // //       const response = await axios.get(`${apiUrl}/enroll/${id}`);
// // // // // // // //       const enrollment = response.data;
// // // // // // // //       updatePaymentDataFromEnrollment(enrollment);
// // // // // // // //     } catch (error) {
// // // // // // // //       Swal.fire('Error', 'Failed to fetch enrollment by ID.', 'error');
// // // // // // // //       setPaymentData(prev => ({ ...prev, studentName: '', balanceAmount: '', newBalanceLeft: '' }));
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const updatePaymentDataFromEnrollment = (enrollment) => {
// // // // // // // //     const balanceAmount = enrollment?.balanceAmount?.toFixed(2) || '0.00';
// // // // // // // //     setPaymentData(prev => ({
// // // // // // // //       ...prev,
// // // // // // // //       enrollmentId: enrollment.enrollmentId || '',
// // // // // // // //       studentId: enrollment.studentId || '',
// // // // // // // //       studentName: enrollment?.student?.fullName || '',
// // // // // // // //       courseId: enrollment.courseId || '',
// // // // // // // //       courseName: enrollment.course?.name || '',
// // // // // // // //       balanceAmount: balanceAmount,
// // // // // // // //       newBalanceLeft: balanceAmount,
// // // // // // // //     }));
// // // // // // // //     console.log('Updated payment data with enrollment:', enrollment); // Debugging log
// // // // // // // //   };

// // // // // // // //   const debouncedFetchEnrollmentById = useCallback(debounce((id) => {
// // // // // // // //     fetchEnrollmentById(id);
// // // // // // // //   }, 1000), []);

// // // // // // // //   const handleChange = async (e) => {
// // // // // // // //     const { name, value } = e.target;
// // // // // // // //     setPaymentData(prev => ({ ...prev, [name]: value }));
// // // // // // // //     console.log(`Changed ${name}:`, value); // Debugging log
  
// // // // // // // //     if (name === 'paymentAmount' && value) {
// // // // // // // //       validatePaymentAmount(value, paymentData.balanceAmount);
// // // // // // // //     }
  
// // // // // // // //     if (name === 'studentId') {
// // // // // // // //       // Reset other fields when student changes
// // // // // // // //       setPaymentData(prev => ({
// // // // // // // //         ...prev,
// // // // // // // //         studentName: '',
// // // // // // // //         courseId: '',
// // // // // // // //         courseName: '',
// // // // // // // //         balanceAmount: '',
// // // // // // // //         newBalanceLeft: '',
// // // // // // // //         paymentAmount: ''
// // // // // // // //       }));
// // // // // // // //     }
  
// // // // // // // //     if (name === "courseId") {
// // // // // // // //       // Find the selected enrollment and update payment data
// // // // // // // //       const enrollment = enrollments.find(enrollment => enrollment.courseId === value && enrollment.studentId === paymentData.studentId);
// // // // // // // //       if (enrollment) {
// // // // // // // //         updatePaymentDataFromEnrollment(enrollment);
// // // // // // // //         console.log('Updated payment data with selected course:', enrollment); // Debugging log
// // // // // // // //       } else {
// // // // // // // //         // Handle case where no enrollment is found for selected course
// // // // // // // //         setPaymentData(prev => ({
// // // // // // // //           ...prev,
// // // // // // // //           courseId: '',
// // // // // // // //           courseName: '',
// // // // // // // //           balanceAmount: '',
// // // // // // // //           newBalanceLeft: '',
// // // // // // // //         }));
// // // // // // // //       }
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const validatePaymentAmount = (paymentAmount, balanceAmount) => {
// // // // // // // //     const paymentAmountFloat = parseFloat(paymentAmount);
// // // // // // // //     const balanceAmountFloat = parseFloat(balanceAmount);
// // // // // // // //     const newBalanceLeft = balanceAmountFloat - paymentAmountFloat;

// // // // // // // //     if (newBalanceLeft < 0) {
// // // // // // // //       setErrors(prev => ({ ...prev, paymentAmountError: 'Payment amount cannot exceed the balance amount.' }));
// // // // // // // //     } else {
// // // // // // // //       setErrors(prev => ({ ...prev, paymentAmountError: '' }));
// // // // // // // //       setPaymentData(prev => ({ ...prev, newBalanceLeft: newBalanceLeft.toFixed(2) }));
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handleSubmit = async (e) => {
// // // // // // // //     e.preventDefault();
// // // // // // // //     if (errors.paymentAmountError) {
// // // // // // // //       Swal.fire('Error', errors.paymentAmountError, 'error');
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     try {
// // // // // // // //       await axios.post(`${apiUrl}/payments`, {
// // // // // // // //         enrollmentId: paymentData.enrollmentId,
// // // // // // // //         amount: parseFloat(paymentData.paymentAmount),
// // // // // // // //         paymentMethod: paymentData.paymentMode,
// // // // // // // //         notes: paymentData.notes,
// // // // // // // //       });

// // // // // // // //       const receiptData = {
// // // // // // // //         enrollmentId: paymentData.enrollmentId,
// // // // // // // //         studentName: paymentData.studentName,
// // // // // // // //         courseName: paymentData.courseName,
// // // // // // // //         paymentAmount: paymentData.paymentAmount,
// // // // // // // //         paymentMode: paymentData.paymentMode,
// // // // // // // //         notes: paymentData.notes,
// // // // // // // //         date: new Date().toLocaleString(),
// // // // // // // //         courses: [
// // // // // // // //           { name: paymentData.courseName, totalFees: '$1000', amountPaid: paymentData.paymentAmount, pendingFees: (1000 - parseFloat(paymentData.paymentAmount)).toFixed(2) },
// // // // // // // //           // Add more courses as needed
// // // // // // // //         ]
// // // // // // // //       };

// // // // // // // //       setReceipt(receiptData);

// // // // // // // //       Swal.fire('Success', 'Payment submitted successfully!', 'success');
// // // // // // // //     } catch (error) {
// // // // // // // //       Swal.fire('Error', 'Failed to submit payment.', 'error');
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handlePrint = async () => {
// // // // // // // //     const element = document.getElementById('receipt');
// // // // // // // //     const canvas = await html2canvas(element);
// // // // // // // //     const imgData = canvas.toDataURL('image/png');
// // // // // // // //     const pdf = new jsPDF({
// // // // // // // //       format: 'a4'
// // // // // // // //     });
// // // // // // // //     pdf.addImage(imgData, 'PNG', 10, 10);
// // // // // // // //     const pdfBlob = pdf.output('blob');
// // // // // // // //     const url = URL.createObjectURL(pdfBlob);
// // // // // // // //     window.open(url, '_blank');
// // // // // // // //   };

// // // // // // // //   const handleDownload = async () => {
// // // // // // // //     const element = document.getElementById('receipt');
// // // // // // // //     const canvas = await html2canvas(element);
// // // // // // // //     const imgData = canvas.toDataURL('image/png');
// // // // // // // //     const pdf = new jsPDF({
// // // // // // // //       format: 'a4'
// // // // // // // //     });
// // // // // // // //     pdf.addImage(imgData, 'PNG', 10, 10);
// // // // // // // //     pdf.save('receipt.pdf');
// // // // // // // //   };

// // // // // // // //   const handleEmail = async () => {
// // // // // // // //     const element = document.getElementById('receipt');
// // // // // // // //     const canvas = await html2canvas(element);
// // // // // // // //     const imgData = canvas.toDataURL('image/png');
// // // // // // // //     const pdf = new jsPDF({
// // // // // // // //       format: 'a4'
// // // // // // // //     });
// // // // // // // //     pdf.addImage(imgData, 'PNG', 10, 10);
// // // // // // // //     const pdfBase64 = pdf.output('datauristring').split(',')[1]; // Get base64 string of PDF

// // // // // // // //     try {
// // // // // // // //       const response = await axios.post(`${apiUrl}/send-email`, {
// // // // // // // //         to: email,
// // // // // // // //         subject: 'Payment Receipt',
// // // // // // // //         text: 'Please find attached the payment receipt.',
// // // // // // // //         pdfBase64: pdfBase64
// // // // // // // //       });

// // // // // // // //       console.log('Email sent:', response.data); // Log response for debugging

// // // // // // // //       Swal.fire('Success', 'Email sent successfully!', 'success');
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error('Failed to send email:', error); // Log detailed error for debugging
// // // // // // // //       Swal.fire('Error', 'Failed to send email.', 'error');
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const uniqueStudents = enrollments.reduce((acc, curr) => {
// // // // // // // //     if (!acc.find(student => student.studentId === curr.studentId)) {
// // // // // // // //       acc.push({ studentId: curr.studentId, studentName: curr.student.fullName });
// // // // // // // //     }
// // // // // // // //     return acc;
// // // // // // // //   }, []);

// // // // // // // //   const filteredEnrollments = paymentData.studentId
// // // // // // // //     ? enrollments.filter(enrollment => enrollment.studentId === paymentData.studentId)
// // // // // // // //     : [];

// // // // // // // //   return (
// // // // // // // //     <div className={styles.container}>
// // // // // // // //       <div className={styles.formContainer}>
// // // // // // // //         <h2>Payment Form</h2>
// // // // // // // //         <form onSubmit={handleSubmit}>
// // // // // // // //           <div className={styles.formGroup}>
// // // // // // // //             <label htmlFor="studentId">Student Name:</label>
// // // // // // // //             <select id="studentId" name="studentId" value={paymentData.studentId} onChange={handleChange}>
// // // // // // // //               <option value="">Select Student</option>
// // // // // // // //               {uniqueStudents.map(student => (
// // // // // // // //                 <option key={student.studentId} value={student.studentId}>{student.studentName}</option>
// // // // // // // //               ))}
// // // // // // // //             </select>
// // // // // // // //           </div>
// // // // // // // //           {filteredEnrollments.length > 0 && (
// // // // // // // //             <div className={styles.formGroup}>
// // // // // // // //               <label htmlFor="courseId">Course:</label>
// // // // // // // //               <select id="courseId" name="courseId" value={paymentData.courseId} onChange={handleChange}>
// // // // // // // //                 <option value="">Select Course</option>
// // // // // // // //                 {filteredEnrollments.map(enrollment => (
// // // // // // // //                   <option key={enrollment.courseId} value={enrollment.courseId}>{enrollment.course.name}</option>
// // // // // // // //                 ))}
// // // // // // // //               </select>
// // // // // // // //             </div>
// // // // // // // //           )}
// // // // // // // //           <div className={styles.formGroup}>
// // // // // // // //             <label htmlFor="paymentAmount">Payment Amount:</label>
// // // // // // // //             <input type="number" id="paymentAmount" name="paymentAmount" placeholder="Enter Payment Amount" value={paymentData.paymentAmount} onChange={handleChange} />
// // // // // // // //             {errors.paymentAmountError && <div className={styles.errorMessage}>{errors.paymentAmountError}</div>}
// // // // // // // //           </div>
// // // // // // // //           <div className={styles.formGroup}>
// // // // // // // //             <label htmlFor="balanceAmount">Balance Amount:</label>
// // // // // // // //             <input type="text" id="balanceAmount" name="balanceAmount" placeholder="Balance Amount" value={paymentData.balanceAmount} disabled />
// // // // // // // //           </div>
// // // // // // // //           <div className={styles.formGroup}>
// // // // // // // //             <label htmlFor="newBalanceLeft">New Balance Left:</label>
// // // // // // // //             <input type="text" id="newBalanceLeft" name="newBalanceLeft" placeholder="New Balance Left" value={paymentData.newBalanceLeft} disabled />
// // // // // // // //           </div>
// // // // // // // //           <div className={styles.formGroup}>
// // // // // // // //             <label htmlFor="paymentMode">Payment Mode:</label>
// // // // // // // //             <select id="paymentMode" name="paymentMode" value={paymentData.paymentMode} onChange={handleChange}>
// // // // // // // //               <option value="">Select Payment Mode</option>
// // // // // // // //               <option value="Cash">Cash</option>
// // // // // // // //               <option value="Credit Card">Credit Card</option>
// // // // // // // //               <option value="Debit Card">Debit Card</option>
// // // // // // // //               <option value="Online Transfer">Online Transfer</option>
// // // // // // // //             </select>
// // // // // // // //           </div>
// // // // // // // //           <div className={styles.formGroup}>
// // // // // // // //             <label htmlFor="notes">Notes:</label>
// // // // // // // //             <textarea id="notes" name="notes" placeholder="Enter any notes here" value={paymentData.notes} onChange={handleChange}></textarea>
// // // // // // // //           </div>
// // // // // // // //           <div className={styles.formActions}>
// // // // // // // //             <button type="reset">Reset</button>
// // // // // // // //             <button type="submit">Submit</button>
// // // // // // // //           </div>
// // // // // // // //         </form>
// // // // // // // //       </div>

// // // // // // // //       <div className={styles.receiptContainer}>
// // // // // // // //         {receipt && (
// // // // // // // //           <Invoice
// // // // // // // //             enrollmentId={receipt.enrollmentId}
// // // // // // // //             studentName={receipt.studentName}
// // // // // // // //             paymentAmount={receipt.paymentAmount}
// // // // // // // //             paymentMode={receipt.paymentMode}
// // // // // // // //             notes={receipt.notes}
// // // // // // // //             date={receipt.date}
// // // // // // // //             courses={receipt.courses}
// // // // // // // //             onPrint={handlePrint}
// // // // // // // //             onDownload={handleDownload}
// // // // // // // //             onEmail={handleEmail}
// // // // // // // //             email={email}
// // // // // // // //             setEmail={setEmail}
// // // // // // // //           />
// // // // // // // //         )}
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // // export default PaymentForm;
// // // // // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // // // // import axios from 'axios';
// // // // // // // import Swal from 'sweetalert2';
// // // // // // // import { debounce } from 'lodash';
// // // // // // // import { useLocation } from 'react-router-dom';
// // // // // // // import html2canvas from 'html2canvas';
// // // // // // // import jsPDF from 'jspdf';
// // // // // // // import styles from './PaymentForm.module.css';
// // // // // // // import Invoice from './Invoice'; // Adjust the path as per your project structure

// // // // // // // function PaymentForm() {
// // // // // // //   const location = useLocation();
// // // // // // //   const searchParams = new URLSearchParams(location.search);
// // // // // // //   const enrollmentIdFromParams = searchParams.get('enrollmentId');

// // // // // // //   const [paymentData, setPaymentData] = useState({
// // // // // // //     enrollmentId: enrollmentIdFromParams ? enrollmentIdFromParams : '',
// // // // // // //     studentId: '',
// // // // // // //     studentName: '',
// // // // // // //     courseId: '',
// // // // // // //     courseName: '',
// // // // // // //     paymentAmount: '',
// // // // // // //     balanceAmount: '',
// // // // // // //     newBalanceLeft: '',
// // // // // // //     paymentMode: '',
// // // // // // //     notes: '',
// // // // // // //   });
// // // // // // //   const [errors, setErrors] = useState({});
// // // // // // //   const [receipt, setReceipt] = useState(null);
// // // // // // //   const [email, setEmail] = useState('');
// // // // // // //   const [enrollments, setEnrollments] = useState([]);
// // // // // // //   const apiUrl = process.env.REACT_APP_API_BASE_URL;

// // // // // // //   useEffect(() => {
// // // // // // //     fetchEnrollments().catch(err => {
// // // // // // //       Swal.fire('Error', 'Failed to fetch enrollments.', 'error');
// // // // // // //     });
// // // // // // //   }, []);

// // // // // // //   async function fetchEnrollments() {
// // // // // // //     const response = await axios.get(`${apiUrl}/enroll`);
// // // // // // //     setEnrollments(response.data);
// // // // // // //     console.log('Fetched enrollments:', response.data); // Debugging log
// // // // // // //   }

// // // // // // //   useEffect(() => {
// // // // // // //     if (enrollmentIdFromParams) {
// // // // // // //       fetchEnrollmentById(enrollmentIdFromParams);
// // // // // // //     }
// // // // // // //   }, [enrollmentIdFromParams]);

// // // // // // //   const fetchEnrollmentById = async (id) => {
// // // // // // //     if (!id) return;
// // // // // // //     try {
// // // // // // //       const response = await axios.get(`${apiUrl}/enroll/${id}`);
// // // // // // //       const enrollment = response.data;
// // // // // // //       updatePaymentDataFromEnrollment(enrollment);
// // // // // // //     } catch (error) {
// // // // // // //       Swal.fire('Error', 'Failed to fetch enrollment by ID.', 'error');
// // // // // // //       setPaymentData(prev => ({ ...prev, studentName: '', balanceAmount: '', newBalanceLeft: '' }));
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const updatePaymentDataFromEnrollment = (enrollment) => {
// // // // // // //     const balanceAmount = enrollment?.balanceAmount?.toFixed(2) || '0.00';
// // // // // // //     setPaymentData(prev => ({
// // // // // // //       ...prev,
// // // // // // //       enrollmentId: enrollment.enrollmentId || '',
// // // // // // //       studentId: enrollment.studentId || '',
// // // // // // //       studentName: enrollment?.student?.fullName || '',
// // // // // // //       courseId: enrollment.courseId || '',
// // // // // // //       courseName: enrollment.course?.name || '',
// // // // // // //       balanceAmount: balanceAmount,
// // // // // // //       newBalanceLeft: balanceAmount,
// // // // // // //     }));
// // // // // // //     console.log('Updated payment data with enrollment:', enrollment); // Debugging log
// // // // // // //   };

// // // // // // //   const debouncedFetchEnrollmentById = useCallback(debounce((id) => {
// // // // // // //     fetchEnrollmentById(id);
// // // // // // //   }, 1000), []);

// // // // // // //   const handleChange = async (e) => {
// // // // // // //     const { name, value } = e.target;
// // // // // // //     setPaymentData(prev => ({ ...prev, [name]: value }));
// // // // // // //     console.log(`Changed ${name}:`, value); // Debugging log
  
// // // // // // //     if (name === 'paymentAmount' && value) {
// // // // // // //       validatePaymentAmount(value, paymentData.balanceAmount);
// // // // // // //     }
  
// // // // // // //     if (name === 'studentId') {
// // // // // // //       // Reset other fields when student changes
// // // // // // //       setPaymentData(prev => ({
// // // // // // //         ...prev,
// // // // // // //         studentName: '',
// // // // // // //         courseId: '',
// // // // // // //         courseName: '',
// // // // // // //         balanceAmount: '',
// // // // // // //         newBalanceLeft: '',
// // // // // // //         paymentAmount: ''
// // // // // // //       }));
// // // // // // //     }
  
// // // // // // //     if (name === "courseId") {
// // // // // // //       // Find the selected enrollment and update payment data
// // // // // // //       const enrollment = enrollments.find(enrollment => enrollment.courseId === value && enrollment.studentId === paymentData.studentId);
// // // // // // //       if (enrollment) {
// // // // // // //         updatePaymentDataFromEnrollment(enrollment);
// // // // // // //         console.log('Updated payment data with selected course:', enrollment); // Debugging log
// // // // // // //         console.log('Selected enrollmentId:', enrollment.enrollmentId); // Log the enrollmentId
// // // // // // //       } else {
// // // // // // //         // Handle case where no enrollment is found for selected course
// // // // // // //         setPaymentData(prev => ({
// // // // // // //           ...prev,
// // // // // // //           courseId: '',
// // // // // // //           courseName: '',
// // // // // // //           balanceAmount: '',
// // // // // // //           newBalanceLeft: '',
// // // // // // //         }));
// // // // // // //       }
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const validatePaymentAmount = (paymentAmount, balanceAmount) => {
// // // // // // //     const paymentAmountFloat = parseFloat(paymentAmount);
// // // // // // //     const balanceAmountFloat = parseFloat(balanceAmount);
// // // // // // //     const newBalanceLeft = balanceAmountFloat - paymentAmountFloat;

// // // // // // //     if (newBalanceLeft < 0) {
// // // // // // //       setErrors(prev => ({ ...prev, paymentAmountError: 'Payment amount cannot exceed the balance amount.' }));
// // // // // // //     } else {
// // // // // // //       setErrors(prev => ({ ...prev, paymentAmountError: '' }));
// // // // // // //       setPaymentData(prev => ({ ...prev, newBalanceLeft: newBalanceLeft.toFixed(2) }));
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleSubmit = async (e) => {
// // // // // // //     e.preventDefault();
// // // // // // //     if (errors.paymentAmountError) {
// // // // // // //       Swal.fire('Error', errors.paymentAmountError, 'error');
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     try {
// // // // // // //       await axios.post(`${apiUrl}/payments`, {
// // // // // // //         enrollmentId: paymentData.enrollmentId,
// // // // // // //         amount: parseFloat(paymentData.paymentAmount),
// // // // // // //         paymentMethod: paymentData.paymentMode,
// // // // // // //         notes: paymentData.notes,
// // // // // // //       });

// // // // // // //       const receiptData = {
// // // // // // //         enrollmentId: paymentData.enrollmentId,
// // // // // // //         studentName: paymentData.studentName,
// // // // // // //         courseName: paymentData.courseName,
// // // // // // //         paymentAmount: paymentData.paymentAmount,
// // // // // // //         paymentMode: paymentData.paymentMode,
// // // // // // //         notes: paymentData.notes,
// // // // // // //         date: new Date().toLocaleString(),
// // // // // // //         courses: [
// // // // // // //           { name: paymentData.courseName, totalFees: '$1000', amountPaid: paymentData.paymentAmount, pendingFees: (1000 - parseFloat(paymentData.paymentAmount)).toFixed(2) },
// // // // // // //           // Add more courses as needed
// // // // // // //         ]
// // // // // // //       };

// // // // // // //       setReceipt(receiptData);

// // // // // // //       Swal.fire('Success', 'Payment submitted successfully!', 'success');
// // // // // // //     } catch (error) {
// // // // // // //       Swal.fire('Error', 'Failed to submit payment.', 'error');
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handlePrint = async () => {
// // // // // // //     const element = document.getElementById('receipt');
// // // // // // //     const canvas = await html2canvas(element);
// // // // // // //     const imgData = canvas.toDataURL('image/png');
// // // // // // //     const pdf = new jsPDF({
// // // // // // //       format: 'a4'
// // // // // // //     });
// // // // // // //     pdf.addImage(imgData, 'PNG', 10, 10);
// // // // // // //     const pdfBlob = pdf.output('blob');
// // // // // // //     const url = URL.createObjectURL(pdfBlob);
// // // // // // //     window.open(url, '_blank');
// // // // // // //   };

// // // // // // //   const handleDownload = async () => {
// // // // // // //     const element = document.getElementById('receipt');
// // // // // // //     const canvas = await html2canvas(element);
// // // // // // //     const imgData = canvas.toDataURL('image/png');
// // // // // // //     const pdf = new jsPDF({
// // // // // // //       format: 'a4'
// // // // // // //     });
// // // // // // //     pdf.addImage(imgData, 'PNG', 10, 10);
// // // // // // //     pdf.save('receipt.pdf');
// // // // // // //   };

// // // // // // //   const handleEmail = async () => {
// // // // // // //     const element = document.getElementById('receipt');
// // // // // // //     const canvas = await html2canvas(element);
// // // // // // //     const imgData = canvas.toDataURL('image/png');
// // // // // // //     const pdf = new jsPDF({
// // // // // // //       format: 'a4'
// // // // // // //     });
// // // // // // //     pdf.addImage(imgData, 'PNG', 10, 10);
// // // // // // //     const pdfBase64 = pdf.output('datauristring').split(',')[1]; // Get base64 string of PDF

// // // // // // //     try {
// // // // // // //       const response = await axios.post(`${apiUrl}/send-email`, {
// // // // // // //         to: email,
// // // // // // //         subject: 'Payment Receipt',
// // // // // // //         text: 'Please find attached the payment receipt.',
// // // // // // //         pdfBase64: pdfBase64
// // // // // // //       });

// // // // // // //       console.log('Email sent:', response.data); // Log response for debugging

// // // // // // //       Swal.fire('Success', 'Email sent successfully!', 'success');
// // // // // // //     } catch (error) {
// // // // // // //       console.error('Failed to send email:', error); // Log detailed error for debugging
// // // // // // //       Swal.fire('Error', 'Failed to send email.', 'error');
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const uniqueStudents = enrollments.reduce((acc, curr) => {
// // // // // // //     if (!acc.find(student => student.studentId === curr.studentId)) {
// // // // // // //       acc.push({ studentId: curr.studentId, studentName: curr.student.fullName });
// // // // // // //     }
// // // // // // //     return acc;
// // // // // // //   }, []);

// // // // // // //   const filteredEnrollments = paymentData.studentId
// // // // // // //     ? enrollments.filter(enrollment => enrollment.studentId === paymentData.studentId)
// // // // // // //     : [];

// // // // // // //   return (
// // // // // // //     <div className={styles.container}>
// // // // // // //       <div className={styles.formContainer}>
// // // // // // //         <h2>Payment Form</h2>
// // // // // // //         <form onSubmit={handleSubmit}>
// // // // // // //           <div className={styles.formGroup}>
// // // // // // //             <label htmlFor="studentId">Student Name:</label>
// // // // // // //             <select id="studentId" name="studentId" value={paymentData.studentId} onChange={handleChange}>
// // // // // // //               <option value="">Select Student</option>
// // // // // // //               {uniqueStudents.map(student => (
// // // // // // //                 <option key={student.studentId} value={student.studentId}>{student.studentName}</option>
// // // // // // //               ))}
// // // // // // //             </select>
// // // // // // //           </div>
// // // // // // //           {filteredEnrollments.length > 0 && (
// // // // // // //             <div className={styles.formGroup}>
// // // // // // //               <label htmlFor="courseId">Course:</label>
// // // // // // //               <select id="courseId" name="courseId" value={paymentData.courseId} onChange={handleChange}>
// // // // // // //                 <option value="">Select Course</option>
// // // // // // //                 {filteredEnrollments.map(enrollment => (
// // // // // // //                   <option key={enrollment.courseId} value={enrollment.courseId}>{enrollment.course.name}</option>
// // // // // // //                 ))}
// // // // // // //               </select>
// // // // // // //             </div>
// // // // // // //           )}
// // // // // // //           <div className={styles.formGroup}>
// // // // // // //             <label htmlFor="paymentAmount">Payment Amount:</label>
// // // // // // //             <input type="number" id="paymentAmount" name="paymentAmount" placeholder="Enter Payment Amount" value={paymentData.paymentAmount} onChange={handleChange} />
// // // // // // //             {errors.paymentAmountError && <div className={styles.errorMessage}>{errors.paymentAmountError}</div>}
// // // // // // //           </div>
// // // // // // //           <div className={styles.formGroup}>
// // // // // // //             <label htmlFor="balanceAmount">Balance Amount:</label>
// // // // // // //             <input type="text" id="balanceAmount" name="balanceAmount" placeholder="Balance Amount" value={paymentData.balanceAmount} disabled />
// // // // // // //           </div>
// // // // // // //           <div className={styles.formGroup}>
// // // // // // //             <label htmlFor="newBalanceLeft">New Balance Left:</label>
// // // // // // //             <input type="text" id="newBalanceLeft" name="newBalanceLeft" placeholder="New Balance Left" value={paymentData.newBalanceLeft} disabled />
// // // // // // //           </div>
// // // // // // //           <div className={styles.formGroup}>
// // // // // // //             <label htmlFor="paymentMode">Payment Mode:</label>
// // // // // // //             <select id="paymentMode" name="paymentMode" value={paymentData.paymentMode} onChange={handleChange}>
// // // // // // //               <option value="">Select Payment Mode</option>
// // // // // // //               <option value="Cash">Cash</option>
// // // // // // //               <option value="Credit Card">Credit Card</option>
// // // // // // //               <option value="Debit Card">Debit Card</option>
// // // // // // //               <option value="Online Transfer">Online Transfer</option>
// // // // // // //             </select>
// // // // // // //           </div>
// // // // // // //           <div className={styles.formGroup}>
// // // // // // //             <label htmlFor="notes">Notes:</label>
// // // // // // //             <textarea id="notes" name="notes" placeholder="Enter any notes here" value={paymentData.notes} onChange={handleChange}></textarea>
// // // // // // //           </div>
// // // // // // //           <div className={styles.formActions}>
// // // // // // //             <button type="reset">Reset</button>
// // // // // // //             <button type="submit">Submit</button>
// // // // // // //           </div>
// // // // // // //         </form>
// // // // // // //       </div>

// // // // // // //       <div className={styles.receiptContainer}>
// // // // // // //         {receipt && (
// // // // // // //           <Invoice
// // // // // // //             enrollmentId={receipt.enrollmentId}
// // // // // // //             studentName={receipt.studentName}
// // // // // // //             paymentAmount={receipt.paymentAmount}
// // // // // // //             paymentMode={receipt.paymentMode}
// // // // // // //             notes={receipt.notes}
// // // // // // //             date={receipt.date}
// // // // // // //             courses={receipt.courses}
// // // // // // //             onPrint={handlePrint}
// // // // // // //             onDownload={handleDownload}
// // // // // // //             onEmail={handleEmail}
// // // // // // //             email={email}
// // // // // // //             setEmail={setEmail}
// // // // // // //           />
// // // // // // //         )}
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // // export default PaymentForm;
// // // // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // // // import axios from 'axios';
// // // // // // import Swal from 'sweetalert2';
// // // // // // import { debounce } from 'lodash';
// // // // // // import { useLocation } from 'react-router-dom';
// // // // // // import html2canvas from 'html2canvas';
// // // // // // import jsPDF from 'jspdf';
// // // // // // import styles from './PaymentForm.module.css';
// // // // // // import Invoice from './Invoice'; // Adjust the path as per your project structure

// // // // // // function PaymentForm() {
// // // // // //   const location = useLocation();
// // // // // //   const searchParams = new URLSearchParams(location.search);
// // // // // //   const enrollmentIdFromParams = searchParams.get('enrollmentId');

// // // // // //   const [paymentData, setPaymentData] = useState({
// // // // // //     enrollmentId: enrollmentIdFromParams ? enrollmentIdFromParams : '',
// // // // // //     studentId: '',
// // // // // //     studentName: '',
// // // // // //     courseId: '',
// // // // // //     courseName: '',
// // // // // //     paymentAmount: '',
// // // // // //     balanceAmount: '',
// // // // // //     newBalanceLeft: '',
// // // // // //     paymentMode: '',
// // // // // //     notes: '',
// // // // // //   });
// // // // // //   const [errors, setErrors] = useState({});
// // // // // //   const [receipt, setReceipt] = useState(null);
// // // // // //   const [email, setEmail] = useState('');
// // // // // //   const [enrollments, setEnrollments] = useState([]);
// // // // // //   const apiUrl = process.env.REACT_APP_API_BASE_URL;

// // // // // //   useEffect(() => {
// // // // // //     fetchEnrollments().catch(err => {
// // // // // //       Swal.fire('Error', 'Failed to fetch enrollments.', 'error');
// // // // // //     });
// // // // // //   }, []);

// // // // // //   async function fetchEnrollments() {
// // // // // //     const response = await axios.get(`${apiUrl}/enroll`);
// // // // // //     setEnrollments(response.data);
// // // // // //     console.log('Fetched enrollments:', response.data); // Debugging log
// // // // // //   }

// // // // // //   useEffect(() => {
// // // // // //     if (enrollmentIdFromParams) {
// // // // // //       fetchEnrollmentById(enrollmentIdFromParams);
// // // // // //     }
// // // // // //   }, [enrollmentIdFromParams]);

// // // // // //   const fetchEnrollmentById = async (id) => {
// // // // // //     if (!id) return;
// // // // // //     try {
// // // // // //       console.log('Id is',id);
// // // // // //       const response = await axios.get(`${apiUrl}/enroll/${id}`);
// // // // // //       console.log('response is',response);
// // // // // //       const enrollment = response.data;
// // // // // //       console.log('Response is',response.data);
// // // // // //       updatePaymentDataFromEnrollment(enrollment);
// // // // // //     } catch (error) {
// // // // // //       Swal.fire('Error', 'Failed to fetch enrollment by ID.', 'error');
// // // // // //       setPaymentData(prev => ({ ...prev, studentName: '', balanceAmount: '', newBalanceLeft: '' }));
// // // // // //     }
// // // // // //   };

// // // // // //   const updatePaymentDataFromEnrollment = (enrollment) => {
    
// // // // // //     const balanceAmount = enrollment?.balanceAmount?.toFixed(2) || '0.00';
// // // // // //     console.log(`BalanceAmount is`,enrollment.balanceAmount);
// // // // // //     console.log('Setting balance amount:', balanceAmount); // Debugging log
// // // // // //     setPaymentData(prev => ({
// // // // // //       ...prev,
// // // // // //       enrollmentId: enrollment.enrollmentId || '',
// // // // // //       studentId: enrollment.studentId || '',
// // // // // //       studentName: enrollment?.student?.fullName || '',
// // // // // //       courseId: enrollment.courseId || '',
// // // // // //       courseName: enrollment.course?.name || '',
// // // // // //       balanceAmount: balanceAmount,
// // // // // //       newBalanceLeft: balanceAmount,
// // // // // //     }));
// // // // // //     console.log('Updated payment data with enrollment:', enrollment); // Debugging log
// // // // // //   };

// // // // // //   const debouncedFetchEnrollmentById = useCallback(debounce((id) => {
// // // // // //     fetchEnrollmentById(id);
// // // // // //   }, 1000), []);

// // // // // //   const handleChange = async (e) => {
// // // // // //     const { name, value } = e.target;
// // // // // //     setPaymentData(prev => ({ ...prev, [name]: value }));
// // // // // //     console.log(`Changed ${name}:`, value); // Debugging log
  
// // // // // //     if (name === 'paymentAmount' && value) {
// // // // // //       validatePaymentAmount(value, paymentData.balanceAmount);
// // // // // //     }
  
// // // // // //     if (name === 'studentId') {
// // // // // //       // Reset other fields when student changes
// // // // // //       setPaymentData(prev => ({
// // // // // //         ...prev,
// // // // // //         studentName: '',
// // // // // //         courseId: '',
// // // // // //         courseName: '',
// // // // // //         balanceAmount: '',
// // // // // //         newBalanceLeft: '',
// // // // // //         paymentAmount: ''
// // // // // //       }));
// // // // // //     }
  
// // // // // //     if (name === "courseId") {
// // // // // //       // Find the selected enrollment and update payment data
// // // // // //       const enrollment = enrollments.find(enrollment => enrollment.courseId === value && enrollment.studentId === paymentData.studentId);
// // // // // //       if (enrollment) {
// // // // // //         updatePaymentDataFromEnrollment(enrollment);
// // // // // //         console.log('Updated payment data with selected course:', enrollment); // Debugging log
// // // // // //       } else {
// // // // // //         // Handle case where no enrollment is found for selected course
// // // // // //         setPaymentData(prev => ({
// // // // // //           ...prev,
// // // // // //           courseId: '',
// // // // // //           courseName: '',
// // // // // //           balanceAmount: '',
// // // // // //           newBalanceLeft: '',
// // // // // //         }));
// // // // // //       }
// // // // // //     }
// // // // // //   };

// // // // // //   const validatePaymentAmount = (paymentAmount, balanceAmount) => {
// // // // // //     const paymentAmountFloat = parseFloat(paymentAmount);
// // // // // //     const balanceAmountFloat = parseFloat(balanceAmount);
// // // // // //     const newBalanceLeft = balanceAmountFloat - paymentAmountFloat;

// // // // // //     if (newBalanceLeft < 0) {
// // // // // //       setErrors(prev => ({ ...prev, paymentAmountError: 'Payment amount cannot exceed the balance amount.' }));
// // // // // //     } else {
// // // // // //       setErrors(prev => ({ ...prev, paymentAmountError: '' }));
// // // // // //       console.log('Setting new balance left:', newBalanceLeft.toFixed(2)); // Debugging log
// // // // // //       setPaymentData(prev => ({ ...prev, newBalanceLeft: newBalanceLeft.toFixed(2) }));
// // // // // //     }
// // // // // //   };

// // // // // //   const handleSubmit = async (e) => {
// // // // // //     e.preventDefault();
// // // // // //     if (errors.paymentAmountError) {
// // // // // //       Swal.fire('Error', errors.paymentAmountError, 'error');
// // // // // //       return;
// // // // // //     }

// // // // // //     try {
// // // // // //       await axios.post(`${apiUrl}/payments`, {
// // // // // //         enrollmentId: paymentData.enrollmentId,
// // // // // //         amount: parseFloat(paymentData.paymentAmount),
// // // // // //         paymentMethod: paymentData.paymentMode,
// // // // // //         notes: paymentData.notes,
// // // // // //       });

// // // // // //       const receiptData = {
// // // // // //         enrollmentId: paymentData.enrollmentId,
// // // // // //         studentName: paymentData.studentName,
// // // // // //         courseName: paymentData.courseName,
// // // // // //         paymentAmount: paymentData.paymentAmount,
// // // // // //         paymentMode: paymentData.paymentMode,
// // // // // //         notes: paymentData.notes,
// // // // // //         date: new Date().toLocaleString(),
// // // // // //         courses: [
// // // // // //           { name: paymentData.courseName, totalFees: '$1000', amountPaid: paymentData.paymentAmount, pendingFees: (1000 - parseFloat(paymentData.paymentAmount)).toFixed(2) },
// // // // // //           // Add more courses as needed
// // // // // //         ]
// // // // // //       };

// // // // // //       setReceipt(receiptData);

// // // // // //       Swal.fire('Success', 'Payment submitted successfully!', 'success');
// // // // // //     } catch (error) {
// // // // // //       Swal.fire('Error', 'Failed to submit payment.', 'error');
// // // // // //     }
// // // // // //   };

// // // // // //   const handlePrint = async () => {
// // // // // //     const element = document.getElementById('receipt');
// // // // // //     const canvas = await html2canvas(element);
// // // // // //     const imgData = canvas.toDataURL('image/png');
// // // // // //     const pdf = new jsPDF({
// // // // // //       format: 'a4'
// // // // // //     });
// // // // // //     pdf.addImage(imgData, 'PNG', 10, 10);
// // // // // //     const pdfBlob = pdf.output('blob');
// // // // // //     const url = URL.createObjectURL(pdfBlob);
// // // // // //     window.open(url, '_blank');
// // // // // //   };

// // // // // //   const handleDownload = async () => {
// // // // // //     const element = document.getElementById('receipt');
// // // // // //     const canvas = await html2canvas(element);
// // // // // //     const imgData = canvas.toDataURL('image/png');
// // // // // //     const pdf = new jsPDF({
// // // // // //       format: 'a4'
// // // // // //     });
// // // // // //     pdf.addImage(imgData, 'PNG', 10, 10);
// // // // // //     pdf.save('receipt.pdf');
// // // // // //   };

// // // // // //   const handleEmail = async () => {
// // // // // //     const element = document.getElementById('receipt');
// // // // // //     const canvas = await html2canvas(element);
// // // // // //     const imgData = canvas.toDataURL('image/png');
// // // // // //     const pdf = new jsPDF({
// // // // // //       format: 'a4'
// // // // // //     });
// // // // // //     pdf.addImage(imgData, 'PNG', 10, 10);
// // // // // //     const pdfBase64 = pdf.output('datauristring').split(',')[1]; // Get base64 string of PDF

// // // // // //     try {
// // // // // //       const response = await axios.post(`${apiUrl}/send-email`, {
// // // // // //         to: email,
// // // // // //         subject: 'Payment Receipt',
// // // // // //         text: 'Please find attached the payment receipt.',
// // // // // //         pdfBase64: pdfBase64
// // // // // //       });

// // // // // //       console.log('Email sent:', response.data); // Log response for debugging

// // // // // //       Swal.fire('Success', 'Email sent successfully!', 'success');
// // // // // //     } catch (error) {
// // // // // //       console.error('Failed to send email:', error); // Log detailed error for debugging
// // // // // //       Swal.fire('Error', 'Failed to send email.', 'error');
// // // // // //     }
// // // // // //   };

// // // // // //   const uniqueStudents = enrollments.reduce((acc, curr) => {
// // // // // //     if (!acc.find(student => student.studentId === curr.studentId)) {
// // // // // //       acc.push({ studentId: curr.studentId, studentName: curr.student.fullName });
// // // // // //     }
// // // // // //     return acc;
// // // // // //   }, []);

// // // // // //   const filteredEnrollments = paymentData.studentId
// // // // // //     ? enrollments.filter(enrollment => enrollment.studentId === paymentData.studentId)
// // // // // //     : [];

// // // // // //   return (
// // // // // //     <div className={styles.container}>
// // // // // //       <div className={styles.formContainer}>
// // // // // //         <h2>Payment Form</h2>
// // // // // //         <form onSubmit={handleSubmit}>
// // // // // //           <div className={styles.formGroup}>
// // // // // //             <label htmlFor="studentId">Student Name:</label>
// // // // // //             <select id="studentId" name="studentId" value={paymentData.studentId} onChange={handleChange}>
// // // // // //               <option value="">Select Student</option>
// // // // // //               {uniqueStudents.map(student => (
// // // // // //                 <option key={student.studentId} value={student.studentId}>{student.studentName}</option>
// // // // // //               ))}
// // // // // //             </select>
// // // // // //           </div>
// // // // // //           {filteredEnrollments.length > 0 && (
// // // // // //             <div className={styles.formGroup}>
// // // // // //               <label htmlFor="courseId">Course:</label>
// // // // // //               <select id="courseId" name="courseId" value={paymentData.courseId} onChange={handleChange}>
// // // // // //                 <option value="">Select Course</option>
// // // // // //                 {filteredEnrollments.map(enrollment => (
// // // // // //                   <option key={enrollment.courseId} value={enrollment.courseId}>{enrollment.course.name}</option>
// // // // // //                 ))}
// // // // // //               </select>
// // // // // //             </div>
// // // // // //           )}
// // // // // //           <div className={styles.formGroup}>
// // // // // //             <label htmlFor="paymentAmount">Payment Amount:</label>
// // // // // //             <input type="number" id="paymentAmount" name="paymentAmount" placeholder="Enter Payment Amount" value={paymentData.paymentAmount} onChange={handleChange} />
// // // // // //             {errors.paymentAmountError && <div className={styles.errorMessage}>{errors.paymentAmountError}</div>}
// // // // // //           </div>
// // // // // //           <div className={styles.formGroup}>
// // // // // //             <label htmlFor="balanceAmount">Balance Amount:</label>
// // // // // //             <input type="text" id="balanceAmount" name="balanceAmount" placeholder="Balance Amount" value={paymentData.balanceAmount} disabled />
// // // // // //           </div>
// // // // // //           <div className={styles.formGroup}>
// // // // // //             <label htmlFor="newBalanceLeft">New Balance Left:</label>
// // // // // //             <input type="text" id="newBalanceLeft" name="newBalanceLeft" placeholder="New Balance Left" value={paymentData.newBalanceLeft} disabled />
// // // // // //           </div>
// // // // // //           <div className={styles.formGroup}>
// // // // // //             <label htmlFor="paymentMode">Payment Mode:</label>
// // // // // //             <select id="paymentMode" name="paymentMode" value={paymentData.paymentMode} onChange={handleChange}>
// // // // // //               <option value="">Select Payment Mode</option>
// // // // // //               <option value="Cash">Cash</option>
// // // // // //               <option value="Credit Card">Credit Card</option>
// // // // // //               <option value="Debit Card">Debit Card</option>
// // // // // //               <option value="Online Transfer">Online Transfer</option>
// // // // // //             </select>
// // // // // //           </div>
// // // // // //           <div className={styles.formGroup}>
// // // // // //             <label htmlFor="notes">Notes:</label>
// // // // // //             <textarea id="notes" name="notes" placeholder="Enter any notes here" value={paymentData.notes} onChange={handleChange}></textarea>
// // // // // //           </div>
// // // // // //           <div className={styles.formActions}>
// // // // // //             <button type="reset">Reset</button>
// // // // // //             <button type="submit">Submit</button>
// // // // // //           </div>
// // // // // //         </form>
// // // // // //       </div>

// // // // // //       <div className={styles.receiptContainer}>
// // // // // //         {receipt && (
// // // // // //           <Invoice
// // // // // //             enrollmentId={receipt.enrollmentId}
// // // // // //             studentName={receipt.studentName}
// // // // // //             paymentAmount={receipt.paymentAmount}
// // // // // //             paymentMode={receipt.paymentMode}
// // // // // //             notes={receipt.notes}
// // // // // //             date={receipt.date}
// // // // // //             courses={receipt.courses}
// // // // // //             onPrint={handlePrint}
// // // // // //             onDownload={handleDownload}
// // // // // //             onEmail={handleEmail}
// // // // // //             email={email}
// // // // // //             setEmail={setEmail}
// // // // // //           />
// // // // // //         )}
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // export default PaymentForm;
// // // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // // import axios from 'axios';
// // // // // import Swal from 'sweetalert2';
// // // // // import { debounce } from 'lodash';
// // // // // import { useLocation } from 'react-router-dom';
// // // // // import html2canvas from 'html2canvas';
// // // // // import jsPDF from 'jspdf';
// // // // // import styles from './PaymentForm.module.css';
// // // // // import Invoice from './Invoice'; // Adjust the path as per your project structure

// // // // // function PaymentForm() {
// // // // //   const location = useLocation();
// // // // //   const searchParams = new URLSearchParams(location.search);
// // // // //   const enrollmentIdFromParams = searchParams.get('enrollmentId');

// // // // //   const [paymentData, setPaymentData] = useState({
// // // // //     enrollmentId: enrollmentIdFromParams ? enrollmentIdFromParams : '',
// // // // //     studentId: '',
// // // // //     studentName: '',
// // // // //     courseId: '',
// // // // //     courseName: '',
// // // // //     paymentAmount: '',
// // // // //     balanceAmount: '',
// // // // //     newBalanceLeft: '',
// // // // //     paymentMode: '',
// // // // //     notes: '',
// // // // //   });
// // // // //   const [errors, setErrors] = useState({});
// // // // //   const [receipt, setReceipt] = useState(null);
// // // // //   const [email, setEmail] = useState('');
// // // // //   const [enrollments, setEnrollments] = useState([]);
// // // // //   const apiUrl = process.env.REACT_APP_API_BASE_URL;

// // // // //   useEffect(() => {
// // // // //     fetchEnrollments().catch(err => {
// // // // //       Swal.fire('Error', 'Failed to fetch enrollments.', 'error');
// // // // //     });
// // // // //   }, []);

// // // // //   async function fetchEnrollments() {
// // // // //     try {
// // // // //       const response = await axios.get(`${apiUrl}/enroll`);
// // // // //       setEnrollments(response.data);
// // // // //       console.log('Fetched enrollments:', response.data); // Debugging log
// // // // //     } catch (error) {
// // // // //       Swal.fire('Error', 'Failed to fetch enrollments.', 'error');
// // // // //     }
// // // // //   }

// // // // //   useEffect(() => {
// // // // //     if (enrollmentIdFromParams) {
// // // // //       fetchEnrollmentById(enrollmentIdFromParams);
// // // // //     }
// // // // //   }, [enrollmentIdFromParams]);

// // // // //   const fetchEnrollmentById = async (id) => {
// // // // //     if (!id) return;
// // // // //     try {
// // // // //       console.log('Id is', id);
// // // // //       const response = await axios.get(`${apiUrl}/enroll/${id}`);
// // // // //       console.log('Response is', response.data); // Debugging log
// // // // //       const enrollment = response.data;
// // // // //       updatePaymentDataFromEnrollment(enrollment);
// // // // //     } catch (error) {
// // // // //       Swal.fire('Error', 'Failed to fetch enrollment by ID.', 'error');
// // // // //       setPaymentData(prev => ({ ...prev, studentName: '', balanceAmount: '', newBalanceLeft: '' }));
// // // // //     }
// // // // //   };

// // // // //   const updatePaymentDataFromEnrollment = (enrollment) => {
// // // // //     const balanceAmount = enrollment?.balanceAmount?.toFixed(2) || '0.00';
// // // // //     console.log(`BalanceAmount is`, enrollment.balanceAmount);
// // // // //     console.log('Setting balance amount:', balanceAmount); // Debugging log
// // // // //     setPaymentData(prev => ({
// // // // //       ...prev,
// // // // //       enrollmentId: enrollment.enrollmentId || '',
// // // // //       studentId: enrollment.studentId || '',
// // // // //       studentName: enrollment?.student?.fullName || '',
// // // // //       courseId: enrollment.courseId || '',
// // // // //       courseName: enrollment.course?.name || '',
// // // // //       balanceAmount: balanceAmount,
// // // // //       newBalanceLeft: balanceAmount,
// // // // //     }));
// // // // //     console.log('Updated payment data with enrollment:', enrollment); // Debugging log
// // // // //   };

// // // // //   const debouncedFetchEnrollmentById = useCallback(debounce((id) => {
// // // // //     fetchEnrollmentById(id);
// // // // //   }, 1000), []);

// // // // //   const handleChange = async (e) => {
// // // // //     const { name, value } = e.target;
// // // // //     setPaymentData(prev => ({ ...prev, [name]: value }));
// // // // //     console.log(`Changed ${name}:`, value); // Debugging log

// // // // //     if (name === 'paymentAmount' && value) {
// // // // //       validatePaymentAmount(value, paymentData.balanceAmount);
// // // // //     }

// // // // //     if (name === 'studentId') {
// // // // //       // Reset other fields when student changes
// // // // //       setPaymentData(prev => ({
// // // // //         ...prev,
// // // // //         studentName: '',
// // // // //         courseId: '',
// // // // //         courseName: '',
// // // // //         balanceAmount: '',
// // // // //         newBalanceLeft: '',
// // // // //         paymentAmount: ''
// // // // //       }));
// // // // //     }

// // // // //     if (name === "courseId") {
// // // // //       // Find the selected enrollment and update payment data
// // // // //       const enrollment = enrollments.find(enrollment => enrollment.courseId === value && enrollment.studentId === paymentData.studentId);
// // // // //       if (enrollment) {
// // // // //         updatePaymentDataFromEnrollment(enrollment);
// // // // //         console.log('Updated payment data with selected course:', enrollment); // Debugging log
// // // // //       } else {
// // // // //         // Handle case where no enrollment is found for selected course
// // // // //         setPaymentData(prev => ({
// // // // //           ...prev,
// // // // //           courseId: '',
// // // // //           courseName: '',
// // // // //           balanceAmount: '',
// // // // //           newBalanceLeft: '',
// // // // //         }));
// // // // //       }
// // // // //     }
// // // // //   };

// // // // //   const validatePaymentAmount = (paymentAmount, balanceAmount) => {
// // // // //     const paymentAmountFloat = parseFloat(paymentAmount);
// // // // //     const balanceAmountFloat = parseFloat(balanceAmount);
// // // // //     const newBalanceLeft = balanceAmountFloat - paymentAmountFloat;

// // // // //     if (newBalanceLeft < 0) {
// // // // //       setErrors(prev => ({ ...prev, paymentAmountError: 'Payment amount cannot exceed the balance amount.' }));
// // // // //     } else {
// // // // //       setErrors(prev => ({ ...prev, paymentAmountError: '' }));
// // // // //       console.log('Setting new balance left:', newBalanceLeft.toFixed(2)); // Debugging log
// // // // //       setPaymentData(prev => ({ ...prev, newBalanceLeft: newBalanceLeft.toFixed(2) }));
// // // // //     }
// // // // //   };

// // // // //   const handleSubmit = async (e) => {
// // // // //     e.preventDefault();
// // // // //     if (errors.paymentAmountError) {
// // // // //       Swal.fire('Error', errors.paymentAmountError, 'error');
// // // // //       return;
// // // // //     }

// // // // //     try {
// // // // //       await axios.post(`${apiUrl}/payments`, {
// // // // //         enrollmentId: paymentData.enrollmentId,
// // // // //         amount: parseFloat(paymentData.paymentAmount),
// // // // //         paymentMethod: paymentData.paymentMode,
// // // // //         notes: paymentData.notes,
// // // // //       });

// // // // //       const receiptData = {
// // // // //         enrollmentId: paymentData.enrollmentId,
// // // // //         studentName: paymentData.studentName,
// // // // //         courseName: paymentData.courseName,
// // // // //         paymentAmount: paymentData.paymentAmount,
// // // // //         paymentMode: paymentData.paymentMode,
// // // // //         notes: paymentData.notes,
// // // // //         date: new Date().toLocaleString(),
// // // // //         courses: [
// // // // //           { name: paymentData.courseName, totalFees: '$1000', amountPaid: paymentData.paymentAmount, pendingFees: (1000 - parseFloat(paymentData.paymentAmount)).toFixed(2) },
// // // // //           // Add more courses as needed
// // // // //         ]
// // // // //       };

// // // // //       setReceipt(receiptData);

// // // // //       Swal.fire('Success', 'Payment submitted successfully!', 'success');
// // // // //     } catch (error) {
// // // // //       Swal.fire('Error', 'Failed to submit payment.', 'error');
// // // // //     }
// // // // //   };

// // // // //   const handlePrint = async () => {
// // // // //     const element = document.getElementById('receipt');
// // // // //     const canvas = await html2canvas(element);
// // // // //     const imgData = canvas.toDataURL('image/png');
// // // // //     const pdf = new jsPDF({
// // // // //       format: 'a4'
// // // // //     });
// // // // //     pdf.addImage(imgData, 'PNG', 10, 10);
// // // // //     const pdfBlob = pdf.output('blob');
// // // // //     const url = URL.createObjectURL(pdfBlob);
// // // // //     window.open(url, '_blank');
// // // // //   };

// // // // //   const handleDownload = async () => {
// // // // //     const element = document.getElementById('receipt');
// // // // //     const canvas = await html2canvas(element);
// // // // //     const imgData = canvas.toDataURL('image/png');
// // // // //     const pdf = new jsPDF({
// // // // //       format: 'a4'
// // // // //     });
// // // // //     pdf.addImage(imgData, 'PNG', 10, 10);
// // // // //     pdf.save('receipt.pdf');
// // // // //   };

// // // // //   const handleEmail = async () => {
// // // // //     const element = document.getElementById('receipt');
// // // // //     const canvas = await html2canvas(element);
// // // // //     const imgData = canvas.toDataURL('image/png');
// // // // //     const pdf = new jsPDF({
// // // // //       format: 'a4'
// // // // //     });
// // // // //     pdf.addImage(imgData, 'PNG', 10, 10);
// // // // //     const pdfBase64 = pdf.output('datauristring').split(',')[1]; // Get base64 string of PDF

// // // // //     try {
// // // // //       const response = await axios.post(`${apiUrl}/send-email`, {
// // // // //         to: email,
// // // // //         subject: 'Payment Receipt',
// // // // //         text: 'Please find attached the payment receipt.',
// // // // //         pdfBase64: pdfBase64
// // // // //       });

// // // // //       console.log('Email sent:', response.data); // Log response for debugging

// // // // //       Swal.fire('Success', 'Email sent successfully!', 'success');
// // // // //     } catch (error) {
// // // // //       console.error('Failed to send email:', error); // Log detailed error for debugging
// // // // //       Swal.fire('Error', 'Failed to send email.', 'error');
// // // // //     }
// // // // //   };

// // // // //   const uniqueStudents = enrollments.reduce((acc, curr) => {
// // // // //     if (!acc.find(student => student.studentId === curr.studentId)) {
// // // // //       acc.push({ studentId: curr.studentId, studentName: curr.student.fullName });
// // // // //     }
// // // // //     return acc;
// // // // //   }, []);

// // // // //   const filteredEnrollments = paymentData.studentId
// // // // //     ? enrollments.filter(enrollment => enrollment.studentId === paymentData.studentId)
// // // // //     : [];

// // // // //   return (
// // // // //     <div className={styles.container}>
// // // // //       <div className={styles.formContainer}>
// // // // //         <h2>Payment Form</h2>
// // // // //         <form onSubmit={handleSubmit}>
// // // // //           <div className={styles.formGroup}>
// // // // //             <label htmlFor="studentId">Student Name:</label>
// // // // //             <select id="studentId" name="studentId" value={paymentData.studentId} onChange={handleChange}>
// // // // //               <option value="">Select Student</option>
// // // // //               {uniqueStudents.map(student => (
// // // // //                 <option key={student.studentId} value={student.studentId}>{student.studentName}</option>
// // // // //               ))}
// // // // //             </select>
// // // // //           </div>
// // // // //           {filteredEnrollments.length > 0 && (
// // // // //             <div className={styles.formGroup}>
// // // // //               <label htmlFor="courseId">Course:</label>
// // // // //               <select id="courseId" name="courseId" value={paymentData.courseId} onChange={handleChange}>
// // // // //                 <option value="">Select Course</option>
// // // // //                 {filteredEnrollments.map(enrollment => (
// // // // //                   <option key={enrollment.courseId} value={enrollment.courseId}>{enrollment.course.name}</option>
// // // // //                 ))}
// // // // //               </select>
// // // // //             </div>
// // // // //           )}
// // // // //           <div className={styles.formGroup}>
// // // // //             <label htmlFor="paymentAmount">Payment Amount:</label>
// // // // //             <input type="number" id="paymentAmount" name="paymentAmount" placeholder="Enter Payment Amount" value={paymentData.paymentAmount} onChange={handleChange} />
// // // // //             {errors.paymentAmountError && <div className={styles.errorMessage}>{errors.paymentAmountError}</div>}
// // // // //           </div>
// // // // //           <div className={styles.formGroup}>
// // // // //             <label htmlFor="balanceAmount">Balance Amount:</label>
// // // // //             <input type="text" id="balanceAmount" name="balanceAmount" placeholder="Balance Amount" value={paymentData.balanceAmount} disabled />
// // // // //           </div>
// // // // //           <div className={styles.formGroup}>
// // // // //             <label htmlFor="newBalanceLeft">New Balance Left:</label>
// // // // //             <input type="text" id="newBalanceLeft" name="newBalanceLeft" placeholder="New Balance Left" value={paymentData.newBalanceLeft} disabled />
// // // // //           </div>
// // // // //           <div className={styles.formGroup}>
// // // // //             <label htmlFor="paymentMode">Payment Mode:</label>
// // // // //             <select id="paymentMode" name="paymentMode" value={paymentData.paymentMode} onChange={handleChange}>
// // // // //               <option value="">Select Payment Mode</option>
// // // // //               <option value="Cash">Cash</option>
// // // // //               <option value="Credit Card">Credit Card</option>
// // // // //               <option value="Debit Card">Debit Card</option>
// // // // //               <option value="Online Transfer">Online Transfer</option>
// // // // //             </select>
// // // // //           </div>
// // // // //           <div className={styles.formGroup}>
// // // // //             <label htmlFor="notes">Notes:</label>
// // // // //             <textarea id="notes" name="notes" placeholder="Enter any notes here" value={paymentData.notes} onChange={handleChange}></textarea>
// // // // //           </div>
// // // // //           <div className={styles.formActions}>
// // // // //             <button type="reset">Reset</button>
// // // // //             <button type="submit">Submit</button>
// // // // //           </div>
// // // // //         </form>
// // // // //       </div>

// // // // //       <div className={styles.receiptContainer}>
// // // // //         {receipt && (
// // // // //           <Invoice
// // // // //             enrollmentId={receipt.enrollmentId}
// // // // //             studentName={receipt.studentName}
// // // // //             paymentAmount={receipt.paymentAmount}
// // // // //             paymentMode={receipt.paymentMode}
// // // // //             notes={receipt.notes}
// // // // //             date={receipt.date}
// // // // //             courses={receipt.courses}
// // // // //             onPrint={handlePrint}
// // // // //             onDownload={handleDownload}
// // // // //             onEmail={handleEmail}
// // // // //             email={email}
// // // // //             setEmail={setEmail}
// // // // //           />
// // // // //         )}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default PaymentForm;
// // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // import axios from 'axios';
// // // // import Swal from 'sweetalert2';
// // // // import { debounce } from 'lodash';
// // // // import { useLocation } from 'react-router-dom';
// // // // import html2canvas from 'html2canvas';
// // // // import jsPDF from 'jspdf';
// // // // import styles from './PaymentForm.module.css';
// // // // import Invoice from './Invoice'; // Adjust the path as per your project structure

// // // // function PaymentForm() {
// // // //   const location = useLocation();
// // // //   const searchParams = new URLSearchParams(location.search);
// // // //   const enrollmentIdFromParams = searchParams.get('enrollmentId');

// // // //   const [paymentData, setPaymentData] = useState({
// // // //     enrollmentId: enrollmentIdFromParams ? enrollmentIdFromParams : '',
// // // //     studentId: '',
// // // //     studentName: '',
// // // //     courseId: '',
// // // //     courseName: '',
// // // //     paymentAmount: '',
// // // //     balanceAmount: '',
// // // //     newBalanceLeft: '',
// // // //     paymentMode: '',
// // // //     notes: '',
// // // //   });
// // // //   const [errors, setErrors] = useState({});
// // // //   const [receipt, setReceipt] = useState(null);
// // // //   const [email, setEmail] = useState('');
// // // //   const [enrollments, setEnrollments] = useState([]);
// // // //   const apiUrl = process.env.REACT_APP_API_BASE_URL;

// // // //   useEffect(() => {
// // // //     fetchEnrollments().catch(err => {
// // // //       Swal.fire('Error', 'Failed to fetch enrollments.', 'error');
// // // //     });
// // // //   }, []);

// // // //   async function fetchEnrollments() {
// // // //     try {
// // // //       const response = await axios.get(`${apiUrl}/enroll`);
// // // //       setEnrollments(response.data);
// // // //       console.log('Fetched enrollments:', response.data); // Debugging log
// // // //     } catch (error) {
// // // //       Swal.fire('Error', 'Failed to fetch enrollments.', 'error');
// // // //     }
// // // //   }

// // // //   useEffect(() => {
// // // //     if (enrollmentIdFromParams) {
// // // //       fetchEnrollmentById(enrollmentIdFromParams);
// // // //     }
// // // //   }, [enrollmentIdFromParams]);

// // // //   const fetchEnrollmentById = async (id) => {
// // // //     if (!id) return;
// // // //     try {
// // // //       console.log('Id is', id);

// // // //       const response = await axios.get(`${apiUrl}/enroll/${id}`);
// // // //       console.log('Response is', response.data); // Debugging log
// // // //       const enrollment = response.data;
// // // //       console.log('Enrollment Id ',enrollment.enrollmentId);

// // // //       updatePaymentDataFromEnrollment(enrollment);
// // // //     } catch (error) {
// // // //       Swal.fire('Error', 'Failed to fetch enrollment by ID.', 'error');
// // // //       setPaymentData(prev => ({ ...prev, studentName: '', balanceAmount: '', newBalanceLeft: '' }));
// // // //     }
// // // //   };

// // // //   const updatePaymentDataFromEnrollment = (enrollment) => {
// // // //     const balanceAmount = enrollment?.balanceAmount?.toFixed(2) || '0.00';
// // // //     console.log(`BalanceAmount is`, enrollment.balanceAmount);
// // // //     console.log('Setting balance amount:', balanceAmount); // Debugging log
// // // //     setPaymentData(prev => ({
// // // //       ...prev,
// // // //       enrollmentId: enrollment.enrollmentId || '',
// // // //       studentId: enrollment.studentId || '',
// // // //       studentName: enrollment?.student?.fullName || '',
// // // //       courseId: enrollment.courseId || '',
// // // //       courseName: enrollment.course?.name || '',
// // // //       balanceAmount: balanceAmount,
// // // //       newBalanceLeft: balanceAmount,
// // // //     }));
// // // //     console.log('Updated payment data with enrollment:', enrollment); // Debugging log
// // // //     console.log(`Enrollmeenrollment`, enrollment.enrollmentId);
// // // //     console.log('Student name',enrollment.studentName);

// // // //   };

// // // //   const debouncedFetchEnrollmentById = useCallback(debounce((id) => {
// // // //     console.log('ID is',id);
// // // //     fetchEnrollmentById(id);
// // // //   }, 1000), []);

// // // //   const handleChange = async (e) => {
// // // //     const { name, value } = e.target;
// // // //     setPaymentData(prev => ({ ...prev, [name]: value }));
// // // //     console.log(`Changed ${name}:`, value); // Debugging log

// // // //     if (name === 'paymentAmount' && value) {
// // // //       validatePaymentAmount(value, paymentData.balanceAmount);
// // // //     }

// // // //     if (name === 'studentId') {
// // // //       // Reset other fields when student changes
// // // //       setPaymentData(prev => ({
// // // //         ...prev,
// // // //         studentName: '',
// // // //         courseId: '',
// // // //         courseName: '',
// // // //         balanceAmount: '',
// // // //         newBalanceLeft: '',
// // // //         paymentAmount: ''
// // // //       }));
// // // //     }

// // // //     if (name === "courseId") {
// // // //       // Find the selected enrollment and update payment data
// // // //       const enrollment = enrollments.find(enrollment => enrollment.courseId === value && enrollment.studentId === paymentData.studentId);
// // // //       if (enrollment) {
// // // //         updatePaymentDataFromEnrollment(enrollment);
// // // //         console.log('Updated payment data with selected course:', enrollment); // Debugging log
// // // //       } else {
// // // //         // Handle case where no enrollment is found for selected course
// // // //         setPaymentData(prev => ({
// // // //           ...prev,
// // // //           courseId: '',
// // // //           courseName: '',
// // // //           balanceAmount: '',
// // // //           newBalanceLeft: '',
// // // //         }));
// // // //       }
// // // //     }
// // // //   };

// // // //   const validatePaymentAmount = (paymentAmount, balanceAmount) => {
// // // //     const paymentAmountFloat = parseFloat(paymentAmount);
// // // //     const balanceAmountFloat = parseFloat(balanceAmount);
// // // //     const newBalanceLeft = balanceAmountFloat - paymentAmountFloat;

// // // //     if (newBalanceLeft < 0) {
// // // //       setErrors(prev => ({ ...prev, paymentAmountError: 'Payment amount cannot exceed the balance amount.' }));
// // // //     } else {
// // // //       setErrors(prev => ({ ...prev, paymentAmountError: '' }));
// // // //       console.log('Setting new balance left:', newBalanceLeft.toFixed(2)); // Debugging log
// // // //       setPaymentData(prev => ({ ...prev, newBalanceLeft: newBalanceLeft.toFixed(2) }));
// // // //     }
// // // //   };

// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();
// // // //     if (errors.paymentAmountError) {
// // // //       Swal.fire('Error', errors.paymentAmountError, 'error');
// // // //       return;
// // // //     }

// // // //     try {
// // // //       await axios.post(`${apiUrl}/payments`, {
// // // //         enrollmentId: paymentData.enrollmentId,
// // // //         amount: parseFloat(paymentData.paymentAmount),
// // // //         paymentMethod: paymentData.paymentMode,
// // // //         notes: paymentData.notes,
// // // //       });

// // // //       const receiptData = {
// // // //         enrollmentId: paymentData.enrollmentId,
// // // //         studentName: paymentData.studentName,
// // // //         courseName: paymentData.courseName,
// // // //         paymentAmount: paymentData.paymentAmount,
// // // //         paymentMode: paymentData.paymentMode,
// // // //         notes: paymentData.notes,
// // // //         date: new Date().toLocaleString(),
// // // //         courses: [
// // // //           { name: paymentData.courseName, totalFees: '$1000', amountPaid: paymentData.paymentAmount, pendingFees: (1000 - parseFloat(paymentData.paymentAmount)).toFixed(2) },
// // // //           // Add more courses as needed
// // // //         ]
// // // //       };

// // // //       setReceipt(receiptData);

// // // //       Swal.fire('Success', 'Payment submitted successfully!', 'success');
// // // //     } catch (error) {
// // // //       Swal.fire('Error', 'Failed to submit payment.', 'error');
// // // //     }
// // // //   };

// // // //   const handlePrint = async () => {
// // // //     const element = document.getElementById('receipt');
// // // //     const canvas = await html2canvas(element);
// // // //     const imgData = canvas.toDataURL('image/png');
// // // //     const pdf = new jsPDF({
// // // //       format: 'a4'
// // // //     });
// // // //     pdf.addImage(imgData, 'PNG', 10, 10);
// // // //     const pdfBlob = pdf.output('blob');
// // // //     const url = URL.createObjectURL(pdfBlob);
// // // //     window.open(url, '_blank');
// // // //   };

// // // //   const handleDownload = async () => {
// // // //     const element = document.getElementById('receipt');
// // // //     const canvas = await html2canvas(element);
// // // //     const imgData = canvas.toDataURL('image/png');
// // // //     const pdf = new jsPDF({
// // // //       format: 'a4'
// // // //     });
// // // //     pdf.addImage(imgData, 'PNG', 10, 10);
// // // //     pdf.save('receipt.pdf');
// // // //   };

// // // //   const handleEmail = async () => {
// // // //     const element = document.getElementById('receipt');
// // // //     const canvas = await html2canvas(element);
// // // //     const imgData = canvas.toDataURL('image/png');
// // // //     const pdf = new jsPDF({
// // // //       format: 'a4'
// // // //     });
// // // //     pdf.addImage(imgData, 'PNG', 10, 10);
// // // //     const pdfBase64 = pdf.output('datauristring').split(',')[1]; // Get base64 string of PDF

// // // //     try {
// // // //       const response = await axios.post(`${apiUrl}/send-email`, {
// // // //         to: email,
// // // //         subject: 'Payment Receipt',
// // // //         text: 'Please find attached the payment receipt.',
// // // //         pdfBase64: pdfBase64
// // // //       });

// // // //       console.log('Email sent:', response.data); // Log response for debugging

// // // //       Swal.fire('Success', 'Email sent successfully!', 'success');
// // // //     } catch (error) {
// // // //       console.error('Failed to send email:', error); // Log detailed error for debugging
// // // //       Swal.fire('Error', 'Failed to send email.', 'error');
// // // //     }
// // // //   };

// // // //   const uniqueStudents = enrollments.reduce((acc, curr) => {
// // // //     if (!acc.find(student => student.studentId === curr.studentId)) {
// // // //       acc.push({ studentId: curr.studentId, studentName: curr.student.fullName });
// // // //     }
// // // //     return acc;
// // // //   }, []);

// // // //   const filteredEnrollments = paymentData.studentId
// // // //     ? enrollments.filter(enrollment => enrollment.studentId === paymentData.studentId)
// // // //     : [];

// // // //   return (
// // // //     <div className={styles.container}>
// // // //       <div className={styles.formContainer}>
// // // //         <h2>Payment Form</h2>
// // // //         <form onSubmit={handleSubmit}>
// // // //           <div className={styles.formGroup}>
// // // //             <label htmlFor="studentId">Student Name:</label>
// // // //             <select id="studentId" name="studentId" value={paymentData.studentId} onChange={handleChange}>
// // // //               <option value="">Select Student</option>
// // // //               {uniqueStudents.map(student => (
// // // //                 <option key={student.studentId} value={student.studentId}>{student.studentName}</option>
// // // //               ))}
// // // //             </select>
// // // //           </div>
// // // //           {filteredEnrollments.length > 0 && (
// // // //             <div className={styles.formGroup}>
// // // //               <label htmlFor="courseId">Course:</label>
// // // //               <select id="courseId" name="courseId" value={paymentData.courseId} onChange={handleChange}>
// // // //                 <option value="">Select Course</option>
// // // //                 {filteredEnrollments.map(enrollment => (
// // // //                   <option key={enrollment.courseId} value={enrollment.courseId}>{enrollment.course.name}</option>
// // // //                 ))}
// // // //               </select>
// // // //             </div>
// // // //           )}
// // // //           <div className={styles.formGroup}>
// // // //             <label htmlFor="paymentAmount">Payment Amount:</label>
// // // //             <input type="number" id="paymentAmount" name="paymentAmount" placeholder="Enter Payment Amount" value={paymentData.paymentAmount} onChange={handleChange} />
// // // //             {errors.paymentAmountError && <div className={styles.errorMessage}>{errors.paymentAmountError}</div>}
// // // //           </div>
// // // //           <div className={styles.formGroup}>
// // // //             <label htmlFor="balanceAmount">Balance Amount:</label>
// // // //             <input type="text" id="balanceAmount" name="balanceAmount" placeholder="Balance Amount" value={paymentData.balanceAmount} disabled />
// // // //           </div>
// // // //           <div className={styles.formGroup}>
// // // //             <label htmlFor="newBalanceLeft">New Balance Left:</label>
// // // //             <input type="text" id="newBalanceLeft" name="newBalanceLeft" placeholder="New Balance Left" value={paymentData.newBalanceLeft} disabled />
// // // //           </div>
// // // //           <div className={styles.formGroup}>
// // // //             <label htmlFor="paymentMode">Payment Mode:</label>
// // // //             <select id="paymentMode" name="paymentMode" value={paymentData.paymentMode} onChange={handleChange}>
// // // //               <option value="">Select Payment Mode</option>
// // // //               <option value="Cash">Cash</option>
// // // //               <option value="Credit Card">Credit Card</option>
// // // //               <option value="Debit Card">Debit Card</option>
// // // //               <option value="Online Transfer">Online Transfer</option>
// // // //             </select>
// // // //           </div>
// // // //           <div className={styles.formGroup}>
// // // //             <label htmlFor="notes">Notes:</label>
// // // //             <textarea id="notes" name="notes" placeholder="Enter any notes here" value={paymentData.notes} onChange={handleChange}></textarea>
// // // //           </div>
// // // //           <div className={styles.formActions}>
// // // //             <button type="reset">Reset</button>
// // // //             <button type="submit">Submit</button>
// // // //           </div>
// // // //         </form>
// // // //       </div>

// // // //       <div className={styles.receiptContainer}>
// // // //         {receipt && (
// // // //           <Invoice
// // // //             enrollmentId={receipt.enrollmentId}
// // // //             studentName={receipt.studentName}
// // // //             paymentAmount={receipt.paymentAmount}
// // // //             paymentMode={receipt.paymentMode}
// // // //             notes={receipt.notes}
// // // //             date={receipt.date}
// // // //             courses={receipt.courses}
// // // //             onPrint={handlePrint}
// // // //             onDownload={handleDownload}
// // // //             onEmail={handleEmail}
// // // //             email={email}
// // // //             setEmail={setEmail}
// // // //           />
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default PaymentForm;
// // // import React, { useState, useEffect, useCallback } from 'react';
// // // import axios from 'axios';
// // // import Swal from 'sweetalert2';
// // // import { debounce } from 'lodash';
// // // import { useLocation } from 'react-router-dom';
// // // import html2canvas from 'html2canvas';
// // // import jsPDF from 'jspdf';
// // // import styles from './PaymentForm.module.css';
// // // import Invoice from './Invoice'; // Adjust the path as per your project structure

// // // function PaymentForm() {
// // //   const location = useLocation();
// // //   const searchParams = new URLSearchParams(location.search);
// // //   const enrollmentIdFromParams = searchParams.get('enrollmentId');

// // //   const [paymentData, setPaymentData] = useState({
// // //     enrollmentId: enrollmentIdFromParams ? enrollmentIdFromParams : '',
// // //     studentId: '',
// // //     studentName: '',
// // //     courseId: '',
// // //     courseName: '',
// // //     paymentAmount: '',
// // //     balanceAmount: '',
// // //     newBalanceLeft: '',
// // //     paymentMode: '',
// // //     notes: '',
// // //   });
// // //   const [errors, setErrors] = useState({});
// // //   const [receipt, setReceipt] = useState(null);
// // //   const [email, setEmail] = useState('');
// // //   const [enrollments, setEnrollments] = useState([]);
// // //   const apiUrl = process.env.REACT_APP_API_BASE_URL;

// // //   useEffect(() => {
// // //     fetchEnrollments().catch(err => {
// // //       Swal.fire('Error', 'Failed to fetch enrollments.', 'error');
// // //     });
// // //   }, []);

// // //   async function fetchEnrollments() {
// // //     try {
// // //       const response = await axios.get(`${apiUrl}/enroll`);
// // //       setEnrollments(response.data);
// // //       console.log('Fetched enrollments:', response.data); // Debugging log
// // //     } catch (error) {
// // //       Swal.fire('Error', 'Failed to fetch enrollments.', 'error');
// // //     }
// // //   }

// // //   useEffect(() => {
// // //     if (enrollmentIdFromParams) {
// // //       fetchEnrollmentById(enrollmentIdFromParams);
// // //     }
// // //   }, [enrollmentIdFromParams]);

// // //   const fetchEnrollmentById = async (id) => {
// // //     if (!id) return;
// // //     try {
// // //       console.log('fetchEnrollmentById called with id:', id);

// // //       const response = await axios.get(`${apiUrl}/enroll/${id}`);
// // //       console.log('Response is', response.data); // Debugging log
// // //       const enrollment = response.data;
// // //       console.log('Enrollment Id ', enrollment.enrollmentId);

// // //       updatePaymentDataFromEnrollment(enrollment);
// // //     } catch (error) {
// // //       Swal.fire('Error', 'Failed to fetch enrollment by ID.', 'error');
// // //       setPaymentData(prev => ({ ...prev, studentName: '', balanceAmount: '', newBalanceLeft: '' }));
// // //     }
// // //   };

// // //   const updatePaymentDataFromEnrollment = (enrollment) => {
// // //     const balanceAmount = enrollment?.balanceAmount?.toFixed(2) || '0.00';
// // //     console.log('Setting balance amount:', balanceAmount); // Debugging log
// // //     setPaymentData(prev => ({
// // //       ...prev,
// // //       enrollmentId: enrollment.enrollmentId || '',
// // //       studentId: enrollment.studentId || '',
// // //       studentName: enrollment?.student?.fullName || '',
// // //       courseId: enrollment.courseId || '',
// // //       courseName: enrollment.course?.name || '',
// // //       balanceAmount: balanceAmount,
// // //       newBalanceLeft: balanceAmount,
// // //     }));
// // //     console.log('Updated payment data with enrollment:', enrollment); // Debugging log
// // //   };

// // //   const debouncedFetchEnrollmentById = useCallback(debounce((enrollmentId) => {
// // // console.log(`Enrollment id is ${enrollmentId}`);
// // //     console.log('debouncedFetchEnrollmentById called with id:', enrollmentId);
// // //     fetchEnrollmentById(enrollmentId);
// // //   }, 1000), []);

// // //   const handleChange = async (e) => {
// // //     const { name, value } = e.target;
// // //     setPaymentData(prev => ({ ...prev, [name]: value }));
// // //     console.log(`Changed ${name}:`, value); // Debugging log

// // //     if (name === 'paymentAmount' && value) {
// // //       validatePaymentAmount(value, paymentData.balanceAmount);
// // //     }

// // //     if (name === 'studentId') {
// // //       // Reset other fields when student changes
// // //       setPaymentData(prev => ({
// // //         ...prev,
// // //         studentName: '',
// // //         courseId: '',
// // //         courseName: '',
// // //         balanceAmount: '',
// // //         newBalanceLeft: '',
// // //         paymentAmount: ''
// // //       }));
// // //     }

// // //     if (name === "courseId") {
// // //       // Find the selected enrollment and update payment data
// // //       const enrollment = enrollments.find(enrollment => enrollment.courseId === value && enrollment.studentId === paymentData.studentId);
// // //       if (enrollment) {
// // //         updatePaymentDataFromEnrollment(enrollment);
// // //         console.log('Updated payment data with selected course:', enrollment); // Debugging log
// // //       } else {
// // //         // Handle case where no enrollment is found for selected course
// // //         setPaymentData(prev => ({
// // //           ...prev,
// // //           courseId: '',
// // //           courseName: '',
// // //           balanceAmount: '',
// // //           newBalanceLeft: '',
// // //         }));
// // //       }
// // //     }
// // //   };

// // //   const validatePaymentAmount = (paymentAmount, balanceAmount) => {
// // //     const paymentAmountFloat = parseFloat(paymentAmount);
// // //     const balanceAmountFloat = parseFloat(balanceAmount);
// // //     const newBalanceLeft = balanceAmountFloat - paymentAmountFloat;

// // //     if (newBalanceLeft < 0) {
// // //       setErrors(prev => ({ ...prev, paymentAmountError: 'Payment amount cannot exceed the balance amount.' }));
// // //     } else {
// // //       setErrors(prev => ({ ...prev, paymentAmountError: '' }));
// // //       console.log('Setting new balance left:', newBalanceLeft.toFixed(2)); // Debugging log
// // //       setPaymentData(prev => ({ ...prev, newBalanceLeft: newBalanceLeft.toFixed(2) }));
// // //     }
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     if (errors.paymentAmountError) {
// // //       Swal.fire('Error', errors.paymentAmountError, 'error');
// // //       return;
// // //     }

// // //     try {
// // //       await axios.post(`${apiUrl}/payments`, {
// // //         enrollmentId: paymentData.enrollmentId,
// // //         amount: parseFloat(paymentData.paymentAmount),
// // //         paymentMethod: paymentData.paymentMode,
// // //         notes: paymentData.notes,
// // //       });

// // //       const receiptData = {
// // //         enrollmentId: paymentData.enrollmentId,
// // //         studentName: paymentData.studentName,
// // //         courseName: paymentData.courseName,
// // //         paymentAmount: paymentData.paymentAmount,
// // //         paymentMode: paymentData.paymentMode,
// // //         notes: paymentData.notes,
// // //         date: new Date().toLocaleString(),
// // //         courses: [
// // //           { name: paymentData.courseName, totalFees: '$1000', amountPaid: paymentData.paymentAmount, pendingFees: (1000 - parseFloat(paymentData.paymentAmount)).toFixed(2) },
// // //           // Add more courses as needed
// // //         ]
// // //       };

// // //       setReceipt(receiptData);

// // //       Swal.fire('Success', 'Payment submitted successfully!', 'success');
// // //     } catch (error) {
// // //       Swal.fire('Error', 'Failed to submit payment.', 'error');
// // //     }
// // //   };

// // //   const handlePrint = async () => {
// // //     const element = document.getElementById('receipt');
// // //     const canvas = await html2canvas(element);
// // //     const imgData = canvas.toDataURL('image/png');
// // //     const pdf = new jsPDF({
// // //       format: 'a4'
// // //     });
// // //     pdf.addImage(imgData, 'PNG', 10, 10);
// // //     const pdfBlob = pdf.output('blob');
// // //     const url = URL.createObjectURL(pdfBlob);
// // //     window.open(url, '_blank');
// // //   };

// // //   const handleDownload = async () => {
// // //     const element = document.getElementById('receipt');
// // //     const canvas = await html2canvas(element);
// // //     const imgData = canvas.toDataURL('image/png');
// // //     const pdf = new jsPDF({
// // //       format: 'a4'
// // //     });
// // //     pdf.addImage(imgData, 'PNG', 10, 10);
// // //     pdf.save('receipt.pdf');
// // //   };

// // //   const handleEmail = async () => {
// // //     const element = document.getElementById('receipt');
// // //     const canvas = await html2canvas(element);
// // //     const imgData = canvas.toDataURL('image/png');
// // //     const pdf = new jsPDF({
// // //       format: 'a4'
// // //     });
// // //     pdf.addImage(imgData, 'PNG', 10, 10);
// // //     const pdfBase64 = pdf.output('datauristring').split(',')[1]; // Get base64 string of PDF

// // //     try {
// // //       const response = await axios.post(`${apiUrl}/send-email`, {
// // //         to: email,
// // //         subject: 'Payment Receipt',
// // //         text: 'Please find attached the payment receipt.',
// // //         pdfBase64: pdfBase64
// // //       });

// // //       console.log('Email sent:', response.data); // Log response for debugging

// // //       Swal.fire('Success', 'Email sent successfully!', 'success');
// // //     } catch (error) {
// // //       console.error('Failed to send email:', error); // Log detailed error for debugging
// // //       Swal.fire('Error', 'Failed to send email.', 'error');
// // //     }
// // //   };

// // //   const uniqueStudents = enrollments.reduce((acc, curr) => {
// // //     if (!acc.find(student => student.studentId === curr.studentId)) {
// // //       acc.push({ studentId: curr.studentId, studentName: curr.student.fullName });
// // //     }
// // //     return acc;
// // //   }, []);

// // //   const filteredEnrollments = paymentData.studentId
// // //     ? enrollments.filter(enrollment => enrollment.studentId === paymentData.studentId)
// // //     : [];

// // //   return (
// // //     <div className={styles.container}>
// // //       <div className={styles.formContainer}>
// // //         <h2>Payment Form</h2>
// // //         <form onSubmit={handleSubmit}>
// // //           <div className={styles.formGroup}>
// // //             <label htmlFor="studentId">Student Name:</label>
// // //             <select id="studentId" name="studentId" value={paymentData.studentId} onChange={handleChange}>
// // //               <option value="">Select Student</option>
// // //               {uniqueStudents.map(student => (
// // //                 <option key={student.studentId} value={student.studentId}>{student.studentName}</option>
// // //               ))}
// // //             </select>
// // //           </div>
// // //           {filteredEnrollments.length > 0 && (
// // //             <div className={styles.formGroup}>
// // //               <label htmlFor="courseId">Course:</label>
// // //               <select id="courseId" name="courseId" value={paymentData.courseId} onChange={(e) => {
// // //                 handleChange(e);
// // //                 debouncedFetchEnrollmentById(paymentData.enrollmentId);
// // //               }}>
// // //                 <option value="">Select Course</option>
// // //                 {filteredEnrollments.map(enrollment => (
// // //                   <option key={enrollment.courseId} value={enrollment.courseId}>{enrollment.course.name}</option>
// // //                 ))}
// // //               </select>
// // //             </div>
// // //           )}
// // //           <div className={styles.formGroup}>
// // //             <label htmlFor="paymentAmount">Payment Amount:</label>
// // //             <input type="number" id="paymentAmount" name="paymentAmount" placeholder="Enter Payment Amount" value={paymentData.paymentAmount} onChange={handleChange} />
// // //             {errors.paymentAmountError && <div className={styles.errorMessage}>{errors.paymentAmountError}</div>}
// // //           </div>
// // //           <div className={styles.formGroup}>
// // //             <label htmlFor="balanceAmount">Balance Amount:</label>
// // //             <input type="text" id="balanceAmount" name="balanceAmount" placeholder="Balance Amount" value={paymentData.balanceAmount} disabled />
// // //           </div>
// // //           <div className={styles.formGroup}>
// // //             <label htmlFor="newBalanceLeft">New Balance Left:</label>
// // //             <input type="text" id="newBalanceLeft" name="newBalanceLeft" placeholder="New Balance Left" value={paymentData.newBalanceLeft} disabled />
// // //           </div>
// // //           <div className={styles.formGroup}>
// // //             <label htmlFor="paymentMode">Payment Mode:</label>
// // //             <select id="paymentMode" name="paymentMode" value={paymentData.paymentMode} onChange={handleChange}>
// // //               <option value="">Select Payment Mode</option>
// // //               <option value="Cash">Cash</option>
// // //               <option value="Credit Card">Credit Card</option>
// // //               <option value="Debit Card">Debit Card</option>
// // //               <option value="Online Transfer">Online Transfer</option>
// // //             </select>
// // //           </div>
// // //           <div className={styles.formGroup}>
// // //             <label htmlFor="notes">Notes:</label>
// // //             <textarea id="notes" name="notes" placeholder="Enter any notes here" value={paymentData.notes} onChange={handleChange}></textarea>
// // //           </div>
// // //           <div className={styles.formActions}>
// // //             <button type="reset">Reset</button>
// // //             <button type="submit">Submit</button>
// // //           </div>
// // //         </form>
// // //       </div>

// // //       <div className={styles.receiptContainer}>
// // //         {receipt && (
// // //           <Invoice
// // //             enrollmentId={receipt.enrollmentId}
// // //             studentName={receipt.studentName}
// // //             paymentAmount={receipt.paymentAmount}
// // //             paymentMode={receipt.paymentMode}
// // //             notes={receipt.notes}
// // //             date={receipt.date}
// // //             courses={receipt.courses}
// // //             onPrint={handlePrint}
// // //             onDownload={handleDownload}
// // //             onEmail={handleEmail}
// // //             email={email}
// // //             setEmail={setEmail}
// // //           />
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default PaymentForm;
// // import React, { useState, useEffect, useCallback } from 'react';
// // import axios from 'axios';
// // import Swal from 'sweetalert2';
// // import { debounce } from 'lodash';
// // import { useLocation } from 'react-router-dom';
// // import html2canvas from 'html2canvas';
// // import jsPDF from 'jspdf';
// // import Select from 'react-select';
// // import styles from './PaymentForm.module.css';
// // import Invoice from './Invoice'; // Adjust the path as per your project structure

// // function PaymentForm() {
// //   const location = useLocation();
// //   const searchParams = new URLSearchParams(location.search);
// //   const enrollmentIdFromParams = searchParams.get('enrollmentId');

// //   const [paymentData, setPaymentData] = useState({
// //     enrollmentId: enrollmentIdFromParams ? enrollmentIdFromParams : '',
// //     studentId: '',
// //     studentName: '',
// //     courseId: '',
// //     courseName: '',
// //     paymentAmount: '',
// //     balanceAmount: '',
// //     newBalanceLeft: '',
// //     paymentMode: '',
// //     notes: '',
// //   });
// //   const [errors, setErrors] = useState({});
// //   const [receipt, setReceipt] = useState(null);
// //   const [email, setEmail] = useState('');
// //   const [enrollments, setEnrollments] = useState([]);
// //   const apiUrl = process.env.REACT_APP_API_BASE_URL;

// //   useEffect(() => {
// //     fetchEnrollments().catch(err => {
// //       Swal.fire('Error', 'Failed to fetch enrollments.', 'error');
// //     });
// //   }, []);

// //   async function fetchEnrollments() {
// //     try {
// //       const response = await axios.get(`${apiUrl}/enroll`);
// //       setEnrollments(response.data);
// //       console.log('Fetched enrollments:', response.data); // Debugging log
// //     } catch (error) {
// //       Swal.fire('Error', 'Failed to fetch enrollments.', 'error');
// //     }
// //   }

// //   useEffect(() => {
// //     if (enrollmentIdFromParams) {
// //       fetchEnrollmentById(enrollmentIdFromParams);
// //     }
// //   }, [enrollmentIdFromParams]);

// //   const fetchEnrollmentById = async (id) => {
// //     if (!id) return;
// //     try {
// //       console.log('fetchEnrollmentById called with id:', id);

// //       const response = await axios.get(`${apiUrl}/enroll/${id}`);
// //       console.log('Response is', response.data); // Debugging log
// //       const enrollment = response.data;
// //       console.log('Enrollment Id ', enrollment.enrollmentId);

// //       updatePaymentDataFromEnrollment(enrollment);
// //     } catch (error) {
// //       Swal.fire('Error', 'Failed to fetch enrollment by ID.', 'error');
// //       setPaymentData(prev => ({ ...prev, studentName: '', balanceAmount: '', newBalanceLeft: '' }));
// //     }
// //   };

// //   const updatePaymentDataFromEnrollment = (enrollment) => {
// //     const balanceAmount = enrollment?.balanceAmount?.toFixed(2) || '0.00';
// //     console.log('Setting balance amount:', balanceAmount); // Debugging log
// //     setPaymentData(prev => ({
// //       ...prev,
// //       enrollmentId: enrollment.enrollmentId || '',
// //       studentId: enrollment.studentId || '',
// //       studentName: enrollment?.student?.fullName || '',
// //       courseId: enrollment.courseId || '',
// //       courseName: enrollment.course?.name || '',
// //       balanceAmount: balanceAmount,
// //       newBalanceLeft: balanceAmount,
// //     }));
// //     console.log('Updated payment data with enrollment:', enrollment); // Debugging log
// //   };
// //   const debouncedFetchEnrollmentById = useCallback(debounce((enrollmentId) => {
// //     console.log(enrollmentId);

// //     console.log('debouncedFetchEnrollmentById called with id:', enrollmentId);
// //     fetchEnrollmentById(enrollmentId);
// //   }, 1000), []);

// //   const handleChange = async (e) => {
// //     const { name, value } = e.target || e; // Adjust to handle Select's onChange format
// //     setPaymentData(prev => ({ ...prev, [name]: value }));
// //     console.log(`Changed ${name}:`, value); // Debugging log

// //     if (name === 'paymentAmount' && value) {
// //       validatePaymentAmount(value, paymentData.balanceAmount);
// //     }

// //     if (name === 'studentId') {
// //       // Reset other fields when student changes
// //       setPaymentData(prev => ({
// //         ...prev,
// //         studentName: '',
// //         courseId: '',
// //         courseName: '',
// //         balanceAmount: '',
// //         newBalanceLeft: '',
// //         paymentAmount: ''
// //       }));
// //     }

// //     if (name === "courseId") {
// //       // Find the selected enrollment and update payment data
// //       const enrollment = enrollments.find(enrollment => enrollment.courseId === value && enrollment.studentId === paymentData.studentId);
// //       if (enrollment) {
// //         updatePaymentDataFromEnrollment(enrollment);
// //         console.log('Updated payment data with selected course:', enrollment); // Debugging log
// //       } else {
// //         // Handle case where no enrollment is found for selected course
// //         setPaymentData(prev => ({
// //           ...prev,
// //           courseId: '',
// //           courseName: '',
// //           balanceAmount: '',
// //           newBalanceLeft: '',
// //         }));
// //       }
// //     }
// //   };

// //   const validatePaymentAmount = (paymentAmount, balanceAmount) => {
// //     const paymentAmountFloat = parseFloat(paymentAmount);
// //     const balanceAmountFloat = parseFloat(balanceAmount);
// //     const newBalanceLeft = balanceAmountFloat - paymentAmountFloat;

// //     if (newBalanceLeft < 0) {
// //       setErrors(prev => ({ ...prev, paymentAmountError: 'Payment amount cannot exceed the balance amount.' }));
// //     } else {
// //       setErrors(prev => ({ ...prev, paymentAmountError: '' }));
// //       console.log('Setting new balance left:', newBalanceLeft.toFixed(2)); // Debugging log
// //       setPaymentData(prev => ({ ...prev, newBalanceLeft: newBalanceLeft.toFixed(2) }));
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (errors.paymentAmountError) {
// //       Swal.fire('Error', errors.paymentAmountError, 'error');
// //       return;
// //     }

// //     try {
// //       await axios.post(`${apiUrl}/payments`, {
// //         enrollmentId: paymentData.enrollmentId,
// //         amount: parseFloat(paymentData.paymentAmount),
// //         paymentMethod: paymentData.paymentMode,
// //         notes: paymentData.notes,
// //       });

// //       const receiptData = {
// //         enrollmentId: paymentData.enrollmentId,
// //         studentName: paymentData.studentName,
// //         courseName: paymentData.courseName,
// //         paymentAmount: paymentData.paymentAmount,
// //         paymentMode: paymentData.paymentMode,
// //         notes: paymentData.notes,
// //         date: new Date().toLocaleString(),
// //         courses: [
// //           { name: paymentData.courseName, totalFees: '$1000', amountPaid: paymentData.paymentAmount, pendingFees: (1000 - parseFloat(paymentData.paymentAmount)).toFixed(2) },
// //           // Add more courses as needed
// //         ]
// //       };

// //       setReceipt(receiptData);

// //       Swal.fire('Success', 'Payment submitted successfully!', 'success');
// //     } catch (error) {
// //       Swal.fire('Error', 'Failed to submit payment.', 'error');
// //     }
// //   };

// //   const handlePrint = async () => {
// //     const element = document.getElementById('receipt');
// //     const canvas = await html2canvas(element);
// //     const imgData = canvas.toDataURL('image/png');
// //     const pdf = new jsPDF({
// //       format: 'a4'
// //     });
// //     pdf.addImage(imgData, 'PNG', 10, 10);
// //     const pdfBlob = pdf.output('blob');
// //     const url = URL.createObjectURL(pdfBlob);
// //     window.open(url, '_blank');
// //   };

// //   const handleDownload = async () => {
// //     const element = document.getElementById('receipt');
// //     const canvas = await html2canvas(element);
// //     const imgData = canvas.toDataURL('image/png');
// //     const pdf = new jsPDF({
// //       format: 'a4'
// //     });
// //     pdf.addImage(imgData, 'PNG', 10, 10);
// //     pdf.save('receipt.pdf');
// //   };

// //   const handleEmail = async () => {
// //     const element = document.getElementById('receipt');
// //     const canvas = await html2canvas(element);
// //     const imgData = canvas.toDataURL('image/png');
// //     const pdf = new jsPDF({
// //       format: 'a4'
// //     });
// //     pdf.addImage(imgData, 'PNG', 10, 10);
// //     const pdfBase64 = pdf.output('datauristring').split(',')[1]; // Get base64 string of PDF

// //     try {
// //       const response = await axios.post(`${apiUrl}/send-email`, {
// //         to: email,
// //         subject: 'Payment Receipt',
// //         text: 'Please find attached the payment receipt.',
// //         pdfBase64: pdfBase64
// //       });

// //       console.log('Email sent:', response.data); // Log response for debugging

// //       Swal.fire('Success', 'Email sent successfully!', 'success');
// //     } catch (error) {
// //       console.error('Failed to send email:', error); // Log detailed error for debugging
// //       Swal.fire('Error', 'Failed to send email.', 'error');
// //     }
// //   };

// //   const uniqueStudents = enrollments.reduce((acc, curr) => {
// //     if (!acc.find(student => student.studentId === curr.studentId)) {
// //       acc.push({ studentId: curr.studentId, studentName: curr.student.fullName });
// //     }
// //     return acc;
// //   }, []);

// //   const filteredEnrollments = paymentData.studentId
// //     ? enrollments.filter(enrollment => enrollment.studentId === paymentData.studentId)
// //     : [];

// //   const studentOptions = uniqueStudents.map(student => ({
// //     value: student.studentId,
// //     label: student.studentName
// //   }));

// //   return (
// //     <div className={styles.container}>
// //       <div className={styles.formContainer}>
// //         <h2>Payment Form</h2>
// //         <form onSubmit={handleSubmit}>
// //           <div className={styles.formGroup}>
// //             <label htmlFor="studentId">Student Name:</label>
// //             <Select
// //               id="studentId"
// //               name="studentId"
// //               options={studentOptions}
// //               onChange={(selectedOption) => {
// //                 handleChange({ name: 'studentId', value: selectedOption.value });
// //               }}
// //               value={studentOptions.find(option => option.value === paymentData.studentId) || null}
// //               placeholder="Type to search..."
// //             />
// //           </div>
// //           {filteredEnrollments.length > 0 && (
// //             <div className={styles.formGroup}>
// //               <label htmlFor="courseId">Course:</label>
// //               <select id="courseId" name="courseId" value={paymentData.courseId} onChange={(e) => {
// //                 handleChange(e);
// //                 debouncedFetchEnrollmentById(paymentData.enrollmentId);
// //               }}>
// //                 <option value="">Select Course</option>
// //                 {filteredEnrollments.map(enrollment => (
// //                   <option key={enrollment.courseId} value={enrollment.courseId}>{enrollment.course.name}</option>
// //                 ))}
// //               </select>
// //             </div>
// //           )}
// //           <div className={styles.formGroup}>
// //             <label htmlFor="paymentAmount">Payment Amount:</label>
// //             <input type="number" id="paymentAmount" name="paymentAmount" placeholder="Enter Payment Amount" value={paymentData.paymentAmount} onChange={handleChange} />
// //             {errors.paymentAmountError && <div className={styles.errorMessage}>{errors.paymentAmountError}</div>}
// //           </div>
// //           <div className={styles.formGroup}>
// //             <label htmlFor="balanceAmount">Balance Amount:</label>
// //             <input type="text" id="balanceAmount" name="balanceAmount" placeholder="Balance Amount" value={paymentData.balanceAmount} disabled />
// //           </div>
// //           <div className={styles.formGroup}>
// //             <label htmlFor="newBalanceLeft">New Balance Left:</label>
// //             <input type="text" id="newBalanceLeft" name="newBalanceLeft" placeholder="New Balance Left" value={paymentData.newBalanceLeft} disabled />
// //           </div>
// //           <div className={styles.formGroup}>
// //             <label htmlFor="paymentMode">Payment Mode:</label>
// //             <select id="paymentMode" name="paymentMode" value={paymentData.paymentMode} onChange={handleChange}>
// //               <option value="">Select Payment Mode</option>
// //               <option value="Cash">Cash</option>
// //               <option value="Credit Card">Credit Card</option>
// //               <option value="Debit Card">Debit Card</option>
// //               <option value="Online Transfer">Online Transfer</option>
// //             </select>
// //           </div>
// //           <div className={styles.formGroup}>
// //             <label htmlFor="notes">Notes:</label>
// //             <textarea id="notes" name="notes" placeholder="Enter any notes here" value={paymentData.notes} onChange={handleChange}></textarea>
// //           </div>
// //           <div className={styles.formActions}>
// //             <button type="reset">Reset</button>
// //             <button type="submit">Submit</button>
// //           </div>
// //         </form>
// //       </div>

// //       <div className={styles.receiptContainer}>
// //         {receipt && (
// //           <Invoice
// //             enrollmentId={receipt.enrollmentId}
// //             studentName={receipt.studentName}
// //             paymentAmount={receipt.paymentAmount}
// //             paymentMode={receipt.paymentMode}
// //             notes={receipt.notes}
// //             date={receipt.date}
// //             courses={receipt.courses}
// //             onPrint={handlePrint}
// //             onDownload={handleDownload}
// //             onEmail={handleEmail}
// //             email={email}
// //             setEmail={setEmail}
// //           />
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default PaymentForm;


// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { debounce } from 'lodash';
// import { useLocation,useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import Select from 'react-select';
// import styles from './PaymentForm.module.css';
// import Invoice from './Invoice'; // Adjust the path as per your project structure
// let selectedStudent = null;
// let address = null;


// function PaymentForm() {
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const { paymentId } = useParams(); // Get paymentId from URL params

//   const enrollmentIdFromParams = searchParams.get('enrollmentId');

//   const [paymentData, setPaymentData] = useState({
//     enrollmentId: enrollmentIdFromParams ? enrollmentIdFromParams : '',
//     studentId: '',
//     studentName: '',
//     address:'',
//     courseId: '',
//     courseName: '',
//     paymentAmount: '',
//     balanceAmount: '',
//     newBalanceLeft: '',
//     paymentMode: '',
//     notes: '',
//   });
//   const [errors, setErrors] = useState({});
//   const [receipt, setReceipt] = useState(null);
//   const [email, setEmail] = useState('');
//   const [enrollments, setEnrollments] = useState([]);
//   const apiUrl = process.env.REACT_APP_API_BASE_URL;
  // const navigate = useNavigate();

//   useEffect(() => {
//     const fetchEnrollments = async () => {
//       try {
//         const response = await axios.get(`${apiUrl}/enroll`);
//         setEnrollments(response.data);
//         // console.log('Fetched enrollments:', response.data); // Debugging log
//       } catch (error) {
//         Swal.fire('Error', 'Failed to fetch enrollments.', 'error');
//       }
//     };

//     fetchEnrollments();
//   }, [apiUrl]);

//   useEffect(() => {
//     if (enrollmentIdFromParams) {
//       fetchEnrollmentById(enrollmentIdFromParams);
//     }
//   }, [enrollmentIdFromParams]);

//   const fetchEnrollmentById = useCallback(async (id) => {
//     if (!id) return;
//     try {
//       console.log('fetchEnrollmentById called with id:', id);

//       const response = await axios.get(`${apiUrl}/enroll/${id}`);
//       const enrollment = response.data;

//       updatePaymentDataFromEnrollment(enrollment);
//     } catch (error) {
//       console.error('Failed to fetch enrollment by ID:', error); // Detailed error log
//       Swal.fire('Error', 'Failed to fetch enrollment by ID.', 'error');
//       setPaymentData(prev => ({ ...prev, studentName: '', balanceAmount: '', newBalanceLeft: '' }));
//     }
//   }, [apiUrl]);
//   useEffect(() => {
//     if (paymentId) {
//       fetchPaymentDetails(paymentId);
//     }
//   }, [paymentId]);

//   const fetchPaymentDetails = useCallback(async (id) => {
//     try {
//       const response = await axios.get(`${apiUrl}/payments/${id}`);
//       const payment = response.data;
//       console.log(payment);
//       updateFormWithPayment(payment);
//     } catch (error) {
//       console.error('Failed to fetch payment details:', error);
//       Swal.fire('Error', 'Failed to fetch payment details.', 'error');
//     }
//   }, [apiUrl]);
//   const updateFormWithPayment = (payment) => {
//     setPaymentData({
//       enrollmentId: payment.enrollmentId || '',
//       studentId: payment.studentId || '',
//       studentName: payment.studentName || '',
//       address:payment.address || '',
//       courseId: payment.courseId || '',
//       courseName: payment.courseName || '',
//       paymentAmount: payment.amount || '',
//       balanceAmount: payment.balance || '',
//       newBalanceLeft: payment.balanceAmount || '', // Assuming the same balance for simplicity
//       paymentMode: payment.paymentMode || '',
//       notes: payment.notes || '',
//     });
//   };
//   const updatePaymentDataFromEnrollment = (enrollment) => {
//     const balanceAmount = enrollment?.balanceAmount?.toFixed(2) || '0.00';
//     address=enrollment.address;
//     console.log('Setting balance amount:', balanceAmount); // Debugging log
//     setPaymentData(prev => ({
//       ...prev,
//       enrollmentId: enrollment.enrollmentId || '',
//       studentId: enrollment.studentId || '',
//       studentName: enrollment?.student?.fullName || '',
//       courseId: enrollment.courseId || '',
//       courseName: enrollment.course?.name || '',
//       balanceAmount: balanceAmount,
//       newBalanceLeft: balanceAmount,
//       address: address||''
//     }));
//     console.log('Updated payment data with enrollment:', enrollment); // Debugging log
//     console.log('Updated payment data with Address:', address); // Debugging log

//   };

//   const debouncedFetchEnrollmentById = useCallback(debounce((enrollmentId) => {
//     console.log('debouncedFetchEnrollmentById called with id:', enrollmentId);
//     fetchEnrollmentById(enrollmentId);
//   }, 500), [fetchEnrollmentById]);

//   const handleChange = (e) => {
//     const { name, value } = e.target || e; // Adjust to handle Select's onChange format
//     // setPaymentData(prev => ({ ...prev, [name]: value }));
//     // console.log(`Changed ${name}:`, value); // Debugging log

//     // if (name === 'paymentAmount' && value) {
//     //   validatePaymentAmount(value, paymentData.balanceAmount);
//     // }


//     console.log(`Handling change for ${name} with value: ${value}`);

//     if (name === 'paymentAmount') {
//       console.log('Updating payment amount...');
  
//       const newAmount = parseFloat(value);
//       const previousAmount = parseFloat(paymentData.previousPaymentAmount);
//       let newBalanceAmount = parseFloat(paymentData.balanceAmount);
  
//       console.log(`Handling change for ${name} with value: ${value}`);

//       if (name === 'paymentAmount') {
//         console.log('Updating payment amount...');
    
//         const newAmount = parseFloat(value);
//         const previousAmount = parseFloat(paymentData.paymentAmount); // Use paymentData.paymentAmount for previous amount
    
//         let newBalanceAmount = parseFloat(paymentData.balanceAmount);
    
//         console.log(`New amount: ${newAmount}, Previous amount: ${previousAmount}, Current balance: ${newBalanceAmount}`);
    
//         if (!isNaN(newAmount) && !isNaN(previousAmount)) {
//           if (newAmount > previousAmount) {
//             newBalanceAmount -= newAmount - previousAmount;
//           } else if (newAmount < previousAmount) {
//             newBalanceAmount += previousAmount - newAmount;
//           }
    
//           const updatedBalanceAmount = newBalanceAmount.toFixed(2);
//           const updatedNewBalanceLeft = updatedBalanceAmount;
    
//           console.log(`Updated balance amount: ${updatedBalanceAmount}`);
//           console.log(`Updated new balance left: ${updatedNewBalanceLeft}`);
    
//           setPaymentData((prev) => ({
//             ...prev,
//             [name]: value,
//             balanceAmount: updatedBalanceAmount,
//             newBalanceLeft: updatedNewBalanceLeft,
//           }));
//         } else {
//           console.log('Invalid amount entered. Keeping current values.');
    
//           setPaymentData((prev) => ({
//             ...prev,
//             [name]: value,
//             balanceAmount: paymentData.balanceAmount,
//             newBalanceLeft: paymentData.newBalanceLeft,
//           }));
//         }
//       } else {
//         console.log(`Updating ${name} with value: ${value}`);
    
//         setPaymentData((prev) => ({
//           ...prev,
//           [name]: value,
//         }));
//       }
    
//       console.log('Payment data after update:', paymentData);
//     }
//     // console.log(`Changed ${name}:`, value); // Debugging log
//     if (name === 'studentId') {
//       // Reset other fields when student changes
//      selectedStudent = studentOptions.find(option => option.value === value).label;

//       setPaymentData(prev => ({
//         ...prev,
//         courseId: '',
//         courseName: '',
//         balanceAmount: '',
//         newBalanceLeft: '',
//         paymentAmount: '',
//         studentId: value,
//         studentName: studentOptions.find(option => option.value === value).label,
//         address:''
//       }));
//       console.log('Selected student:', value, selectedStudent); // Log selected student for debugging

//     }

//     if (name === 'courseId') {
//       // Find the selected enrollment and update payment data
//       const enrollment = enrollments.find(enrollment => enrollment.courseId === value && enrollment.studentId === paymentData.studentId);
//       if (enrollment) {
//         updatePaymentDataFromEnrollment(enrollment);
//         console.log('Updated payment data with selected course:', enrollment); // Debugging log
//         debouncedFetchEnrollmentById(enrollment.enrollmentId);
//       } else {
//         // Handle case where no enrollment is found for selected course
//         setPaymentData(prev => ({
//           ...prev,
//           courseId: '',
//           courseName: '',
//           balanceAmount: '',
//           newBalanceLeft: '',
//           address:''
//         }));
//       }
//     }
//   };

//   const validatePaymentAmount = (paymentAmount, balanceAmount) => {
//     const paymentAmountFloat = parseFloat(paymentAmount);
//     const balanceAmountFloat = parseFloat(balanceAmount);
//     const newBalanceLeft = balanceAmountFloat - paymentAmountFloat;

//     if (newBalanceLeft < 0) {
//       setErrors(prev => ({ ...prev, paymentAmountError: 'Payment amount cannot exceed the balance amount.' }));
//     } else {
//       setErrors(prev => ({ ...prev, paymentAmountError: '' }));
//       console.log('Setting new balance left:', newBalanceLeft.toFixed(2)); // Debugging log
//       setPaymentData(prev => ({ ...prev, newBalanceLeft: newBalanceLeft.toFixed(2) }));
//     }
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   if (errors.paymentAmountError) {
//   //     Swal.fire('Error', errors.paymentAmountError, 'error');
//   //     return;
//   //   }

//   //   try {
//   //     await axios.post(`${apiUrl}/payments`, {
//   //       enrollmentId: paymentData.enrollmentId,
//   //       amount: parseFloat(paymentData.paymentAmount),
//   //       paymentMethod: paymentData.paymentMode,
//   //       notes: paymentData.notes,
//   //     });

//   //     const receiptData = {
//   //       enrollmentId: paymentData.enrollmentId,
//   //       studentName: selectedStudent,
//   //       courseName: paymentData.courseName,
//   //       address:paymentData.address,
//   //       paymentAmount: paymentData.paymentAmount,
//   //       paymentMode: paymentData.paymentMode,
//   //       balanceAmount:paymentData.balanceAmount,
//   //       notes: paymentData.notes,
//   //       date: new Date().toLocaleString(),
//   //       courses: [
//   //         { name: paymentData.courseName, totalFees: '$1000', amountPaid: paymentData.paymentAmount, pendingFees: (1000 - parseFloat(paymentData.paymentAmount)).toFixed(2) },
//   //         // Add more courses as needed
//   //       ]
//   //     };

//   //     setReceipt(receiptData);

//   //     Swal.fire('Success', 'Payment submitted successfully!', 'success');
//   //   } catch (error) {
//   //     console.error('Failed to submit payment:', error); // Detailed error log
//   //     Swal.fire('Error', 'Failed to submit payment.', 'error');
//   //   }
//   // };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   if (errors.paymentAmountError) {
//   //     Swal.fire('Error', errors.paymentAmountError, 'error');
//   //     return;
//   //   }
  
//   //   try {
//   //     if (paymentId) {
//   //       // Update existing payment with PATCH request
//   //       await axios.patch(`${apiUrl}/payments/${paymentId}`, {
//   //         enrollmentId: paymentData.enrollmentId,
//   //         amount: parseFloat(paymentData.paymentAmount),
//   //         paymentMethod: paymentData.paymentMode,
//   //         notes: paymentData.notes,
//   //       });
  
//   //       Swal.fire('Success', 'Payment updated successfully!', 'success');
//   //     } else {
//   //       // Create new payment with POST request
//   //       const response = await axios.post(`${apiUrl}/payments`, {
//   //         enrollmentId: paymentData.enrollmentId,
//   //         amount: parseFloat(paymentData.paymentAmount),
//   //         paymentMethod: paymentData.paymentMode,
//   //         notes: paymentData.notes,
//   //       });
  
//   //       // Assuming the backend returns the created payment ID in response.data
//   //       const newPaymentId = response.data.paymentId;
  
//   //       Swal.fire('Success', 'Payment submitted successfully!', 'success');
  
//   //       // Navigate to the newly created payment details page
//   //       navigate(`/payments/${newPaymentId}`);
//   //     }
  
//   //     const receiptData = {
//   //       enrollmentId: paymentData.enrollmentId,
//   //       studentName: paymentData.studentName,
//   //       address: paymentData.address,
//   //       paymentAmount: paymentData.paymentAmount,
//   //       paymentMode: paymentData.paymentMode,
//   //       balanceAmount: paymentData.balanceAmount,
//   //       notes: paymentData.notes,
//   //       date: new Date().toLocaleString(),
//   //       courses: [
//   //         { name: paymentData.courseName, totalFees: '$1000', amountPaid: paymentData.paymentAmount, pendingFees: (1000 - parseFloat(paymentData.paymentAmount)).toFixed(2) },
//   //         // Add more courses as needed
//   //       ]
//   //     };
  
//   //     setReceipt(receiptData);
  
//   //   } catch (error) {
//   //     console.error('Failed to submit/update payment:', error);
//   //     Swal.fire('Error', 'Failed to submit/update payment.', 'error');
//   //   }
//   // };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (errors.paymentAmountError) {
//       Swal.fire('Error', errors.paymentAmountError, 'error');
//       return;
//     }

//     try {
//       const newAmount = parseFloat(paymentData.paymentAmount);
//       const previousAmount = parseFloat(paymentData.previousPaymentAmount);
//       let newBalanceAmount = parseFloat(paymentData.balanceAmount);

//       if (paymentId) {
//         // Calculate new balance amount
//         if (newAmount > previousAmount) {
//           newBalanceAmount -= (newAmount - previousAmount);
//         } else if (newAmount < previousAmount) {
//           newBalanceAmount += (previousAmount - newAmount);
//         }

//         // Update existing payment with PATCH request
//         await axios.patch(`${apiUrl}/payments/${paymentId}`, {
//           enrollmentId: paymentData.enrollmentId,
//           amount: newAmount,
//           paymentMethod: paymentData.paymentMode,
//           notes: paymentData.notes,
//           balanceAmount: newBalanceAmount, // Update balance amount
//         });

//         Swal.fire('Success', 'Payment updated successfully!', 'success');
//       } else {
//         // Create new payment with POST request
//         const response = await axios.post(`${apiUrl}/payments`, {
//           enrollmentId: paymentData.enrollmentId,
//           amount: newAmount,
//           paymentMethod: paymentData.paymentMode,
//           notes: paymentData.notes,
//         });

//         // Assuming the backend returns the created payment ID in response.data
//         const newPaymentId = response.data.paymentId;

//         Swal.fire('Success', 'Payment submitted successfully!', 'success');

//         // Navigate to the newly created payment details page
//         navigate(`/payments/${newPaymentId}`);
//       }

//       setPaymentData(prev => ({
//         ...prev,
//         balanceAmount: newBalanceAmount,
//         newBalanceLeft: newBalanceAmount,
//       }));

//       const receiptData = {
//         enrollmentId: paymentData.enrollmentId,
//         studentName: paymentData.studentName,
//         address: paymentData.address,
//         paymentAmount: newAmount,
//         paymentMode: paymentData.paymentMode,
//         balanceAmount: newBalanceAmount,
//         notes: paymentData.notes,
//         date: new Date().toLocaleString(),
//         courses: [
//           { name: paymentData.courseName, totalFees: '$1000', amountPaid: newAmount, pendingFees: (1000 - newAmount).toFixed(2) },
//           // Add more courses as needed
//         ]
//       };

//       setReceipt(receiptData);

//     } catch (error) {
//       console.error('Failed to submit/update payment:', error);
//       Swal.fire('Error', 'Failed to submit/update payment.', 'error');
//     }
//   };

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

//   const handleDownload = async () => {
//     const element = document.getElementById('receipt');
//     const canvas = await html2canvas(element);
//     const imgData = canvas.toDataURL('image/png');
//     const pdf = new jsPDF({
//       format: 'a4'
//     });
//     pdf.addImage(imgData, 'PNG', 10, 10);
//     pdf.save('receipt.pdf');
//   };

//   const handleEmail = async () => {
//     const element = document.getElementById('receipt');
//     const canvas = await html2canvas(element);
//     const imgData = canvas.toDataURL('image/png');
//     const pdf = new jsPDF({
//       format: 'a4'
//     });
//     pdf.addImage(imgData, 'PNG', 10, 10);
//     const pdfBase64 = pdf.output('datauristring').split(',')[1]; // Get base64 string of PDF

//     try {
//       const response = await axios.post(`${apiUrl}/send-email`, {
//         to: email,
//         subject: 'Payment Receipt',
//         text: 'Please find attached the payment receipt.',
//         pdfBase64: pdfBase64
//       });

//       console.log('Email sent:', response.data); // Log response for debugging

//       Swal.fire('Success', 'Email sent successfully!', 'success');
//     } catch (error) {
//       console.error('Failed to send email:', error); // Log detailed error for debugging
//       Swal.fire('Error', 'Failed to send email.', 'error');
//     }
//   };

//   const uniqueStudents = enrollments.reduce((acc, curr) => {
//     if (!acc.find(student => student.studentId === curr.studentId)) {
//       acc.push({ studentId: curr.studentId, studentName: curr.student.fullName });
//     }
//     return acc;
//   }, []);

//   const filteredEnrollments = paymentData.studentId
//     ? enrollments.filter(enrollment => enrollment.studentId === paymentData.studentId)
//     : [];

//   const studentOptions = uniqueStudents.map(student => ({
//     value: student.studentId,
//     label: student.studentName
//   }));

//   return (
//     <div className={styles.container}>
//       <div className={styles.formContainer}>
//         <h2>Payment Form</h2>
//         <form onSubmit={handleSubmit}>
//           <div className={styles.formGroup}>
//             <label htmlFor="studentId">Student Name:</label>
//             <Select
//               id="studentId"
//               name="studentId"
//               options={studentOptions}
//               onChange={(selectedOption) => {
//                 handleChange({ name: 'studentId', value: selectedOption.value });
//               }}
//               value={studentOptions.find(option => option.value === paymentData.studentId) || null}
//               placeholder="Type to search..."
//             />
//           </div>
//           {filteredEnrollments.length > 0 && (
//             <div className={styles.formGroup}>
//               <label htmlFor="courseId">Course:</label>
//               <select id="courseId" name="courseId" value={paymentData.courseId} onChange={(e) => {
//                 handleChange(e);
//               }}>
//                 <option value="">Select Course</option>
//                 {filteredEnrollments.map(enrollment => (
//                   <option key={enrollment.courseId} value={enrollment.courseId}>{enrollment.course.name}</option>
//                 ))}
//               </select>
//             </div>
//           )}
//           <div className={styles.formGroup}>
//             <label htmlFor="paymentAmount">Payment Amount:</label>
//             <input type="number" id="paymentAmount" name="paymentAmount" placeholder="Enter Payment Amount" value={paymentData.paymentAmount} onChange={handleChange} />
//             {errors.paymentAmountError && <div className={styles.errorMessage}>{errors.paymentAmountError}</div>}
//           </div>
//           <div className={styles.formGroup}>
//             <label htmlFor="balanceAmount">Balance Amount:</label>
//             <input type="text" id="balanceAmount" name="balanceAmount" placeholder="Balance Amount" value={paymentData.balanceAmount} disabled />
//           </div>
//           <div className={styles.formGroup}>
//             <label htmlFor="newBalanceLeft">New Balance Left:</label>
//             <input type="text" id="newBalanceLeft" name="newBalanceLeft" placeholder="New Balance Left" value={paymentData.newBalanceLeft} disabled />
//           </div>
//           <div className={styles.formGroup}>
//             <label htmlFor="paymentMode">Payment Mode:</label>
//             <select id="paymentMode" name="paymentMode" value={paymentData.paymentMode} onChange={handleChange}>
//               <option value="">Select Payment Mode</option>
//               <option value="Cash">Cash</option>
//               <option value="Credit Card">Credit Card</option>
//               <option value="Debit Card">Debit Card</option>
//               <option value="Online Transfer">Online Transfer</option>
//             </select>
//           </div>
//           <div className={styles.formGroup}>
//             <label htmlFor="notes">Notes:</label>
//             <textarea id="notes" name="notes" placeholder="Enter any notes here" value={paymentData.notes} onChange={handleChange}></textarea>
//           </div>
//           <div className={styles.formActions}>
//             <button type="reset">Reset</button>
//             <button type="submit">Submit</button>
//           </div>
//         </form>
//       </div>

//       <div className={styles.receiptContainer}>
//         {receipt && (
//           <Invoice
//             enrollmentId={receipt.enrollmentId}
//             studentName={receipt.studentName}
//             address={receipt.address}

//             paymentAmount={receipt.paymentAmount}
//             balanceAmount={receipt.balanceAmount}

//             paymentMode={receipt.paymentMode}
//             notes={receipt.notes}
//             date={receipt.date}
//             courses={receipt.courses}
//             onPrint={handlePrint}
//             onDownload={handleDownload}
//             onEmail={handleEmail}
//             email={email}
//             setEmail={setEmail}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// export default PaymentForm;


// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { debounce } from 'lodash';
// import { useLocation ,useParams,useNavigate} from 'react-router-dom';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import Select from 'react-select';
// import styles from './PaymentForm.module.css';
// import Invoice from './Invoice'; // Adjust the path as per your project structure
// let selectedStudent = null;
// let address = null;


// function PaymentForm() {
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const { enrollmentId } = useParams(); // Get paymentId from URL params
  
//   const enrollmentIdFromParams = searchParams.get('enrollmentId');
//   const paymentIdFromParams = searchParams.get('paymentId');
//   const { paymentId } = useParams(); // Get paymentId from URL params
//   const navigate = useNavigate();
//   const [initialPaymentAmount, setInitialPaymentAmount] = useState(0);

//   const [paymentData, setPaymentData] = useState({
//     enrollmentId: enrollmentIdFromParams ? enrollmentIdFromParams : '',
//     studentId: '',
//     studentName: '',
//     address:'',
//     courseId: '',
//     courseName: '',
//     paymentAmount: '',
//     balanceAmount: '',
//     newBalanceLeft: '',
//     paymentMode: '',
//     notes: '',
//     paymentId: paymentIdFromParams || '',

//   });
//   const [errors, setErrors] = useState({});
//   const [receipt, setReceipt] = useState(null);
//   const [email, setEmail] = useState('');
//   const [enrollments, setEnrollments] = useState([]);
//   const apiUrl = process.env.REACT_APP_API_BASE_URL;

//   useEffect(() => {
//     const fetchEnrollments = async () => {
//       try {
//         const response = await axios.get(`${apiUrl}/enroll`);
//         setEnrollments(response.data);
//         // console.log('Fetched enrollments:', response.data); // Debugging log
//       } catch (error) {
//         Swal.fire('Error', 'Failed to fetch enrollments.', 'error');
//       }
//     };

//     fetchEnrollments();
//   }, [apiUrl]);

// //   useEffect(() => {
// //     if (paymentId) {
// //         // Assuming you fetch payment data from an API or props
// //         const fetchedPaymentData = { /* fetched payment data */ };
// //         setPaymentData(fetchedPaymentData);
// //         setInitialPaymentAmount(parseFloat(fetchedPaymentData.paymentAmount || 0));
// //     }
// // }, [paymentId]);

//   // useEffect(() => {
//   //   if (paymentId) {
//   //     fetchPaymentDetails(paymentId);
//   //   }
//   // }, [paymentId]);
//   useEffect(() => {
//     if (enrollmentIdFromParams) {
//       fetchEnrollmentById(enrollmentIdFromParams);
//     }
//   }, [enrollmentIdFromParams]);

//   const fetchEnrollmentById = useCallback(async (id) => {
//     if (!id) return;
//     try {
//       console.log('fetchEnrollmentById called with id:', id);

//       const response = await axios.get(`${apiUrl}/enroll/${id}`);
//       const enrollment = response.data;
//       console.log(`Enrollment is ${enrollment}`)

//       updatePaymentDataFromEnrollment(enrollment);
//     } catch (error) {
//       console.error('Failed to fetch enrollment by ID:', error); // Detailed error log
//       Swal.fire('Error', 'Failed to fetch enrollment by ID.', 'error');
//       setPaymentData(prev => ({ ...prev, studentName: '', balanceAmount: '', newBalanceLeft: '' }));
//     }
//   }, [apiUrl]);


//   // const fetchPaymentDetails = useCallback(async (id) => {
//   //   try {
//   //     const response = await axios.get(`${apiUrl}/payments/${id}`);
//   //     const payment = response.data;

      

//   //     updateFormWithPayment(payment);
//   //   fetchEnrollmentById(payment.enrollmentId);

//   //   } catch (error) {
//   //     console.error('Failed to fetch payment details:', error);
//   //     Swal.fire('Error', 'Failed to fetch payment details.', 'error');
//   //   }
//   // }, [apiUrl,    fetchEnrollmentById]);


//   // const updateFormWithPayment = (payment ) => {

//   //   setPaymentData({
//   //     enrollmentId: payment.enrollmentId || '',
//   //     studentId: payment.studentId || '',
//   //     studentName: payment.studentName || '',
//   //     address:payment.address || '',
//   //     courseId: payment.courseId || '',
//   //     courseName: payment.courseName || '',
//   //     paymentAmount: payment.amount || '',
//   //     balanceAmount: parseInt(payment.balance) + parseInt(payment.amount) || 0,
//   //     newBalanceLeft: payment.balanceAmount || '', // Assuming the same balance for simplicity
//   //     paymentMode: payment.paymentMode || '',
//   //     notes: payment.notes || '',
      
//   //   });
//   // };


//   const updatePaymentDataFromEnrollment = (enrollment) => {
//     let balanceAmount;
//     // if(paymentId){
//     //    balanceAmount = 2000;

//     // }else{
//        balanceAmount = enrollment?.balanceAmount?.toFixed(2) || '0.00';
    
//     // const balanceAmount = enrollment?.balanceAmount?.toFixed(2) || '0.00';
//     address=enrollment.address;
//     console.log('Setting balance amount:', balanceAmount); // Debugging log
//     setPaymentData(prev => ({
//       ...prev,
//       enrollmentId: enrollment.enrollmentId || '',
//       studentId: enrollment.studentId || '',
//       studentName: enrollment?.student?.fullName || '',
//       courseId: enrollment.courseId || '',
//       courseName: enrollment.course?.name || '',
//       balanceAmount: balanceAmount,
//       newBalanceLeft: balanceAmount,
//       address: address||''
//     }));
//     console.log('Updated payment data with enrollment:', enrollment); // Debugging log
//     console.log('Updated payment data with Address:', address); // Debugging log

//   };

//   const debouncedFetchEnrollmentById = useCallback(debounce((enrollmentId) => {
//     console.log('debouncedFetchEnrollmentById called with id:', enrollmentId);
//     fetchEnrollmentById(enrollmentId);
//   }, 500), [fetchEnrollmentById]);

//   const handleChange = (e) => {
//     const { name, value } = e.target || e; // Adjust to handle Select's onChange format
//     setPaymentData(prev => ({ ...prev, [name]: value }));
//     console.log(`Changed ${name}:`, value); // Debugging log
//     if (name === 'paymentAmount' && value === '') 
//      {
//         // If paymentAmount is empty, reset newBalanceLeft
//         setPaymentData(prev => ({ ...prev, newBalanceLeft: paymentData.balanceAmount }));
//     }
    
    
  
//     if (name === 'paymentAmount' && value) {
      

//       validatePaymentAmount(value, paymentData.balanceAmount);
//     }

//     if (name === 'studentId') {
//       // Reset other fields when student changes
//      selectedStudent = studentOptions.find(option => option.value === value).label;

//       setPaymentData(prev => ({
//         ...prev,
//         courseId: '',
//         courseName: '',
//         balanceAmount: '',
//         newBalanceLeft: '',
//         paymentAmount: '',
//         studentId: value,
//         studentName: studentOptions.find(option => option.value === value).label,
//         address:''
//       }));
//       console.log('Selected student:', value, selectedStudent); // Log selected student for debugging

//     }


//     if (name === 'courseId') {
//       // Find the selected enrollment and update payment data
//       const enrollment = enrollments.find(enrollment => enrollment.courseId === value && enrollment.studentId === paymentData.studentId);
//       if (enrollment) {
//         updatePaymentDataFromEnrollment(enrollment);
//         console.log('Updated payment data with selected course:', enrollment); // Debugging log
//         debouncedFetchEnrollmentById(enrollment.enrollmentId);
//       } else {
//         // Handle case where no enrollment is found for selected course
//         setPaymentData(prev => ({
//           ...prev,
//           courseId: '',
//           courseName: '',
//           balanceAmount: '',
//           newBalanceLeft: '',
//           address:''
//         }));
//       }
//     }



//   };



//   // const handleChange = (e) => {
//   //   const { name, value } = e.target || e; // Adjust to handle Select's onChange format
//   //   console.log(`Changed ${name}:`, value); // Debugging log
  
//   //   setPaymentData(prev => ({ ...prev, [name]: value }));
  
//   //   if (name === 'paymentAmount') {
//   //     if (value === '') {
//   //       // If paymentAmount is cleared, reset the newBalanceLeft to the original balanceAmount
//   //       const originalBalance = paymentData.balanceAmount ? parseFloat(paymentData.balanceAmount) : 0;
//   //       setPaymentData(prev => ({ ...prev, newBalanceLeft: originalBalance.toFixed(2) }));
//   //       return;
//   //     }
  
//   //     const newAmount = parseFloat(value);
//   //     const balanceAmount = parseFloat(paymentData.balanceAmount);
  
//   //     if (paymentId) {
//   //       const previousAmount = paymentData.paymentAmount ? parseFloat(paymentData.paymentAmount) : 0;
//   //       let newBalanceLeft = balanceAmount;
  
//   //       let newBalanceAmount = balanceAmount;

//   //       if (newAmount > previousAmount) {
//   //         newBalanceLeft -= (newAmount - previousAmount);
//   //         newBalanceAmount -= (newAmount - previousAmount);
//   //       } else if (newAmount < previousAmount) {
//   //         newBalanceLeft += (previousAmount - newAmount);
//   //         newBalanceAmount += (previousAmount - newAmount);
//   //       }
//   //       setPaymentData(prev => ({
//   //         ...prev,
//   //         newBalanceLeft: newBalanceLeft.toFixed(2),
//   //         balanceAmount: balanceAmount.toFixed(2),
//   //       }));
//   //     } else {
//   //       validatePaymentAmount(value, balanceAmount);
//   //     }
//   //   }
  
//   //   if (name === 'studentId') {
//   //     // Reset other fields when student changes
//   //     const selectedStudent = studentOptions.find(option => option.value === value).label;
  
//   //     setPaymentData(prev => ({
//   //       ...prev,
//   //       courseId: '',
//   //       courseName: '',
//   //       balanceAmount: '',
//   //       newBalanceLeft: '',
//   //       paymentAmount: '',
//   //       studentId: value,
//   //       studentName: selectedStudent,
//   //       address: ''
//   //     }));
//   //     console.log('Selected student:', value, selectedStudent); // Log selected student for debugging
//   //   }
  
//   //   if (name === 'courseId') {
//   //     // Find the selected enrollment and update payment data
//   //     const enrollment = enrollments.find(enrollment => enrollment.courseId === value && enrollment.studentId === paymentData.studentId);
//   //     if (enrollment) {
//   //       updatePaymentDataFromEnrollment(enrollment);
//   //       console.log('Updated payment data with selected course:', enrollment); // Debugging log
//   //       debouncedFetchEnrollmentById(enrollment.enrollmentId);
//   //     } else {
//   //       // Handle case where no enrollment is found for selected course
//   //       setPaymentData(prev => ({
//   //         ...prev,
//   //         courseId: '',
//   //         courseName: '',
//   //         balanceAmount: '',
//   //         newBalanceLeft: '',
//   //         address: ''
//   //       }));
//   //     }
//   //   }
//   // };
  
  
  

//   const validatePaymentAmount = (paymentAmount, balanceAmount) => {
//     const paymentAmountFloat = parseFloat(paymentAmount);
//     const balanceAmountFloat = parseFloat(balanceAmount);
//     const newBalanceLeft = balanceAmountFloat - paymentAmountFloat;

//     if (newBalanceLeft < 0) {
//       setErrors(prev => ({ ...prev, paymentAmountError: 'Payment amount cannot exceed the balance amount.' }));
//     } else {
//       setErrors(prev => ({ ...prev, paymentAmountError: '' }));
//       console.log('Setting new balance left:', newBalanceLeft.toFixed(2)); // Debugging log
//       setPaymentData(prev => ({ ...prev, newBalanceLeft: newBalanceLeft.toFixed(2) }));
//     }
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   if (errors.paymentAmountError) {
//   //     Swal.fire('Error', errors.paymentAmountError, 'error');
//   //     return;
//   //   }

//   //   try {
//   //     await axios.post(`${apiUrl}/payments`, {
//   //       enrollmentId: paymentData.enrollmentId,
//   //       amount: parseFloat(paymentData.paymentAmount),
//   //       paymentMethod: paymentData.paymentMode,
//   //       notes: paymentData.notes,
//   //     });

//   //     const receiptData = {
//   //       enrollmentId: paymentData.enrollmentId,
//   //       studentName: selectedStudent,
//   //       courseName: paymentData.courseName,
//   //       address:paymentData.address,
//   //       paymentAmount: paymentData.paymentAmount,
//   //       paymentMode: paymentData.paymentMode,
//   //       balanceAmount:paymentData.balanceAmount,
//   //       notes: paymentData.notes,
//   //       date: new Date().toLocaleString(),
//   //       courses: [
//   //         { name: paymentData.courseName, totalFees: '$1000', amountPaid: paymentData.paymentAmount, pendingFees: (1000 - parseFloat(paymentData.paymentAmount)).toFixed(2) },
//   //         // Add more courses as needed
//   //       ]
//   //     };

//   //     setReceipt(receiptData);

//   //     Swal.fire('Success', 'Payment submitted successfully!', 'success');
//   //   } catch (error) {
//   //     console.error('Failed to submit payment:', error); // Detailed error log
//   //     Swal.fire('Error', 'Failed to submit payment.', 'error');
//   //   }
//   // };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (errors.paymentAmountError) {
//       Swal.fire('Error', errors.paymentAmountError, 'error');
//       return;
//     }
  
//     try {
//       if (paymentId) {
//         // Update existing payment with PATCH request
//         await axios.patch(`${apiUrl}/payments/${paymentId}`, {
//           enrollmentId: paymentData.enrollmentId,
//           amount: parseFloat(paymentData.paymentAmount),
//           paymentMethod: paymentData.paymentMode,
//           notes: paymentData.notes,
//         });

        
  
//         Swal.fire('Success', 'Payment updated successfully!', 'success');
//       } else {
//         // Create new payment with POST request
//         const response = await axios.post(`${apiUrl}/payments`, {
//           enrollmentId: paymentData.enrollmentId,
//           amount: parseFloat(paymentData.paymentAmount),
//           paymentMethod: paymentData.paymentMode,
//           notes: paymentData.notes,
//         });
  
//         // Assuming the backend returns the created payment ID in response.data
//         // const newPaymentId = response.data.paymentId;
  
//         Swal.fire('Success', 'Payment submitted successfully!', 'success');
  
//         // Navigate to the newly created payment details page
//         // navigate(`/payments/${newPaymentId}`);
//       }
  
//       const receiptData = {
//         enrollmentId: paymentData.enrollmentId,
//         studentName: paymentData.studentName,
//         address: paymentData.address,
//         paymentAmount: paymentData.paymentAmount,
//         paymentMode: paymentData.paymentMode,
//         balanceAmount: paymentData.balanceAmount,
//         notes: paymentData.notes,
//         date: new Date().toLocaleString(),
//         courses: [
//           { name: paymentData.courseName, totalFees: '$1000', amountPaid: paymentData.paymentAmount, pendingFees: (1000 - parseFloat(paymentData.paymentAmount)).toFixed(2) },
//           // Add more courses as needed
//         ]
//       };
  
//       setReceipt(receiptData);
  
//     } catch (error) {
//       console.error('Failed to submit/update payment:', error);
//       Swal.fire('Error', 'Failed to submit/update payment.', 'error');
//     }
//   };
  


//   // const handlePrint = async () => {
//   //   const element = document.getElementById('receipt');
//   //   const canvas = await html2canvas(element);
//   //   const imgData = canvas.toDataURL('image/png');
//   //   const pdf = new jsPDF({
//   //     format: 'a4'
//   //   });
//   //   pdf.addImage(imgData, 'PNG', 10, 10);
//   //   const pdfBlob = pdf.output('blob');
//   //   const url = URL.createObjectURL(pdfBlob);
//   //   window.open(url, '_blank');
//   // };

//   const handlePrint = async () => {
//     const element = document.getElementById('receiptContainer'); // Get the element by ID
//     console.log(`in print of form`);
//     if (!element) {
//       console.error('Receipt container not found');
//       return;
//     }
  
//     const canvas = await html2canvas(element);
//     const imgData = canvas.toDataURL('image/png');
//     const pdf = new jsPDF({
//       orientation: 'portrait', // or 'landscape' depending on your needs
//       unit: 'mm',
//       format: 'a4'
//     });
//     pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
//     pdf.save('receipt.pdf');
//   };

//   const handleDownload = async () => {
//     const element = document.getElementById('receipt');
//     const canvas = await html2canvas(element);
//     const imgData = canvas.toDataURL('image/png');
//     const pdf = new jsPDF({
//       format: 'a4'
//     });
//     pdf.addImage(imgData, 'PNG', 10, 10);
//     pdf.save('receipt.pdf');
//   };

//   const handleEmail = async () => {
//     const element = document.getElementById('receipt');
//     const canvas = await html2canvas(element);
//     const imgData = canvas.toDataURL('image/png');
//     const pdf = new jsPDF({
//       format: 'a4'
//     });
//     pdf.addImage(imgData, 'PNG', 10, 10);
//     const pdfBase64 = pdf.output('datauristring').split(',')[1]; // Get base64 string of PDF

//     try {
//       const response = await axios.post(`${apiUrl}/send-email`, {
//         to: email,
//         subject: 'Payment Receipt',
//         text: 'Please find attached the payment receipt.',
//         pdfBase64: pdfBase64
//       });

//       console.log('Email sent:', response.data); // Log response for debugging

//       Swal.fire('Success', 'Email sent successfully!', 'success');
//     } catch (error) {
//       console.error('Failed to send email:', error); // Log detailed error for debugging
//       Swal.fire('Error', 'Failed to send email.', 'error');
//     }
//   };

//   const uniqueStudents = enrollments.reduce((acc, curr) => {
//     if (!acc.find(student => student.studentId === curr.studentId)) {
//       acc.push({ studentId: curr.studentId, studentName: curr.student.fullName });
//     }
//     return acc;
//   }, []);

//   const filteredEnrollments = paymentData.studentId
//     ? enrollments.filter(enrollment => enrollment.studentId === paymentData.studentId)
//     : [];

//   const studentOptions = uniqueStudents.map(student => ({
//     value: student.studentId,
//     label: student.studentName
//   }));

//   return (
//     <div className={styles.container}>
//       <div className={styles.formContainer}>
//         <h2>Payment Form</h2>
//         <form onSubmit={handleSubmit}>
//           <div className={styles.formGroup}>
//             <label htmlFor="studentId">Student Name:</label>
//             <Select
//               id="studentId"
//               name="studentId"
//               options={studentOptions}
//               onChange={(selectedOption) => {
//                 handleChange({ name: 'studentId', value: selectedOption.value });
//               }}
//               value={studentOptions.find(option => option.value === paymentData.studentId) || null}
//               placeholder="Type to search..."
//             />
//           </div>
//           {filteredEnrollments.length > 0 && (
//             <div className={styles.formGroup}>
//               <label htmlFor="courseId">Course:</label>
//               <select id="courseId" name="courseId" value={paymentData.courseId} onChange={(e) => {
//                 handleChange(e);
//               }}>
//                 <option value="">Select Course</option>
//                 {filteredEnrollments.map(enrollment => (
//                   <option key={enrollment.courseId} value={enrollment.courseId}>{enrollment.course.name}</option>
//                 ))}
//               </select>
//             </div>
//           )}
//           <div className={styles.formGroup}>
//             <label htmlFor="paymentAmount">Payment Amount:</label>
//            {/* // <input type="number" id="paymentAmount" name="paymentAmount" placeholder="Enter Payment Amount" value={paymentData.paymentAmount} onChange={handleChange} /> */}
//            <input
//   type="number"
//   id="paymentAmount"
//   name="paymentAmount"
//   placeholder="Enter Payment Amount"
//   value={paymentData.paymentAmount}
//   onChange={handleChange}
//   inputMode="numeric"
//   style={{ '-moz-appearance': 'textfield' }} // For Firefox
// />

//             {errors.paymentAmountError && <div className={styles.errorMessage}>{errors.paymentAmountError}</div>}
//           </div>
//           <div className={styles.formGroup}>
//             <label htmlFor="balanceAmount">Balance Amount:</label>
//             <input type="text" id="balanceAmount" name="balanceAmount" placeholder="Balance Amount" value={paymentData.balanceAmount} disabled />
//           </div>
//           <div className={styles.formGroup}>
//             <label htmlFor="newBalanceLeft">New Balance Left:</label>
//             <input type="text" id="newBalanceLeft" name="newBalanceLeft" placeholder="New Balance Left" value={paymentData.newBalanceLeft} disabled />
//           </div>
//           <div className={styles.formGroup}>
//             <label htmlFor="paymentMode">Payment Mode:</label>
//             <select id="paymentMode" name="paymentMode" value={paymentData.paymentMode} onChange={handleChange}>
//               <option value="">Select Payment Mode</option>
//               <option value="Cash">Cash</option>
//               <option value="Credit Card">Credit Card</option>
//               <option value="Debit Card">Debit Card</option>
//               <option value="Online Transfer">Online Transfer</option>
//             </select>
//           </div>
//           <div className={styles.formGroup}>
//             <label htmlFor="notes">Notes:</label>
//             <textarea id="notes" name="notes" placeholder="Enter any notes here" value={paymentData.notes} onChange={handleChange}></textarea>
//           </div>
//           <div className={styles.formActions}>
//             <button type="reset">Reset</button>
//             <button type="submit">Submit</button>
//           </div>
//         </form>
//       </div>

//       <div className={styles.receiptContainer}>
//         {receipt && (
//           <Invoice
//             enrollmentId={receipt.enrollmentId}
//             studentName={receipt.studentName}
//             address={receipt.address}

//             paymentAmount={receipt.paymentAmount}
//             balanceAmount={receipt.balanceAmount}

//             paymentMode={receipt.paymentMode}
//             notes={receipt.notes}
//             date={receipt.date}
//             courses={receipt.courses}
//             onPrint={handlePrint}
//             onDownload={handleDownload}
//             onEmail={handleEmail}
//             email={email}
//             setEmail={setEmail}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// export default PaymentForm;



import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { debounce } from 'lodash';
import { useLocation ,useParams,useNavigate} from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Select from 'react-select';
import styles from './PaymentForm.module.css';
import Invoice from './Invoice'; // Adjust the path as per your project structure
let selectedStudent = null;
let address = null;


function PaymentForm() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const { enrollmentId } = useParams(); // Get paymentId from URL params
  
  const enrollmentIdFromParams = searchParams.get('enrollmentId');
  const paymentIdFromParams = searchParams.get('paymentId');
  const { paymentId } = useParams(); // Get paymentId from URL params
  const navigate = useNavigate();
  const [initialPaymentAmount, setInitialPaymentAmount] = useState(0);

  const [paymentData, setPaymentData] = useState({
    enrollmentId: enrollmentIdFromParams ? enrollmentIdFromParams : '',
    studentId: '',
    studentName: '',
    address:'',
    courseId: '',
    courseName: '',
    paymentAmount: '',
    balanceAmount: '',
    newBalanceLeft: '',
    paymentMode: '',
    notes: '',
    paymentId: paymentIdFromParams || '',

  });
  const [errors, setErrors] = useState({});
  const [receipt, setReceipt] = useState(null);
  const [email, setEmail] = useState('');
  const [enrollments, setEnrollments] = useState([]);
  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await axios.get(`${apiUrl}/enroll`);
        setEnrollments(response.data);
        // console.log('Fetched enrollments:', response.data); // Debugging log
      } catch (error) {
        Swal.fire('Error', 'Failed to fetch enrollments.', 'error');
      }
    };

    fetchEnrollments();
  }, [apiUrl]);


  useEffect(() => {
    if (enrollmentIdFromParams) {
      fetchEnrollmentById(enrollmentIdFromParams);
    }
  }, [enrollmentIdFromParams]);

  const fetchEnrollmentById = useCallback(async (id) => {
    if (!id) return;
    try {
      console.log('fetchEnrollmentById called with id:', id);

      const response = await axios.get(`${apiUrl}/enroll/${id}`);
      const enrollment = response.data;
      console.log(`Enrollment is ${enrollment}`)

      updatePaymentDataFromEnrollment(enrollment);
    } catch (error) {
      console.error('Failed to fetch enrollment by ID:', error); // Detailed error log
      Swal.fire('Error', 'Failed to fetch enrollment by ID.', 'error');
      setPaymentData(prev => ({ ...prev, studentName: '', balanceAmount: '', newBalanceLeft: '' }));
    }
  }, [apiUrl]);



  const updatePaymentDataFromEnrollment = (enrollment) => {
    let balanceAmount;
    // if(paymentId){
    //    balanceAmount = 2000;

    // }else{
       balanceAmount = enrollment?.balanceAmount?.toFixed(2) || '0.00';
    
    // const balanceAmount = enrollment?.balanceAmount?.toFixed(2) || '0.00';
    address=enrollment.address;
    console.log('Setting balance amount:', balanceAmount); // Debugging log
    setPaymentData(prev => ({
      ...prev,
      enrollmentId: enrollment.enrollmentId || '',
      studentId: enrollment.studentId || '',
      studentName: enrollment.studentName || '',
      courseId: enrollment.courseId || '',
      courseName: enrollment.course?.name || '',
      balanceAmount: balanceAmount,
      newBalanceLeft: balanceAmount,
      address: address||''
    }));
    console.log('Updated payment data with enrollment:', enrollment); // Debugging log
    console.log('Updated payment data with Address:', address); // Debugging log
    // console.log(studentName);
    

  };

  const debouncedFetchEnrollmentById = useCallback(debounce((enrollmentId) => {
    console.log('debouncedFetchEnrollmentById called with id:', enrollmentId);
    fetchEnrollmentById(enrollmentId);
  }, 500), [fetchEnrollmentById]);

  const handleChange = (e) => {
    const { name, value } = e.target || e; // Adjust to handle Select's onChange format
    setPaymentData(prev => ({ ...prev, [name]: value }));
    console.log(`Changed ${name}:`, value); // Debugging log
    if (name === 'paymentAmount' && value === '') 
     {
        // If paymentAmount is empty, reset newBalanceLeft
        setPaymentData(prev => ({ ...prev, newBalanceLeft: paymentData.balanceAmount }));
    }
    
    
  
    if (name === 'paymentAmount' && value) {
      

      validatePaymentAmount(value, paymentData.balanceAmount);
    }

    if (name === 'studentId') {
      // Reset other fields when student changes
     selectedStudent = studentOptions.find(option => option.value === value).label;

      setPaymentData(prev => ({
        ...prev,
        courseId: '',
        courseName: '',
        balanceAmount: '',
        newBalanceLeft: '',
        paymentAmount: '',
        studentId: value,
        studentName: studentOptions.find(option => option.value === value).label,
        address:''
      }));
      console.log('Selected student:', value, selectedStudent); // Log selected student for debugging

    }


    if (name === 'courseId') {
      // Find the selected enrollment and update payment data
      const enrollment = enrollments.find(enrollment => enrollment.courseId === value && enrollment.studentId === paymentData.studentId);
      if (enrollment) {
        updatePaymentDataFromEnrollment(enrollment);
        console.log('Updated payment data with selected course:', enrollment); // Debugging log
        debouncedFetchEnrollmentById(enrollment.enrollmentId);
      } else {
        // Handle case where no enrollment is found for selected course
        setPaymentData(prev => ({
          ...prev,
          courseId: '',
          courseName: '',
          balanceAmount: '',
          newBalanceLeft: '',
          address:''
        }));
      }
    }



  };



  const validatePaymentAmount = (paymentAmount, balanceAmount) => {
    const paymentAmountFloat = parseFloat(paymentAmount);
    const balanceAmountFloat = parseFloat(balanceAmount);
    const newBalanceLeft = balanceAmountFloat - paymentAmountFloat;

    if (newBalanceLeft < 0) {
      setErrors(prev => ({ ...prev, paymentAmountError: 'Payment amount cannot exceed the balance amount.' }));
    } else {
      setErrors(prev => ({ ...prev, paymentAmountError: '' }));
      console.log('Setting new balance left:', newBalanceLeft.toFixed(2)); // Debugging log
      setPaymentData(prev => ({ ...prev, newBalanceLeft: newBalanceLeft.toFixed(2) }));
    }
  };

  const fetchCurrentBalance = async (enrollmentId) => {
    try {
      const response = await axios.get(`${apiUrl}/paymentsbalance/${enrollmentId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch current balance:', error);
      Swal.fire('Error', 'Failed to fetch current balance.', 'error');
      return null;
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
      let newPaymentId = paymentId; // Use existing paymentId if available

      if (paymentId) {
        // Update existing payment with PATCH request
        await axios.patch(`${apiUrl}/payments/${paymentId}`, {
          enrollmentId: paymentData.enrollmentId,
          amount: parseFloat(paymentData.paymentAmount),
          paymentMethod: paymentData.paymentMode,
          notes: paymentData.notes,
        });


  
        Swal.fire('Success', 'Payment updated successfully!', 'success');
      } else {
        // Create new payment with POST request
        const response = await axios.post(`${apiUrl}/payments`, {
          enrollmentId: paymentData.enrollmentId,
          amount: parseFloat(paymentData.paymentAmount),
          paymentMethod: paymentData.paymentMode,
          notes: paymentData.notes,
        });
       
        newPaymentId = response.data.payment.paymentId;
      console.log(`PaymentID is ${newPaymentId}`);
        

        // Assuming the backend returns the created payment ID in response.data
        // const newPaymentId = response.data.paymentId;
  
        Swal.fire('Success', 'Payment submitted successfully!', 'success');
        
  
        // Navigate to the newly created payment details page
        // navigate(`/payments/${newPaymentId}`);
      }
      const balanceData = await fetchCurrentBalance(paymentData.enrollmentId);
      const addressData = await fetchAddress();
      const fullAddress = `${addressData.addressLine1}, ${addressData.addressLine2}, ${addressData.city}, ${addressData.district}, ${addressData.taluka}, ${addressData.state}, ${addressData.country}`;

      
      const receiptData = {
        enrollmentId: paymentData.enrollmentId,
        studentName: paymentData.studentName,
        address: paymentData.address,
        paymentAmount: paymentData.paymentAmount,
        paymentMode: paymentData.paymentMode,
        // balanceAmount: paymentData.balanceAmount,
        fullAddress: fullAddress, // Including the address data
        paymentId: newPaymentId, 
        notes: paymentData.notes,
        balanceAmount: balanceData.currentBalance,
        applicableFees: balanceData.applicableFees,
        date: new Date().toLocaleString(),
        courses: [
          { name: paymentData.courseName, totalFees: '$1000', amountPaid: paymentData.paymentAmount, pendingFees: (1000 - parseFloat(paymentData.paymentAmount)).toFixed(2) },
          // Add more courses as needed
        ]
      };
      console.log(`Receipt Data ${receiptData.paymentId}`); 
      setReceipt(receiptData);
  
    } catch (error) {
      console.error('Failed to submit/update payment:', error);
      Swal.fire('Error', 'Failed to submit/update payment.', 'error');
    }
  };

  
  const handlePrint = async () => {
    const element = document.getElementById('receiptContainer'); // Get the element by ID
    console.log(`in print of form`);
    if (!element) {
      console.error('Receipt container not found');
      return;
    }
  
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait', // or 'landscape' depending on your needs
      unit: 'mm',
      format: 'a4'
    });
    pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
    pdf.save('receipt.pdf');
  };

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

  const uniqueStudents = enrollments.reduce((acc, curr) => {
    if (!acc.find(student => student.studentId === curr.studentId)) {
      acc.push({ studentId: curr.studentId, studentName: curr.student.fullName });
    }
    return acc;
  }, []);

  const filteredEnrollments = paymentData.studentId
    ? enrollments.filter(enrollment => enrollment.studentId === paymentData.studentId)
    : [];

  const studentOptions = uniqueStudents.map(student => ({
    value: student.studentId,
    label: student.studentName
  }));

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2>Payment Form</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="studentId">Student Name:</label>
            <Select
              id="studentId"
              name="studentId"
              options={studentOptions}
              onChange={(selectedOption) => {
                handleChange({ name: 'studentId', value: selectedOption.value });
              }}
              value={studentOptions.find(option => option.value === paymentData.studentId) || null}
              placeholder="Type to search..."
            />
          </div>
          {filteredEnrollments.length > 0 && (
            <div className={styles.formGroup}>
              <label htmlFor="courseId">Course:</label>
              <select id="courseId" name="courseId" value={paymentData.courseId} onChange={(e) => {
                handleChange(e);
              }}>
                <option value="">Select Course</option>
                {filteredEnrollments.map(enrollment => (
                  <option key={enrollment.courseId} value={enrollment.courseId}>{enrollment.course.name}</option>
                ))}
              </select>
            </div>
          )}
          <div className={styles.formGroup}>
            <label htmlFor="paymentAmount">Payment Amount:</label>
           {/* // <input type="number" id="paymentAmount" name="paymentAmount" placeholder="Enter Payment Amount" value={paymentData.paymentAmount} onChange={handleChange} /> */}
           <input
  type="number"
  id="paymentAmount"
  name="paymentAmount"
  placeholder="Enter Payment Amount"
  value={paymentData.paymentAmount}
  onChange={handleChange}
  inputMode="numeric"
  style={{ '-moz-appearance': 'textfield' }} // For Firefox
/>

            {errors.paymentAmountError && <div className={styles.errorMessage}>{errors.paymentAmountError}</div>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="balanceAmount">Balance Amount:</label>
            <input type="text" id="balanceAmount" name="balanceAmount" placeholder="Balance Amount" value={paymentData.balanceAmount} disabled />
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
          <div className={styles.formActions}>
            <button type="reset">Reset</button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>

      <div className={styles.receiptContainer}>
        {receipt && (
          <Invoice
            enrollmentId={receipt.enrollmentId}
            studentName={receipt.studentName}
            address={receipt.address}

            paymentAmount={receipt.paymentAmount}
            balanceAmount={receipt.balanceAmount}
            applicableFees={receipt.applicableFees} // Add this line
            paymentMode={receipt.paymentMode}
            paymentId={receipt.paymentId}

            notes={receipt.notes}
            date={receipt.date}
            courses={receipt.courses}
      fullAddress={receipt.fullAddress} // Add this line

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
}

export default PaymentForm;