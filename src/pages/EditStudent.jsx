import React, { useEffect } from "react";
import Layout from "./Layout.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice.js";
// import StudentRegistration from "../components/StudentRegistration.jsx";
import EditStudent from "../components/EditStudent.jsx";
import RegistrationForm from "../components/UploadDocuments.jsx";
import Sidebar from "../components/Sidebar.jsx";

const EnrollStudent = () => {
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

  // console.log("Rendering EnrollStudent component...");

  return (
    <div>
      <Sidebar />
      <Layout>
        <EditStudent />
      </Layout>
    </div>
  );
};

export default EnrollStudent;
