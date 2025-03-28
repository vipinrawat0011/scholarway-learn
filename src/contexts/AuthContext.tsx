
import React, { createContext, useContext, useState, useEffect } from 'react';

type UserRole = 'student' | 'teacher' | 'admin' | 'superadmin';

type ScholarLevel = 'junior' | 'rising' | 'elite';

// Define permission structure
export type Permission = {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

export type RolePermissions = {
  [key in Exclude<UserRole, 'superadmin'>]: {
    dashboard: Permission;
    features: {
      [key: string]: Permission;
    };
  };
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  scholarLevel?: ScholarLevel; // For students only
  department?: string; // For teachers only
  instituteId?: string; // For admins, teachers, and students
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  permissions: RolePermissions;
  updatePermissions: (newPermissions: RolePermissions) => void;
  hasPermission: (role: Exclude<UserRole, 'superadmin'>, featureId: string) => boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  permissions: {} as RolePermissions,
  updatePermissions: () => {},
  hasPermission: () => false,
  login: async () => {},
  logout: () => {},
  register: async () => {},
});

// Initial permissions configuration
const initialPermissions: RolePermissions = {
  admin: {
    dashboard: {
      id: 'admin-dashboard',
      name: 'Admin Dashboard',
      description: 'Access to admin dashboard',
      enabled: true
    },
    features: {
      userSection: {
        id: 'admin-user-section',
        name: 'User Section',
        description: 'User management functionality',
        enabled: true
      },
      contentReview: {
        id: 'admin-content-review',
        name: 'Content Review',
        description: 'Review and approve content',
        enabled: true
      },
      approvals: {
        id: 'admin-approvals',
        name: 'Approvals',
        description: 'Approve requests',
        enabled: true
      },
      studentClassification: {
        id: 'admin-student-classification',
        name: 'Student Classification',
        description: 'Manage student classification',
        enabled: true
      },
      aiLearning: {
        id: 'admin-ai-learning',
        name: 'AI Learning',
        description: 'Manage AI learning assistance',
        enabled: true
      },
      systemStatus: {
        id: 'admin-system-status',
        name: 'System Status',
        description: 'View system status',
        enabled: true
      }
    }
  },
  teacher: {
    dashboard: {
      id: 'teacher-dashboard',
      name: 'Teacher Dashboard',
      description: 'Access to teacher dashboard',
      enabled: true
    },
    features: {
      materials: {
        id: 'teacher-materials',
        name: 'Study Materials',
        description: 'Manage study materials',
        enabled: true
      },
      students: {
        id: 'teacher-students',
        name: 'Students',
        description: 'View and manage students',
        enabled: true
      },
      exams: {
        id: 'teacher-exams',
        name: 'Exams',
        description: 'Create and manage exams',
        enabled: true
      }
    }
  },
  student: {
    dashboard: {
      id: 'student-dashboard',
      name: 'Student Dashboard',
      description: 'Access to student dashboard',
      enabled: true
    },
    features: {
      progress: {
        id: 'student-progress',
        name: 'Progress',
        description: 'View academic progress',
        enabled: true
      },
      tests: {
        id: 'student-tests',
        name: 'Upcoming Tests',
        description: 'View upcoming tests',
        enabled: true
      }
    }
  }
};

// Sample user data for demonstration
const SAMPLE_USERS: UserProfile[] = [
  {
    id: '1',
    name: 'John Student',
    email: 'student@example.com',
    role: 'student',
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
    scholarLevel: 'junior',
    instituteId: '1'
  },
  {
    id: '2',
    name: 'Jane Teacher',
    email: 'teacher@example.com',
    role: 'teacher',
    avatarUrl: 'https://i.pravatar.cc/150?img=5',
    department: 'Mathematics',
    instituteId: '1'
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatarUrl: 'https://i.pravatar.cc/150?img=8',
    instituteId: '1'
  },
  {
    id: '4',
    name: 'Alice Student',
    email: 'alice@example.com',
    role: 'student',
    avatarUrl: 'https://i.pravatar.cc/150?img=9',
    scholarLevel: 'rising',
    instituteId: '2'
  },
  {
    id: '5',
    name: 'Bob Student',
    email: 'bob@example.com',
    role: 'student',
    avatarUrl: 'https://i.pravatar.cc/150?img=4',
    scholarLevel: 'elite',
    instituteId: '3'
  },
  {
    id: '6',
    name: 'Super Admin',
    email: 'superadmin@example.com',
    role: 'superadmin',
    avatarUrl: 'https://i.pravatar.cc/150?img=12'
  }
];

// Define AuthProvider as a proper functional component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [permissions, setPermissions] = useState<RolePermissions>(initialPermissions);

  // Check if there's a user already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedPermissions = localStorage.getItem('permissions');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    if (storedPermissions) {
      setPermissions(JSON.parse(storedPermissions));
    } else {
      // Initialize permissions if not in localStorage
      localStorage.setItem('permissions', JSON.stringify(initialPermissions));
    }
    
    setIsLoading(false);
  }, []);

  // Function to check if a user has permission for a feature
  const hasPermission = (role: Exclude<UserRole, 'superadmin'>, featureId: string): boolean => {
    // Superadmin has access to everything
    if (user?.role === 'superadmin') return true;
    
    // If the user's role doesn't match the required role, return false
    if (user?.role !== role) return false;
    
    // Check if dashboard access is enabled
    if (!permissions[role].dashboard.enabled) return false;
    
    // If it's a dashboard check, return true as we already checked dashboard access
    if (featureId === `${role}-dashboard`) return true;
    
    // For specific features within a dashboard
    const feature = Object.values(permissions[role].features).find(f => f.id === featureId);
    return feature ? feature.enabled : false;
  };

  // Function to update permissions
  const updatePermissions = (newPermissions: RolePermissions) => {
    setPermissions(newPermissions);
    localStorage.setItem('permissions', JSON.stringify(newPermissions));
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Find user with matching email (simplified for demo)
    const foundUser = SAMPLE_USERS.find(u => u.email === email);
    
    if (!foundUser) {
      setIsLoading(false);
      throw new Error('Invalid email or password');
    }
    
    // In a real app, we would validate the password here
    
    // Set the user in state and localStorage
    setUser(foundUser);
    localStorage.setItem('user', JSON.stringify(foundUser));
    setIsLoading(false);
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  
  const register = async (email: string, password: string, name: string, role: UserRole) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    if (SAMPLE_USERS.some(u => u.email === email)) {
      setIsLoading(false);
      throw new Error('Email already in use');
    }
    
    // Create new user (simplified for demo)
    const newUser: UserProfile = {
      id: `${SAMPLE_USERS.length + 1}`,
      name,
      email,
      role,
      avatarUrl: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
      ...(role === 'student' ? { scholarLevel: 'junior' as ScholarLevel } : {})
    };
    
    // In a real app, we would save the user to the database here
    
    // Set the user in state and localStorage
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading,
      permissions,
      updatePermissions,
      hasPermission,
      login,
      logout,
      register
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
