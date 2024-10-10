// import React from 'react';
// import './about.css'; // Assuming you have CSS in this file
// import about from './images/about.jpg';
// import about1 from './images/about-1.jpg'

// function AboutSection() {
//     return (
//         <section className="about" id="about">
//             <h1 className="heading">about us</h1>
//             <div className="container">
//                 <figure className="about-image">
//                     <img src={about} alt="" height="450" />
//                     <img src={about1} alt="" className="about-img" height="300" />
//                 </figure>
//                 <div className="about-content">
//                     <h3>Embark on your journey to enlightenment with us.</h3>
//                     <p>" We take great satisfaction in assisting students in realizing their academic potential and achieving their goals. Our devoted group of knowledgeable coaches is committed to giving each student individualized attention and assistance so they can overcome obstacles and achieve academic success.Our remarkable track record of accomplishment and the trust we've won from parents are testaments to our unwavering dedication to student success. "</p>
//                     <h3>Mr. Khilari Babasaheb Maruti</h3>
                               
//                 </div>
//             </div>
//         </section>
//     );
// }

// export default AboutSection;
import React from 'react';
import styles from './about.module.css'; // Import the modular CSS file
import about from './images/about.jpg';
import about1 from './images/about-1.jpg';

function AboutSection() {
    return (
        <section className={`${styles.about}`} id="about"> {/* Apply the CSS class */}
            <h1 className={styles.heading}>About us</h1>
            <div className={styles.container}> {/* Apply the CSS class */}
                <figure className={styles['about-image']}> {/* Apply the CSS class */}
                    <img src={about} alt="" height="450" />
                    <img src={about1} alt="" className={styles['about-img']} height="300" />
                </figure>
                <div className={styles['about-content']}> {/* Apply the CSS class */}
                    <h3>Embark on your journey to enlightenment with us.</h3>
                    <p>" We take great satisfaction in assisting students in realizing their academic potential and achieving their goals. Our devoted group of knowledgeable coaches is committed to giving each student individualized attention and assistance so they can overcome obstacles and achieve academic success.Our remarkable track record of accomplishment and the trust we've won from parents are testaments to our unwavering dedication to student success. "</p>
                    <h3>Mr. Khilari Babasaheb Maruti</h3>                           
                </div>
            </div>
        </section>
    );
}

export default AboutSection;
