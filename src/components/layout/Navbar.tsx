
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { GraduationCap, Book, Search, Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const logoSection = (
    <Link 
      to="/" 
      className="flex items-center gap-2 font-medium text-lg"
      onClick={() => setMobileMenuOpen(false)}
    >
      <GraduationCap className="h-6 w-6 text-primary" />
      <span className="hidden sm:inline">ScholarWay</span>
    </Link>
  );

  const navLinks = (
    <div className={`${isMobile ? 'flex-col space-y-4 items-start' : 'flex items-center space-x-6'}`}>
      {isAuthenticated && (
        <>
          <Link 
            to="/dashboard" 
            className="text-foreground/80 hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link 
            to="/courses" 
            className="text-foreground/80 hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Courses
          </Link>
          {user?.role === 'teacher' || user?.role === 'admin' ? (
            <Link 
              to="/manage" 
              className="text-foreground/80 hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Management
            </Link>
          ) : null}
        </>
      )}
    </div>
  );

  const accountSection = (
    <div className={`${isMobile ? 'w-full' : 'flex items-center space-x-4'}`}>
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="p-0 hover:bg-transparent flex items-center gap-2"
            >
              <Avatar className="h-8 w-8 ring-2 ring-primary/10">
                <AvatarImage src={user?.avatarUrl} />
                <AvatarFallback>{user?.name ? getInitials(user.name) : 'U'}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium hidden md:inline">{user?.name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings">Settings</Link>
            </DropdownMenuItem>
            {user?.role === 'student' && (
              <DropdownMenuItem asChild>
                <Link to="/progress">My Progress</Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className={`${isMobile ? 'flex flex-col w-full gap-2' : 'flex items-center gap-2'}`}>
          <Button 
            variant="ghost" 
            onClick={() => {
              navigate('/login');
              setMobileMenuOpen(false);
            }}
          >
            Log in
          </Button>
          <Button 
            variant="default" 
            onClick={() => {
              navigate('/login?register=true');
              setMobileMenuOpen(false);
            }}
          >
            Sign up
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 ${
        isScrolled || mobileMenuOpen 
          ? 'py-3 bg-background/95 backdrop-blur-md shadow-sm' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        {logoSection}

        {/* Desktop Navigation */}
        {!isMobile && (
          <>
            {navLinks}
            {accountSection}
          </>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="z-20"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        )}

        {/* Mobile Menu */}
        {isMobile && mobileMenuOpen && (
          <div className="fixed inset-0 bg-background/98 backdrop-blur-sm pt-20 px-6 py-8 z-10 animate-fade-in">
            <div className="flex flex-col gap-8">
              {navLinks}
              <div className="pt-4 border-t">
                {accountSection}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
