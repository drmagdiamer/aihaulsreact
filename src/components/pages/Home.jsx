import React from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

const Home = () => {
    return (
        <>
            <Header />
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-6">
                        <h2>Our Vision</h2>
                        <p>
                            At Java Innovations, we integrate cutting-edge AI to revolutionize businesses and everyday tasks. Leveraging Gen AI technology, we deliver innovative, tailored AI solutions that enhance user experiences and operational efficiencies.
                        </p>
                        <p>
                            Founded by visionary tech enthusiasts, we push the boundaries of AI applications, developing dynamic tools and services that adapt to unique needs. Partner with us to gain a strategic ally in the evolving world of artificial intelligence.
                        </p>
                    </div>
                    <div className="col-md-6">
                        <h2>Our Services</h2>
                        <p>
                            At Java Innovations, we provide a comprehensive range of services to meet your AI needs. Our offerings include AI Application Development, where we create bespoke AI solutions tailored to your business. Our Machine Learning Solutions harness advanced algorithms to enhance decision-making and predictive capabilities.
                        </p>
                        <p>
                            We excel in Data Analytics and Visualization, turning complex data into actionable insights. Additionally, our Cloud Integration services ensure seamless and scalable AI implementation, leveraging the power of the cloud to maximize efficiency and performance. Partner with us to unlock the full potential of artificial intelligence for your business.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Home;