
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import CourseContent from "./components/courses/CourseContent";
import Tests from "./pages/Tests";
import TestExam from "./pages/TestExam";
import TestResults from "./pages/TestResults";
import AILearningAssistance from "./pages/AILearningAssistance";
import StudentClassification from "./pages/StudentClassification";
import UserManagement from "./pages/UserManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:id" element={<CourseContent />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/tests" element={<Tests />} />
            <Route path="/test/:testId" element={<TestExam />} />
            <Route path="/test-results/:testId" element={<TestResults />} />
            <Route path="/ai-learning" element={<AILearningAssistance />} />
            <Route path="/student-classification" element={<StudentClassification />} />
            <Route path="/user-management" element={<UserManagement />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
