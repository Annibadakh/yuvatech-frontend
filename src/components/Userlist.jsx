// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import { Button, Input } from "reactstrap";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import { faEdit, faTrashAlt, faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
// // import { Link } from "react-router-dom";
// // import "bootstrap/dist/css/bootstrap.min.css";

// // const Userlist = () => {
// //     const [users, setUsers] = useState([]);
// //     const [searchTerm, setSearchTerm] = useState("");
// //     const [currentPage, setCurrentPage] = useState(1);
// //     const [pageSize, setPageSize] = useState(10);
// //     const [sortColumn, setSortColumn] = useState(null);
// //     const [sortDirection, setSortDirection] = useState(null);
// //     const apiUrl = process.env.REACT_APP_API_BASE_URL

// //     useEffect(() => {
// //         getUsers();
// //     }, [currentPage, pageSize, sortColumn, sortDirection]);

// //     const getUsers = async () => {
// //         try {
// //             const response = await axios.get(`${apiUrl}/users`);
// //             setUsers(response.data);
// //         } catch (error) {
// //             // console.error("Error fetching users:", error);
// //         }
// //     };

// //     const deleteUser = async (userId) => {
// //         try {
// //             await axios.delete(`${apiUrl}/users/${userId}`);
// //             getUsers();
// //         } catch (error) {
// //             // console.error("Error deleting user:", error);
// //         }
// //     };

// //     const handleSort = (column) => {
// //         if (column === sortColumn) {
// //             setSortDirection(sortDirection === "asc" ? "desc" : "asc");
// //         } else {
// //             setSortColumn(column);
// //             setSortDirection("asc");
// //         }
// //     };

// //     const sortedUsers = sortColumn
// //         ? [...users].sort((a, b) => {
// //               const aValue = a[sortColumn];
// //               const bValue = b[sortColumn];
// //               if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
// //               if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
// //               return 0;
// //           })
// //         : users;

// //     const filteredUsers = sortedUsers.filter((user) =>
// //         Object.values(user).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase()))
// //     );

// //     const totalPages = Math.ceil(filteredUsers.length / pageSize);
// //     const paginatedUsers = filteredUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize);
// //     const titleStyle = {
// //         fontFamily: 'Times New Roman, Times, serif'
// //       };
// //     return (
// //         <div style={{ maxWidth: "100%", margin: "0 auto", border: "1px solid #ccc", borderRadius: "5px", padding: "10px", textAlign: "center", overflowX: "auto" }}>
// //         <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "10px" }}>
// //             <h2  style={{ marginBottom: "0",titleStyle }}>Users</h2>
// //                 <Link to="/users/add">
// //                     <Button color="primary" style={{marginLeft:"50px"}}>Add New User</Button>
// //                 </Link>
// //             <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
// //                 <Input
// //                     placeholder="Search by name or email..."
// //                     onChange={(e) => setSearchTerm(e.target.value)}
// //                     style={{ width: "200px" }}
// //                 />
                
// //                 <span style={{ marginLeft: "10px" }}>Rows per page:</span>
// //                 <Input
// //                     type="select"
// //                     value={pageSize}
// //                     onChange={(e) => setPageSize(Number(e.target.value))}
// //                     style={{ width: "80px", marginLeft: "5px" }}
// //                 >
// //                     {[5, 10, 20, 50, 100].map((size) => (
// //                         <option key={size} value={size}>
// //                             {size}
// //                         </option>
// //                     ))}
// //                 </Input>
// //             </div>
// //         </div>

// //             <table style={{ borderCollapse: 'collapse', width: '100%' }}>
// //                 <thead>
// //                     <tr>
// //                         <th style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd', cursor: 'pointer' }} onClick={() => handleSort('name')}>
// //                             Sr. No.
// //                         </th>
// //                         <th style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd', cursor: 'pointer' }} onClick={() => handleSort('name')}>
// //                             Name
// //                             <FontAwesomeIcon icon={faArrowUp} style={{ opacity: sortColumn === 'name' && sortDirection === 'asc' ? 1 : 0.5 }} />
// //                             <FontAwesomeIcon icon={faArrowDown} style={{ opacity: sortColumn === 'name' && sortDirection === 'desc' ? 1 : 0.5 }} />
// //                         </th>
// //                         <th style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd', cursor: 'pointer' }} onClick={() => handleSort('email')}>
// //                             Email
// //                             <FontAwesomeIcon icon={faArrowUp} style={{ opacity: sortColumn === 'email' && sortDirection === 'asc' ? 1 : 0.5 }} />
// //                             <FontAwesomeIcon icon={faArrowDown} style={{ opacity: sortColumn === 'email' && sortDirection === 'desc' ? 1 : 0.5 }} />
// //                         </th>
// //                         <th style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd' }}>Role</th>
// //                         <th style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd' }}>Password</th>
// //                         <th style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd' }}>Actions</th>
// //                     </tr>
// //                 </thead>
// //                 <tbody>
// //                     {paginatedUsers.map((user, index) => (
// //                         <tr key={user.uuid}>
// //                             <td style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd' }}>{(currentPage - 1) * pageSize + index + 1}</td>
// //                             <td style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd' }}>{user.name}</td>
// //                             <td style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd' }}>{user.email}</td>
// //                             <td style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd' }}>{user.role}</td>
// //                             <td style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd' }}>{user.copyofpassword}</td>
// //                             <td style={{ fontSize: '14px', padding: '8px 10px', whiteSpace: 'nowrap', borderBottom: '1px solid #ddd' }}>
// //                                 <Link to={`/users/edit/${user.uuid}`} style={{ marginRight: '5px' }}>
// //                                     <Button color="info" size="sm">
// //                                         <FontAwesomeIcon icon={faEdit} /> Edit
// //                                     </Button>
// //                                 </Link>
// //                                 <Button color="danger" size="sm" onClick={() => deleteUser(user.uuid)}>
// //                                     <FontAwesomeIcon icon={faTrashAlt} /> Delete
// //                                 </Button>
// //                             </td>
// //                         </tr>
// //                     ))}
// //                 </tbody>
// //             </table>
// //             <div style={{ textAlign: "center", marginTop: "20px" }}>
// //                 <Button onClick={() => setCurrentPage((prevPage) => prevPage - 1)} disabled={currentPage === 1}>
// //                     Previous
// //                 </Button>{" "}
// //                 {Array.from({ length: totalPages }, (_, index) => (
// //                     <Button key={index + 1} onClick={() => setCurrentPage(index + 1)} style={{ margin: "2px" }} disabled={currentPage === index + 1}>
// //                         {index + 1}
// //                     </Button>
// //                 ))}
// //                 <Button
// //                     onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
// //                     disabled={paginatedUsers.length < pageSize || currentPage === totalPages}
// //                 >
// //                     Next
// //                 </Button>
// //             </div>
// //         </div>
// //     );
// // };

// // export default Userlist;


// import React, { useEffect, useMemo, useState } from 'react';
// import axios from 'axios';
// import { Button, Input, Label } from 'reactstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit, faTrashAlt, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
// import { useTable, usePagination, useGlobalFilter, useFilters, useSortBy } from 'react-table';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Swal from 'sweetalert2';
// import { useNavigate, Link } from 'react-router-dom';

// const apiUrl = process.env.REACT_APP_API_BASE_URL;

// const DefaultColumnFilter = () => null; // Return null to remove the search box

// const UserList = () => {
//   const [data, setData] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`${apiUrl}/users`);
//       const usersWithSrNo = response.data.map((user, index) => ({ ...user, srNo: index + 1 }));
//       setData(usersWithSrNo);
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error fetching data',
//       });
//     }
//   };

//   const handleDelete = async (userId) => {
//     try {
//       await axios.delete(`${apiUrl}/users/${userId}`);
//       fetchData(); // Refresh data after deletion
//       Swal.fire({
//         icon: 'success',
//         title: 'User deleted successfully',
//       });
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error deleting user',
//       });
//     }
//   };

//   const columns = useMemo(
//     () => [
//       { Header: 'Sr. No', accessor: 'srNo', disableFilters: true },
//       { Header: 'Name', accessor: 'name', Filter: DefaultColumnFilter },
//       { Header: 'Email', accessor: 'email', Filter: DefaultColumnFilter },
//       { Header: 'Role', accessor: 'role', Filter: DefaultColumnFilter },
//       { Header: 'Password', accessor: 'copyofpassword', Filter: DefaultColumnFilter },
//       {
//         Header: 'Actions',
//         accessor: 'actions',
//         disableSortBy: true,
//         Cell: ({ row }) => (
//           <div>
//             <Link to={`/users/edit/${row.original.uuid}`} style={{ marginRight: '5px' }}>
//               <Button color="primary">
//                 <FontAwesomeIcon icon={faEdit} /> Edit
//               </Button>
//             </Link>
//             <Button color="danger" onClick={() => handleDelete(row.original.uuid)}>
//               <FontAwesomeIcon icon={faTrashAlt} /> Delete
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
//             id: 'name',
//             desc: false,
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
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
//         <Input
//           value={globalFilter || ''}
//           onChange={(e) => setGlobalFilter(e.target.value)}
//           placeholder="Search all columns..."
//           style={{ width: '200px' }}
//         />
//         <Label for="pageSize" style={{ marginLeft: '10px', marginRight: '5px' }}>
//           Rows per Page:
//         </Label>
//         <Input
//           id="pageSize"
//           type="select"
//           value={pageSize}
//           onChange={(e) => setPageSize(Number(e.target.value))}
//           style={{ width: '80px' }}
//         >
//           {[10, 20, 30, 50, 100].map((size) => (
//             <option key={size} value={size}>
//               {size}
//             </option>
//           ))}
//         </Input>
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

// export default UserList;


import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Button, Input, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faSortUp, faSortDown,faFileCsv } from '@fortawesome/free-solid-svg-icons';
import { useTable, usePagination, useGlobalFilter, useFilters, useSortBy } from 'react-table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import { format } from 'date-fns';

const apiUrl = process.env.REACT_APP_API_BASE_URL;

const DefaultColumnFilter = () => null; // Return null to remove the search box

const UserList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const navigate = useNavigate();  
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
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
  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/users`);
      const usersWithSrNo = response.data.map((user, index) => ({ ...user, srNo: index + 1 }));
      setData(usersWithSrNo);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error fetching data',
      });
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`${apiUrl}/users/${userId}`);
      fetchData(); // Refresh data after deletion
      Swal.fire({
        icon: 'success',
        title: 'User deleted successfully',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error deleting user',
      });
    }
  };

  const columns = useMemo(
    () => [
      { Header: 'Sr. No', accessor: 'srNo', disableFilters: true },
      { Header: 'Name', accessor: 'name', Filter: DefaultColumnFilter },
      { Header: 'Email', accessor: 'email', Filter: DefaultColumnFilter },
      { Header: 'Role', accessor: 'role', Filter: DefaultColumnFilter },
      // { Header: 'Password', accessor: 'copyofpassword', Filter: DefaultColumnFilter },
      {
        Header: 'Date Created',
        accessor: 'createdAt',
        Filter: DefaultColumnFilter,
        Cell: ({ value }) => format(new Date(value), 'dd-MM-yyyy'),
      },      {
        Header: 'Actions',
        accessor: 'actions',
        disableSortBy: true,
        Cell: ({ row }) => (
          <div>
            <Link to={`/users/edit/${row.original.uuid}`} style={{ marginRight: '5px' }}>
              <Button color="primary">
                <FontAwesomeIcon icon={faEdit} /> Edit
              </Button>
            </Link>
            <Button color="danger" onClick={() => handleDelete(row.original.uuid)}>
              <FontAwesomeIcon icon={faTrashAlt} /> Delete
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
  } = useTable(
    {
      columns,
      data: filteredData,
      initialState: {
        pageIndex: 0,
        pageSize: 10,
        sortBy: [
          {
            id: 'name',
            desc: false,
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

  return (
    <div>
        


        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'nowrap' }}>
        {/* <Button onClick={exportToCSV} style={{ marginRight: '10px' }}>
          <FontAwesomeIcon icon={faFileCsv} /> Export to CSV
        </Button> */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end', gap: '10px' }}>
  
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
  <Link to="/users/add">
                     <Button color="primary" style={{marginLeft:"50px"}}>Add New User</Button>
                </Link>
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

export default UserList;
