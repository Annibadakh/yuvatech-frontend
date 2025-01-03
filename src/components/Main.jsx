import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Ensure axios is installed
import '../index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign, faUsers } from '@fortawesome/free-solid-svg-icons';

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
        minHeight: "120px"
    };

    const iconStyle = {
        fontSize: '40px',
        float: 'left'
    };

    return (
        <div className="col-md-4 col-xl-3">
            <div style={cardStyle} className="card order-card">
                <div className="card-block" style={{display: "flex", flexFlow:"row", gap:"20px", justifyContent:"space-evenly"}}>
                    <h2>
                        <FontAwesomeIcon style={iconStyle} icon={icon} />
                        
                    </h2>
                    <div><span style={{color:"black"}}>{amount}</span>
                    <p>{description}</p></div>
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
            {/* <div className="head-title">
                <div className="left">
                    <h1>Dashboard</h1>
                </div>
            </div> */}
            <ul className="box-info">
                <div className="row" style={{justifyContent:'center'}}>
                    <FinancialCard
                        color="linear-gradient(45deg,#4099ff,#73b4ff)"
                        icon={faIndianRupeeSign} // Updated icon
                        amount={financials.totalReceivedByUser}
                        description="Amount"
                    />
                    <FinancialCard
                        color="linear-gradient(45deg,#2ed8b6,#59e0c5)"
                        icon={faIndianRupeeSign} // Updated icon
                        amount={financials.totalBalanceByUser}
                        description="My Total Balance"
                    />
                    <FinancialCard
                        color="linear-gradient(45deg,#FFB64D,#ffcb80)"
                        icon={faUsers} // Retained existing icon
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
                            icon={faIndianRupeeSign} // Updated icon
                            amount={financials.totalReceivedAll}
                            description="Total Amount of All Branches"
                        />
                        <FinancialCard
                            color="linear-gradient(45deg,#FF5370,#ff869a)"
                            icon={faIndianRupeeSign} // Updated icon
                            amount={financials.totalBalance}
                            description="Total Balance of All Branches"
                        />
                        <FinancialCard
                            color="linear-gradient(45deg,#FFB64D,#ffcb80)"
                            icon={faUsers} // Retained existing icon
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
