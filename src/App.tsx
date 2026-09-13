import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { CartProvider } from './context/CartContext';
import { AboutPage } from './pages/AboutPage';
import { CartPage } from './pages/CartPage';
import { CatalogPage } from './pages/CatalogPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ComparePage } from './pages/ComparePage';
import { ContactsPage } from './pages/ContactsPage';
import { DeliveryPage } from './pages/DeliveryPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { ProductPage } from './pages/ProductPage';

export default function App() {
  const Router = import.meta.env.VITE_HASH_ROUTER === 'true' ? HashRouter : BrowserRouter;

  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/katalog" element={<CatalogPage />} />
            <Route path="/katalog/:categorySlug" element={<CatalogPage />} />
            <Route path="/tovar/:productSlug" element={<ProductPage />} />
            <Route path="/sravnenie" element={<ComparePage />} />
            <Route path="/dostavka-i-oplata" element={<DeliveryPage />} />
            <Route path="/dokumenty" element={<DocumentsPage />} />
            <Route path="/o-kompanii" element={<AboutPage />} />
            <Route path="/kontakty" element={<ContactsPage />} />
            <Route path="/korzina" element={<CartPage />} />
            <Route path="/oformlenie-zakaza" element={<CheckoutPage />} />
            <Route path="/politika-konfidencialnosti" element={<PrivacyPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}
