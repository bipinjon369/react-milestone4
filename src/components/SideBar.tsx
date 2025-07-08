// SideBar.jsx
import { sidebarItems1, sidebarItems2, sidebarItems3 } from '../data/data'

export default function SideBar() {
    const handleItemClick = (item: string) => {
        if (item === 'Products') {
            window.location.href = '/';
        }
    };
    return (
        <div className="h-full flex flex-col bg-[#F6F8F9] pr-4">
            <div className='pl-[26px] pt-[21px]'>
                <h1 className='text-sidebar-h1'>FakeApp</h1>
            </div>
            
            {/* First set of items */}
            <nav className='flex flex-col flex-1'>
                <ol className='pl-4 pt-6'>
                    {sidebarItems1.map((record, index) => {
                        const imagePadding = record.icon ? '' : 'pl-10'
                        const isSelected = record.item === 'Products'
                        return (
                            <li key={index}>
                                <button 
                                    onClick={() => handleItemClick(record.item)}
                                    className={`flex items-center gap-2 py-1 w-[208px] rounded-[6px] transition-colors duration-200 ${
                                        isSelected 
                                            ? 'bg-[#D7EDFF]' 
                                            : 'hover:bg-[#D7EDFF]'
                                    }`}>
                                    {record.icon && <div className='pl-2'>
                                        <img src={record.item.toLowerCase().replace(/\s/g, '_') + '.svg'} alt="" />
                                    </div>}
                                    <span className={`${
                                        isSelected 
                                            ? `text-sidebar-selected-text text-[#4094F7] ${imagePadding}` 
                                            : `text-sidebar-menu-text text-sidebar-text-color ${imagePadding}`
                                    } transition-colors duration-200`}>{record.item}</span>
                                </button>
                            </li>
                        )
                    })}
                </ol>
                
                {/* Second set of items */}
                <ol className='pl-4 pt-4'>
                    {sidebarItems2.map((record, index) => {
                        const imagePadding = record.icon ? '' : 'pl-10'
                        const isSelected = record.item === 'Products'
                        return (
                            <li key={index}>
                                <button 
                                    onClick={() => handleItemClick(record.item)}
                                    className={`flex items-center gap-2 py-1 w-[208px] rounded-[6px] transition-colors duration-200 ${
                                        isSelected 
                                            ? 'bg-[#D7EDFF]' 
                                            : 'hover:bg-[#D7EDFF]'
                                    }`}>
                                    {record.icon && <div className='pl-2'>
                                        <img src={record.item.toLowerCase().replace(/\s/g, '_') + '.svg'} alt="" />
                                    </div>}
                                    <span className={`${
                                        isSelected 
                                            ? `text-sidebar-selected-text text-[#4094F7] ${imagePadding}` 
                                            : `text-sidebar-menu-text text-sidebar-text-color ${imagePadding}`
                                    } transition-colors duration-200`}>{record.item}</span>
                                </button>
                            </li>
                        )
                    })}
                </ol>
                
                {/* Third set of items - will be at bottom */}
                <ol className='pl-4 pb-4 mt-auto'>
                    {sidebarItems3.map((record, index) => {
                        const imagePadding = record.icon ? '' : 'pl-10'
                        const isSelected = record.item === 'Products'
                        return (
                            <li key={index}>
                                <button 
                                    onClick={() => handleItemClick(record.item)}
                                    className={`flex items-center gap-2 py-1 w-[208px] rounded-[6px] transition-colors duration-200 ${
                                        isSelected 
                                            ? 'bg-[#D7EDFF]' 
                                            : 'hover:bg-[#D7EDFF]'
                                    }`}>
                                    {record.icon && <div className='pl-2'>
                                        <img src={record.item.toLowerCase().replace(/\s/g, '_') + '.svg'} alt="" />
                                    </div>}
                                    <span className={`${
                                        isSelected 
                                            ? `text-sidebar-selected-text text-[#4094F7] ${imagePadding}` 
                                            : `text-sidebar-menu-text text-sidebar-text-color ${imagePadding}`
                                    } transition-colors duration-200`}>{record.item}</span>
                                </button>
                            </li>
                        )
                    })}
                </ol>
            </nav>
        </div>
    )
}