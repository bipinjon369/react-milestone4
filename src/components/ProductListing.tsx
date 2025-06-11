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
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(3); // Set initial value to 4 (40/10)
    const limit = 10;
    // To get the selected product
    const { getAPI } = useApi();

    // Fetch paginated products when page changes
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                console.log('Curr page: ', currentPage)
                setLoading(true);
                setError(null); // Reset error state
                const offset = (currentPage - 1) * limit;
                console.log('Offset: ', offset)
                const res: { error: unknown, data: Product[] } = await getAPI(`products?offset=${offset}&limit=${limit}`);
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
        
        fetchProducts();
    }, [currentPage]); // Add currentPage as dependency

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

    // Handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="ml-10 mr-[29px]">
            <ProductHeader />
            <ProductList 
                products={products} 
                currentPage={currentPage} 
                pageCount={totalPages} 
                onPageChange={handlePageChange} 
            />
        </div>
    );
}