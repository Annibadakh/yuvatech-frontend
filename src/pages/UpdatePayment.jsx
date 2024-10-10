import React, { useEffect } from "react";
import Layout from "./Layout.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice.js";
import UpdatePayment from "../components/UpdatePayment.jsx";

const UpdatePayments = () => {
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
    if (user && user.role !== "admin" && user.role !== "user") {
        console.error("User is not an admin or user. Redirecting to dashboard.");
        navigate("/dashboard");
      }
      
  }, [isError, user, navigate]); // Include user in the dependency array
  

  // console.log("Rendering AddPayments component...");

    
  return (
    <Layout>
      <UpdatePayment/>
    </Layout>
  );
};

export default UpdatePayments;

