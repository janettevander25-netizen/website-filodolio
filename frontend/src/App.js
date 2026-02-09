import { useState } from 'react';
import '@/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import OrderPage from './pages/OrderPage';
import ContactPage from './pages/ContactPage';

function App() {
  const [cart, setCart] = useState([]);
  const cartCount = cart.reduce((sum, c) => sum + c.quantity, 0);

  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[#0F120D] font-body">
          <Navbar cartCount={cartCount} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/order" element={<OrderPage cart={cart} setCart={setCart} />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
