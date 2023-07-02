'use client'
import React, {useState} from 'react';
import {Mulish} from "next/font/google";
import styles from "@/app/contact/contact.module.css"

const mulish = Mulish({
    subsets: ['latin'],
    display: 'swap',
    weight: ['300', '400', '500', '600', '700', '800', '900']
})


const ContactForm = (e) => {

    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        message: "",
    })
    const [status, setStatus] = useState(null);

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        setUser((prevUser) => ({
            ...prevUser, [name]: value
        }));
    }

    const handleSubmit= async (e)=> {
        e.preventDefault()
        try{
                const response = await fetch('/api/contact',{
                    method:'POST',
                    headers:{"Content_Type":"application/json"},
                    body: JSON.stringify({
                        username:user.username,
                        email:user.email,
                        phone:user.phone,
                        message:user.message
                    })
                })
            if (response.status === 200) {
                setUser({
                    username: "",
                    email: "",
                    phone: "",
                    message: ""
                })
                setStatus('success');
            } else {
                setStatus('error');
            }
        }catch(e){
            console.log(e)
        }


    }

    return (
        <form className={styles.contact_form} onSubmit={handleSubmit}>
            <div className={styles.input_field}>
                <label htmlFor="username" className={styles.label}>
                    Enter your name
                    <input type="text" name="username" id="username"
                           placeholder="Enter your name"
                           className={mulish.className}
                           value={user.username}
                           onChange={handleChange}
                           autoComplete="off"
                           required
                    />
                </label>
            </div>

            <div className={styles.input_field}>
                <label htmlFor="email" className={styles.label}>
                    Enter your Email
                    <input type="text" name="email" id="email"
                           placeholder="Enter your E-mail"
                           className={mulish.className}
                           value={user.email}
                           onChange={handleChange}
                           autoComplete="off"
                           required
                    />
                </label>
            </div>

            <div className={styles.input_field}>
                <label htmlFor="phone" className={styles.label}>
                    Enter your Phone Number
                    <input type="number" name="phone" id="phone"
                           placeholder="Enter your PhoneNumber"
                           className={mulish.className}
                           value={user.phone}
                           onChange={handleChange}
                           autoComplete="off"
                           required
                    />
                </label>
            </div>

            <div className={styles.input_field}>
                <label htmlFor="message" className={styles.label}>
                    Report any Issue
                    <textarea name="message" id="message" rows={6}
                              placeholder="Enter your Message"
                              className={mulish.className}
                              value={user.message}
                              onChange={handleChange}
                              autoComplete="off"
                              required
                    />
                </label>
            </div>

            <div>

                {status === 'success' && <p className={styles.success_msg}>Thank you for your message!</p>}
                {status === 'error' && <p className={styles.error_msg}>There was an error submitting your message. Please try again.</p>}

                <button type="submit" className={mulish.className}>Submit</button>
            </div>
        </form>
    );
};

export default ContactForm;