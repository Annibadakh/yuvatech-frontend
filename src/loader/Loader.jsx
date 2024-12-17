import React from "react";
import "./Loader.css"; // Style the loader

const Loader = () => (
  <div className="loader-overlay">
    <div className="spinner"></div>
    <h1>Loading...</h1>
  </div>
);

export default Loader;
