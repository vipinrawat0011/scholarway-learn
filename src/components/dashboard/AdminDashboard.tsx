
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, FileText, BookOpen, AlertTriangle, CheckCircle, Settings, User, School, Bot, Award, Trophy, Star, Brain } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';

// Dummy data
const pendingApprovals = [
  { 
    id: 1, 
    title: 'Quantum Physics: Wave Functions', 
    type: 'Study Material', 
    submittedBy: 'Dr. Richard Feynman', 
    submittedOn: '2023-10-05',
    department: 'Physics'
  },
  { 
    id: 2, 
    title: 'Fundamentals of Organic Chemistry', 
    type: 'Course', 
    submittedBy: 'Prof. Marie Curie', 
    submittedOn: '2023-10-04',
    department: 'Chemistry'
  },
  { 
    id: 3, 
    title: 'Mid-term Examination: Calculus II', 
    type: 'Exam', 
    submittedBy: 'Dr. Alan Turing', 
    submittedOn: '2023-10-03',
    department: 'Mathematics'
  },
  { 
    id: 4, 
    title: 'Introduction to Programming using Python', 
    type: 'Study Material', 
    submittedBy: 'Dr. Ada Lovelace', 
    submittedOn: '2023-10-02',
    department: 'Computer Science'
  },
  { 
    id: 5, 
    title: 'Literary Analysis Techniques', 
    type: 'Course', 
    submittedBy: 'Prof. Jane Austen', 
    submittedOn: '2023-10-01',
    department: 'Literature'
  },
];

const recentActivities = [
  { 
    id: 1, 
    action: 'Approved Study Material', 
    details: 'Ancient History: The Roman Empire', 
    user: 'Prof. Marcus Aurelius', 
    time: '2 hours ago' 
  },
  { 
    id: 2, 
    action: 'Rejected Course Proposal', 
    details: 'Advanced Quantum Computing', 
    user: 'Dr. Niels Bohr', 
    time: '4 hours ago' 
  },
  { 
    id: 3, 
    action: 'Added New Teacher', 
    details: 'Dr. Isaac Newton - Physics Department', 
    user: 'Admin', 
    time: '1 day ago' 
  },
  { 
    id: 4, 
    action: 'Updated System Settings', 
    details: 'Changed grading scale for Science courses', 
    user: 'Admin', 
    time: '2 days ago' 
  },
];

const userStats = {
  totalUsers: 548,
  students: 480,
  teachers: 65,
  admins: 3,
  activeNow: 132,
  newThisMonth: 28
};

const contentStats = {
  totalCourses: 48,
  publishedMaterials: 324,
  pendingApprovals: 12,
  examsScheduled: 18,
  averageRating: 4.7
};

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="animate-fade-in space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back, {user?.name?.split(' ')[0]}
        </p>
      </header>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <Users className="mr-2 h-4 w-4 text-muted-foreground" />
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{userStats.totalUsers}</div>
            <p className="text-sm text-muted-foreground mt-1">
              {userStats.activeNow} active now
            </p>
          </CardContent>
        </Card>
        
        <Card className="animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
              Total Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{contentStats.totalCourses}</div>
            <p className="text-sm text-muted-foreground mt-1">
              Across all departments
            </p>
          </CardContent>
        </Card>
        
        <Card className="animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
              Study Materials
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{contentStats.publishedMaterials}</div>
            <p className="text-sm text-muted-foreground mt-1">
              Published materials
            </p>
          </CardContent>
        </Card>
        
        <Card className="animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <AlertTriangle className="mr-2 h-4 w-4 text-muted-foreground" />
              Pending Approvals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{contentStats.pendingApprovals}</div>
            <p className="text-sm text-muted-foreground mt-1">
              Awaiting your review
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="approvals" className="animate-slide-in-up" style={{ animationDelay: '0.5s' }}>
        <TabsList>
          <TabsTrigger value="approvals">Pending Approvals</TabsTrigger>
          <TabsTrigger value="activities">Recent Activities</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
        </TabsList>
        
        <TabsContent value="approvals" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Content Awaiting Approval</CardTitle>
                  <CardDescription>Review and approve content submissions</CardDescription>
                </div>
                <Button variant="outline">View All</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingApprovals.map((item) => (
                  <div key={item.id} className="p-4 rounded-lg border flex flex-col sm:flex-row gap-4">
                    <div className="sm:flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">{item.title}</h3>
                          <div className="flex items-center gap-3 mt-1">
                            <Badge variant="outline">{item.type}</Badge>
                            <Badge variant="outline">{item.department}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground">
                        Submitted by {item.submittedBy} on {new Date(item.submittedOn).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex sm:flex-col gap-2 sm:gap-2">
                      <Button size="sm" variant="default" className="w-full">Approve</Button>
                      <Button size="sm" variant="outline" className="w-full">Review</Button>
                      <Button size="sm" variant="ghost" className="w-full text-destructive hover:text-destructive">Reject</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="activities" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Admin activities log</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative border rounded-md p-4">
                <div className="absolute h-full w-0.5 bg-border left-7 top-0"></div>
                <div className="space-y-8">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="relative pl-10">
                      <div className="absolute left-5 -translate-x-1/2 h-4 w-4 rounded-full bg-background border-2 border-primary"></div>
                      <div>
                        <h3 className="font-medium">{activity.action}</h3>
                        <p className="text-sm text-muted-foreground">{activity.details}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          <span>{activity.user}</span>
                          <span>•</span>
                          <span>{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Statistics</CardTitle>
                <CardDescription>Overview of system users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-primary/10 flex items-center justify-center rounded-md">
                        <School className="h-4 w-4 text-primary" />
                      </div>
                      <span>Students</span>
                    </div>
                    <div className="font-medium">{userStats.students}</div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-primary/10 flex items-center justify-center rounded-md">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <span>Teachers</span>
                    </div>
                    <div className="font-medium">{userStats.teachers}</div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-primary/10 flex items-center justify-center rounded-md">
                        <Settings className="h-4 w-4 text-primary" />
                      </div>
                      <span>Administrators</span>
                    </div>
                    <div className="font-medium">{userStats.admins}</div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 border rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-primary/10 flex items-center justify-center rounded-md">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <span>New Users (This Month)</span>
                    </div>
                    <div className="font-medium">{userStats.newThisMonth}</div>
                  </div>
                </div>
                
                <div className="flex justify-center gap-4 mt-6">
                  <Button className="w-full">Add User</Button>
                  <Button variant="outline" className="w-full">Manage Roles</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  <Button variant="outline" className="justify-start h-auto py-3">
                    <Users className="mr-2 h-4 w-4" />
                    Manage User Accounts
                  </Button>
                  
                  <Button variant="outline" className="justify-start h-auto py-3">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Course Management
                  </Button>
                  
                  <Button variant="outline" className="justify-start h-auto py-3">
                    <FileText className="mr-2 h-4 w-4" />
                    Content Library
                  </Button>
                  
                  <Button variant="outline" className="justify-start h-auto py-3">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Examination Configuration
                  </Button>
                  
                  <Button variant="outline" className="justify-start h-auto py-3">
                    <Settings className="mr-2 h-4 w-4" />
                    System Settings
                  </Button>
                  
                  <Button variant="outline" className="justify-start h-auto py-3">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Security & Permissions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-in-up" style={{ animationDelay: '0.6s' }}>
        <Card>
          <CardHeader>
            <CardTitle>Student Classification</CardTitle>
            <CardDescription>Scholar level distribution across classes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <School className="h-5 w-5 text-blue-500" />
                  <span>Junior Scholars</span>
                </div>
                <span className="font-medium">178 students</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-500" />
                  <span>Rising Intellects</span>
                </div>
                <span className="font-medium">156 students</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-green-500" />
                  <span>Mastermind Elite</span>
                </div>
                <span className="font-medium">146 students</span>
              </div>
            </div>
            
            <div className="h-2 rounded-full bg-gray-100 mt-6 overflow-hidden">
              <div className="flex h-full">
                <div className="h-full bg-blue-500" style={{ width: '37%' }}></div>
                <div className="h-full bg-amber-500" style={{ width: '32%' }}></div>
                <div className="h-full bg-green-500" style={{ width: '31%' }}></div>
              </div>
            </div>
            
            <div className="mt-6">
              <Button asChild className="w-full">
                <Link to="/student-classification">Manage Classification</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>AI Learning Assistance</CardTitle>
            <CardDescription>AI-powered learning tools for students</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-500" />
                  <span>AI Tutoring Sessions</span>
                </div>
                <span className="font-medium">248 completed</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-indigo-500" />
                  <span>Study Assistants Active</span>
                </div>
                <span className="font-medium">87 students</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-pink-500" />
                  <span>Improvement Rate</span>
                </div>
                <span className="font-medium">+18.5% avg</span>
              </div>
            </div>
            
            <div className="mt-6">
              <Button asChild className="w-full">
                <Link to="/ai-learning">Manage AI Learning</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="animate-slide-in-up" style={{ animationDelay: '0.7s' }}>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
          <CardDescription>Current system performance and metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold">98.7%</div>
              <div className="text-sm text-muted-foreground mt-1">System Uptime</div>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold">132</div>
              <div className="text-sm text-muted-foreground mt-1">Active Users</div>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold">1.2s</div>
              <div className="text-sm text-muted-foreground mt-1">Average Response Time</div>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold">0</div>
              <div className="text-sm text-muted-foreground mt-1">Critical Alerts</div>
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <Button variant="outline">View System Reports</Button>
            <Button className="ml-2">Server Diagnostics</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
