// // // // // // // // import React, { useEffect, useMemo, useState } from 'react';
// // // // // // // // import axios from 'axios';
// // // // // // // // import { Button, Input, FormGroup, Label } from 'reactstrap';
// // // // // // // // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // // // // // // // import { faFileCsv, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
// // // // // // // // import Papa from 'papaparse';
// // // // // // // // import { useTable, usePagination, useGlobalFilter, useFilters, useSortBy } from 'react-table';
// // // // // // // // import 'bootstrap/dist/css/bootstrap.min.css';
// // // // // // // // import Swal from 'sweetalert2';

// // // // // // // // const apiUrl = process.env.REACT_APP_API_BASE_URL;

// // // // // // // // function DefaultColumnFilter({ column }) {
// // // // // // // //   return null; // Return null to remove the search box
// // // // // // // // }

// // // // // // // // const PaymentDetails = () => {
// // // // // // // //   const [data, setData] = useState([]);

// // // // // // // //   useEffect(() => {
// // // // // // // //     const fetchData = async () => {
// // // // // // // //       try {
// // // // // // // //         const response = await axios.get(`${apiUrl}/payments`);
// // // // // // // //         setData(response.data);
// // // // // // // //       } catch (error) {
// // // // // // // //         Swal.fire({
// // // // // // // //           icon: 'error',
// // // // // // // //           title: 'Error fetching data',
// // // // // // // //         });
// // // // // // // //       }
// // // // // // // //     };
// // // // // // // //     fetchData();
// // // // // // // //   }, []);

// // // // // // // //   const exportToCSV = () => {
// // // // // // // //     // Create a copy of the data array
// // // // // // // //     const dataCopy = [...data];
  
// // // // // // // //     // Remove the 'enrollment' object 
// // // // // // // //     const modifiedData = dataCopy.map(item => {
// // // // // // // //       const { enrollment, ...rest } = item;
// // // // // // // //       return rest;
// // // // // // // //     });
  
// // // // // // // //     // Convert modifiedData to CSV
// // // // // // // //     const csv = Papa.unparse(modifiedData);
  
// // // // // // // //     // Rest of the exportToCSV function remains unchanged
// // // // // // // //     const blob = new Blob([csv], { type: 'text/csv' });
// // // // // // // //     const url = window.URL.createObjectURL(blob);
// // // // // // // //     const a = document.createElement('a');
// // // // // // // //     a.href = url;
// // // // // // // //     a.download = 'payments.csv';
// // // // // // // //     document.body.appendChild(a);
// // // // // // // //     a.click();
// // // // // // // //     document.body.removeChild(a);
// // // // // // // //   };
  

// // // // // // // //   const columns = useMemo(
// // // // // // // //     () => [
// // // // // // // //       { Header: 'Payment ID', accessor: 'paymentId', Filter: DefaultColumnFilter },
// // // // // // // //       {
// // // // // // // //         Header: 'Full Name',
// // // // // // // //         accessor: (row) => {
// // // // // // // //           const { firstName, middleName, lastName } = row.enrollment.student;
// // // // // // // //           let fullName = firstName;
// // // // // // // //           if (middleName) fullName += ` ${middleName}`;
// // // // // // // //           if (lastName) fullName += ` ${lastName}`;
// // // // // // // //           return fullName;
// // // // // // // //         },
// // // // // // // //         Filter: DefaultColumnFilter,
// // // // // // // //       },
// // // // // // // //       { Header: 'Course Name', accessor: 'enrollment.course.name', Filter: DefaultColumnFilter },
// // // // // // // //       { Header: 'Amount', accessor: 'amount', Filter: DefaultColumnFilter },
// // // // // // // //       { Header: 'Balance', accessor: 'balance', Filter: DefaultColumnFilter },
// // // // // // // //       { Header: 'Payment Date', accessor: 'paymentDate', Filter: DefaultColumnFilter },
// // // // // // // //       { Header: 'Payment Method', accessor: 'paymentMethod', Filter: DefaultColumnFilter },
// // // // // // // //     ],
// // // // // // // //     []
// // // // // // // //   );

// // // // // // // //   const {
// // // // // // // //     getTableProps,
// // // // // // // //     getTableBodyProps,
// // // // // // // //     headerGroups,
// // // // // // // //     page,
// // // // // // // //     prepareRow,
// // // // // // // //     nextPage,
// // // // // // // //     previousPage,
// // // // // // // //     canNextPage,
// // // // // // // //     canPreviousPage,
// // // // // // // //     state: { globalFilter, pageIndex, pageSize },
// // // // // // // //     setGlobalFilter,
// // // // // // // //     setPageSize,
// // // // // // // //     pageOptions,
// // // // // // // //   } = useTable(
// // // // // // // //     {
// // // // // // // //       columns,
// // // // // // // //       data,
// // // // // // // //       initialState: { pageIndex: 0, pageSize: 10 },
// // // // // // // //       autoResetPage: true,
// // // // // // // //     },
// // // // // // // //     useFilters,
// // // // // // // //     useGlobalFilter,
// // // // // // // //     useSortBy,
// // // // // // // //     usePagination
// // // // // // // //   );
// // // // // // // //   const titleStyle = {
// // // // // // // //     fontFamily: 'Times New Roman, Times, serif'
// // // // // // // //   };
// // // // // // // //   return (
// // // // // // // //     <div>
// // // // // // // //       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
// // // // // // // //         <Button onClick={exportToCSV}>
// // // // // // // //           <FontAwesomeIcon icon={faFileCsv} /> Export to CSV
// // // // // // // //         </Button>
// // // // // // // //         <div style={{ display: 'flex', alignItems: 'center' }}>
// // // // // // // //           <Input
// // // // // // // //             value={globalFilter || ''}
// // // // // // // //             onChange={(e) => setGlobalFilter(e.target.value)}
// // // // // // // //             placeholder="Search all columns..."
// // // // // // // //             style={{ width: '200px', marginLeft: '10px' }}
// // // // // // // //           />
// // // // // // // //           <Label for="pageSize" style={{ marginLeft: '10px', marginRight: '5px' }}>
// // // // // // // //             Rows per Page:
// // // // // // // //           </Label>
// // // // // // // //           <Input
// // // // // // // //             id="pageSize"
// // // // // // // //             type="select"
// // // // // // // //             value={pageSize}
// // // // // // // //             onChange={(e) => setPageSize(Number(e.target.value))}
// // // // // // // //             style={{ width: '80px' }}
// // // // // // // //           >
// // // // // // // //             {[10, 20, 30, 50, 100].map((size) => (
// // // // // // // //               <option key={size} value={size}>
// // // // // // // //                 {size}
// // // // // // // //               </option>
// // // // // // // //             ))}
// // // // // // // //           </Input>
// // // // // // // //         </div>
// // // // // // // //       </div>
// // // // // // // //       <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
// // // // // // // //         <table
// // // // // // // //           {...getTableProps()}
// // // // // // // //           style={{ borderCollapse: 'collapse', width: '100%', border: '1px solid #ddd', marginTop: '10px' }}
// // // // // // // //         >
// // // // // // // //           <thead style={{ position: 'sticky', top: 0, zIndex: 1, background: '#fff' }}>
// // // // // // // //             {headerGroups.map((headerGroup) => (
// // // // // // // //               <tr {...headerGroup.getHeaderGroupProps()}>
// // // // // // // //                 {headerGroup.headers.map((column) => (
// // // // // // // //                   <th
// // // // // // // //                     {...column.getHeaderProps(column.getSortByToggleProps())}
// // // // // // // //                     style={{
// // // // // // // //                       fontSize: '14px',
// // // // // // // //                       padding: '8px 10px',
// // // // // // // //                       whiteSpace: 'nowrap',
// // // // // // // //                       borderBottom: '1px solid #ddd',
// // // // // // // //                       cursor: 'pointer',
// // // // // // // //                     }}
// // // // // // // //                   >
// // // // // // // //                     <div>
// // // // // // // //                       {column.render('Header')}
// // // // // // // //                       <FontAwesomeIcon
// // // // // // // //                         icon={faSortUp}
// // // // // // // //                         style={{ opacity: column.isSorted && column.isSortedDesc ? 1 : 0.3, marginLeft: '5px' }}
// // // // // // // //                       />
// // // // // // // //                       <FontAwesomeIcon
// // // // // // // //                         icon={faSortDown}
// // // // // // // //                         style={{ opacity: column.isSorted && !column.isSortedDesc ? 1 : 0.3, marginLeft: '5px' }}
// // // // // // // //                       />
// // // // // // // //                     </div>
// // // // // // // //                   </th>
// // // // // // // //                 ))}
// // // // // // // //               </tr>
// // // // // // // //             ))}
// // // // // // // //           </thead>
// // // // // // // //           <tbody {...getTableBodyProps()}>
// // // // // // // //             {page.map((row) => {
// // // // // // // //               prepareRow(row);
// // // // // // // //               return (
// // // // // // // //                 <tr {...row.getRowProps()}>
// // // // // // // //                   {row.cells.map((cell) => (
// // // // // // // //                     <td
// // // // // // // //                       {...cell.getCellProps()}
// // // // // // // //                       style={{
// // // // // // // //                         fontSize: '14px',
// // // // // // // //                         padding: '8px 10px',
// // // // // // // //                         whiteSpace: 'nowrap',
// // // // // // // //                         borderBottom: '1px solid #ddd',
// // // // // // // //                       }}
// // // // // // // //                     >
// // // // // // // //                       {cell.render('Cell')}
// // // // // // // //                     </td>
// // // // // // // //                   ))}
// // // // // // // //                 </tr>
// // // // // // // //               );
// // // // // // // //             })}
// // // // // // // //           </tbody>
// // // // // // // //         </table>
// // // // // // // //       </div>
// // // // // // // //       <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', borderTop: '1px solid #ddd', padding: '10px 0' }}>
// // // // // // // //         <Button onClick={previousPage} disabled={!canPreviousPage}>
// // // // // // // //           {'< Previous'}
// // // // // // // //         </Button>
// // // // // // // //         <span style={{ margin: '0 10px' }}>
// // // // // // // //           Page {pageIndex + 1} of {pageOptions.length}
// // // // // // // //         </span>
// // // // // // // //         <Button onClick={nextPage} disabled={!canNextPage}>
// // // // // // // //           {'Next >'}
// // // // // // // //         </Button>
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default PaymentDetails;
// // // // // // // import React, { useEffect, useMemo, useState } from 'react';
// // // // // // // import axios from 'axios';
// // // // // // // import { Button, Input, FormGroup, Label } from 'reactstrap';
// // // // // // // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // // // // // // import { faFileCsv, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
// // // // // // // import Papa from 'papaparse';
// // // // // // // import { useTable, usePagination, useGlobalFilter, useFilters, useSortBy } from 'react-table';
// // // // // // // import 'bootstrap/dist/css/bootstrap.min.css';
// // // // // // // import Swal from 'sweetalert2';

// // // // // // // const apiUrl = process.env.REACT_APP_API_BASE_URL;

// // // // // // // function DefaultColumnFilter({ column }) {
// // // // // // //   return null; // Return null to remove the search box
// // // // // // // }

// // // // // // // const PaymentDetails = () => {
// // // // // // //   const [data, setData] = useState([]);
// // // // // // //   const [startDate, setStartDate] = useState('');
// // // // // // //   const [endDate, setEndDate] = useState('');

// // // // // // //   useEffect(() => {
// // // // // // //     fetchData();
// // // // // // //   }, []);

// // // // // // //   const fetchData = async () => {
// // // // // // //     try {
// // // // // // //       const response = await axios.get(`${apiUrl}/payments`);
// // // // // // //       setData(response.data);
// // // // // // //     } catch (error) {
// // // // // // //       Swal.fire({
// // // // // // //         icon: 'error',
// // // // // // //         title: 'Error fetching data',
// // // // // // //       });
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const exportToCSV = () => {
// // // // // // //     const dataCopy = [...data];
// // // // // // //     const modifiedData = dataCopy.map(item => {
// // // // // // //       const { enrollment, ...rest } = item;
// // // // // // //       return rest;
// // // // // // //     });
// // // // // // //     const csv = Papa.unparse(modifiedData);
// // // // // // //     const blob = new Blob([csv], { type: 'text/csv' });
// // // // // // //     const url = window.URL.createObjectURL(blob);
// // // // // // //     const a = document.createElement('a');
// // // // // // //     a.href = url;
// // // // // // //     a.download = 'payments.csv';
// // // // // // //     document.body.appendChild(a);
// // // // // // //     a.click();
// // // // // // //     document.body.removeChild(a);
// // // // // // //   };

// // // // // // //   const handleStartDateChange = (e) => {
// // // // // // //     setStartDate(e.target.value);
// // // // // // //   };

// // // // // // //   const handleEndDateChange = (e) => {
// // // // // // //     setEndDate(e.target.value);
// // // // // // //   };

// // // // // // //   const columns = useMemo(
// // // // // // //     () => [
// // // // // // //       { Header: 'Payment ID', accessor: 'paymentId', Filter: DefaultColumnFilter },
// // // // // // //       {
// // // // // // //         Header: 'Full Name',
// // // // // // //         accessor: (row) => {
// // // // // // //           const { firstName, middleName, lastName } = row.enrollment.student;
// // // // // // //           let fullName = firstName;
// // // // // // //           if (middleName) fullName += ` ${middleName}`;
// // // // // // //           if (lastName) fullName += ` ${lastName}`;
// // // // // // //           return fullName;
// // // // // // //         },
// // // // // // //         Filter: DefaultColumnFilter,
// // // // // // //       },
// // // // // // //       { Header: 'Course Name', accessor: 'enrollment.course.name', Filter: DefaultColumnFilter },
// // // // // // //       { Header: 'Amount', accessor: 'amount', Filter: DefaultColumnFilter },
// // // // // // //       { Header: 'Balance', accessor: 'balance', Filter: DefaultColumnFilter },
// // // // // // //       { Header: 'Payment Date', accessor: 'paymentDate', Filter: DefaultColumnFilter },
// // // // // // //       { Header: 'Payment Method', accessor: 'paymentMethod', Filter: DefaultColumnFilter },
// // // // // // //     ],
// // // // // // //     []
// // // // // // //   );

// // // // // // //   const {
// // // // // // //     getTableProps,
// // // // // // //     getTableBodyProps,
// // // // // // //     headerGroups,
// // // // // // //     page,
// // // // // // //     prepareRow,
// // // // // // //     nextPage,
// // // // // // //     previousPage,
// // // // // // //     canNextPage,
// // // // // // //     canPreviousPage,
// // // // // // //     state: { globalFilter, pageIndex, pageSize },
// // // // // // //     setGlobalFilter,
// // // // // // //     setPageSize,
// // // // // // //     pageOptions,
// // // // // // //   } = useTable(
// // // // // // //     {
// // // // // // //       columns,
// // // // // // //       data,
// // // // // // //       initialState: { pageIndex: 0, pageSize: 10 },
// // // // // // //       autoResetPage: true,
// // // // // // //     },
// // // // // // //     useFilters,
// // // // // // //     useGlobalFilter,
// // // // // // //     useSortBy,
// // // // // // //     usePagination
// // // // // // //   );

// // // // // // //   const filteredData = useMemo(() => {
// // // // // // //     let filtered = data;

// // // // // // //     // Date filtering logic
// // // // // // //     if (startDate && endDate) {
// // // // // // //       filtered = filtered.filter(item => {
// // // // // // //         const paymentDate = new Date(item.paymentDate);
// // // // // // //         return paymentDate >= new Date(startDate) && paymentDate <= new Date(endDate);
// // // // // // //       });
// // // // // // //     }

// // // // // // //     return filtered;
// // // // // // //   }, [data, startDate, endDate]);

// // // // // // //   return (
// // // // // // //     <div>
// // // // // // //       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
// // // // // // //         <Button onClick={exportToCSV}>
// // // // // // //           <FontAwesomeIcon icon={faFileCsv} /> Export to CSV
// // // // // // //         </Button>
// // // // // // //         <div style={{ display: 'flex', alignItems: 'center' }}>
// // // // // // //           <Input
// // // // // // //             value={globalFilter || ''}
// // // // // // //             onChange={(e) => setGlobalFilter(e.target.value)}
// // // // // // //             placeholder="Search all columns..."
// // // // // // //             style={{ width: '200px', marginLeft: '10px' }}
// // // // // // //           />
// // // // // // //           <Label for="startDate" style={{ marginLeft: '10px', marginRight: '5px' }}>
// // // // // // //             Start Date:
// // // // // // //           </Label>
// // // // // // //           <Input
// // // // // // //             id="startDate"
// // // // // // //             type="date"
// // // // // // //             value={startDate}
// // // // // // //             onChange={handleStartDateChange}
// // // // // // //             style={{ minWidth: '150px' }}
// // // // // // //           />
// // // // // // //           <Label for="endDate" style={{ marginLeft: '10px', marginRight: '5px' }}>
// // // // // // //             End Date:
// // // // // // //           </Label>
// // // // // // //           <Input
// // // // // // //             id="endDate"
// // // // // // //             type="date"
// // // // // // //             value={endDate}
// // // // // // //             onChange={handleEndDateChange}
// // // // // // //             style={{ minWidth: '150px' }}
// // // // // // //           />
// // // // // // //           <Label for="pageSize" style={{ marginLeft: '10px', marginRight: '5px' }}>
// // // // // // //             Rows per Page:
// // // // // // //           </Label>
// // // // // // //           <Input
// // // // // // //             id="pageSize"
// // // // // // //             type="select"
// // // // // // //             value={pageSize}
// // // // // // //             onChange={(e) => setPageSize(Number(e.target.value))}
// // // // // // //             style={{ width: '80px' }}
// // // // // // //           >
// // // // // // //             {[10, 20, 30, 50, 100].map((size) => (
// // // // // // //               <option key={size} value={size}>
// // // // // // //                 {size}
// // // // // // //               </option>
// // // // // // //             ))}
// // // // // // //           </Input>
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //       <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
// // // // // // //         <table
// // // // // // //           {...getTableProps()}
// // // // // // //           style={{ borderCollapse: 'collapse', width: '100%', border: '1px solid #ddd', marginTop: '10px' }}
// // // // // // //         >
// // // // // // //           <thead style={{ position: 'sticky', top: 0, zIndex: 1, background: '#fff' }}>
// // // // // // //             {headerGroups.map((headerGroup) => (
// // // // // // //               <tr {...headerGroup.getHeaderGroupProps()}>
// // // // // // //                 {headerGroup.headers.map((column) => (
// // // // // // //                   <th
// // // // // // //                     {...column.getHeaderProps(column.getSortByToggleProps())}
// // // // // // //                     style={{
// // // // // // //                       fontSize: '14px',
// // // // // // //                       padding: '8px 10px',
// // // // // // //                       whiteSpace: 'nowrap',
// // // // // // //                       borderBottom: '1px solid #ddd',
// // // // // // //                       cursor: 'pointer',
// // // // // // //                     }}
// // // // // // //                   >
// // // // // // //                     <div>
// // // // // // //                       {column.render('Header')}
// // // // // // //                       <FontAwesomeIcon
// // // // // // //                         icon={faSortUp}
// // // // // // //                         style={{ opacity: column.isSorted && column.isSortedDesc ? 1 : 0.3, marginLeft: '5px' }}
// // // // // // //                       />
// // // // // // //                       <FontAwesomeIcon
// // // // // // //                         icon={faSortDown}
// // // // // // //                         style={{ opacity: column.isSorted && !column.isSortedDesc ? 1 : 0.3, marginLeft: '5px' }}
// // // // // // //                       />
// // // // // // //                     </div>
// // // // // // //                   </th>
// // // // // // //                 ))}
// // // // // // //               </tr>
// // // // // // //             ))}
// // // // // // //           </thead>
// // // // // // //           <tbody {...getTableBodyProps()}>
// // // // // // //             {page.map((row) => {
// // // // // // //               prepareRow(row);
// // // // // // //               return (
// // // // // // //                 <tr {...row.getRowProps()}>
// // // // // // //                   {row.cells.map((cell) => (
// // // // // // //                     <td
// // // // // // //                       {...cell.getCellProps()}
// // // // // // //                       style={{
// // // // // // //                         fontSize: '14px',
// // // // // // //                         padding: '8px 10px',
// // // // // // //                         whiteSpace: 'nowrap',
// // // // // // //                         borderBottom: '1px solid #ddd',
// // // // // // //                       }}
// // // // // // //                     >
// // // // // // //                       {cell.render('Cell')}
// // // // // // //                     </td>
// // // // // // //                   ))}
// // // // // // //                 </tr>
// // // // // // //               );
// // // // // // //             })}
// // // // // // //           </tbody>
// // // // // // //         </table>
// // // // // // //       </div>
// // // // // // //       <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', borderTop: '1px solid #ddd', padding: '10px 0' }}>
// // // // // // //         <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
// // // // // // //           {'< Previous'}
// // // // // // //         </Button>
// // // // // // //         <span style={{ margin: '0 10px' }}>
// // // // // // //           Page {pageIndex + 1} of {pageOptions.length}
// // // // // // //         </span>
// // // // // // //         <Button onClick={() => nextPage()} disabled={!canNextPage}>
// // // // // // //           {'Next >'}
// // // // // // //         </Button>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default PaymentDetails;
// // // // // // //------------------------------------------------



// // // // // // import React, { useEffect, useMemo, useState } from 'react';
// // // // // // import axios from 'axios';
// // // // // // import { Button, Input, Label } from 'reactstrap';
// // // // // // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // // // // // import { faFileCsv, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
// // // // // // import Papa from 'papaparse';
// // // // // // import { useTable, usePagination, useGlobalFilter, useFilters, useSortBy } from 'react-table';
// // // // // // import 'bootstrap/dist/css/bootstrap.min.css';
// // // // // // import Swal from 'sweetalert2';

// // // // // // const apiUrl = process.env.REACT_APP_API_BASE_URL;

// // // // // // function DefaultColumnFilter({ column }) {
// // // // // //   return null; // Return null to remove the search box
// // // // // // }

// // // // // // const PaymentDetails = () => {
// // // // // //   const [data, setData] = useState([]);
// // // // // //   const [filteredData, setFilteredData] = useState([]);
// // // // // //   const [startDate, setStartDate] = useState('');
// // // // // //   const [endDate, setEndDate] = useState('');

// // // // // //   useEffect(() => {
// // // // // //     fetchData();
// // // // // //   }, []);

// // // // // //   useEffect(() => {
// // // // // //     filterData();
// // // // // //   }, [data, startDate, endDate]);

// // // // // //   const fetchData = async () => {
// // // // // //     try {
// // // // // //       const response = await axios.get(`${apiUrl}/payments`);
// // // // // //       setData(response.data);
// // // // // //     } catch (error) {
// // // // // //       Swal.fire({
// // // // // //         icon: 'error',
// // // // // //         title: 'Error fetching data',
// // // // // //       });
// // // // // //     }
// // // // // //   };

// // // // // //   const filterData = () => {
// // // // // //     let filtered = data;

// // // // // //     // Date filtering logic
// // // // // //     if (startDate && endDate) {
// // // // // //       filtered = filtered.filter(item => {
// // // // // //         const paymentDate = new Date(item.paymentDate);
// // // // // //         return paymentDate >= new Date(startDate) && paymentDate <= new Date(endDate);
// // // // // //       });
// // // // // //     }

// // // // // //     setFilteredData(filtered);
// // // // // //   };

// // // // // //   const exportToCSV = () => {
// // // // // //     const dataCopy = [...filteredData];
// // // // // //     const modifiedData = dataCopy.map(item => {
// // // // // //       const { enrollment, ...rest } = item;
// // // // // //       return rest;
// // // // // //     });
// // // // // //     const csv = Papa.unparse(modifiedData);
// // // // // //     const blob = new Blob([csv], { type: 'text/csv' });
// // // // // //     const url = window.URL.createObjectURL(blob);
// // // // // //     const a = document.createElement('a');
// // // // // //     a.href = url;
// // // // // //     a.download = 'payments.csv';
// // // // // //     document.body.appendChild(a);
// // // // // //     a.click();
// // // // // //     document.body.removeChild(a);
// // // // // //   };

// // // // // //   const handleStartDateChange = (e) => {
// // // // // //     setStartDate(e.target.value);
// // // // // //   };

// // // // // //   const handleEndDateChange = (e) => {
// // // // // //     setEndDate(e.target.value);
// // // // // //   };

// // // // // //   const columns = useMemo(
// // // // // //     () => [
// // // // // //       { Header: 'Payment ID', accessor: 'paymentId', Filter: DefaultColumnFilter },
// // // // // //       {
// // // // // //         Header: 'Full Name',
// // // // // //         accessor: (row) => {
// // // // // //           const { firstName, middleName, lastName } = row.enrollment.student;
// // // // // //           let fullName = firstName;
// // // // // //           if (middleName) fullName += ` ${middleName}`;
// // // // // //           if (lastName) fullName += ` ${lastName}`;
// // // // // //           return fullName;
// // // // // //         },
// // // // // //         Filter: DefaultColumnFilter,
// // // // // //       },
// // // // // //       { Header: 'Course Name', accessor: 'enrollment.course.name', Filter: DefaultColumnFilter },
// // // // // //       { Header: 'Amount', accessor: 'amount', Filter: DefaultColumnFilter },
// // // // // //       { Header: 'Balance', accessor: 'balance', Filter: DefaultColumnFilter },
// // // // // //       { Header: 'Payment Date', accessor: 'paymentDate', Filter: DefaultColumnFilter },
// // // // // //       { Header: 'Payment Method', accessor: 'paymentMethod', Filter: DefaultColumnFilter },
// // // // // //     ],
// // // // // //     []
// // // // // //   );

// // // // // //   const {
// // // // // //     getTableProps,
// // // // // //     getTableBodyProps,
// // // // // //     headerGroups,
// // // // // //     page,
// // // // // //     prepareRow,
// // // // // //     nextPage,
// // // // // //     previousPage,
// // // // // //     canNextPage,
// // // // // //     canPreviousPage,
// // // // // //     state: { globalFilter, pageIndex, pageSize },
// // // // // //     setGlobalFilter,
// // // // // //     setPageSize,
// // // // // //     pageOptions,
// // // // // //     rows,
// // // // // //     setFilter,
// // // // // //   } = useTable(
// // // // // //     {
// // // // // //       columns,
// // // // // //       data: filteredData,
// // // // // //       initialState: { pageIndex: 0, pageSize: 10 },
// // // // // //       autoResetPage: true,
// // // // // //     },
// // // // // //     useFilters,
// // // // // //     useGlobalFilter,
// // // // // //     useSortBy,
// // // // // //     usePagination
// // // // // //   );

// // // // // //   const latestBalances = useMemo(() => {
// // // // // //     const enrollmentPayments = {};
// // // // // //     rows.forEach(row => {
// // // // // //       const payment = row.original;
// // // // // //       if (!enrollmentPayments[payment.enrollmentId] || new Date(payment.paymentDate) > new Date(enrollmentPayments[payment.enrollmentId].paymentDate)) {
// // // // // //         enrollmentPayments[payment.enrollmentId] = payment;
// // // // // //       }
// // // // // //     });
// // // // // //     return Object.values(enrollmentPayments);
// // // // // //   }, [rows]);

// // // // // //   const totalTransactions = rows.length;
// // // // // //   const totalAmount = rows.reduce((sum, row) => sum + row.original.amount, 0);
// // // // // //   const totalBalance = latestBalances.reduce((sum, payment) => sum + payment.balance, 0);

// // // // // //   return (
// // // // // //     <div>
// // // // // //       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
// // // // // //         <Button onClick={exportToCSV}>
// // // // // //           <FontAwesomeIcon icon={faFileCsv} /> Export to CSV
// // // // // //         </Button>
// // // // // //         <div style={{ display: 'flex', alignItems: 'center' }}>
// // // // // //           <Input
// // // // // //             value={globalFilter || ''}
// // // // // //             onChange={(e) => setGlobalFilter(e.target.value)}
// // // // // //             placeholder="Search all columns..."
// // // // // //             style={{ width: '200px', marginLeft: '10px' }}
// // // // // //           />
// // // // // //           <Label for="startDate" style={{ marginLeft: '10px', marginRight: '5px' }}>
// // // // // //             Start Date:
// // // // // //           </Label>
// // // // // //           <Input
// // // // // //             id="startDate"
// // // // // //             type="date"
// // // // // //             value={startDate}
// // // // // //             onChange={handleStartDateChange}
// // // // // //             style={{ minWidth: '150px' }}
// // // // // //           />
// // // // // //           <Label for="endDate" style={{ marginLeft: '10px', marginRight: '5px' }}>
// // // // // //             End Date:
// // // // // //           </Label>
// // // // // //           <Input
// // // // // //             id="endDate"
// // // // // //             type="date"
// // // // // //             value={endDate}
// // // // // //             onChange={handleEndDateChange}
// // // // // //             style={{ minWidth: '150px' }}
// // // // // //           />
// // // // // //           <Label for="pageSize" style={{ marginLeft: '10px', marginRight: '5px' }}>
// // // // // //             Rows per Page:
// // // // // //           </Label>
// // // // // //           <Input
// // // // // //             id="pageSize"
// // // // // //             type="select"
// // // // // //             value={pageSize}
// // // // // //             onChange={(e) => setPageSize(Number(e.target.value))}
// // // // // //             style={{ width: '80px' }}
// // // // // //           >
// // // // // //             {[10, 20, 30, 50, 100].map((size) => (
// // // // // //               <option key={size} value={size}>
// // // // // //                 {size}
// // // // // //               </option>
// // // // // //             ))}
// // // // // //           </Input>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //       <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// // // // // //         <span>Total Transactions: {totalTransactions}</span>
// // // // // //         <span>Total Amount: {totalAmount}</span>
// // // // // //         <span>Total Balance: {totalBalance}</span>
// // // // // //       </div>
// // // // // //       <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
// // // // // //         <table
// // // // // //           {...getTableProps()}
// // // // // //           style={{ borderCollapse: 'collapse', width: '100%', border: '1px solid #ddd', marginTop: '10px' }}
// // // // // //         >
// // // // // //           <thead style={{ position: 'sticky', top: 0, zIndex: 1, background: '#fff' }}>
// // // // // //             {headerGroups.map((headerGroup) => (
// // // // // //               <tr {...headerGroup.getHeaderGroupProps()}>
// // // // // //                 {headerGroup.headers.map((column) => (
// // // // // //                   <th
// // // // // //                     {...column.getHeaderProps(column.getSortByToggleProps())}
// // // // // //                     style={{
// // // // // //                       fontSize: '14px',
// // // // // //                       padding: '8px 10px',
// // // // // //                       whiteSpace: 'nowrap',
// // // // // //                       borderBottom: '1px solid #ddd',
// // // // // //                       cursor: 'pointer',
// // // // // //                     }}
// // // // // //                   >
// // // // // //                     <div>
// // // // // //                       {column.render('Header')}
// // // // // //                       <FontAwesomeIcon
// // // // // //                         icon={faSortUp}
// // // // // //                         style={{ opacity: column.isSorted && column.isSortedDesc ? 1 : 0.3, marginLeft: '5px' }}
// // // // // //                       />
// // // // // //                       <FontAwesomeIcon
// // // // // //                         icon={faSortDown}
// // // // // //                         style={{ opacity: column.isSorted && !column.isSortedDesc ? 1 : 0.3, marginLeft: '5px' }}
// // // // // //                       />
// // // // // //                     </div>
// // // // // //                   </th>
// // // // // //                 ))}
// // // // // //               </tr>
// // // // // //             ))}
// // // // // //           </thead>
// // // // // //           <tbody {...getTableBodyProps()}>
// // // // // //             {page.map((row) => {
// // // // // //               prepareRow(row);
// // // // // //               return (
// // // // // //                 <tr {...row.getRowProps()}>
// // // // // //                   {row.cells.map((cell) => (
// // // // // //                     <td
// // // // // //                       {...cell.getCellProps()}
// // // // // //                       style={{
// // // // // //                         fontSize: '14px',
// // // // // //                         padding: '8px 10px',
// // // // // //                         whiteSpace: 'nowrap',
// // // // // //                         borderBottom: '1px solid #ddd',                      }}
// // // // // //                         >
// // // // // //                           {cell.render('Cell')}
// // // // // //                         </td>
// // // // // //                       ))}
// // // // // //                     </tr>
// // // // // //                   );
// // // // // //                 })}
// // // // // //               </tbody>
// // // // // //             </table>
// // // // // //           </div>
// // // // // //           <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', borderTop: '1px solid #ddd', padding: '10px 0' }}>
// // // // // //             <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
// // // // // //               {'< Previous'}
// // // // // //             </Button>
// // // // // //             <span style={{ margin: '0 10px' }}>
// // // // // //               Page {pageIndex + 1} of {pageOptions.length}
// // // // // //             </span>
// // // // // //             <Button onClick={() => nextPage()} disabled={!canNextPage}>
// // // // // //               {'Next >'}
// // // // // //             </Button>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       );
// // // // // //     };
    
// // // // // //     export default PaymentDetails;
// // // // // import React, { useEffect, useMemo, useState } from 'react';
// // // // // import axios from 'axios';
// // // // // import { Button, Input, Label } from 'reactstrap';
// // // // // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // // // // import { faFileCsv, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
// // // // // import Papa from 'papaparse';
// // // // // import { useTable, usePagination, useGlobalFilter, useFilters, useSortBy } from 'react-table';
// // // // // import 'bootstrap/dist/css/bootstrap.min.css';
// // // // // import Swal from 'sweetalert2';

// // // // // const apiUrl = process.env.REACT_APP_API_BASE_URL;

// // // // // function DefaultColumnFilter({ column }) {
// // // // //   return null; // Return null to remove the search box
// // // // // }

// // // // // const PaymentDetails = () => {
// // // // //   const [data, setData] = useState([]);
// // // // //   const [filteredData, setFilteredData] = useState([]);
// // // // //   const [startDate, setStartDate] = useState('');
// // // // //   const [endDate, setEndDate] = useState('');

// // // // //   useEffect(() => {
// // // // //     fetchData();
// // // // //   }, []);

// // // // //   useEffect(() => {
// // // // //     filterData();
// // // // //   }, [data, startDate, endDate]);

// // // // //   const fetchData = async () => {
// // // // //     try {
// // // // //       const response = await axios.get(`${apiUrl}/payments`);
// // // // //       setData(response.data);
// // // // //     } catch (error) {
// // // // //       Swal.fire({
// // // // //         icon: 'error',
// // // // //         title: 'Error fetching data',
// // // // //       });
// // // // //     }
// // // // //   };

// // // // //   const filterData = () => {
// // // // //     let filtered = data;

// // // // //     // Date filtering logic
// // // // //     if (startDate && endDate) {
// // // // //       filtered = filtered.filter(item => {
// // // // //         const paymentDate = new Date(item.paymentDate);
// // // // //         return paymentDate >= new Date(startDate) && paymentDate <= new Date(endDate);
// // // // //       });
// // // // //     }

// // // // //     setFilteredData(filtered);
// // // // //   };

// // // // //   const exportToCSV = () => {
// // // // //     const dataCopy = [...filteredData];
// // // // //     const modifiedData = dataCopy.map(item => {
// // // // //       const { enrollment, ...rest } = item;
// // // // //       return rest;
// // // // //     });
// // // // //     const csv = Papa.unparse(modifiedData);
// // // // //     const blob = new Blob([csv], { type: 'text/csv' });
// // // // //     const url = window.URL.createObjectURL(blob);
// // // // //     const a = document.createElement('a');
// // // // //     a.href = url;
// // // // //     a.download = 'payments.csv';
// // // // //     document.body.appendChild(a);
// // // // //     a.click();
// // // // //     document.body.removeChild(a);
// // // // //   };

// // // // //   const handleStartDateChange = (e) => {
// // // // //     setStartDate(e.target.value);
// // // // //   };

// // // // //   const handleEndDateChange = (e) => {
// // // // //     setEndDate(e.target.value);
// // // // //   };

// // // // //   const columns = useMemo(
// // // // //     () => [
// // // // //       { Header: 'Payment ID', accessor: 'paymentId', Filter: DefaultColumnFilter },
// // // // //       {
// // // // //         Header: 'Full Name',
// // // // //         accessor: (row) => {
// // // // //           const { firstName, middleName, lastName } = row.enrollment.student;
// // // // //           let fullName = firstName;
// // // // //           if (middleName) fullName += ` ${middleName}`;
// // // // //           if (lastName) fullName += ` ${lastName}`;
// // // // //           return fullName;
// // // // //         },
// // // // //         Filter: DefaultColumnFilter,
// // // // //       },
// // // // //       { Header: 'Course Name', accessor: 'enrollment.course.name', Filter: DefaultColumnFilter },
// // // // //       { Header: 'Amount', accessor: 'amount', Filter: DefaultColumnFilter },
// // // // //       { Header: 'Balance', accessor: 'balance', Filter: DefaultColumnFilter },
// // // // //       { Header: 'Payment Date', accessor: 'paymentDate', Filter: DefaultColumnFilter },
// // // // //       { Header: 'Payment Method', accessor: 'paymentMethod', Filter: DefaultColumnFilter },
// // // // //     ],
// // // // //     []
// // // // //   );

// // // // //   const {
// // // // //     getTableProps,
// // // // //     getTableBodyProps,
// // // // //     headerGroups,
// // // // //     page,
// // // // //     prepareRow,
// // // // //     nextPage,
// // // // //     previousPage,
// // // // //     canNextPage,
// // // // //     canPreviousPage,
// // // // //     state: { globalFilter, pageIndex, pageSize },
// // // // //     setGlobalFilter,
// // // // //     setPageSize,
// // // // //     pageOptions,
// // // // //     rows,
// // // // //     setFilter,
// // // // //   } = useTable(
// // // // //     {
// // // // //       columns,
// // // // //       data: filteredData,
// // // // //       initialState: { pageIndex: 0, pageSize: 10 },
// // // // //       autoResetPage: true,
// // // // //     },
// // // // //     useFilters,
// // // // //     useGlobalFilter,
// // // // //     useSortBy,
// // // // //     usePagination
// // // // //   );

// // // // //   // Calculate total transactions, total amount, and total balance
// // // // //   const totalTransactions = rows.length;
// // // // //   const totalAmount = rows.reduce((sum, row) => sum + row.original.amount, 0);

// // // // //   // Calculate total balance as sum of the latest payment balances for each enrollment ID
// // // // //   const latestBalances = useMemo(() => {
// // // // //     const enrollmentPayments = {};
// // // // //     rows.forEach(row => {
// // // // //       const payment = row.original;
// // // // //       if (!enrollmentPayments[payment.enrollmentId] || new Date(payment.paymentDate) > new Date(enrollmentPayments[payment.enrollmentId].paymentDate)) {
// // // // //         enrollmentPayments[payment.enrollmentId] = payment;
// // // // //       }
// // // // //     });
// // // // //     return Object.values(enrollmentPayments).reduce((sum, payment) => sum + payment.balance, 0);
// // // // //   }, [rows]);

// // // // //   return (
// // // // //     <div>
// // // // //       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
// // // // //         <Button onClick={exportToCSV}>
// // // // //           <FontAwesomeIcon icon={faFileCsv} /> Export to CSV
// // // // //         </Button>
// // // // //         <div style={{ display: 'flex', alignItems: 'center' }}>
// // // // //           <Input
// // // // //             value={globalFilter || ''}
// // // // //             onChange={(e) => setGlobalFilter(e.target.value)}
// // // // //             placeholder="Search all columns..."
// // // // //             style={{ width: '200px', marginLeft: '10px' }}
// // // // //           />
// // // // //           <Label for="startDate" style={{ marginLeft: '10px', marginRight: '5px' }}>
// // // // //             Start Date:
// // // // //           </Label>
// // // // //           <Input
// // // // //             id="startDate"
// // // // //             type="date"
// // // // //             value={startDate}
// // // // //             onChange={handleStartDateChange}
// // // // //             style={{ minWidth: '150px' }}
// // // // //           />
// // // // //           <Label for="endDate" style={{ marginLeft: '10px', marginRight: '5px' }}>
// // // // //             End Date:
// // // // //           </Label>
// // // // //           <Input
// // // // //             id="endDate"
// // // // //             type="date"
// // // // //             value={endDate}
// // // // //             onChange={handleEndDateChange}
// // // // //             style={{ minWidth: '150px' }}
// // // // //           />
// // // // //           <Label for="pageSize" style={{ marginLeft: '10px', marginRight: '5px' }}>
// // // // //             Rows per Page:
// // // // //           </Label>
// // // // //           <Input
// // // // //             id="pageSize"
// // // // //             type="select"
// // // // //             value={pageSize}
// // // // //             onChange={(e) => setPageSize(Number(e.target.value))}
// // // // //             style={{ width: '80px' }}
// // // // //           >
// // // // //             {[10, 20, 30, 50, 100].map((size) => (
// // // // //               <option key={size} value={size}>
// // // // //                 {size}
// // // // //               </option>
// // // // //             ))}
// // // // //           </Input>
// // // // //         </div>
// // // // //       </div>
// // // // //       <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// // // // //         <span>Total Transactions: {totalTransactions}</span>
// // // // //         <span>Total Amount: {totalAmount}</span>
// // // // //         <span>Total Balance: {latestBalances}</span>
// // // // //       </div>
// // // // //       <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
// // // // //         <table
// // // // //           {...getTableProps()}
// // // // //           style={{ borderCollapse: 'collapse', width: '100%', border: '1px solid #ddd', marginTop: '10px' }}
// // // // //         >
// // // // //           <thead style={{ position: 'sticky', top: 0, zIndex: 1, background: '#fff' }}>
// // // // //             {headerGroups.map((headerGroup) => (
// // // // //               <tr {...headerGroup.getHeaderGroupProps()}>
// // // // //                 {headerGroup.headers.map((column) => (
// // // // //                   <th
// // // // //                     {...column.getHeaderProps(column.getSortByToggleProps())}
// // // // //                     style={{
// // // // //                       fontSize: '14px',
// // // // //                       padding: '8px 10px',
// // // // //                       whiteSpace: 'nowrap',
// // // // //                       borderBottom: '1px solid #ddd',
// // // // //                       cursor: 'pointer',
// // // // //                     }}
// // // // //                   >
// // // // //                     <div>
// // // // //                       {column.render('Header')}
// // // // //                       <FontAwesomeIcon
// // // // //                         icon={faSortUp}
// // // // //                         style={{ opacity: column.isSorted && column.isSortedDesc ? 1 : 0.3, marginLeft: '5px' }}
// // // // //                       />
// // // // //                       <FontAwesomeIcon
// // // // //                         icon={faSortDown}
// // // // //                         style={{ opacity: column.isSorted && !column.isSortedDesc ? 1 : 0.3, marginLeft: '5px' }}
// // // // //                       />
// // // // //                     </div>
// // // // //                   </th>
// // // // //                 ))}
// // // // //               </tr>
// // // // //             ))}
// // // // //           </thead>
// // // // //           <tbody {...getTableBodyProps()}>
// // // // //             {page.map((row) => {
// // // // //               prepareRow(row);
// // // // //               return (
// // // // //                 <tr {...row.getRowProps()}>
// // // // //                   {row.cells.map((cell) => (
// // // // //                     <td
// // // // //                       {...cell.getCellProps()}
// // // // //                       style={{
// // // // //                         fontSize: '14px',
// // // // //                         padding: '8px 10px',
// // // // //                         whiteSpace: 'nowrap',
// // // // //                         borderBottom: '1px solid #ddd',
// // // // //                       }}
// // // // //                     >
// // // // //                       {cell.render('Cell')}
// // // // //                     </td>
// // // // //                   ))}
// // // // //                 </tr>
// // // // //               );
// // // // //             })}
// // // // //           </tbody>
// // // // //         </table>
// // // // //       </div>
// // // // //       <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', borderTop: '1px solid #ddd', padding: '10px 0' }}>
// // // // //         <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
// // // // //           {'< Previous'}
// // // // //         </Button>
// // // // //         <span style={{ margin: '0 10px' }}>
// // // // //         Page {pageIndex + 1} of {pageOptions.length}
// // // // //         </span>
// // // // //         <Button onClick={() => nextPage()} disabled={!canNextPage}>
// // // // //           {'Next >'}
// // // // //         </Button>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default PaymentDetails;
// // // // import React, { useEffect, useMemo, useState } from 'react';
// // // // import axios from 'axios';
// // // // import { Button, Input, Label } from 'reactstrap';
// // // // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // // // import { faFileCsv, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
// // // // import Papa from 'papaparse';
// // // // import { useTable, usePagination, useGlobalFilter, useFilters, useSortBy } from 'react-table';
// // // // import 'bootstrap/dist/css/bootstrap.min.css';
// // // // import Swal from 'sweetalert2';

// // // // const apiUrl = process.env.REACT_APP_API_BASE_URL;

// // // // function DefaultColumnFilter({ column }) {
// // // //   return null; // Return null to remove the search box
// // // // }

// // // // const PaymentDetails = () => {
// // // //   const [data, setData] = useState([]);
// // // //   const [filteredData, setFilteredData] = useState([]);
// // // //   const [startDate, setStartDate] = useState('');
// // // //   const [endDate, setEndDate] = useState('');

// // // //   useEffect(() => {
// // // //     fetchData();
// // // //   }, []);

// // // //   useEffect(() => {
// // // //     filterData();
// // // //   }, [data, startDate, endDate]);

// // // //   const fetchData = async () => {
// // // //     try {
// // // //       const response = await axios.get(`${apiUrl}/payments`);
// // // //       setData(response.data);
// // // //     } catch (error) {
// // // //       Swal.fire({
// // // //         icon: 'error',
// // // //         title: 'Error fetching data',
// // // //       });
// // // //     }
// // // //   };

// // // //   const filterData = () => {
// // // //     let filtered = data;

// // // //     // Date filtering logic
// // // //     if (startDate && endDate) {
// // // //       filtered = filtered.filter(item => {
// // // //         const paymentDate = new Date(item.paymentDate);
// // // //         return paymentDate >= new Date(startDate) && paymentDate <= new Date(endDate);
// // // //       });
// // // //     }

// // // //     setFilteredData(filtered);
// // // //   };

// // // //   const exportToCSV = () => {
// // // //     const dataCopy = [...filteredData];
// // // //     const modifiedData = dataCopy.map(item => {
// // // //       const { enrollment, ...rest } = item;
// // // //       return rest;
// // // //     });
// // // //     const csv = Papa.unparse(modifiedData);
// // // //     const blob = new Blob([csv], { type: 'text/csv' });
// // // //     const url = window.URL.createObjectURL(blob);
// // // //     const a = document.createElement('a');
// // // //     a.href = url;
// // // //     a.download = 'payments.csv';
// // // //     document.body.appendChild(a);
// // // //     a.click();
// // // //     document.body.removeChild(a);
// // // //   };

// // // //   const handleStartDateChange = (e) => {
// // // //     setStartDate(e.target.value);
// // // //   };

// // // //   const handleEndDateChange = (e) => {
// // // //     setEndDate(e.target.value);
// // // //   };

// // // //   const columns = useMemo(
// // // //     () => [
// // // //       { Header: 'Payment ID', accessor: 'paymentId', Filter: DefaultColumnFilter },
// // // //       {
// // // //         Header: 'Full Name',
// // // //         accessor: (row) => {
// // // //           const { firstName, middleName, lastName } = row.enrollment.student;
// // // //           let fullName = firstName;
// // // //           if (middleName) fullName += ` ${middleName}`;
// // // //           if (lastName) fullName += ` ${lastName}`;
// // // //           return fullName;
// // // //         },
// // // //         Filter: DefaultColumnFilter,
// // // //       },
// // // //       { Header: 'Course Name', accessor: 'enrollment.course.name', Filter: DefaultColumnFilter },
// // // //       { Header: 'Amount', accessor: 'amount', Filter: DefaultColumnFilter },
// // // //       { Header: 'Balance', accessor: 'balance', Filter: DefaultColumnFilter },
// // // //       { Header: 'Payment Date', accessor: 'paymentDate', Filter: DefaultColumnFilter },
// // // //       { Header: 'Payment Method', accessor: 'paymentMethod', Filter: DefaultColumnFilter },
// // // //     ],
// // // //     []
// // // //   );

// // // //   const {
// // // //     getTableProps,
// // // //     getTableBodyProps,
// // // //     headerGroups,
// // // //     page,
// // // //     prepareRow,
// // // //     nextPage,
// // // //     previousPage,
// // // //     canNextPage,
// // // //     canPreviousPage,
// // // //     state: { globalFilter, pageIndex, pageSize },
// // // //     setGlobalFilter,
// // // //     setPageSize,
// // // //     pageOptions,
// // // //     rows,
// // // //     setFilter,
// // // //   } = useTable(
// // // //     {
// // // //       columns,
// // // //       data: filteredData,
// // // //       initialState: { pageIndex: 0, pageSize: 10 },
// // // //       autoResetPage: true,
// // // //     },
// // // //     useFilters,
// // // //     useGlobalFilter,
// // // //     useSortBy,
// // // //     usePagination
// // // //   );

// // // //   // Calculate total transactions, total amount, and total balance
// // // //   const totalTransactions = rows.length;
// // // //   const totalAmount = rows.reduce((sum, row) => sum + row.original.amount, 0);

// // // //   // Calculate total balance as sum of the latest payment balances for each enrollment ID
// // // //   const latestBalances = useMemo(() => {
// // // //     const enrollmentPayments = {};
// // // //     rows.forEach(row => {
// // // //       const payment = row.original;
// // // //       if (!enrollmentPayments[payment.enrollmentId] || new Date(payment.paymentDate) > new Date(enrollmentPayments[payment.enrollmentId].paymentDate)) {
// // // //         enrollmentPayments[payment.enrollmentId] = payment;
// // // //       }
// // // //     });
// // // //     return Object.values(enrollmentPayments).reduce((sum, payment) => sum + payment.balance, 0);
// // // //   }, [rows]);

// // // //   return (
// // // //     <div>
// // // //       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
// // // //         <Button onClick={exportToCSV}>
// // // //           <FontAwesomeIcon icon={faFileCsv} /> Export to CSV
// // // //         </Button>
// // // //         <div style={{ display: 'flex', alignItems: 'center' }}>
// // // //           <Input
// // // //             value={globalFilter || ''}
// // // //             onChange={(e) => setGlobalFilter(e.target.value)}
// // // //             placeholder="Search all columns..."
// // // //             style={{ width: '200px', marginLeft: '10px' }}
// // // //           />
// // // //           <Label for="startDate" style={{ marginLeft: '10px', marginRight: '5px' }}>
// // // //             Start Date:
// // // //           </Label>
// // // //           <Input
// // // //             id="startDate"
// // // //             type="date"
// // // //             value={startDate}
// // // //             onChange={handleStartDateChange}
// // // //             style={{ minWidth: '150px' }}
// // // //           />
// // // //           <Label for="endDate" style={{ marginLeft: '10px', marginRight: '5px' }}>
// // // //             End Date:
// // // //           </Label>
// // // //           <Input
// // // //             id="endDate"
// // // //             type="date"
// // // //             value={endDate}
// // // //             onChange={handleEndDateChange}
// // // //             style={{ minWidth: '150px' }}
// // // //           />
// // // //           <Label for="pageSize" style={{ marginLeft: '10px', marginRight: '5px' }}>
// // // //             Rows per Page:
// // // //           </Label>
// // // //           <Input
// // // //             id="pageSize"
// // // //             type="select"
// // // //             value={pageSize}
// // // //             onChange={(e) => setPageSize(Number(e.target.value))}
// // // //             style={{ width: '80px' }}
// // // //           >
// // // //             {[10, 20, 30, 50, 100].map((size) => (
// // // //               <option key={size} value={size}>
// // // //                 {size}
// // // //               </option>
// // // //             ))}
// // // //           </Input>
// // // //         </div>
// // // //       </div>
// // // //       <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// // // //         <span>Total Transactions: {totalTransactions}</span>
// // // //         <span>Total Amount: {totalAmount}</span>
// // // //         <span>Total Balance: {latestBalances}</span>
// // // //       </div>
// // // //       <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
// // // //         <table
// // // //           {...getTableProps()}
// // // //           style={{ borderCollapse: 'collapse', width: '100%', border: '1px solid #ddd', marginTop: '10px' }}
// // // //         >
// // // //           <thead style={{ position: 'sticky', top: 0, zIndex: 1, background: '#fff' }}>
// // // //             {headerGroups.map((headerGroup) => (
// // // //               <tr {...headerGroup.getHeaderGroupProps()}>
// // // //                 {headerGroup.headers.map((column) => (
// // // //                   <th
// // // //                     {...column.getHeaderProps(column.getSortByToggleProps())}
// // // //                     style={{
// // // //                       fontSize: '14px',
// // // //                       padding: '8px 10px',
// // // //                       whiteSpace: 'nowrap',
// // // //                       borderBottom: '1px solid #ddd',
// // // //                       cursor: 'pointer',
// // // //                     }}
// // // //                   >
// // // //                     <div>
// // // //                       {column.render('Header')}
// // // //                       <FontAwesomeIcon
// // // //                         icon={faSortUp}
// // // //                         style={{ opacity: column.isSorted && column.isSortedDesc ? 1 : 0.3, marginLeft: '5px' }}
// // // //                       />
// // // //                       <FontAwesomeIcon
// // // //                         icon={faSortDown}
// // // //                         style={{ opacity: column.isSorted && !column.isSortedDesc ? 1 : 0.3, marginLeft: '5px' }}
// // // //                       />
// // // //                     </div>
// // // //                   </th>
// // // //                 ))}
// // // //               </tr>
// // // //             ))}
// // // //           </thead>
// // // //           <tbody {...getTableBodyProps()}>
// // // //             {page.map((row) => {
// // // //               prepareRow(row);
// // // //               return (
// // // //                 <tr {...row.getRowProps()}>
// // // //                   {row.cells.map((cell) => (
// // // //                     <td
// // // //                       {...cell.getCellProps()}
// // // //                       style={{
// // // //                         fontSize: '14px',
// // // //                         padding: '8px 10px',
// // // //                         whiteSpace: 'nowrap',
// // // //                         borderBottom: '1px solid #ddd',
// // // //                       }}
// // // //                     >
// // // //                       {cell.render('Cell')}
// // // //                     </td>
// // // //                   ))}
// // // //                 </tr>
// // // //               );
// // // //             })}
// // // //           </tbody>
// // // //         </table>
// // // //       </div>
// // // //       <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', borderTop: '1px solid #ddd', padding: '10px 0' }}>
// // // //         <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
// // // //           {'< Previous'}
// // // //         </Button>
// // // //         <span style={{ margin: '0 10px' }}>
// // // //           Page {pageIndex + 1} of {pageOptions.length}
// // // //         </span>
// // // //         <Button onClick={() => nextPage()} disabled={!canNextPage}>
// // // //           {'Next >'}
// // // //         </Button>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default PaymentDetails;


// // // import React, { useEffect, useMemo, useState } from 'react';
// // // import axios from 'axios';
// // // import { Button, Input, Label } from 'reactstrap';
// // // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // // import { faFileCsv, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
// // // import Papa from 'papaparse';
// // // import { useTable, usePagination, useGlobalFilter, useFilters, useSortBy } from 'react-table';
// // // import 'bootstrap/dist/css/bootstrap.min.css';
// // // import Swal from 'sweetalert2';

// // // const apiUrl = process.env.REACT_APP_API_BASE_URL;

// // // function DefaultColumnFilter({ column }) {
// // //   return null; // Return null to remove the search box
// // // }

// // // const PaymentDetails = () => {
// // //   const [data, setData] = useState([]);
// // //   const [filteredData, setFilteredData] = useState([]);
// // //   const [startDate, setStartDate] = useState('');
// // //   const [endDate, setEndDate] = useState('');

// // //   useEffect(() => {
// // //     fetchData();
// // //   }, []);

// // //   useEffect(() => {
// // //     filterData();
// // //   }, [data, startDate, endDate]);

// // //   const fetchData = async () => {
// // //     try {
// // //       const response = await axios.get(`${apiUrl}/payments`);
// // //       setData(response.data);
// // //     } catch (error) {
// // //       Swal.fire({
// // //         icon: 'error',
// // //         title: 'Error fetching data',
// // //       });
// // //     }
// // //   };

// // //   const filterData = () => {
// // //     let filtered = data;

// // //     // Date filtering logic
// // //     if (startDate && endDate) {
// // //       filtered = filtered.filter(item => {
// // //         const paymentDate = new Date(item.paymentDate);
// // //         return paymentDate >= new Date(startDate) && paymentDate <= new Date(endDate);
// // //       });
// // //     }

// // //     setFilteredData(filtered);
// // //   };

// // //   const exportToCSV = () => {
// // //     const dataCopy = [...filteredData];
// // //     const modifiedData = dataCopy.map(item => {
// // //       const { enrollment, ...rest } = item;
// // //       return rest;
// // //     });
// // //     const csv = Papa.unparse(modifiedData);
// // //     const blob = new Blob([csv], { type: 'text/csv' });
// // //     const url = window.URL.createObjectURL(blob);
// // //     const a = document.createElement('a');
// // //     a.href = url;
// // //     a.download = 'payments.csv';
// // //     document.body.appendChild(a);
// // //     a.click();
// // //     document.body.removeChild(a);
// // //   };

// // //   const handleStartDateChange = (e) => {
// // //     setStartDate(e.target.value);
// // //   };

// // //   const handleEndDateChange = (e) => {
// // //     setEndDate(e.target.value);
// // //   };

// // //   const columns = useMemo(
// // //     () => [
// // //       { Header: 'Payment ID', accessor: 'paymentId', Filter: DefaultColumnFilter },
// // //       {
// // //         Header: 'Full Name',
// // //         accessor: (row) => {
// // //           const { firstName, middleName, lastName } = row.enrollment.student;
// // //           let fullName = firstName;
// // //           if (middleName) fullName += ` ${middleName}`;
// // //           if (lastName) fullName += ` ${lastName}`;
// // //           return fullName;
// // //         },
// // //         Filter: DefaultColumnFilter,
// // //       },
// // //       { Header: 'Course Name', accessor: 'enrollment.course.name', Filter: DefaultColumnFilter },
// // //       { Header: 'Amount', accessor: 'amount', Filter: DefaultColumnFilter },
// // //       { Header: 'Balance', accessor: 'balance', Filter: DefaultColumnFilter },
// // //       { Header: 'Payment Date', accessor: 'paymentDate', Filter: DefaultColumnFilter },
// // //       { Header: 'Payment Method', accessor: 'paymentMethod', Filter: DefaultColumnFilter },
// // //     ],
// // //     []
// // //   );

// // //   const {
// // //     getTableProps,
// // //     getTableBodyProps,
// // //     headerGroups,
// // //     page,
// // //     prepareRow,
// // //     nextPage,
// // //     previousPage,
// // //     canNextPage,
// // //     canPreviousPage,
// // //     state: { globalFilter, pageIndex, pageSize },
// // //     setGlobalFilter,
// // //     setPageSize,
// // //     pageOptions,
// // //     rows,
// // //     setFilter,
// // //   } = useTable(
// // //     {
// // //       columns,
// // //       data: filteredData,
// // //       initialState: { pageIndex: 0, pageSize: 10 },
// // //       autoResetPage: true,
// // //     },
// // //     useFilters,
// // //     useGlobalFilter,
// // //     useSortBy,
// // //     usePagination
// // //   );

// // //   // Calculate total transactions, total amount, and total balance
// // //   const totalTransactions = rows.length;
// // //   const totalAmount = rows.reduce((sum, row) => sum + parseFloat(row.original.amount), 0);

// // //   // Calculate total balance as sum of the latest payment balances for each enrollment ID
// // //   const latestBalances = useMemo(() => {
// // //     const enrollmentPayments = {};
// // //     filteredData.forEach(payment => {
// // //       const enrollmentId = payment.enrollmentId;
// // //       if (!enrollmentPayments[enrollmentId] || new Date(payment.paymentDate) > new Date(enrollmentPayments[enrollmentId].paymentDate)) {
// // //         enrollmentPayments[enrollmentId] = payment;
// // //       }
// // //     });
// // //     return Object.values(enrollmentPayments).reduce((sum, payment) => sum + parseFloat(payment.balance), 0);
// // //   }, [filteredData]);

// // //   return (
// // //     <div>
// // //       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
// // //         <Button onClick={exportToCSV}>
// // //           <FontAwesomeIcon icon={faFileCsv} /> Export to CSV
// // //         </Button>
// // //         <div style={{ display: 'flex', alignItems: 'center' }}>
// // //           <Input
// // //             value={globalFilter || ''}
// // //             onChange={(e) => setGlobalFilter(e.target.value)}
// // //             placeholder="Search all columns..."
// // //             style={{ width: '200px', marginLeft: '10px' }}
// // //           />
// // //           <Label for="startDate" style={{ marginLeft: '10px', marginRight: '5px' }}>
// // //             Start Date:
// // //           </Label>
// // //           <Input
// // //             id="startDate"
// // //             type="date"
// // //             value={startDate}
// // //             onChange={handleStartDateChange}
// // //             style={{ minWidth: '150px' }}
// // //           />
// // //           <Label for="endDate" style={{ marginLeft: '10px', marginRight: '5px' }}>
// // //             End Date:
// // //           </Label>
// // //           <Input
// // //             id="endDate"
// // //             type="date"
// // //             value={endDate}
// // //             onChange={handleEndDateChange}
// // //             style={{ minWidth: '150px' }}
// // //           />
// // //           <Label for="pageSize" style={{ marginLeft: '10px', marginRight: '5px' }}>
// // //             Rows per Page:
// // //           </Label>
// // //           <Input
// // //             id="pageSize"
// // //             type="select"
// // //             value={pageSize}
// // //             onChange={(e) => setPageSize(Number(e.target.value))}
// // //             style={{ width: '80px' }}
// // //           >
// // //             {[10, 20, 30, 50, 100].map((size) => (
// // //               <option key={size} value={size}>
// // //                 {size}
// // //               </option>
// // //             ))}
// // //           </Input>
// // //         </div>
// // //       </div>
// // //       <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// // //         <span>Total Transactions: {totalTransactions}</span>
// // //         <span>Total Amount: {totalAmount.toFixed(2)}</span>
// // //         <span>Total Balance: {latestBalances.toFixed(2)}</span>
// // //       </div>
// // //       <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
// // //         <table
// // //           {...getTableProps()}
// // //           style={{ borderCollapse: 'collapse', width: '100%', border: '1px solid #ddd', marginTop: '10px' }}
// // //         >
// // //           <thead style={{ position: 'sticky', top: 0, zIndex: 1, background: '#fff' }}>
// // //             {headerGroups.map((headerGroup) => (
// // //               <tr {...headerGroup.getHeaderGroupProps()}>
// // //                 {headerGroup.headers.map((column) => (
// // //                   <th
// // //                     {...column.getHeaderProps(column.getSortByToggleProps())}
// // //                     style={{
// // //                       fontSize: '14px',
// // //                       padding: '8px 10px',
// // //                       whiteSpace: 'nowrap',
// // //                       borderBottom: '1px solid #ddd',
// // //                       cursor: 'pointer',
// // //                     }}
// // //                   >
// // //                     <div>
// // //                       {column.render('Header')}
// // //                       <FontAwesomeIcon
// // //                         icon={faSortUp}
// // //                         style={{ opacity: column.isSorted && column.isSortedDesc ? 1 : 0.3, marginLeft: '5px' }}
// // //                       />
// // //                       <FontAwesomeIcon
// // //                         icon={faSortDown}
// // //                         style={{ opacity: column.isSorted && !column.isSortedDesc ? 1 : 0.3, marginLeft: '5px' }}
// // //                       />
// // //                     </div>
// // //                   </th>
// // //                 ))}
// // //               </tr>
// // //             ))}
// // //           </thead>
// // //           <tbody {...getTableBodyProps()}>
// // //             {page.map((row) => {
// // //               prepareRow(row);
// // //               return (
// // //                 <tr {...row.getRowProps()}>
// // //                   {row.cells.map((cell) => (
// // //                     <td
// // //                       {...cell.getCellProps()}
// // //                       style={{
// // //                         fontSize: '14px',
// // //                         padding: '8px 10px',
// // //                         whiteSpace: 'nowrap',
// // //                         borderBottom: '1px solid #ddd',
// // //                       }}
// // //                     >
// // //                       {cell.render('Cell')}
// // //                     </td>
// // //                   ))}
// // //                 </tr>
// // //               );
// // //             })}
// // //           </tbody>
// // //         </table>
// // //       </div>
// // //       <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', borderTop: '1px solid #ddd', padding: '10px 0' }}>
// // //         <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
// // //           {'< Previous'}
// // //         </Button>
// // //         <span style={{ margin: '0 10px' }}>
// // //           Page {pageIndex + 1} of {pageOptions.length}
// // //         </span>
// // //         <Button onClick={() => nextPage()} disabled={!canNextPage}>
// // //           {'Next >'}
// // //         </Button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default PaymentDetails;


// import React, { useEffect, useMemo, useState } from 'react';
// import axios from 'axios';
// import { Button, Input, Label } from 'reactstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFileCsv, faSortDown, faSortUp, faEdit } from '@fortawesome/free-solid-svg-icons';
// import Papa from 'papaparse';
// import { useTable, usePagination, useGlobalFilter, useFilters, useSortBy } from 'react-table';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';

// const apiUrl = process.env.REACT_APP_API_BASE_URL;

// function DefaultColumnFilter({ column }) {
//   return null; // Return null to remove the search box
// }

// const PaymentDetails = () => {
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');

//   useEffect(() => {
//     fetchData();
//   }, []);

//   useEffect(() => {
//     filterData();
//   }, [data, startDate, endDate]);
//   const navigate = useNavigate();

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`${apiUrl}/payments`);
//       setData(response.data);
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error fetching data',
//       });
//     }
//   };

//   const filterData = () => {
//     let filtered = data;

//     // Date filtering logic
//     if (startDate && endDate) {
//       filtered = filtered.filter(item => {
//         const paymentDate = new Date(item.paymentDate);
//         return paymentDate >= new Date(startDate) && paymentDate <= new Date(endDate);
//       });
//     }

//     setFilteredData(filtered);
//   };

//   const exportToCSV = () => {
//     const dataCopy = [...filteredData];
//     const modifiedData = dataCopy.map(item => {
//       const { enrollment, ...rest } = item;
//       return rest;
//     });
//     const csv = Papa.unparse(modifiedData);
//     const blob = new Blob([csv], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'payments.csv';
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//   };

//   const handleStartDateChange = (e) => {
//     setStartDate(e.target.value);
//   };

//   const handleEndDateChange = (e) => {
//     setEndDate(e.target.value);
//   };

//   const handleEdit = (row) => {
//     Swal.fire({
//       title: 'Edit Payment',
//       text: `Edit payment with ID: ${row.original.paymentId}`,
//       icon: 'info',
//       showCancelButton: true,
//       confirmButtonText: 'OK',
//     }).then((result) => {
//       if (result.isConfirmed) {
//         navigate(`/payments/${row.original.paymentId}`);
//       }
//     });
//   };
  

//   const columns = useMemo(
//     () => [
//       { Header: 'Payment ID', accessor: 'paymentId', Filter: DefaultColumnFilter },
//       {
//         Header: 'Full Name',
//         accessor: (row) => {
//           const { firstName, middleName, lastName } = row.enrollment.student;
//           let fullName = firstName;
//           if (middleName) fullName += ` ${middleName}`;
//           if (lastName) fullName += ` ${lastName}`;
//           return fullName;
//         },
//         Filter: DefaultColumnFilter,
//       },
//       { Header: 'Course Name', accessor: 'enrollment.course.name', Filter: DefaultColumnFilter },
//       { Header: 'Amount', accessor: 'amount', Filter: DefaultColumnFilter },
//       { Header: 'Balance', accessor: 'balance', Filter: DefaultColumnFilter },
//       { Header: 'Payment Date', accessor: 'paymentDate', Filter: DefaultColumnFilter },
//       { Header: 'Payment Method', accessor: 'paymentMethod', Filter: DefaultColumnFilter },
//       {
//         Header: 'Actions',
//         accessor: 'actions',
//         disableSortBy: true,
//         Cell: ({ row }) => (
//           <Button color="primary" onClick={() => handleEdit(row)}>
//             <FontAwesomeIcon icon={faEdit} /> Edit
//           </Button>
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
//     rows,
//     setFilter,
//   } = useTable(
//     {
//       columns,
//       data: filteredData,
//       initialState: { pageIndex: 0, pageSize: 10 },
//       autoResetPage: true,
//     },
//     useFilters,
//     useGlobalFilter,
//     useSortBy,
//     usePagination
//   );

//   // Calculate total transactions, total amount, and total balance
//   const totalTransactions = rows.length;
//   const totalAmount = rows.reduce((sum, row) => sum + parseFloat(row.original.amount), 0);

//   // Calculate total balance as sum of the latest payment balances for each enrollment ID
//   const latestBalances = useMemo(() => {
//     const enrollmentPayments = {};
//     filteredData.forEach(payment => {
//       const enrollmentId = payment.enrollmentId;
//       if (!enrollmentPayments[enrollmentId] || new Date(payment.paymentDate) > new Date(enrollmentPayments[enrollmentId].paymentDate)) {
//         enrollmentPayments[enrollmentId] = payment;
//       }
//     });
//     return Object.values(enrollmentPayments).reduce((sum, payment) => sum + parseFloat(payment.balance), 0);
//   }, [filteredData]);

//   return (
//     <div>
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
//         <Button onClick={exportToCSV}>
//           <FontAwesomeIcon icon={faFileCsv} /> Export to CSV
//         </Button>
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//           <Input
//             value={globalFilter || ''}
//             onChange={(e) => setGlobalFilter(e.target.value)}
//             placeholder="Search all columns..."
//             style={{ width: '200px', marginLeft: '10px' }}
//           />
//           <Label for="startDate" style={{ marginLeft: '10px', marginRight: '5px' }}>
//             Start Date:
//           </Label>
//           <Input
//             id="startDate"
//             type="date"
//             value={startDate}
//             onChange={handleStartDateChange}
//             style={{ minWidth: '150px' }}
//           />
//           <Label for="endDate" style={{ marginLeft: '10px', marginRight: '5px' }}>
//             End Date:
//           </Label>
//           <Input
//             id="endDate"
//             type="date"
//             value={endDate}
//             onChange={handleEndDateChange}
//             style={{ minWidth: '150px' }}
//           />
//           <Label for="pageSize" style={{ marginLeft: '10px', marginRight: '5px' }}>
//             Rows per Page:
//           </Label>
//           <Input
//             id="pageSize"
//             type="select"
//             value={pageSize}
//             onChange={(e) => setPageSize(Number(e.target.value))}
//             style={{ width: '80px' }}
//           >
//             {[10, 20, 30, 50, 100].map((size) => (
//               <option key={size} value={size}>
//                 {size}
//               </option>
//             ))}
//           </Input>
//         </div>
//       </div>
//       <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         <span>Total Transactions: {totalTransactions}</span>
//         <span>Total Amount: {totalAmount.toFixed(2)}</span>
//         <span>Total Balance: {latestBalances.toFixed(2)}</span>
//       </div>
//       <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
//         <table
//           {...getTableProps()}
//           style={{ borderCollapse: 'collapse', width: '100%', border: '1px solid #ddd', marginTop: '10px' }}
//         >
//           <thead style={{ position: 'sticky', top: 0, zIndex: 1, background: '#fff' }}>
//             {headerGroups.map((headerGroup) => (
//               <tr {...headerGroup.getHeaderGroupProps()}>
//                 {headerGroup.headers.map((column) => (
//                   <th
//                     {...column.getHeaderProps(column.getSortByToggleProps())}
//                     style={{
//                       fontSize: '14px',
//                       padding: '8px 10px',
//                       whiteSpace: 'nowrap',
//                       borderBottom: '1px solid #ddd',
//                       cursor: 'pointer',
//                     }}
//                   >
//                     <div>
//                       {column.render('Header')}
//                       <FontAwesomeIcon
//                         icon={faSortUp}
//                         style={{ opacity: column.isSorted && column.isSortedDesc ? 1 : 0.3, marginLeft: '5px' }}
//                       />
//                       <FontAwesomeIcon
//                         icon={faSortDown}
//                         style={{ opacity: column.isSorted && !column.isSortedDesc ? 1 : 0.3, marginLeft: '5px' }}
//                       />
//                     </div>
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody {...getTableBodyProps()}>
//             {page.map((row) => {
//               prepareRow(row);
//               return (
//                 <tr {...row.getRowProps()}>
//                   {row.cells.map((cell) => (
//                     <td
//                       {...cell.getCellProps()}
//                       style={{
//                         fontSize: '14px',
//                         padding: '8px 10px',
//                         whiteSpace: 'nowrap',
//                         borderBottom: '1px solid #ddd',
//                       }}
//                     >
//                       {cell.render('Cell')}
//                     </td>
//                   ))}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
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

// export default PaymentDetails;


// // import React, { useEffect, useMemo, useState } from 'react';
// // import axios from 'axios';
// // import { Button, Input, Label } from 'reactstrap';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faFileCsv, faSortDown, faSortUp, faEdit } from '@fortawesome/free-solid-svg-icons';
// // import Papa from 'papaparse';
// // import { useTable, usePagination, useGlobalFilter, useFilters, useSortBy } from 'react-table';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import Swal from 'sweetalert2';
// // import { useNavigate } from 'react-router-dom';

// // const apiUrl = process.env.REACT_APP_API_BASE_URL;

// // function DefaultColumnFilter({ column }) {
// //   return null; // Return null to remove the search box
// // }

// // const PaymentDetails = () => {
// //   const [data, setData] = useState([]);
// //   const [filteredData, setFilteredData] = useState([]);
// //   const [startDate, setStartDate] = useState('');
// //   const [endDate, setEndDate] = useState('');

// //   useEffect(() => {
// //     fetchData();
// //   }, []);

// //   useEffect(() => {
// //     filterData();
// //   }, [data, startDate, endDate]);

// //   const navigate = useNavigate();

// //   const fetchData = async () => {
// //     try {
// //       const response = await axios.get(`${apiUrl}/payments`);
// //       setData(response.data);
// //     } catch (error) {
// //       Swal.fire({
// //         icon: 'error',
// //         title: 'Error fetching data',
// //       });
// //     }
// //   };

// //   const filterData = () => {
// //     let filtered = data;

// //     // Date filtering logic
// //     if (startDate && endDate) {
// //       filtered = filtered.filter(item => {
// //         const paymentDate = new Date(item.paymentDate);
// //         return paymentDate >= new Date(startDate) && paymentDate <= new Date(endDate);
// //       });
// //     }

// //     setFilteredData(filtered);
// //   };

// //   const exportToCSV = () => {
// //     const dataCopy = [...filteredData];
// //     const modifiedData = dataCopy.map(item => {
// //       const { enrollment, ...rest } = item;
// //       return rest;
// //     });
// //     const csv = Papa.unparse(modifiedData);
// //     const blob = new Blob([csv], { type: 'text/csv' });
// //     const url = window.URL.createObjectURL(blob);
// //     const a = document.createElement('a');
// //     a.href = url;
// //     a.download = 'payments.csv';
// //     document.body.appendChild(a);
// //     a.click();
// //     document.body.removeChild(a);
// //   };

// //   const handleStartDateChange = (e) => {
// //     setStartDate(e.target.value);
// //   };

// //   const handleEndDateChange = (e) => {
// //     setEndDate(e.target.value);
// //   };

// //   const handleEdit = (row) => {
// //     Swal.fire({
// //       title: 'Edit Payment',
// //       text: `Edit payment with ID: ${row.original.paymentId}`,
// //       icon: 'info',
// //       showCancelButton: true,
// //       confirmButtonText: 'OK',
// //     }).then((result) => {
// //       if (result.isConfirmed) {
// //         navigate(`/payments/${row.original.paymentId}`);
// //       }
// //     });
// //   };

// //   const columns = useMemo(
// //     () => [
// //       { Header: 'Payment ID', accessor: 'paymentId', Filter: DefaultColumnFilter },
// //       {
// //         Header: 'Full Name',
// //         accessor: (row) => {
// //           const { firstName, middleName, lastName } = row.enrollment.student;
// //           let fullName = firstName;
// //           if (middleName) fullName += ` ${middleName}`;
// //           if (lastName) fullName += ` ${lastName}`;
// //           return fullName;
// //         },
// //         Filter: DefaultColumnFilter,
// //       },
// //       { Header: 'Course Name', accessor: 'enrollment.course.name', Filter: DefaultColumnFilter },
// //       { Header: 'Amount', accessor: 'amount', Filter: DefaultColumnFilter },
// //       { Header: 'Balance', accessor: 'balance', Filter: DefaultColumnFilter },
// //       { Header: 'Payment Date', accessor: 'paymentDate', Filter: DefaultColumnFilter },
// //       { Header: 'Payment Method', accessor: 'paymentMethod', Filter: DefaultColumnFilter },
// //       {
// //         Header: 'Actions',
// //         accessor: 'actions',
// //         disableSortBy: true,
// //         Cell: ({ row }) => (
// //           <Button color="primary" onClick={() => handleEdit(row)}>
// //             <FontAwesomeIcon icon={faEdit} /> Edit
// //           </Button>
// //         ),
// //       },
// //     ],
// //     []
// //   );

// //   // const {
// //   //   getTableProps,
// //   //   getTableBodyProps,
// //   //   headerGroups,
// //   //   page,
// //   //   prepareRow,
// //   //   nextPage,
// //   //   previousPage,
// //   //   canNextPage,
// //   //   canPreviousPage,
// //   //   state: { globalFilter, pageIndex, pageSize },
// //   //   setGlobalFilter,
// //   //   setPageSize,
// //   //   pageOptions,
// //   //   rows,
// //   //   setFilter,
// //   // } = useTable(
// //   //   {
// //   //     columns,
// //   //     data: filteredData,
// //   //     initialState: { pageIndex: 0, pageSize: 10 },
// //   //     autoResetPage: true,
// //   //   },
// //   //   useFilters,
// //   //   useGlobalFilter,
// //   //   useSortBy,
// //   //   usePagination
// //   // );

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
// //     rows,
// //     setFilter,
// //   } = useTable(
// //     {
// //       columns,
// //       data: filteredData,
// //       initialState: {
// //         pageIndex: 0,
// //         pageSize: 10,
// //         sortBy: [
// //           {
// //             id: 'paymentDate',
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
  


// //   // Calculate total transactions, total amount, and total balance
// //   const totalTransactions = rows.length;
// //   const totalAmount = rows.reduce((sum, row) => sum + parseFloat(row.original.amount), 0);

// //   // Calculate total balance as sum of the latest payment balances for each enrollment ID
// //   const latestBalances = useMemo(() => {
// //     const enrollmentPayments = {};
// //     filteredData.forEach(payment => {
// //       const enrollmentId = payment.enrollmentId;
// //       if (!enrollmentPayments[enrollmentId] || new Date(payment.paymentDate) > new Date(enrollmentPayments[enrollmentId].paymentDate)) {
// //         enrollmentPayments[enrollmentId] = payment;
// //       }
// //     });
// //     return Object.values(enrollmentPayments).reduce((sum, payment) => {
// //       if (payment.enrollment.status === 'dropped') {
// //         return sum - parseFloat(payment.balance);
// //       }
// //       return sum + parseFloat(payment.balance);
      
// //     }, 0);
// //   }, [filteredData]);

// //   return (
// //     <div>
// //       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
// //         <Button onClick={exportToCSV}>
// //           <FontAwesomeIcon icon={faFileCsv} /> Export to CSV
// //         </Button>
// //         <div style={{ display: 'flex', alignItems: 'center' }}>
// //           <Input
// //             value={globalFilter || ''}
// //             onChange={(e) => setGlobalFilter(e.target.value)}
// //             placeholder="Search all columns..."
// //             style={{ width: '200px', marginLeft: '10px' }}
// //           />
// //           <Label for="startDate" style={{ marginLeft: '10px', marginRight: '5px' }}>
// //             Start Date:
// //           </Label>
// //           <Input
// //             id="startDate"
// //             type="date"
// //             value={startDate}
// //             onChange={handleStartDateChange}
// //             style={{ minWidth: '150px' }}
// //           />
// //           <Label for="endDate" style={{ marginLeft: '10px', marginRight: '5px' }}>
// //             End Date:
// //           </Label>
// //           <Input
// //             id="endDate"
// //             type="date"
// //             value={endDate}
// //             onChange={handleEndDateChange}
// //             style={{ minWidth: '150px' }}
// //           />
// //           <Label for="pageSize" style={{ marginLeft: '10px', marginRight: '5px' }}>
// //             Rows per Page:
// //           </Label>
// //           <Input
// //             id="pageSize"
// //             type="select"
// //             value={pageSize}
// //             onChange={(e) => setPageSize(Number(e.target.value))}
// //             style={{ width: '80px' }}
// //           >
// //             {[10, 20, 30, 50, 100].map((size) => (
// //               <option key={size} value={size}>
// //                 {size}
// //               </option>
// //             ))}
// //           </Input>
// //         </div>
// //       </div>
// //       <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// //         <span>Total Transactions: {totalTransactions}</span>
// //         <span>Total Amount: {totalAmount.toFixed(2)}</span>
// //         <span>Total Balance: {latestBalances.toFixed(2)}</span>
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

// // export default PaymentDetails;

import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Button, Input, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCsv, faSortDown, faSortUp, faEdit } from '@fortawesome/free-solid-svg-icons';
import Papa from 'papaparse';
import { useTable, usePagination, useGlobalFilter, useFilters, useSortBy } from 'react-table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_BASE_URL;

function DefaultColumnFilter({ column }) {
  return null; // Return null to remove the search box
}

const PaymentDetails = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [data, startDate, endDate]);
  
  const navigate = useNavigate();

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(`${apiUrl}/payments`);
  //     setData(response.data);
  //     console.log("payment details", response.data);
  //   } catch (error) {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Error fetching data',
  //     });
  //   }
  // };

  // const fetchData = async (isEdit = false) => {
  //   try {
  //     const response = await axios.get(`${apiUrl}/payments`);
  //     const fetchedData = response.data;
  
  //     // Map to track the latest payment for each enrollmentId
  //     const latestPayments = {};
  
  //     // Iterate to find the latest paymentDate for each enrollmentId
  //     fetchedData.forEach((item) => {
  //       if (
  //         !latestPayments[item.enrollmentId] ||
  //         new Date(item.paymentDate) > new Date(latestPayments[item.enrollmentId].paymentDate)
  //       ) {
  //         latestPayments[item.enrollmentId] = item;
  //       }
  //     });
  
  //     // Update isEdit flag for each record
  //     const updatedData = fetchedData.map((item) => ({
  //       ...item,
  //       isEdit: latestPayments[item.enrollmentId].paymentId === item.paymentId, // Set isEdit true for the latest payment
  //     }));
  //     console.log("after filter", updatedData);
  //     setData(updatedData);
  //   } catch (error) {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Error fetching data',
  //     });
  //   }
  // };
  
  const fetchData = async (isEdit = false) => {
    try {
      const response = await axios.get(`${apiUrl}/payments`);
      const fetchedData = response.data;
  
      // Map to track the latest payment for each enrollmentId
      const latestPayments = {};
  
      // Iterate to find the latest updatedAt (date and time) for each enrollmentId
      fetchedData.forEach((item) => {
        if (
          !latestPayments[item.enrollmentId] ||
          new Date(item.updatedAt) > new Date(latestPayments[item.enrollmentId].updatedAt)
        ) {
          latestPayments[item.enrollmentId] = item;
        }
      });
  
      // Update isEdit flag for each record
      const updatedData = fetchedData.map((item) => ({
        ...item,
        isEdit: latestPayments[item.enrollmentId].paymentId === item.paymentId, // Set isEdit true for the latest updated record
      }));
  
      console.log("after filter", updatedData);
      setData(updatedData);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error fetching data',
      });
    }
  };
  
  const filterData = () => {
    let filtered = data;

    // Date filtering logic
    if (startDate && endDate) {
      filtered = filtered.filter(item => {
        const paymentDate = new Date(item.paymentDate);
        return paymentDate >= new Date(startDate) && paymentDate <= new Date(endDate);
      });
    }

    setFilteredData(filtered);
  };

  const exportToCSV = () => {
    const dataCopy = [...filteredData];
    const modifiedData = dataCopy.map(item => {
      const { enrollment, ...rest } = item;
      return rest;
    });
    const csv = Papa.unparse(modifiedData);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'payments.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleEdit = (row) => {
    Swal.fire({
      title: 'Edit Payment',
      text: `Edit payment with ID: ${row.original.paymentId}`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/payments/${row.original.paymentId}`);
      }
    });
  };

  const columns = useMemo(
    () => [
      { Header: 'Payment ID', accessor: 'paymentId', Filter: DefaultColumnFilter },
      {
        Header: 'Full Name',
        accessor: (row) => {
          const { firstName, middleName, lastName } = row.enrollment.student;
          let fullName = firstName;
          if (middleName) fullName += ` ${middleName}`;
          if (lastName) fullName += ` ${lastName}`;
          return fullName;
        },
        Filter: DefaultColumnFilter,
      },
      { Header: 'Course Name', accessor: 'enrollment.course.name', Filter: DefaultColumnFilter },
      { Header: 'Amount', accessor: 'amount', Filter: DefaultColumnFilter },
      { Header: 'Balance', accessor: 'balance', Filter: DefaultColumnFilter },
      { Header: 'Payment Date', accessor: 'paymentDate', Filter: DefaultColumnFilter },
      { Header: 'Payment Method', accessor: 'paymentMethod', Filter: DefaultColumnFilter },
      {
        Header: 'Actions',
        accessor: 'actions',
        disableSortBy: true,
        Cell: ({ row }) => {
          const { isEdit } = row.original; // Accessing the original row data
          return isEdit ? (
            <Button color="primary" onClick={() => handleEdit(row.original)}>
              <FontAwesomeIcon icon={faEdit} />
            </Button>
          ) : null; // Render nothing if `isEdit` is false
        },
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
    rows,
    setFilter,
  } = useTable(
    {
      columns,
      data: filteredData,
      initialState: { pageIndex: 0, pageSize: 10 },
      autoResetPage: true,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  // Calculate total transactions, total amount, and total balance
  const totalTransactions = rows.length;
  const totalAmount = rows.reduce((sum, row) => sum + parseFloat(row.original.amount), 0);

  // Calculate total balance as sum of the latest payment balances for each enrollment ID
  const latestBalances = useMemo(() => {
    const enrollmentPayments = {};
    const excludedEnrollments = [];
  
    filteredData.forEach(payment => {
      const enrollmentId = payment.enrollmentId;
      if (payment.enrollment.status !== 'dropped' && 
          (!enrollmentPayments[enrollmentId] || new Date(payment.paymentDate) > new Date(enrollmentPayments[enrollmentId].paymentDate))) {
        enrollmentPayments[enrollmentId] = payment;
      } else if (payment.enrollment.status === 'dropped') {
        excludedEnrollments.push(payment.enrollmentId);
      }
    });
  
    console.log('Excluded enrollments:', excludedEnrollments);
  
    return Object.values(enrollmentPayments).reduce((sum, payment) => sum + parseFloat(payment.balance), 0);
  }, [filteredData]);
  

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
        <span>Total Transactions: {totalTransactions}</span>
        <span>Total Amount: {totalAmount.toFixed(2)}</span>
        <span>Total Balance: {latestBalances.toFixed(2)}</span>
      </div>
      <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
        <table
          {...getTableProps()}
          style={{ borderCollapse: 'collapse', width: '100%', border: '1px solid #ddd', marginTop: '10px' }}
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
                    <div>
                      {column.render('Header')}
                      <FontAwesomeIcon
                        icon={column.isSorted ? (column.isSortedDesc ? faSortDown : faSortUp) : faSortUp}
                        style={{ marginLeft: '5px' }}
                      />
                    </div>
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
                      style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd' }}
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
        <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </Button>
        <div>
          Page {pageIndex + 1} of {pageOptions.length}
        </div>
        <Button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default PaymentDetails;
