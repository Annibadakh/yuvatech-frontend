// import React from 'react';
// import './subjects.css';

// import subject1 from './images/programming.png';
// import subject2 from './images/Cad.png';
// import subject3 from './images/web.png';
// import subject4 from './images/Design.png';
// import subject5 from './images/data.png';
// import subject6 from './images/tally.png';

// function SubjectBox({ imgSrc, title, description }) {
//     return (
//         <div className="box">
//             <img src={imgSrc} alt={title} />
//             <h3>{title}</h3>
//             <p>{description}</p>
//         </div>
//     );
// }

// function Subjects() {
//     return (
//         <section className="subjects">
//             <h1 className="heading">our popular subjects</h1>
//             <div className="box-container">
//                 <SubjectBox imgSrc={subject1} title="Programming Languages" description="C Programming, Java Programming, C++, Python" />
//                 <SubjectBox imgSrc={subject2} title="CAD & Engg. Software" description="Autocad 2D+3D, Cativa V5, SAP, Staad Pro" />
//                 <SubjectBox imgSrc={subject3} title="Web Development" description="HTML, CSS, Web Designing" />
//                 <SubjectBox imgSrc={subject4} title="Design & Editing" description="Web Design, Graphic Design, Coral Draw, Photoshop" />
//                 <SubjectBox imgSrc={subject5} title="Data Structure and Visulization & DBMS" description="Data Structure, Powe BI, MySql" />
//                 <SubjectBox imgSrc={subject6} title="Others" description="Tally Prime + GST, Animation, MS-Office" />
//             </div>
//         </section>
//     );
// }

// export default Subjects;

import React from 'react';
import styles from './subjects.module.css'; // Import CSS module

import subject1 from './images/programming.png';
import subject2 from './images/Cad.png';
import subject3 from './images/web.png';
import subject4 from './images/Design.png';
import subject5 from './images/data.png';
import subject6 from './images/tally.png';
const inlineStyle = {
    padding: '5rem 7%',
    border: '1px solid var(--primary-color)',
    borderRadius: '10px',
    marginBottom: '5px',
    marginLeft: '1px'
  };
function SubjectBox({ imgSrc, title, description }) {
    return (
        <div className={styles.box}>
            <img src={imgSrc} alt={title} />
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}

function Subjects() {
    return (
        <section style={inlineStyle} className={`${styles.section}${styles.subjects}`}>
            <h1 className={styles.heading}>our popular subjects</h1>
            <div className={styles['box-container']}>
                <SubjectBox imgSrc={subject1} title="Programming Languages" description="C Programming, Java Programming, C++, Python" />
                <SubjectBox imgSrc={subject2} title="CAD & Engg. Software" description="Autocad 2D+3D, Cativa V5, SAP, Staad Pro" />
                <SubjectBox imgSrc={subject3} title="Web Development" description="HTML, CSS, Web Designing" />
                <SubjectBox imgSrc={subject4} title="Design & Editing" description="Web Design, Graphic Design, Coral Draw, Photoshop" />
                <SubjectBox imgSrc={subject5} title="Data Structure and Visulization & DBMS" description="Data Structure, Powe BI, MySql" />
                <SubjectBox imgSrc={subject6} title="Others" description="Tally Prime + GST, Animation, MS-Office" />
            </div>
        </section>
    );
}

export default Subjects;
