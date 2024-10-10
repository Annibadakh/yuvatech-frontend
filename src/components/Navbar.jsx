
import React, { useState, useEffect } from 'react';
import useSidebar from '../hooks/useSidebar';
import { useSidebarContext } from '../features/SidebarContext';
import { LogOut, reset } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from 'react-router-dom';






function Navbar() {
    const [showSearch, setShowSearch] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Retrieve the dark mode setting from localStorage or default to false
        return localStorage.getItem('darkMode') === 'true';
    });
    const [isSidebarHidden, setSidebarHidden] = useSidebar();
  const dispatch = useDispatch();
  const navigate = useNavigate();



    // Toggle the sidebar's visibility
    // Toggle the sidebar's visibility
    const { toggleSidebar } = useSidebarContext();

    const apiUrl = process.env.REACT_APP_API_BASE_URL

    // Toggle the search visibility on small screens
    const toggleSearch = (e) => {
        e.preventDefault(); // Prevent the form submission
        setShowSearch(prev => !prev);
    };

    // Toggle dark mode and update the body class
    const toggleDarkMode = () => {
        setIsDarkMode(prev => {
            const newMode = !prev;
            document.body.classList.toggle('dark', newMode);
            // Save the new dark mode setting to localStorage
            localStorage.setItem('darkMode', newMode);
            return newMode;
        });
    };

    // Adjust sidebar and search visibility on window resize
    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 576 && showSearch) {
                setShowSearch(false);
            }
            if (window.innerWidth >= 768 && isSidebarHidden) {
                setSidebarHidden(false);
            } else if (window.innerWidth < 768 && !isSidebarHidden) {
                setSidebarHidden(true);
            }
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
        // console.log("sidebar changed")
    }, [showSearch, isSidebarHidden]);
    const handleLogout = () => {
        dispatch(LogOut());
    dispatch(reset());
    navigate("/");
        console.log("Logout clicked");
    };
    // Set initial body class for dark mode
    useEffect(() => {
        document.body.classList.toggle('dark', isDarkMode);
    }, [isDarkMode]);
    const titleStyle = {
        fontFamily: 'Times New Roman, Times, serif'
      };
    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
            <i className="bx bx-menu" onClick={toggleSidebar}></i>
            {/* <a href="#" className="nav-link">Categories</a> */}
           {/* <form action="#" onSubmit={toggleSearch}>
                <div className="form-input">
                    <input type="search" placeholder="Search..." />
                    <button type="submit" className="search-btn">
                        <i className={`bx ${showSearch ? 'bx-x' : 'bx-search'}`}></i>
                    </button>
                </div>
            </form> */}
            <h2 style={titleStyle}> Yuvatech Computers</h2>
            
            <button className="logout-btn" onClick={handleLogout}>Logout</button>

            {/* <input type="checkbox" id="switch-mode" hidden checked={isDarkMode} onChange={toggleDarkMode} />
            <label htmlFor="switch-mode" className="switch-mode"></label> */}
            {/* <a href="#" className="notification">
                <i className="bx bxs-bell"></i>
                <span className="num">8</span>
            </a> */}
            {/* <a href="#" className="profile">
                <img src="img/people.png" alt="Profile" />
            </a> */}
        </nav>
    );
}

export default Navbar;

