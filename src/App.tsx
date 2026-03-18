import { Analytics } from '@vercel/analytics/next';

import Navbar from '@/components/layout/Navbar';
import AppRoutes from '@/routes/AppRoutes';

import './App.css';

function App() {
  return (
    <>
      <Navbar />

      <main className="app-shell page-shell">
        <AppRoutes />
        <Analytics />
      </main>
    </>
  );
}

export default App;
