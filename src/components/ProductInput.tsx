import { useState, ChangeEvent, FormEvent } from 'react';
import Button from './Button';
import ProductUpload from './ProductUpload'

interface InputField {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  required: boolean;
}

interface ProductInputProps {
  fields?: InputField[];
  onSubmit?: (formData: Record<string, string>) => void;
}

export default function ProductInput({ 
  fields = [], 
  onSubmit 
}: ProductInputProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleImageUploaded = (url: string) => {
    // Fix: Use the url parameter directly, not imageUrl state
    setFormData(prev => ({ ...prev, image_url: url }));
    
    // Clear image error when upload succeeds
    if (errors.image_url) {
      setErrors(prev => ({ ...prev, image_url: '' }));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log('The form data', formData);
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const newErrors: Record<string, string> = {};
    
    // Validate form fields
    fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });
    
    // Validate image upload (outside the loop)
    if (!formData.image_url) {
      newErrors['image_url'] = `Please upload an Image`;
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Call onSubmit if provided
    onSubmit?.(formData);
  };

  // Group fields for layout (description gets its own row)
  const renderFields = () => {
    const normalFields = fields.filter(field => field.type !== 'textarea');
    const textareaFields = fields.filter(field => field.type === 'textarea');
    
    // Render normal fields in pairs
    const pairs = [];
    for (let i = 0; i < normalFields.length; i += 2) {
      const pair = normalFields.slice(i, i + 2);
      pairs.push(pair);
    }

    return (
      <>
        <ProductUpload 
          onImageUploaded={handleImageUploaded} 
          error={errors.image_url ?? ''} 
        />
        
        {/* Render pairs of normal fields */}
        {pairs.map((pair, index) => (
          <div key={index} className="flex gap-4 mb-6">
            {pair.map(field => (
              <div key={field.name} className="flex-1">
                <label 
                  htmlFor={field.name} 
                  className="text-label-text text-[#5E6366] mb-[6px] block"
                >
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                
                <input
                  id={field.name}
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  className="w-full border border-[#DDE2E4] rounded-[8px] p-2 focus:outline-none focus:ring-2 focus:ring-[#5E6366]"
                />
                
                {errors[field.name] && (
                  <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
                )}
              </div>
            ))}
          </div>
        ))}

        {/* Render textarea fields (each on its own row) */}
        {textareaFields.map(field => (
          <div key={field.name} className="mb-6">
            <label 
              htmlFor={field.name} 
              className="text-label-text text-[#5E6366] mb-[6px] block"
            >
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            
            <textarea
              id={field.name}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name] || ''}
              onChange={handleChange}
              className="w-full h-[41.8px] border border-[#DDE2E4] rounded-[8px] p-2 focus:outline-none focus:ring-2 focus:ring-[#5E6366]"
              rows={4}
            />
            
            {errors[field.name] && (
              <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
            )}
          </div>
        ))}
      </>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      {renderFields()}
      <Button buttonText='Add' width='375px'/>
    </form>
  );
}