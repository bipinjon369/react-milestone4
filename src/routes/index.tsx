import { Route, Routes, BrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import ProductListing from '../components/ProductListing';
import AddProduct from '../components/AddProduct';

export default function AppRoutes () {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProductListing />} />
                <Route path="/add-product" element={<AddProduct />} />
            </Routes>
        </BrowserRouter>
    )
}