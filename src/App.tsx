import { Analytics } from '@vercel/analytics/react';

import Navbar from '@/components/layout/Navbar';
import AppRoutes from '@/routes/AppRoutes';

import './App.css';

function App() {
  return (
    <>
      <Navbar />

      <main className="app-shell page-shell">
        <Analytics />
        <AppRoutes />
      </main>
    </>
  );
}

export default App;
