'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-muted py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-primary w-8 h-8 rounded-lg"></div>
              <span className="text-xl font-bold">LocalServiceHub</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Connecting you with the best local services in your community.
            </p>
            <div className="flex space-x-4">
              {/* Social Media Icons would go here */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/categories" className="text-muted-foreground hover:text-primary transition-colors">Categories</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link href="/category/home-services" className="text-muted-foreground hover:text-primary transition-colors">Home Services</Link></li>
              <li><Link href="/category/tech-support" className="text-muted-foreground hover:text-primary transition-colors">Tech Support</Link></li>
              <li><Link href="/category/healthcare" className="text-muted-foreground hover:text-primary transition-colors">Healthcare</Link></li>
              <li><Link href="/category/education" className="text-muted-foreground hover:text-primary transition-colors">Education</Link></li>
              <li><Link href="/category/transportation" className="text-muted-foreground hover:text-primary transition-colors">Transportation</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Email: info@localservicehub.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Service St, City, Country</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} LocalServiceHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}