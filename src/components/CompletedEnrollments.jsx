
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
      const enrolledData = allData.filter(item => item.status === 'completed');
  
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
              <FontAwesomeIcon icon={faEdit} /> Edit
            </Button>
            <Button color="success" onClick={() => handlePayment(row)}>
              <FontAwesomeIcon icon={faMoneyCheckAlt} /> Payment
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
        
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end', gap: '10px' }}>
        <Button onClick={exportToCSV} style={{ marginRight: '10px' }}>
          <FontAwesomeIcon icon={faFileCsv} /> Export to CSV
        </Button>
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
