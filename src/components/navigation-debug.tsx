// Debug component to check if navigation is working
"use client";

import { getNavigationSections } from '@/data/navigation';
import { useEffect, useState } from 'react';

export function NavigationDebug() {
  const [sections, setSections] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const navSections = getNavigationSections();
      setSections(navSections);
      console.log('Navigation sections loaded:', navSections);
    } catch (err) {
      setError(`Error loading navigation: ${err}`);
      console.error('Navigation error:', err);
    }
  }, []);

  if (error) {
    return <div className="p-4 bg-red-100 text-red-800 rounded">{error}</div>;
  }

  return (
    <div className="p-4 bg-blue-100 text-blue-800 rounded">
      <h3 className="font-bold">Navigation Debug</h3>
      <p>Sections loaded: {sections.length}</p>
      <ul>
        {sections.map(section => (
          <li key={section.id}>
            <strong>{section.title}</strong> ({section.items.length} items)
          </li>
        ))}
      </ul>
    </div>
  );
}
