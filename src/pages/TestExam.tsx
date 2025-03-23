
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from '@/components/ui/drawer';
import { Clock, AlertTriangle, CheckCircle, XCircle, Eye, ArrowLeft, ArrowRight, Flag, Info, Shield, Camera, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Sample test data
const testData = {
  '1': {
    id: '1',
    title: 'Algebra Mid-term',
    subject: 'Mathematics',
    duration: 60, // in minutes
    totalQuestions: 20,
    instructions: `
      1. This test contains 20 questions.
      2. You have 60 minutes to complete the test.
      3. Once you start the test, you cannot pause it.
      4. All questions are mandatory.
      5. You can flag questions to review later.
      6. Submit your test before the time expires.
    `,
    securityFeatures: [
      'Screen monitoring is active',
      'You cannot switch tabs or windows',
      'Your webcam must remain on',
      'Random question sequencing',
      'Cannot copy or paste content',
    ],
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        text: 'Solve for x: 2x + 5 = 15',
        options: [
          { id: 'a', text: 'x = 5' },
          { id: 'b', text: 'x = 10' },
          { id: 'c', text: 'x = 7.5' },
          { id: 'd', text: 'x = 2' },
        ],
        correctAnswer: 'a',
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        text: 'Factor the expression: x² - 9',
        options: [
          { id: 'a', text: '(x - 3)(x + 3)' },
          { id: 'b', text: '(x - 9)(x + 1)' },
          { id: 'c', text: '(x - 3)(x - 3)' },
          { id: 'd', text: '(x + 9)(x - 1)' },
        ],
        correctAnswer: 'a',
      },
      {
        id: 'q3',
        type: 'multiple-choice',
        text: 'What is the value of y when x = 2 in the equation y = 3x² - 4x + 1?',
        options: [
          { id: 'a', text: 'y = 5' },
          { id: 'b', text: 'y = 7' },
          { id: 'c', text: 'y = 9' },
          { id: 'd', text: 'y = 11' },
        ],
        correctAnswer: 'c',
      },
      {
        id: 'q4',
        type: 'true-false',
        text: 'The equation x² + 4 = 0 has real number solutions.',
        options: [
          { id: 'a', text: 'True' },
          { id: 'b', text: 'False' },
        ],
        correctAnswer: 'b',
      },
      {
        id: 'q5',
        type: 'multiple-choice',
        text: 'What is the slope of the line passing through the points (3, 6) and (7, 10)?',
        options: [
          { id: 'a', text: 'm = 0.5' },
          { id: 'b', text: 'm = 1' },
          { id: 'c', text: 'm = 1.5' },
          { id: 'd', text: 'm = 2' },
        ],
        correctAnswer: 'b',
      },
      {
        id: 'q6',
        type: 'multiple-select',
        text: 'Which of the following are quadratic equations? (Select all that apply)',
        options: [
          { id: 'a', text: 'y = 2x + 3' },
          { id: 'b', text: 'y = x² + 5x - 2' },
          { id: 'c', text: 'y = x³ + x' },
          { id: 'd', text: 'y = 4x² - 1' },
        ],
        correctAnswer: ['b', 'd'],
      },
      {
        id: 'q7',
        type: 'short-answer',
        text: 'What is the value of x in the equation 3(x - 4) = 15?',
        correctAnswer: '9',
      },
      // Add more questions as needed for a total of 20
    ]
  },
  '2': {
    id: '2',
    title: 'Newton\'s Laws Quiz',
    subject: 'Physics',
    duration: 45, // in minutes
    totalQuestions: 15,
    instructions: `
      1. This quiz contains 15 questions.
      2. You have 45 minutes to complete the quiz.
      3. Once you start the quiz, you cannot pause it.
      4. All questions are mandatory.
      5. Some questions may require calculations.
      6. Submit your quiz before the time expires.
    `,
    securityFeatures: [
      'Screen monitoring is active',
      'You cannot switch tabs or windows',
      'Your webcam must remain on',
      'Random question sequencing',
      'Cannot copy or paste content',
    ],
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        text: 'Which of Newton\'s laws states that an object at rest will remain at rest, and an object in motion will remain in motion at constant velocity, unless acted upon by an external force?',
        options: [
          { id: 'a', text: 'First Law' },
          { id: 'b', text: 'Second Law' },
          { id: 'c', text: 'Third Law' },
          { id: 'd', text: 'Law of Conservation of Energy' },
        ],
        correctAnswer: 'a',
      },
      // Add more questions
    ]
  }
};

const TestExam = () => {
  const { user, isAuthenticated } = useAuth();
  const { testId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [test, setTest] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<string[]>([]);
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [isTimeWarningOpen, setIsTimeWarningOpen] = useState(false);
  const [isInfoDrawerOpen, setIsInfoDrawerOpen] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  
  // Initialize test
  useEffect(() => {
    if (testId && testData[testId as keyof typeof testData]) {
      const testInfo = testData[testId as keyof typeof testData];
      setTest(testInfo);
      setRemainingTime(testInfo.duration * 60); // Convert minutes to seconds
      
      // Initialize empty answers object
      const initialAnswers: Record<string, any> = {};
      testInfo.questions.forEach((q: any) => {
        if (q.type === 'multiple-select') {
          initialAnswers[q.id] = [];
        } else {
          initialAnswers[q.id] = '';
        }
      });
      setAnswers(initialAnswers);
    } else {
      navigate('/tests');
    }
  }, [testId, navigate]);
  
  // Timer logic
  useEffect(() => {
    if (!isStarted || remainingTime <= 0) return;
    
    const timer = setInterval(() => {
      setRemainingTime(prev => {
        const newTime = prev - 1;
        
        // Show warning when 5 minutes remaining
        if (newTime === 300) {
          setIsTimeWarningOpen(true);
        }
        
        // Auto-submit when time expires
        if (newTime <= 0) {
          clearInterval(timer);
          handleSubmitTest();
        }
        
        return newTime;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isStarted, remainingTime]);
  
  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  // Start the test
  const handleStartTest = () => {
    setIsStarted(true);
    toast({
      title: "Test Started",
      description: "Good luck! Your time has begun.",
      duration: 3000,
    });
  };
  
  // Handle answer change
  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };
  
  // Handle checkbox change for multiple select questions
  const handleCheckboxChange = (questionId: string, optionId: string, checked: boolean) => {
    setAnswers(prev => {
      const currentSelections = [...(prev[questionId] || [])];
      
      if (checked) {
        return {
          ...prev,
          [questionId]: [...currentSelections, optionId]
        };
      } else {
        return {
          ...prev,
          [questionId]: currentSelections.filter(id => id !== optionId)
        };
      }
    });
  };
  
  // Toggle flagged question
  const toggleFlaggedQuestion = (questionId: string) => {
    setFlaggedQuestions(prev => {
      if (prev.includes(questionId)) {
        return prev.filter(id => id !== questionId);
      } else {
        return [...prev, questionId];
      }
    });
  };
  
  // Navigate to next question
  const goToNextQuestion = () => {
    if (currentQuestionIndex < test.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };
  
  // Navigate to previous question
  const goToPrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  // Navigate to specific question
  const goToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };
  
  // Submit test
  const handleSubmitTest = () => {
    // Here you would typically send the answers to a server
    // For demo purposes, we'll just navigate to the results page
    navigate(`/test-results/${test.id}`);
  };
  
  // Calculate progress
  const answeredCount = Object.values(answers).filter(answer => {
    if (Array.isArray(answer)) {
      return answer.length > 0;
    }
    return answer !== '';
  }).length;
  
  const progressPercentage = test ? Math.round((answeredCount / test.questions.length) * 100) : 0;
  
  // If test is not loaded yet
  if (!test) {
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
  
  // If test hasn't started yet, show instruction screen
  if (!isStarted) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
        <Card className="w-full max-w-3xl shadow-lg">
          <CardHeader className="border-b bg-muted/40">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl">{test.title}</CardTitle>
                <p className="text-muted-foreground">{test.subject}</p>
              </div>
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {test.duration} minutes
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6 pb-2">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">Instructions</h3>
                <div className="bg-muted p-4 rounded-md whitespace-pre-line text-sm">
                  {test.instructions}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Security Measures</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-800 mb-2">This test is secured</p>
                      <ul className="text-sm text-blue-700 space-y-1.5">
                        {test.securityFeatures.map((feature: string, index: number) => (
                          <li key={index} className="flex items-center gap-2">
                            <CheckCircle className="h-3.5 w-3.5 text-blue-600" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-amber-800 mb-1">Important</p>
                    <p className="text-sm text-amber-700">
                      Once you start the test, you cannot pause the timer or exit without submission. 
                      Ensure you have a stable internet connection and your device is fully charged.
                      You will be monitored during the test.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 bg-muted/50 p-4 rounded-md">
                <Camera className="h-5 w-5 text-primary" />
                <span className="text-sm">
                  Your webcam will be active during the test. Make sure your face is clearly visible.
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t flex justify-between py-4">
            <Button variant="outline" onClick={() => navigate('/tests')}>
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Tests
            </Button>
            <Button onClick={handleStartTest}>
              Start Test <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  // Get current question
  const currentQuestion = test.questions[currentQuestionIndex];
  const isFlagged = flaggedQuestions.includes(currentQuestion.id);
  const isAnswered = Array.isArray(answers[currentQuestion.id]) 
    ? (answers[currentQuestion.id] as string[]).length > 0 
    : answers[currentQuestion.id] !== '';
  
  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      {/* Header with timer */}
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setIsExiting(true)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-semibold text-lg">{test.title}</h1>
              <p className="text-sm text-muted-foreground">{test.subject}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8"
              onClick={() => setIsInfoDrawerOpen(true)}
            >
              <Info className="h-4 w-4 mr-1" /> Info
            </Button>
            
            <div 
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium ${
                remainingTime <= 300 ? 'bg-red-100 text-red-800' : 'bg-muted'
              }`}
            >
              <Clock className={`h-4 w-4 ${remainingTime <= 300 ? 'text-red-600' : ''}`} />
              {formatTime(remainingTime)}
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Main test content */}
        <main className="flex-1 overflow-auto p-4">
          <div className="container mx-auto max-w-3xl">
            <div className="mb-4 flex justify-between items-center">
              <Badge variant="outline" className="text-sm px-2.5 py-0.5">
                Question {currentQuestionIndex + 1} of {test.questions.length}
              </Badge>
              
              <Button
                variant={isFlagged ? "default" : "outline"}
                size="sm"
                onClick={() => toggleFlaggedQuestion(currentQuestion.id)}
                className={isFlagged ? "bg-amber-500 hover:bg-amber-600" : ""}
              >
                <Flag className={`h-4 w-4 mr-1 ${isFlagged ? "text-white" : "text-amber-500"}`} />
                {isFlagged ? "Flagged" : "Flag for Review"}
              </Button>
            </div>
            
            <Card className="shadow-sm mb-6">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="text-lg font-medium">
                    {currentQuestion.text}
                  </div>
                  
                  {/* Multiple choice question */}
                  {currentQuestion.type === 'multiple-choice' && (
                    <RadioGroup 
                      value={answers[currentQuestion.id] || ''}
                      onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
                    >
                      <div className="space-y-3">
                        {currentQuestion.options.map((option: any) => (
                          <div key={option.id} className="flex items-center">
                            <RadioGroupItem value={option.id} id={option.id} />
                            <Label htmlFor={option.id} className="ml-2">
                              {option.text}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  )}
                  
                  {/* True/False question */}
                  {currentQuestion.type === 'true-false' && (
                    <RadioGroup 
                      value={answers[currentQuestion.id] || ''}
                      onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
                    >
                      <div className="space-y-3">
                        {currentQuestion.options.map((option: any) => (
                          <div key={option.id} className="flex items-center">
                            <RadioGroupItem value={option.id} id={option.id} />
                            <Label htmlFor={option.id} className="ml-2">
                              {option.text}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  )}
                  
                  {/* Multiple select question */}
                  {currentQuestion.type === 'multiple-select' && (
                    <div className="space-y-3">
                      {currentQuestion.options.map((option: any) => (
                        <div key={option.id} className="flex items-center">
                          <Checkbox 
                            id={option.id}
                            checked={(answers[currentQuestion.id] || []).includes(option.id)}
                            onCheckedChange={(checked) => 
                              handleCheckboxChange(currentQuestion.id, option.id, checked as boolean)
                            }
                          />
                          <Label htmlFor={option.id} className="ml-2">
                            {option.text}
                          </Label>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Short answer question */}
                  {currentQuestion.type === 'short-answer' && (
                    <div>
                      <Label htmlFor="answer">Your Answer</Label>
                      <Textarea 
                        id="answer"
                        value={answers[currentQuestion.id] || ''}
                        onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                        placeholder="Type your answer here..."
                        className="mt-1"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={goToPrevQuestion} 
                disabled={currentQuestionIndex === 0}
              >
                <ArrowLeft className="h-4 w-4 mr-1" /> Previous
              </Button>
              
              {currentQuestionIndex === test.questions.length - 1 ? (
                <Button onClick={() => setIsSubmitDialogOpen(true)}>
                  Submit Test
                </Button>
              ) : (
                <Button 
                  onClick={goToNextQuestion}
                  disabled={currentQuestionIndex === test.questions.length - 1}
                >
                  Next <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              )}
            </div>
          </div>
        </main>
        
        {/* Question navigation sidebar */}
        <aside className="hidden lg:block w-64 border-l overflow-auto bg-background">
          <div className="p-4">
            <h3 className="font-medium mb-3">Question Navigator</h3>
            
            <div className="mb-4">
              <Progress value={progressPercentage} className="h-2" />
              <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                <span>{answeredCount} of {test.questions.length} answered</span>
                <span>{progressPercentage}%</span>
              </div>
            </div>
            
            <div className="grid grid-cols-5 gap-2">
              {test.questions.map((question: any, index: number) => {
                const isCurrent = index === currentQuestionIndex;
                const isQuestionFlagged = flaggedQuestions.includes(question.id);
                const isQuestionAnswered = Array.isArray(answers[question.id]) 
                  ? (answers[question.id] as string[]).length > 0 
                  : answers[question.id] !== '';
                
                return (
                  <Button
                    key={question.id}
                    variant="outline"
                    size="icon"
                    className={`h-8 w-8 p-0 relative ${
                      isCurrent ? 'ring-2 ring-primary ring-offset-2' : ''
                    } ${
                      isQuestionAnswered 
                        ? 'bg-primary/10 text-primary border-primary/30' 
                        : 'bg-background'
                    }`}
                    onClick={() => goToQuestion(index)}
                  >
                    {index + 1}
                    {isQuestionFlagged && (
                      <span className="absolute -top-1 -right-1 h-2 w-2 bg-amber-500 rounded-full" />
                    )}
                  </Button>
                );
              })}
            </div>
            
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <div className="h-3 w-3 bg-primary/10 border border-primary/30 rounded-sm"></div>
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="h-3 w-3 bg-background border rounded-sm"></div>
                <span>Unanswered</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="h-3 w-3 bg-background border rounded-sm relative">
                  <span className="absolute -top-1 -right-1 h-2 w-2 bg-amber-500 rounded-full" />
                </div>
                <span>Flagged</span>
              </div>
            </div>
            
            <div className="mt-6">
              <Button 
                className="w-full"
                onClick={() => setIsSubmitDialogOpen(true)}
              >
                Submit Test
              </Button>
            </div>
          </div>
        </aside>
      </div>
      
      {/* Submit confirmation dialog */}
      <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Test?</DialogTitle>
            <DialogDescription>
              Are you sure you want to submit your test? You cannot change your answers after submission.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="flex items-center justify-between mb-2 text-sm">
              <span>Questions Answered:</span>
              <span className="font-medium">{answeredCount} of {test.questions.length}</span>
            </div>
            <Progress value={progressPercentage} className="h-2 mb-4" />
            
            {answeredCount < test.questions.length && (
              <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-sm text-amber-800">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                  <span>
                    You have {test.questions.length - answeredCount} unanswered questions.
                    Are you sure you want to submit?
                  </span>
                </div>
              </div>
            )}
            
            {flaggedQuestions.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mt-3 text-sm text-blue-800">
                <div className="flex items-start gap-2">
                  <Flag className="h-4 w-4 text-blue-600 mt-0.5" />
                  <span>
                    You have {flaggedQuestions.length} flagged questions that you marked for review.
                  </span>
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSubmitDialogOpen(false)}>
              Continue Test
            </Button>
            <Button onClick={handleSubmitTest}>
              Submit Test
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Time warning dialog */}
      <Dialog open={isTimeWarningOpen} onOpenChange={setIsTimeWarningOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-amber-800">5 Minutes Remaining</DialogTitle>
            <DialogDescription>
              You have 5 minutes left to complete your test. Please make sure to submit before the time expires.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 flex justify-center">
            <div className="h-20 w-20 rounded-full bg-amber-50 border-4 border-amber-500 flex items-center justify-center font-bold text-2xl text-amber-800">
              5:00
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={() => setIsTimeWarningOpen(false)}>
              Continue Test
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Exit confirmation dialog */}
      <AlertDialog open={isExiting} onOpenChange={setIsExiting}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Exit Test?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to exit the test? All your progress will be lost and your test will be marked as
              incomplete. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsExiting(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => navigate('/tests')} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Exit Test
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Test info drawer */}
      <Drawer open={isInfoDrawerOpen} onOpenChange={setIsInfoDrawerOpen}>
        <DrawerContent>
          <div className="px-4 py-2 h-[4px] w-[100px] bg-muted mx-auto rounded-full" />
          <DrawerHeader>
            <DrawerTitle>Test Information</DrawerTitle>
            <DrawerDescription>Details about this exam</DrawerDescription>
          </DrawerHeader>
          <div className="px-4 py-2 pb-4">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Test Details</h4>
                <ul className="text-sm space-y-2">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Subject:</span>
                    <span className="font-medium">{test.subject}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium">{test.duration} minutes</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Questions:</span>
                    <span className="font-medium">{test.totalQuestions}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Time Remaining:</span>
                    <span className="font-medium">{formatTime(remainingTime)}</span>
                  </li>
                </ul>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="text-sm font-medium mb-1">Instructions</h4>
                <div className="bg-muted p-3 rounded-md whitespace-pre-line text-xs">
                  {test.instructions}
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                <div className="flex items-start gap-2">
                  <Shield className="h-4 w-4 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-medium text-blue-800 mb-1">Security Active</h4>
                    <ul className="text-xs text-blue-700 space-y-1">
                      {test.securityFeatures.map((feature: string, index: number) => (
                        <li key={index} className="flex items-center gap-1.5">
                          <CheckCircle className="h-3 w-3 text-blue-600" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button onClick={() => setIsInfoDrawerOpen(false)}>Close</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default TestExam;
