// // // // // // // // // // // MultiStepForm.js
// // // // // // // // // // // import React, { useState } from 'react';
// // // // // // // // // // // import { Steps } from 'antd';
// // // // // // // // // // // import { Provider } from './MultiStepFormContext';
// // // // // // // // // // // import EnrollStudent from './EnrollmentForm';
// // // // // // // // // // // import StudentRegistrationForm from './StudentRegistration';

// // // // // // // // // // // import AddDocuments from './AddDocuments';
// // // // // // // // // // // import Payment from './Payment';
// // // // // // // // // // // import './MultiStepForm.css';

// // // // // // // // // // // const { Step } = Steps;

// // // // // // // // // // // const enrollStudentInitialState = {
// // // // // // // // // // //   firstName: '',
// // // // // // // // // // //   middleName: '',
// // // // // // // // // // //   lastName: '',
// // // // // // // // // // //   mobile: '',
// // // // // // // // // // //   email: '',
// // // // // // // // // // //   dob: '',
// // // // // // // // // // //   gender: '',
// // // // // // // // // // // };

// // // // // // // // // // // const addDocumentsInitialState = {
// // // // // // // // // // //   address: '',
// // // // // // // // // // //   city: '',
// // // // // // // // // // //   state: '',
// // // // // // // // // // //   pincode: '',
// // // // // // // // // // //   occupation: '',
// // // // // // // // // // // };

// // // // // // // // // // // const paymentInitialState = {
// // // // // // // // // // //   course: '',
// // // // // // // // // // // };

// // // // // // // // // // // const renderStep = (step) => {
// // // // // // // // // // //   switch (step) {
// // // // // // // // // // //     case 0:
// // // // // // // // // // //       return <EnrollStudent />;
// // // // // // // // // // //       // return <StudentRegistrationForm />;

// // // // // // // // // // //     case 1:
// // // // // // // // // // //       return <AddDocuments />;
// // // // // // // // // // //     case 2:
// // // // // // // // // // //       return <Payment />;
// // // // // // // // // // //     default:
// // // // // // // // // // //       return null;
// // // // // // // // // // //   }
// // // // // // // // // // // };

// // // // // // // // // // // const MultiStepForm = () => {
// // // // // // // // // // //   const [enrollStudentData, setEnrollStudentData] = useState(enrollStudentInitialState);
// // // // // // // // // // //   const [addDocumentsData, setAddDocumentsData] = useState(addDocumentsInitialState);
// // // // // // // // // // //   const [paymentData, setPaymentData] = useState(paymentInitialState);
// // // // // // // // // // //   const [currentStep, setCurrentStep] = useState(0);

// // // // // // // // // // //   const next = () => {
// // // // // // // // // // //     if (currentStep === 2) {
// // // // // // // // // // //       setCurrentStep(0);
// // // // // // // // // // //       setEnrollStudentData(enrollStudentInitialState);
// // // // // // // // // // //       setAddDocumentsData(addDocumentsInitialState);
// // // // // // // // // // //       setPaymentData(paymentInitialState);
// // // // // // // // // // //       return;
// // // // // // // // // // //     }
// // // // // // // // // // //     setCurrentStep(currentStep + 1);
// // // // // // // // // // //   };

// // // // // // // // // // //   const prev = () => setCurrentStep(currentStep - 1);

// // // // // // // // // // //   return (
// // // // // // // // // // //     <Provider
// // // // // // // // // // //       value={{
// // // // // // // // // // //         enrollStudentData,
// // // // // // // // // // //         setEnrollStudentData,
// // // // // // // // // // //         addDocumentsData,
// // // // // // // // // // //         setAddDocumentsData,
// // // // // // // // // // //         paymentData,
// // // // // // // // // // //         setPaymentData,
// // // // // // // // // // //         next,
// // // // // // // // // // //         prev,
// // // // // // // // // // //       }}
// // // // // // // // // // //     >
// // // // // // // // // // //        <div className="step-form-container-head">
// // // // // // // // // // //         <Steps current={currentStep}>
// // // // // // // // // // //           <Step title="Enroll Student" />
// // // // // // // // // // //           <Step title="Add Documents" />
// // // // // // // // // // //           <Step title="Payment" />
// // // // // // // // // // //         </Steps>
// // // // // // // // // // //         </div>
// // // // // // // // // // //       <div className="step-form-container">
// // // // // // // // // // //         {/* <Steps current={currentStep}>
// // // // // // // // // // //           <Step title="Enroll Student" />
// // // // // // // // // // //           <Step title="Add Documents" />
// // // // // // // // // // //           <Step title="Payment" />
// // // // // // // // // // //         </Steps> */}
// // // // // // // // // // //         <main>{renderStep(currentStep)}</main>
// // // // // // // // // // //         <div className="step-form-navigation">
// // // // // // // // // // //           {currentStep > 0 && <button onClick={prev}>Previous</button>}
// // // // // // // // // // //           <button onClick={next}>
// // // // // // // // // // //             {currentStep === 2 ? 'Finish' : 'Next'}
// // // // // // // // // // //           </button>
// // // // // // // // // // //         </div>
// // // // // // // // // // //       </div>
// // // // // // // // // // //     </Provider>
// // // // // // // // // // //   );
// // // // // // // // // // // };

// // // // // // // // // // // export default MultiStepForm;
// // // // // // // // // // import React, { useState } from 'react';
// // // // // // // // // // import { Steps } from 'antd';
// // // // // // // // // // import { Provider } from './MultiStepFormContext';
// // // // // // // // // // import EnrollStudent from './EnrollmentForm';
// // // // // // // // // // import AddDocuments from './AddDocuments';
// // // // // // // // // // import Payment from './Payment';
// // // // // // // // // // import './MultiStepForm.css';

// // // // // // // // // // const { Step } = Steps;

// // // // // // // // // // const enrollStudentInitialState = {
// // // // // // // // // //   firstName: '',
// // // // // // // // // //   middleName: '',
// // // // // // // // // //   lastName: '',
// // // // // // // // // //   mobile: '',
// // // // // // // // // //   email: '',
// // // // // // // // // //   dob: '',
// // // // // // // // // //   gender: '',
// // // // // // // // // // };

// // // // // // // // // // const addDocumentsInitialState = {
// // // // // // // // // //   address: '',
// // // // // // // // // //   city: '',
// // // // // // // // // //   state: '',
// // // // // // // // // //   pincode: '',
// // // // // // // // // //   occupation: '',
// // // // // // // // // // };

// // // // // // // // // // const paymentInitialState = {
// // // // // // // // // //   course: '',
// // // // // // // // // // };

// // // // // // // // // // const renderStep = (step, studentId) => {
// // // // // // // // // //   switch (step) {
// // // // // // // // // //     case 0:
// // // // // // // // // //       return <EnrollStudent studentId={studentId} />;
// // // // // // // // // //     case 1:
// // // // // // // // // //       return <AddDocuments />;
// // // // // // // // // //     case 2:
// // // // // // // // // //       return <Payment />;
// // // // // // // // // //     default:
// // // // // // // // // //       return null;
// // // // // // // // // //   }
// // // // // // // // // // };

// // // // // // // // // // const MultiStepForm = () => {
// // // // // // // // // //   const [enrollStudentData, setEnrollStudentData] = useState(enrollStudentInitialState);
// // // // // // // // // //   const [addDocumentsData, setAddDocumentsData] = useState(addDocumentsInitialState);
// // // // // // // // // //   const [paymentData, setPaymentData] = useState(paymentInitialState);
// // // // // // // // // //   const [currentStep, setCurrentStep] = useState(0);
// // // // // // // // // //   const [studentId, setStudentId] = useState('');

// // // // // // // // // //   // Function to update studentId when it's available (e.g., from URL)
// // // // // // // // // //   const updateStudentId = (id) => {
// // // // // // // // // //     setStudentId(id);
// // // // // // // // // //   };

// // // // // // // // // //   const next = () => {
// // // // // // // // // //     if (currentStep === 2) {
// // // // // // // // // //       setCurrentStep(0);
// // // // // // // // // //       setEnrollStudentData(enrollStudentInitialState);
// // // // // // // // // //       setAddDocumentsData(addDocumentsInitialState);
// // // // // // // // // //       setPaymentData(paymentInitialState);
// // // // // // // // // //       return;
// // // // // // // // // //     }
// // // // // // // // // //     setCurrentStep(currentStep + 1);
// // // // // // // // // //   };

// // // // // // // // // //   const prev = () => setCurrentStep(currentStep - 1);

// // // // // // // // // //   return (
// // // // // // // // // //     <Provider
// // // // // // // // // //       value={{
// // // // // // // // // //         enrollStudentData,
// // // // // // // // // //         setEnrollStudentData,
// // // // // // // // // //         addDocumentsData,
// // // // // // // // // //         setAddDocumentsData,
// // // // // // // // // //         paymentData,
// // // // // // // // // //         setPaymentData,
// // // // // // // // // //         next,
// // // // // // // // // //         prev,
// // // // // // // // // //       }}
// // // // // // // // // //     >
// // // // // // // // // //       <div className="step-form-container-head">
// // // // // // // // // //         <Steps current={currentStep}>
// // // // // // // // // //           <Step title="Enroll Student" />
// // // // // // // // // //           <Step title="Add Documents" />
// // // // // // // // // //           <Step title="Payment" />
// // // // // // // // // //         </Steps>
// // // // // // // // // //       </div>
// // // // // // // // // //       <div className="step-form-container">
// // // // // // // // // //         <main>{renderStep(currentStep, studentId)}</main>
// // // // // // // // // //         <div className="step-form-navigation">
// // // // // // // // // //           {currentStep > 0 && <button onClick={prev}>Previous</button>}
// // // // // // // // // //           <button onClick={next}>{currentStep === 2 ? 'Finish' : 'Next'}</button>
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>
// // // // // // // // // //     </Provider>
// // // // // // // // // //   );
// // // // // // // // // // };

// // // // // // // // // // export default MultiStepForm;
// // // // // // // // // // // MultiStepForm.js
// // // // // // // // // // import React, { useState } from 'react';
// // // // // // // // // // import { Steps } from 'antd';
// // // // // // // // // // import { Provider } from './MultiStepFormContext';
// // // // // // // // // // import EnrollStudent from './EnrollmentForm';
// // // // // // // // // // import AddDocuments from './AddDocuments';
// // // // // // // // // // import Payment from './Payment';
// // // // // // // // // // import './MultiStepForm.css';

// // // // // // // // // // const { Step } = Steps;

// // // // // // // // // // const enrollStudentInitialState = {
// // // // // // // // // //   firstName: '',
// // // // // // // // // //   middleName: '',
// // // // // // // // // //   lastName: '',
// // // // // // // // // //   mobile: '',
// // // // // // // // // //   email: '',
// // // // // // // // // //   dob: '',
// // // // // // // // // //   gender: '',
// // // // // // // // // // };

// // // // // // // // // // const addDocumentsInitialState = {
// // // // // // // // // //   identityType: '',
// // // // // // // // // //   identityNo: '',
// // // // // // // // // //   photo: null,
// // // // // // // // // //   identityImage: null,
// // // // // // // // // // };

// // // // // // // // // // const paymentInitialState = {
// // // // // // // // // //   course: '',
// // // // // // // // // // };

// // // // // // // // // // const renderStep = (step, handleEnrollmentSubmit, handleDocumentsSubmit) => {
// // // // // // // // // //   switch (step) {
// // // // // // // // // //     case 0:
// // // // // // // // // //       return <EnrollStudent onEnrollmentSubmit={handleEnrollmentSubmit} />;
// // // // // // // // // //     case 1:
// // // // // // // // // //       return <AddDocuments onDocumentsSubmit={handleDocumentsSubmit} />;
// // // // // // // // // //     case 2:
// // // // // // // // // //       return <Payment />;
// // // // // // // // // //     default:
// // // // // // // // // //       return null;
// // // // // // // // // //   }
// // // // // // // // // // };

// // // // // // // // // // const MultiStepForm = () => {
// // // // // // // // // //   const [enrollStudentData, setEnrollStudentData] = useState(enrollStudentInitialState);
// // // // // // // // // //   const [addDocumentsData, setAddDocumentsData] = useState(addDocumentsInitialState);
// // // // // // // // // //   const [paymentData, setPaymentData] = useState(paymentInitialState);
// // // // // // // // // //   const [currentStep, setCurrentStep] = useState(0);
// // // // // // // // // //   const [enrollmentId, setEnrollmentId] = useState('');

// // // // // // // // // //   const handleEnrollmentSubmit = (id) => {
// // // // // // // // // //     setEnrollmentId(id);
    
// // // // // // // // // //     next();
// // // // // // // // // //   };

// // // // // // // // // //   const handleDocumentsSubmit = () => {
// // // // // // // // // //     next();
// // // // // // // // // //   };

// // // // // // // // // //   const next = () => {
// // // // // // // // // //     if (currentStep === 2) {
// // // // // // // // // //       setCurrentStep(0);
// // // // // // // // // //       setEnrollStudentData(enrollStudentInitialState);
// // // // // // // // // //       setAddDocumentsData(addDocumentsInitialState);
// // // // // // // // // //       setPaymentData(paymentInitialState);
// // // // // // // // // //       return;
// // // // // // // // // //     }
// // // // // // // // // //     setCurrentStep(currentStep + 1);
// // // // // // // // // //   };

// // // // // // // // // //   const prev = () => setCurrentStep(currentStep - 1);

// // // // // // // // // //   return (
// // // // // // // // // //     <Provider
// // // // // // // // // //       value={{
// // // // // // // // // //         enrollStudentData,
// // // // // // // // // //         setEnrollStudentData,
// // // // // // // // // //         addDocumentsData,
// // // // // // // // // //         setAddDocumentsData,
// // // // // // // // // //         paymentData,
// // // // // // // // // //         setPaymentData,
// // // // // // // // // //         next,
// // // // // // // // // //         prev,
// // // // // // // // // //         enrollmentId,
// // // // // // // // // //         setEnrollmentId,
// // // // // // // // // //       }}
// // // // // // // // // //     >
// // // // // // // // // //       <div className="step-form-container-head">
// // // // // // // // // //         <Steps current={currentStep}>
// // // // // // // // // //           <Step title="Enroll Student" />
// // // // // // // // // //           <Step title="Add Documents" />
// // // // // // // // // //           <Step title="Payment" />
// // // // // // // // // //         </Steps>
// // // // // // // // // //       </div>
// // // // // // // // // //       <div className="step-form-container">
// // // // // // // // // //         <main>{renderStep(currentStep, handleEnrollmentSubmit, handleDocumentsSubmit)}</main>
// // // // // // // // // //         <div className="step-form-navigation">
// // // // // // // // // //           {currentStep > 0 && <button onClick={prev}>Previous</button>}
// // // // // // // // // //           {currentStep < 2 && (
// // // // // // // // // //             <button
// // // // // // // // // //               onClick={() => {
// // // // // // // // // //                 if (currentStep === 0 || currentStep === 1) {
// // // // // // // // // //                   document.querySelector('form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
// // // // // // // // // //                 } else {
// // // // // // // // // //                   next();
// // // // // // // // // //                 }
// // // // // // // // // //               }}
// // // // // // // // // //             >
// // // // // // // // // //               {currentStep === 2 ? 'Finish' : 'Next'}
// // // // // // // // // //             </button>
// // // // // // // // // //           )}
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>
// // // // // // // // // //     </Provider>
// // // // // // // // // //   );
// // // // // // // // // // };

// // // // // // // // // // export default MultiStepForm;
// // // // // // // // // MultiStepForm.js

// // // // // // // // // import React, { useState } from 'react';
// // // // // // // // // import { Steps } from 'antd';
// // // // // // // // // import { Provider } from './MultiStepFormContext';
// // // // // // // // // import EnrollmentForm from './EnrollmentForm';
// // // // // // // // // import AddDocuments from './AddDocuments';
// // // // // // // // // import Payment from './Payment';
// // // // // // // // // import './MultiStepForm.css';

// // // // // // // // // const { Step } = Steps;

// // // // // // // // // const enrollStudentInitialState = {
// // // // // // // // //   firstName: '',
// // // // // // // // //   middleName: '',
// // // // // // // // //   lastName: '',
// // // // // // // // //   mobile: '',
// // // // // // // // //   email: '',
// // // // // // // // //   dob: '',
// // // // // // // // //   gender: '',
// // // // // // // // // };

// // // // // // // // // const addDocumentsInitialState = {
// // // // // // // // //   identityType: '',
// // // // // // // // //   identityNo: '',
// // // // // // // // //   photo: null,
// // // // // // // // //   identityImage: null,
// // // // // // // // // };

// // // // // // // // // const paymentInitialState = {
// // // // // // // // //   course: '',
// // // // // // // // // };

// // // // // // // // // const MultiStepForm = () => {
// // // // // // // // //   const [enrollStudentData, setEnrollStudentData] = useState(enrollStudentInitialState);
// // // // // // // // //   const [addDocumentsData, setAddDocumentsData] = useState(addDocumentsInitialState);
// // // // // // // // //   const [paymentData, setPaymentData] = useState(paymentInitialState);
// // // // // // // // //   const [currentStep, setCurrentStep] = useState(0);
// // // // // // // // //   const [enrollmentId, setEnrollmentId] = useState('');

// // // // // // // // //   const handleEnrollmentSubmit = (studentData) => {
// // // // // // // // //     setEnrollStudentData(studentData);
// // // // // // // // //     next();
// // // // // // // // //   };

// // // // // // // // //   const handleDocumentsSubmit = (documentsData) => {
// // // // // // // // //     setAddDocumentsData(documentsData);
// // // // // // // // //     next();
// // // // // // // // //   };

// // // // // // // // //   const next = () => {
// // // // // // // // //     setCurrentStep(currentStep + 1);
// // // // // // // // //   };

// // // // // // // // //   const prev = () => {
// // // // // // // // //     setCurrentStep(currentStep - 1);
// // // // // // // // //   };

// // // // // // // // //   const renderStep = (step) => {
// // // // // // // // //     switch (step) {
// // // // // // // // //       case 0:
// // // // // // // // //         return <EnrollmentForm onEnrollmentSubmit={handleEnrollmentSubmit} />;
// // // // // // // // //       case 1:
// // // // // // // // //         return <AddDocuments onDocumentsSubmit={handleDocumentsSubmit} />;
// // // // // // // // //       case 2:
// // // // // // // // //         return <Payment enrollmentId={enrollmentId} />;
// // // // // // // // //       default:
// // // // // // // // //         return null;
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     <Provider
// // // // // // // // //       value={{
// // // // // // // // //         enrollStudentData,
// // // // // // // // //         setEnrollStudentData,
// // // // // // // // //         addDocumentsData,
// // // // // // // // //         setAddDocumentsData,
// // // // // // // // //         paymentData,
// // // // // // // // //         setPaymentData,
// // // // // // // // //         next,
// // // // // // // // //         prev,
// // // // // // // // //         enrollmentId,
// // // // // // // // //         setEnrollmentId,
// // // // // // // // //       }}
// // // // // // // // //     >
// // // // // // // // //       <div className="step-form-container">
// // // // // // // // //         <div className="step-form-container-head">
// // // // // // // // //           <Steps current={currentStep}>
// // // // // // // // //             <Step title="Enroll Student" />
// // // // // // // // //             <Step title="Add Documents" />
// // // // // // // // //             <Step title="Payment" />
// // // // // // // // //           </Steps>
// // // // // // // // //         </div>
// // // // // // // // //         <main>{renderStep(currentStep)}</main>
// // // // // // // // //         <div className="step-form-navigation">
// // // // // // // // //           {currentStep > 0 && (
// // // // // // // // //             <button onClick={prev}>
// // // // // // // // //               Previous
// // // // // // // // //             </button>
// // // // // // // // //           )}
// // // // // // // // //           {currentStep < 2 && (
// // // // // // // // //             <button onClick={next}>
// // // // // // // // //               Next
// // // // // // // // //             </button>
// // // // // // // // //           )}
// // // // // // // // //         </div>
// // // // // // // // //       </div>
// // // // // // // // //     </Provider>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default MultiStepForm;



// // // // // // // // import React, { useState } from 'react';
// // // // // // // // import { Steps } from 'antd';
// // // // // // // // import { Provider } from './MultiStepFormContext';
// // // // // // // // import EnrollStudent from './EnrollmentForm';
// // // // // // // // import AddDocuments from './AddDocuments';
// // // // // // // // import Payment from './Payment';
// // // // // // // // import './MultiStepForm.css';

// // // // // // // // const { Step } = Steps;

// // // // // // // // const enrollStudentInitialState = {
// // // // // // // //   firstName: '',
// // // // // // // //   middleName: '',
// // // // // // // //   lastName: '',
// // // // // // // //   mobile: '',
// // // // // // // //   email: '',
// // // // // // // //   dob: '',
// // // // // // // //   gender: '',
// // // // // // // // };

// // // // // // // // const addDocumentsInitialState = {
// // // // // // // //   identityType: '',
// // // // // // // //   identityNo: '',
// // // // // // // //   photo: null,
// // // // // // // //   identityImage: null,
// // // // // // // // };

// // // // // // // // const paymentInitialState = {
// // // // // // // //   course: '',
// // // // // // // // };

// // // // // // // // const renderStep = (step, handleEnrollmentSubmit, handleDocumentsSubmit, enrollmentId) => {
// // // // // // // //   switch (step) {
// // // // // // // //     case 0:
// // // // // // // //       return <EnrollStudent onEnrollmentSubmit={handleEnrollmentSubmit} />;
// // // // // // // //     case 1:
// // // // // // // //       return <AddDocuments onDocumentsSubmit={handleDocumentsSubmit} />;
// // // // // // // //     case 2:
// // // // // // // //       return <Payment enrollmentId={enrollmentId} />;
// // // // // // // //     default:
// // // // // // // //       return null;
// // // // // // // //   }
// // // // // // // // };

// // // // // // // // const MultiStepForm = () => {
// // // // // // // //   const [enrollStudentData, setEnrollStudentData] = useState(enrollStudentInitialState);
// // // // // // // //   const [addDocumentsData, setAddDocumentsData] = useState(addDocumentsInitialState);
// // // // // // // //   const [paymentData, setPaymentData] = useState(paymentInitialState);
// // // // // // // //   const [currentStep, setCurrentStep] = useState(0);
// // // // // // // //   const [enrollmentId, setEnrollmentId] = useState('');

// // // // // // // //   const handleEnrollmentSubmit = (id) => {
// // // // // // // //     setEnrollmentId(id);
// // // // // // // //     next();
// // // // // // // //   };

// // // // // // // //   const handleDocumentsSubmit = () => {
// // // // // // // //     next();
// // // // // // // //   };

// // // // // // // //   const next = () => {
// // // // // // // //     if (currentStep === 2) {
// // // // // // // //       setCurrentStep(0);
// // // // // // // //       setEnrollStudentData(enrollStudentInitialState);
// // // // // // // //       setAddDocumentsData(addDocumentsInitialState);
// // // // // // // //       setPaymentData(paymentInitialState);
// // // // // // // //       return;
// // // // // // // //     }
// // // // // // // //     setCurrentStep(currentStep + 1);
// // // // // // // //   };

// // // // // // // //   const prev = () => setCurrentStep(currentStep - 1);

// // // // // // // //   return (
// // // // // // // //     <Provider
// // // // // // // //       value={{
// // // // // // // //         enrollStudentData,
// // // // // // // //         setEnrollStudentData,
// // // // // // // //         addDocumentsData,
// // // // // // // //         setAddDocumentsData,
// // // // // // // //         paymentData,
// // // // // // // //         setPaymentData,
// // // // // // // //         next,
// // // // // // // //         prev,
// // // // // // // //         enrollmentId,
// // // // // // // //         setEnrollmentId,
// // // // // // // //       }}
// // // // // // // //     >
// // // // // // // //       {/* <div className="step-form-container-head">
// // // // // // // //         <Steps current={currentStep}>
// // // // // // // //           <Step title="Enroll Student" />
// // // // // // // //           <Step title="Add Documents" />
// // // // // // // //           <Step title="Payment" />
// // // // // // // //         </Steps>
// // // // // // // //       </div> */}
// // // // // // // //       <div className="step-form-container">
// // // // // // // //       <div className="step-form-container-head">
// // // // // // // //         <Steps current={currentStep}>
// // // // // // // //           <Step title="Enroll Student" />
// // // // // // // //           <Step title="Add Documents" />
// // // // // // // //           <Step title="Payment" />
// // // // // // // //         </Steps>
// // // // // // // //       </div>
// // // // // // // //         <main>{renderStep(currentStep, handleEnrollmentSubmit, handleDocumentsSubmit, enrollmentId)}</main>
// // // // // // // //         <div className="step-form-navigation">
// // // // // // // //           {currentStep > 0 && <button onClick={prev}>Previous</button>}
// // // // // // // //           {currentStep < 2 && (
// // // // // // // //             <button
// // // // // // // //               onClick={() => {
// // // // // // // //                 if (currentStep === 0 || currentStep === 1) {
// // // // // // // //                   document.querySelector('form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
// // // // // // // //                 } else {
// // // // // // // //                   next();
// // // // // // // //                 }
// // // // // // // //               }}
// // // // // // // //             >
// // // // // // // //               {currentStep === 2 ? 'Finish' : 'Next'}
// // // // // // // //             </button>
// // // // // // // //           )}
// // // // // // // //         </div>
// // // // // // // //       </div>
// // // // // // // //     </Provider>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default MultiStepForm;

// // // // // // // import React, { useState } from 'react';
// // // // // // // import { Steps } from 'antd';
// // // // // // // import { Provider } from './MultiStepFormContext';
// // // // // // // import EnrollStudent from './EnrollmentForm';
// // // // // // // import AddDocuments from './AddDocuments';
// // // // // // // import Payment from './Payment';
// // // // // // // import './MultiStepForm.css';

// // // // // // // const { Step } = Steps;

// // // // // // // const enrollStudentInitialState = {
// // // // // // //   firstName: '',
// // // // // // //   middleName: '',
// // // // // // //   lastName: '',
// // // // // // //   mobile: '',
// // // // // // //   email: '',
// // // // // // //   dob: '',
// // // // // // //   gender: '',
// // // // // // // };

// // // // // // // const addDocumentsInitialState = {
// // // // // // //   identityType: '',
// // // // // // //   identityNo: '',
// // // // // // //   photo: null,
// // // // // // //   identityImage: null,
// // // // // // // };

// // // // // // // const paymentInitialState = {
// // // // // // //   course: '',
// // // // // // // };

// // // // // // // const renderStep = (step, handleEnrollmentSubmit, handleDocumentsSubmit, enrollmentId, studentId) => {
// // // // // // //   switch (step) {
// // // // // // //     case 0:
// // // // // // //       return <EnrollStudent onEnrollmentSubmit={handleEnrollmentSubmit} />;
// // // // // // //     case 1:
// // // // // // //       console.log(enrollmentId);
// // // // // // //       console.log(studentId);


// // // // // // //       return <AddDocuments onDocumentsSubmit={handleDocumentsSubmit} studentId={studentId} />;
// // // // // // //     case 2:
// // // // // // //       return <Payment enrollmentId={enrollmentId} />;
// // // // // // //     default:
// // // // // // //       return null;
// // // // // // //   }
// // // // // // // };

// // // // // // // const MultiStepForm = () => {
// // // // // // //   const [enrollStudentData, setEnrollStudentData] = useState(enrollStudentInitialState);
// // // // // // //   const [addDocumentsData, setAddDocumentsData] = useState(addDocumentsInitialState);
// // // // // // //   const [paymentData, setPaymentData] = useState(paymentInitialState);
// // // // // // //   const [currentStep, setCurrentStep] = useState(0);
// // // // // // //   const [enrollmentId, setEnrollmentId] = useState('');
// // // // // // //   const [studentId, setStudentId] = useState('');

// // // // // // //   const handleEnrollmentSubmit = (id, studentId) => {
// // // // // // //     setEnrollmentId(id);
// // // // // // //     setStudentId(studentId);
// // // // // // //     next();
// // // // // // //   };

// // // // // // //   const handleDocumentsSubmit = () => {
// // // // // // //     next();
// // // // // // //   };

// // // // // // //   const next = () => {
// // // // // // //     if (currentStep === 2) {
// // // // // // //       setCurrentStep(0);
// // // // // // //       setEnrollStudentData(enrollStudentInitialState);
// // // // // // //       setAddDocumentsData(addDocumentsInitialState);
// // // // // // //       setPaymentData(paymentInitialState);
// // // // // // //       return;
// // // // // // //     }
// // // // // // //     setCurrentStep(currentStep + 1);
// // // // // // //   };

// // // // // // //   const prev = () => setCurrentStep(currentStep - 1);

// // // // // // //   return (
// // // // // // //     <Provider
// // // // // // //       value={{
// // // // // // //         enrollStudentData,
// // // // // // //         setEnrollStudentData,
// // // // // // //         addDocumentsData,
// // // // // // //         setAddDocumentsData,
// // // // // // //         paymentData,
// // // // // // //         setPaymentData,
// // // // // // //         next,
// // // // // // //         prev,
// // // // // // //         enrollmentId,
// // // // // // //         setEnrollmentId,
// // // // // // //         studentId,
// // // // // // //         setStudentId,
// // // // // // //       }}
// // // // // // //     >
// // // // // // //       <div className="step-form-container-head">
// // // // // // //         <Steps current={currentStep}>
// // // // // // //           <Step title="Enroll Student" />
// // // // // // //           <Step title="Add Documents" />
// // // // // // //           <Step title="Payment" />
// // // // // // //         </Steps>
// // // // // // //       </div>
// // // // // // //       <div className="step-form-container">
// // // // // // //         <main>{renderStep(currentStep, handleEnrollmentSubmit, handleDocumentsSubmit, enrollmentId, studentId)}</main>
// // // // // // //         <div className="step-form-navigation">
// // // // // // //           {currentStep > 0 && <button onClick={prev}>Previous</button>}
// // // // // // //           {currentStep < 2 && (
// // // // // // //             <button
// // // // // // //               onClick={() => {
// // // // // // //                 if (currentStep === 0 || currentStep === 1) {
// // // // // // //                   document.querySelector('form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
// // // // // // //                 } else {
// // // // // // //                   next();
// // // // // // //                 }
// // // // // // //               }}
// // // // // // //             >
// // // // // // //               {currentStep === 2 ? 'Finish' : 'Next'}
// // // // // // //             </button>
// // // // // // //           )}
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //     </Provider>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default MultiStepForm;
// // // // // // import React, { useState } from 'react';
// // // // // // import { Steps } from 'antd';
// // // // // // import { Provider } from './MultiStepFormContext';
// // // // // // import EnrollStudent from './EnrollmentForm';
// // // // // // import AddDocuments from './AddDocuments';
// // // // // // import Payment from './Payment';
// // // // // // import './MultiStepForm.css';

// // // // // // const { Step } = Steps;

// // // // // // const enrollStudentInitialState = {
// // // // // //   firstName: '',
// // // // // //   middleName: '',
// // // // // //   lastName: '',
// // // // // //   mobile: '',
// // // // // //   email: '',
// // // // // //   dob: '',
// // // // // //   gender: '',
// // // // // // };

// // // // // // const addDocumentsInitialState = {
// // // // // //   identityType: '',
// // // // // //   identityNo: '',
// // // // // //   photo: null,
// // // // // //   identityImage: null,
// // // // // // };

// // // // // // const paymentInitialState = {
// // // // // //   course: '',
// // // // // // };

// // // // // // const renderStep = (step, handleEnrollmentSubmit, handleDocumentsSubmit, enrollmentId, studentId) => {
// // // // // //   console.log(`Rendering step ${step} with enrollmentId: ${enrollmentId} and studentId: ${studentId}`);
// // // // // //   switch (step) {
// // // // // //     case 0:
// // // // // //       return <EnrollStudent onEnrollmentSubmit={handleEnrollmentSubmit} enrollmentId={enrollmentId} />;
// // // // // //     case 1:
// // // // // //       return <AddDocuments onDocumentsSubmit={handleDocumentsSubmit} studentId={studentId} />;
// // // // // //     case 2:
// // // // // //       return <Payment enrollmentId={enrollmentId} />;
// // // // // //     default:
// // // // // //       return null;
// // // // // //   }
// // // // // // };

// // // // // // const MultiStepForm = () => {
// // // // // //   const [enrollStudentData, setEnrollStudentData] = useState(enrollStudentInitialState);
// // // // // //   const [addDocumentsData, setAddDocumentsData] = useState(addDocumentsInitialState);
// // // // // //   const [paymentData, setPaymentData] = useState(paymentInitialState);
// // // // // //   const [currentStep, setCurrentStep] = useState(0);
// // // // // //   const [enrollmentId, setEnrollmentId] = useState('');
// // // // // //   const [studentId, setStudentId] = useState('');

// // // // // //   const handleEnrollmentSubmit = (id, studentId) => {
// // // // // //     setEnrollmentId(id);
// // // // // //     setStudentId(studentId);
// // // // // //     next();
// // // // // //   };

// // // // // //   const handleDocumentsSubmit = () => {
// // // // // //     next();
// // // // // //   };

// // // // // //   const next = () => {
// // // // // //     if (currentStep === 2) {
// // // // // //       setCurrentStep(0);
// // // // // //       setEnrollStudentData(enrollStudentInitialState);
// // // // // //       setAddDocumentsData(addDocumentsInitialState);
// // // // // //       setPaymentData(paymentInitialState);
// // // // // //       return;
// // // // // //     }
// // // // // //     setCurrentStep(currentStep + 1);
// // // // // //   };

// // // // // //   const prev = () => {
// // // // // //     setCurrentStep(currentStep - 1);
// // // // // //     console.log(`Navigating to step ${currentStep - 1} with enrollmentId: ${enrollmentId}`);
// // // // // //   };

// // // // // //   return (
// // // // // //     <Provider
// // // // // //       value={{
// // // // // //         enrollStudentData,
// // // // // //         setEnrollStudentData,
// // // // // //         addDocumentsData,
// // // // // //         setAddDocumentsData,
// // // // // //         paymentData,
// // // // // //         setPaymentData,
// // // // // //         next,
// // // // // //         prev,
// // // // // //         enrollmentId,
// // // // // //         setEnrollmentId,
// // // // // //         studentId,
// // // // // //         setStudentId,
// // // // // //       }}
// // // // // //     >
// // // // // //       <div className="step-form-container-head">
// // // // // //         <Steps current={currentStep}>
// // // // // //           <Step title="Enroll Student" />
// // // // // //           <Step title="Add Documents" />
// // // // // //           <Step title="Payment" />
// // // // // //         </Steps>
// // // // // //       </div>
// // // // // //       <div className="step-form-container">
// // // // // //         <main>{renderStep(currentStep, handleEnrollmentSubmit, handleDocumentsSubmit, enrollmentId, studentId)}</main>
// // // // // //         <div className="step-form-navigation">
// // // // // //           {currentStep > 0 && <button onClick={prev}>Previous</button>}
// // // // // //           {currentStep < 2 && (
// // // // // //             <button
// // // // // //               onClick={() => {
// // // // // //                 if (currentStep === 0 || currentStep === 1) {
// // // // // //                   document.querySelector('form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
// // // // // //                 } else {
// // // // // //                   next();
// // // // // //                 }
// // // // // //               }}
// // // // // //             >
// // // // // //               {currentStep === 2 ? 'Finish' : 'Next'}
// // // // // //             </button>
// // // // // //           )}
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </Provider>
// // // // // //   );
// // // // // // };

// // // // // // export default MultiStepForm;


// // // // // // //--------------------
// // // // // import React, { useState } from 'react';
// // // // // import { Steps } from 'antd';
// // // // // import { Provider } from './MultiStepFormContext';
// // // // // import EnrollStudent from './EnrollmentForm';
// // // // // import AddDocuments from './AddDocuments';
// // // // // import Payment from './Payment';
// // // // // import './MultiStepForm.css';

// // // // // const { Step } = Steps;

// // // // // const enrollStudentInitialState = {
// // // // //   firstName: '',
// // // // //   middleName: '',
// // // // //   lastName: '',
// // // // //   mobile: '',
// // // // //   email: '',
// // // // //   dob: '',
// // // // //   gender: '',
// // // // //   alternatemobile: '',
// // // // // };

// // // // // const addDocumentsInitialState = {
// // // // //   identityType: '',
// // // // //   identityNo: '',
// // // // //   photo: null,
// // // // //   identityImage: null,
// // // // // };

// // // // // const paymentInitialState = {
// // // // //   course: '',
// // // // // };

// // // // // const renderStep = (step, handleEnrollmentSubmit, handleDocumentsSubmit, enrollmentId, studentId) => {
// // // // //   console.log(`Rendering step ${step} with enrollmentId: ${enrollmentId} and studentId: ${studentId}`);
// // // // //   switch (step) {
// // // // //     case 0:
// // // // //       return <EnrollStudent onEnrollmentSubmit={handleEnrollmentSubmit} enrollmentId={enrollmentId} studentId={studentId} />;
// // // // //     case 1:
// // // // //       return <AddDocuments onDocumentsSubmit={handleDocumentsSubmit} studentId={studentId} />;
// // // // //     case 2:
// // // // //       return <Payment enrollmentId={enrollmentId} />;
// // // // //     default:
// // // // //       return null;
// // // // //   }
// // // // // };

// // // // // const MultiStepForm = () => {
// // // // //   const [enrollStudentData, setEnrollStudentData] = useState(enrollStudentInitialState);
// // // // //   const [addDocumentsData, setAddDocumentsData] = useState(addDocumentsInitialState);
// // // // //   const [paymentData, setPaymentData] = useState(paymentInitialState);
// // // // //   const [currentStep, setCurrentStep] = useState(0);
// // // // //   const [enrollmentId, setEnrollmentId] = useState('');
// // // // //   const [studentId, setStudentId] = useState('');

// // // // //   const handleEnrollmentSubmit = (id, studentId) => {
// // // // //     setEnrollmentId(id);
// // // // //     setStudentId(studentId);
// // // // //     next();
// // // // //   };

// // // // //   const handleDocumentsSubmit = () => {
// // // // //     next();
// // // // //   };

// // // // //   const next = () => {
// // // // //     if (currentStep === 2) {
// // // // //       setCurrentStep(0);
// // // // //       setEnrollStudentData(enrollStudentInitialState);
// // // // //       setAddDocumentsData(addDocumentsInitialState);
// // // // //       setPaymentData(paymentInitialState);
// // // // //       return;
// // // // //     }
// // // // //     setCurrentStep(currentStep + 1);
// // // // //   };

// // // // //   const prev = () => {
// // // // //     setCurrentStep(currentStep - 1);
// // // // //     console.log(`Navigating to step ${currentStep - 1} with enrollmentId: ${enrollmentId}`);
// // // // //   };

// // // // //   return (
// // // // //     <Provider
// // // // //       value={{
// // // // //         enrollStudentData,
// // // // //         setEnrollStudentData,
// // // // //         addDocumentsData,
// // // // //         setAddDocumentsData,
// // // // //         paymentData,
// // // // //         setPaymentData,
// // // // //         next,
// // // // //         prev,
// // // // //         enrollmentId,
// // // // //         setEnrollmentId,
// // // // //         studentId,
// // // // //         setStudentId,
// // // // //       }}
// // // // //     >
// // // // //       <div className="step-form-container-head">
// // // // //         <Steps current={currentStep}>
// // // // //           <Step title="Enroll Student" />
// // // // //           <Step title="Add Documents" />
// // // // //           <Step title="Payment" />
// // // // //         </Steps>
// // // // //       </div>
// // // // //       <div className="step-form-container">
// // // // //         <main>{renderStep(currentStep, handleEnrollmentSubmit, handleDocumentsSubmit, enrollmentId, studentId)}</main>
// // // // //         <div className="step-form-navigation">
// // // // //           {currentStep > 0 && <button onClick={prev}>Previous</button>}
// // // // //           {currentStep < 2 && (
// // // // //             <button
// // // // //               onClick={() => {
// // // // //                 if (currentStep === 0 || currentStep === 1) {
// // // // //                   document.querySelector('form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
// // // // //                 } else {
// // // // //                   next();
// // // // //                 }
// // // // //               }}
// // // // //             >
// // // // //               {currentStep === 2 ? 'Finish' : 'Next'}
// // // // //             </button>
// // // // //           )}
// // // // //         </div>
// // // // //       </div>
// // // // //     </Provider>
// // // // //   );
// // // // // };

// // // // // export default MultiStepForm;


// // // // import React, { useState } from 'react';
// // // // import { Steps } from 'antd';
// // // // import { Provider } from './MultiStepFormContext';
// // // // import EnrollStudent from './EnrollmentForm';
// // // // import AddDocuments from './AddDocuments';
// // // // import Payment from './Payment';
// // // // import './MultiStepForm.css';

// // // // const { Step } = Steps;

// // // // const enrollStudentInitialState = {
// // // //   firstName: '',
// // // //   middleName: '',
// // // //   lastName: '',
// // // //   mobile: '',
// // // //   email: '',
// // // //   dob: '',
// // // //   gender: '',
// // // //   alternatemobile: '',
// // // // };

// // // // const addDocumentsInitialState = {
// // // //   identityType: '',
// // // //   identityNo: '',
// // // //   photo: null,
// // // //   identityImage: null,
// // // // };

// // // // const paymentInitialState = {
// // // //   course: '',
// // // // };

// // // // const renderStep = (step, handleEnrollmentSubmit, handleDocumentsSubmit, enrollmentId, studentId) => {
// // // //   console.log(`Rendering step ${step} with enrollmentId: ${enrollmentId} and studentId: ${studentId}`);
// // // //   switch (step) {
// // // //     case 0:
// // // //       return <EnrollStudent onEnrollmentSubmit={handleEnrollmentSubmit} enrollmentId={enrollmentId} studentId={studentId} />;
// // // //     case 1:
// // // //       return <AddDocuments onDocumentsSubmit={handleDocumentsSubmit} studentId={studentId} />;
// // // //     case 2:
// // // //       return <Payment enrollmentId={enrollmentId} />;
// // // //     default:
// // // //       return null;
// // // //   }
// // // // };

// // // // const MultiStepForm = () => {
// // // //   const [enrollStudentData, setEnrollStudentData] = useState(enrollStudentInitialState);
// // // //   const [addDocumentsData, setAddDocumentsData] = useState(addDocumentsInitialState);
// // // //   const [paymentData, setPaymentData] = useState(paymentInitialState);
// // // //   const [currentStep, setCurrentStep] = useState(0);
// // // //   const [enrollmentId, setEnrollmentId] = useState('');
// // // //   const [studentId, setStudentId] = useState('');

// // // //   const handleEnrollmentSubmit = (id, studentId) => {
// // // //     setEnrollmentId(id);
// // // //     setStudentId(studentId);
// // // //     next();
// // // //   };

// // // //   const handleDocumentsSubmit = () => {
// // // //     next();
// // // //   };

// // // //   const next = () => {
// // // //     setCurrentStep(prevStep => prevStep + 1);
// // // //   };

// // // //   const prev = () => {
// // // //     setCurrentStep(prevStep => prevStep - 1);
// // // //     console.log(`Navigating to step ${currentStep - 1} with enrollmentId: ${enrollmentId}`);
// // // //   };

// // // //   return (
// // // //     <Provider
// // // //       value={{
// // // //         enrollStudentData,
// // // //         setEnrollStudentData,
// // // //         addDocumentsData,
// // // //         setAddDocumentsData,
// // // //         paymentData,
// // // //         setPaymentData,
// // // //         next,
// // // //         prev,
// // // //         enrollmentId,
// // // //         setEnrollmentId,
// // // //         studentId,
// // // //         setStudentId,
// // // //       }}
// // // //     >
// // // //       <div className="step-form-container-head">
// // // //         <Steps current={currentStep}>
// // // //           <Step title="Enroll Student" />
// // // //           <Step title="Add Documents" />
// // // //           <Step title="Payment" />
// // // //         </Steps>
// // // //       </div>
// // // //       <div className="step-form-container">
// // // //         <main>{renderStep(currentStep, handleEnrollmentSubmit, handleDocumentsSubmit, enrollmentId, studentId)}</main>
// // // //         <div className="step-form-navigation">
// // // //           {currentStep > 0 && <button onClick={prev}>Previous</button>}
// // // //           {currentStep < 2 && (
// // // //             <button
// // // //               onClick={() => {
// // // //                 if (currentStep === 0 || currentStep === 1) {
// // // //                   document.querySelector('form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
// // // //                 } else {
// // // //                   next();
// // // //                 }
// // // //               }}
// // // //             >
// // // //               {currentStep === 2 ? 'Finish' : 'Next'}
// // // //             </button>
// // // //           )}
// // // //         </div>
// // // //       </div>
// // // //     </Provider>
// // // //   );
// // // // };

// // // // export default MultiStepForm;


// // // import React, { useState } from 'react';
// // // import { Steps } from 'antd';
// // // import { Provider } from './MultiStepFormContext';
// // // import EnrollStudent from './EnrollmentForm';
// // // import AddDocuments from './AddDocuments';
// // // import Payment from './Payment';
// // // import './MultiStepForm.css';

// // // const { Step } = Steps;

// // // const enrollStudentInitialState = {
// // //   firstName: '',
// // //   middleName: '',
// // //   lastName: '',
// // //   mobile: '',
// // //   email: '',
// // //   dob: '',
// // //   gender: '',
// // //   alternatemobile: '',
// // // };

// // // const addDocumentsInitialState = {
// // //   identityType: '',
// // //   identityNo: '',
// // //   photo: null,
// // //   identityImage: null,
// // // };

// // // const paymentInitialState = {
// // //   course: '',
// // // };

// // // const renderStep = (step, handleEnrollmentSubmit, handleDocumentsSubmit, enrollmentId, studentId) => {
// // //   console.log(`Rendering step ${step} with enrollmentId: ${enrollmentId} and studentId: ${studentId}`);
// // //   switch (step) {
// // //     case 0:
// // //       return <EnrollStudent onEnrollmentSubmit={handleEnrollmentSubmit} enrollmentId={enrollmentId} studentId={studentId} />;
// // //     case 1:
// // //       return <AddDocuments onDocumentsSubmit={handleDocumentsSubmit} studentId={studentId} />;
// // //     case 2:
// // //       return <Payment enrollmentId={enrollmentId} />;
// // //     default:
// // //       return null;
// // //   }
// // // };

// // // const MultiStepForm = () => {
// // //   const [enrollStudentData, setEnrollStudentData] = useState(enrollStudentInitialState);
// // //   const [addDocumentsData, setAddDocumentsData] = useState(addDocumentsInitialState);
// // //   const [paymentData, setPaymentData] = useState(paymentInitialState);
// // //   const [currentStep, setCurrentStep] = useState(0);
// // //   const [enrollmentId, setEnrollmentId] = useState('');
// // //   const [studentId, setStudentId] = useState('');

// // //   const handleEnrollmentSubmit = (id, studentId) => {
// // //     setEnrollmentId(id);
// // //     setStudentId(studentId);
// // //     next(); // Move to the next step after enrollment submission
// // //   };

// // //   const handleDocumentsSubmit = () => {
// // //     next(); // Move to the next step after documents submission
// // //   };

// // //   const next = () => {
// // //     setCurrentStep(prevStep => prevStep + 1);
// // //   };

// // //   const prev = () => {
// // //     setCurrentStep(prevStep => prevStep - 1);
// // //   };

// // //   const handleNextButtonClick = () => {
// // //     // Handle form submission logic or just move to the next step
// // //     if (currentStep === 0 || currentStep === 1) {
// // //       // Example: You might want to validate form data before moving to the next step
// // //       document.querySelector('form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
// // //     } else {
// // //       next(); // Move to the next step
// // //     }
// // //   };

// // //   const handleFinishButtonClick = () => {
// // //     // Handle finish button click, e.g., submit all data
// // //     console.log('Submitting all steps...');
// // //   };

// // //   return (
// // //     <Provider
// // //       value={{
// // //         enrollStudentData,
// // //         setEnrollStudentData,
// // //         addDocumentsData,
// // //         setAddDocumentsData,
// // //         paymentData,
// // //         setPaymentData,
// // //         next,
// // //         prev,
// // //         enrollmentId,
// // //         setEnrollmentId,
// // //         studentId,
// // //         setStudentId,
// // //       }}
// // //     >
// // //       <div className="step-form-container-head">
// // //         <Steps current={currentStep}>
// // //           <Step title="Enroll Student" />
// // //           <Step title="Add Documents" />
// // //           <Step title="Payment" />
// // //         </Steps>
// // //       </div>
// // //       <div className="step-form-container">
// // //         <main>{renderStep(currentStep, handleEnrollmentSubmit, handleDocumentsSubmit, enrollmentId, studentId)}</main>
// // //         <div className="step-form-navigation">
// // //           {currentStep > 0 && <button onClick={prev}>Previous</button>}
// // //           {currentStep < 2 && (
// // //             <button onClick={handleNextButtonClick}>
// // //               {currentStep === 2 ? 'Finish' : 'Next'}
// // //             </button>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </Provider>
// // //   );
// // // };

// // // export default MultiStepForm;

// // import React, { useState, useEffect } from 'react';
// // import { Steps } from 'antd';
// // import { Provider } from './MultiStepFormContext';
// // import EnrollStudent from './EnrollmentForm';
// // import AddDocuments from './AddDocuments';
// // import Payment from './Payment';
// // import './MultiStepForm.css';

// // const { Step } = Steps;

// // const enrollStudentInitialState = {
// //   firstName: '',
// //   middleName: '',
// //   lastName: '',
// //   mobile: '',
// //   email: '',
// //   dob: '',
// //   gender: '',
// //   alternatemobile: '',
// // };

// // const addDocumentsInitialState = {
// //   identityType: '',
// //   identityNo: '',
// //   photo: null,
// //   identityImage: null,
// // };

// // const paymentInitialState = {
// //   course: '',
// // };

// // const MultiStepForm = () => {
// //   const [enrollStudentData, setEnrollStudentData] = useState(enrollStudentInitialState);
// //   const [addDocumentsData, setAddDocumentsData] = useState(addDocumentsInitialState);
// //   const [paymentData, setPaymentData] = useState(paymentInitialState);
// //   const [currentStep, setCurrentStep] = useState(0);
// //   const [enrollmentId, setEnrollmentId] = useState('');
// //   const [studentId, setStudentId] = useState('');

// //   const handleEnrollmentSubmit = (id, studentId) => {
// //     setEnrollmentId(id); // Update enrollmentId when submitting enrollment form
// //     setStudentId(studentId);
// //     next();
// //   };

// //   const handleDocumentsSubmit = () => {
// //     next();
// //   };

// //   const next = () => {
// //     setCurrentStep(prevStep => prevStep + 1);
// //   };

// //   const prev = () => {
// //     setCurrentStep(prevStep => prevStep - 1);
// //   };

// //   useEffect(() => {
// //     // Reset form states when going back to step 0
// //     if (currentStep === 0) {
// //       setEnrollStudentData(enrollStudentInitialState);
// //       setAddDocumentsData(addDocumentsInitialState);
// //       setPaymentData(paymentInitialState);
// //     }
// //   }, [currentStep]);

// //   const handleNextButtonClick = () => {
// //     // Example: You might want to validate form data before moving to the next step
// //     if (currentStep === 0 || currentStep === 1) {
// //       document.querySelector('form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
// //     } else {
// //       next(); // Move to the next step
// //     }
// //   };

// //   const handleFinishButtonClick = () => {
// //     // Handle finish button click, e.g., submit all data
// //     console.log('Submitting all steps...');
// //   };

// //   return (
// //     <Provider
// //       value={{
// //         enrollStudentData,
// //         setEnrollStudentData,
// //         addDocumentsData,
// //         setAddDocumentsData,
// //         paymentData,
// //         setPaymentData,
// //         next,
// //         prev,
// //         enrollmentId,
// //         setEnrollmentId,
// //         studentId,
// //         setStudentId,
// //       }}
// //     >
// //       <div className="step-form-container-head">
// //         <Steps current={currentStep}>
// //           <Step title="Enroll Student" />
// //           <Step title="Add Documents" />
// //           <Step title="Payment" />
// //         </Steps>
// //       </div>
// //       <div className="step-form-container">
// //         <main>
// //           {currentStep === 0 && (
// //             <EnrollStudent onEnrollmentSubmit={handleEnrollmentSubmit} enrollmentId={enrollmentId} studentId={studentId} />
// //           )}
// //           {currentStep === 1 && (
// //             <AddDocuments onDocumentsSubmit={handleDocumentsSubmit} studentId={studentId} />
// //           )}
// //           {currentStep === 2 && (
// //             <Payment enrollmentId={enrollmentId} />
// //           )}
// //         </main>
// //         <div className="step-form-navigation">
// //           {currentStep > 0 && <button onClick={prev}>Previous</button>}
// //           {currentStep < 2 && (
// //             <button onClick={handleNextButtonClick}>
// //               {currentStep === 1 ? 'Next' : 'Finish'}
// //             </button>
// //           )}
// //         </div>
// //       </div>
// //     </Provider>
// //   );
// // };

// // export default MultiStepForm;
// import React, { useState, useEffect } from 'react';
// import { Steps } from 'antd';
// import { Provider } from './MultiStepFormContext';
// import EnrollStudent from './EnrollmentForm';
// import AddDocuments from './AddDocuments';
// import Payment from './Payment';
// import './MultiStepForm.css';

// const { Step } = Steps;

// const enrollStudentInitialState = {
//   firstName: '',
//   middleName: '',
//   lastName: '',
//   mobile: '',
//   email: '',
//   dob: '',
//   gender: '',
//   alternatemobile: '',
// };

// const addDocumentsInitialState = {
//   identityType: '',
//   identityNo: '',
//   photo: null,
//   identityImage: null,
// };

// const paymentInitialState = {
//   course: '',
// };

// const MultiStepForm = () => {
//   const [enrollStudentData, setEnrollStudentData] = useState(enrollStudentInitialState);
//   const [addDocumentsData, setAddDocumentsData] = useState(addDocumentsInitialState);
//   const [paymentData, setPaymentData] = useState(paymentInitialState);
//   const [currentStep, setCurrentStep] = useState(0);
//   const [enrollmentId, setEnrollmentId] = useState('');
//   const [studentId, setStudentId] = useState('');

//   const handleEnrollmentSubmit = (id, studentId) => {
//     setEnrollmentId(id); // Update enrollmentId when submitting enrollment form
//     setStudentId(studentId);
//     next(); // Move to the next step after enrollment submission
//   };

//   const handleDocumentsSubmit = () => {
//     next(); // Move to the next step after documents submission
//   };

//   const next = () => {
//     setCurrentStep(prevStep => prevStep + 1);
//   };

//   const prev = () => {
//     setCurrentStep(prevStep => prevStep - 1);
//   };

//   useEffect(() => {
//     // Reset form states when going back to step 0
//     if (currentStep === 0) {
//       setEnrollStudentData(enrollStudentInitialState);
//       setAddDocumentsData(addDocumentsInitialState);
//       setPaymentData(paymentInitialState);
//     }
//   }, [currentStep]);

//   const handleNextButtonClick = () => {
//     // Example: You might want to validate form data before moving to the next step
//     if (currentStep === 0 || currentStep === 1) {
//       document.querySelector('form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
//     } else {
//       next(); // Move to the next step
//     }
//   };

//   const handleFinishButtonClick = () => {
//     // Handle finish button click, e.g., submit all data
//     console.log('Submitting all steps...');
//   };

//   return (
//     <Provider
//       value={{
//         enrollStudentData,
//         setEnrollStudentData,
//         addDocumentsData,
//         setAddDocumentsData,
//         paymentData,
//         setPaymentData,
//         next,
//         prev,
//         enrollmentId,
//         setEnrollmentId,
//         studentId,
//         setStudentId,
//       }}
//     >
//       {/* <div className="step-form-container-head">
//         <Steps current={currentStep}>
//           <Step title="Enroll Student" />
//           <Step title="Add Documents" />
//           <Step title="Payment" />
//         </Steps>
//       </div> */}
//     <div className="step-form-container" style={{backgroundColor:"white"}}>
//         <Steps current={currentStep} style={{padding:"25px"}}>
//           <Step title="Enroll Student" />
//           <Step title="Add Documents" />
//           <Step title="Payment" />
//         </Steps>
//         <main>
//           {currentStep === 0 && (
//             <EnrollStudent onEnrollmentSubmit={handleEnrollmentSubmit} enrollmentId={enrollmentId} studentId={studentId} />
//           )}
//           {currentStep === 1 && (
//             <AddDocuments onDocumentsSubmit={handleDocumentsSubmit} studentId={studentId} />
//           )}
//           {currentStep === 2 && (
//             <Payment enrollmentId={enrollmentId} />
//           )}
//           <div className="step-form-navigation">
//           {currentStep > 0 && <button onClick={prev}>Previous</button>}
//           {currentStep < 2 && (
//             <button onClick={handleNextButtonClick}>
//               {currentStep === 1 ? 'Next' : 'Next'}
//             </button>
//           )}
//         </div>
//         </main>
        
//       </div>
//     </Provider>
//   );
// };

// export default MultiStepForm;



import React, { useState, useEffect } from 'react';
import { Steps } from 'antd';
import { Provider } from './MultiStepFormContext';
import EnrollStudent from './EnrollmentForm';
import AddDocuments from './AddDocuments';
import Payment from './Payment';
import { useLocation } from 'react-router-dom';
import './MultiStepForm.css';

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
