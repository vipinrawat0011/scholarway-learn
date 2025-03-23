
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { ArrowLeft, CheckCircle, XCircle, AlertCircle, FileText, Clock, Calendar, Target, Award, TrendingUp, Lightbulb } from 'lucide-react';
import AIAssistant from '@/components/ai/AIAssistant';

// Sample test result data
const testResultsData = {
  '3': {
    id: '3',
    title: 'Cell Biology Test',
    subject: 'Biology',
    date: '2023-07-05',
    score: 85,
    grade: 'A',
    duration: '60 minutes',
    type: 'Unit Test',
    status: 'completed',
    totalQuestions: 50,
    correctAnswers: 42,
    incorrectAnswers: 6,
    skippedQuestions: 2,
    timeSpent: '52 minutes',
    strengths: ['Cell Structure', 'Mitosis', 'Cellular Respiration'],
    areasForImprovement: ['Meiosis', 'Cell Signaling'],
    feedback: 'Excellent understanding of cell structures and processes. Need to focus more on meiosis concepts.',
    categoryScores: [
      { name: 'Cell Structure', score: 90 },
      { name: 'Cell Processes', score: 80 },
      { name: 'Cell Division', score: 75 },
      { name: 'Cell Metabolism', score: 88 },
      { name: 'Cell Communication', score: 70 },
    ],
    questionResponseTimes: [
      { name: '1-10', averageTime: 40 },
      { name: '11-20', averageTime: 35 },
      { name: '21-30', averageTime: 45 },
      { name: '31-40', averageTime: 52 },
      { name: '41-50', averageTime: 48 },
    ],
    classAverage: 76,
    classMedian: 78,
    classHighest: 95,
    percentile: 89,
  },
  '4': {
    id: '4',
    title: 'Literature Analysis',
    subject: 'English',
    date: '2023-07-01',
    score: 92,
    grade: 'A+',
    duration: '90 minutes',
    type: 'Final Exam',
    status: 'completed',
    totalQuestions: 40,
    correctAnswers: 37,
    incorrectAnswers: 3,
    skippedQuestions: 0,
    timeSpent: '87 minutes',
    strengths: ['Character Analysis', 'Theme Identification', 'Critical Analysis'],
    areasForImprovement: ['Historical Context'],
    feedback: 'Outstanding analysis skills. Your interpretations are insightful and well-supported by textual evidence.',
    categoryScores: [
      { name: 'Character Analysis', score: 95 },
      { name: 'Plot Analysis', score: 90 },
      { name: 'Theme Analysis', score: 93 },
      { name: 'Historical Context', score: 85 },
      { name: 'Literary Devices', score: 91 },
    ],
    questionResponseTimes: [
      { name: '1-10', averageTime: 120 },
      { name: '11-20', averageTime: 130 },
      { name: '21-30', averageTime: 140 },
      { name: '31-40', averageTime: 125 },
    ],
    classAverage: 83,
    classMedian: 85,
    classHighest: 92,
    percentile: 98,
  },
  '5': {
    id: '5',
    title: 'Chemical Reactions',
    subject: 'Chemistry',
    date: '2023-06-28',
    score: 78,
    grade: 'B+',
    duration: '45 minutes',
    type: 'Quiz',
    status: 'completed',
    totalQuestions: 25,
    correctAnswers: 20,
    incorrectAnswers: 5,
    skippedQuestions: 0,
    timeSpent: '42 minutes',
    strengths: ['Balancing Equations', 'Reaction Types'],
    areasForImprovement: ['Redox Reactions', 'Reaction Mechanisms'],
    feedback: 'Good understanding of basic reaction types. Continue practicing redox reactions and equilibrium concepts.',
    categoryScores: [
      { name: 'Balancing Equations', score: 85 },
      { name: 'Reaction Types', score: 82 },
      { name: 'Redox Reactions', score: 65 },
      { name: 'Equilibrium', score: 75 },
      { name: 'Reaction Rates', score: 77 },
    ],
    questionResponseTimes: [
      { name: '1-5', averageTime: 70 },
      { name: '6-10', averageTime: 85 },
      { name: '11-15', averageTime: 95 },
      { name: '16-20', averageTime: 100 },
      { name: '21-25', averageTime: 105 },
    ],
    classAverage: 74,
    classMedian: 76,
    classHighest: 90,
    percentile: 73,
  }
};

const COLORS = ['#4ade80', '#f87171', '#fbbf24'];

const TestResults = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { testId } = useParams();
  const navigateBack = () => window.history.back();

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

  // Handle invalid test ID
  if (!testId || !testResultsData[testId as keyof typeof testResultsData]) {
    return (
      <DashboardLayout>
        <div className="max-w-3xl mx-auto text-center py-20">
          <AlertCircle className="h-12 w-12 mx-auto text-destructive" />
          <h2 className="mt-4 text-2xl font-bold">Test Result Not Found</h2>
          <p className="mt-2 text-muted-foreground">
            The test result you're looking for doesn't exist or you may not have permission to view it.
          </p>
          <Button className="mt-6" variant="outline" onClick={navigateBack}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const testResult = testResultsData[testId as keyof typeof testResultsData];

  // Prepare chart data
  const pieData = [
    { name: 'Correct', value: testResult.correctAnswers },
    { name: 'Incorrect', value: testResult.incorrectAnswers },
    { name: 'Skipped', value: testResult.skippedQuestions },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center">
              <Button variant="ghost" size="sm" className="mr-2" onClick={navigateBack}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-2xl font-bold">{testResult.title} Results</h1>
            </div>
            <div className="flex items-center gap-3 mt-1 text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{testResult.date}</span>
              </div>
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-1" />
                <span>{testResult.subject}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{testResult.duration}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{testResult.score}%</div>
            <Badge className="text-lg px-3 py-0.5">Grade: {testResult.grade}</Badge>
          </div>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-xl">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2 text-primary" />
                    Score Breakdown
                  </CardTitle>
                  <CardDescription>How you performed on this test</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[220px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mt-4 text-center text-sm">
                    <div className="flex flex-col">
                      <span className="font-medium text-green-600 flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 mr-1" /> Correct
                      </span>
                      <span className="font-bold text-xl">{testResult.correctAnswers}</span>
                      <span className="text-muted-foreground">of {testResult.totalQuestions}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-red-500 flex items-center justify-center">
                        <XCircle className="h-4 w-4 mr-1" /> Incorrect
                      </span>
                      <span className="font-bold text-xl">{testResult.incorrectAnswers}</span>
                      <span className="text-muted-foreground">of {testResult.totalQuestions}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-amber-500 flex items-center justify-center">
                        <AlertCircle className="h-4 w-4 mr-1" /> Skipped
                      </span>
                      <span className="font-bold text-xl">{testResult.skippedQuestions}</span>
                      <span className="text-muted-foreground">of {testResult.totalQuestions}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 mr-2 text-primary" />
                    Achievement Summary
                  </CardTitle>
                  <CardDescription>Your overall performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Overall Score</span>
                        <span className="text-sm font-medium">{testResult.score}%</span>
                      </div>
                      <Progress value={testResult.score} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Time Used</span>
                        <span className="font-medium">{testResult.timeSpent}</span>
                        <span className="text-xs text-muted-foreground">of {testResult.duration}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Percentile</span>
                        <span className="font-medium">{testResult.percentile}th</span>
                        <span className="text-xs text-green-600">Top {100-testResult.percentile}%</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Areas of Strength</h4>
                      <div className="flex flex-wrap gap-2">
                        {testResult.strengths.map((strength, index) => (
                          <Badge key={index} variant="secondary" className="bg-green-50 text-green-800 hover:bg-green-100">
                            {strength}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Areas for Improvement</h4>
                      <div className="flex flex-wrap gap-2">
                        {testResult.areasForImprovement.map((area, index) => (
                          <Badge key={index} variant="secondary" className="bg-amber-50 text-amber-800 hover:bg-amber-100">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                  Performance by Category
                </CardTitle>
                <CardDescription>Your score breakdown by subject areas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={testResult.categoryScores}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar 
                        dataKey="score" 
                        fill="#3b82f6" 
                        radius={[4, 4, 0, 0]}
                        name="Score (%)"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <Separator className="my-6" />
                
                <div>
                  <h4 className="text-sm font-medium mb-3">Response Time by Question Group (seconds)</h4>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={testResult.questionResponseTimes}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" label={{ value: 'Question Numbers', position: 'insideBottom', offset: -5 }} />
                        <YAxis label={{ value: 'Avg. Time (sec)', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Bar 
                          dataKey="averageTime" 
                          fill="#a855f7" 
                          radius={[4, 4, 0, 0]}
                          name="Average Time (seconds)"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="comparison" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-primary" />
                  Class Comparison
                </CardTitle>
                <CardDescription>How you performed compared to your classmates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <div className="text-sm text-muted-foreground">Your Score</div>
                    <div className="text-2xl font-bold mt-1">{testResult.score}%</div>
                  </div>
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <div className="text-sm text-muted-foreground">Class Average</div>
                    <div className="text-2xl font-bold mt-1">{testResult.classAverage}%</div>
                    <div className="text-xs text-green-600 mt-1">
                      {testResult.score > testResult.classAverage ? `+${(testResult.score - testResult.classAverage).toFixed(1)}%` : ''}
                    </div>
                  </div>
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <div className="text-sm text-muted-foreground">Class Median</div>
                    <div className="text-2xl font-bold mt-1">{testResult.classMedian}%</div>
                  </div>
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <div className="text-sm text-muted-foreground">Class Highest</div>
                    <div className="text-2xl font-bold mt-1">{testResult.classHighest}%</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Your Score vs. Class Range</span>
                    </div>
                    <div className="relative h-8 bg-muted rounded-md">
                      <div 
                        className="absolute top-0 bottom-0 left-0 bg-blue-100 rounded-l-md"
                        style={{ width: `${testResult.classAverage - 10}%` }}
                      ></div>
                      <div 
                        className="absolute top-0 bottom-0 bg-blue-200"
                        style={{ 
                          left: `${testResult.classAverage - 10}%`,
                          width: `${20}%` 
                        }}
                      ></div>
                      <div 
                        className="absolute top-0 bottom-0 bg-blue-100 rounded-r-md"
                        style={{ 
                          left: `${testResult.classAverage + 10}%`,
                          right: 0
                        }}
                      ></div>
                      <div 
                        className="absolute top-0 bottom-0 w-1 bg-blue-600"
                        style={{ left: `${testResult.classAverage}%` }}
                      ></div>
                      <div 
                        className="absolute top-0 bottom-0 w-0.5 bg-blue-800"
                        style={{ left: `${testResult.classMedian}%` }}
                      ></div>
                      <div 
                        className="absolute top-0 bottom-0 w-1 bg-green-600"
                        style={{ left: `${testResult.score}%` }}
                      ></div>
                      <div 
                        className="absolute -bottom-6 text-xs font-medium text-green-700"
                        style={{ left: `${testResult.score}%`, transform: 'translateX(-50%)' }}
                      >
                        You
                      </div>
                      <div 
                        className="absolute -top-6 text-xs font-medium text-blue-700"
                        style={{ left: `${testResult.classAverage}%`, transform: 'translateX(-50%)' }}
                      >
                        Avg
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
                    <div className="flex items-start">
                      <div className="mr-3 text-green-600">
                        <Award className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-green-800">Your Performance Ranking</h4>
                        <p className="text-sm text-green-700 mt-1">
                          You scored in the <strong>{testResult.percentile}th percentile</strong>, 
                          which means you performed better than {testResult.percentile}% of your classmates. 
                          {testResult.percentile > 90 ? ' Outstanding work!' : 
                            testResult.percentile > 75 ? ' Great job!' : 
                            testResult.percentile > 50 ? ' Good effort!' : 
                            ' Keep working to improve your score!'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="feedback" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2 text-primary" />
                  Instructor Feedback
                </CardTitle>
                <CardDescription>Personalized feedback and improvement suggestions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted p-4 rounded-lg">
                  <p className="italic">{testResult.feedback}</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Strengths</h4>
                  <ul className="space-y-2">
                    {testResult.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-green-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium">{strength}:</span>
                          <p className="text-sm text-muted-foreground">
                            You demonstrated excellent understanding in this area.
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Areas for Improvement</h4>
                  <ul className="space-y-2">
                    {testResult.areasForImprovement.map((area, index) => (
                      <li key={index} className="flex items-start">
                        <AlertCircle className="h-5 w-5 mr-2 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium">{area}:</span>
                          <p className="text-sm text-muted-foreground">
                            This area needs additional focus. Consider reviewing related concepts and examples.
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="mr-3 text-blue-600">
                      <Lightbulb className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-800">Recommended Study Plan</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Based on your performance, focus on strengthening your understanding of 
                        {testResult.areasForImprovement.join(', ')}. The following resources may help:
                      </p>
                      <ul className="list-disc list-inside text-sm text-blue-700 mt-2">
                        <li>Review Chapters 4-6 in your textbook</li>
                        <li>Complete practice exercises in the workbook</li>
                        <li>Watch the video tutorials shared in your learning portal</li>
                        <li>Schedule a review session with your instructor</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <AIAssistant />
    </DashboardLayout>
  );
};

export default TestResults;
