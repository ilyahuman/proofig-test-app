import { NuqsAdapter } from 'nuqs/adapters/react';
import { Dashboard } from '@/components/Dashboard';

export function App() {
  return (
    <NuqsAdapter>
      <Dashboard />
    </NuqsAdapter>
  );
}
