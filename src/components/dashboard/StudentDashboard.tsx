
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, CheckCircle, Clock, FileText, GraduationCap } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Dummy data
const upcomingAssignments = [
  { id: 1, title: 'Physics Lab Report', dueDate: '2023-10-15', subject: 'Physics', status: 'pending' },
  { id: 2, title: 'Mathematics Problem Set', dueDate: '2023-10-18', subject: 'Mathematics', status: 'pending' },
  { id: 3, title: 'Literature Essay', dueDate: '2023-10-20', subject: 'Literature', status: 'pending' },
];

const recentCourses = [
  { id: 1, title: 'Advanced Calculus', progress: 65, instructor: 'Dr. Jane Smith', lastAccessed: '2 hours ago' },
  { id: 2, title: 'Physics Fundamentals', progress: 42, instructor: 'Prof. Richard Brown', lastAccessed: '1 day ago' },
  { id: 3, title: 'English Literature', progress: 78, instructor: 'Ms. Emily Jones', lastAccessed: '3 days ago' },
];

const upcomingExams = [
  { id: 1, title: 'Mid-term Calculus Exam', date: '2023-10-25', time: '10:00 AM', location: 'Room 301' },
  { id: 2, title: 'Physics Quiz', date: '2023-10-20', time: '2:30 PM', location: 'Lab 102' },
];

const StudentDashboard = () => {
  const { user } = useAuth();
  
  const getScholarLevelText = (level?: string) => {
    switch (level) {
      case 'junior':
        return 'Junior Scholar';
      case 'rising':
        return 'Rising Intellect';
      case 'elite':
        return 'Mastermind Elite';
      default:
        return 'Junior Scholar';
    }
  };
  
  const getScholarLevelColorClass = (level?: string) => {
    switch (level) {
      case 'junior':
        return 'scholar-junior';
      case 'rising':
        return 'scholar-rising';
      case 'elite':
        return 'scholar-elite';
      default:
        return 'scholar-junior';
    }
  };

  // Placeholder for overall progress
  const overallProgress = 68;
  
  return (
    <div className="animate-fade-in space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Student Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {user?.name?.split(' ')[0]}
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex flex-col sm:items-end">
          <Badge className={getScholarLevelColorClass(user?.scholarLevel)}>
            {getScholarLevelText(user?.scholarLevel)}
          </Badge>
          <span className="text-sm text-muted-foreground mt-1">Current Level</span>
        </div>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
              Overall Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-32">
              <div className="text-3xl font-bold mb-2">{overallProgress}%</div>
              <Progress value={overallProgress} className="w-full h-2" />
              <p className="text-sm text-muted-foreground mt-4">
                Keep going! You're making great progress.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
              Upcoming Assignments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 h-32 overflow-auto custom-scrollbar">
              {upcomingAssignments.slice(0, 3).map((assignment) => (
                <div key={assignment.id} className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">{assignment.title}</p>
                    <p className="text-xs text-muted-foreground">{assignment.subject}</p>
                  </div>
                  <div className="text-xs text-right">
                    <p>Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1 animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <GraduationCap className="mr-2 h-4 w-4 text-muted-foreground" />
              Upcoming Exams
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 h-32 overflow-auto custom-scrollbar">
              {upcomingExams.map((exam) => (
                <div key={exam.id} className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">{exam.title}</p>
                    <p className="text-xs text-muted-foreground">{exam.location}</p>
                  </div>
                  <div className="text-xs text-right">
                    <p>{new Date(exam.date).toLocaleDateString()}</p>
                    <p>{exam.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="courses" className="animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
        <TabsList>
          <TabsTrigger value="courses">Recent Courses</TabsTrigger>
          <TabsTrigger value="schedule">Today's Schedule</TabsTrigger>
        </TabsList>
        
        <TabsContent value="courses" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentCourses.map((course) => (
              <Card key={course.id} className="hover-scale">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                  <CardDescription className="flex items-center">
                    <span>Instructor: {course.instructor}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Last accessed: {course.lastAccessed}</span>
                      <Button size="sm">Continue</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="schedule" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 rounded-md bg-muted/50 animate-pulse-subtle">
                  <div className="bg-primary/10 rounded-md p-2 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Mathematics Class</h3>
                      <span className="text-sm">09:00 - 10:30 AM</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Room 201 • Prof. Johnson</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-3 rounded-md">
                  <div className="bg-primary/10 rounded-md p-2 flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Physics Lab</h3>
                      <span className="text-sm">11:00 - 12:30 PM</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Lab 102 • Dr. Andrews</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-3 rounded-md">
                  <div className="bg-primary/10 rounded-md p-2 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Literature Study</h3>
                      <span className="text-sm">02:00 - 03:30 PM</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Library • Ms. Thompson</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-3 rounded-md">
                  <div className="bg-primary/10 rounded-md p-2 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Study Group Meeting</h3>
                      <span className="text-sm">04:00 - 05:30 PM</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Student Center • Group B</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-in-up" style={{ animationDelay: '0.5s' }}>
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Learning Path</CardTitle>
            <CardDescription>
              Your personalized course recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4 p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer">
                <div className="rounded-md bg-primary/10 h-12 w-12 flex items-center justify-center shrink-0">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Advanced Data Structures</h3>
                  <p className="text-sm text-muted-foreground">Recommended next step based on your current progress</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="https://i.pravatar.cc/150?img=12" />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <span className="text-xs">Dr. Robert Stevens</span>
                    <Badge variant="outline" className="ml-2 text-xs">Intermediate</Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer">
                <div className="rounded-md bg-primary/10 h-12 w-12 flex items-center justify-center shrink-0">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Scientific Writing Workshop</h3>
                  <p className="text-sm text-muted-foreground">Helps improve your research paper skills</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="https://i.pravatar.cc/150?img=22" />
                      <AvatarFallback>LM</AvatarFallback>
                    </Avatar>
                    <span className="text-xs">Prof. Lisa Morgan</span>
                    <Badge variant="outline" className="ml-2 text-xs">Beginner</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Academic Achievements</CardTitle>
            <CardDescription>
              Your latest milestones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-md bg-accent/40">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm font-medium">Completed Calculus I</p>
                  <p className="text-xs text-muted-foreground">Grade: A</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-md bg-accent/40">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm font-medium">Physics Project</p>
                  <p className="text-xs text-muted-foreground">Excellent presentation</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-md bg-accent/40">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm font-medium">Programming Competition</p>
                  <p className="text-xs text-muted-foreground">2nd place</p>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-2">View All Achievements</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
