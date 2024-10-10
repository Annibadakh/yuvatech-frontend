// // // // MultiStepFormContext.js
// // // import React, { createContext, useContext } from 'react';

// // // export const MultiStepFormContext = createContext();

// // // export const Provider = ({ children, value }) => (
// // //   <MultiStepFormContext.Provider value={value}>
// // //     {children}
// // //   </MultiStepFormContext.Provider>
// // // );

// // // export const useFormContext = () => useContext(MultiStepFormContext);

// // // export default MultiStepFormContext;
// // import React, { createContext, useContext, useState } from 'react';

// // const MultiStepFormContext = createContext();

// // export const useMultiStepForm = () => useContext(MultiStepFormContext);

// // const enrollStudentInitialState = {
// //   firstName: '',
// //   middleName: '',
// //   lastName: '',
// //   mobile: '',
// //   email: '',
// //   dob: '',
// //   gender: '',
// // };

// // const addDocumentsInitialState = {
// //   address: '',
// //   city: '',
// //   state: '',
// //   pincode: '',
// //   occupation: '',
// // };

// // const paymentInitialState = {
// //   course: '',
// // };

// // export const Provider = ({ children }) => {
// //   const [enrollStudentData, setEnrollStudentData] = useState(enrollStudentInitialState);
// //   const [addDocumentsData, setAddDocumentsData] = useState(addDocumentsInitialState);
// //   const [paymentData, setPaymentData] = useState(paymentInitialState);
// //   const [enrollmentId, setEnrollmentId] = useState('');
// //   const [currentStep, setCurrentStep] = useState(0);

// //   const next = () => {
// //     setCurrentStep((prevStep) => prevStep + 1);
// //   };

// //   const prev = () => {
// //     setCurrentStep((prevStep) => prevStep - 1);
// //   };

// //   const resetForms = () => {
// //     setEnrollStudentData(enrollStudentInitialState);
// //     setAddDocumentsData(addDocumentsInitialState);
// //     setPaymentData(paymentInitialState);
// //     setCurrentStep(0);
// //   };

// //   return (
// //     <MultiStepFormContext.Provider
// //       value={{
// //         enrollStudentData,
// //         setEnrollStudentData,
// //         addDocumentsData,
// //         setAddDocumentsData,
// //         paymentData,
// //         setPaymentData,
// //         enrollmentId,
// //         setEnrollmentId,
// //         currentStep,
// //         next,
// //         prev,
// //         resetForms,
// //       }}
// //     >
// //       {children}
// //     </MultiStepFormContext.Provider>
// //   );
// // };
// // MultiStepFormContext.js
// import React, { createContext, useContext } from 'react';

// const MultiStepFormContext = createContext();

// export const Provider = ({ children, value }) => {
//   return <MultiStepFormContext.Provider value={value}>{children}</MultiStepFormContext.Provider>;
// };

// export const useMultiStepForm = () => {
//   return useContext(MultiStepFormContext);
// };

import React, { createContext, useContext, useState } from 'react';

const MultiStepFormContext = createContext();

export const useMultiStepForm = () => useContext(MultiStepFormContext);

export const Provider = ({ children }) => {
  const [enrollStudentData, setEnrollStudentData] = useState({});
  const [addDocumentsData, setAddDocumentsData] = useState({});
  const [paymentData, setPaymentData] = useState({});
  const [enrollmentId, setEnrollmentId] = useState('');
  const [studentId, setStudentId] = useState('');
  const [courseId, setCourseId] = useState('');
  return (
    <MultiStepFormContext.Provider
      value={{
        enrollStudentData,
        setEnrollStudentData,
        addDocumentsData,
        setAddDocumentsData,
        paymentData,
        setPaymentData,
        enrollmentId,
        setEnrollmentId,
        studentId,
        setStudentId,
        courseId,
        setCourseId,
      }}
    >
      {children}
    </MultiStepFormContext.Provider>
  );
};

