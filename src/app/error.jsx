'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCw, Home, AlertOctagon } from 'lucide-react';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background dark:bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <div className="relative mb-8 flex justify-center">
          <div className="w-48 h-48 rounded-full bg-destructive/10 flex items-center justify-center relative">
            <div className="w-32 h-32 rounded-full bg-destructive/20 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-destructive/30 flex items-center justify-center">
                <AlertOctagon className="text-destructive w-16 h-16" />
              </div>
            </div>
          </div>
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-card px-4 py-2 rounded-full shadow-lg border border-border">
            <span className="text-2xl font-bold text-destructive">Oops!</span>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4">Something went wrong</h1>
        <p className="text-lg text-muted-foreground mb-8">
          We encountered an error while processing your request. Please try again or navigate to a different page.
        </p>

        <div className="bg-card rounded-xl p-6 border border-border mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center justify-center gap-2">
            <AlertOctagon className="w-5 h-5 text-destructive" />
            Error Details
          </h2>
          <div className="text-left max-w-md mx-auto bg-muted rounded-lg p-4 text-sm text-muted-foreground font-mono">
            <pre className="overflow-x-auto">
              {error.message || 'Unknown error occurred'}
            </pre>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
          <Link 
            href="/"
            className="flex items-center justify-center gap-2 bg-muted text-foreground px-6 py-3 rounded-lg hover:bg-accent transition-colors"
          >
            <Home className="w-4 h-4" />
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}