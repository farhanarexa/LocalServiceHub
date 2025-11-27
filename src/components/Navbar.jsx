'use client';

import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import { MoonIcon, SunIcon, LogInIcon, User, LogOutIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, loading, logout } = useUser();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide navbar
        setIsVisible(false);
      } else {
        // Scrolling up - show navbar
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    const throttle = (func, limit) => {
      let inThrottle;
      return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
          func.apply(context, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      }
    };

    const throttledHandleScroll = throttle(handleScroll, 100);

    window.addEventListener('scroll', throttledHandleScroll);

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [lastScrollY]);

  if (loading) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-background">
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between w-full">
          <div className="flex items-center space-x-2">
            <div className="bg-primary w-10 h-10 rounded-lg"></div>
            <span className="text-2xl font-bold hidden sm:block">LocalServiceHub</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="h-10 w-24 bg-muted rounded-lg animate-pulse"></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-16 bg-background transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between w-full">
        {/* Logo and Name (hidden on small screens) */}
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-lg">
            <Image src="/image/logo2.png" alt="Logo" width={45} height={45} />
          </div>
          <span className="text-2xl font-bold hidden sm:block">LocalServiceHub</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
          <Link href="/categories" className="hover:text-primary transition-colors">Categories</Link>
          <Link href="/about" className="hover:text-primary transition-colors">About</Link>
          <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
        </div>

        {/* Right Section: Theme Toggle and User Controls */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-accent transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <MoonIcon size={20} /> : <SunIcon size={20} />}
          </button>

          {user ? (
            // User is logged in - show user avatar with dropdown
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2  text-primary-foreground px-3 py-2 rounded-lg hover:bg-primary/20 transition-colors"
              >
                {/* Show user's profile image if available, otherwise show default avatar */}
                {user.user_metadata?.avatar_url ? (
                  <Image
                    src={user.user_metadata.avatar_url}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                    unoptimized // Since this is from Supabase storage, we don't want Next.js to optimize it
                  />
                ) : (
                  <div className="bg-primary-foreground text-primary w-8 h-8 rounded-full flex items-center justify-center">
                    <User size={16} />
                  </div>
                )}
                {/* <span className="hidden sm:block">{user.email?.split('@')[0]}</span> */}
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-card rounded-lg shadow-lg border border-border py-2 z-50">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-accent transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/my-services"
                    className="block px-4 py-2 hover:bg-accent transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    My Services
                  </Link>
                  <Link
                    href="/service-requests"
                    className="block px-4 py-2 hover:bg-accent transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    Service Requests
                  </Link>
                  <Link
                    href="/my-bookings"
                    className="block px-4 py-2 hover:bg-accent transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    My Bookings
                  </Link>
                  <button
                    onClick={async () => {
                      await logout();
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-destructive/10 text-destructive transition-colors flex items-center"
                  >
                    <LogOutIcon size={16} className="mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            // User is not logged in - show login button
            <Link href="/login">
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center">
                <LogInIcon size={20} className="sm:hidden" />
                <span className="hidden sm:block">Login</span>
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}