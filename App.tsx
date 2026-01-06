
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { User, UserRole, Banner, Article, MallCategory, Product, StandardDownload, PointTier, ProcurementScenario } from './types';
import { 
  LOGO_URL, INITIAL_BANNERS, INITIAL_ARTICLES, MALL_CATEGORIES, 
  INITIAL_STANDARDS, POINT_TIERS, MOCK_PRODUCTS, INITIAL_SCENARIOS 
} from './constants';

// --- Shared State Context / Helper ---
const AppContext = React.createContext<any>(null);

// --- Pages: Public (Company Site) ---
import HomePage from './pages/Public/HomePage';
import MallPage from './pages/Public/MallPage';
import ForumPage from './pages/Public/ForumPage';
import ScenarioProcurement from './pages/Public/ScenarioProcurement';
import StaticPage from './pages/Public/StaticPage';
import StandardDownloads from './pages/Public/StandardDownloads';
import ProductDetail from './pages/Public/ProductDetail';
import LoginPage from './pages/Public/LoginPage';

// --- Pages: Admin ---
import AdminDashboard from './pages/Admin/Dashboard';
import ContentManagement from './pages/Admin/ContentManagement';
import MallManagement from './pages/Admin/MallManagement';
import UserManagement from './pages/Admin/UserManagement';
import ProductApproval from './pages/Admin/ProductApproval';
import PointsConfiguration from './pages/Admin/PointsConfiguration';
import VendorPanel from './pages/Admin/VendorPanel';

const App: React.FC = () => {
  // Global State for "Unified Backend" simulation
  const [user, setUser] = useState<User | null>(null);
  const [banners, setBanners] = useState<Banner[]>(INITIAL_BANNERS);
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [categories, setCategories] = useState<MallCategory[]>(MALL_CATEGORIES);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [standards, setStandards] = useState<StandardDownload[]>(INITIAL_STANDARDS);
  const [tiers, setTiers] = useState<PointTier[]>(POINT_TIERS);
  const [scenarios, setScenarios] = useState<ProcurementScenario[]>(INITIAL_SCENARIOS);

  return (
    <AppContext.Provider value={{
      user, setUser,
      banners, setBanners,
      articles, setArticles,
      categories, setCategories,
      products, setProducts,
      standards, setStandards,
      tiers, setTiers,
      scenarios, setScenarios
    }}>
      <HashRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/mall" element={<MallPage />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/scenarios" element={<ScenarioProcurement />} />
          <Route path="/downloads" element={<StandardDownloads />} />
          <Route path="/static/:id" element={<StaticPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/content" element={<ContentManagement />} />
          <Route path="/admin/mall" element={<MallManagement />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/approval" element={<ProductApproval />} />
          <Route path="/admin/points" element={<PointsConfiguration />} />
          
          {/* Vendor Routes */}
          <Route path="/vendor" element={<VendorPanel />} />
        </Routes>
      </HashRouter>
    </AppContext.Provider>
  );
};

export default App;
export { AppContext };
