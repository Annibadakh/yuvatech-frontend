// import React, { useEffect, useMemo, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { Button, Input, FormGroup, Label } from 'reactstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFileCsv, faUserPlus, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
// import Papa from 'papaparse';
// import { useTable, usePagination, useGlobalFilter, useFilters, useSortBy } from 'react-table';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Swal from 'sweetalert2';

// // const apiUrl = '${apiUrl}/students';

// function DefaultColumnFilter({ column }) {
//   return null; // Return null to remove the search box
// }

// const TableComponent = () => {
//   const [data, setData] = useState([]);
// const apiUrl = process.env.REACT_APP_API_BASE_URL

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`${apiUrl}/students`);
//         setData(response.data);
//       } catch (error) {
//         Swal.fire({
//           icon: 'error',
//           title: 'Error fetching data'        
//         });
//       }
//     };
//     fetchData();
//   }, []);

//   const exportToCSV = () => {
//     const csv = Papa.unparse(data);
//     const blob = new Blob([csv], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'students.csv';
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//   };

//   const columns = useMemo(() => [
//     { Header: 'Student ID', accessor: 'id', Filter: DefaultColumnFilter },
//     { 
//        Header: 'Name', 
//        accessor: row => `${row.firstName} ${row.middleName ? row.middleName + ' ' : ''}${row.lastName}`,
//        Filter: DefaultColumnFilter 
//     },
//     { Header: 'Mobile', accessor: 'mobile', Filter: DefaultColumnFilter },
//     { Header: 'Email', accessor: 'email', Filter: DefaultColumnFilter },
//     { Header: 'Date of Birth', accessor: 'dob', Filter: DefaultColumnFilter },
//     { Header: 'City', accessor: 'city', Filter: DefaultColumnFilter },
//     { Header: 'Gender', accessor: 'gender', Filter: DefaultColumnFilter },
//     { Header: 'Created By Name', accessor: 'createdByName', Filter: DefaultColumnFilter },
//     {
//       Header: 'Actions',
//       id: 'actions',
//       Cell: ({ row }) => (
//         <div style={{ minWidth: "100px", textAlign: 'center' }}>
//           <Link to={`/register/${row.original.id}`}>
//             <Button color="success">
//               <FontAwesomeIcon icon={faUserPlus} /> Enroll
//             </Button>
//           </Link>
//         </div>
//       )
//     }
    
//   ], []);

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
//       initialState: { pageIndex: 0, pageSize: 10 },
//       autoResetPage: true,
//     },
//     useFilters,
//     useGlobalFilter,
//     useSortBy,
//     usePagination
//   );

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
//             style={{ width: "200px", marginLeft: '10px' }}
//           />
//           <Label for="pageSize" style={{ marginLeft: '10px', marginRight: '5px' }}>Rows per Page:</Label>
//           <Input
//             id="pageSize"
//             type="select"
//             value={pageSize}
//             onChange={(e) => setPageSize(Number(e.target.value))}
//             style={{ width: "80px" }}
//           >
//             {[10, 20, 30, 50, 100].map((size) => (
//               <option key={size} value={size}>
//                 {size}
//               </option>
//             ))}
//           </Input>
//         </div>
//       </div>
//       <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
//         <table {...getTableProps()} style={{ borderCollapse: 'collapse', width: '100%', border: '1px solid #ddd' }}>
//           <thead style={{ position: 'sticky', top: 0, zIndex: 1, background: '#fff' }}>
//             {headerGroups.map((headerGroup) => (
//               <tr {...headerGroup.getHeaderGroupProps()}>
//                 {headerGroup.headers.map((column) => (
//                   <th {...column.getHeaderProps(column.getSortByToggleProps())} style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd', cursor: 'pointer' }}>
//                     {column.render('Header')}
//                     <FontAwesomeIcon icon={faSortUp} style={{ opacity: column.isSorted && column.isSortedDesc ? 1 : 0.3, marginLeft: '5px' }} />
//                     <FontAwesomeIcon icon={faSortDown} style={{ opacity: column.isSorted && !column.isSortedDesc ? 1 : 0.3, marginLeft: '5px' }} />
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
//                     <td {...cell.getCellProps()} style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd' }}>{cell.render('Cell')}</td>
//                   ))}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//       <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', borderTop: '1px solid #ddd', padding: '10px 0' }}>
//         <Button onClick={previousPage} disabled={!canPreviousPage}>
//           {'< Previous'}
//         </Button>
//         <span style={{ margin: '0 10px' }}>
//           Page {pageIndex + 1} of {pageOptions.length}
//         </span>
//         <Button onClick={nextPage} disabled={!canNextPage}>
//           {'Next >'}
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default TableComponent;


import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Input, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCsv, faUserPlus, faSortDown, faSortUp,faEdit} from '@fortawesome/free-solid-svg-icons';
import Papa from 'papaparse';
import { useTable, usePagination, useGlobalFilter, useSortBy } from 'react-table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/students`);
        setData(response.data);
        setFilteredData(response.data); // Initialize filteredData with the fetched data
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error fetching data'        
        });
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filterDataByDate = () => {
      if (startDate && endDate) {
        const filtered = data.filter(item => {
          const itemDate = new Date(item.dob);
          return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
        });
        setFilteredData(filtered);
      } else {
        setFilteredData(data); // If no date range is selected, show all data
      }
    };
    filterDataByDate();
  }, [startDate, endDate, data]);

  const exportToCSV = () => {
    const csv = Papa.unparse(filteredData);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'students.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const columns = useMemo(() => [
    { Header: 'Student ID', accessor: 'id' },
    { 
       Header: 'Name', 
       accessor: row => `${row.firstName} ${row.middleName ? row.middleName + ' ' : ''}${row.lastName}`
    },
    { Header: 'Mobile', accessor: 'mobile' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Date of Birth', accessor: 'dob' },
    { Header: 'City', accessor: 'city' },
    { Header: 'Gender', accessor: 'gender' },
    { Header: 'Created By Name', accessor: 'createdByName' },
    {
      Header: 'Actions',
      id: 'actions',
      Cell: ({ row }) => (
        <div style={{ minWidth: "100px", textAlign: 'center' }}>
          <Link to={`/register/${row.original.id}`}>
            <Button color="success">
              <FontAwesomeIcon icon={faUserPlus} /> Enroll
            </Button>
          </Link>
          <Link to={`/student/${row.original.id}`}>
            
            <Button color="primary" >
            <FontAwesomeIcon icon={faEdit} /> Edit
          </Button>
          </Link>
        </div>
      )
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
      data: filteredData,
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

export default TableComponent;
