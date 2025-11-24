// import Link from 'next/link';

// export default function ContactPage() {
//   return (
//     <div className="min-h-screen bg-background">

//       {/* Hero Section */}
//       <section className="py-20 lg:py-28 bg-muted/30">
//         <div className="max-w-7xl mx-auto px-6 text-center">
//           <h1 className="text-5xl md:text-6xl font-bold mb-6">
//             Get in Touch
//           </h1>
//           <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
//             Have a question? Need help finding a service? We're here 24/7 to assist you.
//           </p>
//         </div>
//       </section>

//       {/* Contact Info + Form */}
//       <section className="py-16 lg:py-24">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

//             {/* Contact Info */}
//             <div className="space-y-10">
//               <div>
//                 <h2 className="text-3xl font-bold mb-8">We'd love to hear from you</h2>
//                 <p className="text-lg text-muted-foreground leading-relaxed">
//                   Whether you're a customer looking for help or a service provider interested in joining our platform — 
//                   reach out! Our team responds within a few hours.
//                 </p>
//               </div>

//               <div className="space-y-8">
//                 <div className="flex items-start gap-5">
//                   <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 text-primary text-xl">
//                     Email
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-lg">Email Us</h3>
//                     <p className="text-muted-foreground">Our team is here to help</p>
//                     <a href="mailto:hello@localservicehub.com" className="text-primary font-medium hover:underline">
//                       hello@localservicehub.com
//                     </a>
//                   </div>
//                 </div>

//                 <div className="flex items-start gap-5">
//                   <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 text-primary text-xl">
//                     Phone
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-lg">Call or Text</h3>
//                     <p className="text-muted-foreground">Mon–Sun, 7 AM – 11 PM</p>
//                     <a href="tel:+15551234567" className="text-primary font-medium hover:underline">
//                       +1 (555) 123-4567
//                     </a>
//                   </div>
//                 </div>

//                 <div className="flex items-start gap-5">
//                   <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 text-primary text-xl">
//                     Location
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-lg">We're Local, Everywhere</h3>
//                     <p className="text-muted-foreground">
//                       Serving communities across the country.<br />
//                       No office visits needed — we're 100% online!
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="pt-6">
//                 <p className="text-sm text-muted-foreground">
//                   Typical response time: <span className="font-medium text-foreground">under 2 hours</span>
//                 </p>
//               </div>
//             </div>

//             {/* Contact Form */}
//             <div className="bg-card rounded-2xl border border-border shadow-xl p-8 lg:p-10">
//               <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
              
//               <form className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium mb-2">First Name</label>
//                     <input
//                       type="text"
//                       className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition"
//                       placeholder="John"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Last Name</label>
//                     <input
//                       type="text"
//                       className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition"
//                       placeholder="Doe"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-2">Email Address</label>
//                   <input
//                     type="email"
//                     className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition"
//                     placeholder="john@example.com"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-2">Subject</label>
//                   <select className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition">
//                     <option>General Inquiry</option>
//                     <option>I need help finding a service</option>
//                     <option>I want to join as a provider</option>
//                     <option>Technical support</option>
//                     <option>Partnership opportunity</option>
//                     <option>Other</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-2">Message</label>
//                   <textarea
//                     rows={6}
//                     className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition resize-none"
//                     placeholder="Tell us how we can help..."
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-medium hover:bg-primary/90 transition transform hover:scale-[1.02] active:scale-[0.98]"
//                 >
//                   Send Message
//                 </button>

//                 <p className="text-center text-xs text-muted-foreground">
//                   We respect your privacy. Your information is safe with us.
//                 </p>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* FAQ Quick Links */}
//       <section className="py-16 bg-muted/20">
//         <div className="max-w-7xl mx-auto px-6 text-center">
//           <h2 className="text-3xl font-bold mb-8">Common Questions</h2>
//           <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
//             <Link href="/faq" className="bg-card rounded-xl p-8 border border-border hover:shadow-lg transition">
//               <div className="text-4xl mb-4">Question</div>
//               <h3 className="font-semibold text-lg">How does it work?</h3>
//               <p className="text-muted-foreground text-sm mt-2">Browse, book, and get help — all in minutes</p>
//             </Link>
//             <Link href="/faq" className="bg-card rounded-xl p-8 border border-border hover:shadow-lg transition">
//               <div className="text-4xl mb-4">Shield</div>
//               <h3 className="font-semibold text-lg">Are providers verified?</h3>
//               <p className="text-muted-foreground text-sm mt-2">Yes — every provider is background-checked</p>
//             </Link>
//             <Link href="/faq" className="bg-card rounded-xl p-8 border border-border hover:shadow-lg transition">
//               <div className="text-4xl mb-4">Money</div>
//               <h3 className="font-semibold text-lg">Is there a booking fee?</h3>
//               <p className="text-muted-foreground text-sm mt-2">Never. You only pay the provider directly</p>
//             </Link>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }




'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function ContactPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "How does LocalServiceHub work?",
      a: "Browse services or categories, view real reviews and ratings, then book directly with the provider. No middlemen — you pay the professional directly."
    },
    {
      q: "Are the service providers verified?",
      a: "Yes! Every provider goes through identity verification and background checks. We only allow trusted professionals on our platform."
    },
    {
      q: "Is there any booking fee?",
      a: "Never. LocalServiceHub is 100% free for customers. You only pay the service provider directly — no hidden charges or commissions."
    },
    {
      q: "Can I message providers before booking?",
      a: "Yes! Most providers offer instant messaging so you can discuss details, ask questions, or request quotes before booking."
    },
    {
      q: "What if I need to cancel a booking?",
      a: "Cancellation policies are set by each provider. You can view them on the service page. Most allow free cancellation up to 24 hours before."
    },
    {
      q: "How fast can I get help?",
      a: "Many providers offer same-day or emergency service. Look for the 'Available Today' or 'Emergency' badge on their profile!"
    },
    {
      q: "How do I leave a review?",
      a: "After your service is completed, you’ll receive an email with a link to rate and review your experience. Your feedback helps others!"
    },
    {
      q: "Can I become a service provider?",
      a: "Yes! We’re always looking for reliable professionals. Click 'Become a Provider' in the footer or email us at providers@localservicehub.com"
    }
  ];

  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Have a question? Need help? We’re here 24/7 to support you.
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left: Contact Info */}
            <div className="space-y-10">
              <div>
                <h2 className="text-3xl font-bold mb-8">We&apos;d love to hear from you</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Whether you&apos;re looking for help or want to join as a provider — we&apos;re just a message away.
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center shrink-0 text-primary text-xl">Email</div>
                  <div>
                    <h3 className="font-semibold text-lg">Email Us</h3>
                    <p className="text-muted-foreground">Response within 2 hours</p>
                    <a href="mailto:hello@localservicehub.com" className="text-primary font-medium hover:underline">hello@localservicehub.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center shrink-0 text-primary text-xl">Phone</div>
                  <div>
                    <h3 className="font-semibold text-lg">Call or Text</h3>
                    <p className="text-muted-foreground">7 AM – 11 PM, every day</p>
                    <a href="tel:+15551234567" className="text-primary font-medium hover:underline">+1 (555) 123-4567</a>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center shrink-0 text-primary text-xl">Location</div>
                  <div>
                    <h3 className="font-semibold text-lg">100% Online & Local</h3>
                    <p className="text-muted-foreground">Serving communities nationwide</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="bg-card rounded-2xl border border-border shadow-xl p-8 lg:p-10">
              <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input type="text" placeholder="First Name" className="px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent" />
                  <input type="text" placeholder="Last Name" className="px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent" />
                </div>
                <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent" />
                <select className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option>General Inquiry</option>
                  <option>Need help finding a service</option>
                  <option>Want to become a provider</option>
                  <option>Technical support</option>
                  <option>Other</option>
                </select>
                <textarea rows={5} placeholder="Your message..." className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent resize-none"></textarea>
                <button type="submit" className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-medium hover:bg-primary/90 transition">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section — Now Integrated! */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">Got questions? We&apos;ve got answers.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-card rounded-xl border border-border overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-accent/50 transition"
                >
                  <span className="font-medium pr-4">{faq.q}</span>
                  <span className={`text-xl transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>
                    DownArrow
                  </span>
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-5 pt-2 border-t border-border/50">
                    <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-muted-foreground">
              Still have questions?{' '}
              <Link href="mailto:hello@localservicehub.com" className="text-primary font-medium hover:underline">
                Email us anytime
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}