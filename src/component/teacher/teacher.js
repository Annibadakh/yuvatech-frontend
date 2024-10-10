// import React from 'react';
// import Teacher from './teacher-set';
// import './teacher.css';

// import Teacher1Image from './images/about.jpg';
// import Teacher2Image from './images/teacher-1.jpg';
// import Teacher3Image from './images/teacher-2.jpg';
// import Teacher4Image from './images/teacher-3.jpg';

// const TeacherSection = () => {
//   return (
//     <section className="teacher" id="teacher">
//       <h1 className="heading">our expert teacher</h1>
//       <div className="box-container">
//         <Teacher
//           name="Khilari Babasaheb Maruti"
//           role="instructor"
//           image={Teacher1Image}
//           facebook="#"
//           twitter="#"
//           instagram="#"
//           course="Animation, Autocad, Graphic, Cativa Max, Staad Pro "
//         />
//         <Teacher
//           name="Khilari Pooja Babasaheb"
//           role="professor"
//           image={Teacher2Image}
//           facebook="#"
//           twitter="#"
//           instagram="#"
//           course="Coral Draw, Ms-Office, Tally, PhotoShop"
//         />
//         <Teacher
//           name="Shirke Pranav Bhagwat"
//           role="Professor"
//           image={Teacher3Image}
//           facebook="#"
//           twitter="#"
//           instagram="#"
//           course="Coral Draw, Ms-Office, Tally, PhotoShop"
//         />
//         <Teacher
//           name="Gaikwad Sanket Prakash"
//           role="Professor"
//           image={Teacher4Image}
//           facebook="#"
//           twitter="#"
//           instagram="#"
//           course="All Programming Language"
//         />
//       </div>
//     </section>
//   );
// };

// export default TeacherSection;
import React from 'react';
import Teacher from './teacher-set';
import styles from './teacher.module.css'; // Import CSS module

import Teacher1Image from './images/about.jpg';
import Teacher2Image from './images/teacher-1.jpg';
import Teacher3Image from './images/teacher-2.jpg';
import Teacher4Image from './images/teacher-3.jpg';
const inlineStyle = {
  padding: '5rem 7%',
  border: '1px solid var(--primary-color)',
  borderRadius: '10px',
  marginBottom: '5px',
  marginLeft: '1px'
};
const TeacherSection = () => {
  return (
    <section style={inlineStyle} className={`${styles.section}${styles.teacher}`} id="teacher">
      <h1 className={styles.heading}>our expert teacher</h1>
      <div className={styles['box-container']}>
        <Teacher
          name="Khilari Babasaheb Maruti"
          role="instructor"
          image={Teacher1Image}
          course="Animation, Autocad, Graphic, Cativa Max, Staad Pro "
        />
        <Teacher
          name="Khilari Pooja Babasaheb"
          role="professor"
          image={Teacher2Image}
          course="Coral Draw, Ms-Office, Tally, PhotoShop"
        />
        <Teacher
          name="Shirke Pranav Bhagwat"
          role="Professor"
          image={Teacher3Image}
          course="Coral Draw, Ms-Office, Tally, PhotoShop"
        />
        <Teacher
          name="Gaikwad Sanket Prakash"
          role="Professor"
          image={Teacher4Image}
          course="All Programming Language"
        />
      </div>
    </section>
  );
};

export default TeacherSection;
