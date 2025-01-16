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
import Loader from '../loader/Loader';

const CourseDocumentList = () => {
  const [materials, setMaterials] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const userRole = useSelector(state => state.auth.user?.role);
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const [loading, setLoading] = useState(true); // Loading state

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
    setLoading(true);
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
        navigate("/courses");
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error fetching materials',
          text: error.response?.data?.message || 'An unexpected error occurred.',
        });
        navigate("/courses");
      }
    }
    finally {
        setLoading(false); // End loading
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
    {
      Header: 'Actions',
      id: 'actions',
      Cell: ({ row }) => (
        <div style={{ minWidth: "200px", textAlign: 'center' }}>
          <Link to={`/courses/editdocument/${row.original.materialId}`} className="btn btn-sm btn-info" style={{ marginRight: '5px' }}>
            <FontAwesomeIcon icon={faEdit} /> Edit
          </Link>
          <Button color="danger" size="sm" onClick={() => deleteMaterial(row.original.materialId)} style={{ marginRight: '5px' }}>
            <FontAwesomeIcon icon={faTrashAlt} /> Delete
          </Button>
        </div>
      ),
      show: userRole !== "student" ,// Conditionally show the Actions column
      headerStyle: { textAlign: 'center' } // Center align the Actions header

    }
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


  
  if (loading) {
    return <Loader />;
  }

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
