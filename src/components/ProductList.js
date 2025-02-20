import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get('http://localhost:3001/products'); // Backend API endpoint
                setProducts(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []); // Empty dependency array means this effect runs once on mount

    if (loading) {
        return <p>Loading products...</p>;
    }

    if (error) {
        return <p>Error loading products: {error.message}</p>;
    }

    return (
        <div>
            <h1>Product List</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Stock Quantity</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.productName}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>{product.stockQuantity}</td>
                            <td>{product.category ? product.category.categoryName : 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductList;