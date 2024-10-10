// // MultiStepForm.js
// import React, { useState } from 'react';
// import { Steps } from 'antd';
// import { Provider } from '../components/MultiStepFormContext';
// import EnrollStudent from './EnrollStudent';
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
// };

// const addDocumentsInitialState = {
//   address: '',
//   city: '',
//   state: '',
//   pincode: '',
//   occupation: '',
// };

// const paymentInitialState = {
//   course: '',
// };

// const renderStep = (step) => {
//   switch (step) {
//     case 0:
//       return <EnrollStudent />;
//     case 1:
//       return <AddDocuments />;
//     case 2:
//       return <Payment />;
//     default:
//       return null;
//   }
// };

// const MultiStepForm = () => {
//   const [enrollStudentData, setEnrollStudentData] = useState(enrollStudentInitialState);
//   const [addDocumentsData, setAddDocumentsData] = useState(addDocumentsInitialState);
//   const [paymentData, setPaymentData] = useState(paymentInitialState);
//   const [currentStep, setCurrentStep] = useState(0);

//   const next = () => {
//     if (currentStep === 2) {
//       setCurrentStep(0);
//       setEnrollStudentData(enrollStudentInitialState);
//       setAddDocumentsData(addDocumentsInitialState);
//       setPaymentData(paymentInitialState);
//       return;
//     }
//     setCurrentStep(currentStep + 1);
//   };

//   const prev = () => setCurrentStep(currentStep - 1);

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
//       }}
//     >
//       <div className="step-form-container">
//         <Steps current={currentStep}>
//           <Step title="Enroll Student" />
//           <Step title="Add Documents" />
//           <Step title="Payment" />
//         </Steps>
//         <main>{renderStep(currentStep)}</main>
//         <div className="step-form-navigation">
//           {currentStep > 0 && <button onClick={prev}>Previous</button>}
//           <button onClick={next}>
//             {currentStep === 2 ? 'Finish' : 'Next'}
//           </button>
//         </div>
//       </div>
//     </Provider>
//   );
// };

// export default MultiStepForm;
