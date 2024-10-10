// import React from 'react';
// import './teacher.css';


// const Teacher = ({ name, role, image, facebook, twitter, instagram, course }) => {
//   return (
//     <div className="box">
//       <div className="image">
//         <img src={image} alt="" />
//         <div className="share">
//           {/* {facebook && <a href={facebook} className="fab fa-facebook-f"></a>}
//           {twitter && <a href={twitter} className="fab fa-twitter"></a>}
//           {instagram && <a href={instagram} className="fab fa-instagram"></a>} */}
//           <p>{course}</p>
//         </div>
//       </div>
//       <div className="content">
//         <h3>{name}</h3>
//         <span>{role}</span>
//       </div>
//     </div>
//   );
// };

// export default Teacher;
import React from 'react';
import styles from './teacher.module.css'; // Import CSS module

const Teacher = ({ name, role, image, course }) => {
  return (
    <div className={styles.box}>
      <div className={styles.image}>
        <img src={image} alt="" />
        <div className={styles.share}>
          <p>{course}</p>
        </div>
      </div>
      <div className={styles.content}>
        <h3>{name}</h3>
        <span>{role}</span>
      </div>
    </div>
  );
};

export default Teacher;
