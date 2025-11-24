// import { notFound } from 'next/navigation';
// import Link from 'next/link';
// import ServiceCard from '@/components/ServiceCard';

// // Mock category data - in a real app this would come from a database
// const categories = [
//   {
//     id: 1,
//     name: 'Home Services',
//     icon: '🏠',
//     description: 'Services for your home including plumbing, electrical, cleaning, and maintenance.',
//     services: [
//       {
//         id: 1,
//         name: 'Plumbing Repair',
//         provider: 'John\'s Plumbing',
//         rating: 4.8,
//         price: '$50/hr',
//         description: 'Professional plumbing services for residential and commercial needs',
//         category: 'Home Services',
//         image: 'https://via.placeholder.com/300x200'
//       },
//       {
//         id: 5,
//         name: 'Electrical Work',
//         provider: 'PowerPro Electric',
//         rating: 4.6,
//         price: '$60/hr',
//         description: 'Professional electrical installation and repair',
//         category: 'Home Services',
//         image: 'https://via.placeholder.com/300x200'
//       },
//       {
//         id: 3,
//         name: 'Cleaning Service',
//         provider: 'Sparkle Cleaners',
//         rating: 4.7,
//         price: '$35/hr',
//         description: 'Thorough cleaning services for homes and offices',
//         category: 'Home Services',
//         image: 'https://via.placeholder.com/300x200'
//       }
//     ]
//   },
//   {
//     id: 2,
//     name: 'Tech Support',
//     icon: '💻',
//     description: 'Computer repair, software support, and technical assistance.',
//     services: [
//       {
//         id: 2,
//         name: 'Computer Repair',
//         provider: 'TechFix Solutions',
//         rating: 4.9,
//         price: '$75/hr',
//         description: 'Expert computer repair and technical support services',
//         category: 'Tech Support',
//         image: 'https://via.placeholder.com/300x200'
//       }
//     ]
//   },
//   {
//     id: 3,
//     name: 'Education',
//     icon: '🎓',
//     description: 'Tutoring, educational support, and academic services.',
//     services: [
//       {
//         id: 4,
//         name: 'Tutoring',
//         provider: 'EduCare Tutors',
//         rating: 4.9,
//         price: '$40/hr',
//         description: 'Personalized tutoring for all academic subjects',
//         category: 'Education',
//         image: 'https://via.placeholder.com/300x200'
//       }
//     ]
//   },
//   {
//     id: 4,
//     name: 'Personal Care',
//     icon: '💇',
//     description: 'Personal grooming, pet care, and wellness services.',
//     services: [
//       {
//         id: 6,
//         name: 'Pet Grooming',
//         provider: 'Furry Friends Care',
//         rating: 4.8,
//         price: '$30/hr',
//         description: 'Professional pet grooming and care services',
//         category: 'Personal Care',
//         image: 'https://via.placeholder.com/300x200'
//       }
//     ]
//   }
// ];

// export default function CategoryPage({ params }) {
//   const category = categories.find(cat =>
//     cat.name.toLowerCase().replace(/\s+/g, '-') === params.id
//   );

//   if (!category) {
//     notFound();
//   }

//   return (
//     <div className="min-h-screen bg-background dark:bg-background">
//       <div className="py-16 bg-muted">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="flex items-center mb-4">
//             <span className="text-4xl mr-4">{category.icon}</span>
//             <h1 className="text-4xl md:text-5xl font-bold">{category.name}</h1>
//           </div>
//           <p className="text-lg text-muted-foreground max-w-2xl">
//             {category.description}
//           </p>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 py-12">
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-2xl font-semibold">Services in {category.name}</h2>
//           <p className="text-muted-foreground">{category.services.length} services available</p>
//         </div>

//         {category.services.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {category.services.map((service) => (
//               <ServiceCard key={service.id} service={service} />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-12">
//             <p className="text-muted-foreground text-lg">No services available in this category yet.</p>
//             <p className="text-muted-foreground">Check back later or explore other categories.</p>
//           </div>
//         )}

//         <div className="mt-12 text-center">
//           <Link
//             href="/services"
//             className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
//           >
//             View All Services
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }





import { notFound } from 'next/navigation';
import Link from 'next/link';
import ServiceCard from '@/components/ServiceCard';

// Mock data — keep all your categories and services
const categories = [
  {
    id: 1,
    name: 'Home Services',
    icon: 'Home',
    description: 'Services for your home including plumbing, electrical, cleaning, and maintenance.',
    services: [
      { id: 1, name: 'Plumbing Repair', provider: "John's Plumbing", rating: 4.8, price: '$50/hr', description: 'Professional plumbing services...', category: 'Home Services', image: 'https://via.placeholder.com/300x200' },
      { id: 5, name: 'Electrical Work', provider: 'PowerPro Electric', rating: 4.6, price: '$60/hr', description: 'Professional electrical installation...', category: 'Home Services', image: 'https://via.placeholder.com/300x200' },
      { id: 3, name: 'Cleaning Service', provider: 'Sparkle Cleaners', rating: 4.7, price: '$35/hr', description: 'Thorough cleaning services...', category: 'Home Services', image: 'https://via.placeholder.com/300x200' }
    ]
  },
  {
    id: 2,
    name: 'Tech Support',
    icon: 'Computer',
    description: 'Computer repair, software support, and technical assistance.',
    services: [
      { id: 2, name: 'Computer Repair', provider: 'TechFix Solutions', rating: 4.9, price: '$75/hr', description: 'Expert computer repair...', category: 'Tech Support', image: 'https://via.placeholder.com/300x200' }
    ]
  },
  {
    id: 3,
    name: 'Education',
    icon: 'GraduationCap',
    description: 'Tutoring, educational support, and academic services.',
    services: [
      { id: 4, name: 'Tutoring', provider: 'EduCare Tutors', rating: 4.9, price: '$40/hr', description: 'Personalized tutoring...', category: 'Education', image: 'https://via.placeholder.com/300x200' }
    ]
  },
  {
    id: 4,
    name: 'Personal Care',
    icon: 'HeartHandshake',
    description: 'Personal grooming, pet care, and wellness services.',
    services: [
      { id: 6, name: 'Pet Grooming', provider: 'Furry Friends Care', rating: 4.8, price: '$30/hr', description: 'Professional pet grooming...', category: 'Personal Care', image: 'https://via.placeholder.com/300x200' }
    ]
  }
];

// This is the ONLY way that works in Next.js 16 + Turbopack
export default async function CategoryPage({ params }) {
  const { slug } = await params; // Critical: await the Promise!

  const category = categories.find(cat =>
    cat.name.toLowerCase().replace(/\s+/g, '-') === slug
  );

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center mb-4">
            <span className="text-4xl mr-4">{category.icon}</span>
            <h1 className="text-4xl md:text-5xl font-bold">{category.name}</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {category.description}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Services in {category.name}</h2>
          <p className="text-muted-foreground">{category.services.length} services available</p>
        </div>

        {category.services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {category.services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No services available in this category yet.</p>
            <p className="text-muted-foreground">Check back later or explore other categories.</p>
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            View All Services
          </Link>
        </div>
      </div>
    </div>
  );
}