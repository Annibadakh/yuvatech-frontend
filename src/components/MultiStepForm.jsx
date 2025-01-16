
import React, { useState, useEffect } from 'react';
import { Steps } from 'antd';
import { Provider } from './MultiStepFormContext';
import EnrollStudent from './EnrollmentForm';
import AddDocuments from './AddDocuments';
import Payment from './Payment';
import { useLocation } from 'react-router-dom';
import './MultiStepForm.css';
import Loader from '../loader/Loader';

const { Step } = Steps;

const enrollStudentInitialState = {
  firstName: '',
  middleName: '',
  lastName: '',
  mobile: '',
  email: '',
  dob: '',
  gender: '',
  alternatemobile: '',
};

const addDocumentsInitialState = {
  identityType: '',
  identityNo: '',
  photo: null,
  identityImage: null,
};

const paymentInitialState = {
  course: '',
};

const MultiStepForm = () => {
  const location = useLocation(); // Hook to get the current location
  const [enrollStudentData, setEnrollStudentData] = useState(
    JSON.parse(sessionStorage.getItem('enrollStudentData')) || enrollStudentInitialState
  );
  const [addDocumentsData, setAddDocumentsData] = useState(
    JSON.parse(sessionStorage.getItem('addDocumentsData')) || addDocumentsInitialState
  );
  const [paymentData, setPaymentData] = useState(
    JSON.parse(sessionStorage.getItem('paymentData')) || paymentInitialState
  );
  const [currentStep, setCurrentStep] = useState(0);
  const [enrollmentId, setEnrollmentId] = useState(sessionStorage.getItem('enrollmentId') || '');
  const [studentId, setStudentId] = useState(sessionStorage.getItem('studentId') || '');
  const [courseId, setCourseId] = useState(sessionStorage.getItem('courseId') || '');
  // useEffect(() => {
  //   // Save state to session storage
  //   sessionStorage.setItem('enrollStudentData', JSON.stringify(enrollStudentData));
  //   sessionStorage.setItem('addDocumentsData', JSON.stringify(addDocumentsData));
  //   sessionStorage.setItem('paymentData', JSON.stringify(paymentData));
  //   sessionStorage.setItem('enrollmentId', enrollmentId);
  //   sessionStorage.setItem('studentId', studentId);
  // }, [enrollStudentData, addDocumentsData, paymentData, enrollmentId, studentId]);
  useEffect(() => {
    // Save state to session storage
    sessionStorage.setItem('enrollStudentData', JSON.stringify(enrollStudentData));
    sessionStorage.setItem('addDocumentsData', JSON.stringify(addDocumentsData));
    sessionStorage.setItem('paymentData', JSON.stringify(paymentData));
    sessionStorage.setItem('enrollmentId', enrollmentId);
    sessionStorage.setItem('studentId', studentId);
    sessionStorage.setItem('courseId', courseId);
  }, [enrollStudentData, addDocumentsData, paymentData, enrollmentId, studentId, courseId]);
  
  useEffect(() => {
    // Clear session storage on route change
    return () => {
      sessionStorage.removeItem('enrollStudentData');
      sessionStorage.removeItem('addDocumentsData');
      sessionStorage.removeItem('paymentData');
      sessionStorage.removeItem('enrollmentId');
      sessionStorage.removeItem('studentId');
      sessionStorage.removeItem('courseId');

    };
  }, [location]);

  const handleEnrollmentSubmit = (id, studentId,courseId) => {
    setEnrollmentId(id); // Update enrollmentId when submitting enrollment form
    setStudentId(studentId);
    setCourseId(courseId);

    next(); // Move to the next step after enrollment submission
  };

  const handleDocumentsSubmit = () => {
    next(); // Move to the next step after documents submission
  };

  const next = () => {
    setCurrentStep(prevStep => prevStep + 1);
  };

  const prev = () => {
    setCurrentStep(prevStep => prevStep - 1);
  };

  const handleNextButtonClick = () => {
    if (currentStep === 0 || currentStep === 1) {
      document.querySelector('form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    } else {
      next(); // Move to the next step
    }
  };

  const handleFinishButtonClick = () => {
    console.log('Submitting all steps...');
  };

  return (
    // <Provider
    //   value={{
    //     enrollStudentData,
    //     setEnrollStudentData,
    //     addDocumentsData,
    //     setAddDocumentsData,
    //     paymentData,
    //     setPaymentData,
    //     next,
    //     prev,
    //     enrollmentId,
    //     setEnrollmentId,
    //     studentId,
    //     setStudentId,
    //   }}
    // >
    <Provider
  value={{
    enrollStudentData,
    setEnrollStudentData,
    addDocumentsData,
    setAddDocumentsData,
    paymentData,
    setPaymentData,
    next,
    prev,
    enrollmentId,
    setEnrollmentId,
    studentId,
    setStudentId,
    courseId,
    setCourseId,
  }}
>

      <div className="step-form-container" style={{ backgroundColor: 'white' }}>
        <Steps current={currentStep} style={{ padding: '25px' }}>
          <Step title="Enroll Student" />
          <Step title="Add Documents" />
          <Step title="Payment" />
        </Steps>
        <main>
          {currentStep === 0 && (
            <EnrollStudent onEnrollmentSubmit={handleEnrollmentSubmit} enrollmentId={enrollmentId} studentId={studentId} />
          )}
          {currentStep === 1 && (
            <AddDocuments onDocumentsSubmit={handleDocumentsSubmit} studentId={studentId} />
          )}
          {currentStep === 2 && (
  <Payment studentId={studentId} enrollmentId={enrollmentId} courseId={courseId} />
)}

          <div className="step-form-navigation">
            {currentStep > 0 && <button onClick={prev}>Previous</button>}
            {currentStep < 2 && (
              <button onClick={handleNextButtonClick}>
                {currentStep === 1 ? 'Next' : 'Next'}
              </button>
            )}
          </div>
        </main>
      </div>
    </Provider>
  );
};

export default MultiStepForm;
