import { Route, Routes, BrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import ProductListing from '../components/ProductListing';
import AddProduct from '../components/AddProduct';

interface AppRoutesProps {
    searchText: string;
}

export default function AppRoutes ({ searchText }: AppRoutesProps) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProductListing searchText={searchText} />} />
                <Route path="/add-product" element={<AddProduct />} />
            </Routes>
        </BrowserRouter>
    )
}