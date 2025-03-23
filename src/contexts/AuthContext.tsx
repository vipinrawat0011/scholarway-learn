
import React, { createContext, useContext, useState, useEffect } from 'react';

type UserRole = 'student' | 'teacher' | 'admin';

type ScholarLevel = 'junior' | 'rising' | 'elite';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  scholarLevel?: ScholarLevel; // For students only
  department?: string; // For teachers only
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: () => {},
  register: async () => {},
});

// Sample user data for demonstration
const SAMPLE_USERS: UserProfile[] = [
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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if there's a user already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

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
      login,
      logout,
      register
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
