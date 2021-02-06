import React, { useState } from 'react';
import { db } from '../firebase';

const Contact = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({});
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };
    const handleSubmit = async (event) => {
        const form = event.target;
        event.preventDefault();
        setLoading(true);

        db.collection("emails").add(formData)
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            setFormData({});
            form.reset();
        })
        .catch((error) => {
            console.log(error);      
        });
        setLoading(false);
    }
console.log(formData);
    return (
        <div>
            <h1 style={{ textAlign: 'center', paddingTop: '200px', fontSize: '3rem'}}>
                Contact Form
            </h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='name' className='required'>Name:</label>
                <input onChange={handleChange} type='text' id='name' name='name' required/>
                <label htmlFor='email' className='required'>Email Address:</label>
                <input onChange={handleChange} type='email' id='email' name='email' required/>
                <label htmlFor='comments' className='required'>Questions/Comments:</label>
                <textarea onChange={handleChange} id='comments' name='comments' rows="4" required/>
                <button className="button" disabled={loading}>Send</button>
            </form>
        </div>
    )
}

export default Contact;