import React, { useEffect } from 'react';
import Swiper from 'swiper';
import Review from './review-set';
import styles from './review.module.css';

import Image1 from './images/harshal.jpg';
import Image2 from './images/Mahesh.jpg';
import Image3 from './images/hemanshu.jpg';
import Image4 from './images/Sachin.jpg';
import Image5 from './images/pratham.jpg';
const inlineStyle = {
  padding: '5rem 7%',
  border: '1px solid var(--primary-color)',
  borderRadius: '10px',
  marginBottom: '5px',
  marginLeft: '1px'
};
const ReviewSection = () => {
  const reviews = [
    {
      image: Image1,
      name: 'Harshal Patil',
      clg: 'Sanjivani COE (IT)',
      description: 'The courses at the institute were fantastic! The instructors were knowledgeable and engaging, offering hands-on projects and clear explanations. Great environment for learning and improving skills. Highly recommended!'
    },
    {
      image: Image2,
      name: 'Manav Patil',
      clg: 'Sanjivani COE (IT)',
      description: "The training on Java programming was very good! Expert lecturers provide helpful tools along with concise explanations. Empirical studies improve comprehension. Strongly advised for anyone with an interest in coding!"
    },
    {
      image: Image3,
      name: 'Himanshu Chhajad',
      clg: 'Sanjivani COE (CSE)',
      description:  "The institute's classes were excellent! The teachers were interesting and informed, providing practical assignments and concise explanations. Excellent setting for gaining knowledge and developing abilities. Strongly advised!"
    },
    {
      image: Image4,
      name: 'Sachin Gaikwad',
      clg: 'Sanjivani COE (IT)',
      description: 'The programming language course was excellent! Knowledgeable instructors provided clear explanations and valuable resources. Practical projects enhance understanding. Highly recommended for anyone interested in coding!'
    },
    {
      image: Image5,
      name: 'Pratham Chavan',
      clg: 'Sanjivani COE (CSE)',
      description: "The web development course was excellent! The instructors were knowledgeable and approachable. The practical projects and hands-on approach greatly improved my coding skills. I highly recommend this institute!"
    }
  ];

  useEffect(() => {
    const swiper = new Swiper(".review-slider",{
      spaceBetween: 20,
      centeredSlides: true,
      grabCursor: true,
      autoplay:{
        delay: 1000,
        disableOnInteraction: false,
      },
      loop: true,
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        680: {
          slidesPerView: 2,
        },
        991: {
          slidesPerView: 3,
        },
      },
    });

    // Return a cleanup function to destroy Swiper instance when component unmounts
    return () => {
      swiper.destroy();
    };
  }, []); 

  return (
    <section style={inlineStyle} className={`${styles.section} review `}id="review">
      <h1 className={`${styles.heading}`}>our students review</h1>
      <div className="swiper review-slider">
        <div className="swiper-wrapper">
          {reviews.map((review, index) => (
            <Review
              key={index}
              image={review.image}
              name={review.name}
              description={review.description}
              college={review.clg}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;