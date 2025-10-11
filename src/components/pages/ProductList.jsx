// src/components/ProductList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://javainnovations.com/public/products')
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error('Error fetching products:', error));
    }, []);

    return (
        <section id="products">
            <div className="container">
                <h2>Our Products</h2>
                {products.length === 0 ? (
                    <p>Loading products...</p>
                ) : (
                    <ul>
                        {products.map((product) => (
                            <li key={product.id}>
                                <h3>{product.title}</h3>
                                <p>{product.shortDescription}</p>
                                <Link to={`/products/${product.id}`}>View Details</Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}

export default ProductList;
