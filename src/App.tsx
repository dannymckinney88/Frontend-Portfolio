import { Analytics } from '@vercel/analytics/react';

import { RouteAnalytics } from '@/components/common/RouteAnalytics';
import ScrollToHash from '@/components/common/ScrollToHash';
import Navbar from '@/components/layout/Navbar';
import AppRoutes from '@/routes/AppRoutes';

function App() {
  return (
    <>
      <ScrollToHash />
      <Navbar />
      <RouteAnalytics />
      <Analytics />

      <main className="app-shell page-shell">
        <AppRoutes />
      </main>
    </>
  );
}

export default App;
