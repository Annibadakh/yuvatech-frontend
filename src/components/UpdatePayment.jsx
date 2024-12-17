import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Select from 'react-select';
import styles from './PaymentForm.module.css';
import Invoice from './Invoice'; // Adjust the path as per your project structure

function UpdateTransactionForm() {
  const location = useLocation();
  const { paymentId } = useParams(); // Get paymentId from URL params
  const navigate = useNavigate();
  const [initialPaymentAmount, setInitialPaymentAmount] = useState(0);
  const [previousPaymentAmount, setPreviousPaymentAmount] = useState('');

  const [paymentData, setPaymentData] = useState({
    enrollmentId: '',
    studentName: '',
    address: '',
    courseName: '',
    paymentAmount: '',
    balanceAmount: '',
    newBalanceLeft: '',
    paymentMode: '',
    notes: '',
    paymentId: paymentId || '',
    duedate: '',
  });

  const [errors, setErrors] = useState({});
  const [receipt, setReceipt] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await axios.get(`${apiUrl}/enroll`);
        setEnrollments(response.data);
      } catch (error) {
        Swal.fire('Error', 'Failed to fetch enrollments.', 'error');
      }
    };

    fetchEnrollments();
  }, [apiUrl]);

  useEffect(() => {
    if (paymentId) {
      fetchPaymentById(paymentId);
    }
  }, [paymentId]);

  const fetchPaymentById = async (id) => {
    if (!id) return;
    try {
      const response = await axios.get(`${apiUrl}/payments/${id}`);
      const payment = response.data;

      console.log("payment response", payment);

      setPaymentData({
        enrollmentId: payment.enrollmentId || '',
        studentName: payment.studentName || '',
        address: payment.address || '',
        courseName: payment.courseName || '',
        paymentAmount: payment.amount || '',
        balanceAmount: parseFloat(payment.balance) + parseFloat(payment.amount) || '',
        newBalanceLeft: parseFloat(payment.balance) + parseFloat(payment.amount),
        paymentMode: payment.paymentMethod || '',
        notes: payment.notes || '',
        paymentId: paymentId || '',
        duedate: payment.duedate,
      });
    } catch (error) {
      console.error('Failed to fetch payment by ID:', error); // Detailed error log
      Swal.fire('Error', 'Failed to fetch payment by ID.', 'error');
    }
  };
  console.log('pyment duedate', paymentData.duedate);

  const handleChange = (e) => {
    const { name, value } = e.target || e; // Adjust to handle Select's onChange format
    setPaymentData(prev => ({ ...prev, [name]: value }));
    if (name === 'paymentAmount') {
      setPreviousPaymentAmount(paymentData.paymentAmount); // Store previous value
    }

    if (name === 'paymentAmount' && value === '') {
      setPaymentData(prev => ({ ...prev, newBalanceLeft: paymentData.balanceAmount }));
    }

    if (name === 'paymentAmount' && value) {
      validatePaymentAmount(value, paymentData.balanceAmount);
    }

    if (name === 'studentId') {
      const selectedStudent = enrollments.find(enrollment => enrollment.studentId === value)?.student?.fullName || '';
      setPaymentData(prev => ({
        ...prev,
        courseName: '',
        balanceAmount: '',
        newBalanceLeft: '',
        paymentAmount: '',
        studentName: selectedStudent,
        address: '',
      }));
    }

    if (name === 'courseId') {
      const selectedCourse = enrollments.find(enrollment => enrollment.courseId === value && enrollment.studentId === paymentData.studentId);
      if (selectedCourse) {
        setPaymentData(prev => ({
          ...prev,
          courseName: selectedCourse.course.name,
          balanceAmount: selectedCourse.balance.toFixed(2),
          newBalanceLeft: (selectedCourse.balance - parseFloat(prev.paymentAmount || 0)).toFixed(2),
          address: selectedCourse.address,
        }));
      } else {
        setPaymentData(prev => ({
          ...prev,
          courseName: '',
          balanceAmount: '',
          newBalanceLeft: '',
          address: '',
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
      setPaymentData(prev => ({ ...prev, newBalanceLeft: newBalanceLeft.toFixed(2) }));
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (errors.paymentAmountError) {
  //     Swal.fire('Error', errors.paymentAmountError, 'error');
  //     return;
  //   }

  //   try {
  //     // if (paymentId) {
  //     //   await axios.patch(`${apiUrl}/payments/${paymentId}`, {
  //     //     enrollmentId: paymentData.enrollmentId,
  //     //     amount: parseFloat(paymentData.paymentAmount),
  //     //     paymentMethod: paymentData.paymentMode,
  //     //     notes: paymentData.notes,
  //     //     previousPaymentAmount: parseFloat(previousPaymentAmount)
  //     //   });

  //     //   Swal.fire('Success', 'Payment updated successfully!', 'success');
  //     // }
  //     if (paymentId) {
  //       await axios.patch(`${apiUrl}/payments/${paymentId}`, {
  //         enrollmentId: paymentData.enrollmentId,
  //         amount: parseFloat(paymentData.paymentAmount),
  //         paymentMethod: paymentData.paymentMode,
  //         notes: paymentData.notes,
  //         previousPaymentAmount: parseFloat(previousPaymentAmount),
  //         newBalanceAmount: parseFloat(paymentData.newBalanceLeft), // New balance amount
  //       });
      
  //       Swal.fire('Success', 'Payment updated successfully!', 'success');
  //     }
      

  //     const receiptData = {
  //       enrollmentId: paymentData.enrollmentId,
  //       studentName: paymentData.studentName,
  //       address: paymentData.address,
  //       paymentAmount: paymentData.paymentAmount,
  //       paymentMode: paymentData.paymentMode,
  //       balanceAmount: paymentData.balanceAmount,
  //       notes: paymentData.notes,
  //       date: new Date().toLocaleString(),
  //       courses: [
  //         { name: paymentData.courseName, totalFees: '$1000', amountPaid: paymentData.paymentAmount, pendingFees: (1000 - parseFloat(paymentData.paymentAmount)).toFixed(2) },
  //       ],
  //     };

  //     setReceipt(receiptData);

  //   } catch (error) {
  //     console.error('Failed to update payment:', error);
  //     Swal.fire('Error', 'Failed to update payment.', 'error');
  //   }
  // };
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
      if (paymentId) {
        let newPaymentId = paymentId; 
        await axios.patch(`${apiUrl}/payments/${paymentId}`, {
          enrollmentId: paymentData.enrollmentId,
          amount: parseFloat(paymentData.paymentAmount),
          paymentMethod: paymentData.paymentMode,
          notes: paymentData.notes,
          previousPaymentAmount: parseFloat(previousPaymentAmount),
          newBalanceAmount: parseFloat(paymentData.newBalanceLeft),
          duedate: paymentData.duedate,
        });
  
        Swal.fire('Success', 'Payment updated successfully!', 'success');
  
        const balanceData = await fetchCurrentBalance(paymentData.enrollmentId);
        const addressData = await fetchAddress();
        console.log('Address Data:', addressData);

        if (balanceData && addressData) {
          const fullAddress = `${addressData.addressLine1}, ${addressData.addressLine2}, ${addressData.city}, ${addressData.district}, ${addressData.taluka}, ${addressData.state}, ${addressData.country}`;

          const receiptData = {
            enrollmentId: paymentData.enrollmentId,
            studentName: paymentData.studentName,
            address: paymentData.address,
            paymentAmount: paymentData.paymentAmount,
            paymentMode: paymentData.paymentMode,
            balanceAmount: balanceData.currentBalance,
            applicableFees: balanceData.applicableFees,
            notes: paymentData.notes,
            date: new Date().toLocaleString(),
            fullAddress: fullAddress, // Including the address data
            paymentId: newPaymentId, 

            courses: [
              { name: paymentData.courseName, totalFees: '$1000', amountPaid: paymentData.paymentAmount, pendingFees: (1000 - parseFloat(paymentData.paymentAmount)).toFixed(2) },
            ],
          };
          setReceipt(receiptData);
        }
      }
    } catch (error) {
      console.error('Failed to update payment:', error);
      Swal.fire('Error', 'Failed to update payment.', 'error');
    }
  };
  

  const handlePrint = async () => {
    const element = document.getElementById('receiptContainer');
    if (!element) {
      console.error('Receipt container not found');
      return;
    }

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
    pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
    pdf.save('receipt.pdf');
  };

  const handleDownload = async () => {
    const element = document.getElementById('receiptContainer');
    if (!element) {
      console.error('Receipt container not found');
      return;
    }

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
    pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
    pdf.save('receipt.pdf');
  };

  const studentOptions = enrollments
    .map(enrollment => ({ value: enrollment.studentId, label: enrollment.student.fullName }))
    .filter((option, index, self) => index === self.findIndex(o => o.value === option.value));

  const filteredEnrollments = enrollments.filter(enrollment => enrollment.studentId === paymentData.studentId);

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2>Update Transaction</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="studentName">Student Name</label>
            <input
              type="text"
              id="studentName"
              name="studentName"
              value={paymentData.studentName}
              onChange={handleChange}
              readOnly
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="courseName">Course</label>
            <input
              type="text"
              id="courseName"
              name="courseName"
              value={paymentData.courseName}
              onChange={handleChange}
              readOnly
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="paymentAmount">Payment Amount</label>
            <input
              type="number"
              id="paymentAmount"
              name="paymentAmount"
              value={paymentData.paymentAmount}
              onChange={handleChange}
              required
            />
            {errors.paymentAmountError && <p className={styles.error}>{errors.paymentAmountError}</p>}
          </div>
          <div className={styles.formGroup}>
<label htmlFor="balanceAmount">Balance Amount</label>
<input
           type="text"
           id="balanceAmount"
           name="balanceAmount"
           value={paymentData.balanceAmount}
           onChange={handleChange}
           readOnly
           required
         />
</div>
<div className={styles.formGroup}>
<label htmlFor="newBalanceLeft">New Balance Left</label>
<input
           type="text"
           id="newBalanceLeft"
           name="newBalanceLeft"
           value={paymentData.newBalanceLeft}
           onChange={handleChange}
           readOnly
           required
         />
</div>
          <div className={styles.formGroup}>
            <label htmlFor="paymentMode">Payment Mode</label>
            <input
              type="text"
              id="paymentMode"
              name="paymentMode"
              value={paymentData.paymentMode}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="notes">Notes</label>
            <textarea id="notes" name="notes" value={paymentData.notes} onChange={handleChange} rows={4} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="due">Due Date:</label>
            <input id='due' className='due' name='duedate' value={paymentData.duedate} onChange={handleChange} type="date"/>
          </div>

<div className={styles.formGroup}>
<button type="submit">Update Payment</button>
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
    />
  )}
</div>

</div>
);
}

export default UpdateTransactionForm;
