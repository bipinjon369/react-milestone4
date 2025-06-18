import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function ProductHeader() {
    const navigate = useNavigate();
    
    const handleAddProductClick = () => {
        navigate('/add-product');
    };
    
    return (
        <div className="flex flex-row justify-between items-center pt-8 pb-2 border-b border-b-[#E5E9EB]">
            <h1 className="text-product-header-text">Products</h1>
            <div className="flex">
                <button className="flex mr-2 items-center w-[85px] h-[32px] justify-center border border-[#DDE2E4] rounded-[6px]">
                    <img src="filter.svg" alt="filter" className="" />
                    <span className="text-sidebar-menu-text">Filter</span>
                </button>
                <button className="flex mr-[21px] items-center w-[96px] h-[32px] justify-center border border-[#DDE2E4] rounded-[6px]">
                    <img src="export.svg" alt="filter" className="" />
                    <span className="text-sidebar-menu-text">Export</span>
                </button>
                <Button 
                    buttonText="Add Product" 
                    width="136px" 
                    icon="add.svg" 
                    onClick={handleAddProductClick}
                    type="button"
                />
            </div>
        </div>
    );
}