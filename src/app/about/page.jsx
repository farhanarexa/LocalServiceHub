import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-b from-muted/50 to-background overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            About <span className="text-primary">LocalServiceHub</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Connecting you with trusted local professionals — quickly, easily, and reliably.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                We believe finding reliable local services shouldn’t be stressful. Whether you need a plumber at 2 AM or a tutor for your child, 
                LocalServiceHub makes it simple to discover, compare, and book verified professionals in your neighborhood.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                No more endless Googling, fake reviews, or unreliable freelancers. Just real people, real skills, and real trust — all in one place.
              </p>
            </div>
            <div className="bg-card rounded-2xl p-10 border border-border shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-primary">Why Choose Us?</h3>
              <ul className="space-y-4">
                {['Verified local providers only', 'Real customer reviews & ratings', 'Instant booking & messaging', 'Transparent pricing — no hidden fees', '24/7 customer support'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="text-primary text-xl">Checkmark</span>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '10K+', label: 'Happy Customers' },
              { number: '500+', label: 'Verified Providers' },
              { number: '50+', label: 'Categories' },
              { number: '4.9', label: 'Average Rating' }
            ].map((stat) => (
              <div key={stat.label} className="bg-card rounded-xl p-8 border border-border">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team / Values */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12">Built on Trust & Community</h2>
          <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            <div className="space-y-4">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-2xl">Handshake</div>
              <h3 className="text-xl font-semibold">Trust First</h3>
              <p className="text-muted-foreground">Every provider is background-checked and reviewed by real customers.</p>
            </div>
            <div className="space-y-4">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-2xl">Community</div>
              <h3 className="text-xl font-semibold">Support Local</h3>
              <p className="text-muted-foreground">We help small businesses and independent professionals grow in your city.</p>
            </div>
            <div className="space-y-4">
              <div className="bg-primary/10 w- w-16 h-16 rounded-full flex items-center justify-center mx-auto text-2xl">Lightning</div>
              <h3 className="text-xl font-semibold">Fast & Easy</h3>
              <p className="text-muted-foreground">Book in seconds. Get help in hours — not days.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Find Your Next Service?</h2>
          <p className="text-xl mb-10 opacity-90">
            Join thousands of people who’ve already discovered better, faster, local help.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/services"
              className="bg-background text-foreground px-8 py-4 rounded-lg font-medium hover:bg-accent transition-colors"
            >
              Browse Services
            </Link>
            <Link
              href="/categories"
              className="border-2 border-background/20 px-8 py-4 rounded-lg font-medium hover:bg-background/10 transition-colors"
            >
              View Categories
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}