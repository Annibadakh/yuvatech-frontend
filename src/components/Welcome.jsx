import React from "react";
import { useSelector } from "react-redux";
const Welcome = () => {
  const { user } = useSelector((state) => state.auth);
  const apiUrl = process.env.REACT_APP_API_BASE_URL
  const titleStyle = {
    fontFamily: 'Times New Roman, Times, serif'
  };
  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1.5rem',
    backgroundColor: '#1a202c',
    minHeight: '100vh'
  };
  
  const cardStyle = (bgColor, textColor, gradientFrom, gradientTo) => ({
    padding: '1.25rem',
    background: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
    borderRadius: '0.5rem',
    position: 'relative',
    overflow: 'hidden',
    color: textColor
  });
  
  const svgStyle = {
    position: 'absolute',
    right: '0',
    bottom: '0',
    height: '8rem',
    width: '8rem',
    marginRight: '-2rem',
    marginBottom: '-2rem',
    opacity: '0.5'
  };
  // Example statistics for demonstration
  const statistics = [
    { label: "Total Users", value: 100 },
    { label: "Active Users", value: 80 },
    { label: "Inactive Users", value: 20 },
  ];

  return (
    <div>
      <h2 className="title">Dashboard</h2>
      <h2 className="subtitle" style={titleStyle}>
        Welcome Back <strong>{user && user.name}</strong>
      </h2>
      <ul className="box-info">

      
        </ul>

    </div>
  );
};

export default Welcome;
