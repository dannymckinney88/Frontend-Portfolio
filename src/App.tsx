import { Analytics } from '@vercel/analytics/react';

import ScrollToHash from '@/components/common/ScrollToHash';
import Navbar from '@/components/layout/Navbar';
import AppRoutes from '@/routes/AppRoutes';

function App() {
  return (
    <>
      <ScrollToHash />
      <Navbar />

      <main className="app-shell page-shell">
        <Analytics />
        <AppRoutes />
      </main>
    </>
  );
}

export default App;
