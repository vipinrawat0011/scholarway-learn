
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { School, Star, Medal, Trophy, ChevronDown, Search, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { Separator } from '@/components/ui/separator';

// Mock data for student classification
const mockClasses = [
  { id: 1, name: 'Mathematics 101', teacher: 'Dr. Alan Turing', studentsCount: 34 },
  { id: 2, name: 'Physics: Mechanics', teacher: 'Prof. Richard Feynman', studentsCount: 28 },
  { id: 3, name: 'Introduction to Literature', teacher: 'Dr. Jane Austen', studentsCount: 42 },
  { id: 4, name: 'Computer Science Basics', teacher: 'Dr. Ada Lovelace', studentsCount: 38 },
  { id: 5, name: 'World History', teacher: 'Prof. Howard Zinn', studentsCount: 31 },
];

const mockStudents = [
  { 
    id: 1, 
    name: 'Emma Wilson', 
    avatar: 'https://i.pravatar.cc/150?img=1',
    email: 'emma.w@example.com',
    scholarLevel: 'elite',
    averageScore: 96,
    class: 'Mathematics 101',
    attendance: '98%',
    lastActive: '2 hours ago'
  },
  { 
    id: 2, 
    name: 'James Thompson', 
    avatar: 'https://i.pravatar.cc/150?img=2',
    email: 'james.t@example.com',
    scholarLevel: 'elite',
    averageScore: 94,
    class: 'Physics: Mechanics',
    attendance: '95%',
    lastActive: '1 day ago'
  },
  { 
    id: 3, 
    name: 'Sophia Chen', 
    avatar: 'https://i.pravatar.cc/150?img=3',
    email: 'sophia.c@example.com',
    scholarLevel: 'rising',
    averageScore: 88,
    class: 'World History',
    attendance: '92%',
    lastActive: '4 hours ago'
  },
  { 
    id: 4, 
    name: 'Liam Rodriguez', 
    avatar: 'https://i.pravatar.cc/150?img=4',
    email: 'liam.r@example.com',
    scholarLevel: 'rising',
    averageScore: 85,
    class: 'Computer Science Basics',
    attendance: '90%',
    lastActive: '3 hours ago'
  },
  { 
    id: 5, 
    name: 'Olivia Johnson', 
    avatar: 'https://i.pravatar.cc/150?img=5',
    email: 'olivia.j@example.com',
    scholarLevel: 'junior',
    averageScore: 78,
    class: 'Introduction to Literature',
    attendance: '85%',
    lastActive: '1 hour ago'
  },
  { 
    id: 6, 
    name: 'Noah Martin', 
    avatar: 'https://i.pravatar.cc/150?img=6',
    email: 'noah.m@example.com',
    scholarLevel: 'junior',
    averageScore: 76,
    class: 'Mathematics 101',
    attendance: '88%',
    lastActive: '5 hours ago'
  },
  { 
    id: 7, 
    name: 'Ava Williams', 
    avatar: 'https://i.pravatar.cc/150?img=7',
    email: 'ava.w@example.com',
    scholarLevel: 'rising',
    averageScore: 87,
    class: 'Physics: Mechanics',
    attendance: '94%',
    lastActive: '2 days ago'
  },
  { 
    id: 8, 
    name: 'Mason Brown', 
    avatar: 'https://i.pravatar.cc/150?img=8',
    email: 'mason.b@example.com',
    scholarLevel: 'elite',
    averageScore: 93,
    class: 'Computer Science Basics',
    attendance: '97%',
    lastActive: '6 hours ago'
  },
  { 
    id: 9, 
    name: 'Isabella Davis', 
    avatar: 'https://i.pravatar.cc/150?img=9',
    email: 'isabella.d@example.com',
    scholarLevel: 'junior',
    averageScore: 75,
    class: 'World History',
    attendance: '80%',
    lastActive: '1 day ago'
  },
  { 
    id: 10, 
    name: 'Ethan Miller', 
    avatar: 'https://i.pravatar.cc/150?img=10',
    email: 'ethan.m@example.com',
    scholarLevel: 'junior',
    averageScore: 79,
    class: 'Introduction to Literature',
    attendance: '86%',
    lastActive: '3 days ago'
  }
];

const StudentClassification = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (!user || user.role !== 'admin') {
    navigate('/dashboard');
    return null;
  }

  // Filter students based on current filters
  const filteredStudents = mockStudents.filter(student => {
    // Filter by class if a specific class is selected
    if (selectedClass !== 'all' && student.class !== selectedClass) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !student.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  // Get students by scholar level
  const juniorScholars = filteredStudents.filter(s => s.scholarLevel === 'junior');
  const risingIntellects = filteredStudents.filter(s => s.scholarLevel === 'rising');
  const eliteMinds = filteredStudents.filter(s => s.scholarLevel === 'elite');

  const renderStudentList = (students: typeof mockStudents) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Class</TableHead>
          <TableHead>Average Score</TableHead>
          <TableHead>Attendance</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="h-24 text-center">
              No students found.
            </TableCell>
          </TableRow>
        ) : (
          students.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="font-medium">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={student.avatar} alt={student.name} />
                    <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{student.name}</div>
                    <div className="text-xs text-muted-foreground">{student.email}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{student.class}</TableCell>
              <TableCell>
                <Badge variant={student.averageScore >= 90 ? "default" : (student.averageScore >= 80 ? "secondary" : "outline")}>
                  {student.averageScore}%
                </Badge>
              </TableCell>
              <TableCell>{student.attendance}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">View Profile</Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );

  const getIconForScholarLevel = (level: string) => {
    switch(level) {
      case 'junior': return <School className="h-5 w-5" />;
      case 'rising': return <Star className="h-5 w-5" />;
      case 'elite': return <Trophy className="h-5 w-5" />;
      default: return <School className="h-5 w-5" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="animate-fade-in space-y-6">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Student Classification</h1>
            <p className="text-muted-foreground mt-1">
              View and manage students by scholar level
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <School className="h-5 w-5 text-blue-500" />
                  Junior Scholars
                </CardTitle>
                <Badge variant="outline">{juniorScholars.length}</Badge>
              </div>
              <CardDescription>
                Beginning their academic journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                Average score: {juniorScholars.length > 0 ? Math.round(juniorScholars.reduce((acc, s) => acc + s.averageScore, 0) / juniorScholars.length) : 0}%
              </p>
              <Button variant="outline" size="sm" className="w-full">
                View All Junior Scholars
              </Button>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-500">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-500" />
                  Rising Intellects
                </CardTitle>
                <Badge variant="outline">{risingIntellects.length}</Badge>
              </div>
              <CardDescription>
                Showing promising academic growth
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                Average score: {risingIntellects.length > 0 ? Math.round(risingIntellects.reduce((acc, s) => acc + s.averageScore, 0) / risingIntellects.length) : 0}%
              </p>
              <Button variant="outline" size="sm" className="w-full">
                View All Rising Intellects
              </Button>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-green-500" />
                  Mastermind Elite
                </CardTitle>
                <Badge variant="outline">{eliteMinds.length}</Badge>
              </div>
              <CardDescription>
                Exceptional academic performers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                Average score: {eliteMinds.length > 0 ? Math.round(eliteMinds.reduce((acc, s) => acc + s.averageScore, 0) / eliteMinds.length) : 0}%
              </p>
              <Button variant="outline" size="sm" className="w-full">
                View All Mastermind Elite
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Student Classification by Class</CardTitle>
                <CardDescription>
                  View students grouped by scholar level for each class
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by Class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    {mockClasses.map(cls => (
                      <SelectItem key={cls.id} value={cls.name}>{cls.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search students..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="w-full max-w-md mx-auto grid grid-cols-4">
                <TabsTrigger value="all">All Levels</TabsTrigger>
                <TabsTrigger value="junior" className="flex items-center gap-1">
                  <School className="h-4 w-4" />
                  Junior
                </TabsTrigger>
                <TabsTrigger value="rising" className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  Rising
                </TabsTrigger>
                <TabsTrigger value="elite" className="flex items-center gap-1">
                  <Trophy className="h-4 w-4" />
                  Elite
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                {renderStudentList(filteredStudents)}
              </TabsContent>
              
              <TabsContent value="junior">
                {renderStudentList(juniorScholars)}
              </TabsContent>
              
              <TabsContent value="rising">
                {renderStudentList(risingIntellects)}
              </TabsContent>
              
              <TabsContent value="elite">
                {renderStudentList(eliteMinds)}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Class Overview</CardTitle>
            <CardDescription>
              Distribution of scholar levels across different classes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {mockClasses.map(cls => {
                const classStudents = mockStudents.filter(s => s.class === cls.name);
                const juniorCount = classStudents.filter(s => s.scholarLevel === 'junior').length;
                const risingCount = classStudents.filter(s => s.scholarLevel === 'rising').length;
                const eliteCount = classStudents.filter(s => s.scholarLevel === 'elite').length;
                
                return (
                  <div key={cls.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">{cls.name}</h3>
                      <span className="text-sm text-muted-foreground">Teacher: {cls.teacher}</span>
                    </div>
                    
                    <div className="flex h-4 rounded-full overflow-hidden">
                      {juniorCount > 0 && (
                        <div 
                          className="bg-blue-500 h-full" 
                          style={{ width: `${(juniorCount / classStudents.length) * 100}%` }}
                          title={`Junior Scholars: ${juniorCount}`}
                        />
                      )}
                      {risingCount > 0 && (
                        <div 
                          className="bg-amber-500 h-full" 
                          style={{ width: `${(risingCount / classStudents.length) * 100}%` }}
                          title={`Rising Intellects: ${risingCount}`}
                        />
                      )}
                      {eliteCount > 0 && (
                        <div 
                          className="bg-green-500 h-full" 
                          style={{ width: `${(eliteCount / classStudents.length) * 100}%` }}
                          title={`Mastermind Elite: ${eliteCount}`}
                        />
                      )}
                    </div>
                    
                    <div className="flex gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span>Junior: {juniorCount}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                        <span>Rising: {risingCount}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span>Elite: {eliteCount}</span>
                      </div>
                    </div>
                    
                    <Separator className="mt-4" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentClassification;
