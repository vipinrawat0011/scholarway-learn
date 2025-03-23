
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import StudentDashboard from '@/components/dashboard/StudentDashboard';
import TeacherDashboard from '@/components/dashboard/TeacherDashboard';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import AIAssistant from '@/components/ai/AIAssistant';

const Dashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  
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
