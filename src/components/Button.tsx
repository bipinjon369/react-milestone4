export default function Button ({ buttonText, width, icon} : { buttonText: string, width: string, icon: string}) {
    return (
        <button className={`flex items-center justify-center bg-[#4094F7] h-[32px] rounded-[6px]`}
        style={{ width: width || '136px' }}>
            {icon && <img src={icon}/>}
            <span className="text-button-text text-[#F6F8F9]">{buttonText}</span>
        </button>
    )
}