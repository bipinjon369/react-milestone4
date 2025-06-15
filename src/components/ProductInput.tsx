import { useState, ChangeEvent, FormEvent } from 'react';

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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });
    
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
              className="w-full border border-[#DDE2E4] rounded-[8px] p-2 focus:outline-none focus:ring-2 focus:ring-[#5E6366]"
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
      
      <div className="mt-8">
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Product
        </button>
      </div>
    </form>
  );
}