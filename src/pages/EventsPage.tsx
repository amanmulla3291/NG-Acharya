import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import EventCard from '@/components/cards/EventCard';
import { fetchEvents } from '@/lib/data/events';
import type { CollegeEvent, EventCategory } from '@/types';

const categories: EventCategory[] = ['Cultural', 'Sports', 'Academic', 'Workshop', 'Placement', 'Alumni', 'NSS/NCC'];

export default function EventsPage() {
  const [events, setEvents] = useState<CollegeEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<EventCategory[]>([]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await fetchEvents();
      setEvents(data);
      setLoading(false);
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    if (selectedCategories.length === 0) return events;
    return events.filter(e => selectedCategories.includes(e.category));
  }, [events, selectedCategories]);

  const upcomingEvents = filtered.filter(e => e.isUpcoming);
  const pastEvents = filtered.filter(e => !e.isUpcoming);

  const handleCategoryToggle = (cat: EventCategory) => {
    setSelectedCategories(prev =>
      prev.includes(cat)
        ? prev.filter(c => c !== cat)
        : [...prev, cat]
    );
  };

  return (
    <PageLayout
      title="News & Events"
      subtitle="Discover the vibrant campus life at our college with cultural festivals, sports competitions, academic seminars, and more."
      breadcrumbItems={[{ label: 'Events' }]}
    >
      <div className="space-y-12">
        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <Filter size={18} />
            <span className="font-semibold text-navy-900">Filter by Category</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryToggle(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategories.includes(category)
                    ? 'bg-navy-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
                <span className="ml-2 text-xs opacity-70">
                  ({events.filter(e => e.category === category).length})
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-80 bg-gray-200 rounded-lg skeleton" />
            ))}
          </div>
        ) : (
          <>
            {/* Upcoming events */}
            {upcomingEvents.length > 0 && (
              <section>
                <h2 className="font-display text-3xl font-bold text-navy-900 mb-8 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Upcoming Events
                </h2>
                {upcomingEvents.length === 1 ? (
                  <EventCard event={upcomingEvents[0]} featured />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcomingEvents.map((event, i) => (
                      <EventCard key={event.id} event={event} index={i} />
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* Past events */}
            {pastEvents.length > 0 && (
              <section>
                <h2 className="font-display text-3xl font-bold text-navy-900 mb-8">
                  Past Events
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pastEvents.map((event, i) => (
                    <EventCard key={event.id} event={event} index={i} />
                  ))}
                </div>
              </section>
            )}

            {/* No events */}
            {filtered.length === 0 && (
              <div className="text-center py-16 bg-gray-50 rounded-lg">
                <Filter size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-600 text-lg font-medium">No events found</p>
                <p className="text-gray-500">Try adjusting your filter criteria</p>
              </div>
            )}
          </>
        )}
      </div>
    </PageLayout>
  );
}
