
import React, { useState, useEffect } from 'react';
import styles from './header.module.css';
import logo from './images/logo.png';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../../features/authSlice";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [navbarActive, setNavbarActive] = useState(false);
  const [loginFormActive, setLoginFormActive] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  const toggleNavbar = () => {
    setNavbarActive(!navbarActive);
    setLoginFormActive(false);
  };

  const toggleLoginForm = () => {
    setLoginFormActive(!loginFormActive);
    setNavbarActive(false);
  };

  const closeLoginForm = () => {
    setLoginFormActive(false);
  };

  const handleLoginFormSubmit = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };

  useEffect(() => {
    const handleScroll = () => {
      setNavbarActive(false);
      setLoginFormActive(false);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (user && isSuccess) {
      if (user.role === "student") {
        navigate("/studentdashboard");
      } else {
        navigate("/dashboard");
      }
      dispatch(reset());
    }
  }, [user, isSuccess, dispatch, navigate]);

  return (
    
    <header className={`${styles.header}`}> {/* Use the styles from the CSS module */}
      <a href="#home" className={`${styles.logo}`}><img src={logo} alt="YuvaTech Computers" /></a>
      
      <nav className={`${styles.navbar} ${navbarActive ? styles.active : ''}`}>
        <a href="#home" className={styles['hover-underline']}>home</a>
        <a href="#about" className={styles['hover-underline']}>about</a>
        <a href="#courses" className={styles['hover-underline']}>courses</a>
        <a href="#teacher" className={styles['hover-underline']}>teacher</a>
        <a href="#review" className={styles['hover-underline']}>review</a>
        <a href="#blog" className={styles['hover-underline']}>Achievements</a>
        <a href="#contact" className={styles['hover-underline']}>contact</a>
      </nav>

      <div className={styles.icons}>
        <div id="login-btn" onClick={toggleLoginForm} ><FontAwesomeIcon icon={faUser} style={{fontSize:"25px"}} className={styles['icon']} /></div>
        {/* <div id="menu-btn" className={`fas fa-bars ${navbarActive ? styles.active : ''}`} onClick={toggleNavbar}></div> */}
        <div id="menu-btn" className={`${styles['menubtn']} ${navbarActive ? 'active' : ''}`} onClick={toggleNavbar}><FontAwesomeIcon icon={faBars} style={{fontSize:"25px"}} className={styles['icon']} /></div>

      </div>   

      <form onSubmit={handleLoginFormSubmit} className={`${styles['login-form']} ${loginFormActive ? styles.active : ''}`}>
        {isError && <p className="has-text-centered">{message}</p>}
        <h2>login form</h2>
        <div id="close-form"  onClick={closeLoginForm}><FontAwesomeIcon icon={faTimes} style={{fontSize:"25px"}} className={styles['close-form']} /></div> 
        <input type="email" placeholder="enter your email" className={styles.box} value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="enter your password" className={styles.box} value={password} onChange={(e) => setPassword(e.target.value)} />
        {/* <div className={styles['log-btn']}> */}
        <button type="submit"className={`${styles['bttn']}`}>
            {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
    </header>
  );
};

export default Header;
