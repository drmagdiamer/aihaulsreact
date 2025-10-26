// src/components/About.jsx
import React from 'react';
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { getMessage } from "../../locales/messages";

function About() {
    return (
        <>
            <Header />
            <section id="About">
                <div className="container">
                    <h2>{getMessage('about.title')}</h2>
                    <p>
                        {getMessage('about.description1')}
                    </p>
                    <h3>{getMessage('about.teamTitle')}</h3>
                    <p>{getMessage('about.teamDescription')}</p>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default About;
