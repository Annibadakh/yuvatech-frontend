// import React from 'react';
// import './review.css';

// const Review = ({ image, name, description, college }) => {
//   return (
//     <div className="swiper-slide slide">
//       <div className="user">
//           <img src={image} alt="" /> 
//           <div className="user-info">
//           <h3>{name}</h3>
//           <h4>{college}</h4>
//       </div>
//       </div>
//       <p>{description}</p>
//     </div>
//   );
// };

// export default Review;
import React from 'react';
import styles from './review.module.css'; // Importing the modular CSS file

const Review = ({ image, name, description, college }) => {
  return (
    <div className={`swiper-slide ${styles.slide}`}>
      <div className={styles.user}>
        <img src={image} alt="" /> 
        <div className={styles['user-info']}>
          <h3>{name}</h3>
          <h4>{college}</h4>
        </div>
      </div>
      <p>{description}</p>
    </div>
  );
};

export default Review;
