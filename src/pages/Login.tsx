
import React from 'react';
import { GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Mail, Lock, Shield, Building } from 'lucide-react';

const Login = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(loginEmail, loginPassword);
      toast.success('Successfully logged in!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    }
  };

  // Predefined test accounts for demonstration
  const testAccounts = [
    { email: 'student@example.com', role: 'Student' },
    { email: 'teacher@example.com', role: 'Teacher' },
    { email: 'admin@example.com', role: 'Admin' },
    { email: 'superadmin@example.com', role: 'Superadmin', highlightColor: 'bg-red-500 text-white hover:bg-red-600' }
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center bg-background animate-fade-in">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6">
        <Link to="/" className="flex items-center justify-center gap-2 font-medium text-xl">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span>ScholarWay</span>
        </Link>
      </div>

      <div className="mx-auto max-w-sm w-full px-4">
        <Card className="border-none shadow-lg">
          <CardHeader className="space-y-2 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Welcome to ScholarWay</CardTitle>
            <CardDescription>
              Enter your credentials to sign in to your account
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    className="pl-10"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Button variant="link" className="px-0 text-xs h-auto" asChild>
                    <a href="/forgot-password">Forgot password?</a>
                  </Button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    className="pl-10"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
            </CardContent>
          </form>
          <CardFooter className="flex flex-col space-y-4 border-t pt-4">
            <div className="text-sm text-muted-foreground text-center">
              Test accounts for demo:
            </div>
            <div className="grid grid-cols-4 gap-2 w-full">
              {testAccounts.map((account) => (
                <Button
                  key={account.email}
                  variant={account.highlightColor ? "default" : "outline"}
                  size="sm"
                  className={`text-xs h-auto py-1 ${account.highlightColor || ''}`}
                  onClick={() => {
                    setLoginEmail(account.email);
                    setLoginPassword('password');
                  }}
                >
                  {account.role === 'Superadmin' ? (
                    <span className="flex items-center">
                      <Shield className="mr-1 h-3 w-3" />
                      {account.role}
                    </span>
                  ) : account.role === 'Admin' ? (
                    <span className="flex items-center">
                      <Building className="mr-1 h-3 w-3" />
                      {account.role}
                    </span>
                  ) : (
                    account.role
                  )}
                </Button>
              ))}
            </div>
          </CardFooter>
        </Card>
      </div>
      
      <div className="mt-8 text-center">
        <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Login;
