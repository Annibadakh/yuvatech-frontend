// // // // // // // // // import React, { useState, useEffect } from "react";
// // // // // // // // // import axios from "axios";
// // // // // // // // // import { Button, Input, Label } from "reactstrap";
// // // // // // // // // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // // // // // // // // import { faEdit, faTrashAlt, faFileCsv, faArrowUp, faArrowDown,faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
// // // // // // // // // import Papa from "papaparse";
// // // // // // // // // import { Link } from "react-router-dom";
// // // // // // // // // import "bootstrap/dist/css/bootstrap.min.css";

// // // // // // // // // // const apiUrl = "http://localhost:5000/enroll";

// // // // // // // // // const TableComponent = () => {
// // // // // // // // //     const [rowData, setRowData] = useState([]);
// // // // // // // // //     const [currentPage, setCurrentPage] = useState(1);
// // // // // // // // //     const [pageSize, setPageSize] = useState(10);
// // // // // // // // //     const [searchTerm, setSearchTerm] = useState("");
// // // // // // // // //     const [sortColumn, setSortColumn] = useState(null);
// // // // // // // // //     const [sortDirection, setSortDirection] = useState(null);
// // // // // // // // //     const apiUrl = process.env.REACT_APP_API_BASE_URL

// // // // // // // // //     useEffect(() => {
// // // // // // // // //         fetchData();
// // // // // // // // //     }, [currentPage, pageSize, searchTerm]);

// // // // // // // // //     const fetchData = async () => {
// // // // // // // // //         try {
// // // // // // // // //             const response = await axios.get(`${apiUrl}/enroll`);
// // // // // // // // //             // console.log("Response data:", response.data);
// // // // // // // // //             setRowData(response.data);
// // // // // // // // //         } catch (error) {
// // // // // // // // //             // console.error("Error fetching data:", error);
// // // // // // // // //         }
// // // // // // // // //     };

// // // // // // // // //     // const handleDelete = async (enrollmentId) => {
// // // // // // // // //     //     try {
// // // // // // // // //     //         await axios.delete(`${apiUrl}/${enrollmentId}`);
// // // // // // // // //     //         fetchData();
// // // // // // // // //     //     } catch (error) {
// // // // // // // // //     //         console.error("Error deleting enrollment:", error);
// // // // // // // // //     //     }
// // // // // // // // //     // };

// // // // // // // // //     const renderActionsCell = (enrollmentId) => (
// // // // // // // // //         <div style={{ display: "flex", justifyContent: "center" }}>
// // // // // // // // //             <Link to={`/editenrollment/${enrollmentId}`}>
// // // // // // // // //                 <Button color="info" style={{ margin: "2px" }}>
// // // // // // // // //                     <FontAwesomeIcon icon={faEdit} /> Edit
// // // // // // // // //                 </Button>
// // // // // // // // //             </Link>
// // // // // // // // //             {/* <Button color="danger" style={{ margin: "2px" }} onClick={() => handleDelete(enrollmentId)}>
// // // // // // // // //                 <FontAwesomeIcon icon={faTrashAlt} /> Delete
// // // // // // // // //             </Button> */}
// // // // // // // // //             <Link to={{ pathname: "/payments", search: `?enrollmentId=${enrollmentId}` }}>
// // // // // // // // //     <Button color="success" style={{ margin: "2px" }}>
// // // // // // // // //     <FontAwesomeIcon icon={faIndianRupeeSign} /> Payment
// // // // // // // // //     </Button>
// // // // // // // // // </Link>

// // // // // // // // //         </div>
// // // // // // // // //     );

// // // // // // // // //     const exportToCSV = () => {
// // // // // // // // //         const csv = Papa.unparse(rowData);
// // // // // // // // //         const blob = new Blob([csv], { type: "text/csv" });
// // // // // // // // //         const url = window.URL.createObjectURL(blob);
// // // // // // // // //         const a = document.createElement("a");
// // // // // // // // //         a.href = url;
// // // // // // // // //         a.download = "enrollments.csv";
// // // // // // // // //         document.body.appendChild(a);
// // // // // // // // //         a.click();
// // // // // // // // //         document.body.removeChild(a);
// // // // // // // // //     };

// // // // // // // // //     const handleSort = (column) => {
// // // // // // // // //         if (column === sortColumn) {
// // // // // // // // //             // If same column clicked again, reverse direction
// // // // // // // // //             setSortDirection(sortDirection === "asc" ? "desc" : "asc");
// // // // // // // // //         } else {
// // // // // // // // //             // Otherwise, set new column and default direction to ascending
// // // // // // // // //             setSortColumn(column);
// // // // // // // // //             setSortDirection("asc");
// // // // // // // // //         }
// // // // // // // // //     };

// // // // // // // // //     const sortedData = sortColumn
// // // // // // // // //         ? [...rowData].sort((a, b) => {
// // // // // // // // //               const aValue = a[sortColumn];
// // // // // // // // //               const bValue = b[sortColumn];
// // // // // // // // //               if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
// // // // // // // // //               if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
// // // // // // // // //               return 0;
// // // // // // // // //           })
// // // // // // // // //         : rowData;

// // // // // // // // //     const filteredData = sortedData.filter((item) =>
// // // // // // // // //         Object.values(item).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase()))
// // // // // // // // //     );

// // // // // // // // //     const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

// // // // // // // // //     const totalPages = Math.ceil(filteredData.length / pageSize);

// // // // // // // // //     return (
// // // // // // // // //         <div style={{ maxWidth: "100%", margin: "0 auto", border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}>
// // // // // // // // //             <div style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between" }}>
// // // // // // // // //                 <Button onClick={exportToCSV}>
// // // // // // // // //                     <FontAwesomeIcon icon={faFileCsv} /> Export to CSV
// // // // // // // // //                 </Button>
// // // // // // // // //                 <Input
// // // // // // // // //                     placeholder="Search all columns..."
// // // // // // // // //                     onChange={(e) => setSearchTerm(e.target.value)}
// // // // // // // // //                     style={{ width: "200px" }}
// // // // // // // // //                 />
// // // // // // // // //                 <Label for="pageSize">Page Size:</Label>
// // // // // // // // //                 <Input
// // // // // // // // //                     id="pageSize"
// // // // // // // // //                     type="select"
// // // // // // // // //                     value={pageSize}
// // // // // // // // //                     onChange={(e) => setPageSize(Number(e.target.value))}
// // // // // // // // //                     style={{ width: "100px" }}
// // // // // // // // //                 >
// // // // // // // // //                     {[10, 20, 30, 50, 100].map((size) => (
// // // // // // // // //                         <option key={size} value={size}>
// // // // // // // // //                             {size}
// // // // // // // // //                         </option>
// // // // // // // // //                     ))}
// // // // // // // // //                 </Input>
// // // // // // // // //             </div>
// // // // // // // // //             <div style={{ overflowX: "auto" }}>
// // // // // // // // //                 <table style={{ borderCollapse: 'collapse', width: '100%' }}>
// // // // // // // // //                     <thead>
// // // // // // // // //                         <tr>
// // // // // // // // //                             <th onClick={() => handleSort('enrollmentId')} style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd', cursor: 'pointer' }}>
// // // // // // // // //                                 Enrollment ID
// // // // // // // // //                                 <FontAwesomeIcon icon={faArrowUp} style={{ opacity: sortColumn === 'enrollmentId' && sortDirection === 'asc' ? 1 : 0.5 }} />
// // // // // // // // //                                 <FontAwesomeIcon icon={faArrowDown} style={{ opacity: sortColumn === 'enrollmentId' && sortDirection === 'desc' ? 1 : 0.5 }} />
// // // // // // // // //                             </th>
// // // // // // // // //                             <th onClick={() => handleSort('course.name')} style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd', cursor: 'pointer' }}>
// // // // // // // // //                                 Course
// // // // // // // // //                                 <FontAwesomeIcon icon={faArrowUp} style={{ opacity: sortColumn === 'course.name' && sortDirection === 'asc' ? 1 : 0.5 }} />
// // // // // // // // //                                 <FontAwesomeIcon icon={faArrowDown} style={{ opacity: sortColumn === 'course.name' && sortDirection === 'desc' ? 1 : 0.5 }} />
// // // // // // // // //                             </th>
// // // // // // // // //                             {/* <th onClick={() => handleSort('studentId')} style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd', cursor: 'pointer' }}>
// // // // // // // // //                                 Student ID
// // // // // // // // //                                 <FontAwesomeIcon icon={faArrowUp} style={{ opacity: sortColumn === 'studentId' && sortDirection === 'asc' ? 1 : 0.5 }} />
// // // // // // // // //                                 <FontAwesomeIcon icon={faArrowDown} style={{ opacity: sortColumn === 'studentId' && sortDirection === 'desc' ? 1 : 0.5 }} />
// // // // // // // // //                             </th> */}
// // // // // // // // //                             <th onClick={() => handleSort('student.fullName')} style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd', cursor: 'pointer' }}>
// // // // // // // // //                                 Name
// // // // // // // // //                                 <FontAwesomeIcon icon={faArrowUp} style={{ opacity: sortColumn === 'student.fullName' && sortDirection === 'asc' ? 1 : 0.5 }} />
// // // // // // // // //                                 <FontAwesomeIcon icon={faArrowDown} style={{ opacity: sortColumn === 'student.fullName' && sortDirection === 'desc' ? 1 : 0.5 }} />
// // // // // // // // //                             </th>
// // // // // // // // //                             <th onClick={() => handleSort('student.email')} style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd', cursor: 'pointer' }}>
// // // // // // // // //                                 Email
// // // // // // // // //                                 <FontAwesomeIcon icon={faArrowUp} style={{ opacity: sortColumn === 'student.email' && sortDirection === 'asc' ? 1 : 0.5 }} />
// // // // // // // // //                                 <FontAwesomeIcon icon={faArrowDown} style={{ opacity: sortColumn === 'student.email' && sortDirection === 'desc' ? 1 : 0.5 }} />
// // // // // // // // //                             </th>
// // // // // // // // //                             <th onClick={() => handleSort('enrollmentDate')} style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd', cursor: 'pointer' }}>
// // // // // // // // //                                 Enrollment Date
// // // // // // // // //                                 <FontAwesomeIcon icon={faArrowUp} style={{ opacity: sortColumn === 'enrollmentDate' && sortDirection === 'asc' ? 1 : 0.5 }} />
// // // // // // // // //                                 <FontAwesomeIcon icon={faArrowDown} style={{ opacity: sortColumn === 'enrollmentDate' && sortDirection === 'desc' ? 1 : 0.5 }} />
// // // // // // // // //                             </th>
// // // // // // // // //                             <th onClick={() => handleSort('status')} style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd', cursor: 'pointer' }}>
// // // // // // // // //                                 Status
// // // // // // // // //                                 <FontAwesomeIcon icon={faArrowUp} style={{ opacity: sortColumn === 'status' && sortDirection === 'asc' ? 1 : 0.5 }} />
// // // // // // // // //                                 <FontAwesomeIcon icon={faArrowDown} style={{ opacity: sortColumn === 'status' && sortDirection === 'desc' ? 1 : 0.5 }} />
// // // // // // // // //                             </th>
// // // // // // // // //                             <th onClick={() => handleSort('createdByName')} style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd', cursor: 'pointer' }}>
// // // // // // // // //                                 Enrolled By
// // // // // // // // //                                 <FontAwesomeIcon icon={faArrowUp} style={{ opacity: sortColumn === 'createdByName' && sortDirection === 'asc' ? 1 : 0.5 }} />
// // // // // // // // //                                 <FontAwesomeIcon icon={faArrowDown} style={{ opacity: sortColumn === 'createdByName' && sortDirection === 'desc' ? 1 : 0.5 }} />
// // // // // // // // //                             </th>
// // // // // // // // //                             <th style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd' }}>Actions</th>
// // // // // // // // //                         </tr>
// // // // // // // // //                     </thead>
// // // // // // // // //                     <tbody>
// // // // // // // // //                         {paginatedData.map((item) => (
// // // // // // // // //                             <tr key={item.enrollmentId} style={{ borderBottom: '1px solid #ddd' }}>
// // // // // // // // //                                 <td style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap' }}>{item.enrollmentId}</td>
// // // // // // // // //                                 <td style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap' }}>{item.course.name}</td>
// // // // // // // // //                                 {/* <td style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap' }}>{item.studentId}</td> */}
// // // // // // // // //                                 <td style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap' }}>{item.student.fullName}</td>
// // // // // // // // //                                 <td style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap' }}>{item.student.email}</td>
// // // // // // // // //                                 <td style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap' }}>{item.enrollmentDate}</td>
// // // // // // // // //                                 <td style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap' }}>{item.status}</td>
// // // // // // // // //                                 <td style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap' }}>{item.createdByName}</td>
// // // // // // // // //                                 <td style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap' }}>{renderActionsCell(item.enrollmentId)}</td>
// // // // // // // // //                             </tr>
// // // // // // // // //                         ))}
// // // // // // // // //                     </tbody>
// // // // // // // // //                 </table>
// // // // // // // // //             </div>
// // // // // // // // //             <div style={{ textAlign: "center", marginTop: "20px" }}>
// // // // // // // // //                 <Button onClick={() => setCurrentPage((prevPage) => prevPage - 1)} disabled={currentPage === 1}>
// // // // // // // // //                     Previous
// // // // // // // // //                 </Button>{" "}
// // // // // // // // //                 {Array.from({ length: totalPages }, (_, index) => (
// // // // // // // // //                     <Button key={index + 1} onClick={() => setCurrentPage(index + 1)} style={{ margin: "2px" }} disabled={currentPage === index + 1}>
// // // // // // // // //                         {index + 1}
// // // // // // // // //                     </Button>
// // // // // // // // //                 ))}
// // // // // // // // //                 <Button
// // // // // // // // //                     onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
// // // // // // // // //                     disabled={paginatedData.length < pageSize || currentPage === totalPages}
// // // // // // // // //                 >
// // // // // // // // //                     Next
// // // // // // // // //                 </Button>
// // // // // // // // //             </div>
// // // // // // // // //         </div>
// // // // // // // // //     );
// // // // // // // // // };

// // // // // // // // // export default TableComponent;

// // // // // // // // import React, { useState, useEffect } from "react";
// // // // // // // // import axios from "axios";
// // // // // // // // import { Button, Input, Label } from "reactstrap";
// // // // // // // // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // // // // // // // import { faEdit, faTrashAlt, faFileCsv, faArrowUp, faArrowDown, faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
// // // // // // // // import Papa from "papaparse";
// // // // // // // // import { Link } from "react-router-dom";
// // // // // // // // import "bootstrap/dist/css/bootstrap.min.css";

// // // // // // // // const TableComponent = () => {
// // // // // // // //     const [rowData, setRowData] = useState([]);
// // // // // // // //     const [currentPage, setCurrentPage] = useState(1);
// // // // // // // //     const [pageSize, setPageSize] = useState(10);
// // // // // // // //     const [searchTerm, setSearchTerm] = useState("");
// // // // // // // //     const [sortColumn, setSortColumn] = useState(null);
// // // // // // // //     const [sortDirection, setSortDirection] = useState(null);
// // // // // // // //     const [startDate, setStartDate] = useState("");
// // // // // // // //     const [endDate, setEndDate] = useState("");
// // // // // // // //     const apiUrl = process.env.REACT_APP_API_BASE_URL;

// // // // // // // //     useEffect(() => {
// // // // // // // //         fetchData();
// // // // // // // //     }, [currentPage, pageSize, searchTerm, startDate, endDate]);

// // // // // // // //     const fetchData = async () => {
// // // // // // // //         try {
// // // // // // // //             const response = await axios.get(`${apiUrl}/enroll`);
// // // // // // // //             setRowData(response.data);
// // // // // // // //         } catch (error) {
// // // // // // // //             console.error("Error fetching data:", error);
// // // // // // // //         }
// // // // // // // //     };

// // // // // // // //     const renderActionsCell = (enrollmentId) => (
// // // // // // // //         <div style={{ display: "flex", justifyContent: "center" }}>
// // // // // // // //             <Link to={`/editenrollment/${enrollmentId}`}>
// // // // // // // //                 <Button color="info" style={{ margin: "2px" }}>
// // // // // // // //                     <FontAwesomeIcon icon={faEdit} /> Edit
// // // // // // // //                 </Button>
// // // // // // // //             </Link>
// // // // // // // //             <Link to={{ pathname: "/payments", search: `?enrollmentId=${enrollmentId}` }}>
// // // // // // // //                 <Button color="success" style={{ margin: "2px" }}>
// // // // // // // //                     <FontAwesomeIcon icon={faIndianRupeeSign} /> Payment
// // // // // // // //                 </Button>
// // // // // // // //             </Link>
// // // // // // // //         </div>
// // // // // // // //     );

// // // // // // // //     const exportToCSV = () => {
// // // // // // // //         const csv = Papa.unparse(rowData);
// // // // // // // //         const blob = new Blob([csv], { type: "text/csv" });
// // // // // // // //         const url = window.URL.createObjectURL(blob);
// // // // // // // //         const a = document.createElement("a");
// // // // // // // //         a.href = url;
// // // // // // // //         a.download = "enrollments.csv";
// // // // // // // //         document.body.appendChild(a);
// // // // // // // //         a.click();
// // // // // // // //         document.body.removeChild(a);
// // // // // // // //     };

// // // // // // // //     const handleSort = (column) => {
// // // // // // // //         if (column === sortColumn) {
// // // // // // // //             setSortDirection(sortDirection === "asc" ? "desc" : "asc");
// // // // // // // //         } else {
// // // // // // // //             setSortColumn(column);
// // // // // // // //             setSortDirection("asc");
// // // // // // // //         }
// // // // // // // //     };

// // // // // // // //     const sortedData = sortColumn
// // // // // // // //         ? [...rowData].sort((a, b) => {
// // // // // // // //               const aValue = a[sortColumn];
// // // // // // // //               const bValue = b[sortColumn];
// // // // // // // //               if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
// // // // // // // //               if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
// // // // // // // //               return 0;
// // // // // // // //           })
// // // // // // // //         : rowData;

// // // // // // // //     const filteredData = sortedData.filter((item) => {
// // // // // // // //         const matchesSearchTerm = Object.values(item).some((value) =>
// // // // // // // //             value.toString().toLowerCase().includes(searchTerm.toLowerCase())
// // // // // // // //         );
// // // // // // // //         const enrollmentDate = new Date(item.enrollmentDate);
// // // // // // // //         const matchesDateRange =
// // // // // // // //             (!startDate || enrollmentDate >= new Date(startDate)) &&
// // // // // // // //             (!endDate || enrollmentDate <= new Date(endDate));
// // // // // // // //         return matchesSearchTerm && matchesDateRange;
// // // // // // // //     });

// // // // // // // //     const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

// // // // // // // //     const totalPages = Math.ceil(filteredData.length / pageSize);

// // // // // // // //     return (
// // // // // // // //         <div style={{ maxWidth: "100%", margin: "0 auto", border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}>
// // // // // // // //             <div style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between" }}>
// // // // // // // //                 <Button onClick={exportToCSV}>
// // // // // // // //                     <FontAwesomeIcon icon={faFileCsv} /> Export to CSV
// // // // // // // //                 </Button>
// // // // // // // //                 <Input
// // // // // // // //                     placeholder="Search all columns..."
// // // // // // // //                     onChange={(e) => setSearchTerm(e.target.value)}
// // // // // // // //                     style={{ width: "200px" }}
// // // // // // // //                 />
// // // // // // // //                 <Label for="startDate">Start Date:</Label>
// // // // // // // //                 <Input
// // // // // // // //                     id="startDate"
// // // // // // // //                     type="date"
// // // // // // // //                     value={startDate}
// // // // // // // //                     onChange={(e) => setStartDate(e.target.value)}
// // // // // // // //                 />
// // // // // // // //                 <Label for="endDate">End Date:</Label>
// // // // // // // //                 <Input
// // // // // // // //                     id="endDate"
// // // // // // // //                     type="date"
// // // // // // // //                     value={endDate}
// // // // // // // //                     onChange={(e) => setEndDate(e.target.value)}
// // // // // // // //                 />
// // // // // // // //                 <Label for="pageSize">Page Size:</Label>
// // // // // // // //                 <Input
// // // // // // // //                     id="pageSize"
// // // // // // // //                     type="select"
// // // // // // // //                     value={pageSize}
// // // // // // // //                     onChange={(e) => setPageSize(Number(e.target.value))}
// // // // // // // //                     style={{ width: "100px" }}
// // // // // // // //                 >
// // // // // // // //                     {[10, 20, 30, 50, 100].map((size) => (
// // // // // // // //                         <option key={size} value={size}>
// // // // // // // //                             {size}
// // // // // // // //                         </option>
// // // // // // // //                     ))}
// // // // // // // //                 </Input>
// // // // // // // //             </div>
// // // // // // // //             <div style={{ overflowX: "auto" }}>
// // // // // // // //                 <table style={{ borderCollapse: "collapse", width: "100%" }}>
// // // // // // // //                     <thead>
// // // // // // // //                         <tr>
// // // // // // // //                             <th onClick={() => handleSort("enrollmentId")} style={{ fontSize: "14px", padding: "8px 10px", whiteSpace: "nowrap", borderBottom: "1px solid #ddd", cursor: "pointer" }}>
// // // // // // // //                                 Enrollment ID
// // // // // // // //                                 <FontAwesomeIcon icon={faArrowUp} style={{ opacity: sortColumn === "enrollmentId" && sortDirection === "asc" ? 1 : 0.5 }} />
// // // // // // // //                                 <FontAwesomeIcon icon={faArrowDown} style={{ opacity: sortColumn === "enrollmentId" && sortDirection === "desc" ? 1 : 0.5 }} />
// // // // // // // //                             </th>
// // // // // // // //                             <th onClick={() => handleSort("course.name")} style={{ fontSize: "14px", padding: "8px 10px", whiteSpace: "nowrap", borderBottom: "1px solid #ddd", cursor: "pointer" }}>
// // // // // // // //                                 Course
// // // // // // // //                                 <FontAwesomeIcon icon={faArrowUp} style={{ opacity: sortColumn === "course.name" && sortDirection === "asc" ? 1 : 0.5 }} />
// // // // // // // //                                 <FontAwesomeIcon icon={faArrowDown} style={{ opacity: sortColumn === "course.name" && sortDirection === "desc" ? 1 : 0.5 }} />
// // // // // // // //                             </th>
// // // // // // // //                             <th onClick={() => handleSort("student.fullName")} style={{ fontSize: "14px", padding: "8px 10px", whiteSpace: "nowrap", borderBottom: "1px solid #ddd", cursor: "pointer" }}>
// // // // // // // //                                 Name
// // // // // // // //                                 <FontAwesomeIcon icon={faArrowUp} style={{ opacity: sortColumn === "student.fullName" && sortDirection === "asc" ? 1 : 0.5 }} />
// // // // // // // //                                 <FontAwesomeIcon icon={faArrowDown} style={{ opacity: sortColumn === "student.fullName" && sortDirection === "desc" ? 1 : 0.5 }} />
// // // // // // // //                             </th>
// // // // // // // //                             <th onClick={() => handleSort("student.email")} style={{ fontSize: "14px", padding: "8px 10px", whiteSpace: "nowrap", borderBottom: "1px solid #ddd", cursor: "pointer" }}>
// // // // // // // //                                 Email
// // // // // // // //                                 <FontAwesomeIcon icon={faArrowUp} style={{ opacity: sortColumn === "student.email" && sortDirection === "asc" ? 1 : 0.5 }} />
// // // // // // // //                                 <FontAwesomeIcon icon={faArrowDown} style={{ opacity: sortColumn === "student.email" && sortDirection === "desc" ? 1 : 0.5 }} />
// // // // // // // //                             </th>
// // // // // // // //                             <th onClick={() => handleSort("enrollmentDate")} style={{ fontSize: "14px", padding: "8px 10px", whiteSpace: "nowrap", borderBottom: "1px solid #ddd", cursor: "pointer" }}>
// // // // // // // //                                 Enrollment Date
// // // // // // // //                                 <FontAwesomeIcon icon={faArrowUp} style={{ opacity: sortColumn === "enrollmentDate" && sortDirection === "asc" ? 1 : 0.5 }} />
// // // // // // // //                                 <FontAwesomeIcon icon={faArrowDown} style={{ opacity: sortColumn === "enrollmentDate" && sortDirection === "desc" ? 1 : 0.5 }} />
// // // // // // // //                             </th>
// // // // // // // //                             <th style={{ fontSize: "14px", padding: "8px 10px", whiteSpace: "nowrap", borderBottom: "1px solid #ddd", cursor: "pointer" }}>
// // // // // // // //                                 Actions
// // // // // // // //                             </th>
// // // // // // // //                         </tr>
// // // // // // // //                     </thead>
// // // // // // // //                     <tbody>
// // // // // // // //                         {paginatedData.map((row, index) => (
// // // // // // // //                             <tr key={index}>
// // // // // // // //                                 <td style={{ fontSize: "14px", padding: "8px 10px", whiteSpace: "nowrap" }}>{row.enrollmentId}</td>
// // // // // // // //                                 <td style={{ fontSize: "14px", padding: "8px 10px", whiteSpace: "nowrap" }}>{row.course?.name || ""}</td>
// // // // // // // //                                 <td style={{ fontSize: "14px", padding: "8px 10px", whiteSpace: "nowrap" }}>{row.student?.fullName || ""}</td>
// // // // // // // //                                 <td style={{ fontSize: "14px", padding: "8px 10px", whiteSpace: "nowrap" }}>{row.student?.email || ""}</td>
// // // // // // // //                                 <td style={{ fontSize: "14px", padding: "8px 10px", whiteSpace: "nowrap" }}>{new Date(row.enrollmentDate).toLocaleDateString()}</td>
// // // // // // // //                                 <td style={{ fontSize: "14px", padding: "8px 10px", whiteSpace: "nowrap" }}>{renderActionsCell(row.enrollmentId)}</td>
// // // // // // // //                             </tr>
// // // // // // // //                         ))}
// // // // // // // //                     </tbody>
// // // // // // // //                 </table>
// // // // // // // //             </div>
// // // // // // // //             <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
// // // // // // // //                 <Button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
// // // // // // // //                     Previous
// // // // // // // //                 </Button>
// // // // // // // //                 <span>
// // // // // // // //                     Page {currentPage} of {totalPages}
// // // // // // // //                 </span>
// // // // // // // //                 <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
// // // // // // // //                     Next
// // // // // // // //                 </Button>
// // // // // // // //             </div>
// // // // // // // //         </div>
// // // // // // // //     );
// // // // // // // // };

// // // // // // // // export default TableComponent;
// // // // // // // import React, { useState, useEffect } from "react";
// // // // // // // import axios from "axios";
// // // // // // // import { Button, Input, Label, FormGroup } from "reactstrap";
// // // // // // // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // // // // // // import { faEdit, faTrashAlt, faFileCsv, faArrowUp, faArrowDown, faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
// // // // // // // import Papa from "papaparse";
// // // // // // // import { Link } from "react-router-dom";
// // // // // // // import "bootstrap/dist/css/bootstrap.min.css";

// // // // // // // const TableComponent = () => {
// // // // // // //     const [rowData, setRowData] = useState([]);
// // // // // // //     const [currentPage, setCurrentPage] = useState(1);
// // // // // // //     const [pageSize, setPageSize] = useState(10);
// // // // // // //     const [searchTerm, setSearchTerm] = useState("");
// // // // // // //     const [sortColumn, setSortColumn] = useState(null);
// // // // // // //     const [sortDirection, setSortDirection] = useState(null);
// // // // // // //     const [startDate, setStartDate] = useState("");
// // // // // // //     const [endDate, setEndDate] = useState("");
// // // // // // //     const apiUrl = process.env.REACT_APP_API_BASE_URL;

// // // // // // //     useEffect(() => {
// // // // // // //         fetchData();
// // // // // // //     }, [currentPage, pageSize, searchTerm, startDate, endDate]);

// // // // // // //     const fetchData = async () => {
// // // // // // //         try {
// // // // // // //             const response = await axios.get(`${apiUrl}/enroll`);
// // // // // // //             setRowData(response.data);
// // // // // // //         } catch (error) {
// // // // // // //             console.error("Error fetching data:", error);
// // // // // // //         }
// // // // // // //     };

// // // // // // //     const renderActionsCell = (enrollmentId) => (
// // // // // // //         <div style={{ display: "flex", justifyContent: "center" }}>
// // // // // // //             <Link to={`/editenrollment/${enrollmentId}`}>
// // // // // // //                 <Button color="info" style={{ margin: "2px" }}>
// // // // // // //                     <FontAwesomeIcon icon={faEdit} /> Edit
// // // // // // //                 </Button>
// // // // // // //             </Link>
// // // // // // //             <Link to={{ pathname: "/payments", search: `?enrollmentId=${enrollmentId}` }}>
// // // // // // //                 <Button color="success" style={{ margin: "2px" }}>
// // // // // // //                     <FontAwesomeIcon icon={faIndianRupeeSign} /> Payment
// // // // // // //                 </Button>
// // // // // // //             </Link>
// // // // // // //         </div>
// // // // // // //     );

// // // // // // //     const exportToCSV = () => {
// // // // // // //         const csv = Papa.unparse(rowData);
// // // // // // //         const blob = new Blob([csv], { type: "text/csv" });
// // // // // // //         const url = window.URL.createObjectURL(blob);
// // // // // // //         const a = document.createElement("a");
// // // // // // //         a.href = url;
// // // // // // //         a.download = "enrollments.csv";
// // // // // // //         document.body.appendChild(a);
// // // // // // //         a.click();
// // // // // // //         document.body.removeChild(a);
// // // // // // //     };

// // // // // // //     const handleSort = (column) => {
// // // // // // //         if (column === sortColumn) {
// // // // // // //             setSortDirection(sortDirection === "asc" ? "desc" : "asc");
// // // // // // //         } else {
// // // // // // //             setSortColumn(column);
// // // // // // //             setSortDirection("asc");
// // // // // // //         }
// // // // // // //     };

// // // // // // //     const sortedData = sortColumn
// // // // // // //         ? [...rowData].sort((a, b) => {
// // // // // // //               const aValue = a[sortColumn];
// // // // // // //               const bValue = b[sortColumn];
// // // // // // //               if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
// // // // // // //               if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
// // // // // // //               return 0;
// // // // // // //           })
// // // // // // //         : rowData;

// // // // // // //         const filteredData = sortedData.filter((item) => {
// // // // // // //             const enrollmentDate = new Date(item.enrollmentDate);
// // // // // // //             const isWithinDateRange =
// // // // // // //                 (!startDate || enrollmentDate >= new Date(startDate)) && (!endDate || enrollmentDate <= new Date(endDate));
        
// // // // // // //             const enrollmentId = item.enrollmentId?.toString().toLowerCase() || "";
// // // // // // //             const courseName = item.course?.name?.toLowerCase() || "";
// // // // // // //             const studentName = item.student?.fullName?.toLowerCase() || "";
// // // // // // //             const studentEmail = item.student?.email?.toLowerCase() || "";
// // // // // // //             const contactNo = item.student?.contactNo?.toLowerCase() || "";
// // // // // // //             const enrollmentDateString = item.enrollmentDate?.toLowerCase() || "";
        
// // // // // // //             return (
// // // // // // //                 isWithinDateRange &&
// // // // // // //                 (enrollmentId.includes(searchTerm.toLowerCase()) ||
// // // // // // //                     courseName.includes(searchTerm.toLowerCase()) ||
// // // // // // //                     studentName.includes(searchTerm.toLowerCase()) ||
// // // // // // //                     studentEmail.includes(searchTerm.toLowerCase()) ||
// // // // // // //                     contactNo.includes(searchTerm.toLowerCase()) ||
// // // // // // //                     enrollmentDateString.includes(searchTerm.toLowerCase()))
// // // // // // //             );
// // // // // // //         });

// // // // // // //     const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);
// // // // // // //     const totalPages = Math.ceil(filteredData.length / pageSize);

// // // // // // //     return (
// // // // // // //         <div style={{ maxWidth: "100%", margin: "0 auto", border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}>
// // // // // // //             <div style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
// // // // // // //                 <Button onClick={exportToCSV} color="primary" style={{ minWidth: "90px",height:"40px", margin: "5px" }}>
// // // // // // //                     <FontAwesomeIcon icon={faFileCsv} /> Export
// // // // // // //                 </Button>
// // // // // // //                 <FormGroup style={{ display: "flex", alignItems: "center", margin: "5px" }}>
// // // // // // //                     <Label for="search" style={{ marginRight: "5px",height:"40px", margin: "5px"  }}>Search:</Label>
// // // // // // //                     <Input
// // // // // // //                         id="search"
// // // // // // //                         placeholder="Search all columns..."
// // // // // // //                         onChange={(e) => setSearchTerm(e.target.value)}
// // // // // // //                         style={{ width: "200px",height:"40px", margin: "5px"}}
// // // // // // //                     />
// // // // // // //                 </FormGroup>
// // // // // // //                 <FormGroup style={{ display: "flex", alignItems: "center", margin: "5px" }}>
// // // // // // //                     <Label for="startDate" style={{ marginRight: "5px" }}>Start Date:</Label>
// // // // // // //                     <Input
// // // // // // //                         id="startDate"
// // // // // // //                         type="date"
// // // // // // //                         value={startDate}
// // // // // // //                         onChange={(e) => setStartDate(e.target.value)}
// // // // // // //                         style={{ minWidth: "150px" }}
// // // // // // //                     />
// // // // // // //                 </FormGroup>
// // // // // // //                 <FormGroup style={{ display: "flex", alignItems: "center", margin: "5px" }}>
// // // // // // //                     <Label for="endDate" style={{ marginRight: "5px" }}>End Date:</Label>
// // // // // // //                     <Input
// // // // // // //                         id="endDate"
// // // // // // //                         type="date"
// // // // // // //                         value={endDate}
// // // // // // //                         onChange={(e) => setEndDate(e.target.value)}
// // // // // // //                         style={{ minWidth: "150px" }}
// // // // // // //                     />
// // // // // // //                 </FormGroup>
// // // // // // //                 <FormGroup style={{ display: "flex", alignItems: "center", margin: "5px" }}>
// // // // // // //                     <Label for="pageSize" style={{ marginRight: "5px" }}>Page Size:</Label>
// // // // // // //                     <Input
// // // // // // //                         id="pageSize"
// // // // // // //                         type="select"
// // // // // // //                         value={pageSize}
// // // // // // //                         onChange={(e) => setPageSize(Number(e.target.value))}
// // // // // // //                         style={{ width: "100px" }}
// // // // // // //                     >
// // // // // // //                         {[10, 20, 30, 50, 100].map((size) => (
// // // // // // //                             <option key={size} value={size}>
// // // // // // //                                 {size}
// // // // // // //                             </option>
// // // // // // //                         ))}
// // // // // // //                     </Input>
// // // // // // //                 </FormGroup>
// // // // // // //             </div>
// // // // // // //             <div style={{ overflowX: "auto" }}>
// // // // // // //                 <table style={{ borderCollapse: 'collapse', width: '100%' }}>
// // // // // // //                     <thead>
// // // // // // //                         <tr>
// // // // // // //                             <th onClick={() => handleSort('enrollmentId')} style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd', cursor: 'pointer' }}>
// // // // // // //                                 Enrollment ID
// // // // // // //                                 <FontAwesomeIcon icon={faArrowUp} style={{ opacity: sortColumn === 'enrollmentId' && sortDirection === 'asc' ? 1 : 0.5 }} />
// // // // // // //                                 <FontAwesomeIcon icon={faArrowDown} style={{ opacity: sortColumn === 'enrollmentId' && sortDirection === 'desc' ? 1 : 0.5 }} />
// // // // // // //                             </th>
// // // // // // //                             <th onClick={() => handleSort('course.name')} style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd', cursor: 'pointer' }}>
// // // // // // //                                 Course
// // // // // // //                                 <FontAwesomeIcon icon={faArrowUp} style={{ opacity: sortColumn === 'course.name' && sortDirection === 'asc' ? 1 : 0.5 }} />
// // // // // // //                                 <FontAwesomeIcon icon={faArrowDown} style={{ opacity: sortColumn === 'course.name' && sortDirection === 'desc' ? 1 : 0.5 }} />
// // // // // // //                             </th>
// // // // // // //                             <th onClick={() => handleSort('student.fullName')} style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd', cursor: 'pointer' }}>
// // // // // // //                                 Name
// // // // // // //                                 <FontAwesomeIcon icon={faArrowUp} style={{ opacity: sortColumn === 'student.fullName' && sortDirection === 'asc' ? 1 : 0.5 }} />
// // // // // // //                                 <FontAwesomeIcon icon={faArrowDown} style={{ opacity: sortColumn === 'student.fullName' && sortDirection === 'desc' ? 1 : 0.5 }} />
// // // // // // //                             </th>
// // // // // // //                             <th onClick={() => handleSort('student.email')} style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd', cursor: 'pointer' }}>
// // // // // // //                                 Email
// // // // // // //                                 <FontAwesomeIcon icon={faArrowUp} style={{ opacity: sortColumn === 'student.email' && sortDirection === 'asc' ? 1 : 0.5 }} />
// // // // // // //                                 <FontAwesomeIcon icon={faArrowDown} style={{ opacity: sortColumn === 'student.email' && sortDirection === 'desc' ? 1 : 0.5 }} />
// // // // // // //                             </th>
// // // // // // //                             <th onClick={() => handleSort('student.mobile')} style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd', cursor: 'pointer' }}>
// // // // // // //                                 Mobile
// // // // // // //                                 <FontAwesomeIcon icon={faArrowUp} style={{ opacity: sortColumn === 'student.mobile' && sortDirection === 'asc' ? 1 : 0.5 }} />
// // // // // // //                                 <FontAwesomeIcon icon={faArrowDown} style={{ opacity: sortColumn === 'student.mobile' && sortDirection === 'desc' ? 1 : 0.5 }} />
// // // // // // //                             </th>
// // // // // // //                             <th onClick={() => handleSort('enrollmentDate')} style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd', cursor: 'pointer' }}>
// // // // // // //                                 Enrollment Date
// // // // // // //                                 <FontAwesomeIcon icon={faArrowUp} style={{ opacity: sortColumn === 'enrollmentDate' && sortDirection === 'asc' ? 1 : 0.5 }} />
// // // // // // //                                 <FontAwesomeIcon icon={faArrowDown} style={{ opacity: sortColumn === 'enrollmentDate' && sortDirection === 'desc' ? 1 : 0.5 }} />
// // // // // // //                             </th>
// // // // // // //                             <th style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd' }}>Actions</th>
// // // // // // //                         </tr>
// // // // // // //                     </thead>
// // // // // // //                     <tbody>
// // // // // // //                         {paginatedData.map((item) => (
// // // // // // //                             <tr key={item.enrollmentId}>
// // // // // // //                                 <td style={{ textAlign: 'center', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd' }}>{item.enrollmentId}</td>
// // // // // // //                                 <td style={{ textAlign: 'center', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd' }}>{item.course.name}</td>
// // // // // // //                                 <td style={{ textAlign: 'center', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd' }}>{item.student.fullName}</td>
// // // // // // //                                 <td style={{ textAlign: 'center', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd' }}>{item.student.email}</td>
// // // // // // //                                 <td style={{ textAlign: 'center', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd' }}>{item.student.mobile}</td>
// // // // // // //                                 <td style={{ textAlign: 'center', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd' }}>{new Date(item.enrollmentDate).toLocaleDateString()}</td>
// // // // // // //                                 <td style={{ textAlign: 'center', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd' }}>
// // // // // // //                                     {renderActionsCell(item.enrollmentId)}
// // // // // // //                                 </td>
// // // // // // //                             </tr>
// // // // // // //                         ))}
// // // // // // //                     </tbody>
// // // // // // //                 </table>
// // // // // // //             </div>
// // // // // // //             <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
// // // // // // //                 <Button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} style={{ margin: '0 5px' }}>
// // // // // // //                     Previous
// // // // // // //                 </Button>
// // // // // // //                 <span style={{ display: 'inline-block', margin: '0 5px' }}>
// // // // // // //                     Page {currentPage} of {totalPages}
// // // // // // //                 </span>
// // // // // // //                 <Button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} style={{ margin: '0 5px' }}>
// // // // // // //                     Next
// // // // // // //                 </Button>
// // // // // // //             </div>
// // // // // // //         </div>
// // // // // // //     );
// // // // // // // };

// // // // // // // export default TableComponent;
// // // // // // import React, { useState, useEffect } from "react";
// // // // // // import axios from "axios";
// // // // // // import { Button, Input, Label, FormGroup } from "reactstrap";
// // // // // // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // // // // // import { faEdit, faTrashAlt, faFileCsv, faArrowUp, faArrowDown, faIndianRupeeSign, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
// // // // // // import Papa from "papaparse";
// // // // // // import { Link } from "react-router-dom";
// // // // // // import "bootstrap/dist/css/bootstrap.min.css";

// // // // // // const TableComponent = () => {
// // // // // //     const [rowData, setRowData] = useState([]);
// // // // // //     const [currentPage, setCurrentPage] = useState(1);
// // // // // //     const [pageSize, setPageSize] = useState(10);
// // // // // //     const [searchTerm, setSearchTerm] = useState("");
// // // // // //     const [sortColumn, setSortColumn] = useState(null);
// // // // // //     const [sortDirection, setSortDirection] = useState(null);
// // // // // //     const [startDate, setStartDate] = useState("");
// // // // // //     const [endDate, setEndDate] = useState("");
// // // // // //     const [editStatusId, setEditStatusId] = useState(null);
// // // // // //     const [status, setStatus] = useState("");
// // // // // //     const apiUrl = process.env.REACT_APP_API_BASE_URL;

// // // // // //     useEffect(() => {
// // // // // //         fetchData();
// // // // // //     }, [currentPage, pageSize, searchTerm, startDate, endDate]);

// // // // // //     const fetchData = async () => {
// // // // // //         try {
// // // // // //             const response = await axios.get(`${apiUrl}/enroll`);
// // // // // //             setRowData(response.data);
// // // // // //         } catch (error) {
// // // // // //             console.error("Error fetching data:", error);
// // // // // //         }
// // // // // //     };

// // // // // //     const renderActionsCell = (enrollmentId) => (
// // // // // //         <div style={{ display: "flex", justifyContent: "center" }}>
// // // // // //             <Link to={`/editenrollment/${enrollmentId}`}>
// // // // // //                 <Button color="info" style={{ margin: "2px" }}>
// // // // // //                     <FontAwesomeIcon icon={faEdit} /> Edit
// // // // // //                 </Button>
// // // // // //             </Link>
// // // // // //             <Link to={{ pathname: "/payments", search: `?enrollmentId=${enrollmentId}` }}>
// // // // // //                 <Button color="success" style={{ margin: "2px" }}>
// // // // // //                     <FontAwesomeIcon icon={faIndianRupeeSign} /> Payment
// // // // // //                 </Button>
// // // // // //             </Link>
// // // // // //         </div>
// // // // // //     );

// // // // // //     const exportToCSV = () => {
// // // // // //         const csv = Papa.unparse(rowData);
// // // // // //         const blob = new Blob([csv], { type: "text/csv" });
// // // // // //         const url = window.URL.createObjectURL(blob);
// // // // // //         const a = document.createElement("a");
// // // // // //         a.href = url;
// // // // // //         a.download = "enrollments.csv";
// // // // // //         document.body.appendChild(a);
// // // // // //         a.click();
// // // // // //         document.body.removeChild(a);
// // // // // //     };

// // // // // //     const handleSort = (column) => {
// // // // // //         if (column === sortColumn) {
// // // // // //             setSortDirection(sortDirection === "asc" ? "desc" : "asc");
// // // // // //         } else {
// // // // // //             setSortColumn(column);
// // // // // //             setSortDirection("asc");
// // // // // //         }
// // // // // //     };

// // // // // //     const sortedData = sortColumn
// // // // // //         ? [...rowData].sort((a, b) => {
// // // // // //               const aValue = a[sortColumn];
// // // // // //               const bValue = b[sortColumn];
// // // // // //               if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
// // // // // //               if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
// // // // // //               return 0;
// // // // // //           })
// // // // // //         : rowData;

// // // // // //     const filteredData = sortedData.filter((item) => {
// // // // // //         const enrollmentDate = new Date(item.enrollmentDate);
// // // // // //         const isWithinDateRange =
// // // // // //             (!startDate || enrollmentDate >= new Date(startDate)) && (!endDate || enrollmentDate <= new Date(endDate));

// // // // // //         const enrollmentId = item.enrollmentId?.toString().toLowerCase() || "";
// // // // // //         const courseName = item.course?.name?.toLowerCase() || "";
// // // // // //         const studentName = item.student?.fullName?.toLowerCase() || "";
// // // // // //         const studentEmail = item.student?.email?.toLowerCase() || "";
// // // // // //         const contactNo = item.student?.contactNo?.toLowerCase() || "";
// // // // // //         const enrollmentDateString = item.enrollmentDate?.toLowerCase() || "";

// // // // // //         return (
// // // // // //             isWithinDateRange &&
// // // // // //             (enrollmentId.includes(searchTerm.toLowerCase()) ||
// // // // // //                 courseName.includes(searchTerm.toLowerCase()) ||
// // // // // //                 studentName.includes(searchTerm.toLowerCase()) ||
// // // // // //                 studentEmail.includes(searchTerm.toLowerCase()) ||
// // // // // //                 contactNo.includes(searchTerm.toLowerCase()) ||
// // // // // //                 enrollmentDateString.includes(searchTerm.toLowerCase()))
// // // // // //         );
// // // // // //     });

// // // // // //     const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);
// // // // // //     const totalPages = Math.ceil(filteredData.length / pageSize);

// // // // // //     const handleStatusUpdate = async (enrollmentId, newStatus) => {
// // // // // //         try {
// // // // // //             await axios.patch(`${apiUrl}/enroll/${enrollmentId}`, {
// // // // // //                 status: newStatus
// // // // // //             });
// // // // // //             fetchData(); // Refresh data
// // // // // //         } catch (error) {
// // // // // //             console.error("Error updating status:", error);
// // // // // //         }
// // // // // //     };

// // // // // //     return (
// // // // // //         <div style={{ maxWidth: "100%", margin: "0 auto", border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}>
// // // // // //             <div style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
// // // // // //                 <Button onClick={exportToCSV} color="primary" style={{ minWidth: "90px", height: "40px", margin: "5px" }}>
// // // // // //                     <FontAwesomeIcon icon={faFileCsv} /> Export
// // // // // //                 </Button>
// // // // // //                 <FormGroup style={{ display: "flex", alignItems: "center", margin: "5px" }}>
// // // // // //                     <Label for="search" style={{ marginRight: "5px", height: "40px", margin: "5px" }}>Search:</Label>
// // // // // //                     <Input
// // // // // //                         id="search"
// // // // // //                         placeholder="Search all columns..."
// // // // // //                         onChange={(e) => setSearchTerm(e.target.value)}
// // // // // //                         style={{ width: "200px", height: "40px", margin: "5px" }}
// // // // // //                     />
// // // // // //                 </FormGroup>
// // // // // //                 <FormGroup style={{ display: "flex", alignItems: "center", margin: "5px" }}>
// // // // // //                     <Label for="startDate" style={{ marginRight: "5px" }}>Start Date:</Label>
// // // // // //                     <Input
// // // // // //                         id="startDate"
// // // // // //                         type="date"
// // // // // //                         value={startDate}
// // // // // //                         onChange={(e) => setStartDate(e.target.value)}
// // // // // //                         style={{ minWidth: "150px" }}
// // // // // //                     />
// // // // // //                 </FormGroup>
// // // // // //                 <FormGroup style={{ display: "flex", alignItems: "center", margin: "5px" }}>
// // // // // //                     <Label for="endDate" style={{ marginRight: "5px" }}>End Date:</Label>
// // // // // //                     <Input
// // // // // //                         id="endDate"
// // // // // //                         type="date"
// // // // // //                         value={endDate}
// // // // // //                         onChange={(e) => setEndDate(e.target.value)}
// // // // // //                         style={{ minWidth: "150px" }}
// // // // // //                     />
// // // // // //                 </FormGroup>
// // // // // //                 <FormGroup style={{ display: "flex", alignItems: "center", margin: "5px" }}>
// // // // // //                     <Label for="pageSize" style={{ marginRight: "5px" }}>Page Size:</Label>
// // // // // //                     <Input
// // // // // //                         id="pageSize"
// // // // // //                         type="select"
// // // // // //                         value={pageSize}
// // // // // //                         onChange={(e) => setPageSize(Number(e.target.value))}
// // // // // //                         style={{ width: "100px" }}
// // // // // //                     >
// // // // // //                         {[10, 20, 30, 50, 100].map((size) => (
// // // // // //                             <option key={size} value={size}>
// // // // // //                                 {size}
// // // // // //                             </option>
// // // // // //                         ))}
// // // // // //                     </Input>
// // // // // //                 </FormGroup>
// // // // // //             </div>
// // // // // //             <div style={{ overflowX: "auto" }}>
// // // // // //                 <table style={{ borderCollapse: 'collapse', width: '100%' }}>
// // // // // //                     <thead>
// // // // // //                         <tr>
// // // // // //                             <th onClick={() => handleSort('enrollmentId')} style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd', cursor: 'pointer' }}>
// // // // // //                                 Enrollment ID
// // // // // //                                 <FontAwesomeIcon icon={faArrowUp} style={{ opacity: sortColumn === 'enrollmentId' && sortDirection === 'asc' ? 1 : 0.5 }} />
// // // // // //                                 <FontAwesomeIcon icon={faArrowDown} style={{ opacity: sortColumn === 'enrollmentId' && sortDirection === 'desc' ? 1 : 0.5 }} />
// // // // // //                             </th>
// // // // // //                             <th onClick={() => handleSort('student.fullName')} style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd', cursor: 'pointer' }}>
// // // // // //                                 Student Name
// // // // // //                                 <FontAwesomeIcon icon={faArrowUp} style={{ opacity: sortColumn === 'student.fullName' && sortDirection === 'asc' ? 1 : 0.5 }} />
// // // // // //                                 <FontAwesomeIcon icon={faArrowDown} style={{ opacity: sortColumn === 'student.fullName' && sortDirection === 'desc' ? 1 : 0.5 }} />
// // // // // //                             </th>
// // // // // //                             <th onClick={() => handleSort('course.name')} style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd', cursor: 'pointer' }}>
// // // // // //                                 Course Name
// // // // // //                                 <FontAwesomeIcon icon={faArrowUp} style={{ opacity: sortColumn === 'course.name' && sortDirection === 'asc' ? 1 : 0.5 }} />
// // // // // //                                 <FontAwesomeIcon icon={faArrowDown} style={{ opacity: sortColumn === 'course.name' && sortDirection === 'desc' ? 1 : 0.5 }} />
// // // // // //                             </th>
// // // // // //                             <th onClick={() => handleSort('student.email')} style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd', cursor: 'pointer' }}>
// // // // // //                                 Student Email
// // // // // //                                 <FontAwesomeIcon icon={faArrowUp} style={{ opacity: sortColumn === 'student.email' && sortDirection === 'asc' ? 1 : 0.5 }} />
// // // // // //                                 <FontAwesomeIcon icon={faArrowDown} style={{ opacity: sortColumn === 'student.email' && sortDirection === 'desc' ? 1 : 0.5 }} />
// // // // // //                             </th>
// // // // // //                             <th onClick={() => handleSort('student.contactNo')} style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd', cursor: 'pointer' }}>
// // // // // //                                 Contact No
// // // // // //                                 <FontAwesomeIcon icon={faArrowUp} style={{ opacity: sortColumn === 'student.contactNo' && sortDirection === 'asc' ? 1 : 0.5 }} />
// // // // // //                                 <FontAwesomeIcon icon={faArrowDown} style={{ opacity: sortColumn === 'student.contactNo' && sortDirection === 'desc' ? 1 : 0.5 }} />
// // // // // //                             </th>
// // // // // //                             <th onClick={() => handleSort('enrollmentDate')} style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd', cursor: 'pointer' }}>
// // // // // //                                 Enrollment Date
// // // // // //                                 <FontAwesomeIcon icon={faArrowUp} style={{ opacity: sortColumn === 'enrollmentDate' && sortDirection === 'asc' ? 1 : 0.5 }} />
// // // // // //                                 <FontAwesomeIcon icon={faArrowDown} style={{ opacity: sortColumn === 'enrollmentDate' && sortDirection === 'desc' ? 1 : 0.5 }} />
// // // // // //                             </th>
// // // // // //                             <th style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd' }}>Actions</th>
// // // // // //                             <th style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd' }}>Status</th>
// // // // // //                         </tr>
// // // // // //                     </thead>
// // // // // //                     <tbody>
// // // // // //                         {paginatedData.map((item) => (
// // // // // //                             <tr key={item.enrollmentId}>
// // // // // //                                 <td style={{ fontSize: '14px', padding: '8px 10px', borderBottom: '1px solid #ddd' }}>{item.enrollmentId}</td>
// // // // // //                                 <td style={{ fontSize: '14px', padding: '8px 10px', borderBottom: '1px solid #ddd' }}>{item.student?.fullName}</td>
// // // // // //                                 <td style={{ fontSize: '14px', padding: '8px 10px', borderBottom: '1px solid #ddd' }}>{item.course?.name}</td>
// // // // // //                                 <td style={{ fontSize: '14px', padding: '8px 10px', borderBottom: '1px solid #ddd' }}>{item.student?.email}</td>
// // // // // //                                 <td style={{ fontSize: '14px', padding: '8px 10px', borderBottom: '1px solid #ddd' }}>{item.student?.contactNo}</td>
// // // // // //                                 <td style={{ fontSize: '14px', padding: '8px 10px', borderBottom: '1px solid #ddd' }}>{item.enrollmentDate}</td>
// // // // // //                                 <td style={{ fontSize: '14px', padding: '8px 10px', borderBottom: '1px solid #ddd' }}>{renderActionsCell(item.enrollmentId)}</td>
// // // // // //                                 <td style={{ fontSize: '14px', padding: '8px 10px', borderBottom: '1px solid #ddd' }}>
// // // // // //                                     <div style={{ display: "flex", alignItems: "center" }}>
// // // // // //                                         <span style={{ flex: 1 }}>
// // // // // //                                             {item.status || "Not set"}
// // // // // //                                         </span>
// // // // // //                                         <FontAwesomeIcon
// // // // // //                                             icon={faCheck}
// // // // // //                                             style={{ marginLeft: "10px", cursor: "pointer" }}
// // // // // //                                             onClick={() => handleStatusUpdate(item.enrollmentId, "completed")}
// // // // // //                                         />
// // // // // //                                         <FontAwesomeIcon
// // // // // //                                             icon={faTimes}
// // // // // //                                             style={{ marginLeft: "10px", cursor: "pointer" }}
// // // // // //                                             onClick={() => handleStatusUpdate(item.enrollmentId, "canceled")}
// // // // // //                                         />
// // // // // //                                     </div>
// // // // // //                                 </td>
// // // // // //                             </tr>
// // // // // //                         ))}
// // // // // //                     </tbody>
// // // // // //                 </table>
// // // // // //             </div>
// // // // // //             <div style={{ marginTop: "10px", display: "flex", justifyContent: "center", alignItems: "center" }}>
// // // // // //                 <Button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
// // // // // //                     Previous
// // // // // //                 </Button>
// // // // // //                 <span style={{ margin: "0 10px" }}>
// // // // // //                     Page {currentPage} of {totalPages}
// // // // // //                 </span>
// // // // // //                 <Button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
// // // // // //                     Next
// // // // // //                 </Button>
// // // // // //             </div>
// // // // // //         </div>
// // // // // //     );
// // // // // // };

// // // // // // export default TableComponent;


// // // // // import React, { useState, useEffect } from "react";
// // // // // import axios from "axios";
// // // // // import { Button, Input, Label, FormGroup } from "reactstrap";
// // // // // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // // // // import { faEdit, faTrashAlt, faFileCsv, faArrowUp, faArrowDown, faIndianRupeeSign, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
// // // // // import Papa from "papaparse";
// // // // // import { Link } from "react-router-dom";
// // // // // import "bootstrap/dist/css/bootstrap.min.css";

// // // // // const TableComponent = () => {
// // // // //     const [rowData, setRowData] = useState([]);
// // // // //     const [currentPage, setCurrentPage] = useState(1);
// // // // //     const [pageSize, setPageSize] = useState(10);
// // // // //     const [searchTerm, setSearchTerm] = useState("");
// // // // //     const [sortColumn, setSortColumn] = useState(null);
// // // // //     const [sortDirection, setSortDirection] = useState(null);
// // // // //     const [startDate, setStartDate] = useState("");
// // // // //     const [endDate, setEndDate] = useState("");
// // // // //     const [editStatusId, setEditStatusId] = useState(null);
// // // // //     const [status, setStatus] = useState("");
// // // // //     const apiUrl = process.env.REACT_APP_API_BASE_URL;

// // // // //     useEffect(() => {
// // // // //         fetchData();
// // // // //     }, [currentPage, pageSize, searchTerm, startDate, endDate]);

// // // // //     const fetchData = async () => {
// // // // //         try {
// // // // //             const response = await axios.get(`${apiUrl}/enroll`);
// // // // //             setRowData(response.data);
// // // // //         } catch (error) {
// // // // //             console.error("Error fetching data:", error);
// // // // //         }
// // // // //     };

// // // // //     const renderActionsCell = (enrollmentId) => (
// // // // //         <div style={{ display: "flex", justifyContent: "center" }}>
// // // // //             <Link to={`/editenrollment/${enrollmentId}`}>
// // // // //                 <Button color="info" style={{ margin: "2px" }}>
// // // // //                     <FontAwesomeIcon icon={faEdit} /> Edit
// // // // //                 </Button>
// // // // //             </Link>
// // // // //             <Link to={{ pathname: "/payments", search: `?enrollmentId=${enrollmentId}` }}>
// // // // //                 <Button color="success" style={{ margin: "2px" }}>
// // // // //                     <FontAwesomeIcon icon={faIndianRupeeSign} /> Payment
// // // // //                 </Button>
// // // // //             </Link>
// // // // //         </div>
// // // // //     );

// // // // //     const exportToCSV = () => {
// // // // //         const csv = Papa.unparse(rowData);
// // // // //         const blob = new Blob([csv], { type: "text/csv" });
// // // // //         const url = window.URL.createObjectURL(blob);
// // // // //         const a = document.createElement("a");
// // // // //         a.href = url;
// // // // //         a.download = "enrollments.csv";
// // // // //         document.body.appendChild(a);
// // // // //         a.click();
// // // // //         document.body.removeChild(a);
// // // // //     };

// // // // //     const handleSort = (column) => {
// // // // //         if (column === sortColumn) {
// // // // //             setSortDirection(sortDirection === "asc" ? "desc" : "asc");
// // // // //         } else {
// // // // //             setSortColumn(column);
// // // // //             setSortDirection("asc");
// // // // //         }
// // // // //     };

// // // // //     const sortedData = sortColumn
// // // // //         ? [...rowData].sort((a, b) => {
// // // // //               const aValue = a[sortColumn];
// // // // //               const bValue = b[sortColumn];
// // // // //               if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
// // // // //               if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
// // // // //               return 0;
// // // // //           })
// // // // //         : rowData;

// // // // //     const filteredData = sortedData.filter((item) => {
// // // // //         const enrollmentDate = new Date(item.enrollmentDate);
// // // // //         const isWithinDateRange =
// // // // //             (!startDate || enrollmentDate >= new Date(startDate)) && (!endDate || enrollmentDate <= new Date(endDate));

// // // // //         const enrollmentId = item.enrollmentId?.toString().toLowerCase() || "";
// // // // //         const courseName = item.course?.name?.toLowerCase() || "";
// // // // //         const studentName = item.student?.fullName?.toLowerCase() || "";
// // // // //         const studentEmail = item.student?.email?.toLowerCase() || "";
// // // // //         const contactNo = item.student?.contactNo?.toLowerCase() || "";
// // // // //         const enrollmentDateString = item.enrollmentDate?.toLowerCase() || "";

// // // // //         return (
// // // // //             isWithinDateRange &&
// // // // //             (enrollmentId.includes(searchTerm.toLowerCase()) ||
// // // // //                 courseName.includes(searchTerm.toLowerCase()) ||
// // // // //                 studentName.includes(searchTerm.toLowerCase()) ||
// // // // //                 studentEmail.includes(searchTerm.toLowerCase()) ||
// // // // //                 contactNo.includes(searchTerm.toLowerCase()) ||
// // // // //                 enrollmentDateString.includes(searchTerm.toLowerCase()))
// // // // //         );
// // // // //     });

// // // // //     const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);
// // // // //     const totalPages = Math.ceil(filteredData.length / pageSize);

// // // // //     const handleStatusUpdate = async (enrollmentId, newStatus) => {
// // // // //         try {
// // // // //             await axios.patch(`${apiUrl}/enroll/${enrollmentId}`, {
// // // // //                 status: newStatus
// // // // //             });
// // // // //             fetchData(); // Refresh data
// // // // //         } catch (error) {
// // // // //             console.error("Error updating status:", error);
// // // // //         }
// // // // //     };

// // // // //     return (
// // // // //         <div style={{ maxWidth: "100%", margin: "0 auto", border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}>
// // // // //             <div style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
// // // // //                 <Button onClick={exportToCSV} color="primary" style={{ minWidth: "90px", height: "40px", margin: "5px" }}>
// // // // //                     <FontAwesomeIcon icon={faFileCsv} /> Export
// // // // //                 </Button>
// // // // //                 <FormGroup style={{ display: "flex", alignItems: "center", margin: "5px" }}>
// // // // //                     <Label for="search" style={{ marginRight: "5px", height: "40px", margin: "5px" }}>Search:</Label>
// // // // //                     <Input
// // // // //                         id="search"
// // // // //                         placeholder="Search all columns..."
// // // // //                         onChange={(e) => setSearchTerm(e.target.value)}
// // // // //                         style={{ width: "200px", height: "40px", margin: "5px" }}
// // // // //                     />
// // // // //                 </FormGroup>
// // // // //                 <FormGroup style={{ display: "flex", alignItems: "center", margin: "5px" }}>
// // // // //                     <Label for="startDate" style={{ marginRight: "5px" }}>Start Date:</Label>
// // // // //                     <Input
// // // // //                         id="startDate"
// // // // //                         type="date"
// // // // //                         value={startDate}
// // // // //                         onChange={(e) => setStartDate(e.target.value)}
// // // // //                         style={{ minWidth: "150px" }}
// // // // //                     />
// // // // //                 </FormGroup>
// // // // //                 <FormGroup style={{ display: "flex", alignItems: "center", margin: "5px" }}>
// // // // //                     <Label for="endDate" style={{ marginRight: "5px" }}>End Date:</Label>
// // // // //                     <Input
// // // // //                         id="endDate"
// // // // //                         type="date"
// // // // //                         value={endDate}
// // // // //                         onChange={(e) => setEndDate(e.target.value)}
// // // // //                         style={{ minWidth: "150px" }}
// // // // //                     />
// // // // //                 </FormGroup>
// // // // //                 <FormGroup style={{ display: "flex", alignItems: "center", margin: "5px" }}>
// // // // //                     <Label for="pageSize" style={{ marginRight: "5px" }}>Page Size:</Label>
// // // // //                     <Input
// // // // //                         id="pageSize"
// // // // //                         type="select"
// // // // //                         value={pageSize}
// // // // //                         onChange={(e) => setPageSize(Number(e.target.value))}
// // // // //                         style={{ width: "100px" }}
// // // // //                     >
// // // // //                         {[10, 20, 30, 50, 100].map((size) => (
// // // // //                             <option key={size} value={size}>
// // // // //                                 {size}
// // // // //                             </option>
// // // // //                         ))}
// // // // //                     </Input>
// // // // //                 </FormGroup>
// // // // //             </div>
// // // // //             <div style={{ overflowX: "auto" }}>
// // // // //                 <table style={{ borderCollapse: 'collapse', width: '100%' }}>
// // // // //                     <thead>
// // // // //                         <tr>
// // // // //                             <th onClick={() => handleSort('enrollmentId')} style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd', cursor: 'pointer' }}>
// // // // //                                 Enrollment ID
// // // // //                                 <FontAwesomeIcon icon={faArrowUp} style={{ opacity: sortColumn === 'enrollmentId' && sortDirection === 'asc' ? 1 : 0.5 }} />
// // // // //                                 <FontAwesomeIcon icon={faArrowDown} style={{ opacity: sortColumn === 'enrollmentId' && sortDirection === 'desc' ? 1 : 0.5 }} />
// // // // //                             </th>
// // // // //                             <th onClick={() => handleSort('student.fullName')} style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd', cursor: 'pointer' }}>
// // // // //                                 Student Name
// // // // //                                 <FontAwesomeIcon icon={faArrowUp} style={{ opacity: sortColumn === 'student.fullName' && sortDirection ==='asc' ? 1 : 0.5 }} />
// // // // //                                 <FontAwesomeIcon icon={faArrowDown} style={{ opacity: sortColumn === 'student.fullName' && sortDirection === 'desc' ? 1 : 0.5 }} />
// // // // //                             </th>
// // // // //                             <th onClick={() => handleSort('course.name')} style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd', cursor: 'pointer' }}>
// // // // //                                 Course Name
// // // // //                                 <FontAwesomeIcon icon={faArrowUp} style={{ opacity: sortColumn === 'course.name' && sortDirection === 'asc' ? 1 : 0.5 }} />
// // // // //                                 <FontAwesomeIcon icon={faArrowDown} style={{ opacity: sortColumn === 'course.name' && sortDirection === 'desc' ? 1 : 0.5 }} />
// // // // //                             </th>
// // // // //                             <th onClick={() => handleSort('student.email')} style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd', cursor: 'pointer' }}>
// // // // //                                 Email
// // // // //                                 <FontAwesomeIcon icon={faArrowUp} style={{ opacity: sortColumn === 'student.email' && sortDirection === 'asc' ? 1 : 0.5 }} />
// // // // //                                 <FontAwesomeIcon icon={faArrowDown} style={{ opacity: sortColumn === 'student.email' && sortDirection === 'desc' ? 1 : 0.5 }} />
// // // // //                             </th>
// // // // //                             <th onClick={() => handleSort('enrollmentDate')} style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd', cursor: 'pointer' }}>
// // // // //                                 Enrollment Date
// // // // //                                 <FontAwesomeIcon icon={faArrowUp} style={{ opacity: sortColumn === 'enrollmentDate' && sortDirection === 'asc' ? 1 : 0.5 }} />
// // // // //                                 <FontAwesomeIcon icon={faArrowDown} style={{ opacity: sortColumn === 'enrollmentDate' && sortDirection === 'desc' ? 1 : 0.5 }} />
// // // // //                             </th>
// // // // //                             <th onClick={() => handleSort('status')} style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd', cursor: 'pointer' }}>
// // // // //                                 Status
// // // // //                                 <FontAwesomeIcon icon={faArrowUp} style={{ opacity: sortColumn === 'status' && sortDirection === 'asc' ? 1 : 0.5 }} />
// // // // //                                 <FontAwesomeIcon icon={faArrowDown} style={{ opacity: sortColumn === 'status' && sortDirection === 'desc' ? 1 : 0.5 }} />
// // // // //                             </th>
// // // // //                             <th style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd' }}>Actions</th>
// // // // //                         </tr>
// // // // //                     </thead>
// // // // //                     <tbody>
// // // // //                         {paginatedData.map((item) => (
// // // // //                             <tr key={item.enrollmentId}>
// // // // //                                 <td style={{ textAlign: 'center', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd' }}>{item.enrollmentId}</td>
// // // // //                                 <td style={{ textAlign: 'center', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd' }}>{item.student.fullName}</td>
// // // // //                                 <td style={{ textAlign: 'center', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd' }}>{item.course.name}</td>
// // // // //                                 <td style={{ textAlign: 'center', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd' }}>{item.student.email}</td>
// // // // //                                 <td style={{ textAlign: 'center', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd' }}>{new Date(item.enrollmentDate).toLocaleDateString()}</td>
// // // // //                                 <td style={{ textAlign: 'center', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd' }}>
// // // // //                                     {editStatusId === item.enrollmentId ? (
// // // // //                                         <div style={{ display: 'flex', justifyContent: 'center' }}>
// // // // //                                             <Button color="success" style={{ margin: "2px" }} onClick={() => handleStatusUpdate(item.enrollmentId, "completed")}>
// // // // //                                                 <FontAwesomeIcon icon={faCheck} /> Completed
// // // // //                                             </Button>
// // // // //                                             <Button color="danger" style={{ margin: "2px" }} onClick={() => handleStatusUpdate(item.enrollmentId, "dropped")}>
// // // // //                                                 <FontAwesomeIcon icon={faTimes} /> Cancel
// // // // //                                             </Button>
// // // // //                                         </div>
// // // // //                                     ) : (
// // // // //                                         <Button color="info" style={{ margin: "2px" }} onClick={() => setEditStatusId(item.enrollmentId)}>
// // // // //                                             Edit Status
// // // // //                                         </Button>
// // // // //                                     )}
// // // // //                                 </td>
// // // // //                                 <td style={{ textAlign: 'center', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd' }}>
// // // // //                                     {renderActionsCell(item.enrollmentId)}
// // // // //                                 </td>
// // // // //                             </tr>
// // // // //                         ))}
// // // // //                     </tbody>
// // // // //                 </table>
// // // // //             </div>
// // // // //             <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
// // // // //                 <Button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} style={{ margin: '0 5px' }}>
// // // // //                     Previous
// // // // //                 </Button>
// // // // //                 <span style={{ display: 'inline-block', margin: '0 5px' }}>
// // // // //                     Page {currentPage} of {totalPages}
// // // // //                 </span>
// // // // //                 <Button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} style={{ margin: '0 5px' }}>
// // // // //                     Next
// // // // //                 </Button>
// // // // //             </div>
// // // // //         </div>
// // // // //     );
// // // // // };

// // // // // export default TableComponent;

// // // // import React, { useState, useEffect } from "react";
// // // // import axios from "axios";
// // // // import { Button, Input, Label, FormGroup } from "reactstrap";
// // // // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // // // import { faEdit, faTrashAlt, faFileCsv, faArrowUp, faArrowDown, faIndianRupeeSign, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
// // // // import Papa from "papaparse";
// // // // import { Link } from "react-router-dom";
// // // // import "bootstrap/dist/css/bootstrap.min.css";

// // // // const TableComponent = () => {
// // // //     const [rowData, setRowData] = useState([]);
// // // //     const [currentPage, setCurrentPage] = useState(1);
// // // //     const [pageSize, setPageSize] = useState(10);
// // // //     const [searchTerm, setSearchTerm] = useState("");
// // // //     const [sortColumn, setSortColumn] = useState(null);
// // // //     const [sortDirection, setSortDirection] = useState(null);
// // // //     const [startDate, setStartDate] = useState("");
// // // //     const [endDate, setEndDate] = useState("");
// // // //     const [statusMap, setStatusMap] = useState({});
// // // //     const apiUrl = process.env.REACT_APP_API_BASE_URL;

// // // //     useEffect(() => {
// // // //         fetchData();
// // // //     }, [currentPage, pageSize, searchTerm, startDate, endDate]);

// // // //     const fetchData = async () => {
// // // //         try {
// // // //             const response = await axios.get(`${apiUrl}/enroll`);
// // // //             setRowData(response.data);
// // // //             const initialStatusMap = response.data.reduce((map, item) => {
// // // //                 map[item.enrollmentId] = item.status;
// // // //                 return map;
// // // //             }, {});
// // // //             setStatusMap(initialStatusMap);
// // // //         } catch (error) {
// // // //             console.error("Error fetching data:", error);
// // // //         }
// // // //     };

// // // //     const renderActionsCell = (enrollmentId) => (
// // // //         <div style={{ display: "flex", justifyContent: "center" }}>
// // // //             <Link to={`/editenrollment/${enrollmentId}`}>
// // // //                 <Button color="info" style={{ margin: "2px" }}>
// // // //                     <FontAwesomeIcon icon={faEdit} /> Edit
// // // //                 </Button>
// // // //             </Link>
// // // //             <Link to={{ pathname: "/payments", search: `?enrollmentId=${enrollmentId}` }}>
// // // //                 <Button color="success" style={{ margin: "2px" }}>
// // // //                     <FontAwesomeIcon icon={faIndianRupeeSign} /> Payment
// // // //                 </Button>
// // // //             </Link>
// // // //         </div>
// // // //     );

// // // //     const exportToCSV = () => {
// // // //         const csv = Papa.unparse(rowData);
// // // //         const blob = new Blob([csv], { type: "text/csv" });
// // // //         const url = window.URL.createObjectURL(blob);
// // // //         const a = document.createElement("a");
// // // //         a.href = url;
// // // //         a.download = "enrollments.csv";
// // // //         document.body.appendChild(a);
// // // //         a.click();
// // // //         document.body.removeChild(a);
// // // //     };

// // // //     const handleSort = (column) => {
// // // //         if (column === sortColumn) {
// // // //             setSortDirection(sortDirection === "asc" ? "desc" : "asc");
// // // //         } else {
// // // //             setSortColumn(column);
// // // //             setSortDirection("asc");
// // // //         }
// // // //     };

// // // //     const sortedData = sortColumn
// // // //         ? [...rowData].sort((a, b) => {
// // // //               const aValue = a[sortColumn];
// // // //               const bValue = b[sortColumn];
// // // //               if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
// // // //               if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
// // // //               return 0;
// // // //           })
// // // //         : rowData;

// // // //     const filteredData = sortedData.filter((item) => {
// // // //         const enrollmentDate = new Date(item.enrollmentDate);
// // // //         const isWithinDateRange =
// // // //             (!startDate || enrollmentDate >= new Date(startDate)) && (!endDate || enrollmentDate <= new Date(endDate));

// // // //         const enrollmentId = item.enrollmentId?.toString().toLowerCase() || "";
// // // //         const courseName = item.course?.name?.toLowerCase() || "";
// // // //         const studentName = item.student?.fullName?.toLowerCase() || "";
// // // //         const studentEmail = item.student?.email?.toLowerCase() || "";
// // // //         const contactNo = item.student?.contactNo?.toLowerCase() || "";
// // // //         const enrollmentDateString = item.enrollmentDate?.toLowerCase() || "";

// // // //         return (
// // // //             isWithinDateRange &&
// // // //             (enrollmentId.includes(searchTerm.toLowerCase()) ||
// // // //                 courseName.includes(searchTerm.toLowerCase()) ||
// // // //                 studentName.includes(searchTerm.toLowerCase()) ||
// // // //                 studentEmail.includes(searchTerm.toLowerCase()) ||
// // // //                 contactNo.includes(searchTerm.toLowerCase()) ||
// // // //                 enrollmentDateString.includes(searchTerm.toLowerCase()))
// // // //         );
// // // //     });

// // // //     const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);
// // // //     const totalPages = Math.ceil(filteredData.length / pageSize);

// // // //     const handleStatusUpdate = async (enrollmentId, newStatus) => {
// // // //         try {
// // // //             await axios.patch(`${apiUrl}/enroll/${enrollmentId}`, {
// // // //                 status: newStatus
// // // //             });
// // // //             setStatusMap((prev) => ({ ...prev, [enrollmentId]: newStatus }));
// // // //             fetchData(); // Refresh data
// // // //         } catch (error) {
// // // //             console.error("Error updating status:", error);
// // // //         }
// // // //     };

// // // //     return (
// // // //         <div style={{ maxWidth: "100%", margin: "0 auto", border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}>
// // // //             <div style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
// // // //                 <Button onClick={exportToCSV} color="primary" style={{ minWidth: "90px", height: "40px", margin: "5px" }}>
// // // //                     <FontAwesomeIcon icon={faFileCsv} /> Export
// // // //                 </Button>
// // // //                 <FormGroup style={{ display: "flex", alignItems: "center", margin: "5px" }}>
// // // //                     <Label for="search" style={{ marginRight: "5px", height: "40px", margin: "5px" }}>Search:</Label>
// // // //                     <Input
// // // //                         id="search"
// // // //                         placeholder="Search all columns..."
// // // //                         onChange={(e) => setSearchTerm(e.target.value)}
// // // //                         style={{ width: "200px", height: "40px", margin: "5px" }}
// // // //                     />
// // // //                 </FormGroup>
// // // //                 <FormGroup style={{ display: "flex", alignItems: "center", margin: "5px" }}>
// // // //                     <Label for="startDate" style={{ marginRight: "5px" }}>Start Date:</Label>
// // // //                     <Input
// // // //                         id="startDate"
// // // //                         type="date"
// // // //                         value={startDate}
// // // //                         onChange={(e) => setStartDate(e.target.value)}
// // // //                         style={{ minWidth: "150px" }}
// // // //                     />
// // // //                 </FormGroup>
// // // //                 <FormGroup style={{ display: "flex", alignItems: "center", margin: "5px" }}>
// // // //                     <Label for="endDate" style={{ marginRight: "5px" }}>End Date:</Label>
// // // //                     <Input
// // // //                         id="endDate"
// // // //                         type="date"
// // // //                         value={endDate}
// // // //                         onChange={(e) => setEndDate(e.target.value)}
// // // //                         style={{ minWidth: "150px" }}
// // // //                     />
// // // //                 </FormGroup>
// // // //                 <FormGroup style={{ display: "flex", alignItems: "center", margin: "5px" }}>
// // // //                     <Label for="pageSize" style={{ marginRight: "5px" }}>Page Size:</Label>
// // // //                     <Input
// // // //                         id="pageSize"
// // // //                         type="select"
// // // //                         value={pageSize}
// // // //                         onChange={(e) => setPageSize(Number(e.target.value))}
// // // //                         style={{ width: "100px" }}
// // // //                     >
// // // //                         {[10, 20, 30, 50, 100].map((size) => (
// // // //                             <option key={size} value={size}>
// // // //                                 {size}
// // // //                             </option>
// // // //                         ))}
// // // //                     </Input>
// // // //                 </FormGroup>
// // // //             </div>
// // // //             <div style={{ overflowX: "auto" }}>
// // // //                 <table style={{ borderCollapse: 'collapse', width: '100%' }}>
// // // //                     <thead>
// // // //                         <tr>
// // // //                             <th onClick={() => handleSort('enrollmentId')} style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd', cursor: 'pointer' }}>
// // // //                                 Enrollment ID
// // // //                                 <FontAwesomeIcon icon={faArrowUp} style={{ opacity: sortColumn === 'enrollmentId' && sortDirection === 'asc' ? 1 : 0.5 }} />
// // // //                                 <FontAwesomeIcon icon={faArrowDown} style={{ opacity: sortColumn === 'enrollmentId' && sortDirection === 'desc' ? 1 : 0.5 }} />
// // // //                             </th>
// // // //                             <th onClick={() => handleSort('student.fullName')} style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd', cursor: 'pointer' }}>
// // // //                                 Student Name
// // // //                                 <FontAwesomeIcon icon={faArrowUp} style={{ opacity: sortColumn === 'student.fullName' && sortDirection === 'asc' ? 1 : 0.5 }} />
// // // //                                 <FontAwesomeIcon icon={faArrowDown} style={{ opacity: sortColumn === 'student.fullName' && sortDirection === 'desc' ? 1 : 0.5 }} />
// // // //                             </th>
// // // //                             <th onClick={() => handleSort('student.email')} style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd', cursor: 'pointer' }}>
// // // //                                 Email
// // // //                                 <FontAwesomeIcon icon={faArrowUp} style={{ opacity: sortColumn === 'student.email' && sortDirection === 'asc' ? 1 : 0.5 }} />
// // // //                                 <FontAwesomeIcon icon={faArrowDown} style={{ opacity: sortColumn === 'student.email' && sortDirection === 'desc' ? 1 : 0.5 }} />
// // // //                             </th>
// // // //                             <th onClick={() => handleSort('student.contactNo')} style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd', cursor: 'pointer' }}>
// // // //                                 Contact No
// // // //                                 <FontAwesomeIcon icon={faArrowUp} style={{ opacity: sortColumn === 'student.contactNo' && sortDirection === 'asc' ? 1 : 0.5 }} />
// // // //                                 <FontAwesomeIcon icon={faArrowDown} style={{ opacity: sortColumn === 'student.contactNo' && sortDirection === 'desc' ? 1 : 0.5 }} />
// // // //                             </th>
// // // //                             <th onClick={() => handleSort('enrollmentDate')} style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd', cursor: 'pointer' }}>
// // // //                                 Enrollment Date
// // // //                                 <FontAwesomeIcon icon={faArrowUp} style={{ opacity: sortColumn === 'enrollmentDate' && sortDirection === 'asc' ? 1 : 0.5 }} />
// // // //                                 <FontAwesomeIcon icon={faArrowDown} style={{ opacity: sortColumn === 'enrollmentDate' && sortDirection === 'desc' ? 1 : 0.5 }} />
// // // //                             </th>
// // // //                             <th onClick={() => handleSort('course.name')} style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd', cursor: 'pointer' }}>
// // // //                                 Course
// // // //                                 <FontAwesomeIcon icon={faArrowUp} style={{ opacity: sortColumn === 'course.name' && sortDirection === 'asc' ? 1 : 0.5 }} />
// // // //                                 <FontAwesomeIcon icon={faArrowDown} style={{ opacity: sortColumn === 'course.name' && sortDirection === 'desc' ? 1 : 0.5 }} />
// // // //                             </th>
// // // //                             <th style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd' }}>
// // // //                                 Actions
// // // //                             </th>
// // // //                             <th style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd' }}>
// // // //                                 Status
// // // //                             </th>
// // // //                         </tr>
// // // //                     </thead>
// // // //                     <tbody>
// // // //                         {paginatedData.map((item) => (
// // // //                             <tr key={item.enrollmentId}>
// // // //                                 <td style={{ fontSize: '12px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd' }}>{item.enrollmentId}</td>
// // // //                                 <td style={{ fontSize: '12px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd' }}>{item.student?.fullName}</td>
// // // //                                 <td style={{ fontSize: '12px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd' }}>{item.student?.email}</td>
// // // //                                 <td style={{ fontSize: '12px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd' }}>{item.student?.contactNo}</td>
// // // //                                 <td style={{ fontSize: '12px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd' }}>{item.enrollmentDate}</td>
// // // //                                 <td style={{ fontSize: '12px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd' }}>{item.course?.name}</td>
// // // //                                 <td style={{ fontSize: '12px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd' }}>{renderActionsCell(item.enrollmentId)}</td>
// // // //                                 <td style={{ fontSize: '12px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd' }}>
// // // //                                     <Input
// // // //                                         type="select"
// // // //                                         value={statusMap[item.enrollmentId]}
// // // //                                         onChange={(e) => handleStatusUpdate(item.enrollmentId, e.target.value)}
// // // //                                         style={{ fontSize: '12px', marginRight: '10px' }}
// // // //                                     >
// // // //                                         {/* <option value="">Select Status</option> */}
// // // //                                         <option value="completed">Completed</option>
// // // //                                         <option value="dropped">Cancelled</option>
// // // //                                         <option value="enrolled">Enrolled</option>
// // // //                                     </Input>
// // // //                                 </td>
// // // //                             </tr>
// // // //                         ))}
// // // //                     </tbody>
// // // //                 </table>
// // // //             </div>
// // // //             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px', flexWrap: 'wrap' }}>
// // // //                 <Button
// // // //                     onClick={() => setCurrentPage(currentPage - 1)}
// // // //                     disabled={currentPage === 1}
// // // //                     color="primary"
// // // //                     style={{ minWidth: '90px', height: '40px', margin: '5px' }}
// // // //                 >
// // // //                     Previous
// // // //                 </Button>
// // // //                 <span style={{ fontSize: '16px', margin: '5px' }}>
// // // //                     Page {currentPage} of {totalPages}
// // // //                 </span>
// // // //                 <Button
// // // //                     onClick={() => setCurrentPage(currentPage + 1)}
// // // //                     disabled={currentPage === totalPages}
// // // //                     color="primary"
// // // //                     style={{ minWidth: '90px', height: '40px', margin: '5px' }}
// // // //                 >
// // // //                     Next
// // // //                 </Button>
// // // //             </div>
// // // //         </div>
// // // //     );
// // // // };

// // // // export default TableComponent;

// // // import React, { useState, useEffect } from "react";
// // // import axios from "axios";
// // // import { Button, Input, Label, FormGroup } from "reactstrap";
// // // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // // import { faEdit, faTrashAlt, faFileCsv, faArrowUp, faArrowDown, faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
// // import Papa from "papaparse";
// // // import { Link } from "react-router-dom";
// // // import "bootstrap/dist/css/bootstrap.min.css";

// // // const TableComponent = () => {
//     // const [rowData, setRowData] = useState([]);
// // //     const [currentPage, setCurrentPage] = useState(1);
// // //     const [pageSize, setPageSize] = useState(10);
// // //     const [searchTerm, setSearchTerm] = useState("");
// // //     const [sortColumn, setSortColumn] = useState(null);
// // //     const [sortDirection, setSortDirection] = useState(null);
// // //     const [startDate, setStartDate] = useState("");
// // //     const [endDate, setEndDate] = useState("");
// // //     const [statusMap, setStatusMap] = useState({});
// // //     const apiUrl = process.env.REACT_APP_API_BASE_URL;

// // //     useEffect(() => {
// // //         fetchData();
// // //     }, [currentPage, pageSize, searchTerm, startDate, endDate]);

// // //     const fetchData = async () => {
// // //         try {
// // //             const response = await axios.get(`${apiUrl}/enroll`);
// // //             setRowData(response.data);
// // //             const initialStatusMap = response.data.reduce((map, item) => {
// // //                 map[item.enrollmentId] = item.status || "enrolled";
// // //                 return map;
// // //             }, {});
// // //             setStatusMap(initialStatusMap);
// // //         } catch (error) {
// // //             console.error("Error fetching data:", error);
// // //         }
// // //     };

// // //     const renderActionsCell = (enrollmentId) => (
// // //         <div style={{ display: "flex", justifyContent: "center" }}>
// // //             <Link to={`/editenrollment/${enrollmentId}`}>
// // //                 <Button color="info" style={{ margin: "2px" }}>
// // //                     <FontAwesomeIcon icon={faEdit} /> Edit
// // //                 </Button>
// // //             </Link>
// // //             <Link to={{ pathname: "/payments", search: `?enrollmentId=${enrollmentId}` }}>
// // //                 <Button color="success" style={{ margin: "2px" }}>
// // //                     <FontAwesomeIcon icon={faIndianRupeeSign} /> Payment
// // //                 </Button>
// // //             </Link>
// // //         </div>
// // //     );

//     // const exportToCSV = () => {
//     //     const csv = Papa.unparse(rowData);
//     //     const blob = new Blob([csv], { type: "text/csv" });
//     //     const url = window.URL.createObjectURL(blob);
//     //     const a = document.createElement("a");
//     //     a.href = url;
//     //     a.download = "enrollments.csv";
//     //     document.body.appendChild(a);
//     //     a.click();
//     //     document.body.removeChild(a);
//     // };

// // //     const handleSort = (column) => {
// // //         if (column === sortColumn) {
// // //             setSortDirection(sortDirection === "asc" ? "desc" : "asc");
// // //         } else {
// // //             setSortColumn(column);
// // //             setSortDirection("asc");
// // //         }
// // //     };

// // //     const sortedData = sortColumn
// // //         ? [...rowData].sort((a, b) => {
// // //               const aValue = a[sortColumn];
// // //               const bValue = b[sortColumn];
// // //               if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
// // //               if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
// // //               return 0;
// // //           })
// // //         : rowData;

// // //     const filteredData = sortedData.filter((item) => {
// // //         const enrollmentDate = new Date(item.enrollmentDate);
// // //         const isWithinDateRange =
// // //             (!startDate || enrollmentDate >= new Date(startDate)) && (!endDate || enrollmentDate <= new Date(endDate));

// // //         const enrollmentId = item.enrollmentId?.toString().toLowerCase() || "";
// // //         const courseName = item.course?.name?.toLowerCase() || "";
// // //         const studentName = item.student?.fullName?.toLowerCase() || "";
// // //         const studentEmail = item.student?.email?.toLowerCase() || "";
// // //         const contactNo = item.student?.contactNo?.toLowerCase() || "";
// // //         const enrollmentDateString = item.enrollmentDate?.toLowerCase() || "";

// // //         return (
// // //             isWithinDateRange &&
// // //             (enrollmentId.includes(searchTerm.toLowerCase()) ||
// // //                 courseName.includes(searchTerm.toLowerCase()) ||
// // //                 studentName.includes(searchTerm.toLowerCase()) ||
// // //                 studentEmail.includes(searchTerm.toLowerCase()) ||
// // //                 contactNo.includes(searchTerm.toLowerCase()) ||
// // //                 enrollmentDateString.includes(searchTerm.toLowerCase()))
// // //         );
// // //     });

// // //     const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);
// // //     const totalPages = Math.ceil(filteredData.length / pageSize);

// // //     const handleStatusUpdate = async (enrollmentId, newStatus) => {
// // //         try {
// // //             await axios.patch(`${apiUrl}/enroll/${enrollmentId}`, {
// // //                 status: newStatus
// // //             });
// // //             setStatusMap((prev) => ({ ...prev, [enrollmentId]: newStatus }));
// // //             fetchData(); // Refresh data
// // //         } catch (error) {
// // //             console.error("Error updating status:", error);
// // //         }
// // //     };

// // //     return (
// // //         <div style={{ maxWidth: "100%", margin: "0 auto", border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}>
// // //             <div style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
// // //                 <Button onClick={exportToCSV} color="primary" style={{ minWidth: "90px", height: "40px", margin: "5px" }}>
// // //                     <FontAwesomeIcon icon={faFileCsv} /> Export
// // //                 </Button>
// // //                 <FormGroup style={{ display: "flex", alignItems: "center", margin: "5px" }}>
// // //                     <Label for="search" style={{ marginRight: "5px", height: "40px", margin: "5px" }}>Search:</Label>
// // //                     <Input
// // //                         id="search"
// // //                         placeholder="Search all columns..."
// // //                         onChange={(e) => setSearchTerm(e.target.value)}
// // //                         style={{ width: "200px", height: "40px", margin: "5px" }}
// // //                     />
// // //                 </FormGroup>
// // //                 <FormGroup style={{ display: "flex", alignItems: "center", margin: "5px" }}>
// // //                     <Label for="startDate" style={{ marginRight: "5px" }}>Start Date:</Label>
// // //                     <Input
// // //                         id="startDate"
// // //                         type="date"
// // //                         value={startDate}
// // //                         onChange={(e) => setStartDate(e.target.value)}
// // //                         style={{ minWidth: "150px" }}
// // //                     />
// // //                 </FormGroup>
// // //                 <FormGroup style={{ display: "flex", alignItems: "center", margin: "5px" }}>
// // //                     <Label for="endDate" style={{ marginRight: "5px" }}>End Date:</Label>
// // //                     <Input
// // //                         id="endDate"
// // //                         type="date"
// // //                         value={endDate}
// // //                         onChange={(e) => setEndDate(e.target.value)}
// // //                         style={{ minWidth: "150px" }}
// // //                     />
// // //                 </FormGroup>
// // //                 <FormGroup style={{ display: "flex", alignItems: "center", margin: "5px" }}>
// // //                     <Label for="pageSize" style={{ marginRight: "5px" }}>Page Size:</Label>
// // //                     <Input
// // //                         id="pageSize"
// // //                         type="select"
// // //                         value={pageSize}
// // //                         onChange={(e) => setPageSize(Number(e.target.value))}
// // //                         style={{ width: "100px" }}
// // //                     >
// // //                         {[10, 20, 30, 50, 100].map((size) => (
// // //                             <option key={size} value={size}>
// // //                                 {size}
// // //                             </option>
// // //                         ))}
// // //                     </Input>
// // //                 </FormGroup>
// // //             </div>
// // //             <div style={{ overflowX: "auto" }}>
// // //                 <table style={{ borderCollapse: 'collapse', width: '100%' }}>
// // //                     <thead>
// // //                         <tr>
// // //                             <th onClick={() => handleSort('enrollmentId')} style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd', cursor: 'pointer' }}>
// // //                                 Enrollment ID
// // //                                 <FontAwesomeIcon icon={faArrowUp} style={{ opacity: sortColumn === 'enrollmentId' && sortDirection === 'asc' ? 1 : 0.5 }} />
// // //                                 <FontAwesomeIcon icon={faArrowDown} style={{ opacity: sortColumn === 'enrollmentId' && sortDirection === 'desc' ? 1 : 0.5 }} />
// // //                             </th>
// // //                             <th onClick={() => handleSort('student.fullName')} style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd', cursor: 'pointer' }}>
// // //                                 Student Name
// // //                                 <FontAwesomeIcon icon={faArrowUp} style={{ opacity: sortColumn === 'student.fullName' && sortDirection === 'asc' ? 1 : 0.5 }} />
// // //                                 <FontAwesomeIcon icon={faArrowDown} style={{ opacity: sortColumn === 'student.fullName' && sortDirection === 'desc' ? 1 : 0.5 }} />
// // //                             </th>
// // //                             <th onClick={() => handleSort('student.email')} style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd', cursor: 'pointer' }}>
// // //                                 Email
// // //                                 <FontAwesomeIcon icon={faArrowUp} style={{ opacity: sortColumn === 'student.email' && sortDirection === 'asc' ? 1 : 0.5 }} />
// // //                                 <FontAwesomeIcon icon={faArrowDown} style={{ opacity: sortColumn === 'student.email' && sortDirection === 'desc' ? 1 : 0.5 }} />
// // //                             </th>
// // //                             <th onClick={() => handleSort('student.contactNo')} style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd', cursor: 'pointer' }}>
// // //                                 Contact No
// // //                                 <FontAwesomeIcon icon={faArrowUp} style={{ opacity: sortColumn === 'student.contactNo' && sortDirection === 'asc' ? 1 : 0.5 }} />
// // //                                 <FontAwesomeIcon icon={faArrowDown} style={{ opacity: sortColumn === 'student.contactNo' && sortDirection === 'desc' ? 1 : 0.5 }} />
// // //                             </th>
// // //                             <th onClick={() => handleSort('enrollmentDate')} style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd', cursor: 'pointer' }}>
// // //                                 Enrollment Date
// // //                                 <FontAwesomeIcon icon={faArrowUp} style={{ opacity: sortColumn === 'enrollmentDate' && sortDirection === 'asc' ? 1 : 0.5 }} />
// // //                                 <FontAwesomeIcon icon={faArrowDown} style={{ opacity: sortColumn === 'enrollmentDate' && sortDirection === 'desc' ? 1 : 0.5 }} />
// // //                             </th>
// // //                             <th onClick={() => handleSort('course.name')} style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd', cursor: 'pointer' }}>
// // //                                 Course
// // //                                 <FontAwesomeIcon icon={faArrowUp} style={{ opacity: sortColumn === 'course.name' && sortDirection === 'asc' ? 1 : 0.5 }} />
// // //                                 <FontAwesomeIcon icon={faArrowDown} style={{ opacity: sortColumn === 'course.name' && sortDirection === 'desc' ? 1 : 0.5 }} />
// // //                             </th>
// // //                             <th style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd' }}>
// // //                                 Actions
// // //                             </th>
// // //                             <th style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd' }}>
// // //                                 Status
// // //                             </th>
// // //                         </tr>
// // //                     </thead>
// // //                     <tbody>
// // //                         {paginatedData.map((item) => (
// // //                             <tr key={item.enrollmentId}>
// // //                                 <td style={{ fontSize: '12px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd' }}>{item.enrollmentId}</td>
// // //                                 <td style={{ fontSize: '12px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd' }}>{item.student?.fullName}</td>
// // //                                 <td style={{ fontSize: '12px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd' }}>{item.student?.email}</td>
// // //                                 <td style={{ fontSize: '12px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd' }}>{item.student?.contactNo}</td>
// // //                                 <td style={{ fontSize: '12px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd' }}>{item.enrollmentDate}</td>
// // //                                 <td style={{ fontSize: '12px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd' }}>{item.course?.name}</td>
// // //                                 <td style={{ fontSize: '12px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd' }}>{renderActionsCell(item.enrollmentId)}</td>
// // //                                 <td style={{ fontSize: '12px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd' }}>
// // //                                     <Input
// // //                                         type="select"
// // //                                         value={statusMap[item.enrollmentId]}
// // //                                         onChange={(e) => handleStatusUpdate(item.enrollmentId, e.target.value)}
// // //                                         style={{ fontSize: '12px', marginRight: '10px',width:'auto' }}
// // //                                     >
// // //                                         <option value="completed">Completed</option>
// // //                                         <option value="dropped">Cancelled</option>
// // //                                         <option value="enrolled">Enrolled</option>
// // //                                     </Input>
// // //                                 </td>
// // //                             </tr>
// // //                         ))}
// // //                     </tbody>
// // //                 </table>
// // //             </div>
// // //             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px', flexWrap: 'wrap' }}>
// // //                 <Button
// // //                     onClick={() => setCurrentPage(currentPage - 1)}
// // //                     disabled={currentPage === 1}
// // //                     color="primary"
// // //                     style={{ minWidth: '90px', height: '40px', margin: '5px' }}
// // //                 >
// // //                     Previous
// // //                 </Button>
// // //                 <span style={{ fontSize: '16px', margin: '5px' }}>
// // //                     Page {currentPage} of {totalPages}
// // //                 </span>
// // //                 <Button
// // //                     onClick={() => setCurrentPage(currentPage + 1)}
// // //                     disabled={currentPage === totalPages}
// // //                     color="primary"
// // //                     style={{ minWidth: '90px', height: '40px', margin: '5px' }}
// // //                 >
// // //                     Next
// // //                 </Button>
// // //             </div>
// // //         </div>
// // //     );
// // // };

// // // export default TableComponent;

// // import React, { useEffect, useMemo, useState } from 'react';
// // import axios from 'axios';
// // import { Button, Input, Label } from 'reactstrap';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faEdit, faMoneyCheckAlt, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
// // import { useTable, usePagination, useGlobalFilter, useFilters, useSortBy } from 'react-table';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import Swal from 'sweetalert2';
// // import { useNavigate } from 'react-router-dom';
// // import DateRangeColumnFilter from './DateRangeColumnFilter';

// // const apiUrl = process.env.REACT_APP_API_BASE_URL;

// // const DefaultColumnFilter = () => null; // Return null to remove the search box

// // const EnrollmentDetails = () => {
// //   const [data, setData] = useState([]);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     fetchData();
// //   }, []);

// //   const fetchData = async () => {
// //     try {
// //       const response = await axios.get(`${apiUrl}/enroll`);
// //       setData(response.data);
// //     } catch (error) {
// //       Swal.fire({
// //         icon: 'error',
// //         title: 'Error fetching data',
// //       });
// //     }
// //   };

// //   const handleEdit = (row) => {
// //     Swal.fire({
// //       title: 'Edit Enrollment',
// //       text: `Edit enrollment with ID: ${row.original.enrollmentId}`,
// //       icon: 'info',
// //       showCancelButton: true,
// //       confirmButtonText: 'OK',
// //     }).then((result) => {
// //       if (result.isConfirmed) {
// //         navigate(`/editenrollment/${row.original.enrollmentId}`);
// //       }
// //     });
// //   };

// //   const handlePayment = (row) => {
// //     Swal.fire({
// //       title: 'Make Payment',
// //       text: `Make payment for enrollment ID: ${row.original.enrollmentId}`,
// //       icon: 'info',
// //       showCancelButton: true,
// //       confirmButtonText: 'OK',
// //     }).then((result) => {
// //       if (result.isConfirmed) {
// //         navigate(`/payments?enrollmentId=${row.original.enrollmentId}`

          
// //         );
// //       }
// //     });
// //   };

// //   const handleStatusChange = async (enrollmentId, newStatus) => {
// //     try {
// //       await axios.patch(`${apiUrl}/enroll/${enrollmentId}`, {
// //         status: newStatus,
// //       });
// //       fetchData(); // Refresh data after status change
// //     } catch (error) {
// //       Swal.fire({
// //         icon: 'error',
// //         title: 'Error updating status',
// //       });
// //     }
// //   };

// //   const columns = useMemo(
// //     () => [
// //       { Header: 'Enrollment ID', accessor: 'enrollmentId', Filter: DefaultColumnFilter },
// //       {
// //         Header: 'Full Name',
// //         // accessor: (row) => {
// //         //   const { firstName, middleName, lastName } = row.student;
// //         //   let fullName = firstName;
// //         //   if (middleName) fullName += ` ${middleName}`;
// //         //   if (lastName) fullName += ` ${lastName}`;
// //         //   return fullName;
// //         // },
// //         accessor: 'student.fullName',
// //         Filter: DefaultColumnFilter,
// //       },
// //       { Header: 'Contact', accessor: 'student.mobile', Filter: DefaultColumnFilter },

// //       { Header: 'Course Name', accessor: 'course.name', Filter: DefaultColumnFilter },
// //       { Header: 'Enrollment Date', accessor: 'enrollmentDate', Filter: DefaultColumnFilter },
// //       {
// //         Header: 'Status',
// //         accessor: 'status',
// //         Filter: DefaultColumnFilter,
// //         Cell: ({ row }) => (
// //           <Input
// //             type="select"
// //             value={row.original.status}
// //             onChange={(e) => handleStatusChange(row.original.enrollmentId, e.target.value)}
// //           >
// //             <option value="enrolled">Enrolled</option>
// //             <option value="completed">Completed</option>
// //             <option value="dropped">Dropped</option>
// //           </Input>
// //         ),
// //       },
// //       {
// //         Header: 'Actions',
// //         accessor: 'actions',
// //         disableSortBy: true,
// //         Cell: ({ row }) => (
// //           <div>
// //             <Button color="primary" onClick={() => handleEdit(row)} style={{ marginRight: '5px' }}>
// //               <FontAwesomeIcon icon={faEdit} /> Edit
// //             </Button>
// //             <Button color="success" onClick={() => handlePayment(row)}>
// //               <FontAwesomeIcon icon={faMoneyCheckAlt} /> Payment
// //             </Button>
// //           </div>
// //         ),
// //       },
// //     ],
// //     []
// //   );

// //   const {
// //     getTableProps,
// //     getTableBodyProps,
// //     headerGroups,
// //     page,
// //     prepareRow,
// //     nextPage,
// //     previousPage,
// //     canNextPage,
// //     canPreviousPage,
// //     state: { globalFilter, pageIndex, pageSize },
// //     setGlobalFilter,
// //     setPageSize,
// //     pageOptions,
// //   } = useTable(
// //     {
// //       columns,
// //       data,
// //       initialState: {
// //         pageIndex: 0,
// //         pageSize: 10,
// //         sortBy: [
// //           {
// //             id: 'enrollmentDate',
// //             desc: true,
// //           },
// //         ],
// //       },
// //       autoResetPage: true,
// //     },
// //     useFilters,
// //     useGlobalFilter,
// //     useSortBy,
// //     usePagination
// //   );

// //   return (
// //     <div>
// //       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
// //         <Input
// //           value={globalFilter || ''}
// //           onChange={(e) => setGlobalFilter(e.target.value)}
// //           placeholder="Search all columns..."
// //           style={{ width: '200px' }}
// //         />
// //         <Label for="pageSize" style={{ marginLeft: '10px', marginRight: '5px' }}>
// //           Rows per Page:
// //         </Label>
// //         <Input
// //           id="pageSize"
// //           type="select"
// //           value={pageSize}
// //           onChange={(e) => setPageSize(Number(e.target.value))}
// //           style={{ width: '80px' }}
// //         >
// //           {[10, 20, 30, 50, 100].map((size) => (
// //             <option key={size} value={size}>
// //               {size}
// //             </option>
// //           ))}
// //         </Input>
// //       </div>
// //       <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
// //         <table
// //           {...getTableProps()}
// //           style={{ borderCollapse: 'collapse', width: '100%', border: '1px solid #ddd', marginTop: '10px' }}
// //         >
// //           <thead style={{ position: 'sticky', top: 0, zIndex: 1, background: '#fff' }}>
// //             {headerGroups.map((headerGroup) => (
// //               <tr {...headerGroup.getHeaderGroupProps()}>
// //                 {headerGroup.headers.map((column) => (
// //                   <th
// //                     {...column.getHeaderProps(column.getSortByToggleProps())}
// //                     style={{
// //                       fontSize: '14px',
// //                       padding: '8px 10px',
// //                       whiteSpace: 'nowrap',
// //                       borderBottom: '1px solid #ddd',
// //                       cursor: 'pointer',
// //                     }}
// //                   >
// //                     <div>
// //                       {column.render('Header')}
// //                       <FontAwesomeIcon
// //                         icon={faSortUp}
// //                         style={{ opacity: column.isSorted && column.isSortedDesc ? 1 : 0.3, marginLeft: '5px' }}
// //                       />
// //                       <FontAwesomeIcon
// //                         icon={faSortDown}
// //                         style={{ opacity: column.isSorted && !column.isSortedDesc ? 1 : 0.3, marginLeft: '5px' }}
// //                       />
// //                     </div>
// //                   </th>
// //                 ))}
// //               </tr>
// //             ))}
// //           </thead>
// //           <tbody {...getTableBodyProps()}>
// //             {page.map((row) => {
// //               prepareRow(row);
// //               return (
// //                 <tr {...row.getRowProps()}>
// //                   {row.cells.map((cell) => (
// //                     <td
// //                       {...cell.getCellProps()}
// //                       style={{
// //                         fontSize: '14px',
// //                         padding: '8px 10px',
// //                         whiteSpace: 'nowrap',
// //                         borderBottom: '1px solid #ddd',
// //                       }}
// //                     >
// //                       {cell.render('Cell')}
// //                     </td>
// //                   ))}
// //                 </tr>
// //               );
// //             })}
// //           </tbody>
// //         </table>
// //       </div>
// //       <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', borderTop: '1px solid #ddd', padding: '10px 0' }}>
// //         <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
// //           {'< Previous'}
// //         </Button>
// //         <span style={{ margin: '0 10px' }}>
// //           Page {pageIndex + 1} of {pageOptions.length}
// //         </span>
// //         <Button onClick={() => nextPage()} disabled={!canNextPage}>
// //           {'Next >'}
// //         </Button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default EnrollmentDetails;


// import React, { useEffect, useMemo, useState } from 'react';
// import axios from 'axios';
// import { Button, Input, Label } from 'reactstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit, faMoneyCheckAlt, faSortUp, faSortDown,faFileCsv } from '@fortawesome/free-solid-svg-icons';
// import { useTable, usePagination, useGlobalFilter, useFilters, useSortBy } from 'react-table';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';
// import DateRangeColumnFilter from './DateRangeFilter';
// import Papa from "papaparse";

// const apiUrl = process.env.REACT_APP_API_BASE_URL;

// const DefaultColumnFilter = () => null; // Return null to remove the search box

// const EnrollmentDetails = () => {
//   const [data, setData] = useState([]);
//   const navigate = useNavigate();
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [rowData, setRowData] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`${apiUrl}/enroll`);
//       setData(response.data);
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error fetching data',
//       });
//     }
//   };

//   const handleEdit = (row) => {
//     Swal.fire({
//       title: 'Edit Enrollment',
//       text: `Edit enrollment with ID: ${row.original.enrollmentId}`,
//       icon: 'info',
//       showCancelButton: true,
//       confirmButtonText: 'OK',
//     }).then((result) => {
//       if (result.isConfirmed) {
//         navigate(`/editenrollment/${row.original.enrollmentId}`);
// }
//     });
//   };
//   const exportToCSV = () => {
//     const csv = Papa.unparse(rowData);
//     const blob = new Blob([csv], { type: "text/csv" });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "enrollments.csv";
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
// };

//   const handlePayment = (row) => {
//     Swal.fire({
//       title: 'Make Payment',
//       text: `Make payment for enrollment ID: ${row.original.enrollmentId}`,
//       icon: 'info',
//       showCancelButton: true,
//       confirmButtonText: 'OK',
//     }).then((result) => {
//       if (result.isConfirmed) {
//         navigate(`/payments?enrollmentId=${row.original.enrollmentId}`);
//       }
//     });
//   };

//   const handleStatusChange = async (enrollmentId, newStatus) => {
//     try {
//       await axios.patch(`${apiUrl}/enroll/${enrollmentId}`, {
//         status: newStatus,
//       });
//       fetchData(); // Refresh data after status change
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error updating status',
//       });
//     }
//   };

//   const columns = useMemo(
//     () => [
//       { Header: 'Enrollment ID', accessor: 'enrollmentId', Filter: DefaultColumnFilter },
//       {
//         Header: 'Full Name',
//         accessor: 'student.fullName',
//         Filter: DefaultColumnFilter,
//       },
//       { Header: 'Course Name', accessor: 'course.name', Filter: DefaultColumnFilter },
//       { Header: 'Balance Amount', accessor: 'balance', Filter: DateRangeColumnFilter },

//       { Header: 'Enrollment Date', accessor: 'enrollmentDate', Filter: DateRangeColumnFilter },
//       {
//         Header: 'Status',
//         accessor: 'status',
//         Filter: DefaultColumnFilter,
//         Cell: ({ row }) => (
//           <Input
//             type="select"
//             value={row.original.status}
//             onChange={(e) => handleStatusChange(row.original.enrollmentId, e.target.value)}
//           >
//             <option value="enrolled">Enrolled</option>
//             <option value="completed">Completed</option>
//             <option value="dropped">Dropped</option>
//           </Input>
//         ),
//       },
//       {
//         Header: 'Actions',
//         accessor: 'actions',
//         disableSortBy: true,
//         Cell: ({ row }) => (
//           <div>
//             <Button color="primary" onClick={() => handleEdit(row)} style={{ marginRight: '5px' }}>
//               <FontAwesomeIcon icon={faEdit} /> Edit
//             </Button>
//             <Button color="success" onClick={() => handlePayment(row)}>
//               <FontAwesomeIcon icon={faMoneyCheckAlt} /> Payment
//             </Button>
//           </div>
//         ),
//       },
//     ],
//     []
//   );

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     page,
//     prepareRow,
//     nextPage,
//     previousPage,
//     canNextPage,
//     canPreviousPage,
//     state: { globalFilter, pageIndex, pageSize },
//     setGlobalFilter,
//     setPageSize,
//     pageOptions,
//   } = useTable(
//     {
//       columns,
//       data,
//       initialState: {
//         pageIndex: 0,
//         pageSize: 10,
//         sortBy: [
//           {
//             id: 'enrollmentDate',
//             desc: true,
//           },
//         ],
//       },
//       autoResetPage: true,
//     },
//     useFilters,
//     useGlobalFilter,
//     useSortBy,
//     usePagination
//   );

//   return (
//     <div>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'nowrap' }}>
//           <Button onClick={exportToCSV} style={{ marginRight: '10px' }}>
//             <FontAwesomeIcon icon={faFileCsv} /> Export to CSV
//           </Button>
//           <div style={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
//           <Input
//               value={globalFilter || ''}
//               onChange={(e) => setGlobalFilter(e.target.value)}
//               placeholder="Search all columns..."
//               style={{ width: '200px', marginRight: '10px' }}
//             />
//             <Input
//               type="date"
//               value={startDate}
//               onChange={(e) => setStartDate(e.target.value)}
//               style={{ marginRight: '10px', maxWidth: '150px' }}
//             />
//             <Input
//               type="date"
//               value={endDate}
//               onChange={(e) => setEndDate(e.target.value)}
//               style={{ marginRight: '10px', maxWidth: '150px' }}
//             />
//             <Button onClick={() => { setStartDate(''); setEndDate(''); }} style={{ marginRight: '10px' }}>
//               Clear Date Range
//             </Button>

//             <Label for="pageSize" style={{ marginRight: '5px' }}>Rows per Page:</Label>
//             <Input
//               id="pageSize"
//               type="select"
//               value={pageSize}
//               onChange={(e) => setPageSize(Number(e.target.value))}
//               style={{ width: '80px' }}
//             >
//               {[10, 20, 30, 50, 100].map((size) => (
//                 <option key={size} value={size}>
//                   {size}
//                 </option>
//               ))}
//             </Input>
//           </div>
//         </div>

//         <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
//           <table
//             {...getTableProps()}
//             style={{ borderCollapse: 'collapse', width: '100%', border: '1px solid #ddd' }}
//           >
//             <thead style={{ position: 'sticky', top: 0, zIndex: 1, background: '#fff' }}>
//               {headerGroups.map((headerGroup) => (
//                 <tr {...headerGroup.getHeaderGroupProps()}>
//                   {headerGroup.headers.map((column) => (
//                     <th
//                       {...column.getHeaderProps(column.getSortByToggleProps())}
//                       style={{
//                         fontSize: '14px',
//                         padding: '8px 10px',
//                         whiteSpace: 'nowrap',
//                         borderBottom: '1px solid #ddd',
//                         cursor: 'pointer',
//                       }}
//                     >
//                       {column.render('Header')}
//                       <FontAwesomeIcon
//                         icon={faSortUp}
//                         style={{ opacity: column.isSorted && column.isSortedDesc ? 1 : 0.3, marginLeft: '5px' }}
//                       />
//                       <FontAwesomeIcon
//                         icon={faSortDown}
//                         style={{ opacity: column.isSorted && !column.isSortedDesc ? 1 : 0.3, marginLeft: '5px' }}
//                       />
//                     </th>
//                   ))}
//                 </tr>
//               ))}
//             </thead>
//             <tbody {...getTableBodyProps()}>
//               {page.map((row) => {
//                 prepareRow(row);
//                 return (
//                   <tr {...row.getRowProps()}>
//                     {row.cells.map((cell) => (
//                       <td
//                         {...cell.getCellProps()}
//                         style={{
//                           fontSize: '14px',
//                           padding: '8px 10px',
//                           whiteSpace: 'nowrap',
//                           borderBottom: '1px solid #ddd',
//                         }}
//                       >
//                         {cell.render('Cell')}
//                       </td>
//                     ))}
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', borderTop: '1px solid #ddd', padding: '10px 0' }}>
//         <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
//           {'< Previous'}
//         </Button>
//         <span style={{ margin: '0 10px' }}>
//           Page {pageIndex + 1} of {pageOptions.length}
//         </span>
//         <Button onClick={() => nextPage()} disabled={!canNextPage}>
//           {'Next >'}
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default EnrollmentDetails;


import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Button, Input, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faMoneyCheckAlt, faSortUp, faSortDown, faFileCsv } from '@fortawesome/free-solid-svg-icons';
import { useTable, usePagination, useGlobalFilter, useFilters, useSortBy } from 'react-table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import DateRangeColumnFilter from './DateRangeFilter';
import Papa from 'papaparse';

const apiUrl = process.env.REACT_APP_API_BASE_URL;

const DefaultColumnFilter = () => null; // Return null to remove the search box

const EnrollmentDetails = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/enroll`);
      const allData = response.data;
  
      // Filter data to show only enrollments with status "enrolled"
      const enrolledData = allData.filter(item => item.status === 'enrolled');
  
      setData(enrolledData);
      setFilteredData(enrolledData);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error fetching data',
      });
    }
  };
  

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(`${apiUrl}/enroll`);
  //     setData(response.data);
  //     setFilteredData(response.data);
  //   } catch (error) {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Error fetching data',
  //     });
  //   }
  // };

  const handleEdit = (row) => {
    Swal.fire({
      title: 'Edit Enrollment',
      text: `Edit enrollment with ID: ${row.original.enrollmentId}`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/editenrollment/${row.original.enrollmentId}`);
      }
    });
  };
  const handleDue = (row) => {
    Swal.fire({
      title: 'Edit Due Date',
      text: `Edit Due Date: ${row.original.fee.duedate}`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/duepayment/${row.original.enrollmentId}`);
      }
    });
  };

  const exportToCSV = () => {
    const csvData = filteredData.map(item => ({
      enrollmentId: item.enrollmentId,
      studentId:item.studentId,
      studentName: item.student.fullName,
      courseName: item.course.name,

      balance: item.fee.balanceAmount,
      applicableFees:item.fee.applicableFees,
      status: item.status,
      enrollmentDate: item.enrollmentDate,
      createdBy:item.createdByName,
      duedate: item.fee.duedate,
      studentMobile:item.student.mobile,
      studentemail:item.student.email,
      studentaddress:item.student.address

      
      

    }));
  
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'enrollments.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  

  const handlePayment = (row) => {
    Swal.fire({
      title: 'Make Payment',
      text: `Make payment for enrollment ID: ${row.original.enrollmentId}`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/payments?enrollmentId=${row.original.enrollmentId}`);
      }
    });
  };

  const handleStatusChange = async (enrollmentId, newStatus) => {
    try {
      await axios.patch(`${apiUrl}/enroll/${enrollmentId}`, {
        status: newStatus,
      });
      fetchData(); // Refresh data after status change
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error updating status',
      });
    }
  };

  const columns = useMemo(
    () => [
      { Header: 'Enrollment ID', accessor: 'enrollmentId', Filter: DefaultColumnFilter },
      {
        Header: 'Full Name',
        accessor: 'student.fullName',
        Filter: DefaultColumnFilter,
      },
      { Header: 'Course Name', accessor: 'course.name', Filter: DefaultColumnFilter },
      { Header: 'Applicable Fees', accessor: 'fee.applicableFees', Filter: DefaultColumnFilter },
      { Header: 'Balance Amount', accessor: 'fee.balanceAmount', Filter: DefaultColumnFilter },
      { Header: 'Enrollment Date', accessor: 'enrollmentDate', Filter: DateRangeColumnFilter },
      { Header: 'Due Date', accessor: 'fee.duedate', Filter: DateRangeColumnFilter },
      {
        Header: 'Status',
        accessor: 'status',
        Filter: DefaultColumnFilter,
        Cell: ({ row }) => (
          <Input
            type="select"
            value={row.original.status}
            onChange={(e) => handleStatusChange(row.original.enrollmentId, e.target.value)}
          >
            <option value="enrolled">Enrolled</option>
            <option value="completed">Completed</option>
            <option value="dropped">Dropped</option>
          </Input>
        ),
      },
      {
        Header: 'Actions',
        accessor: 'actions',
        disableSortBy: true,
        Cell: ({ row }) => (
          <div>
            <Button color="primary" onClick={() => handleEdit(row)} style={{ marginRight: '5px' }}>
              <FontAwesomeIcon icon={faEdit} />
            </Button>
            <Button color="secondary" onClick={() => handleDue(row)} style={{ marginRight: '5px' }}>
              <FontAwesomeIcon icon={faEdit} /> Due
            </Button>
            <Button color="success" onClick={() => handlePayment(row)}>
              <FontAwesomeIcon icon={faMoneyCheckAlt} />
            </Button>
            
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    state: { globalFilter, pageIndex, pageSize },
    setGlobalFilter,
    setPageSize,
    pageOptions,
    preGlobalFilteredRows,
    rows,

    setFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: 10,
        sortBy: [
          {
            id: 'enrollmentDate',
            desc: true,
          },
        ],
      },
      autoResetPage: true,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const totalEnrollments = rows.length;


  useEffect(() => {
    const filteredRows = preGlobalFilteredRows.map(row => row.original);
    setFilteredData(filteredRows);
  }, [preGlobalFilteredRows]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'nowrap' }}>
        {/* <Button onClick={exportToCSV} style={{ marginRight: '10px' }}>
          <FontAwesomeIcon icon={faFileCsv} /> Export to CSV
        </Button> */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end', gap: '10px' }}>
  <Button onClick={exportToCSV} style={{ flex: '1 1 200px', minWidth: '150px', height:"45px", marginBottom: '10px' }}>
    <FontAwesomeIcon icon={faFileCsv} /> Export to CSV
  </Button>
  <Input
    value={globalFilter || ''}
    onChange={(e) => setGlobalFilter(e.target.value)}
    placeholder="Search all columns..."
    style={{ flex: '1 1 200px', minWidth: '150px', marginBottom: '10px' }}
  />
  <Input
    type="date"
    value={startDate}
    onChange={(e) => setStartDate(e.target.value)}
    style={{ flex: '1 1 150px', minWidth: '100px', marginBottom: '10px' }}
  />
  <Input
    type="date"
    value={endDate}
    onChange={(e) => setEndDate(e.target.value)}
    style={{ flex: '1 1 150px', minWidth: '100px', marginBottom: '10px' }}
  />
  <Button onClick={() => { setStartDate(''); setEndDate(''); }} style={{ flex: '1 1 150px', height:"45px", minWidth: '100px', marginBottom: '10px' }}>
    Clear Date Range
  </Button>
  <Label for="pageSize" style={{ flex: '1 1 100px', minWidth: '100px', marginBottom: '10px' }}>Rows per Page:</Label>
  <Input
    id="pageSize"
    type="select"
    value={pageSize}
    onChange={(e) => setPageSize(Number(e.target.value))}
    style={{ flex: '1 1 100px', height:"45px", minWidth: '80px', marginBottom: '10px' }}
  >
    {[10, 20, 30, 50, 100].map((size) => (
      <option key={size} value={size}>
        {size}
      </option>
    ))}
  </Input>

  {/* Responsive styles */}
  <style jsx>{`
    @media (max-width: 768px) {
      div {
        justify-content: center;
      }
    }
    @media (max-width: 480px) {
      div {
      }
    }
  `}</style>
</div>


      </div>
      <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Total Enrollments: {totalEnrollments}</span>

      </div>

      <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
        <table
          {...getTableProps()}
          style={{ borderCollapse: 'collapse', width: '100%', border: '1px solid #ddd' }}
        >
          <thead style={{ position: 'sticky', top: 0, zIndex: 1, background: '#fff' }}>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    style={{
                      fontSize: '14px',
                      padding: '8px 10px',
                      whiteSpace: 'nowrap',
                      borderBottom: '1px solid #ddd',
                      cursor: 'pointer',
                    }}
                  >
                    {column.render('Header')}
                    <FontAwesomeIcon
                      icon={faSortUp}
                      style={{ opacity: column.isSorted && column.isSortedDesc ? 1 : 0.3, marginLeft: '5px' }}
                    />
                    <FontAwesomeIcon
                      icon={faSortDown}
                      style={{ opacity: column.isSorted && !column.isSortedDesc ? 1 : 0.3, marginLeft: '5px' }}
                    />
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        fontSize: '14px',
                        padding: '8px 10px',
                        whiteSpace: 'nowrap',
                        borderBottom: '1px solid #ddd',
                      }}
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', borderTop: '1px solid #ddd', padding: '10px 0' }}>
        <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'< Previous'}
        </Button>
        <span style={{ margin: '0 10px' }}>
          Page {pageIndex + 1} of {pageOptions.length}
        </span>
        <Button onClick={() => nextPage()} disabled={!canNextPage}>
          {'Next >'}
        </Button>
      </div>
    </div>
  );
};

export default EnrollmentDetails;
