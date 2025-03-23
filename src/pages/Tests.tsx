
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, FileText, Shield, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import AIAssistant from '@/components/ai/AIAssistant';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

// Sample test data
const upcomingTests = [
  {
    id: '1',
    title: 'Algebra Mid-term',
    subject: 'Mathematics',
    date: '2023-07-15',
    time: '10:00 AM',
    duration: '60 minutes',
    type: 'Mid-term',
    status: 'upcoming'
  },
  {
    id: '2',
    title: 'Newton\'s Laws Quiz',
    subject: 'Physics',
    date: '2023-07-18',
    time: '09:30 AM',
    duration: '45 minutes',
    type: 'Quiz',
    status: 'upcoming'
  }
];

const completedTests = [
  {
    id: '3',
    title: 'Cell Biology Test',
    subject: 'Biology',
    date: '2023-07-05',
    score: '85%',
    grade: 'A',
    duration: '60 minutes',
    type: 'Unit Test',
    status: 'completed'
  },
  {
    id: '4',
    title: 'Literature Analysis',
    subject: 'English',
    date: '2023-07-01',
    score: '92%',
    grade: 'A+',
    duration: '90 minutes',
    type: 'Final Exam',
    status: 'completed'
  },
  {
    id: '5',
    title: 'Chemical Reactions',
    subject: 'Chemistry',
    date: '2023-06-28',
    score: '78%',
    grade: 'B+',
    duration: '45 minutes',
    type: 'Quiz',
    status: 'completed'
  }
];

const Tests = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-primary/20 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-muted rounded mb-3"></div>
          <div className="h-3 w-24 bg-muted rounded"></div>
        </div>
      </div>
    );
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // Handle start test button
  const handleStartTest = (testId: string) => {
    navigate(`/test/${testId}`);
  };
  
  // Handle view result button
  const handleViewResult = (testId: string) => {
    navigate(`/test-results/${testId}`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tests & Exams</h1>
          <p className="text-muted-foreground">
            View upcoming and completed exams, quizzes, and tests.
          </p>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming" className="relative">
              Upcoming
              {upcomingTests.length > 0 && (
                <Badge className="ml-2 absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
                  {upcomingTests.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="practice">Practice Tests</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-4">
            {upcomingTests.length === 0 ? (
              <div className="text-center py-10">
                <div className="mx-auto h-12 w-12 text-muted-foreground flex items-center justify-center rounded-full bg-muted">
                  <Calendar className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">No upcoming tests</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  You don't have any tests scheduled in the near future.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {upcomingTests.map((test) => (
                  <Card key={test.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <Badge variant="outline">{test.type}</Badge>
                        <Badge variant="secondary">{test.subject}</Badge>
                      </div>
                      <CardTitle className="mt-2">{test.title}</CardTitle>
                      <CardDescription>
                        <div className="flex items-center gap-1 mt-1">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{test.date} at {test.time}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{test.duration}</span>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm space-y-2">
                        <div className="flex items-start gap-1.5">
                          <Shield className="h-4 w-4 text-green-500 mt-0.5" />
                          <div>
                            <span className="font-medium">Security Features:</span>
                            <ul className="list-disc list-inside ml-1 text-muted-foreground">
                              <li>Screen Monitoring</li>
                              <li>Browser Lockdown</li>
                              <li>Randomized Questions</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" onClick={() => handleStartTest(test.id)}>
                        <FileText className="mr-2 h-4 w-4" /> View Test Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
            
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
              <div className="text-amber-500 mt-0.5">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium text-amber-800">Important Notice About Online Tests</h4>
                <p className="text-sm text-amber-700 mt-1">
                  All tests are proctored and have security measures in place. Please ensure you have a stable 
                  internet connection and a working webcam. Any suspicious activity will be flagged and may result 
                  in test termination.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-4">
            {completedTests.length === 0 ? (
              <div className="text-center py-10">
                <div className="mx-auto h-12 w-12 text-muted-foreground flex items-center justify-center rounded-full bg-muted">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">No completed tests</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  You haven't completed any tests yet.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {completedTests.map((test) => (
                  <Card key={test.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <Badge variant="outline">{test.type}</Badge>
                        <Badge variant="secondary">{test.subject}</Badge>
                      </div>
                      <CardTitle className="mt-2">{test.title}</CardTitle>
                      <CardDescription>
                        <div className="flex items-center gap-1 mt-1">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>Completed on {test.date}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{test.duration}</span>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-muted rounded-md p-4 text-center">
                        <div className="text-3xl font-bold">{test.score}</div>
                        <div className="text-lg font-semibold mt-1">Grade: {test.grade}</div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" onClick={() => handleViewResult(test.id)}>
                        View Detailed Results
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="practice" className="space-y-4">
            <div className="text-center py-10">
              <div className="mx-auto h-12 w-12 text-muted-foreground flex items-center justify-center rounded-full bg-muted">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Practice Tests</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Practice tests are available to help you prepare for upcoming exams.
              </p>
              <Button className="mt-4">Browse Practice Tests</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <AIAssistant />
    </DashboardLayout>
  );
};

export default Tests;
