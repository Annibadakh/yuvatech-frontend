import axios from 'axios';
import Swal from 'sweetalert2';

export const fetchEnrollments = async (apiUrl, setEnrollments) => {
  try {
    const response = await axios.get(`${apiUrl}/enroll`);
    setEnrollments(response.data);
  } catch (error) {
    Swal.fire('Error', 'Failed to fetch enrollments.', 'error');
  }
};

export const fetchPaymentDetails = async (paymentId, apiUrl, setPaymentData, setInitialPaymentAmount, fetchEnrollmentById) => {
  try {
    const response = await axios.get(`${apiUrl}/payments/${paymentId}`);
    const payment = response.data;
    setPaymentData({
      enrollmentId: payment.enrollmentId || '',
      studentId: payment.studentId || '',
      studentName: payment.studentName || '',
      address: payment.address || '',
      courseId: payment.courseId || '',
      courseName: payment.courseName || '',
      paymentAmount: payment.amount || '',
      balanceAmount: parseInt(payment.balance) + parseInt(payment.amount) || 0,
      newBalanceLeft: payment.balanceAmount || '',
      paymentMode: payment.paymentMode || '',
      notes: payment.notes || '',
      paymentId: payment.paymentId || ''
    });
    setInitialPaymentAmount(parseFloat(payment.amount || 0));
    fetchEnrollmentById(payment.enrollmentId, apiUrl, setPaymentData);
  } catch (error) {
    Swal.fire('Error', 'Failed to fetch payment details.', 'error');
  }
};

export const fetchEnrollmentById = async (id, apiUrl, setPaymentData) => {
  if (!id) return;
  try {
    const response = await axios.get(`${apiUrl}/enroll/${id}`);
    const enrollment = response.data;
    updatePaymentDataFromEnrollment(enrollment, setPaymentData);
  } catch (error) {
    Swal.fire('Error', 'Failed to fetch enrollment by ID.', 'error');
    setPaymentData(prev => ({ ...prev, studentName: '', balanceAmount: '', newBalanceLeft: '' }));
  }
};

export const validatePaymentAmount = (paymentAmount, balanceAmount, setErrors, setPaymentData) => {
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

export const updatePaymentDataFromEnrollment = (enrollment, setPaymentData) => {
  let balanceAmount = enrollment?.balanceAmount?.toFixed(2) || '0.00';
  setPaymentData(prev => ({
    ...prev,
    enrollmentId: enrollment.enrollmentId || '',
    studentId: enrollment.studentId || '',
    studentName: enrollment?.student?.fullName || '',
    courseId: enrollment.courseId || '',
    courseName: enrollment.course?.name || '',
    balanceAmount: balanceAmount,
    newBalanceLeft: balanceAmount,
    address: enrollment.address || ''
  }));
};
