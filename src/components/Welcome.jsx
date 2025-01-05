import React, { useState, useEffect } from 'react';

import { useSelector } from "react-redux";
import studentdash from '../assets/studentdash.png';
const Welcome = () => {
  const { user } = useSelector((state) => state.auth);
  const apiUrl = process.env.REACT_APP_API_BASE_URL
  const titleStyle = {
    color:"white"
  };
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 86400000); 

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);
  return (
    <div style={{position:"relative"}}>
      <img style={{width:"100%"}} src={studentdash} alt="" />
      <div style={{position:"absolute", top:"15px", left:"10px"}}>
      <h2 style={{marginBottom:"10px", color:"white"}}>Date: {date.toLocaleDateString()}</h2>
      <h1 className="subtitle" style={titleStyle}>
        Welcome Back {user && user.name}
      </h1>
      
      </div>

    </div>
  );
};

export default Welcome;
