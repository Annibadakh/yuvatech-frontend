// import React from 'react';
// import './footer.css';
// import Map from './map';
// import footlogo from './images/logo.png';

// const Footer = () => {
//     return (
//         <section className="footer" id="footer">
//             <div className="box-container">
//                 <div className="box">
//                      <img src={footlogo} alt="YuvaTech Computers" />
//                     <p className='adress'>Best Computer Institute in Kopargaon</p>
//                     <div className="share">
//                         <a href="#footer" className="fab fa-facebook-f"></a>
//                         <a href="#footer" className="fab fa-twitter"></a>
//                         <a href="https://www.instagram.com/yuvatech_computer_kopargaon?utm_source=qr&igsh=cHg1N2prcHVuZWti" target="_blank" className="fab fa-instagram"></a>
//                         <a href="#footer" className="fab fa-linkedin"></a>
//                     </div>
//                 </div>
//                 <div className="box">
//                     <h3>Quick Links</h3>
//                     <div className="quick-link">
//                         <a href="#home" className="hover-underline">home</a>
//                         <a href="#about" className="hover-underline">about</a>
//                         <a href="#courses" className="hover-underline">courses</a>
//                         <a href="#teacher" className="hover-underline">teacher</a>
//                         <a href="#review" className="hover-underline">review</a>
//                         <a href="#blog" className="hover-underline">Achievements</a>
//                         <a href="#contact" className="hover-underline">contact</a>
//                     </div>
//                 </div>
//                 <div className="box">
//                     <h3>contact us</h3>
//                     <p>+91 9881199931</p>
//                     <p>+91 8805915219</p>
//                     <a href="#" className="link">xyz@gmail.com</a>
//                     <p className='adress'>Office No.1, 2nd Floor, Opp. ST Stand, Anil coldrink, Kopargaon.</p>
//                 </div>
//                 <div className="box">
//                     <h3>localization</h3>
//                     <Map />
//                 </div>
                
//             </div>
//             <div className="credit">© YuvaTech Computer Institute | All rights reserved by Team TechTitans Sanjivani COE</div>
            
//         </section>
//     );
// }

// export default Footer;


import React from 'react';
import styles from './footer.module.css'; // Importing the modular CSS file
import Map from './map';
import footlogo from './images/logo.png';
const inlineStyle = {
    padding: '5rem 7%',
    border: '1px solid var(--primary-color)',
    borderRadius: '10px',
    marginBottom: '5px',
    marginLeft: '1px'
  };
const Footer = () => {
    return (
        <section style={inlineStyle} className={`${styles.footer}`} id="footer">
            <div className={styles["box-container"]}>
                <div className={styles.box}>
                     <img src={footlogo} alt="YuvaTech Computers" />
                    <p className={styles.adress}>Best Computer Institute in Kopargaon</p>
                    
                </div>
                <div className={styles.box}>
                    <h3>Quick Links</h3>
                    <div className={styles["quick-link"]}>
                        <a href="#home" className={styles["hover-underline"]}>home</a>
                        <a href="#about" className={styles["hover-underline"]}>about</a>
                        <a href="#courses" className={styles["hover-underline"]}>courses</a>
                        <a href="#teacher" className={styles["hover-underline"]}>teacher</a>
                        <a href="#review" className={styles["hover-underline"]}>review</a>
                        <a href="#blog" className={styles["hover-underline"]}>Achievements</a>
                        <a href="#contact" className={styles["hover-underline"]}>contact</a>
                    </div>
                </div>
                <div className={styles.box}>
                    <h3>contact us</h3>
                    <p><a href='tel:+919881199931'>+91 9881199931</a></p>
                    <p><a href='tel:+918805915219'>+91 8805915219</a></p>
                    <a href="mailto:yuvatechkopargaon@gmail.com" className="link">yuvatechkopargaon@gmail.com</a>
                    <p className={styles.adress}>Office No.1, 2nd Floor, Opp. ST Stand, Anil coldrink, Kopargaon.</p>
                </div>
                <div className={styles.box}>
                    <h3>localization</h3>
                    <Map />
                </div>
            </div>
            {/* <div className={styles.credit}>© YuvaTech Computer Institute | All rights reserved by Team TechTitans Sanjivani COE</div> */}
            <div className={styles.credit}>© YuvaTech Computer Institute | All rights reserved by <a href='https://docs.google.com/forms/d/e/1FAIpQLSd9W4LJyh_G-QA6ftdEj0QXg_i_eIISkMPKdyst75gK62vVDw/viewform?embedded=tru' target='blank'>Team TechTitans Sanjivani COE</a></div>
        </section>
    );
}

export default Footer;
