import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../../layouts/DashboardLayout';

// Dashboard Sub-Views
import PatientDashboard from './PatientDashboard';
import ProviderDashboard from './ProviderDashboard';
import AdminDashboard from './AdminDashboard';
import HealthVault from './HealthVault';
import BugReport from './BugReport';
import VirtualClinic from './VirtualClinic';
import InventoryManager from './InventoryManager';
import StaffManager from './StaffManager';
import OrderManager from './OrderManager';
import ProviderAnalytics from './ProviderAnalytics';
import Appointments from './Appointments';
import Settings from './Settings';

const DashboardOverview = () => {
  const { user } = useAuth();
  const location = useLocation();
  const role = user?.role || 'patient';
  const path = location.pathname;

  const renderDashboard = () => {
    // Patient sub-pages
    if (path.includes('/dashboard/vault')) {
      return <HealthVault />;
    }
    if (path.includes('/dashboard/appointments')) {
      return <Appointments />;
    }
    if (path.includes('/dashboard/settings')) {
      return <Settings />;
    }
    if (path.includes('/dashboard/bug-report')) {
      return <BugReport />;
    }

    // Provider sub-pages
    if (path.includes('/dashboard/clinic')) {
      return <VirtualClinic />;
    }
    if (path.includes('/dashboard/inventory')) {
      return <InventoryManager />;
    }
    if (path.includes('/dashboard/staff')) {
      return <StaffManager />;
    }
    if (path.includes('/dashboard/orders') && role !== 'patient') {
      return <OrderManager />;
    }
    if (path.includes('/dashboard/analytics') && role !== 'patient') {
      return <ProviderAnalytics />;
    }

    // Default role-based home views
    switch (role) {
      case 'patient':
        return <PatientDashboard />;
      case 'doctor':
      case 'pharmacy':
      case 'clinic':
        return <ProviderDashboard role={role} />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <PatientDashboard />;
    }
  };

  return (
    <DashboardLayout>
      {renderDashboard()}
    </DashboardLayout>
  );
};

export default DashboardOverview;
