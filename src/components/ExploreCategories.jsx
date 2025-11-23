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

export default function ExploreCategories() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Categories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse through various categories to find professionals in your area for all your needs.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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

        <div className="text-center mt-12">
          <Link
            href="/categories"
            className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            View All Categories
          </Link>
        </div>
      </div>
    </section>
  );
}