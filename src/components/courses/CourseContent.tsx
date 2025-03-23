
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  CheckCircle,
  Clock,
  FileText,
  GraduationCap,
  Bookmark,
  Calendar,
  PlayCircle,
  BookOpen,
  File,
  Users,
  MessageSquare,
} from 'lucide-react';

interface Lesson {
  id: number;
  title: string;
  duration: string;
  type: 'video' | 'reading' | 'quiz';
  isCompleted?: boolean;
  isLocked?: boolean;
}

interface Module {
  id: number;
  title: string;
  lessons: Lesson[];
}

interface Instructor {
  id: number;
  name: string;
  role: string;
  bio: string;
  avatar?: string;
}

interface CourseDetailsProps {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  thumbnail?: string;
  modules: Module[];
  instructors: Instructor[];
  progress?: number;
  duration: string;
  level: string;
  category: string;
  rating: number;
  enrolledStudents: number;
  lastUpdated: string;
}

// Dummy course data
const courseData: CourseDetailsProps = {
  id: '1',
  title: 'Advanced Calculus: Differential Equations',
  description: 'Master the concepts of differential equations and their applications in real-world scenarios.',
  longDescription: 'This comprehensive course covers both ordinary and partial differential equations, providing a deep understanding of their mathematical foundations and practical applications. You will learn solution techniques for various types of differential equations, including first-order, second-order, and systems of differential equations. The course also explores applications in physics, engineering, and other scientific fields, giving you the tools to model and solve complex real-world problems. Through interactive exercises, practical examples, and challenging problem sets, you will develop the mathematical intuition and analytical skills necessary for advanced work in mathematics, science, and engineering.',
  thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
  modules: [
    {
      id: 1,
      title: 'Introduction to Differential Equations',
      lessons: [
        {
          id: 1,
          title: 'What are Differential Equations?',
          duration: '12min',
          type: 'video',
          isCompleted: true
        },
        {
          id: 2,
          title: 'Classification of Differential Equations',
          duration: '15min',
          type: 'video',
          isCompleted: true
        },
        {
          id: 3,
          title: 'Applications in Real-world Problems',
          duration: '20min',
          type: 'reading',
          isCompleted: false
        },
        {
          id: 4,
          title: 'Module 1 Quiz',
          duration: '15min',
          type: 'quiz',
          isCompleted: false
        }
      ]
    },
    {
      id: 2,
      title: 'First-Order Differential Equations',
      lessons: [
        {
          id: 5,
          title: 'Separable Equations',
          duration: '18min',
          type: 'video',
          isCompleted: false
        },
        {
          id: 6,
          title: 'Linear First-Order Equations',
          duration: '22min',
          type: 'video',
          isCompleted: false
        },
        {
          id: 7,
          title: 'Exact Equations and Integrating Factors',
          duration: '25min',
          type: 'reading',
          isCompleted: false
        },
        {
          id: 8,
          title: 'Applications in Population Growth',
          duration: '15min',
          type: 'video',
          isCompleted: false
        },
        {
          id: 9,
          title: 'Module 2 Quiz',
          duration: '20min',
          type: 'quiz',
          isCompleted: false
        }
      ]
    },
    {
      id: 3,
      title: 'Second-Order Differential Equations',
      lessons: [
        {
          id: 10,
          title: 'Homogeneous Equations with Constant Coefficients',
          duration: '20min',
          type: 'video',
          isLocked: true
        },
        {
          id: 11,
          title: 'Method of Undetermined Coefficients',
          duration: '25min',
          type: 'video',
          isLocked: true
        },
        {
          id: 12,
          title: 'Variation of Parameters',
          duration: '18min',
          type: 'reading',
          isLocked: true
        },
        {
          id: 13,
          title: 'Applications in Mechanics',
          duration: '22min',
          type: 'video',
          isLocked: true
        },
        {
          id: 14,
          title: 'Module 3 Quiz',
          duration: '25min',
          type: 'quiz',
          isLocked: true
        }
      ]
    }
  ],
  instructors: [
    {
      id: 1,
      name: 'Dr. Alan Turing',
      role: 'Professor of Mathematics',
      bio: 'Dr. Turing has over 15 years of experience teaching calculus and differential equations at prestigious universities. His research focuses on applications of differential equations in computational models.',
      avatar: 'https://i.pravatar.cc/150?img=11'
    },
    {
      id: 2,
      name: 'Prof. Grace Hopper',
      role: 'Associate Professor of Applied Mathematics',
      bio: 'Prof. Hopper specializes in numerical solutions of differential equations and their applications in computer science and engineering.',
      avatar: 'https://i.pravatar.cc/150?img=13'
    }
  ],
  progress: 25,
  duration: '8 weeks',
  level: 'Intermediate',
  category: 'Mathematics',
  rating: 4.8,
  enrolledStudents: 325,
  lastUpdated: '2023-09-15'
};

const CourseContent: React.FC = () => {
  const [activeModule, setActiveModule] = useState<number>(1);
  
  // Get instructor initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  const getLessonIcon = (type: string, isCompleted?: boolean, isLocked?: boolean) => {
    if (isLocked) return <Clock className="h-4 w-4 text-muted-foreground" />;
    if (isCompleted) return <CheckCircle className="h-4 w-4 text-green-500" />;
    
    switch (type) {
      case 'video':
        return <PlayCircle className="h-4 w-4 text-primary" />;
      case 'reading':
        return <FileText className="h-4 w-4 text-primary" />;
      case 'quiz':
        return <GraduationCap className="h-4 w-4 text-primary" />;
      default:
        return <File className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Course Header */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge>{courseData.category}</Badge>
              <Badge variant="outline">{courseData.level}</Badge>
              <Badge variant="outline">{courseData.duration}</Badge>
            </div>
            
            <h1 className="text-3xl font-bold leading-tight">{courseData.title}</h1>
            
            <div className="text-muted-foreground">{courseData.description}</div>
            
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{courseData.enrolledStudents} students</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Last updated: {new Date(courseData.lastUpdated).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                {'★'.repeat(Math.floor(courseData.rating))}
                {'☆'.repeat(5 - Math.floor(courseData.rating))}
                <span className="text-sm ml-1">{courseData.rating}</span>
              </div>
            </div>
          </div>
          
          {/* Course Image */}
          <div className="rounded-lg overflow-hidden">
            {courseData.thumbnail ? (
              <img
                src={courseData.thumbnail}
                alt={courseData.title}
                className="w-full object-cover h-64 sm:h-80"
              />
            ) : (
              <div className="w-full h-64 sm:h-80 bg-muted flex items-center justify-center">
                <BookOpen className="h-12 w-12 text-muted-foreground" />
              </div>
            )}
          </div>
          
          {/* Course Tabs */}
          <Tabs defaultValue="content" className="mt-8">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="content">Course Content</TabsTrigger>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="instructors">Instructors</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="mt-6 space-y-4">
              <div className="grid grid-cols-1 gap-4">
                {courseData.modules.map((module) => (
                  <Card key={module.id} className={activeModule === module.id ? 'border-primary' : ''}>
                    <CardHeader 
                      className="py-4 px-5 cursor-pointer" 
                      onClick={() => setActiveModule(activeModule === module.id ? 0 : module.id)}
                    >
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">{module.title}</CardTitle>
                        <div className="text-sm text-muted-foreground">
                          {module.lessons.length} lessons
                        </div>
                      </div>
                    </CardHeader>
                    
                    {activeModule === module.id && (
                      <CardContent className="pb-5 pt-0 px-5">
                        <div className="space-y-2">
                          {module.lessons.map((lesson) => (
                            <div 
                              key={lesson.id} 
                              className={`flex items-center justify-between p-3 rounded-md cursor-pointer transition-colors ${
                                lesson.isLocked 
                                  ? 'bg-muted/50 cursor-not-allowed' 
                                  : 'hover:bg-accent'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                {getLessonIcon(lesson.type, lesson.isCompleted, lesson.isLocked)}
                                <span className={lesson.isLocked ? 'text-muted-foreground' : ''}>
                                  {lesson.title}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="font-normal">
                                  {lesson.type}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {lesson.duration}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="overview" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Course Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">About This Course</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {courseData.longDescription}
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">What You'll Learn</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>Solve first-order and second-order differential equations</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>Apply differential equations to model real-world phenomena</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>Understand the mathematical theory behind various solution methods</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>Implement numerical methods for solving differential equations</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>Analyze systems of differential equations and their stability</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Course Requirements</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>Basic calculus knowledge (derivatives and integrals)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>Understanding of linear algebra concepts</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>Familiarity with basic physics principles (recommended)</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="instructors" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Course Instructors</CardTitle>
                  <CardDescription>Learn from experts in the field</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {courseData.instructors.map((instructor) => (
                    <div key={instructor.id} className="flex flex-col sm:flex-row gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={instructor.avatar} />
                        <AvatarFallback>{getInitials(instructor.name)}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">{instructor.name}</h3>
                        <div className="text-sm text-muted-foreground">{instructor.role}</div>
                        <p className="text-sm">{instructor.bio}</p>
                        <Button variant="outline" size="sm">View Profile</Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="sticky top-6">
            <CardHeader className="pb-4">
              <CardTitle>Course Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Your progress</span>
                  <span className="text-sm font-medium">{courseData.progress}%</span>
                </div>
                <Progress value={courseData.progress} className="h-2" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Modules completed</span>
                  </div>
                  <span className="font-medium">0/3</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Lessons completed</span>
                  </div>
                  <span className="font-medium">2/14</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Total duration</span>
                  </div>
                  <span className="font-medium">5h 12m</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Enrolled on</span>
                  </div>
                  <span className="font-medium">Sep 10, 2023</span>
                </div>
              </div>
              
              <Button className="w-full">Continue Learning</Button>
              
              <div className="flex items-center justify-center gap-4 pt-2">
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <Bookmark className="h-4 w-4 mr-1" />
                  Bookmark
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Discuss
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">What's Included</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <PlayCircle className="h-4 w-4 text-muted-foreground" />
                  <span>8 hours of video content</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span>12 readings and resources</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <span>5 quizzes and assessments</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <span>Direct access to instructors</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  <span>Certificate of completion</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
