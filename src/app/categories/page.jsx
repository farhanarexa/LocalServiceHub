import Link from 'next/link';

const categories = [
  {
    id: 1,
    name: 'Home Services',
    icon: '🏠',
    count: '120+ services'
  },
  {
    id: 2,
    name: 'Tech Support',
    icon: '💻',
    count: '85+ services'
  },
  {
    id: 3,
    name: 'Healthcare',
    icon: '🏥',
    count: '65+ services'
  },
  {
    id: 4,
    name: 'Education',
    icon: '🎓',
    count: '90+ services'
  },
  {
    id: 5,
    name: 'Transportation',
    icon: '🚗',
    count: '70+ services'
  },
  {
    id: 6,
    name: 'Personal Care',
    icon: '💇',
    count: '110+ services'
  },
  {
    id: 7,
    name: 'Food & Dining',
    icon: '🍽️',
    count: '50+ services'
  },
  {
    id: 8,
    name: 'Entertainment',
    icon: '🎬',
    count: '40+ services'
  }
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background dark:bg-background">
      <div className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Browse Categories</h1>
          <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
            Find services by category. All local professionals in one place.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="bg-card rounded-xl p-6 text-center hover:shadow-lg transition-shadow border border-border"
            >
              <div className="text-4xl mb-4">{category.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
              <p className="text-muted-foreground text-sm">{category.count}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}