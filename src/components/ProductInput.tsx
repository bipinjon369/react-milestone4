import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Button from './Button';
import ProductUpload from './ProductUpload';

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
  isLoading?: boolean;
  initialData?: Record<string, string> | null;
  buttonText?: string;
}

export default function ProductInput({ 
  fields = [], 
  onSubmit,
  isLoading = false,
  initialData = null,
  buttonText = 'Add'
}: ProductInputProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiErrors, setApiErrors] = useState<Record<string, string>>({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Prefill form data when initialData is provided
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleImageUploaded = (url: string) => {
    setFormData(prev => ({ ...prev, image_url: url }));
    
    // Clear image error when upload succeeds
    if (errors.image_url && url) {
      setErrors(prev => ({ ...prev, image_url: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Validate form fields
    fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });
    
    // Validate image upload
    if (!formData.image_url) {
      newErrors['image_url'] = `Please upload an Image`;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear API errors when field changes
    if (apiErrors[name]) {
      setApiErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Only clear errors when a field has a value, don't add new errors on change
    if (formSubmitted && value) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    
    // Validate all fields
    const isValid = validateForm();
    
    if (!isValid) {
      return;
    }
    
    // Clear any previous API errors
    setApiErrors({});
    
    try {
      // Call onSubmit if provided and form is valid
      if (onSubmit) {
        await onSubmit(formData);
      }
    } catch (error: any) {
      // Handle specific API errors
      if (error.message === 'TITLE_EXISTS') {
        setApiErrors({ title: 'Title already exists' });
      }
    }
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
          error={errors.image_url}
          initialImageUrl={formData.image_url}
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
                  className={`w-full border ${(apiErrors[field.name] || errors[field.name]) ? 'border-red-500' : 'border-[#DDE2E4]'} rounded-[8px] p-2 focus:outline-none focus:ring-2 focus:ring-[#5E6366]`}
                  disabled={isLoading}
                />
                
                {(errors[field.name] || apiErrors[field.name]) && (
                  <p className="text-red-500 text-sm mt-1">
                    {apiErrors[field.name] || errors[field.name]}
                  </p>
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
              className={`w-full border ${(apiErrors[field.name] || errors[field.name]) ? 'border-red-500' : 'border-[#DDE2E4]'} rounded-[8px] p-2 focus:outline-none focus:ring-2 focus:ring-[#5E6366]`}
              rows={4}
              disabled={isLoading}
            />
            
            {(errors[field.name] || apiErrors[field.name]) && (
              <p className="text-red-500 text-sm mt-1">
                {apiErrors[field.name] || errors[field.name]}
              </p>
            )}
          </div>
        ))}
      </>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      {renderFields()}
      <Button 
        buttonText={buttonText} 
        width='375px' 
        isLoading={isLoading}
        disabled={isLoading}
      />
    </form>
  );
}