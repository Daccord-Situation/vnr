import { Routes, Route, Navigate } from 'react-router-dom';
import PlatformLayout from '@/layouts/PlatformLayout';
import BusinessLayout from '@/layouts/BusinessLayout';

// Platform Side pages
import PlatformDashboard from '@/pages/platform/Dashboard';
import PlatformCompanies from '@/pages/platform/Companies';
import PlatformSubscriptions from '@/pages/platform/Subscriptions';

// Business Side pages
import BusinessDashboard from '@/pages/business/Dashboard';
import BusinessSales from '@/pages/business/Sales';
import BusinessStock from '@/pages/business/Stock';

// Home
import Home from '@/pages/Home';

/**
 * App — routeur principal de VNR.
 *
 * Deux espaces strictement séparés (Phase A — Cadrage Global) :
 *   /platform/*  → Platform Side (exploitation VNR par Daccord Situation)
 *   /business/*  → Business Side (gestion de l'entreprise cliente)
 *
 * Sprint 0 : navigation et layouts de démonstration.
 * Authentification et permissions réelles : Phase B.
 */
export default function App() {
  return (
    <Routes>
      {/* Page d'accueil — sélection de l'espace */}
      <Route path="/" element={<Home />} />

      {/* Platform Side */}
      <Route path="/platform" element={<PlatformLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<PlatformDashboard />} />
        <Route path="companies" element={<PlatformCompanies />} />
        <Route path="subscriptions" element={<PlatformSubscriptions />} />
      </Route>

      {/* Business Side */}
      <Route path="/business" element={<BusinessLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<BusinessDashboard />} />
        <Route path="sales" element={<BusinessSales />} />
        <Route path="stock" element={<BusinessStock />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
