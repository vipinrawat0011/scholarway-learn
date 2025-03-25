
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';

// Pages
import Index from './pages/Index';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import Tests from './pages/Tests';
import TestExam from './pages/TestExam';
import TestResults from './pages/TestResults';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import UserManagement from './pages/UserManagement';
import AILearningAssistance from './pages/AILearningAssistance';
import StudentClassification from './pages/StudentClassification';
import PermissionManager from './pages/PermissionManager';

import './App.css';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="scholar-theme">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/tests" element={<Tests />} />
            <Route path="/test/:id" element={<TestExam />} />
            <Route path="/test/:id/results" element={<TestResults />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/ai-learning" element={<AILearningAssistance />} />
            <Route path="/student-classification" element={<StudentClassification />} />
            <Route path="/permission-manager" element={<PermissionManager />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster position="top-right" />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
