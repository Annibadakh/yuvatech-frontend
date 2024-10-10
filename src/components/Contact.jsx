import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Button, Input, FormGroup, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCsv, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import Papa from 'papaparse';
import { useTable, usePagination, useGlobalFilter, useFilters, useSortBy } from 'react-table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

const apiUrl = process.env.REACT_APP_API_BASE_URL;

function DefaultColumnFilter({ column }) {
  return null; // Return null to remove the search box
}

const Contacts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/contacts`);
        setData(response.data);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error fetching data',
        });
      }
    };
    fetchData();
  }, []);

  const exportToCSV = () => {
    // Convert data to CSV
    const csv = Papa.unparse(data);
  
    // Rest of the exportToCSV function remains unchanged
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contacts.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  

  const columns = useMemo(
    () => [
      { Header: 'Name', accessor: 'name', Filter: DefaultColumnFilter },
      { Header: 'Email', accessor: 'email', Filter: DefaultColumnFilter },
      { Header: 'Phone Number', accessor: 'phone_number', Filter: DefaultColumnFilter },
      { Header: 'Message', accessor: 'message', Filter: DefaultColumnFilter },
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
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
      autoResetPage: true,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <Button onClick={exportToCSV}>
          <FontAwesomeIcon icon={faFileCsv} /> Export to CSV
        </Button>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Input
            value={globalFilter || ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search all columns..."
            style={{ width: '200px', marginLeft: '10px' }}
          />
          <Label for="pageSize" style={{ marginLeft: '10px', marginRight: '5px' }}>
            Rows per Page:
          </Label>
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
                        icon={faSortUp}
                        style={{ opacity: column.isSorted && column.isSortedDesc ? 1 : 0.3, marginLeft: '5px' }}
                      />
                      <FontAwesomeIcon
                        icon={faSortDown}
                        style={{ opacity: column.isSorted && !column.isSortedDesc ? 1 : 0.3, marginLeft: '5px' }}
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

export default Contacts;
