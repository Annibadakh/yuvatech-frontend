
import React, { useEffect } from "react";
import Layout from "./Layout.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice.js";
import Sidebar from "../components/Sidebar.jsx";
import MyTransactions from "../components/MyTransactions.jsx";
const PaymentDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      console.error("Error fetching user data. Navigating to login page.");
      navigate("/");
    }
    
  }, [isError, user, navigate]); // Include user in the dependency array


  return (
    <div>
      <Sidebar />
      <Layout>
        <MyTransactions />
      </Layout>
    </div>
  );
};

export default PaymentDetails;
