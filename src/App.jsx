import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PrescriptionProvider } from './context/PrescriptionContext';
import { CartProvider } from './context/CartContext';

import LandingPage from './pages/LandingPage';
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import SocialAuthCompletion from './pages/Auth/SocialAuthCompletion';


import DashboardOverview from './pages/Dashboard/DashboardOverview';
import Doctors from './pages/Doctors';
import Clinics from './pages/Clinics';
import ClinicDetails from './pages/ClinicDetails';
import Medicines from './pages/Medicines';
import MedicineDetails from './pages/MedicineDetails';
import Pharmacies from './pages/Pharmacies';
import PharmacyDetails from './pages/PharmacyDetails';
import ProviderProfile from './pages/ProviderProfile';
import BookAppointment from './pages/BookAppointment';
import Orders from './pages/Orders';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Stream from './pages/Stream';
import LiveStreams from './pages/LiveStreams';

function App() {
  return (
    <AuthProvider>
      <PrescriptionProvider>
        <CartProvider>
          <Router>
          <div>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/auth/completion" element={<SocialAuthCompletion />} />
            </Route>

            {/* Dashboard routes */}
            <Route path="/dashboard" element={<DashboardOverview />} />
            <Route path="/dashboard/appointments" element={<DashboardOverview />} />
            <Route path="/dashboard/vault" element={<DashboardOverview />} />
            <Route path="/dashboard/orders" element={<DashboardOverview />} />
            <Route path="/dashboard/analytics" element={<DashboardOverview />} />
            <Route path="/dashboard/inventory" element={<DashboardOverview />} />
            <Route path="/dashboard/staff" element={<DashboardOverview />} />
            <Route path="/dashboard/studio" element={<DashboardOverview />} />
            <Route path="/dashboard/approvals" element={<DashboardOverview />} />
            <Route path="/dashboard/moderation" element={<DashboardOverview />} />
            <Route path="/dashboard/financials" element={<DashboardOverview />} />
            <Route path="/dashboard/favorites" element={<DashboardOverview />} />
            <Route path="/dashboard/prescriptions" element={<DashboardOverview />} />
            <Route path="/dashboard/settings" element={<DashboardOverview />} />
            <Route path="/dashboard/messages" element={<DashboardOverview />} />
            <Route path="/dashboard/bug-report" element={<DashboardOverview />} />
            <Route path="/dashboard/clinic" element={<DashboardOverview />} />
            <Route path="/dashboard/media" element={<DashboardOverview />} />

            <Route path="/stream/:id" element={<Stream />} />
            <Route path="/streams" element={<LiveStreams />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/clinics" element={<Clinics />} />
            <Route path="/clinic/:id" element={<ClinicDetails />} />
            <Route path="/medicines" element={<Navigate to="/pharmacies" />} />
            <Route path="/medicine/:id" element={<MedicineDetails />} />
            <Route path="/pharmacies" element={<Pharmacies />} />
            <Route path="/pharmacy/:id" element={<PharmacyDetails />} />
            <Route path="/profile/:id" element={<ProviderProfile />} />
            <Route path="/book/:id" element={<BookAppointment />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          </div>
        </Router>
      </CartProvider>
      </PrescriptionProvider>
    </AuthProvider>
  );
}

export default App;
