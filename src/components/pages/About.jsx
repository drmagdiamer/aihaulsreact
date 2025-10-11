// src/components/About.jsx
import React from 'react';
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

function About() {
    return (
        <>
            <Header />
            <section id="About">
                <div className="container">
                    <h2>About Us</h2>
                    <p>
                        Java Innovations is a startup focused on building AI applications using Open AI and Gemini on the cloud.
                        Our mission is to create innovative solutions that leverage artificial intelligence to enhance user experiences and solve complex problems.
                    </p>
                    <h3>Our Team</h3>
                    <p>Our team consists of experienced professionals passionate about AI and technology.</p>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default About;
