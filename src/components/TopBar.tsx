export default function TopBar () {
    return (
        <div className="flex border-b border-[#E5E9EB]">
            {/* Search bar */}
            <div className='flex items-center py-4 pl-10'>
                <div className='pr-2'>
                    <img src='search.svg' alt='search' />
                </div>
                <input type='text' placeholder='Search...' className='text-sidebar-menu-text placeholder-[#84919A] bg-transparent border-none outline-none'/>
            </div>
            {/* Images */}
            <div className="flex items-center ml-auto pr-11 gap-3">
                <button>
                    <img src='feedback.svg'/>
                </button>
                <button>
                    <img src='notification.svg'/>
                </button>
                <button>
                    <img src='help.svg'/>
                </button>
                <button>
                    <img src='user.svg'/>
                </button>
            </div>
        </div>
    )
}