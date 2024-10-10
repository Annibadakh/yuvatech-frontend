import React from "react";
import { useSelector } from "react-redux";

const Error = () => {
  const { user } = useSelector((state) => state.auth);


  return (
    <div>
      <h1 className="title">Dashboard</h1>
      <h1 className="subtitle">
        Welcome Back Error 404 <br />
        Page not found
      </h1>

    </div>
  );
};

export default Error;
