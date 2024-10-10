
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// // import { FaEdit, FaTrash } from 'react-icons/fa';
// import { useSelector } from 'react-redux';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
// const CourseDocumentList = () => {
//   const [materials, setMaterials] = useState([]);
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const userRole = useSelector(state => state.auth.user?.role);
//   const apiUrl = process.env.REACT_APP_API_BASE_URL

//   useEffect(() => {
//     getMaterials();
//   }, []);

//   useEffect(() => {
//     const getCourseById = async () => {
//       try {
//         if (!id) {
//           // console.log("Id not found");
//           navigate("/courses");
//           return;
//         }
//       } catch (error) {
//         // console.error("Error fetching course by ID:", error);
//       }
//     };
//     getCourseById();
//   }, [id, navigate]);

//   const getMaterials = async () => {
//     try {
//       const response = await axios.get(`${apiUrl}/materials/${id}`);
//       setMaterials(response.data);
//     } catch (error) {
//       // console.error("Error fetching materials:", error);
//     }
//   };

//   const deleteMaterial = async (materialId) => {
//     try {
//       await axios.delete(`${apiUrl}/materials/${materialId}`);
//       setMaterials(materials.filter(material => material.materialId !== materialId));
//     } catch (error) {
//       // console.error('Error deleting material:', error);
//     }
//   };

//   const viewDocument = (materialId) => {
//     window.open(`${apiUrl}/materials/show/${materialId}`, '_blank');
//   };
//   const titleStyle = {
//     fontFamily: 'Times New Roman, Times, serif'
//   };
  
//   return (
//     <div>
//       <h1 style={titleStyle} className="title">Courses</h1>
//       <h2 style={titleStyle} className="subtitle">List of Documents</h2>
//       {/* <Link to="/courses/add" className="btn btn-primary mb-2">
//         Add New Course
//       </Link> */}
//       <table className="table is-striped is-fullwidth">
//         <thead>
//           <tr>
//             <th>No</th>
//             <th>Document Name</th>
//             <th>Description</th>
//             <th>Document</th>
//             {userRole !== "student" && <th>Actions</th>} {/* Conditionally render Actions column */}
//           </tr>
//         </thead>
//         <tbody>
//           {materials.length > 0 ? (
//             materials.map((material, index) => (
//               <tr key={material.materialId}>
//                 <td>{index + 1}</td>
//                 <td>{material.title}</td>
//                 <td>{material.description}</td>
//                 <td>
//                   {/* <button onClick={() => viewDocument(material.materialId)} className="button is-small is-info">
//                     View Document
//                   </button> */}
//                   <Link onClick={() => viewDocument(material.materialId)} className="btn btn-sm btn-info mr-2">
//                     View Documents
//                   </Link>
//                 </td>
//                 {userRole !== "student" && (
//                   <td>
//                     {/* <button onClick={() => deleteMaterial(material.materialId)} className="button is-small is-danger">
//                       <FaTrash />
//                     </button>
//                     <Link to={`/courses/editdocument/${material.materialId}`} className="button is-small is-info">
//                       <FaEdit />
//                     </Link> */}
//                     <Link to={`/courses/editdocument/${material.materialId}`} className="btn btn-sm btn-info mr-2">
//                     <FontAwesomeIcon icon={faEdit} /> Edit
//                   </Link>
//                   <button onClick={() => deleteMaterial(material.materialId)} className="btn btn-sm btn-danger mr-2">
//                     <FontAwesomeIcon icon={faTrashAlt} /> Delete
//                   </button>
//                   </td>
//                 )}
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={userRole !== "student" ? "5" : "4"}>No materials available</td> {/* Adjust colSpan based on Actions column */}
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default CourseDocumentList;




import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Button,Input, Label  } from 'reactstrap';
import { useTable, usePagination, useGlobalFilter, useSortBy } from 'react-table';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

const CourseDocumentList = () => {
  const [materials, setMaterials] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const userRole = useSelector(state => state.auth.user?.role);
  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    getMaterials();
  }, []);

  useEffect(() => {
    const getCourseById = async () => {
      try {
        if (!id) {
          navigate("/courses");
          return;
        }
      } catch (error) {
        console.error("Error fetching course by ID:", error);
      }
    };
    getCourseById();
  }, [id, navigate]);

  // const getMaterials = async () => {
  //   try {
  //     const response = await axios.get(`${apiUrl}/materials/${id}`);
  //     setMaterials(response.data);
  //   } catch (error) {
  //     console.error("Error fetching materials:", error);
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Error fetching materials',
  //       text: error.message
  //     });
  //   }
  // };

  const getMaterials = async () => {
    try {
      const response = await axios.get(`${apiUrl}/materials/${id}`);
      const materialsData = response.data;
  
        setMaterials(materialsData);
      
    } catch (error) {
      console.error("Error fetching materials:", error);
      if (error.response?.status === 404) {
        Swal.fire({
          icon: 'info',
          title: 'No Documents Available',
          text: 'There are no documents available for this course.',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error fetching materials',
          text: error.response?.data?.message || 'An unexpected error occurred.',
        });
      }
    }
    
  };
  

  const deleteMaterial = async (materialId) => {
    try {
      await axios.delete(`${apiUrl}/materials/${materialId}`);
getMaterials();
      Swal.fire({
        icon: 'success',
        title: 'Deleted Successfully',
      });
    } catch (error) {
      console.error('Error deleting material:', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to delete material',
        text: error.message
      });
    }
  };

  const viewDocument = (materialId) => {
    window.open(`${apiUrl}/materials/show/${materialId}`, '_blank');
  };

  const columns = useMemo(() => [
    { Header: 'No', accessor: (row, i) => i + 1 },
    { Header: 'Document Name', accessor: 'title' },
    { Header: 'Description', accessor: 'description' },
    {
      Header: 'Document',
      id: 'view',
      Cell: ({ row }) => (
        <Button color="info" onClick={() => viewDocument(row.original.materialId)}>
          View Document
        </Button>
      )
    },
    
  ], [userRole]);

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
      data: materials,
      initialState: { pageIndex: 0, pageSize: 10 },
      autoResetPage: true,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <div>
      <h1 className="title">Courses</h1>
      <h2 className="subtitle">List of Documents</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'nowrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
          <Input
            value={globalFilter || ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search all columns..."
            style={{ width: '200px', marginRight: '10px' }}
          />
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
                    }}
                  >
                    {column.render('Header')}
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

export default CourseDocumentList;
