
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { 
  UserCog, 
  ShieldCheck, 
  School, 
  BookOpen, 
  ClipboardCheck,
  User,
  UserPlus,
  Users,
  Settings,
  Shield,
  BookMarked,
  GraduationCap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock data for charts
const userRoleData = [
  { name: 'Students', value: 250, color: '#16a34a' },
  { name: 'Teachers', value: 45, color: '#2563eb' },
  { name: 'Admins', value: 10, color: '#7c3aed' },
];

const permissionUsageData = [
  { name: 'Dashboard', students: 100, teachers: 40, admins: 10 },
  { name: 'User Mgmt', students: 0, teachers: 15, admins: 10 },
  { name: 'Courses', students: 220, teachers: 43, admins: 8 },
  { name: 'Tests', students: 180, teachers: 45, admins: 7 },
  { name: 'AI Learning', students: 150, teachers: 35, admins: 6 },
];

const systemHealthData = [
  { name: 'Storage', usage: 68, limit: 100 },
  { name: 'Memory', usage: 72, limit: 100 },
  { name: 'CPU', usage: 45, limit: 100 },
  { name: 'Database', usage: 58, limit: 100 },
];

const SuperadminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const COLORS = ['#16a34a', '#2563eb', '#7c3aed', '#ea580c'];

  const recentActions = [
    { action: 'Updated permission for Teacher role', time: '10 minutes ago', user: 'You' },
    { action: 'Added new administrator account', time: '2 hours ago', user: 'You' },
    { action: 'Revoked test management access from Teachers', time: '5 hours ago', user: 'You' },
    { action: 'System backup completed', time: '1 day ago', user: 'System' },
    { action: 'Added 5 new courses to database', time: '2 days ago', user: 'John Doe (Admin)' },
  ];

  const quickAccessSections = [
    { 
      title: 'User Management', 
      icon: <UserCog className="h-8 w-8 text-indigo-500" />, 
      description: 'Manage users, roles, and permissions',
      path: '/user-management'
    },
    { 
      title: 'Permission Manager', 
      icon: <ShieldCheck className="h-8 w-8 text-emerald-500" />, 
      description: 'Control feature access for all roles',
      path: '/permission-manager'
    },
    { 
      title: 'Educational Content', 
      icon: <School className="h-8 w-8 text-blue-500" />, 
      description: 'Manage courses and learning materials',
      path: '/courses'
    },
    { 
      title: 'Assessment Center', 
      icon: <ClipboardCheck className="h-8 w-8 text-amber-500" />, 
      description: 'Configure tests and evaluation criteria',
      path: '/tests'
    },
    { 
      title: 'Student Classification', 
      icon: <BookOpen className="h-8 w-8 text-rose-500" />, 
      description: 'Manage student categorization and groups',
      path: '/student-classification'
    },
  ];

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Superadmin Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-purple-600" />
          <span className="text-sm font-medium text-purple-600">Superadmin Access</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 rounded-full bg-green-100">
              <User className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Students</p>
              <h3 className="text-2xl font-bold">250</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 rounded-full bg-blue-100">
              <GraduationCap className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Teachers</p>
              <h3 className="text-2xl font-bold">45</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 rounded-full bg-purple-100">
              <UserCog className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Admins</p>
              <h3 className="text-2xl font-bold">10</h3>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
        <Card className="col-span-5 lg:col-span-2">
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={userRoleData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {userRoleData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-5 lg:col-span-3">
          <CardHeader>
            <CardTitle>Feature Access Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={permissionUsageData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="students" name="Students" fill="#16a34a" />
                  <Bar dataKey="teachers" name="Teachers" fill="#2563eb" />
                  <Bar dataKey="admins" name="Admins" fill="#7c3aed" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="quickAccess" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="quickAccess">Quick Access</TabsTrigger>
          <TabsTrigger value="recentActivity">Recent Activity</TabsTrigger>
          <TabsTrigger value="systemHealth">System Health</TabsTrigger>
        </TabsList>
        
        <TabsContent value="quickAccess">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickAccessSections.map((section, index) => (
              <Card key={index} className="hover:bg-muted/50 cursor-pointer transition-colors" onClick={() => navigate(section.path)}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div>{section.icon}</div>
                    <div className="space-y-1">
                      <h3 className="font-bold">{section.title}</h3>
                      <p className="text-sm text-muted-foreground">{section.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="recentActivity">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                {recentActions.map((action, index) => (
                  <div key={index} className="flex justify-between items-start pb-4 border-b last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium">{action.action}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline">{action.user}</Badge>
                        <span className="text-sm text-muted-foreground">{action.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="systemHealth">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                {systemHealthData.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{item.name}</h4>
                      <div className="flex items-center space-x-2">
                        <Badge variant={item.usage > 80 ? "destructive" : item.usage > 60 ? "outline" : "secondary"}>
                          {item.usage}%
                        </Badge>
                        <span className="text-sm text-muted-foreground">{item.usage}/{item.limit}</span>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          item.usage > 80 ? 'bg-destructive' : item.usage > 60 ? 'bg-amber-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${item.usage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SuperadminDashboard;
