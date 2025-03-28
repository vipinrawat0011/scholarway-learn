
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BarChart, LineChart, PieChart, InstituteStatsCharts } from './SuperadminCharts';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle, XCircle, Shield, Building, User, BookOpen, Plus, FileText, Calendar, Settings, Home, Mail } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

// Demo data
const demoInstitutes = [
  {
    id: '1',
    name: 'Harvard Academy',
    location: 'Cambridge, MA',
    admin: {
      id: 'admin1',
      name: 'John Davis',
      email: 'john@harvard-academy.edu',
      phone: '+1 (555) 123-4567'
    },
    stats: {
      teachers: 48,
      students: 650,
      courses: 35,
      monthlyData: [
        { month: 'Jan', studentCount: 600, courseCount: 30 },
        { month: 'Feb', studentCount: 610, courseCount: 31 },
        { month: 'Mar', studentCount: 620, courseCount: 32 },
        { month: 'Apr', studentCount: 630, courseCount: 33 },
        { month: 'May', studentCount: 640, courseCount: 34 },
        { month: 'Jun', studentCount: 650, courseCount: 35 }
      ]
    },
    dashboardVisibility: {
      admin: {
        'admin-dashboard': true,
        'admin-courses': true,
        'admin-schedule': true,
        'admin-user-section': true,
        'admin-content-review': true,
        'admin-approvals': true
      },
      teacher: {
        'teacher-dashboard': true,
        'teacher-courses': true,
        'teacher-schedule': true,
        'teacher-materials': true,
        'teacher-students': true,
        'teacher-exams': false
      },
      student: {
        'student-dashboard': true,
        'student-courses': true,
        'student-schedule': true,
        'student-progress': true,
        'student-tests': false
      }
    }
  },
  {
    id: '2',
    name: 'Oxford Institute',
    location: 'London, UK',
    admin: {
      id: 'admin2',
      name: 'Emma Thompson',
      email: 'emma@oxford-institute.edu',
      phone: '+44 7700 900123'
    },
    stats: {
      teachers: 62,
      students: 820,
      courses: 45,
      monthlyData: [
        { month: 'Jan', studentCount: 780, courseCount: 40 },
        { month: 'Feb', studentCount: 790, courseCount: 41 },
        { month: 'Mar', studentCount: 800, courseCount: 42 },
        { month: 'Apr', studentCount: 805, courseCount: 43 },
        { month: 'May', studentCount: 815, courseCount: 44 },
        { month: 'Jun', studentCount: 820, courseCount: 45 }
      ]
    },
    dashboardVisibility: {
      admin: {
        'admin-dashboard': true,
        'admin-courses': true,
        'admin-schedule': true,
        'admin-user-section': true,
        'admin-content-review': false,
        'admin-approvals': true
      },
      teacher: {
        'teacher-dashboard': true,
        'teacher-courses': true,
        'teacher-schedule': true,
        'teacher-materials': true,
        'teacher-students': true,
        'teacher-exams': true
      },
      student: {
        'student-dashboard': true,
        'student-courses': true,
        'student-schedule': true,
        'student-progress': true,
        'student-tests': true
      }
    }
  },
  {
    id: '3',
    name: 'Tokyo Tech Academy',
    location: 'Tokyo, Japan',
    admin: {
      id: 'admin3',
      name: 'Hiroshi Tanaka',
      email: 'hiroshi@tokyotech.edu',
      phone: '+81 3-1234-5678'
    },
    stats: {
      teachers: 35,
      students: 490,
      courses: 28,
      monthlyData: [
        { month: 'Jan', studentCount: 450, courseCount: 25 },
        { month: 'Feb', studentCount: 460, courseCount: 25 },
        { month: 'Mar', studentCount: 470, courseCount: 26 },
        { month: 'Apr', studentCount: 475, courseCount: 26 },
        { month: 'May', studentCount: 485, courseCount: 27 },
        { month: 'Jun', studentCount: 490, courseCount: 28 }
      ]
    },
    dashboardVisibility: {
      admin: {
        'admin-dashboard': true,
        'admin-courses': true,
        'admin-schedule': true,
        'admin-user-section': true,
        'admin-content-review': true,
        'admin-approvals': true
      },
      teacher: {
        'teacher-dashboard': true,
        'teacher-courses': true,
        'teacher-schedule': true,
        'teacher-materials': true,
        'teacher-students': false,
        'teacher-exams': false
      },
      student: {
        'student-dashboard': true,
        'student-courses': true,
        'student-schedule': true,
        'student-progress': false,
        'student-tests': false
      }
    }
  }
];

// Type definitions
interface Institute {
  id: string;
  name: string;
  location: string;
  admin: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  stats: {
    teachers: number;
    students: number;
    courses: number;
    monthlyData: Array<{
      month: string;
      studentCount: number;
      courseCount: number;
    }>;
  };
  dashboardVisibility: {
    admin: Record<string, boolean>;
    teacher: Record<string, boolean>;
    student: Record<string, boolean>;
  };
}

// Dashboard module definitions
interface DashboardModule {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const dashboardModules: Record<string, Record<string, DashboardModule>> = {
  admin: {
    'admin-dashboard': {
      id: 'admin-dashboard',
      name: 'Dashboard',
      description: 'Main admin dashboard with overview statistics',
      icon: Home
    },
    'admin-courses': {
      id: 'admin-courses',
      name: 'Courses',
      description: 'Manage and organize courses',
      icon: BookOpen
    },
    'admin-schedule': {
      id: 'admin-schedule',
      name: 'Schedule',
      description: 'View and manage schedules',
      icon: Calendar
    },
    'admin-user-section': {
      id: 'admin-user-section',
      name: 'User Management',
      description: 'Manage students and teachers',
      icon: User
    },
    'admin-content-review': {
      id: 'admin-content-review',
      name: 'Content Review',
      description: 'Review and approve content',
      icon: FileText
    },
    'admin-approvals': {
      id: 'admin-approvals',
      name: 'Approvals',
      description: 'Approve requests and changes',
      icon: CheckCircle
    }
  },
  teacher: {
    'teacher-dashboard': {
      id: 'teacher-dashboard',
      name: 'Dashboard',
      description: 'Main teacher dashboard',
      icon: Home
    },
    'teacher-courses': {
      id: 'teacher-courses',
      name: 'Courses',
      description: 'Manage assigned courses',
      icon: BookOpen
    },
    'teacher-schedule': {
      id: 'teacher-schedule',
      name: 'Schedule',
      description: 'View teaching schedule',
      icon: Calendar
    },
    'teacher-materials': {
      id: 'teacher-materials',
      name: 'Materials',
      description: 'Manage study materials',
      icon: FileText
    },
    'teacher-students': {
      id: 'teacher-students',
      name: 'Students',
      description: 'View and manage students',
      icon: User
    },
    'teacher-exams': {
      id: 'teacher-exams',
      name: 'Exams',
      description: 'Create and manage exams',
      icon: FileText
    }
  },
  student: {
    'student-dashboard': {
      id: 'student-dashboard',
      name: 'Dashboard',
      description: 'Main student dashboard',
      icon: Home
    },
    'student-courses': {
      id: 'student-courses',
      name: 'Courses',
      description: 'View enrolled courses',
      icon: BookOpen
    },
    'student-schedule': {
      id: 'student-schedule',
      name: 'Schedule',
      description: 'View class schedule',
      icon: Calendar
    },
    'student-progress': {
      id: 'student-progress',
      name: 'Progress',
      description: 'Track learning progress',
      icon: CheckCircle
    },
    'student-tests': {
      id: 'student-tests',
      name: 'Tests',
      description: 'Take and view tests',
      icon: FileText
    }
  }
};

const SuperadminDashboard = () => {
  const [institutes, setInstitutes] = useState<Institute[]>(demoInstitutes);
  const [selectedInstitute, setSelectedInstitute] = useState<Institute | null>(null);
  const [activeTab, setActiveTab] = useState<string>('institutes');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // New institute form state
  const [newInstitute, setNewInstitute] = useState({
    name: '',
    location: '',
    adminName: '',
    adminEmail: '',
    adminPhone: ''
  });
  
  // Filter institutes based on search query
  const filteredInstitutes = institutes.filter(institute => 
    institute.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    institute.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    institute.admin.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Select an institute and switch to details tab
  const handleSelectInstitute = (institute: Institute) => {
    setSelectedInstitute(institute);
    setActiveTab('institute-details');
  };
  
  // Handle dashboard visibility toggle
  const handleVisibilityToggle = (role: 'admin' | 'teacher' | 'student', moduleId: string, value: boolean) => {
    if (!selectedInstitute) return;
    
    const updatedInstitute = {
      ...selectedInstitute,
      dashboardVisibility: {
        ...selectedInstitute.dashboardVisibility,
        [role]: {
          ...selectedInstitute.dashboardVisibility[role],
          [moduleId]: value
        }
      }
    };
    
    setSelectedInstitute(updatedInstitute);
    
    // Update the institute in the institutes array
    const updatedInstitutes = institutes.map(inst => 
      inst.id === updatedInstitute.id ? updatedInstitute : inst
    );
    
    setInstitutes(updatedInstitutes);
    toast.success(`${moduleId} visibility updated`);
  };
  
  // Handle new institute form submission
  const handleAddInstitute = () => {
    // Validate form
    if (!newInstitute.name || !newInstitute.location || !newInstitute.adminName || !newInstitute.adminEmail) {
      toast.error('Please fill all required fields');
      return;
    }
    
    // Create new institute object
    const newInstituteObj: Institute = {
      id: `inst-${Date.now()}`,
      name: newInstitute.name,
      location: newInstitute.location,
      admin: {
        id: `admin-${Date.now()}`,
        name: newInstitute.adminName,
        email: newInstitute.adminEmail,
        phone: newInstitute.adminPhone
      },
      stats: {
        teachers: 0,
        students: 0,
        courses: 0,
        monthlyData: [
          { month: 'Jan', studentCount: 0, courseCount: 0 },
          { month: 'Feb', studentCount: 0, courseCount: 0 },
          { month: 'Mar', studentCount: 0, courseCount: 0 },
          { month: 'Apr', studentCount: 0, courseCount: 0 },
          { month: 'May', studentCount: 0, courseCount: 0 },
          { month: 'Jun', studentCount: 0, courseCount: 0 }
        ]
      },
      dashboardVisibility: {
        admin: {
          'admin-dashboard': true,
          'admin-courses': true,
          'admin-schedule': true,
          'admin-user-section': true,
          'admin-content-review': true,
          'admin-approvals': true
        },
        teacher: {
          'teacher-dashboard': true,
          'teacher-courses': true,
          'teacher-schedule': true,
          'teacher-materials': true,
          'teacher-students': true,
          'teacher-exams': true
        },
        student: {
          'student-dashboard': true,
          'student-courses': true,
          'student-schedule': true,
          'student-progress': true,
          'student-tests': true
        }
      }
    };
    
    // Add to institutes list
    setInstitutes([...institutes, newInstituteObj]);
    
    // Reset form
    setNewInstitute({
      name: '',
      location: '',
      adminName: '',
      adminEmail: '',
      adminPhone: ''
    });
    
    toast.success('New institute added successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-school-brown">Superadmin Dashboard</h2>
          <p className="text-muted-foreground">Manage all institutes, admins and system settings</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-school-indigo text-white">Superadmin</Badge>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="institutes" className="data-[state=active]:bg-school-indigo data-[state=active]:text-white">
            Institutes & Admins
          </TabsTrigger>
          <TabsTrigger value="institute-details" className="data-[state=active]:bg-school-indigo data-[state=active]:text-white" disabled={!selectedInstitute}>
            Institute Details
          </TabsTrigger>
          <TabsTrigger value="system-settings" className="data-[state=active]:bg-school-indigo data-[state=active]:text-white">
            System Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="institutes" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative w-full max-w-sm">
              <Input
                placeholder="Search institutes or admins..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white border-school-beige/50 pl-3"
              />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-school-indigo hover:bg-school-indigo/90 text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Institute
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="text-school-brown">Add New Institute</DialogTitle>
                  <DialogDescription>
                    Create a new institute and assign an admin to manage it.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="inst-name" className="text-school-brown">Institute Name</Label>
                    <Input
                      id="inst-name"
                      value={newInstitute.name}
                      onChange={(e) => setNewInstitute({...newInstitute, name: e.target.value})}
                      placeholder="e.g. Cambridge Academy"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="inst-location" className="text-school-brown">Location</Label>
                    <Input
                      id="inst-location"
                      value={newInstitute.location}
                      onChange={(e) => setNewInstitute({...newInstitute, location: e.target.value})}
                      placeholder="e.g. Boston, MA"
                    />
                  </div>
                  <Separator />
                  <h4 className="font-medium text-school-brown">Admin Details</h4>
                  <div className="space-y-2">
                    <Label htmlFor="admin-name" className="text-school-brown">Admin Name</Label>
                    <Input
                      id="admin-name"
                      value={newInstitute.adminName}
                      onChange={(e) => setNewInstitute({...newInstitute, adminName: e.target.value})}
                      placeholder="e.g. John Smith"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-email" className="text-school-brown">Admin Email</Label>
                    <Input
                      id="admin-email"
                      type="email"
                      value={newInstitute.adminEmail}
                      onChange={(e) => setNewInstitute({...newInstitute, adminEmail: e.target.value})}
                      placeholder="e.g. admin@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-phone" className="text-school-brown">Admin Phone (Optional)</Label>
                    <Input
                      id="admin-phone"
                      value={newInstitute.adminPhone}
                      onChange={(e) => setNewInstitute({...newInstitute, adminPhone: e.target.value})}
                      placeholder="e.g. +1 (555) 123-4567"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button 
                    variant="outline" 
                    onClick={() => setNewInstitute({
                      name: '',
                      location: '',
                      adminName: '',
                      adminEmail: '',
                      adminPhone: ''
                    })}
                    className="border-school-beige text-school-brown"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleAddInstitute}
                    className="bg-school-indigo hover:bg-school-indigo/90 text-white"
                  >
                    Add Institute
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredInstitutes.length > 0 ? filteredInstitutes.map((institute) => (
              <Card key={institute.id} className="cursor-pointer hover:border-school-indigo/50 transition-all card-shadow-hover">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-school-brown flex items-center justify-between">
                    {institute.name}
                    <Building className="h-5 w-5 text-school-indigo" />
                  </CardTitle>
                  <CardDescription>
                    {institute.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-1">
                    <div className="font-medium text-sm text-school-brown">Admin: {institute.admin.name}</div>
                    <div className="text-xs text-muted-foreground">{institute.admin.email}</div>
                  </div>
                  <div className="mt-4 flex justify-between text-sm">
                    <div>
                      <span className="font-medium text-school-brown">{institute.stats.teachers}</span> Teachers
                    </div>
                    <div>
                      <span className="font-medium text-school-brown">{institute.stats.students}</span> Students
                    </div>
                    <div>
                      <span className="font-medium text-school-brown">{institute.stats.courses}</span> Courses
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => handleSelectInstitute(institute)}
                    variant="outline"
                    className="w-full border-school-indigo/30 text-school-indigo hover:bg-school-indigo hover:text-white"
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            )) : (
              <div className="col-span-full text-center py-10">
                <div className="text-muted-foreground">No institutes found matching your search.</div>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="institute-details" className="space-y-6">
          {selectedInstitute && (
            <>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold text-school-brown flex items-center gap-2">
                    <Building className="h-5 w-5 text-school-indigo" />
                    {selectedInstitute.name}
                  </h3>
                  <p className="text-muted-foreground">{selectedInstitute.location}</p>
                </div>
                <Button 
                  onClick={() => setActiveTab('institutes')}
                  variant="outline"
                  className="border-school-indigo/30 text-school-indigo hover:bg-school-indigo hover:text-white"
                >
                  Back to Institutes
                </Button>
              </div>
              
              <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
                <Card className="lg:col-span-1 bg-gradient-to-br from-white to-school-cream/30">
                  <CardHeader>
                    <CardTitle className="text-school-brown">Admin Details</CardTitle>
                    <CardDescription>Admin assigned to this institute</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-12 w-12 rounded-full bg-school-indigo flex items-center justify-center text-white">
                        <User className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="font-medium text-school-brown">{selectedInstitute.admin.name}</div>
                        <div className="text-sm text-muted-foreground">Institute Admin</div>
                      </div>
                    </div>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span className="font-medium text-school-brown">{selectedInstitute.admin.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Phone:</span>
                        <span className="font-medium text-school-brown">{selectedInstitute.admin.phone || 'Not provided'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Active
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex-col gap-3">
                    <Button className="w-full bg-school-indigo hover:bg-school-indigo/90">
                      <Mail className="mr-2 h-4 w-4" />
                      Contact Admin
                    </Button>
                    <Button variant="outline" className="w-full border-school-indigo/30 text-school-indigo hover:bg-school-indigo hover:text-white">
                      <Shield className="mr-2 h-4 w-4" />
                      Manage Permissions
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-school-brown">Institute Statistics</CardTitle>
                    <CardDescription>Performance and growth metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <InstituteStatsCharts data={selectedInstitute} />
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-school-brown">Dashboard Visibility Controls</CardTitle>
                  <CardDescription>Manage which sections are visible to different user roles</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="admin-visibility" className="w-full">
                    <TabsList className="mb-4 bg-muted/50">
                      <TabsTrigger value="admin-visibility" className="data-[state=active]:bg-school-brown data-[state=active]:text-white">
                        Admin Sections
                      </TabsTrigger>
                      <TabsTrigger value="teacher-visibility" className="data-[state=active]:bg-school-yellow data-[state=active]:text-school-brown">
                        Teacher Sections
                      </TabsTrigger>
                      <TabsTrigger value="student-visibility" className="data-[state=active]:bg-school-indigo data-[state=active]:text-white">
                        Student Sections
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="admin-visibility" className="mt-0">
                      <ScrollArea className="h-[300px] rounded-md border p-4">
                        <div className="space-y-4">
                          {Object.values(dashboardModules.admin).map((module) => (
                            <div key={module.id} className="flex items-center justify-between py-2">
                              <div className="flex items-center gap-2">
                                <module.icon className="h-5 w-5 text-school-brown" />
                                <div>
                                  <div className="font-medium text-school-brown">{module.name}</div>
                                  <div className="text-xs text-muted-foreground">{module.description}</div>
                                </div>
                              </div>
                              <Switch 
                                checked={selectedInstitute.dashboardVisibility.admin[module.id]}
                                onCheckedChange={(value) => handleVisibilityToggle('admin', module.id, value)}
                              />
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </TabsContent>
                    
                    <TabsContent value="teacher-visibility" className="mt-0">
                      <ScrollArea className="h-[300px] rounded-md border p-4">
                        <div className="space-y-4">
                          {Object.values(dashboardModules.teacher).map((module) => (
                            <div key={module.id} className="flex items-center justify-between py-2">
                              <div className="flex items-center gap-2">
                                <module.icon className="h-5 w-5 text-school-brown" />
                                <div>
                                  <div className="font-medium text-school-brown">{module.name}</div>
                                  <div className="text-xs text-muted-foreground">{module.description}</div>
                                </div>
                              </div>
                              <Switch 
                                checked={selectedInstitute.dashboardVisibility.teacher[module.id]}
                                onCheckedChange={(value) => handleVisibilityToggle('teacher', module.id, value)}
                              />
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </TabsContent>
                    
                    <TabsContent value="student-visibility" className="mt-0">
                      <ScrollArea className="h-[300px] rounded-md border p-4">
                        <div className="space-y-4">
                          {Object.values(dashboardModules.student).map((module) => (
                            <div key={module.id} className="flex items-center justify-between py-2">
                              <div className="flex items-center gap-2">
                                <module.icon className="h-5 w-5 text-school-brown" />
                                <div>
                                  <div className="font-medium text-school-brown">{module.name}</div>
                                  <div className="text-xs text-muted-foreground">{module.description}</div>
                                </div>
                              </div>
                              <Switch 
                                checked={selectedInstitute.dashboardVisibility.student[module.id]}
                                onCheckedChange={(value) => handleVisibilityToggle('student', module.id, value)}
                              />
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => {
                      toast.success('Dashboard visibility settings saved');
                    }}
                    className="ml-auto bg-school-indigo hover:bg-school-indigo/90"
                  >
                    Save Visibility Settings
                  </Button>
                </CardFooter>
              </Card>
            </>
          )}
        </TabsContent>
        
        <TabsContent value="system-settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-school-brown">System Settings</CardTitle>
              <CardDescription>Configure global system settings and defaults</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="system-name" className="text-school-brown">System Name</Label>
                  <Input id="system-name" defaultValue="ScholarWay Learning Management System" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="system-domain" className="text-school-brown">System Domain</Label>
                  <Input id="system-domain" defaultValue="scholarway.edu" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="system-contact-email" className="text-school-brown">Support Email</Label>
                  <Input id="system-contact-email" defaultValue="support@scholarway.edu" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="system-timezone" className="text-school-brown">Default Timezone</Label>
                  <Input id="system-timezone" defaultValue="UTC-5 (Eastern Time)" />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h4 className="font-medium text-school-brown">System Features</h4>
                
                <div className="flex items-center justify-between py-2">
                  <div>
                    <div className="font-medium text-school-brown">AI Learning Assistant</div>
                    <div className="text-xs text-muted-foreground">Enable AI-powered learning assistant for all users</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div>
                    <div className="font-medium text-school-brown">Advanced Analytics</div>
                    <div className="text-xs text-muted-foreground">Enable detailed analytics for admins and teachers</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div>
                    <div className="font-medium text-school-brown">Maintenance Mode</div>
                    <div className="text-xs text-muted-foreground">Put the system in maintenance mode (blocks all non-superadmin access)</div>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="border-school-indigo/30 text-school-indigo hover:bg-school-indigo hover:text-white mr-2"
              >
                Reset to Defaults
              </Button>
              <Button 
                className="bg-school-indigo hover:bg-school-indigo/90"
                onClick={() => toast.success('System settings saved successfully')}
              >
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SuperadminDashboard;
