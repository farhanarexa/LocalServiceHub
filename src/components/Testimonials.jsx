const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Customer',
    content: 'Finding a reliable plumber through LocalServiceHub saved me so much time. The service was prompt and professional!',
    rating: 5
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Customer',
    content: 'I needed a computer repair urgently and found the perfect technician nearby. Highly recommended!',
    rating: 5
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Customer',
    content: 'The tutoring services I found here helped my daughter improve her grades significantly. Worth every penny!',
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from our satisfied customers about their experiences with our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-card rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-border"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-xl">★</span>
                ))}
              </div>
              <p className="text-foreground mb-6 italic">"{testimonial.content}"</p>
              <div className="flex items-center">
                <div className="bg-muted border-2 border-dashed rounded-xl w-12 h-12 mr-4"></div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}