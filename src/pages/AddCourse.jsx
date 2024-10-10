import React, { useEffect } from "react";
import Layout from "./Layout";
import FormAddCourse from "../components/FormAddCourse";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
import FileUpload from "../components/FileUpload";

const AddCourse = () => {
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
    <Layout>
      <FormAddCourse />
    </Layout>
  );
};

export default AddCourse;
