// import React from 'react';
// import './home.css';

// function HomeSection() {
//   return (
//     <section className="home" id="home">
//       <div className="content">
//         <h3>the best courses you will find here</h3>
//         <p>Empower Your Future with Cutting-Edge Computer Training. Master New Skills and Excel in the Digital World!</p>
//         <a href="#courses" className="btn">More Courses</a>    
//       </div>
//     </section>
//   );
// }

// export default HomeSection;


// import React from 'react';
// import styles from './home.module.css'; // Importing the modular CSS file
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css"; 


// const inlineStyle = {
//   padding: '5rem 7%',
//   border: '1px solid var(--primary-color)',
//   borderRadius: '10px',
//   marginBottom: '5px',
//   marginLeft: '1px'
// };
// function HomeSection() {
//   return (
    
//     <section style={inlineStyle} className={`${styles.home}`} id="home">
//       <div className={styles.content}>
//         <h3>the best courses you will find here</h3>
//         <p>Empower Your Future with Cutting-Edge Computer Training. Master New Skills and Excel in the Digital World!</p>
//         <a href="#courses" className={`${styles['bttn']}`}>More Courses</a>    
//       </div>
//     </section>
//   );
// }

// export default HomeSection;


import Slider from 'react-slick';
import './dots.css';
import styles from './home.module.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 



const inlineStyle = {
  padding: '5rem 7%',
  border: '1px solid var(--primary-color)',
  borderRadius: '10px',
  marginBottom: '5px',
  marginLeft: '1px',
  marginTop: "10px"
};

function HomeSection() {



  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    arrows: false,
    dots: true,
    cssEase: 'ease',
  };

  return (
    <section style={inlineStyle} className={`${styles.home}`} id="home">
      <div className={styles.content}>

      <Slider {...settings}>
        <span className={styles.info} >
          <h3>the best courses you will find here</h3>
          <p>Empower Your Future with Cutting-Edge Computer Training. Master New Skills and Excel in the Digital World!</p>
          <a href="#courses" className={`${styles['bttn']}`}>More Courses</a>    
        </span>
        <span className={styles.info}>
          <h3>Course 2: Advanced JavaScript</h3>
          <p>Enhance your skills in JavaScript and become a pro developer.</p>
          <a href="#courses" className={`${styles['bttn']}`}>More Courses</a>    
        </span>
        <span className={styles.info}>
          <h3>Course 3: Web Development Bootcamp</h3>
          <p>Become a full-stack developer with our comprehensive bootcamp.</p>
          <a href="#courses" className={`${styles['bttn']}`}>More Courses</a>    
        </span>
        {/* Add more slides as needed */}
      </Slider>
      </div>
      
    </section>
  );
}

export default HomeSection;
