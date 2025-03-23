
import React from 'react';
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
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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
  const getDashboardMenu = () => {
    const commonItems = [
      {
        icon: Home,
        label: 'Dashboard',
        href: '/dashboard'
      },
      {
        icon: Book,
        label: 'Courses',
        href: '/courses'
      },
      {
        icon: Calendar,
        label: 'Schedule',
        href: '/schedule'
      },
    ];

    // Student-specific menu items
    if (user?.role === 'student') {
      return [
        ...commonItems,
        {
          icon: CheckCircle,
          label: 'Progress',
          href: '/progress'
        },
        {
          icon: Clock,
          label: 'Upcoming Tests',
          href: '/tests',
          badge: '2'
        }
      ];
    }

    // Teacher-specific menu items
    if (user?.role === 'teacher') {
      return [
        ...commonItems,
        {
          icon: FileText,
          label: 'Study Materials',
          href: '/materials'
        },
        {
          icon: Users,
          label: 'Students',
          href: '/students'
        },
        {
          icon: Clock,
          label: 'Exams',
          href: '/exams'
        }
      ];
    }

    // Admin-specific menu items
    if (user?.role === 'admin') {
      return [
        ...commonItems,
        {
          icon: Users,
          label: 'Users',
          href: '/users'
        },
        {
          icon: FileText,
          label: 'Content Review',
          href: '/content-review',
          badge: '5'
        },
        {
          icon: CheckCircle,
          label: 'Approvals',
          href: '/approvals',
          badge: '3'
        }
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
