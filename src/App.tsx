import { Analytics } from '@vercel/analytics/react';

import { RouteAnalytics } from '@/components/common/RouteAnalytics';
import ScrollToHash from '@/components/common/ScrollToHash';
import Navbar from '@/components/layout/Navbar';
import AppRoutes from '@/routes/AppRoutes';

function App() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:left-4 focus:top-4 focus:rounded-lg focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        Skip to main content
      </a>
      <ScrollToHash />
      <Navbar />
      <RouteAnalytics />
      <Analytics />

      <main id="main-content" className="min-w-0">
        <AppRoutes />
      </main>
    </>
  );
}

export default App;
