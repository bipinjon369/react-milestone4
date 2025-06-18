interface ToastMessageProps {
  message: string;
  type: 'success' | 'error';
  onClose?: () => void;
}

export default function ToastMessage({ message, type, onClose }: ToastMessageProps) {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className={`flex items-center border ${
      type === 'success' ? 'bg-[#EBFFF1] border-[#22C348]' : 'bg-[#FEF3F2] border-[#F04438]'
    } w-[350px] h-[52px] rounded-[8px] shadow-[0px_16px_20px_-8px_#0305121A]`}>
      <img 
        className="ml-[16px] mr-3" 
        src={`/${type}_toast.svg`} 
        alt={type === 'success' ? 'Success' : 'Error'} 
      />
      <span className="text-toast-text text-[#28292A]">{message}</span>
      <button 
        onClick={handleClose}
        className="ml-auto mr-4 cursor-pointer"
        aria-label="Close"
      >
        <img 
          src={`/close_${type}_toast.svg`} 
          alt="Close" 
          width="24" 
          height="24" 
        />
      </button>
    </div>
  );
}