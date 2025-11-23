import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-12 md:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Find the Best <span className="text-primary">Local Services</span> Near You
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-lg">
            Connect with trusted professionals in your community for all your service needs.
            From home maintenance to personal care, we&apos;ve got you covered.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              href="/services"
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg text-center hover:bg-primary/90 transition-colors"
            >
              Explore Services
            </Link>
            <Link
              href="/how-it-works"
              className="border border-primary text-primary px-6 py-3 rounded-lg text-center hover:bg-accent transition-colors"
            >
              How It Works
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="bg-muted border-2 border-dashed rounded-xl w-full h-96 md:h-[400px] flex items-center justify-center text-foreground/50">
            Hero Image/Graphic
          </div>
        </div>
      </div>
    </section>
  );
}