// src/components/Footer.jsx
import React from 'react';
import { getMessage } from '../../locales/messages';

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        // bg-light py-3 w-100
        <footer className="footer">
            <div className="container text-center">
                <span className="mb-0">&copy; {year} {getMessage('footer.company')}. {getMessage('footer.rights')}</span>
            </div>
        </footer>
    );
};

export default Footer;