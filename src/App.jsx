import React, { useState, useEffect } from 'react';
import { AppProvider } from './store/AppStore';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Toast from './components/Toast';

// 29 React Page Components
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import AddIngredient from './pages/AddIngredient';
import IngredientDetail from './pages/IngredientDetail';
import AddStock from './pages/AddStock';
import StockCounts from './pages/StockCounts';
import StartStockCount from './pages/StartStockCount';
import StockCountDetail from './pages/StockCountDetail';
import ReviewFinalize from './pages/ReviewFinalize';
import Wastage from './pages/Wastage';
import RecordWastage from './pages/RecordWastage';
import WastageDetail from './pages/WastageDetail';
import Transfers from './pages/Transfers';
import NewTransfer from './pages/NewTransfer';
import TransferDetail from './pages/TransferDetail';
import Purchases from './pages/Purchases';
import CreatePurchase from './pages/CreatePurchase';
import PurchaseDetail from './pages/PurchaseDetail';
import Suppliers from './pages/Suppliers';
import AddSupplier from './pages/AddSupplier';
import SupplierDetail from './pages/SupplierDetail';
import Recipes from './pages/Recipes';
import AddRecipe from './pages/AddRecipe';
import RecipeDetail from './pages/RecipeDetail';
import Production from './pages/Production';
import RecordProduction from './pages/RecordProduction';
import Reports from './pages/Reports';
import Staff from './pages/Staff';
import Settings from './pages/Settings';

import './app.css';

const ROUTE_PAGE_MAP = {
  'dashboard': Dashboard,
  'inventory': Inventory,
  'add-ingredient': AddIngredient,
  'ingredient-detail': IngredientDetail,
  'add-stock': AddStock,
  'stock-counts': StockCounts,
  'new-stock-count': StartStockCount,
  'stock-count-detail': StockCountDetail,
  'stock-count-review': ReviewFinalize,
  'wastage': Wastage,
  'new-wastage': RecordWastage,
  'wastage-detail': WastageDetail,
  'transfers': Transfers,
  'new-transfer': NewTransfer,
  'transfer-detail': TransferDetail,
  'purchases': Purchases,
  'new-purchase': CreatePurchase,
  'purchase-detail': PurchaseDetail,
  'suppliers': Suppliers,
  'add-supplier': AddSupplier,
  'supplier-detail': SupplierDetail,
  'recipes': Recipes,
  'add-recipe': AddRecipe,
  'recipe-detail': RecipeDetail,
  'production': Production,
  'record-production': RecordProduction,
  'reports': Reports,
  'staff': Staff,
  'settings': Settings
};

function getRouteFromHash() {
  const hash = window.location.hash.replace(/^#\/?/, '').split('?')[0].trim();
  return ROUTE_PAGE_MAP[hash] ? hash : 'dashboard';
}

function MainLayout() {
  const [currentRoute, setCurrentRoute] = useState(getRouteFromHash);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (!window.location.hash) {
      window.location.hash = 'dashboard';
    }

    const onHashChange = () => {
      const nextRoute = getRouteFromHash();
      setCurrentRoute(nextRoute);
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleNavigate = (routeKey) => {
    if (window.location.hash !== `#${routeKey}`) {
      window.location.hash = routeKey;
    } else {
      setCurrentRoute(routeKey);
      window.scrollTo(0, 0);
    }
  };

  const PageComponent = ROUTE_PAGE_MAP[currentRoute] || Dashboard;

  return (
    <div className="min-h-screen bg-surface flex flex-col font-body-md text-on-surface antialiased">
      {/* Shared Sidebar */}
      <Sidebar
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Shared Header */}
      <Header
        onOpenMobile={() => setMobileSidebarOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area without any iframes */}
      <div className="lg:pl-64 w-full">
        <main className="w-full pt-20 bg-surface min-h-screen px-4 lg:px-gutter-lg pb-margin-desktop">
          <PageComponent onNavigate={handleNavigate} />
        </main>
      </div>

      {/* Global Toast Notifications */}
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
