// src/components/Welcome.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

function Welcome() {
    const [selectedValue, setSelectedValue] = useState("");
    const [person, setPerson] = useState(null);
    const [error, setError] = useState("");

    // Simulated JWT token (replace with actual token retrieval logic)
    // const jwtToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhQGEuY29tIiwiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6IjEifV0sImlhdCI6MTczOTgyOTUxMiwiZXhwIjoxNzM5ODMzMTEyfQ.Lt4l4YGCQ07TU3r2wIPAuETecu4SaOMyiqa9EVocuakrCIELkEeILjoGtifJWJ2blpcja9SsQuqmrS6ABWmscg";
    const token = localStorage.getItem('jwtToken');
    console.log(token);
    const handleSelectionChange = async (event) => {
        const value = event.target.value;
        setSelectedValue(value);

        // Prevent API call if "Please choose" is selected
        if (value === "Please choose") {
            setPerson(null);
            setError("");
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:8015/admin/person/${value}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Include JWT Token
                }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }

            const data = await response.json();
            setPerson(data);
            setError("");
        } catch (err) {
            setPerson(null);
            setError("Error fetching data. Please try again.");
        }
    };

    return (
        <>
            <Header />
            <section id="Welcome">
                <div style={{ textAlign: "center", marginTop: "50px" }}>
                    <h1>Welcome</h1>

                    <label htmlFor="personSelect">Choose a person:</label>
                    <select id="personSelect" value={selectedValue} onChange={handleSelectionChange}>
                        <option>Please choose</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>

                    {error && <p style={{ color: "red" }}>{error}</p>}

                    {person && (
                        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
                            <h2>Person Details</h2>
                            <p><strong>ID:</strong> {person.id}</p>
                            <p><strong>Name:</strong> {person.name}</p>
                            <p><strong>Email:</strong> {person.email}</p>
                        </div>
                    )}
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Welcome;