
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/contexts/AuthContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PlusCircle, MoreVertical, User, Trash, Pencil, X } from 'lucide-react';
import { toast } from 'sonner';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

// Define form validation schema
const userFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  role: z.enum(['student', 'teacher', 'admin', 'superadmin'], { 
    required_error: "Please select a role" 
  }),
  class: z.string().optional(),
  department: z.string().optional(),
});

// Mock data for users
interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin' | 'superadmin';
  avatarUrl?: string;
  scholarLevel?: 'junior' | 'rising' | 'elite';
  department?: string;
  class?: string;
  dateAdded: string;
}

const UserManagement = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'John Student',
      email: 'student@example.com',
      role: 'student',
      avatarUrl: 'https://i.pravatar.cc/150?img=1',
      scholarLevel: 'junior',
      class: 'Class 10A',
      dateAdded: '2023-01-15'
    },
    {
      id: '2',
      name: 'Jane Teacher',
      email: 'teacher@example.com',
      role: 'teacher',
      avatarUrl: 'https://i.pravatar.cc/150?img=5',
      department: 'Mathematics',
      dateAdded: '2022-11-05'
    },
    {
      id: '3',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin',
      avatarUrl: 'https://i.pravatar.cc/150?img=8',
      dateAdded: '2022-09-20'
    },
    {
      id: '4',
      name: 'Alice Student',
      email: 'alice@example.com',
      role: 'student',
      avatarUrl: 'https://i.pravatar.cc/150?img=9',
      scholarLevel: 'rising',
      class: 'Class 11B',
      dateAdded: '2023-02-10'
    },
    {
      id: '5',
      name: 'Bob Student',
      email: 'bob@example.com',
      role: 'student',
      avatarUrl: 'https://i.pravatar.cc/150?img=4',
      scholarLevel: 'elite',
      class: 'Class 12A',
      dateAdded: '2023-01-28'
    },
    {
      id: '6',
      name: 'Super Admin',
      email: 'superadmin@example.com',
      role: 'superadmin',
      avatarUrl: 'https://i.pravatar.cc/150?img=12',
      dateAdded: '2022-08-15'
    }
  ]);

  // States for dialogs and filters
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string[]>([]);

  // Form setup for adding user
  const addForm = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: '',
      email: '',
      role: 'student',
      class: '',
      department: '',
    },
  });

  // Form setup for editing user
  const editForm = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: '',
      email: '',
      role: 'student',
      class: '',
      department: '',
    },
  });

  // Handle add user form submission
  const onAddSubmit: SubmitHandler<z.infer<typeof userFormSchema>> = (data) => {
    const newUser: User = {
      id: (users.length + 1).toString(),
      name: data.name,
      email: data.email,
      role: data.role,
      avatarUrl: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
      dateAdded: new Date().toISOString().split('T')[0]
    };

    if (data.role === 'student') {
      newUser.class = data.class;
      newUser.scholarLevel = 'junior';
    } else if (data.role === 'teacher') {
      newUser.department = data.department;
    }

    setUsers([...users, newUser]);
    setAddDialogOpen(false);
    addForm.reset();
    toast.success('User added successfully');
  };

  // Handle edit user form submission
  const onEditSubmit: SubmitHandler<z.infer<typeof userFormSchema>> = (data) => {
    if (!selectedUser) return;

    const updatedUsers = users.map(u => {
      if (u.id === selectedUser.id) {
        const updatedUser: User = {
          ...u,
          name: data.name,
          email: data.email,
          role: data.role
        };

        if (data.role === 'student') {
          updatedUser.class = data.class;
          updatedUser.department = undefined;
        } else if (data.role === 'teacher') {
          updatedUser.department = data.department;
          updatedUser.class = undefined;
          updatedUser.scholarLevel = undefined;
        } else {
          updatedUser.class = undefined;
          updatedUser.department = undefined;
          updatedUser.scholarLevel = undefined;
        }

        return updatedUser;
      }
      return u;
    });

    setUsers(updatedUsers);
    setEditDialogOpen(false);
    setSelectedUser(null);
    toast.success('User updated successfully');
  };

  // Handle user deletion
  const handleDeleteUser = () => {
    if (!selectedUser) return;
    
    setUsers(users.filter(u => u.id !== selectedUser.id));
    setDeleteDialogOpen(false);
    setSelectedUser(null);
    toast.success('User deleted successfully');
  };

  // Open edit dialog and populate form with user data
  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    editForm.reset({
      name: user.name,
      email: user.email,
      role: user.role,
      class: user.class || '',
      department: user.department || '',
    });
    setEditDialogOpen(true);
  };

  // Open delete confirmation dialog
  const handleDeleteDialog = (user: User) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  // Filter users based on search term and role filter
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter.length === 0 || roleFilter.includes(user.role);
    
    return matchesSearch && matchesRole;
  });

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Get role badge color
  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-500';
      case 'teacher':
        return 'bg-blue-500';
      case 'student':
        return 'bg-green-500';
      case 'superadmin':
        return 'bg-red-500';
      default:
        return 'default';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
            <p className="text-muted-foreground mt-1">
              Add, edit, or remove users from the system
            </p>
          </div>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>
                    Create a new user account in the system
                  </DialogDescription>
                </DialogHeader>
                <Form {...addForm}>
                  <form onSubmit={addForm.handleSubmit(onAddSubmit)} className="space-y-4">
                    <FormField
                      control={addForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={addForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Email address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={addForm.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Role</FormLabel>
                          <FormControl>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select role" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="student">Student</SelectItem>
                                <SelectItem value="teacher">Teacher</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                                {user?.role === 'superadmin' && (
                                  <SelectItem value="superadmin">Superadmin</SelectItem>
                                )}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {addForm.watch('role') === 'student' && (
                      <FormField
                        control={addForm.control}
                        name="class"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Class</FormLabel>
                            <FormControl>
                              <Input placeholder="Class (e.g. 10A)" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    {addForm.watch('role') === 'teacher' && (
                      <FormField
                        control={addForm.control}
                        name="department"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Department</FormLabel>
                            <FormControl>
                              <Input placeholder="Department" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    <DialogFooter>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setAddDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Add User</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </header>
        
        <Card>
          <CardHeader className="pb-4">
            <CardTitle>User List</CardTitle>
            <CardDescription>Manage all users in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Input 
                  placeholder="Search users by name or email..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
                {searchTerm && (
                  <Button 
                    variant="ghost" 
                    className="absolute right-1 top-1 h-8 w-8 p-0" 
                    onClick={() => setSearchTerm('')}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Clear search</span>
                  </Button>
                )}
              </div>
              <div>
                <Label className="block mb-2 text-sm">Filter by role</Label>
                <ToggleGroup 
                  type="multiple" 
                  value={roleFilter} 
                  onValueChange={setRoleFilter}
                  className="justify-start"
                >
                  <ToggleGroupItem value="student">Student</ToggleGroupItem>
                  <ToggleGroupItem value="teacher">Teacher</ToggleGroupItem>
                  <ToggleGroupItem value="admin">Admin</ToggleGroupItem>
                  <ToggleGroupItem value="superadmin">Superadmin</ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>
            
            <ScrollArea className="h-[calc(100vh-400px)]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Date Added</TableHead>
                    <TableHead className="w-[70px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={user.avatarUrl} />
                            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                          </Avatar>
                          <span>{user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge className={getRoleBadgeVariant(user.role)}>{user.role}</Badge>
                      </TableCell>
                      <TableCell>
                        {user.role === 'student' && user.class && (
                          <div className="text-sm">
                            Class: {user.class}
                            {user.scholarLevel && (
                              <Badge variant="outline" className="ml-2">
                                {user.scholarLevel === 'junior' && 'Junior Scholar'}
                                {user.scholarLevel === 'rising' && 'Rising Intellect'}
                                {user.scholarLevel === 'elite' && 'Mastermind Elite'}
                              </Badge>
                            )}
                          </div>
                        )}
                        {user.role === 'teacher' && user.department && (
                          <div className="text-sm">Department: {user.department}</div>
                        )}
                      </TableCell>
                      <TableCell>{user.dateAdded}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditUser(user)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteDialog(user)}
                              className="text-destructive"
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {filteredUsers.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No users found matching your search criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
            
            <div className="mt-4 text-sm text-muted-foreground">
              Showing {filteredUsers.length} out of {users.length} users
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Edit User Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user details and role
            </DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4">
              <FormField
                control={editForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="teacher">Teacher</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                          {user?.role === 'superadmin' && (
                            <SelectItem value="superadmin">Superadmin</SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {editForm.watch('role') === 'student' && (
                <FormField
                  control={editForm.control}
                  name="class"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Class</FormLabel>
                      <FormControl>
                        <Input placeholder="Class (e.g. 10A)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
              {editForm.watch('role') === 'teacher' && (
                <FormField
                  control={editForm.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <FormControl>
                        <Input placeholder="Department" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setEditDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-3 p-4 rounded-md border my-4">
            <Avatar>
              <AvatarImage src={selectedUser?.avatarUrl} />
              <AvatarFallback>{selectedUser ? getInitials(selectedUser.name) : 'U'}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{selectedUser?.name}</p>
              <p className="text-sm text-muted-foreground">{selectedUser?.email}</p>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteUser}
            >
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default UserManagement;
