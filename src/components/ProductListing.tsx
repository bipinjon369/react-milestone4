import { useEffect, useState } from "react";

import ProductHeader from "./ProductHeader"
import ProductList from "./ProductList"
import useApi from "../services/useApi";

import type { Product } from "../data/types";

export default function ProductListing() {
    // Call the get api
    const [products, setProducts] = useState<Product[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    // To get the selected product
    const [selectedProduct, setSelectedProduct] = useState('')
    const { getAPI } = useApi();
    
    // Function to get the selected product
    const handleSelectProduct = (product: Product) => {
        setSelectedProduct(product.id);
    };
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null); // Reset error state
                const res: { error: unknown, data: Product[]} = await getAPI('products');
                console.log(res.data);
                setProducts(res.data);
            } catch (err: unknown) {
                // Proper error handling for TypeScript
                const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
                setError(errorMessage);
                console.error('Error fetching products:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts(); // Actually call the function!
    }, []); // Add dependency array

    // Handle loading state
    if (loading) {
        return (
            <div className="ml-10 mr-[29px]">
                <div className="flex justify-center items-center h-64">
                    <p>Loading products...</p>
                </div>
            </div>
        );
    }

    // Handle error state
    if (error) {
        return (
            <div className="ml-10 mr-[29px]">
                <div className="flex justify-center items-center h-64">
                    <p className="text-red-500">Error: {error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="ml-10 mr-[29px]">
            <ProductHeader />
            <ProductList products={products} />
        </div>
    );
}