import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const BudgetSorting = () => {
    const [years, setYears] = useState([]); // Available years for the year dropdown
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Default to current year
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Default to current month
    const [entries, setEntries] = useState([]); // All entries fetched from API
    const [amount, setAmount] = useState(0); // Total amount for selected month
    const [expense, setExpense] = useState(0); // Total expense for selected month
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state
 
    const apiurl = process.env.REACT_APP_API_BASE_URL;
    // Fetch available years (you can modify this if needed)
    useEffect(() => {
        const currentYear = new Date().getFullYear();
        const availableYears = [];
        for (let year = 2020; year <= currentYear; year++) {
            availableYears.push(year);
        }
        setYears(availableYears);
    }, []);

    // Fetch all data from the backend based on selected year and month
    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${apiurl}/amount/totallist`);
            console.log(response.data);
            setEntries(response.data); // Store all fetched entries
            processData(response.data); // Process data to calculate totals
        } catch (err) {
            setError('Failed to fetch data. Please try again.');
        }
        setLoading(false);
    };

    // Process the data to calculate total amount and total expense
    const processData = (data) => {
        // Filter data based on selected year and month
        console.log("Amount list is here", data);
        const filteredData = data.amountlist.filter(entry => {
            const entryDate = new Date(entry.currdate);
            return entryDate.getFullYear() === selectedYear && entryDate.getMonth() + 1 === selectedMonth;
        });
        console.log("filtered data",filteredData);

        // Initialize sums for amount and expense
        let totalAmount = 0;
        let totalExpense = 0;

        // Aggregate the total amount and expense by checking AmountType
        filteredData.forEach(entry => {
            if (entry.amountType === 'Amount') {
                totalAmount += entry.currValue;
            } else if (entry.amountType === 'Expense') {
                totalExpense += entry.currValue;
            }
        });
        console.log(totalAmount, totalExpense);

        setAmount(totalAmount);
        setExpense(totalExpense);
    };

    // Trigger data fetch when year or month is changed
    useEffect(() => {
        fetchData();
    }, [selectedYear, selectedMonth]);

    // Pie chart data and options
    const pieChartData = {
        labels: ['Amount', 'Expense'],
        datasets: [
            {
                data: [amount, expense],
                backgroundColor: ['#36A2EB', '#FF6384'],
                hoverOffset: 4,
            },
        ],
    };

    const pieChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const value = context.raw;
                        return `${context.label}: ₹${value.toFixed(2)}`;
                    },
                },
            },
        },
    };

    return (
        <div className="p-4" style={{display:"flex", justifyContent:"space-between", padding:"100px"}}>
            <div>
            <h1 className="text-2xl font-bold mb-4">Monthly Amount and Expense</h1>

            {/* Year Selector */}
            <div className="mb-4">
                <label htmlFor="year" className="block text-sm font-medium">
                    Select Year:
                </label>
                <select
                    id="year"
                    className="p-2 border rounded w-full"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                >
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="month" className="block text-sm font-medium">
                    Select Month:
                </label>
                <select
                    id="month"
                    className="p-2 border rounded w-full"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                        <option key={month} value={month}>
                            {new Date(0, month - 1).toLocaleString('default', { month: 'long' })}
                        </option>
                    ))}
                </select>
            </div>
            </div>

            {/* Month Selector */}
            

            {/* Data Display */}
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="mt-4">
                    <p>
                        <strong>Amount: ₹</strong>{amount || 0}
                    </p>
                    <p>
                        <strong>Expense: ₹</strong>{expense || 0}
                    </p>

                    {/* Pie Chart */}
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-4">Amount vs Expense</h2>
                        <Pie data={pieChartData} options={pieChartOptions} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default BudgetSorting;
