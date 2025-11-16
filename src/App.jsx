import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import Home from './components/pages/Home.jsx';
import About from './components/pages/About.jsx';
import Contact from './components/pages/Contact.jsx';
import ProductDetails from './components/pages/ProductDetails.jsx';
import Login from './components/pages/Login.jsx';
import Welcome from './components/pages/Welcome.jsx';
import KnowledgeBase from './components/pages/KnowledgeBase.jsx';
import KnowledgeOriginal from './components/pages/legacy/KnowledgeOriginal.jsx';
import Fact from "./components/componentLibrary/Fact.jsx";
import {ValidationProvider} from "./context/ValidationProvider.jsx";
import CreateCompany from "./components/pages/CreateCompany.jsx";
import ManageCompany from "./components/pages/ManageCompany.jsx";
import AdminSector from "./components/pages/AdminSector.jsx";
import ManageCustomList from "./components/pages/ManageCustomList.jsx";
import { CompanyProvider} from "./context/CompanyContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";

function App() {
    return (
        <AuthProvider>
            <ValidationProvider>
                <CompanyProvider>
                <UserProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/welcome" element={<Welcome />} />
                    <Route path="/create-company" element={<CreateCompany />} />
                    <Route path="/KnowledgeBase" element={<KnowledgeBase />} />
                    <Route path="/ManageCompany" element={<ManageCompany />} />
                    <Route path="/AdminSector" element={<AdminSector />} />
                    <Route path="/ManageCustomList" element={<ManageCustomList />} />

                    {/*<Route path="/KnowledgeOriginal" element={<KnowledgeOriginal />} />*/}
                    {/*<Route path="/Fact" element={<Fact />} />*/}
                    {/*<Route path="/products" element={<ProductList />} />*/}
                    {/*<Route path="/products/:id" element={<ProductDetails />} />*/}
                    {/* You can add more routes here */}
                </Routes>
            </Router>
                </UserProvider>
                </CompanyProvider>
            </ValidationProvider>
        </AuthProvider>
    );
}

export default App;


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Header from './components/Header.jsx';
// import Footer from './components/Footer.jsx';
// import Home from './components/Home.jsx';
// import About from './components/About.jsx';
// import Contact from './components/Contact.jsx';
// import ProductList from './components/ProductList.jsx';
// import ProductDetails from './components/ProductDetails.jsx';
// import Login from './components/Login.jsx';
// import CustomerDashboard from './components/CustomerDashboard.jsx';
// import AdminDashboard from './components/AdminDashboard.jsx';
//
// function App() {
//     return (
//         <Router>
//             <Header />
//             <Routes>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/about" element={<About />} />
//                 <Route path="/contact" element={<Contact />} />
//                 <Route path="/products" element={<ProductList />} />
//                 <Route path="/products/:id" element={<ProductDetails />} />
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/customer" element={<CustomerDashboard />} />
//                 <Route path="/admin" element={<AdminDashboard />} />
//             </Routes>
//             <Footer />
//         </Router>
//     );
// }
//
// export default App;



// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
//
// function App() {
//   const [count, setCount] = useState(0)
//
//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }
//
// export default App
