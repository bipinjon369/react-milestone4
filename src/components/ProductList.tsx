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

export default function ProductList ({products}: {products: Product[] | null}) {
    const handlePageChange = () => {
        console.log('We changed')
    }
    return (
        <div className="pt-7">
            {/* Table headers */}
            <div className="overflow-auto max-h-[calc(100vh-245px)]">
                <table className="table-fixed w-full border-collapse">
                    <colgroup>
                        <col className="w-12" /> {/* checkbox */}
                        <col className="w-20" /> {/* image */}
                        <col className="w-48" /> {/* title */}
                        <col className="w-80" /> {/* description - wider */}
                        <col className="w-24" /> {/* price */}
                        <col className="w-24" /> {/* actions */}
                    </colgroup>
                    <thead className="sticky top-0 bg-white z-10 shadow-[0_1px_0_0_#E5E9EB]">
                        <tr>
                            {productHeaders.map((header, index) => (
                                <th key={index} className="px-3 pb-[11px] text-table-header-text text-table-header-text-color text-left">
                                    {header === 'checkbox' ?
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 rounded-[4px] border border-[#B0BABF] bg-[#F6F8F9] text-blue-600 focus:outline-none disabled:opacity-50"
                                    />
                                    : header.toUpperCase()}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    {/* Table rows */}
                    <tbody>
                        {products?.map((record) => (
                            <tr key={record.id}>
                                <td className="px-3 py-1">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 rounded-[4px] border border-[#B0BABF] bg-[#F6F8F9] text-blue-600 focus:outline-none disabled:opacity-50"
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
                                    <div className="truncate font-medium">
                                        ${record.price}
                                    </div>
                                </td>
                                <td className="px-3 py-1">
                                    <div className="truncate">
                                        {/* Add your action buttons here */}
                                        <button className="text-blue-600 text-sm">Edit</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Paginator currentPage={1} pageCount={10} onPageChange={handlePageChange} />
        </div>
    )
}