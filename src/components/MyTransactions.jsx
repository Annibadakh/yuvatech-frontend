
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

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/mypayments`);
      setData(response.data);
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

  

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
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
      if (
          (!enrollmentPayments[enrollmentId] || new Date(payment.paymentDate) > new Date(enrollmentPayments[enrollmentId].paymentDate)))
           {
        enrollmentPayments[enrollmentId] = payment;
      }
    });
  
  
    return Object.values(enrollmentPayments).reduce((sum, payment) => sum + parseFloat(payment.balance), 0);
  }, [filteredData]);
  

  return (
    <div>
      
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
