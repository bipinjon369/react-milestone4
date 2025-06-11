import { useState } from "react"
import type { Product } from "../data/types"
import Paginator from "./Paginator"

const productHeaders = [
    'checkbox',
    'image',
    'title',
    'description',
    'price',
    'actions'
]

export default function ProductList ({
    products, 
    currentPage = 1, 
    pageCount = 1, 
    onPageChange
}: {
    products: Product[] | null,
    currentPage?: number,
    pageCount?: number,
    onPageChange: (page: number) => void
}) {
    // State to store selected product IDs
    const [selectedProducts, setSelectedProducts] = useState<string[]>([])
    
    // Check if all products are selected
    const isAllSelected = products ? selectedProducts.length === products.length : false
    
    // Handle header checkbox (select/deselect all)
    const handleHeaderCheckboxChange = () => {
        if (isAllSelected) {
            // Deselect all
            setSelectedProducts([])
        } else {
            // Select all
            setSelectedProducts(products?.map(product => product.id) || [])
        }
    }
    
    // Handle individual product checkbox
    const handleProductCheckboxChange = (productId: string) => {
        setSelectedProducts(prev => {
            if (prev.includes(productId)) {
                // Remove from selection
                return prev.filter(id => id !== productId)
            } else {
                // Add to selection
                return [...prev, productId]
            }
        })
    }
    
    // Handler to change the page
    const handlePageChange = (page: number) => {
        // Clear selections when changing page
        setSelectedProducts([])
        // Call the parent's onPageChange handler
        onPageChange(page)
    }
    
    return (
        <div className="pt-7">
            {/* Table headers */}
            <div className="overflow-auto max-h-[calc(100vh-245px)]">
                <table className="table-fixed w-full border-collapse">
                    <colgroup>
                        <col className="w-12"/>{/* checkbox */}
                        <col className="w-20"/>{/* image */}
                        <col className="w-48"/>{/* title */}
                        <col className="w-80"/>{/* description - wider */}
                        <col className="w-24"/>{/* price */}
                        <col className="w-24"/>{/* actions */}
                    </colgroup>
                    <thead className="sticky top-0 bg-white z-10 shadow-[0_1px_0_0_#E5E9EB]">
                        <tr>
                            {productHeaders.map((header, index) => (
                                <th key={index} className="px-3 pb-[11px] text-table-header-text text-table-header-text-color text-left">
                                    {header === 'checkbox' ?
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 rounded-[4px] border border-[#B0BABF] bg-[#F6F8F9] text-blue-600 focus:outline-none disabled:opacity-50"
                                        checked={isAllSelected}
                                        onChange={handleHeaderCheckboxChange}
                                    />
                                    : header.toUpperCase()}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    {/* Table rows */}
                    <tbody>
                        {products?.map((record) => (
                            <tr key={record.id} className="h-[64.2px]">
                                <td className="px-3 py-1">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 rounded-[4px] border border-[#B0BABF] bg-[#F6F8F9] text-blue-600 focus:outline-none disabled:opacity-50"
                                        checked={selectedProducts.includes(record.id)}
                                        onChange={() => handleProductCheckboxChange(record.id)}
                                    />
                                </td>
                                <td className="px-3 pt-1 pb-2">
                                    <img 
                                        className="h-12 w-12 rounded-[8px] object-cover" 
                                        src={record.images[0]} 
                                        alt={record.title}
                                    />
                                </td>
                                <td className="px-3 py-1">
                                    <div className="truncate">
                                        {record.title}
                                    </div>
                                </td>
                                <td className="px-3 py-1">
                                    <div className="truncate text-sm text-gray-600">
                                        {record.description}
                                    </div>
                                </td>
                                <td className="px-3 py-1">
                                    <div className="truncate">
                                        ${record.price}
                                    </div>
                                </td>
                                <td className="px-3 py-1">
                                    <div className='flex items-center gap-[22px]'>
                                        {/* Add your action buttons here */}
                                        <button>
                                            <img src='delete.svg'/>
                                        </button>
                                        <button>
                                            <img src='edit.svg'/>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Paginator currentPage={currentPage} pageCount={pageCount} onPageChange={handlePageChange} />
        </div>
    )
}