import React, { useEffect } from "react";
import Layout from "./Layout";
import CourseList from "../components/CourseList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
import Sidebar from "../components/Sidebar";
// import MyEnrollments from "../components/ViewMyEnrollments";
import Profile from "../components/Profile";
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
        <Profile />
      </Layout>
    </div>
  );
};

export default MyProfile;
