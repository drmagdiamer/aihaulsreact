import { useState } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

export default function ManageCustomListPage() {
    return (
        <div>
            <Header />
            <div className="container-fluid px-4 py-4">
                <h2>Custom Lists</h2>
                <p>Custom list creation and editing will go here.</p>
            </div>
            <Footer />
        </div>
    );
}

