// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous error

        try {
            const response = await fetch('http://127.0.0.1:8015/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                // If response status is not OK, throw an error to be caught below.
                throw new Error('Login failed');
            }

            const data = await response.json();
            // Assume the returned data looks like: { token: "JWT_TOKEN_HERE" }
            const token = data.token;

            if (token) {
                // Use the login function from AuthContext to update state
                login(token);
                // Navigate to the welcome screen
                navigate('/welcome');
            } else {
                throw new Error('Token not found');
            }
        } catch (err) {
            console.error(err);
            setError('error in user/password. Please try again');
        }
    };

    return (
        <>
            <Header />
            <div className="container mt-4">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                            Username ::
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <div className="text-danger mb-3">{error}</div>}
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default Login;





// // src/components/Login.jsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Header from "./Header.jsx";
// import Footer from "./Footer.jsx";
//
// function Login() {
//     const navigate = useNavigate();
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Replace with real authentication logic
//         if (username) {
//             if (username === 'admin') {
//                 navigate('/admin');
//             } else {
//                 navigate('/customer');
//             }
//         } else {
//             setError('Invalid login credentials.');
//         }
//     };
//
//     return (
//         <>
//             <Header />
//             <section id="login">
//                 <div className="container">
//                     <h2>Login</h2>
//                     {error && <p style={{ color: 'red' }}>{error}</p>}
//                     <form onSubmit={handleSubmit}>
//                         <div>
//                             <label htmlFor="username">Username:</label>
//                             <input
//                                 type="text"
//                                 id="username"
//                                 value={username}
//                                 onChange={(e) => setUsername(e.target.value)}
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="password">Password:</label>
//                             <input
//                                 type="password"
//                                 id="password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                             />
//                         </div>
//                         <button type="submit">Login</button>
//                     </form>
//                 </div>
//             </section>
//             <Footer />
//         </>
//     );
// }
//
// export default Login;
