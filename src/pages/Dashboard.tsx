
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import StudentDashboard from '@/components/dashboard/StudentDashboard';
import TeacherDashboard from '@/components/dashboard/TeacherDashboard';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import SuperadminDashboard from '@/components/dashboard/SuperadminDashboard';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import AIAssistant from '@/components/ai/AIAssistant';

const Dashboard = () => {
  const { user, isAuthenticated, isLoading, hasPermission } = useAuth();
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-primary/20 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-muted rounded mb-3"></div>
          <div className="h-3 w-24 bg-muted rounded"></div>
        </div>
      </div>
    );
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // If user is a superadmin, render the superadmin dashboard
  if (user?.role === 'superadmin') {
    return (
      <DashboardLayout>
        <SuperadminDashboard />
        <AIAssistant />
      </DashboardLayout>
    );
  }
  
  // Check if user has permission to access their role-specific dashboard
  const dashboardId = `${user?.role}-dashboard`;
  
  // Fixed the type comparison here - this was causing the error
  const dashboardPermission = user?.role && user.role !== 'superadmin' ? 
    hasPermission(user.role, dashboardId) : 
    false;
  
  if (!dashboardPermission) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 max-w-md">
          <h1 className="text-2xl font-bold mb-4">Access Restricted</h1>
          <p className="text-muted-foreground mb-6">
            You don't have permission to access this dashboard. Please contact your administrator.
          </p>
          <button 
            onClick={() => window.location.href = '/login'} 
            className="px-4 py-2 rounded bg-primary text-white"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }
  
  // Render dashboard based on user role
  return (
    <DashboardLayout>
      {user?.role === 'student' && <StudentDashboard />}
      {user?.role === 'teacher' && <TeacherDashboard />}
      {user?.role === 'admin' && <AdminDashboard />}
      <AIAssistant />
    </DashboardLayout>
  );
};

export default Dashboard;
