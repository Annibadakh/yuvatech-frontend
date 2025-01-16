
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Button, Input, Label } from 'reactstrap';
import { useTable, usePagination, useGlobalFilter, useSortBy } from 'react-table';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import Loader from '../loader/Loader';
const MyEnrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const navigate = useNavigate();
  const userRole = useSelector(state => state.auth.user?.role);
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
const [loading, setLoading] = useState(false); // Loading state
  useEffect(() => {
    getEnrollments();
  }, []);

  const getEnrollments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/myEnrollments`);
      setEnrollments(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error fetching enrollments',
        text: error.message
      });
    }
    finally{
      setLoading(false);
    }
  };

  const viewDocuments = (courseId) => {
    navigate(`/courses/studymaterial/${courseId}`);
  };

  const columns = useMemo(() => [
    { Header: 'Sr No', accessor: (row, i) => i + 1 },
    { Header: 'Enrollment ID', accessor: 'enrollmentId' },
    { Header: 'Enrollment Date', accessor: row => new Date(row.enrollmentDate).toLocaleDateString() },
    { Header: 'Course Name', accessor: 'course.name' },
    { Header: 'Total Fees', accessor: 'fee.totalFees' },
    { Header: 'Applicable Fees', accessor: 'fee.applicableFees' },
    { Header: 'Balance Amount', accessor: 'fee.balanceAmount' },
    { Header: 'Due Date', accessor: row => new Date(row.fee.duedate).toLocaleDateString() },
    
    { Header: 'Status', accessor: 'status' },
    {
      Header: 'Actions',
      id: 'view',
      Cell: ({ row }) => (
        <Button color="info" onClick={() => viewDocuments(row.original.courseId)}>
          View Documents
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
      data: enrollments,
      initialState: { pageIndex: 0, pageSize: 10 },
      autoResetPage: true,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  if(loading){
    return <Loader />;
  }

  return (
    <div>
      <h1 className="title">My Enrollments</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'nowrap' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end', gap: '10px' }}>
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

export default MyEnrollments;
