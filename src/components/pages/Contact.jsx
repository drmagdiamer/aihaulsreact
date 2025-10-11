import React from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

const Contact = () => {
    return (
        <>
            <Header />
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-6">
                        <h2>Our Vision</h2>
                    </div>
                    <div className="col-md-6">
                        <h2>Our Services</h2>

                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Contact;