


import React, { useEffect, useState } from 'react';
import styles from './blog.module.css'; // Import CSS module

const inlineStyle = {
    padding: '5rem 7%',
    border: '1px solid var(--primary-color)',
    borderRadius: '10px',
    marginBottom: '5px',
    marginLeft: '1px'
};

function BlogSection() {
    const [blogs, setBlogs] = useState([]); // Initialize blogs as an empty array
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        // Fetch the blog data from the server
        fetch(`${apiUrl}/getblog`)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setBlogs(data);
                    console.log(data);
                     // Set the blogs if the response is an array
                } else {
                    console.error('Expected an array but got', data);
                    setBlogs([]); // Ensure blogs is an array to avoid runtime errors
                }
            })
            .catch(error => {
                console.error('Error fetching blog data:', error);
                setBlogs([]); // Set blogs as an empty array in case of error
            });
    }, []);

    return (
        <section style={inlineStyle} className={`${styles.section} ${styles.blog}`} id="blog">
            <h1 className={styles.heading}>Our Achievements</h1>
            <div className={styles['box-container']}>
                {blogs.length > 0 ? (
                    blogs.map((blog, index) => (
                        <BlogBox
                            key={index}
                            photo={`${apiUrl}/${blog.photo}`} // Dynamically use the photo path
                            date={new Date(blog.date).toLocaleDateString()}
                            title={blog.title}
                            description={blog.description}
                        />
                    ))
                ) : (
                    <p>Stay Tuned !!!</p> // Handle case where there are no blogs
                )}
            </div>
        </section>
    );
}

function BlogBox(props) {
    return (
        <div className={styles.box}>
            <div className={`${styles.image} ${styles.shine}`}>
                <img src={props.photo} alt={props.title} />
                <h3>{props.date}</h3>
            </div>
            <div className={styles.content}>
                <h2>{props.title}</h2>
                <p style={{textAlign:"justify", color:"white"}}>{props.description}</p>
            </div>
        </div>
    );
}

export default BlogSection;
