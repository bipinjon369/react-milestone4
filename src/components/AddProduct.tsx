import { useState } from 'react'
import ProductUpload from './ProductUpload'
import ProductInput from './ProductInput'

const inputFields = [
    {
        label: 'Title',
        name: 'title',
        type: 'text',
        placeholder: 'Enter title',
        required: true
    },
    {
        label: 'Price',
        name: 'price',
        type: 'number',
        placeholder: 'Enter price',
        required: true
    },
    {
        label: 'Description',
        name: 'description',
        type: 'textarea',
        placeholder: 'Enter description',
        required: false
    }
]

export default function AddProduct() {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    
    const handleFormSubmit = (formData: Record<string, string>) => {
        // Here you would typically send the data to your backend
        console.log('Form data:', { ...formData, image: imageUrl });
    };
    
    const handleImageUploaded = (url: string) => {
        setImageUrl(url);
    };

    return (
        <>
            <div className="flex flex-row justify-between items-center pt-8 pb-2 border-b border-b-[#E5E9EB]">
                <h1 className="text-product-header-text">Add Product</h1>
            </div>
            <div>
                <ProductUpload onImageUploaded={handleImageUploaded} />
                <ProductInput 
                    fields={inputFields} 
                    onSubmit={handleFormSubmit} 
                />
            </div>
        </>
    )
}