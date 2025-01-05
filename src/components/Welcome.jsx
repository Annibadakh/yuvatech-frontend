import React, { useState, useEffect } from 'react';

import { useSelector } from "react-redux";
import studentdash from '../assets/education.jpg';
const Welcome = () => {
  const { user } = useSelector((state) => state.auth);
  const apiUrl = process.env.REACT_APP_API_BASE_URL
  const titleStyle = {
    color:"black"
  };
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 86400000); 

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);
  return (
    <div style={{position:"relative", display:"flex", justifyContent:"end", alignContent:"center", padding:"20px"}}>
      <img style={{height:"350px", width:"auto"}} src={studentdash} alt="" />
      <div style={{position:"absolute", top:"50px", left:"10px"}}>
      <h2 style={{marginBottom:"10px", color:"black"}}>Date: {date.toLocaleDateString()}</h2>
      <h1 className="subtitle" style={titleStyle}>
        Welcome Back {user && user.name}
      </h1>
      
      </div>

    </div>
  );
};

export default Welcome;
