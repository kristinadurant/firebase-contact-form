import emailjs from 'emailjs-com';

function sendEmail(e) {
    emailjs.sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID, 
        process.env.REACT_APP_EMAILJS_CONTACT_TEMPLATE_ID, 
        e.target, 
        process.env.REACT_APP_EMAILJS_USER_ID
    ).then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });
}

export default sendEmail;