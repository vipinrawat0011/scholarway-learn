
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

// Mock data for classes (1st to 12th standard)
const standardClasses = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `${i + 1}${getOrdinalSuffix(i + 1)} Standard`,
  teacher: `Dr. ${['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Rodriguez', 'Wilson', 'Martinez', 'Anderson'][i]}`,
  studentsCount: Math.floor(Math.random() * 20) + 20, // Random between 20-40 students
}));

// Helper function to get ordinal suffix
function getOrdinalSuffix(num) {
  const j = num % 10,
        k = num % 100;
  if (j === 1 && k !== 11) {
    return "st";
  }
  if (j === 2 && k !== 12) {
    return "nd";
  }
  if (j === 3 && k !== 13) {
    return "rd";
  }
  return "th";
}

// Mock data for students with random distribution across classes and scholar levels
const generateMockStudents = () => {
  const names = [
    'Emma Wilson', 'James Thompson', 'Sophia Chen', 'Liam Rodriguez', 'Olivia Johnson',
    'Noah Martin', 'Ava Williams', 'Mason Brown', 'Isabella Davis', 'Ethan Miller',
    'Charlotte Smith', 'Benjamin Taylor', 'Amelia Anderson', 'Lucas Jackson', 'Mia White',
    'Alexander Harris', 'Harper Martin', 'William Thompson', 'Abigail Clark', 'Michael Lewis',
    'Ella Moore', 'Daniel Young', 'Sofia Scott', 'Matthew Allen', 'Avery Hill',
    'Henry Baker', 'Scarlett Diaz', 'Joseph Adams', 'Chloe Campbell', 'Samuel Wright',
    'Grace Nelson', 'David Carter', 'Victoria Mitchell', 'Owen Perez', 'Lily Roberts',
    'Wyatt Turner', 'Zoe Phillips', 'John Evans', 'Hannah Morgan', 'Leo Murphy'
  ];
  
  const scholarLevels = ['junior', 'rising', 'elite'];
  
  return Array.from({ length: 250 }, (_, i) => {
    const standardClass = standardClasses[Math.floor(Math.random() * 12)];
    const scholarLevel = scholarLevels[Math.floor(Math.random() * 3)];
    const averageScore = scholarLevel === 'junior' 
      ? Math.floor(Math.random() * 10) + 70 
      : scholarLevel === 'rising' 
        ? Math.floor(Math.random() * 10) + 80 
        : Math.floor(Math.random() * 10) + 90;
    
    return {
      id: i + 1,
      name: names[i % names.length],
      avatar: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
      email: names[i % names.length].toLowerCase().replace(' ', '.') + '@example.com',
      scholarLevel: scholarLevel,
      averageScore: averageScore,
      class: standardClass.name,
      classId: standardClass.id,
      attendance: `${Math.floor(Math.random() * 15) + 85}%`,
      lastActive: `${Math.floor(Math.random() * 5) + 1} ${['hours', 'days'][Math.floor(Math.random() * 2)]} ago`
    };
  });
};

const mockStudents = generateMockStudents();

const StudentClassification = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedStandard, setSelectedStandard] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (!user || user.role !== 'admin') {
    navigate('/dashboard');
    return null;
  }

  // Filter students based on current filters
  const filteredStudents = mockStudents.filter(student => {
    // Filter by standard if a specific standard is selected
    if (selectedStandard !== 'all' && student.class !== selectedStandard) {
      return false;
    }
    
    // Filter by scholar level if a specific level is selected
    if (selectedLevel !== 'all' && student.scholarLevel !== selectedLevel) {
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

  // Get class distribution data for the overview
  const getClassDistribution = () => {
    const standardsToShow = selectedStandard === 'all' 
      ? standardClasses 
      : standardClasses.filter(cls => cls.name === selectedStandard);
    
    return standardsToShow.map(standardClass => {
      const classStudents = mockStudents.filter(s => s.class === standardClass.name);
      const juniorCount = classStudents.filter(s => s.scholarLevel === 'junior').length;
      const risingCount = classStudents.filter(s => s.scholarLevel === 'rising').length;
      const eliteCount = classStudents.filter(s => s.scholarLevel === 'elite').length;
      
      return {
        ...standardClass,
        students: classStudents,
        juniorCount,
        risingCount,
        eliteCount,
        totalCount: classStudents.length
      };
    });
  };

  const classDistribution = getClassDistribution();

  return (
    <DashboardLayout>
      <div className="animate-fade-in space-y-6">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Student Classification</h1>
            <p className="text-muted-foreground mt-1">
              View and manage students by standard and scholar level
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
              <Button variant="outline" size="sm" className="w-full" onClick={() => setSelectedLevel('junior')}>
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
              <Button variant="outline" size="sm" className="w-full" onClick={() => setSelectedLevel('rising')}>
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
              <Button variant="outline" size="sm" className="w-full" onClick={() => setSelectedLevel('elite')}>
                View All Mastermind Elite
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Student Classification by Standard</CardTitle>
                <CardDescription>
                  View students grouped by scholar level for each standard
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Select value={selectedStandard} onValueChange={setSelectedStandard}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by Standard" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Standards</SelectItem>
                    {standardClasses.map(cls => (
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
            <Tabs defaultValue="all" value={selectedLevel} onValueChange={setSelectedLevel}>
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
            <CardTitle>Standard Overview</CardTitle>
            <CardDescription>
              Distribution of scholar levels across different standards
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {classDistribution.map(cls => {
                return (
                  <div key={cls.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">{cls.name}</h3>
                      <span className="text-sm text-muted-foreground">Teacher: {cls.teacher}</span>
                    </div>
                    
                    <div className="flex h-4 rounded-full overflow-hidden">
                      {cls.juniorCount > 0 && (
                        <div 
                          className="bg-blue-500 h-full" 
                          style={{ width: `${(cls.juniorCount / cls.totalCount) * 100}%` }}
                          title={`Junior Scholars: ${cls.juniorCount}`}
                        />
                      )}
                      {cls.risingCount > 0 && (
                        <div 
                          className="bg-amber-500 h-full" 
                          style={{ width: `${(cls.risingCount / cls.totalCount) * 100}%` }}
                          title={`Rising Intellects: ${cls.risingCount}`}
                        />
                      )}
                      {cls.eliteCount > 0 && (
                        <div 
                          className="bg-green-500 h-full" 
                          style={{ width: `${(cls.eliteCount / cls.totalCount) * 100}%` }}
                          title={`Mastermind Elite: ${cls.eliteCount}`}
                        />
                      )}
                    </div>
                    
                    <div className="flex gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span>Junior: {cls.juniorCount}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                        <span>Rising: {cls.risingCount}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span>Elite: {cls.eliteCount}</span>
                      </div>
                    </div>
                    
                    <div className="mt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => {
                          setSelectedStandard(cls.name);
                          setSelectedLevel('all');
                        }}
                      >
                        View {cls.name} Students
                      </Button>
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
