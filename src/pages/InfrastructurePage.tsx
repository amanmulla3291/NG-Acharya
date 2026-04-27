import { useEffect, useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { fetchInfrastructure } from '@/lib/data/infrastructure';
import type { InfrastructureItem } from '@/types';

export default function InfrastructurePage() {
  const [infra, setInfra] = useState<InfrastructureItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await fetchInfrastructure();
      setInfra(data);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <PageLayout
      title="College Infrastructure"
      subtitle="State-of-the-art facilities supporting academic excellence and student development."
      breadcrumbItems={[{ label: 'Infrastructure' }]}
    >
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-64 skeleton rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {infra.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-gray-100 p-6 shadow-card hover:shadow-hover transition-all">
              <span className="inline-block px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-bold mb-3">
                {item.category}
              </span>
              <h3 className="font-semibold text-navy-900 text-lg mb-2">{item.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{item.description}</p>
              {item.area && <p className="text-xs text-gray-500 mb-3">📐 {item.area}</p>}
              {item.capacity && <p className="text-xs text-gray-500 mb-3">👥 Capacity: {item.capacity} people</p>}
              <div className="space-y-1">
                {item.features.slice(0, 3).map((f, j) => (
                  <div key={j} className="flex gap-2 text-xs text-gray-700">
                    <span className="text-teal-600 font-bold">✓</span> {f}
                  </div>
                ))}
              </div>
              {item.features.length > 3 && (
                <p className="text-xs text-gray-500 mt-3">+{item.features.length - 3} more features</p>
              )}
            </div>
          ))}
        </div>
      )}
    </PageLayout>
  );
}
