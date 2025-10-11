import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav
            className="navbar navbar-expand-md position-relative"
            style={{ background: '#333' }}
        >
            <div className="container-fluid">
                {/* Left: Home link */}
                <Link className="navbar-brand" to="/" style={{ color: '#fff' }}>
                    Home
                </Link>

                {/* Right: Hamburger button */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
          <span
              className="navbar-toggler-icon"
              style={{ filter: 'invert(1)' }}
          ></span>
                </button>

                {/* Collapsible Menu: About, Services, Contact */}
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-md-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/about" style={{ color: '#fff' }}>
                                About Us
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/services" style={{ color: '#fff' }}>
                                Services
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact" style={{ color: '#fff' }}>
                                Contact
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login" style={{ color: '#fff' }}>
                                Login
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Center: Slogan */}
                <div className="position-absolute start-50 translate-middle-x">
          <span className="h5 mb-0" style={{ color: '#fff' }}>
            Building better future with AI
          </span>
                </div>
            </div>
        </nav>
    );
};

export default Header;



// // src/components/Header.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';
//
// const Header = () => {
//     return (
//         <nav className="navbar navbar-expand-md navbar-light bg-light position-relative">
//             <div className="container-fluid">
//                 {/* Left: Home link */}
//                 <Link className="navbar-brand" to="/">Home</Link>
//
//                 {/* Right: Hamburger button */}
//                 <button
//                     className="navbar-toggler"
//                     type="button"
//                     data-bs-toggle="collapse"
//                     data-bs-target="#navbarSupportedContent"
//                     aria-controls="navbarSupportedContent"
//                     aria-expanded="false"
//                     aria-label="Toggle navigation"
//                 >
//                     <span className="navbar-toggler-icon"></span>
//                 </button>
//
//                 {/* Collapsible Menu: About, Services, Contact */}
//                 <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                     <ul className="navbar-nav ms-auto mb-2 mb-md-0">
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/about">About Us</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/services">Services</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/contact">Contact</Link>
//                         </li>
//                     </ul>
//                 </div>
//
//                 {/* Center: Slogan */}
//                 <div className="position-absolute start-50 translate-middle-x">
//                     <span className="h5 mb-0">Building better future with AI</span>
//                 </div>
//             </div>
//         </nav>
//     );
// };
//
// export default Header;
//
//
//
//
//
//
// // // src/components/Header.jsx
// // import React from 'react';
// // import { Link } from 'react-router-dom';
// //
// // const Header = () => {
// //     return (
// //         <nav className="navbar navbar-expand-md navbar-light bg-light w-100">
// //             <div className="container-fluid">
// //                 <Link className="navbar-brand" to="/">Java Innovations</Link>
// //                 <button
// //                     className="navbar-toggler"
// //                     type="button"
// //                     data-bs-toggle="collapse"
// //                     data-bs-target="#navbarSupportedContent"
// //                     aria-controls="navbarSupportedContent"
// //                     aria-expanded="false"
// //                     aria-label="Toggle navigation"
// //                 >
// //                     <span className="navbar-toggler-icon"></span>
// //                 </button>
// //                 <div className="collapse navbar-collapse" id="navbarSupportedContent">
// //                     <ul className="navbar-nav ms-auto mb-2 mb-md-0">
// //                         <li className="nav-item">
// //                             <Link className="nav-link" to="/">Home</Link>
// //                         </li>
// //                         <li className="nav-item">
// //                             <Link className="nav-link" to="/about">About Us</Link>
// //                         </li>
// //                         <li className="nav-item">
// //                             <Link className="nav-link" to="/services">Services</Link>
// //                         </li>
// //                         <li className="nav-item">
// //                             <Link className="nav-link" to="/contact">Contact</Link>
// //                         </li>
// //                     </ul>
// //                 </div>
// //             </div>
// //         </nav>
// //     );
// // };
// //
// // export default Header;
// //
// //
// //
// // // import React from 'react';
// // // import { Link } from 'react-router-dom';
// // //
// // // const Header = () => {
// // //     return (
// // //         <header className="header">
// // //             {/* Left side: Home */}
// // //             <div className="header-left">
// // //                 <Link to="/" className="home-link">Home</Link>
// // //             </div>
// // //
// // //             {/* Center: Slogan */}
// // //             <div className="header-center">
// // //                 <span className="slogan">Building better future with AI</span>
// // //             </div>
// // //
// // //             {/* Right side: Other Menu Items */}
// // //             <div className="header-right">
// // //                 <nav>
// // //                     <ul className="menu">
// // //                         <li><Link to="/services">Services</Link></li>
// // //                         <li><Link to="/about">About Us</Link></li>
// // //                         <li><Link to="/contact">Contact</Link></li>
// // //                     </ul>
// // //                 </nav>
// // //             </div>
// // //         </header>
// // //     );
// // // };
// // //
// // // export default Header;
// // //
// // //
// // //
// // //
// // // // import React from 'react';
// // // // import { Link } from 'react-router-dom';
// // // //
// // // // const Header = () => {
// // // //     return (
// // // //         <nav className="navbar navbar-expand-lg navbar-light bg-light w-100">
// // // //             <div className="container-fluid">
// // // //                 <Link className="navbar-brand" to="/">Java Innovations</Link>
// // // //                 <button
// // // //                     className="navbar-toggler"
// // // //                     type="button"
// // // //                     data-bs-toggle="collapse"
// // // //                     data-bs-target="#navbarSupportedContent"
// // // //                     aria-controls="navbarSupportedContent"
// // // //                     aria-expanded="false"
// // // //                     aria-label="Toggle navigation"
// // // //                 >
// // // //                     <span className="navbar-toggler-icon"></span>
// // // //                 </button>
// // // //                 <div className="collapse navbar-collapse" id="navbarSupportedContent">
// // // //                     <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
// // // //                         <li className="nav-item">
// // // //                             <Link className="nav-link" to="/">Home</Link>
// // // //                         </li>
// // // //                         <li className="nav-item">
// // // //                             <Link className="nav-link" to="/about">About Us</Link>
// // // //                         </li>
// // // //                         <li className="nav-item">
// // // //                             <Link className="nav-link" to="/services">Services</Link>
// // // //                         </li>
// // // //                         <li className="nav-item">
// // // //                             <Link className="nav-link" to="/contact">Contact</Link>
// // // //                         </li>
// // // //                     </ul>
// // // //                 </div>
// // // //             </div>
// // // //         </nav>
// // // //     );
// // // // };
// // // //
// // // // export default Header;
