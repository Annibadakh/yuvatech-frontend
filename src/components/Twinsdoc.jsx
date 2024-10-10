// // // // // // // // // // // // import React, { useState } from 'react';

// // // // // // // // // // // // const Notepad = () => {
// // // // // // // // // // // //   const [showNotePad, setShowNotePad] = useState(true);

// // // // // // // // // // // //   return (
// // // // // // // // // // // //     <>
// // // // // // // // // // // //       {/* Button to toggle notepad visibility */}
// // // // // // // // // // // //       <button onClick={() => setShowNotePad(!showNotePad)}>
// // // // // // // // // // // //         {showNotePad ? 'Hide Notepad' : 'Show Notepad'}
// // // // // // // // // // // //       </button>

// // // // // // // // // // // //       {/* Notepad container */}
// // // // // // // // // // // //       {showNotePad && (
// // // // // // // // // // // //         <div
// // // // // // // // // // // //           style={{
// // // // // // // // // // // //             flex: 1,
// // // // // // // // // // // //             padding: "20px", // Add padding for content
// // // // // // // // // // // //           }}
// // // // // // // // // // // //         >
// // // // // // // // // // // //           <textarea
// // // // // // // // // // // //             style={{
// // // // // // // // // // // //               width: "100%", // Set the width to 100% of the container width
// // // // // // // // // // // //               height: "100%", // Set the height to 100% of the container height
// // // // // // // // // // // //               resize: "none", // Disable textarea resizing
// // // // // // // // // // // //             }}
// // // // // // // // // // // //             placeholder="Start typing..."
// // // // // // // // // // // //           ></textarea>
// // // // // // // // // // // //         </div>
// // // // // // // // // // // //       )}
// // // // // // // // // // // //     </>
// // // // // // // // // // // //   );
// // // // // // // // // // // // };

// // // // // // // // // // // // export default Notepad;
// // // // // // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // // // // // import { useParams } from "react-router-dom";
// // // // // // // // // // // import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

// // // // // // // // // // // const Room = () => {
// // // // // // // // // // //   const { roomID } = useParams();
// // // // // // // // // // //   const [showNotePad, setShowNotePad] = useState(true);
// // // // // // // // // // //   const [observation, setObservation] = useState("");
// // // // // // // // // // //   const [labTestsEnabled, setLabTestsEnabled] = useState(false);
// // // // // // // // // // //   const [labTestReq, setLabTestReq] = useState([{ test: "", description: "" }]);
// // // // // // // // // // //   const [radiologyTestsEnabled, setRadiologyTestsEnabled] = useState(false);
// // // // // // // // // // //   const [radiologyTestReq, setRadiologyTestReq] = useState([{ test: "", description: "" }]);
// // // // // // // // // // //   const [prescribeReq, setPrescribeReq] = useState("");
// // // // // // // // // // //   const [isReferralRequired, setIsReferralRequired] = useState(false);
// // // // // // // // // // //   const [referralDoctorName, setReferralDoctorName] = useState("");
// // // // // // // // // // //   const [activeTestIndex, setActiveTestIndex] = useState(null);

// // // // // // // // // // //   const meetingRef = React.useRef(null);

// // // // // // // // // // //   const initializeMeeting = async () => {
// // // // // // // // // // //     const appID = 946219318;
// // // // // // // // // // //     const serverSecret = "8e0b853d79deae0bcbfe949b73ca46a4";
// // // // // // // // // // //     const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
// // // // // // // // // // //       appID,
// // // // // // // // // // //       serverSecret,
// // // // // // // // // // //       roomID,
// // // // // // // // // // //       Date.now().toString(),
// // // // // // // // // // //       "user"
// // // // // // // // // // //     );
// // // // // // // // // // //     const zp = ZegoUIKitPrebuilt.create(kitToken);

// // // // // // // // // // //     zp.joinRoom({
// // // // // // // // // // //       container: meetingRef.current,
// // // // // // // // // // //       scenario: {
// // // // // // // // // // //         mode: ZegoUIKitPrebuilt.GroupCall,
// // // // // // // // // // //       },
// // // // // // // // // // //     });
// // // // // // // // // // //   };

// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     initializeMeeting();

// // // // // // // // // // //     const patientInfo = JSON.parse(localStorage.getItem('patientInfo'));
// // // // // // // // // // //     if (patientInfo) setShowNotePad(false);
// // // // // // // // // // //   }, []);

// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     window.scrollTo(0, 0);
// // // // // // // // // // //   }, []);

// // // // // // // // // // //   const handleAddLabTest = () => {
// // // // // // // // // // //     setLabTestReq([...labTestReq, { test: "", description: "" }]);
// // // // // // // // // // //   };

// // // // // // // // // // //   const handleAddRadiologyTest = () => {
// // // // // // // // // // //     setRadiologyTestReq([...radiologyTestReq, { test: "", description: "" }]);
// // // // // // // // // // //   };

// // // // // // // // // // //   const handleTestChange = (type, index, field, value) => {
// // // // // // // // // // //     const newTests = type === 'lab' ? [...labTestReq] : [...radiologyTestReq];
// // // // // // // // // // //     newTests[index][field] = value;
// // // // // // // // // // //     if (field === 'test' && value) {
// // // // // // // // // // //       newTests[index].description = '';
// // // // // // // // // // //       setActiveTestIndex(index);
// // // // // // // // // // //     }
// // // // // // // // // // //     if (type === 'lab') {
// // // // // // // // // // //       setLabTestReq(newTests);
// // // // // // // // // // //     } else {
// // // // // // // // // // //       setRadiologyTestReq(newTests);
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   const handleDescriptionChange = (type, index, value) => {
// // // // // // // // // // //     const newTests = type === 'lab' ? [...labTestReq] : [...radiologyTestReq];
// // // // // // // // // // //     newTests[index].description = value;
// // // // // // // // // // //     if (type === 'lab') {
// // // // // // // // // // //       setLabTestReq(newTests);
// // // // // // // // // // //     } else {
// // // // // // // // // // //       setRadiologyTestReq(newTests);
// // // // // // // // // // //     }
// // // // // // // // // // //     setActiveTestIndex(null); // Hide the description input after setting the value
// // // // // // // // // // //   };

// // // // // // // // // // //   const handleSubmit = (e) => {
// // // // // // // // // // //     e.preventDefault();
// // // // // // // // // // //     console.log({
// // // // // // // // // // //       observation,
// // // // // // // // // // //       labTestReq,
// // // // // // // // // // //       radiologyTestReq,
// // // // // // // // // // //       prescribeReq,
// // // // // // // // // // //       isReferralRequired,
// // // // // // // // // // //       referralDoctorName
// // // // // // // // // // //     });
// // // // // // // // // // //   };

// // // // // // // // // // //   const renderTestInputs = (type, tests, handleChange, handleAdd) => (
// // // // // // // // // // //     <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", marginBottom: "10px" }}>
// // // // // // // // // // //       <label>{type === 'lab' ? "Any Lab Test Required:" : "Any Radiology Test Required:"}</label>
// // // // // // // // // // //       <div>
// // // // // // // // // // //         <label>Enable {type === 'lab' ? "Lab Tests" : "Radiology Tests"}:</label>
// // // // // // // // // // //         <input
// // // // // // // // // // //           type="checkbox"
// // // // // // // // // // //           checked={type === 'lab' ? labTestsEnabled : radiologyTestsEnabled}
// // // // // // // // // // //           onChange={(e) => type === 'lab' ? setLabTestsEnabled(e.target.checked) : setRadiologyTestsEnabled(e.target.checked)}
// // // // // // // // // // //         />
// // // // // // // // // // //       </div>
// // // // // // // // // // //       {(type === 'lab' ? labTestsEnabled : radiologyTestsEnabled) && (
// // // // // // // // // // //         <>
// // // // // // // // // // //           {tests.map((test, index) => (
// // // // // // // // // // //             <div key={index} style={{ marginBottom: "10px" }}>
// // // // // // // // // // //               <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
// // // // // // // // // // //                 <select
// // // // // // // // // // //                   value={test.test}
// // // // // // // // // // //                   onChange={(e) => handleChange(type, index, 'test', e.target.value)}
// // // // // // // // // // //                   style={{ flex: 1 }}
// // // // // // // // // // //                 >
// // // // // // // // // // //                   <option value="">Select a {type} test</option>
// // // // // // // // // // //                   {type === 'lab' ? (
// // // // // // // // // // //                     <>
// // // // // // // // // // //                       <option value="Blood Test">Blood Test</option>
// // // // // // // // // // //                       <option value="Urine Test">Urine Test</option>
// // // // // // // // // // //                       <option value="X-Ray">X-Ray</option>
// // // // // // // // // // //                     </>
// // // // // // // // // // //                   ) : (
// // // // // // // // // // //                     <>
// // // // // // // // // // //                       <option value="CT Scan">CT Scan</option>
// // // // // // // // // // //                       <option value="MRI">MRI</option>
// // // // // // // // // // //                       <option value="Ultrasound">Ultrasound</option>
// // // // // // // // // // //                     </>
// // // // // // // // // // //                   )}
// // // // // // // // // // //                 </select>
// // // // // // // // // // //                 <button type="button" onClick={handleAdd} style={{ padding: "0 10px", height: "30px" }}>+</button>
// // // // // // // // // // //               </div>
// // // // // // // // // // //               {index === activeTestIndex && (
// // // // // // // // // // //                 <textarea
// // // // // // // // // // //                   value={test.description}
// // // // // // // // // // //                   onChange={(e) => handleDescriptionChange(type, index, e.target.value)}
// // // // // // // // // // //                   placeholder="Enter description..."
// // // // // // // // // // //                   style={{ width: "100%", height: "50px", resize: "none", marginTop: "5px" }}
// // // // // // // // // // //                 ></textarea>
// // // // // // // // // // //               )}
// // // // // // // // // // //               {test.test && (
// // // // // // // // // // //                 <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", marginTop: "10px" }}>
// // // // // // // // // // //                   <strong>{test.test}</strong>
// // // // // // // // // // //                   <p>{test.description}</p>
// // // // // // // // // // //                 </div>
// // // // // // // // // // //               )}
// // // // // // // // // // //             </div>
// // // // // // // // // // //           ))}
// // // // // // // // // // //         </>
// // // // // // // // // // //       )}
// // // // // // // // // // //     </div>
// // // // // // // // // // //   );

// // // // // // // // // // //   return (
// // // // // // // // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
// // // // // // // // // // //       <div style={{ flex: 1, display: "flex" }}>
// // // // // // // // // // //         <div
// // // // // // // // // // //           ref={meetingRef}
// // // // // // // // // // //           style={{
// // // // // // // // // // //             flex: 1,
// // // // // // // // // // //             backgroundColor: "lightgray",
// // // // // // // // // // //           }}
// // // // // // // // // // //         ></div>

// // // // // // // // // // //         {showNotePad && (
// // // // // // // // // // //           <div
// // // // // // // // // // //             style={{
// // // // // // // // // // //               flex: 1,
// // // // // // // // // // //               padding: "20px",
// // // // // // // // // // //               overflowY: "auto",
// // // // // // // // // // //               display: "flex",
// // // // // // // // // // //               flexDirection: "column",
// // // // // // // // // // //               gap: "10px"
// // // // // // // // // // //             }}
// // // // // // // // // // //           >
// // // // // // // // // // //             <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
// // // // // // // // // // //               {renderTestInputs('lab', labTestReq, handleTestChange, handleAddLabTest)}
// // // // // // // // // // //               {renderTestInputs('radiology', radiologyTestReq, handleTestChange, handleAddRadiologyTest)}

// // // // // // // // // // //               <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}>
// // // // // // // // // // //                 <label>Is Referral Required:</label>
// // // // // // // // // // //                 <input
// // // // // // // // // // //                   type="checkbox"
// // // // // // // // // // //                   checked={isReferralRequired}
// // // // // // // // // // //                   onChange={(e) => setIsReferralRequired(e.target.checked)}
// // // // // // // // // // //                 />
// // // // // // // // // // //                 {isReferralRequired && (
// // // // // // // // // // //                   <div style={{ marginTop: "10px" }}>
// // // // // // // // // // //                     <label>Referral Doctor's Name:</label>
// // // // // // // // // // //                     <input
// // // // // // // // // // //                       type="text"
// // // // // // // // // // //                       value={referralDoctorName}
// // // // // // // // // // //                       onChange={(e) => setReferralDoctorName(e.target.value)}
// // // // // // // // // // //                       style={{ width: "100%" }}
// // // // // // // // // // //                       placeholder="Enter referral doctor's name..."
// // // // // // // // // // //                     />
// // // // // // // // // // //                   </div>
// // // // // // // // // // //                 )}
// // // // // // // // // // //               </div>

// // // // // // // // // // //               <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}>
// // // // // // // // // // //                 <label>Observation of Doctor:</label>
// // // // // // // // // // //                 <textarea
// // // // // // // // // // //                   value={observation}
// // // // // // // // // // //                   onChange={(e) => setObservation(e.target.value)}
// // // // // // // // // // //                   style={{
// // // // // // // // // // //                     width: "100%",
// // // // // // // // // // //                     height: "100px",
// // // // // // // // // // //                     resize: "none",
// // // // // // // // // // //                   }}
// // // // // // // // // // //                   placeholder="Enter doctor's observations..."
// // // // // // // // // // //                 ></textarea>
// // // // // // // // // // //               </div>

// // // // // // // // // // //               <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}>
// // // // // // // // // // //                 <label>Prescribe:</label>
// // // // // // // // // // //                 <textarea
// // // // // // // // // // //                   value={prescribeReq}
// // // // // // // // // // //                   onChange={(e) => setPrescribeReq(e.target.value)}
// // // // // // // // // // //                   style={{
// // // // // // // // // // //                     width: "100%",
// // // // // // // // // // //                     height: "100px",
// // // // // // // // // // //                     resize: "none",
// // // // // // // // // // //                   }}
// // // // // // // // // // //                   placeholder="Enter prescriptions..."
// // // // // // // // // // //                 ></textarea>
// // // // // // // // // // //               </div>

// // // // // // // // // // //               <button type="submit">Save Notes</button>
// // // // // // // // // // //             </form>
// // // // // // // // // // //           </div>
// // // // // // // // // // //         )}
// // // // // // // // // // //       </div>
// // // // // // // // // // //     </div>
// // // // // // // // // // //   );
// // // // // // // // // // // };

// // // // // // // // // // // export default Room;
// // // // // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // // // // import { useParams } from "react-router-dom";
// // // // // // // // // // import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

// // // // // // // // // // const Room = () => {
// // // // // // // // // //   const { roomID } = useParams();
// // // // // // // // // //   const [showNotePad, setShowNotePad] = useState(true);
// // // // // // // // // //   const [observation, setObservation] = useState("");
// // // // // // // // // //   const [labTests, setLabTests] = useState([]);
// // // // // // // // // //   const [labTest, setLabTest] = useState({ test: "", description: "" });
// // // // // // // // // //   const [radiologyTests, setRadiologyTests] = useState([]);
// // // // // // // // // //   const [radiologyTest, setRadiologyTest] = useState({ test: "", description: "" });
// // // // // // // // // //   const [prescribeReq, setPrescribeReq] = useState("");
// // // // // // // // // //   const [isReferralRequired, setIsReferralRequired] = useState(false);
// // // // // // // // // //   const [referralDoctorName, setReferralDoctorName] = useState("");

// // // // // // // // // //   const meetingRef = React.useRef(null);

// // // // // // // // // //   const initializeMeeting = async () => {
// // // // // // // // // //     const appID = 946219318;
// // // // // // // // // //     const serverSecret = "8e0b853d79deae0bcbfe949b73ca46a4";
// // // // // // // // // //     const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
// // // // // // // // // //       appID,
// // // // // // // // // //       serverSecret,
// // // // // // // // // //       roomID,
// // // // // // // // // //       Date.now().toString(),
// // // // // // // // // //       "user"
// // // // // // // // // //     );
// // // // // // // // // //     const zp = ZegoUIKitPrebuilt.create(kitToken);

// // // // // // // // // //     zp.joinRoom({
// // // // // // // // // //       container: meetingRef.current,
// // // // // // // // // //       scenario: {
// // // // // // // // // //         mode: ZegoUIKitPrebuilt.GroupCall,
// // // // // // // // // //       },
// // // // // // // // // //     });
// // // // // // // // // //   };

// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     initializeMeeting();

// // // // // // // // // //     const patientInfo = JSON.parse(localStorage.getItem('patientInfo'));
// // // // // // // // // //     if (patientInfo) setShowNotePad(false);
// // // // // // // // // //   }, []);

// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     window.scrollTo(0, 0);
// // // // // // // // // //   }, []);

// // // // // // // // // //   const handleAddLabTest = () => {
// // // // // // // // // //     if (labTest.test && labTest.description) {
// // // // // // // // // //       setLabTests([...labTests, labTest]);
// // // // // // // // // //       setLabTest({ test: "", description: "" });
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const handleAddRadiologyTest = () => {
// // // // // // // // // //     if (radiologyTest.test && radiologyTest.description) {
// // // // // // // // // //       setRadiologyTests([...radiologyTests, radiologyTest]);
// // // // // // // // // //       setRadiologyTest({ test: "", description: "" });
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const handleSubmit = (e) => {
// // // // // // // // // //     e.preventDefault();
// // // // // // // // // //     console.log({
// // // // // // // // // //       observation,
// // // // // // // // // //       labTests,
// // // // // // // // // //       radiologyTests,
// // // // // // // // // //       prescribeReq,
// // // // // // // // // //       isReferralRequired,
// // // // // // // // // //       referralDoctorName
// // // // // // // // // //     });
// // // // // // // // // //     // Reset state after submission if needed
// // // // // // // // // //   };

// // // // // // // // // //   return (
// // // // // // // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
// // // // // // // // // //       <div style={{ flex: 1, display: "flex" }}>
// // // // // // // // // //         <div
// // // // // // // // // //           ref={meetingRef}
// // // // // // // // // //           style={{
// // // // // // // // // //             flex: 1,
// // // // // // // // // //             backgroundColor: "lightgray",
// // // // // // // // // //           }}
// // // // // // // // // //         ></div>

// // // // // // // // // //         {showNotePad && (
// // // // // // // // // //           <div
// // // // // // // // // //             style={{
// // // // // // // // // //               flex: 1,
// // // // // // // // // //               padding: "20px",
// // // // // // // // // //               overflowY: "auto",
// // // // // // // // // //               display: "flex",
// // // // // // // // // //               flexDirection: "column",
// // // // // // // // // //               gap: "10px"
// // // // // // // // // //             }}
// // // // // // // // // //           >
// // // // // // // // // //             <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
// // // // // // // // // //               <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}>
// // // // // // // // // //                 <label>Lab Tests:</label>
// // // // // // // // // //                 <select
// // // // // // // // // //                   value={labTest.test}
// // // // // // // // // //                   onChange={(e) => setLabTest({ ...labTest, test: e.target.value })}
// // // // // // // // // //                 >
// // // // // // // // // //                   <option value="">Select a lab test</option>
// // // // // // // // // //                   <option value="Blood Test">Blood Test</option>
// // // // // // // // // //                   <option value="Urine Test">Urine Test</option>
// // // // // // // // // //                   <option value="X-Ray">X-Ray</option>
// // // // // // // // // //                 </select>
// // // // // // // // // //                 {labTest.test && (
// // // // // // // // // //                   <textarea
// // // // // // // // // //                     value={labTest.description}
// // // // // // // // // //                     onChange={(e) => setLabTest({ ...labTest, description: e.target.value })}
// // // // // // // // // //                     placeholder="Enter description..."
// // // // // // // // // //                     style={{ width: "100%", height: "50px", resize: "none", marginTop: "5px" }}
// // // // // // // // // //                   ></textarea>
// // // // // // // // // //                 )}
// // // // // // // // // //                 <div style={{ marginTop: "10px" }}>
// // // // // // // // // //                   <button type="button" onClick={handleAddLabTest}>Add Lab Test</button>
// // // // // // // // // //                 </div>
// // // // // // // // // //               </div>

// // // // // // // // // //               <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}>
// // // // // // // // // //                 <label>Radiology Tests:</label>
// // // // // // // // // //                 <select
// // // // // // // // // //                   value={radiologyTest.test}
// // // // // // // // // //                   onChange={(e) => setRadiologyTest({ ...radiologyTest, test: e.target.value })}
// // // // // // // // // //                 >
// // // // // // // // // //                   <option value="">Select a radiology test</option>
// // // // // // // // // //                   <option value="CT Scan">CT Scan</option>
// // // // // // // // // //                   <option value="MRI">MRI</option>
// // // // // // // // // //                   <option value="Ultrasound">Ultrasound</option>
// // // // // // // // // //                 </select>
// // // // // // // // // //                 {radiologyTest.test && (
// // // // // // // // // //                   <textarea
// // // // // // // // // //                     value={radiologyTest.description}
// // // // // // // // // //                     onChange={(e) => setRadiologyTest({ ...radiologyTest, description: e.target.value })}
// // // // // // // // // //                     placeholder="Enter description..."
// // // // // // // // // //                     style={{ width: "100%", height: "50px", resize: "none", marginTop: "5px" }}
// // // // // // // // // //                   ></textarea>
// // // // // // // // // //                 )}
// // // // // // // // // //                 <div style={{ marginTop: "10px" }}>
// // // // // // // // // //                   <button type="button" onClick={handleAddRadiologyTest}>Add Radiology Test</button>
// // // // // // // // // //                 </div>
// // // // // // // // // //               </div>

// // // // // // // // // //               <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}>
// // // // // // // // // //                 <label>Is Referral Required:</label>
// // // // // // // // // //                 <input
// // // // // // // // // //                   type="checkbox"
// // // // // // // // // //                   checked={isReferralRequired}
// // // // // // // // // //                   onChange={(e) => setIsReferralRequired(e.target.checked)}
// // // // // // // // // //                 />
// // // // // // // // // //                 {isReferralRequired && (
// // // // // // // // // //                   <div style={{ marginTop: "10px" }}>
// // // // // // // // // //                     <label>Referral Doctor's Name:</label>
// // // // // // // // // //                     <input
// // // // // // // // // //                       type="text"
// // // // // // // // // //                       value={referralDoctorName}
// // // // // // // // // //                       onChange={(e) => setReferralDoctorName(e.target.value)}
// // // // // // // // // //                       style={{ width: "100%" }}
// // // // // // // // // //                       placeholder="Enter referral doctor's name..."
// // // // // // // // // //                     />
// // // // // // // // // //                   </div>
// // // // // // // // // //                 )}
// // // // // // // // // //               </div>

// // // // // // // // // //               <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}>
// // // // // // // // // //                 <label>Observation of Doctor:</label>
// // // // // // // // // //                 <textarea
// // // // // // // // // //                   value={observation}
// // // // // // // // // //                   onChange={(e) => setObservation(e.target.value)}
// // // // // // // // // //                   style={{
// // // // // // // // // //                     width: "100%",
// // // // // // // // // //                     height: "100px",
// // // // // // // // // //                     resize: "none",
// // // // // // // // // //                   }}
// // // // // // // // // //                   placeholder="Enter doctor's observations..."
// // // // // // // // // //                 ></textarea>
// // // // // // // // // //               </div>

// // // // // // // // // //               <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}>
// // // // // // // // // //                 <label>Prescribe:</label>
// // // // // // // // // //                 <textarea
// // // // // // // // // //                   value={prescribeReq}
// // // // // // // // // //                   onChange={(e) => setPrescribeReq(e.target.value)}
// // // // // // // // // //                   style={{
// // // // // // // // // //                     width: "100%",
// // // // // // // // // //                     height: "100px",
// // // // // // // // // //                     resize: "none",
// // // // // // // // // //                   }}
// // // // // // // // // //                   placeholder="Enter prescriptions..."
// // // // // // // // // //                 ></textarea>
// // // // // // // // // //               </div>

// // // // // // // // // //               <button type="submit">Save Notes</button>
// // // // // // // // // //             </form>

// // // // // // // // // //             <div style={{ marginTop: "20px" }}>
// // // // // // // // // //               <h3>Selected Tests:</h3>
// // // // // // // // // //               <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
// // // // // // // // // //                 {labTests.map((test, index) => (
// // // // // // // // // //                   <div key={index} style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}>
// // // // // // // // // //                     <strong>{test.test}</strong>
// // // // // // // // // //                     <p>{test.description}</p>
// // // // // // // // // //                   </div>
// // // // // // // // // //                 ))}
// // // // // // // // // //                 {radiologyTests.map((test, index) => (
// // // // // // // // // //                   <div key={index} style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}>
// // // // // // // // // //                     <strong>{test.test}</strong>
// // // // // // // // // //                     <p>{test.description}</p>
// // // // // // // // // //                   </div>
// // // // // // // // // //                 ))}
// // // // // // // // // //               </div>
// // // // // // // // // //             </div>
// // // // // // // // // //           </div>
// // // // // // // // // //         )}
// // // // // // // // // //       </div>
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // };

// // // // // // // // // // export default Room;
// // // // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // // // import { useParams } from "react-router-dom";
// // // // // // // // // import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

// // // // // // // // // const Room = () => {
// // // // // // // // //   const { roomID } = useParams();
// // // // // // // // //   const [showNotePad, setShowNotePad] = useState(true);
// // // // // // // // //   const [observation, setObservation] = useState("");
// // // // // // // // //   const [labTests, setLabTests] = useState([]);
// // // // // // // // //   const [labTest, setLabTest] = useState({ test: "", description: "" });
// // // // // // // // //   const [radiologyTests, setRadiologyTests] = useState([]);
// // // // // // // // //   const [radiologyTest, setRadiologyTest] = useState({ test: "", description: "" });
// // // // // // // // //   const [prescribeReq, setPrescribeReq] = useState("");
// // // // // // // // //   const [isReferralRequired, setIsReferralRequired] = useState(false);
// // // // // // // // //   const [referralDoctorName, setReferralDoctorName] = useState("");

// // // // // // // // //   const meetingRef = React.useRef(null);

// // // // // // // // //   const initializeMeeting = async () => {
// // // // // // // // //     const appID = 946219318;
// // // // // // // // //     const serverSecret = "8e0b853d79deae0bcbfe949b73ca46a4";
// // // // // // // // //     const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
// // // // // // // // //       appID,
// // // // // // // // //       serverSecret,
// // // // // // // // //       roomID,
// // // // // // // // //       Date.now().toString(),
// // // // // // // // //       "user"
// // // // // // // // //     );
// // // // // // // // //     const zp = ZegoUIKitPrebuilt.create(kitToken);

// // // // // // // // //     zp.joinRoom({
// // // // // // // // //       container: meetingRef.current,
// // // // // // // // //       scenario: {
// // // // // // // // //         mode: ZegoUIKitPrebuilt.GroupCall,
// // // // // // // // //       },
// // // // // // // // //     });
// // // // // // // // //   };

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     initializeMeeting();

// // // // // // // // //     const patientInfo = JSON.parse(localStorage.getItem('patientInfo'));
// // // // // // // // //     if (patientInfo) setShowNotePad(false);
// // // // // // // // //   }, []);

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     window.scrollTo(0, 0);
// // // // // // // // //   }, []);

// // // // // // // // //   const handleAddLabTest = () => {
// // // // // // // // //     if (labTest.test && labTest.description) {
// // // // // // // // //       setLabTests([...labTests, labTest]);
// // // // // // // // //       setLabTest({ test: "", description: "" });
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const handleAddRadiologyTest = () => {
// // // // // // // // //     if (radiologyTest.test && radiologyTest.description) {
// // // // // // // // //       setRadiologyTests([...radiologyTests, radiologyTest]);
// // // // // // // // //       setRadiologyTest({ test: "", description: "" });
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const handleSubmit = (e) => {
// // // // // // // // //     e.preventDefault();
// // // // // // // // //     console.log({
// // // // // // // // //       observation,
// // // // // // // // //       labTests,
// // // // // // // // //       radiologyTests,
// // // // // // // // //       prescribeReq,
// // // // // // // // //       isReferralRequired,
// // // // // // // // //       referralDoctorName
// // // // // // // // //     });
// // // // // // // // //     // Reset state after submission if needed
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
// // // // // // // // //       <div style={{ flex: 1, display: "flex" }}>
// // // // // // // // //         <div
// // // // // // // // //           ref={meetingRef}
// // // // // // // // //           style={{
// // // // // // // // //             flex: 1,
// // // // // // // // //             backgroundColor: "lightgray",
// // // // // // // // //           }}
// // // // // // // // //         ></div>

// // // // // // // // //         {showNotePad && (
// // // // // // // // //           <div
// // // // // // // // //             style={{
// // // // // // // // //               flex: 1,
// // // // // // // // //               padding: "20px",
// // // // // // // // //               overflowY: "auto",
// // // // // // // // //               display: "flex",
// // // // // // // // //               flexDirection: "column",
// // // // // // // // //               gap: "10px"
// // // // // // // // //             }}
// // // // // // // // //           >
// // // // // // // // //             <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
// // // // // // // // //               <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}>
// // // // // // // // //                 <label>Lab Tests:</label>
// // // // // // // // //                 <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
// // // // // // // // //                   <select
// // // // // // // // //                     value={labTest.test}
// // // // // // // // //                     onChange={(e) => setLabTest({ ...labTest, test: e.target.value })}
// // // // // // // // //                   >
// // // // // // // // //                     <option value="">Select a lab test</option>
// // // // // // // // //                     <option value="Blood Test">Blood Test</option>
// // // // // // // // //                     <option value="Urine Test">Urine Test</option>
// // // // // // // // //                     <option value="X-Ray">X-Ray</option>
// // // // // // // // //                   </select>
// // // // // // // // //                   {labTest.test && (
// // // // // // // // //                     <textarea
// // // // // // // // //                       value={labTest.description}
// // // // // // // // //                       onChange={(e) => setLabTest({ ...labTest, description: e.target.value })}
// // // // // // // // //                       placeholder="Enter description..."
// // // // // // // // //                       style={{ width: "100%", height: "50px", resize: "none", marginTop: "5px" }}
// // // // // // // // //                     ></textarea>
// // // // // // // // //                   )}
// // // // // // // // //                   <button type="button" onClick={handleAddLabTest}>+</button>
// // // // // // // // //                 </div>
// // // // // // // // //                 <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "10px" }}>
// // // // // // // // //                   {labTests.map((test, index) => (
// // // // // // // // //                     <div key={index} style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}>
// // // // // // // // //                       <strong>{test.test}</strong>
// // // // // // // // //                       <p>{test.description}</p>
// // // // // // // // //                     </div>
// // // // // // // // //                   ))}
// // // // // // // // //                 </div>
// // // // // // // // //               </div>

// // // // // // // // //               <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", marginTop: "20px" }}>
// // // // // // // // //                 <label>Radiology Tests:</label>
// // // // // // // // //                 <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
// // // // // // // // //                   <select
// // // // // // // // //                     value={radiologyTest.test}
// // // // // // // // //                     onChange={(e) => setRadiologyTest({ ...radiologyTest, test: e.target.value })}
// // // // // // // // //                   >
// // // // // // // // //                     <option value="">Select a radiology test</option>
// // // // // // // // //                     <option value="CT Scan">CT Scan</option>
// // // // // // // // //                     <option value="MRI">MRI</option>
// // // // // // // // //                     <option value="Ultrasound">Ultrasound</option>
// // // // // // // // //                   </select>
// // // // // // // // //                   {radiologyTest.test && (
// // // // // // // // //                     <textarea
// // // // // // // // //                       value={radiologyTest.description}
// // // // // // // // //                       onChange={(e) => setRadiologyTest({ ...radiologyTest, description: e.target.value })}
// // // // // // // // //                       placeholder="Enter description..."
// // // // // // // // //                       style={{ width: "100%", height: "50px", resize: "none", marginTop: "5px" }}
// // // // // // // // //                     ></textarea>
// // // // // // // // //                   )}
// // // // // // // // //                   <button type="button" onClick={handleAddRadiologyTest}>+</button>
// // // // // // // // //                 </div>
// // // // // // // // //                 <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "10px" }}>
// // // // // // // // //                   {radiologyTests.map((test, index) => (
// // // // // // // // //                     <div key={index} style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}>
// // // // // // // // //                       <strong>{test.test}</strong>
// // // // // // // // //                       <p>{test.description}</p>
// // // // // // // // //                     </div>
// // // // // // // // //                   ))}
// // // // // // // // //                 </div>
// // // // // // // // //               </div>

// // // // // // // // //               <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", marginTop: "20px" }}>
// // // // // // // // //                 <label>Is Referral Required:</label>
// // // // // // // // //                 <input
// // // // // // // // //                   type="checkbox"
// // // // // // // // //                   checked={isReferralRequired}
// // // // // // // // //                   onChange={(e) => setIsReferralRequired(e.target.checked)}
// // // // // // // // //                 />
// // // // // // // // //                 {isReferralRequired && (
// // // // // // // // //                   <div style={{ marginTop: "10px" }}>
// // // // // // // // //                     <label>Referral Doctor's Name:</label>
// // // // // // // // //                     <input
// // // // // // // // //                       type="text"
// // // // // // // // //                       value={referralDoctorName}
// // // // // // // // //                       onChange={(e) => setReferralDoctorName(e.target.value)}
// // // // // // // // //                       style={{ width: "100%" }}
// // // // // // // // //                       placeholder="Enter referral doctor's name..."
// // // // // // // // //                     />
// // // // // // // // //                   </div>
// // // // // // // // //                 )}
// // // // // // // // //               </div>

// // // // // // // // //               <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", marginTop: "20px" }}>
// // // // // // // // //                 <label>Observation of Doctor:</label>
// // // // // // // // //                 <textarea
// // // // // // // // //                   value={observation}
// // // // // // // // //                   onChange={(e) => setObservation(e.target.value)}
// // // // // // // // //                   style={{
// // // // // // // // //                     width: "100%",
// // // // // // // // //                     height: "100px",
// // // // // // // // //                     resize: "none",
// // // // // // // // //                   }}
// // // // // // // // //                   placeholder="Enter doctor's observations..."
// // // // // // // // //                 ></textarea>
// // // // // // // // //               </div>

// // // // // // // // //               <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", marginTop: "20px" }}>
// // // // // // // // //                 <label>Prescribe:</label>
// // // // // // // // //                 <textarea
// // // // // // // // //                   value={prescribeReq}
// // // // // // // // //                   onChange={(e) => setPrescribeReq(e.target.value)}
// // // // // // // // //                   style={{
// // // // // // // // //                     width: "100%",
// // // // // // // // //                     height: "100px",
// // // // // // // // //                     resize: "none",
// // // // // // // // //                   }}
// // // // // // // // //                   placeholder="Enter prescriptions..."
// // // // // // // // //                 ></textarea>
// // // // // // // // //               </div>

// // // // // // // // //               <button type="submit">Save Notes</button>
// // // // // // // // //             </form>
// // // // // // // // //           </div>
// // // // // // // // //         )}
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default Room;
// // // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // // import { useParams } from "react-router-dom";
// // // // // // // // import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

// // // // // // // // const Room = () => {
// // // // // // // //   const { roomID } = useParams();
// // // // // // // //   const [showNotePad, setShowNotePad] = useState(true);
// // // // // // // //   const [observation, setObservation] = useState("");
// // // // // // // //   const [labTests, setLabTests] = useState([]);
// // // // // // // //   const [labTest, setLabTest] = useState({ test: "", description: "" });
// // // // // // // //   const [radiologyTests, setRadiologyTests] = useState([]);
// // // // // // // //   const [radiologyTest, setRadiologyTest] = useState({ test: "", description: "" });
// // // // // // // //   const [prescribeReq, setPrescribeReq] = useState("");
// // // // // // // //   const [isReferralRequired, setIsReferralRequired] = useState(false);
// // // // // // // //   const [referralDoctorName, setReferralDoctorName] = useState("");

// // // // // // // //   const meetingRef = React.useRef(null);

// // // // // // // //   const initializeMeeting = async () => {
// // // // // // // //     const appID = 946219318;
// // // // // // // //     const serverSecret = "8e0b853d79deae0bcbfe949b73ca46a4";
// // // // // // // //     const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
// // // // // // // //       appID,
// // // // // // // //       serverSecret,
// // // // // // // //       roomID,
// // // // // // // //       Date.now().toString(),
// // // // // // // //       "user"
// // // // // // // //     );
// // // // // // // //     const zp = ZegoUIKitPrebuilt.create(kitToken);

// // // // // // // //     zp.joinRoom({
// // // // // // // //       container: meetingRef.current,
// // // // // // // //       scenario: {
// // // // // // // //         mode: ZegoUIKitPrebuilt.GroupCall,
// // // // // // // //       },
// // // // // // // //     });
// // // // // // // //   };

// // // // // // // //   useEffect(() => {
// // // // // // // //     initializeMeeting();

// // // // // // // //     const patientInfo = JSON.parse(localStorage.getItem('patientInfo'));
// // // // // // // //     if (patientInfo) setShowNotePad(false);
// // // // // // // //   }, []);

// // // // // // // //   useEffect(() => {
// // // // // // // //     window.scrollTo(0, 0);
// // // // // // // //   }, []);

// // // // // // // //   const handleAddLabTest = () => {
// // // // // // // //     if (labTest.test && labTest.description) {
// // // // // // // //       setLabTests([...labTests, labTest]);
// // // // // // // //       setLabTest({ test: "", description: "" });
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handleAddRadiologyTest = () => {
// // // // // // // //     if (radiologyTest.test && radiologyTest.description) {
// // // // // // // //       setRadiologyTests([...radiologyTests, radiologyTest]);
// // // // // // // //       setRadiologyTest({ test: "", description: "" });
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handleSubmit = (e) => {
// // // // // // // //     e.preventDefault();
// // // // // // // //     console.log({
// // // // // // // //       observation,
// // // // // // // //       labTests,
// // // // // // // //       radiologyTests,
// // // // // // // //       prescribeReq,
// // // // // // // //       isReferralRequired,
// // // // // // // //       referralDoctorName
// // // // // // // //     });
// // // // // // // //     // Reset state after submission if needed
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflowY: "auto" }}>
// // // // // // // //       <div style={{ flex: 1, display: "flex",backgroundColor: "white" }}>
// // // // // // // //         <div
// // // // // // // //           ref={meetingRef}
// // // // // // // //           style={{
// // // // // // // //             flex: 1,
// // // // // // // //             backgroundColor: "lightgray",
// // // // // // // //           }}
// // // // // // // //         ></div>

// // // // // // // //         {showNotePad && (
// // // // // // // //           <div
// // // // // // // //             style={{
// // // // // // // //               flex: 1,
// // // // // // // //               padding: "20px",
// // // // // // // //               display: "flex",
// // // // // // // //               flexDirection: "column",
// // // // // // // //               gap: "20px"
// // // // // // // //             }}
// // // // // // // //           >
// // // // // // // //             <form onSubmit={handleSubmit} style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px" ,backgroundColor: "white"}}>
// // // // // // // //               <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}>
// // // // // // // //                 <label>Lab Tests:</label>
// // // // // // // //                 <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
// // // // // // // //                   <select
// // // // // // // //                     value={labTest.test}
// // // // // // // //                     onChange={(e) => setLabTest({ ...labTest, test: e.target.value })}
// // // // // // // //                   >
// // // // // // // //                     <option value="">Select a lab test</option>
// // // // // // // //                     <option value="Blood Test">Blood Test</option>
// // // // // // // //                     <option value="Urine Test">Urine Test</option>
// // // // // // // //                     <option value="X-Ray">X-Ray</option>
// // // // // // // //                   </select>
// // // // // // // //                   {labTest.test && (
// // // // // // // //                     <textarea
// // // // // // // //                       value={labTest.description}
// // // // // // // //                       onChange={(e) => setLabTest({ ...labTest, description: e.target.value })}
// // // // // // // //                       placeholder="Enter description..."
// // // // // // // //                       style={{ width: "100%", height: "50px", resize: "none", marginTop: "5px" }}
// // // // // // // //                     ></textarea>
// // // // // // // //                   )}
// // // // // // // //                   <button type="button" onClick={handleAddLabTest}>+</button>
// // // // // // // //                 </div>
// // // // // // // //                 <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "10px" }}>
// // // // // // // //                   {labTests.map((test, index) => (
// // // // // // // //                     <div key={index} style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}>
// // // // // // // //                       <strong>{test.test}</strong>
// // // // // // // //                       <p>{test.description}</p>
// // // // // // // //                     </div>
// // // // // // // //                   ))}
// // // // // // // //                 </div>
// // // // // // // //               </div>

// // // // // // // //               <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}>
// // // // // // // //                 <label>Radiology Tests:</label>
// // // // // // // //                 <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
// // // // // // // //                   <select
// // // // // // // //                     value={radiologyTest.test}
// // // // // // // //                     onChange={(e) => setRadiologyTest({ ...radiologyTest, test: e.target.value })}
// // // // // // // //                   >
// // // // // // // //                     <option value="">Select a radiology test</option>
// // // // // // // //                     <option value="CT Scan">CT Scan</option>
// // // // // // // //                     <option value="MRI">MRI</option>
// // // // // // // //                     <option value="Ultrasound">Ultrasound</option>
// // // // // // // //                   </select>
// // // // // // // //                   {radiologyTest.test && (
// // // // // // // //                     <textarea
// // // // // // // //                       value={radiologyTest.description}
// // // // // // // //                       onChange={(e) => setRadiologyTest({ ...radiologyTest, description: e.target.value })}
// // // // // // // //                       placeholder="Enter description..."
// // // // // // // //                       style={{ width: "100%", height: "50px", resize: "none", marginTop: "5px" }}
// // // // // // // //                     ></textarea>
// // // // // // // //                   )}
// // // // // // // //                   <button type="button" onClick={handleAddRadiologyTest}>+</button>
// // // // // // // //                 </div>
// // // // // // // //                 <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "10px" }}>
// // // // // // // //                   {radiologyTests.map((test, index) => (
// // // // // // // //                     <div key={index} style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}>
// // // // // // // //                       <strong>{test.test}</strong>
// // // // // // // //                       <p>{test.description}</p>
// // // // // // // //                     </div>
// // // // // // // //                   ))}
// // // // // // // //                 </div>
// // // // // // // //               </div>

// // // // // // // //               <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", marginTop: "20px" }}>
// // // // // // // //                 <label>Is Referral Required:</label>
// // // // // // // //                 <input
// // // // // // // //                   type="checkbox"
// // // // // // // //                   checked={isReferralRequired}
// // // // // // // //                   onChange={(e) => setIsReferralRequired(e.target.checked)}
// // // // // // // //                 />
// // // // // // // //                 {isReferralRequired && (
// // // // // // // //                   <div style={{ marginTop: "10px" }}>
// // // // // // // //                     <label>Referral Doctor's Name:</label>
// // // // // // // //                     <input
// // // // // // // //                       type="text"
// // // // // // // //                       value={referralDoctorName}
// // // // // // // //                       onChange={(e) => setReferralDoctorName(e.target.value)}
// // // // // // // //                       style={{ width: "100%" }}
// // // // // // // //                       placeholder="Enter referral doctor's name..."
// // // // // // // //                     />
// // // // // // // //                   </div>
// // // // // // // //                 )}
// // // // // // // //               </div>

// // // // // // // //               <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", marginTop: "20px" }}>
// // // // // // // //                 <label>Observation of Doctor:</label>
// // // // // // // //                 <textarea
// // // // // // // //                   value={observation}
// // // // // // // //                   onChange={(e) => setObservation(e.target.value)}
// // // // // // // //                   style={{
// // // // // // // //                     width: "100%",
// // // // // // // //                     height: "100px",
// // // // // // // //                     resize: "none",
// // // // // // // //                   }}
// // // // // // // //                   placeholder="Enter doctor's observations..."
// // // // // // // //                 ></textarea>
// // // // // // // //               </div>

// // // // // // // //               <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", marginTop: "20px" }}>
// // // // // // // //                 <label>Prescribe:</label>
// // // // // // // //                 <textarea
// // // // // // // //                   value={prescribeReq}
// // // // // // // //                   onChange={(e) => setPrescribeReq(e.target.value)}
// // // // // // // //                   style={{
// // // // // // // //                     width: "100%",
// // // // // // // //                     height: "100px",
// // // // // // // //                     resize: "none",
// // // // // // // //                   }}
// // // // // // // //                   placeholder="Enter prescriptions..."
// // // // // // // //                 ></textarea>
// // // // // // // //               </div>

// // // // // // // //               <button type="submit">Save Notes</button>
// // // // // // // //             </form>
// // // // // // // //           </div>
// // // // // // // //         )}
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default Room;

// // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // import { useParams } from "react-router-dom";
// // // // // // // import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

// // // // // // // const Room = () => {
// // // // // // //   const { roomID } = useParams();
// // // // // // //   const [showNotePad, setShowNotePad] = useState(true);
// // // // // // //   const [observation, setObservation] = useState("");
// // // // // // //   const [labTests, setLabTests] = useState([]);
// // // // // // //   const [labTest, setLabTest] = useState({ test: "", description: "" });
// // // // // // //   const [radiologyTests, setRadiologyTests] = useState([]);
// // // // // // //   const [radiologyTest, setRadiologyTest] = useState({ test: "", description: "" });
// // // // // // //   const [prescribeReq, setPrescribeReq] = useState("");
// // // // // // //   const [isReferralRequired, setIsReferralRequired] = useState(false);
// // // // // // //   const [referralDoctorName, setReferralDoctorName] = useState("");

// // // // // // //   const meetingRef = React.useRef(null);

// // // // // // //   const initializeMeeting = async () => {
// // // // // // //     const appID = 946219318;
// // // // // // //     const serverSecret = "8e0b853d79deae0bcbfe949b73ca46a4";
// // // // // // //     const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
// // // // // // //       appID,
// // // // // // //       serverSecret,
// // // // // // //       roomID,
// // // // // // //       Date.now().toString(),
// // // // // // //       "user"
// // // // // // //     );
// // // // // // //     const zp = ZegoUIKitPrebuilt.create(kitToken);

// // // // // // //     zp.joinRoom({
// // // // // // //       container: meetingRef.current,
// // // // // // //       scenario: {
// // // // // // //         mode: ZegoUIKitPrebuilt.GroupCall,
// // // // // // //       },
// // // // // // //     });
// // // // // // //   };

// // // // // // //   useEffect(() => {
// // // // // // //     initializeMeeting();

// // // // // // //     const patientInfo = JSON.parse(localStorage.getItem('patientInfo'));
// // // // // // //     if (patientInfo) setShowNotePad(false);
// // // // // // //   }, []);

// // // // // // //   useEffect(() => {
// // // // // // //     window.scrollTo(0, 0);
// // // // // // //   }, []);

// // // // // // //   const handleAddLabTest = () => {
// // // // // // //     if (labTest.test && labTest.description) {
// // // // // // //       setLabTests([...labTests, labTest]);
// // // // // // //       setLabTest({ test: "", description: "" });
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleAddRadiologyTest = () => {
// // // // // // //     if (radiologyTest.test && radiologyTest.description) {
// // // // // // //       setRadiologyTests([...radiologyTests, radiologyTest]);
// // // // // // //       setRadiologyTest({ test: "", description: "" });
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleSubmit = (e) => {
// // // // // // //     e.preventDefault();
// // // // // // //     console.log({
// // // // // // //       observation,
// // // // // // //       labTests,
// // // // // // //       radiologyTests,
// // // // // // //       prescribeReq,
// // // // // // //       isReferralRequired,
// // // // // // //       referralDoctorName
// // // // // // //     });
// // // // // // //     // Reset state after submission if needed
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflowY: "auto" }}>
// // // // // // //       <div style={{ flex: 1, display: "flex", backgroundColor: "white" }}>
// // // // // // //         <div
// // // // // // //           ref={meetingRef}
// // // // // // //           style={{
// // // // // // //             flex: 1,
// // // // // // //             backgroundColor: "lightgray",
// // // // // // //           }}
// // // // // // //         ></div>

// // // // // // //         {showNotePad && (
// // // // // // //           <div
// // // // // // //             style={{
// // // // // // //               flex: 1,
// // // // // // //               padding: "20px",
// // // // // // //               display: "flex",
// // // // // // //               flexDirection: "column",
// // // // // // //               gap: "20px"
// // // // // // //             }}
// // // // // // //           >
// // // // // // //             <form onSubmit={handleSubmit} style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px", backgroundColor: "white" }}>
// // // // // // //               <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", backgroundColor: "white" }}>
// // // // // // //                 <label>Lab Tests:</label>
// // // // // // //                 {labTests.map((test, index) => (
// // // // // // //                   <div key={index} style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", backgroundColor: "white" }}>
// // // // // // //                     <strong>{test.test}</strong>
// // // // // // //                     <p>{test.description}</p>
// // // // // // //                   </div>
// // // // // // //                 ))}
// // // // // // //                 {!labTests.length && (
// // // // // // //                   <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
// // // // // // //                     <select
// // // // // // //                       value={labTest.test}
// // // // // // //                       onChange={(e) => setLabTest({ ...labTest, test: e.target.value })}
// // // // // // //                     >
// // // // // // //                       <option value="">Select a lab test</option>
// // // // // // //                       <option value="Blood Test">Blood Test</option>
// // // // // // //                       <option value="Urine Test">Urine Test</option>
// // // // // // //                       <option value="X-Ray">X-Ray</option>
// // // // // // //                     </select>
// // // // // // //                     {labTest.test && (
// // // // // // //                       <textarea
// // // // // // //                         value={labTest.description}
// // // // // // //                         onChange={(e) => setLabTest({ ...labTest, description: e.target.value })}
// // // // // // //                         placeholder="Enter description..."
// // // // // // //                         style={{ width: "100%", height: "50px", resize: "none", marginTop: "5px" }}
// // // // // // //                       ></textarea>
// // // // // // //                     )}
// // // // // // //                     {labTest.test && (
// // // // // // //                       <button type="button" onClick={handleAddLabTest}>Add</button>
// // // // // // //                     )}
// // // // // // //                   </div>
// // // // // // //                 )}
// // // // // // //               </div>

// // // // // // //               <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", backgroundColor: "white", marginTop: "20px" }}>
// // // // // // //                 <label>Radiology Tests:</label>
// // // // // // //                 {radiologyTests.map((test, index) => (
// // // // // // //                   <div key={index} style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", backgroundColor: "white" }}>
// // // // // // //                     <strong>{test.test}</strong>
// // // // // // //                     <p>{test.description}</p>
// // // // // // //                   </div>
// // // // // // //                 ))}
// // // // // // //                 {!radiologyTests.length && (
// // // // // // //                   <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
// // // // // // //                     <select
// // // // // // //                       value={radiologyTest.test}
// // // // // // //                       onChange={(e) => setRadiologyTest({ ...radiologyTest, test: e.target.value })}
// // // // // // //                     >
// // // // // // //                       <option value="">Select a radiology test</option>
// // // // // // //                       <option value="CT Scan">CT Scan</option>
// // // // // // //                       <option value="MRI">MRI</option>
// // // // // // //                       <option value="Ultrasound">Ultrasound</option>
// // // // // // //                     </select>
// // // // // // //                     {radiologyTest.test && (
// // // // // // //                       <textarea
// // // // // // //                         value={radiologyTest.description}
// // // // // // //                         onChange={(e) => setRadiologyTest({ ...radiologyTest, description: e.target.value })}
// // // // // // //                         placeholder="Enter description..."
// // // // // // //                         style={{ width: "100%", height: "50px", resize: "none", marginTop: "5px" }}
// // // // // // //                       ></textarea>
// // // // // // //                     )}
// // // // // // //                     {radiologyTest.test && (
// // // // // // //                       <button type="button" onClick={handleAddRadiologyTest}>Add</button>
// // // // // // //                     )}
// // // // // // //                   </div>
// // // // // // //                 )}
// // // // // // //               </div>

// // // // // // //               <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", marginTop: "20px", backgroundColor: "white" }}>
// // // // // // //                 <label>Is Referral Required:</label>
// // // // // // //                 <input
// // // // // // //                   type="checkbox"
// // // // // // //                   checked={isReferralRequired}
// // // // // // //                   onChange={(e) => setIsReferralRequired(e.target.checked)}
// // // // // // //                 />
// // // // // // //                 {isReferralRequired && (
// // // // // // //                   <div style={{ marginTop: "10px" }}>
// // // // // // //                     <label>Referral Doctor's Name:</label>
// // // // // // //                     <input
// // // // // // //                       type="text"
// // // // // // //                       value={referralDoctorName}
// // // // // // //                       onChange={(e) => setReferralDoctorName(e.target.value)}
// // // // // // //                       style={{ width: "100%" }}
// // // // // // //                       placeholder="Enter referral doctor's name..."
// // // // // // //                     />
// // // // // // //                   </div>
// // // // // // //                 )}
// // // // // // //               </div>

// // // // // // //               <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", marginTop: "20px", backgroundColor: "white" }}>
// // // // // // //                 <label>Observation of Doctor:</label>
// // // // // // //                 <textarea
// // // // // // //                   value={observation}
// // // // // // //                   onChange={(e) => setObservation(e.target.value)}
// // // // // // //                   style={{
// // // // // // //                     width: "100%",
// // // // // // //                     height: "100px",
// // // // // // //                     resize: "none",
// // // // // // //                   }}
// // // // // // //                   placeholder="Enter doctor's observations..."
// // // // // // //                 ></textarea>
// // // // // // //               </div>

// // // // // // //               <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", marginTop: "20px", backgroundColor: "white" }}>
// // // // // // //                 <label>Prescribe:</label>
// // // // // // //                 <textarea
// // // // // // //                   value={prescribeReq}
// // // // // // //                   onChange={(e) => setPrescribeReq(e.target.value)}
// // // // // // //                   style={{
// // // // // // //                     width: "100%",
// // // // // // //                     height: "100px",
// // // // // // //                     resize: "none",
// // // // // // //                   }}
// // // // // // //                   placeholder="Enter prescriptions..."
// // // // // // //                 ></textarea>
// // // // // // //               </div>

// // // // // // //               <button type="submit" style={{ marginTop: "20px" }}>Save Notes</button>
// // // // // // //             </form>
// // // // // // //           </div>
// // // // // // //         )}
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default Room;
// // // // // // import React, { useEffect, useState } from "react";
// // // // // // import { useParams } from "react-router-dom";
// // // // // // import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

// // // // // // const Room = () => {
// // // // // //   const { roomID } = useParams();
// // // // // //   const [showNotePad, setShowNotePad] = useState(true);
// // // // // //   const [observation, setObservation] = useState("");
// // // // // //   const [labTests, setLabTests] = useState([]);
// // // // // //   const [labTest, setLabTest] = useState({ test: "", description: "" });
// // // // // //   const [radiologyTests, setRadiologyTests] = useState([]);
// // // // // //   const [radiologyTest, setRadiologyTest] = useState({ test: "", description: "" });
// // // // // //   const [prescribeReq, setPrescribeReq] = useState("");
// // // // // //   const [isReferralRequired, setIsReferralRequired] = useState(false);
// // // // // //   const [referralDoctorName, setReferralDoctorName] = useState("");

// // // // // //   const meetingRef = React.useRef(null);

// // // // // //   const initializeMeeting = async () => {
// // // // // //     const appID = 946219318;
// // // // // //     const serverSecret = "8e0b853d79deae0bcbfe949b73ca46a4";
// // // // // //     const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
// // // // // //       appID,
// // // // // //       serverSecret,
// // // // // //       roomID,
// // // // // //       Date.now().toString(),
// // // // // //       "user"
// // // // // //     );
// // // // // //     const zp = ZegoUIKitPrebuilt.create(kitToken);

// // // // // //     zp.joinRoom({
// // // // // //       container: meetingRef.current,
// // // // // //       scenario: {
// // // // // //         mode: ZegoUIKitPrebuilt.GroupCall,
// // // // // //       },
// // // // // //     });
// // // // // //   };

// // // // // //   useEffect(() => {
// // // // // //     initializeMeeting();

// // // // // //     const patientInfo = JSON.parse(localStorage.getItem('patientInfo'));
// // // // // //     if (patientInfo) setShowNotePad(false);
// // // // // //   }, []);

// // // // // //   useEffect(() => {
// // // // // //     window.scrollTo(0, 0);
// // // // // //   }, []);

// // // // // //   const handleAddLabTest = () => {
// // // // // //     if (labTest.test && labTest.description) {
// // // // // //       setLabTests([...labTests, labTest]);
// // // // // //       setLabTest({ test: "", description: "" });
// // // // // //     }
// // // // // //   };

// // // // // //   const handleAddRadiologyTest = () => {
// // // // // //     if (radiologyTest.test && radiologyTest.description) {
// // // // // //       setRadiologyTests([...radiologyTests, radiologyTest]);
// // // // // //       setRadiologyTest({ test: "", description: "" });
// // // // // //     }
// // // // // //   };

// // // // // //   const handleSubmit = (e) => {
// // // // // //     e.preventDefault();
// // // // // //     console.log({
// // // // // //       observation,
// // // // // //       labTests,
// // // // // //       radiologyTests,
// // // // // //       prescribeReq,
// // // // // //       isReferralRequired,
// // // // // //       referralDoctorName
// // // // // //     });
// // // // // //     // Reset state after submission if needed
// // // // // //   };

// // // // // //   const handleAddAnotherLabTest = () => {
// // // // // //     handleAddLabTest();
// // // // // //     setLabTest({ test: "", description: "" });
// // // // // //   };

// // // // // //   const handleAddAnotherRadiologyTest = () => {
// // // // // //     handleAddRadiologyTest();
// // // // // //     setRadiologyTest({ test: "", description: "" });
// // // // // //   };

// // // // // //   return (
// // // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflowY: "auto" }}>
// // // // // //       <div style={{ flex: 1, display: "flex", backgroundColor: "white" }}>
// // // // // //         <div
// // // // // //           ref={meetingRef}
// // // // // //           style={{
// // // // // //             flex: 1,
// // // // // //             backgroundColor: "lightgray",
// // // // // //           }}
// // // // // //         ></div>

// // // // // //         {showNotePad && (
// // // // // //           <div
// // // // // //             style={{
// // // // // //               flex: 1,
// // // // // //               padding: "20px",
// // // // // //               display: "flex",
// // // // // //               flexDirection: "column",
// // // // // //               gap: "20px"
// // // // // //             }}
// // // // // //           >
// // // // // //             <form onSubmit={handleSubmit} style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px", backgroundColor: "white" }}>
// // // // // //               <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", backgroundColor: "white" }}>
// // // // // //                 <label>Lab Tests:</label>
// // // // // //                 {labTests.map((test, index) => (
// // // // // //                   <div key={index} style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", backgroundColor: "white" }}>
// // // // // //                     <strong>{test.test}</strong>
// // // // // //                     <p>{test.description}</p>
// // // // // //                   </div>
// // // // // //                 ))}
// // // // // //                 <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
// // // // // //                   <select
// // // // // //                     value={labTest.test}
// // // // // //                     onChange={(e) => setLabTest({ ...labTest, test: e.target.value })}
// // // // // //                   >
// // // // // //                     <option value="">Select a lab test</option>
// // // // // //                     <option value="Blood Test">Blood Test</option>
// // // // // //                     <option value="Urine Test">Urine Test</option>
// // // // // //                     <option value="X-Ray">X-Ray</option>
// // // // // //                   </select>
// // // // // //                   {labTest.test && (
// // // // // //                     <textarea
// // // // // //                       value={labTest.description}
// // // // // //                       onChange={(e) => setLabTest({ ...labTest, description: e.target.value })}
// // // // // //                       placeholder="Enter description..."
// // // // // //                       style={{ width: "100%", height: "50px", resize: "none", marginTop: "5px" }}
// // // // // //                     ></textarea>
// // // // // //                   )}
// // // // // //                   {labTest.test && (
// // // // // //                     <button type="button" onClick={handleAddAnotherLabTest}>Add Another</button>
// // // // // //                   )}
// // // // // //                 </div>
// // // // // //               </div>

// // // // // //               <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", backgroundColor: "white", marginTop: "20px" }}>
// // // // // //                 <label>Radiology Tests:</label>
// // // // // //                 {radiologyTests.map((test, index) => (
// // // // // //                   <div key={index} style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", backgroundColor: "white" }}>
// // // // // //                     <strong>{test.test}</strong>
// // // // // //                     <p>{test.description}</p>
// // // // // //                   </div>
// // // // // //                 ))}
// // // // // //                 <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
// // // // // //                   <select
// // // // // //                     value={radiologyTest.test}
// // // // // //                     onChange={(e) => setRadiologyTest({ ...radiologyTest, test: e.target.value })}
// // // // // //                   >
// // // // // //                     <option value="">Select a radiology test</option>
// // // // // //                     <option value="CT Scan">CT Scan</option>
// // // // // //                     <option value="MRI">MRI</option>
// // // // // //                     <option value="Ultrasound">Ultrasound</option>
// // // // // //                   </select>
// // // // // //                   {radiologyTest.test && (
// // // // // //                     <textarea
// // // // // //                       value={radiologyTest.description}
// // // // // //                       onChange={(e) => setRadiologyTest({ ...radiologyTest, description: e.target.value })}
// // // // // //                       placeholder="Enter description..."
// // // // // //                       style={{ width: "100%", height: "50px", resize: "none", marginTop: "5px" }}
// // // // // //                     ></textarea>
// // // // // //                   )}
// // // // // //                   {radiologyTest.test && (
// // // // // //                     <button type="button" onClick={handleAddAnotherRadiologyTest}>Add Another</button>
// // // // // //                   )}
// // // // // //                 </div>
// // // // // //               </div>

// // // // // //               <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", marginTop: "20px", backgroundColor: "white" }}>
// // // // // //                 <label>Is Referral Required:</label>
// // // // // //                 <input
// // // // // //                   type="checkbox"
// // // // // //                   checked={isReferralRequired}
// // // // // //                   onChange={(e) => setIsReferralRequired(e.target.checked)}
// // // // // //                 />
// // // // // //                 {isReferralRequired && (
// // // // // //                   <div style={{ marginTop: "10px" }}>
// // // // // //                     <label>Referral Doctor's Name:</label>
// // // // // //                     <input
// // // // // //                       type="text"
// // // // // //                       value={referralDoctorName}
// // // // // //                       onChange={(e) => setReferralDoctorName(e.target.value)}
// // // // // //                       style={{ width: "100%" }}
// // // // // //                       placeholder="Enter referral doctor's name..."
// // // // // //                     />
// // // // // //                   </div>
// // // // // //                 )}
// // // // // //               </div>

// // // // // //               <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", marginTop: "20px", backgroundColor: "white" }}>
// // // // // //                 <label>Observation of Doctor:</label>
// // // // // //                 <textarea
// // // // // //                   value={observation}
// // // // // //                   onChange={(e) => setObservation(e.target.value)}
// // // // // //                   style={{
// // // // // //                     width: "100%",
// // // // // //                     height: "100px",
// // // // // //                     resize: "none",
// // // // // //                   }}
// // // // // //                   placeholder="Enter doctor's observations..."
// // // // // //                 ></textarea>
// // // // // //               </div>

// // // // // //               <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", marginTop: "20px", backgroundColor: "white" }}>
// // // // // //                 <label>Prescribe:</label>
// // // // // //                 <textarea
// // // // // //                   value={prescribeReq}
// // // // // //                   onChange={(e) => setPrescribeReq(e.target.value)}
// // // // // //                   style={{
// // // // // //                     width: "100%",
// // // // // //                     height: "100px",
// // // // // //                     resize: "none",
// // // // // //                   }}
// // // // // //                   placeholder="Enter prescriptions..."
// // // // // //                 ></textarea>
// // // // // //               </div>

// // // // // //               <button type="submit" style={{ marginTop: "20px" }}>Save Notes</button>
// // // // // //             </form>
// // // // // //           </div>
// // // // // //         )}
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default Room;
// // // // // import React, { useEffect, useState } from "react";
// // // // // import { useParams } from "react-router-dom";
// // // // // import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

// // // // // const Room = () => {
// // // // //   const { roomID } = useParams();
// // // // //   const [showNotePad, setShowNotePad] = useState(true);
// // // // //   const [observation, setObservation] = useState("");
// // // // //   const [labTests, setLabTests] = useState([]);
// // // // //   const [labTest, setLabTest] = useState({ test: "", description: "" });
// // // // //   const [radiologyTests, setRadiologyTests] = useState([]);
// // // // //   const [radiologyTest, setRadiologyTest] = useState({ test: "", description: "" });
// // // // //   const [prescribeReq, setPrescribeReq] = useState("");
// // // // //   const [isReferralRequired, setIsReferralRequired] = useState(false);
// // // // //   const [referralDoctorName, setReferralDoctorName] = useState("");
// // // // //   const [showLabTestForm, setShowLabTestForm] = useState(true);
// // // // //   const [showRadiologyTestForm, setShowRadiologyTestForm] = useState(true);

// // // // //   const meetingRef = React.useRef(null);

// // // // //   const initializeMeeting = async () => {
// // // // //     const appID = 946219318;
// // // // //     const serverSecret = "8e0b853d79deae0bcbfe949b73ca46a4";
// // // // //     const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
// // // // //       appID,
// // // // //       serverSecret,
// // // // //       roomID,
// // // // //       Date.now().toString(),
// // // // //       "user"
// // // // //     );
// // // // //     const zp = ZegoUIKitPrebuilt.create(kitToken);

// // // // //     zp.joinRoom({
// // // // //       container: meetingRef.current,
// // // // //       scenario: {
// // // // //         mode: ZegoUIKitPrebuilt.GroupCall,
// // // // //       },
// // // // //     });
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     initializeMeeting();

// // // // //     const patientInfo = JSON.parse(localStorage.getItem('patientInfo'));
// // // // //     if (patientInfo) setShowNotePad(false);
// // // // //   }, []);

// // // // //   useEffect(() => {
// // // // //     window.scrollTo(0, 0);
// // // // //   }, []);

// // // // //   const handleAddLabTest = () => {
// // // // //     if (labTest.test && labTest.description) {
// // // // //       setLabTests([...labTests, labTest]);
// // // // //       setLabTest({ test: "", description: "" });
// // // // //       setShowLabTestForm(false);
// // // // //     }
// // // // //   };

// // // // //   const handleAddRadiologyTest = () => {
// // // // //     if (radiologyTest.test && radiologyTest.description) {
// // // // //       setRadiologyTests([...radiologyTests, radiologyTest]);
// // // // //       setRadiologyTest({ test: "", description: "" });
// // // // //       setShowRadiologyTestForm(false);
// // // // //     }
// // // // //   };

// // // // //   const handleSubmit = (e) => {
// // // // //     e.preventDefault();
// // // // //     console.log({
// // // // //       observation,
// // // // //       labTests,
// // // // //       radiologyTests,
// // // // //       prescribeReq,
// // // // //       isReferralRequired,
// // // // //       referralDoctorName
// // // // //     });
// // // // //     // Reset state after submission if needed
// // // // //   };

// // // // //   const handleAddAnotherLabTest = () => {
// // // // //     setLabTest({ test: "", description: "" });
// // // // //     setShowLabTestForm(true);
// // // // //   };

// // // // //   const handleAddAnotherRadiologyTest = () => {
// // // // //     setRadiologyTest({ test: "", description: "" });
// // // // //     setShowRadiologyTestForm(true);
// // // // //   };

// // // // //   return (
// // // // //     <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflowY: "auto" }}>
// // // // //       <div style={{ flex: 1, display: "flex", backgroundColor: "white" }}>
// // // // //         <div
// // // // //           ref={meetingRef}
// // // // //           style={{
// // // // //             flex: 1,
// // // // //             backgroundColor: "lightgray",
// // // // //           }}
// // // // //         ></div>

// // // // //         {showNotePad && (
// // // // //           <div
// // // // //             style={{
// // // // //               flex: 1,
// // // // //               padding: "20px",
// // // // //               display: "flex",
// // // // //               flexDirection: "column",
// // // // //               gap: "20px"
// // // // //             }}
// // // // //           >                  <label>Lab Tests:</label>

// // // // //             <form onSubmit={handleSubmit} style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px", backgroundColor: "white" }}>
// // // // //               {showLabTestForm && (
// // // // //                 <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", backgroundColor: "white" }}>
// // // // //                   <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
// // // // //                     <select
// // // // //                       value={labTest.test}
// // // // //                       onChange={(e) => setLabTest({ ...labTest, test: e.target.value })}
// // // // //                     >
// // // // //                       <option value="">Select a lab test</option>
// // // // //                       <option value="Blood Test">Blood Test</option>
// // // // //                       <option value="Urine Test">Urine Test</option>
// // // // //                       <option value="X-Ray">X-Ray</option>
// // // // //                     </select>
// // // // //                     {labTest.test && (
// // // // //                       <textarea
// // // // //                         value={labTest.description}
// // // // //                         onChange={(e) => setLabTest({ ...labTest, description: e.target.value })}
// // // // //                         placeholder="Enter description..."
// // // // //                         style={{ width: "100%", height: "50px", resize: "none", marginTop: "5px" }}
// // // // //                       ></textarea>
// // // // //                     )}
// // // // //                     {labTest.test && (
// // // // //                       <button type="button" onClick={handleAddLabTest}>Add Test</button>
// // // // //                     )}
// // // // //                   </div>
// // // // //                 </div>
// // // // //               )}

// // // // //               {labTests.map((test, index) => (
// // // // //                 <div key={index} style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", backgroundColor: "white" }}>
// // // // //                   <strong>{test.test}</strong>
// // // // //                   <p>{test.description}</p>
// // // // //                 </div>
// // // // //               ))}

// // // // //               {!showLabTestForm && (
// // // // //                 <button type="button" onClick={handleAddAnotherLabTest} style={{ marginTop: "10px" }}>Add Another Lab Test</button>
// // // // //               )}

// // // // //               {showRadiologyTestForm && (
// // // // //                 <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", backgroundColor: "white", marginTop: "20px" }}>
// // // // //                   <label>Radiology Tests:</label>
// // // // //                   <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
// // // // //                     <select
// // // // //                       value={radiologyTest.test}
// // // // //                       onChange={(e) => setRadiologyTest({ ...radiologyTest, test: e.target.value })}
// // // // //                     >
// // // // //                       <option value="">Select a radiology test</option>
// // // // //                       <option value="CT Scan">CT Scan</option>
// // // // //                       <option value="MRI">MRI</option>
// // // // //                       <option value="Ultrasound">Ultrasound</option>
// // // // //                     </select>
// // // // //                     {radiologyTest.test && (
// // // // //                       <textarea
// // // // //                         value={radiologyTest.description}
// // // // //                         onChange={(e) => setRadiologyTest({ ...radiologyTest, description: e.target.value })}
// // // // //                         placeholder="Enter description..."
// // // // //                         style={{ width: "100%", height: "50px", resize: "none", marginTop: "5px" }}
// // // // //                       ></textarea>
// // // // //                     )}
// // // // //                     {radiologyTest.test && (
// // // // //                       <button type="button" onClick={handleAddRadiologyTest}>Add Test</button>
// // // // //                     )}
// // // // //                   </div>
// // // // //                 </div>
// // // // //               )}

// // // // //               {radiologyTests.map((test, index) => (
// // // // //                 <div key={index} style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", backgroundColor: "white", marginTop: "10px" }}>
// // // // //                   <strong>{test.test}</strong>
// // // // //                   <p>{test.description}</p>
// // // // //                 </div>
// // // // //               ))}

// // // // //               {!showRadiologyTestForm && (
// // // // //                 <button type="button" onClick={handleAddAnotherRadiologyTest} style={{ marginTop: "10px" }}>Add Another Radiology Test</button>
// // // // //               )}

// // // // //               <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", marginTop: "20px", backgroundColor: "white" }}>
// // // // //                 <label>Is Referral Required:</label>
// // // // //                 <input
// // // // //                   type="checkbox"
// // // // //                   checked={isReferralRequired}
// // // // //                   onChange={(e) => setIsReferralRequired(e.target.checked)}
// // // // //                 />
// // // // //                 {isReferralRequired && (
// // // // //                   <div style={{ marginTop: "10px" }}>
// // // // //                     <label>Referral Doctor's Name:</label>
// // // // //                     <input
// // // // //                       type="text"
// // // // //                       value={referralDoctorName}
// // // // //                       onChange={(e) => setReferralDoctorName(e.target.value)}
// // // // //                       style={{ width: "100%" }}
// // // // //                       placeholder="Enter referral doctor's name..."
// // // // //                     />
// // // // //                   </div>
// // // // //                 )}
// // // // //               </div>

// // // // //               <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", marginTop: "20px", backgroundColor: "white" }}>
// // // // //                 <label>Observation of Doctor:</label>
// // // // //                 <textarea
// // // // //                   value={observation}
// // // // //                   onChange={(e) => setObservation(e.target.value)}
// // // // //                   style={{
// // // // //                     width: "100%",
// // // // //                     height: "100px",
// // // // //                     resize: "none",
// // // // //                   }}
// // // // //                   placeholder="Enter doctor's observations..."
// // // // //                 ></textarea>
// // // // //               </div>

// // // // //               <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", marginTop: "20px", backgroundColor: "white" }}>
// // // // //                 <label>Prescribe:</label>
// // // // //                 <textarea
// // // // //                   value={prescribeReq}
// // // // //                   onChange={(e) => setPrescribeReq(e.target.value)}
// // // // //                   style={{
// // // // //                   width: "100%",
// // // // //                   height: "100px",
// // // // //                   resize: "none",
// // // // //                   }}
// // // // //                   placeholder="Enter prescriptions..."
// // // // //                   ></textarea>
// // // // //                   </div>

// // // // //                   bash
// // // // //                   Copy code
// // // // //                             <button type="submit">Save Notes</button>
// // // // //                           </form>
// // // // //                         </div>
// // // // //                       )}
// // // // //                     </div>
// // // // //                   </div>
// // // // //                   );
// // // // //                   };

// // // // //                   export default Room;
// // // // import React, { useEffect, useState } from "react";
// // // // import { useParams } from "react-router-dom";
// // // // import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

// // // // const Room = () => {
// // // //   const { roomID } = useParams();
// // // //   const [showNotePad, setShowNotePad] = useState(true);
// // // //   const [observation, setObservation] = useState("");
// // // //   const [labTests, setLabTests] = useState([]);
// // // //   const [labTest, setLabTest] = useState({ test: "", description: "" });
// // // //   const [radiologyTests, setRadiologyTests] = useState([]);
// // // //   const [radiologyTest, setRadiologyTest] = useState({ test: "", description: "" });
// // // //   const [prescribeReq, setPrescribeReq] = useState("");
// // // //   const [isReferralRequired, setIsReferralRequired] = useState(false);
// // // //   const [referralDoctorName, setReferralDoctorName] = useState("");
// // // //   const [showLabTestForm, setShowLabTestForm] = useState(true);
// // // //   const [showRadiologyTestForm, setShowRadiologyTestForm] = useState(true);

// // // //   const meetingRef = React.useRef(null);

// // // //   const initializeMeeting = async () => {
// // // //     const appID = 946219318;
// // // //     const serverSecret = "8e0b853d79deae0bcbfe949b73ca46a4";
// // // //     const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
// // // //       appID,
// // // //       serverSecret,
// // // //       roomID,
// // // //       Date.now().toString(),
// // // //       "user"
// // // //     );
// // // //     const zp = ZegoUIKitPrebuilt.create(kitToken);

// // // //     zp.joinRoom({
// // // //       container: meetingRef.current,
// // // //       scenario: {
// // // //         mode: ZegoUIKitPrebuilt.GroupCall,
// // // //       },
// // // //     });
// // // //   };

// // // //   useEffect(() => {
// // // //     initializeMeeting();

// // // //     const patientInfo = JSON.parse(localStorage.getItem('patientInfo'));
// // // //     if (patientInfo) setShowNotePad(false);
// // // //   }, []);

// // // //   useEffect(() => {
// // // //     window.scrollTo(0, 0);
// // // //   }, []);

// // // //   const handleAddLabTest = () => {
// // // //     if (labTest.test.trim() !== "") {
// // // //       setLabTests([...labTests, labTest]);
// // // //       setLabTest({ test: "", description: "" });
// // // //       setShowLabTestForm(false);
// // // //     }
// // // //   };

// // // //   const handleAddRadiologyTest = () => {
// // // //     if (radiologyTest.test.trim() !== "") {
// // // //       setRadiologyTests([...radiologyTests, radiologyTest]);
// // // //       setRadiologyTest({ test: "", description: "" });
// // // //       setShowRadiologyTestForm(false);
// // // //     }
// // // //   };

// // // //   const handleSubmit = (e) => {
// // // //     e.preventDefault();
// // // //     console.log({
// // // //       observation,
// // // //       labTests,
// // // //       radiologyTests,
// // // //       prescribeReq,
// // // //       isReferralRequired,
// // // //       referralDoctorName
// // // //     });
// // // //     // Reset state after submission if needed
// // // //   };

// // // //   const handleAddAnotherLabTest = () => {
// // // //     setLabTest({ test: "", description: "" });
// // // //     setShowLabTestForm(true);
// // // //   };

// // // //   const handleAddAnotherRadiologyTest = () => {
// // // //     setRadiologyTest({ test: "", description: "" });
// // // //     setShowRadiologyTestForm(true);
// // // //   };

// // // //   return (
// // // //     <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
// // // //       <div style={{ flex: 1, display: "flex", backgroundColor: "white" }}>
// // // //         <div
// // // //           ref={meetingRef}
// // // //           style={{
// // // //             flex: 1,
// // // //             backgroundColor: "lightgray",

// // // //           }}
// // // //         ></div>

// // // //         {showNotePad && (
// // // //           <div
// // // //             style={{
// // // //               flex: 1,
// // // //               padding: "20px",
// // // //               display: "flex",
// // // //               flexDirection: "column",
// // // //               gap: "20px",
// // // //               marginRight:"20px",
// // // //               overflow:"auto"

// // // //             }}
// // // //           >
// // // //             <form onSubmit={handleSubmit} style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2px", backgroundColor: "white", padding: "20px" }}>
// // // //               <label>Lab Tests:</label>
// // // //               {!showLabTestForm && (
// // // //   <div
// // // //     onClick={handleAddAnotherLabTest}
// // // //     style={{  cursor: "pointer", color: "blue", textDecoration: "underline" }}
// // // //   >
// // // //     Add Another Lab Test
// // // //   </div>
// // // // )}
// // // //               {showLabTestForm && (
// // // //                 <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", backgroundColor: "white" }}>
// // // //                   <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
// // // //                     <select
// // // //                       value={labTest.test}
// // // //                       onChange={(e) => setLabTest({ ...labTest, test: e.target.value })}
// // // //                     >
// // // //                       <option value="">Select a lab test</option>
// // // //                       <option value="Blood Test">Blood Test</option>
// // // //                       <option value="Urine Test">Urine Test</option>
// // // //                       <option value="X-Ray">X-Ray</option>
// // // //                     </select>
// // // //                     {labTest.test && (
// // // //                       <textarea
// // // //                         value={labTest.description}
// // // //                         onChange={(e) => setLabTest({ ...labTest, description: e.target.value })}
// // // //                         placeholder="Enter description..."
// // // //                         style={{ width: "100%", height: "50px", resize: "none", marginTop: "5px" }}
// // // //                       ></textarea>
// // // //                     )}
// // // //                     {labTest.test && (
// // // //                       <button type="button" onClick={handleAddLabTest}>Add Test</button>
// // // //                     )}
// // // //                   </div>
// // // //                 </div>
// // // //               )}

// // // //               {labTests.map((test, index) => (
// // // //                 <div key={index} style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", backgroundColor: "white" }}>
// // // //                   <strong>{test.test}</strong>
// // // //                   <p>{test.description}</p>
// // // //                 </div>
// // // //               ))}

// // // //               <label>Radiology Tests:</label>
// // // //               {showRadiologyTestForm && (
// // // //                 <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", backgroundColor: "white" }}>
// // // //                   <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
// // // //                     <select
// // // //                       value={radiologyTest.test}
// // // //                       onChange={(e) => setRadiologyTest({ ...radiologyTest, test: e.target.value })}
// // // //                     >
// // // //                       <option value="">Select a radiology test</option>
// // // //                       <option value="CT Scan">CT Scan</option>
// // // //                       <option value="MRI">MRI</option>
// // // //                       <option value="Ultrasound">Ultrasound</option>
// // // //                     </select>
// // // //                     {radiologyTest.test && (
// // // //                       <textarea
// // // //                         value={radiologyTest.description}
// // // //                         onChange={(e) => setRadiologyTest({ ...radiologyTest, description: e.target.value })}
// // // //                         placeholder="Enter description..."
// // // //                         style={{ width: "100%", height: "50px", resize: "none", marginTop: "5px" }}
// // // //                       ></textarea>
// // // //                     )}
// // // //                     {radiologyTest.test && (
// // // //                       <button type="button" onClick={handleAddRadiologyTest}>Add Test</button>
// // // //                     )}
// // // //                   </div>
// // // //                 </div>
// // // //               )}

// // // //               {radiologyTests.map((test, index) => (
// // // //                 <div key={index} style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", backgroundColor: "white", marginTop: "10px" }}>
// // // //                   <strong>{test.test}</strong>
// // // //                   <p>{test.description}</p>
// // // //                 </div>
// // // //               ))}

// // // //               {!showRadiologyTestForm && (
// // // //                 <button type="button" onClick={handleAddAnotherRadiologyTest} style={{ marginTop: "10px" }}>Add Another Radiology Test</button>
// // // //               )}

// // // //               <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", marginTop: "20px", backgroundColor: "white" }}>
// // // //                 <label>Is Referral Required:</label>
// // // //                 <input
// // // //                   type="checkbox"
// // // //                   checked={isReferralRequired}
// // // //                   onChange={(e) => setIsReferralRequired(e.target.checked)}
// // // //                 />
// // // //                 {isReferralRequired && (
// // // //                   <div style={{ marginTop: "10px" }}>
// // // //                     <label>Referral Doctor's Name:</label>
// // // //                     <input
// // // //                       type="text"
// // // //                       value={referralDoctorName}
// // // //                       onChange={(e) => setReferralDoctorName(e.target.value)}
// // // //                       style={{ width: "100%" }}
// // // //                       placeholder="Enter referral doctor's name..."
// // // //                     />
// // // //                   </div>
// // // //                 )}
// // // //               </div>

// // // //               <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", marginTop: "20px", backgroundColor: "white" }}>
// // // //                 <label>Observation of Doctor:</label>
// // // //                 <textarea
// // // //                   value={observation}
// // // //                   onChange={(e) => setObservation(e.target.value)}
// // // //                   style={{
// // // //                     width: "100%",
// // // //                     height: "100px",
// // // //                     resize: "none",
// // // //                   }}
// // // //                   placeholder="Enter doctor's observations..."
// // // //                 ></textarea>
// // // //               </div>

// // // //               <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", marginTop: "20px", backgroundColor: "white" }}>
// // // //                 <label>Prescribe:</label>
// // // //                 <textarea
// // // //                   value={prescribeReq}
// // // //                   onChange={(e) => setPrescribeReq(e.target.value)}
// // // //                   style={{
// // // //                   width: "100%",
// // // //                   height: "100px",
// // // //                   resize: "none",
// // // //                   }}
// // // //                   placeholder="Enter prescriptions..."
// // // //                   ></textarea>
// // // //                   </div>

// // // //                   <button type="submit">Save Notes</button>
// // // //                 </form>
// // // //               </div>
// // // //             )}
// // // //           </div>

// // // //       </div>

// // // //   );
// // // // };

// // // // export default Room;

// // // import React, { useEffect, useState } from "react";
// // // import { useParams } from "react-router-dom";
// // // import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

// // // const Room = () => {
// // //   const { roomID } = useParams();
// // //   const [showNotePad, setShowNotePad] = useState(true);
// // //   const [observation, setObservation] = useState("");
// // //   const [labTests, setLabTests] = useState([]);
// // //   const [labTest, setLabTest] = useState({ test: "", description: "" });
// // //   const [radiologyTests, setRadiologyTests] = useState([]);
// // //   const [radiologyTest, setRadiologyTest] = useState({ test: "", description: "" });
// // //   const [prescribeReq, setPrescribeReq] = useState("");
// // //   const [isReferralRequired, setIsReferralRequired] = useState(false);
// // //   const [referralDoctorName, setReferralDoctorName] = useState("");
// // //   const [showLabTestForm, setShowLabTestForm] = useState(true);
// // //   const [showRadiologyTestForm, setShowRadiologyTestForm] = useState(true);
// // //   const [isLabTestRequired, setIsLabTestRequired] = useState(null);  // New state variable
// // //   const [isRadiologyTestRequired, setIsRadiologyTestRequired] = useState(null);  // New state variable
// // //   const meetingRef = React.useRef(null);

// // //   const initializeMeeting = async () => {
// // //     const appID = 946219318;
// // //     const serverSecret = "8e0b853d79deae0bcbfe949b73ca46a4";
// // //     const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
// // //       appID,
// // //       serverSecret,
// // //       roomID,
// // //       Date.now().toString(),
// // //       "user"
// // //     );
// // //     const zp = ZegoUIKitPrebuilt.create(kitToken);

// // //     zp.joinRoom({
// // //       container: meetingRef.current,
// // //       scenario: {
// // //         mode: ZegoUIKitPrebuilt.GroupCall,
// // //       },
// // //     });
// // //   };

// // //   useEffect(() => {
// // //     initializeMeeting();

// // //     const patientInfo = JSON.parse(localStorage.getItem('patientInfo'));
// // //     if (patientInfo) setShowNotePad(false);
// // //   }, []);

// // //   useEffect(() => {
// // //     window.scrollTo(0, 0);
// // //   }, []);

// // //   const handleAddLabTest = () => {
// // //     if (labTest.test.trim() !== "") {
// // //       setLabTests([...labTests, labTest]);
// // //       setLabTest({ test: "", description: "" });
// // //       setShowLabTestForm(false);
// // //     }
// // //   };

// // //   const handleAddRadiologyTest = () => {
// // //     if (radiologyTest.test.trim() !== "") {
// // //       setRadiologyTests([...radiologyTests, radiologyTest]);
// // //       setRadiologyTest({ test: "", description: "" });
// // //       setShowRadiologyTestForm(false);
// // //     }
// // //   };

// // //   const handleSubmit = (e) => {
// // //     e.preventDefault();
// // //     console.log({
// // //       observation,
// // //       labTests,
// // //       radiologyTests,
// // //       prescribeReq,
// // //       isReferralRequired,
// // //       referralDoctorName
// // //     });
// // //     // Reset state after submission if needed
// // //   };

// // //   const handleAddAnotherLabTest = () => {
// // //     setLabTest({ test: "", description: "" });
// // //     setShowLabTestForm(true);
// // //   };

// // //   const handleAddAnotherRadiologyTest = () => {
// // //     setRadiologyTest({ test: "", description: "" });
// // //     setShowRadiologyTestForm(true);
// // //   };

// // //   return (
// // //     <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
// // // {/* Meeting and Notepad containers */}
// // // <div style={{ flex: 1, display: "flex", background:"lightgray"
// // //  }}>
// // //   {/* Meeting container */}
// // //   <div
// // //     ref={meetingRef}
// // //     style={{
// // //       flex: 1,
// // //       backgroundColor: "lightgray", // Optional: Add background color for visualization
// // //     }}
// // //   ></div>

// // //   {/* Notepad container */}
// // //   {showNotePad && (
// // //           <div
// // //                 style={{
// // //                   flex: 1,
// // //                   padding: "20px",
// // //                   display: "flex",
// // //                   flexDirection: "column",
// // //                   gap: "20px",
// // //                   margin: "10px 20px 10px 20px", // Add 20px left margin
// // //                   height: "100vh",
// // //                   border: "1px solid #ccc", // Optional: Add a border color
// // //                   borderRadius: "10px", // Adjust the value for the desired roundness
// // //                   background:"white"
// // //                 }}
// // //               >
// // //             <form
// // //               onSubmit={handleSubmit}
// // //               style={{
// // //                 flex: 1,
// // //                 display: "flex",
// // //                 flexDirection: "column",
// // //                 gap: "2px",
// // //                 backgroundColor: "white",
// // //                 padding: "20px",
// // //                 overflowY: "auto",
// // //               }}
// // //             >
// // //               <label>Lab Tests:</label>

// // //               {!showLabTestForm && (
// // //                 <div
// // //                   onClick={handleAddAnotherLabTest}
// // //                   style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }} >
// // //                   Add Another Lab Test
// // //                 </div>
// // //               )}

// // //               {showLabTestForm && (
// // //                 <div style={{ borderRadius: "5px", padding: "10px", backgroundColor: "white" }}>
// // //                 <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
// // //                     <select
// // //                       value={labTest.test}
// // //                       onChange={(e) => setLabTest({ ...labTest, test: e.target.value })}>
// // //                       <option value="">Select a lab test</option>
// // //                       <option value="Blood Test">Blood Test</option>
// // //                       <option value="Urine Test">Urine Test</option>
// // //                       <option value="X-Ray">X-Ray</option>
// // //                     </select>
// // //                     {labTest.test && (
// // //                       <textarea
// // //                         value={labTest.description}
// // //                         onChange={(e) => setLabTest({ ...labTest, description: e.target.value })}
// // //                         placeholder="Enter description..."
// // //                         style={{ width: "100%", height: "50px", resize: "none", marginTop: "5px" , alignItems: "center",padding:"5px"}}
// // //                       ></textarea>
// // //                     )}
// // //                     {labTest.test && (
// // //                       <button type="button" onClick={handleAddLabTest}>Add Test</button>
// // //                     )}
// // //                  </div>
// // //                 </div>
// // //               )}

// // //               {labTests.map((test, index) => (
// // //                 <div key={index} style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", backgroundColor: "white" }}>
// // //                   <strong>{test.test}</strong>
// // //                   <p>{test.description}</p>
// // //                 </div>
// // //               ))}

// // //               <label>Radiology Tests:</label>
// // //               {showRadiologyTestForm && (
// // //                 <div style={{ borderRadius: "5px", padding: "10px", backgroundColor: "white" }}>
// // //                   <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
// // //                     <select
// // //                       value={radiologyTest.test}
// // //                       onChange={(e) => setRadiologyTest({ ...radiologyTest, test: e.target.value })}
// // //                     >
// // //                       <option value="">Select a radiology test</option>
// // //                       <option value="CT Scan">CT Scan</option>
// // //                       <option value="MRI">MRI</option>
// // //                       <option value="Ultrasound">Ultrasound</option>
// // //                     </select>
// // //                     {radiologyTest.test && (
// // //                       <textarea
// // //                         value={radiologyTest.description}
// // //                         onChange={(e) => setRadiologyTest({ ...radiologyTest, description: e.target.value })}
// // //                         placeholder="Enter description..."
// // //                         style={{ width: "100%", height: "50px", resize: "none", marginTop: "5px" ,padding:"5px"}}
// // //                       ></textarea>
// // //                     )}
// // //                     {radiologyTest.test && (
// // //                       <button type="button" onClick={handleAddRadiologyTest}>Add Test</button>
// // //                     )}
// // //                   </div>
// // //                 </div>
// // //               )}

// // //               {radiologyTests.map((test, index) => (
// // //                 <div key={index} style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", backgroundColor: "white", marginTop: "10px" }}>
// // //                   <strong>{test.test}</strong>
// // //                   <p>{test.description}</p>
// // //                 </div>
// // //               ))}

// // //               {!showRadiologyTestForm && (
// // //                 <button type="button" onClick={handleAddAnotherRadiologyTest} style={{ marginTop: "10px" }}>Add Another Radiology Test</button>
// // //               )}

// // //               <div style={{  borderRadius: "5px", padding: "10px", marginTop: "20px", backgroundColor: "white" }}>
// // //                 <label>Is Referral Required : </label>
// // //                 <input
// // //                   type="checkbox"
// // //                   checked={isReferralRequired}
// // //                   onChange={(e) => setIsReferralRequired(e.target.checked)}
// // //                 />
// // //                 {isReferralRequired && (
// // //                   <div style={{ marginTop: "10px" }}>
// // //                     <label>Referral Doctor's Name:</label>
// // //                     <input
// // //                       type="text"
// // //                       value={referralDoctorName}
// // //                       onChange={(e) => setReferralDoctorName(e.target.value)}
// // //                       style={{ width: "100%" }}
// // //                       placeholder="Enter referral doctor's name..."
// // //                     />
// // //                   </div>
// // //                 )}
// // //               </div>

// // //               <div style={{  borderRadius: "5px", padding: "10px", marginTop: "20px", backgroundColor: "white" }}>
// // //                 <label>Observation of Doctor:</label>
// // //                 <textarea
// // //                   value={observation}
// // //                   onChange={(e) => setObservation(e.target.value)}
// // //                   style={{
// // //                     width: "100%",
// // //                     height: "100px",
// // //                     resize: "none",padding:"10px"
// // //                   }}
// // //                   placeholder="Enter doctor's observations..."
// // //                 ></textarea>
// // //               </div>

// // //               <div style={{ borderRadius: "5px", padding: "10px", marginTop: "20px", backgroundColor: "white" }}>
// // //                 <label>Prescribe:</label>
// // //                 <textarea
// // //                   value={prescribeReq}
// // //                   onChange={(e) => setPrescribeReq(e.target.value)}
// // //                   style={{
// // //                     width: "100%",
// // //                     height: "100px",
// // //                     resize: "none",padding:"10px"
// // //                   }}
// // //                   placeholder="Enter prescriptions..."
// // //                 ></textarea>
// // //               </div>

// // //               <button type="submit">Save Notes</button>
// // //             </form>
// // //           </div>
// // //         )}

// // // </div>
// // // </div>);
// // // };

// // // export default Room;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

// const Room = () => {
//   const { roomID } = useParams();
//   const [showNotePad, setShowNotePad] = useState(true);
//   const [observation, setObservation] = useState("");
//   const [labTests, setLabTests] = useState([]);
//   const [labTest, setLabTest] = useState({ test: "", description: "" });
//   const [radiologyTests, setRadiologyTests] = useState([]);
//   const [radiologyTest, setRadiologyTest] = useState({ test: "", description: "" });
//   const [prescribeReq, setPrescribeReq] = useState("");
//   const [isReferralRequired, setIsReferralRequired] = useState(false);
//   const [referralDoctorName, setReferralDoctorName] = useState("");
//   const [showLabTestForm, setShowLabTestForm] = useState(true);
//   const [showRadiologyTestForm, setShowRadiologyTestForm] = useState(true);
//   const [isLabTestRequired, setIsLabTestRequired] = useState(null);  // New state variable
//   const [isRadTestRequired, setIsRadTestRequired] = useState(null);  // New state variable
//   const meetingRef = React.useRef(null);

//   const initializeMeeting = async () => {
//     const appID = 946219318;
//     const serverSecret = "8e0b853d79deae0bcbfe949b73ca46a4";
//     const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
//       appID,
//       serverSecret,
//       roomID,
//       Date.now().toString(),
//       "user"
//     );
//     const zp = ZegoUIKitPrebuilt.create(kitToken);

//     zp.joinRoom({
//       container: meetingRef.current,
//       scenario: {
//         mode: ZegoUIKitPrebuilt.GroupCall,
//       },
//     });
//   };

//   useEffect(() => {
//     initializeMeeting();

//     const patientInfo = JSON.parse(localStorage.getItem('patientInfo'));
//     if (patientInfo) setShowNotePad(false);
//   }, []);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const handleAddLabTest = () => {
//     if (labTest.test.trim() !== "") {
//       setLabTests([...labTests, labTest]);
//       setLabTest({ test: "", description: "" });
//       setShowLabTestForm(false);
//     }
//   };

//   const handleAddRadiologyTest = () => {
//     if (radiologyTest.test.trim() !== "") {
//       setRadiologyTests([...radiologyTests, radiologyTest]);
//       setRadiologyTest({ test: "", description: "" });
//       setShowRadiologyTestForm(false);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log({
//       observation,
//       labTests,
//       radiologyTests,
//       prescribeReq,
//       isReferralRequired,
//       referralDoctorName
//     });
//     // Reset state after submission if needed
//   };

//   const handleAddAnotherLabTest = () => {
//     setLabTest({ test: "", description: "" });
//     setShowLabTestForm(true);
//   };

//   const handleAddAnotherRadiologyTest = () => {
//     setRadiologyTest({ test: "", description: "" });
//     setShowRadiologyTestForm(true);
//   };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
//       <div style={{ flex: 1, display: "flex", background:"lightgray" }}>
//         {/* Meeting container */}
//         <div
//           ref={meetingRef}
//           style={{
//             flex: 1,
//             backgroundColor: "lightgray",
//           }}
//         ></div>

//         {/* Notepad container */}
//         {showNotePad && (
//           <div
//             style={{
//               flex: 1,
//               padding: "20px",
//               display: "flex",
//               flexDirection: "column",
//               gap: "20px",
//               margin: "10px 20px 10px 20px",
//               height: "100vh",
//               border: "1px solid #ccc",
//               borderRadius: "10px",
//               background: "white"
//             }}
//           >
//             <form
//               onSubmit={handleSubmit}
//               style={{
//                 flex: 1,
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: "2px",
//                 backgroundColor: "white",
//                 padding: "20px",
//                 overflowY: "auto",
//               }}
//             >
// <label style={{ fontWeight: "bold",fontSize:"15px" }}>Lab Tests:</label>

// <div style={{ borderRadius: "5px", padding: "10px", backgroundColor: "white" }}>
//   <div style={{ display: "flex", alignItems: "center" }}>
//     <label style={{ fontSize: "15px", marginRight: "20px" }}>Is Lab Test Required:</label>

//     <div style={{ display: "flex", alignItems: "center", marginRight: "20px" }}>
//       <input
//         type="radio"
//         id="labTestYes"
//         name="labTestRequired"
//         value="yes"
//         checked={isLabTestRequired === true}
//         onChange={() => setIsLabTestRequired(true)}
//         style={{ marginRight: "5px" }}
//       />
//       <label htmlFor="labTestYes">Yes</label>
//     </div>

//     <div style={{ display: "flex", alignItems: "center", marginRight: "20px" }}>
//       <input
//         type="radio"
//         id="labTestNo"
//         name="labTestRequired"
//         value="no"
//         checked={isLabTestRequired === false}
//         onChange={() => setIsLabTestRequired(false)}
//         style={{ marginRight: "5px", marginLeft: "20px" }}
//       />
//       <label htmlFor="labTestNo">No</label>
//     </div>

//     {!showLabTestForm && (
//       <a onClick={handleAddAnotherLabTest} className="add-prescription" style={{ display: "flex", alignItems: "center" }}>
//         <i className="fa fa-plus-circle" style={{ marginRight: "5px" }}></i> Add More
//       </a>
//     )}
//   </div>
// </div>

//               {isLabTestRequired && showLabTestForm && (
//                 <div style={{ borderRadius: "5px", padding: "10px", backgroundColor: "white" }}>
//                   <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//                     <select
//                       value={labTest.test}
//                       onChange={(e) => setLabTest({ ...labTest, test: e.target.value })}
//                     >
//                       <option value="">Select a lab test</option>
//                       <option value="Blood Test">Blood Test</option>
//                       <option value="Urine Test">Urine Test</option>
//                       <option value="X-Ray">X-Ray</option>
//                     </select>
//                     {labTest.test && (
//                       <textarea
//                         value={labTest.description}
//                         onChange={(e) => setLabTest({ ...labTest, description: e.target.value })}
//                         placeholder="Enter description..."
//                         style={{ width: "100%", height: "50px", resize: "none", marginTop: "5px", padding: "5px" }}
//                       ></textarea>
//                     )}
//                     {labTest.test && (
//                       <button type="button" onClick={handleAddLabTest}>Add </button>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {labTests.map((test, index) => (
//                 <div key={index} style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", backgroundColor: "white", marginTop: "10px" }}>
// <strong style={{ fontSize: "13px" }}>{test.test}</strong>
// <p>{test.description}</p>
//                 </div>
//               ))}

//               <label style={{ fontWeight: "bold",fontSize:"15px" ,marginTop:"10px"}}>Radiology Tests:</label>
//               <div style={{ borderRadius: "5px", padding: "10px", backgroundColor: "white" }}>
//   <div style={{ display: "flex", alignItems: "center" }}>
//     <label style={{ fontSize: "15px", marginRight: "20px" }}>Is Radio Test Required:</label>

//     <div style={{ display: "flex", alignItems: "center", marginRight: "20px" }}>
//       <input
//         type="radio"
//         id="RadTestYes"
//         name="RadTestRequired"
//         value="yes"
//         checked={isRadTestRequired === true}
//         onChange={() => setIsRadTestRequired(true)}
//         style={{ marginRight: "5px" }}
//       />
//       <label htmlFor="RadTestYes">Yes</label>
//     </div>

//     <div style={{ display: "flex", alignItems: "center", marginRight: "20px" }}>
//       <input
//         type="radio"
//         id="RadTestNo"
//         name="RadTestRequired"
//         value="no"
//         checked={isRadTestRequired === false}
//         onChange={() => setIsRadTestRequired(false)}
//         style={{ marginRight: "5px", marginLeft: "20px" }}
//       />
//       <label htmlFor="RadTestNo">No</label>
//     </div>

//     {!showRadiologyTestForm && (
//       <a onClick={handleAddAnotherRadiologyTest} className="add-prescription" style={{ display: "flex", alignItems: "center" }}>
//         <i className="fa fa-plus-circle" style={{ marginRight: "5px" }}></i> Add More
//       </a>
//     )}
//   </div>
// </div>

//               {isRadTestRequired && showRadiologyTestForm && (
//                 <div style={{ borderRadius: "5px", padding: "10px", backgroundColor: "white" }}>
//                   <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//                     <select
//                       value={radiologyTest.test}
//                       onChange={(e) => setRadiologyTest({ ...radiologyTest, test: e.target.value })}
//                     >
//                       <option value="">Select a radiology test</option>
//                       <option value="CT Scan">CT Scan</option>
//                       <option value="MRI">MRI</option>
//                       <option value="Ultrasound">Ultrasound</option>
//                     </select>
//                     {radiologyTest.test && (
//                       <textarea
//                         value={radiologyTest.description}
//                         onChange={(e) => setRadiologyTest({ ...radiologyTest, description: e.target.value })}
//                         placeholder="Enter description..."
//                         style={{ width: "100%", height: "50px", resize: "none", marginTop: "5px", padding: "5px" }}
//                       ></textarea>
//                     )}
//                     {radiologyTest.test && (
//                       <button type="button" onClick={handleAddRadiologyTest}>Add Test</button>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {radiologyTests.map((test, index) => (
//                 <div key={index} style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", backgroundColor: "white", marginTop: "10px" }}>
//                   <strong>{test.test}</strong>
//                   <p>{test.description}</p>
//                 </div>
//               ))}

//               {/* {!showRadiologyTestForm && (
//                 <button type="button" onClick={handleAddAnotherRadiologyTest} style={{ marginTop: "10px" }}>Add Another Radiology Test</button>
//               )} */}

//               <div style={{ borderRadius: "5px", padding: "10px", marginTop: "20px", backgroundColor: "white" }}>
//               <div style={{ display: "flex", alignItems: "center" }}>
//       <label style={{ fontWeight: "bold", fontSize: "15px", marginRight: "10px" }}>
//         Is Referral Required:
//       </label>
//       <input
//         type="checkbox"
//         checked={isReferralRequired}
//         onChange={(e) => setIsReferralRequired(e.target.checked)}
//         style={{ marginLeft: "10px" }}
//       />
//       <label htmlFor="checkbox">Yes</label>
//     </div>
//                 {isReferralRequired && (
//                   <div style={{ marginTop: "10px" }}>
//                     <label>Referral Doctor's Name:</label>
//                     <input
//                       type="text"
//                       value={referralDoctorName}
//                       onChange={(e) => setReferralDoctorName(e.target.value)}
//                       style={{ width: "100%" }}
//                       placeholder="Enter referral doctor's name..."
//                     />
//                   </div>
//                 )}
//               </div>

//               <div style={{ borderRadius: "5px", padding: "10px", marginTop: "20px", backgroundColor: "white" }}>
//                 <label style={{fontWeight: "bold", fontSize:"15px" }}>Observation of Doctor:</label>
//                 <textarea
//                   value={observation}
//                   onChange={(e) => setObservation(e.target.value)}
//                   style={{
//                     width: "100%",
//                     height: "100px",
//                     resize: "none",
//                     padding: "10px"
//                   }}
//                   placeholder="Enter doctor's observations..."
//                 ></textarea>
//               </div>

//               <div style={{ borderRadius: "5px", padding: "10px", marginTop: "20px", backgroundColor: "white" }}>
//                 <label style={{fontWeight: "bold", fontSize:"15px" }}>Prescribe:</label>
//                 <textarea
//                   value={prescribeReq}
//                   onChange={(e) => setPrescribeReq(e.target.value)}
//                   style={{
//                     width: "100%",
//                     height: "100px",
//                     resize: "none",
//                     padding: "10px"
//                   }}
//                   placeholder="Enter prescriptions..."
//                 ></textarea>
//               </div>

//               <button type="submit">Save Notes</button>
//             </form>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Room;

// // import React from "react";

// // const SubmittedDataCard = () => {
// //   // Static data to simulate form submission
// //   const formData = {
// //     observation: "Patient seems to have a mild fever.",
// //     prescribeReq: "Paracetamol 500mg, three times a day.",
// //     isReferralRequired: true,
// //     referralDoctorName: "Dr. Smith",
// //     labTests: [
// //       { test: "Blood Test", description: "Complete blood count" },
// //       { test: "Urine Test", description: "Routine urine analysis" }
// //     ],
// //     radiologyTests: [
// //       { test: "X-Ray", description: "Chest X-Ray" }
// //     ]
// //   };

// //   return (
// //     <div style={{
// //       border: "1px solid #ccc",
// //       borderRadius: "10px",
// //       padding: "20px",
// //       margin: "10px",
// //       backgroundColor: "white",
// //       boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" // Add box shadow for each card
// //     }}>
// //       <h3 style={{ marginBottom: "20px" }}>Submitted Data</h3>

// //       {/* Observation */}
// //       <div style={{
// //         marginBottom: "20px",
// //         padding: "15px",
// //         borderRadius: "8px",
// //         boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)"
// //       }}>
// //         <h4>Observation</h4>
// //         <p>{formData.observation}</p>
// //       </div>

// //       {/* Prescriptions */}
// //       <div style={{
// //         marginBottom: "20px",
// //         padding: "15px",
// //         borderRadius: "8px",
// //         boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)"
// //       }}>
// //         <h4>Prescriptions</h4>
// //         <p>{formData.prescribeReq}</p>
// //       </div>

// //       {/* Referral */}
// //       <div style={{
// //         marginBottom: "20px",
// //         padding: "15px",
// //         borderRadius: "8px",
// //         boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)"
// //       }}>
// //         <h4>Referral</h4>
// //         <p>
// //           <strong>Referral Required:</strong> {formData.isReferralRequired ? "Yes" : "No"}
// //         </p>
// //         {formData.isReferralRequired && (
// //           <p><strong>Referral Doctor's Name:</strong> {formData.referralDoctorName}</p>
// //         )}
// //       </div>

// //       {/* Lab Tests */}
// //       <div style={{
// //         marginBottom: "20px",
// //         padding: "15px",
// //         borderRadius: "8px",
// //         boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)"
// //       }}>
// //         <h4>Lab Tests</h4>
// //         {formData.labTests.map((test, index) => (
// //           <div key={index} style={{ marginTop: "10px" }}>
// //             <strong>{test.test}</strong>: {test.description}
// //           </div>
// //         ))}
// //       </div>

// //       {/* Radiology Tests */}
// //       <div style={{
// //         marginBottom: "20px",
// //         padding: "15px",
// //         borderRadius: "8px",
// //         boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)"
// //       }}>
// //         <h4>Radiology Tests</h4>
// //         {formData.radiologyTests.map((test, index) => (
// //           <div key={index} style={{ marginTop: "10px" }}>
// //             <strong>{test.test}</strong>: {test.description}
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default SubmittedDataCard;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const Room = () => {
  const { roomID } = useParams();
  const [showNotePad, setShowNotePad] = useState(true);
  const [observation, setObservation] = useState("");
  const [labTests, setLabTests] = useState([]);
  const [labTest, setLabTest] = useState({ test: "", description: "" });
  const [radiologyTests, setRadiologyTests] = useState([]);
  const [radiologyTest, setRadiologyTest] = useState({
    test: "",
    description: "",
  });
  const [prescribeReq, setPrescribeReq] = useState("");
  const [isReferralRequired, setIsReferralRequired] = useState(false);
  const [referralDoctorName, setReferralDoctorName] = useState("");
  const [showLabTestForm, setShowLabTestForm] = useState(true);
  const [showRadiologyTestForm, setShowRadiologyTestForm] = useState(true);
  const [isLabTestRequired, setIsLabTestRequired] = useState(null); // New state variable
  const [isRadTestRequired, setIsRadTestRequired] = useState(null); // New state variable
  const meetingRef = React.useRef(null);

  const initializeMeeting = async () => {
    const appID = 946219318;
    const serverSecret = "8e0b853d79deae0bcbfe949b73ca46a4";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      Date.now().toString(),
      "user"
    );
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: meetingRef.current,
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      },
    });
  };

  useEffect(() => {
    initializeMeeting();

    const patientInfo = JSON.parse(localStorage.getItem("patientInfo"));
    if (patientInfo) setShowNotePad(false);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddLabTest = () => {
    if (labTest.test.trim() !== "") {
      setLabTests([...labTests, labTest]);
      setLabTest({ test: "", description: "" });
      setShowLabTestForm(false);
    }
  };

  const handleAddRadiologyTest = () => {
    if (radiologyTest.test.trim() !== "") {
      setRadiologyTests([...radiologyTests, radiologyTest]);
      setRadiologyTest({ test: "", description: "" });
      setShowRadiologyTestForm(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      observation,
      labTests,
      radiologyTests,
      prescribeReq,
      isReferralRequired,
      referralDoctorName,
    });
    // Reset state after submission if needed
  };

  const handleAddAnotherLabTest = () => {
    setLabTest({ test: "", description: "" });
    setShowLabTestForm(true);
  };

  const handleAddAnotherRadiologyTest = () => {
    setRadiologyTest({ test: "", description: "" });
    setShowRadiologyTestForm(true);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div style={{ flex: 1, display: "flex", background: "lightgray" }}>
        {/* Meeting container */}
        <div
          ref={meetingRef}
          style={{
            flex: 1,
            backgroundColor: "lightgray",
          }}
        ></div>

        {/* Notepad container */}
        {showNotePad && (
          <div
            style={{
              flex: 1,
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              margin: "10px 20px 10px 20px",
              height: "100vh",
              border: "1px solid #ccc",
              borderRadius: "10px",
              background: "white",
            }}
          >
            <form
              onSubmit={handleSubmit}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "2px",
                backgroundColor: "white",
                padding: "20px",
                overflowY: "auto",
              }}
            >
              <label style={{ fontWeight: "bold", fontSize: "15px" }}>
                Lab Tests:
              </label>

              <div
                style={{
                  borderRadius: "5px",
                  padding: "10px",
                  backgroundColor: "white",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <label style={{ fontSize: "15px", marginRight: "20px" }}>
                    Is Lab Test Required:
                  </label>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: "20px",
                    }}
                  >
                    <input
                      type="radio"
                      id="labTestYes"
                      name="labTestRequired"
                      value="yes"
                      checked={isLabTestRequired === true}
                      onChange={() => setIsLabTestRequired(true)}
                      style={{ marginRight: "5px" }}
                    />
                    <label htmlFor="labTestYes">Yes</label>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: "20px",
                    }}
                  >
                    <input
                      type="radio"
                      id="labTestNo"
                      name="labTestRequired"
                      value="no"
                      checked={isLabTestRequired === false}
                      onChange={() => setIsLabTestRequired(false)}
                      style={{ marginRight: "5px", marginLeft: "20px" }}
                    />
                    <label htmlFor="labTestNo">No</label>
                  </div>

                  {!showLabTestForm && (
                    <a
                      onClick={handleAddAnotherLabTest}
                      className="add-prescription"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <i
                        className="fa fa-plus-circle"
                        style={{ marginRight: "5px" }}
                      ></i>{" "}
                      Add More
                    </a>
                  )}
                </div>
              </div>

              {isLabTestRequired && showLabTestForm && (
                <div
                  style={{
                    borderRadius: "5px",
                    padding: "10px",
                    backgroundColor: "white",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <select
                      value={labTest.test}
                      onChange={(e) =>
                        setLabTest({ ...labTest, test: e.target.value })
                      }
                    >
                      <option value="">Select a lab test</option>
                      <option value="Blood Test">Blood Test</option>
                      <option value="Urine Test">Urine Test</option>
                      <option value="X-Ray">X-Ray</option>
                    </select>
                    {labTest.test && (
                      <textarea
                        value={labTest.description}
                        onChange={(e) =>
                          setLabTest({
                            ...labTest,
                            description: e.target.value,
                          })
                        }
                        placeholder="Enter description..."
                        style={{
                          width: "100%",
                          height: "50px",
                          resize: "none",
                          marginTop: "5px",
                          padding: "5px",
                        }}
                      ></textarea>
                    )}
                    {labTest.test && (
                      <button type="button" onClick={handleAddLabTest}>
                        Add{" "}
                      </button>
                    )}
                  </div>
                </div>
              )}

              <div
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "10px",
                  backgroundColor: "white",
                  marginTop: "10px",
                  display: labTests.length === 0 ? "none" : "block",
                }}
              >
                {labTests.map((test, index) => (
                  <div key={index} style={{ marginBottom: "10px" }}>
                    <strong style={{ fontSize: "13px" }}>{test.test}</strong>
                    <p>{test.description}</p>
                  </div>
                ))}
              </div>

              <label
                style={{
                  fontWeight: "bold",
                  fontSize: "15px",
                  marginTop: "10px",
                }}
              >
                Radiology Tests:
              </label>
              <div
                style={{
                  borderRadius: "5px",
                  padding: "10px",
                  backgroundColor: "white",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <label style={{ fontSize: "15px", marginRight: "20px" }}>
                    Is Radio Test Required:
                  </label>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: "20px",
                    }}
                  >
                    <input
                      type="radio"
                      id="RadTestYes"
                      name="RadTestRequired"
                      value="yes"
                      checked={isRadTestRequired === true}
                      onChange={() => setIsRadTestRequired(true)}
                      style={{ marginRight: "5px" }}
                    />
                    <label htmlFor="RadTestYes">Yes</label>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: "20px",
                    }}
                  >
                    <input
                      type="radio"
                      id="RadTestNo"
                      name="RadTestRequired"
                      value="no"
                      checked={isRadTestRequired === false}
                      onChange={() => setIsRadTestRequired(false)}
                      style={{ marginRight: "5px", marginLeft: "20px" }}
                    />
                    <label htmlFor="RadTestNo">No</label>
                  </div>

                  {!showRadiologyTestForm && (
                    <a
                      onClick={handleAddAnotherRadiologyTest}
                      className="add-prescription"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <i
                        className="fa fa-plus-circle"
                        style={{ marginRight: "5px" }}
                      ></i>{" "}
                      Add More
                    </a>
                  )}
                </div>
              </div>

              {isRadTestRequired && showRadiologyTestForm && (
                <div
                  style={{
                    borderRadius: "5px",
                    padding: "10px",
                    backgroundColor: "white",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <select
                      value={radiologyTest.test}
                      onChange={(e) =>
                        setRadiologyTest({
                          ...radiologyTest,
                          test: e.target.value,
                        })
                      }
                    >
                      <option value="">Select a radiology test</option>
                      <option value="CT Scan">CT Scan</option>
                      <option value="MRI">MRI</option>
                      <option value="Ultrasound">Ultrasound</option>
                    </select>
                    {radiologyTest.test && (
                      <textarea
                        value={radiologyTest.description}
                        onChange={(e) =>
                          setRadiologyTest({
                            ...radiologyTest,
                            description: e.target.value,
                          })
                        }
                        placeholder="Enter description..."
                        style={{
                          width: "100%",
                          height: "50px",
                          resize: "none",
                          marginTop: "5px",
                          padding: "5px",
                        }}
                      ></textarea>
                    )}
                    {radiologyTest.test && (
                      <button type="button" onClick={handleAddRadiologyTest}>
                        Add{" "}
                      </button>
                    )}
                  </div>
                </div>
              )}

              {radiologyTests.length > 0 && (
                <div
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "10px",
                    backgroundColor: "white",
                    marginTop: "10px",
                  }}
                >
                  {radiologyTests.map((test, index) => (
                    <div key={index} style={{ marginBottom: "10px" }}>
                      <strong style={{ fontSize: "13px" }}>{test.test}</strong>
                      <p>{test.description}</p>
                    </div>
                  ))}
                </div>
              )}

              <label
                style={{
                  fontWeight: "bold",
                  fontSize: "15px",
                  marginTop: "10px",
                }}
              >
                Observation:
              </label>
              <textarea
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
                placeholder="Enter observation..."
                style={{
                  width: "100%",
                  height: "100px",
                  resize: "none",
                  marginTop: "5px",
                  padding: "5px",
                  minHeight: "100px", // Set a minimum height
                  maxHeight: "100px", // Set a maximum height if needed
                }}
              ></textarea>

              <label
                style={{
                  fontWeight: "bold",
                  fontSize: "15px",
                  marginTop: "10px",
                }}
              >
                Prescription:
              </label>
              <textarea
                value={prescribeReq}
                onChange={(e) => setPrescribeReq(e.target.value)}
                placeholder="Enter prescription..."
                style={{
                  width: "100%",
                  height: "100px",
                  resize: "none",
                  marginTop: "5px",
                  padding: "5px",
                  minHeight: "100px", // Set a minimum height
                  maxHeight: "100px", // Set a maximum height if needed
                }}
              ></textarea>

              <label
                style={{
                  fontWeight: "bold",
                  fontSize: "15px",
                  marginTop: "10px",
                }}
              >
                Referral:
              </label>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <label style={{ fontSize: "15px" }}>
                  Is Referral Required:
                </label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="radio"
                    id="referralYes"
                    name="referralRequired"
                    value="yes"
                    checked={isReferralRequired === true}
                    onChange={() => setIsReferralRequired(true)}
                    style={{ marginRight: "5px" }}
                  />
                  <label htmlFor="referralYes">Yes</label>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="radio"
                    id="referralNo"
                    name="referralRequired"
                    value="no"
                    checked={isReferralRequired === false}
                    onChange={() => setIsReferralRequired(false)}
                    style={{ marginLeft: "20px", marginRight: "5px" }}
                  />
                  <label htmlFor="referralNo">No</label>
                </div>
              </div>
              {isReferralRequired && (
                <div style={{ marginTop: "10px" }}>
                  <input
                    type="text"
                    value={referralDoctorName}
                    onChange={(e) => setReferralDoctorName(e.target.value)}
                    placeholder="Enter referral doctor's name..."
                    style={{ width: "100%", padding: "5px" }}
                  />
                </div>
              )}

              <button
                type="submit"
                style={{
                  alignSelf: "flex-end",
                  padding: "10px 20px",
                  backgroundColor: "#blue",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginTop: "20px",
                }}
              >
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Room;
