import { Route, Routes, BrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import ProductListing from '../components/ProductListing';

export default function AppRoutes () {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProductListing />} />
            </Routes>
        </BrowserRouter>
    )
}