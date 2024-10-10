import React, { useEffect } from "react";
import Layout from "./Layout.jsx";
import Welcome from "../components/Welcome.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice.js";
import Sidebar from "../components/Sidebar.jsx";
import Main from "../components/Main.jsx";
import Navbar from "../components/Navbar.jsx";
import Error from "../components/Error.jsx";
const Errors = () => {
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
      <Error/>

    </div>
    // <Layout >
    //   <section id="content">
    //    <Main/>
    //   </section>

    // </Layout>
  );
};

export default Errors;
