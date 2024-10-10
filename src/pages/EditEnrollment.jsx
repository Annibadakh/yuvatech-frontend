import React, { useEffect } from "react";
import Layout from "./Layout";
//import FormEditCourse from "../components/FormEditCourse";
import EditEnrollment from "../components/EditEnrollment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const ModifyEnrollment = () => {
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
      <EditEnrollment />
    </Layout>
  );
};

export default ModifyEnrollment;
