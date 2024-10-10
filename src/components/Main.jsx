
// import React, { useEffect, useState } from 'react';
// import axios from 'axios'; // Ensure axios is installed
// //import RecentOrders from './RecentOrders';
// // import { recentOrdersData } from '../data/data';
// // import '../styles/index.css';
// import '../index.css';
// const Main = () => {
//     const apiUrl = process.env.REACT_APP_API_BASE_URL

//     const [financials, setFinancials] = useState({
//         totalReceivedAll: 0,
//         totalReceivedByUser: 0,
//         totalBalance: 0,
//         totalBalanceByUser:0
        
//     });
  

//     const [totalEnrollments, setTotalEnrollments] = useState(0);

//     useEffect(() => {
//         const fetchFinancials = async () => {
//             try {
//                 const response = await axios.get(`${apiUrl}/financials`);
//                 setFinancials(response.data);
//             } catch (error) {
//                 // console.error('Failed to fetch financial data:', error);
//             }
//         };

//         const fetchTotalEnrollments = async () => {
//             try {
//                 const response = await axios.get(`${apiUrl}/totalenrollments`);
//                 setTotalEnrollments(response.data); // Adjust according to the actual response structure
//             } catch (error) {
//                 // console.error('Failed to fetch total enrollments:', error);
//             }
//         };

//         fetchFinancials();
//         fetchTotalEnrollments();
//     }, []);
//     const titleStyle = {
//         fontFamily: 'Times New Roman, Times, serif'
//       };
//     return (
//         <main>
//             <div className="head-title">
//                 <div className="left">
//                     <h1 style={titleStyle}>Dashboard</h1>

//                 </div>
//             </div>
//             <ul className="box-info">
                
                
//                 <li>
                    // <i className='bx bxs-dollar-circle'></i>
//                     <span className="text">
//                         <h3>{financials.totalReceivedByUser}</h3>
//                         <p>Amount </p>
//                     </span>
//                 </li>
//                 <li>
//                     <i className='bx bxs-dollar-circle'></i>
//                     <span className="text">
//                         <h3>{financials.totalBalanceByUser}</h3>
//                         <p>My Total Balance </p>
//                     </span>
//                 </li>
                
//                 <li>
//                     <i className='bx bxs-group'></i>
//                     <span className="text">
//                         <h3>{totalEnrollments.totalbyUser}</h3>
//                         <p> My Total Enrollments</p>
//                     </span>
//                 </li>
//             </ul>
      
//                 {financials.isAdmin && (
//                    <ul className="box-info">
//                         <li>
//                             <i className='bx bxs-dollar-circle'></i>
//                             <span className="text">
//                                 <h3>{financials.totalReceivedAll}</h3>
//                                 <p>Total Amount of All Branches</p>
//                             </span>
//                         </li>
//                         <li>
//                             <i className='bx bxs-dollar-circle'></i>
//                             <span className="text">
//                                 <h3>{financials.totalBalance}</h3>
//                                 <p>Total Balance of All Branches</p>
//                             </span>
//                         </li>
//                         <li>
//                             <i className='bx bxs-group'></i>
//                             <span className="text">
//                                 <h3>{totalEnrollments.total}</h3>
//                                 <p>Total Enrollments</p>
//                             </span>
//                         </li>
//                     </ul>
//                 )}
//                 {/* <li>
//                     <i className='bx bxs-dollar-circle'></i>
//                     <span className="text">
//                         <h3>{financials.totalBalance ?? 'N/A'}</h3>
//                         <p>Balance</p>
//                     </span>
//                 </li> */}
                
            
           
//         </main>
//     );
// };

// export default Main;
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Ensure axios is installed
import '../index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faUsers } from '@fortawesome/free-solid-svg-icons';

const FinancialCard = ({ color, icon, amount, description }) => {
    const cardStyle = {
        color: '#fff',
        borderRadius: '5px',
        boxShadow: '0 1px 2.94px 0.06px rgba(4, 26, 55, 0.16)',
        border: 'none',
        marginBottom: '30px',
        transition: 'all 0.3s ease-in-out',
        background: color,
        textAlign: 'right',
        padding: '25px',
        fontFamily: 'Times New Roman, Times, serif',
        minWidth: "220px",
        minHeight: "150px"
    };

    const iconStyle = {
        fontSize: '50px',
        float: 'left'
    };

    return (
        <div className="col-md-4 col-xl-3">
            <div style={cardStyle} className="card order-card">
                <div className="card-block">
                    <h2><i style={iconStyle} className={`bx ${icon}`}></i><span>{amount}</span></h2>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
};


// export default FinancialCard;

const Main = () => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    const [financials, setFinancials] = useState({
        totalReceivedAll: 0,
        totalReceivedByUser: 0,
        totalBalance: 0,
        totalBalanceByUser: 0,
        isAdmin: false
    });

    const [totalEnrollments, setTotalEnrollments] = useState(0);

    useEffect(() => {
        const fetchFinancials = async () => {
            try {
                const response = await axios.get(`${apiUrl}/financials`);
                setFinancials(response.data);
            } catch (error) {
                // Handle error
            }
        };

        const fetchTotalEnrollments = async () => {
            try {
                const response = await axios.get(`${apiUrl}/totalenrollments`);
                setTotalEnrollments(response.data); // Adjust according to the actual response structure
            } catch (error) {
                // Handle error
            }
        };

        fetchFinancials();
        fetchTotalEnrollments();
    }, [apiUrl]);

    return (
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>Dashboard</h1>
                </div>
            </div>
            <ul className="box-info">
                <div className="row" style={{justifyContent:'center'}}>
                    <FinancialCard
                        color="linear-gradient(45deg,#4099ff,#73b4ff)"
                        icon="bxs-dollar-circle"
                        amount={financials.totalReceivedByUser}
                        description="Amount"
                    />
                    <FinancialCard
                        color="linear-gradient(45deg,#2ed8b6,#59e0c5)"
                        icon="bxs-dollar-circle"
                        amount={financials.totalBalanceByUser}
                        description="My Total Balance"
                    />
                    <FinancialCard
                        color="linear-gradient(45deg,#FFB64D,#ffcb80)"
                        icon="bxs-group"
                        amount={totalEnrollments.totalbyUser}
                        description="My Total Enrollments"
                    />
                </div>
            </ul>

            {financials.isAdmin && (
                <ul className="box-info">
                    <div className="row" style={{justifyContent:'center'}}>
                        <FinancialCard
                            color="linear-gradient(45deg,#FF5370,#ff869a)"
                            icon="bxs-dollar-circle"
                            amount={financials.totalReceivedAll}
                            description="Total Amount of All Branches"
                        />
                        <FinancialCard
                            color="linear-gradient(45deg,#FF5370,#ff869a)"
                            icon="bxs-dollar-circle"
                            amount={financials.totalBalance}
                            description="Total Balance of All Branches"
                        />
                        <FinancialCard
                            color="linear-gradient(45deg,#FFB64D,#ffcb80)"
                            icon="bxs-group"
                            amount={totalEnrollments.total}
                            description="Total Enrollments"
                        />
                    </div>
                </ul>
            )}
        </main>

    );
};

export default Main;
