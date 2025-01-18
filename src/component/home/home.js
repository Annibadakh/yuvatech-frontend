

import Slider from 'react-slick';
import './dots.css';
import styles from './home.module.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 
import { elements } from 'chart.js';
import { Key } from '@mui/icons-material';



const inlineStyle = {
  
  border: '1px solid var(--primary-color)',
  borderRadius: '10px',
  marginBottom: '5px',
  marginLeft: '1px',
  marginTop: "10px"
};

function HomeSection() {






  return (
    <section style={inlineStyle} className={`${styles.home}`} id="home">
      <div className={styles.content}>

      
        
          <span className={styles.info} >
          <h3 style={{textAlign:"center"}}>Empower Your Future with YuvaTech Computer Institute</h3>
          <p style={{textAlign:"justify"}}>At YuvaTech Computer Institute, we provide top-notch computer education and skill development courses to help you excel in the digital era. Unlock your potential, learn cutting-edge technologies, and step confidently into a tech-driven future with YuvaTech</p>
          <a href="#courses" style={{textAlign:"center"}} className={`${styles['bttn']}`}>Explore More Courses</a>    
        </span>
        
      </div>
      
    </section>
  );
}

export default HomeSection;
