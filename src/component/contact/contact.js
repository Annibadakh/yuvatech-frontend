

import React, { useState } from 'react';
import contactImage from './images/Contact-image.jpg'; // Importing the image
import styles from './contact.module.css'; // Importing the modular CSS file
import axios from 'axios';
const inlineStyle = {
    padding: '5rem 7%',
    border: '1px solid var(--primary-color)',
    borderRadius: '10px',
    marginBottom: '5px',
    marginLeft: '1px'
  };

  function Contact() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        phone_number: '',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false); // State to track submission status

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };
    const apiUrl = process.env.REACT_APP_API_BASE_URL

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`${apiUrl}/contact`, values)
            .then(res => {
                console.log("Submitted Successfully !!");
                setSubmitted(true); // Set submitted state to true on successful submission
                setValues({  // Clear input fields after successful submission
                    name: '',
                    email: '',
                    phone_number: '',
                    message: ''
                });
                setTimeout(() => {
                    setSubmitted(false); // Clear the success message after 3 seconds
                }, 3000);
            })
            .catch(err => console.log(err));
    };

    return (
        <section style={inlineStyle} className={styles.contact} id="contact"> {/* Apply the CSS class */}
            <h1 className={styles.heading}>contact us</h1>
            <div className={styles.row}> {/* Apply the CSS class */}
                <div className={styles.image}> {/* Apply the CSS class */}
                    <img src={contactImage} alt="" /> 
                </div>
                <form onSubmit={handleSubmit}>
                    <h3>send us a message</h3>
                    <input type="text" placeholder="name" className={styles.box} name='name' value={values.name} onChange={handleChange} required />
                    <input type="email" placeholder="email" className={styles.box} name='email' value={values.email} onChange={handleChange} required/>
                    <input type="number" placeholder="phone number" className={styles.box} name='phone_number' value={values.phone_number} onChange={handleChange} required />
                    <textarea placeholder="message" className={styles.box} name='message' value={values.message} onChange={handleChange} cols="30" rows="10" required ></textarea>
                    <button type="submit" className={`${styles['bttn']}`}>Submit Message</button>
                    {submitted && <div className={styles.popup}>Submitted Successfully !!</div>}
                </form>
            </div>
        </section>
    );
}

export default Contact;

