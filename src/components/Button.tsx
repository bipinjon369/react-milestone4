interface ButtonProps {
  buttonText: string;
  width: string;
  height?: string;
  icon?: string;
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'submit' | 'button';
  fill?: boolean;
}

export default function Button({ 
  buttonText, 
  width, 
  height,
  icon, 
  isLoading, 
  disabled,
  onClick,
  type = 'submit',
  fill = true
}: ButtonProps) {
  return (
    <button 
      className={`flex items-center justify-center ${disabled ? 'bg-[#A3CBFA]' : fill ? 'bg-[#4094F7]' : 'border border-[#D0D5DD]'} h-[32px] rounded-[6px]`}
      style={{ width: width || '136px', height: height || '44px' }}
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {isLoading ? (
        <div className="flex items-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-button-text text-[#F6F8F9]">Loading...</span>
        </div>
      ) : (
        <>
          {icon && <img src={icon} alt="" />}
          <span className={`text-button-text ${fill ? 'text-[#F6F8F9]' : 'text-[#344054]'}`}>{buttonText}</span>
        </>
      )}
    </button>
  );
}