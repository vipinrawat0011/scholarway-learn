import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Search, Filter, UserPlus, Trash2, Edit, Users, User, School, Settings } from 'lucide-react';

// Create a schema for user form validation
const userFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  role: z.enum(["student", "teacher", "admin"], {
    required_error: "Please select a role.",
  }),
  class: z.string().optional(),
  department: z.string().optional(),
});

// Define a User type to fix TypeScript errors
type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl: string;
  scholarLevel?: string;
  department?: string;
};

const UserManagement = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Mock user data (in a real app, this would come from API)
  const [allUsers, setAllUsers] = useState<User[]>([
    ...SAMPLE_USERS, // This comes from AuthContext
    // Add more mock users for demonstration
    {
      id: '6',
      name: 'Emily Johnson',
      email: 'emily@example.com',
      role: 'student',
      avatarUrl: 'https://i.pravatar.cc/150?img=10',
      scholarLevel: 'junior'
    },
    {
      id: '7',
      name: 'Michael Smith',
      email: 'michael@example.com',
      role: 'teacher',
      avatarUrl: 'https://i.pravatar.cc/150?img=11',
      department: 'Science'
    },
    {
      id: '8',
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      role: 'student',
      avatarUrl: 'https://i.pravatar.cc/150?img=12',
      scholarLevel: 'elite'
    },
  ]);
  
  // Filter and search state
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  
  // Dialog states
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [isDeleteUserOpen, setIsDeleteUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  // Set up form
  const form = useForm({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "student",
      class: "",
      department: "",
    },
  });
  
  // Redirect if not admin
  React.useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/dashboard');
    }
  }, [user, navigate]);
  
  // Filter users based on search and role filter
  const filteredUsers = allUsers.filter(user => {
    // Filter by role
    if (roleFilter !== 'all' && user.role !== roleFilter) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !user.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !user.email.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  // Handler for adding a new user
  const handleAddUser = (data: z.infer<typeof userFormSchema>) => {
    const newUser: User = {
      id: `${allUsers.length + 1}`,
      name: data.name,
      email: data.email,
      role: data.role,
      avatarUrl: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
      ...(data.role === 'student' ? { scholarLevel: 'junior' } : {}),
      ...(data.role === 'teacher' ? { department: data.department } : {}),
    };
    
    setAllUsers([...allUsers, newUser]);
    setIsAddUserOpen(false);
    form.reset();
    toast.success(`${data.name} has been added as a ${data.role}`);
  };
  
  // Handler for updating a user
  const handleEditUser = (data: z.infer<typeof userFormSchema>) => {
    if (!selectedUser) return;
    
    const updatedUsers = allUsers.map(u => {
      if (u.id === selectedUser.id) {
        return {
          ...u,
          name: data.name,
          email: data.email,
          role: data.role,
          ...(data.role === 'student' ? { scholarLevel: u.scholarLevel || 'junior', department: undefined } : {}),
          ...(data.role === 'teacher' ? { department: data.department, scholarLevel: undefined } : {}),
          ...(data.role === 'admin' ? { department: undefined, scholarLevel: undefined } : {}),
        };
      }
      return u;
    });
    
    setAllUsers(updatedUsers);
    setIsEditUserOpen(false);
    setSelectedUser(null);
    toast.success(`User updated successfully`);
  };
  
  // Handler for deleting a user
  const handleDeleteUser = () => {
    if (!selectedUser || !user) return;
    
    if (selectedUser.id === user.id) {
      toast.error("You cannot delete your own account");
      setIsDeleteUserOpen(false);
      setSelectedUser(null);
      return;
    }
    
    const updatedUsers = allUsers.filter(u => u.id !== selectedUser.id);
    setAllUsers(updatedUsers);
    setIsDeleteUserOpen(false);
    setSelectedUser(null);
    toast.success(`User deleted successfully`);
  };
  
  const openEditDialog = (user: User) => {
    setSelectedUser(user);
    form.reset({
      name: user.name,
      email: user.email,
      role: user.role,
      class: "",
      department: user.department || "",
    });
    setIsEditUserOpen(true);
  };
  
  const openDeleteDialog = (user: User) => {
    setSelectedUser(user);
    setIsDeleteUserOpen(true);
  };
  
  // If not admin, don't render anything (handled by the useEffect redirect)
  if (!user || user.role !== 'admin') {
    return null;
  }
  
  return (
    <DashboardLayout>
      <div className="animate-fade-in space-y-6">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage all users, including students, teachers, and administrators
            </p>
          </div>
          <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Create a new user account. Fill in all required information.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleAddUser)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="user@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="student">Student</SelectItem>
                            <SelectItem value="teacher">Teacher</SelectItem>
                            <SelectItem value="admin">Administrator</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {form.watch("role") === "teacher" && (
                    <FormField
                      control={form.control}
                      name="department"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Department</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Mathematics" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  
                  <DialogFooter>
                    <Button type="submit">Create User</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </header>
        
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Users</CardTitle>
                <CardDescription>
                  Manage user accounts and permissions
                </CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search users..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="student">Students</SelectItem>
                    <SelectItem value="teacher">Teachers</SelectItem>
                    <SelectItem value="admin">Administrators</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      No users found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={user.avatarUrl} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-xs text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          user.role === 'admin' ? "default" : 
                          user.role === 'teacher' ? "secondary" : 
                          "outline"
                        }>
                          {user.role === 'student' && <School className="h-3 w-3 mr-1" />}
                          {user.role === 'teacher' && <User className="h-3 w-3 mr-1" />}
                          {user.role === 'admin' && <Settings className="h-3 w-3 mr-1" />}
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.role === 'student' && user.scholarLevel && (
                          <span className="text-sm">
                            Scholar Level: <Badge variant="outline">
                              {user.scholarLevel.charAt(0).toUpperCase() + user.scholarLevel.slice(1)}
                            </Badge>
                          </span>
                        )}
                        {user.role === 'teacher' && user.department && (
                          <span className="text-sm">
                            Department: <Badge variant="outline">{user.department}</Badge>
                          </span>
                        )}
                        {user.role === 'admin' && (
                          <span className="text-sm text-muted-foreground">System Administrator</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => openEditDialog(user)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => openDeleteDialog(user)}
                            className="text-destructive hover:text-destructive"
                            disabled={user.id === selectedUser?.id}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            
            {/* Edit User Dialog */}
            <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit User</DialogTitle>
                  <DialogDescription>
                    Update user information and permissions.
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleEditUser)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Role</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a role" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="student">Student</SelectItem>
                              <SelectItem value="teacher">Teacher</SelectItem>
                              <SelectItem value="admin">Administrator</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {form.watch("role") === "teacher" && (
                      <FormField
                        control={form.control}
                        name="department"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Department</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Mathematics" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    <DialogFooter>
                      <Button type="submit">Save Changes</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
            
            {/* Delete User Dialog */}
            <Dialog open={isDeleteUserOpen} onOpenChange={setIsDeleteUserOpen}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Delete User</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this user? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center p-4 border rounded-md">
                  <Avatar className="mr-3">
                    <AvatarImage src={selectedUser?.avatarUrl} alt={selectedUser?.name} />
                    <AvatarFallback>{selectedUser?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{selectedUser?.name}</div>
                    <div className="text-sm text-muted-foreground">{selectedUser?.email}</div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDeleteUserOpen(false)}>Cancel</Button>
                  <Button variant="destructive" onClick={handleDeleteUser}>Delete User</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>User Statistics</CardTitle>
            <CardDescription>Overview of system users by role</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex justify-between items-center p-4 bg-muted/50 rounded-md">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-primary/10 flex items-center justify-center rounded-full">
                    <School className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Students</div>
                    <div className="text-2xl font-bold">{allUsers.filter(u => u.role === 'student').length}</div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-muted/50 rounded-md">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-primary/10 flex items-center justify-center rounded-full">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Teachers</div>
                    <div className="text-2xl font-bold">{allUsers.filter(u => u.role === 'teacher').length}</div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-muted/50 rounded-md">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-primary/10 flex items-center justify-center rounded-full">
                    <Settings className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Administrators</div>
                    <div className="text-2xl font-bold">{allUsers.filter(u => u.role === 'admin').length}</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

// Get sample users from the Auth context
const SAMPLE_USERS: User[] = [
  {
    id: '1',
    name: 'John Student',
    email: 'student@example.com',
    role: 'student',
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
    scholarLevel: 'junior'
  },
  {
    id: '2',
    name: 'Jane Teacher',
    email: 'teacher@example.com',
    role: 'teacher',
    avatarUrl: 'https://i.pravatar.cc/150?img=5',
    department: 'Mathematics'
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatarUrl: 'https://i.pravatar.cc/150?img=8'
  },
  {
    id: '4',
    name: 'Alice Student',
    email: 'alice@example.com',
    role: 'student',
    avatarUrl: 'https://i.pravatar.cc/150?img=9',
    scholarLevel: 'rising'
  },
  {
    id: '5',
    name: 'Bob Student',
    email: 'bob@example.com',
    role: 'student',
    avatarUrl: 'https://i.pravatar.cc/150?img=4',
    scholarLevel: 'elite'
  }
];

export default UserManagement;
