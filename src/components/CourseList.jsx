
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Swal from "sweetalert2";

// const CourseList = () => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const apiUrl = process.env.REACT_APP_API_BASE_URL;

//   useEffect(() => {
//     getCourses();
//   }, []);

//   const getCourses = async () => {
//     try {
//       const response = await axios.get(`${apiUrl}/courses`);
//       setCourses(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//       setLoading(false);
//       // Handle error gracefully, show error message to the user
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "Failed to fetch courses. Please try again later.",
//       });
//     }
//   };

//   const deleteCourse = async (courseId) => {
//     try {
//       await axios.delete(`${apiUrl}/courses/${courseId}`);
//       // Remove the deleted course from the state
//       setCourses(courses.filter((course) => course.courseId !== courseId));
//       Swal.fire({
//         icon: "success",
//         title: "Deleted Successfully",
//         text: "",
//       });
//     } catch (error) {
//       console.error("Error deleting course:", error);
//       // Handle error gracefully, show error message to the user
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "Failed to delete course. Please try again later.",
//       });
//     }
//   };
//   // const deleteCourse = async (courseId) => {
//   //   try {
//   //     await axios.delete(`${apiUrl}/courses/${courseId}`);
//   //     Swal.fire({
//   //       icon: "success",
//   //       title: "Deleted Successfully",
//   //       text: "",
//   //     });
//   //     setCourses(courses.filter((course) => course.courseId !== courseId));
//   //   } catch (error) {
//   //     console.error("Error deleting course:", error);
//   //   }
//   // };

//   const titleStyle = {
//     fontFamily: "Times New Roman, Times, serif",
//     borderBottom: "1px solid #ccc",
//     padding: "8px",
//     textAlign: "center", // Align text to the center
//     verticalAlign: "middle", // Align text vertically to the middle
//   };

//   const buttonStyle = {
//     marginRight: "5px",
//   };

//   return (
//     <div style={{ maxWidth: "100%", margin: "0 auto" }}>
//       <div className="text-left mb-3">
//         <Link to="/courses/add" className="btn btn-primary" style={buttonStyle}>
//           Add New Course
//         </Link>
//       </div>
//       <table className="table table-striped table-bordered">
//         <thead>
//           <tr>
//             <th colSpan="6" style={titleStyle}>Courses</th>
//           </tr>
//           <tr>
//             <th colSpan="6" style={titleStyle}>List of Courses</th>
//           </tr>
//           <tr>
//             <th style={titleStyle}>No</th>
//             <th style={titleStyle}>Course Name</th>
//             <th style={titleStyle}>Description</th>
//             <th style={titleStyle}>Exam Fees</th>
//             <th style={titleStyle}>Course Fees</th>
//             <th style={titleStyle}>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {courses.length > 0 ? (
//             courses.map((course, index) => (
//               <tr key={course.courseId}>
//                 <td>{index + 1}</td>
//                 <td>{course.name}</td>
//                 <td>{course.description}</td>
//                 <td>{course.examFees}</td>
//                 <td>{course.courseFees}</td>
//                 <td>
//                   <div className="btn-group" role="group">
//                     <Link to={`/courses/edit/${course.courseId}`} className="btn btn-sm btn-info" style={buttonStyle}>
//                       <FontAwesomeIcon icon={faEdit} /> Edit
//                     </Link>
//                     <button onClick={() => deleteCourse(course.courseId)} className="btn btn-sm btn-danger" style={buttonStyle}>
//                       <FontAwesomeIcon icon={faTrashAlt} /> Delete
//                     </button>
//                     <Link to={`/courses/viewcoursedocuments/${course.courseId}`} className="btn btn-sm btn-info" style={buttonStyle}>
//                       View Documents
//                     </Link>
//                     <Link to={`/courses/editdocuments/${course.courseId}`} className="btn btn-sm btn-info">
//                       Add Documents
//                     </Link>
//                   </div>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6">No courses available</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default CourseList;


import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Input, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCsv, faTrashAlt, faEdit, faFileAlt, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import Papa from 'papaparse';
import { useTable, usePagination, useGlobalFilter, useSortBy } from 'react-table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${apiUrl}/courses`);
        setCourses(response.data);
        setFilteredCourses(response.data); // Initialize filteredCourses with the fetched data
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error fetching data'        
        });
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const filterCoursesByDate = () => {
      if (startDate && endDate) {
        const filtered = courses.filter(course => {
          const courseDate = new Date(course.startDate);
          return courseDate >= new Date(startDate) && courseDate <= new Date(endDate);
        });
        setFilteredCourses(filtered);
      } else {
        setFilteredCourses(courses); // If no date range is selected, show all courses
      }
    };
    filterCoursesByDate();
  }, [startDate, endDate, courses]);

  const deleteCourse = async (courseId) => {
    try {
      await axios.delete(`${apiUrl}/courses/${courseId}`);
      // Remove the deleted course from the state
      setCourses(courses.filter((course) => course.courseId !== courseId));
      Swal.fire({
        icon: "success",
        title: "Deleted Successfully",
        text: "",
      });
    } catch (error) {
      console.error("Error deleting course:", error);
      // Handle error gracefully, show error message to the user
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to delete course. Please try again later.",
      });
    }
  };

  const exportToCSV = () => {
    
    const csv = Papa.unparse(filteredCourses);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'courses.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const columns = useMemo(() => [
    { Header: 'Course ID', accessor: 'courseId' },
    { Header: 'Course Name', accessor: 'name' },
    { Header: 'Fees', accessor:row => row.examFees + row.courseFees  },


    { Header: 'Created By', accessor: 'user.name' },
    {
      Header: 'Actions',
      id: 'actions',
      Cell: ({ row }) => (
        <div style={{ minWidth: "200px", textAlign: 'center' }}>
          <Link to={`/courses/edit/${row.original.courseId}`} className="btn btn-sm btn-info" style={{ marginRight: '5px' }}>
            <FontAwesomeIcon icon={faEdit} /> Edit
          </Link>
          <Link to={`/courses/viewcoursedocuments/${row.original.courseId}`} className="btn btn-sm btn-info" style={{ marginRight: '5px' }}>
            <FontAwesomeIcon icon={faFileAlt} /> View Documents
          </Link>
          <Link to={`/courses/editdocuments/${row.original.courseId}`} className="btn btn-sm btn-info" style={{ marginRight: '5px' }}>
            <FontAwesomeIcon icon={faFileAlt} /> Add Documents
          </Link>
          <button onClick={() => deleteCourse(row.original.courseId)} className="btn btn-sm btn-danger" style={{ marginRight: '5px' }}>
            <FontAwesomeIcon icon={faTrashAlt} /> Delete
          </button>
        </div>
      ),
      headerStyle: { textAlign: 'center' } // Center align the Actions header
    }
  ], []);

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
  } = useTable(
    {
      columns,
      data: filteredCourses,
      initialState: { pageIndex: 0, pageSize: 10 },
      autoResetPage: true,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'nowrap' }}>
          {/* <Button onClick={exportToCSV} style={{ marginRight: '10px' }}>
            <FontAwesomeIcon icon={faFileCsv} /> Export to CSV
          </Button> */}
          {/* <div style={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
          <Input
              value={globalFilter || ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search all columns..."
              style={{ width: '200px', marginRight: '10px' }}
            />
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{ marginRight: '10px', maxWidth: '150px' }}
            />
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{ marginRight: '10px', maxWidth: '150px' }}
            />
            <Button onClick={() => { setStartDate(''); setEndDate(''); }} style={{ marginRight: '10px' }}>
              Clear Date Range
            </Button>

            <Label for="pageSize" style={{ marginRight: '5px' }}>Rows per Page:</Label>
            <Input
              id="pageSize"
              type="select"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              style={{ width: '80px' }}
            >
              {[10, 20, 30, 50, 100].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </Input>
          </div> */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'nowrap' }}>
        {/* <Button onClick={exportToCSV} style={{ marginRight: '10px' }}>
          <FontAwesomeIcon icon={faFileCsv} /> Export to CSV
        </Button> */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end', gap: '10px' }}>
  <Button onClick={exportToCSV} style={{ flex: '1 1 200px', minWidth: '150px', marginBottom: '10px' }}>
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
  <Button onClick={() => { setStartDate(''); setEndDate(''); }} style={{ flex: '1 1 150px', minWidth: '100px', marginBottom: '10px' }}>
    Clear Date Range
  </Button>
  <Label for="pageSize" style={{ flex: '1 1 100px', minWidth: '100px', marginBottom: '10px' }}>Rows per Page:</Label>
  <Input
    id="pageSize"
    type="select"
    value={pageSize}
    onChange={(e) => setPageSize(Number(e.target.value))}
    style={{ flex: '1 1 100px', minWidth: '80px', marginBottom: '10px' }}
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
                        textAlign: column.id === 'actions' ? 'center' : 'left' // Center align the Actions header
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
                          textAlign: cell.column.id === 'actions' ? 'center' : 'left' // Center align the Actions cells
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
          <Button onClick={previousPage} disabled={!canPreviousPage}>
            {'< Previous'}
          </Button>
          <span style={{ margin: '0 10px' }}>
            Page {pageIndex + 1} of {pageOptions.length}
          </span>
          <Button onClick={nextPage} disabled={!canNextPage}>
            {'Next >'}
          </Button>
        </div>
    </div>
  );
};

export default CoursesList;