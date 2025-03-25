
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Shield, 
  Settings, 
  AlertTriangle, 
  Server, 
  Lock,
  User,
  FileText,
  Book,
  Clock,
  Database,
  BarChart,
  Activity
} from 'lucide-react';

const SuperadminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="animate-fade-in space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Superadmin Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back, {user?.name?.split(' ')[0]}
        </p>
      </header>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <Shield className="mr-2 h-4 w-4 text-muted-foreground" />
              Role
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">Superadmin</div>
            <p className="text-sm text-muted-foreground mt-1">
              Full system access
            </p>
          </CardContent>
        </Card>
        
        <Card className="animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <Users className="mr-2 h-4 w-4 text-muted-foreground" />
              Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">548</div>
            <p className="text-sm text-muted-foreground mt-1">
              Total users in system
            </p>
          </CardContent>
        </Card>
        
        <Card className="animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <Lock className="mr-2 h-4 w-4 text-muted-foreground" />
              Feature Access
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">18</div>
            <p className="text-sm text-muted-foreground mt-1">
              Controllable features
            </p>
          </CardContent>
        </Card>
        
        <Card className="animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <AlertTriangle className="mr-2 h-4 w-4 text-muted-foreground" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
              <div className="text-xl font-bold">Operational</div>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              All systems running
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Quick Access</CardTitle>
            <CardDescription>
              Manage system features and user access
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Button variant="outline" size="lg" className="h-auto p-4 justify-start" asChild>
                <Link to="/permission-manager" className="flex flex-col items-start gap-1">
                  <div className="flex items-center w-full">
                    <Shield className="h-5 w-5 mr-2" />
                    <span className="font-medium">Permission Manager</span>
                  </div>
                  <p className="text-xs text-muted-foreground text-left">
                    Control feature access for all roles
                  </p>
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" className="h-auto p-4 justify-start" asChild>
                <Link to="/user-management" className="flex flex-col items-start gap-1">
                  <div className="flex items-center w-full">
                    <Users className="h-5 w-5 mr-2" />
                    <span className="font-medium">User Management</span>
                  </div>
                  <p className="text-xs text-muted-foreground text-left">
                    Create, edit or delete users
                  </p>
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" className="h-auto p-4 justify-start" asChild>
                <Link to="/system-settings" className="flex flex-col items-start gap-1">
                  <div className="flex items-center w-full">
                    <Settings className="h-5 w-5 mr-2" />
                    <span className="font-medium">System Settings</span>
                  </div>
                  <p className="text-xs text-muted-foreground text-left">
                    Configure global system settings
                  </p>
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" className="h-auto p-4 justify-start" asChild>
                <Link to="/server-management" className="flex flex-col items-start gap-1">
                  <div className="flex items-center w-full">
                    <Server className="h-5 w-5 mr-2" />
                    <span className="font-medium">Server Management</span>
                  </div>
                  <p className="text-xs text-muted-foreground text-left">
                    Server configuration and maintenance
                  </p>
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" className="h-auto p-4 justify-start" asChild>
                <Link to="/database-management" className="flex flex-col items-start gap-1">
                  <div className="flex items-center w-full">
                    <Database className="h-5 w-5 mr-2" />
                    <span className="font-medium">Database</span>
                  </div>
                  <p className="text-xs text-muted-foreground text-left">
                    Database management and backup
                  </p>
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" className="h-auto p-4 justify-start" asChild>
                <Link to="/statistics" className="flex flex-col items-start gap-1">
                  <div className="flex items-center w-full">
                    <BarChart className="h-5 w-5 mr-2" />
                    <span className="font-medium">Statistics</span>
                  </div>
                  <p className="text-xs text-muted-foreground text-left">
                    System analytics and reporting
                  </p>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Role Access Overview</CardTitle>
            <CardDescription>Current access status for each role</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-2 text-primary" />
                    <h3 className="font-medium">Admin Role</h3>
                  </div>
                  <Badge className="bg-green-500">Active</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Access to user management, content review, and approvals.
                </p>
              </div>
              
              <div className="p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Book className="h-5 w-5 mr-2 text-primary" />
                    <h3 className="font-medium">Teacher Role</h3>
                  </div>
                  <Badge className="bg-green-500">Active</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Access to materials, student management, and exams.
                </p>
              </div>
              
              <div className="p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-primary" />
                    <h3 className="font-medium">Student Role</h3>
                  </div>
                  <Badge className="bg-green-500">Active</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Access to progress tracking and upcoming tests.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Current system performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-primary" />
                  <span>Server Load</span>
                </div>
                <div className="flex items-center">
                  <div className="w-36 h-2 bg-muted rounded-full overflow-hidden mr-2">
                    <div className="h-full bg-green-500" style={{ width: '23%' }}></div>
                  </div>
                  <span className="text-sm font-medium">23%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-primary" />
                  <span>Response Time</span>
                </div>
                <div className="flex items-center">
                  <div className="w-36 h-2 bg-muted rounded-full overflow-hidden mr-2">
                    <div className="h-full bg-green-500" style={{ width: '15%' }}></div>
                  </div>
                  <span className="text-sm font-medium">120ms</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Database className="h-5 w-5 mr-2 text-primary" />
                  <span>Database Load</span>
                </div>
                <div className="flex items-center">
                  <div className="w-36 h-2 bg-muted rounded-full overflow-hidden mr-2">
                    <div className="h-full bg-amber-500" style={{ width: '45%' }}></div>
                  </div>
                  <span className="text-sm font-medium">45%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-primary" />
                  <span>Active Users</span>
                </div>
                <div className="flex items-center">
                  <div className="w-36 h-2 bg-muted rounded-full overflow-hidden mr-2">
                    <div className="h-full bg-green-500" style={{ width: '32%' }}></div>
                  </div>
                  <span className="text-sm font-medium">132/548</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuperadminDashboard;
