import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ExpenseTracker.css';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import BudgetSorting from './BudgetSorting.jsx';


function BudgetApp() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [userAmount, setUserAmount] = useState('');
  const [productTitle, setProductTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [productTitleError, setProductTitleError] = useState('');
  const [expensedata, setExpensedata] = useState([]); // Ensure this is initialized as an array
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [amountdata, setAmountData] = useState({
    totalamount: 0,
    expenses: 0,
    balance: 0
  });
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const apiurl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    fetchExpenses();
    fetchAmountData();
  }, []);

  const fetchExpenses = () => {
    axios.get(`${apiurl}/expenses/list`)
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Failed to fetch expenses');
        }
        return res.data; // Assuming the response data contains the expenses array directly
      })
      .then(data => {
        console.log('Expenses data fetched successfully:', data);
        // Ensure that data is an array
        setExpensedata(Array.isArray(data.data) ? data.data : []);
      })
      .catch(err => {
        console.error('Error fetching expenses:', err);
        setExpensedata([]); // Set to empty array on error
      });
  };

  const fetchAmountData = () => {
    axios.get(`${apiurl}/amount/list`)
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Failed to fetch amount data');
        }
        return res.data; // Assuming the response data contains the amount data
      })
      .then(data => {
        const fetchedData = data.amountdata[0];
        console.log('Amount data fetched successfully:', fetchedData);
        setAmountData(fetchedData);
      })
      .catch(err => console.error('Error fetching amount data:', err));
  };

  

  const handleTotalAmountButtonClick = () => {
    const newTotalAmount = parseInt(totalAmount);
    if (isNaN(newTotalAmount) || newTotalAmount <= 0) {
      setErrorMessage('Value cannot be empty or negative');
      return;
    }

    const updatedInitialValues = {
      sendtotalamount: amountdata.totalamount + newTotalAmount,
      sendexpenses: amountdata.expenses,
      sendbalance: amountdata.balance + newTotalAmount,
      sendcurrval: newTotalAmount,
      sendamounttype: "Amount",
      sendpaymentid: "externalAmount"
    };

    console.log(updatedInitialValues);
    axios.post(`${apiurl}/amount/initialValues`, updatedInitialValues)
      .then(response => {
        console.log('Total amount stored successfully:', response.data);
        fetchAmountData(); 
      })
      .catch(error => console.error('Error:', error));

    setTotalAmount('');
  };

  const handleCheckAmountButtonClick = async () => {
    try {
      if (!userAmount || !productTitle) {
        setProductTitleError('Values cannot be empty');
        return;
      }

      const newUserAmount = parseInt(userAmount);
      if (isNaN(newUserAmount) || newUserAmount <= 0) {
        setProductTitleError('Amount should be a positive number');
        return;
      }

      let requests;

      if (!selectedExpense) {
        const updatedValues = {
          sendtotalamount: amountdata.totalamount,
          sendexpenses: amountdata.expenses + newUserAmount,
          sendbalance: amountdata.balance - newUserAmount,
          sendcurrval: newUserAmount,
          sendamounttype: "Expense",
          sendpaymentid: "externalExpense"
        };
        console.log(updatedValues);

        requests = [
          axios.post(`${apiurl}/amount/initialValues`, updatedValues),
          axios.post(`${apiurl}/expenses/send`, {
            sendtitle: productTitle,
            sendamount: newUserAmount
          })
        ];
      } else {
        const diff = newUserAmount - selectedExpense.amount;
        const updatedExpensesValues = {
          sendtotalamount: amountdata.totalamount,
          sendexpenses: amountdata.expenses + diff,
          sendbalance: amountdata.balance - diff,
          sendcurrval: diff,
          sendamounttype: "Expense",
          sendpaymentid: "externalExpense"
        };

        requests = [
          axios.post(`${apiurl}/amount/initialValues`, updatedExpensesValues),
          axios.put(`${apiurl}/expenses/update/${selectedExpense.id}`, {
            sendtitle: productTitle,
            sendamount: newUserAmount
          })
        ];
      }

      await Promise.all(requests);
      fetchAmountData();
      fetchExpenses();
      setProductTitle('');
      setUserAmount('');
      setSelectedExpense(null);
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        setProductTitleError('An error occurred while processing your request. Please try again.');
      }
    }
  };

  const handleEditExpense = (data) => {
    setSelectedExpense(data);
    setProductTitle(data.title);
    setUserAmount(data.amount.toString());
  };

  // Ensure expensedata is always an array for filtering
  const filteredExpenses = expensedata.filter((data) => {
    if (!fromDate && !toDate) {
        // No filters applied, show all expenses
        return true;
    }

    const expenseDate = new Date(data.currdate);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;
    return (!from || expenseDate >= from) && (!to || expenseDate <= to);
});



  return (
    <div className="wrapper">
      <div><BudgetSorting /></div>
      <div className="container">
        <div className="sub-container">
          <div className="total-amount-container">
            <h3>Budget</h3>
            <p className={errorMessage ? '' : 'hide'}>{errorMessage}</p>
            <input
              type="number"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
              placeholder="Enter Total Amount"
            />
            <button className="submit" onClick={handleTotalAmountButtonClick}>
              Set Budget
            </button>
          </div>

          

          <div className="user-amount-container">
            <h3>Expenses</h3>
            <p className={productTitleError ? '' : 'hide'}>{productTitleError}</p>
            <input
              type="text"
              value={productTitle}
              onChange={(e) => setProductTitle(e.target.value)}
              placeholder="Enter Title of Product"
            />
            <input
              type="number"
              value={userAmount}
              onChange={(e) => setUserAmount(e.target.value)}
              placeholder="Enter Cost of Product"
            />
            <button className="submit" onClick={handleCheckAmountButtonClick}>
              {selectedExpense ? 'Update Expense' : 'Add Expense'}
            </button>
          </div>
        </div>

        <div className="output-container flex-space">
          <div>
            <p>Total Budget</p>
            <span id="amount">{amountdata.totalamount}</span>
          </div>
          <div>
            <p>Expenses</p>
            <span id="expenditure-value">{amountdata.expenses}</span>
          </div>
          <div>
            <p>Balance</p>
            <span id="balance-amount">{amountdata.balance}</span>
          </div>
        </div>
      </div>

      
      <div className="list">
        <h3>Expense List</h3>
        <div className="date-filter">
          <label>
            From:
            <input
              style={{width:"150px"}}
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </label>
          <label>
            To:
            <input
              style={{width:"150px"}}
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </label>
        </div>
        <div className="list-container" id="list">
        <div className='sublist-title'>
            <p>Sr No.</p>
            <p>ID</p>
            <p>Title</p>
            <p>Amount</p>
            <p>Date</p>
            <p>Time</p>
            <p>Edit</p>
          </div>
          {filteredExpenses.slice().reverse().map((data, i) => (
            <div key={data.id} className="sublist-content flex-space"> {/* Use unique key */}
                <p>{i + 1}</p>
                <p className="id">{data.id}</p>
                <p className="product">{data.title}</p>
                <p className="amount">{data.amount}</p>
                <p className="date">{new Date(data.currdate).toISOString().split('T')[0]}</p>
                <p className="time">{data.currtime}</p>
                {/* <button onClick={() => handleEditExpense(data)} className='submit'>Edit</button> */}
                <Button color="primary" onClick={() => handleEditExpense(data)} className='submit' style={{ marginRight: '5px' }}>
              <FontAwesomeIcon icon={faEdit} />
            </Button>
            </div>
        ))}
        </div>
      </div>
      
    </div>
  );
}

export default BudgetApp;
