// src/components/ProductDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        fetch(`https://javainnovations.com/public/products/${id}`)
            .then((response) => response.json())
            .then((data) => setProduct(data))
            .catch((error) => console.error('Error fetching product details:', error));
    }, [id]);

    useEffect(() => {
        if (product?.images?.length) {
            const interval = setInterval(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [product]);

    if (!product) {
        return <p>Loading product details...</p>;
    }

    return (
        <>
            <Header />
            <section id="product-details">
                <div className="container">
                    <h2>{product.title}</h2>
                    <p>{product.longDescription}</p>
                    {product.images && product.images.length > 0 && (
                        <div className="product-image-slider">
                            <img
                                src={product.images[currentImageIndex]}
                                alt={product.title}
                                style={{ width: '100%' }}
                            />
                        </div>
                    )}
                </div>
            </section>
            <Footer />
        </>
    );
}

export default ProductDetails;
