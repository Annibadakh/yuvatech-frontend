import React, { useEffect } from "react";
import Layout from "./Layout";
import BlogInput from "../components/BlogInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
import Sidebar from "../components/Sidebar";
import Profile from "../components/Profile";
const BlogInputPage = () => {
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
        <BlogInput />
      </Layout>
    </div>
  );
};

export default BlogInputPage;