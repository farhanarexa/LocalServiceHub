'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, Search, AlertTriangle, ArrowRight } from 'lucide-react';

export default function NotFound() {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      // Cleanup timer
      return () => clearTimeout(timer);
    } else {
      // Redirect to homepage after countdown reaches 0
      window.location.href = '/';
    }
  }, [countdown]);

  return (
    <div className="min-h-screen bg-background dark:bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Error illustration */}
        <div className="relative mb-8 flex justify-center">
          <div className="w-48 h-48 rounded-full bg-primary/10 flex items-center justify-center relative">
            <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-primary/30 flex items-center justify-center">
                <AlertTriangle className="text-primary w-16 h-16" />
              </div>
            </div>
          </div>
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-card px-4 py-2 rounded-full shadow-lg border border-border">
            <span className="text-2xl font-bold text-primary">404</span>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4">Page Not Found</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="bg-card rounded-xl p-6 border border-border mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center justify-center gap-2">
            <Search className="w-5 h-5" />
            What happened?
          </h2>
          <ul className="space-y-2 text-sm text-muted-foreground text-left max-w-md mx-auto">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>You may have mistyped the URL</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>The page might have been removed</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>The link you clicked may be outdated</span>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <p className="text-muted-foreground mb-2">
            Redirecting to homepage in <span className="font-bold text-primary">{countdown}</span> seconds...
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Home className="w-4 h-4" />
              Go to Homepage
            </Link>
            <Link
              href="/services"
              className="flex items-center justify-center gap-2 bg-muted text-foreground px-6 py-3 rounded-lg hover:bg-accent transition-colors"
            >
              <Search className="w-4 h-4" />
              Browse Services
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}