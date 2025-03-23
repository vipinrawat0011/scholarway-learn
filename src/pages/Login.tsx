
import React from 'react';
import AuthForm from '@/components/auth/AuthForm';
import { GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center bg-background animate-fade-in">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6">
        <Link to="/" className="flex items-center justify-center gap-2 font-medium text-xl">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span>ScholarWay</span>
        </Link>
      </div>
      
      <AuthForm />
      
      <div className="mt-8 text-center">
        <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Login;
