import ProductInput from './ProductInput'
import ToastMessage from './ToastMessage';

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
    
    const handleFormSubmit = (formData: Record<string, string>) => {
        // Here you would typically send the data to your backend
        console.log('Form data:', { ...formData });
    };
    

    return (
        <div className='ml-[42px] w-[850px]'>
            <div className="flex flex-row justify-between items-center pt-8 pb-2 border-b border-b-[#E5E9EB]">
                <h1 className="text-product-header-text">Add Product</h1>
            </div>
            <div>
                <ToastMessage message='Something happened' type='success' />
                <ProductInput 
                    fields={inputFields} 
                    onSubmit={handleFormSubmit} 
                />
            </div>
        </div>
    )
}