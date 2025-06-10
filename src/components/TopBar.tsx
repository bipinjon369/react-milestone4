export default function TopBar () {
    return (
        <div>
            {/* Search bar */}
            <div className='flex items-center py-4 pl-10'>
                <div className='pr-2'>
                    <img src='search.svg' alt='search' />
                </div>
                <input type='text' placeholder='Search...' className='text-sidebar-menu-text text-[#84919A] bg-transparent border-none outline-none' />
            </div>
        </div>
    )
}