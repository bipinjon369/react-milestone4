import type { Product } from "../data/types"

const productHeaders = [
    'checkbox',
    'image',
    'title',
    'description',
    'price',
    'actions'
]
export default function ProductList ({products}: {products: Product[] | null}) {
    return (
        <div className="pt-7">
            {/* Table headers */}
            <div className="overflow-auto max-h-[calc(100vh-170px)]">
                <table className="table-fixed w-full border-collapse">
                    <thead className="sticky top-0 bg-white z-10">
                        <tr className="border-b border-b-[#E5E9EB]">
                            {productHeaders.map((header, index) => (
                                <th key={index} className="pb-[11px] text-table-header-text text-table-header-text-color text-left">
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
                                <td>
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 rounded-[4px] border border-[#B0BABF] bg-[#F6F8F9] text-blue-600 focus:outline-none disabled:opacity-50"
                                    />
                                </td>
                                <td>
                                    <img className="h-12 w-12 rounded-[8px]" src={record.images[0]} />
                                </td>
                                <td>
                                    {record.title}
                                </td>
                                <td>
                                    {record.description}
                                </td>
                                <td>
                                    {record.price}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}