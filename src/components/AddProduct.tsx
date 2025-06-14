import ProductUpload from './ProductUpload'

export default function AddProduct () {
    return (
        <>
            <div className="flex flex-row justify-between items-center pt-8 pb-2 border-b border-b-[#E5E9EB]">
                <h1 className="text-product-header-text">Add Product</h1>
            </div>
            <div>
                <ProductUpload />
            </div>
        </>
    )
}