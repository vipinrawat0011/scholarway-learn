
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { useToast } from '@/hooks/use-toast';
import { GraduationCap, Lock, Mail, User } from 'lucide-react';

const AuthForm = () => {
  const { login, register, isLoading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('register') ? 'register' : 'login';
  const [activeTab, setActiveTab] = useState(defaultTab);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerRole, setRegisterRole] = useState<'student' | 'teacher'>('student');

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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registerName || !registerEmail || !registerPassword || !registerRole) {
      toast.error('Please fill in all fields');
      return;
    }
    
    try {
      await register(registerEmail, registerPassword, registerName, registerRole);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Registration failed: ${error.message}`);
      } else {
        toast.error('Registration failed. Please try again.');
      }
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  // Predefined test accounts for demonstration
  const testAccounts = [
    { email: 'student@example.com', role: 'Student' },
    { email: 'teacher@example.com', role: 'Teacher' },
    { email: 'admin@example.com', role: 'Admin' },
  ];

  return (
    <div className="mx-auto max-w-sm w-full px-4">
      <Card className="border-none shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <GraduationCap className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Welcome to ScholarWay</CardTitle>
          <CardDescription>
            Enter your credentials to {activeTab === 'login' ? 'sign in to' : 'create'} your account
          </CardDescription>
        </CardHeader>
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login" className="mt-4">
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
              <div className="grid grid-cols-3 gap-2 w-full">
                {testAccounts.map((account) => (
                  <Button
                    key={account.email}
                    variant="outline"
                    size="sm"
                    className="text-xs h-auto py-1"
                    onClick={() => {
                      setLoginEmail(account.email);
                      setLoginPassword('password');
                    }}
                  >
                    {account.role}
                  </Button>
                ))}
              </div>
            </CardFooter>
          </TabsContent>
          <TabsContent value="register" className="mt-4">
            <form onSubmit={handleRegister}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      placeholder="John Doe"
                      className="pl-10"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="m@example.com"
                      className="pl-10"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-password"
                      type="password"
                      className="pl-10"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">I am a</Label>
                  <Select
                    value={registerRole}
                    onValueChange={(value: 'student' | 'teacher') => setRegisterRole(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="teacher">Teacher</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Creating account...' : 'Create account'}
                </Button>
              </CardContent>
            </form>
            <CardFooter className="flex justify-center border-t pt-4">
              <p className="text-sm text-muted-foreground">
                By creating an account, you agree to our{' '}
                <a href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </p>
            </CardFooter>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default AuthForm;
