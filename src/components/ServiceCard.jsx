import Link from 'next/link';

export default function ServiceCard({ service }) {
  return (
    <div
      className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-border"
    >
      <div className="h-48 bg-muted relative">
        <div className="bg-muted border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center text-foreground/50">
          Service Image
        </div>
        <div className="absolute top-4 right-4 bg-yellow-500 text-primary-foreground px-2 py-1 rounded-full text-sm font-semibold flex items-center">
          <span>★</span> {service.rating}
        </div>
      </div>
      <div className="p-6">
        <span className="text-xs font-medium text-primary px-2 py-1 rounded bg-primary/10">
          {service.category}
        </span>
        <h3 className="text-xl font-semibold mb-2 mt-3">{service.name}</h3>
        <p className="text-muted-foreground mb-3">{service.provider}</p>
        <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-primary">{service.price}</span>
          <Link
            href={`/service/${service.id}`}
            className="text-primary hover:text-primary/80 font-medium"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
}

export function ServiceCardCompact({ service }) {
  return (
    <div className="flex items-center p-4 border border-border rounded-lg hover:bg-accent transition-colors">
      <div className="bg-muted rounded-lg w-16 h-16 flex items-center justify-center mr-4">
        <span className="text-xl">🏢</span>
      </div>
      <div className="flex-1">
        <h3 className="font-medium">{service.name}</h3>
        <p className="text-sm text-muted-foreground">{service.provider}</p>
      </div>
      <div className="flex items-center">
        <span className="text-yellow-500 mr-1">★</span>
        <span className="font-medium text-sm">{service.rating}</span>
      </div>
    </div>
  );
}