// import React from 'react';
// import './blog.css';

// import blog1 from './images/blog1.jpg';
// import blog2 from './images/blog2.jpg';
// import blog3 from './images/blog3.jpg';
// import blog4 from './images/blog4.jpg';
// import blog5 from './images/blog5.jpg';
// import blog6 from './images/blog6.jpg';

// function BlogSection() {
//     return (
//         <section className="blog" id="blog">
//             <h1 className="heading">Our Achievements</h1>
//             <div className="box-container">
//                 <BlogBox
//                     photo={blog1}
//                     date=""
//                     title=""
//                     description=""
//                     author=""
//                 />
//                 <BlogBox
//                     photo={blog2}
//                     date=""
//                     title=""
//                     description=""
//                     author=""
//                 />
//                 <BlogBox
//                     photo={blog3}
//                     date=""
//                     title=""
//                     description=""
//                     author=""
//                 />
//                 <BlogBox
//                     photo={blog4}
//                     date=""
//                     title=""
//                     description=""
//                     author=""
//                 />
//                 <BlogBox
//                     photo={blog5}
//                     date=""
//                     title=""
//                     description=""
//                     author=""
//                 />
//                 <BlogBox
//                     photo={blog6}
//                     date=""
//                     title=""
//                     description=""
//                     author=""
//                 />
                
                
//             </div>
//         </section>
//     );
// }

// function BlogBox(props) {
//     return (
//         <div className="box">
//             <div className="image shine">
//                 <img src={props.photo} alt={props.title} />
//                 <h3>{props.date}</h3>
//             </div>
//             {/* <div className="content">
//                 <div className="icons">
//                     <a href="#"><i className="fas fa-user"></i>by {props.author}</a>
//                 </div>
//                 <h3>{props.title}</h3>
//                 <p>{props.description}</p>
//             </div> */}
//         </div>
//     );
// }

// export default BlogSection;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './blog.module.css'; // Import CSS module

import blog1 from './images/blog1.jpg';
import blog2 from './images/blog2.jpg';
import blog3 from './images/blog3.jpg';
import blog4 from './images/blog4.jpg';
import blog5 from './images/blog5.jpg';
import blog6 from './images/blog6.jpg';
const inlineStyle = {
    padding: '5rem 7%',
    border: '1px solid var(--primary-color)',
    borderRadius: '10px',
    marginBottom: '5px',
    marginLeft: '1px'
  };
function BlogSection() {

    const [blogData, setBlogData] = useState([]);
    const apiurl = process.env.REACT_APP_API_BASE_URL; // Ensure this is defined in your .env file

    useEffect(() => {
        fetchBlogData();
    }, []);

    const fetchBlogData = () => {
        axios.get(`${apiurl}/blog/info`)
        .then(res => {
            if (res.status !== 200) {
            throw new Error('Failed to fetch blog data');
            }
            return res.data; // Assuming the API response has a 'data' field containing the blog info
        })
        .then(data => {
            console.log('Blog data fetched successfully:', data);
            setBlogData(Array.isArray(data.data) ? data.data : []);
        })
        .catch(err => {
            console.error('Error fetching blog data:', err);
            setBlogData([]); // Set to empty array on error
        });
    };


    return (
        <section style={inlineStyle} className={`${styles.section}${styles.blog}`} id="blog">
            <h1 className={styles.heading}>Our Achievements</h1>
            <div className={styles['box-container']}>
            {blogData.map((blog, index) => (
            <BlogBox
                key={index}
                photo={blog.photo} // Assuming 'photo' is a URL string from the API
                date={blog.date}
                title={blog.title}
                description={blog.description}
            />
            ))}
            </div>
        </section>
    );
}

function BlogBox(props) {
    return (
        <div className={styles.box}>
            <div className={styles.image}>
                <img src={props.photo} alt={props.title} /> 
            </div>
            <div className={styles.content}>
                <h1>{props.title}</h1>
                <h2>{props.description}</h2>
                <h3>{props.date}</h3>
            </div>
        </div>
    );
}

export default BlogSection;
