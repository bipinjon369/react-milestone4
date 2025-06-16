interface ToastMessageProps {
  message: string,
  type: string
}

export default function ToastMessage ({ message, type}: ToastMessageProps) {
    return (
        <div className={`absolute top-6 right-6 flex items-center border ${type === 'success' ? 'bg-[#EBFFF1] border-[#22C348]' : 'bg-red-200'} w-[350px] h-[52px] rounded-[8px] shadow-[0px_16px_20px_-8px_#0305121A]`}>
            <img className="ml-[16px] mr-3" src={type+'_toast.svg'}/>
            <span className="text-toast-text text-[#28292A]">{message}</span>
            <img className='ml-auto mr-4' src={`close_${type}_toast.svg`} />
        </div>
    )
}