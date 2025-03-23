
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Users, FileText, Clock, BookOpen, CheckCircle, AlertTriangle, Calendar } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Dummy data
const recentMaterials = [
  { id: 1, title: 'Calculus: Differentiation Slides', status: 'published', uploadedDate: '2023-10-01', views: 125 },
  { id: 2, title: 'Mathematics Problem Set 3', status: 'pending', uploadedDate: '2023-10-05', views: 0 },
  { id: 3, title: 'Linear Algebra Notes', status: 'published', uploadedDate: '2023-09-25', views: 87 },
];

const upcomingClasses = [
  { id: 1, title: 'Advanced Calculus', time: '10:00 AM - 11:30 AM', room: 'Room 301', students: 28 },
  { id: 2, title: 'Linear Algebra', time: '01:00 PM - 02:30 PM', room: 'Room 204', students: 32 },
  { id: 3, title: 'Introduction to Statistics', time: '03:00 PM - 04:30 PM', room: 'Room 107', students: 25 },
];

const pendingAssignments = [
  { id: 1, title: 'Calculus Mid-term Paper', submissions: 18, totalStudents: 28, dueDate: '2023-10-18' },
  { id: 2, title: 'Linear Algebra Problem Set', submissions: 22, totalStudents: 32, dueDate: '2023-10-22' },
];

const TeacherDashboard = () => {
  const { user } = useAuth();
  
  // Placeholders for analytics
  const totalStudents = 85;
  const totalCourses = 4;
  const materialsPublished = 18;
  const pendingApprovals = 2;

  return (
    <div className="animate-fade-in space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Teacher Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back, {user?.name?.split(' ')[0]}
        </p>
      </header>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <Users className="mr-2 h-4 w-4 text-muted-foreground" />
              Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalStudents}</div>
            <p className="text-sm text-muted-foreground mt-1">Across all your courses</p>
          </CardContent>
        </Card>
        
        <Card className="animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
              Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalCourses}</div>
            <p className="text-sm text-muted-foreground mt-1">Active courses this semester</p>
          </CardContent>
        </Card>
        
        <Card className="animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
              Materials
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{materialsPublished}</div>
            <p className="text-sm text-muted-foreground mt-1">Published study materials</p>
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
            <div className="text-3xl font-bold">{pendingApprovals}</div>
            <p className="text-sm text-muted-foreground mt-1">Materials awaiting admin approval</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 animate-slide-in-up" style={{ animationDelay: '0.5s' }}>
          <CardHeader>
            <CardTitle>Today's Classes</CardTitle>
            <CardDescription>Your scheduled classes for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingClasses.map((class_, index) => (
                <div 
                  key={class_.id} 
                  className={`flex items-center gap-4 p-4 rounded-lg border ${index === 0 ? 'bg-muted/50 animate-pulse-subtle' : ''}`}
                >
                  <div className="rounded-md bg-primary/10 h-12 w-12 flex items-center justify-center shrink-0">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <h3 className="font-medium">{class_.title}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{class_.room}</Badge>
                        <Badge variant="outline">
                          <Users className="mr-1 h-3 w-3" />
                          {class_.students}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{class_.time}</p>
                    <div className="flex justify-end mt-2">
                      <Button size="sm" variant="outline">View Materials</Button>
                      <Button size="sm" className="ml-2">Start Class</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="animate-slide-in-up" style={{ animationDelay: '0.6s' }}>
          <CardHeader>
            <CardTitle>Pending Assignments</CardTitle>
            <CardDescription>Review and grade student submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {pendingAssignments.map((assignment) => (
                <div key={assignment.id} className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{assignment.title}</h3>
                      <p className="text-xs text-muted-foreground">
                        Due: {new Date(assignment.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge>
                      {assignment.submissions}/{assignment.totalStudents}
                    </Badge>
                  </div>
                  <Progress 
                    value={(assignment.submissions / assignment.totalStudents) * 100} 
                    className="h-2" 
                  />
                  <Button size="sm" className="w-full mt-2">Review Submissions</Button>
                </div>
              ))}
              <div className="pt-4 border-t">
                <Button variant="outline" className="w-full">View All Assignments</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="materials" className="animate-slide-in-up" style={{ animationDelay: '0.7s' }}>
        <TabsList>
          <TabsTrigger value="materials">Recent Materials</TabsTrigger>
          <TabsTrigger value="students">Student Performance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="materials" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Study Materials</CardTitle>
                  <CardDescription>Recently uploaded content</CardDescription>
                </div>
                <Button>Upload New</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-muted/50">
                    <tr>
                      <th scope="col" className="px-6 py-3 rounded-l-lg">Title</th>
                      <th scope="col" className="px-6 py-3">Uploaded</th>
                      <th scope="col" className="px-6 py-3">Status</th>
                      <th scope="col" className="px-6 py-3 rounded-r-lg">Views</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentMaterials.map((material) => (
                      <tr key={material.id} className="bg-white dark:bg-gray-800 border-b">
                        <td className="px-6 py-4 font-medium">{material.title}</td>
                        <td className="px-6 py-4">{new Date(material.uploadedDate).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <Badge variant={material.status === 'published' ? 'default' : 'secondary'}>
                            {material.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">{material.views}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="students" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Student Performance Overview</CardTitle>
              <CardDescription>Average scores across your courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Advanced Calculus</span>
                    <span className="text-sm font-medium">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Linear Algebra</span>
                    <span className="text-sm font-medium">82%</span>
                  </div>
                  <Progress value={82} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Statistics</span>
                    <span className="text-sm font-medium">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Discrete Mathematics</span>
                    <span className="text-sm font-medium">91%</span>
                  </div>
                  <Progress value={91} className="h-2" />
                </div>
                <Button className="w-full mt-4">View Detailed Analytics</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherDashboard;
