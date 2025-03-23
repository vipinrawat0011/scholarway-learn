
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import CourseCard, { CourseProps } from '@/components/courses/CourseCard';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, BookOpen } from 'lucide-react';
import AIAssistant from '@/components/ai/AIAssistant';

// Sample courses data
const sampleCourses: CourseProps[] = [
  {
    id: '1',
    title: 'Advanced Calculus: Differential Equations',
    description: 'Master the concepts of differential equations and their applications in real-world scenarios.',
    instructor: {
      name: 'Dr. Alan Turing',
      avatar: 'https://i.pravatar.cc/150?img=11',
    },
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    progress: 25,
    category: 'Mathematics',
    level: 'Intermediate',
    duration: '8 weeks',
    students: 325,
    isEnrolled: true
  },
  {
    id: '2',
    title: 'Quantum Physics: Principles and Applications',
    description: 'Explore the fascinating world of quantum mechanics and its mind-bending implications.',
    instructor: {
      name: 'Dr. Marie Curie',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    thumbnail: 'https://images.unsplash.com/photo-1635070041711-64026916dcfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    progress: 68,
    category: 'Physics',
    level: 'Advanced',
    duration: '10 weeks',
    students: 248,
    isEnrolled: true
  },
  {
    id: '3',
    title: 'Introduction to Computer Science',
    description: 'Learn the fundamentals of computer science, algorithms, and data structures.',
    instructor: {
      name: 'Prof. Grace Hopper',
      avatar: 'https://i.pravatar.cc/150?img=13',
    },
    thumbnail: 'https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    progress: 92,
    category: 'Computer Science',
    level: 'Beginner',
    duration: '6 weeks',
    students: 420,
    isEnrolled: true
  },
  {
    id: '4',
    title: 'Organic Chemistry Fundamentals',
    description: 'Understand the principles and reactions in organic chemistry with hands-on examples.',
    instructor: {
      name: 'Dr. Rosalind Franklin',
      avatar: 'https://i.pravatar.cc/150?img=23',
    },
    thumbnail: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    category: 'Chemistry',
    level: 'Intermediate',
    duration: '8 weeks',
    students: 305,
    isEnrolled: false
  },
  {
    id: '5',
    title: 'Modern World History: 20th Century',
    description: 'Analyze the major events, figures, and trends that shaped our modern world.',
    instructor: {
      name: 'Prof. Howard Zinn',
      avatar: 'https://i.pravatar.cc/150?img=51',
    },
    thumbnail: 'https://images.unsplash.com/photo-1461360228754-6e81c478b882?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    category: 'History',
    level: 'Beginner',
    duration: '12 weeks',
    students: 352,
    isEnrolled: false
  },
  {
    id: '6',
    title: 'Advanced Data Structures and Algorithms',
    description: 'Master complex algorithms and data structures used in modern computing.',
    instructor: {
      name: 'Dr. Ada Lovelace',
      avatar: 'https://i.pravatar.cc/150?img=24',
    },
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    category: 'Computer Science',
    level: 'Advanced',
    duration: '9 weeks',
    students: 289,
    isEnrolled: false
  },
  {
    id: '7',
    title: 'Literary Analysis: Classic to Contemporary',
    description: 'Develop critical reading and analysis skills through diverse literary works.',
    instructor: {
      name: 'Prof. Jane Austen',
      avatar: 'https://i.pravatar.cc/150?img=41',
    },
    thumbnail: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    category: 'Literature',
    level: 'Intermediate',
    duration: '10 weeks',
    students: 215,
    isEnrolled: false
  },
  {
    id: '8',
    title: 'Biological Systems and Ecology',
    description: 'Explore the intricate relationships between organisms and their environments.',
    instructor: {
      name: 'Dr. Rachel Carson',
      avatar: 'https://i.pravatar.cc/150?img=32',
    },
    thumbnail: 'https://images.unsplash.com/photo-1507477338202-487281e6c27e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    category: 'Biology',
    level: 'Beginner',
    duration: '7 weeks',
    students: 274,
    isEnrolled: false
  }
];

const Courses = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  
  // Redirect to login if not authenticated
  if (!isAuthenticated && !isLoading) {
    return <Navigate to="/login" />;
  }
  
  // Filter courses based on search query and filters
  const filteredCourses = sampleCourses.filter(course => {
    // Search query filter
    const matchesSearch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category filter
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
    
    // Level filter
    const matchesLevel = levelFilter === 'all' || course.level === levelFilter;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });
  
  // Extract unique categories and levels for filters
  const categories = Array.from(new Set(sampleCourses.map(course => course.category)));
  const levels = Array.from(new Set(sampleCourses.map(course => course.level)));

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Courses</h1>
            <p className="text-muted-foreground mt-1">
              Discover and enroll in a wide range of educational content
            </p>
          </div>
          <Button>
            <BookOpen className="mr-2 h-4 w-4" />
            View Curriculum
          </Button>
        </div>
        
        <Tabs defaultValue="all">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <TabsList>
              <TabsTrigger value="all">All Courses</TabsTrigger>
              <TabsTrigger value="enrolled">My Courses</TabsTrigger>
              <TabsTrigger value="recommended">Recommended</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search courses..."
                  className="pl-9 w-full sm:w-64"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 mt-4">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                {levels.map(level => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <TabsContent value="all" className="mt-6">
            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCourses.map(course => (
                  <CourseCard key={course.id} {...course} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
                  <Search className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No courses found</h3>
                <p className="text-muted-foreground mt-2">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="enrolled" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sampleCourses
                .filter(course => course.isEnrolled)
                .map(course => (
                  <CourseCard key={course.id} {...course} />
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="recommended" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sampleCourses
                .filter(course => ['Computer Science', 'Mathematics'].includes(course.category))
                .map(course => (
                  <CourseCard key={course.id} {...course} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <AIAssistant />
    </DashboardLayout>
  );
};

export default Courses;
