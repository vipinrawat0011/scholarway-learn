
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { BarChart, LineChart, PieChart } from '@/components/ui/chart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Building, User, BookOpen, Users, PieChart as PieChartIcon, Activity, Eye, EyeOff, Plus, Search } from 'lucide-react';
import { toast } from 'sonner';

// Sample data for institutes and admins
interface Institute {
  id: string;
  name: string;
  location: string;
  adminId: string;
  totalTeachers: number;
  totalStudents: number;
  totalCourses: number;
  createdAt: string;
}

interface Admin {
  id: string;
  name: string;
  email: string;
  instituteId: string;
  avatarUrl?: string;
  status: 'active' | 'inactive';
}

// Permission structure for visibility control
interface DashboardVisibility {
  instituteId: string;
  instituteName: string;
  admin: {
    userSection: boolean;
    contentReview: boolean;
    approvals: boolean;
    studentClassification: boolean;
    aiLearning: boolean;
    systemStatus: boolean;
  };
  teacher: {
    materials: boolean;
    students: boolean;
    exams: boolean;
  };
  student: {
    progress: boolean;
    tests: boolean;
  };
}

// Sample data for institutes and admins
const SAMPLE_INSTITUTES: Institute[] = [
  {
    id: '1',
    name: 'Northern Academy',
    location: 'New York, USA',
    adminId: '101',
    totalTeachers: 45,
    totalStudents: 850,
    totalCourses: 32,
    createdAt: '2022-09-15'
  },
  {
    id: '2',
    name: 'Southern University',
    location: 'Texas, USA',
    adminId: '102',
    totalTeachers: 68,
    totalStudents: 1250,
    totalCourses: 47,
    createdAt: '2021-08-10'
  },
  {
    id: '3',
    name: 'Eastern College',
    location: 'Massachusetts, USA',
    adminId: '103',
    totalTeachers: 32,
    totalStudents: 620,
    totalCourses: 28,
    createdAt: '2023-01-05'
  },
  {
    id: '4',
    name: 'Western Institute',
    location: 'California, USA',
    adminId: '104',
    totalTeachers: 57,
    totalStudents: 980,
    totalCourses: 41,
    createdAt: '2022-05-22'
  }
];

const SAMPLE_ADMINS: Admin[] = [
  {
    id: '101',
    name: 'John Admin',
    email: 'john@northernacademy.edu',
    instituteId: '1',
    avatarUrl: 'https://i.pravatar.cc/150?img=11',
    status: 'active'
  },
  {
    id: '102',
    name: 'Sarah Manager',
    email: 'sarah@southernuniv.edu',
    instituteId: '2',
    avatarUrl: 'https://i.pravatar.cc/150?img=20',
    status: 'active'
  },
  {
    id: '103',
    name: 'Michael Director',
    email: 'michael@eastern.edu',
    instituteId: '3',
    avatarUrl: 'https://i.pravatar.cc/150?img=30',
    status: 'inactive'
  },
  {
    id: '104',
    name: 'Lisa Controller',
    email: 'lisa@western.edu',
    instituteId: '4',
    avatarUrl: 'https://i.pravatar.cc/150?img=40',
    status: 'active'
  }
];

// Sample visibility settings
const INITIAL_VISIBILITY: DashboardVisibility[] = SAMPLE_INSTITUTES.map(institute => ({
  instituteId: institute.id,
  instituteName: institute.name,
  admin: {
    userSection: true,
    contentReview: true,
    approvals: true,
    studentClassification: true,
    aiLearning: true,
    systemStatus: true
  },
  teacher: {
    materials: true,
    students: true,
    exams: true
  },
  student: {
    progress: true,
    tests: true
  }
}));

const SuperadminDashboard = () => {
  const { user } = useAuth();
  const [selectedInstitute, setSelectedInstitute] = useState<Institute | null>(null);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddInstituteForm, setShowAddInstituteForm] = useState(false);
  const [newInstituteName, setNewInstituteName] = useState('');
  const [newInstituteLocation, setNewInstituteLocation] = useState('');
  const [dashboardVisibility, setDashboardVisibility] = useState<DashboardVisibility[]>(INITIAL_VISIBILITY);
  const [activeTab, setActiveTab] = useState('institutes');

  // Filter institutes and admins based on search query
  const filteredInstitutes = SAMPLE_INSTITUTES.filter(institute => 
    institute.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    institute.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAdmins = SAMPLE_ADMINS.filter(admin => 
    admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle institute selection
  const handleInstituteSelect = (institute: Institute) => {
    setSelectedInstitute(institute);
    const admin = SAMPLE_ADMINS.find(a => a.instituteId === institute.id) || null;
    setSelectedAdmin(admin);
  };

  // Handle admin selection
  const handleAdminSelect = (admin: Admin) => {
    setSelectedAdmin(admin);
    const institute = SAMPLE_INSTITUTES.find(i => i.id === admin.instituteId) || null;
    setSelectedInstitute(institute);
  };

  // Handle adding a new institute
  const handleAddInstitute = () => {
    if (!newInstituteName.trim() || !newInstituteLocation.trim()) {
      toast.error('Please fill out all fields');
      return;
    }

    // This would typically connect to an API to add the institute
    toast.success(`Institute "${newInstituteName}" added successfully!`);
    setNewInstituteName('');
    setNewInstituteLocation('');
    setShowAddInstituteForm(false);
  };

  // Handle visibility toggle
  const handleVisibilityToggle = (instituteId: string, role: 'admin' | 'teacher' | 'student', feature: string) => {
    setDashboardVisibility(prev => 
      prev.map(item => {
        if (item.instituteId === instituteId) {
          return {
            ...item,
            [role]: {
              ...item[role],
              [feature]: !item[role][feature as keyof typeof item[typeof role]]
            }
          };
        }
        return item;
      })
    );
    
    toast.success(`Feature visibility updated for ${role}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Superadmin Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome, {user?.name} - Manage all institutes and admins
          </p>
        </div>
        <div className="flex space-x-2">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search institutes or admins..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={() => setShowAddInstituteForm(true)}>
            <Plus className="mr-1 h-4 w-4" /> Add Institute
          </Button>
        </div>
      </div>

      {showAddInstituteForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Institute</CardTitle>
            <CardDescription>Create a new institute and assign an admin</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Institute Name</Label>
                <Input 
                  id="name" 
                  value={newInstituteName}
                  onChange={(e) => setNewInstituteName(e.target.value)}
                  placeholder="e.g. Western University"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location" 
                  value={newInstituteLocation}
                  onChange={(e) => setNewInstituteLocation(e.target.value)}
                  placeholder="e.g. California, USA"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setShowAddInstituteForm(false)}>Cancel</Button>
            <Button onClick={handleAddInstitute}>Create Institute</Button>
          </CardFooter>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>System-wide statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Building className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Institutes</p>
                  <p className="text-2xl font-bold">{SAMPLE_INSTITUTES.length}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Admins</p>
                  <p className="text-2xl font-bold">{SAMPLE_ADMINS.length}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold">
                    {SAMPLE_INSTITUTES.reduce((sum, inst) => sum + inst.totalStudents, 0)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Courses</p>
                  <p className="text-2xl font-bold">
                    {SAMPLE_INSTITUTES.reduce((sum, inst) => sum + inst.totalCourses, 0)}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="institutes">Institutes</TabsTrigger>
                <TabsTrigger value="admins">Admins</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="p-0">
            <TabsContent value="institutes" className="m-0">
              <ScrollArea className="h-[400px] p-4">
                <div className="space-y-4">
                  {filteredInstitutes.map(institute => (
                    <div 
                      key={institute.id} 
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedInstitute?.id === institute.id 
                          ? 'bg-muted border-primary' 
                          : 'hover:bg-muted/50'
                      }`}
                      onClick={() => handleInstituteSelect(institute)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{institute.name}</h3>
                          <p className="text-sm text-muted-foreground">{institute.location}</p>
                        </div>
                        <Badge variant={institute.id === selectedInstitute?.id ? "default" : "outline"}>
                          {institute.totalStudents} Students
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Teachers</p>
                          <p className="font-medium">{institute.totalTeachers}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Courses</p>
                          <p className="font-medium">{institute.totalCourses}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Created</p>
                          <p className="font-medium">{new Date(institute.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="admins" className="m-0">
              <ScrollArea className="h-[400px] p-4">
                <div className="space-y-4">
                  {filteredAdmins.map(admin => (
                    <div 
                      key={admin.id} 
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedAdmin?.id === admin.id 
                          ? 'bg-muted border-primary' 
                          : 'hover:bg-muted/50'
                      }`}
                      onClick={() => handleAdminSelect(admin)}
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={admin.avatarUrl} />
                          <AvatarFallback>{admin.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{admin.name}</h3>
                            <Badge variant={admin.status === 'active' ? "success" : "secondary"}>
                              {admin.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{admin.email}</p>
                        </div>
                      </div>
                      <div className="mt-2 text-sm">
                        <p className="text-muted-foreground">Institute</p>
                        <p className="font-medium">
                          {SAMPLE_INSTITUTES.find(i => i.id === admin.instituteId)?.name || 'Unknown'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </CardContent>
        </Card>
      </div>

      {selectedInstitute && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">
            {selectedInstitute.name} Details
            {selectedAdmin && selectedAdmin.status === 'inactive' && (
              <Badge variant="outline" className="ml-2 bg-yellow-50 text-yellow-700 border-yellow-200">
                Admin Inactive
              </Badge>
            )}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Institute Statistics</CardTitle>
                <CardDescription>
                  Performance metrics for {selectedInstitute.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-medium">Students Growth</h4>
                      <Badge variant="outline">{selectedInstitute.totalStudents} total</Badge>
                    </div>
                    <div className="h-[120px]">
                      <BarChart 
                        data={[
                          { name: 'Jan', value: Math.floor(selectedInstitute.totalStudents * 0.7) },
                          { name: 'Feb', value: Math.floor(selectedInstitute.totalStudents * 0.75) },
                          { name: 'Mar', value: Math.floor(selectedInstitute.totalStudents * 0.8) },
                          { name: 'Apr', value: Math.floor(selectedInstitute.totalStudents * 0.85) },
                          { name: 'May', value: Math.floor(selectedInstitute.totalStudents * 0.9) },
                          { name: 'Jun', value: selectedInstitute.totalStudents }
                        ]}
                        yAxisWidth={40}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-medium">Resource Distribution</h4>
                    </div>
                    <div className="h-[120px]">
                      <PieChart 
                        data={[
                          { name: 'Teachers', value: selectedInstitute.totalTeachers, color: 'hsl(var(--primary))' },
                          { name: 'Courses', value: selectedInstitute.totalCourses, color: 'hsl(var(--muted))' },
                          { name: 'Students', value: Math.min(selectedInstitute.totalStudents / 20, 100), color: 'hsl(var(--secondary))' }
                        ]}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Dashboard Visibility Controls</CardTitle>
                <CardDescription>
                  Control which features are visible to users at {selectedInstitute.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue="admin">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="admin">Admin</TabsTrigger>
                    <TabsTrigger value="teacher">Teacher</TabsTrigger>
                    <TabsTrigger value="student">Student</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="admin" className="space-y-4 p-4">
                    {Object.entries(dashboardVisibility.find(v => v.instituteId === selectedInstitute.id)?.admin || {}).map(([key, enabled]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {enabled ? (
                              <span className="flex items-center text-green-600">
                                <Eye className="mr-1 h-3 w-3" /> Visible
                              </span>
                            ) : (
                              <span className="flex items-center text-red-600">
                                <EyeOff className="mr-1 h-3 w-3" /> Hidden
                              </span>
                            )}
                          </div>
                        </div>
                        <Switch
                          checked={enabled}
                          onCheckedChange={() => handleVisibilityToggle(selectedInstitute.id, 'admin', key)}
                        />
                      </div>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="teacher" className="space-y-4 p-4">
                    {Object.entries(dashboardVisibility.find(v => v.instituteId === selectedInstitute.id)?.teacher || {}).map(([key, enabled]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {enabled ? (
                              <span className="flex items-center text-green-600">
                                <Eye className="mr-1 h-3 w-3" /> Visible
                              </span>
                            ) : (
                              <span className="flex items-center text-red-600">
                                <EyeOff className="mr-1 h-3 w-3" /> Hidden
                              </span>
                            )}
                          </div>
                        </div>
                        <Switch
                          checked={enabled}
                          onCheckedChange={() => handleVisibilityToggle(selectedInstitute.id, 'teacher', key)}
                        />
                      </div>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="student" className="space-y-4 p-4">
                    {Object.entries(dashboardVisibility.find(v => v.instituteId === selectedInstitute.id)?.student || {}).map(([key, enabled]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {enabled ? (
                              <span className="flex items-center text-green-600">
                                <Eye className="mr-1 h-3 w-3" /> Visible
                              </span>
                            ) : (
                              <span className="flex items-center text-red-600">
                                <EyeOff className="mr-1 h-3 w-3" /> Hidden
                              </span>
                            )}
                          </div>
                        </div>
                        <Switch
                          checked={enabled}
                          onCheckedChange={() => handleVisibilityToggle(selectedInstitute.id, 'student', key)}
                        />
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="border-t py-3">
                <Button variant="outline" className="w-full">Save Visibility Settings</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperadminDashboard;
