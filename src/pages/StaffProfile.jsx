import React, { useEffect } from "react";
import Layout from "./Layout";
import CourseList from "../components/CourseList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
import Sidebar from "../components/Sidebar";
// import MyEnrollments from "../components/ViewMyEnrollments";
import StaffProfile from "../components/StaffProfile";
const MyProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);
  return (
    <div>
      <Sidebar />
      <Layout>
        <StaffProfile />
      </Layout>
    </div>
  );
};

export default MyProfile;
