// import React from 'react';
// import './courses.css';  
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// import msoffice from './images/Microsoft-Office.png';
// import cprogram from './images/cprogramming.jpeg';
// import tally from './images/tallyprime.png';
// import cpp from './images/cpp.jpg';
// import ds from './images/data-structure.webp';
// import ps from './images/photoshop.png';
// import mysql from './images/mysql.png';
// import corel from './images/coreldraw.png';
// import html from './images/html.jpg';
// import exel from './images/exce.jpg';
// import typing from './images/typing.jpg'




// const CourseData = [
//   {
//     id: 1,
//     title: "basic",
//     description: "Ms-Office",
//     lessons: "15 lessons",
//     duration: "8h 25m 9s",
//     image: msoffice
//   },
//   {
//     id: 2,
//     title: "Advance",
//     description: "C-Programming",
//     lessons: "10 lessons",
//     duration: "8h 25m",
//     image: cprogram
//   },
//   {
//     id: 3,
//     title: "basic",
//     description: "Tally Prime With GST",
//     lessons: "20 lessons",
//     duration: "9h 25m 9s",
//     image: tally
//   },
//   {
//     id: 4,
//     title: "Intermidate",
//     description: "C++",
//     lessons: "25 lessons",
//     duration: "9h 25m 9s",
//     image: cpp
//   },
//   {
//     id: 5,
//     title: "Advance",
//     description: "Data Structure",
//     lessons: "20 lessons",
//     duration: "9h 25m 9s",
//     image: ds
//   },
//   {
//     id: 6,
//     title: "Advance",
//     description: "Photoshop",
//     lessons: "20 lessons",
//     duration: "9h 25m 9s",
//     image: ps
//   },
//   {
//     id: 7,
//     title: "Advance",
//     description: "MySql",
//     lessons: "20 lessons",
//     duration: "9h 25m 9s",
//     image: mysql
//   },
//   {
//     id: 8,
//     title: "Advance",
//     description: "Corel Draw",
//     lessons: "20 lessons",
//     duration: "9h 25m 9s",
//     image: corel
//   },
//   {
//     id: 9,
//     title: "Advance",
//     description: "HTML",
//     lessons: "20 lessons",
//     duration: "9h 25m 9s",
//     image: html
//   },
//   {
//     id: 10,
//     title: "Advance",
//     description: "Advance Exel",
//     lessons: "20 lessons",
//     duration: "9h 25m 9s",
//     image: exel
//   },
//   {
//     id: 11,
//     title: "Advance",
//     description: "Typing 30/40",
//     lessons: "20 lessons",
//     duration: "9h 25m 9s",
//     image: typing
//   }
// ];

// var settings = {
//   dots: true,
//   infinite: true,
//   slidesToShow: 3,
//   slidesToScroll: 1,
//   autoplay: true,
//   speed: 1000,
//   autoplaySpeed: 2000,
//   pauseOnHover: true,
//   arrows: true,
//   cssEase: 'ease',
//   responsive: [
//     {
//       breakpoint: 1024,
//       settings: {
//         slidesToShow: 2,
//         slidesToScroll: 1,
//         infinite: true,
//         dots: true,
//       },
//     },
//     {
//       breakpoint: 650,
//       settings: {
//         slidesToShow: 1,
//         slidesToScroll: 1,
//       },
//     },
//   ],
// };

// function App() {
//   return (
//     <section className="courses" id="courses">
//       <h1 className="heading">Our Famous Courses</h1>
//       <div className="box-container">
//         <Slider {...settings}>
//         {CourseData.map(course => (
//           <div key={course.id} className="box">
//             <div className="image shine">
//               <img src={course.image} alt={course.description} />
//               <h3>{course.title}</h3>
//             </div>
//             <div className="content">
//               <h3>{course.description}</h3>
//               <div className="icons">
//                 <span><i className="far fa-bookmark"></i> {course.lessons}</span>
//                 <span><i className="far fa-clock"></i> {course.duration}</span>
//               </div>
//             </div>
//           </div>
//         ))}
//         </Slider>
//       </div>
//     </section>
//   );
// }

// export default App;
import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import msoffice from './images/Microsoft-Office.png';
import cprogram from './images/cprogramming.jpeg';
import tally from './images/tallyprime.png';
import cpp from './images/cpp.jpg';
import ds from './images/data-structure.webp';
import ps from './images/photoshop.png';
import mysql from './images/mysql.png';
import corel from './images/coreldraw.png';
import html from './images/html.jpg';
import exel from './images/exce.jpg';
import typing from './images/typing.jpg';
import styles from './courses.module.css';
import './slider.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
const inlineStyle = {
  padding: '5rem 7%',
  border: '1px solid var(--primary-color)',
  borderRadius: '10px',
  marginBottom: '5px',
  marginLeft: '1px'
};
const CourseData = [
  {
    id: 1,
    title: "basic",
    description: "Ms-Office",
    lessons: "15 lessons",
    duration: "3 Months",
    image: msoffice
  },
  {
    id: 2,
    title: "Advance",
    description: "C-Programming",
    lessons: "10 lessons",
    duration: "4 Months",
    image: cprogram
  },
  {
    id: 3,
    title: "basic",
    description: "Tally Prime With GST",
    lessons: "20 lessons",
    duration: "3 Months",
    image: tally
  },
  {
    id: 4,
    title: "Intermidate",
    description: "C++",
    lessons: "25 lessons",
    duration: "3 Months",
    image: cpp
  },
  {
    id: 5,
    title: "Advance",
    description: "Data Structure",
    lessons: "20 lessons",
    duration: "4 Months",
    image: ds
  },
  {
    id: 6,
    title: "Advance",
    description: "Photoshop",
    lessons: "20 lessons",
    duration: "4 Months",
    image: ps
  },
  {
    id: 7,
    title: "Advance",
    description: "MySql",
    lessons: "20 lessons",
    duration: "4 Months",
    image: mysql
  },
  {
    id: 8,
    title: "Advance",
    description: "Corel Draw",
    lessons: "20 lessons",
    duration: "4 Months",
    image: corel
  },
  {
    id: 9,
    title: "Advance",
    description: "HTML",
    lessons: "20 lessons",
    duration: "3 Months",
    image: html
  },
  {
    id: 10,
    title: "Advance",
    description: "Advance Exel",
    lessons: "20 lessons",
    duration: "4 Months",
    image: exel
  },
  {
    id: 11,
    title: "Advance",
    description: "Typing 30/40",
    lessons: "20 lessons",
    duration: "4 Months",
    image: typing
  }
];

const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  speed: 1000,
  autoplaySpeed: 2000,
  pauseOnHover: true,
  arrows: true,
  cssEase: 'ease',
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 650,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

function App() {
  return (

<section   style={inlineStyle} className={`${styles.section} ${styles.courses}`} id="courses">
      <h1 className={styles.heading}>Our Famous Courses</h1>
      <div className={styles["box-container"]}>
        <Slider
        nextArrow={<div className={`${styles['slick-next']}`}></div>}
        prevArrow={<div className={`${styles['slick-prev']}`}></div>}
        {...settings}>
          {CourseData.map(course => (
            <div key={course.id} className={styles.box}>
              <div className={`${styles.image} ${styles.shine}`}>
                <img src={course.image} alt={course.description} />
                <h3>{course.title}</h3>
              </div>
              <div className={styles.content}>
                <h3>{course.description}</h3>
                <div className={styles.icons}>
                  {/* <span><i className="far fa-bookmark"></i> {course.lessons}</span> */}
                  <span><FontAwesomeIcon icon={faClock} /> {course.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default App;
