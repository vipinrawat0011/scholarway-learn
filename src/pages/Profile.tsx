
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ProgressChart from '@/components/progress/ProgressChart';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import AIAssistant from '@/components/ai/AIAssistant';

const Profile = () => {
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
  
  if (user?.role === 'student') {
    return (
      <DashboardLayout>
        <ProgressChart 
          studentName={user.name} 
          scholarLevel={user.scholarLevel || 'junior'} 
          overallProgress={75} 
          targetProgress={80} 
        />
        <AIAssistant />
      </DashboardLayout>
    );
  }
  
  // For non-student roles, show a placeholder profile page
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">
          Welcome to your profile, {user?.name}. Your profile information will be displayed here.
        </p>
      </div>
      <AIAssistant />
    </DashboardLayout>
  );
};

export default Profile;
