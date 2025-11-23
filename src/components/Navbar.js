'use client';

import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { MoonIcon, SunIcon } from 'lucide-react';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto w-full bg-background">
      {/* Logo and Name */}
      <div className="flex items-center space-x-2">
        <div className="bg-primary w-10 h-10 rounded-lg"></div>
        <span className="text-2xl font-bold">LocalServiceHub</span>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center space-x-8">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
        <Link href="/categories" className="hover:text-primary transition-colors">Categories</Link>
        <Link href="/about" className="hover:text-primary transition-colors">About</Link>
        <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
      </div>

      {/* Right Section: Theme Toggle and Login */}
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-accent transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <MoonIcon size={20} /> : <SunIcon size={20} />}
        </button>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
          Login
        </button>
      </div>
    </nav>
  );
}