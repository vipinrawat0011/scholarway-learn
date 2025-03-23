
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Brain, BookOpen, Sparkles, MessageSquare, Robot, Lightbulb, Video } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AILearningAssistance = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <DashboardLayout>
      <div className="animate-fade-in space-y-6">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">AI Learning Assistance</h1>
            <p className="text-muted-foreground mt-1">
              Personalized AI-powered learning tools and resources
            </p>
          </div>
          <Button className="md:w-auto w-full">
            <MessageSquare className="mr-2 h-4 w-4" />
            Start New Conversation
          </Button>
        </header>

        <Tabs defaultValue="tools" className="w-full">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-3">
            <TabsTrigger value="tools">AI Tools</TabsTrigger>
            <TabsTrigger value="tutoring">AI Tutoring</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tools" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-lg">
                    <Brain className="mr-2 h-5 w-5 text-primary" />
                    Study Assistant
                  </CardTitle>
                  <CardDescription>
                    AI-powered study notes and summaries
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload your notes or textbooks and get AI-generated summaries, flashcards, and study guides.
                  </p>
                  <Button className="w-full" variant="outline">
                    Open Assistant
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-lg">
                    <Sparkles className="mr-2 h-5 w-5 text-primary" />
                    Homework Helper
                  </CardTitle>
                  <CardDescription>
                    Step-by-step problem solutions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get detailed explanations and guidance for homework problems across all subjects.
                  </p>
                  <Button className="w-full" variant="outline">
                    Ask a Question
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-lg">
                    <Robot className="mr-2 h-5 w-5 text-primary" />
                    Writing Coach
                  </CardTitle>
                  <CardDescription>
                    Essay and writing improvement
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get feedback on your essays, reports, and other written assignments with AI-powered suggestions.
                  </p>
                  <Button className="w-full" variant="outline">
                    Improve Writing
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Your Recent AI Sessions</CardTitle>
                <CardDescription>
                  Continue where you left off or start a new session
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Topic</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Physics: Newton's Laws</TableCell>
                      <TableCell>Study Notes</TableCell>
                      <TableCell>{new Date().toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Continue</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Essay: Climate Change</TableCell>
                      <TableCell>Writing Feedback</TableCell>
                      <TableCell>{new Date(Date.now() - 86400000).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Continue</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Math: Calculus Problems</TableCell>
                      <TableCell>Homework Help</TableCell>
                      <TableCell>{new Date(Date.now() - 172800000).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Continue</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tutoring" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Tutoring Sessions</CardTitle>
                <CardDescription>
                  Schedule or join personalized AI tutoring for any subject
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button className="h-auto py-6 flex flex-col items-center justify-center space-y-2" variant="outline">
                    <Video className="h-8 w-8 mb-2" />
                    <span className="font-medium">Join Live AI Tutor Session</span>
                    <span className="text-xs text-muted-foreground">Interactive learning with AI</span>
                  </Button>
                  
                  <Button className="h-auto py-6 flex flex-col items-center justify-center space-y-2" variant="outline">
                    <Lightbulb className="h-8 w-8 mb-2" />
                    <span className="font-medium">Schedule New AI Tutoring</span>
                    <span className="text-xs text-muted-foreground">Plan ahead for difficult topics</span>
                  </Button>
                </div>
                
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium mb-2">Recommended for You</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Based on your recent test performance and learning patterns
                  </p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Algebra: Quadratic Equations</p>
                        <p className="text-sm text-muted-foreground">Addresses your recent test gaps</p>
                      </div>
                      <Button size="sm">Schedule</Button>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Chemistry: Balancing Equations</p>
                        <p className="text-sm text-muted-foreground">Recommended for upcoming test</p>
                      </div>
                      <Button size="sm">Schedule</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>AI-Enhanced Learning Resources</CardTitle>
                <CardDescription>
                  Curated learning materials powered by artificial intelligence
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">AI-Generated Study Guides</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        Personalized study materials created by AI based on your learning style.
                      </p>
                      <Button className="w-full" variant="outline">Browse Guides</Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Interactive Simulations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        AI-driven interactive visualizations to help understand complex concepts.
                      </p>
                      <Button className="w-full" variant="outline">Explore Simulations</Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Practice Question Bank</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        Adaptive questions that adjust to your skill level as you practice.
                      </p>
                      <Button className="w-full" variant="outline">Start Practicing</Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">AI Research Assistant</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        Help with research projects and papers with AI-powered insights.
                      </p>
                      <Button className="w-full" variant="outline">Research Tool</Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Card>
          <CardHeader>
            <CardTitle>AI Learning Insights</CardTitle>
            <CardDescription>
              Personalized analysis of your learning patterns and progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-6 bg-muted/50 rounded-lg text-center">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-primary/60" />
              <h3 className="text-lg font-medium mb-2">Your Learning Assistant is getting to know you</h3>
              <p className="text-sm text-muted-foreground mb-4">
                As you interact more with our AI tools, we'll provide personalized insights and recommendations to enhance your learning journey.
              </p>
              <Button>Start Using AI Tools</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AILearningAssistance;
