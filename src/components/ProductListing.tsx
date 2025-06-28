import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import ProductHeader from "./ProductHeader";
import ProductList from "./ProductList";
import ToastMessage from "./ToastMessage";
import DeleteModal from "./DeleteModal";
import useApi from "../services/useApi";

import type { Product } from "../data/types";

interface ProductListingProps {
    searchText?: string;
}

interface LocationState {
    showToast?: boolean;
    toastMessage?: string;
    toastType?: 'success' | 'error';
}

export default function ProductListing({ searchText = '' }: ProductListingProps) {
    const location = useLocation();
    const state = location.state as LocationState;
    
    // Toast state
    const [showToast, setShowToast] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');
    
    // Modal state
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);
    const [isModalLoading, setIsModalLoading] = useState<boolean>(false);
    // Products state
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
    const limit = 10;
    
    const { getAPI, DeleteAPI } = useApi();

    // Check for toast message in navigation state
    useEffect(() => {
        if (state?.showToast && state?.toastMessage) {
            setShowToast(true);
            setToastMessage(state.toastMessage);
            setToastType(state.toastType || 'success');
            
            // Clear the state to prevent showing toast on refresh
            window.history.replaceState({}, document.title);
            
            // Auto-hide toast after 3 seconds
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        }
    }, [state]);

    // Fetch paginated products when page changes or search text changes
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null); // Reset error state
                const offset = (currentPage - 1) * limit;
                // Fetch the total count first
                const countResult = await getAPI(`products${searchText ? '?title=' + searchText : ''}`);
                setTotalPages(Math.ceil(countResult.data.length / limit));
                
                // Fetch products
                const apiEndpoint = `products?offset=${offset}&limit=${limit}${searchText ? '&title=' + searchText : ''}`;
                const res: { error: unknown, data: Product[] } = await getAPI(apiEndpoint);
                
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
    }, [currentPage, searchText, refreshTrigger]);

    // Handle delete button click - callback from ProductList
    const handleDeleteClick = (product: Product) => {
        setProductToDelete(product);
        setShowDeleteModal(true);
    };

    // Handle modal close - delay clearing product data
    const handleCloseModal = () => {
        setShowDeleteModal(false);
        // Delay clearing product data to prevent name disappearing during close animation
        setTimeout(() => {
            setProductToDelete(null);
        }, 300); // Adjust timing based on modal close animation duration
    };

    // Handle actual delete
    const handleConfirmDelete = async () => {
        if (productToDelete) {
            try {
                setIsModalLoading(true);
                await DeleteAPI(`products/${productToDelete.id}`);
                
                // Close modal and show success toast
                handleCloseModal();
                setToastMessage('Product deleted successfully!');
                setToastType('success');
                setShowToast(true);
                
                // Refresh products list by triggering useEffect
                setRefreshTrigger(prev => prev + 1);
            } catch (error) {
                console.error('Error deleting product:', error);
                setToastMessage('Failed to delete product');
                setToastType('error');
                setShowToast(true);
            } finally {
                setIsModalLoading(false);
            }
        }
    };

    const handleCloseToast = () => {
        setShowToast(false);
    };

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
        <div className="ml-10 mr-[29px] relative">
            {showToast && (
                <div className="fixed top-3 right-3 z-50">
                    <ToastMessage 
                        message={toastMessage} 
                        type={toastType}
                        onClose={handleCloseToast}
                    />
                </div>
            )}
            
            <DeleteModal
                isModalOpen={showDeleteModal}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                productName={productToDelete?.title || ''}
                loading={isModalLoading}
            />
            
            <ProductHeader />
            <ProductList 
                products={products} 
                currentPage={currentPage} 
                pageCount={totalPages} 
                onPageChange={handlePageChange}
                onDeleteClick={handleDeleteClick}
            />
        </div>
    );
}