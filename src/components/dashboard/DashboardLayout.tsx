
import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Book,
  Calendar,
  GraduationCap,
  Home,
  User,
  Users,
  FileText,
  Search,
  Settings,
  Clock,
  CheckCircle,
  LogOut,
  Shield,
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

// Define the type for menu items including the optional badge property
interface MenuItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  badge?: string;
  id: string; // Permission ID to check
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout, hasPermission } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If user doesn't have permission to access the current dashboard, redirect to login
    if (user && user.role !== 'superadmin') {
      const dashboardPermissionId = `${user.role}-dashboard`;
      if (!hasPermission(user.role as 'student' | 'teacher' | 'admin', dashboardPermissionId)) {
        logout();
        navigate('/login');
      }
    }
  }, [user, hasPermission, logout, navigate]);

  // Get user initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Different menu items based on user role
  const getDashboardMenu = (): MenuItem[] => {
    const commonItems: MenuItem[] = [
      {
        icon: Home,
        label: 'Dashboard',
        href: '/dashboard',
        id: `${user?.role}-dashboard`
      },
      {
        icon: Book,
        label: 'Courses',
        href: '/courses',
        id: `${user?.role}-courses`
      },
      {
        icon: Calendar,
        label: 'Schedule',
        href: '/schedule',
        id: `${user?.role}-schedule`
      },
    ];

    // Superadmin menu items
    if (user?.role === 'superadmin') {
      return [
        ...commonItems,
        {
          icon: Shield,
          label: 'Permission Manager',
          href: '/permission-manager',
          id: 'superadmin-permission-manager'
        },
        {
          icon: Users,
          label: 'User Management',
          href: '/user-management',
          id: 'superadmin-user-management'
        },
        {
          icon: Settings,
          label: 'System Settings',
          href: '/system-settings',
          id: 'superadmin-system-settings'
        }
      ];
    }

    // Student-specific menu items
    if (user?.role === 'student') {
      const studentItems: MenuItem[] = [
        {
          icon: CheckCircle,
          label: 'Progress',
          href: '/progress',
          id: 'student-progress'
        },
        {
          icon: Clock,
          label: 'Upcoming Tests',
          href: '/tests',
          badge: '2',
          id: 'student-tests'
        }
      ];

      // Filter based on permissions
      return [
        ...commonItems,
        ...studentItems.filter(item => 
          hasPermission('student', item.id)
        )
      ];
    }

    // Teacher-specific menu items
    if (user?.role === 'teacher') {
      const teacherItems: MenuItem[] = [
        {
          icon: FileText,
          label: 'Study Materials',
          href: '/materials',
          id: 'teacher-materials'
        },
        {
          icon: Users,
          label: 'Students',
          href: '/students',
          id: 'teacher-students'
        },
        {
          icon: Clock,
          label: 'Exams',
          href: '/exams',
          id: 'teacher-exams'
        }
      ];

      // Filter based on permissions
      return [
        ...commonItems,
        ...teacherItems.filter(item => 
          hasPermission('teacher', item.id)
        )
      ];
    }

    // Admin-specific menu items
    if (user?.role === 'admin') {
      const adminItems: MenuItem[] = [
        {
          icon: Users,
          label: 'User Section',
          href: '/user-management',
          id: 'admin-user-section'
        },
        {
          icon: FileText,
          label: 'Content Review',
          href: '/content-review',
          badge: '5',
          id: 'admin-content-review'
        },
        {
          icon: CheckCircle,
          label: 'Approvals',
          href: '/approvals',
          badge: '3',
          id: 'admin-approvals'
        }
      ];

      // Filter based on permissions
      return [
        ...commonItems,
        ...adminItems.filter(item => 
          hasPermission('admin', item.id)
        )
      ];
    }

    return commonItems;
  };

  const menuItems = getDashboardMenu();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarHeader className="flex items-center justify-between px-4 h-[60px]">
            <div className="flex items-center gap-2 font-medium">
              <GraduationCap className="h-5 w-5 text-primary" />
              <span>ScholarWay</span>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            {/* User section */}
            <div className="px-4 py-6">
              <div className="flex items-center gap-3 mb-1">
                <Avatar>
                  <AvatarImage src={user?.avatarUrl} />
                  <AvatarFallback>{user?.name ? getInitials(user.name) : 'U'}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{user?.name}</div>
                  <div className="text-xs text-muted-foreground capitalize">{user?.role}</div>
                </div>
              </div>
              
              {user?.role === 'student' && user?.scholarLevel && (
                <div className="mt-3">
                  <Badge 
                    className={`scholar-${user.scholarLevel} ml-10`}
                  >
                    {user.scholarLevel === 'junior' && 'Junior Scholar'}
                    {user.scholarLevel === 'rising' && 'Rising Intellect'}
                    {user.scholarLevel === 'elite' && 'Mastermind Elite'}
                  </Badge>
                </div>
              )}
            </div>
            
            {/* Menu */}
            <SidebarGroup>
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild>
                        <a 
                          href={item.href}
                          className="flex justify-between items-center"
                        >
                          <div className="flex items-center">
                            <item.icon className="mr-2 h-4 w-4" />
                            <span>{item.label}</span>
                          </div>
                          {item.badge && (
                            <Badge variant="default" className="ml-auto">
                              {item.badge}
                            </Badge>
                          )}
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            {/* Additional menu groups */}
            <SidebarGroup>
              <SidebarGroupLabel>Settings</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/profile">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex-1 flex flex-col min-h-screen">
          <header className="h-[60px] border-b flex items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div className="relative w-full max-w-md">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input 
                  type="search" 
                  placeholder="Search..." 
                  className="h-9 w-full rounded-md border border-input bg-transparent px-9 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-muted-foreground"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Notification bell, etc. can go here */}
            </div>
          </header>
          
          <main className="flex-1 p-4 sm:p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
