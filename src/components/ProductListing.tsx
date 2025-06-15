import { useEffect, useState } from "react";

import ProductHeader from "./ProductHeader"
import ProductList from "./ProductList"
import useApi from "../services/useApi";

import type { Product } from "../data/types";

interface ProductListingProps {
    searchText?: string;
}

export default function ProductListing({ searchText = '' }: ProductListingProps) {
    // Call the get api
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0); // Set initial value to 3
    const limit = 10;
    // To get the selected product
    const { getAPI } = useApi();

    // Fetch paginated products when page changes or search text changes
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null); // Reset error state
                const offset = (currentPage - 1) * limit;
                // Fetch the total count first
                const countResult = await getAPI(`products${searchText && '?title=' + searchText}`);
                setTotalPages(Math.ceil(countResult.data.length / limit));
                console.log('The count result: ', (Math.ceil(countResult.data.length / limit)))
                console.log('The pages: ', totalPages)
                // Fetch products
                const apiEndpoint = `products?offset=${offset}&limit=${limit}${searchText && '&title=' + searchText}`;
                const res: { error: unknown, data: Product[] } = await getAPI(apiEndpoint);
                
                // Filter products by search text if provided
                const filteredProducts = res.data;
                console.log('The products: ', filteredProducts)
                
                setProducts(filteredProducts);
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
    }, [currentPage, searchText]); // Add searchText as dependency

    // Handle loading state
    if (loading) {
        return (
            <div className="ml-10 mr-[29px]">
                <div className="flex justify-center items-center h-64 text-gray-500">
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