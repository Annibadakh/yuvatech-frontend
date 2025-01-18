import React, { useEffect } from "react";
import styled, { createGlobalStyle } from 'styled-components';
import Header from '../component/header/header';
import Home from '../component/home/home';
import About from '../component/about/about';
import Subjects from '../component/subjects/subjects';
import Courses from '../component/courses/courses';
import TeacherSection from '../component/teacher/teacher';
import Review from '../component/review/review';
import BlogSection from '../component/blog/blog';
import Contact from '../component/contact/contact';
import Footer from '../component/footer/footer';
import styles from '../App.module.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const GlobalStyles = createGlobalStyle`
  * {
    font-family: 'Times New Roman', Times, serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
    border: none;
    text-decoration: none;
    text-transform: capitalize;
    transition: all 0.2s linear;
  }
  

  html {
    font-size: 62.5%;
    overflow-x: hidden;
    scroll-padding-top: 9rem;  
    scroll-behavior: smooth;
  }
  body {
    overflow-x: hidden;
    overflow-y: auto;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #3C91E6;
    border-radius: 5px;
  }
  
`;

const StyledContainer = styled.div`
  /* Additional styles specific to the container if needed */
`;

function Hom() {
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
    <StyledContainer>
      <GlobalStyles />
      <div className={styles.container}>
        <Header />
        <Home />
        <About />
        <Subjects />
        <Courses />
        <TeacherSection />
        <Review />
        <BlogSection />
        <Contact />
        <Footer />
      </div>
    </StyledContainer>
  );
}

export default Hom;
