import { Routes, Route } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Checkout } from '../pages/Checkout'
import { OrderConfirmation } from '../pages/OrderConfirmation'

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirmation" element={<OrderConfirmation />} />
            <Route path="*" element={<p>Not found</p>} />
        </Routes>
    )
}

export default AppRoutes