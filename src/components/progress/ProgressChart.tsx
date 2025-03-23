
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, ArrowUp, ArrowDown, GraduationCap, Calendar } from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

// Dummy data for charts
const monthlyProgressData = [
  { month: 'Jan', progress: 65, target: 70 },
  { month: 'Feb', progress: 72, target: 75 },
  { month: 'Mar', progress: 78, target: 75 },
  { month: 'Apr', progress: 74, target: 80 },
  { month: 'May', progress: 82, target: 80 },
  { month: 'Jun', progress: 85, target: 85 },
  { month: 'Jul', progress: 88, target: 85 },
  { month: 'Aug', progress: 92, target: 90 },
  { month: 'Sep', progress: 89, target: 90 },
  { month: 'Oct', progress: 95, target: 95 },
  { month: 'Nov', progress: 0, target: 95 },
  { month: 'Dec', progress: 0, target: 100 },
];

const subjectProgressData = [
  { subject: 'Mathematics', progress: 95, target: 90 },
  { subject: 'Physics', progress: 82, target: 85 },
  { subject: 'Chemistry', progress: 78, target: 80 },
  { subject: 'Biology', progress: 88, target: 85 },
  { subject: 'Computer Science', progress: 92, target: 90 },
  { subject: 'English', progress: 75, target: 80 },
];

const examScoresData = [
  { subject: 'Math', midterm: 92, final: 94 },
  { subject: 'Physics', midterm: 85, final: 88 },
  { subject: 'Chemistry', midterm: 78, final: 82 },
  { subject: 'Biology', midterm: 88, final: 90 },
  { subject: 'CS', midterm: 95, final: 96 },
  { subject: 'English', midterm: 80, final: 82 },
];

// Upcoming assessment data
const upcomingAssessments = [
  { id: 1, title: 'Advanced Calculus Final Exam', date: '2023-12-15', subject: 'Mathematics', weight: '30%' },
  { id: 2, title: 'Quantum Physics Quiz', date: '2023-11-10', subject: 'Physics', weight: '15%' },
  { id: 3, title: 'Computational Algorithms Project', date: '2023-11-25', subject: 'Computer Science', weight: '25%' },
];

// Mock achievement data
const achievements = [
  { id: 1, title: 'Mathematics Excellence', date: '2023-09-15', description: 'Achieved top 5% in Advanced Calculus' },
  { id: 2, title: 'Perfect Attendance', date: '2023-08-30', description: 'Attended all classes for the semester' },
  { id: 3, title: 'Research Recognition', date: '2023-07-12', description: 'Outstanding contribution to physics research project' },
  { id: 4, title: 'Programming Competition', date: '2023-06-20', description: '2nd place in regional coding contest' },
];

interface ProgressChartProps {
  studentName: string;
  scholarLevel: 'junior' | 'rising' | 'elite';
  overallProgress: number;
  targetProgress: number;
}

const ProgressChart: React.FC<ProgressChartProps> = ({
  studentName,
  scholarLevel,
  overallProgress,
  targetProgress,
}) => {
  const getScholarLevelText = (level: string) => {
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
  
  const getScholarLevelColorClass = (level: string) => {
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
  
  const progressDifference = overallProgress - targetProgress;
  
  return (
    <div className="space-y-8 animate-fade-in">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Student Progress</h1>
          <p className="text-muted-foreground mt-1">
            Track your academic journey, {studentName?.split(' ')[0]}
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex flex-col sm:items-end">
          <Badge className={getScholarLevelColorClass(scholarLevel)}>
            {getScholarLevelText(scholarLevel)}
          </Badge>
          <span className="text-sm text-muted-foreground mt-1">Current Level</span>
        </div>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <GraduationCap className="mr-2 h-4 w-4 text-muted-foreground" />
              Overall Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-32">
              <div className="text-3xl font-bold mb-2">{overallProgress}%</div>
              <Progress value={overallProgress} className="w-full h-2" />
              <div className="flex items-center gap-2 mt-3">
                <span className="text-sm text-muted-foreground">Target: {targetProgress}%</span>
                <Badge variant={progressDifference >= 0 ? "default" : "secondary"} className="flex items-center">
                  {progressDifference >= 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                  {Math.abs(progressDifference)}%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <CheckCircle className="mr-2 h-4 w-4 text-muted-foreground" />
              Completed Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-32">
              <div className="text-3xl font-bold mb-2">8/12</div>
              <Progress value={(8/12) * 100} className="w-full h-2" />
              <p className="text-sm text-muted-foreground mt-4">
                4 courses remaining this semester
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1 animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              Next Level Projection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-32">
              <div className="text-3xl font-bold mb-2">Jan 2024</div>
              <p className="text-sm text-muted-foreground text-center">
                Projected promotion to {scholarLevel === 'junior' ? 'Rising Intellect' : 'Mastermind Elite'}
              </p>
              <Badge className="mt-3">On Track</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="progress" className="animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
        <TabsList>
          <TabsTrigger value="progress">Progress Over Time</TabsTrigger>
          <TabsTrigger value="subjects">Subject Performance</TabsTrigger>
          <TabsTrigger value="exams">Exam Scores</TabsTrigger>
        </TabsList>
        
        <TabsContent value="progress" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Progress Tracking</CardTitle>
              <CardDescription>
                Your monthly progress compared to targets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={monthlyProgressData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="progress" 
                      stroke="hsl(var(--primary))" 
                      activeDot={{ r: 8 }} 
                      strokeWidth={2}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="target" 
                      stroke="hsl(var(--muted-foreground))" 
                      strokeDasharray="5 5" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="outline">Download Report</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="subjects" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Subject Performance Analysis</CardTitle>
              <CardDescription>
                Current progress across different subjects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={subjectProgressData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="progress" name="Your Progress" fill="hsl(var(--primary))" />
                    <Bar dataKey="target" name="Target" fill="hsl(var(--muted-foreground))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-medium">Recommendations</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border">
                    <h4 className="font-medium">Strengths</h4>
                    <ul className="mt-2 space-y-1">
                      <li className="text-sm flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span>Mathematics: Excellent performance, 5% above target</span>
                      </li>
                      <li className="text-sm flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span>Computer Science: Strong skills, consider advanced courses</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg border">
                    <h4 className="font-medium">Areas for Improvement</h4>
                    <ul className="mt-2 space-y-1">
                      <li className="text-sm flex items-center gap-2">
                        <ArrowUp className="h-3 w-3 text-amber-500" />
                        <span>English: 5% below target, additional practice recommended</span>
                      </li>
                      <li className="text-sm flex items-center gap-2">
                        <ArrowUp className="h-3 w-3 text-amber-500" />
                        <span>Chemistry: Potential for improvement with focused study</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="exams" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Exam Performance</CardTitle>
              <CardDescription>
                Midterm and final exam comparisons
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={examScoresData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="midterm" name="Midterm Exam" fill="hsl(var(--accent))" />
                    <Bar dataKey="final" name="Final Exam" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Upcoming Assessments</h3>
                <div className="space-y-3">
                  {upcomingAssessments.map((assessment) => (
                    <div key={assessment.id} className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <h4 className="font-medium">{assessment.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">{assessment.subject}</Badge>
                          <Badge variant="outline">Weight: {assessment.weight}</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{new Date(assessment.date).toLocaleDateString()}</div>
                        <div className="text-xs text-muted-foreground">
                          {Math.round((new Date(assessment.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slide-in-up" style={{ animationDelay: '0.5s' }}>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Achievements & Recognitions</CardTitle>
            <CardDescription>Your academic accomplishments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="flex items-start gap-4 p-4 rounded-lg border">
                  <div className="rounded-full p-2 bg-primary/10">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Awarded on {new Date(achievement.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Growth Path</CardTitle>
            <CardDescription>Your journey to excellence</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="relative">
                <div className="absolute left-4 top-1 bottom-0 w-0.5 bg-border"></div>
                
                <div className="relative pl-12 pb-8">
                  <div className="absolute left-1 top-1 h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                    <div className="h-5 w-5 rounded-full bg-muted-foreground"></div>
                  </div>
                  <h3 className="text-lg font-medium">Junior Scholar</h3>
                  <p className="text-sm text-muted-foreground">Building foundations</p>
                  {scholarLevel === 'junior' && (
                    <Badge className="mt-2 scholar-junior">Current Level</Badge>
                  )}
                </div>
                
                <div className="relative pl-12 pb-8">
                  <div className={`absolute left-1 top-1 h-8 w-8 rounded-full ${
                    scholarLevel === 'junior' ? 'bg-muted' : 'bg-primary/20'
                  } flex items-center justify-center`}>
                    <div className={`h-5 w-5 rounded-full ${
                      scholarLevel === 'junior' ? 'bg-muted-foreground/50' : 'bg-primary'
                    }`}></div>
                  </div>
                  <h3 className="text-lg font-medium">Rising Intellect</h3>
                  <p className="text-sm text-muted-foreground">Expanding knowledge</p>
                  {scholarLevel === 'rising' && (
                    <Badge className="mt-2 scholar-rising">Current Level</Badge>
                  )}
                </div>
                
                <div className="relative pl-12">
                  <div className={`absolute left-1 top-1 h-8 w-8 rounded-full ${
                    scholarLevel === 'elite' ? 'bg-primary/20' : 'bg-muted'
                  } flex items-center justify-center`}>
                    <div className={`h-5 w-5 rounded-full ${
                      scholarLevel === 'elite' ? 'bg-primary' : 'bg-muted-foreground/50'
                    }`}></div>
                  </div>
                  <h3 className="text-lg font-medium">Mastermind Elite</h3>
                  <p className="text-sm text-muted-foreground">Achieving excellence</p>
                  {scholarLevel === 'elite' && (
                    <Badge className="mt-2 scholar-elite">Current Level</Badge>
                  )}
                </div>
              </div>
              
              <Button className="w-full">View Detailed Requirements</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProgressChart;
