import React, { useState } from 'react';
import { db } from '../firebase';
import sendEmail from '../emailjs';
const FEATURES = {
    bed_2: false,
    bath_1: false,
    bath_2: false,
    lease_1_6_months: false,
    lease_6_12_months: false,
    lease_year_or_more: false
}

const Contact = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({});
    const [features, setFeatures] = useState(FEATURES);

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleCheckbox = (event) => {
        setFeatures({...features, [event.target.name]: !features[event.target.name]});
    }
    const handleSubmit = async (event) => {
        const form = event.target;
        event.preventDefault();
        setLoading(true);
        sendEmail(event);
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
                <fieldset className="one_column">
                    <legend>I am relocating into the area: </legend>
                    <div>
                        <input type='radio' id='relocating_yes' name='relocating' onChange={handleChange} value="yes"/>
                        <label htmlFor='relocating_yes'>
                            <span className="hide">Relocation into the area </span>Yes
                        </label>
                    </div>
                    <div>
                        <input type='radio' id='relocating_no' name='relocating' onChange={handleChange} value='no'/>
                        <label htmlFor='relocating_no'>
                            <span className="hide">Relocation into the area </span>No
                        </label>
                    </div>
                </fieldset>  
                <fieldset className="two-columns">                             
                            <legend>I am interested in the following features:</legend>
                            <div>
                                <input type='checkbox' id='bed_2' name='bed_2' value='2 Bedrooms' onChange={handleCheckbox}/>
                                <label htmlFor='bed_2'>2 Bedrooms</label>
                            </div>
                            <div>
                                <input type='checkbox' id='bath_1' name='bath_1' value='1 Bath' onChange={handleCheckbox}/>
                                <label htmlFor='bath_1'>1 Bath</label>
                            </div>
                            <div>
                                <input type='checkbox' id='bath_2' name='bath_2' value='2 Baths' onChange={handleCheckbox}/>   
                                <label htmlFor='bath_2'>2 Baths</label>
                            </div>
                            <div>
                                <input type='checkbox' id='lease_1_6' name='lease_1_6_months' value='Lease Period: 1-6 Months' onChange={handleCheckbox}/>   
                                <label htmlFor='lease_1_6'>Lease Period: 1-6 Months</label>
                            </div>
                            <div>
                                <input type='checkbox' id='lease_6_12' name='lease_6_12_months' value='Lease Period: 6-12 Months' onChange={handleCheckbox}/>   
                                <label htmlFor='lease_6_12'>Lease Period: 6-12 Months</label>
                            </div>                           
                            <div>
                                <input type='checkbox' id='lease_year' name='lease_year_or_more' value='Lease Period: 1 Year +' onChange={handleCheckbox}/>   
                                <label htmlFor='lease_year'>Lease Period: 1 Year +</label> 
                            </div>
                        </fieldset> 
                <button className="button" disabled={loading}>Send</button>
            </form>
        </div>
    )
}

export default Contact;